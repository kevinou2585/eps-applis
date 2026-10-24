/* ====== Agenda : la semaine type (= l'horaire S.settings.tt) et ce qui a été fait à chaque cours ======
   - Horaire : S.settings.tt = [{id, d, h, h2, cls, salle?}] (le même que Réglages › Mon horaire).
   - Sport et note d'un cours daté : sur les leçons de chaque classe (l.sport, l.note).
     Avant l'appel (pas encore de leçon) : S.settings.ag['AAAA-MM-JJ|H1'] = {s, n}, repris dans les leçons au début de l'appel.
   - Sports ajoutés par l'enseignant : S.settings.sports = [noms] ; mes sports en tête de liste, dans mon ordre : S.settings.sportsOrdre = [noms].
   - Programme : compétences travaillées pendant le cours, l.prog = ['HME2', …] (absent = option pas activée) ;
     cases cochées d'office par sport, modifiables : S.settings.progSport = {sport: [codes]}.
   Tout passe par save() / save(c.id) : appareil + Drive (réglages par S.ts, classes par c.ts). */
IC.cal = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M7 13.5h2M11 13.5h2M15 13.5h2M7 17h2M11 17h2"/></svg>';
const SPORTS0 = ['Natation','Badminton','Basket-ball','Volley-ball','Football','Handball','Unihoc (floorball)','Athlétisme','Gymnastique','Acrosport',"Course d'endurance",'Tennis de table','Jeux de raquettes','Danse','Rugby (flag/tag)','Ultimate','Kin-ball','Tchoukball','Baseball/Softball','Jeux collectifs',"Jeux d'opposition / Lutte",'Escalade','Musculation / Renforcement','Condition physique','Orientation','Cirque / Jonglerie','Koh-Lanta','Évaluation'];
const lastH = d => d === 3 ? 'H5' : 'H8';          // le mercredi s'arrête à H5
const DAYS2 = ['', 'Lu', 'Ma', 'Me', 'Je', 'Ve'];
const dayName = d => (DAYS.find(x => x[0] === d) || [0, ''])[1];
const wdOf = iso => dOf(iso).getDay();
const mondayOf = iso => { const w = wdOf(iso); return addDays(iso, w === 0 ? -6 : 1 - w); };
const agToday = () => { const t = today(), w = wdOf(t); return w === 6 ? addDays(t, 2) : w === 0 ? addDays(t, 1) : t; };
const clsById = id => S.classes.find(c => c.id === id);

/* --- Sports --- */
const sportsCustom = () => Array.isArray(S.settings.sports) ? S.settings.sports : [];
const sameTxt = (a, b) => a.localeCompare(b, 'fr', {sensitivity: 'base'}) === 0;
function sportsAll(){
  const out = [...SPORTS0];
  [...sportsCustom()].sort((a, b) => a.localeCompare(b, 'fr')).forEach(s => { if (!out.some(x => sameTxt(x, s))) out.push(s); });
  return out;
}
/* Kevin : ses sports en premier, dans l'ordre qu'il choisit (les autres suivent) */
const sportsOrdre = () => { const all = sportsAll(); return (Array.isArray(S.settings.sportsOrdre) ? S.settings.sportsOrdre : []).map(s => all.find(x => sameTxt(x, s))).filter((s, i, a) => s && a.indexOf(s) === i); };
const sportsReste = () => { const o = sportsOrdre(); return sportsAll().filter(s => !o.includes(s)); };
function sportsList(){ return [...sportsOrdre(), ...sportsReste(), 'Autre']; }
function addSport(name){
  name = String(name || '').trim().replace(/\s+/g, ' '); if (!name) return null;
  const f = sportsList().find(x => sameTxt(x, name)); if (f) return f;
  S.settings.sports = [...sportsCustom(), name]; save(); return name;
}
function sportOptions(cur){
  const o = sportsOrdre(), r = [...sportsReste(), 'Autre'], all = [...o, ...r], opt = s => `<option value="${esc(s)}" ${s === cur ? 'selected' : ''}>${esc(s)}</option>`;
  return '<option value="">— Choisir —</option>' + (cur && !all.includes(cur) ? opt(cur) : '')
    + (o.length ? `<optgroup label="Mes sports">${o.map(opt).join('')}</optgroup><optgroup label="Les autres">${r.map(opt).join('')}</optgroup>` : r.map(opt).join(''))
    + '<option value="__add">➕ Ajouter un sport…</option>';
}
/* petit panneau « ⇅ Ordre » : mes sports en tête de liste, ▲ ▼ pour les ranger */
function ordreField(pre){
  return `<button class="btn ag-ordb" type="button" id="${pre}-ord" aria-expanded="false">⇅ Ordre de mes sports</button><div class="ag-ord" id="${pre}-ordp" hidden></div>`;
}
function bindOrdre(pre, onChange){
  const b = $(pre + '-ord'), pn = $(pre + '-ordp'); if (!b) return;
  const put = l => { S.settings.sportsOrdre = l; save(); draw(); if (onChange) onChange(); };
  const draw = () => { const o = sportsOrdre();
    pn.innerHTML = `<span class="small muted">Ces sports apparaissent en premier dans la liste, dans cet ordre.</span>
      ${o.length ? o.map((s, i) => `<div class="ag-ordr"><b>${i + 1}.</b><span>${esc(s)}</span><button class="ib" type="button" data-oup="${i}" ${i ? '' : 'disabled'} aria-label="Monter ${esc(s)}">▲</button><button class="ib" type="button" data-odn="${i}" ${i < o.length - 1 ? '' : 'disabled'} aria-label="Descendre ${esc(s)}">▼</button><button class="ib" type="button" data-ox="${i}" aria-label="Retirer ${esc(s)} de mes sports">${IC.x}</button></div>`).join('') : '<span class="small">Aucun pour l\'instant : ajoute tes sports ci-dessous.</span>'}
      <select class="inp" id="${pre}-ordadd" aria-label="Ajouter un sport à mes sports"><option value="">➕ Ajouter à mes sports…</option>${sportsReste().map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join('')}</select>`;
    pn.querySelectorAll('[data-oup]').forEach(x => x.onclick = () => { const l = sportsOrdre(), i = +x.dataset.oup; [l[i - 1], l[i]] = [l[i], l[i - 1]]; put(l); });
    pn.querySelectorAll('[data-odn]').forEach(x => x.onclick = () => { const l = sportsOrdre(), i = +x.dataset.odn; [l[i + 1], l[i]] = [l[i], l[i + 1]]; put(l); });
    pn.querySelectorAll('[data-ox]').forEach(x => x.onclick = () => { const l = sportsOrdre(); l.splice(+x.dataset.ox, 1); put(l); });
    $(pre + '-ordadd').onchange = e => { if (e.target.value) put([...sportsOrdre(), e.target.value]); };
  };
  b.onclick = () => { pn.hidden = !pn.hidden; b.setAttribute('aria-expanded', !pn.hidden); b.textContent = pn.hidden ? '⇅ Ordre de mes sports' : '✓ Fermer'; if (!pn.hidden) draw(); };
}
function sportField(pre, cur){
  return `<label class="f">Sport / activité<select class="inp" id="${pre}-sp">${sportOptions(cur)}</select></label>
    ${ordreField(pre)}
    <div class="row2 ag-addsp" id="${pre}-addrow" hidden><input class="inp" id="${pre}-new" placeholder="Nom du nouveau sport" style="flex:1 1 160px" autocomplete="off"><button class="btn" type="button" id="${pre}-newok">Ajouter</button></div>`;
}
function bindSportField(pre, onChange){
  const sel = $(pre + '-sp'), row = $(pre + '-addrow'), inp = $(pre + '-new'); let prev = sel.value;
  sel.onchange = () => {
    if (sel.value === '__add'){ sel.value = prev; row.hidden = false; inp.focus(); return; }
    row.hidden = true; prev = sel.value; onChange(sel.value);
  };
  const ok = () => { const n = addSport(inp.value); if (!n){ toast('Écris le nom du sport'); return; }
    sel.innerHTML = sportOptions(n); sel.value = n; prev = n; inp.value = ''; row.hidden = true; onChange(n); toast(`« ${n} » est dans ta liste`); };
  $(pre + '-newok').onclick = ok;
  bindOrdre(pre, () => { sel.innerHTML = sportOptions(sel.value); });
  inp.onkeydown = e => { if (e.key === 'Enter'){ e.preventDefault(); ok(); } };
}

