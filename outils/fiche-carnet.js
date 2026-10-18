/* ====== Classes : onglet Élève (fiche complète), bulletin d'un élève, classes regroupées, alertes ======
   - Une classe s'ouvre sur 2 onglets : Élève (liste → fiche) puis Bulletin. Points, Tableau de suivi et Gérer les élèves
     sont des outils ouverts depuis l'onglet Élève (UI.ctab = 'points' | 'suivi' | 'pupils').
   - Fiche (openPupil) : alerte, bouton « Son bulletin » (fiBulletin : période en cours, périodes précédentes, année),
     historique daté de tout (fiHistHTML).
   - Case « Regrouper » à droite de MES CLASSES (localStorage carnet-eps-regroupe) : les classes qui ont une heure ensemble
     dans l'horaire (S.settings.tt) forment un groupe, ouvert d'un coup (UI.cgrp = ids, localStorage carnet-eps-cgrp).
   - Alerte : FI_ALN (3) oublis de tenue ou perturbations (exclusions comprises) dans la période : bandeau à l'appel,
     dans la liste et la fiche, et un message quand on note le 3e. Rien à copier. */
const FI_ALN = 3;
const fiLS = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch(e){ return null; } };
const fiRegroupe = () => fiLS('carnet-eps-regroupe') === '1';
try { const g = JSON.parse(fiLS('carnet-eps-cgrp') || 'null'); if (Array.isArray(g)) UI.cgrp = g; } catch(e){}
const fiSetGrp = ids => { UI.cgrp = ids && ids.length > 1 ? ids : null; fiLS('carnet-eps-cgrp', UI.cgrp ? JSON.stringify(UI.cgrp) : null); };

/* --- Alertes (période de la date donnée) --- */
function fiCounts(c, p, date){
  const vp = periodOf(c, date || today()); const o = {k: 0, d: 0, vp};
  if (!vp) return o;
  c.lessons.forEach(l => { if (periodOf(c, l.date)?.id !== vp.id || effA(p, l) === 'A') return; const m = l.m[p.id] || {};
    if (m.k) o.k++; if (m.x || m.d) o.d++; });
  const a = ((c.adj || {})[vp.id] || {})[p.id]; if (a){ o.k += +a.t || 0; o.d += +a.c || 0; }
  return o;
}
function fiAlerts(c, p, date){
  const n = fiCounts(c, p, date), out = [];
  if (n.k >= FI_ALN) out.push(`${n.k} oublis de tenue`);
  if (n.d >= FI_ALN) out.push(`${n.d} perturbations`);
  return out;
}
const fiAlertTxt = (c, p, date) => { const a = fiAlerts(c, p, date); return a.length ? '⚠ ' + a.join(' · ') + ' cette période' : ''; };
function fiAlertLine(c, p, date){ const t = fiAlertTxt(c, p, date); return t ? `<div class="rg-line fi-al-line"><span class="fi-al">${esc(t)}</span></div>` : ''; }
// message au moment où on note le 3e oubli / la 3e perturbation
function fiAlertToast(c, p, date, k){
  const n = fiCounts(c, p, date)[k];
  if (n === FI_ALN) toast(`⚠ ${nomCourt(p)} : ${n} ${k === 'k' ? 'oublis de tenue' : 'perturbations'} cette période`);
  return n === FI_ALN;
}

/* --- Groupes de classes (heures en commun dans l'horaire) --- */
function fiGroups(){
  const ok = new Set(S.classes.filter(c => !c.act).map(c => c.id)), up = {};
  const f = x => up[x] === x || up[x] == null ? (up[x] = x) : (up[x] = f(up[x]));
  tt().forEach(s => { const ids = (s.cls || []).filter(id => ok.has(id)); for (let i = 1; i < ids.length; i++) up[f(ids[i])] = f(ids[0]); });
  const by = new Map();
  S.classes.forEach(c => { const r = ok.has(c.id) ? f(c.id) : c.id; if (!by.has(r)) by.set(r, []); by.get(r).push(c); });
  return [...by.values()];
}
const fiSlots = ids => tt().filter(s => s.cls.some(id => ids.includes(id))).sort((a, b) => a.d - b.d || hI(a.h) - hI(b.h))
  .filter((s, i, a) => a.findIndex(x => x.d === s.d && x.h === s.h) === i)
  .map(s => DAYS.find(d => d[0] === s.d)[1].slice(0, 3).toLowerCase() + '. ' + slotLabel(s));

