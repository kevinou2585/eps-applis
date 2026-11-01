/* ====== Planning de l'année, version 2 (kevin, 1er nov. 2026) ======
   Chargé après les autres scripts du carnet : remplace renderPlanAn() d'outils/agenda-carnet.js.
   Les données ne changent pas : S.settings.planAn = {idClasse: {'AAAA-MM-JJ' (lundi): sport | 'Congé'}},
   et une case touchée ouvre toujours openPlanCell() (même fenêtre qu'avant).
   Nouveau :
   - les semaines en lignes (de haut en bas), les classes en colonnes : lisible sur téléphone ;
   - filtre des classes : toutes, une seule ou plusieurs (réglage de cet appareil) ;
   - « Par semaine » ou « Mes heures » : seulement les cours de l'horaire de chaque classe, avec congés et événements ;
   - les dates de l'école (CAL_ECOLE : congés, conseils de classe, bulletins…) dans le planning, filtrées par année ;
   - les débuts de période (piscine / salle) de chaque classe ;
   - case « Regrouper par groupes » (la même que dans Classes, localStorage carnet-eps-regroupe) : une colonne par groupe
     de classes qui ont cours ensemble (fiGroups) ; une case de groupe enregistre le sport pour toutes ses classes. */
(() => {
  const KEY_V = 'carnet-eps-planning-vue';
  let V = {cls: null, vue: 'sem', ev: true};
  try { V = {...V, ...(JSON.parse(localStorage.getItem(KEY_V)) || {})}; } catch(e){}
  const keep = () => { try { localStorage.setItem(KEY_V, JSON.stringify(V)); } catch(e){} };
  const MOIS_L = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
  const JR = ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'];
  let first = true;  // à l'ouverture : on descend jusqu'à la semaine en cours

  /* classes affichées (dans l'ordre des années puis du nom) */
  const tri = l => [...l].sort((a, b) => (progYear(a) || 9) - (progYear(b) || 9) || a.name.localeCompare(b.name, 'fr', {numeric: true}));
  /* colonnes : une par classe, ou une par groupe de classes qui ont cours ensemble (même case « Regrouper par groupes » que dans Classes) */
  const regroupe = () => typeof fiRegroupe === 'function' && fiRegroupe();
  const colsAll = () => {
    const gs = regroupe() && typeof fiGroups === 'function' ? fiGroups().map(tri) : tri(S.classes).map(c => [c]);
    return gs.map(cs => ({id: cs[0].id, ids: cs.map(c => c.id), cs, name: cs.map(c => c.name).join(' + ')})).sort((a, b) => (progYear(a.cs[0]) || 9) - (progYear(b.cs[0]) || 9) || a.name.localeCompare(b.name, 'fr', {numeric: true}));
  };
  const shown = () => { const all = colsAll(); if (!Array.isArray(V.cls)) return all; const l = all.filter(k => k.ids.some(id => V.cls.includes(id))); return l.length ? l : all; };
  const allCls = cols => cols.flatMap(k => k.cs);
  /* prévision d'une colonne : celle de la 1re classe, sinon d'une autre du groupe */
  const spCol = (k, w) => k.ids.map(id => (planSet()[id] || {})[w] || '').find(Boolean) || '';
  const spAutres = (k, w, sp) => k.cs.filter(c => ((planSet()[c.id] || {})[w] || '') !== sp).map(c => `${c.name} : ${(planSet()[c.id] || {})[w] || 'rien'}`);
  const wkCol = (k, w) => { const out = []; k.cs.forEach(c => planWeekLessons(c, w).forEach(x => { if (!out.some(y => y.date === x.date && y.h === x.h)) out.push(x); })); return out; };

  /* à qui s'adresse un événement de l'école : 'Tous', '1re, 2e et 3e', '6e (2 classes)'… → années, ou null (tout le monde) */
  const evAns = e => { if (/^tous/i.test(e.p)) return null; const a = [...e.p.matchAll(/(\d)\s*(?:re|e|res|es)\b/g)].map(m => +m[1]); return a.length ? a : null; };
  const evPour = (e, cls) => { const a = evAns(e); return !a || cls.some(c => !progYear(c) || a.includes(progYear(c))); };
  const evIco = e => e.o === 1 ? '🏖' : e.o === 2 ? '⛔' : /conseil/i.test(e.t) ? '👥' : /bulletin/i.test(e.t) ? '📄' : /parents/i.test(e.t) ? '🤝' : /examen/i.test(e.t) ? '✍' : /voyage|journées sportives|visite|parlement|animation/i.test(e.t) ? '🚌' : '📌';
  const jourC = iso => { const d = dOf(iso); return `${JR[d.getDay()]} ${d.getDate()}`; };
  const quand = (e, mon) => { const fri = addDays(mon, 4), a = e.a < mon ? mon : e.a, b = e.b > fri ? fri : e.b;
    return a === b ? jourC(a) : `${jourC(a)} → ${jourC(b)}`; };
  /* événements de la semaine (sauf les vacances qui prennent toute la semaine : bandeau à part) */
  const evSem = (mon, cls) => CAL_ECOLE.filter(e => e.a <= addDays(mon, 6) && e.b >= mon && evPour(e, cls) && !(e.o === 1 && e.a <= mon && e.b >= addDays(mon, 4)));
  /* événement qui touche une classe un jour précis (sortie, conseil de classe de son année…) */
  const evClasse = (k, iso) => calJour(iso).filter(e => !e.o && evAns(e) && k.cs.some(c => progYear(c) && evAns(e).includes(progYear(c))));

  /* cours de l'horaire d'une classe pendant une semaine (date, créneau), plus les leçons notées hors horaire */
  function coursSem(k, mon){
    const out = [];
    for (let d = 1; d <= 5; d++){ const iso = addDays(mon, d - 1);
      agItems(d).filter(it => it.cls.some(id => k.ids.includes(id))).forEach(it => { if (!out.some(x => x.iso === iso && x.h === it.h))
        out.push({iso, it, h: it.h, l: k.cs.map(c => lessonOn(c, iso, it.h)).find(Boolean) || null, c: k.cs.find(c => it.cls.includes(c.id))}); }); }
    k.cs.forEach(c => c.lessons.filter(l => l.date >= mon && l.date <= addDays(mon, 6) && !out.some(x => x.iso === l.date && x.h === (l.h || null))).forEach(l => out.push({iso: l.date, it: null, h: l.h, l, c})));
    return out.sort((a, b) => a.iso < b.iso ? -1 : a.iso > b.iso ? 1 : hI(a.h || 'H1') - hI(b.h || 'H1'));
  }
  const prevu = (c, x) => { const g = (S.settings.ag || {})[`${x.iso}|${x.h}`] || {}; return {sp: (x.l && x.l.sport) || g.s || '', pp: (x.l && x.l.prepa) || g.pp || null, d: (x.l ? x.l.dbl : g.d) || null}; };
  /* 2e activité prévue au planning (blocs de 2 h) */
  const sp2Col = (k, w) => k.ids.map(id => ((S.settings.planAn2 || {})[id] || {})[w] || '').find(Boolean) || '';
  /* début de période cette semaine-là (P2 · piscine…) */
  const perDebut = (k, mon) => periodsOf(k.cs[0]).filter((p, i) => i > 0 && p.start >= mon && p.start <= addDays(mon, 6));

  function cellSem(c, w, dense, forPrint){
    const sp = spCol(c, w), wk = wkCol(c, w), done = [...new Set(wk.filter(x => x.sport).flatMap(x => x.sport2 ? [x.sport, x.sport2] : [x.sport]))], np = wk.filter(x => x.pp).length;
    const cs = coursSem(c, w).filter(x => x.it), nOff = cs.filter(x => calOff(x.iso)).length, nOk = cs.length - nOff;
    const nom = s => esc(dense ? planAbbr(s) : s);
    const s2 = sp && sp !== 'Congé' ? sp2Col(c, w) : '';
    let h = sp === 'Congé' ? '<b class="p2-cg">🏖 congé</b>' : sp ? `<b class="p2-sp">${nom(sp)}${s2 ? ' + ' + nom(s2) : ''}</b>` : '';
    if (sp) spAutres(c, w, sp).forEach(t => h += `<span class="p2-n">≠ ${esc(t)}</span>`);
    if (done.length && done.some(x => x !== sp && x !== s2)) h += `<span class="p2-fait">✓ ${done.map(nom).join(', ')}</span>`;
    else if (done.length) h += '<span class="p2-ok">✓ fait</span>';
    if (np) h += `<span class="p2-pp">📋${np > 1 ? ' ' + np : ''}${dense ? '' : ' prépa' + (np > 1 ? 's' : '')}</span>`;
    if (cs.length && nOff) h += `<span class="p2-n">${nOk ? nOk + ' cours sur ' + cs.length : 'pas cours'}</span>`;
    perDebut(c, w).forEach(p => h += `<span class="p2-per">▶ ${esc(p.name)}${p.type === 'piscine' ? ' 🌊' : ''}</span>`);
    if (!h && !forPrint) h = '<span class="p2-vide">＋</span>';
    const st = sp && sp !== 'Congé' ? ` style="--pc:${planColor(sp)}"` : '';
    const lab = `${c.name}, semaine du ${fmtD(w)}${sp ? ' : ' + sp : ' : rien de prévu'}${done.length ? ', fait : ' + done.join(', ') : ''}`;
    return forPrint ? `<td class="p2-c${sp ? ' on' : ''}"${st}>${h}</td>`
      : `<td class="p2-c${sp ? ' on' : ''}"${st}><button type="button" class="p2-b" data-plc="${c.id}" data-plw="${w}" aria-label="${esc(lab)}">${h}</button></td>`;
  }
  function cellCours(c, w, dense, forPrint){
    const sp = spCol(c, w), s2 = sp && sp !== 'Congé' ? sp2Col(c, w) : '', cs = coursSem(c, w), st = sp && sp !== 'Congé' ? ` style="--pc:${planColor(sp)}"` : '';
    let h = forPrint ? (sp ? `<b class="p2-sp">${esc(dense ? planAbbr(sp) : sp)}</b>` : '')
      : `<button type="button" class="p2-hd" data-plc="${c.id}" data-plw="${w}" aria-label="${esc(`${c.name}, semaine du ${fmtD(w)} : ${sp || 'rien de prévu'}. Changer`)}">${sp ? `<b class="p2-sp">${sp === 'Congé' ? '🏖 congé' : esc(dense ? planAbbr(sp) : sp) + (s2 ? ' + ' + esc(dense ? planAbbr(s2) : s2) : '')}</b>` : '<span class="p2-vide">＋ prévoir</span>'}</button>`;
    if (sp) spAutres(c, w, sp).forEach(t => h += `<span class="p2-n" style="display:block;padding:0 6px">≠ ${esc(t)}</span>`);
    perDebut(c, w).forEach(p => h += `<span class="p2-per">▶ ${esc(p.name)}${p.type === 'piscine' ? ' 🌊' : ''}</span>`);
    if (!cs.length) h += '<span class="p2-n">pas de cours à l\'horaire</span>';
    cs.forEach(x => { const off = calOff(x.iso), pv = prevu(c, x), ev = evClasse(c, x.iso), pis = !off && lessonType(x.c || c.cs[0], x.iso, x.h) === 'piscine';
      const t = `${jourC(x.iso)}${x.h ? ' · ' + (x.it ? slotLabel(x.it) : x.h) : ''}`;
      const d2 = pv.d && pv.d.s2 && pv.d.s2 !== pv.sp ? pv.d : null, sal = pv.d && pv.d.sa && (pv.d.sa[0] || pv.d.sa[1]) ? pv.d.sa : null;
      const det = off ? `<em>${esc(off.o === 2 ? 'cours suspendus' : off.t)}</em>`
        : d2 ? `<span class="p2-s">${x.l ? '✓ ' : ''}${esc(dense ? planAbbr(pv.sp || '?') : pv.sp || '?')} puis ${esc(dense ? planAbbr(d2.s2) : d2.s2)}</span>${sal && !dense ? `<span class="p2-n">${esc(sal[0] || '?')} → ${esc(sal[1] || '?')}</span>` : ''}${pv.pp ? '<span>📋</span>' : ''}${ev.map(e => `<span class="p2-w">⚠ ${esc(e.t)}</span>`).join('')}`
        : `${pv.sp && pv.sp !== sp ? `<span class="p2-s">${x.l ? '✓ ' : ''}${esc(dense ? planAbbr(pv.sp) : pv.sp)}</span>` : x.l ? '<span class="p2-s p2-ok">✓ fait</span>' : pv.sp ? '<span class="p2-s">prévu</span>' : ''}${pv.pp ? '<span>📋</span>' : ''}${pis ? '<span>🌊</span>' : ''}${ev.map(e => `<span class="p2-w">⚠ ${esc(e.t)}</span>`).join('')}`;
      const inner = `<span class="p2-t">${esc(t)}</span>${det}`;
      h += forPrint || off || !x.it ? `<span class="p2-k${off ? ' off' : ''}">${inner}</span>`
        : `<button type="button" class="p2-k" data-plag="${x.it.id}" data-date="${x.iso}" aria-label="${esc(`${c.name}, ${fmtD(x.iso)} ${t}${pv.sp ? ', ' + pv.sp : ''}. Ouvrir le cours`)}">${inner}</button>`; });
    return `<td class="p2-c p2-cc${sp && sp !== 'Congé' ? ' on' : ''}"${st}>${h}</td>`;
  }

  function tableHTML(weeks, forPrint){
    const cols = shown(), cls = allCls(cols), n = cols.length, dense = n > 3, t0 = mondayOf(today()), cours = V.vue === 'cours';
    let h = `<div class="p2-wrap"><table class="p2-tb${dense ? ' dense' : ''}${cours ? ' cours' : ''}" style="--n:${n}"><thead><tr><th class="p2-w0">Semaine</th>${cols.map(k => `<th>${esc(k.name)}</th>`).join('')}</tr></thead><tbody>`;
    let mois = -1, i = 0;
    while (i < weeks.length){
      const w = weeks[i], d = dOf(w);
      if (d.getMonth() !== mois && !calOffSem(w)){ mois = d.getMonth(); h += `<tr class="p2-mo"><th colspan="${n + 1}">${MOIS_L[mois]} ${d.getFullYear()}</th></tr>`; }
      /* vacances : un seul bandeau pour les semaines qui se suivent */
      const vac = calOffSem(w), vk = k => calOffSem(k) === vac && cls.every(c => [undefined, '', 'Congé'].includes((planSet()[c.id] || {})[k]) && !planWeekLessons(c, k).length); if (vac && vac.o === 1 && vk(w)){
        let j = i; while (j + 1 < weeks.length && vk(weeks[j + 1])) j++;
        h += `<tr class="p2-vac${weeks.slice(i, j + 1).includes(t0) ? ' now' : ''}"><th class="p2-w0">${d.getDate()} ${MOIS[d.getMonth()]}${j > i ? `<small>→ ${dOf(addDays(weeks[j], 4)).getDate()} ${MOIS[dOf(addDays(weeks[j], 4)).getMonth()]}</small>` : ''}</th><td colspan="${n}">🏖 ${esc(vac.t)}</td></tr>`;
        i = j + 1; continue;
      }
      const ev = V.ev ? [...(vac ? [vac] : []), ...evSem(w, cls)] : [];
      h += `<tr class="p2-wk${w === t0 ? ' now' : ''}"${w === t0 ? ' id="p2-now"' : ''}><th class="p2-w0">${d.getDate()} ${MOIS[d.getMonth()]}${w === t0 ? '<small class="p2-auj">cette sem.</small>' : ''}</th>${cols.map(k => (cours ? cellCours : cellSem)(k, w, dense, forPrint)).join('')}</tr>`;
      if (ev.length) h += `<tr class="p2-ev"><td colspan="${n + 1}"><div>${ev.map(e => `<span class="p2-e${e.o ? ' off' : ''}"><b>${evIco(e)} ${esc(quand(e, w))}</b> ${esc(e.t)}${evAns(e) ? ` <i>${esc(e.p)}</i>` : ''}</span>`).join('')}</div></td></tr>`;
      i++;
    }
    return h + '</tbody></table></div>';
  }
  function legendeHTML(){
    const used = [...new Set(allCls(shown()).flatMap(c => Object.values(planSet()[c.id] || {})))].filter(s => s !== 'Congé').sort((a, b) => sportsList().indexOf(a) - sportsList().indexOf(b));
    return `<div class="p2-leg">${used.map(s => `<span><b style="--pc:${planColor(s)}">${esc(planAbbr(s))}</b>${esc(s)}</span>`).join('')}
      <span>✓ fait (appel ou sport noté)</span><span>📋 prépa faite</span><span>🌊 piscine</span><span>▶ début de période</span>${V.ev ? '<span>🏖 congé · 👥 conseil de classe · 📄 bulletin · 🚌 sortie</span>' : ''}</div>`;
  }

  /* case d'un groupe : la fenêtre habituelle, avec les autres classes du groupe déjà cochées dans « Aussi pour » */
  function ouvrirCase(k, w){
    if (!k) return; openPlanCell(k.id, w); if (k.ids.length < 2) return;
    const h2 = document.querySelector('#sheetroot .sh h2'); if (h2) h2.textContent = `${k.name} · semaine du ${fmtD(w)}`;
    const ok = $('plc-ok'); if (!ok) return;
    k.ids.slice(1).forEach(id => { const b = document.querySelector(`[data-plo="${id}"]`);
      if (b) b.setAttribute('aria-pressed', 'true');
      else ok.insertAdjacentHTML('beforebegin', `<button type="button" data-plo="${id}" aria-pressed="true" hidden></button>`); });
  }
  window.renderPlanAn = renderPlanAn;
  function renderPlanAn(m){
    const {weeks, sy} = planWeeks(UI.agDate || today()), all = colsAll(), sel = shown(), y0 = window.scrollY, reg = regroupe();
    const tous = !Array.isArray(V.cls) || sel.length === all.length;
    m.innerHTML = `<section class="sec p2"><div class="ag-top"><button class="btn" type="button" id="pl-back">‹ Agenda</button><h2 class="pl-h">Planning <small>${esc(sy)}</small></h2><button class="btn" type="button" id="pl-prt" aria-label="Imprimer le planning">🖨</button></div>
      ${all.length ? `<div class="p2-bar">
        <div class="p2-chips" role="group" aria-label="Classes affichées"><button class="chip" type="button" data-p2c="*" aria-pressed="${tous}">Toutes les classes</button>${all.map(k => `<button class="chip" type="button" data-p2c="${k.ids.join(',')}" aria-pressed="${!tous && sel.some(x => x.id === k.id)}">${esc(k.name)}</button>`).join('')}</div>
        <div class="p2-f"><div class="seg" role="group" aria-label="Affichage du planning"><button type="button" data-p2v="sem" aria-pressed="${V.vue !== 'cours'}">Par semaine</button><button type="button" data-p2v="cours" aria-pressed="${V.vue === 'cours'}">Mes heures</button></div>
          <button class="chip" type="button" id="p2-ev" aria-pressed="${!!V.ev}">📅 Dates école</button>
          <label class="fi-chk p2-reg"><input type="checkbox" id="p2-reg" ${reg ? 'checked' : ''}><span>Regrouper par groupes</span></label></div>
        <p class="small muted" style="margin:0">${V.vue === 'cours' ? 'Seulement tes heures de cours. Touche un cours pour l\'ouvrir, le sport en haut pour le changer.' : 'Touche une case pour prévoir un sport (ta prévision, rien n\'est imposé).'}</p></div>
        ${tableHTML(weeks)}${legendeHTML()}` : '<p class="small">Ajoute d\'abord tes classes.</p>'}</section>`;
    $('pl-back').onclick = () => { UI.agPlan = false; first = true; UI.p2Top = null; render(); };
    $('pl-prt').onclick = () => printHTML(`<article class="pr-page pr-plan p2"><h1>Planning EPS ${esc(sy)}${prepaEn().prof ? ' · ' + esc(prepaEn().prof) : ''}<small>${esc(sel.map(c => c.name).join(', '))}${V.vue === 'cours' ? ' · mes heures' : ''}</small></h1>${tableHTML(weeks, true)}${legendeHTML()}</article>`, `Planning EPS ${sy}`);
    m.querySelectorAll('[data-plc]').forEach(b => b.onclick = () => ouvrirCase(sel.find(k => k.id === b.dataset.plc), b.dataset.plw));
    $('p2-reg') && ($('p2-reg').onchange = e => { fiLS('carnet-eps-regroupe', e.target.checked ? '1' : '0'); render(); window.scrollTo(0, y0); });
    m.querySelectorAll('[data-plag]').forEach(b => b.onclick = () => openAgSlot(b.dataset.date, b.dataset.plag));
    m.querySelectorAll('[data-p2c]').forEach(b => b.onclick = () => {
      const id = b.dataset.p2c;
      if (id === '*') V.cls = null;
      else { const ids = id.split(','), cur = tous ? [] : sel.flatMap(k => k.ids), on = ids.some(x => cur.includes(x));
        V.cls = on ? cur.filter(x => !ids.includes(x)) : [...cur, ...ids]; if (!V.cls.length || all.every(k => k.ids.some(x => V.cls.includes(x)))) V.cls = null; }
      keep(); render(); window.scrollTo(0, y0); });
    m.querySelectorAll('[data-p2v]').forEach(b => b.onclick = () => { V.vue = b.dataset.p2v; keep(); render(); window.scrollTo(0, y0); });
    $('p2-ev') && ($('p2-ev').onclick = () => { V.ev = !V.ev; keep(); render(); window.scrollTo(0, y0); });
    const wrap = m.querySelector('.p2-wrap');
    if (wrap && first){ first = false; const now = $('p2-now') || m.querySelector('.p2-vac.now'), hd = m.querySelector('.p2-tb thead');
      if (now) wrap.scrollTop = Math.max(0, now.offsetTop - (hd ? hd.offsetHeight : 0) - 4); }
    else if (wrap && UI.p2Top != null){ wrap.scrollTop = UI.p2Top; wrap.scrollLeft = UI.p2Left || 0; }
    if (wrap) wrap.onscroll = () => { UI.p2Top = wrap.scrollTop; UI.p2Left = wrap.scrollLeft; };
  }

  const css = document.createElement('style');
  css.textContent = `
.p2-bar{display:grid; gap:8px; min-width:0}
.p2-f{display:flex; flex-wrap:wrap; align-items:center; gap:8px}
.p2-f .seg button{padding:7px 12px}
.p2-reg{font-size:13px; padding:5px 10px}
.p2-chips{display:flex; gap:6px; overflow-x:auto; padding:2px 0 4px; scrollbar-width:none; -webkit-overflow-scrolling:touch}
.p2-chips::-webkit-scrollbar{display:none}
.p2-chips .chip{padding:6px 12px; flex:none}
.p2-wrap{border:1px solid var(--line); border-radius:12px; background:var(--surface); overflow:auto; max-height:calc(100dvh - var(--tab-h, 62px) - 90px); min-height:320px; -webkit-overflow-scrolling:touch; overscroll-behavior:contain}
.p2-tb{width:100%; border-collapse:separate; border-spacing:0; font-size:14px; table-layout:fixed}
.p2-tb thead th{position:sticky; top:0; z-index:3; background:var(--surface); padding:10px 6px; font-size:15px; text-align:center; border-bottom:2px solid var(--fg)}
.p2-tb .p2-w0{width:72px; text-align:left; padding:8px 8px; font-size:13px; font-weight:700; color:var(--fg); vertical-align:top; position:sticky; left:0; z-index:2; background:var(--surface)}
.p2-tb thead .p2-w0{z-index:4}
.p2-tb.dense .p2-w0{width:58px}
.p2-tb.dense{min-width:calc(58px + var(--n, 4) * 64px)}
.p2-tb .p2-w0 small{display:block; font-weight:600; color:var(--muted); font-size:11px}
.p2-tb .p2-w0 .p2-auj{color:var(--accent)}
.p2-mo th{background:var(--surface2); text-align:left; padding:6px 10px; font-size:12px; text-transform:uppercase; letter-spacing:.06em; color:var(--muted)}
.p2-wk > *{border-top:1px solid var(--line)}
.p2-c{padding:0; vertical-align:top; border-left:1px solid var(--line)}
.p2-c.on{background:color-mix(in srgb, var(--pc) 13%, var(--surface)); box-shadow:inset 4px 0 0 var(--pc)}
.p2-b{all:unset; box-sizing:border-box; width:100%; min-height:48px; padding:6px 6px 6px 10px; display:flex; flex-direction:column; gap:3px; cursor:pointer}
.p2-b:focus-visible, .p2-k:focus-visible, .p2-hd:focus-visible{outline:2px solid var(--accent); outline-offset:-2px}
.p2-sp{color:var(--fg); font-size:14px; line-height:1.2}
.p2-sp::before{content:""; display:inline-block; width:9px; height:9px; border-radius:50%; background:var(--pc, var(--muted)); margin-right:5px; vertical-align:1px}
.p2-cg{color:var(--muted); font-size:13px}
.p2-fait, .p2-ok, .p2-pp, .p2-n, .p2-per{font-size:12px; line-height:1.25; color:var(--muted)}
.p2-fait, .p2-ok{color:var(--ok); font-weight:600}
.p2-per{color:var(--fg); font-weight:700}
.p2-vide{color:var(--line); font-size:16px; font-weight:700}
.p2-wk.now > *{background-color:var(--accent-soft)}
.p2-wk.now .p2-w0{background:var(--accent-soft)}
.p2-wk.now .p2-c.on{background:color-mix(in srgb, var(--pc) 22%, var(--accent-soft))}
.p2-vac > *{background:repeating-linear-gradient(135deg, var(--surface2) 0 7px, transparent 7px 14px); color:var(--muted); border-top:1px solid var(--line); padding:8px; font-weight:600}
.p2-vac td{font-size:13px}
.p2-ev td{padding:0 8px 8px 72px; line-height:1.3}
.p2-tb.dense .p2-ev td{padding-left:58px}
.p2-ev td > div{position:sticky; left:58px; max-width:calc(100vw - 110px)}
.p2-mo th{position:sticky; left:0}
.p2-mo th, .p2-vac th{z-index:2}
.p2-e{display:inline-block; margin:4px 6px 0 0; padding:3px 8px; border-radius:8px; background:var(--warn-soft); color:var(--fg); font-size:12.5px; border:1px solid color-mix(in srgb, var(--warn) 45%, transparent)}
.p2-e.off{background:var(--surface2); color:var(--muted); border-style:dashed; border-color:var(--line)}
.p2-e i{font-style:normal; opacity:.75}
.p2-cc{padding:4px 4px 6px 4px}
.p2-hd{all:unset; box-sizing:border-box; display:block; width:100%; padding:3px 6px 4px; cursor:pointer; border-radius:6px}
.p2-cc .p2-per, .p2-cc > .p2-n{display:block; padding:0 6px}
.p2-k{all:unset; box-sizing:border-box; display:flex; flex-wrap:wrap; gap:2px 6px; align-items:baseline; width:100%; margin-top:3px; padding:5px 6px; border-radius:7px; background:var(--surface); border:1px solid var(--line); font-size:12.5px; line-height:1.25; cursor:pointer}
.p2-k .p2-t{font-weight:700}
.p2-k .p2-s{color:var(--fg); font-weight:600}
.p2-k .p2-w{color:var(--warn); font-weight:600}
.p2-k.off{cursor:default; background:transparent; border-style:dashed; color:var(--muted)}
.p2-k.off .p2-t{text-decoration:line-through}
.p2-k em{font-style:normal}
.p2-leg{display:flex; flex-wrap:wrap; gap:6px 14px; font-size:13px; color:var(--muted)}
.p2-leg span{display:inline-flex; align-items:center; gap:6px}
.p2-leg b{background:var(--pc); color:#fff; border-radius:5px; padding:1px 6px; font-size:11px}
@media print{
  .pr-plan.p2 h1 small{display:block; font-size:10pt; font-weight:600; color:#444}
  .pr-plan .p2-wrap{border:0; overflow:visible; max-height:none}
  .pr-plan .p2-tb .p2-w0, .pr-plan .p2-mo th, .pr-plan .p2-ev td > div{position:static; max-width:none}
  .pr-plan .p2-tb{font-size:8pt; min-width:0 !important}
  .pr-plan .p2-tb thead th{position:static; font-size:9pt; padding:3px; border-bottom:1.5px solid #111}
  .pr-plan .p2-tb th, .pr-plan .p2-tb td{border-color:#999}
  .pr-plan .p2-tb .p2-w0{width:46px; font-size:8pt; padding:2px 4px}
  .pr-plan .p2-tb tr{break-inside:avoid; page-break-inside:avoid}
  .pr-plan .p2-c{padding:2px 4px; display:table-cell}
  .pr-plan .p2-c > *{display:block}
  .pr-plan .p2-sp{font-size:8.5pt; filter:none}
  .pr-plan .p2-fait, .pr-plan .p2-ok, .pr-plan .p2-pp, .pr-plan .p2-n, .pr-plan .p2-per{font-size:7pt}
  .pr-plan .p2-c.on, .pr-plan .p2-vac > *, .pr-plan .p2-e, .pr-plan .p2-leg b, .pr-plan .p2-mo th{-webkit-print-color-adjust:exact; print-color-adjust:exact}
  .pr-plan .p2-wk.now > *{background-color:transparent}
  .pr-plan .p2-wk.now .p2-c.on{background:color-mix(in srgb, var(--pc) 13%, #fff)}
  .pr-plan .p2-wk.now .p2-w0{background:#fff}
  .pr-plan .p2-ev td{padding:0 4px 3px 50px}
  .pr-plan .p2-e{font-size:7pt; padding:1px 4px; margin:2px 4px 0 0}
  .pr-plan .p2-mo th{padding:2px 6px; font-size:7.5pt}
  .pr-plan .p2-vac > *{padding:2px 4px; font-size:7.5pt}
  .pr-plan .p2-k{display:block; padding:1px 3px; margin-top:1px; font-size:7pt; border-radius:3px}
  .pr-plan .p2-leg{font-size:8pt; margin-top:6px}
}`;
  document.head.appendChild(css);
})();