/* --- Sport et note d'un cours daté --- */
const agKey = (date, h) => date + '|' + (h || '');
function agLessons(date, it, ids){
  return (ids || it.cls).map(id => { const c = clsById(id), l = c && lessonOn(c, date, it.h); return l ? [c, l] : null; }).filter(Boolean);
}
function agGet(date, it){
  const f = agLessons(date, it).find(([, l]) => l.sport || l.note || l.prog);
  if (f) return {s: f[1].sport || '', n: f[1].note || '', p: f[1].prog || null};
  const p = (S.settings.ag || {})[agKey(date, it.h)];
  return p ? {s: p.s || '', n: p.n || '', p: p.p || null, plan: true} : {s: '', n: '', p: null};
}
function agSet(date, it, ids, s, n, pr){
  const ls = agLessons(date, it, ids), k = agKey(date, it.h);
  ls.forEach(([c, l]) => { if (s) l.sport = s; else delete l.sport; if (n) l.note = n; else delete l.note; if (pr) l.prog = [...pr]; else delete l.prog; save(c.id); });
  if (ls.length < ids.length && (s || n || pr)){ if (!S.settings.ag) S.settings.ag = {}; S.settings.ag[k] = pr ? {s, n, p: [...pr]} : {s, n}; }
  else if (S.settings.ag) delete S.settings.ag[k];
  save();
}
/* au début de l'appel : ce qui avait été prévu dans l'agenda passe dans les leçons */
function agApply(date, h, cls){
  const k = agKey(date, h), p = (S.settings.ag || {})[k]; if (!p) return;
  cls.forEach(c => { const l = lessonOn(c, date, h); if (l && !l.sport && !l.note && !l.prog){ if (p.s) l.sport = p.s; if (p.n) l.note = p.n; if (p.p) l.prog = [...p.p]; save(c.id); } });
  delete S.settings.ag[k]; save();
}

/* --- Créneaux d'un jour de la semaine type --- */
function agItems(d){
  return ttView().filter(s => s.d === d && s.h && hI(s.h) >= 0).map(s => {
    const cls = s.cls.filter(id => clsById(id));
    return {...s, cls, pick: s.pick && cls.length > 1, a: hI(s.h), b: Math.max(hI(s.h), hI(s.h2 || s.h))};
  }).filter(s => s.cls.length).sort((x, y) => x.a - y.a || x.b - y.b);
}
function agClusters(items){
  const out = [];
  items.forEach(it => { const c = out.find(k => it.a <= k.b && it.b >= k.a);
    if (c){ c.items.push(it); c.a = Math.min(c.a, it.a); c.b = Math.max(c.b, it.b); } else out.push({a: it.a, b: it.b, items: [it]}); });
  return out;
}
function agState(date, it){
  const cl = it.cls.map(clsById).filter(Boolean), ls = cl.map(c => lessonOn(c, date, it.h));
  const done = it.pick ? ls.some(Boolean) : ls.every(Boolean);
  const type = (ls.find(Boolean) || {}).type || (cl[0] ? lessonType(cl[0], date, it.h) : 'salle');
  const who = it.pick ? (done ? cl.filter((c, i) => ls[i]).map(c => c.name).join(' + ') : 'Activité compl.') : clsName(it.cls);
  return {cl, ls, done, type, who, g: agGet(date, it)};
}

