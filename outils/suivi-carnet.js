/* ====== Classes > Suivi : tenue et attitude (fiche de suivi pour les parents / l'école) ======
   Seulement : tenue oubliée en salle (m.k, leçon salle), maillot oublié (m.k, leçon piscine), ne nage pas (m.np),
   règles (m.rg, avec le nombre de semaines de suite, voir rgStreak), perturbe (m.d), exclu (m.x),
   et les points repris de l'ancien relevé (c.adj[periodId][pid] = {t, c}, sans date).
   Jamais de notes d'évaluation : seulement les points de tenue / attitude restants.
   Nom complet (p.n) : c'est une fiche officielle. Rien n'est enregistré ici (lecture seule). */
const SU_CATS = [['all', 'Tout'], ['salle', 'Tenue salle'], ['pool', 'Piscine'], ['rg', 'Règles'], ['att', 'Attitude']];
const SU_R = '<b class="su-ic-t">R</b>', SU_X = '<b class="su-ic-t">EXCL.</b>';
const SU_COLS = [
  {k: 'ks', cat: 'salle', l: 'Tenue salle', long: 'Tenue de sport oubliée (salle)', ic: () => IC.shirt},
  {k: 'kp', cat: 'pool', l: 'Tenue piscine', long: 'Tenue de piscine oubliée', ic: c => typeof maillot === 'function' ? maillot(c) : IC.bag},
  {k: 'np', cat: 'pool', l: 'Ne nage pas', long: 'Ne nage pas', ic: () => IC.swim},
  {k: 'rg', cat: 'rg', l: 'Règles', long: 'Règles (ne nage pas)', ic: () => SU_R},
  {k: 'd', cat: 'att', l: 'Perturbe', long: 'Perturbe le cours', ic: () => IC.down},
  {k: 'x', cat: 'att', l: 'Exclu', long: 'Exclu du cours', ic: () => SU_X},
];
const suD = iso => { const d = dOf(iso); return `${JOURS[d.getDay()]} ${pad(d.getDate())}/${pad(d.getMonth() + 1)}`; };
const suH = l => l.h ? (l.h2 && l.h2 !== l.h ? `${l.h}–${l.h2}` : l.h) : '';
const suKey = l => typeof rgKey === 'function' ? rgKey(l) : l.date + (l.h || '');
function suRange(c, vp){
  if (vp === 'year') return 'année scolaire';
  const end = periodEnd(c, vp);
  return `du ${dFR(vp.start)}${end ? ' au ' + dFR(end) : ''}`;
}
/* Données : une ligne par élève, événements datés (les plus récents d'abord) */
function suData(c, vp){
  const year = vp === 'year', st = S.settings, T = +st.T || 0, Cc = +st.C || 0;
  const ls = c.lessons.filter(l => year || periodOf(c, l.date)?.id === vp.id).sort((a, b) => suKey(a) < suKey(b) ? 1 : -1);
  const pers = year ? periodsOf(c) : [vp];
  const X = year ? null : compute(c, vp), PX = year ? pers.map(pp => compute(c, pp)) : null;
  const pool = ls.some(l => l.type === 'piscine'), girls = c.pupils.some(p => pupilG(c, p) === 'F');
  const rows = pupilsOf(c).map(p => {
    const ev = [], n = {ks: 0, kp: 0, np: 0, rg: 0, d: 0, x: 0}; let rgMax = 0;
    ls.forEach(l => {
      if (effA(p, l) === 'A') return;
      const m = l.m[p.id] || {}, add = (k, extra) => { n[k]++; ev.push({k, l, ...extra}); };
      if (m.k) add(l.type === 'piscine' ? 'kp' : 'ks');
      if (m.np) add('np');
      if (m.rg && l.type === 'piscine'){ const s = rgStreak(c, l, p); rgMax = Math.max(rgMax, s); add('rg', {s}); }
      if (m.x) add('x'); else if (m.d) add('d');
    });
    const adj = {t: 0, c: 0};
    pers.forEach(pp => { const a = ((c.adj || {})[pp.id] || {})[p.id]; if (a){ adj.t += +a.t || 0; adj.c += +a.c || 0; } });
    let pts;
    if (!year){ const r = X.res[p.id]; pts = {t: r.t, c: r.c}; }
    else pts = {lt: PX.reduce((a, x) => a + (T - x.res[p.id].t), 0), lc: PX.reduce((a, x) => a + (Cc - x.res[p.id].c), 0)};
    return {p, ev, n, adj, pts, rgMax};
  });
  return {ls, rows, pool, girls, year, T, Cc};
}
const suColsFor = (D, f) => SU_COLS.filter(o => (o.cat !== 'pool' || D.pool) && (o.cat !== 'rg' || D.girls) && (f === 'all' || o.cat === f));
const suCount = (r, cols, f) => cols.reduce((a, o) => a + r.n[o.k], 0) + (f === 'all' || f === 'salle' || f === 'att' ? (f !== 'att' ? r.adj.t : 0) + (f !== 'salle' ? r.adj.c : 0) : 0);
function suVisible(D, f, sort){
  // colonnes vides (personne dans la période) cachées, sauf si on filtre
  const cols = suColsFor(D, f).filter((o, i, a) => f !== 'all' || D.rows.some(r => r.n[o.k]));
  const rows = D.rows.map(r => ({...r, tot: suCount(r, cols, f)})).filter(r => r.tot > 0);
  if (sort !== 'az') rows.sort((a, b) => b.tot - a.tot || byName(a.p, b.p));
  return {cols, rows, quiet: D.rows.length - rows.length};
}
function suPtsCells(D, r){
  if (D.year) return `<td class="su-pt"><span>T ${r.pts.lt ? '−' + r.pts.lt : '0'}</span><span>C ${r.pts.lc ? '−' + r.pts.lc : '0'}</span></td>`;
  const one = (k, v, max) => `<span class="${v === 0 && max ? 'zero' : ''}">${k} ${v}<small>/${max}</small></span>`;
  return `<td class="su-pt">${one('T', r.pts.t, D.T)}${one('C', r.pts.c, D.Cc)}</td>`;
}
function renderSuivi(c, m){
  const vp = viewPeriod(c);
  if (!vp){ m.innerHTML = `<section class="sec"><div class="card empty"><p>Ajoute une période dans Réglages.</p></div></section>`; return; }
  const D = suData(c, vp);
  let f = UI.suF || 'all'; if (!suColsFor(D, f).length) f = 'all';
  const sort = UI.suSort === 'az' ? 'az' : 'n';
  const V = suVisible(D, f, sort);
  const cats = SU_CATS.filter(([k]) => k === 'all' || suColsFor(D, k).length);
  m.innerHTML = `<section class="sec su">
    <h2>Suivi tenue &amp; attitude</h2>
    ${periodChips(c, true)}
    <div class="chips su-f" role="group" aria-label="Afficher seulement">${cats.map(([k, l]) => `<button class="chip" type="button" data-suf="${k}" aria-pressed="${f === k}">${f === k ? '✓ ' : ''}${l}</button>`).join('')}</div>
    <div class="su-sheet">
      <div class="su-hd"><b>${esc(c.name)} · ${vp === 'year' ? 'Année' : esc(vp.name)}</b><span>${esc(suRange(c, vp))} · ${D.ls.length} leçon${D.ls.length > 1 ? 's' : ''} · ${c.pupils.length} élèves</span></div>
      ${V.rows.length ? `<div class="su-tw"><table class="su-t">
        <thead><tr><th class="su-nm">Élève</th>${V.cols.map(o => `<th><span class="su-ic">${o.ic(c)}</span>${o.l.replace(' ', '<br>')}</th>`).join('')}<th class="su-ptl">Points<br>${D.year ? 'perdus' : 'restants'}</th></tr></thead>
        <tbody>${V.rows.map(r => `<tr data-supid="${r.p.id}"><td class="su-nm"><button type="button">${esc(r.p.n)}<span aria-hidden="true">›</span></button>${r.adj.t || r.adj.c ? `<span class="su-rel">relevé ${[r.adj.t ? '−' + r.adj.t + 'T' : '', r.adj.c ? '−' + r.adj.c + 'C' : ''].filter(Boolean).join(' ')}</span>` : ''}</td>${V.cols.map(o => { const v = r.n[o.k];
          return `<td>${v ? `<span class="su-n${o.k === 'x' ? ' x' : ''}">${v}</span>${o.k === 'rg' && r.rgMax > 1 ? `<span class="su-st">${r.rgMax} de suite</span>` : ''}` : '<span class="su-z">·</span>'}</td>`; }).join('')}${suPtsCells(D, r)}</tr>`).join('')}</tbody>
      </table></div>` : `<p class="su-none">Aucune remarque ${f === 'all' ? '' : '(' + esc(SU_CATS.find(x => x[0] === f)[1].toLowerCase()) + ') '}pour cette période.</p>`}
      ${V.quiet && V.rows.length ? `<p class="su-quiet">✓ ${V.quiet} élève${V.quiet > 1 ? 's' : ''} sans remarque${f === 'all' ? '' : ' dans ce filtre'}</p>` : ''}
    </div>
    <div class="row2" style="align-items:center"><span class="small muted" style="flex:1">Trier :</span>
      <div class="seg" role="group" aria-label="Trier">${[['n', 'Plus de remarques'], ['az', 'Ordre de la classe']].map(([k, l]) => `<button type="button" data-susort="${k}" aria-pressed="${sort === k}">${l}</button>`).join('')}</div></div>
    <p class="small muted" style="margin:0">Touche un élève pour la liste datée. Les règles ne coûtent jamais de point ; « de suite » = semaines de piscine consécutives où elle était présente.</p>
    <button class="btn pri block" type="button" id="su-copy">📋 Copier le suivi (${esc(c.name)})</button>
    <button class="btn block" type="button" id="su-xls">Exporter Excel</button>
  </section>`;
  bindChips(c);
  m.querySelectorAll('[data-suf]').forEach(b => b.onclick = () => { UI.suF = b.dataset.suf; render(); });
  m.querySelectorAll('[data-susort]').forEach(b => b.onclick = () => { UI.suSort = b.dataset.susort; render(); });
  const tb = m.querySelector('.su-t tbody');
  if (tb) tb.onclick = e => { const tr = e.target.closest('tr[data-supid]'); if (tr) openSuivi(c, vp, tr.dataset.supid, f, V.rows.map(r => r.p.id)); };
  $('su-copy').onclick = () => { if (!V.rows.length){ toast('Rien à copier'); return; } comCopy(suClassText(c, vp, D, V, f), 'Suivi de la classe copié'); };
  $('su-xls').onclick = () => suXlsx(c, vp, D, f);
  // Journal des leçons (déplacé ici depuis « Points de savoir-être », supprimé) : leçon par leçon, ce qu'on a fait
  const ls = vp === 'year' ? [...c.lessons].sort((a, b) => suKey(a) < suKey(b) ? -1 : 1) : compute(c, vp).lessons;
  if (ls.length) m.insertAdjacentHTML('beforeend', `<section class="sec">${agCouverture(c, ls)}${agJournal(ls)}</section>`);
}
/* Liste datée d'un élève */
function suEvLabel(e){ const o = SU_COLS.find(x => x.k === e.k); return o.long; }
function openSuivi(c, vp, pid, f, order){
  const D = suData(c, vp), r = D.rows.find(x => x.p.id === pid); if (!r) return;
  const cols = suColsFor(D, f), keys = new Set(cols.map(o => o.k)), ev = r.ev.filter(e => keys.has(e.k));
  const i = order.indexOf(pid), go = k => () => openSuivi(c, vp, order[k], f, order);
  const showAdj = (f === 'all' || f === 'salle' || f === 'att') && (r.adj.t || r.adj.c);
  openSheet(r.p.n, `
    <p class="small muted" style="margin:0">${esc(c.name)} · ${vp === 'year' ? 'Année' : esc(vp.name)} · ${esc(suRange(c, vp))}${f !== 'all' ? ' · filtre : ' + esc(SU_CATS.find(x => x[0] === f)[1]) : ''}</p>
    <div class="su-cnts">${cols.map(o => `<span class="su-cnt${r.n[o.k] ? ' on' : ''}"><span class="su-ic">${o.ic(c)}</span>${o.l} <b>${r.n[o.k]}</b></span>`).join('')}</div>
    ${D.year ? `<div class="card small">Points perdus sur l'année : tenue ${r.pts.lt}, attitude ${r.pts.lc}</div>`
      : `<div class="card small">Points restants : <b>tenue ${r.pts.t}/${D.T}</b> · <b>attitude ${r.pts.c}/${D.Cc}</b></div>`}
    <div class="card su-list">${ev.length ? ev.map(e => { const o = SU_COLS.find(x => x.k === e.k);
      return `<div class="su-ev"><span class="su-d">${suD(e.l.date)}${suH(e.l) ? `<small>${suH(e.l)}</small>` : ''}</span><span class="su-ic">${o.ic(c)}</span><span class="su-l">${o.long}${e.k === 'rg' && e.s > 1 ? ` <span class="su-stt">⚠ ${e.s}e semaine de suite</span>` : ''}</span></div>`; }).join('')
      : '<span class="muted small">Aucun événement daté.</span>'}
      ${showAdj ? `<div class="su-ev"><span class="su-d">sans date</span><span class="su-ic">📄</span><span class="su-l">Repris du relevé : ${[r.adj.t ? '−' + r.adj.t + ' tenue' : '', r.adj.c ? '−' + r.adj.c + ' attitude' : ''].filter(Boolean).join(', ')}</span></div>` : ''}</div>
    <button class="btn pri block" type="button" id="su-pcopy">📋 Copier le suivi de ${esc(r.p.n)}</button>`,
    {prev: i > 0 && go(i - 1), next: i >= 0 && i < order.length - 1 && go(i + 1), pos: i >= 0 ? `${i + 1}/${order.length}` : ''});
  $('su-pcopy').onclick = () => comCopy(suPupilText(c, vp, D, r, f), 'Suivi copié');
}
/* Textes à copier (dates dans l'ordre chronologique) */
function suEvTxt(e){ return suD(e.l.date) + (suH(e.l) ? ' ' + suH(e.l) : '') + (e.k === 'rg' && e.s > 1 ? ` (${e.s}e semaine de suite)` : ''); }
function suPtsTxt(D, r){ return D.year ? `Points perdus sur l'année : tenue ${r.pts.lt}, attitude ${r.pts.lc}` : `Points restants : tenue ${r.pts.t}/${D.T}, attitude ${r.pts.c}/${D.Cc}`; }
function suHead(c, vp, f){
  return `Suivi EPS – tenue et attitude · ${c.name} · ${vp === 'year' ? 'Année' : vp.name} (${suRange(c, vp)})${f !== 'all' ? ' · ' + SU_CATS.find(x => x[0] === f)[1] : ''}`;
}
function suPupilText(c, vp, D, r, f){
  const cols = suColsFor(D, f), out = [suHead(c, vp, f), `Élève : ${r.p.n}`];
  cols.forEach(o => { const ev = r.ev.filter(e => e.k === o.k).reverse(); if (ev.length) out.push(`${o.long} : ${ev.length} – ${ev.map(suEvTxt).join(', ')}`); });
  if ((f === 'all' || f === 'salle' || f === 'att') && (r.adj.t || r.adj.c)) out.push(`Repris du relevé de l'école : ${[r.adj.t ? '−' + r.adj.t + ' tenue' : '', r.adj.c ? '−' + r.adj.c + ' attitude' : ''].filter(Boolean).join(', ')}`);
  if (out.length === 2) out.push('Aucune remarque.');
  out.push(suPtsTxt(D, r));
  return out.join('\n');
}
function suClassText(c, vp, D, V, f){
  const out = [suHead(c, vp, f), ''];
  const ord = new Map(pupilsOf(c).map((p, i) => [p.id, i]));
  [...V.rows].sort((a, b) => (ord.get(a.p.id) ?? 1e6) - (ord.get(b.p.id) ?? 1e6)).forEach(r => {
    const parts = V.cols.map(o => { const ev = r.ev.filter(e => e.k === o.k).reverse(); return ev.length ? `${o.l} ${ev.length} (${ev.map(suEvTxt).join(', ')})` : ''; }).filter(Boolean);
    if ((f === 'all' || f === 'salle' || f === 'att') && (r.adj.t || r.adj.c)) parts.push(`relevé ${[r.adj.t ? '−' + r.adj.t + ' tenue' : '', r.adj.c ? '−' + r.adj.c + ' attitude' : ''].filter(Boolean).join(', ')}`);
    out.push(`${r.p.n} : ${parts.join(' ; ')}. ${suPtsTxt(D, r)}.`);
  });
  if (V.quiet) out.push('', `${V.quiet} élève${V.quiet > 1 ? 's' : ''} sans remarque.`);
  return out.join('\n');
}
/* Excel : même mise en page que le bulletin (buildXlsx), tous les élèves */
async function suXlsx(c, vp, D, f){
  try {
    const cols = suColsFor(D, f), lab = vp === 'year' ? 'Année' : vp.name;
    const hd = [{h: 'N°', w: 5}, {h: 'Élève', w: 28}, ...cols.map(o => ({h: o.l, w: 10})),
      {h: D.year ? 'Tenue\nperdus' : `Tenue\nrestant /${D.T}`, w: 10}, {h: D.year ? 'Attitude\nperdus' : `Attitude\nrestant /${D.Cc}`, w: 10}, {h: 'Dates', w: 70}];
    const N = hd.length, last = colL(N - 1), blank = () => Array(N).fill(null), rows = [], merges = [];
    const r1 = blank(); r1[0] = {v: `Suivi EPS · tenue et attitude · ${c.name} · ${lab}`, s: XS.TITLE}; rows.push({h: 30, cells: r1}); merges.push(`A1:${last}1`);
    const r2 = blank(); r2[0] = {v: `${suRange(c, vp)} · ${D.ls.length} leçons · ${c.pupils.length} élèves${f !== 'all' ? ' · ' + SU_CATS.find(x => x[0] === f)[1] : ''} · exporté le ${dFR(today())}`, s: XS.SUB}; rows.push({h: 18, cells: r2}); merges.push(`A2:${last}2`);
    rows.push({h: 8, cells: blank()});
    rows.push({h: 36, cells: hd.map(o => ({v: o.h, s: XS.HEAD}))});
    D.rows.forEach((r, i) => {
      const b = i % 2 === 1, I = b ? XS.INTB : XS.INT;
      const det = cols.map(o => { const ev = r.ev.filter(e => e.k === o.k).reverse(); return ev.length ? `${o.l} : ${ev.map(suEvTxt).join(', ')}` : ''; }).filter(Boolean);
      if ((f === 'all' || f === 'salle' || f === 'att') && (r.adj.t || r.adj.c)) det.push(`Repris du relevé : ${[r.adj.t ? '−' + r.adj.t + ' tenue' : '', r.adj.c ? '−' + r.adj.c + ' attitude' : ''].filter(Boolean).join(', ')}`);
      rows.push({h: Math.max(20, det.length * 15 + 4), cells: [{v: i + 1, s: I}, {v: r.p.n, s: b ? XS.TXTB : XS.TXT}, ...cols.map(o => ({v: r.n[o.k] || '', s: I})),
        {v: D.year ? r.pts.lt : r.pts.t, s: I}, {v: D.year ? r.pts.lc : r.pts.c, s: I}, {v: det.join('\n'), s: XS.NOTE}]});
    });
    const sh = {name: `Suivi ${c.name} ${lab}`, rows, merges, cols: hd.map(o => o.w), freeze: 4, footer: `Carnet EPS · suivi ${c.name} · ${lab}`};
    await offerFile(`Suivi EPS ${c.name} ${lab}`.replace(/[\\/:*?"<>|]/g, '-') + '.xlsx', buildXlsx([sh]), 'Fichier Excel');
  } catch(e){ toast('Le fichier Excel n\'a pas pu être créé'); }
}
