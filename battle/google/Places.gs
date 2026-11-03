// Battle des profs : les 5 places du flipper (Dieu, Empereur, Roi, Bourreau, Garde). Fichier à part, à côté du script Koh-Lanta.
// À ajouter dans Apps Script : « + » > Script, nomme-le « Places », colle ce fichier. Puis 2 lignes dans le fichier principal :
//   dans doGet, juste après la ligne « if (e.parameter.action === 'jeu') … » :
//     if (e.parameter.action === 'places') return sortie(placesEtat(e.parameter.jeu));
//   dans doPost, juste après la ligne « if (o.action === 'jeu') … » :
//     if (o.action === 'places') return sortie(placesEnvoi(o));
//   et la ligne « if (o.action === 'jeu') … » devient : if (o.action === 'jeu') { const r = jeuScore(o); if (r.ok) statsNoter(o.jeu, o.nom, o.genre, o.score, -1); flipperRangerSur(o.jeu); return sortie(r); }
//   dans onOpen, avant la dernière ligne : SpreadsheetApp.getUi().createMenu('Flipper').addItem('Ranger l’onglet Flipper', 'flipperMenu').addToUi();
// Règles (Kevin, 29/10/2026) : battre un boss = prendre sa place ; l'ancien occupant descend d'un cran, et ainsi de suite
// jusqu'à la première place libre (sinon la Garde sort). Le Dieu se prend seulement en battant aussi son record.
// Une place déjà à toi ne bouge pas (le Dieu qui rate son record reste Dieu). Plus de scores affichés : on garde le record du Dieu.
// Kevin (01/11) : chaque fois qu'une place change de main, son palier monte de 100 points (colonne « Bonus ») : les boss montent doucement.
const MONTEE = 100;
const PLACES = ['Dieu', 'Empereur', 'Roi', 'Bourreau', 'Garde'];

function ongletPlaces(jeu) {
  const nom = 'Places ' + String(jeu || 'jeu').replace(/[^a-z0-9-]/gi, '').slice(0, 40);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(nom);
  if (!sh) {
    sh = ss.insertSheet(nom);
    sh.getRange(1, 1, 1, 6).setValues([['Place', 'Nom', 'Roi/Reine', 'Photo', 'Depuis', 'Bonus']]).setFontWeight('bold').setBackground('#12352b').setFontColor('#ffffff');
    sh.getRange(2, 1, PLACES.length, 1).setValues(PLACES.map(p => [p]));
    sh.getRange(PLACES.length + 2, 1, 1, 2).setValues([['Record du Dieu', 0]]);
    sh.setFrozenRows(1); sh.setColumnWidth(2, 160); sh.setColumnWidth(4, 120);
  }
  return sh;
}

function placesLire(sh) {
  const v = sh.getRange(2, 1, PLACES.length + 1, 6).getValues();
  const places = v.slice(0, PLACES.length).map(r => String(r[1]).trim() ? {
    nom: String(r[1]).trim(), genre: r[2] === 'F' || r[2] === 'H' ? r[2] : '',
    photo: String(r[3] || '').indexOf('data:image/') === 0 ? String(r[3]) : '',
    date: r[4] instanceof Date ? Utilities.formatDate(r[4], 'Europe/Brussels', 'dd/MM') : String(r[4] || '')
  } : null);
  return {places: places, record: Number(v[PLACES.length][1]) || 0, bonus: v.slice(0, PLACES.length).map(r => Math.max(0, Number(r[5]) || 0))};
}

function placesEcrire(sh, e) {
  sh.getRange(2, 2, PLACES.length, 4).setValues(e.places.map(p => p ? [p.nom, p.genre, p.photo, p.date] : ['', '', '', '']));
  sh.getRange(PLACES.length + 2, 2).setValue(e.record);
  sh.getRange(1, 6).setValue('Bonus');
  sh.getRange(2, 6, PLACES.length, 1).setValues(e.bonus.map(b => [b]));
}

