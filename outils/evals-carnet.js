/* ====== Évaluations formatives, endurance (compteur de tours), filles et règles à la piscine ======
   - e.kind = 'form' : évaluation formative (pour info) : visible dans la classe, mais hors savoir-faire / bulletin / Excel
     (filtrée dans compute()). Sans e.kind = certificative (les anciennes évaluations aussi).
   - e.endu = {min, tours, laps:{pid: n}} : évaluation d'endurance. Note = min(tours / objectif, 1) × max, arrondie au 0,5,
     écrite dans e.s comme une note normale. Dernières valeurs utilisées dans la classe : c.enduLast = {min, tours, max}.
   - p.g = 'F' | 'G' ; c.sexe = 'G' | 'F' | 'M' (toute la classe d'un coup, sert si p.g est vide).
   - Leçon piscine : m.rg = 1 (règles) : ne nage pas, pas de point perdu, sauf si à la leçon piscine précédente
     (où elle n'était pas absente) elle avait déjà ses règles : −1 tenue « Règles 2 semaines de suite » (dans compute()).
   - Compteur en cours : localStorage 'carnet-eps-endu' (reprise après un rechargement), enregistré dans la classe à la fin.
   Tout passe par save(c.id) : appareil + Drive. */
const EN_MINS = [10, 15, 20, 25, 30, 35, 40];
const enScore = (laps, tours, max) => !tours || !laps ? 0 : Math.round(Math.min(laps / tours, 1) * max * 2) / 2;
const pupilG = (c, p) => p.g || (c.sexe === 'F' || c.sexe === 'G' ? c.sexe : null);

/* --- Règles à la piscine --- */
const rgKey = l => l.date + String(l.h ? hI(l.h) + 1 : 0).padStart(2, '0');
function rgPrev(c, l, pu){
  const k = rgKey(l); let best = null;
  c.lessons.forEach(x => { if (x === l || x.type !== 'piscine' || rgKey(x) >= k || effA(pu, x) === 'A') return; if (!best || rgKey(x) > rgKey(best)) best = x; });
  return best;
}
function rgRepeat(c, l, pu){ const pv = rgPrev(c, l, pu); return !!(pv && (pv.m[pu.id] || {}).rg); }
function rgChip(c, L, p, pool, off){
  if (!pool || off || pupilG(c, p) !== 'F') return '';
  const on = !!(L.m[p.id] || {}).rg, rep = on && rgRepeat(c, L, p);
  return `<div class="rg-line"><button class="rg-chip${on ? ' on' : ''}" type="button" data-act="rg" aria-pressed="${on}" aria-label="Règles : ${on ? 'oui' : 'non'}">${on ? '✓ ' : ''}R · règles</button>`
    + (rep ? '<span class="rg-warn">⚠ 2e semaine de suite : elle perd des points (non-participation)</span>' : '') + '</div>';
}

/* --- Filles / garçons --- */
const pgBtns = (c, p) => { const g = pupilG(c, p);
  return `<span class="seg pg-seg" role="group" aria-label="Garçon ou fille">${[['G', 'Garçon'], ['F', 'Fille']].map(([k, a]) => `<button type="button" data-pg="${p.id}" data-g="${k}" aria-pressed="${g === k}" aria-label="${a}">${k}</button>`).join('')}</span>`; };
function classSexeHTML(c){
  const sx = c.sexe || '';
  return `<span class="small muted" style="font-weight:600">Élèves de la classe</span>
    <div class="seg full" role="group" aria-label="Garçons ou filles" style="margin-top:0">${[['G', 'Garçons'], ['F', 'Filles'], ['M', 'Mixte']].map(([k, l]) => `<button type="button" data-sexe="${k}" aria-pressed="${sx === k}">${l}</button>`).join('')}</div>
    <span class="small muted">Garçons ou Filles : toute la classe d'un coup. Mixte : touche G ou F à côté de chaque élève (sert pour la piscine).</span>`;
}
function bindClassSexe(c){
  document.querySelectorAll('[data-sexe]').forEach(b => b.onclick = () => { const k = b.dataset.sexe; c.sexe = k; if (k !== 'M') c.pupils.forEach(p => p.g = k); save(c.id); render();
    toast(k === 'G' ? 'Toute la classe : garçons' : k === 'F' ? 'Toute la classe : filles' : 'Classe mixte : touche G ou F pour chaque élève'); });
  document.querySelectorAll('[data-pg]').forEach(b => b.onclick = () => { const p = c.pupils.find(x => x.id === b.dataset.pg); if (!p) return;
    p.g = b.dataset.g; if (c.sexe && c.sexe !== 'M' && c.sexe !== p.g) c.sexe = 'M'; save(c.id); render(); });
}
const pgSheet = (c, p) => { const g = pupilG(c, p);
  return `<div class="seg full" role="group" aria-label="Garçon ou fille" style="margin-top:0">${[['G', 'Garçon'], ['F', 'Fille']].map(([k, l]) => `<button type="button" data-ppg="${k}" aria-pressed="${g === k}">${l}</button>`).join('')}</div>`; };
