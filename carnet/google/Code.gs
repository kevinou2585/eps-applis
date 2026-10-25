/**
 * Carnet EPS : sauvegarde automatique dans un tableau Google (Google Sheets).
 *
 * Installation (une seule fois, sur ordinateur) :
 * 1. Sur ton Drive, crée un tableau vide (sheets.new) et nomme-le « Carnet EPS ».
 * 2. Menu Extensions > Apps Script. Efface tout ce qui s'y trouve et colle ce fichier. 💾 Enregistrer.
 * 3. Déployer > Nouveau déploiement > roue dentée > « Application Web » :
 *      Exécuter en tant que : Moi ; Qui a accès : Tout le monde. Touche Déployer et autorise l'accès.
 * 4. Copie l'adresse qui finit par /exec et colle-la dans le Carnet (Réglages > Sauvegarde > Google Drive).
 *
 * Rien à modifier dans ce fichier : le code qui protège ta sauvegarde est choisi dans le Carnet,
 * puis noté dans l'onglet « Lisez-moi » au premier envoi.
 *
 * Les onglets cachés « _copie … » servent à la sauvegarde (une par année scolaire) : ne les modifie pas.
 * Les autres onglets (un par classe, « Prépas ») sont réécrits à chaque changement, pour être lus
 * ou téléchargés en Excel (Fichier > Télécharger). Ce que tu y écris à la main serait effacé.
 */
const MORCEAU = 45000;      // une cellule accepte 50 000 caractères au maximum
const LISEZ = 'Lisez-moi';

function doGet(e) {
  return repondre(() => {
    const p = e.parameter || {};
    const err = controle(p.cle); if (err) return err;
    const copie = lireCopie(p.annee || '');
    return copie ? {ok: true, copie: copie} : {ok: false, err: 'vide'};
  });
}

function doPost(e) {
  return repondre(() => {
    const o = JSON.parse(e.postData.contents);
    const verrou = LockService.getScriptLock();
    verrou.waitLock(30000);
    try {
      const props = PropertiesService.getScriptProperties();
      if (!props.getProperty('CLE')) {           // premier envoi : ce code protège désormais le tableau
        if (!o.cle || String(o.cle).length < 6) return {ok: false, err: 'code'};
        props.setProperty('CLE', String(o.cle));
      }
      const err = controle(o.cle); if (err) return err;
      if (!o.copie || !o.copie.state) return {ok: false, err: 'copie vide'};
      ecrireCopie(o.annee || '', o.copie);
      ecrireOnglets(o.feuilles || []);
      lisezMoi(o.annee || '');
      return {ok: true};
    } finally {
      verrou.releaseLock();
    }
  });
}

function controle(cle) {
  const bonne = PropertiesService.getScriptProperties().getProperty('CLE');
  if (!bonne) return null;                       // tableau neuf : pas encore de code
  return String(cle || '') === bonne ? null : {ok: false, err: 'code'};
}

function repondre(f) {
  let r;
  try { r = f(); } catch (err) { r = {ok: false, err: String(err && err.message || err)}; }
  return ContentService.createTextOutput(JSON.stringify(r)).setMimeType(ContentService.MimeType.JSON);
}

/* ---------- Copie complète du carnet (onglet caché, découpée en morceaux) ---------- */
const nomCopie = annee => '_copie' + (annee ? ' ' + annee : '');

function lireCopie(annee) {
  const sh = SpreadsheetApp.getActive().getSheetByName(nomCopie(annee));
  if (!sh || sh.getLastRow() < 1) return null;
  const txt = sh.getRange(1, 1, sh.getLastRow(), 1).getValues().map(r => r[0]).join('');
  return txt ? JSON.parse(txt) : null;
}

function ecrireCopie(annee, copie) {
  const ss = SpreadsheetApp.getActive(), nom = nomCopie(annee);
  const sh = ss.getSheetByName(nom) || ss.insertSheet(nom);
  const txt = JSON.stringify(copie), lignes = [];
  for (let i = 0; i < txt.length; i += MORCEAU) lignes.push([txt.slice(i, i + MORCEAU)]);
  sh.clearContents();
  sh.getRange(1, 1, lignes.length, 1).setNumberFormat('@').setValues(lignes);
  sh.hideSheet();
}

