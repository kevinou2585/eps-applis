// Battle des profs : les 5 places du flipper (Dieu, Empereur, Roi, Bourreau, Garde). Fichier à part, à côté du script Koh-Lanta.
// À ajouter dans Apps Script : « + » > Script, nomme-le « Places », colle ce fichier. Puis 2 lignes dans le fichier principal :
//   dans doGet, juste après la ligne « if (e.parameter.action === 'jeu') … » :
//     if (e.parameter.action === 'places') return sortie(placesEtat(e.parameter.jeu));
//   dans doPost, juste après la ligne « if (o.action === 'jeu') … » :
//     if (o.action === 'places') return sortie(placesEnvoi(o));
// Règles (Kevin, 29/10/2026) : battre un boss = prendre sa place ; l'ancien occupant descend d'un cran, et ainsi de suite
// jusqu'à la première place libre (sinon la Garde sort). Le Dieu se prend seulement en battant aussi son record.
// Une place déjà à toi ne bouge pas (le Dieu qui rate son record reste Dieu). Plus de scores affichés : on garde le record du Dieu.
const PLACES = ['Dieu', 'Empereur', 'Roi', 'Bourreau', 'Garde'];

function ongletPlaces(jeu) {
  const nom = 'Places ' + String(jeu || 'jeu').replace(/[^a-z0-9-]/gi, '').slice(0, 40);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(nom);
  if (!sh) {
    sh = ss.insertSheet(nom);
    sh.getRange(1, 1, 1, 5).setValues([['Place', 'Nom', 'Roi/Reine', 'Photo', 'Depuis']]).setFontWeight('bold').setBackground('#12352b').setFontColor('#ffffff');
    sh.getRange(2, 1, PLACES.length, 1).setValues(PLACES.map(p => [p]));
    sh.getRange(PLACES.length + 2, 1, 1, 2).setValues([['Record du Dieu', 0]]);
    sh.setFrozenRows(1); sh.setColumnWidth(2, 160); sh.setColumnWidth(4, 120);
  }
  return sh;
}

function placesLire(sh) {
  const v = sh.getRange(2, 1, PLACES.length + 1, 5).getValues();
  const places = v.slice(0, PLACES.length).map(r => String(r[1]).trim() ? {
    nom: String(r[1]).trim(), genre: r[2] === 'F' || r[2] === 'H' ? r[2] : '',
    photo: String(r[3] || '').indexOf('data:image/') === 0 ? String(r[3]) : '',
    date: r[4] instanceof Date ? Utilities.formatDate(r[4], 'Europe/Brussels', 'dd/MM') : String(r[4] || '')
  } : null);
  return {places: places, record: Number(v[PLACES.length][1]) || 0};
}

function placesEcrire(sh, e) {
  sh.getRange(2, 2, PLACES.length, 4).setValues(e.places.map(p => p ? [p.nom, p.genre, p.photo, p.date] : ['', '', '', '']));
  sh.getRange(PLACES.length + 2, 2).setValue(e.record);
}

function placesEtat(jeu) {
  const e = placesLire(ongletPlaces(jeu));
  return {ok: true, places: e.places, record: e.record};
}

// nom prend la place i : chacun descend d'un cran jusqu'à la première place libre (sinon la Garde sort)
function placesPrendre(places, i, moi) {
  const meme = p => p && p.nom.toLowerCase() === moi.nom.toLowerCase();
  if (meme(places[i])) { // déjà à toi : rien ne bouge (nouvelle photo seulement si tu en as pris une)
    if (moi.photo) places[i] = Object.assign({}, places[i], {photo: moi.photo, genre: moi.genre || places[i].genre});
    return places;
  }
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
  if (place >= 0) placesPrendre(e.places, place, moi);
  placesEcrire(sh, e);
  ongletJeu(o.jeu).appendRow([new Date(), nom, score, '', moi.genre]); // journal de toutes les parties (sans photo)
  return {ok: true, places: e.places, record: e.record, place: place};
}