function bindPupilG(c, p){
  document.querySelectorAll('[data-ppg]').forEach(b => b.onclick = () => { p.g = b.dataset.ppg; if (c.sexe && c.sexe !== 'M' && c.sexe !== p.g) c.sexe = 'M'; save(c.id);
    document.querySelectorAll('[data-ppg]').forEach(x => x.setAttribute('aria-pressed', x === b)); });
}

/* --- Liste et formulaire des évaluations --- */
const evTags = e => (e.endu ? ' <span class="tag ev-endu">🏃 Endurance</span>' : '') + (e.kind === 'form' ? ' <span class="tag ev-form">FORMATIVE</span>' : '');
function evTypeField(c, e){
  if (e) return e.endu ? '<div class="ev-type1"><b>🏃 Endurance</b> <span class="small muted">· compteur de tours</span></div>' : '';
  return `<span class="small muted" style="font-weight:600">Type d'évaluation</span>
    <div class="seg full ev-seg" role="group" aria-label="Type d'évaluation" style="margin-top:0"><button type="button" data-etype="std" aria-pressed="true">Classique</button><button type="button" data-etype="endu" aria-pressed="false">🏃 Endurance (compteur de tours)</button></div>`;
}
function evEnduFields(c, e){
  const x = e?.endu || c.enduLast || {}, mn = x.min || 15;
  return `<div class="card ev-endu-f" id="ef-endu" ${e?.endu ? '' : 'hidden'}>
    <span class="small muted" style="font-weight:600">Durée de la course</span>
    <div class="ev-mins">${EN_MINS.map(n => `<button class="chip" type="button" data-emin="${n}" aria-pressed="${n === mn}">${n} min</button>`).join('')}</div>
    <div class="row2"><label class="f" style="flex:1">Autre durée (minutes)<input class="inp num" id="ef-emin" inputmode="decimal" value="${esc(fr(mn, 2))}"></label>
    <label class="f" style="flex:1">Tours pour 100 %<input class="inp num" id="ef-etours" inputmode="numeric" value="${x.tours || ''}" placeholder="à remplir"></label></div>
    <span class="small muted">Note = tours ÷ objectif × maximum, arrondie au demi-point. Objectif atteint ou dépassé = note maximale.${!e && c.enduLast ? ' Valeurs reprises de la dernière endurance de la classe.' : ''}</span>
  </div>`;
}
function evKindField(e){
  const f = e?.kind === 'form';
  return `<span class="small muted" style="font-weight:600">Compte dans le bulletin ?</span>
    <div class="ev-kind"><button class="chip" type="button" data-kind="cert" aria-pressed="${!f}">✔ Certificative (compte dans le bulletin)</button><button class="chip" type="button" data-kind="form" aria-pressed="${f}">ℹ Formative (pour info)</button></div>`;
}
let EF = null;
function bindEvForm(c, e){
  EF = {endu: !!e?.endu, kind: e?.kind === 'form' ? 'form' : 'cert', max0: e ? +e.max : null};
  const minsSync = () => { const v = parseNum($('ef-emin').value); document.querySelectorAll('[data-emin]').forEach(x => x.setAttribute('aria-pressed', +x.dataset.emin === v)); };
  document.querySelectorAll('[data-etype]').forEach(b => b.onclick = () => {
    EF.endu = b.dataset.etype === 'endu';
    document.querySelectorAll('[data-etype]').forEach(x => x.setAttribute('aria-pressed', x === b));
    $('ef-endu').hidden = !EF.endu;
    const n = $('ef-name');
    if (EF.endu){ if (!n.value.trim()) n.value = 'Endurance'; if (c.enduLast && c.enduLast.max) $('ef-max').value = fr(c.enduLast.max, 2); }
    else if (n.value.trim() === 'Endurance') n.value = '';
  });
  document.querySelectorAll('[data-emin]').forEach(b => b.onclick = () => { $('ef-emin').value = b.dataset.emin; minsSync(); });
  if ($('ef-emin')) $('ef-emin').oninput = minsSync;
  document.querySelectorAll('[data-kind]').forEach(b => b.onclick = () => { EF.kind = b.dataset.kind; document.querySelectorAll('[data-kind]').forEach(x => x.setAttribute('aria-pressed', x === b)); });
}
function evFormOk(){
  if (!EF || !EF.endu) return true;
  const mn = parseNum($('ef-emin').value), t = parseNum($('ef-etours').value);
  if (!mn || mn <= 0 || mn > 180){ $('ef-emin').focus(); toast('Indique la durée de la course en minutes'); return false; }
  if (!t || t <= 0 || t > 500){ $('ef-etours').focus(); toast('Indique le nombre de tours pour avoir 100 %'); return false; }
  return true;
}
function evFormApply(c, o){
  if (!EF) return;
  if (EF.kind === 'form') o.kind = 'form'; else delete o.kind;
  if (!EF.endu) return;
  const old = o.endu || {}, mn = parseNum($('ef-emin').value), t = Math.round(parseNum($('ef-etours').value));
  o.endu = {min: mn, tours: t, laps: old.laps || {}};
  if (old.tours !== t || EF.max0 !== +o.max) Object.entries(o.endu.laps).forEach(([pid, n]) => o.s[pid] = enScore(n, t, +o.max));
  c.enduLast = {min: mn, tours: t, max: +o.max};
}