function fiClassList(m){
  const reg = fiRegroupe();
  const one = c => { const {p, avg} = classAvg(c), slots = fiSlots([c.id]);
    return `<button class="ev" type="button" data-cl="${c.id}"><span class="t"><b>${esc(c.name)}</b><span class="small muted">${c.pupils.length} élève${c.pupils.length > 1 ? 's' : ''}${c.act ? ' · activité (présences)' : p ? ' · ' + esc(p.name) : ''}${p && p.type === 'piscine' ? ' · piscine' : ''}${slots.length ? '<br>' + esc(slots.join(', ')) : ''}</span></span><span class="sur num">${avg != null ? fr(avg) + '<small style="font-size:14px"> %</small>' : ''}</span></button>`; };
  const grp = cs => { const ids = cs.map(c => c.id), n = cs.reduce((a, c) => a + c.pupils.length, 0), slots = fiSlots(ids);
    return `<button class="ev fi-grp" type="button" data-grp="${ids.join(',')}"><span class="t"><b>${cs.map(c => esc(c.name)).join(' + ')}</b><span class="small muted">${cs.length} classes ensemble · ${n} élèves${slots.length ? '<br>' + esc(slots.join(', ')) : ''}</span></span><span class="sur fi-grp-n">${cs.length}</span></button>`; };
  m.innerHTML = `<section class="sec">
    <div class="fi-hd"><h2>Mes classes</h2><label class="fi-chk"><input type="checkbox" id="cl-grp" ${reg ? 'checked' : ''}><span>Regrouper par groupes</span></label></div>
    ${reg ? `<p class="small muted" style="margin:0">Les classes qui ont cours ensemble (horaire) s'ouvrent d'un coup.</p>` : ''}
    ${reg ? fiGroups().map(cs => cs.length > 1 ? grp(cs) : one(cs[0])).join('') : S.classes.map(one).join('')}
    <button class="btn pri block" type="button" id="cl-new">+ Nouvelle classe</button>
    <button class="btn block" type="button" id="cl-xls">Bulletin Excel de toutes les classes</button>
    <p class="small muted" style="margin:0">Un onglet par classe dans le même fichier, pour la période en cours.</p>
  </section>`;
  $('cl-grp').onchange = e => { fiLS('carnet-eps-regroupe', e.target.checked ? '1' : '0'); render(); };
  m.querySelectorAll('[data-cl]').forEach(b => b.onclick = () => { S.cur = b.dataset.cl; fiSetGrp(null); UI.cview = true; UI.ctab = 'eleve'; saveUI(); save(); render(); window.scrollTo(0, 0); });
  m.querySelectorAll('[data-grp]').forEach(b => b.onclick = () => { const ids = b.dataset.grp.split(','); S.cur = ids[0]; fiSetGrp(ids); UI.cview = true; UI.ctab = 'eleve'; saveUI(); save(); render(); window.scrollTo(0, 0); });
  $('cl-new').onclick = openNewClass;
  $('cl-xls').onclick = () => exportXlsx(S.classes.filter(c => !c.act).map(c => [c, periodOf(c, today())]).filter(x => x[1]), 'Bulletins EPS toutes les classes');
}