/* ---------- Onglets lisibles (un par classe, « Prépas ») ---------- */
// Styles envoyés par le Carnet (mêmes numéros que l'export Excel)
const BLEU = '#1a4c9c', CLAIR = '#f1f5fb', GRIS = '#5a6a7c', ROUGE = '#c3312a';
const STYLES = {
  1: {gras: true, taille: 18, couleur: BLEU, texte: true},                              // titre
  2: {italique: true, taille: 10, couleur: GRIS, texte: true},                           // sous-titre
  3: {gras: true, taille: 10, couleur: '#ffffff', fond: BLEU, bord: true, centre: true, retour: true, texte: true}, // en-tête
  4: {bord: true, texte: true},                                                          // texte
  5: {fond: CLAIR, bord: true, texte: true},                                             // texte, ligne paire
  6: {bord: true, centre: true, nb: '0.0'},
  7: {fond: CLAIR, bord: true, centre: true, nb: '0.0'},
  8: {gras: true, fond: '#dce8f8', bord: true, centre: true, nb: '0.0'},                 // total
  9: {gras: true, couleur: ROUGE, fond: '#fadbd8', bord: true, centre: true, nb: '0.0'}, // total en échec
  10: {bord: true, centre: true, nb: '0'},
  11: {fond: CLAIR, bord: true, centre: true, nb: '0'},
  12: {gras: true, fond: '#e4eaf1', bord: true, texte: true},                            // moyenne (libellé)
  13: {gras: true, fond: '#e4eaf1', bord: true, centre: true, nb: '0.0'},                // moyenne
  14: {italique: true, taille: 10, couleur: GRIS, retour: true, haut: true, texte: true}, // note, commentaire
  15: {gras: true, taille: 10, couleur: BLEU, bas: true, centre: true, texte: true},     // groupe de colonnes
  16: {gras: true, couleur: ROUGE, bord: true, centre: true, nb: '0.0'},
  17: {gras: true, couleur: ROUGE, fond: CLAIR, bord: true, centre: true, nb: '0.0'}
};