/* --- Feuille des notes : bouton du compteur, tours par élève --- */
function evScoresHead(c, e){
  let h = '';
  if (e.kind === 'form') h += '<div class="ev-formnote"><span class="tag ev-form">FORMATIVE</span><span class="small">Pour info : ne compte pas dans le bulletin.</span></div>';
  if (e.endu){
    const run = enRunGet(), mine = run && run.eid === e.id, nl = Object.keys(e.endu.laps || {}).length;
    h += `<div class="card ev-endu-c"><div><b>🏃 Endurance · ${fr(e.endu.min, 2)} min</b><br><span class="small muted">${e.endu.tours} tours = ${fr(+e.max, 2)}/${fr(+e.max, 2)}${nl ? ` · ${nl} élève${nl > 1 ? 's' : ''} déjà compté${nl > 1 ? 's' : ''}` : ''}</span></div>
      <button class="btn pri block en-go" type="button" id="es-endu">${mine ? '▶ Reprendre le compteur' : '▶ Démarrer l\'évaluation'}</button></div>`;
  }
  return h;
}
function bindEvScoresHead(c, e){ if ($('es-endu')) $('es-endu').onclick = () => { closeSheet(); enOpen(c.id, e.id); }; }
const evLapsTxt = (e, p) => { const n = e.endu && (e.endu.laps || {})[p.id]; return n != null ? `<span class="pts">${n} tour${n > 1 ? 's' : ''}</span>` : ''; };
function evFormList(c, vp, p){
  return c.evals.filter(e => e.periodId === vp.id && e.kind === 'form').map(e => { const s = e.s[p.id];
    return `<div class="evt"><span class="d">${e.date ? esc(fmtD(e.date)) : ''}</span><span class="l">${esc(e.name)} <span class="small muted">(formatif, ne compte pas)</span></span><b class="num">${s === 'abs' ? 'abs' : s == null ? '—' : fr(s, 2)}<span class="muted">/${fr(+e.max, 2)}</span></b></div>`; }).join('');
}

/* ====== Compteur de tours plein écran ====== */
const EN_KEY = 'carnet-eps-endu';
const enRunGet = () => { try { return JSON.parse(localStorage.getItem(EN_KEY)) || null; } catch(e){ return null; } };
const enRunPut = r => { try { if (r) localStorage.setItem(EN_KEY, JSON.stringify(r)); else localStorage.removeItem(EN_KEY); } catch(e){} };
let EN = null, EN_AC = null;
const enPrefs = (() => { try { return JSON.parse(localStorage.getItem('carnet-eps-endu-vue')) || {}; } catch(e){ return {}; } })();
const enPrefSave = () => { try { localStorage.setItem('carnet-eps-endu-vue', JSON.stringify(enPrefs)); } catch(e){} };
const enFind = r => { const c = S.classes.find(x => x.id === r.cid), e = c && c.evals.find(x => x.id === r.eid); return e && e.endu ? {c, e} : null; };
const enTot = r => Object.values(r.laps || {}).reduce((a, b) => a + b, 0);
const mmss = ms => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };

/* son et vibration (le son se débloque au premier toucher, comme l'exige l'iPhone) */
function enAudio(){ try { if (!EN_AC) EN_AC = new (window.AudioContext || window.webkitAudioContext)(); if (EN_AC.state === 'suspended') EN_AC.resume(); } catch(e){} }
function enTone(f, d, t0 = 0, v = .25){ const a = EN_AC; if (!a) return;
  try { const o = a.createOscillator(), g = a.createGain(), t = a.currentTime + t0; o.type = 'square'; o.frequency.value = f;
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + d); o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + d + .03); } catch(e){} }
const enClick = () => enTone(1500, .05, 0, .12);
const enBeep = (n, long) => { for (let i = 0; i < n; i++) enTone(880, long && i === n - 1 ? 1 : .28, i * .4, .35); };
const enBuzz = p => { try { navigator.vibrate && navigator.vibrate(p); } catch(e){} };
async function enWake(){ try { if (navigator.wakeLock) EN.wl = await navigator.wakeLock.request('screen'); } catch(e){} }

function enAbsents(c){
  const ls = c.lessons.filter(l => l.date === today()), s = new Set();
  if (ls.length) c.pupils.forEach(p => { if (ls.every(l => ['A', 'D'].includes(effA(p, l)))) s.add(p.id); });
  return {s, roll: ls.length > 0};
}
function enIds(){
  const r = EN.run, ab = enAbsents(EN.c).s;
  let ps = pupilsOf(EN.c).filter(p => !r.excl || !ab.has(p.id) || (r.laps[p.id] || 0) > 0);
  if (r.sort) ps = [...ps].sort((a, b) => (r.laps[b.id] || 0) - (r.laps[a.id] || 0) || byName(a, b));
  return ps.map(p => p.id);
}
function enName(p){ const w = p.n.trim().split(/\s+/); if (w.length < 2) return [p.n, ''];
  return enPrefs.big === 'first' ? [w[0], w.slice(1).join(' ')] : [w[w.length - 1], w.slice(0, -1).join(' ')]; }
