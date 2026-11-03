// Journal de l'école : les données partagées de l'appli (réunions, articles, idées, maquettes, équipe).
// Kevin (03/11/2026) : un Google Sheet à part, dans son Drive, rien que pour le journal.
// Mise en place (une seule fois) :
//   1. Crée un nouveau Google Sheet (sheets.new), par exemple « Journal de l'école ».
//   2. Extensions > Apps Script : efface tout et colle ce fichier. Enregistre (icône disquette).
//   3. Déployer > Nouveau déploiement > roue dentée « Application Web » : Exécuter en tant que « Moi », Accès « Tout le monde ».
//      Google demande d'autoriser : choisis ton compte > Paramètres avancés > Accéder au projet > Autoriser.
//   4. Copie l'URL qui finit par /exec et envoie-la à Claude : il la met dans l'appli (journal/app.js), pour tout le monde.
// Onglets : « Données » (ce que l'appli lit et écrit, à ne pas modifier à la main), et des onglets lisibles
// « Articles », « Réunions », « Idées » et « Équipe », refaits à chaque envoi (pour relire ou garder une trace).
const CODE = 'code-journal'; // à remplacer par le code de l'appli Journal (version prête à coller : fichier de kevin)
const MORCEAU = 45000; // une case Google Sheet garde au plus 50 000 caractères : un long article ou une photo prend plusieurs cases
const TYPES = ['membre', 'reunion', 'rep', 'article', 'img', 'idee', 'vote', 'com', 'numero'];

function onglet(nom, entete, couleur) {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(nom);
  if (!sh) {
    sh = ss.insertSheet(nom);
    sh.getRange(1, 1, 1, entete.length).setValues([entete]).setFontWeight('bold').setBackground(couleur || '#0f766e').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }
  return sh;
}
function donnees() { return onglet('Données', ['Id', 'Type', 'Reçu', 'Modifié', 'Données (suite à droite si long)']); }
function sortie(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function codeOk(c) { return String(c || '').trim() === CODE; }

// Toutes les lignes : [{ligne, id, type, recu, json}]
function lire(sh) {
  const n = sh.getLastRow() - 1;
  if (n < 1) return [];
  const larg = Math.max(5, sh.getLastColumn());
  return sh.getRange(2, 1, n, larg).getValues().map((r, i) => ({
    ligne: i + 2, id: String(r[0]), type: String(r[1]), recu: Number(r[2]) || 0, maj: Number(r[3]) || 0,
    json: r.slice(4).join('')
  })).filter(x => x.id);
}

// GET ?code=12345&depuis=<ms> : tout ce qui a été reçu après « depuis » (0 = tout)
function doGet(e) {
  if (!codeOk(e.parameter.code)) return sortie({ok: false, err: 'code'});
  const depuis = Number(e.parameter.depuis) || 0, maintenant = Date.now();
  const items = [];
  lire(donnees()).forEach(x => { if (x.recu > depuis) { try { items.push(JSON.parse(x.json)); } catch (err) {} } });
  return sortie({ok: true, items: items, t: maintenant});
}

// POST {code, items: [{id, t, maj, …}]} : garde chaque élément s'il est plus récent que celui du tableau
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try {
    const o = JSON.parse(e.postData.contents);
    if (!codeOk(o.code)) return sortie({ok: false, err: 'code'});
    const sh = donnees(), toutes = lire(sh), parId = {};
    toutes.forEach(x => { parId[x.id] = x; });
    const recu = Date.now(), ok = [];
    (Array.isArray(o.items) ? o.items : []).slice(0, 200).forEach(it => {
      if (!it || typeof it !== 'object') return;
      const id = String(it.id || '').slice(0, 60), type = String(it.t || '');
      if (!/^[a-z0-9_-]+$/i.test(id) || TYPES.indexOf(type) < 0) return;
      const maj = Number(it.maj) || 0, avant = parId[id];
      if (avant && avant.maj > maj) return; // le tableau a déjà plus récent
      const json = JSON.stringify(it), cases = [];
      for (let i = 0; i < json.length; i += MORCEAU) cases.push(json.slice(i, i + MORCEAU));
      const ligne = [id, type, recu, maj].concat(cases);
      if (avant) {
        const larg = Math.max(5, sh.getLastColumn());
        sh.getRange(avant.ligne, 1, 1, larg).clearContent();
        sh.getRange(avant.ligne, 1, 1, ligne.length).setValues([ligne]);
      } else {
        sh.appendRow(ligne);
        parId[id] = {ligne: sh.getLastRow(), id: id, maj: maj};
      }
      parId[id].maj = maj; parId[id].json = json; parId[id].type = type;
      ok.push(id);
    });
    try { lisibles(sh); } catch (err) { console.error(err); } // les données sont déjà enregistrées
    return sortie({ok: true, n: ok.length, ids: ok, t: recu});
  } finally {
    lock.releaseLock();
  }
}

