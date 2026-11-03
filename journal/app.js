/* ====== Journal de l'école (kevin, 3 nov. 2026) ======
   Appli à part (installable sur téléphone et ordinateur) + tuile dans EPS ultime, fermée par un code (kevin : erasmus…, empreinte dans CODE_SHA).
   Équipe : 3-4 élèves (16-18 ans) et 2 profs (directeur de la publication / rédacteur en chef, qui valident).
   Onglets : Accueil, Agenda (réunions + réponses), Articles (éditeur avec mise en forme, photo, relecture), Idées (post-it + votes),
   Journal (numéros de 1 à 8 pages A4, recto-verso ou non, gabarits, propositions automatiques, mise en page libre (editeur.js), impression). Équipe : bouton 👥 en haut.
   Données partagées : un Google Sheet de kevin (script journal/google/Journal.gs, URL dans SCRIPT ci-dessous).
   Chaque chose = un « élément » {id, t: type, maj, par, x: supprimé, …}. Le plus récent gagne.
   Types : membre, reunion, rep (réponse à une réunion), article, img (photo d'un article), idee, vote, com (commentaire ; g:'fil' = sujet de discussion, g:'msg' = message), numero.
   Sur l'appareil : IndexedDB « journal » (+ localStorage journal-*). Sans SCRIPT : tout reste sur l'appareil. */