function placesEtat(jeu) {
  const e = placesLire(ongletPlaces(jeu));
  return {ok: true, places: e.places, record: e.record, bonus: e.bonus};
}

// la place (0 Dieu … 4 Garde) la plus haute de ce nom, -1 s'il n'en a pas
function placeDe(places, nom) { const n = String(nom || '').trim().toLowerCase(); return places.findIndex(p => p && p.nom.toLowerCase() === n); }

// nom prend la place i : chacun descend d'un cran jusqu'à la première place libre (sinon la Garde sort)
function placesPrendre(places, i, moi) {
  const meme = p => p && p.nom.toLowerCase() === moi.nom.toLowerCase();
  const deja = placeDe(places, moi.nom);
  if (deja >= 0 && deja <= i) { // déjà à toi (ou mieux) : rien ne bouge (nouvelle photo seulement si c'est cette place-là)
    if (deja === i && moi.photo) places[i] = Object.assign({}, places[i], {photo: moi.photo, genre: moi.genre || places[i].genre});
    return places;
  }
  // Kevin (02/11) : une personne n'a qu'UNE place, la plus haute. Tu montes : ta place d'avant se libère,
  // et les autres ne descendent que jusque-là (ceux qui sont en dessous ne bougent pas).
  if (deja > i) places[deja] = null;
  let libre = places.indexOf(null, i); if (libre < 0) libre = places.length - 1;
  for (let j = libre; j > i; j--) places[j] = places[j - 1];
  places[i] = moi;
  return places;
}

// (appelé depuis doPost, qui tient déjà le verrou) o = {jeu, nom, score, photo, genre, place : 0 Dieu … 4 Garde}
function placesEnvoi(o) {
  const nom = String(o.nom || '').trim().slice(0, 24), score = Math.floor(Number(o.score) || 0), i = Math.floor(Number(o.place));
  if (!nom || score <= 0 || score > 100000000 || !(i >= 0 && i < PLACES.length)) return {ok: false, err: 'place'};
  let photo = String(o.photo || '');
  if (photo.indexOf('data:image/jpeg;base64,') !== 0 || photo.length > 48000) photo = '';
  const moi = {nom: nom, genre: o.genre === 'F' || o.genre === 'H' ? o.genre : '', photo: photo,
    date: Utilities.formatDate(new Date(), 'Europe/Brussels', 'dd/MM')};
  const sh = ongletPlaces(o.jeu), e = placesLire(sh);
  let place = i;
  if (i === 0) { // le Dieu : il faut aussi battre son record
    const dieu = e.places[0], estDieu = dieu && dieu.nom.toLowerCase() === nom.toLowerCase();
    if (score > e.record) e.record = score;
    else place = estDieu ? -1 : 1; // record raté : le Dieu reste Dieu (rien ne bouge), les autres deviennent Empereur
  }
  const deja = placeDe(e.places, nom);
  if (place >= 0 && deja >= 0 && deja < place) place = -2; // Kevin (02/11) : tu as déjà mieux, tu gardes ta place la plus haute, rien ne bouge
  if (place >= 0) { const avant = e.places[place]; placesPrendre(e.places, place, moi); if (e.places[place] !== avant && !(avant && avant.nom.toLowerCase() === nom.toLowerCase())) e.bonus[place] += MONTEE; }
  placesEcrire(sh, e);
  statsNoter(o.jeu, nom, moi.genre, score, place >= 0 && deja !== place ? place : -1); // stats : un titre compte seulement s'il est NOUVEAU (pas déjà à toi)
  ongletJeu(o.jeu).appendRow([new Date(), nom, score, '', moi.genre, place >= 0 ? PLACES[place] : place === -2 ? 'garde ' + PLACES[deja] : 'reste Dieu']); // journal de toutes les parties (sans photo)
  flipperRangerSur(o.jeu);
  return {ok: true, places: e.places, record: e.record, bonus: e.bonus, place: place};
}