function agCard(date, it){
  const st = agState(date, it), n = it.b - it.a + 1;
  const lab = `${dayName(it.d)} ${slotLabel(it)}, ${st.who}${n > 1 ? ', bloc ' + n + ' heures' : ''}${st.done ? ', appel fait' : ''}${st.g.s ? ', ' + st.g.s : ''}`;
  return `<button type="button" class="ag-slot${st.done ? ' done' : ''}" data-ag="${it.id}" data-date="${date}" aria-label="${esc(lab)}">
    <span class="ag-l1"><b>${esc(slotLabel(it))}</b><span class="muted">${esc(slotTime(it))}</span>${n > 1 ? `<span class="ag-blk">Bloc ${n}h</span>` : ''}${st.done ? '<span class="ag-ok">✓ appel fait</span>' : ''}</span>
    <span class="ag-who">${esc(st.who)}</span>${it.pick && !st.done ? `<span class="small">${esc(actName(it.cls))}</span>` : ''}
    <span class="ag-tags">${st.type === 'piscine' ? `<span class="tag piscine">${IC.wave} Piscine</span>` : ''}${st.g.s ? `<span class="tag ag-sp">🏷 ${esc(st.g.s)}</span>` : ''}${st.g.p && st.g.p.length ? `<span class="tag ag-prt">📚 ${st.g.p.length} compét.</span>` : ''}${st.g.n ? `<span class="ag-note">${esc(st.g.n)}</span>` : ''}</span>
  </button>`;
}
function agMini(date, it){
  const st = agState(date, it), n = it.b - it.a + 1;
  return `<button type="button" class="ag-mini${st.done ? ' done' : ''}" data-ag="${it.id}" data-date="${date}" aria-label="${esc(`${dayName(it.d)} ${slotLabel(it)}, ${st.who}${st.done ? ', appel fait' : ''}${st.g.s ? ', ' + st.g.s : ''}`)}">
    <b>${esc(it.pick && !st.done ? 'Act.' : st.who)}</b>${n > 1 ? `<span>${n}h</span>` : ''}${st.type === 'piscine' ? `<span>${IC.wave} pisc.</span>` : ''}${st.g.s ? `<span class="sp">${esc(st.g.s)}</span>` : ''}${st.done ? '<span class="ok">✓ appel</span>' : ''}</button>`;
}

function agDayHTML(date){
  const d = wdOf(date), items = agItems(d), last = hI(lastH(d));
  const end = Math.max(last, ...items.map(it => it.b)), hrs = HOURS.slice(0, end + 1);
  const rows = [], rowOf = {};
  hrs.forEach((H, i) => {
    if (i > 0){ const gap = mins(H[1]) - mins(hrs[i - 1][2]); if (gap > 0) rows.push({brk: gap >= 40 ? 'Midi' : 'Récré'}); }
    rowOf[i] = rows.length; rows.push({i});
  });
  let h = `<div class="ag-day" style="grid-template-rows:${rows.map(r => r.brk ? '20px' : 'minmax(56px,auto)').join(' ')}">`;
  rows.forEach((r, k) => { h += r.brk ? `<div class="ag-brk" style="grid-row:${k + 1}">${r.brk}</div>`
    : `<div class="ag-h" style="grid-row:${k + 1}"><b>${hrs[r.i][0]}</b><span>${hrs[r.i][1]}</span></div>`; });
  const cov = new Set();
  agClusters(items).forEach(c => { for (let i = c.a; i <= c.b; i++) cov.add(i);
    h += `<div class="ag-cell" style="grid-row:${rowOf[c.a] + 1} / ${rowOf[c.b] + 2}">${c.items.map(it => agCard(date, it)).join('')}</div>`; });
  hrs.forEach((H, i) => { if (!cov.has(i) && i <= last) h += `<button type="button" class="ag-empty" style="grid-row:${rowOf[i] + 1}" data-agnew="${H[0]}" data-date="${date}" aria-label="Ajouter un cours le ${esc(dayName(d).toLowerCase())} à ${H[0]}">+ Ajouter un cours</button>`; });
  h += '</div>';
  if (d === 3) h += '<div class="ag-off">Mercredi : pas de cours après H5</div>';
  return h;
}
function agWeekHTML(mon){
  let h = `<div class="ag-wk" style="grid-template-rows:auto repeat(${HOURS.length},minmax(52px,auto))"><div style="grid-row:1;grid-column:1"></div>`;
  for (let d = 1; d <= 5; d++){ const iso = addDays(mon, d - 1);
    h += `<button type="button" class="ag-wd${iso === UI.agDate ? ' sel' : ''}" style="grid-row:1;grid-column:${d + 1}" data-agd="${iso}" data-agday="1" aria-label="Voir le ${esc(fmtDL(iso))}">${DAYS2[d]} ${dOf(iso).getDate()}${iso === today() ? '<i>auj.</i>' : ''}</button>`; }
  HOURS.forEach((H, i) => h += `<div class="ag-wh" style="grid-row:${i + 2}"><b>${H[0]}</b><span>${H[1]}</span></div>`);
  for (let d = 1; d <= 5; d++){
    const iso = addDays(mon, d - 1), items = agItems(d), last = hI(lastH(d)), cov = new Set();
    agClusters(items).forEach(c => { for (let i = c.a; i <= c.b; i++) cov.add(i);
      h += `<div class="ag-wc" style="grid-row:${c.a + 2} / ${c.b + 3};grid-column:${d + 1}">${c.items.map(it => agMini(iso, it)).join('')}</div>`; });
    HOURS.forEach((H, i) => { if (cov.has(i)) return;
      h += i > last ? `<div class="ag-wx" style="grid-row:${i + 2};grid-column:${d + 1}" title="Pas de cours"></div>`
        : `<button type="button" class="ag-wempty" style="grid-row:${i + 2};grid-column:${d + 1}" data-agnew="${H[0]}" data-date="${iso}" aria-label="Ajouter un cours le ${esc(dayName(d).toLowerCase())} à ${H[0]}">+</button>`; });
  }
  return h + '</div>';
}