(() => {
  const SCRIPT = 'https://script.google.com/macros/s/AKfycbxk86bSVBC3IYBwXpt84hI52JfO_HoT_vyq8GzSGUfi27PQ_yAjDTlp6F1TUckt8_HPWQ/exec'; // script « Journal de l'école » de kevin (journal/google/Journal.gs), déployé le 03/11/2026
  const CODE_SHA = '58abc04d89961eb778a3fb1978a52628f875af97b3dbc7d740a9eb6c6658de6f'; // empreinte du code de l'appli (kevin, 03/11 : erasmus…), en minuscules

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const LS = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; } };
  const SS = (k, v) => { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } };
  const uid = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const JOURS = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
  const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const dIso = s => { const m = /^(\d{4})-(\d\d)-(\d\d)$/.exec(s || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
  const auj = () => iso(new Date());
  const dateJolie = s => { const d = dIso(s); return d ? `${JOURS[d.getDay()]} ${d.getDate()} ${MOIS[d.getMonth()]}` : ''; };
  const ilya = ms => { const s = (Date.now() - ms) / 1000; if (s < 60) return 'à l\'instant'; if (s < 3600) return `il y a ${Math.round(s / 60)} min`;
    if (s < 86400) return `il y a ${Math.round(s / 3600)} h`; const d = new Date(ms); return `le ${d.getDate()} ${MOIS[d.getMonth()]}`; };
  const joursAvant = s => { const d = dIso(s); if (!d) return null; return Math.round((d - dIso(auj())) / 86400000); };
  function toast(t) { const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 2600); }

  /* ---------- rôles d'un vrai journal (kevin) ---------- */
  const ROLES = [
    {id: 'directeur', nom: 'Directeur de la publication', ic: '🎩', chef: 1, fait: 'Responsable du journal : il a le dernier mot sur ce qui est publié.'},
    {id: 'redac-chef', nom: 'Rédacteur en chef', ic: '⭐', chef: 1, fait: 'Dirige l\'équipe, choisit les sujets, valide les articles et la maquette.'},
    {id: 'secretaire', nom: 'Secrétaire de rédaction', ic: '📋', fait: 'Organise : réunions, délais, relance ceux qui sont en retard, vérifie que tout arrive.'},
    {id: 'journaliste', nom: 'Journaliste', ic: '✍️', fait: 'Enquête, interviewe et écrit les articles.'},
    {id: 'photographe', nom: 'Photographe', ic: '📷', fait: 'Prend les photos (avec l\'accord des personnes photographiées).'},
    {id: 'maquettiste', nom: 'Maquettiste', ic: '📐', fait: 'Met en page : place les articles, les photos et les dessins sur les pages.'},
    {id: 'correcteur', nom: 'Correcteur', ic: '🔍', fait: 'Relit les articles : orthographe, grammaire, clarté.'},
    {id: 'illustrateur', nom: 'Illustrateur', ic: '🎨', fait: 'Dessins, caricatures, BD, jeux et mots croisés.'}
  ];
  const ROLE = {}; ROLES.forEach(r => { ROLE[r.id] = r; });
  const roleNom = id => (ROLE[id] || ROLE.journaliste).nom;
  const RUBRIQUES = ['Vie de l\'école', 'Actualité', 'Sport', 'Culture', 'Interview', 'Portrait', 'Opinion', 'Sciences', 'Voyage', 'Édito', 'Brève', 'Détente / jeux', 'Courrier des lecteurs'];
  const CATS = [['sujet', 'Sujet d\'article', '#fef08a'], ['interview', 'Interview', '#bbf7d0'], ['photo', 'Photo / reportage', '#bfdbfe'],
    ['jeu', 'Jeu / détente', '#fbcfe8'], ['rubrique', 'Nouvelle rubrique', '#ddd6fe'], ['nom', 'Nom du journal', '#fed7aa'], ['autre', 'Autre', '#e7e5e4']];
  const CAT = {}; CATS.forEach(c => { CAT[c[0]] = c; });
  const ETATS = {brouillon: 'Brouillon', relire: 'À relire', valide: 'Validé'};
  const COULEURS = ['#0f766e', '#b45309', '#7c3aed', '#1d4ed8', '#be123c', '#15803d', '#a21caf', '#0369a1'];

  /* ---------- données ---------- */
  const items = {};
  const DB = (() => {
    let p = null;
    const ouvrir = () => p || (p = new Promise((ok, ko) => {
      try { const r = indexedDB.open('journal', 1); r.onupgradeneeded = () => r.result.createObjectStore('items', {keyPath: 'id'});
        r.onsuccess = () => ok(r.result); r.onerror = () => ko(r.error); } catch (e) { ko(e); }
    }));
    return {
      tout: () => ouvrir().then(db => new Promise(ok => { const q = db.transaction('items').objectStore('items').getAll(); q.onsuccess = () => ok(q.result || []); q.onerror = () => ok([]); })).catch(() => []),
      mettre: its => ouvrir().then(db => new Promise(ok => { const tx = db.transaction('items', 'readwrite'); its.forEach(i => tx.objectStore('items').put(i)); tx.oncomplete = ok; tx.onerror = ok; })).catch(() => {})
    };
  })();
  // brouillon privé (kevin, 03/11) : un article « prive » n'est visible que par son auteur, jusqu'à ce qu'il le rende visible
  const cache = i => i.prive && i.par !== moiId;
  const liste = t => Object.values(items).filter(i => i.t === t && !i.x && !cache(i));
  let file = []; try { file = JSON.parse(LS('journal-file') || '[]'); } catch (e) {}
  const garderFile = () => LS('journal-file', JSON.stringify(file));
  let moiId = LS('journal-moi') || '';
  const moi = () => items[moiId] || null;
  /* accès à la carte (kevin, 03/11 soir) : chaque membre a un ou plusieurs rôles (m.roles) et des accès (m.acces, sinon ceux de ses rôles) */
  const ACCES = [
    ['ecrire', '✍️ Écrire des articles'], ['corriger', '🔍 Modifier les articles des autres (relecture, corrections)'],
    ['valider', '✅ Valider les articles pour le journal'], ['maquette', '📐 Faire la mise en page'], ['imprimer', '🖨️ Imprimer le journal'],
    ['agenda', '📅 Proposer des réunions'], ['idees', '💡 Épingler des idées'], ['numeros', '📰 Créer les numéros, boucler, archiver'],
    ['supprimer', '🗑 Supprimer ce que les autres ont fait'], ['equipe', '👥 Gérer l\'équipe : rôles et accès']];
  const ACC = {}; ACCES.forEach(a => { ACC[a[0]] = a[1]; });
  const PAR_ROLE = {
    directeur: ACCES.map(a => a[0]), 'redac-chef': ACCES.map(a => a[0]),
    secretaire: ['ecrire', 'corriger', 'agenda', 'idees', 'imprimer'], journaliste: ['ecrire', 'agenda', 'idees'],
    photographe: ['ecrire', 'agenda', 'idees'], maquettiste: ['maquette', 'imprimer', 'agenda', 'idees'],
    correcteur: ['ecrire', 'corriger', 'agenda', 'idees'], illustrateur: ['ecrire', 'maquette', 'agenda', 'idees']};
  const rolesDe = m => !m ? [] : Array.isArray(m.roles) && m.roles.length ? m.roles : [m.role || 'journaliste'];
  const accesSelonRoles = roles => ACCES.map(a => a[0]).filter(k => roles.some(r => (PAR_ROLE[r] || []).includes(k)));
  const accesDe = m => !m ? [] : Array.isArray(m.acces) ? m.acces : accesSelonRoles(rolesDe(m));
  const rolesTxt = m => rolesDe(m).map(r => (ROLE[r] || ROLE.journaliste).ic + ' ' + roleNom(r)).join(' · ');
  const oblige = (k, f) => peut(k) ? f() : toast('👀 Il te faut l\'accès « ' + ACC[k].replace(/^\S+ /, '') + ' » : demande-le à la rédaction en chef');
  const estProf = m => rolesDe(m).some(r => ROLE[r] && ROLE[r].chef);
  // personne ne gère encore l'équipe : le prof qui vient d'EPS ultime peut tout (pour ne jamais rester bloqué)
  const peut = k => { const m = moi(); if (accesDe(m).includes(k)) return true; return k === 'equipe' && depuisEps && !liste('membre').some(y => accesDe(y).includes('equipe')); };
  const nomDe = id => (items[id] && items[id].nom) || '?';
  const couleurDe = id => COULEURS[Math.abs([...String(id)].reduce((s, c) => s * 31 + c.charCodeAt(0) | 0, 7)) % COULEURS.length];
  const avatar = id => `<span class="av" style="background:${couleurDe(id)}">${esc((nomDe(id)[0] || '?').toUpperCase())}</span>`;

  function sauver(it, silencieux) {
    it.maj = Math.max(Date.now(), (it.maj || 0) + 1);
    if (!it.par) it.par = moiId;
    items[it.id] = it;
    DB.mettre([it]);
    if (!file.includes(it.id)) { file.push(it.id); garderFile(); }
    planifier();
    if (!silencieux) rendre();
    return it;
  }
  function supprimer(it) { it.x = 1; if (it.t === 'article' && it.img && items[it.img]) sauver(Object.assign(items[it.img], {d: '', x: 1}), true); sauver(it); }

  /* ---------- synchro avec le Google Sheet ---------- */
  let enCours = false, derSync = 0, minuteur = null, depuis = +LS('journal-depuis') || 0, etatSync = '';
  const planifier = () => { clearTimeout(minuteur); minuteur = setTimeout(synchro, 1500); };
  function montrerSync(e) {
    etatSync = e;
    const p = $('sync'); if (!p) return;
    const t = {local: ['Sur cet appareil', 'att'], hors: ['Hors ligne', 'att'], envoi: ['⟳ …', ''], ok: ['✓ À jour', ''], err: ['⚠️ Pas envoyé', 'ko'], code: ['⚠️ Code', 'ko']}[e] || ['…', ''];
    p.textContent = file.length && e !== 'envoi' ? (e === 'ok' ? '⟳ …' : t[0] + ` (${file.length})`) : t[0];
    p.className = 'pastille ' + t[1];
  }
  async function synchro() {
    derSync = Date.now();
    if (!SCRIPT) { montrerSync('local'); return; }
    if (enCours) { planifier(); return; }
    if (!navigator.onLine) { montrerSync('hors'); return; }
    enCours = true; montrerSync('envoi');
    const code = LS('journal-code') || '';
    try {
      for (let tour = 0; file.length && tour < 30; tour++) {
        const lot = []; let taille = 0;
        for (const id of file) {
          const it = items[id]; if (!it) continue;
          const s = JSON.stringify(it).length;
          if (lot.length && (taille + s > 2500000 || lot.length >= 120)) break;
          lot.push(it); taille += s;
        }
        if (!lot.length) { file = []; break; }
        const r = await (await fetch(SCRIPT, {method: 'POST', headers: {'Content-Type': 'text/plain;charset=utf-8'}, body: JSON.stringify({code, items: lot})})).json();
        if (!r || !r.ok) throw new Error(r && r.err === 'code' ? 'code' : 'envoi');
        const partis = {}; lot.forEach(i => { partis[i.id] = i.maj; });
        file = file.filter(id => !(id in partis) || (items[id] && items[id].maj !== partis[id])); garderFile();
      }
      const r = await (await fetch(`${SCRIPT}?code=${encodeURIComponent(code)}&depuis=${depuis}`)).json();
      if (!r || !r.ok) throw new Error(r && r.err === 'code' ? 'code' : 'lecture');
      const changes = [];
      (r.items || []).forEach(it => {
        if (!it || !it.id) return;
        const loc = items[it.id];
        if (loc && (loc.maj || 0) > (it.maj || 0)) return;
        if (loc && loc.maj === it.maj) return;
        items[it.id] = it; changes.push(it);
      });
      if (changes.length) { await DB.mettre(changes); apresReception(changes); }
      depuis = Math.max(0, (Number(r.t) || 0) - 120000); LS('journal-depuis', String(depuis));
      montrerSync(file.length ? 'envoi' : 'ok');
      if ($('chat-liste') && !changes.length) majFil(); // l'horloge 🕓 des messages envoyés disparaît
      if (file.length) planifier();
    } catch (e) {
      montrerSync(e.message === 'code' ? 'code' : 'err');
    } finally { enCours = false; }
  }
  function apresReception(changes) {
    const ed = edition && items[edition.id];
    if (ed && changes.some(c => c.id === edition.id && c.par !== moiId)) toast(`⚠️ ${nomDe(ed.par)} vient aussi de modifier cet article`);
    alerter(changes);
    if (!$('app').hidden && vue === 'messages' && $('chat-liste')) majFil();
    else if (!$('app').hidden && $('vue-editeur').hidden && $('feuille').hidden && !(window.EditeurMEP && EditeurMEP.ouvert())) rendre();
    else if (!$('app').hidden) majBulles();
  }
  // messages : toutes les 10 s dans une discussion ouverte, 45 s ailleurs, 2 min quand l'appli est en arrière-plan (ordinateur)
  const synchroDatee = () => synchro();
  setInterval(() => {
    if ($('app').hidden) return;
    const att = document.visibilityState !== 'visible' ? 120000 : vue === 'messages' && filOuvert ? 10000 : 45000;
    if (Date.now() - derSync >= att) synchroDatee();
  }, 5000);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && !$('app').hidden) synchro(); });
  addEventListener('online', () => synchro());

  /* ---------- texte des articles : seulement une mise en forme simple et sûre ---------- */
  function propre(html) {
    const doc = new DOMParser().parseFromString('<div>' + (html || '') + '</div>', 'text/html');
    const OK = {B: 1, STRONG: 1, I: 1, EM: 1, U: 1, H3: 1, BLOCKQUOTE: 1, UL: 1, OL: 1, LI: 1, P: 1, BR: 1, DIV: 1};
    const nettoyer = n => {
      [...n.childNodes].forEach(c => {
        if (c.nodeType === 3) return;
        if (c.nodeType !== 1) { c.remove(); return; }
        if (/^(SCRIPT|STYLE|IFRAME|OBJECT|EMBED|IMG|SVG|MATH|VIDEO|AUDIO|LINK|META|TITLE|HEAD|FORM|INPUT|BUTTON|TEXTAREA|SELECT)$/.test(c.tagName)) { c.remove(); return; }
        nettoyer(c);
        if (/^H[1-6]$/.test(c.tagName) && c.tagName !== 'H3') { const h = doc.createElement('h3'); h.append(...c.childNodes); c.replaceWith(h); return; }
        if (!OK[c.tagName]) { c.replaceWith(...c.childNodes); return; }
        [...c.attributes].forEach(a => c.removeAttribute(a.name));
      });
    };
    const racine = doc.body.firstChild; nettoyer(racine);
    return racine.innerHTML;
  }
  const texteDe = html => { const d = new DOMParser().parseFromString('<div>' + (html || '') + '</div>', 'text/html'); return (d.body.textContent || '').trim(); };
  const motsDe = a => { const t = (texteDe(a.corps) + ' ' + (a.chapeau || '')).trim(); return t ? t.split(/\s+/).length : 0; };
  const place = n => n <= 0 ? 'vide' : n <= 140 ? 'brève (⅛ de page)' : n <= 280 ? '¼ de page' : n <= 520 ? '½ page' : n <= 800 ? '¾ de page' : n <= 1050 ? '1 page' : 'plus d\'une page : à couper';

  /* ---------- écrans d'entrée : installer, code, prénom ---------- */
  const enAppli = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  if (/[?&]eps\b/.test(location.search)) SS('journal-eps', '1');
  { const f = new URLSearchParams(location.search).get('fil'); if (f) { SS('journal-vue', 'messages'); SS('journal-fil', f); } }
  const depuisEps = SS('journal-eps') === '1';
  const ecrans = ['ecran-install', 'ecran-code', 'ecran-nom', 'ecran-pin', 'app'];
  const montrer = id => ecrans.forEach(e => { $(e).hidden = e !== id; });
  const sha = async t => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)))].map(b => b.toString(16).padStart(2, '0')).join('');

  function entrer() {
    if (LS('journal-ok') !== '1') {
      if (!enAppli() && !depuisEps && SS('journal-sans') !== '1') return montrer('ecran-install');
      montrer('ecran-code'); setTimeout(() => $('code').focus(), 200); return;
    }
    if (!moi() || moi().x) { montrer('ecran-nom'); setTimeout(() => $('nom').focus(), 200); return; }
    if (!moi().pin) { montrer('ecran-pin'); setTimeout(() => $('pin1').focus(), 200); return; } // code personnel obligatoire (kevin, 03/11)
    montrer('app'); $('retour-eps').hidden = !depuisEps;
    const ici = SS('journal-vue'); aller(ici && VUES[ici] ? ici : 'accueil');
    synchro();
  }
  const JI = window.JournalInstall;
  $('bt-inst-tel').onclick = () => JI.lancer('tel');
  $('bt-inst-pc').onclick = () => JI.lancer('pc');
  $('bt-sans').onclick = () => { SS('journal-sans', '1'); entrer(); };
  $('f-code').onsubmit = async e => {
    e.preventDefault();
    const c = $('code').value.trim().toLowerCase(); // majuscules ou minuscules, peu importe
    if (await sha(c) !== CODE_SHA) { $('code-err').textContent = 'Ce n\'est pas le bon code.'; $('code').select(); return; }
    LS('journal-ok', '1'); LS('journal-code', c); $('code-err').textContent = '';
    await synchro(); entrer();
  };
  // code personnel (kevin, 03/11) : chacun en crée un à la première connexion ; avec son prénom, il permet de retrouver son profil
  // (articles, rôles, accès) sur un autre appareil, et empêche de prendre le profil de quelqu'un d'autre. Seule l'empreinte est gardée.
  const empreintePin = (id, pin) => sha('journal-pin:' + id + ':' + pin.trim().toLowerCase());
  $('f-nom').onsubmit = async e => {
    e.preventDefault();
    const n = $('nom').value.trim().replace(/\s+/g, ' '), pin = $('pin').value.trim();
    if (n.length < 2) { $('nom-err').textContent = 'Écris ton prénom.'; return; }
    await synchro(); // pour connaître les profils déjà créés sur les autres appareils
    // déjà dans l'équipe (même prénom) ? on reprend sa fiche (nouvel appareil), avec son code personnel
    const meme = liste('membre').find(m => m.nom.toLowerCase() === n.toLowerCase());
    if (meme && meme.pin) {
      if (!pin) { $('nom-err').textContent = `${meme.nom} est déjà dans l'équipe. Si c'est toi, tape ton code personnel.`; $('pin').focus(); return; }
      if (await empreintePin(meme.id, pin) !== meme.pin) { $('nom-err').textContent = 'Ce n\'est pas le bon code personnel. Oublié ? Demande à la rédaction en chef de l\'effacer (👥 Équipe).'; $('pin').select(); return; }
      moiId = meme.id;
    } else if (meme) {
      if (!confirm(`${meme.nom} (${rolesTxt(meme)}) est déjà dans l'équipe. C'est toi ?`)) { $('nom-err').textContent = 'Ce prénom est déjà pris : ajoute l\'initiale de ton nom (ex. : Lina B.).'; return; }
      moiId = meme.id; // profil sans code : il en crée un juste après (écran « Ton code personnel »)
    } else {
      if (pin.length < 4) { $('nom-err').textContent = 'Invente un code personnel de 4 caractères ou plus (et retiens-le).'; $('pin').focus(); return; }
      moiId = uid('m');
      // ouvert depuis EPS ultime (appli des profs) : prof = rédacteur en chef ; sinon journaliste
      sauver({id: moiId, t: 'membre', nom: n, role: depuisEps ? 'redac-chef' : 'journaliste', roles: [depuisEps ? 'redac-chef' : 'journaliste'], cree: Date.now(), par: moiId, pin: await empreintePin(moiId, pin)}, true);
    }
    $('nom-err').textContent = ''; LS('journal-moi', moiId); entrer();
  };
  $('f-pin').onsubmit = async e => {
    e.preventDefault();
    const a = $('pin1').value.trim(), b = $('pin2').value.trim();
    if (a.length < 4) { $('pin-err').textContent = '4 caractères ou plus.'; return; }
    if (a !== b) { $('pin-err').textContent = 'Les deux codes ne sont pas pareils.'; $('pin2').select(); return; }
    const m = moi(); m.pin = await empreintePin(m.id, a); sauver(m, true);
    $('pin1').value = $('pin2').value = ''; $('pin-err').textContent = ''; toast('🔒 Code personnel enregistré'); entrer();
  };

  /* ---------- navigation ---------- */
  let vue = 'accueil';
  const VUES = {accueil: vAccueil, agenda: vAgenda, articles: vArticles, idees: vIdees, maquette: vMaquette, messages: vMessages, equipe: vEquipe};
  const TYPES_ONGLET = {agenda: ['reunion'], articles: ['article', 'com'], idees: ['idee'], maquette: ['numero']};
  const vuLe = v => +LS('journal-vu-' + v) || 0;
  function majBulles() {
    document.querySelectorAll('#onglets button').forEach(b => {
      const v = b.dataset.v; b.classList.toggle('on', v === vue);
      let n = 0; if (TYPES_ONGLET[v] && v !== vue) { const t0 = vuLe(v); n = Object.values(items).filter(i => TYPES_ONGLET[v].includes(i.t) && !(i.t === 'com' && !i.cible) && !i.x && !cache(i) && i.par !== moiId && i.maj > t0 && t0).length; }
      if (v === 'messages') n = tousNonLus().length;
      let bu = b.querySelector('.bulle'); if (!n) { if (bu) bu.remove(); return; }
      if (!bu) { bu = document.createElement('span'); bu.className = 'bulle'; b.querySelector('i').after(bu); } bu.textContent = n > 9 ? '9+' : n;
    });
    montrerSync(etatSync || (SCRIPT ? '' : 'local'));
    majBadge();
  }
  function aller(v) {
    if (vue && vue !== v) LS('journal-vu-' + vue, String(Date.now()));
    vue = v; SS('journal-vue', v); if (!vuLe(v)) LS('journal-vu-' + v, String(Date.now()));
    rendre(); scrollTo(0, 0);
  }
  function rendre() {
    if ($('app').hidden) return;
    const n = numCourant();
    $('titre-app').textContent = n && n.nom ? n.nom : 'Le Journal';
    $('vue').classList.remove('en-chat'); $('vue').innerHTML = ''; VUES[vue]($('vue')); majBulles();
  }
  $('onglets').onclick = e => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.v === 'messages' && vue === 'messages') { filOuvert = ''; SS('journal-fil', ''); } aller(b.dataset.v); };
  $('bt-equipe').onclick = () => aller('equipe');

  /* ---------- fenêtre du bas ---------- */
  function feuille(html, brancher) {
    $('feuille-f').innerHTML = html; $('feuille').hidden = false;
    $('feuille').onclick = e => { if (e.target === $('feuille') || e.target.closest('[data-fermer]')) fermer(); };
    if (brancher) brancher($('feuille-f'));
  }
  let apresFeuille = null;
  function fermer() { $('feuille').hidden = true; $('feuille-f').innerHTML = ''; const f = apresFeuille; apresFeuille = null; if (f) f(); else if (window.EditeurMEP && EditeurMEP.ouvert()) EditeurMEP.redessiner(); else rendre(); }

  /* =================== ACCUEIL =================== */
  function vAccueil(el) {
    const m = moi(), t0 = +LS('journal-vu-accueil-avant') || 0;
    const nouveaux = Object.values(items).filter(i => !i.x && i.par !== moiId && i.maj > t0 && t0 && ['reunion', 'article', 'idee', 'com'].includes(i.t) && !(i.t === 'com' && !i.cible) && !cache(i));
    const cpt = t => nouveaux.filter(i => i.t === t).length;
    const bouts = [[cpt('reunion'), 'réunion', 'réunions'], [cpt('article'), 'article', 'articles'], [cpt('idee'), 'idée', 'idées'], [cpt('com'), 'commentaire', 'commentaires']]
      .filter(x => x[0]).map(x => `${x[0]} ${x[0] > 1 ? x[2] : x[1]}`);
    const prochaine = liste('reunion').filter(r => r.date >= auj()).sort((a, b) => (a.date + (a.h || '')).localeCompare(b.date + (b.h || '')))[0];
    const n = numCourant();
    const arts = liste('article'), mesArts = arts.filter(a => a.par === moiId || (a.auteurs || '').toLowerCase().includes((m.nom || '').toLowerCase()));
    const top = liste('idee').filter(i => !i.prive).map(i => [i, votes(i.id)]).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const aRelire = arts.filter(a => a.etat === 'relire');
    el.innerHTML = `<h2 class="titre">Salut ${esc(m.nom)} 👋</h2>
      <p class="mut" style="margin-top:-6px">${esc(rolesTxt(m))}</p>
      ${(() => { const nl = tousNonLus(), pm = nl.filter(pourMoi); return nl.length ? `<div class="nouveau" data-a="msgs" style="cursor:pointer">💬 <b>${pm.length ? `${pm.length} message${pm.length > 1 ? 's' : ''} pour toi` : `${nl.length} nouveau${nl.length > 1 ? 'x' : ''} message${nl.length > 1 ? 's' : ''}`}</b>${pm.length ? ` (${esc([...new Set(pm.map(m => nomDe(m.par)))].join(', '))})` : ''} › Messages</div>` : ''; })()}
      ${bouts.length ? `<div class="nouveau">🆕 Depuis ta dernière visite : <b>${bouts.join(', ')}</b>.</div>` : ''}
      ${!SCRIPT ? `<div class="nouveau">ℹ️ L'appli n'est pas encore reliée au Google Sheet du journal : pour l'instant, ce que tu écris reste sur cet appareil.</div>` : ''}
      <h3 class="st">Prochaine réunion</h3>
      ${prochaine ? `<div class="carte">${carteReunion(prochaine)}</div>` : `<div class="carte"><p class="mut" style="margin:0 0 8px">Aucune réunion prévue.</p><button class="btn p" data-a="reu">＋ Proposer une réunion</button></div>`}
      <h3 class="st">Le prochain numéro</h3>
      ${n ? carteNumero(n) : `<div class="carte"><p class="mut" style="margin:0 0 8px">Pas encore de numéro en préparation.</p><button class="btn p" data-a="num">＋ Lancer le numéro 1</button></div>`}
      <div class="grille2">
        <div class="carte" data-a="arts" style="cursor:pointer"><div class="chiffre">${arts.length}</div><div class="mut">article${arts.length > 1 ? 's' : ''} · ${arts.filter(a => a.etat === 'valide').length} validé${arts.filter(a => a.etat === 'valide').length > 1 ? 's' : ''}</div></div>
        <div class="carte" data-a="idees" style="cursor:pointer"><div class="chiffre">${liste('idee').length}</div><div class="mut">idée${liste('idee').length > 1 ? 's' : ''} sur le tableau</div></div>
      </div>
      ${peut('valider') && aRelire.length ? `<h3 class="st">À relire et valider</h3>${aRelire.map(ligneArticle).join('')}` : ''}
      ${(() => { const pa = arts.filter(a => a.prive), pi = liste('idee').filter(i => i.prive); return pa.length || pi.length ? `<div class="nouveau" style="background:#f5f5f4;border-color:#d6d3d1">🔒 <b>Ma table de travail</b> (personne d'autre ne la voit) : ${[pa.length ? `<a data-a="arts" style="cursor:pointer;text-decoration:underline">${pa.length} brouillon${pa.length > 1 ? 's' : ''} privé${pa.length > 1 ? 's' : ''}</a>` : '', pi.length ? `<a data-a="idees" style="cursor:pointer;text-decoration:underline">${pi.length} idée${pi.length > 1 ? 's' : ''} perso</a>` : ''].filter(Boolean).join(' et ')}.</div>` : ''; })()}
      <h3 class="st">Mes articles</h3>
      ${mesArts.length ? mesArts.sort((a, b) => b.maj - a.maj).slice(0, 4).map(ligneArticle).join('') : ''}
      <button class="ajout" data-a="ecrire">✍️ Écrire un article</button>
      ${top.length ? `<h3 class="st">Idées les plus aimées</h3>${top.map(([i, v]) => `<div class="carte" style="background:${(CAT[i.cat] || CAT.autre)[2]}"><b>👍 ${v}</b> · ${esc(i.texte)}</div>`).join('')}` : ''}`;
    el.onclick = e => {
      const a = e.target.closest('[data-a]'); if (a) {
        const k = a.dataset.a;
        if (k === 'reu') oblige('agenda', () => formReunion()); else if (k === 'num') formNumero(); else if (k === 'arts') aller('articles'); else if (k === 'idees') aller('idees');
        else if (k === 'ecrire') oblige('ecrire', () => ouvrirArticle(nouvelArticle())); else if (k === 'journal') aller('maquette'); else if (k === 'msgs') aller('messages');
        return;
      }
      if (clicReunion(e)) return;
      const ar = e.target.closest('[data-art]'); if (ar) ouvrirArticle(items[ar.dataset.art]);
    };
  }
  // la date de la dernière visite de l'accueil (pour « Depuis ta dernière visite »)
  (() => { const avant = LS('journal-vu-accueil'); if (avant) LS('journal-vu-accueil-avant', avant); LS('journal-vu-accueil', String(Date.now())); })();

  function carteNumero(n) {
    if (!n.pages) n.pages = [];
    const zones = [], places = [];
    for (let p = 0; p < Maquette.nbPages(n); p++) Maquette.blocs(n, p).forEach(b => { if (b.type !== 'art') return; zones.push(b); if (b.art && items[b.art] && !items[b.art].x) places.push(b.art); });
    const jb = joursAvant(n.bouclage), jp = joursAvant(n.parution);
    const delai = jb == null ? '' : jb > 1 ? `⏳ Bouclage dans <b>${jb} jours</b> (${dateJolie(n.bouclage)})` : jb === 1 ? '⏳ Bouclage <b>demain</b> !' : jb === 0 ? '🔥 Bouclage <b>aujourd\'hui</b> !' : `🔒 Bouclage passé (${dateJolie(n.bouclage)})`;
    return `<div class="carte" data-a="journal" style="cursor:pointer"><h4>📰 ${esc(n.nom || 'Le Journal')} · n° ${esc(n.n)}</h4>
      <div class="mut">${delai}${n.parution ? `<br>🗞️ Parution ${jp != null && jp >= 0 ? `dans ${jp} jours ` : ''}(${dateJolie(n.parution)})` : ''}</div>
      <div style="margin-top:8px;font-size:14.5px">${Maquette.nbPages(n)} page${Maquette.nbPages(n) > 1 ? 's' : ''}${n.rv === 0 ? ' (recto seul)' : Maquette.nbPages(n) > 1 ? ' recto-verso' : ''} · <b>${places.length}</b> case${places.length > 1 ? 's' : ''} remplie${places.length > 1 ? 's' : ''} sur ${zones.length}${n.boucle ? ' · 🔒 bouclé' : ''}</div></div>`;
  }

  /* =================== AGENDA =================== */
  let moisVu = null;
  const reps = id => liste('rep').filter(r => r.reu === id);
  function carteReunion(r) {
    const d = dIso(r.date) || new Date(), rs = reps(r.id), mienne = (rs.find(x => x.par === moiId) || {}).v;
    const nb = v => rs.filter(x => x.v === v).length;
    const modif = r.par === moiId || peut('supprimer');
    return `<div class="reu" data-reu="${r.id}"><div class="cal"><small>${MOIS[d.getMonth()].slice(0, 4)}.</small><b>${d.getDate()}</b><span>${JOURS[d.getDay()]}</span></div>
      <div class="corps"><h4>${esc(r.objet || 'Réunion du journal')}</h4>
      <div class="mut">🕐 ${esc(r.h || '?')}${r.fin ? ' – ' + esc(r.fin) : ''}${r.lieu ? ' · 📍 ' + esc(r.lieu) : ''}<br>Proposée par ${esc(nomDe(r.par))}</div>
      ${r.odj ? `<div class="odj"><b>Ordre du jour</b>\n${esc(r.odj)}</div>` : ''}
      ${rs.length ? `<div class="reps">${rs.map(x => `<span class="${x.v === 'oui' ? 'oui' : x.v === 'non' ? 'non' : 'pt'}">${x.v === 'oui' ? '✓' : x.v === 'non' ? '✗' : '?'} ${esc(nomDe(x.par))}</span>`).join('')}</div>` : ''}
      ${r.date >= auj() ? `<div class="choix3"><button data-rep="oui" class="oui ${mienne === 'oui' ? 'on' : ''}">✓ Je viens${nb('oui') ? ' · ' + nb('oui') : ''}</button><button data-rep="pt" class="pt ${mienne === 'pt' ? 'on' : ''}">? Peut-être</button><button data-rep="non" class="non ${mienne === 'non' ? 'on' : ''}">✗ Pas dispo</button></div>` : ''}
      ${r.cr ? `<div class="odj" style="background:#f0fdf4"><b>📝 Compte rendu</b>\n${esc(r.cr)}</div>` : ''}
      <div class="rangee" style="margin-top:8px"><button class="btn petit" data-ra="cr">📝 ${r.cr ? 'Modifier le compte rendu' : 'Compte rendu'}</button><button class="btn petit" data-ra="ics">📅 Dans mon agenda</button>
      ${modif ? '<button class="btn petit" data-ra="mod">✏️ Modifier</button>' : ''}</div></div></div>`;
  }
  function clicReunion(e) {
    const box = e.target.closest('[data-reu]'); if (!box) return false;
    const r = items[box.dataset.reu]; if (!r) return false;
    const b = e.target.closest('[data-rep],[data-ra]'); if (!b) return false;
    if (b.dataset.rep) {
      const id = 'r_' + r.id + '_' + moiId, old = items[id];
      sauver(Object.assign(old || {id, t: 'rep', reu: r.id}, {v: old && old.v === b.dataset.rep ? '' : b.dataset.rep, x: 0}));
    } else if (b.dataset.ra === 'mod') formReunion(r);
    else if (b.dataset.ra === 'cr') formCR(r);
    else if (b.dataset.ra === 'ics') ics(r);
    return true;
  }
  function vAgenda(el) {
    const n = numCourant(), reus = liste('reunion');
    const base = moisVu || new Date(); const an = base.getFullYear(), mo = base.getMonth();
    const marque = {}; const met = (d, c) => { if (d) (marque[d] = marque[d] || []).push(c); };
    reus.forEach(r => met(r.date, '')); liste('numero').forEach(x => { if (x.etat !== 'imprime') { met(x.bouclage, 'bc'); met(x.parution, 'pa'); } });
    const premier = new Date(an, mo, 1), dec = (premier.getDay() + 6) % 7, cases = [];
    for (let i = -dec; i < 42 - dec; i++) { const d = new Date(an, mo, 1 + i); cases.push(d); if (i >= 27 && d.getMonth() !== mo && d.getDay() === 1) break; }
    const venir = reus.filter(r => r.date >= auj()).sort((a, b) => (a.date + (a.h || '')).localeCompare(b.date + (b.h || '')));
    const passees = reus.filter(r => r.date < auj()).sort((a, b) => b.date.localeCompare(a.date));
    el.innerHTML = `<h2 class="titre">Agenda</h2>
      <button class="ajout" data-a="reu">＋ Proposer une réunion</button>
      <div class="mois"><div class="tete"><button data-m="-1">‹</button><span>${MOIS[mo]} ${an}</span><button data-m="1">›</button></div>
      <div class="jours">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(j => `<b>${j}</b>`).join('')}
      ${cases.slice(0, Math.ceil(cases.length / 7) * 7).map(d => { const k = iso(d); return `<div class="j ${d.getMonth() !== mo ? 'hors' : ''} ${k === auj() ? 'auj' : ''}" data-j="${k}">${d.getDate()}${marque[k] ? `<span class="pts">${marque[k].slice(0, 3).map(c => `<i class="${c}"></i>`).join('')}</span>` : ''}</div>`; }).join('')}</div>
      <p class="mut" style="margin:6px 2px 0;font-size:12.5px"><span style="color:var(--teal)">●</span> réunion &nbsp; <span style="color:var(--rouge)">●</span> bouclage &nbsp; <span style="color:var(--jaune)">●</span> parution · touche un jour pour y proposer une réunion</p></div>
      ${n && (n.bouclage || n.parution) ? `<div class="carte" style="border-left:5px solid var(--rouge)">📰 <b>N° ${esc(n.n)}</b> : ${n.bouclage ? `bouclage ${dateJolie(n.bouclage)}` : ''}${n.bouclage && n.parution ? ' · ' : ''}${n.parution ? `parution ${dateJolie(n.parution)}` : ''}</div>` : ''}
      <h3 class="st">À venir</h3>
      ${venir.length ? venir.map(r => `<div class="carte">${carteReunion(r)}</div>`).join('') : '<p class="vide">Aucune réunion prévue. Propose la première !</p>'}
      ${passees.length ? `<details class="passees"><summary>Réunions passées (${passees.length})</summary>${passees.map(r => `<div class="carte">${carteReunion(r)}</div>`).join('')}</details>` : ''}`;
    el.onclick = e => {
      if (clicReunion(e)) return;
      const m = e.target.closest('[data-m]'); if (m) { moisVu = new Date(an, mo + +m.dataset.m, 1); rendre(); return; }
      const j = e.target.closest('[data-j]'); if (j) { const r = venir.concat(passees).find(x => x.date === j.dataset.j); if (r) { const c = el.querySelector(`[data-reu="${r.id}"]`); if (c) c.scrollIntoView({behavior: 'smooth', block: 'center'}); } else if (peut('agenda')) formReunion(null, j.dataset.j); return; }
      if (e.target.closest('[data-a="reu"]')) oblige('agenda', () => formReunion());
    };
  }
  function formReunion(r, date) {
    const nouveau = !r;
    r = r || {id: uid('u'), t: 'reunion', date: date || auj(), h: '12:30', fin: '', lieu: '', objet: 'Réunion du journal', odj: ''};
    feuille(`<h3>${nouveau ? 'Proposer une réunion' : 'Modifier la réunion'}</h3>
      <label class="lab">Objet</label><input class="inp" id="r-objet" maxlength="80" value="${esc(r.objet)}">
      <div class="grille2"><div><label class="lab">Date</label><input class="inp" type="date" id="r-date" value="${esc(r.date)}"></div>
      <div><label class="lab">Lieu</label><input class="inp" id="r-lieu" maxlength="60" placeholder="ex. local 12, CDI" value="${esc(r.lieu)}"></div></div>
      <div class="grille2"><div><label class="lab">Début</label><input class="inp" type="time" id="r-h" value="${esc(r.h)}"></div>
      <div><label class="lab">Fin</label><input class="inp" type="time" id="r-fin" value="${esc(r.fin)}"></div></div>
      <label class="lab">Ordre du jour</label><textarea class="inp" id="r-odj" placeholder="1. Tour des articles&#10;2. Choix de la Une&#10;3. Photos à prendre">${esc(r.odj)}</textarea>
      <div class="actions">${nouveau ? '' : '<button class="btn r" id="r-sup">Supprimer</button>'}<button class="btn" data-fermer>Annuler</button><button class="btn p" id="r-ok">${nouveau ? 'Proposer' : 'Enregistrer'}</button></div>`, f => {
      f.querySelector('#r-ok').onclick = () => {
        const d = f.querySelector('#r-date').value; if (!d) { toast('Choisis une date'); return; }
        Object.assign(r, {date: d, h: f.querySelector('#r-h').value, fin: f.querySelector('#r-fin').value, lieu: f.querySelector('#r-lieu').value.trim(),
          objet: f.querySelector('#r-objet').value.trim() || 'Réunion du journal', odj: f.querySelector('#r-odj').value.trim()});
        sauver(r, true);
        // celui qui propose vient, bien sûr
        if (nouveau) sauver({id: 'r_' + r.id + '_' + moiId, t: 'rep', reu: r.id, v: 'oui'}, true);
        fermer(); toast(nouveau ? '📅 Réunion proposée à toute l\'équipe' : '✓ Réunion modifiée');
      };
      const s = f.querySelector('#r-sup'); if (s) s.onclick = () => { if (confirm('Supprimer cette réunion pour tout le monde ?')) { supprimer(r); fermer(); } };
    });
  }
  function formCR(r) {
    feuille(`<h3>📝 Compte rendu</h3><p class="mut">${esc(r.objet)} · ${esc(dateJolie(r.date))}. Ce qui a été décidé, qui fait quoi, pour quand.</p>
      <textarea class="inp" id="cr" style="min-height:220px" placeholder="Décisions :&#10;- …&#10;&#10;Qui fait quoi :&#10;- Lina : interview du directeur, pour le 20/11">${esc(r.cr || '')}</textarea>
      <div class="actions"><button class="btn" data-fermer>Annuler</button><button class="btn p" id="cr-ok">Enregistrer</button></div>`, f => {
      f.querySelector('#cr-ok').onclick = () => { r.cr = f.querySelector('#cr').value.trim(); sauver(r, true); fermer(); };
    });
  }
  function ics(r) {
    const d = (r.date || '').replace(/-/g, ''), h = (r.h || '12:00').replace(':', '') + '00', f = (r.fin || '').replace(':', '');
    const fin = f ? f + '00' : String(Math.min(2359, +h.slice(0, 4) + 100)).padStart(4, '0') + '00';
    const e = s => String(s || '').replace(/[\\;,]/g, c => '\\' + c).replace(/\n/g, '\\n');
    const txt = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Journal ecole//FR', 'BEGIN:VEVENT', `UID:${r.id}@journal`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
      `DTSTART:${d}T${h}`, `DTEND:${d}T${fin}`, `SUMMARY:${e(r.objet || 'Réunion du journal')}`, `LOCATION:${e(r.lieu)}`, `DESCRIPTION:${e(r.odj)}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], {type: 'text/calendar'})); a.download = 'reunion-journal.ics';
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  /* =================== ARTICLES =================== */
  let filtreArt = 'tous';
  function ligneArticle(a) {
    const im = a.img && items[a.img] && items[a.img].d, mots = motsDe(a), coms = liste('com').filter(c => c.cible === a.id).length;
    const ou = ouPlace(a.id);
    return `<div class="carte art" data-art="${a.id}"><div class="vign" style="${im ? `background-image:url('${im}')` : ''}">${im ? '' : '📝'}</div>
      <div style="flex:1;min-width:0">${a.rub ? `<div class="rub">${esc(a.rub)}</div>` : ''}<h4>${esc(a.titre || 'Sans titre')}</h4>
      <div class="rangee">${a.prive ? '<span class="etat prive">🔒 Privé</span>' : ''}<span class="etat ${a.etat || 'brouillon'}">${ETATS[a.etat] || 'Brouillon'}</span><span class="place">${mots} mots · ${place(mots)}</span></div>
      <div class="place" style="margin-top:4px">✍️ ${esc(a.auteurs || nomDe(a.par))} · ${ilya(a.maj)}${coms ? ` · 💬 ${coms}` : ''}${ou ? ` · 📰 ${ou}` : ''}</div></div></div>`;
  }
  function ouPlace(id) {
    for (const n of liste('numero')) { if (!n.pages) continue; const x = Maquette.artsDe(n).find(o => o.id === id); if (x) return `n° ${n.n}, page ${x.p + 1}`; }
    return '';
  }
  function vArticles(el) {
    const arts = liste('article').sort((a, b) => b.maj - a.maj), m = moi();
    const f = {tous: () => true, mes: a => a.par === moiId || (a.auteurs || '').toLowerCase().includes(m.nom.toLowerCase()), relire: a => a.etat === 'relire',
      valide: a => a.etat === 'valide', brouillon: a => !a.etat || a.etat === 'brouillon', libres: a => !ouPlace(a.id)}[filtreArt] || (() => true);
    const vus = arts.filter(f);
    el.innerHTML = `<h2 class="titre">Articles</h2>
      <button class="ajout" data-a="ecrire">✍️ Écrire un nouvel article</button>
      <div class="puces">${[['tous', 'Tous'], ['mes', 'Mes articles'], ['relire', 'À relire'], ['valide', 'Validés'], ['brouillon', 'Brouillons'], ['libres', 'Pas encore placés']]
        .map(([k, t]) => `<button data-f="${k}" class="${filtreArt === k ? 'on' : ''}">${t} · ${arts.filter({tous: () => true, mes: a => a.par === moiId, relire: a => a.etat === 'relire', valide: a => a.etat === 'valide', brouillon: a => !a.etat || a.etat === 'brouillon', libres: a => !ouPlace(a.id)}[k]).length}</button>`).join('')}</div>
      ${vus.length ? vus.map(ligneArticle).join('') : '<p class="vide">Rien ici pour l\'instant.</p>'}
      <div class="carte mut" style="font-size:14px;margin-top:16px"><b>Le chemin d'un article</b><br>✏️ <b>Brouillon</b> : tu écris. → 📨 <b>À relire</b> : le correcteur et les profs relisent et commentent. → ✅ <b>Validé</b> par un prof : il peut aller dans le journal.</div>`;
    el.onclick = e => {
      const b = e.target.closest('[data-f]'); if (b) { filtreArt = b.dataset.f; rendre(); return; }
      if (e.target.closest('[data-a="ecrire"]')) { oblige('ecrire', () => ouvrirArticle(nouvelArticle())); return; }
      const a = e.target.closest('[data-art]'); if (a) ouvrirArticle(items[a.dataset.art]);
    };
  }
  const nouvelArticle = (titre, idee) => ({id: uid('a'), t: 'article', titre: titre || '', rub: '', chapeau: '', corps: '', auteurs: (moi() || {}).nom || '', etat: 'brouillon', prive: 1, idee: idee || '', _neuf: 1});

  /* ---------- éditeur d'article ---------- */
  let edition = null, minEd = null;
  function ouvrirArticle(a, apres) {
    if (!a) return;
    edition = a; if (apres) apresArticle = apres;
    const verrou = (a.etat === 'valide' && !peut('valider')) || (!a._neuf && a.par !== moiId && !peut('corriger') && !peut('valider'));
    const ed = $('vue-editeur'); ed.hidden = false; document.body.style.overflow = 'hidden';
    const im = a.img && items[a.img] && items[a.img].d;
    ed.innerHTML = `<div class="edtete"><button id="e-ret">‹ Fermer</button><div class="t">${a._neuf ? 'Nouvel article' : esc(a.titre || 'Article')}</div><span class="etat ${a.etat || 'brouillon'}" id="e-etat">${ETATS[a.etat] || 'Brouillon'}</span></div>
      <div class="ed">
      ${verrou ? `<div class="nouveau">🔒 ${a.etat === 'valide' ? 'Cet article est validé par la rédaction en chef. Pour le changer, demande à un prof de le repasser en brouillon.' : 'Tu peux lire et commenter cet article, mais pas le modifier (il faut l\'accès « Modifier les articles des autres »).'}</div>` : ''}
      ${a.par && a.par !== moiId && !a._neuf ? `<p class="mut" style="margin:4px 0">Écrit par ${esc(nomDe(a.par))} · modifié ${ilya(a.maj)}</p>` : ''}
      <label class="lab">Titre</label><input class="inp titre" id="e-titre" maxlength="120" placeholder="Un titre qui donne envie de lire" value="${esc(a.titre)}">
      <div class="grille2"><div><label class="lab">Rubrique</label><select class="inp" id="e-rub"><option value="">—</option>${RUBRIQUES.map(r => `<option ${a.rub === r ? 'selected' : ''}>${esc(r)}</option>`).join('')}</select></div>
      <div><label class="lab">Auteur(s)</label><input class="inp" id="e-aut" maxlength="80" value="${esc(a.auteurs)}"></div></div>
      <label class="lab">Chapeau <span style="text-transform:none;font-weight:600">(2 lignes qui résument l'article, en gras)</span></label>
      <textarea class="inp" id="e-chap" maxlength="400" style="min-height:60px" placeholder="Qui ? Quoi ? Où ? Quand ?">${esc(a.chapeau)}</textarea>
      <label class="lab">Texte</label>
      <div class="outils" id="e-outils">
        <button data-c="bold" title="Gras"><b>G</b></button><button data-c="italic" title="Italique"><i>I</i></button><button data-c="underline" title="Souligné"><u>S</u></button>
        <button data-c="h3" title="Intertitre">Intertitre</button><button data-c="blockquote" title="Citation">❝ Citation</button>
        <button data-c="insertUnorderedList" title="Liste">• Liste</button><button data-c="p" title="Texte normal">¶</button><button data-c="removeFormat" title="Enlever la mise en forme">⌫</button>
      </div>
      <div id="ed-corps" contenteditable="${verrou ? 'false' : 'true'}" spellcheck="true" lang="fr" data-ph="Écris ton article ici…">${propre(a.corps)}</div>
      <div class="compte"><span id="e-mots"></span><span id="e-save"></span></div>
      <label class="lab">Photo</label>
      <div class="photo-ed"><div class="ph" id="e-ph" style="${im ? `background-image:url('${im}')` : ''}">${im ? '' : '📷'}</div>
        <div style="flex:1"><div class="rangee"><button class="btn petit" id="e-photo">${im ? 'Changer' : 'Ajouter une photo'}</button>${im ? '<button class="btn petit r" id="e-sansphoto">Enlever</button>' : ''}</div>
        <input type="file" id="e-fich" accept="image/*" hidden>
        <input class="inp" id="e-leg" style="margin-top:8px" maxlength="160" placeholder="Légende de la photo" value="${esc(a.leg || '')}">
        <input class="inp" id="e-credit" style="margin-top:6px" maxlength="60" placeholder="Photo : qui l'a prise ?" value="${esc(a.credit || '')}">
        <label class="mut" style="display:flex;gap:6px;margin-top:6px;font-size:13.5px"><input type="checkbox" id="e-droit" ${a.droit ? 'checked' : ''}> Les personnes reconnaissables sur la photo sont d'accord (droit à l'image).</label></div></div>
      <div class="ed-actions" id="e-actions"></div>
      <h3 class="st">💬 Relecture et commentaires</h3><div class="coms" id="e-coms"></div>
      <div class="rangee"><input class="inp" id="e-com" style="flex:1" maxlength="500" placeholder="Un conseil, une correction…"><button class="btn p" id="e-com-ok">Envoyer</button></div>
      </div>`;
    const corps = $('ed-corps');
    const majMots = () => { const n = motsDe({corps: corps.innerHTML, chapeau: $('e-chap').value}); $('e-mots').textContent = `${n} mots · ${place(n)}`; };
    const enregistrer = () => {
      if (verrou) return;
      Object.assign(a, {titre: $('e-titre').value.trim(), rub: $('e-rub').value, auteurs: $('e-aut').value.trim(), chapeau: $('e-chap').value.trim(),
        corps: propre(corps.innerHTML), leg: $('e-leg').value.trim(), credit: $('e-credit').value.trim(), droit: $('e-droit').checked ? 1 : 0});
      if (!a.titre && !texteDe(a.corps) && a._neuf) return; // rien écrit : on ne crée pas d'article vide
      delete a._neuf; sauver(a, true); $('e-save').textContent = '✓ Enregistré';
    };
    const plusTard = () => { $('e-save').textContent = '…'; clearTimeout(minEd); minEd = setTimeout(enregistrer, 900); majMots(); };
    ['e-titre', 'e-aut', 'e-chap', 'e-leg', 'e-credit'].forEach(id => { $(id).oninput = plusTard; $(id).disabled = verrou; });
    $('e-rub').onchange = plusTard; $('e-droit').onchange = plusTard; $('e-rub').disabled = verrou;
    corps.oninput = plusTard;
    corps.addEventListener('paste', e => {
      const h = e.clipboardData && (e.clipboardData.getData('text/html') || ''), t = e.clipboardData && e.clipboardData.getData('text/plain');
      e.preventDefault();
      const html = h ? propre(h) : esc(t || '').split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
      document.execCommand('insertHTML', false, html); plusTard();
    });
    $('e-outils').onmousedown = e => e.preventDefault(); // garder la sélection dans le texte
    $('e-outils').onclick = e => {
      const b = e.target.closest('[data-c]'); if (!b || verrou) return;
      corps.focus(); const c = b.dataset.c;
      if (c === 'h3' || c === 'blockquote' || c === 'p') document.execCommand('formatBlock', false, c === 'p' ? 'p' : c);
      else document.execCommand(c, false, null);
      plusTard();
    };
    $('e-ret').onclick = () => { clearTimeout(minEd); enregistrer(); fermerEditeur(); };
    $('e-photo').onclick = () => { if (!verrou) $('e-fich').click(); };
    if ($('e-sansphoto')) $('e-sansphoto').onclick = () => { if (verrou) return; if (a.img && items[a.img]) sauver(Object.assign(items[a.img], {d: '', x: 1}), true); a.img = ''; enregistrer(); ouvrirArticle(a); };
    $('e-fich').onchange = async () => {
      const f = $('e-fich').files[0]; $('e-fich').value = ''; if (!f) return;
      $('e-save').textContent = 'Photo en cours…';
      try {
        const d = await reduire(f);
        const im = a.img && items[a.img] ? items[a.img] : {id: uid('i'), t: 'img'};
        im.d = d; im.x = 0; im.art = a.id; sauver(im, true); a.img = im.id; enregistrer(); ouvrirArticle(a);
      } catch (err) { toast('Cette photo n\'a pas pu être lue'); $('e-save').textContent = ''; }
    };
    // boutons d'état
    const chef = peut('valider'), act = $('e-actions'), et = a.etat || 'brouillon';
    act.innerHTML = (a.prive ? '<p class="mut" style="margin:0 0 6px;width:100%">🔒 <b>Brouillon privé</b> : toi seul le vois. Quand tu es prêt, rends-le visible à l\'équipe ou envoie-le à la relecture.</p><button class="btn p" id="e-public">📢 Rendre visible à l\'équipe</button>' : '')
      + (!a.prive && et === 'brouillon' && a.par === moiId ? '<button class="btn" id="e-prive">🔒 Remettre en privé</button>' : '')
      + (et === 'brouillon' && !verrou ? '<button class="btn o" data-et="relire">📨 Envoyer à la relecture</button>' : '')
      + (chef && et !== 'valide' ? '<button class="btn p" data-et="valide">✅ Valider pour le journal</button>' : '');
    if (et !== 'brouillon' && (chef || et === 'relire')) act.innerHTML += '<button class="btn" data-et="brouillon">↩︎ Repasser en brouillon</button>';
    act.innerHTML += '<button class="btn" id="e-apercu">👁️ Aperçu dans le journal</button>';
    if (!a._neuf && (a.par === moiId || peut('supprimer'))) act.innerHTML += '<button class="btn r" id="e-sup">🗑 Supprimer</button>';
    act.onclick = e => {
      const b = e.target.closest('[data-et]');
      if (b) {
        clearTimeout(minEd); enregistrer(); if (a._neuf) { toast('Écris d\'abord un titre ou un texte'); return; }
        a.etat = b.dataset.et; if (a.etat === 'valide') a.valPar = moiId; if (a.etat !== 'brouillon') delete a.prive; sauver(a, true);
        toast(b.dataset.et === 'relire' ? '📨 Envoyé à la relecture' : b.dataset.et === 'valide' ? '✅ Article validé' : 'Repassé en brouillon');
        ouvrirArticle(a); return;
      }
      if (e.target.id === 'e-public' || e.target.id === 'e-prive') {
        clearTimeout(minEd); enregistrer(); if (a._neuf) { toast('Écris d\'abord un titre ou un texte'); return; }
        if (e.target.id === 'e-public') { delete a.prive; toast('📢 Visible par toute l\'équipe'); }
        else { if (ouPlace(a.id)) { toast('Il est déjà placé dans le journal : il reste visible'); return; } a.prive = 1; toast('🔒 Repassé en privé'); }
        sauver(a, true); ouvrirArticle(a); return;
      }
      if (e.target.id === 'e-apercu') { clearTimeout(minEd); enregistrer(); apercuArticle(a); return; }
      if (e.target.id === 'e-sup' && confirm('Supprimer cet article pour toute l\'équipe ?')) {
        supprimer(a); retirerDesNumeros(a.id); fermerEditeur();
      }
    };
    // commentaires
    const dessinerComs = () => {
      const cs = liste('com').filter(c => c.cible === a.id).sort((x, y) => x.cree - y.cree);
      $('e-coms').innerHTML = cs.length ? cs.map(c => { const r = items[c.par] && ROLE[rolesDe(items[c.par])[0]]; return `<div class="com ${estProf(items[c.par]) ? 'prof' : ''}"><b>${r ? r.ic + ' ' : ''}${esc(nomDe(c.par))}</b> <span class="mut" style="font-size:12px">${ilya(c.cree || c.maj)}</span>${c.par === moiId ? ` <button class="btn petit r" data-sc="${c.id}" style="padding:0 6px;float:right">✕</button>` : ''}<br>${esc(c.texte)}</div>`; }).join('')
        : '<p class="mut" style="margin:0 0 8px">Pas encore de commentaire.</p>';
    };
    dessinerComs();
    $('e-coms').onclick = e => { const b = e.target.closest('[data-sc]'); if (b) { supprimer(items[b.dataset.sc]); dessinerComs(); } };
    const envoyerCom = () => {
      const t = $('e-com').value.trim(); if (!t) return;
      if (a._neuf) { enregistrer(); if (a._neuf) { toast('Écris d\'abord l\'article'); return; } }
      sauver({id: uid('c'), t: 'com', cible: a.id, texte: t, cree: Date.now()}, true); $('e-com').value = ''; dessinerComs();
    };
    $('e-com-ok').onclick = envoyerCom; $('e-com').onkeydown = e => { if (e.key === 'Enter') envoyerCom(); };
    majMots();
    if (a._neuf) setTimeout(() => $('e-titre').focus(), 150);
  }
  let apresArticle = null;
  function fermerEditeur() { edition = null; $('vue-editeur').hidden = true; $('vue-editeur').innerHTML = ''; const f = apresArticle; apresArticle = null;
    if (window.EditeurMEP && EditeurMEP.ouvert()) { if (f) f(); else EditeurMEP.redessiner(); } else { document.body.style.overflow = ''; rendre(); } }
  function reduire(f) {
    return new Promise((ok, ko) => {
      const url = URL.createObjectURL(f), im = new Image();
      im.onload = () => {
        const M = 1400, k = Math.min(1, M / Math.max(im.naturalWidth, im.naturalHeight));
        const c = document.createElement('canvas'); c.width = Math.round(im.naturalWidth * k); c.height = Math.round(im.naturalHeight * k);
        c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
        let q = 0.78, d = c.toDataURL('image/jpeg', q);
        while (d.length > 330000 && q > 0.4) { q -= 0.1; d = c.toDataURL('image/jpeg', q); }
        ok(d);
      };
      im.onerror = () => { URL.revokeObjectURL(url); ko(new Error('image')); };
      im.src = url;
    });
  }
  function retirerDesNumeros(id) {
    liste('numero').forEach(n => { if (!n.pages) return; let ch = false; Maquette.artsDe(n).forEach(o => { if (o.id === id) { delete o.b.art; ch = true; } }); if (ch) sauver(n, true); });
  }
  // l'article seul, dans une case demi-page, pour voir ce que ça donne
  function apercuArticle(a) {
    const n = numCourant() || {nom: 'Le Journal', n: 1, pages: []};
    const faux = Object.assign({}, n, {nb: 2, pages: [{blocs: []}, {blocs: [{id: 'ap', type: 'art', art: a.id, x: 11, y: 17, w: 188, h: 133, s: {}}]}]});
    feuille(`<h3>Aperçu</h3><p class="mut">Ton article dans une demi-page du journal.</p><div class="apercu" id="ap"></div><div class="actions"><button class="btn p" data-fermer>Fermer</button></div>`, f => {
      const pageEl = Maquette.page(ctx(faux), 1, 'papier'); poserPage(f.querySelector('#ap'), pageEl);
    });
  }

  /* =================== IDÉES =================== */
  let triIdees = 'pop', catFiltre = '';
  const votes = id => liste('vote').filter(v => v.idee === id && v.v).length;
  function vIdees(el) {
    let ids = liste('idee'); if (catFiltre) ids = ids.filter(i => i.cat === catFiltre);
    ids.sort((a, b) => (b.prive ? 1 : 0) - (a.prive ? 1 : 0) || (triIdees === 'pop' ? votes(b.id) - votes(a.id) || b.maj - a.maj : (b.cree || b.maj) - (a.cree || a.maj)));
    el.innerHTML = `<h2 class="titre">Tableau des idées</h2>
      <div class="carte nouv-idee"><textarea class="inp" id="i-tx" maxlength="300" placeholder="Balance ton idée : un sujet, une interview, un jeu, un nom pour le journal…" style="min-height:64px"></textarea>
      <div class="rangee"><select class="inp" id="i-cat" style="flex:1;width:auto">${CATS.map(c => `<option value="${c[0]}">${c[1]}</option>`).join('')}</select><button class="btn" id="i-moi" title="Visible seulement par toi">🔒 Garder pour moi</button><button class="btn p" id="i-ok">📌 Épingler pour tous</button></div></div>
      <div class="puces"><button data-tri="pop" class="${triIdees === 'pop' ? 'on' : ''}">👍 Les plus aimées</button><button data-tri="rec" class="${triIdees === 'rec' ? 'on' : ''}">🕐 Récentes</button>
      <button data-cat="" class="${!catFiltre ? 'on' : ''}">Toutes</button>${CATS.map(c => `<button data-cat="${c[0]}" class="${catFiltre === c[0] ? 'on' : ''}">${c[1]}</button>`).join('')}</div>
      ${ids.length ? `<div class="murs">${ids.map(postit).join('')}</div>` : '<p class="vide">Le tableau est vide : épingle la première idée !</p>'}`;
    $('i-ok').onclick = () => {
      if (!peut('idees')) { oblige('idees'); return; }
      const t = $('i-tx').value.trim(); if (!t) { $('i-tx').focus(); return; }
      sauver({id: uid('d'), t: 'idee', texte: t, cat: $('i-cat').value, cree: Date.now()}); toast('📌 Idée épinglée');
    };
    $('i-moi').onclick = () => { // idée perso, sur ma table de travail : je la partagerai plus tard
      const t = $('i-tx').value.trim(); if (!t) { $('i-tx').focus(); return; }
      sauver({id: uid('d'), t: 'idee', texte: t, cat: $('i-cat').value, cree: Date.now(), prive: 1}); toast('🔒 Gardée pour toi : personne d\'autre ne la voit');
    };
    el.onclick = e => {
      const tri = e.target.closest('[data-tri]'); if (tri) { triIdees = tri.dataset.tri; rendre(); return; }
      const c = e.target.closest('[data-cat]'); if (c) { catFiltre = c.dataset.cat; rendre(); return; }
      const p = e.target.closest('[data-idee]'); if (!p) return; const i = items[p.dataset.idee];
      const b = e.target.closest('[data-ia]'); if (!b || !i) return;
      const k = b.dataset.ia;
      if (k === 'vote') { const id = 'v_' + i.id + '_' + moiId, v = items[id]; sauver(Object.assign(v || {id, t: 'vote', idee: i.id}, {v: v && v.v ? 0 : 1, x: 0})); }
      else if (k === 'prendre' && !peut('ecrire')) oblige('ecrire');
      else if (k === 'prendre') {
        const a = nouvelArticle(i.cat === 'interview' ? 'Interview : ' : '', i.id); a.chapeau = ''; a.titre = a.titre + (i.texte.length < 90 ? i.texte : '');
        i.pris = moiId; sauver(i, true); ouvrirArticle(a);
      }
      else if (k === 'partager') oblige('idees', () => { delete i.prive; i.cree = Date.now(); sauver(i); toast('📌 Idée épinglée pour tous'); });
      else if (k === 'art' && items[i.article]) ouvrirArticle(items[i.article]);
      else if (k === 'sup' && confirm('Enlever cette idée du tableau ?')) supprimer(i);
    };
  }
  function postit(i) {
    const c = CAT[i.cat] || CAT.autre, v = votes(i.id), moiV = items['v_' + i.id + '_' + moiId] && items['v_' + i.id + '_' + moiId].v;
    const art = liste('article').find(a => a.idee === i.id);
    if (i.prive) return `<div class="postit perso" style="background:${c[2]}" data-idee="${i.id}"><button class="x" data-ia="sup" title="Enlever">✕</button>
      <div class="cat">🔒 Pour moi · ${esc(c[1])}</div><div class="tx">${esc(i.texte)}</div>
      <div class="pied"><button data-ia="partager">📌 Épingler pour tous</button>${i.cat !== 'nom' ? '<button data-ia="prendre">✍️ Je l\'écris</button>' : ''}</div></div>`;
    return `<div class="postit" style="background:${c[2]}" data-idee="${i.id}">
      ${i.par === moiId || peut('supprimer') ? '<button class="x" data-ia="sup" title="Enlever">✕</button>' : ''}
      <div class="cat">${esc(c[1])}</div><div class="tx">${esc(i.texte)}</div>
      ${art ? `<div class="pris" data-ia="art" style="cursor:pointer">📝 ${esc(nomDe(art.par))} l'écrit · ${ETATS[art.etat] || 'Brouillon'}</div>`
        : i.pris ? `<div class="pris">✍️ Pris par ${esc(nomDe(i.pris))}</div>` : ''}
      <div class="pied"><span class="qui">${esc(nomDe(i.par))}</span>${!art && !i.pris && i.cat !== 'nom' ? '<button data-ia="prendre">✍️ Je l\'écris</button>' : ''}<button data-ia="vote" class="${moiV ? 'on' : ''}">👍 ${v}</button></div></div>`;
  }

  /* =================== JOURNAL : numéros, maquette, impression =================== */
  // Kevin (03/11 soir) : nombre de pages au choix (n.nb, 1 à 8), recto-verso ou recto seul (n.rv = 0) ; pages en blocs libres (editeur.js).
  let pageVue = 0, numChoisi = SS('journal-num') || '';
  function numCourant() {
    const ns = liste('numero');
    if (numChoisi && items[numChoisi] && !items[numChoisi].x) return items[numChoisi];
    return ns.filter(n => n.etat !== 'imprime').sort((a, b) => (+a.n || 0) - (+b.n || 0))[0] || ns.sort((a, b) => (+b.n || 0) - (+a.n || 0))[0] || null;
  }
  const ctx = num => ({num, art: id => items[id] && !items[id].x ? items[id] : null, img: id => items[id] && !items[id].x && items[id].d ? items[id].d : null,
    equipe: liste('membre').map(m => Object.assign({}, m, {roles: rolesDe(m)})).sort((a, b) => ROLES.findIndex(r => r.id === a.roles[0]) - ROLES.findIndex(r => r.id === b.roles[0])), roleNom, propre});
  function poserPage(boite, pageEl, largeur) {
    boite.innerHTML = '';
    const W = largeur || boite.clientWidth - 20 || 300, PW = 210 * Maquette.MM, PH = 297 * Maquette.MM, k = Math.min(1, W / PW);
    const cadre = document.createElement('div'); cadre.className = 'cadre'; cadre.style.width = PW * k + 'px'; cadre.style.height = PH * k + 'px';
    pageEl.style.transform = `scale(${k})`; cadre.appendChild(pageEl); boite.appendChild(cadre);
    const go = () => Maquette.ajuster(pageEl);
    go(); pageEl.querySelectorAll('img').forEach(i => { if (!i.complete) i.addEventListener('load', go, {once: true}); });
    return cadre;
  }
  const modifiable = n => peut('maquette') && (!n.boucle || peut('numeros'));
  function ajusterPages(n) { // le nombre de pages a changé : on ajoute des pages (gabarit par défaut) ou on enlève les dernières
    const nb = Maquette.nbPages(n); n.pages = n.pages || [];
    if (n.pages.length > nb) n.pages.length = nb;
    for (let p = 0; p < nb; p++) if (!n.pages[p]) { const g = Maquette.gabDefaut(p, nb); n.pages[p] = {g, blocs: Maquette.blocsDuGabarit(g, {}, p)}; }
  }
  function vMaquette(el) {
    const n = numCourant(), ns = liste('numero').sort((a, b) => (+b.n || 0) - (+a.n || 0));
    if (!n) {
      el.innerHTML = `<h2 class="titre">Le journal</h2><div class="carte"><p>Choisis le nombre de pages (par exemple <b>1 feuille A4 recto-verso = 2 pages</b>), une mise en page pour chaque page, place les articles (ou laisse l'appli te faire des propositions), arrange tout à ta façon dans la <b>mise en page libre</b>, puis imprime.</p>
        <button class="btn p" id="m-nouv">＋ Lancer le numéro 1</button></div>`;
      $('m-nouv').onclick = () => formNumero();
      return;
    }
    ajusterPages(n);
    const nb = Maquette.nbPages(n); if (pageVue >= nb) pageVue = 0;
    const pg = n.pages[pageVue], ok = modifiable(n);
    const libres = candidats(n).filter(a => !placeDans(n, a.id));
    el.innerHTML = `<div class="rp"><h2 class="titre" style="margin-bottom:6px">${esc(n.nom || 'Le Journal')} · n° ${esc(n.n)}</h2>
      ${ns.length > 1 || peut('numeros') ? `<select class="inp" id="m-num" style="width:auto;padding:6px 8px">${ns.map(x => `<option value="${x.id}" ${x.id === n.id ? 'selected' : ''}>N° ${esc(x.n)}${x.etat === 'imprime' ? ' (imprimé)' : ''}</option>`).join('')}${peut('numeros') ? '<option value="+">＋ Nouveau numéro</option>' : ''}</select>` : ''}</div>
      <p class="mut" style="margin:0 0 10px">${nb} page${nb > 1 ? 's' : ''} ${nb === 1 ? '(1 feuille, recto)' : n.rv === 0 ? `en recto seul (${nb} feuilles)` : `recto-verso (${Math.ceil(nb / 2)} feuille${nb > 2 ? 's' : ''})`}${n.parution ? ` · parution ${dateJolie(n.parution)}` : ''}${n.bouclage ? ` · bouclage ${dateJolie(n.bouclage)}` : ''}${n.boucle ? ' · 🔒 <b>bouclé</b>' : ''}${n.etat === 'imprime' ? ' · 🗞️ imprimé' : ''}
        · <a href="#" id="m-regl">réglages et nombre de pages</a></p>
      <div class="rangee" style="margin-bottom:12px"><button class="btn p" id="m-libre" ${ok ? '' : 'disabled'}>🎨 Mise en page libre</button><button class="btn o" id="m-prop" ${ok ? '' : 'disabled'}>✨ Propositions</button><button class="btn" id="m-print" ${peut('imprimer') ? '' : 'disabled'}>🖨️ Imprimer</button></div>
      <div class="pages-t" style="grid-template-columns:repeat(${Math.min(nb, 4)},1fr)">${Array.from({length: nb}, (_, i) => `<button data-p="${i}" class="${i === pageVue ? 'on' : ''}">${Maquette.nomPage(i, nb)}<small>${Maquette.feuilleDe(i, n.rv !== 0)}</small></button>`).join('')}</div>
      <div class="gabs" id="m-gabs">${Maquette.pour(pageVue, nb).map(x => `<button class="gab ${pg.g === x.id ? 'on' : ''}" data-g="${x.id}" ${ok ? '' : 'disabled'}>${Maquette.mini(x)}${esc(x.nom)}</button>`).join('')}</div>
      <div class="apercu" id="m-ap"></div>
      <p class="mut" style="font-size:13.5px;margin:0 0 12px">${ok ? 'Touche une case d\'article pour y placer un article. Pour tout régler (taille, place, police, photos, dessins…) : 🎨 Mise en page libre. ' : !peut('maquette') ? '👀 La mise en page est faite par les maquettistes et la rédaction en chef. ' : '🔒 Numéro bouclé : seule la rédaction en chef peut encore le changer. '}✂️ = trop long, à raccourcir.</p>
      <h3 class="st">Articles pas encore placés (${libres.length})</h3>
      ${libres.length ? libres.map(ligneArticle).join('') : '<p class="mut">Tous les articles sont placés.</p>'}
      ${peut('numeros') ? `<h3 class="st">Rédaction en chef</h3><div class="rangee">
        <button class="btn" id="m-boucle">${n.boucle ? '🔓 Rouvrir le numéro' : '🔒 Boucler le numéro'}</button>
        ${n.etat !== 'imprime' ? '<button class="btn" id="m-imprime">🗞️ Marquer comme imprimé</button>' : '<button class="btn" id="m-rouvre">↩︎ Pas encore imprimé</button>'}</div>` : ''}`;
    const pageEl = Maquette.page(ctx(n), pageVue, 'ecran');
    poserPage($('m-ap'), pageEl);
    pageEl.onclick = e => {
      const z = e.target.closest('.b'); if (!z) return;
      if (!ok) { toast(peut('maquette') ? '🔒 Numéro bouclé' : '👀 Pas d\'accès à la mise en page'); return; }
      const b = Maquette.blocs(n, pageVue).find(x => x.id === z.dataset.b);
      if (b && b.type === 'art') choisirArticle(n, pageVue, b.id); else EditeurMEP.ouvrir(n, pageVue);
    };
    el.onclick = e => {
      const p = e.target.closest('[data-p]'); if (p) { pageVue = +p.dataset.p; rendre(); return; }
      const gb = e.target.closest('[data-g]'); if (gb && ok) { changerGabarit(n, pageVue, gb.dataset.g); return; }
      const ar = e.target.closest('.carte[data-art]'); if (ar) { ouvrirArticle(items[ar.dataset.art]); return; }
      if (e.target.id === 'm-regl') { e.preventDefault(); formNumero(n); }
    };
    if ($('m-num')) $('m-num').onchange = e => { if (e.target.value === '+') { formNumero(null); return; } numChoisi = e.target.value; SS('journal-num', numChoisi); pageVue = 0; rendre(); };
    $('m-libre').onclick = () => EditeurMEP.ouvrir(n, pageVue);
    $('m-prop').onclick = () => propositions(n);
    $('m-print').onclick = () => imprimer(n);
    if ($('m-boucle')) $('m-boucle').onclick = () => { n.boucle = n.boucle ? 0 : 1; sauver(n); toast(n.boucle ? '🔒 Numéro bouclé : les élèves ne peuvent plus changer la maquette' : '🔓 Numéro rouvert'); };
    if ($('m-imprime')) $('m-imprime').onclick = () => { if (confirm(`Le n° ${n.n} est imprimé ? Il passe dans les archives (on peut toujours le revoir et le réimprimer).`)) { n.etat = 'imprime'; n.boucle = 1; sauver(n, true);
      if (confirm(`Préparer tout de suite le n° ${(+n.n || 0) + 1} ?`)) formNumero(null, n); else rendre(); } };
    if ($('m-rouvre')) $('m-rouvre').onclick = () => { n.etat = ''; sauver(n); };
  }
  const placeDans = (n, id) => !!n.pages && Maquette.artsDe(n).some(o => o.id === id);
  // articles disponibles pour ce numéro : pas déjà dans un autre numéro imprimé
  function candidats(n) {
    const pris = new Set(); liste('numero').forEach(x => { if (x.id !== n.id && x.etat === 'imprime' && x.pages) Maquette.artsDe(x).forEach(o => pris.add(o.id)); });
    return liste('article').filter(a => !pris.has(a.id)).sort((a, b) => (b.etat === 'valide') - (a.etat === 'valide') || b.maj - a.maj);
  }
  function changerGabarit(n, p, gid) {
    const avant = Maquette.blocs(n, p);
    const perso = avant.some(b => !['tetiere', 'art', 'sommaire', 'ours'].includes(b.type));
    if (perso && !confirm('Cette page a été arrangée à la main (textes, photos, dessins…). Tout remplacer par ce gabarit ?')) return;
    const arts = avant.filter(b => b.type === 'art' && b.art).sort((a, b) => b.w * b.h - a.w * a.h).map(b => b.art);
    const l = Maquette.blocsDuGabarit(gid, {}, p);
    l.filter(b => b.type === 'art').sort((a, b) => b.w * b.h - a.w * a.h).forEach(b => { if (arts.length) b.art = arts.shift(); });
    n.pages[p] = {g: gid, blocs: l, fond: n.pages[p] && n.pages[p].fond}; sauver(n);
    if (arts.length) toast(`${arts.length} article${arts.length > 1 ? 's' : ''} retiré${arts.length > 1 ? 's' : ''} de la page (moins de cases)`);
  }
  function choisirArticle(n, p, bid, apres) {
    const b = Maquette.blocs(n, p).find(x => x.id === bid); if (!b || b.type !== 'art') return;
    const actuel = b.art && items[b.art] && !items[b.art].x ? items[b.art] : null, cap = Maquette.cap(b);
    const arts = candidats(n);
    const juge = a => { const r = motsDe(a) / cap; return r > 1.25 ? ['✂️ trop long', '#dc2626'] : r > 1.02 ? ['un peu long, ça se resserre', '#b45309'] : r < 0.35 ? ['un peu court', '#6b6459'] : ['✓ rentre bien', '#15803d']; };
    apresFeuille = apres || null;
    feuille(`<h3>Que mettre dans cette case ?</h3><p class="mut">Case de ${cap} mots environ${b.s && b.s.grand ? ' · le grand sujet de la Une' : ''}.</p>
      ${actuel ? `<div class="rangee" style="margin-bottom:10px"><button class="btn" data-o="ouvrir">✏️ Ouvrir « ${esc(actuel.titre || 'Sans titre')} »</button><button class="btn r" data-o="vider">Vider la case</button></div>` : ''}
      <div class="liste-ch">${arts.length ? arts.map(a => { const j = juge(a), ou = placeDans(n, a.id) && b.art !== a.id; return `<button data-id="${a.id}"><span class="etat ${a.etat || 'brouillon'}">${ETATS[a.etat] || 'Brouillon'}</span>
        <span style="min-width:0"><b>${esc(a.titre || 'Sans titre')}</b><br><span class="mut" style="font-size:13px">${motsDe(a)} mots${ou ? ' · déjà placé ailleurs (il sera déplacé)' : ''}</span></span><span class="ok" style="color:${j[1]}">${j[0]}</span></button>`; }).join('')
        : '<p class="vide">Pas encore d\'article. Écris-en un dans l\'onglet Articles !</p>'}</div>
      <div class="actions"><button class="btn" data-fermer>Fermer</button></div>`, f => {
      f.onclick = e => {
        const o = e.target.closest('[data-o]');
        if (o && o.dataset.o === 'vider') { delete b.art; sauver(n, true); fermer(); return; }
        if (o && o.dataset.o === 'ouvrir') { $('feuille').hidden = true; const ap = apresFeuille; apresFeuille = null; ouvrirArticle(actuel, ap); return; }
        const x = e.target.closest('[data-id]'); if (!x) return;
        Maquette.artsDe(n).forEach(o2 => { if (o2.id === x.dataset.id) delete o2.b.art; });
        b.art = x.dataset.id; sauver(n, true); fermer();
        if (items[x.dataset.id].etat !== 'valide') toast('ℹ️ Cet article n\'est pas encore validé par un prof');
      };
    });
  }
  function propositions(n) {
    const c = candidats(n).map(a => ({id: a.id, mots: motsDe(a), photo: !!(a.img && items[a.img] && items[a.img].d)}));
    if (!c.length) { toast('Il faut d\'abord des articles !'); return; }
    const nb = Maquette.nbPages(n);
    let props = Maquette.proposer(c, nb, 4);
    const dessiner = () => {
      feuille(`<h3>✨ Propositions de mise en page</h3><p class="mut">Avec les ${c.length} article${c.length > 1 ? 's' : ''} disponible${c.length > 1 ? 's' : ''} sur ${nb} page${nb > 1 ? 's' : ''} : le plus long à la Une, les brèves dans les petites cases. Choisis-en une, puis arrange-la dans la mise en page libre.</p>
        ${props.map((p, i) => `<div class="prop"><div class="rp"><b>Proposition ${i + 1}</b><span class="mut" style="font-size:13px">${p.places}/${p.total} cases remplies</span></div><div class="mini4" data-i="${i}" style="grid-template-columns:repeat(${Math.min(nb, 4)},1fr)"></div><button class="btn p" data-choix="${i}" style="width:100%">Choisir celle-ci</button></div>`).join('')}
        <div class="actions"><button class="btn" data-fermer>Fermer</button><button class="btn o" id="pr-encore">🔀 D'autres idées</button></div>`, f => {
        f.querySelectorAll('.mini4').forEach(box => {
          const p = props[+box.dataset.i], faux = Object.assign({}, n, {pages: p.pages});
          const W = (box.clientWidth - 6 * (Math.min(nb, 4) - 1)) / Math.min(nb, 4);
          for (let i = 0; i < nb; i++) { const cell = document.createElement('div'); box.appendChild(cell); poserPage(cell, Maquette.page(ctx(faux), i, 'papier'), W); }
        });
        f.querySelector('#pr-encore').onclick = () => { props = Maquette.proposer(c, nb, 4); dessiner(); };
        f.onclick = e => {
          const b = e.target.closest('[data-choix]'); if (!b) return;
          if (Maquette.artsDe(n).length && !confirm('Remplacer la maquette actuelle par cette proposition ?')) return;
          n.pages = JSON.parse(JSON.stringify(props[+b.dataset.choix].pages)); pageVue = 0; sauver(n, true); fermer(); toast('✨ Mise en page appliquée');
        };
      });
    };
    dessiner();
  }
  function formNumero(n, precedent, apres) {
    const nouveau = !n, p = precedent || liste('numero').sort((a, b) => (+b.n || 0) - (+a.n || 0))[0];
    if (nouveau && liste('numero').length && !peut('numeros')) { toast('Seule la rédaction en chef lance un nouveau numéro'); rendre(); return; }
    if (nouveau) {
      n = {id: uid('n'), t: 'numero', n: p ? (+p.n || 0) + 1 : 1, nom: p ? p.nom : '', slogan: p ? p.slogan : '', ecole: p ? p.ecole : '', parution: '', bouclage: '',
        nb: p ? Maquette.nbPages(p) : 2, rv: p && p.rv === 0 ? 0 : 1};
      // même mise en page que le numéro d'avant (sans ses articles), sinon les gabarits par défaut
      n.pages = p && p.pages ? JSON.parse(JSON.stringify(p.pages)).map(pg => { const t = {nb: 1, pages: [pg]}; Maquette.blocs(t, 0); const q = t.pages[0]; q.blocs.forEach(b => { delete b.art; }); return q; }) : [];
    }
    const ok = peut('numeros') || (nouveau ? !liste('numero').length : !n.boucle && peut('maquette')), nb = Maquette.nbPages(n);
    apresFeuille = apres || null;
    feuille(`<h3>${nouveau ? 'Nouveau numéro' : 'Réglages du numéro'}</h3>
      <div class="fiche-num"><label class="lab">Nom du journal</label><input class="inp" id="n-nom" maxlength="40" placeholder="ex. L'Écho du campus (vote sur le tableau des idées !)" value="${esc(n.nom)}">
      <label class="lab">Sous-titre</label><input class="inp" id="n-slogan" maxlength="80" placeholder="ex. Le journal des élèves, par les élèves" value="${esc(n.slogan)}">
      <div class="lignes"><div><label class="lab">Nombre de pages</label><select class="inp" id="n-nb">${[1, 2, 3, 4, 6, 8].map(x => `<option value="${x}" ${x === nb ? 'selected' : ''}>${x} page${x > 1 ? 's' : ''}</option>`).join('')}</select></div>
      <div><label class="lab">Impression</label><select class="inp" id="n-rv"><option value="1" ${n.rv !== 0 ? 'selected' : ''}>Recto-verso</option><option value="0" ${n.rv === 0 ? 'selected' : ''}>Recto seul</option></select></div></div>
      <p class="mut" id="n-feuilles" style="font-size:13.5px;margin:6px 0 0"></p>
      <div class="lignes"><div><label class="lab">Numéro</label><input class="inp" id="n-n" type="number" min="1" value="${esc(n.n)}"></div>
      <div><label class="lab">École</label><input class="inp" id="n-ecole" maxlength="50" value="${esc(n.ecole)}"></div>
      <div><label class="lab">Bouclage</label><input class="inp" id="n-bou" type="date" value="${esc(n.bouclage)}"></div>
      <div><label class="lab">Parution</label><input class="inp" id="n-par" type="date" value="${esc(n.parution)}"></div></div>
      <label class="mut" style="display:flex;gap:6px;margin-top:10px;font-size:14px"><input type="checkbox" id="n-entete" ${n.sansEntete ? '' : 'checked'}> Petit rappel du nom en haut des pages 2 et suivantes</label>
      <p class="mut" style="font-size:13.5px">Bouclage = date limite pour rendre les articles. Elle s'affiche avec un compte à rebours pour toute l'équipe.</p></div>
      <div class="actions">${!nouveau && peut('numeros') ? '<button class="btn r" id="n-sup">Supprimer</button>' : ''}<button class="btn" data-fermer>Annuler</button><button class="btn p" id="n-ok" ${ok ? '' : 'disabled'}>${nouveau ? 'Créer' : 'Enregistrer'}</button></div>`, f => {
      const feuilles = () => { const x = +f.querySelector('#n-nb').value, rv = f.querySelector('#n-rv').value === '1';
        f.querySelector('#n-feuilles').textContent = x === 1 ? '1 feuille A4, imprimée d\'un seul côté.' : rv ? `${Math.ceil(x / 2)} feuille${x > 2 ? 's' : ''} A4 imprimée${x > 2 ? 's' : ''} des deux côtés.` : `${x} feuilles A4 imprimées d'un seul côté.`; };
      feuilles(); f.querySelector('#n-nb').onchange = feuilles; f.querySelector('#n-rv').onchange = feuilles;
      f.querySelector('#n-ok').onclick = () => {
        const nouvNb = +f.querySelector('#n-nb').value;
        if (!nouveau && nouvNb < nb && n.pages && n.pages.slice(nouvNb).some((pg, i) => Maquette.blocs(n, nouvNb + i).some(b => b.art || b.type === 'texte' || b.type === 'image' || b.type === 'dessin'))
          && !confirm(`Passer à ${nouvNb} page${nouvNb > 1 ? 's' : ''} enlève les dernières pages et ce qu'il y a dessus (les articles restent dans l'onglet Articles). On continue ?`)) return;
        Object.assign(n, {nom: f.querySelector('#n-nom').value.trim(), slogan: f.querySelector('#n-slogan').value.trim(), n: f.querySelector('#n-n').value || n.n,
          ecole: f.querySelector('#n-ecole').value.trim(), bouclage: f.querySelector('#n-bou').value, parution: f.querySelector('#n-par').value,
          nb: nouvNb, rv: f.querySelector('#n-rv').value === '1' ? 1 : 0, sansEntete: f.querySelector('#n-entete').checked ? 0 : 1});
        ajusterPages(n);
        sauver(n, true); numChoisi = n.id; SS('journal-num', n.id); if (pageVue >= n.nb) pageVue = 0;
        const ap = apresFeuille; fermer(); if (!ap && vue !== 'maquette') aller('maquette');
      };
      const s = f.querySelector('#n-sup'); if (s) s.onclick = () => { if (confirm(`Supprimer le n° ${n.n} (la maquette, pas les articles) ?`)) { supprimer(n); numChoisi = ''; SS('journal-num', ''); fermer(); } };
    });
  }
  async function imprimer(n) {
    const box = $('impression'); box.innerHTML = ''; ajusterPages(n);
    const nb = Maquette.nbPages(n), rv = n.rv !== 0;
    box.style.cssText = 'display:block;position:absolute;left:-10000px;top:0';
    const pages = Array.from({length: nb}, (_, p) => { const el = Maquette.page(ctx(n), p, 'papier'); box.appendChild(el); return el; });
    await Promise.all([...box.querySelectorAll('img')].map(i => i.complete ? 0 : new Promise(ok => { i.onload = i.onerror = ok; })));
    if (document.fonts && document.fonts.ready) { try { await document.fonts.ready; } catch (e) {} }
    let trop = []; pages.forEach(el => { trop = trop.concat(Maquette.ajuster(el)); });
    let vides = 0; for (let p = 0; p < nb; p++) Maquette.blocs(n, p).forEach(b => { if (b.type === 'art' && !(b.art && items[b.art] && !items[b.art].x)) vides++; });
    box.removeAttribute('style');
    const pasVal = Maquette.artsDe(n).filter(o => items[o.id] && items[o.id].etat !== 'valide').length;
    const feuilles = nb === 1 ? 'Une seule page : 1 feuille, d\'un seul côté.'
      : rv ? `Les ${nb} pages sortent sur ${Math.ceil(nb / 2)} feuille${nb > 2 ? 's' : ''} : ${Array.from({length: Math.ceil(nb / 2)}, (_, i) => `<b>feuille ${i + 1}</b> = page ${2 * i + 1}${2 * i + 2 <= nb ? ` (recto) + page ${2 * i + 2} (verso)` : ''}`).join(', ')}.`
        : `${nb} feuilles, une page par feuille.`;
    feuille(`<h3>🖨️ Imprimer le n° ${esc(n.n)}</h3>
      ${trop.length || vides || pasVal ? `<div class="nouveau">${vides ? `⚠️ ${vides} case${vides > 1 ? 's' : ''} d'article vide${vides > 1 ? 's' : ''}.<br>` : ''}${trop.length ? `✂️ ${trop.length} texte${trop.length > 1 ? 's' : ''} trop long${trop.length > 1 ? 's' : ''} : la fin sera coupée.<br>` : ''}${pasVal ? `ℹ️ ${pasVal} article${pasVal > 1 ? 's' : ''} pas encore validé${pasVal > 1 ? 's' : ''} par un prof.` : ''}</div>` : '<p>✅ Tout est prêt.</p>'}
      <ol style="padding-left:20px;margin:8px 0"><li>${nb > 1 && rv ? 'Choisis <b>Recto-verso</b> (« retourner sur le bord long »), ' : 'Choisis '}papier <b>A4</b>, échelle <b>100 %</b> (« taille réelle »), sans marges ajoutées.</li>
      <li>${feuilles}</li>
      <li>${nb > 2 ? 'Agrafe en haut à gauche… et distribue ! ' : 'Distribue ! '}Pour garder un PDF : choisis « Enregistrer en PDF » comme imprimante.</li></ol>
      <div class="actions"><button class="btn" data-fermer>Annuler</button><button class="btn p" id="pr-go">🖨️ Imprimer</button></div>`, f => {
      f.querySelector('#pr-go').onclick = () => { $('feuille').hidden = true; setTimeout(() => { window.print(); }, 50); };
    });
  }
  function nouvelleImage(d, ancien) {
    const im = ancien && items[ancien] ? items[ancien] : {id: uid('i'), t: 'img'};
    im.d = d; im.x = 0; sauver(im, true); return im.id;
  }
  window.JournalAPI = {items, sauver, ctx, propre, reduire, toast, motsDe, choisirArticle, ouvrirArticle, nouvelleImage,
    reglagesNumero: (n, apres) => formNumero(n, null, apres || (() => EditeurMEP.redessiner())), rendre: () => rendre()};

  /* =================== ÉQUIPE =================== */
  // Kevin (03/11 soir) : la liste des membres ; lui (et ceux qui ont l'accès « Gérer l'équipe ») donne à chacun un ou plusieurs rôles
  // et des accès à la carte : accès total (l'autre prof), seulement les articles, seulement la mise en page, etc.
  function vEquipe(el) {
    const m = moi(), gere = peut('equipe'), ms = liste('membre').sort((a, b) => ACCES.length - accesDe(a).length - (ACCES.length - accesDe(b).length) || a.nom.localeCompare(b.nom));
    const msg = `Rejoins l'équipe du journal ! Installe l'appli : ${JI.lien} puis tape le code ${LS('journal-code') || ''}.`;
    const resume = x => { const a = accesDe(x); return a.length === ACCES.length ? '<span class="etat valide">Accès total</span>' : !a.length ? '<span class="etat brouillon">Lecture seule</span>'
      : a.map(k => `<span class="acc" title="${esc(ACC[k])}">${ACC[k].split(' ')[0]}</span>`).join(''); };
    el.innerHTML = `<h2 class="titre">L'équipe de rédaction</h2>
      <div class="carte"><div class="membre" style="border:0;padding:0">${avatar(moiId)}<div style="flex:1;min-width:0"><b>${esc(m.nom)}</b> (moi)<br><span class="mut" style="font-size:13.5px">${esc(rolesTxt(m))}</span><div class="accs">${resume(m)}</div></div><button class="btn petit" id="q-moi">Modifier</button></div></div>
      <h3 class="st">Les membres (${ms.length})</h3>
      ${gere ? '<p class="mut" style="font-size:13.5px;margin:-4px 0 8px">Touche un membre pour lui donner des rôles et des accès.</p>' : ''}
      <div class="carte">${ms.map(x => `<div class="membre" ${gere || x.id === moiId ? `data-mb="${x.id}" style="cursor:pointer"` : ''}>${avatar(x.id)}<div style="flex:1;min-width:0"><b>${esc(x.nom)}</b>${x.id === moiId ? ' (moi)' : ''}<br><span class="mut" style="font-size:13.5px">${esc(rolesTxt(x))}</span><div class="accs">${resume(x)}</div></div>${gere || x.id === moiId ? '<span class="mut">›</span>' : ''}</div>`).join('')}</div>
      <h3 class="st">Les accès</h3><div class="carte">${ACCES.map(a => `<p style="margin:0 0 6px;font-size:14.5px">${esc(a[1])}</p>`).join('')}<p class="mut" style="margin:6px 0 0;font-size:13.5px">Tout le monde peut lire, commenter, voter pour les idées et répondre aux réunions.</p></div>
      <h3 class="st">Les rôles dans un journal</h3><div class="carte">${ROLES.map(r => `<p style="margin:0 0 8px"><b>${r.ic} ${esc(r.nom)}</b><br><span class="mut">${esc(r.fait)}</span></p>`).join('')}</div>
      <h3 class="st">Inviter un élève</h3><div class="carte"><p class="mut" style="margin:0 0 8px">Envoie-lui ce message (WhatsApp, mail…) :</p><div class="odj" style="margin:0 0 8px">${esc(msg)}</div>
        <div class="rangee"><button class="btn p" id="q-copier">📋 Copier le message</button>${navigator.share ? '<button class="btn" id="q-part">📤 Partager</button>' : ''}</div></div>
      <h3 class="st">Installer l'appli</h3><div class="carte rangee"><button class="btn" id="q-tel">📱 Sur un téléphone</button><button class="btn" id="q-pc">💻 Sur un ordinateur (PC / Mac)</button></div>
      <h3 class="st">Partage avec l'équipe</h3><div class="carte">
        ${SCRIPT ? `<p style="margin:0 0 8px">Tout ce que tu fais part dans le tableau Google du journal et arrive chez les autres (toutes les 45 secondes quand l'appli est ouverte).</p><button class="btn" id="q-sync">⟳ Synchroniser maintenant</button>`
          : '<p style="margin:0">Pas encore relié au tableau Google du journal : pour l\'instant, chacun ne voit que ce qui est sur son appareil.</p>'}
        ${file.length ? `<p class="mut" style="margin:8px 0 0">${file.length} changement${file.length > 1 ? 's' : ''} en attente d'envoi.</p>` : ''}</div>`;
    el.onclick = e => {
      if (e.target.id === 'q-moi') { formMembre(m); return; }
      const b = e.target.closest('[data-mb]'); if (b) { formMembre(items[b.dataset.mb]); return; }
      if (e.target.id === 'q-copier') navigator.clipboard.writeText(msg).then(() => toast('📋 Message copié'), () => toast(msg));
      if (e.target.id === 'q-part') navigator.share({text: msg}).catch(() => {});
      if (e.target.id === 'q-tel') JI.lancer('tel'); if (e.target.id === 'q-pc') JI.lancer('pc');
      if (e.target.id === 'q-sync') synchro().then(() => toast('✓ Synchronisé'));
    };
  }
  function formMembre(x) {
    const soi = x.id === moiId, gere = peut('equipe');
    let roles = rolesDe(x).slice(), acces = x.acces ? x.acces.slice() : null; // acces null = « selon ses rôles »
    const gestionnaires = liste('membre').filter(y => accesDe(y).includes('equipe'));
    const dessiner = () => {
      const eff = acces || accesSelonRoles(roles);
      feuille(`<h3>${soi ? 'Moi' : esc(x.nom)}</h3>
        ${soi || gere ? `<label class="lab">Prénom ou nom</label><input class="inp" id="mb-nom" maxlength="30" value="${esc(x.nom)}">` : ''}
        <label class="lab">Rôles ${gere ? '(un ou plusieurs)' : ''}</label>
        <div class="choix-roles">${ROLES.map(r => `<label class="${roles.includes(r.id) ? 'on' : ''}"><input type="checkbox" data-r="${r.id}" ${roles.includes(r.id) ? 'checked' : ''} ${gere ? '' : 'disabled'}>${r.ic} ${esc(r.nom)}</label>`).join('')}</div>
        <label class="lab">Accès dans l'appli</label>
        ${gere ? `<div class="rangee" style="margin-bottom:8px"><button class="btn petit ${eff.length === ACCES.length && acces ? 'p' : ''}" data-pre="tout">⭐ Accès total</button><button class="btn petit ${!acces ? 'p' : ''}" data-pre="roles">Selon ses rôles</button><button class="btn petit" data-pre="rien">👀 Lecture seule</button></div>` : ''}
        <div class="choix-acces">${ACCES.map(a => `<label><input type="checkbox" data-acc="${a[0]}" ${eff.includes(a[0]) ? 'checked' : ''} ${gere ? '' : 'disabled'}><span>${esc(a[1])}</span></label>`).join('')}</div>
        ${!gere ? '<p class="mut" style="font-size:13.5px">Les rôles et les accès sont donnés par la rédaction en chef.</p>' : !acces ? '<p class="mut" style="font-size:13.5px">Les accès suivent ses rôles. Coche ou décoche pour faire sur mesure.</p>' : ''}
        <label class="lab">Code personnel</label>
        <div class="rangee">${soi ? '<button class="btn petit" id="mb-pin">🔒 Changer mon code personnel</button>' : x.pin ? (gere ? '<span class="mut" style="font-size:14px">🔒 A un code.</span><button class="btn petit" id="mb-pin-x">Effacer son code (oublié)</button>' : '<span class="mut">🔒 Oui</span>') : '<span class="mut" style="font-size:14px">Pas encore de code (il le créera à sa prochaine ouverture).</span>'}</div>
        <div class="actions">${!soi && gere ? '<button class="btn r" id="mb-sup">Retirer</button>' : ''}<button class="btn" data-fermer>Annuler</button><button class="btn p" id="mb-ok">Enregistrer</button></div>`, f => {
        f.oninput = e => {
          const r = e.target.dataset.r, a = e.target.dataset.acc;
          if (r) { roles = roles.filter(z => z !== r); if (e.target.checked) roles.push(r); if (!roles.length) roles = ['journaliste']; dessiner(); }
          if (a) { acces = (acces || accesSelonRoles(roles)).filter(z => z !== a); if (e.target.checked) acces.push(a); dessiner(); }
        };
        f.onclick = e => {
          const pre = e.target.closest('[data-pre]'); if (pre) { acces = pre.dataset.pre === 'tout' ? ACCES.map(a => a[0]) : pre.dataset.pre === 'rien' ? [] : null; dessiner(); return; }
          if (e.target.id === 'mb-ok') {
            const nn = f.querySelector('#mb-nom') ? f.querySelector('#mb-nom').value.trim() : x.nom;
            const nvAcces = gere ? acces : x.acces;
            // il faut toujours au moins une personne qui gère l'équipe
            if (gere && gestionnaires.length === 1 && gestionnaires[0].id === x.id && !(nvAcces || accesSelonRoles(roles)).includes('equipe')) { toast('Il faut garder au moins une personne qui gère l\'équipe'); return; }
            if (nn.length >= 2) x.nom = nn;
            if (gere) { x.roles = roles; x.role = roles[0]; x.acces = acces; if (!acces) delete x.acces; }
            sauver(x, true); fermer(); return;
          }
          if (e.target.id === 'mb-pin') { fermer(); x.pin = ''; montrer('ecran-pin'); setTimeout(() => $('pin1').focus(), 200); return; }
          if (e.target.id === 'mb-pin-x' && confirm(`Effacer le code personnel de ${x.nom} ? À sa prochaine connexion, il retrouvera son profil avec son prénom et créera un nouveau code.`)) { x.pin = ''; sauver(x, true); toast('Code effacé'); fermer(); return; }
          if (e.target.id === 'mb-sup' && confirm(`Retirer ${x.nom} de l'équipe ? (Ses articles restent.)`)) { supprimer(x); fermer(); }
        };
      });
    };
    dessiner();
  }

  /* =================== MESSAGES =================== */
  // Kevin (03/11 soir) : une messagerie « comme WhatsApp » pour toute l'équipe, avec des sujets de discussion.
  // Tout reste visible par tout le monde (pas de messages cachés). On tague « pour qui » (@prénom ou @tous) :
  // la personne taguée voit une pastille sur l'icône de l'appli (et une alerte si elle l'a autorisée).
  // Stockés comme des « com » (le script Google les accepte déjà) : sujet {t:'com', g:'fil', nom, ic}, message {t:'com', g:'msg', fil, texte, pour: [ids | 'tous'], cree}.
  const GENERAL = {id: 'fil-general', nom: 'Discussion générale', ic: '💬', fixe: 1};
  const ICONES_FIL = ['💬', '📰', '📸', '✍️', '📅', '🎨', '⚽', '🎤', '😂', '🧠', '📣', '🌍'];
  const estMsg = i => i && i.t === 'com' && i.g === 'msg' && !i.x;
  if (!LS('journal-msg-depuis')) LS('journal-msg-depuis', String(Date.now())); // les anciens messages ne comptent pas comme « non lus » sur un nouvel appareil
  const msgDepuis = +LS('journal-msg-depuis') || 0;
  const luDe = f => Math.max(+LS('journal-lu-' + f) || 0, msgDepuis);
  const fils = () => [GENERAL].concat(liste('com').filter(c => c.g === 'fil'));
  const msgsDe = f => liste('com').filter(c => c.g === 'msg' && (c.fil || GENERAL.id) === f).sort((a, b) => a.cree - b.cree);
  const pourMoi = m => Array.isArray(m.pour) && (m.pour.includes(moiId) || m.pour.includes('tous'));
  const nonLus = f => msgsDe(f).filter(m => m.par !== moiId && m.cree > luDe(f));
  const tousNonLus = () => fils().reduce((s, f) => s.concat(nonLus(f.id)), []);
  let filOuvert = SS('journal-fil') || '', brouillons = {}, pourChoisis = [];
  const hhmm = ms => { const d = new Date(ms); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };
  const jourDe = ms => { const d = new Date(ms), s = iso(d); return s === auj() ? 'Aujourd\'hui' : s === iso(new Date(Date.now() - 86400000)) ? 'Hier' : `${JOURS[d.getDay()]} ${d.getDate()} ${MOIS[d.getMonth()]}`; };
  const pourTxt = p => (p || []).map(x => x === 'tous' ? 'tout le monde' : nomDe(x)).join(', ');

  // pastille sur l'icône de l'appli : les messages non lus qui me sont adressés
  function majBadge() {
    const n = moiId ? tousNonLus().filter(pourMoi).length : 0;
    try { if ('setAppBadge' in navigator) (n ? navigator.setAppBadge(n) : navigator.clearAppBadge()).catch(() => {}); } catch (e) {}
    garderCfg(n);
  }
  // ce que le service worker garde pour vérifier les messages quand l'appli est fermée (Android / Chrome, de temps en temps)
  function garderCfg(n) {
    const code = LS('journal-code'); if (!SCRIPT || !code || !moiId) return;
    const vus = tousNonLus().map(m => m.id);
    const cfg = {id: '_cfg', script: SCRIPT, code, moi: moiId, n, depuis, lu: {}, vus};
    fils().forEach(f => { cfg.lu[f.id] = luDe(f.id); });
    DB.mettre([cfg]);
  }
  // alerte (notification) pour un nouveau message qui m'est adressé, si l'appli est cachée ou ailleurs
  function alerter(nouveaux) {
    const pourMoiN = nouveaux.filter(m => estMsg(m) && m.par !== moiId && pourMoi(m) && m.cree > luDe(m.fil || GENERAL.id));
    if (!pourMoiN.length) return;
    const ici = document.visibilityState === 'visible' && vue === 'messages' && filOuvert;
    pourMoiN.forEach(m => {
      const f = m.fil || GENERAL.id; if (ici && filOuvert === f) return;
      const fi = items[f] || GENERAL, titre = `${nomDe(m.par)} · ${fi.ic || '💬'} ${fi.nom}`, corps = String(m.texte || '').slice(0, 140);
      if (document.visibilityState === 'visible') { toast(`💬 ${nomDe(m.par)} : ${corps.slice(0, 60)}`); return; }
      if (!('Notification' in window) || Notification.permission !== 'granted') return;
      const opts = {body: corps, icon: '../icones/journal-192.png', badge: '../icones/journal-192.png', tag: 'journal-' + f, renotify: true, data: {fil: f}};
      if (navigator.serviceWorker && navigator.serviceWorker.controller) navigator.serviceWorker.ready.then(r => r.showNotification(titre, opts)).catch(() => {});
      else try { new Notification(titre, opts); } catch (e) {}
    });
  }
  async function activerAlertes() {
    if (!('Notification' in window)) {
      toast(JI.ios && !JI.enAppli() ? '📲 Sur iPhone, installe d\'abord l\'appli (écran d\'accueil) pour recevoir les alertes' : 'Ce navigateur ne sait pas faire d\'alertes');
      return;
    }
    const p = await Notification.requestPermission();
    if (p === 'granted') {
      toast('🔔 Alertes activées');
      try { const reg = await navigator.serviceWorker.ready; if (reg.periodicSync) await reg.periodicSync.register('journal-messages', {minInterval: 30 * 60 * 1000}); } catch (e) {}
      majBadge();
    } else toast('Alertes refusées : tu peux les réactiver dans les réglages du téléphone');
    rendre();
  }

  function vMessages(el) {
    if (filOuvert && (filOuvert === GENERAL.id || (items[filOuvert] && !items[filOuvert].x))) return vFil(el);
    filOuvert = ''; SS('journal-fil', '');
    const fs = fils().map(f => { const ms = msgsDe(f.id); return {f, der: ms[ms.length - 1], nl: nonLus(f.id)}; })
      .sort((a, b) => (b.f.fixe || 0) - (a.f.fixe || 0) || ((b.der && b.der.cree) || b.f.cree || 0) - ((a.der && a.der.cree) || a.f.cree || 0));
    const alertes = 'Notification' in window ? Notification.permission : 'non';
    el.innerHTML = `<h2 class="titre">Messages</h2>
      <p class="mut" style="margin-top:-6px">Toute l'équipe peut lire toutes les discussions. Tape <b>@</b> pour dire à qui tu écris : la personne est prévenue.</p>
      ${alertes === 'default' || alertes === 'non' && JI.ios && !JI.enAppli() ? `<div class="nouveau rangee" style="justify-content:space-between">🔔 Être prévenu quand on t'écrit (pastille sur l'icône) <button class="btn p petit" id="ms-alertes">Activer</button></div>` : ''}
      ${fs.map(({f, der, nl}) => { const at = nl.some(pourMoi);
        return `<div class="carte fil" data-fil="${esc(f.id)}"><span class="fil-ic">${esc(f.ic || '💬')}</span><div class="fil-t"><b>${esc(f.nom)}</b>
          <span class="mut fil-der">${der ? `${der.par === moiId ? 'Moi' : esc(nomDe(der.par))} : ${esc(String(der.texte || '').slice(0, 80))}` : 'Pas encore de message'}</span></div>
          <div class="fil-d">${der ? `<span class="mut" style="font-size:12px">${esc(jourDe(der.cree) === 'Aujourd\'hui' ? hhmm(der.cree) : jourDe(der.cree))}</span>` : ''}${nl.length ? `<span class="fil-nl ${at ? 'at' : ''}">${at ? '@ ' : ''}${nl.length}</span>` : ''}</div></div>`; }).join('')}
      <button class="ajout" id="ms-nouv">＋ Nouveau sujet de discussion</button>`;
    el.onclick = e => {
      const f = e.target.closest('[data-fil]'); if (f) { ouvrirFil(f.dataset.fil); return; }
      if (e.target.id === 'ms-nouv') formFil();
      if (e.target.id === 'ms-alertes') activerAlertes();
    };
  }
  function ouvrirFil(id) { filOuvert = id; SS('journal-fil', id); pourChoisis = []; rendre(); }
  function formFil(f) {
    const nouveau = !f; f = f || {id: uid('f'), t: 'com', g: 'fil', nom: '', ic: '💬', cree: Date.now()};
    let ic = f.ic || '💬';
    feuille(`<h3>${nouveau ? 'Nouveau sujet de discussion' : 'Le sujet'}</h3>
      <label class="lab">Sujet</label><input class="inp" id="fi-nom" maxlength="40" placeholder="Ex. : Article sur la cantine, Photos du voyage…" value="${esc(f.nom)}">
      <label class="lab">Icône</label><div class="rangee" id="fi-ic">${ICONES_FIL.map(x => `<button class="btn petit ${x === ic ? 'p' : ''}" data-ic="${x}" style="font-size:20px">${x}</button>`).join('')}</div>
      <p class="mut" style="font-size:13.5px">Tout le monde dans l'équipe verra ce sujet et pourra y écrire.</p>
      <div class="actions">${!nouveau && (f.par === moiId || peut('supprimer')) ? '<button class="btn r" id="fi-sup">Supprimer</button>' : ''}<button class="btn" data-fermer>Annuler</button><button class="btn p" id="fi-ok">${nouveau ? 'Créer' : 'Enregistrer'}</button></div>`, el => {
      el.onclick = e => {
        const b = e.target.closest('[data-ic]'); if (b) { ic = b.dataset.ic; el.querySelectorAll('[data-ic]').forEach(x => x.classList.toggle('p', x === b)); return; }
        if (e.target.id === 'fi-ok') {
          const n = el.querySelector('#fi-nom').value.trim(); if (n.length < 2) { toast('Donne un nom au sujet'); return; }
          f.nom = n; f.ic = ic; sauver(f, true); if (nouveau) { filOuvert = f.id; SS('journal-fil', f.id); } fermer(); return;
        }
        if (e.target.id === 'fi-sup' && confirm(`Supprimer le sujet « ${f.nom} » et ses messages ?`)) {
          msgsDe(f.id).forEach(m => { m.x = 1; sauver(m, true); }); supprimer(f); filOuvert = ''; SS('journal-fil', ''); fermer();
        }
      };
      setTimeout(() => { const i = el.querySelector('#fi-nom'); if (i) i.focus(); }, 100);
    });
  }
  // texte d'un message : échappé, liens cliquables, @prénom en couleur
  function texteMsg(t) {
    let h = esc(t).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    const noms = liste('membre').map(m => m.nom).filter(Boolean).sort((a, b) => b.length - a.length);
    const moiNom = (moi() && moi().nom || '').toLowerCase();
    noms.concat(['tous']).forEach(n => {
      const re = new RegExp('@' + esc(n).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\wÀ-ÿ])', 'gi');
      h = h.replace(re, s => `<b class="at ${n.toLowerCase() === moiNom || n === 'tous' ? 'moi' : ''}">${s}</b>`);
    });
    return h.replace(/\n/g, '<br>');
  }
  function bulles(f) {
    const ms = msgsDe(f); let html = '', jour = '', avant = null;
    ms.forEach(m => {
      const j = jourDe(m.cree); if (j !== jour) { html += `<div class="jour"><span>${esc(j)}</span></div>`; jour = j; avant = null; }
      const mien = m.par === moiId, suite = avant && avant.par === m.par && m.cree - avant.cree < 5 * 60000;
      html += `<div class="msg ${mien ? 'mien' : ''} ${suite ? 'suite' : ''} ${!mien && pourMoi(m) ? 'pourmoi' : ''}" data-msg="${esc(m.id)}">
        ${!mien && !suite ? avatar(m.par) : '<span class="av-vide"></span>'}
        <div class="bul">${!mien && !suite ? `<div class="qui" style="color:${couleurDe(m.par)}">${esc(nomDe(m.par))}</div>` : ''}
          <div class="txt">${texteMsg(m.texte)}</div>
          <div class="pied">${m.pour && m.pour.length ? `<span class="pour">→ ${esc(pourTxt(m.pour))}</span>` : ''}<span>${hhmm(m.cree)}</span>${mien && file.includes(m.id) ? ' <span title="Pas encore envoyé">🕓</span>' : ''}</div>
          ${mien || peut('supprimer') ? '<button class="msg-sup" data-msup="1" hidden>🗑 Supprimer</button>' : ''}</div></div>`;
      avant = m;
    });
    return html || '<div class="vide">Pas encore de message. Écris le premier !</div>';
  }
  function marquerLu(f) {
    const ms = msgsDe(f); if (!ms.length) return;
    const t = Math.max(ms[ms.length - 1].cree, Date.now());
    if (t > (+LS('journal-lu-' + f) || 0)) LS('journal-lu-' + f, String(t));
  }
  function majFil() {
    const l = $('chat-liste'); if (!l) return;
    const bas = innerHeight + scrollY >= document.documentElement.scrollHeight - 140;
    l.innerHTML = bulles(filOuvert);
    if (document.visibilityState === 'visible') marquerLu(filOuvert);
    if (bas) scrollTo(0, document.documentElement.scrollHeight);
    majBulles();
  }
  function vFil(el) {
    const f = filOuvert === GENERAL.id ? GENERAL : items[filOuvert];
    const membres = liste('membre').filter(m => m.id !== moiId).sort((a, b) => a.nom.localeCompare(b.nom));
    el.innerHTML = `<div class="chat-tete"><button class="btn petit" id="ch-ret">‹ Sujets</button><b class="ch-nom">${esc(f.ic || '💬')} ${esc(f.nom)}</b>
        ${!f.fixe && (f.par === moiId || peut('supprimer')) ? '<button class="btn petit" id="ch-mod">⋯</button>' : ''}</div>
      <div id="chat-liste">${bulles(f.id)}</div>
      <div class="compo" id="compo">
        <div class="choix-pour" id="ch-pour" hidden><span class="mut" style="font-size:13px">Pour qui ?</span>
          <button type="button" class="pq" data-pq="tous">📣 Tout le monde</button>${membres.map(m => `<button type="button" class="pq" data-pq="${esc(m.id)}">${esc(m.nom)}</button>`).join('')}</div>
        <div class="pour-ch" id="ch-tags"></div>
        <div class="compo-l"><button type="button" class="at-b" id="ch-at" title="Pour qui ?">@</button>
          <textarea id="ch-txt" rows="1" maxlength="2000" placeholder="Message…">${esc(brouillons[f.id] || '')}</textarea>
          <button type="button" class="env" id="ch-env" title="Envoyer">➤</button></div>
      </div>`;
    $('vue').classList.add('en-chat');
    const tx = $('ch-txt'), grandir = () => { tx.style.height = 'auto'; tx.style.height = Math.min(tx.scrollHeight, 140) + 'px'; };
    const majTags = () => {
      $('ch-tags').innerHTML = pourChoisis.map(p => `<span class="tag">@${esc(p === 'tous' ? 'tous' : nomDe(p))}<button type="button" data-tx="${esc(p)}">✕</button></span>`).join('');
      el.querySelectorAll('[data-pq]').forEach(b => b.classList.toggle('on', pourChoisis.includes(b.dataset.pq)));
    };
    const choisir = (p, insere) => {
      if (!pourChoisis.includes(p)) pourChoisis.push(p);
      if (insere) { // remplace le « @ » tapé par « @Prénom »
        const v = tx.value, i = tx.selectionStart, a = v.lastIndexOf('@', i - 1), mot = '@' + (p === 'tous' ? 'tous' : nomDe(p)) + ' ';
        tx.value = a >= 0 ? v.slice(0, a) + mot + v.slice(i) : v + mot; brouillons[f.id] = tx.value;
      }
      $('ch-pour').hidden = true; majTags(); tx.focus();
    };
    const envoyer = () => {
      const t = tx.value.trim(); if (!t) return;
      const pour = pourChoisis.slice(), bas = t.toLowerCase();
      liste('membre').forEach(m => { if (m.id !== moiId && bas.includes('@' + m.nom.toLowerCase()) && !pour.includes(m.id)) pour.push(m.id); });
      if (/@tous\b/i.test(t) && !pour.includes('tous')) pour.push('tous');
      sauver({id: uid('msg'), t: 'com', g: 'msg', fil: f.id, texte: t.slice(0, 2000), pour, cree: Date.now()}, true);
      tx.value = ''; brouillons[f.id] = ''; pourChoisis = []; $('ch-pour').hidden = true; $('ch-pour').dataset.ouvert = ''; majTags(); grandir();
      $('chat-liste').innerHTML = bulles(f.id); marquerLu(f.id); scrollTo(0, document.documentElement.scrollHeight); tx.focus();
    };
    tx.oninput = () => {
      brouillons[f.id] = tx.value; grandir();
      const i = tx.selectionStart, avant = tx.value.slice(0, i);
      if (/(^|\s)@[^\s@]{0,20}$/.test(avant)) { // on tape @… : on propose les prénoms
        const q = avant.slice(avant.lastIndexOf('@') + 1).toLowerCase(); $('ch-pour').hidden = false;
        let vis = 0; el.querySelectorAll('[data-pq]').forEach(b => { b.hidden = !!q && !(b.dataset.pq === 'tous' ? 'tous tout le monde' : b.textContent).toLowerCase().includes(q); vis += !b.hidden; });
        if (!vis) $('ch-pour').hidden = true;
      } else if (!$('ch-pour').dataset.ouvert) $('ch-pour').hidden = true;
    };
    tx.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey && !JI.mobile) { e.preventDefault(); envoyer(); } };
    el.onclick = e => {
      if (e.target.id === 'ch-ret') { filOuvert = ''; SS('journal-fil', ''); $('vue').classList.remove('en-chat'); rendre(); scrollTo(0, 0); return; }
      if (e.target.id === 'ch-mod') { formFil(f); return; }
      if (e.target.id === 'ch-env') { envoyer(); return; }
      if (e.target.id === 'ch-at') { const p = $('ch-pour'); p.hidden = !p.hidden; p.dataset.ouvert = p.hidden ? '' : '1'; p.querySelectorAll('[data-pq]').forEach(b => { b.hidden = false; }); return; }
      const pq = e.target.closest('[data-pq]'); if (pq) { const tape = /(^|\s)@[^\s@]{0,20}$/.test(tx.value.slice(0, tx.selectionStart)); $('ch-pour').dataset.ouvert = ''; choisir(pq.dataset.pq, tape); return; }
      const x = e.target.closest('[data-tx]'); if (x) { pourChoisis = pourChoisis.filter(p => p !== x.dataset.tx); majTags(); return; }
      if (e.target.closest('[data-msup]')) { const m = items[e.target.closest('[data-msg]').dataset.msg]; if (m && confirm('Supprimer ce message ?')) { m.x = 1; sauver(m, true); majFil(); } return; }
      const b = e.target.closest('.msg .bul'); if (b && !e.target.closest('a')) { const s = b.querySelector('.msg-sup'); if (s) s.hidden = !s.hidden; }
    };
    majTags(); grandir(); marquerLu(f.id);
    requestAnimationFrame(() => scrollTo(0, document.documentElement.scrollHeight));
  }

  /* ---------- démarrage ---------- */
  DB.tout().then(tous => { tous.forEach(i => { if (String(i.id)[0] === '_') return; if (!items[i.id] || (items[i.id].maj || 0) < (i.maj || 0)) items[i.id] = i; }); entrer(); });
  window.addEventListener('afterprint', () => { $('impression').innerHTML = ''; });
})();