// ---------- Stats de tous les joueurs (Kevin, 03/11/2026) ----------
// Tout joueur qui envoie une partie entre dans l'onglet caché « Stats joueurs » (une ligne par prénom).
// On compte combien de fois il est DEVENU Garde, Bourreau, Roi, Empereur ou Dieu en battant un boss.
// Être battu et descendre ne compte pas ; une partie qui ne lui donne pas de nouveau titre ne compte pas non plus.
// Les stats démarrent le jour où ce script est collé (pas de reprise des anciennes parties) et survivent aux remises à zéro du classement.
const ONGLET_STATS = 'Stats joueurs';
const STATS_COLS = ['Nom', 'Roi/Reine', 'Parties', 'Meilleur score', 'Garde', 'Bourreau', 'Roi', 'Empereur', 'Dieu', 'Dernier titre', 'Le'];
const TITRES = [['Dieu', 'Déesse'], ['Empereur', 'Impératrice'], ['Roi', 'Reine'], ['Bourreau', 'Sorcière'], ['Garde', 'Garde']];

function ongletStats() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(ONGLET_STATS);
  if (!sh) {
    sh = ss.insertSheet(ONGLET_STATS);
    sh.getRange(1, 1, 1, STATS_COLS.length).setValues([STATS_COLS]).setFontWeight('bold').setBackground('#12352b').setFontColor('#ffffff');
    sh.setFrozenRows(1);
    sh.hideSheet();
  }
  return sh;
}

function statsLire(sh) {
  return sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, STATS_COLS.length).getValues() : [];
}

// devenu : 0 Dieu … 4 Garde quand ce joueur vient de prendre une NOUVELLE place, -1 sinon. Une erreur ici ne bloque jamais l'envoi.
function statsNoter(jeu, nom, genre, score, devenu) {
  try {
    if (/-(cache|dieu)$/.test(String(jeu || ''))) return; // anciens classements secrets : pas de stats
    nom = String(nom || '').trim().replace(/\s+/g, ' ').slice(0, 24); score = Math.floor(Number(score) || 0);
    if (!nom) return;
    const sh = ongletStats(), v = statsLire(sh);
    let i = v.findIndex(r => String(r[0]).trim().toLowerCase() === nom.toLowerCase());
    const r = i >= 0 ? v[i] : [nom, '', 0, 0, 0, 0, 0, 0, 0, '', ''];
    if (genre === 'F' || genre === 'H') r[1] = genre;
    r[2] = (Number(r[2]) || 0) + 1;
    r[3] = Math.max(Number(r[3]) || 0, score);
    if (devenu >= 0 && devenu < PLACES.length) {
      const col = 8 - devenu; // Dieu → colonne 8 (index), Garde → 4
      r[col] = (Number(r[col]) || 0) + 1;
      r[9] = TITRES[devenu][r[1] === 'F' ? 1 : 0];
      r[10] = new Date();
    }
    if (i < 0) { sh.appendRow(r); return; }
    sh.getRange(i + 2, 1, 1, STATS_COLS.length).setValues([r]);
  } catch (err) { console.error(err); }
}

// ---------- Onglet « Flipper » : tout le flipper sur un seul onglet propre (Kevin, 29/10/2026) ----------
// Seulement le top 5 actuel et tous ceux qui ont déjà été Dieu. Réécrit à chaque partie envoyée. Les onglets de données (« Jeu … », « Places … ») restent, mais cachés :
// l'appli en a besoin. Menu Flipper › Ranger l'onglet Flipper pour le refaire à la main.
const ONGLET_FLIPPER = 'Flipper';
const F_VERT = '#12352b', F_OR = '#ffd23f', F_CLAIR = '#f3f6f4';

function flipperRangerSur(jeu) { // appelé après chaque envoi ; une erreur ici ne bloque jamais l'envoi
  try {
    if (jeu && !/-(cache|dieu)$/.test(jeu)) PropertiesService.getScriptProperties().setProperty('FLIPPER_JEU', String(jeu));
    flipperRanger();
  } catch (err) { console.error(err); }
}