/* --- Vue d'une classe ou d'un groupe --- */
const FI_TOOLS = {points: ['Points de savoir-être', renderPoints], suivi: ['Tableau de suivi', renderSuivi], pupils: ['Gérer les élèves', renderManage]};
function fiClassesOpen(c){
  const g = (UI.cgrp || []).map(id => S.classes.find(x => x.id === id)).filter(Boolean);
  return g.length > 1 && g.some(x => x.id === c.id) ? g : [c];
}
function fiClassView(c, m){
  const cs = fiClassesOpen(c), grp = cs.length > 1;
  const sub = ['eleve', 'report'].includes(UI.ctab) || FI_TOOLS[UI.ctab] ? UI.ctab : 'eleve', tool = FI_TOOLS[sub];
  const n = cs.reduce((a, x) => a + x.pupils.length, 0);
  m.innerHTML = `<div class="cvh"><button class="ib" type="button" id="cv-back" aria-label="Toutes les classes">${IC.left}</button><span class="cvn">${cs.map(x => esc(x.name)).join(' + ')}</span><span class="small muted">${n} élèves</span></div>
    <div class="seg full" role="tablist" aria-label="Rubriques de la classe">${[['eleve', 'Élève'], ['report', 'Bulletin']].map(([k, l]) => `<button type="button" data-ct="${k}" aria-pressed="${sub === k || (k === 'eleve' && !!tool)}">${l}</button>`).join('')}</div>
    ${tool ? `<div class="fi-tool"><button class="btn" type="button" data-ct="eleve">‹ Élèves</button><b>${tool[0]}</b></div>
      ${grp ? `<div class="chips">${cs.map(x => `<button class="chip" type="button" data-tc="${x.id}" aria-pressed="${x.id === c.id}">${esc(x.name)}</button>`).join('')}</div>` : ''}` : ''}
    <div id="cv"></div>`;
  $('cv-back').onclick = () => { UI.cview = false; fiSetGrp(null); saveUI(); render(); window.scrollTo(0, 0); };
  m.querySelectorAll('[data-ct]').forEach(b => b.onclick = () => { UI.ctab = b.dataset.ct; saveUI(); render(); window.scrollTo(0, 0); });
  m.querySelectorAll('[data-tc]').forEach(b => b.onclick = () => { S.cur = b.dataset.tc; save(); render(); });
  const cv = $('cv');
  if (tool) tool[1](c, cv);
  else if (sub === 'eleve') fiEleves(cs, cv);
  else if (!grp) renderReport(c, cv);
  else {
    // un bulletin par classe, l'un sous l'autre (les id des blocs déjà dessinés sont retirés pour ne pas se mélanger)
    cv.innerHTML = cs.map(() => '<div class="fi-blk"></div>').join('') + `<section class="sec"><button class="btn block" type="button" id="fi-xls">Bulletin Excel du groupe (${cs.map(x => esc(x.name)).join(' + ')})</button></section>`;
    const xls = $('fi-xls'); xls.removeAttribute('id');
    cs.forEach((x, i) => { const d = cv.children[i]; renderReport(x, d); const h = d.querySelector('h2'); if (h) h.textContent = 'Bulletin ' + x.name;
      d.querySelectorAll('[id]').forEach(e => e.removeAttribute('id')); });
    xls.onclick = () => exportXlsx(cs.filter(x => !x.act).map(x => { const vp = viewPeriod(x); return [x, vp]; }).filter(z => z[1]), 'Bulletins EPS ' + cs.map(x => x.name).join(' + '));
  }
}
function fiEleves(cs, m){
  const grp = cs.length > 1, d = today();
  const row = (c, p) => { const vp = periodOf(c, d), r = vp ? compute(c, vp).res[p.id] : null, al = fiAlertTxt(c, p, d), cert = certOn(p, d);
    const bits = r ? [r.total != null ? fr(r.total, 0) + ' %' : '', r.abs ? r.abs + ' abs.' : '', r.kit ? r.kit + ' oubli' + (r.kit > 1 ? 's' : '') : '', r.d + r.x ? (r.d + r.x) + ' pert.' : ''].filter(Boolean) : [];
    return `<button class="fi-row" type="button" data-fp="${p.id}" data-fc="${c.id}">${avatar(p)}<span class="nm"><b>${esc(p.n)}</b><span class="pts">${bits.length ? esc(bits.join(' · ')) : 'Rien à signaler'}</span>${cert ? '<span class="fi-cert">🩺 Certificat en cours</span>' : ''}${al ? `<span class="fi-al">${esc(al)}</span>` : ''}</span><span class="fi-go">${IC.right || '›'}</span></button>`; };
  m.innerHTML = `<section class="sec">
    <h2>Élèves</h2>
    <p class="small muted" style="margin:0">Touche un élève pour sa fiche complète (tout, avec les dates) et son bulletin.</p>
    ${cs.map(c => `${grp ? `<h3 class="fi-cl">${esc(c.name)}</h3>` : ''}<div class="fi-list">${c.pupils.length ? pupilsOf(c).map(p => row(c, p)).join('') : '<div class="card empty small muted">Pas encore d\'élève.</div>'}</div>`).join('')}
    <div class="fi-tools">${Object.entries(FI_TOOLS).map(([k, [l]]) => `<button class="btn" type="button" data-tool="${k}">${({points: '🧮 ', suivi: '📋 ', pupils: '✏️ '})[k]}${l}</button>`).join('')}</div>
  </section>`;
  m.querySelectorAll('[data-fp]').forEach(b => b.onclick = () => openPupil(S.classes.find(x => x.id === b.dataset.fc), b.dataset.fp));
  m.querySelectorAll('[data-tool]').forEach(b => b.onclick = () => { UI.ctab = b.dataset.tool; saveUI(); render(); window.scrollTo(0, 0); });
}