// Onglets lisibles par un humain (refaits à chaque envoi)
function lisibles(sh) {
  const tout = {};
  lire(sh).forEach(x => { try { const it = JSON.parse(x.json); if (!it.x) (tout[it.t] = tout[it.t] || []).push(it); } catch (err) {} });
  const nom = {}; (tout.membre || []).forEach(m => { nom[m.id] = m.nom; });
  const date = ms => ms ? Utilities.formatDate(new Date(ms), 'Europe/Brussels', 'dd/MM/yyyy HH:mm') : '';
  const texte = h => String(h || '').replace(/<br\s*\/?>|<\/(p|div|h3|li|blockquote)>/gi, '\n').replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\n{3,}/g, '\n\n').trim().slice(0, 45000);
  const ecrire = (titre, entete, lignes, couleur) => {
    const o = onglet(titre, entete, couleur);
    if (o.getLastRow() > 1) o.getRange(2, 1, o.getLastRow() - 1, Math.max(entete.length, o.getLastColumn())).clearContent();
    if (lignes.length) o.getRange(2, 1, lignes.length, entete.length).setValues(lignes);
  };
  const etats = {brouillon: 'Brouillon', relire: 'À relire', valide: 'Validé'};
  ecrire('Articles', ['Modifié', 'Titre', 'Rubrique', 'Auteurs', 'État', 'Mots', 'Chapeau', 'Texte'],
    (tout.article || []).sort((a, b) => b.maj - a.maj).map(a => {
      const t = texte(a.corps);
      return [date(a.maj), a.titre || '', a.rub || '', a.auteurs || nom[a.par] || '', etats[a.etat] || a.etat || '', t ? t.split(/\s+/).length : 0, a.chapeau || '', t];
    }), '#1d4ed8');
  const reps = {}; (tout.rep || []).forEach(r => { (reps[r.reu] = reps[r.reu] || []).push((nom[r.par] || '?') + (r.v === 'oui' ? ' ✓' : r.v === 'non' ? ' ✗' : ' ?')); });
  ecrire('Réunions', ['Date', 'Heure', 'Lieu', 'Objet', 'Ordre du jour', 'Réponses', 'Compte rendu', 'Proposée par'],
    (tout.reunion || []).sort((a, b) => String(a.date + a.h).localeCompare(String(b.date + b.h))).map(r =>
      [r.date || '', r.h || '', r.lieu || '', r.objet || '', r.odj || '', (reps[r.id] || []).join(', '), r.cr || '', nom[r.par] || '']), '#b45309');
  const votes = {}; (tout.vote || []).forEach(v => { if (v.v) votes[v.idee] = (votes[v.idee] || 0) + 1; });
  ecrire('Idées', ['Modifié', 'Idée', 'Catégorie', 'Votes', 'Proposée par', 'Prise par'],
    (tout.idee || []).sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0)).map(i =>
      [date(i.maj), i.texte || '', i.cat || '', votes[i.id] || 0, nom[i.par] || '', nom[i.pris] || '']), '#7c3aed');
  ecrire('Équipe', ['Prénom', 'Rôle', 'Arrivé le'],
    (tout.membre || []).map(m => [m.nom || '', m.role === 'prof' ? 'Prof (chef)' : 'Élève', date(m.cree)]), '#0f766e');
}
