/* ====== Préparations : bibliothèque à consulter + prépa guidée pas à pas ======
   Chargé après le carnet (<script src="prepa-guide.js"> dans carnet/index.html : à remettre si construire.py régénère la page).
   - Agenda › 📚 Préparations : onglets « Mes prépas » (l'ancien « 🖨 Mes prépas ») et « Bibliothèque » (toutes les séquences par
     sport et par année, à lire, imprimer ou lancer).
   - « ▶ Lancer la prépa » à gauche de 🎤 Dicter (feuille d'un cours de l'agenda, et « Ce cours » à l'appel) : plein écran,
     mise en place et matériel, puis chaque exercice avec son minuteur, son schéma, la réussite et la variante.
   - Temps de cours (Kevin) : 1 h = 50 min dont 7 min de vestiaires avant et après → 36 min ; 2 h → 86 min ;
     piscine : bus + vestiaires, 40 min dans l'eau sur 2 h (20 min sur 1 h). Les minutes de la bibliothèque sont adaptées
     à ce temps (prépa choisie pour un cours, bibliothèque, guide) : échauffement et retour au calme bougent peu, le corps de
     leçon prend le reste. */
(() => {
  const LS = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch(e){ return null; } };
  const SANS = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const VEST = 7;
  const plPool = (id, sp, type) => type === 'piscine' || /^(natation|natdeb)$/.test(id || '') || /natation|piscine|nage/i.test(sp || '');
  // minutes de cours réelles (sans vestiaires ni bus) pour n heures
  const plMin = (n, pool) => pool ? (n >= 2 ? 40 : 20) : 50 * Math.max(1, n) - 2 * VEST;
  const plAutour = (n, pool) => pool ? Math.round((50 * Math.max(1, n) - plMin(n, pool)) / 2) : VEST;
  const plDureeTxt = (n, pool) => pool ? `${n >= 2 ? '2 h' : '1 h'} de piscine : ${plMin(n, pool)} min dans l'eau (bus et vestiaires compris dans le reste)` : `${n >= 2 ? '2 h (2 × 50 min)' : '1 h (50 min)'} : ${plMin(n, pool)} min de cours, ${VEST} min de vestiaires avant et après`;

  /* --- adapter les minutes d'une leçon (items [nom, min, …]) au temps du cours --- */
  function plScale(ph, T){
    const sum = a => a.reduce((s, x) => s + (+x[1] || 0), 0), cl = (v, a, b) => Math.max(a, Math.min(b, v));
    const e = (ph.e || []).map(x => [...x]), c = (ph.c || []).map(x => [...x]), r = (ph.r || []).map(x => [...x]);
    const tot = sum(e) + sum(c) + sum(r); if (!tot || !T || tot === T) return {e, c, r};
    const f = T / tot;
    if (!c.length || !sum(c)){ [e, r].forEach(a => a.forEach(x => x[1] = Math.max(1, Math.round((+x[1] || 0) * f)))); return {e, c, r}; }
    e.forEach(x => x[1] = Math.max(2, Math.round((+x[1] || 0) * cl(f, 0.75, 1.5))));
    r.forEach(x => x[1] = Math.max(2, Math.round((+x[1] || 0) * cl(f, 0.75, 1.25))));
    const reste = Math.max(c.length * 3, T - sum(e) - sum(r)), sc = sum(c);
    let done = 0; c.forEach((x, i) => { x[1] = i === c.length - 1 ? Math.max(3, reste - done) : Math.max(3, Math.round((+x[1] || 0) * reste / sc)); done += x[1]; });
    return {e, c, r};
  }
  // prépa de la bibliothèque, minutes adaptées
  const fromLib0 = prepaFromLib;
  function plFromLib(id, an, n, T){
    const o = fromLib0(id, an, n); if (!o || !T) return o;
    const r = prepaRef(o.ref); if (!r) return o;
    const s = plScale(r.l, T);
    return {...o, e: ppLines(s.e), c: ppLines(s.c, true), r: ppLines(s.r), d: [ppMin(s.e), ppMin(s.c), ppMin(s.r)], dur: T};
  }
  // dans la feuille « Prépa » d'un cours, la leçon choisie est mise au temps de ce cours
  let PL_CTX = null;
  prepaFromLib = function(id, an, n){ const T = PL_CTX && $('sheetroot').dataset.title === PL_CTX.title ? PL_CTX.T : 0; return plFromLib(id, an, n, T); };
  const openPrepa0 = openPrepa;
  openPrepa = function(date, slotId, ids){
    const it = agItems(wdOf(date)).find(x => x.id === slotId);
    if (it){ const n = it.b - it.a + 1, st = agState(date, it), pool = plPool('', st.g.s, st.type);
      PL_CTX = {title: `Prépa · ${fmtD(date)} · ${slotLabel(it)}`, T: plMin(n, pool), n, pool}; }
    openPrepa0.apply(this, arguments);
    if (it && PL_CTX && $('pp-llist')) $('pp-llist').insertAdjacentHTML('beforebegin', `<p class="small muted" style="margin:0">⏱ ${esc(plDureeTxt(PL_CTX.n, PL_CTX.pool))} : les minutes de la leçon choisie sont adaptées.</p>`);
  };

  /* --- étapes du guide à partir d'une prépa (le texte gardé, modifié ou non) --- */
  function plParse(txt, minPh, lib, ph, kSch){
    const out = []; let last = null;
    String(txt || '').split('\n').forEach(line => {
      let m = /^\s*[•\-*]\s*(.+?)(?:\s*\((\d+(?:[.,]\d+)?)\s*min\))?\s*:\s*(.*)$/.exec(line);
      if (m){ last = {ph, n: m[1].trim(), m: m[2] ? parseFloat(m[2].replace(',', '.')) : 0, t: m[3].trim(), ok: '', va: ''}; out.push(last); return; }
      if ((m = /^\s*✓\s*Réussite\s*:\s*(.*)$/.exec(line)) && last){ last.ok = m[1]; return; }
      if ((m = /^\s*↻\s*Variante\s*:\s*(.*)$/.exec(line)) && last){ last.va = m[1]; return; }
      if (!line.trim()) return;
      if (!last){ last = {ph, n: ph, m: 0, t: '', ok: '', va: ''}; out.push(last); }
      last.t += (last.t ? '\n' : '') + line.trim();
    });
    const sans = out.filter(x => !x.m), pris = out.reduce((a, x) => a + x.m, 0);
    if (sans.length){ const r = Math.max(sans.length * 2, (+minPh || 0) - pris); sans.forEach(x => x.m = Math.max(2, Math.round(r / sans.length))); }
    out.forEach(x => { const l = (lib || []).find(y => SANS(y[0]) === SANS(x.n)); x.sch = l ? l[kSch] || '' : ''; });
    return out;
  }
  function plEtapes(pp, T){
    const r = prepaRef(pp.ref), L = r ? r.l : {};
    let e = plParse(pp.e, (pp.d || [])[0], L.e, 'Échauffement', 3), c = plParse(pp.c, (pp.d || [])[1], L.c, r && r.l.crit ? 'Évaluation' : 'Corps de leçon', 5), rr = plParse(pp.r, (pp.d || [])[2], L.r, 'Retour au calme', 3);
    if (T){ const k = a => a.map(x => [x.n, x.m]), s = plScale({e: k(e), c: k(c), r: k(rr)}, T);
      e.forEach((x, i) => x.m = s.e[i][1]); c.forEach((x, i) => x.m = s.c[i][1]); rr.forEach((x, i) => x.m = s.r[i][1]); }
    return [...e, ...c, ...rr].filter(x => x.n || x.t);
  }

  /* --- le guide plein écran --- */
  let G = null;
  const mmss = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  let actx = null;
  const bip = (n = 1) => { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); for (let i = 0; i < n; i++){ const o = actx.createOscillator(), g = actx.createGain(); o.frequency.value = 880; o.connect(g); g.connect(actx.destination); const t = actx.currentTime + i * .35; g.gain.setValueAtTime(.3, t); g.gain.exponentialRampToValueAtTime(.001, t + .3); o.start(t); o.stop(t + .3); } } catch(e){}
    try { navigator.vibrate && navigator.vibrate(n > 1 ? [200, 100, 200, 100, 200] : 200); } catch(e){} };
  let wl = null;
  const eveil = async on => { try { if (on && !wl && navigator.wakeLock) wl = await navigator.wakeLock.request('screen'); else if (!on && wl){ wl.release(); wl = null; } } catch(e){} };
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && G && G.run){ wl = null; eveil(true); } });

  function plGuide(pp, ctx){
    prepaLoad([String(pp.ref || '').split('|')[0]].filter(Boolean)).then(() => {
      const n = ctx.n || 1, pool = plPool(String(pp.ref || '').split('|')[0], pp.sp || ctx.sp, ctx.type), T = plMin(n, pool), av = plAutour(n, pool);
      const ex = plEtapes(pp, T);
      const steps = [{ph: 'Avant le cours', n: 'Mise en place', m: 0, prep: true},
        {ph: 'Début', n: pool ? 'Bus et vestiaires' : 'Vestiaires', m: av, t: pool ? 'Trajet, passage aux vestiaires, douche. Appel au bord du bassin.' : 'Les élèves se changent. Profites-en pour finir la mise en place et faire l\'appel.'},
        ...ex,
        {ph: 'Fin', n: pool ? 'Vestiaires et bus' : 'Vestiaires', m: av, t: 'Retour aux vestiaires. Rangement du matériel avec quelques élèves.'},
        {ph: 'Après le cours', n: 'Leçon terminée', m: 0, fin: true}];
      G = {pp, ctx, steps, k: 0, run: false, left: 0, end: 0, T, n, pool};
      plDraw();
    });
  }
  function plClose(){ if (!G) return; clearInterval(G.iv); eveil(false); G = null; const o = $('plg'); if (o) o.remove(); document.body.style.overflow = ''; }
  function plGo(k){ if (!G) return; G.k = Math.max(0, Math.min(G.steps.length - 1, k)); const s = G.steps[G.k]; G.left = (s.m || 0) * 60; if (G.run) G.end = Date.now() + G.left * 1000; if (!s.m){ G.run = false; clearInterval(G.iv); } plDraw(); }
  function plTick(){
    if (!G || !G.run) return;
    const left = (G.end - Date.now()) / 1000, prev = G.left; G.left = left;
    if (prev > 30 && left <= 30 && left > 0) bip(1);
    if (left <= 0){ bip(3); const nx = G.steps[G.k + 1]; if (nx && nx.m){ G.k++; G.left = nx.m * 60; G.end = Date.now() + G.left * 1000; plDraw(); return; } G.run = false; clearInterval(G.iv); if (nx) G.k++; plDraw(); return; }
    const c = $('plg-clock'); if (c){ c.textContent = mmss(left); c.classList.toggle('warn', left <= 30); }
    const b = $('plg-bar'); if (b) b.style.width = plPct() + '%';
    const rs = $('plg-rest'); if (rs) rs.textContent = plReste();
  }
  const plPasse = () => G.steps.slice(0, G.k).reduce((a, s) => a + (s.m || 0) * 60, 0) + ((G.steps[G.k].m || 0) * 60 - Math.max(0, G.left));
  const plTotal = () => G.steps.reduce((a, s) => a + (s.m || 0) * 60, 0);
  const plPct = () => Math.min(100, plPasse() / Math.max(1, plTotal()) * 100);
  const plReste = () => { const r = Math.max(0, plTotal() - plPasse()); return `Fin du cours dans ${Math.ceil(r / 60)} min · vers ${new Date(Date.now() + r * 1000).toLocaleTimeString('fr-BE', {hour: '2-digit', minute: '2-digit'})}`; };
  const sch = (k, cap) => k && window.PSCH ? PSCH(k, esc(cap || '')) : '';
  function plDraw(){
    if (!G) return;
    let o = $('plg'); if (!o){ o = document.createElement('div'); o.id = 'plg'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true'); document.body.appendChild(o); document.body.style.overflow = 'hidden'; }
    const {pp, steps, k} = G, s = steps[k], nx = steps[k + 1], timed = !!s.m;
    const head = `<div class="plg-top"><span><b>${esc(prepaCourt(pp) || pp.t || 'Prépa')}</b><br><small>${esc(s.ph)} · étape ${k + 1}/${steps.length}</small></span><button class="btn" type="button" id="plg-x">Fermer</button></div>
      <div class="plg-prog"><i id="plg-bar" style="width:${plPct()}%"></i></div>`;
    let body = '';
    if (s.prep){
      const ex = steps.filter(x => x.m && !/^(Début|Fin)$/.test(x.ph));
      body = `<h2>Mise en place</h2><p class="plg-sub">${esc(plDureeTxt(G.n, G.pool))}.</p>
        ${pp.o ? `<div class="plg-box"><b>Objectif</b><p>${esc(pp.o)}</p></div>` : ''}
        <div class="plg-box"><b>🧺 Matériel à sortir</b><p>${esc(pp.mat || 'Pas noté dans la prépa.')}</p></div>
        <div class="plg-box"><b>⏱ Déroulé</b><ol class="plg-plan">${steps.filter(x => x.m).map(x => `<li><span>${esc(x.n)}</span><em>${x.m} min</em></li>`).join('')}</ol></div>
        <div class="plg-schs">${ex.map(x => sch(x.sch, x.n)).join('')}</div>
        <div class="plg-btns"><button class="btn pri" type="button" id="plg-start">▶ Démarrer le cours</button>${G.ctx.change ? '<button class="btn" type="button" id="plg-chg">Changer de leçon</button>' : ''}</div>`;
    } else if (s.fin){
      body = `<h2>Leçon terminée 👏</h2>
        ${G.ctx.save ? `<label class="f">Bilan (ce qui a marché, à revoir)<textarea class="inp" id="plg-bil" rows="3">${esc(pp.bil || '')}</textarea></label><div class="plg-btns"><button class="btn pri" type="button" id="plg-bok">Enregistrer le bilan et fermer</button></div>` : ''}
        <div class="plg-btns"><button class="btn" type="button" id="plg-prev">‹ Étape précédente</button><button class="btn" type="button" id="plg-x2">Fermer</button></div>`;
    } else {
      body = `<h2>${esc(s.n)}</h2>
        <div class="plg-clock${timed && G.left <= 30 ? ' warn' : ''}" id="plg-clock">${mmss(G.left)}</div>
        <div class="plg-btns"><button class="btn" type="button" id="plg-prev" aria-label="Étape précédente">‹ Préc.</button><button class="btn pri" type="button" id="plg-run">${G.run ? '⏸ Pause' : '▶ Démarrer'}</button><button class="btn" type="button" id="plg-plus">+1 min</button><button class="btn" type="button" id="plg-next" aria-label="Étape suivante">Suiv. ›</button></div>
        <p class="small muted" id="plg-rest" style="margin:0">${plReste()}</p>
        <div class="plg-main"><div>${s.t ? `<p class="plg-t">${esc(s.t).replace(/\n/g, '<br>')}</p>` : ''}
          ${s.ok ? `<p class="plg-ok"><b>✓ Réussite :</b> ${esc(s.ok)}</p>` : ''}${s.va ? `<p class="plg-va"><b>↻ Variante :</b> ${esc(s.va)}</p>` : ''}
          ${nx && !nx.fin ? `<p class="plg-nx">Ensuite : <b>${esc(nx.n)}</b> (${nx.m} min)</p>` : ''}</div>
          <div>${sch(s.sch, s.n)}</div></div>`;
    }
    o.innerHTML = `<div class="plg-in">${head}${body}</div>`;
    const on = (id, f) => { const b = $(id); if (b) b.onclick = f; };
    on('plg-x', plClose); on('plg-x2', plClose);
    on('plg-start', () => { bip(0); G.run = true; eveil(true); clearInterval(G.iv); G.iv = setInterval(plTick, 250); plGo(1); });
    on('plg-chg', () => { const c = G.ctx; plClose(); c.change(); });
    on('plg-prev', () => plGo(G.k - 1));
    on('plg-next', () => plGo(G.k + 1));
    on('plg-plus', () => { G.left += 60; if (G.run) G.end += 60000; plTick(); const c = $('plg-clock'); if (c) c.textContent = mmss(G.left); });
    on('plg-run', () => { if (G.run){ G.run = false; clearInterval(G.iv); eveil(false); } else { bip(0); G.run = true; G.end = Date.now() + G.left * 1000; clearInterval(G.iv); G.iv = setInterval(plTick, 250); eveil(true); } plDraw(); });
    on('plg-bok', () => { const v = $('plg-bil').value.trim(); G.pp.bil = v; G.ctx.save(G.pp); toast('Bilan enregistré'); plClose(); });
  }
  document.addEventListener('keydown', e => { if (G && e.key === 'Escape'){ e.stopImmediatePropagation(); plClose(); } }, true);

  /* --- choisir une leçon quand le cours n'a pas encore de prépa --- */
  function plChoisir(ctx){
    const cat0 = prepaCatOf(ctx.sp || '');
    let id = cat0 && PREPA_PRETS.includes(cat0[0]) ? cat0[0] : (LS('carnet-pl-sp') || ''), an = ctx.an || 1;
    const T = () => plMin(ctx.n, plPool(id, ctx.sp, ctx.type));
    openSheet('Lancer la prépa', `<p class="small muted" style="margin:0">Pas encore de prépa pour ce cours. Choisis une leçon de la bibliothèque : elle est enregistrée pour ce cours et le guide démarre.</p>
      <div class="row2"><label class="f" style="flex:2 1 150px">Sport<select class="inp" id="plc-sp"><option value="">— Choisir —</option>${prepaOpts(id)}</select></label>
      <label class="f" id="plc-anw" style="flex:1 1 110px">Année<select class="inp" id="plc-an">${[1, 2, 3, 4, 5, 6].map(a => `<option value="${a}" ${a === an ? 'selected' : ''}>${AN_TXT(a)}</option>`).join('')}</select></label></div>
      <div id="plc-l"></div>`);
    const draw = () => { const box = $('plc-l'); $('plc-anw').style.display = PREPA_DIVERS.includes(id) ? 'none' : '';
      if (!id){ box.innerHTML = '<span class="small muted">Choisis un sport.</span>'; return; }
      if (!PREPA_LIB[id]){ box.innerHTML = '<span class="small muted">Chargement…</span>'; prepaLoad([id]).then(() => PREPA_LIB[id] ? draw() : box.innerHTML = '<span class="small">Pas de connexion : la bibliothèque n\'a pas pu se charger.</span>'); return; }
      const a = id === 'hiver' ? 0 : PREPA_DIVERS.includes(id) ? 1 : an, A = PREPA_LIB[id].an[a]; if (!A){ box.innerHTML = '<span class="small muted">Pas de séquence pour cette année.</span>'; return; }
      const su = id === 'hiver' ? null : prepaSuite(ctx.ids || [], id, a, ctx.date || today()), nx = su ? Math.min(A.l.length, su.n + 1) : 1;
      box.innerHTML = `<p class="small" style="margin:0">⏱ ${esc(plDureeTxt(ctx.n, plPool(id, ctx.sp, ctx.type)))}.</p>
        ${id === 'hiver' ? '' : `<button class="btn pri block" type="button" data-plc="${nx}">▶ ${su ? 'Leçon suivante' : 'Leçon 1'} : L${nx} · ${esc(A.l[nx - 1].t)}</button>`}
        <div class="pp-ll">${A.l.map((l, i) => `<button type="button" class="pp-lb${l.crit ? ' ev' : ''}" data-plc="${i + 1}"><b>${id === 'hiver' ? '' : 'L' + (i + 1)}</b><span>${l.crit ? '🎯 ' : ''}${esc(l.t)}</span>${su && su.faites.has(i + 1) ? '<i>✓ faite</i>' : ''}</button>`).join('')}</div>`;
      box.querySelectorAll('[data-plc]').forEach(b => b.onclick = () => { const pp = plFromLib(id, a, +b.dataset.plc, T()); if (!pp) return; if (id === 'hiver') pp.an = an;
        if (ctx.save){ ctx.save(pp); toast('Prépa enregistrée pour ce cours'); } closeSheet(); plGuide(pp, ctx); }); };
    $('plc-sp').onchange = e => { id = e.target.value; LS('carnet-pl-sp', id); draw(); };
    $('plc-an').onchange = e => { an = +e.target.value; draw(); };
    draw();
  }
  function plLancer(ctx){ const pp = ctx.get(); ctx.change = () => plChoisir(ctx); if (pp && (pp.e || pp.c || pp.r)) plGuide(pp, ctx); else plChoisir(ctx); }

  /* --- bouton « ▶ Lancer la prépa » à gauche de 🎤 Dicter --- */
  const micBtn0 = micBtn;
  micBtn = function(id){ return `<div class="row2 plg-row"><button class="btn pri plg-go" type="button" data-plgo="${id}">▶ Lancer la prépa</button>${micBtn0(id)}</div>`; };
  const openAgSlot0 = openAgSlot;
  openAgSlot = function(date, sid){
    openAgSlot0.apply(this, arguments);
    const b = document.querySelector('[data-plgo="ags-note"]'), it = agItems(wdOf(date)).find(x => x.id === sid); if (!b || !it) return;
    b.onclick = () => { closeSheet();
      const st = agState(date, it), g = agGet(date, it), ids = it.cls;
      plLancer({date, ids, n: it.b - it.a + 1, type: st.type, sp: g.s, an: ids.map(clsById).map(progYear).find(Boolean) || 1,
        get: () => agGet(date, it).pp, save: pp => { const g2 = agGet(date, it); agSet(date, it, ids, g2.s, g2.n, g2.p, pp); }}); };
  };
  const bindAgRoll0 = bindAgRoll;
  bindAgRoll = function(cls, Ls){
    bindAgRoll0.apply(this, arguments);
    const b = document.querySelector('[data-plgo="rc-note"]'); if (!b) return;
    b.onclick = () => {
      const l0 = Ls.find(Boolean) || {}, date = l0.date || today(), it = l0.h ? agItems(wdOf(date)).find(x => x.h === l0.h && cls.some(c => x.cls.includes(c.id))) : null;
      const sp = ($('rc-sp') && $('rc-sp').value) || l0.sport || '';
      plLancer({date, ids: cls.map(c => c.id), n: it ? it.b - it.a + 1 : (l0.h2 && l0.h2 !== l0.h ? hI(l0.h2) - hI(l0.h) + 1 : 1), type: l0.type, sp, an: cls.map(progYear).find(Boolean) || 1,
        get: () => (Ls.find(l => l && l.prepa) || {}).prepa || (it ? agGet(date, it).pp : null),
        save: pp => { cls.forEach((c, i) => { const l = Ls[i]; if (!l) return; l.prepa = JSON.parse(JSON.stringify(pp)); save(c.id); }); }}); };
  };

  /* --- Agenda › 📚 Préparations : Mes prépas + Bibliothèque --- */
  const seg = on => `<div class="seg full" role="tablist" aria-label="Préparations" id="plb-seg"><button type="button" data-plb="mine" aria-pressed="${on === 'mine'}">Mes prépas</button><button type="button" data-plb="lib" aria-pressed="${on === 'lib'}">Bibliothèque</button></div>`;
  const bindSeg = () => document.querySelectorAll('[data-plb]').forEach(b => b.onclick = () => { LS('carnet-pl-tab', b.dataset.plb); b.dataset.plb === 'lib' ? plBiblio() : openPrepaPrint(); });
  const openPrepaPrint0 = openPrepaPrint;
  openPrepaPrint = function(){
    openPrepaPrint0.apply(this, arguments);
    const sb = document.querySelector('.sheet .sb'), h = document.querySelector('.sheet .sh h2'); if (!sb) return;
    if (h) h.textContent = 'Préparations'; $('sheetroot').dataset.title = 'Préparations';
    sb.insertAdjacentHTML('afterbegin', seg('mine')); bindSeg();
  };
  const B = {id: LS('carnet-plb-sp') || 'basket', an: +(LS('carnet-plb-an') || 1), h: +(LS('carnet-plb-h') || 1), n: 0};
  function plBiblio(){
    const id = B.id, dv = PREPA_DIVERS.includes(id), a = id === 'hiver' ? 0 : dv ? 1 : B.an, pool = plPool(id), T = plMin(B.h, pool), L = PREPA_LIB[id], A = L && L.an[a];
    const top = `${seg('lib')}
      <p class="small muted" style="margin:0">Toutes les leçons de la bibliothèque, par sport et par année : lis-les, imprime-les ou lance-les en mode guidé. Pour les mettre dans un cours, passe par l'agenda (📋 dans le cours).</p>
      <div class="row2"><label class="f" style="flex:2 1 150px">Sport<select class="inp" id="plb-sp">${prepaOpts(id)}</select></label>
      <label class="f" style="flex:1 1 110px${dv ? ';display:none' : ''}">Année<select class="inp" id="plb-an">${[1, 2, 3, 4, 5, 6].map(x => `<option value="${x}" ${x === B.an ? 'selected' : ''}>${AN_TXT(x)} secondaire</option>`).join('')}</select></label></div>
      <div class="seg" role="group" aria-label="Durée du cours">${[1, 2].map(h => `<button type="button" data-plbh="${h}" aria-pressed="${B.h === h}">${h === 1 ? '1 heure' : '2 heures'}</button>`).join('')}</div>
      <p class="small" style="margin:0">⏱ ${esc(plDureeTxt(B.h, pool))}.</p>`;
    let body = '';
    if (!L) body = '<span class="small muted" id="plb-load">Chargement…</span>';
    else if (!A) body = '<span class="small muted">Pas encore de séquence pour cette année.</span>';
    else if (B.n && A.l[B.n - 1]) body = plLecon(id, a, B.n, T);
    else body = `<div class="card"><b>${esc(id === 'hiver' ? 'Jeux d\'hiver' : A.th)}</b>${A.mat || L.mat ? `<p class="small" style="margin:4px 0 0"><b>Matériel :</b> ${esc(A.mat || L.mat)}</p>` : ''}</div>
      <button class="btn block" type="button" id="plb-seq">🖨 Imprimer ${id === 'hiver' ? 'tous les jeux' : 'toute la séquence'} (${A.l.length} leçons)</button>
      ${ppCycles(A).map(cy => `${ppCycles(A).length > 1 && id !== 'hiver' ? `<div class="pp-cy"><b>Cycle ${cy.k}</b><span>${esc(cy.th)}</span></div>` : ''}<div class="pp-ll">${A.l.slice(cy.de - 1, cy.a).map((l, j) => { const i = cy.de + j;
        return `<button type="button" class="pp-lb${l.crit ? ' ev' : ''}" data-plbl="${i}"><b>${id === 'hiver' ? '' : 'L' + i}</b><span>${l.crit ? '🎯 ' : ''}${esc(l.t)}</span></button>`; }).join('')}</div>`).join('')}`;
    openSheet('Préparations', top + body);
    bindSeg();
    $('plb-sp').onchange = e => { B.id = e.target.value; B.n = 0; LS('carnet-plb-sp', B.id); plBiblio(); };
    if ($('plb-an')) $('plb-an').onchange = e => { B.an = +e.target.value; B.n = 0; LS('carnet-plb-an', String(B.an)); plBiblio(); };
    document.querySelectorAll('[data-plbh]').forEach(b => b.onclick = () => { B.h = +b.dataset.plbh; LS('carnet-plb-h', String(B.h)); plBiblio(); });
    if (!L){ prepaLoad([id]).then(() => { if (PREPA_LIB[id]) plBiblio(); else if ($('plb-load')) $('plb-load').textContent = 'Pas de connexion : la bibliothèque n\'a pas pu se charger.'; }); return; }
    if (!A) return;
    document.querySelectorAll('[data-plbl]').forEach(b => b.onclick = () => { B.n = +b.dataset.plbl; plBiblio(); document.querySelector('.sheet .sb').scrollTop = 0; });
    const titre = `${L.sport} · ${id === 'hiver' ? 'jeux d\'hiver' : dv ? 'toutes années' : AN_TXT(a) + ' secondaire'}`;
    if ($('plb-seq')) $('plb-seq').onclick = () => prepaPrint(A.l.map((l, i) => ({date: '', h: '', cls: [], pp: plFromLib(id, a, i + 1, T), prog: null})), titre);
    if ($('plb-back')) $('plb-back').onclick = () => { B.n = 0; plBiblio(); };
    if ($('plb-prt')) $('plb-prt').onclick = () => prepaPrint([{date: '', h: '', cls: [], pp: plFromLib(id, a, B.n, T), prog: null}], `${titre} · leçon ${B.n}`);
    if ($('plb-go')) $('plb-go').onclick = () => { const pp = plFromLib(id, a, B.n, T); plGuide(pp, {n: B.h, sp: L.sport, get: () => pp}); };
    if ($('plb-prev')) $('plb-prev').onclick = () => { B.n--; plBiblio(); document.querySelector('.sheet .sb').scrollTop = 0; };
    if ($('plb-next')) $('plb-next').onclick = () => { B.n++; plBiblio(); document.querySelector('.sheet .sb').scrollTop = 0; };
  }
  function plLecon(id, a, n, T){
    const r = prepaRef(`${id}|${a}|${n}`), l = r.l, s = plScale(l, T), A = r.A;
    const ph = (nom, items, k) => items.length ? `<div class="card plb-ph"><h3>${nom} <small>${ppMin(items)} min</small></h3>${items.map(x => { const z = x[k === 'c' ? 5 : 3];
      return `<div class="plb-it"><b>${esc(x[0])}</b> <span class="tag">${x[1]} min</span><p>${esc(x[2] || '')}</p>${k === 'c' && x[3] ? `<p class="small"><b>✓ Réussite :</b> ${esc(x[3])}</p>` : ''}${k === 'c' && x[4] ? `<p class="small"><b>↻ Variante :</b> ${esc(x[4])}</p>` : ''}${z && window.PSCH ? `<div class="pp-schs">${PSCH(z, esc(x[0]))}</div>` : ''}</div>`; }).join('')}</div>` : '';
    return `<div class="row2"><button class="btn" type="button" id="plb-back">‹ Toutes les leçons</button>${n > 1 ? '<button class="btn" type="button" id="plb-prev">‹ L' + (n - 1) + '</button>' : ''}${n < A.l.length ? '<button class="btn" type="button" id="plb-next">L' + (n + 1) + ' ›</button>' : ''}</div>
      <div class="card"><span class="small muted">${id === 'hiver' ? 'Jeu d\'hiver' : `Leçon ${n}/${A.l.length}`}</span><h3 style="margin:2px 0">${l.crit ? '🎯 ' : ''}${esc(l.t)}</h3>${l.o ? `<p style="margin:4px 0"><b>Objectif :</b> ${esc(l.o)}</p>` : ''}<p class="small" style="margin:4px 0 0"><b>Matériel :</b> ${esc(l.mat || A.mat || r.L.mat || '')}</p></div>
      <div class="row2"><button class="btn pri" type="button" id="plb-go">▶ Lancer en mode guidé</button><button class="btn" type="button" id="plb-prt">🖨 Imprimer cette leçon</button></div>
      ${ph('Échauffement', s.e, 'e')}${ph(l.crit ? 'Évaluation' : 'Corps de leçon', s.c, 'c')}${ph('Retour au calme', s.r, 'r')}
      ${l.crit ? `<div class="card"><h3>Grille d'évaluation</h3>${l.crit.map(([c, p, i]) => `<p class="small" style="margin:4px 0"><b>${esc(c)}</b> · ${fr(p, 2)} pt${p > 1 ? 's' : ''}${i ? ' · ' + esc(i) : ''}</p>`).join('')}</div>` : ''}`;
  }
  const plBiblioOuMes = () => LS('carnet-pl-tab') === 'lib' ? plBiblio() : openPrepaPrint();
  const render0 = render;
  render = function(){ render0.apply(this, arguments);
    const b = $('ag-prt'); if (b && UI.tab === 'agenda'){ b.textContent = '📚 Préparations'; b.onclick = () => prepaLoad([]).then(plBiblioOuMes); } };

  const st = document.createElement('style');
  st.textContent = `.plg-row{align-items:center}.plg-row .ag-mic{margin-top:0}
#plg{position:fixed;inset:0;z-index:80;background:var(--bg);color:var(--fg);overflow:auto;padding:max(12px,env(safe-area-inset-top)) 16px calc(16px + env(safe-area-inset-bottom))}
.plg-in{max-width:1000px;margin:0 auto;display:grid;gap:12px}
.plg-top{display:flex;justify-content:space-between;align-items:center;gap:10px}.plg-top small{color:var(--muted)}
.plg-prog{height:6px;border-radius:9px;background:var(--line);overflow:hidden}.plg-prog i{display:block;height:100%;background:var(--accent);transition:width .3s}
#plg h2{margin:0;font:700 clamp(1.6rem,6vw,2.6rem)/1.1 var(--display);text-transform:uppercase}
.plg-sub{margin:0;color:var(--muted)}
.plg-clock{font:700 clamp(4.5rem,24vw,9rem)/1 var(--display);font-variant-numeric:tabular-nums;color:var(--accent);letter-spacing:-.02em}
.plg-clock.warn{color:var(--bad)}
.plg-btns{display:flex;gap:8px;flex-wrap:wrap}.plg-btns .btn{flex:1 1 70px;padding-inline:8px;min-height:52px;font-size:1.05rem}
.plg-main{display:grid;grid-template-columns:minmax(0,1fr);gap:12px}@media (min-width:760px){.plg-main{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
.plg-t{font-size:1.25rem;line-height:1.45;margin:0}.plg-ok,.plg-va{margin:0;font-size:1.05rem}.plg-nx{margin:0;color:var(--muted)}
.plg-main .psch{max-width:520px}
.plg-box{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:10px 12px}.plg-box p{margin:4px 0 0}
.plg-plan{margin:6px 0 0;padding-left:20px}.plg-plan li{display:flex;justify-content:space-between;gap:10px;padding:3px 0;border-bottom:1px dashed var(--line)}.plg-plan em{font-style:normal;color:var(--muted);white-space:nowrap}
.plg-schs{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px}
.plb-ph h3 small{font-weight:600;color:var(--muted);text-transform:none;font-family:var(--body)}.plb-it{padding:8px 0;border-top:1px solid var(--line)}.plb-it p{margin:4px 0 0}`;
  document.head.appendChild(st);
  window.prepaGuide = {plMin, plScale, plGuide, plBiblio};
})();