/* --- Fiche : historique daté de tout --- */
function fiHistHTML(c, p, vp){
  const year = vp === 'year', inP = date => year || periodOf(c, date)?.id === vp.id, ev = [];
  const hh = l => l.h ? slotLabel(l) : '';
  let nL = 0, nP = 0;
  c.lessons.filter(l => inP(l.date)).forEach(l => {
    nL++; const m = l.m[p.id] || {}, a = effA(p, l), pool = l.type === 'piscine', sp = l.sport ? ' · ' + l.sport : (pool ? ' · piscine' : '');
    const add = (t, ic, cls) => ev.push({date: l.date, k: rgKey(l), h: hh(l), t, ic, cls, sp});
    if (a === 'A'){ add('Absent', '✗', 'abs'); return; }
    nP++;
    if (a === 'R') add('En retard', '⏱', '');
    if (a === 'D') add(certOn(p, l.date, l.type) ? 'Dispensé (certificat)' : 'Dispensé', '🩺', '');
    if (m.k) add(pool ? 'Affaires de piscine oubliées' : 'Tenue de sport oubliée', '👕', 'k');
    if (m.np) add('Ne nage pas', '🏊', '');
    if (m.rg && pool){ const s = rgStreak(c, l, p); add('Règles (ne nage pas)' + (s > 1 ? ` · ${s}e semaine de suite` : ''), 'R', ''); }
    if (m.x) add('Exclu du cours', '⛔', 'd'); else if (m.d) add('Perturbe le cours', '👎', 'd');
  });
  c.evals.filter(e => e.date ? inP(e.date) : (year || e.periodId === vp.id)).forEach(e => { const s = e.s[p.id]; if (s == null) return;
    ev.push({date: e.date || '', k: (e.date || '') + '99', h: '', t: `${e.kind === 'form' ? 'Éval. formative' : 'Évaluation'} « ${e.name} » : ${s === 'abs' ? 'absent' : fr(s, 2) + '/' + fr(+e.max, 2)}`, ic: '📝', cls: 'fe', sp: ''}); });
  (p.certs || []).forEach(x => { if (!(year || inP(x.from) || inP(x.to))) return;
    ev.push({date: x.from, k: x.from + '00', h: '', t: `Certificat médical jusqu'au ${dFR(x.to)}${zoneTxt(x) ? ' (' + zoneTxt(x) + ')' : ''}${x.note ? ' · ' + x.note : ''}`, ic: '🩺', cls: '', sp: ''}); });
  (year ? periodsOf(c) : [vp]).forEach(pp => { const a = ((c.adj || {})[pp.id] || {})[p.id]; if (!a) return;
    if (+a.t) ev.push({date: pp.start, k: pp.start + '00', h: '', t: `${a.t} point${a.t > 1 ? 's' : ''} de tenue repris du relevé de l'école`, ic: '👕', cls: 'k', sp: ''});
    if (+a.c) ev.push({date: pp.start, k: pp.start + '00', h: '', t: `${a.c} point${a.c > 1 ? 's' : ''} d'attitude repris du relevé de l'école`, ic: '👎', cls: 'd', sp: ''}); });
  ev.sort((a, b) => a.k < b.k ? 1 : a.k > b.k ? -1 : 0);
  let mo = '';
  const lines = ev.map(e => { const mm = e.date ? MOISL[dOf(e.date).getMonth()] + ' ' + e.date.slice(0, 4) : '', head = mm !== mo ? `<div class="fi-mo">${esc(mm)}</div>` : ''; mo = mm;
    return head + `<div class="evt fi-ev ${e.cls}"><span class="d">${e.date ? esc(fmtD(e.date)) : ''}${e.h ? '<br>' + esc(e.h) : ''}</span><span class="fi-ic">${e.ic}</span><span class="l">${esc(e.t)}${e.sp ? `<span class="small muted">${esc(e.sp)}</span>` : ''}</span></div>`; }).join('');
  return `<h3>Historique daté</h3><div class="card"><div class="small muted" style="padding-bottom:6px">${year ? 'Toute l\'année' : esc(vp.name)} : présent à ${nP} cours sur ${nL}. Les cours sans rien à signaler ne sont pas listés.</div>${lines || '<span class="muted small">Rien à signaler.</span>'}</div>`;
}

