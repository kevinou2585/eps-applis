/* ====== Journal de l'école (kevin, 3 nov. 2026) ======
   Appli à part (installable sur téléphone et ordinateur) + tuile dans EPS ultime, fermée par un code (kevin : erasmus…, empreinte dans CODE_SHA).
   Équipe : 3-4 élèves (16-18 ans) et 2 profs (directeur de la publication / rédacteur en chef, qui valident).
   Onglets : Accueil, Agenda (réunions + réponses), Articles (éditeur avec mise en forme, photo, relecture), Idées (post-it + votes),
   Journal (numéros, 4 pages A4 recto-verso, gabarits, propositions automatiques, impression). Équipe : bouton 👥 en haut.
   Données partagées : un Google Sheet de kevin (script journal/google/Journal.gs, URL dans SCRIPT ci-dessous).
   Chaque chose = un « élément » {id, t: type, maj, par, x: supprimé, …}. Le plus récent gagne.
   Types : membre, reunion, rep (réponse à une réunion), article, img (photo d'un article), idee, vote, com (commentaire), numero.
   Sur l'appareil : IndexedDB « journal » (+ localStorage journal-*). Sans SCRIPT : tout reste sur l'appareil. */
(() => {
  const SCRIPT = ''; // URL /exec du script Google « Journal de l'école » de kevin (à remplir quand il l'a déployé)
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
    {id: 'maquettiste', nom: 'Maquettiste', ic: '📐', fait: 'Met en page : place les articles et les photos sur les 4 pages.'},
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
  const liste = t => Object.values(items).filter(i => i.t === t && !i.x);
  let file = []; try { file = JSON.parse(LS('journal-file') || '[]'); } catch (e) {}
  const garderFile = () => LS('journal-file', JSON.stringify(file));
  let moiId = LS('journal-moi') || '';
  const moi = () => items[moiId] || null;
  const estChef = () => { const m = moi(); return !!(m && ROLE[m.role] && ROLE[m.role].chef); };
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
  let enCours = false, minuteur = null, depuis = +LS('journal-depuis') || 0, etatSync = '';
  const planifier = () => { clearTimeout(minuteur); minuteur = setTimeout(synchro, 1500); };
  function montrerSync(e) {
    etatSync = e;
    const p = $('sync'); if (!p) return;
    const t = {local: ['Sur cet appareil', 'att'], hors: ['Hors ligne', 'att'], envoi: ['⟳ …', ''], ok: ['✓ À jour', ''], err: ['⚠️ Pas envoyé', 'ko'], code: ['⚠️ Code', 'ko']}[e] || ['…', ''];
    p.textContent = file.length && e !== 'envoi' ? (e === 'ok' ? '⟳ …' : t[0] + ` (${file.length})`) : t[0];
    p.className = 'pastille ' + t[1];
  }
  async function synchro() {
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
      if (file.length) planifier();
    } catch (e) {
      montrerSync(e.message === 'code' ? 'code' : 'err');
    } finally { enCours = false; }
  }
  function apresReception(changes) {
    const ed = edition && items[edition.id];
    if (ed && changes.some(c => c.id === edition.id && c.par !== moiId)) toast(`⚠️ ${nomDe(ed.par)} vient aussi de modifier cet article`);
    if (!$('app').hidden && $('vue-editeur').hidden && $('feuille').hidden) rendre();
    else if (!$('app').hidden) majBulles();
  }
  setInterval(() => { if (document.visibilityState === 'visible' && !$('app').hidden) synchro(); }, 45000);
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
  const depuisEps = SS('journal-eps') === '1';
  const ecrans = ['ecran-install', 'ecran-code', 'ecran-nom', 'app'];
  const montrer = id => ecrans.forEach(e => { $(e).hidden = e !== id; });
  const sha = async t => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)))].map(b => b.toString(16).padStart(2, '0')).join('');

  function entrer() {
    if (LS('journal-ok') !== '1') {
      if (!enAppli() && !depuisEps && SS('journal-sans') !== '1') return montrer('ecran-install');
      montrer('ecran-code'); setTimeout(() => $('code').focus(), 200); return;
    }
    if (!moi() || moi().x) { montrer('ecran-nom'); setTimeout(() => $('nom').focus(), 200); return; }
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
  $('f-nom').onsubmit = e => {
    e.preventDefault();
    const n = $('nom').value.trim().replace(/\s+/g, ' ');
    if (n.length < 2) { $('nom-err').textContent = 'Écris ton prénom.'; return; }
    // déjà dans l'équipe (même prénom) ? on reprend sa fiche (nouvel appareil)
    const meme = liste('membre').find(m => m.nom.toLowerCase() === n.toLowerCase());
    if (meme && confirm(`${meme.nom} (${roleNom(meme.role)}) est déjà dans l'équipe. C'est toi ?`)) { moiId = meme.id; }
    else {
      moiId = uid('m');
      // ouvert depuis EPS ultime (appli des profs) : prof = rédacteur en chef ; sinon journaliste
      sauver({id: moiId, t: 'membre', nom: n, role: depuisEps ? 'redac-chef' : 'journaliste', cree: Date.now(), par: moiId}, true);
    }
    LS('journal-moi', moiId); entrer();
  };

  /* ---------- navigation ---------- */
  let vue = 'accueil';
  const VUES = {accueil: vAccueil, agenda: vAgenda, articles: vArticles, idees: vIdees, maquette: vMaquette, equipe: vEquipe};
  const TYPES_ONGLET = {agenda: ['reunion'], articles: ['article', 'com'], idees: ['idee'], maquette: ['numero']};
  const vuLe = v => +LS('journal-vu-' + v) || 0;
  function majBulles() {
    document.querySelectorAll('#onglets button').forEach(b => {
      const v = b.dataset.v; b.classList.toggle('on', v === vue);
      let n = 0; if (TYPES_ONGLET[v] && v !== vue) { const t0 = vuLe(v); n = Object.values(items).filter(i => TYPES_ONGLET[v].includes(i.t) && !i.x && i.par !== moiId && i.maj > t0 && t0).length; }
      let bu = b.querySelector('.bulle'); if (!n) { if (bu) bu.remove(); return; }
      if (!bu) { bu = document.createElement('span'); bu.className = 'bulle'; b.querySelector('i').after(bu); } bu.textContent = n > 9 ? '9+' : n;
    });
    montrerSync(etatSync || (SCRIPT ? '' : 'local'));
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
    $('vue').innerHTML = ''; VUES[vue]($('vue')); majBulles();
  }
  $('onglets').onclick = e => { const b = e.target.closest('button'); if (b) aller(b.dataset.v); };
  $('bt-equipe').onclick = () => aller('equipe');

  /* ---------- fenêtre du bas ---------- */
  function feuille(html, brancher) {
    $('feuille-f').innerHTML = html; $('feuille').hidden = false;
    $('feuille').onclick = e => { if (e.target === $('feuille') || e.target.closest('[data-fermer]')) fermer(); };
    if (brancher) brancher($('feuille-f'));
  }
  function fermer() { $('feuille').hidden = true; $('feuille-f').innerHTML = ''; rendre(); }

  /* =================== ACCUEIL =================== */
  function vAccueil(el) {
    const m = moi(), t0 = +LS('journal-vu-accueil-avant') || 0;
    const nouveaux = Object.values(items).filter(i => !i.x && i.par !== moiId && i.maj > t0 && t0 && ['reunion', 'article', 'idee', 'com'].includes(i.t));
    const cpt = t => nouveaux.filter(i => i.t === t).length;
    const bouts = [[cpt('reunion'), 'réunion', 'réunions'], [cpt('article'), 'article', 'articles'], [cpt('idee'), 'idée', 'idées'], [cpt('com'), 'commentaire', 'commentaires']]
      .filter(x => x[0]).map(x => `${x[0]} ${x[0] > 1 ? x[2] : x[1]}`);
    const prochaine = liste('reunion').filter(r => r.date >= auj()).sort((a, b) => (a.date + (a.h || '')).localeCompare(b.date + (b.h || '')))[0];
    const n = numCourant();
    const arts = liste('article'), mesArts = arts.filter(a => a.par === moiId || (a.auteurs || '').toLowerCase().includes((m.nom || '').toLowerCase()));
    const top = liste('idee').map(i => [i, votes(i.id)]).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const aRelire = arts.filter(a => a.etat === 'relire');
    el.innerHTML = `<h2 class="titre">Salut ${esc(m.nom)} 👋</h2>
      <p class="mut" style="margin-top:-6px">${ROLE[m.role] ? ROLE[m.role].ic + ' ' + esc(roleNom(m.role)) : ''}</p>
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
      ${estChef() && aRelire.length ? `<h3 class="st">À relire et valider</h3>${aRelire.map(ligneArticle).join('')}` : ''}
      <h3 class="st">Mes articles</h3>
      ${mesArts.length ? mesArts.sort((a, b) => b.maj - a.maj).slice(0, 4).map(ligneArticle).join('') : ''}
      <button class="ajout" data-a="ecrire">✍️ Écrire un article</button>
      ${top.length ? `<h3 class="st">Idées les plus aimées</h3>${top.map(([i, v]) => `<div class="carte" style="background:${(CAT[i.cat] || CAT.autre)[2]}"><b>👍 ${v}</b> · ${esc(i.texte)}</div>`).join('')}` : ''}`;
    el.onclick = e => {
      const a = e.target.closest('[data-a]'); if (a) {
        const k = a.dataset.a;
        if (k === 'reu') formReunion(); else if (k === 'num') formNumero(); else if (k === 'arts') aller('articles'); else if (k === 'idees') aller('idees');
        else if (k === 'ecrire') ouvrirArticle(nouvelArticle()); else if (k === 'journal') aller('maquette');
        return;
      }
      if (clicReunion(e)) return;
      const ar = e.target.closest('[data-art]'); if (ar) ouvrirArticle(items[ar.dataset.art]);
    };
  }
  // la date de la dernière visite de l'accueil (pour « Depuis ta dernière visite »)
  (() => { const avant = LS('journal-vu-accueil'); if (avant) LS('journal-vu-accueil-avant', avant); LS('journal-vu-accueil', String(Date.now())); })();

  function carteNumero(n) {
    const art = arts => arts.length;
    const zones = [], places = [];
    (n.pages || []).forEach((pg, p) => { const g = Maquette.gabarit(pg && pg.g); if (!g) return; Maquette.zonesArt(g).forEach(z => { zones.push(z); if (pg.z && pg.z[z.k] && items[pg.z[z.k]] && !items[pg.z[z.k]].x) places.push(pg.z[z.k]); }); });
    const jb = joursAvant(n.bouclage), jp = joursAvant(n.parution);
    const delai = jb == null ? '' : jb > 1 ? `⏳ Bouclage dans <b>${jb} jours</b> (${dateJolie(n.bouclage)})` : jb === 1 ? '⏳ Bouclage <b>demain</b> !' : jb === 0 ? '🔥 Bouclage <b>aujourd\'hui</b> !' : `🔒 Bouclage passé (${dateJolie(n.bouclage)})`;
    return `<div class="carte" data-a="journal" style="cursor:pointer"><h4>📰 ${esc(n.nom || 'Le Journal')} · n° ${esc(n.n)}</h4>
      <div class="mut">${delai}${n.parution ? `<br>🗞️ Parution ${jp != null && jp >= 0 ? `dans ${jp} jours ` : ''}(${dateJolie(n.parution)})` : ''}</div>
      <div style="margin-top:8px;font-size:14.5px">Maquette : <b>${places.length}</b> case${places.length > 1 ? 's' : ''} remplie${places.length > 1 ? 's' : ''} sur ${zones.length}${n.boucle ? ' · 🔒 bouclé' : ''}</div></div>`;
  }

  /* =================== AGENDA =================== */
  let moisVu = null;
  const reps = id => liste('rep').filter(r => r.reu === id);
  function carteReunion(r) {
    const d = dIso(r.date) || new Date(), rs = reps(r.id), mienne = (rs.find(x => x.par === moiId) || {}).v;
    const nb = v => rs.filter(x => x.v === v).length;
    const peut = r.par === moiId || estChef();
    return `<div class="reu" data-reu="${r.id}"><div class="cal"><small>${MOIS[d.getMonth()].slice(0, 4)}.</small><b>${d.getDate()}</b><span>${JOURS[d.getDay()]}</span></div>
      <div class="corps"><h4>${esc(r.objet || 'Réunion du journal')}</h4>
      <div class="mut">🕐 ${esc(r.h || '?')}${r.fin ? ' – ' + esc(r.fin) : ''}${r.lieu ? ' · 📍 ' + esc(r.lieu) : ''}<br>Proposée par ${esc(nomDe(r.par))}</div>
      ${r.odj ? `<div class="odj"><b>Ordre du jour</b>\n${esc(r.odj)}</div>` : ''}
      ${rs.length ? `<div class="reps">${rs.map(x => `<span class="${x.v === 'oui' ? 'oui' : x.v === 'non' ? 'non' : 'pt'}">${x.v === 'oui' ? '✓' : x.v === 'non' ? '✗' : '?'} ${esc(nomDe(x.par))}</span>`).join('')}</div>` : ''}
      ${r.date >= auj() ? `<div class="choix3"><button data-rep="oui" class="oui ${mienne === 'oui' ? 'on' : ''}">✓ Je viens${nb('oui') ? ' · ' + nb('oui') : ''}</button><button data-rep="pt" class="pt ${mienne === 'pt' ? 'on' : ''}">? Peut-être</button><button data-rep="non" class="non ${mienne === 'non' ? 'on' : ''}">✗ Pas dispo</button></div>` : ''}
      ${r.cr ? `<div class="odj" style="background:#f0fdf4"><b>📝 Compte rendu</b>\n${esc(r.cr)}</div>` : ''}
      <div class="rangee" style="margin-top:8px"><button class="btn petit" data-ra="cr">📝 ${r.cr ? 'Modifier le compte rendu' : 'Compte rendu'}</button><button class="btn petit" data-ra="ics">📅 Dans mon agenda</button>
      ${peut ? '<button class="btn petit" data-ra="mod">✏️ Modifier</button>' : ''}</div></div></div>`;
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
      const j = e.target.closest('[data-j]'); if (j) { const r = venir.concat(passees).find(x => x.date === j.dataset.j); if (r) { const c = el.querySelector(`[data-reu="${r.id}"]`); if (c) c.scrollIntoView({behavior: 'smooth', block: 'center'}); } else formReunion(null, j.dataset.j); return; }
      if (e.target.closest('[data-a="reu"]')) formReunion();
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
      <div class="rangee"><span class="etat ${a.etat || 'brouillon'}">${ETATS[a.etat] || 'Brouillon'}</span><span class="place">${mots} mots · ${place(mots)}</span></div>
      <div class="place" style="margin-top:4px">✍️ ${esc(a.auteurs || nomDe(a.par))} · ${ilya(a.maj)}${coms ? ` · 💬 ${coms}` : ''}${ou ? ` · 📰 ${ou}` : ''}</div></div></div>`;
  }
  function ouPlace(id) {
    for (const n of liste('numero')) for (let p = 0; p < 4; p++) { const pg = n.pages && n.pages[p]; if (pg && pg.z && Object.values(pg.z).includes(id)) return `n° ${n.n}, page ${p + 1}`; }
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
      if (e.target.closest('[data-a="ecrire"]')) { ouvrirArticle(nouvelArticle()); return; }
      const a = e.target.closest('[data-art]'); if (a) ouvrirArticle(items[a.dataset.art]);
    };
  }
  const nouvelArticle = (titre, idee) => ({id: uid('a'), t: 'article', titre: titre || '', rub: '', chapeau: '', corps: '', auteurs: (moi() || {}).nom || '', etat: 'brouillon', idee: idee || '', _neuf: 1});

  /* ---------- éditeur d'article ---------- */
  let edition = null, minEd = null;
  function ouvrirArticle(a) {
    if (!a) return;
    edition = a;
    const verrou = a.etat === 'valide' && !estChef();
    const ed = $('vue-editeur'); ed.hidden = false; document.body.style.overflow = 'hidden';
    const im = a.img && items[a.img] && items[a.img].d;
    ed.innerHTML = `<div class="edtete"><button id="e-ret">‹ Fermer</button><div class="t">${a._neuf ? 'Nouvel article' : esc(a.titre || 'Article')}</div><span class="etat ${a.etat || 'brouillon'}" id="e-etat">${ETATS[a.etat] || 'Brouillon'}</span></div>
      <div class="ed">
      ${verrou ? '<div class="nouveau">🔒 Cet article est validé par la rédaction en chef. Pour le changer, demande à un prof de le repasser en brouillon.</div>' : ''}
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
    const chef = estChef(), act = $('e-actions'), et = a.etat || 'brouillon';
    act.innerHTML = (et === 'brouillon' && !verrou ? '<button class="btn o" data-et="relire">📨 Envoyer à la relecture</button>' : '')
      + (chef && et !== 'valide' ? '<button class="btn p" data-et="valide">✅ Valider pour le journal</button>' : '');
    if (et !== 'brouillon' && (chef || et === 'relire')) act.innerHTML += '<button class="btn" data-et="brouillon">↩︎ Repasser en brouillon</button>';
    act.innerHTML += '<button class="btn" id="e-apercu">👁️ Aperçu dans le journal</button>';
    if (!a._neuf && (a.par === moiId || chef)) act.innerHTML += '<button class="btn r" id="e-sup">🗑 Supprimer</button>';
    act.onclick = e => {
      const b = e.target.closest('[data-et]');
      if (b) {
        clearTimeout(minEd); enregistrer(); if (a._neuf) { toast('Écris d\'abord un titre ou un texte'); return; }
        a.etat = b.dataset.et; if (a.etat === 'valide') a.valPar = moiId; sauver(a, true);
        toast(b.dataset.et === 'relire' ? '📨 Envoyé à la relecture' : b.dataset.et === 'valide' ? '✅ Article validé' : 'Repassé en brouillon');
        ouvrirArticle(a); return;
      }
      if (e.target.id === 'e-apercu') { clearTimeout(minEd); enregistrer(); apercuArticle(a); return; }
      if (e.target.id === 'e-sup' && confirm('Supprimer cet article pour toute l\'équipe ?')) {
        supprimer(a); retirerDesNumeros(a.id); fermerEditeur();
      }
    };
    // commentaires
    const dessinerComs = () => {
      const cs = liste('com').filter(c => c.cible === a.id).sort((x, y) => x.cree - y.cree);
      $('e-coms').innerHTML = cs.length ? cs.map(c => { const r = items[c.par] && ROLE[items[c.par].role]; return `<div class="com ${r && r.chef ? 'prof' : ''}"><b>${r ? r.ic + ' ' : ''}${esc(nomDe(c.par))}</b> <span class="mut" style="font-size:12px">${ilya(c.cree || c.maj)}</span>${c.par === moiId ? ` <button class="btn petit r" data-sc="${c.id}" style="padding:0 6px;float:right">✕</button>` : ''}<br>${esc(c.texte)}</div>`; }).join('')
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
  function fermerEditeur() { edition = null; $('vue-editeur').hidden = true; $('vue-editeur').innerHTML = ''; document.body.style.overflow = ''; rendre(); }
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
    liste('numero').forEach(n => { let ch = false; (n.pages || []).forEach(pg => { if (pg && pg.z) Object.keys(pg.z).forEach(k => { if (pg.z[k] === id) { delete pg.z[k]; ch = true; } }); }); if (ch) sauver(n, true); });
  }
  // l'article seul, dans une case demi-page, pour voir ce que ça donne
  function apercuArticle(a) {
    const n = numCourant() || {nom: 'Le Journal', n: 1, pages: []};
    const faux = Object.assign({}, n, {pages: [null, {g: 'deux-h', z: {a: a.id}}]});
    feuille(`<h3>Aperçu</h3><p class="mut">Ton article dans une demi-page du journal.</p><div class="apercu" id="ap"></div><div class="actions"><button class="btn p" data-fermer>Fermer</button></div>`, f => {
      const pageEl = Maquette.page(ctx(faux), 1, 'papier'); poserPage(f.querySelector('#ap'), pageEl);
    });
  }

  /* =================== IDÉES =================== */
  let triIdees = 'pop', catFiltre = '';
  const votes = id => liste('vote').filter(v => v.idee === id && v.v).length;
  function vIdees(el) {
    let ids = liste('idee'); if (catFiltre) ids = ids.filter(i => i.cat === catFiltre);
    ids.sort(triIdees === 'pop' ? (a, b) => votes(b.id) - votes(a.id) || b.maj - a.maj : (a, b) => (b.cree || b.maj) - (a.cree || a.maj));
    el.innerHTML = `<h2 class="titre">Tableau des idées</h2>
      <div class="carte nouv-idee"><textarea class="inp" id="i-tx" maxlength="300" placeholder="Balance ton idée : un sujet, une interview, un jeu, un nom pour le journal…" style="min-height:64px"></textarea>
      <div class="rangee"><select class="inp" id="i-cat" style="flex:1;width:auto">${CATS.map(c => `<option value="${c[0]}">${c[1]}</option>`).join('')}</select><button class="btn p" id="i-ok">📌 Épingler</button></div></div>
      <div class="puces"><button data-tri="pop" class="${triIdees === 'pop' ? 'on' : ''}">👍 Les plus aimées</button><button data-tri="rec" class="${triIdees === 'rec' ? 'on' : ''}">🕐 Récentes</button>
      <button data-cat="" class="${!catFiltre ? 'on' : ''}">Toutes</button>${CATS.map(c => `<button data-cat="${c[0]}" class="${catFiltre === c[0] ? 'on' : ''}">${c[1]}</button>`).join('')}</div>
      ${ids.length ? `<div class="murs">${ids.map(postit).join('')}</div>` : '<p class="vide">Le tableau est vide : épingle la première idée !</p>'}`;
    $('i-ok').onclick = () => {
      const t = $('i-tx').value.trim(); if (!t) { $('i-tx').focus(); return; }
      sauver({id: uid('d'), t: 'idee', texte: t, cat: $('i-cat').value, cree: Date.now()}); toast('📌 Idée épinglée');
    };
    el.onclick = e => {
      const tri = e.target.closest('[data-tri]'); if (tri) { triIdees = tri.dataset.tri; rendre(); return; }
      const c = e.target.closest('[data-cat]'); if (c) { catFiltre = c.dataset.cat; rendre(); return; }
      const p = e.target.closest('[data-idee]'); if (!p) return; const i = items[p.dataset.idee];
      const b = e.target.closest('[data-ia]'); if (!b || !i) return;
      const k = b.dataset.ia;
      if (k === 'vote') { const id = 'v_' + i.id + '_' + moiId, v = items[id]; sauver(Object.assign(v || {id, t: 'vote', idee: i.id}, {v: v && v.v ? 0 : 1, x: 0})); }
      else if (k === 'prendre') {
        const a = nouvelArticle(i.cat === 'interview' ? 'Interview : ' : '', i.id); a.chapeau = ''; a.titre = a.titre + (i.texte.length < 90 ? i.texte : '');
        i.pris = moiId; sauver(i, true); ouvrirArticle(a);
      }
      else if (k === 'art' && items[i.article]) ouvrirArticle(items[i.article]);
      else if (k === 'sup' && confirm('Enlever cette idée du tableau ?')) supprimer(i);
    };
  }
  function postit(i) {
    const c = CAT[i.cat] || CAT.autre, v = votes(i.id), moiV = items['v_' + i.id + '_' + moiId] && items['v_' + i.id + '_' + moiId].v;
    const art = liste('article').find(a => a.idee === i.id);
    return `<div class="postit" style="background:${c[2]}" data-idee="${i.id}">
      ${i.par === moiId || estChef() ? '<button class="x" data-ia="sup" title="Enlever">✕</button>' : ''}
      <div class="cat">${esc(c[1])}</div><div class="tx">${esc(i.texte)}</div>
      ${art ? `<div class="pris" data-ia="art" style="cursor:pointer">📝 ${esc(nomDe(art.par))} l'écrit · ${ETATS[art.etat] || 'Brouillon'}</div>`
        : i.pris ? `<div class="pris">✍️ Pris par ${esc(nomDe(i.pris))}</div>` : ''}
      <div class="pied"><span class="qui">${esc(nomDe(i.par))}</span>${!art && !i.pris && i.cat !== 'nom' ? '<button data-ia="prendre">✍️ Je l\'écris</button>' : ''}<button data-ia="vote" class="${moiV ? 'on' : ''}">👍 ${v}</button></div></div>`;
  }

  /* =================== JOURNAL : numéros, maquette, impression =================== */
  let pageVue = 0, numChoisi = SS('journal-num') || '';
  function numCourant() {
    const ns = liste('numero');
    if (numChoisi && items[numChoisi] && !items[numChoisi].x) return items[numChoisi];
    return ns.filter(n => n.etat !== 'imprime').sort((a, b) => (+a.n || 0) - (+b.n || 0))[0] || ns.sort((a, b) => (+b.n || 0) - (+a.n || 0))[0] || null;
  }
  const ctx = num => ({num, art: id => items[id] && !items[id].x ? items[id] : null, img: id => items[id] && !items[id].x && items[id].d ? items[id].d : null,
    equipe: liste('membre').sort((a, b) => ROLES.findIndex(r => r.id === a.role) - ROLES.findIndex(r => r.id === b.role)), roleNom, propre});
  function poserPage(boite, pageEl, largeur) {
    boite.innerHTML = '';
    const W = largeur || boite.clientWidth - 20 || 300, PW = 210 * Maquette.MM, PH = 297 * Maquette.MM, k = Math.min(1, W / PW);
    const cadre = document.createElement('div'); cadre.className = 'cadre'; cadre.style.width = PW * k + 'px'; cadre.style.height = PH * k + 'px';
    pageEl.style.transform = `scale(${k})`; cadre.appendChild(pageEl); boite.appendChild(cadre);
    const imgs = [...pageEl.querySelectorAll('img')];
    const go = () => Maquette.ajuster(pageEl);
    go(); imgs.forEach(i => { if (!i.complete) i.addEventListener('load', go, {once: true}); });
    return cadre;
  }
  const modifiable = n => !n.boucle || estChef();
  function vMaquette(el) {
    const n = numCourant(), ns = liste('numero').sort((a, b) => (+b.n || 0) - (+a.n || 0));
    if (!n) {
      el.innerHTML = `<h2 class="titre">Le journal</h2><div class="carte"><p>Chaque numéro = <b>2 feuilles A4 recto-verso</b>, donc <b>4 pages</b> : la Une (page 1), deux pages intérieures et le dos (page 4).</p>
        <p class="mut">Choisis une mise en page pour chaque page, place les articles dans les cases (ou laisse l'appli te faire des propositions), puis imprime.</p>
        <button class="btn p" id="m-nouv">＋ Lancer le numéro 1</button></div>`;
      $('m-nouv').onclick = () => formNumero();
      return;
    }
    if (!n.pages) n.pages = [];
    const g = Maquette.gabarit(n.pages[pageVue] && n.pages[pageVue].g) || Maquette.pour(pageVue)[0];
    const ok = modifiable(n);
    const noms = ['La Une', 'Page 2', 'Page 3', 'Le dos'], feuilleDe = ['feuille 1 recto', 'feuille 1 verso', 'feuille 2 recto', 'feuille 2 verso'];
    const libres = candidats(n).filter(a => !placeDans(n, a.id));
    el.innerHTML = `<div class="rp"><h2 class="titre" style="margin-bottom:6px">${esc(n.nom || 'Le Journal')} · n° ${esc(n.n)}</h2>
      ${ns.length > 1 || estChef() ? `<select class="inp" id="m-num" style="width:auto;padding:6px 8px">${ns.map(x => `<option value="${x.id}" ${x.id === n.id ? 'selected' : ''}>N° ${esc(x.n)}${x.etat === 'imprime' ? ' (imprimé)' : ''}</option>`).join('')}${estChef() ? '<option value="+">＋ Nouveau numéro</option>' : ''}</select>` : ''}</div>
      <p class="mut" style="margin:0 0 10px">${n.parution ? `Parution ${dateJolie(n.parution)}` : 'Date de parution à choisir'}${n.bouclage ? ` · bouclage ${dateJolie(n.bouclage)}` : ''}${n.boucle ? ' · 🔒 <b>bouclé</b>' : ''}${n.etat === 'imprime' ? ' · 🗞️ imprimé' : ''}
        · <a href="#" id="m-regl">réglages</a></p>
      <div class="rangee" style="margin-bottom:12px"><button class="btn o" id="m-prop" ${ok ? '' : 'disabled'}>✨ Propose-moi des mises en page</button><button class="btn p" id="m-print">🖨️ Imprimer</button></div>
      <div class="pages-t">${noms.map((t, i) => `<button data-p="${i}" class="${i === pageVue ? 'on' : ''}">${t}<small>${feuilleDe[i]}</small></button>`).join('')}</div>
      <div class="gabs" id="m-gabs">${Maquette.pour(pageVue).map(x => `<button class="gab ${x.id === g.id ? 'on' : ''}" data-g="${x.id}" ${ok ? '' : 'disabled'}>${Maquette.mini(x)}${esc(x.nom)}</button>`).join('')}</div>
      <div class="apercu" id="m-ap"></div>
      <p class="mut" style="font-size:13.5px;margin:0 0 12px">${ok ? 'Touche une case pour y placer un article. ' : '🔒 Numéro bouclé : seuls les profs peuvent encore le changer. '}Le texte se resserre tout seul pour rentrer ; ✂️ = trop long, à raccourcir.</p>
      <h3 class="st">Articles pas encore placés (${libres.length})</h3>
      ${libres.length ? libres.map(ligneArticle).join('') : '<p class="mut">Tous les articles sont placés.</p>'}
      ${estChef() ? `<h3 class="st">Rédaction en chef</h3><div class="rangee">
        <button class="btn" id="m-boucle">${n.boucle ? '🔓 Rouvrir le numéro' : '🔒 Boucler le numéro'}</button>
        ${n.etat !== 'imprime' ? '<button class="btn" id="m-imprime">🗞️ Marquer comme imprimé</button>' : '<button class="btn" id="m-rouvre">↩︎ Pas encore imprimé</button>'}</div>` : ''}`;
    const pageEl = Maquette.page(ctx(n), pageVue, 'ecran');
    poserPage($('m-ap'), pageEl);
    pageEl.onclick = e => { const z = e.target.closest('.z.cliquable'); if (!z) return; if (!ok) { toast('🔒 Numéro bouclé'); return; } choisirArticle(n, pageVue, z.dataset.k); };
    el.onclick = e => {
      const p = e.target.closest('[data-p]'); if (p) { pageVue = +p.dataset.p; rendre(); return; }
      const gb = e.target.closest('[data-g]'); if (gb && ok) { changerGabarit(n, pageVue, gb.dataset.g); return; }
      const ar = e.target.closest('.carte[data-art]'); if (ar) { ouvrirArticle(items[ar.dataset.art]); return; }
      if (e.target.id === 'm-regl') { e.preventDefault(); formNumero(n); }
    };
    if ($('m-num')) $('m-num').onchange = e => { if (e.target.value === '+') { formNumero(null); return; } numChoisi = e.target.value; SS('journal-num', numChoisi); pageVue = 0; rendre(); };
    $('m-prop').onclick = () => propositions(n);
    $('m-print').onclick = () => imprimer(n);
    if ($('m-boucle')) $('m-boucle').onclick = () => { n.boucle = n.boucle ? 0 : 1; sauver(n); toast(n.boucle ? '🔒 Numéro bouclé : les élèves ne peuvent plus changer la maquette' : '🔓 Numéro rouvert'); };
    if ($('m-imprime')) $('m-imprime').onclick = () => { if (confirm(`Le n° ${n.n} est imprimé ? Il passe dans les archives (on peut toujours le revoir et le réimprimer).`)) { n.etat = 'imprime'; n.boucle = 1; sauver(n, true);
      if (confirm(`Préparer tout de suite le n° ${(+n.n || 0) + 1} ?`)) formNumero(null, n); else rendre(); } };
    if ($('m-rouvre')) $('m-rouvre').onclick = () => { n.etat = ''; sauver(n); };
  }
  const placeDans = (n, id) => (n.pages || []).some(pg => pg && pg.z && Object.values(pg.z).includes(id));
  // articles disponibles pour ce numéro : pas déjà dans un autre numéro imprimé
  function candidats(n) {
    const pris = new Set(); liste('numero').forEach(x => { if (x.id !== n.id && x.etat === 'imprime') (x.pages || []).forEach(pg => { if (pg && pg.z) Object.values(pg.z).forEach(id => pris.add(id)); }); });
    return liste('article').filter(a => !pris.has(a.id)).sort((a, b) => (b.etat === 'valide') - (a.etat === 'valide') || b.maj - a.maj);
  }
  function changerGabarit(n, p, gid) {
    const ancien = n.pages[p] || {}, g = Maquette.gabarit(gid);
    const arts = Object.keys(ancien.z || {}).sort().map(k => ancien.z[k]);
    const z = {}; Maquette.zonesArt(g).sort((a, b) => b.cap - a.cap).forEach(o => { if (arts.length) z[o.k] = arts.shift(); });
    n.pages[p] = {g: gid, z}; sauver(n);
    if (arts.length) toast(`${arts.length} article${arts.length > 1 ? 's' : ''} retiré${arts.length > 1 ? 's' : ''} de la page (moins de cases)`);
  }
  function choisirArticle(n, p, k) {
    const pg = n.pages[p] = n.pages[p] || {g: Maquette.pour(p)[0].id, z: {}}; pg.z = pg.z || {};
    const g = Maquette.gabarit(pg.g), zone = Maquette.zones(g).find(z => z.k === k); if (!zone || zone.type !== 'art') return;
    const actuel = pg.z[k] && items[pg.z[k]];
    const arts = candidats(n);
    const juge = a => { const r = motsDe(a) / zone.cap; return r > 1.25 ? ['✂️ trop long', '#dc2626'] : r > 1.02 ? ['un peu long, ça se resserre', '#b45309'] : r < 0.35 ? ['un peu court', '#6b6459'] : ['✓ rentre bien', '#15803d']; };
    feuille(`<h3>Que mettre dans cette case ?</h3><p class="mut">Case de ${zone.cap} mots environ${zone.grand ? ' · le grand sujet de la Une' : ''}.</p>
      ${actuel ? `<div class="rangee" style="margin-bottom:10px"><button class="btn" data-o="ouvrir">✏️ Ouvrir « ${esc(actuel.titre || 'Sans titre')} »</button><button class="btn r" data-o="vider">Vider la case</button></div>` : ''}
      <div class="liste-ch">${arts.length ? arts.map(a => { const j = juge(a), ou = placeDans(n, a.id) && pg.z[k] !== a.id; return `<button data-id="${a.id}"><span class="etat ${a.etat || 'brouillon'}">${ETATS[a.etat] || 'Brouillon'}</span>
        <span style="min-width:0"><b>${esc(a.titre || 'Sans titre')}</b><br><span class="mut" style="font-size:13px">${motsDe(a)} mots${ou ? ' · déjà placé ailleurs (il sera déplacé)' : ''}</span></span><span class="ok" style="color:${j[1]}">${j[0]}</span></button>`; }).join('')
        : '<p class="vide">Pas encore d\'article. Écris-en un dans l\'onglet Articles !</p>'}</div>
      <div class="actions"><button class="btn" data-fermer>Fermer</button></div>`, f => {
      f.onclick = e => {
        const o = e.target.closest('[data-o]');
        if (o && o.dataset.o === 'vider') { delete pg.z[k]; sauver(n, true); fermer(); return; }
        if (o && o.dataset.o === 'ouvrir') { $('feuille').hidden = true; ouvrirArticle(actuel); return; }
        const b = e.target.closest('[data-id]'); if (!b) return;
        n.pages.forEach(x => { if (x && x.z) Object.keys(x.z).forEach(kk => { if (x.z[kk] === b.dataset.id) delete x.z[kk]; }); });
        pg.z[k] = b.dataset.id; sauver(n, true); fermer();
        if (items[b.dataset.id].etat !== 'valide') toast('ℹ️ Cet article n\'est pas encore validé par un prof');
      };
    });
  }
  function propositions(n) {
    const c = candidats(n).map(a => ({id: a.id, mots: motsDe(a), photo: !!(a.img && items[a.img] && items[a.img].d)}));
    if (!c.length) { toast('Il faut d\'abord des articles !'); return; }
    let props = Maquette.proposer(c, 4);
    const dessiner = () => {
      feuille(`<h3>✨ Propositions de mise en page</h3><p class="mut">Avec les ${c.length} article${c.length > 1 ? 's' : ''} disponible${c.length > 1 ? 's' : ''} : le plus long à la Une, les brèves dans les petites cases. Touche « Choisir » puis ajuste à la main si besoin.</p>
        ${props.map((p, i) => `<div class="prop"><div class="rp"><b>Proposition ${i + 1}</b><span class="mut" style="font-size:13px">${p.places}/${p.total} cases remplies</span></div><div class="mini4" data-i="${i}"></div><button class="btn p" data-choix="${i}" style="width:100%">Choisir celle-ci</button></div>`).join('')}
        <div class="actions"><button class="btn" data-fermer>Fermer</button><button class="btn o" id="pr-encore">🔀 D'autres idées</button></div>`, f => {
        f.querySelectorAll('.mini4').forEach(box => {
          const p = props[+box.dataset.i], faux = Object.assign({}, n, {pages: p.pages});
          const W = (box.clientWidth - 18) / 4;
          for (let i = 0; i < 4; i++) { const cell = document.createElement('div'); box.appendChild(cell); poserPage(cell, Maquette.page(ctx(faux), i, 'papier'), W); }
        });
        f.querySelector('#pr-encore').onclick = () => { props = Maquette.proposer(c, 4); dessiner(); };
        f.onclick = e => {
          const b = e.target.closest('[data-choix]'); if (!b) return;
          if (Object.values(n.pages || []).some(pg => pg && pg.z && Object.keys(pg.z).length) && !confirm('Remplacer la maquette actuelle par cette proposition ?')) return;
          n.pages = JSON.parse(JSON.stringify(props[+b.dataset.choix].pages)); pageVue = 0; sauver(n, true); fermer(); toast('✨ Mise en page appliquée');
        };
      });
    };
    dessiner();
  }
  function formNumero(n, precedent) {
    const nouveau = !n, p = precedent || liste('numero').sort((a, b) => (+b.n || 0) - (+a.n || 0))[0];
    if (nouveau && liste('numero').length && !estChef()) { toast('Seuls les profs lancent un nouveau numéro'); rendre(); return; }
    n = n || {id: uid('n'), t: 'numero', n: p ? (+p.n || 0) + 1 : 1, nom: p ? p.nom : '', slogan: p ? p.slogan : '', ecole: p ? p.ecole : '', parution: '', bouclage: '',
      pages: p ? p.pages.map(pg => ({g: pg && pg.g, z: {}})) : [{g: 'une-classique', z: {}}, {g: 'grand-deux', z: {}}, {g: 'quatre', z: {}}, {g: 'dos-ours', z: {}}]};
    const peut = nouveau || estChef() || !n.boucle;
    feuille(`<h3>${nouveau ? 'Nouveau numéro' : 'Réglages du numéro'}</h3>
      <div class="fiche-num"><label class="lab">Nom du journal</label><input class="inp" id="n-nom" maxlength="40" placeholder="ex. L'Écho du campus (vote sur le tableau des idées !)" value="${esc(n.nom)}">
      <label class="lab">Sous-titre</label><input class="inp" id="n-slogan" maxlength="80" placeholder="ex. Le journal des élèves, par les élèves" value="${esc(n.slogan)}">
      <div class="lignes"><div><label class="lab">Numéro</label><input class="inp" id="n-n" type="number" min="1" value="${esc(n.n)}"></div>
      <div><label class="lab">École</label><input class="inp" id="n-ecole" maxlength="50" value="${esc(n.ecole)}"></div>
      <div><label class="lab">Bouclage</label><input class="inp" id="n-bou" type="date" value="${esc(n.bouclage)}"></div>
      <div><label class="lab">Parution</label><input class="inp" id="n-par" type="date" value="${esc(n.parution)}"></div></div>
      <p class="mut" style="font-size:13.5px">Bouclage = date limite pour rendre les articles. Elle s'affiche avec un compte à rebours pour toute l'équipe.</p></div>
      <div class="actions">${!nouveau && estChef() ? '<button class="btn r" id="n-sup">Supprimer</button>' : ''}<button class="btn" data-fermer>Annuler</button><button class="btn p" id="n-ok" ${peut ? '' : 'disabled'}>${nouveau ? 'Créer' : 'Enregistrer'}</button></div>`, f => {
      f.querySelector('#n-ok').onclick = () => {
        Object.assign(n, {nom: f.querySelector('#n-nom').value.trim(), slogan: f.querySelector('#n-slogan').value.trim(), n: f.querySelector('#n-n').value || n.n,
          ecole: f.querySelector('#n-ecole').value.trim(), bouclage: f.querySelector('#n-bou').value, parution: f.querySelector('#n-par').value});
        sauver(n, true); numChoisi = n.id; SS('journal-num', n.id); pageVue = 0; fermer(); if (vue !== 'maquette') aller('maquette');
      };
      const s = f.querySelector('#n-sup'); if (s) s.onclick = () => { if (confirm(`Supprimer le n° ${n.n} (la maquette, pas les articles) ?`)) { supprimer(n); numChoisi = ''; SS('journal-num', ''); fermer(); } };
    });
  }
  async function imprimer(n) {
    const box = $('impression'); box.innerHTML = '';
    box.style.cssText = 'display:block;position:absolute;left:-10000px;top:0';
    const pages = [0, 1, 2, 3].map(p => { const el = Maquette.page(ctx(n), p, 'papier'); box.appendChild(el); return el; });
    await Promise.all([...box.querySelectorAll('img')].map(i => i.complete ? 0 : new Promise(ok => { i.onload = i.onerror = ok; })));
    let trop = []; pages.forEach(el => { trop = trop.concat(Maquette.ajuster(el)); });
    let vides = 0; (n.pages || []).forEach((pg, p) => { const g = Maquette.gabarit(pg && pg.g) || Maquette.pour(p)[0]; Maquette.zonesArt(g).forEach(z => { if (!(pg && pg.z && pg.z[z.k] && items[pg.z[z.k]] && !items[pg.z[z.k]].x)) vides++; }); });
    if (!n.pages || n.pages.length < 4) vides = Math.max(vides, 1);
    box.removeAttribute('style');
    const pasVal = (n.pages || []).flatMap(pg => pg && pg.z ? Object.values(pg.z) : []).filter(id => items[id] && items[id].etat !== 'valide').length;
    feuille(`<h3>🖨️ Imprimer le n° ${esc(n.n)}</h3>
      ${trop.length || vides || pasVal ? `<div class="nouveau">${vides ? `⚠️ ${vides} case${vides > 1 ? 's' : ''} vide${vides > 1 ? 's' : ''}.<br>` : ''}${trop.length ? `✂️ ${trop.length} article${trop.length > 1 ? 's' : ''} trop long${trop.length > 1 ? 's' : ''} : la fin sera coupée.<br>` : ''}${pasVal ? `ℹ️ ${pasVal} article${pasVal > 1 ? 's' : ''} pas encore validé${pasVal > 1 ? 's' : ''} par un prof.` : ''}</div>` : '<p>✅ Tout est prêt.</p>'}
      <ol style="padding-left:20px;margin:8px 0"><li>Choisis <b>Recto-verso</b> (« retourner sur le bord long »), papier <b>A4</b>, échelle <b>100 %</b> (ou « taille réelle »), sans marges ajoutées.</li>
      <li>Les 4 pages sortent sur 2 feuilles : <b>feuille 1</b> = Une + page 2, <b>feuille 2</b> = page 3 + dos.</li>
      <li>Agrafe en haut à gauche… et distribue ! Pour garder un PDF : choisis « Enregistrer en PDF » comme imprimante.</li></ol>
      <div class="actions"><button class="btn" data-fermer>Annuler</button><button class="btn p" id="pr-go">🖨️ Imprimer</button></div>`, f => {
      f.querySelector('#pr-go').onclick = () => { $('feuille').hidden = true; setTimeout(() => { window.print(); }, 50); };
    });
  }

  /* =================== ÉQUIPE =================== */
  function vEquipe(el) {
    const m = moi(), chef = estChef(), ms = liste('membre');
    const auMoinsUnChef = ms.some(x => ROLE[x.role] && ROLE[x.role].chef);
    const msg = `Rejoins l'équipe du journal ! Installe l'appli : ${JI.lien} puis tape le code ${LS('journal-code') || ''}.`;
    el.innerHTML = `<h2 class="titre">L'équipe de rédaction</h2>
      <div class="carte"><div class="membre" style="border:0;padding:0">${avatar(moiId)}<div style="flex:1"><b>${esc(m.nom)}</b> (moi)<br><span class="mut">${ROLE[m.role] ? ROLE[m.role].ic : ''} ${esc(roleNom(m.role))}</span></div><button class="btn petit" id="q-moi">Modifier</button></div></div>
      <h3 class="st">Tout le monde (${ms.length})</h3><div class="carte">
      ${ROLES.map(r => { const l = ms.filter(x => (ROLE[x.role] ? x.role : 'journaliste') === r.id); return l.map(x => `<div class="membre">${avatar(x.id)}<div style="flex:1;min-width:0"><b>${esc(x.nom)}</b>${x.id === moiId ? ' (moi)' : ''}<br><span class="mut" style="font-size:13.5px">${r.ic} ${esc(r.nom)}</span></div>${chef && x.id !== moiId ? `<button class="btn petit" data-mb="${x.id}">Rôle</button>` : ''}</div>`).join(''); }).join('')}</div>
      <h3 class="st">Les rôles dans un journal</h3><div class="carte">${ROLES.map(r => `<p style="margin:0 0 8px"><b>${r.ic} ${esc(r.nom)}</b>${r.chef ? ' <span class="etat valide">prof</span>' : ''}<br><span class="mut">${esc(r.fait)}</span></p>`).join('')}</div>
      <h3 class="st">Inviter un élève</h3><div class="carte"><p class="mut" style="margin:0 0 8px">Envoie-lui ce message (WhatsApp, mail…) :</p><div class="odj" style="margin:0 0 8px">${esc(msg)}</div>
        <div class="rangee"><button class="btn p" id="q-copier">📋 Copier le message</button>${navigator.share ? '<button class="btn" id="q-part">📤 Partager</button>' : ''}</div></div>
      <h3 class="st">Installer l'appli</h3><div class="carte rangee"><button class="btn" id="q-tel">📱 Sur un téléphone</button><button class="btn" id="q-pc">💻 Sur un ordinateur (PC / Mac)</button></div>
      <h3 class="st">Partage avec l'équipe</h3><div class="carte">
        ${SCRIPT ? `<p style="margin:0 0 8px">Tout ce que tu fais part dans le tableau Google du journal et arrive chez les autres (toutes les 45 secondes quand l'appli est ouverte).</p><button class="btn" id="q-sync">⟳ Synchroniser maintenant</button>`
          : '<p style="margin:0">Pas encore relié au tableau Google du journal : pour l\'instant, chacun ne voit que ce qui est sur son appareil.</p>'}
        ${file.length ? `<p class="mut" style="margin:8px 0 0">${file.length} changement${file.length > 1 ? 's' : ''} en attente d'envoi.</p>` : ''}</div>
      ${!auMoinsUnChef ? '<p class="mut" style="font-size:13.5px">Personne n\'est encore directeur de la publication ou rédacteur en chef : le premier prof qui ouvre l\'appli choisit ce rôle dans « Modifier ».</p>' : ''}`;
    el.onclick = e => {
      if (e.target.id === 'q-moi') formMembre(m);
      const b = e.target.closest('[data-mb]'); if (b) formMembre(items[b.dataset.mb]);
      if (e.target.id === 'q-copier') navigator.clipboard.writeText(msg).then(() => toast('📋 Message copié'), () => toast(msg));
      if (e.target.id === 'q-part') navigator.share({text: msg}).catch(() => {});
      if (e.target.id === 'q-tel') JI.lancer('tel'); if (e.target.id === 'q-pc') JI.lancer('pc');
      if (e.target.id === 'q-sync') synchro().then(() => toast('✓ Synchronisé'));
    };
  }
  function formMembre(x) {
    const soi = x.id === moiId, chef = estChef(), aucunChef = !liste('membre').some(y => ROLE[y.role] && ROLE[y.role].chef);
    // rôles de chef : donnés par un chef, ou pris par un prof quand il n'y en a encore aucun, ou ouvert depuis EPS ultime (appli des profs)
    const permis = r => !r.chef || chef || aucunChef || depuisEps;
    feuille(`<h3>${soi ? 'Moi' : esc(x.nom)}</h3>
      ${soi ? `<label class="lab">Prénom</label><input class="inp" id="mb-nom" maxlength="30" value="${esc(x.nom)}">` : ''}
      <label class="lab">Rôle</label><select class="inp" id="mb-role">${ROLES.map(r => `<option value="${r.id}" ${x.role === r.id ? 'selected' : ''} ${permis(r) || x.role === r.id ? '' : 'disabled'}>${r.ic} ${esc(r.nom)}${r.chef ? ' (prof)' : ''}</option>`).join('')}</select>
      <p class="mut" id="mb-fait" style="font-size:14px"></p>
      <div class="actions">${!soi && chef ? '<button class="btn r" id="mb-sup">Retirer de l\'équipe</button>' : ''}<button class="btn" data-fermer>Annuler</button><button class="btn p" id="mb-ok">Enregistrer</button></div>`, f => {
      const fait = () => { f.querySelector('#mb-fait').textContent = (ROLE[f.querySelector('#mb-role').value] || {}).fait || ''; };
      fait(); f.querySelector('#mb-role').onchange = fait;
      f.querySelector('#mb-ok').onclick = () => {
        if (soi) { const nn = f.querySelector('#mb-nom').value.trim(); if (nn.length >= 2) x.nom = nn; }
        const r = ROLE[f.querySelector('#mb-role').value]; if (r && (permis(r) || x.role === r.id)) x.role = r.id;
        sauver(x, true); fermer();
      };
      const s = f.querySelector('#mb-sup'); if (s) s.onclick = () => { if (confirm(`Retirer ${x.nom} de l'équipe ? (Ses articles restent.)`)) { supprimer(x); fermer(); } };
    });
  }

  /* ---------- démarrage ---------- */
  DB.tout().then(tous => { tous.forEach(i => { if (!items[i.id] || (items[i.id].maj || 0) < (i.maj || 0)) items[i.id] = i; }); entrer(); });
  window.addEventListener('afterprint', () => { $('impression').innerHTML = ''; });
})();