let AGM = null; try { AGM = localStorage.getItem('carnet-eps-agenda-vue'); } catch(e){}
function renderAgenda(m){
  if (!UI.agDate || [0, 6].includes(wdOf(UI.agDate))) UI.agDate = agToday();
  const mon = mondayOf(UI.agDate), fri = addDays(mon, 4), mode = AGM || (window.innerWidth >= 720 ? 'week' : 'day');
  const a = dOf(mon), b = dOf(fri), d = wdOf(UI.agDate);
  const wl = a.getMonth() === b.getMonth() ? `du ${a.getDate()} au ${b.getDate()} ${MOISL[b.getMonth()]}` : `du ${a.getDate()} ${MOIS[a.getMonth()]} au ${b.getDate()} ${MOIS[b.getMonth()]}`;
  const isNow = mon === mondayOf(agToday());
  let h = `<section class="sec">
    <div class="ag-top"><h2>Agenda</h2><button class="btn" type="button" id="ag-today" ${isNow && UI.agDate === agToday() ? 'disabled' : ''}>Aujourd'hui</button>
      <div class="seg" role="group" aria-label="Affichage"><button type="button" data-agmode="day" aria-pressed="${mode === 'day'}">Jour</button><button type="button" data-agmode="week" aria-pressed="${mode === 'week'}">Semaine</button></div></div>
    <div class="daybar"><button class="dnav" type="button" id="ag-prev" aria-label="Semaine précédente">${IC.left}</button>
      <div class="daypick"><b>${isNow ? 'Cette semaine' : 'Semaine'}</b><span>${esc(wl)}</span><input type="date" id="ag-pick" value="${UI.agDate}" aria-label="Choisir une date"></div>
      <button class="dnav" type="button" id="ag-next" aria-label="Semaine suivante">${IC.right}</button></div>`;
  if (mode === 'week') h += agWeekHTML(mon);
  else {
    h += `<div class="ag-days">${[1, 2, 3, 4, 5].map(k => { const iso = addDays(mon, k - 1), n = agItems(k).length;
      return `<button type="button" class="ag-dchip" data-agd="${iso}" aria-pressed="${iso === UI.agDate}" aria-label="${esc(fmtDL(iso))}, ${n} cours">${iso === today() ? '<i>auj.</i>' : ''}<b>${DAYS2[k]}</b><span>${dOf(iso).getDate()}</span><small>${n ? n + ' cours' : 'libre'}</small></button>`; }).join('')}</div>
      <div class="ag-dayhd"><b>${esc(fmtDL(UI.agDate))}</b>${UI.agDate === today() ? '<span class="tag" style="background:var(--accent);color:var(--accent-ink)">aujourd\'hui</span>' : ''}</div>
      ${agDayHTML(UI.agDate)}`;
  }
  h += `<p class="small muted" style="margin:0">Touche une heure libre pour ajouter un cours à ta semaine type (chaque semaine pareil). Touche un cours pour faire l'appel et noter le sport et ce que tu as fait ce jour-là.</p></section>`;
  m.innerHTML = h;
  const go = iso => { const w = wdOf(iso); UI.agDate = w === 6 ? addDays(iso, 2) : w === 0 ? addDays(iso, 1) : iso; render(); };
  $('ag-prev').onclick = () => go(addDays(UI.agDate, -7));
  $('ag-next').onclick = () => go(addDays(UI.agDate, 7));
  $('ag-today').onclick = () => go(agToday());
  $('ag-pick').onchange = e => { if (e.target.value) go(e.target.value); };
  m.querySelectorAll('[data-agmode]').forEach(x => x.onclick = () => { AGM = x.dataset.agmode; try { localStorage.setItem('carnet-eps-agenda-vue', AGM); } catch(e){} render(); });
  m.querySelectorAll('[data-agd]').forEach(x => x.onclick = () => { if (x.dataset.agday){ AGM = 'day'; try { localStorage.setItem('carnet-eps-agenda-vue', AGM); } catch(e){} } go(x.dataset.agd); });
  m.querySelectorAll('[data-ag]').forEach(x => x.onclick = () => openAgSlot(x.dataset.date, x.dataset.ag));
  m.querySelectorAll('[data-agnew]').forEach(x => x.onclick = () => openAgEdit(x.dataset.date, x.dataset.agnew, null));
}