function flipperMenu() { // menu Flipper › Ranger l'onglet Flipper : dit ce qui se passe
  const ui = SpreadsheetApp.getUi();
  try { const sh = flipperRanger(); SpreadsheetApp.getActiveSpreadsheet().setActiveSheet(sh); ui.alert('C’est rangé : tout le flipper est dans l’onglet « Flipper ».'); }
  catch (err) { ui.alert('Erreur : ' + (err && err.message || err) + '\n\nFais une capture et envoie-la à Claude.'); }
}

function flipperRanger() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let jeu = PropertiesService.getScriptProperties().getProperty('FLIPPER_JEU');
  const onglets = ss.getSheets().filter(s => /^(Jeu|Places) /.test(s.getName()));
  if (!jeu) { const p = onglets.filter(s => /^Places /.test(s.getName())).pop(); jeu = p ? p.getName().slice(7) : ''; }
  let sh = ss.getSheetByName(ONGLET_FLIPPER);
  if (!sh) sh = ss.insertSheet(ONGLET_FLIPPER);
  sh.clear(); sh.setHiddenGridlines(true);
  const lignes = [], styles = []; // styles : [ligne, type]
  const L = 10; // colonnes (le tableau des stats est le plus large)
  const ajoute = (vals, type) => { lignes.push(vals.concat(Array(L).fill('')).slice(0, L)); if (type) styles.push([lignes.length, type]); };
  ajoute(['🎯 Battle des profs — le flipper'], 'titre');
  ajoute(['Mis à jour le ' + Utilities.formatDate(new Date(), 'Europe/Brussels', 'dd/MM/yyyy à HH:mm')], 'note');
  ajoute([]);
  // 1. le top 5 actuel : les 5 places
  ajoute(['👑 LE TOP 5 ACTUEL'], 'section');
  ajoute(['Place', 'Titre', 'Nom', 'Depuis', ''], 'entete');
  const e = jeu && ss.getSheetByName('Places ' + jeu) ? placesLire(ss.getSheetByName('Places ' + jeu)) : {places: [null, null, null, null, null], record: 0};
  const RANGS = ['⚡ 1', '💀 2', '👑 3', '🪓 4', '🛡 5'];
  e.places.forEach((p, i) => ajoute([RANGS[i], TITRES[i][p && p.genre === 'F' ? 1 : 0], p ? p.nom : '— personne —', p ? p.date : '', ''], 'place'));
  ajoute(['', 'Record du Dieu', e.record ? e.record : '—', '', ''], 'record');
  ajoute([]);
  // 2. tous ceux qui ont déjà été Dieu (le plus récent d'abord) : les dieux de l'ancien classement caché (« … -dieu ») et ceux d'aujourd'hui
  const dieux = [];
  onglets.filter(s => /^Jeu /.test(s.getName())).forEach(s => {
    const ancien = /-dieu$/.test(s.getName()); if (!ancien && s.getLastColumn() < 6) return;
    const v = s.getLastRow() > 1 ? s.getRange(2, 1, s.getLastRow() - 1, 6).getValues() : [];
    v.forEach(r => { if (String(r[1]).trim() && (ancien || r[5] === 'Dieu')) dieux.push(r); });
  });
  dieux.sort((a, b) => (b[0] instanceof Date ? b[0].getTime() : 0) - (a[0] instanceof Date ? a[0].getTime() : 0));
  ajoute(['⚡ TOUS CEUX QUI ONT DÉJÀ ÉTÉ DIEU'], 'section');
  ajoute(['Date', 'Nom', 'Record', '', ''], 'entete');
  dieux.forEach(r => ajoute([r[0] instanceof Date ? Utilities.formatDate(r[0], 'Europe/Brussels', 'dd/MM/yyyy') : r[0], String(r[1]).trim(), Number(r[2]) || 0, '', ''], 'partie'));
  if (!dieux.length) ajoute(['Personne pour l’instant'], 'note');
  ajoute([]);
  // 3. Kevin (03/11) : les stats de tous les joueurs (onglet caché « Stats joueurs ») : combien de fois chacun est DEVENU Dieu, Empereur…
  const stats = statsLire(ongletStats()).filter(r => String(r[0]).trim());
  const nb = r => [8, 7, 6, 5, 4].map(c => Number(r[c]) || 0);
  stats.sort((a, b) => { const x = nb(a), y = nb(b); for (let k = 0; k < 5; k++) if (x[k] !== y[k]) return y[k] - x[k]; return (Number(b[2]) || 0) - (Number(a[2]) || 0); });
  ajoute(['📊 LES STATS DE TOUS LES JOUEURS (depuis le 03/11/2026)'], 'section');
  ajoute(['Nom', 'Parties', 'Meilleur score', '⚡ Dieu', '💀 Empereur', '👑 Roi', '🪓 Bourreau', '🛡 Garde', 'Dernier titre', 'Le'], 'entete');
  stats.forEach(r => ajoute([String(r[0]).trim(), Number(r[2]) || 0, Number(r[3]) || 0].concat(nb(r).map(n => n || '')).concat([r[9] || '', r[10] instanceof Date ? Utilities.formatDate(r[10], 'Europe/Brussels', 'dd/MM/yyyy') : r[10] || '']), 'stat'));
  if (!stats.length) ajoute(['Personne pour l’instant : chaque partie envoyée ajoute son joueur ici.'], 'note');
  ajoute(['Un titre compte quand le joueur le PREND en battant un boss. Être battu ou refaire moins bien ne compte pas.'], 'note');
  sh.getRange(1, 1, lignes.length, L).setValues(lignes);
  // mise en forme
  sh.setColumnWidth(1, 150); sh.setColumnWidth(2, 150); sh.setColumnWidth(3, 170); sh.setColumnWidth(4, 130); sh.setColumnWidth(5, 110);
  [6, 7, 8].forEach(c => sh.setColumnWidth(c, 100)); sh.setColumnWidth(9, 130); sh.setColumnWidth(10, 100);
  sh.getRange(1, 1, lignes.length, L).setFontFamily('Arial').setFontSize(11).setVerticalAlignment('middle');
  sh.getRange(1, 3, lignes.length, 1).setNumberFormat('#,##0');
  styles.forEach(([l, t]) => {
    const r = sh.getRange(l, 1, 1, L);
    if (t === 'titre') { r.merge().setFontSize(18).setFontWeight('bold').setFontColor(F_VERT); sh.setRowHeight(l, 34); }
    else if (t === 'note') r.merge().setFontColor('#777777').setFontStyle('italic');
    else if (t === 'section') { r.merge().setBackground(F_VERT).setFontColor('#ffffff').setFontWeight('bold').setFontSize(12); sh.setRowHeight(l, 28); }
    else if (t === 'entete') r.setBackground('#dfe8e3').setFontWeight('bold');
    else if (t === 'place') r.setBackground(l % 2 ? '#ffffff' : F_CLAIR).setBorder(null, null, true, null, null, null);
    else if (t === 'record') { r.setBackground('#fff4c2').setFontWeight('bold'); }
    else if (t === 'partie') r.setBackground(l % 2 ? '#ffffff' : F_CLAIR);
    else if (t === 'stat') { r.setBackground(l % 2 ? '#ffffff' : F_CLAIR); sh.getRange(l, 1).setFontWeight('bold'); sh.getRange(l, 4, 1, 5).setHorizontalAlignment('center'); }
  });
  sh.setFrozenRows(0);
  // l'onglet Flipper juste après ceux de Koh-Lanta ; les onglets de données cachés
  onglets.forEach(s => { if (!s.isSheetHidden()) s.hideSheet(); });
  if (sh.isSheetHidden()) sh.showSheet();
  return sh;
}