function ecrireOnglets(feuilles) {
  const ss = SpreadsheetApp.getActive(), props = PropertiesService.getScriptProperties();
  const avant = JSON.parse(props.getProperty('ONGLETS') || '[]'), noms = [];
  feuilles.forEach(f => {
    const nom = nomOnglet(f.nom, noms); noms.push(nom);
    const sh = ss.getSheetByName(nom) || ss.insertSheet(nom);
    remplir(sh, f);
  });
  // Classes supprimées dans le Carnet : leur onglet disparaît aussi
  avant.filter(n => noms.indexOf(n) < 0).forEach(n => { const sh = ss.getSheetByName(n); if (sh && ss.getSheets().length > 1) ss.deleteSheet(sh); });
  props.setProperty('ONGLETS', JSON.stringify(noms));
  // Ordre : Lisez-moi, puis les onglets dans l'ordre du Carnet
  const lm = ss.getSheetByName(LISEZ);
  [lm ? LISEZ : null].concat(noms).filter(Boolean).forEach((n, i) => { const sh = ss.getSheetByName(n); if (sh) { ss.setActiveSheet(sh); ss.moveActiveSheet(i + 1); } });
  // La feuille vide du départ (« Feuille 1 », « Sheet1 ») n'est plus utile
  ss.getSheets().forEach(sh => { if (/^(Feuille|Sheet|Blad)\s?1$/i.test(sh.getName()) && sh.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(sh); });
}

function nomOnglet(nom, pris) {
  let n = String(nom || 'Classe').replace(/[\[\]*?:\/\\]/g, ' ').trim().slice(0, 90) || 'Classe';
  if (n === LISEZ || /^_copie/.test(n)) n += ' (classe)';
  let k = n, i = 2; while (pris.indexOf(k) >= 0) k = n + ' (' + i++ + ')';
  return k;
}

function remplir(sh, f) {
  const lignes = f.lignes || [], nbC = Math.max(1, ...lignes.map(l => (l.c || []).length), (f.largeurs || []).length);
  const nbL = Math.max(1, lignes.length);
  // On repart d'un onglet propre
  sh.getRange(1, 1, sh.getMaxRows(), sh.getMaxColumns()).breakApart();
  sh.clear(); sh.setFrozenRows(0);
  if (sh.getMaxRows() < nbL) sh.insertRowsAfter(sh.getMaxRows(), nbL - sh.getMaxRows());
  if (sh.getMaxColumns() < nbC) sh.insertColumnsAfter(sh.getMaxColumns(), nbC - sh.getMaxColumns());
  const valeurs = [], parStyle = {};
  lignes.forEach((l, r) => {
    const ligne = [];
    let debut = -1, st = 0;
    const fin = c => { if (st && debut >= 0) (parStyle[st] = parStyle[st] || []).push(a1(r, debut) + ':' + a1(r, c - 1)); };
    for (let c = 0; c < nbC; c++) {
      const x = (l.c || [])[c], v = x ? x[0] : null, s = x ? +x[1] || 0 : 0;
      ligne.push(v == null ? '' : typeof v === 'string' && /^[=+]/.test(v) ? "'" + v : v);
      if (s !== st) { fin(c); debut = c; st = s; }
    }
    fin(nbC);
    valeurs.push(ligne);
  });
  if (!valeurs.length) valeurs.push(new Array(nbC).fill(''));
  // Formats d'abord (texte reste texte, notes avec une décimale), puis les valeurs
  Object.keys(parStyle).forEach(k => { const S = STYLES[k]; if (S) formater(sh.getRangeList(parStyle[k]), S); });
  sh.getRange(1, 1, valeurs.length, nbC).setValues(valeurs);
  (f.fusions || []).forEach(m => { try { sh.getRange(m).merge(); } catch (e) {} });
  (f.largeurs || []).forEach((w, i) => { if (w) sh.setColumnWidth(i + 1, Math.round(w * 7 + 10)); });
  // Hauteurs : par paquets de lignes qui ont la même hauteur
  let i = 0;
  while (i < lignes.length) {
    const h = lignes[i].h || 0; let j = i; while (j + 1 < lignes.length && (lignes[j + 1].h || 0) === h) j++;
    if (h) sh.setRowHeights(i + 1, j - i + 1, Math.round(h * 4 / 3));
    i = j + 1;
  }
  if (f.figer) sh.setFrozenRows(f.figer);
}

function formater(rl, S) {
  if (S.nb) rl.setNumberFormat(S.nb); else if (S.texte) rl.setNumberFormat('@');
  if (S.gras) rl.setFontWeight('bold');
  if (S.italique) rl.setFontStyle('italic');
  if (S.taille) rl.setFontSize(S.taille);
  if (S.couleur) rl.setFontColor(S.couleur);
  if (S.fond) rl.setBackground(S.fond);
  if (S.centre) rl.setHorizontalAlignment('center');
  rl.setVerticalAlignment(S.haut ? 'top' : 'middle');
  if (S.retour) rl.setWrap(true);
  if (S.bord) rl.setBorder(true, true, true, true, true, true, '#c9d3df', SpreadsheetApp.BorderStyle.SOLID);
  if (S.bas) rl.setBorder(null, null, true, null, null, null, BLEU, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
}

function a1(r, c) {
  let s = '', n = c + 1;
  while (n) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); }
  return s + (r + 1);
}

/* ---------- Onglet « Lisez-moi » ---------- */
function lisezMoi(annee) {
  const ss = SpreadsheetApp.getActive(), sh = ss.getSheetByName(LISEZ) || ss.insertSheet(LISEZ, 0);
  const cle = PropertiesService.getScriptProperties().getProperty('CLE');
  const t = [
    ['Carnet EPS · sauvegarde automatique'],
    [''],
    ['Code du carnet : ' + cle],
    ['Ce code protège ta sauvegarde. Sur un nouveau téléphone ou un ordinateur : Carnet > Réglages > Sauvegarde > Google Drive, colle l\'adresse du script et ce code.'],
    [''],
    ['Dernier envoi : ' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm') + (annee ? ' (année ' + annee + ')' : '')],
    ['Un onglet par classe (les périodes à la suite, puis l\'année) et un onglet « Prépas ». Ils sont réécrits à chaque changement dans le Carnet : n\'y écris rien à la main.'],
    ['Pour une copie Excel : Fichier > Télécharger > Microsoft Excel.']
  ];
  sh.clear();
  sh.getRange(1, 1, t.length, 1).setNumberFormat('@').setValues(t).setWrap(true).setVerticalAlignment('top');
  sh.getRange('A1').setFontSize(16).setFontWeight('bold').setFontColor(BLEU);
  sh.getRange('A3').setFontSize(14).setFontWeight('bold');
  sh.setColumnWidth(1, 640);
}
