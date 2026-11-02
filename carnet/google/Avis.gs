// Notes des prépas : chaque prof note de 0 à 10 les prépas de la bibliothèque qu'il a faites, et tout le monde voit les notes.
// Kevin (02/11/2026) : un Google Sheet à part, rien à voir avec le Koh-Lanta ni le flipper.
// Mise en place (une seule fois) :
//   1. Crée un nouveau Google Sheet, par exemple « Notes des prépas EPS ».
//   2. Extensions > Apps Script : efface tout et colle ce fichier. Enregistre.
//   3. Déployer > Nouveau déploiement > type « Application Web » : Exécuter en tant que « Moi », Accès « Tout le monde ».
//   4. Copie l'URL qui finit par /exec et envoie-la à Claude : il la met dans le carnet (carnet/avis.js), pour tous les profs.
// Onglets : « Avis » (une ligne par prof et par prépa : une nouvelle note remplace l'ancienne) et « Moyennes » (refait à chaque note).
const CODE = 'code-ecole'; // à remplacer par le code d'école envoyé par l'appli (le même que dans le script du flipper)
const ENTETE = ['Date', 'Prof', 'Note /10', 'Sport', 'Année', 'Leçon', 'Thème', 'Réf', 'Id'];

function onglet(nom, entete) {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(nom);
  if (!sh) {
    sh = ss.insertSheet(nom);
    sh.getRange(1, 1, 1, entete.length).setValues([entete]).setFontWeight('bold').setBackground('#12352b').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }
  return sh;
}

function lignes() {
  const sh = onglet('Avis', ENTETE);
  return {sh: sh, v: sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, ENTETE.length).getValues() : []};
}

function doGet(e) {
  if (String(e.parameter.code || '').trim().toLowerCase() !== CODE) return sortie({ok: false, err: 'code'});
  return sortie({ok: true, avis: tout(lignes().v)});
}

// {ref: {m: moyenne, n: nombre d'avis, d: [[prof, note, 'jj/mm'], …]}}
function tout(v) {
  const o = {};
  v.forEach(r => {
    const ref = String(r[7] || ''), note = Number(r[2]);
    if (!ref || isNaN(note)) return;
    const a = o[ref] = o[ref] || {m: 0, n: 0, d: []};
    a.d.push([String(r[1] || ''), note, r[0] instanceof Date ? Utilities.formatDate(r[0], 'Europe/Brussels', 'dd/MM') : '']);
  });
  Object.keys(o).forEach(k => { const a = o[k]; a.n = a.d.length; a.m = Math.round(a.d.reduce((s, x) => s + x[1], 0) / a.n * 10) / 10; });
  return o;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const o = JSON.parse(e.postData.contents);
    if (String(o.code || '').trim().toLowerCase() !== CODE) return sortie({ok: false, err: 'code'});
    const notes = Array.isArray(o.notes) ? o.notes : [o];
    const t = lignes(), sh = t.sh, v = t.v, id = String(o.id || '').slice(0, 40);
    if (!id) return sortie({ok: false, err: 'id'});
    let n = 0;
    notes.forEach(x => {
      const ref = String(x.ref || '').slice(0, 60), note = Math.round(Number(x.note));
      if (!/^[a-z0-9]+\|\d+\|\d+$/i.test(ref) || isNaN(note) || note < 0 || note > 10) return;
      const ligne = [new Date(), String(o.prof || x.prof || '').trim().slice(0, 40) || 'Un collègue', note, String(x.sp || '').slice(0, 40),
        Number(x.an) || '', Number(x.n) || '', String(x.t || '').slice(0, 120), ref, id];
      const i = v.findIndex(r => String(r[8]) === id && String(r[7]) === ref);
      if (i >= 0) { sh.getRange(i + 2, 1, 1, ENTETE.length).setValues([ligne]); v[i] = ligne; }
      else { sh.appendRow(ligne); v.push(ligne); }
      n++;
    });
    try { moyennes(v); } catch (err) { console.error(err); } // la note est déjà enregistrée
    return sortie({ok: true, n: n, avis: tout(v)});
  } finally {
    lock.releaseLock();
  }
}

// onglet « Moyennes » : une ligne par prépa, la mieux notée en haut
function moyennes(v) {
  const sh = onglet('Moyennes', ['Sport', 'Année', 'Leçon', 'Thème', 'Moyenne /10', 'Nombre d\'avis']);
  const par = {};
  v.forEach(r => { const k = String(r[7]); if (!k) return; const a = par[k] = par[k] || {sp: r[3], an: r[4], n: r[5], t: r[6], s: 0, c: 0}; a.s += Number(r[2]) || 0; a.c++; });
  const out = Object.keys(par).map(k => { const a = par[k]; return [a.sp, a.an, a.n, a.t, Math.round(a.s / a.c * 10) / 10, a.c]; })
    .sort((a, b) => b[4] - a[4] || b[5] - a[5]);
  if (sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, 6).clearContent();
  if (out.length) sh.getRange(2, 1, out.length, 6).setValues(out);
}

function sortie(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
