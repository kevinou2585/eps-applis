/* ====== Deux activités sur un bloc de 2 h (kevin, 1er nov. 2026) ======
   Sur un cours de 2 heures d'affilée, on fait parfois une activité par heure, parfois dans deux salles.
   Case « 2 activités sur ce bloc (une par heure) » sous le sport, dans la fiche du cours (Agenda) et dans « Ce cours » sous l'appel (Présences).
   Données : l.dbl = {s2: sport de la 2e heure, sa: [salle 1re heure, salle 2e heure]} sur les leçons ;
             avant l'appel : S.settings.ag['date|H'].d (même forme), repris dans les leçons au début de l'appel.
   l.sport reste le sport de la 1re heure : tout ce qui existait continue de marcher.
   Planning de l'année : S.settings.planAn2 = {idClasse: {lundi: sport de la 2e heure}} (« 2e activité » dans la fenêtre d'une case).
   Chargé après les autres scripts : enveloppe agGet / agSet / agApply / openAgSlot / bindAgRoll / agCard / agMini /
   planWeekLessons / planWeekHTML / openPlanCell. */
(() => {
  const SALLES2 = ['Grande salle', 'Petite salle', 'Le Brel', 'Cour extérieure', 'Plaine', 'Stade', 'Piscine'];
  const dOk = d => d && (d.s2 || d.pp2 || (d.sa && (d.sa[0] || d.sa[1]))) ? d : null;
  const cp = d => d ? JSON.parse(JSON.stringify(d)) : null;
  const agK = (date, h) => date + '|' + (h || '');
  /* deux activités d'un cours (leçons d'abord, sinon ce qui a été prévu avant l'appel) */
  function dblGet(date, it, ids){
    const f = agLessons(date, it, ids).find(([, l]) => l.dbl); if (f) return f[1].dbl;
    const p = (S.settings.ag || {})[agK(date, it.h)]; return p && p.d ? p.d : null;
  }
  function dblSet(date, it, ids, d){
    d = dOk(d); const ls = agLessons(date, it, ids), k = agK(date, it.h);
    ls.forEach(([c, l]) => { if (d) l.dbl = cp(d); else delete l.dbl; save(c.id); });
    if (ls.length < ids.length && d){ if (!S.settings.ag) S.settings.ag = {}; S.settings.ag[k] = {...(S.settings.ag[k] || {s: '', n: ''}), d: cp(d)}; }
    else if (S.settings.ag && S.settings.ag[k]){ delete S.settings.ag[k].d; const p = S.settings.ag[k]; if (!p.s && !p.n && !p.p && !p.pp) delete S.settings.ag[k]; }
    save();
  }
  window.dblGet = dblGet; window.dblSet = dblSet;
  window.dblTxt = (s, d) => s + (d && d.s2 && d.s2 !== s ? ' + ' + d.s2 : '');

  /* agSet réécrit S.settings.ag[k] : on garde les deux activités déjà notées */
  const agSet0 = agSet;
  agSet = function(date, it){
    const k = agK(date, it.h), d = ((S.settings.ag || {})[k] || {}).d;
    const r = agSet0.apply(this, arguments);
    if (d && S.settings.ag && S.settings.ag[k] && !S.settings.ag[k].d){ S.settings.ag[k].d = d; save(); }
    return r;
  };
  /* au début de l'appel : les deux activités prévues passent dans les leçons */
  const agApply0 = agApply;
  agApply = function(date, h, cls){
    const p = (S.settings.ag || {})[agK(date, h)], d = p && p.d;
    const r = agApply0.apply(this, arguments);
    if (d) cls.forEach(c => { const l = lessonOn(c, date, h); if (l && !l.dbl){ l.dbl = cp(d); save(c.id); } });
    return r;
  };

  /* --- la case et ses deux lignes, placées juste sous le choix du sport --- */
  const sOpts = cur => sportOptions(cur).replace(/<option value="__add">[^<]*<\/option>/, '');
  const salOpts = cur => `<option value="">— Salle —</option>${cur && !SALLES2.includes(cur) ? `<option selected>${esc(cur)}</option>` : ''}${SALLES2.map(s => `<option ${s === cur ? 'selected' : ''}>${esc(s)}</option>`).join('')}`;
  function dblHTML(pre, d, prevu2){
    const sa = (d && d.sa) || ['', ''];
    return `<div class="dbl" id="${pre}-dbl">
      <label class="toggle dbl-ck"><input type="checkbox" id="${pre}-dblck" ${d ? 'checked' : ''}><span>🔀 <b>2 activités sur ce bloc</b> (une par heure)</span></label>
      <div class="dbl-b" id="${pre}-dblb" ${d ? '' : 'hidden'}>
        <div class="dbl-h"><b>1re heure</b><span class="dbl-s1" id="${pre}-s1t"></span><select class="inp" id="${pre}-sa1" aria-label="Salle de la 1re heure">${salOpts(sa[0])}</select></div>
        <div class="dbl-h"><b>2e heure</b><select class="inp" id="${pre}-s2" aria-label="Sport de la 2e heure">${sOpts((d && d.s2) || '')}</select><select class="inp" id="${pre}-sa2" aria-label="Salle de la 2e heure">${salOpts(sa[1])}</select></div>
        <div id="${pre}-pp2w"></div>
        ${prevu2 && !(d && d.s2) ? `<button class="btn ag-plb" type="button" id="${pre}-pl2">🗓 2e heure prévue au planning : <b>${esc(prevu2)}</b> · choisir</button>` : ''}
      </div></div>`;
  }
  function dblMount(pre, d, prevu2, put, cur, prepa2){
    const row = $(pre + '-addrow'); if (!row || $(pre + '-dbl')) return;
    row.insertAdjacentHTML('afterend', dblHTML(pre, d, prevu2));
    const lab = $(pre + '-sp') && $(pre + '-sp').closest('label'), t0 = lab && lab.firstChild && lab.firstChild.nodeType === 3 ? lab.firstChild : null, txt0 = t0 ? t0.textContent : '';
    const get = () => { if (!$(pre + '-dblck').checked) return null; const o = {s2: $(pre + '-s2').value, sa: [$(pre + '-sa1').value, $(pre + '-sa2').value]}, old = cur();
      if (old && old.pp2) o.pp2 = old.pp2; return o; };
    const show = () => { const on = $(pre + '-dblck').checked, v = $(pre + '-sp') ? $(pre + '-sp').value : '';
      $(pre + '-s1t').textContent = v && v !== '__add' ? v : 'choisis le sport au-dessus'; $(pre + '-dblb').hidden = !on; if (t0) t0.textContent = on ? 'Sport / activité · 1re heure' : txt0; };
    const go = () => { show(); put(get()); };
    $(pre + '-dblck').onchange = () => { go(); toast($(pre + '-dblck').checked ? '2 activités sur ce bloc' : 'Une seule activité sur le bloc'); };
    [pre + '-s2', pre + '-sa1', pre + '-sa2'].forEach(id => $(id).onchange = go);
    if ($(pre + '-pl2')) $(pre + '-pl2').onclick = () => { const sel = $(pre + '-s2'); if (![...sel.options].some(o => o.value === prevu2)) sel.innerHTML = sOpts(prevu2); sel.value = prevu2; $(pre + '-pl2').remove(); go(); };
    if ($(pre + '-sp')) $(pre + '-sp').addEventListener('change', show);
    /* 2e prépa : bouton « Sélectionner une préparation (2e heure) » + « ▶ Lancer » */
    if (prepa2){ const w = $(pre + '-pp2w'), draw = () => { const pp2 = (cur() || {}).pp2;
        w.innerHTML = `<button class="btn block ag-ppb" type="button" id="${pre}-pp2"><span>📋 ${pp2 ? `Prépa 2e heure : <b>${esc(prepaCourt(pp2))}</b> · changer` : 'Sélectionner une préparation pour la 2e heure'}</span></button>${pp2 && window.plLancer ? `<button class="btn pri block" type="button" id="${pre}-pp2go">▶ Lancer la prépa de la 2e heure</button>` : ''}`;
        $(pre + '-pp2').onclick = () => { put(get()); prepa2.choisir(); };
        if ($(pre + '-pp2go')) $(pre + '-pp2go').onclick = () => { put(get()); prepa2.lancer(); }; };
      draw(); }
    show();
  }
  const bloc = it => it && it.b > it.a;
  const prevu2Of = (date, it) => it.cls.map(id => ((S.settings.planAn2 || {})[id] || {})[mondayOf(date)]).find(Boolean) || '';

  /* Agenda : fiche d'un cours */
  const openAgSlot0 = openAgSlot;
  openAgSlot = function(date, id){
    const r = openAgSlot0.apply(this, arguments);
    const it = agItems(wdOf(date)).find(x => x.id === id); if (!bloc(it)) return r;
    const grpIds = () => { const b = document.querySelector('[data-grp][aria-pressed="true"]'); return it.pick && b ? [b.dataset.grp] : it.cls; };
    dblMount('ags', dblGet(date, it), prevu2Of(date, it), d => dblSet(date, it, grpIds(), d), () => dblGet(date, it, grpIds()), {
      choisir: () => { const oc = sheetOnClose; sheetOnClose = null; if (oc) oc(); prepa2Ouvrir(date, it, grpIds(), false); },
      lancer: () => { const oc = sheetOnClose; sheetOnClose = null; closeSheet(); if (oc) oc(); prepa2Lancer(date, it, grpIds()); }});
    return r;
  };
  /* Présences : « Ce cours » sous l'appel */
  const bindAgRoll0 = bindAgRoll;
  bindAgRoll = function(cls, Ls){
    const r = bindAgRoll0.apply(this, arguments);
    if (!$('ag-rc')) return r;
    const it = agRollIt(Ls, cls), l0 = Ls.find(Boolean) || {};
    if (it){ if (bloc(it)){ const date = l0.date, ids = cls.map(c => c.id); dblMount('rc', dblGet(date, it, ids), prevu2Of(date, it), d => dblSet(date, it, ids, d), () => dblGet(date, it, ids), {
      choisir: () => prepa2Ouvrir(date, it, ids, true), lancer: () => prepa2Lancer(date, it, ids)}); } }
    else if (l0.h && l0.h2 && l0.h2 !== l0.h){  // appel hors horaire, mais sur 2 h
      dblMount('rc', l0.dbl || null, '', d => { d = dOk(d); cls.forEach((c, i) => { const l = Ls[i]; if (!l) return; if (d) l.dbl = cp(d); else delete l.dbl; save(c.id); }); }, () => (Ls.find(l => l && l.dbl) || {}).dbl || null);
    }
    return r;
  };

  /* --- 2e prépa : la même fenêtre de prépa (openPrepa), branchée sur la 2e heure ---
     Pendant qu'elle est ouverte, agGet / agSet de ce cours lisent et écrivent la 2e activité (s2, pp2) au lieu de la 1re.
     Avec 2 activités, chaque prépa est faite pour 1 heure (durée de la barre Durée · Salle · Élèves). */
  let H2 = null;
  const h2On = (date, it) => H2 && H2.date === date && H2.h === it.h && (H2.boot || $('pp-h2mark'));
  const agGet1 = agGet;
  agGet = function(date, it){
    if (!h2On(date, it)) return agGet1.apply(this, arguments);
    const d = dblGet(date, it, H2.ids) || {}; return {s: d.s2 || '', n: '', p: null, pp: d.pp2 || null};
  };
  const agSet1 = agSet;
  agSet = function(date, it, ids, s, n, pr, pp){
    if (!h2On(date, it)) return agSet1.apply(this, arguments);
    const d = {...(dblGet(date, it, ids) || {s2: '', sa: ['', '']})};
    if (!d.s2 && s) d.s2 = s; if (pp) d.pp2 = JSON.parse(JSON.stringify(pp)); else delete d.pp2;
    dblSet(date, it, ids, d);
  };
  /* bloc de 2 h avec 2 activités : la prépa (1re ou 2e) est prévue pour 1 heure */
  const openPrepa0 = openPrepa;
  openPrepa = function(date, slotId, ids){
    const it = agItems(wdOf(date)).find(x => x.id === slotId), d = it && bloc(it) && dblGet(date, it, ids);
    if (!d) return openPrepa0.apply(this, arguments);
    const ai = agItems; agItems = function(){ return ai.apply(this, arguments).map(x => x.id === slotId ? {...x, b: x.a} : x); };
    try { return openPrepa0.apply(this, arguments); } finally { agItems = ai; }
  };
  function prepa2Ouvrir(date, it, ids, dansAppel){
    H2 = {date, h: it.h, ids, boot: true};
    try { openPrepa(date, it.id, ids, dansAppel); } finally { if (H2) H2.boot = false; }
    const sb = document.querySelector('#sheetroot .sb'), h2 = document.querySelector('#sheetroot .sh h2');
    if (!sb){ H2 = null; return; }
    sb.insertAdjacentHTML('afterbegin', '<i id="pp-h2mark" hidden></i><div class="dbl-h2b">🔀 Prépa de la <b>2e heure</b></div>');
    if (h2) h2.textContent += ' · 2e heure';
    const oc = sheetOnClose;  // à la fermeture : enregistrer encore en mode 2e heure, puis revenir au mode normal
    sheetOnClose = () => { const r0 = render; if (H2) H2.boot = true; render = () => {}; try { if (oc) oc(); } finally { render = r0; H2 = null; } render(); };
  }
  function prepa2Lancer(date, it, ids){
    if (!window.plLancer){ toast('Guide pas disponible'); return; }
    const d = dblGet(date, it, ids) || {}, st = agState(date, it);
    window.plLancer({date, ids, slot: it.id, nEl: ids.map(clsById).filter(Boolean).reduce((a, c) => a + c.pupils.length, 0), n: 1, type: /natation|piscine|nage/i.test(d.s2 || '') ? st.type : 'salle', sp: d.s2 || '', an: ids.map(clsById).map(progYear).find(Boolean) || 1,
      get: () => (dblGet(date, it, ids) || {}).pp2 || null,
      save: pp => { const d2 = {...(dblGet(date, it, ids) || {s2: '', sa: ['', '']})}; d2.pp2 = JSON.parse(JSON.stringify(pp)); if (!d2.s2) d2.s2 = pp.sp || ''; dblSet(date, it, ids, d2); }});
  }
  /* Mes prépas (impression, suite du cycle) : les prépas de la 2e heure comptent aussi */
  const prepaAll0 = prepaAll;
  prepaAll = function(){
    const out = prepaAll0.apply(this, arguments), m = new Map();
    S.classes.forEach(c => c.lessons.forEach(l => { if (l.dbl && l.dbl.pp2) { const k = l.date + '|' + l.h + '|2|' + (l.dbl.pp2.ref || '') + '|' + l.dbl.pp2.t, y = m.get(k); if (y) y.cls.push(c); else m.set(k, {date: l.date, h: l.h, cls: [c], pp: l.dbl.pp2, prog: null, h2: true}); } }));
    Object.entries(S.settings.ag || {}).forEach(([k, v]) => { if (!v.d || !v.d.pp2) return; const [date, h] = k.split('|'), it = agItems(wdOf(date)).find(x => x.h === h);
      const kk = date + '|' + h + '|2|' + (v.d.pp2.ref || '') + '|' + v.d.pp2.t; if (!m.has(kk)) m.set(kk, {date, h, cls: (it ? it.cls : []).map(clsById).filter(Boolean), pp: v.d.pp2, prog: null, plan: true, h2: true}); });
    return [...out, ...m.values()].sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : hI(a.h || 'H1') - hI(b.h || 'H1') || (a.h2 ? 1 : 0) - (b.h2 ? 1 : 0));
  };

  /* Agenda : étiquettes des cours (jour et semaine) */
  const tagFix = (h, date, it) => { const g = agGet(date, it), d = g.s && dblGet(date, it); return d && d.s2 && d.s2 !== g.s ? h.replace(`${esc(g.s)}</span>`, `${esc(g.s)} + ${esc(d.s2)}</span>`) : h; };
  const agCard0 = agCard; agCard = function(date, it){ return tagFix(agCard0.apply(this, arguments), date, it); };
  const agMini0 = agMini; agMini = function(date, it){ return tagFix(agMini0.apply(this, arguments), date, it); };

  /* Planning : ce qui a été fait une semaine (2e activité comprise) */
  const pwl0 = planWeekLessons;
  planWeekLessons = function(c, w){
    return pwl0.apply(this, arguments).map(x => {
      const l = lessonOn(c, x.date, x.h), d = l ? l.dbl : ((S.settings.ag || {})[agK(x.date, x.h)] || {}).d;
      return d ? {...x, dbl: d, sport2: d.s2 || '', pp: x.pp || d.pp2 || null} : x;
    });
  };
  const pwh0 = planWeekHTML;
  planWeekHTML = function(c, w){
    let h = pwh0.apply(this, arguments);
    planWeekLessons(c, w).filter(x => x.sport && x.sport2 && x.sport2 !== x.sport).forEach(x => { h = h.replace(`<b>${esc(x.sport)}</b>`, `<b>${esc(x.sport)} + ${esc(x.sport2)}</b>`); });
    return h;
  };
  /* Planning : « 2e activité » dans la fenêtre d'une case (pour les blocs de 2 h de la semaine) */
  const opc0 = openPlanCell;
  openPlanCell = function(cid, w){
    const r = opc0.apply(this, arguments);
    const sel = $('plc-sp'), ok = $('plc-ok'); if (!sel || !ok) return r;
    const cur2 = ((S.settings.planAn2 || {})[cid] || {})[w] || '';
    sel.closest('label').insertAdjacentHTML('afterend', `<label class="toggle dbl-ck"><input type="checkbox" id="plc-dbl" ${cur2 ? 'checked' : ''}><span>🔀 <b>2 activités</b> pendant les blocs de 2 h</span></label>
      <label class="f" id="plc-s2l" ${cur2 ? '' : 'hidden'}>2e heure<select class="inp" id="plc-s2"><option value="">— Rien —</option>${sportsList().filter(s => s !== 'Autre').map(s => `<option ${s === cur2 ? 'selected' : ''}>${esc(s)}</option>`).join('')}</select></label>`);
    $('plc-dbl').onchange = () => { $('plc-s2l').hidden = !$('plc-dbl').checked; };
    const ok0 = ok.onclick;
    ok.onclick = () => {
      const s2 = $('plc-dbl').checked ? $('plc-s2').value : '', sp = sel.value;
      const n = +((document.querySelector('[data-pln][aria-pressed="true"]') || {}).dataset || {}).pln || 1;
      const ids = [cid, ...[...document.querySelectorAll('[data-plo][aria-pressed="true"]')].map(b => b.dataset.plo)];
      const P = {...(S.settings.planAn2 || {})};
      ids.forEach(id => { const o = {...(P[id] || {})}; for (let i = 0; i < n; i++){ const k = addDays(w, 7 * i); if (sp && sp !== 'Congé' && s2) o[k] = s2; else delete o[k]; } P[id] = o; });
      S.settings.planAn2 = P;
      ok0();
    };
    return r;
  };

  const css = document.createElement('style');
  css.textContent = `
.dbl{display:grid; gap:8px; margin:2px 0 4px}
.dbl-ck{align-items:flex-start; gap:10px; padding:10px 12px; border:1.5px dashed var(--line); border-radius:12px; background:var(--surface)}
.dbl-ck input{width:20px; height:20px; flex:none; margin:1px 0 0; accent-color:var(--accent)}
.dbl-ck:has(input:checked){border-style:solid; border-color:var(--accent); background:var(--accent-soft)}
.dbl-b{display:grid; gap:8px}
.dbl-b[hidden], #plc-s2l[hidden]{display:none !important}
.dbl-h{display:grid; grid-template-columns:76px 1fr; gap:6px 8px; align-items:center}
.dbl-h > b{grid-row:span 2; align-self:start; padding-top:10px}
.dbl-s1{font-weight:600; padding:4px 0}
.dbl-h2b{background:var(--accent-soft); border:1.5px solid var(--accent); border-radius:12px; padding:8px 12px; font-size:14px}
`;
  document.head.appendChild(css);
})();