const enEl = () => EN.rt.elapsed();

function enOpen(cid, eid){
  const old = enRunGet();
  if (old && (old.cid !== cid || old.eid !== eid) && enFind(old) && (enTot(old) || old.st !== 'idle')){
    const f = enFind(old);
    enModal(`<b>Un autre compteur est en cours</b><span class="small">${esc(f.c.name)} · ${esc(f.e.name)} : ${enTot(old)} tours comptés, pas encore enregistrés.</span>`,
      [['Reprendre celui-là', 'pri', () => enOpen(old.cid, old.eid)], ['Le remplacer (perdu)', 'danger', () => { enRunPut(null); enOpen(cid, eid); }], ['Annuler', '', null]]);
    return;
  }
  const c = S.classes.find(x => x.id === cid), e = c && c.evals.find(x => x.id === eid); if (!e || !e.endu) return;
  let run = old && old.cid === cid && old.eid === eid ? old : null;
  if (!run) run = {cid, eid, st: 'idle', t0: null, acc: 0, dur: Math.round(e.endu.min * 60000), laps: {}, last: {}, undo: [], w1: 0, sort: false, excl: false};
  EN = {run, c, e, press: new Map(), k: 0, rt: {elapsed: () => run.acc + (run.st === 'run' ? Date.now() - run.t0 : 0)}};
  const root = document.createElement('div'); root.className = 'en'; root.id = 'en'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'Compteur de tours');
  root.innerHTML = `<div class="en-top">
      <button class="en-ib" type="button" id="en-x" aria-label="Fermer le compteur">✕</button>
      <div class="en-clock" id="en-clock"><b id="en-time" class="num">0:00</b><span id="en-st"></span></div>
      <button class="en-go" type="button" id="en-play">GO</button>
    </div>
    <div class="en-bar2">
      <button class="en-btn sm" type="button" id="en-undo" disabled>↶ Annuler</button>
      <button class="en-btn sm stop" type="button" id="en-stop">■ Stop</button>
      <span class="en-info" id="en-info"></span>
      <button class="en-btn sm" type="button" id="en-opt" aria-expanded="false">⋯</button>
    </div>
    <div class="en-flash" id="en-flash" hidden></div>
    <div class="en-grid" id="en-grid"></div>
    <div class="en-end" id="en-end" hidden><b>⏱ Terminé</b><span class="small">Les touchers ne comptent plus. ↶ Annuler reste possible.</span><button class="en-btn pri" type="button" id="en-tosum">Voir le résumé et enregistrer</button></div>
    <div class="en-pop" id="en-pop" hidden></div>
    <div class="en-sum" id="en-sum" hidden></div>
    <div class="en-ask" id="en-ask" hidden></div>`;
  document.querySelector('.toast')?.remove();
  document.body.appendChild(root); document.body.classList.add('en-open');
  $('en-x').onclick = enAskClose;
  $('en-play').onclick = enPlay;
  $('en-stop').onclick = enStopBtn;
  $('en-undo').onclick = enUndo;
  $('en-opt').onclick = enOptions;
  $('en-tosum').onclick = enSummary;
  enGrid(); enWake(); enUI(); enTick();
  EN.iv = setInterval(enTick, 250);
  enSave();
}
function enSave(){ if (EN) enRunPut(EN.run); }
function enClose(){
  if (!EN) return; clearInterval(EN.iv); try { EN.wl && EN.wl.release(); } catch(e){}
  $('en')?.remove(); document.body.classList.remove('en-open'); EN = null;
}