/* --- Feuille d'un cours (date précise) --- */
function openAgSlot(date, id){
  const d = wdOf(date), it = agItems(d).find(x => x.id === id); if (!it){ render(); return; }
  const st = agState(date, it), n = it.b - it.a + 1, g = st.g;
  let grp = it.pick ? ((st.cl.find((c, i) => st.ls[i]) || {}).id || null) : null;
  openSheet(`${fmtD(date)} · ${slotLabel(it)}`, `
    <div class="card ag-sum"><b class="ag-who">${esc(it.pick ? 'Activité complémentaire' : clsName(it.cls))}</b>
      <span class="small muted">${n > 1 ? `Bloc de ${n} heures (${esc(slotLabel(it))}) · un seul appel` : '1 heure'} · ${esc(slotTime(it))}</span>
      ${it.pick ? `<span class="small">${esc(actName(it.cls))} · un groupe par semaine</span>` : ''}
      <div class="row2" style="gap:6px">${st.type === 'piscine' ? `<span class="tag piscine">${IC.wave} Piscine</span>` : `<span class="tag salle">${IC.ball} Salle</span>`}${st.done ? '<span class="tag ag-okt">✓ Appel fait</span>' : '<span class="tag ag-todo">Appel pas encore fait</span>'}</div></div>
    ${it.pick ? `<span class="small muted">Quel groupe ce jour-là ?</span><div class="row2" id="ag-grp">${it.cls.map((cid, i) => `<button class="chip" type="button" data-grp="${cid}" aria-pressed="${cid === grp}">${esc(clsById(cid)?.name || '')}${st.ls[i] ? ' ✓' : ''}</button>`).join('')}</div>` : ''}
    <button class="btn pri block" type="button" id="ag-roll">${IC.lesson.replace('<svg', '<svg width="20" height="20"')} ${st.done ? 'Voir l\'appel' : 'Faire l\'appel'}</button>
    <div class="card sec" style="padding-block:14px"><h3>Ce cours · ${esc(fmtD(date))}</h3>
      ${sportField('ags', g.s)}
      ${progField('ags', g.p, it.cls)}
      <label class="f">Ce que j'ai fait<textarea class="inp" id="ags-note" rows="3" style="min-height:90px" placeholder="ex. échauffement, passes à deux, match 4 contre 4">${esc(g.n)}</textarea></label>${micBtn('ags-note')}
      ${st.done ? '' : '<span class="small muted">Pas encore d\'appel : c\'est gardé et repris dans l\'appel de ce cours.</span>'}
      <button class="btn block" type="button" id="ags-save">Enregistrer</button></div>
    <div class="card sec" style="padding-block:14px"><h3>Semaine type · chaque ${esc(dayName(d).toLowerCase())}</h3>
      <div class="row2"><button class="btn" type="button" id="ag-edit">✏️ Modifier l'horaire</button><button class="btn danger" type="button" id="ag-del">Supprimer</button></div>
      <div id="ag-delc"></div>
      <span class="small muted">Même horaire que Réglages › Mon horaire. Les appels déjà faits restent.</span></div>`);
  let s0 = g.s, n0 = g.n, cur = g.s, p0 = JSON.stringify(g.p || null);
  const ids = () => it.pick ? (grp ? [grp] : it.cls) : it.cls;
  const PF = bindProgField('ags', g.p, () => cur, () => keep());
  const keep = () => { const nv = $('ags-note') ? $('ags-note').value.trim() : n0, pv = JSON.stringify(PF.get());
    if (cur === s0 && nv === n0 && pv === p0) return false; agSet(date, it, ids(), cur, nv, PF.get()); s0 = cur; n0 = nv; p0 = pv; return true; };
  bindSportField('ags', v => { cur = v; PF.sport(v); keep(); });
  bindMic('ags-note');
  sheetOnClose = () => { micStop(); keep(); render(); };
  document.querySelectorAll('[data-grp]').forEach(x => x.onclick = () => { grp = x.dataset.grp; document.querySelectorAll('[data-grp]').forEach(y => y.setAttribute('aria-pressed', y === x)); });
  $('ags-save').onclick = () => { keep(); closeSheet(); toast('Enregistré'); };
  $('ag-roll').onclick = () => {
    keep();
    UI.tab = 'today'; UI.date = date; UI._moved = date !== today(); UI.sess = {date, key: 's' + it.id};
    if (it.pick && grp) UI.pick = {date, key: 's' + it.id, id: grp};
    saveUI(); closeSheet(); window.scrollTo(0, 0);
  };
  $('ag-edit').onclick = () => { keep(); openAgEdit(date, it.h, it); };
  $('ag-del').onclick = () => {
    $('ag-delc').innerHTML = `<div class="confirm"><b>Retirer ${esc(slotName(it))} du ${esc(dayName(d).toLowerCase())} ${esc(slotLabel(it))} de ton horaire ?</b><span class="small">Toutes les semaines. Les appels déjà faits et leurs notes restent.</span><div class="row2"><button class="btn" type="button" id="agd-no">Garder</button><button class="btn pri" style="background:var(--bad);border-color:var(--bad)" type="button" id="agd-yes">Supprimer</button></div></div>`;
    $('agd-no').onclick = () => $('ag-delc').innerHTML = '';
    $('agd-yes').onclick = () => { keep(); S.settings.tt = tt().filter(s => !it.ids.includes(s.id)); save(); closeSheet(); toast('Retiré de l\'horaire'); };
  };
}

/* --- Ajouter / modifier un cours de la semaine type --- */
function openAgEdit(date, h, it){
  const d = wdOf(date), dn = dayName(d), last = hI(lastH(d));
  const others = agItems(d).filter(x => !it || x.id !== it.id);
  const busy = i => others.find(x => i >= x.a && i <= x.b);
  const orig = it ? tt().find(s => s.id === it.ids[0]) || {} : {};
  const lens = [1, 2]; if (it && it.b - it.a + 1 > 2) lens.push(it.b - it.a + 1);
  let start = Math.min(hI(h), last), len = it ? it.b - it.a + 1 : 1;
  const sel = new Set(it ? it.cls : []);
  openSheet(it ? `Modifier · ${dn} ${slotLabel(it)}` : `Nouveau cours · ${dn} ${h}`, `
    <p class="small muted" style="margin:0">Chaque ${esc(dn.toLowerCase())}, toute l'année. Plusieurs classes cochées = un groupe mixte : un seul appel, des bulletins séparés.</p>
    <label class="f">Heure de début<select class="inp" id="age-h">${HOURS.slice(0, last + 1).map((H, i) => `<option value="${i}" ${i === start ? 'selected' : ''}>${H[0]} · ${H[1]}</option>`).join('')}</select></label>
    <span class="small muted" style="font-weight:600">Durée</span>
    <div class="ag-len" id="age-len">${lens.map(k => `<button type="button" class="ag-lenb" data-len="${k}" aria-pressed="${k === len}"><b>${k === 1 ? '1 heure' : `Bloc ${k}h`}</b><span data-lsub></span></button>`).join('')}</div>
    <span class="small" id="age-hint"></span>
    <span class="small muted" style="font-weight:600">Classe(s) qui ont cours</span>
    <div class="ag-cls">${S.classes.map(c => `<label class="ag-ck"><input type="checkbox" value="${c.id}" ${sel.has(c.id) ? 'checked' : ''}><span><b>${esc(c.name)}</b><small>${c.pupils.length} élève${c.pupils.length > 1 ? 's' : ''}${c.act ? ' · groupe d\'activité' : ''}</small></span></label>`).join('')}</div>
    <label class="toggle"><input type="checkbox" id="age-salle" ${orig.salle ? 'checked' : ''}>Toujours en salle, même en période piscine</label>
    <button class="btn pri block" type="button" id="age-ok">${it ? 'Enregistrer l\'horaire' : 'Ajouter à l\'horaire'}</button>`);
  const why = (s, k) => { const e = s + k - 1;
    if (e > last) return d === 3 ? 'le mercredi finit à H5' : 'la journée finit à H8';
    for (let i = s; i <= e; i++){ const b = busy(i); if (b) return `${HOURS[i][0]} déjà pris (${slotName(b)})`; }
    return ''; };
  const draw = () => {
    if (why(start, len) && len > 1) len = 1;
    document.querySelectorAll('[data-len]').forEach(x => { const k = +x.dataset.len, w = why(start, k);
      x.disabled = !!w; x.setAttribute('aria-pressed', k === len);
      x.querySelector('[data-lsub]').textContent = w ? 'Impossible : ' + w : HOURS.slice(start, start + k).map(H => H[0]).join(' + ') + ' · ' + HOURS[start][1] + '–' + HOURS[start + k - 1][2]; });
    const w = why(start, len); $('age-hint').innerHTML = w ? `<span class="ag-warn">⚠ ${esc(w)}</span>` : '';
    $('age-ok').disabled = !!w;
  };
  $('age-h').onchange = e => { start = +e.target.value; draw(); };
  document.querySelectorAll('[data-len]').forEach(x => x.onclick = () => { len = +x.dataset.len; draw(); });
  draw();
  $('age-ok').onclick = () => {
    const ids = [...document.querySelectorAll('.ag-ck input:checked')].map(x => x.value);
    if (!ids.length){ toast('Coche au moins une classe'); return; }
    if (why(start, len)){ toast(why(start, len)); return; }
    const e = {...orig, id: it ? it.ids[0] : nid('t'), d, h: HOURS[start][0], h2: HOURS[start + len - 1][0], cls: S.classes.filter(c => ids.includes(c.id)).map(c => c.id)};
    if ($('age-salle').checked) e.salle = true; else delete e.salle;
    if (it) S.settings.tt = tt().filter(s => !it.ids.includes(s.id));
    tt().push(e); save(); closeSheet(); render();
    toast(it ? 'Horaire modifié' : `Ajouté : chaque ${dn.toLowerCase()} ${slotLabel(e)}`);
  };
}

