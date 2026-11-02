/* ====== Notes des prépas entre collègues (kevin, 2 nov. 2026) ======
   Chargé après les autres scripts du carnet (<script src="avis.js"> dans carnet/index.html, à remettre si construire.py régénère la page).
   - À l'ouverture du carnet, une fois la journée finie (le lendemain, ou le jour même après 17 h), le carnet demande une note
     de 0 à 10 pour chaque prépa de la bibliothèque faite (ou prévue) les 4 derniers jours et pas encore notée.
     « Pas faite » ou « Passer » : il ne redemande plus pour ce cours ; « Plus tard » : il redemande à la prochaine ouverture.
   - Une prépa n'est notée qu'une fois par prof (une nouvelle note remplace l'ancienne). Seules les prépas de la bibliothèque
     (ref « sport|année|leçon ») ont des notes : ce sont les seules que tous les profs ont en commun.
   - Les notes partent vers un Google Sheet commun à tous les profs (script carnet/google/Avis.gs, URL dans AVIS_URL ci-dessous),
     avec le code d'école (localStorage 'eps-code'). Sans internet, elles attendent dans S.settings.avisFile et repartent plus tard.
   - Les moyennes (⭐ 7,5 · 3 avis) s'affichent sur les boutons des leçons : prépa d'un cours (📋), « Lancer la prépa » et
     Préparations › Bibliothèque. Toucher la pastille montre la note de chaque collègue.
   Données : S.settings.avisId (identifiant du carnet, pour remplacer sa note), S.settings.avisMes = {ref: {n, d}},
   S.settings.avisVu = ['date|h|ref'] (cours déjà proposés), S.settings.avisFile = [{ref, note, sp, an, n, t}] (à envoyer).
   Cache des notes de tout le monde : localStorage 'carnet-avis' = {at, avis}. */