function enGrid(){
  const g = $('en-grid'); EN.ids = enIds();
  g.innerHTML = EN.ids.map(pid => { const p = EN.c.pupils.find(x => x.id === pid), [a, b] = enName(p);
    return `<div class="en-t" data-pid="${pid}" role="button" tabindex="0" aria-label="${esc(p.n)}"><span class="en-nm"><b>${esc(a)}</b><small>${esc(b)}</small></span><span class="en-n num">0</span><span class="en-ago num"></span><span class="en-ok">✓ 100 %</span><span class="en-msg"></span><span class="en-pb"><i></i></span></div>`; }).join('')
    || '<p class="en-none">Personne à compter : change le réglage des absents (⋯).</p>';
  EN.ids.forEach(enPaint); enLayout(); enInfo();
  g.onpointerdown = ev => { const t = ev.target.closest('.en-t'); if (!t) return; ev.preventDefault(); enAudio();
    const pid = t.dataset.pid, o = {pid, x: ev.clientX, y: ev.clientY, done: false};
    o.tm = setTimeout(() => { o.done = true; enAdd(pid, -1); }, 650); EN.press.set(ev.pointerId, o); };
  g.onpointermove = ev => { const o = EN.press.get(ev.pointerId); if (o && Math.hypot(ev.clientX - o.x, ev.clientY - o.y) > 20){ clearTimeout(o.tm); EN.press.delete(ev.pointerId); } };
  g.onpointerup = ev => { const o = EN.press.get(ev.pointerId); if (!o) return; clearTimeout(o.tm); EN.press.delete(ev.pointerId); if (!o.done) enAdd(o.pid, 1); };
  g.onpointercancel = ev => { const o = EN.press.get(ev.pointerId); if (o){ clearTimeout(o.tm); EN.press.delete(ev.pointerId); } };
  g.oncontextmenu = ev => ev.preventDefault();
  g.onkeydown = ev => { const t = ev.target.closest('.en-t'); if (t && (ev.key === 'Enter' || ev.key === ' ')){ ev.preventDefault(); enAdd(t.dataset.pid, 1); } };
}
/* grille : nombre de colonnes choisi pour que toutes les cases tiennent sans défiler, le plus grandes possible */
function enLayout(){
  const g = $('en-grid'); if (!g || !EN) return;
  const n = EN.ids.length || 1, cs = getComputedStyle(g), W = g.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight), H = g.clientHeight - parseFloat(cs.paddingBottom), gap = 6;
  let best = null;
  for (let cols = 1; cols <= n; cols++){ const rows = Math.ceil(n / cols), tw = (W - gap * (cols - 1)) / cols, th = (H - gap * (rows - 1)) / rows, sc = Math.min(tw, th * 1.25);
    if (!best || sc > best.sc) best = {sc, cols, rows, tw, th}; }
  g.style.gridTemplateColumns = `repeat(${best.cols}, minmax(0, 1fr))`; g.style.gridTemplateRows = `repeat(${best.rows}, minmax(0, 1fr))`;
  g.style.setProperty('--fn', Math.max(11, Math.min(best.th * .2, best.tw * .16, 30)) + 'px');
  g.style.setProperty('--fc', Math.max(16, Math.min(best.th * .42, best.tw * .36, 80)) + 'px');
  g.classList.toggle('tiny', best.th < 66);
}
window.addEventListener('resize', () => { if (EN) enLayout(); });
document.addEventListener('visibilitychange', () => { if (EN && document.visibilityState === 'visible'){ enWake(); enTick(); } });

function enPaint(pid){
  const t = document.querySelector(`.en-t[data-pid="${pid}"]`); if (!t) return;
  const n = EN.run.laps[pid] || 0, tours = EN.e.endu.tours || 0;
  t.querySelector('.en-n').textContent = n;
  t.querySelector('.en-pb i').style.width = (tours ? Math.min(1, n / tours) * 100 : 0) + '%';
  t.classList.toggle('full', !!tours && n >= tours);
  t.setAttribute('aria-label', `${EN.c.pupils.find(x => x.id === pid)?.n || ''}, ${n} tour${n > 1 ? 's' : ''}`);
  enAgo(pid);
}
function enAgo(pid){
  const t = document.querySelector(`.en-t[data-pid="${pid}"]`); if (!t) return;
  const l = EN.run.last[pid], on = l > 0 && (EN.run.st === 'run' || EN.run.st === 'pause');
  t.querySelector('.en-ago').textContent = on ? mmss(Date.now() - l) : '';
}
function enMsg(pid, txt, cls){
  const t = document.querySelector(`.en-t[data-pid="${pid}"]`); if (!t) return;
  t.classList.remove('hit', 'dup', 'minus'); void t.offsetWidth; t.classList.add(cls);
  t.querySelector('.en-msg').textContent = txt;
  clearTimeout(t._tm); t._tm = setTimeout(() => { t.classList.remove(cls); t.querySelector('.en-msg').textContent = ''; }, cls === 'hit' ? 500 : 1100);
}
function enInfo(){
  if (!EN) return; const r = EN.run, tours = EN.e.endu.tours, full = EN.ids.filter(pid => (r.laps[pid] || 0) >= tours).length;
  $('en-info').textContent = `${EN.ids.length} élèves · ${enTot(r)} tours · ${full} ✓ 100 %`;
  const u = r.undo[r.undo.length - 1], b = $('en-undo');
  b.disabled = !u || r.st === 'sum';
  b.textContent = u ? `↶ Annuler ${enName(EN.c.pupils.find(x => x.id === u.pid) || {n: '?'})[0]} ${u.d > 0 ? '+1' : '−1'}` : '↶ Annuler';
}
function enAdd(pid, d){
  const r = EN.run, now = Date.now();
  if (r.st === 'idle'){ enMsg(pid, 'Touche GO', 'dup'); return; }
  if (r.st === 'done' || r.st === 'sum'){ enMsg(pid, 'Terminé', 'dup'); return; }
  const n = r.laps[pid] || 0;
  if (d > 0){
    if (r.last[pid] && now - r.last[pid] < 5000){ enMsg(pid, 'déjà compté', 'dup'); enBuzz(60); return; }
    r.undo.push({pid, d: 1, last0: r.last[pid] || null}); r.laps[pid] = n + 1; r.last[pid] = now; enMsg(pid, '+1', 'hit'); enClick(); enBuzz(15);
  } else {
    if (!n){ enMsg(pid, '0 tour', 'dup'); return; }
    r.undo.push({pid, d: -1, last0: r.last[pid] || null}); r.laps[pid] = n - 1; r.last[pid] = null; enMsg(pid, '−1 tour', 'minus'); enTone(300, .15, 0, .2); enBuzz([40, 60, 40]);
  }
  if (r.undo.length > 400) r.undo.splice(0, r.undo.length - 400);
  enSave(); enPaint(pid); if (r.sort) enReorder(); enInfo();
}
function enUndo(){
  const r = EN.run, u = r.undo.pop(); if (!u) return;
  r.laps[u.pid] = Math.max(0, (r.laps[u.pid] || 0) - u.d); r.last[u.pid] = u.last0;
  enSave(); enPaint(u.pid); enMsg(u.pid, u.d > 0 ? 'annulé −1' : 'annulé +1', 'minus'); if (r.sort) enReorder(); enInfo();
}
/* tri par tours : les cases glissent à leur nouvelle place (seulement quand un tour change) */
function enReorder(){
  const g = $('en-grid'), els = [...g.querySelectorAll('.en-t')], first = new Map(els.map(x => [x.dataset.pid, x.getBoundingClientRect()]));
  EN.ids = enIds(); EN.ids.forEach(pid => { const x = g.querySelector(`.en-t[data-pid="${pid}"]`); if (x) g.appendChild(x); });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  els.forEach(x => { const a = first.get(x.dataset.pid), b = x.getBoundingClientRect(), dx = a.left - b.left, dy = a.top - b.top; if (!dx && !dy) return;
    x.style.transition = 'none'; x.style.transform = `translate(${dx}px,${dy}px)`;
    requestAnimationFrame(() => requestAnimationFrame(() => { x.style.transition = 'transform .35s ease'; x.style.transform = ''; })); });
}