/* --- Dans l'appel : sport + ce que j'ai fait --- */
function agRollBox(Ls){
  const f = Ls.find(l => l && (l.sport || l.note)) || {};
  return `<div class="card sec" style="padding-block:14px" id="ag-rc"><h3>📝 Ce cours</h3>${sportField('rc', f.sport || '')}
    <label class="f">Ce que j'ai fait<textarea class="inp" id="rc-note" rows="3" style="min-height:80px" placeholder="ex. échauffement, passes à deux, match 4 contre 4">${esc(f.note || '')}</textarea></label>${micBtn('rc-note')}
    <span class="small muted" style="margin:0">Visible aussi dans l'onglet Agenda et le journal des leçons de la classe.</span></div>`;
}
function bindAgRoll(cls, Ls){
  if (!$('ag-rc')) return;
  const put = (k, v) => cls.forEach((c, i) => { const l = Ls[i]; if (!l) return; if (v) l[k] = v; else delete l[k]; save(c.id); });
  bindSportField('rc', v => { put('sport', v); toast(v ? 'Sport : ' + v : 'Sport retiré'); });
  const ta = $('rc-note'); let tm = null;
  const keep = () => { clearTimeout(tm); tm = null; put('note', ta.value.trim()); };
  ta.oninput = () => { clearTimeout(tm); tm = setTimeout(keep, 500); };
  ta.onblur = () => { if (tm) keep(); };
  bindMic('rc-note');
}

/* --- Dictée 🎤 : parler, le texte s'ajoute dans la case --- */
const MicRec = window.SpeechRecognition || window.webkitSpeechRecognition;
let micOn = null;
function micBtn(id){
  return `<button class="btn ag-mic" type="button" data-mic="${id}">🎤 Dicter</button>`;
}
function micStop(){ if (micOn){ try { micOn.r.stop(); } catch (e) {} } }
function bindMic(id){
  const b = document.querySelector(`[data-mic="${id}"]`), ta = $(id); if (!b || !ta) return;
  if (!MicRec){ b.onclick = () => toast('Dictée pas disponible ici : touche le micro 🎤 du clavier de ton téléphone'); return; }
  b.onclick = () => {
    if (micOn){ const was = micOn.id; micStop(); if (was === id) return; }
    const r = new MicRec(); r.lang = 'fr-FR'; r.continuous = true; r.interimResults = true;
    const base = ta.value.replace(/\s+$/, ''); let fin = '';
    const show = extra => { const t = (fin + extra).trim(); ta.value = base + (base && t ? (/[.!?]$/.test(base) ? ' ' : ' ') : '') + t; };
    r.onresult = ev => { let tmp = ''; for (let i = ev.resultIndex; i < ev.results.length; i++){ const t = ev.results[i][0].transcript; if (ev.results[i].isFinal) fin += (fin && !/^\s/.test(t) ? ' ' : '') + t; else tmp += t; } show(tmp ? ' ' + tmp : ''); };
    r.onerror = ev => { toast(ev.error === 'not-allowed' || ev.error === 'service-not-allowed' ? 'Micro refusé : autorise le micro, ou utilise le micro 🎤 du clavier' : ev.error === 'no-speech' ? 'Je n\'ai rien entendu' : 'Dictée interrompue'); };
    r.onend = () => { show(''); ta.dispatchEvent(new Event('input')); if (micOn && micOn.r === r) micOn = null; b.classList.remove('on'); b.textContent = '🎤 Dicter'; };
    try { r.start(); } catch (e) { toast('Dictée pas disponible ici : touche le micro 🎤 du clavier de ton téléphone'); return; }
    micOn = {r, id}; b.classList.add('on'); b.textContent = '⏹ Arrêter la dictée';
  };
}
function agPlanTag(date, s){
  const g = agGet(date, s); if (!g.s && !g.n) return '';
  return `<span class="small" style="font-weight:600">Prévu dans l'agenda : ${g.s ? `<span class="tag ag-sp">🏷 ${esc(g.s)}</span>` : ''} ${g.n ? esc(g.n) : ''}</span>`;
}

/* --- Journal des leçons (onglet Points de la classe) --- */
function agJournal(ls){
  if (!ls.length) return '';
  const w = ls.filter(l => l.sport || l.note).length;
  return `<details class="card ag-jr"><summary><b>📅 Journal des leçons</b><span class="small muted">${ls.length} leçon${ls.length > 1 ? 's' : ''}${w ? ` · ${w} avec sport ou note` : ''}</span></summary>
    ${[...ls].reverse().map(l => `<div class="evt"><span class="d">${esc(fmtD(l.date))}${l.h ? '<br>' + esc(slotLabel(l)) : ''}</span><span class="l">${l.sport ? `<b>${esc(l.sport)}</b>` : '<span class="muted">Sport non noté</span>'}${l.type === 'piscine' ? ' <span class="small muted">· piscine</span>' : ''}${l.note ? `<br><span class="small">${esc(l.note)}</span>` : ''}${l.prog && l.prog.length ? `<br><span class="small ag-jp">📚 ${esc(l.prog.join(' · '))}</span>` : ''}</span></div>`).join('')}</details>`;
}