(() => {
  const AVIS_URL = '';  // URL /exec du script « Notes des prépas EPS » (carnet/google/Avis.gs), à remplir une fois déployé
  const LS = (k, v) => { const ls = window.DEMO_LS || localStorage; try { if (v === undefined) return ls.getItem(k); ls.setItem(k, v); } catch(e){ return null; } };
  const JOURS_MAX = 4, HEURE_FIN = 17, CACHE_MS = 30 * 60 * 1000;
  const set = () => S.settings;
  const mes = () => set().avisMes && typeof set().avisMes === 'object' ? set().avisMes : (set().avisMes = {});
  const vus = () => Array.isArray(set().avisVu) ? set().avisVu : (set().avisVu = []);
  const file = () => Array.isArray(set().avisFile) ? set().avisFile : (set().avisFile = []);
  const monId = () => set().avisId || (set().avisId = 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8));
  const code = () => LS('eps-code') || LS('eps-cle') || '';
  const nomProf = () => (prepaEn().prof || '').trim();
  /* les jeux divers (corde, lutte) sont les mêmes pour toutes les années : une seule note */
  const refNorm = ref => { const m = /^([a-z0-9]+)\|(\d+)\|(\d+)$/i.exec(String(ref || '')); if (!m) return '';
    return m[1] === 'hiver' ? `hiver|0|${m[3]}` : PREPA_DIVERS.includes(m[1]) ? `${m[1]}|1|${m[3]}` : `${m[1]}|${m[2]}|${m[3]}`; };

  /* --- notes de tout le monde (cache) --- */
  let cache = (() => { try { return JSON.parse(LS('carnet-avis') || 'null') || {at: 0, avis: {}}; } catch(e){ return {at: 0, avis: {}}; } })();
  const garder = avis => { if (!avis || typeof avis !== 'object') return; cache = {at: Date.now(), avis}; LS('carnet-avis', JSON.stringify(cache)); decorer(true); };
  async function charger(force){
    if (!AVIS_URL || !code() || !navigator.onLine) return;
    if (!force && Date.now() - cache.at < CACHE_MS) return;
    try { const r = await (await fetch(`${AVIS_URL}?code=${encodeURIComponent(code())}&action=avis`)).json(); if (r && r.ok) garder(r.avis); } catch(e){}
  }
  /* moyenne d'une prépa : les notes reçues + ma note pas encore envoyée */
  function stat(ref){
    const a = cache.avis[ref], moi = mes()[ref], d = a && Array.isArray(a.d) ? a.d.map(x => [...x]) : [];
    const enAttente = moi && file().some(x => x.ref === ref);
    if (enAttente || (moi && !AVIS_URL)) d.push([nomProf() || 'Moi', moi.n, '', true]);
    if (!d.length) return null;
    return {m: d.reduce((s, x) => s + (+x[1] || 0), 0) / d.length, n: d.length, d, moi: moi ? moi.n : null};
  }

  /* --- envoi --- */
  let envoi = null;
  function envoyer(){
    if (envoi || !AVIS_URL || !code() || !file().length || !navigator.onLine) return envoi;
    const lot = file().slice(0, 40);
    envoi = fetch(AVIS_URL, {method: 'POST', headers: {'Content-Type': 'text/plain;charset=utf-8'},
      body: JSON.stringify({action: 'avis', code: code(), id: monId(), prof: nomProf(), notes: lot})})
      .then(r => r.json()).then(r => {
        if (!r || !r.ok) return;
        set().avisFile = file().filter(x => !lot.some(y => y.ref === x.ref && y.note === x.note)); save();
        if (r.avis) garder(r.avis);
      }).catch(() => {}).finally(() => { envoi = null; });
    return envoi;
  }
  function noter(pp, note){
    const ref = refNorm(pp.ref); if (!ref) return;
    const r = prepaRef(pp.ref);
    mes()[ref] = {n: note, d: today()};
    set().avisFile = file().filter(x => x.ref !== ref).concat([{ref, note, sp: r ? r.L.sport : pp.sp || '', an: ref.split('|')[1] === '0' ? 0 : +ref.split('|')[1], n: +ref.split('|')[2], t: r ? r.l.t : pp.t || ''}]);
    save(); envoyer(); decorer(true);
  }

  /* --- prépas à noter : faites (ou prévues) depuis 10 jours, journée finie, pas encore notées ni passées --- */
  function aNoter(){
    const auj = today(), h = new Date().getHours(), min = addDays(auj, -JOURS_MAX), vu = new Set(vus()), out = new Map();
    const ajoute = (date, hh, cls, pp) => {
      if (!pp || !date || date < min || date > auj || (date === auj && h < HEURE_FIN)) return;
      const ref = refNorm(pp.ref); if (!ref || mes()[ref] || vu.has(`${date}|${hh}|${ref}`)) return;
      const y = out.get(ref);
      if (y){ cls.forEach(c => { if (!y.cls.includes(c)) y.cls.push(c); }); if (!y.cles.includes(`${date}|${hh}|${ref}`)) y.cles.push(`${date}|${hh}|${ref}`); return; }
      out.set(ref, {ref, date, h: hh, cls: [...cls], pp, cles: [`${date}|${hh}|${ref}`]});
    };
    prepaAll().forEach(x => ajoute(x.date, x.h, x.cls, x.pp));
    /* 2e activité d'un bloc de 2 h (deux-activites.js) */
    S.classes.forEach(c => c.lessons.forEach(l => { if (l.dbl && l.dbl.pp2) ajoute(l.date, l.h, [c], l.dbl.pp2); }));
    Object.entries(S.settings.ag || {}).forEach(([k, v]) => { if (!v || !v.d || !v.d.pp2) return; const [date, hh] = k.split('|');
      const it = agItems(wdOf(date)).find(x => x.h === hh); ajoute(date, hh, (it ? it.cls : []).map(clsById).filter(Boolean), v.d.pp2); });
    return [...out.values()].sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
  }

  /* --- la fenêtre « Comment s'est passée ta prépa ? » --- */
  let demande = false;
  function demander(){
    if (demande || window.DEMO_LS) return;
    if ($('sheetroot') && $('sheetroot').innerHTML){ setTimeout(demander, 15000); return; }  // une fenêtre est ouverte : plus tard
    const L = aNoter(); if (!L.length) return;
    demande = true;
    const ligne = (x, i) => { const r = prepaRef(x.pp.ref), t = r ? r.l.t : x.pp.t, st = stat(x.ref);
      return `<div class="card av-q" data-avq="${i}"><span class="small muted">${esc(fmtD(x.date))}${x.h ? ' · ' + esc(x.h) : ''}${x.cls.length ? ' · ' + esc(x.cls.map(c => c.name).join(', ')) : ''}</span>
        <b>${esc(prepaCourt(r ? {...x.pp, sp: r.L.sport, t} : x.pp))}</b>
        ${st && st.d.some(d => !d[3]) ? `<span class="small muted">Tes collègues : ⭐ ${fr(st.m)}/10 · ${st.n} avis</span>` : ''}
        <div class="av-n" role="group" aria-label="Note sur 10">${Array.from({length: 11}, (_, n) => `<button type="button" class="av-b" data-avn="${n}">${n}</button>`).join('')}</div>
        <div class="av-bas"><span class="small muted">0 = à oublier · 10 = parfaite</span><button type="button" class="btn av-x" data-avx="${i}">Pas faite / passer</button></div></div>`; };
    openSheet('Note tes prépas', `<p class="small muted" style="margin:0">La journée est finie : comment se sont passées ces prépas de la bibliothèque ? Ta note de 0 à 10 est partagée avec tes collègues, ils la voient à côté de la leçon quand ils choisissent une prépa.</p>
      ${nomProf() ? '' : `<label class="f">Ton prénom (vu par tes collègues avec ta note)<input class="inp" id="av-nom" placeholder="ex. Kevin" autocomplete="given-name"></label>`}
      ${L.map(ligne).join('')}
      <button class="btn block" type="button" id="av-tard">Plus tard</button>`);
    const fin = () => { if (!document.querySelector('[data-avq]')){ closeSheet(); toast('Merci ! Tes notes sont partagées avec tes collègues'); } };
    const nom = $('av-nom'); if (nom) nom.onchange = () => { const v = nom.value.trim(); if (v){ S.settings.prepaEn = {...prepaEn(), prof: v}; save(); } };
    document.querySelectorAll('[data-avq]').forEach(box => { const x = L[+box.dataset.avq];
      box.querySelectorAll('[data-avn]').forEach(b => b.onclick = () => {
        if (nom && nom.value.trim() && !nomProf()){ S.settings.prepaEn = {...prepaEn(), prof: nom.value.trim()}; }
        noter(x.pp, +b.dataset.avn); box.remove(); fin(); });
      box.querySelector('[data-avx]').onclick = () => { set().avisVu = vus().concat(x.cles).slice(-400); save(); box.remove(); fin(); }; });
    $('av-tard').onclick = closeSheet;
  }

  /* --- pastilles ⭐ sur les boutons des leçons --- */
  const ZONES = [['#pp-llist', 'pl', 'pp-lsp', 'pp-lan'], ['#plc-l', 'plc', 'plc-sp', 'plc-an'], ['.sheet .sb', 'plbl', 'plb-sp', 'plb-an']];
  const pastille = st => st ? `⭐ ${fr(st.m)}${st.n > 1 || !st.d[0][3] ? ` · ${st.n} avis` : ' · ta note'}` : '';
  function decorer(tout){
    ZONES.forEach(([q, k, sp, an]) => {
      const box = document.querySelector(q); if (!box || !$(sp)) return;
      const [id] = prepaVal($(sp).value); if (!id) return;
      const a = id === 'hiver' ? 0 : PREPA_DIVERS.includes(id) ? 1 : +($(an) ? $(an).value : 1) || 1;
      box.querySelectorAll(`.pp-lb[data-${k}]`).forEach(b => {
        const ref = refNorm(`${id}|${a}|${b.dataset[k]}`), txt = pastille(stat(ref));
        let p = b.querySelector('.av-p');
        if (p && !tout && p.dataset.ref === ref) return;
        if (!txt){ if (p) p.remove(); return; }
        if (!p){ p = document.createElement('i'); p.className = 'av-p'; p.setAttribute('role', 'button'); p.tabIndex = 0; b.appendChild(p); }
        p.dataset.ref = ref; p.textContent = txt; p.title = 'Voir les notes des collègues';
        p.onclick = e => { e.stopPropagation(); e.preventDefault(); detail(ref, p); };
      });
    });
  }
  function detail(ref, ancre){
    document.querySelectorAll('.av-d').forEach(x => x.remove());
    const st = stat(ref), r = prepaRef(ref); if (!st) return;
    const d = document.createElement('div'); d.className = 'av-d';
    d.innerHTML = `<b>${esc(r ? `${r.L.sport} · ${r.l.t}` : ref)}</b><span class="small muted">Moyenne ⭐ ${fr(st.m)}/10 · ${st.n} avis</span>
      ${st.d.slice().sort((a, b) => b[1] - a[1]).map(x => `<div class="av-dl"><span>${esc(x[0] || 'Un collègue')}${x[3] ? ' (pas encore envoyée)' : ''}</span><b>${esc(String(x[1]))}/10</b>${x[2] ? `<span class="small muted">${esc(x[2])}</span>` : ''}</div>`).join('')}
      <button type="button" class="btn" data-avf>Fermer</button>`;
    const b = ancre.closest('.pp-lb'); (b.parentNode).insertBefore(d, b.nextSibling);
    d.querySelector('[data-avf]').onclick = () => d.remove();
  }
  let t = null;
  new MutationObserver(() => { clearTimeout(t); t = setTimeout(() => decorer(false), 30); }).observe(document.body, {childList: true, subtree: true});
  document.addEventListener('change', e => { if (e.target && /^(pp|plc|plb)-(lan|an)$/.test(e.target.id)) setTimeout(() => decorer(true), 30); }, true);

  const st = document.createElement('style');
  st.textContent = `.av-p{flex:0 0 auto; font-style:normal; font-size:12px; font-weight:700; padding:3px 7px; border-radius:999px; background:var(--accent-soft); color:var(--fg); white-space:nowrap; cursor:pointer}
    .pp-hl .pp-lb .av-p{align-self:flex-start}
    .av-d{display:flex; flex-direction:column; gap:6px; border:1px solid var(--line); background:var(--surface); border-radius:10px; padding:10px 12px; margin:4px 0 8px}
    .av-dl{display:flex; gap:10px; align-items:baseline} .av-dl span:first-child{flex:1}
    .av-q{display:flex; flex-direction:column; gap:6px}
    .av-n{display:grid; grid-template-columns:repeat(11, 1fr); gap:4px}
    .av-b{min-height:40px; border:1px solid var(--line); background:var(--surface); color:var(--fg); border-radius:8px; font:700 15px/1 var(--display, inherit); padding:0}
    .av-b:active, .av-b:hover{background:var(--accent); color:var(--accent-ink); border-color:var(--accent)}
    .av-bas{display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap}
    @media (max-width:380px){ .av-n{grid-template-columns:repeat(6, 1fr)} }`;
  document.head.appendChild(st);

  /* à l'ouverture : laisser le carnet se synchroniser, puis envoyer ce qui attend, lire les notes et demander */
  const auDemarrage = () => { envoyer(); charger(); setTimeout(demander, 1500); };
  setTimeout(auDemarrage, 2500);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible'){ envoyer(); charger(); } });
  window.addEventListener('online', () => { envoyer(); charger(true); });
  window.carnetAvis = {aNoter, demander, stat, noter, charger, envoyer, refNorm};
})();