function enPlay(){
  const r = EN.run; enAudio();
  if (r.st === 'idle' || r.st === 'pause'){ r.st = 'run'; r.t0 = Date.now(); if (!r.started) r.started = Date.now(); enTone(1200, .12, 0, .3); }
  else if (r.st === 'run'){ r.acc += Date.now() - r.t0; r.t0 = null; r.st = 'pause'; }
  enSave(); enUI(); enTick();
}
function enStopBtn(){
  const r = EN.run, b = $('en-stop');
  if (r.st === 'done'){ enSummary(); return; }
  if (r.st === 'idle'){ enSummary(); return; }
  if (!b.classList.contains('arm')){ b.classList.add('arm'); b.textContent = 'Stop ? Toucher encore'; clearTimeout(EN.armT); EN.armT = setTimeout(() => { if (EN){ b.classList.remove('arm'); enUI(); } }, 3000); return; }
  b.classList.remove('arm');
  if (r.st === 'run'){ r.acc += Date.now() - r.t0; r.t0 = null; }
  r.st = 'done'; r.stopped = 1; enSave(); enUI(); enSummary();
}
function enUI(){
  if (!EN) return; const r = EN.run, rem = r.dur - enEl(), p = $('en-play'), root = $('en');
  p.hidden = r.st === 'done' || r.st === 'sum';
  p.textContent = r.st === 'idle' ? 'GO' : r.st === 'run' ? '⏸ Pause' : '▶ Reprendre';
  p.classList.toggle('paused', r.st === 'run');
  p.setAttribute('aria-label', r.st === 'idle' ? 'Démarrer le chrono' : r.st === 'run' ? 'Mettre en pause' : 'Reprendre le chrono');
  const stop = $('en-stop'); if (!stop.classList.contains('arm')) stop.textContent = r.st === 'done' ? 'Résumé' : '■ Stop';
  $('en-st').textContent = r.st === 'idle' ? `${fr(r.dur / 60000, 2)} min · touche GO` : r.st === 'pause' ? 'En pause' : r.st === 'done' ? 'Terminé' : rem <= 60000 ? 'Dernière minute' : 'En cours';
  root.classList.toggle('last', r.st === 'run' && rem <= 60000);
  root.classList.toggle('done', r.st === 'done');
  $('en-grid').classList.toggle('off', r.st === 'idle' || r.st === 'done');
  $('en-end').hidden = r.st !== 'done'; enInfo();
}
function enFlash(txt){ const f = $('en-flash'); if (!f) return; f.textContent = txt; f.hidden = false; clearTimeout(EN.flT); EN.flT = setTimeout(() => { if ($('en-flash')) $('en-flash').hidden = true; }, 3500); }
function enTick(){
  if (!EN) return; const r = EN.run;
  if (r.st === 'run'){
    const rem = r.dur - enEl();
    if (!r.w1 && rem <= 60000 && rem > 0 && r.dur > 60000){ r.w1 = 1; enSave(); enBeep(2); enBuzz([200, 100, 200]); enFlash('Plus qu\'une minute'); enUI(); }
    if (rem <= 0){ r.st = 'done'; r.acc = r.dur; r.t0 = null; enSave(); enBeep(3, true); enBuzz([400, 150, 400, 150, 700]); enFlash('Terminé'); enUI(); }
  }
  $('en-time').textContent = mmss(r.dur - enEl());
  if (!(EN.k++ % 4)) EN.ids.forEach(enAgo);
}