/* --- Réglages : sports ajoutés --- */
function agSportsCard(){
  const cu = sportsCustom();
  return `<div class="card sec" style="padding-block:14px" id="sp-card"><h3>Sports de l'agenda</h3>
    <p class="small muted" style="margin:0">La liste de base (${SPORTS0.length} sports + Autre) est toujours là. Tes sports ajoutés :</p>
    ${cu.length ? cu.map((s, i) => `<div class="evt"><span class="l"><b>${esc(s)}</b></span><button class="ib" type="button" data-spdel="${i}" aria-label="Retirer ${esc(s)}">${IC.x}</button></div>`).join('') : '<span class="small muted">Aucun pour l\'instant.</span>'}
    <div class="row2"><input class="inp" id="sp-new" placeholder="Nouveau sport" style="flex:1 1 160px" autocomplete="off"><button class="btn" type="button" id="sp-add" style="flex:0 0 auto">Ajouter</button></div>
    <span class="small muted">Retirer un sport de la liste ne change pas les cours déjà notés.</span>
    ${ordreField('spo')}</div>`;
}
function bindAgSports(){
  document.querySelectorAll('[data-spdel]').forEach(b => b.onclick = () => { const cu = [...sportsCustom()], s = cu.splice(+b.dataset.spdel, 1)[0]; S.settings.sports = cu; save(); render(); toast(`« ${s} » retiré de la liste`); });
  const add = () => { const v = $('sp-new').value.trim(); if (!v) return; const ex = sportsList().find(x => sameTxt(x, v)); if (ex){ toast(`« ${ex} » est déjà dans la liste`); return; } addSport(v); render(); toast(`« ${v} » ajouté`); };
  bindOrdre('spo');
  $('sp-add').onclick = add; $('sp-new').onkeydown = e => { if (e.key === 'Enter') add(); };
}


/* --- Programme EPS (réseau libre, FWB) : quelles compétences ce cours a travaillées ---
   1re année : tronc commun (programme SeGEC 2025, 3 champs, 13 compétences).
   2e année et suivantes : même grille pour l'instant (les 2es passent au tronc commun S2 en septembre 2027) — à confirmer par Kevin.
   Couleurs très distinctes (bleu, orange vif, violet) et toujours le code écrit : Kevin est un peu daltonien. */