/* --- Bulletin d'un seul élève --- */
function fiBulletin(c, pid, per){
  const ps = pupilsOf(c), i = ps.findIndex(x => x.id === pid), p = ps[i]; if (!p) return;
  const pers = periodsOf(c);
  let vp = per === 'year' ? 'year' : pers.find(x => x.id === per) || periodOf(c, today());
  if (!vp){ toast('Ajoute une période dans Réglages'); return; }
  const year = vp === 'year', X = year ? computeYear(c) : compute(c, vp), r = X.res[p.id], st = S.settings, seP = +st.se, T = +st.T || 0, Cc = +st.C || 0;
  const key = year ? 'year' : vp.id, mine = c.com && c.com[key] && typeof c.com[key][p.id] === 'string' ? c.com[key][p.id] : null;
  const com = mine != null ? mine : comText(c, vp, X, p), k = comCounts(c, X, p, vp);
  const row = (l, v, cls) => `<div class="fi-br ${cls || ''}"><span>${l}</span><b class="num">${v}</b></div>`;
  const fo = year ? [] : c.evals.filter(e => e.periodId === vp.id && e.kind === 'form' && e.s[p.id] != null);
  const h = `
    <div class="chips" id="fb-chips">${pers.map(x => `<button class="chip" type="button" data-fb="${x.id}" aria-pressed="${!year && vp.id === x.id}">${esc(x.name)}</button>`).join('')}<button class="chip" type="button" data-fb="year" aria-pressed="${year}">Année</button></div>
    <div class="fi-bh"><div><div class="small muted">${esc(c.name)} · ${year ? 'Année' : esc(vp.name)}${year ? '' : ' · ' + esc(suRange(c, vp))}</div><b>${esc(p.n)}</b></div>
      <div class="fi-tot num ${r.total != null && r.total < 50 ? 'bad' : ''}">${fr(r.total)}<small> %</small></div></div>
    ${!year && periodOf(c, today())?.id === vp.id && fiAlertTxt(c, p, today()) ? `<div class="fi-al fi-al-b">${esc(fiAlertTxt(c, p, today()))}</div>` : ''}
    <div class="card fi-bt">
      ${year ? (X.periods || []).map(pp => { const t = compute(c, pp).res[p.id]; return row(esc(pp.name), t.total != null ? fr(t.total) + ' %' : 'S-être ' + fr(t.se) + '/' + seP); }).join('') : ''}
      ${row('Savoir-être', `${fr(r.se)}<small>/${seP}</small>`, 'big')}
      ${year ? '' : row('&nbsp;&nbsp;Tenue', `${r.t}<small>/${T}</small>`) + row('&nbsp;&nbsp;Attitude', `${r.c}<small>/${Cc}</small>`)}
      ${row('Savoir-faire', `${fr(r.sf)}<small>/${100 - seP}</small>`, 'big')}
      ${year ? '' : r.evals.map(({e, s}) => row('&nbsp;&nbsp;' + esc(e.name) + (e.date ? ` <span class="small muted">${esc(fmtD(e.date))}</span>` : ''), s === 'abs' ? 'abs' : s == null ? '—' : `${fr(s, 2)}<small>/${fr(+e.max, 2)}</small>`)).join('')}
      ${row(year ? 'Moyenne de l\'année' : 'Total', `${fr(r.total)}<small> %</small>`, 'big tot')}
    </div>
    ${fo.length ? `<h3>Formatif (ne compte pas)</h3><div class="card fi-bt">${fo.map(e => row(esc(e.name), e.s[p.id] === 'abs' ? 'abs' : `${fr(e.s[p.id], 2)}<small>/${fr(+e.max, 2)}</small>`)).join('')}</div>` : ''}
    <div class="card fi-bt">${row('Absences', k.abs)}${row('Retards', r.late || 0)}${row('Oublis de tenue', k.gym + k.adjT + k.pool)}${k.np ? row('Pas nagé', k.np) : ''}${row('Perturbations', k.d)}${row('Exclusions', k.x)}</div>
    <h3>Commentaire${mine != null ? ' <span class="tag com-man">✎ modifié</span>' : ''}</h3>
    <div class="card small">${esc(com) || '<span class="muted">Pas de commentaire.</span>'}</div>
    <div class="row2"><button class="btn" type="button" id="fb-copy">Copier le commentaire</button><button class="btn" type="button" id="fb-back">‹ Retour à la fiche</button></div>`;
  openSheet('Bulletin · ' + p.n, h, {prev: ps[i - 1] && (() => fiBulletin(c, ps[i - 1].id, year ? 'year' : vp.id)), next: ps[i + 1] && (() => fiBulletin(c, ps[i + 1].id, year ? 'year' : vp.id)), pos: `${i + 1}/${ps.length}`});
  sheetOnClose = () => render();
  document.querySelectorAll('#fb-chips [data-fb]').forEach(b => b.onclick = () => fiBulletin(c, pid, b.dataset.fb));
  $('fb-copy').onclick = () => { if (!com.trim()){ toast('Commentaire vide'); return; } comCopy(com, 'Commentaire copié'); };
  $('fb-back').onclick = () => openPupil(c, pid);
}