/* petites fenêtres dans le compteur */
function enAsk(html, btns){
  const a = $('en-ask'); a.hidden = false;
  a.innerHTML = `<div>${html}<div class="row2">${btns.map(([l, cl], i) => `<button class="en-btn ${cl}" type="button" data-ai="${i}">${l}</button>`).join('')}</div></div>`;
  a.querySelectorAll('[data-ai]').forEach(b => b.onclick = () => { a.hidden = true; a.innerHTML = ''; const f = btns[+b.dataset.ai][2]; if (f) f(); });
}
function enAskClose(){
  const r = EN.run;
  if (r.st === 'idle' && !enTot(r)){ enRunPut(null); enClose(); render(); return; }
  enAsk(`<b>Fermer le compteur ?</b><span class="small">Rien n'est perdu : ${r.st === 'run' ? 'le chrono continue, ' : ''}les tours restent gardés sur ce téléphone. Rouvre l'évaluation pour reprendre et enregistrer.</span>`,
    [['Rester', 'pri', null], ['Fermer', '', () => { enClose(); render(); }]]);
}
function enOptions(){
  const pop = $('en-pop'), b = $('en-opt');
  if (!pop.hidden){ pop.hidden = true; b.setAttribute('aria-expanded', 'false'); return; }
  const r = EN.run, ab = enAbsents(EN.c);
  pop.innerHTML = `<label class="toggle"><input type="checkbox" id="eo-sort" ${r.sort ? 'checked' : ''}>Trier par tours</label>
    <span class="small muted" style="margin-top:-6px">Les cases changent de place à chaque tour : attention aux mauvais touchers.</span>
    <span class="small" style="font-weight:700">Absents et dispensés du jour</span>
    <div class="row2"><button class="chip" type="button" data-eo-ex="0" aria-pressed="${!r.excl}">Inclus</button><button class="chip" type="button" data-eo-ex="1" aria-pressed="${r.excl}">Exclus</button></div>
    <span class="small muted" style="margin-top:-6px">${ab.roll ? `${ab.s.size} absent${ab.s.size > 1 ? 's' : ''} ou dispensé${ab.s.size > 1 ? 's' : ''} à l'appel d'aujourd'hui.` : 'Pas encore d\'appel aujourd\'hui pour cette classe.'}</span>
    <span class="small" style="font-weight:700">En grand sur les cases</span>
    <div class="row2"><button class="chip" type="button" data-eo-big="last" aria-pressed="${enPrefs.big !== 'first'}">Dernier mot du nom</button><button class="chip" type="button" data-eo-big="first" aria-pressed="${enPrefs.big === 'first'}">Premier mot</button></div>
    <button class="en-btn stop" type="button" id="eo-drop">Abandonner ce compteur</button>`;
  pop.hidden = false; b.setAttribute('aria-expanded', 'true');
  $('eo-sort').onchange = e => { r.sort = e.target.checked; enSave(); enGrid(); };
  pop.querySelectorAll('[data-eo-ex]').forEach(x => x.onclick = () => { r.excl = x.dataset.eoEx === '1'; enSave(); enGrid(); pop.hidden = true; enOptions(); });
  pop.querySelectorAll('[data-eo-big]').forEach(x => x.onclick = () => { enPrefs.big = x.dataset.eoBig; enPrefSave(); enGrid(); pop.hidden = true; enOptions(); });
  $('eo-drop').onclick = () => { pop.hidden = true; enAsk(`<b>Abandonner sans enregistrer ?</b><span class="small">Les ${enTot(r)} tours comptés seront perdus.</span>`, [['Non, garder', 'pri', null], ['Oui, abandonner', 'stop', () => { enRunPut(null); enClose(); render(); toast('Compteur abandonné'); }]]); };
}

/* résumé : tours corrigeables, note calculée, puis enregistrement dans l'évaluation */
function enSummary(){
  const r = EN.run, e = EN.e, max = +e.max, tours = e.endu.tours;
  $('en-pop').hidden = true;
  if (r.st === 'run'){ r.acc += Date.now() - r.t0; r.t0 = null; r.st = 'pause'; }
  const ids = pupilsOf(EN.c).map(p => p.id).filter(pid => EN.ids.includes(pid) || (r.laps[pid] || 0) > 0);
  const s = $('en-sum'); s.hidden = false;
  s.innerHTML = `<div class="en-sh"><b>Résumé · ${esc(e.name)}</b><span class="small muted">${esc(EN.c.name)} · ${tours} tours = ${fr(max, 2)}/${fr(max, 2)} · temps couru ${mmss(enEl())}. Corrige les tours si besoin, puis enregistre.</span></div>
    <div class="en-slist">${ids.map(pid => { const p = EN.c.pupils.find(x => x.id === pid), n = r.laps[pid] || 0;
      return `<div class="en-srow" data-spid="${pid}"><span class="nm">${esc(p.n)}</span><span class="en-step"><button type="button" data-sd="-1" aria-label="Un tour de moins">−</button><input class="inp num" inputmode="numeric" value="${n}" aria-label="Tours de ${esc(p.n)}"><button type="button" data-sd="1" aria-label="Un tour de plus">+</button></span><b class="sc num">${fr(enScore(n, tours, max), 1)}<small>/${fr(max, 2)}</small></b></div>`; }).join('')}</div>
    <button class="en-btn pri" type="button" id="en-save">💾 Enregistrer les points</button>
    <div class="row2"><button class="en-btn" type="button" id="en-back">↩ Retour au compteur</button><button class="en-btn stop" type="button" id="en-drop2">Abandonner</button></div>`;
  const put = (row, n) => { n = Math.max(0, Math.min(999, Math.round(n) || 0)); r.laps[row.dataset.spid] = n; row.querySelector('input').value = n;
    row.querySelector('.sc').innerHTML = `${fr(enScore(n, tours, max), 1)}<small>/${fr(max, 2)}</small>`; enSave(); };
  s.querySelectorAll('.en-srow').forEach(row => {
    row.querySelectorAll('[data-sd]').forEach(b => b.onclick = () => put(row, (r.laps[row.dataset.spid] || 0) + +b.dataset.sd));
    const inp = row.querySelector('input'); inp.onchange = () => put(row, parseNum(inp.value) || 0);
  });
  enSave(); enUI();
  $('en-back').onclick = () => { s.hidden = true; s.innerHTML = ''; if (r.st === 'done' && r.stopped && enEl() < r.dur){ r.st = 'pause'; r.stopped = 0; } EN.ids.forEach(enPaint); enSave(); enUI(); };
  $('en-drop2').onclick = () => enAsk(`<b>Abandonner sans enregistrer ?</b><span class="small">Les ${enTot(r)} tours comptés seront perdus.</span>`, [['Non, garder', 'pri', null], ['Oui, abandonner', 'stop', () => { enRunPut(null); enClose(); render(); toast('Compteur abandonné'); }]]);
  $('en-save').onclick = () => {
    s.querySelectorAll('.en-srow input').forEach(inp => { const row = inp.closest('.en-srow'); r.laps[row.dataset.spid] = Math.max(0, Math.round(parseNum(inp.value) || 0)); });
    const f = enFind(r); if (!f){ toast('Évaluation introuvable : rien enregistré'); return; }
    const {c, e: ev} = f; if (!ev.endu.laps) ev.endu.laps = {};
    ids.forEach(pid => { if (!c.pupils.some(p => p.id === pid)) return; const n = r.laps[pid] || 0; ev.endu.laps[pid] = n; ev.s[pid] = enScore(n, ev.endu.tours, +ev.max); });
    save(c.id); enRunPut(null); enClose(); render(); openEvalScores(c, ev); toast(`Points enregistrés pour ${ids.length} élève${ids.length > 1 ? 's' : ''}`);
  };
}

/* fenêtre hors compteur (reprise après rechargement, autre compteur en cours) */
function enModal(html, btns){
  document.querySelector('.en-modal')?.remove();
  const w = document.createElement('div'); w.className = 'en-modal';
  w.innerHTML = `<div role="dialog" aria-modal="true">${html}<div class="row2">${btns.map(([l, cl], i) => `<button class="btn ${cl === 'pri' ? 'pri' : cl === 'danger' ? 'danger' : ''}" type="button" data-mi="${i}">${l}</button>`).join('')}</div></div>`;
  document.body.appendChild(w);
  w.querySelectorAll('[data-mi]').forEach(b => b.onclick = () => { w.remove(); const f = btns[+b.dataset.mi][2]; if (f) f(); });
}
setTimeout(() => {
  const r = enRunGet(); if (!r || EN) return;
  const f = enFind(r); if (!f || (r.st === 'idle' && !enTot(r))){ enRunPut(null); return; }
  const left = r.dur - (r.acc + (r.st === 'run' ? Date.now() - r.t0 : 0));
  enModal(`<b>🏃 Compteur d'endurance en cours</b><span class="small">${esc(f.c.name)} · ${esc(f.e.name)} : ${enTot(r)} tours comptés${r.st === 'run' && left > 0 ? `, chrono en marche (${mmss(left)} restantes)` : r.st === 'run' || r.st === 'done' ? ', temps écoulé' : ', en pause'}.</span>`,
    [['▶ Reprendre', 'pri', () => enOpen(r.cid, r.eid)], ['Plus tard', '', null], ['Abandonner', 'danger', () => enModal('<b>Abandonner sans enregistrer ?</b><span class="small">Les tours comptés seront perdus.</span>', [['Non, garder', 'pri', null], ['Oui, abandonner', 'danger', () => { enRunPut(null); toast('Compteur abandonné'); }]])]]);
}, 500);