const PROG = [
  {k: 'HME', n: 'Habiletés motrices et expression', col: '#1f63d6', l: [['HME1', 'Grands mouvements fondamentaux', 'Grands mouvements'], ['HME2', "Gestes avec manipulation d'objets", 'Manipuler des objets'], ['HME3', "S'équilibrer", 'Équilibre'], ['HME4', "Se repérer dans l'espace et le temps, rythme", 'Espace, temps, rythme'], ['HME5', "S'exprimer avec son corps", 'Expression corporelle']]},
  {k: 'HSC', n: 'Habiletés sociomotrices et citoyenneté', col: '#f06400', l: [['HSC1', 'Respecter des règles, rôles, arbitrage', 'Règles, rôles, arbitrage'], ['HSC2', 'Contribuer à une réalisation commune', 'Réalisation commune'], ['HSC3', 'Interagir positivement, fair-play', 'Fair-play']]},
  {k: 'GSS', n: 'Gestion de sa santé et de la sécurité', col: '#8a3ffc', l: [['GSS1', 'Style de vie sain et actif, condition physique', 'Condition physique'], ['GSS2', 'Sécurité (dont sécurité aquatique, premiers secours)', 'Sécurité'], ['GSS3', 'Émotions et stress', 'Émotions, stress'], ['GSS4', 'Image positive de soi', 'Image de soi'], ['GSS5', 'Pensée critique santé et bien-être', 'Esprit critique santé']]}
];
const PROG_CODES = PROG.flatMap(g => g.l.map(x => x[0]));
/* cases cochées d'office selon le sport (suggestions ; Kevin peut retenir les siennes par sport) */
const PROG_SPORT0 = [
  [/basket|hand|foot|rugby|ultimate|unihoc|floorball|kin-ball|tchouk|baseball|softball|jeux collectifs/i, ['HME2', 'HME4', 'HSC1', 'HSC2', 'HSC3']],
  [/volley/i, ['HME2', 'HME4', 'HSC1', 'HSC2']],
  [/badminton|tennis|raquette/i, ['HME2', 'HME4', 'HSC1', 'HSC3']],
  [/natation|piscine/i, ['HME1', 'HME4', 'GSS1', 'GSS2']],
  [/gym|acrosport/i, ['HME1', 'HME3', 'HSC2', 'GSS2', 'GSS4']],
  [/athl/i, ['HME1', 'HME4', 'GSS1', 'GSS4']],
  [/endurance|condition physique|musculation|renforcement/i, ['HME4', 'GSS1', 'GSS3', 'GSS5']],
  [/danse|expression|cirque|jonglerie/i, ['HME4', 'HME5', 'HSC2', 'GSS4']],
  [/opposition|lutte|judo/i, ['HME1', 'HME3', 'HSC1', 'HSC3', 'GSS2', 'GSS3']],
  [/koh/i, ['HME1', 'HME2', 'HSC1', 'HSC2', 'HSC3', 'GSS3']],
  [/orientation/i, ['HME4', 'HSC2', 'GSS2']],
  [/escalade/i, ['HME1', 'HME3', 'GSS2', 'GSS3']]
];
const progSportSet = () => S.settings.progSport && typeof S.settings.progSport === 'object' ? S.settings.progSport : {};
function progDefault(sport){
  if (!sport) return [];
  const own = progSportSet()[sport]; if (Array.isArray(own)) return own.filter(k => PROG_CODES.includes(k));
  const f = PROG_SPORT0.find(([re]) => re.test(sport)); return f ? [...f[1]] : [];
}
const progYear = c => { const m = /^\s*(\d)/.exec(c && c.name || ''); return m ? +m[1] : 0; };
function progLabel(ids){
  const y = (ids || []).map(id => progYear(clsById(id))).find(Boolean) || 0;
  return y === 1 ? '1re année · tronc commun' : y ? `${y}e année · même grille que les 1res (provisoire)` : 'Grille du tronc commun';
}
function progChips(sel){
  const on = new Set(sel || []);
  return PROG.map(g => `<div class="ag-pg" style="--pc:${g.col}"><span class="ag-pgn" title="${esc(g.n)}">${g.k}</span><div class="ag-pcs">${g.l.map(([k, t, c]) => `<button type="button" class="ag-pc" data-pc="${k}" aria-pressed="${on.has(k)}" title="${esc(k + ' · ' + t)}"><b>${k}</b>${esc(c)}</button>`).join('')}</div></div>`).join('');
}
function progField(pre, sel, ids){
  const on = Array.isArray(sel);
  return `<div class="ag-prog"><label class="toggle"><input type="checkbox" id="${pre}-pon" ${on ? 'checked' : ''}>📚 Lien avec le programme</label>
    <div id="${pre}-pbox" class="ag-pbox" ${on ? '' : 'hidden'}>
      <div class="ag-psum"><span id="${pre}-psum"></span><button class="btn" type="button" id="${pre}-pedit" aria-expanded="false">✏️ Modifier</button></div>
      <div id="${pre}-pdet" class="ag-pdet" hidden><span class="small muted">${esc(progLabel(ids))} · cochées d'office selon le sport, touche pour décocher / recocher</span>
      <div id="${pre}-pcs">${progChips(sel)}</div>
      <div class="row2 ag-pdef"><button class="btn" type="button" id="${pre}-pkeep" hidden></button><button class="btn" type="button" id="${pre}-preset" hidden>↺ Suggestion de départ</button></div></div></div></div>`;
}
/* renvoie {get: liste cochée (ou null si l'option est coupée), sport(v): nouveau sport choisi} */
function bindProgField(pre, sel, sportNow, onChange){
  let cur = Array.isArray(sel) ? [...sel] : null;
  const tg = $(pre + '-pon'), box = $(pre + '-pbox'), cs = $(pre + '-pcs'), kb = $(pre + '-pkeep'), rb = $(pre + '-preset');
  const foot = () => { const sp = sportNow(), own = sp && Array.isArray(progSportSet()[sp]);
    kb.hidden = !sp || !cur || JSON.stringify([...cur].sort()) === JSON.stringify([...progDefault(sp)].sort());
    kb.textContent = `Retenir ces cases pour « ${sp} »`; rb.hidden = !own; };
  const sum = () => { $(pre + '-psum').innerHTML = cur && cur.length ? cur.map(k => { const g = PROG.find(x => k.startsWith(x.k)); return `<b class="ag-pk" style="--pc:${g.col}">${k}</b>`; }).join('') : '<span class="small muted">Aucune compétence cochée</span>'; };
  const draw = () => { cs.innerHTML = progChips(cur); sum(); foot(); };
  const ed = $(pre + '-pedit'), det = $(pre + '-pdet');
  ed.onclick = () => { det.hidden = !det.hidden; ed.setAttribute('aria-expanded', !det.hidden); ed.textContent = det.hidden ? '✏️ Modifier' : '✓ Fermer'; };
  const fill = () => { cur = progDefault(sportNow()); draw(); };
  tg.onchange = () => { box.hidden = !tg.checked; if (tg.checked){ if (!cur) fill(); } else cur = null; foot(); onChange(); };
  cs.onclick = e => { const b = e.target.closest('[data-pc]'); if (!b || !cur) return; const k = b.dataset.pc;
    cur = cur.includes(k) ? cur.filter(x => x !== k) : PROG_CODES.filter(x => x === k || cur.includes(x)); draw(); onChange(); };
  kb.onclick = () => { const sp = sportNow(); if (!sp || !cur) return; S.settings.progSport = {...progSportSet(), [sp]: [...cur]}; save(); foot(); toast(`Retenu pour « ${sp} »`); };
  rb.onclick = () => { const sp = sportNow(), o = {...progSportSet()}; delete o[sp]; S.settings.progSport = o; save(); fill(); onChange(); toast('Suggestion de départ remise'); };
  sum(); foot();
  return {get: () => cur ? [...cur] : null, sport: () => { if (cur) fill(); }};
}

/* --- Couverture du programme d'une classe sur une période (onglet Suivi) --- */
function agCouverture(c, ls){
  if (!ls.length) return '';
  const done = ls.filter(l => Array.isArray(l.prog)), n = {};
  done.forEach(l => l.prog.forEach(k => { n[k] = (n[k] || 0) + 1; }));
  const zero = PROG_CODES.filter(k => !n[k]).length, mx = Math.max(1, ...Object.values(n));
  return `<details class="card ag-jr ag-cov" ${done.length ? 'open' : ''}><summary><b>📚 Couverture du programme</b><span class="small muted">${done.length ? `${done.length} leçon${done.length > 1 ? 's' : ''} reliée${done.length > 1 ? 's' : ''} au programme${zero ? ` · ${zero} jamais travaillée${zero > 1 ? 's' : ''}` : ' · tout a été travaillé'}` : 'aucune leçon reliée'}</span></summary>
    ${done.length ? `<span class="small muted">${esc(progLabel([c.id]))}</span>` + PROG.map(g => `<div class="ag-cg" style="--pc:${g.col}"><b class="ag-cgn">${g.k} · ${esc(g.n)}</b>${g.l.map(([k, t]) => { const v = n[k] || 0;
      return `<div class="ag-cr${v ? '' : ' zero'}"><span class="ag-cc">${k}</span><span class="ag-ct">${esc(t)}</span><span class="ag-cb"><i style="width:${v / mx * 100}%"></i></span><b class="ag-cn">${v ? v + '×' : 'jamais'}</b></div>`; }).join('')}</div>`).join('')
      : '<span class="small muted">Dans l\'agenda, touche un cours, choisis le sport et active « Lien avec le programme » : la couverture de la période apparaîtra ici.</span>'}</details>`;
}
