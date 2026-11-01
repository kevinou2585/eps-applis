/* ====== Agenda : la semaine type (= l'horaire S.settings.tt) et ce qui a été fait à chaque cours ======
   - Horaire : S.settings.tt = [{id, d, h, h2, cls, salle?}] (le même que Réglages › Mon horaire).
   - Sport et note d'un cours daté : sur les leçons de chaque classe (l.sport, l.note).
     Avant l'appel (pas encore de leçon) : S.settings.ag['AAAA-MM-JJ|H1'] = {s, n}, repris dans les leçons au début de l'appel.
   - Sports ajoutés par l'enseignant : S.settings.sports = [noms] ; mes sports en tête de liste, dans mon ordre : S.settings.sportsOrdre = [noms].
   - Programme : compétences travaillées pendant le cours, l.prog = ['HME2', …] (absent = option pas activée) ;
     cases cochées d'office par sport, modifiables : S.settings.progSport = {sport: [codes]}.
   - Prépa de leçon : l.prepa = {ref, sp, an, n, t, o, mat, e, c, r, d: [min, min, min], bil} (ref = 'basket|1|3' si prise dans la bibliothèque).
     Bibliothèque (séquences de 6 leçons par année, jeux d'hiver) : carnet/prepas/*.js, chargée seulement quand on ouvre une prépa.
     En-tête imprimé (école, prof, logo) : S.settings.prepaEn. Onglet « Prépas » dans le tableau Google : prepaFeuille().
   Tout passe par save() / save(c.id) : appareil + Drive (réglages par S.ts, classes par c.ts). */
IC.cal = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M7 13.5h2M11 13.5h2M15 13.5h2M7 17h2M11 17h2"/></svg>';
/* en tête : les sports qui ont des prépas toutes faites (demande de Kevin), puis les autres */
const SPORTS0 = ['Basket-ball','Volley-ball','Handball','Natation',"Course d'endurance",'Badminton','Danse','Acrosport','Balle aux prisonniers','Athlétisme','Football','Sports divers','Unihoc (floorball)','Gymnastique','Tennis de table','Jeux de raquettes','Rugby (flag/tag)','Ultimate','Kin-ball','Tchoukball','Baseball/Softball','Jeux collectifs',"Jeux d'opposition / Lutte",'Corde à sauter','Escalade','Musculation / Renforcement','Condition physique','Orientation','Cirque / Jonglerie','Koh-Lanta','Évaluation'];
const lastH = d => d === 3 ? 'H5' : 'H8';          // le mercredi s'arrête à H5
const DAYS2 = ['', 'Lu', 'Ma', 'Me', 'Je', 'Ve'];
const dayName = d => (DAYS.find(x => x[0] === d) || [0, ''])[1];
const wdOf = iso => dOf(iso).getDay();
const mondayOf = iso => { const w = wdOf(iso); return addDays(iso, w === 0 ? -6 : 1 - w); };
const agToday = () => { const t = today(), w = wdOf(t); return w === 6 ? addDays(t, 2) : w === 0 ? addDays(t, 1) : t; };
const clsById = id => S.classes.find(c => c.id === id);

/* --- Calendrier de l'école 2026-2027 (calendrier annuel de l'Institut, sans les dates Erasmus+ à définir) ---
   Le même pour tous les profs qui ont l'appli : écrit ici, pas dans les données de chacun.
   [du, au, quoi, pour qui, remarque, o] ; o = 1 : congé (pas cours) ; o = 2 : cours suspendus. */
const CAL_ECOLE = [
  ['2026-08-24', '2026-08-24', 'Rentrée scolaire', 'Tous', ''],
  ['2026-08-28', '2026-08-28', 'Vente des livres d’occasion', 'Élèves de l’Institut', 'Porteur du projet : L. Horsmans'],
  ['2026-09-27', '2026-09-27', 'Fête de la Communauté française', 'Tous', '', 1],
  ['2026-09-28', '2026-09-28', 'Visite guidée du Parlement fédéral', '6e (2 classes)', 'De 14h30 à 16h00'],
  ['2026-09-29', '2026-09-29', 'Visite guidée du Parlement fédéral', '6e (1 classe)', 'De 14h30 à 16h00'],
  ['2026-10-02', '2026-10-02', 'Visite guidée du Parlement fédéral', '6e (2 classes)', 'De 14h30 à 16h00'],
  ['2026-10-12', '2026-10-12', 'Conseils de classe', '1re, 2e et 3e', 'Cours selon l’horaire habituel pour les 4e, 5e et 6e. Bilan de synthèse pour les élèves ayant un Dacce en 1re'],
  ['2026-10-13', '2026-10-13', 'Conseils de classe', '4e, 5e et 6e', 'Cours selon l’horaire habituel pour les 1re, 2e et 3e'],
  ['2026-10-16', '2026-10-16', 'Remise du bulletin 1 aux parents', 'Parents / élèves', 'Sur rendez-vous, à partir de 13h30. Cours suspendus à 12h05 pour tous les élèves'],
  ['2026-10-19', '2026-11-01', 'Vacances d’automne (Toussaint)', 'Tous', '', 1],
  ['2026-11-02', '2026-11-02', 'Fête des morts', 'Tous', '', 1],
  ['2026-11-11', '2026-11-11', 'Jour de l’Armistice', 'Tous', '', 1],
  ['2026-11-16', '2026-11-17', 'Matinées de jeux de rôles politiques au Parlement bruxellois', '6e', 'Sous réserve : école sur liste d’attente. Si acceptée, toute la matinée'],
  ['2026-11-19', '2026-11-19', 'Matinées de jeux de rôles politiques au Parlement bruxellois', '6e', 'Sous réserve : école sur liste d’attente. Si acceptée, toute la matinée'],
  ['2026-11-23', '2026-11-23', 'Animation CIO', '6e', 'De 9h50 à 12h00, en classe'],
  ['2026-12-15', '2026-12-17', 'Conseils de classe', 'Tous (dont 1res BS2 Dacce)', 'Cours suspendus pour tous les élèves', 2],
  ['2026-12-18', '2026-12-18', 'Rencontre avec les parents et remise du bulletin 2', 'Parents / élèves', 'Sur rendez-vous entre 10h et 12h, puis 13h et 17h30/18h00'],
  ['2026-12-21', '2027-01-03', 'Vacances d’hiver (Noël)', 'Tous', '', 1],
  ['2027-01-06', '2027-01-08', 'Journées sportives à Butgenbach', '3e', ''],
  ['2027-01-18', '2027-01-22', 'En-gaje et ses journalistes à l’institut', 'Tous', '14 plages de rencontres : 2 en matinée (H2-H3 ; H4-H5) et 1 l’après-midi (H6-H7 ou H7-H8)'],
  ['2027-02-09', '2027-02-09', 'Mardi gras', 'Tous', '', 1],
  ['2027-02-22', '2027-03-07', 'Vacances de détente (Carnaval)', 'Tous', '', 1],
  ['2027-03-25', '2027-03-25', 'Conseils de classe', '1re, 2e et 3e', 'Cours selon l’horaire habituel pour les 4e, 5e et 6e'],
  ['2027-03-26', '2027-03-26', 'Conseils de classe', '4e, 5e et 6e', 'Cours selon l’horaire habituel pour les 1re, 2e et 3e'],
  ['2027-03-29', '2027-03-29', 'Lundi de Pâques', 'Tous', '', 1],
  ['2027-03-30', '2027-03-30', 'Remise du bulletin 3', 'Tous', 'En classe'],
  ['2027-04-09', '2027-04-09', 'Rencontre des parents', 'Parents / élèves', 'Sur convocation ou rendez-vous'],
  ['2027-04-21', '2027-04-23', 'Voyage de 6e', '6e', '3 jours / 2 nuits'],
  ['2027-04-26', '2027-05-09', 'Vacances de printemps (Pâques)', 'Tous', 'Décalées par rapport à la fête de Pâques', 1],
  ['2027-05-06', '2027-05-06', 'Jeudi de l’Ascension', 'Tous', '', 1],
  ['2027-05-10', '2027-05-10', 'Plus aucune sortie de classe à partir d’aujourd’hui', 'Tous', 'Plus aucune sortie n’est programmée jusqu’à la fin de l’année'],
  ['2027-05-17', '2027-05-17', 'Lundi de Pentecôte', 'Tous', '', 1],
  ['2027-06-23', '2027-06-23', 'Dernier jour des examens', '5e et 6e', ''],
  ['2027-06-24', '2027-06-24', 'Dernier jour des examens', '1re, 2e, 3e et 4e', ''],
  ['2027-06-24', '2027-06-24', 'Conseils de classe', '5e et 6e', ''],
  ['2027-06-25', '2027-06-28', 'Conseils de classe', '1re, 2e, 3e et 4e', 'Le vendredi 25 et le lundi 28'],
  ['2027-06-29', '2027-06-29', 'Remise du bulletin 4 aux parents', 'Parents / élèves', 'Sur rendez-vous à partir de 13h00'],
  ['2027-06-29', '2027-06-29', 'Proclamation des 6e', '6e', 'En matinée, de 10h00 à 12h00'],
  ['2027-06-30', '2027-06-30', 'Consultation des copies', 'Élèves / parents', ''],
  ['2027-07-01', '2027-07-01', 'Rangement des classes et de la salle des profs, réunion en branches', 'Personnel', 'Organisation de l’année 2027-2028'],
  ['2027-07-02', '2027-07-02', 'Conseils de recours · fin de l’année scolaire', 'Personnel', ''],
  ['2027-07-03', '2027-08-29', 'Vacances d’été', 'Tous', '', 1],
  ['2027-07-09', '2027-07-09', 'Fermeture de l’école à 13h00', 'Personnel administratif', '']
].map(([a, b, t, p, r, o]) => ({a, b, t, p, r, o: o || 0}));
const calJour = iso => CAL_ECOLE.filter(e => e.a <= iso && iso <= e.b);
/* congé (ou cours suspendus) ce jour-là : l'événement, sinon null */
const calOff = iso => calJour(iso).find(e => e.o === 1) || calJour(iso).find(e => e.o === 2) || null;
/* semaine entièrement sans cours (lundi → vendredi) : le congé, sinon null */
const calOffSem = mon => { const l = [0, 1, 2, 3, 4].map(k => calOff(addDays(mon, k))); return l.every(Boolean) ? (l.find(e => e.o === 1) || l[0]) : null; };
const calQuand = e => e.a === e.b ? fmtD(e.a) : `du ${fmtD(e.a)} au ${fmtD(e.b)}`;
function calHTML(l, jours){
  if (!l.length) return '';
  return `<div class="ag-cal">${l.map(e => `<div class="ag-ce${e.o ? ' off' : ''}"><span class="ag-ci">${e.o === 1 ? '🏖' : e.o === 2 ? '⛔' : '📌'}</span><span><b>${esc(e.t)}</b>${e.p && e.p !== 'Tous' ? ` <span class="ag-cp">${esc(e.p)}</span>` : ''}${jours || e.a !== e.b ? `<br><span class="small muted">${esc(calQuand(e))}</span>` : ''}${e.r ? `<br><span class="small">${esc(e.r)}</span>` : ''}</span></div>`).join('')}</div>`;
}

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
  const f = agLessons(date, it).find(([, l]) => l.sport || l.note || l.prog || l.prepa);
  if (f) return {s: f[1].sport || '', n: f[1].note || '', p: f[1].prog || null, pp: f[1].prepa || null};
  const p = (S.settings.ag || {})[agKey(date, it.h)];
  return p ? {s: p.s || '', n: p.n || '', p: p.p || null, pp: p.pp || null, plan: true} : {s: '', n: '', p: null, pp: null};
}
function agSet(date, it, ids, s, n, pr, pp){
  const ls = agLessons(date, it, ids), k = agKey(date, it.h);
  ls.forEach(([c, l]) => { if (s) l.sport = s; else delete l.sport; if (n) l.note = n; else delete l.note; if (pr) l.prog = [...pr]; else delete l.prog;
    if (pp) l.prepa = JSON.parse(JSON.stringify(pp)); else delete l.prepa; save(c.id); });
  if (ls.length < ids.length && (s || n || pr || pp)){ if (!S.settings.ag) S.settings.ag = {}; S.settings.ag[k] = {s, n, ...(pr ? {p: [...pr]} : {}), ...(pp ? {pp: JSON.parse(JSON.stringify(pp))} : {})}; }
  else if (S.settings.ag) delete S.settings.ag[k];
  save();
}
/* au début de l'appel : ce qui avait été prévu dans l'agenda passe dans les leçons */
function agApply(date, h, cls){
  const k = agKey(date, h), p = (S.settings.ag || {})[k]; if (!p) return;
  cls.forEach(c => { const l = lessonOn(c, date, h); if (l && !l.sport && !l.note && !l.prog && !l.prepa){ if (p.s) l.sport = p.s; if (p.n) l.note = p.n; if (p.p) l.prog = [...p.p]; if (p.pp) l.prepa = JSON.parse(JSON.stringify(p.pp)); save(c.id); } });
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
    <span class="ag-tags">${st.type === 'piscine' ? `<span class="tag piscine">${IC.wave} Piscine</span>` : ''}${st.g.s ? `<span class="tag ag-sp">🏷 ${esc(st.g.s)}</span>` : agPlanned(date, it) ? `<span class="tag ag-plt">🗓 prévu : ${esc(agPlanned(date, it))}</span>` : ''}${st.g.p && st.g.p.length ? `<span class="tag ag-prt">📚 ${st.g.p.length} compét.</span>` : ''}${st.g.pp ? `<span class="tag ag-prt">📋 ${esc(prepaCourt(st.g.pp))}</span>` : ''}${st.g.n ? `<span class="ag-note">${esc(st.g.n)}</span>` : ''}</span>
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
    h += `<button type="button" class="ag-wd${iso === UI.agDate ? ' sel' : ''}${calOff(iso) ? ' off' : ''}" style="grid-row:1;grid-column:${d + 1}" data-agd="${iso}" data-agday="1" aria-label="Voir le ${esc(fmtDL(iso))}${calOff(iso) ? ', ' + esc(calOff(iso).t) : ''}">${DAYS2[d]} ${dOf(iso).getDate()}${iso === today() ? '<i>auj.</i>' : ''}</button>`;
    const off = calOff(iso); if (off) h += `<div class="ag-woff${off.o === 2 ? ' susp' : ''}" style="grid-row:2 / ${HOURS.length + 2};grid-column:${d + 1}"><span>${esc(off.o === 2 ? 'Cours suspendus' : off.t)}</span></div>`; }
  HOURS.forEach((H, i) => h += `<div class="ag-wh" style="grid-row:${i + 2}"><b>${H[0]}</b><span>${H[1]}</span></div>`);
  for (let d = 1; d <= 5; d++){
    const iso = addDays(mon, d - 1), items = agItems(d), last = hI(lastH(d)), cov = new Set();
    agClusters(items).forEach(c => { for (let i = c.a; i <= c.b; i++) cov.add(i);
      h += `<div class="ag-wc" style="grid-row:${c.a + 2} / ${c.b + 3};grid-column:${d + 1}">${c.items.map(it => agMini(iso, it)).join('')}</div>`; });
    HOURS.forEach((H, i) => { if (cov.has(i)) return;
      h += i > last ? `<div class="ag-wx" style="grid-row:${i + 2};grid-column:${d + 1}" title="Pas de cours"></div>`
        : `<button type="button" class="ag-wempty" style="grid-row:${i + 2};grid-column:${d + 1}" data-agnew="${H[0]}" data-date="${iso}" aria-label="Ajouter un cours le ${esc(dayName(d).toLowerCase())} à ${H[0]}">+</button>`; });
  }
  h += '</div>';
  const ev = []; for (let d = 0; d < 7; d++) calJour(addDays(mon, d)).forEach(e => { if (!ev.includes(e)) ev.push(e); });
  return h + (ev.length ? `<h3 class="ag-calh">À l'école cette semaine</h3>${calHTML(ev, true)}` : '');
}

let AGM = null; try { AGM = localStorage.getItem('carnet-eps-agenda-vue'); } catch(e){}
function renderAgenda(m){
  if (UI.agPlan){ renderPlanAn(m); return; }
  if (!UI.agDate || [0, 6].includes(wdOf(UI.agDate))) UI.agDate = agToday();
  const mon = mondayOf(UI.agDate), fri = addDays(mon, 4), mode = AGM || (window.innerWidth >= 720 ? 'week' : 'day');
  const a = dOf(mon), b = dOf(fri), d = wdOf(UI.agDate);
  const wl = a.getMonth() === b.getMonth() ? `du ${a.getDate()} au ${b.getDate()} ${MOISL[b.getMonth()]}` : `du ${a.getDate()} ${MOIS[a.getMonth()]} au ${b.getDate()} ${MOIS[b.getMonth()]}`;
  const isNow = mon === mondayOf(agToday());
  let h = `<section class="sec">
    <div class="ag-top"><h2>Agenda</h2><button class="btn" type="button" id="ag-today" ${isNow && UI.agDate === agToday() ? 'disabled' : ''}>Aujourd'hui</button>
      <button class="btn" type="button" id="ag-plan">📅 Planning de l'année</button><button class="btn" type="button" id="ag-prt">🖨 Mes prépas</button>
      <div class="seg" role="group" aria-label="Affichage"><button type="button" data-agmode="day" aria-pressed="${mode === 'day'}">Jour</button><button type="button" data-agmode="week" aria-pressed="${mode === 'week'}">Semaine</button></div></div>
    <div class="daybar"><button class="dnav" type="button" id="ag-prev" aria-label="Semaine précédente">${IC.left}</button>
      <div class="daypick"><b>${isNow ? 'Cette semaine' : 'Semaine'}</b><span>${esc(wl)}</span><input type="date" id="ag-pick" value="${UI.agDate}" aria-label="Choisir une date"></div>
      <button class="dnav" type="button" id="ag-next" aria-label="Semaine suivante">${IC.right}</button></div>`;
  if (mode === 'week') h += agWeekHTML(mon);
  else {
    h += `<div class="ag-days">${[1, 2, 3, 4, 5].map(k => { const iso = addDays(mon, k - 1), n = agItems(k).length;
      return `<button type="button" class="ag-dchip" data-agd="${iso}" aria-pressed="${iso === UI.agDate}" aria-label="${esc(fmtDL(iso))}, ${n} cours">${iso === today() ? '<i>auj.</i>' : ''}<b>${DAYS2[k]}</b><span>${dOf(iso).getDate()}</span><small>${calOff(iso) ? (calOff(iso).o === 2 ? 'suspendu' : 'congé') : n ? n + ' cours' : 'libre'}</small></button>`; }).join('')}</div>
      <div class="ag-dayhd"><b>${esc(fmtDL(UI.agDate))}</b>${UI.agDate === today() ? '<span class="tag" style="background:var(--accent);color:var(--accent-ink)">aujourd\'hui</span>' : ''}</div>
      ${calHTML(calJour(UI.agDate))}
      ${agDayHTML(UI.agDate)}`;
  }
  h += `<p class="small muted" style="margin:0">Touche une heure libre pour ajouter un cours à ta semaine type (chaque semaine pareil). Touche un cours pour faire l'appel et noter le sport et ce que tu as fait ce jour-là.</p></section>`;
  m.innerHTML = h;
  const go = iso => { const w = wdOf(iso); UI.agDate = w === 6 ? addDays(iso, 2) : w === 0 ? addDays(iso, 1) : iso; render(); };
  $('ag-prev').onclick = () => go(addDays(UI.agDate, -7));
  $('ag-next').onclick = () => go(addDays(UI.agDate, 7));
  $('ag-today').onclick = () => go(agToday());
  $('ag-prt').onclick = () => openPrepaPrint();
  $('ag-plan').onclick = () => { UI.agPlan = true; render(); window.scrollTo(0, 0); };
  $('ag-pick').onchange = e => { if (e.target.value) go(e.target.value); };
  m.querySelectorAll('[data-agmode]').forEach(x => x.onclick = () => { AGM = x.dataset.agmode; try { localStorage.setItem('carnet-eps-agenda-vue', AGM); } catch(e){} render(); });
  m.querySelectorAll('[data-agd]').forEach(x => x.onclick = () => { if (x.dataset.agday){ AGM = 'day'; try { localStorage.setItem('carnet-eps-agenda-vue', AGM); } catch(e){} } go(x.dataset.agd); });
  m.querySelectorAll('[data-ag]').forEach(x => x.onclick = () => openAgSlot(x.dataset.date, x.dataset.ag));
  m.querySelectorAll('[data-agnew]').forEach(x => x.onclick = () => openAgEdit(x.dataset.date, x.dataset.agnew, null));
}

function planWeekHTML(c, w){
  const wk = planWeekLessons(c, w);
  if (!wk.length) return '<span class="small muted">Aucun cours noté cette semaine.</span>';
  return wk.map(x => { const it = agItems(wdOf(x.date)).find(s => s.h === x.h && s.cls.includes(c.id));
    return `<div class="evt pl-evt"><span class="d">${esc(fmtD(x.date))}${x.h ? '<br>' + esc(x.h) : ''}</span><span class="l">${x.sport ? `<b>${esc(x.sport)}</b>` : '<span class="muted">Sport non noté</span>'}${x.pp ? `<br><span class="small">📋 ${esc(prepaCourt(x.pp))}</span>` : x.note ? `<br><span class="small">${esc(x.note)}</span>` : ''}</span>
      ${it ? `<button class="btn" type="button" data-plo-open="${x.date}|${it.id}">${x.pp ? 'Voir la prépa' : '＋ Prépa'}</button>` : ''}</div>`; }).join('');
}
const agPlanned = (date, it) => it.cls.map(id => planOf(id, date)).find(Boolean) || '';
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
      ${!g.s && agPlanned(date, it) && agPlanned(date, it) !== 'Congé' ? `<button class="btn ag-plb" type="button" id="ags-plan">🗓 Prévu au planning : <b>${esc(agPlanned(date, it))}</b> · choisir</button>` : ''}
      ${progField('ags', g.p, it.cls)}
      ${ppBtn('ags', g.pp)}${micBtn('ags-note')}
      <label class="f">Ce que j'ai fait<textarea class="inp" id="ags-note" rows="3" style="min-height:90px" placeholder="ex. échauffement, passes à deux, match 4 contre 4">${esc(g.n)}</textarea></label>
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
    if (cur === s0 && nv === n0 && pv === p0) return false; agSet(date, it, ids(), cur, nv, PF.get(), g.pp); s0 = cur; n0 = nv; p0 = pv; return true; };
  bindSportField('ags', v => { cur = v; PF.sport(v); keep(); if ($('ags-plan')) $('ags-plan').remove(); });
  if ($('ags-plan')) $('ags-plan').onclick = () => { const sp = agPlanned(date, it), sel = $('ags-sp'); if (![...sel.options].some(o => o.value === sp)) sel.innerHTML = sportOptions(sp); sel.value = sp; sel.onchange(); };
  bindMic('ags-note');
  sheetOnClose = () => { micStop(); keep(); render(); };
  document.querySelectorAll('[data-grp]').forEach(x => x.onclick = () => { grp = x.dataset.grp; document.querySelectorAll('[data-grp]').forEach(y => y.setAttribute('aria-pressed', y === x)); });
  $('ags-save').onclick = () => { keep(); closeSheet(); toast('Enregistré'); };
  $('ags-prepa').onclick = () => { keep(); micStop(); sheetOnClose = null; openPrepa(date, it.id, ids()); };
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
/* Sous l'appel : la même fenêtre « Ce cours » que dans l'agenda (Kevin, 26/10) : sport (+ ordre), prévu au planning, programme,
   sélectionner une préparation, « Lancer la prépa » et Dicter, puis ce que j'ai fait. Mêmes données (agGet / agSet) : l'agenda suit.
   Choisir un sport n'écrit rien dans « ce que j'ai fait » ; choisir une prépa y met son nom en 1re ligne (ppNote). 
   Appel hors horaire (sans heure ou pas dans la semaine type) : l'ancienne petite fiche (sport + ce que j'ai fait). */
function agRollIt(Ls, cls){
  const l0 = Ls.find(Boolean); if (!l0 || !l0.h || !cls) return null;
  return agItems(wdOf(l0.date)).find(x => x.h === l0.h && cls.every(c => x.cls.includes(c.id))) || null;
}
function agRollBox(Ls, cls){
  const it = agRollIt(Ls, cls);
  if (!it){
    const f = Ls.find(l => l && (l.sport || l.note)) || {};
    return `<div class="card sec" style="padding-block:14px" id="ag-rc"><h3>📝 Ce cours</h3>${sportField('rc', f.sport || '')}
    <label class="f">Ce que j'ai fait<textarea class="inp" id="rc-note" rows="3" style="min-height:80px" placeholder="ex. échauffement, passes à deux, match 4 contre 4">${esc(f.note || '')}</textarea></label>${micBtn('rc-note')}
    <span class="small muted" style="margin:0">Visible aussi dans l'onglet Agenda et le journal des leçons de la classe.</span></div>`;
  }
  const date = Ls.find(Boolean).date, g = agGet(date, it), pl = !g.s && agPlanned(date, it);
  return `<div class="card sec" style="padding-block:14px" id="ag-rc"><h3>📝 Ce cours · ${esc(fmtD(date))}</h3>
      ${sportField('rc', g.s)}
      ${pl && pl !== 'Congé' ? `<button class="btn ag-plb" type="button" id="rc-plan">🗓 Prévu au planning : <b>${esc(pl)}</b> · choisir</button>` : ''}
      ${progField('rc', g.p, it.cls)}
      ${ppBtn('rc', g.pp)}${micBtn('rc-note')}
      <label class="f">Ce que j'ai fait<textarea class="inp" id="rc-note" rows="3" style="min-height:90px" placeholder="ex. échauffement, passes à deux, match 4 contre 4">${esc(g.n)}</textarea></label>
      <span class="small muted" style="margin:0">La même fiche que dans l'Agenda : ce que tu changes ici change aussi là-bas.</span></div>`;
}
function bindAgRoll(cls, Ls){
  if (!$('ag-rc')) return;
  const it = agRollIt(Ls, cls), ta = $('rc-note'); let tm = null;
  if (!it){
    const put = (k, v) => cls.forEach((c, i) => { const l = Ls[i]; if (!l) return; if (v) l[k] = v; else delete l[k]; save(c.id); });
    bindSportField('rc', v => { put('sport', v); toast(v ? 'Sport : ' + v : 'Sport retiré'); });
    const keep = () => { clearTimeout(tm); tm = null; put('note', ta.value.trim()); };
    ta.oninput = () => { clearTimeout(tm); tm = setTimeout(keep, 500); };
    ta.onblur = () => { if (tm) keep(); };
    bindMic('rc-note');
    return;
  }
  const date = Ls.find(Boolean).date, ids = cls.map(c => c.id), g = agGet(date, it);
  let cur = g.s, s0 = g.s, n0 = g.n, p0 = JSON.stringify(g.p || null);
  const PF = bindProgField('rc', g.p, () => cur, () => keep());
  const keep = () => { clearTimeout(tm); tm = null; const nv = ta.value.trim(), pv = JSON.stringify(PF.get());
    if (cur === s0 && nv === n0 && pv === p0) return; agSet(date, it, ids, cur, nv, PF.get(), agGet(date, it).pp); s0 = cur; n0 = nv; p0 = pv; };
  bindSportField('rc', v => { cur = v; PF.sport(v); keep(); if ($('rc-plan')) $('rc-plan').remove(); toast(v ? 'Sport : ' + v : 'Sport retiré'); });
  if ($('rc-plan')) $('rc-plan').onclick = () => { const sp = agPlanned(date, it), sel = $('rc-sp'); if (![...sel.options].some(o => o.value === sp)) sel.innerHTML = sportOptions(sp); sel.value = sp; sel.onchange(); };
  ta.oninput = () => { clearTimeout(tm); tm = setTimeout(keep, 500); };
  ta.onblur = () => { if (tm) keep(); };
  bindMic('rc-note');
  $('rc-prepa').onclick = () => { keep(); micStop(); openPrepa(date, it.id, ids, true); };
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
    ${[...ls].reverse().map(l => `<div class="evt"><span class="d">${esc(fmtD(l.date))}${l.h ? '<br>' + esc(slotLabel(l)) : ''}</span><span class="l">${l.sport ? `<b>${esc(l.sport)}${l.dbl && l.dbl.s2 ? ' + ' + esc(l.dbl.s2) : ''}</b>` : '<span class="muted">Sport non noté</span>'}${l.type === 'piscine' ? ' <span class="small muted">· piscine</span>' : ''}${l.note ? `<br><span class="small">${esc(l.note)}</span>` : ''}${l.prog && l.prog.length ? `<br><span class="small ag-jp">📚 ${esc(l.prog.join(' · '))}</span>` : ''}${l.prepa ? `<br><span class="small ag-jp">📋 ${esc(prepaCourt(l.prepa))}</span>` : ''}</span></div>`).join('')}</details>`;
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
  [/hiver|sports? divers/i, ['HSC1', 'HSC3', 'GSS1']],
  [/basket|hand|foot|rugby|ultimate|unihoc|floorball|kin-ball|tchouk|baseball|softball|jeux collectifs|prisonnier/i, ['HME2', 'HME4', 'HSC1', 'HSC2', 'HSC3']],
  [/volley/i, ['HME2', 'HME4', 'HSC1', 'HSC2']],
  [/badminton|tennis|raquette/i, ['HME2', 'HME4', 'HSC1', 'HSC3']],
  [/natation|piscine/i, ['HME1', 'HME4', 'GSS1', 'GSS2']],
  [/gym|acrosport/i, ['HME1', 'HME3', 'HSC2', 'GSS2', 'GSS4']],
  [/athl/i, ['HME1', 'HME4', 'GSS1', 'GSS4']],
  [/endurance|condition physique|musculation|renforcement/i, ['HME4', 'GSS1', 'GSS3', 'GSS5']],
  [/danse|expression|cirque|jonglerie/i, ['HME4', 'HME5', 'HSC2', 'GSS4']],
  [/opposition|lutte|judo/i, ['HME1', 'HME3', 'HSC1', 'HSC3', 'GSS2', 'GSS3']],
  [/corde/i, ['HME1', 'HME3', 'HME4', 'GSS1']],
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

/* ====== Prépas de leçon : en-tête, échauffement, corps de leçon, retour au calme ======
   Bibliothèque chargée à la demande (carnet/prepas/<id>.js) : séquences de 6 leçons par année (1re à 6e secondaire), jeux d'hiver en une leçon.
   Format : PREPA_ADD({id, sport, an: {1: {th, comp, mat, l: [{t, o, comp?, mat?, e: [[nom, min, texte, schéma?]], c: [[nom, min, texte, réussite, variante, schéma]], r: [[nom, min, texte]]}]}}}) ; jeux d'hiver : an[0].
   Cycles : 6 leçons par cycle (5 + l'évaluation en leçon 6) ; une année peut en avoir plusieurs (l = 12 ou 18 leçons, cy = [thème de chaque cycle]).
   Leçon d'évaluation : crit = [[critère, points, indicateur]] → grille de notation (module « Évaluation de fin de cycle » plus bas). */
const PREPA_CAT = [['hiver', 'Sports divers (une leçon)', /hiver|sports? divers/i], ['basket', 'Basket-ball', /basket/i], ['volley', 'Volley-ball', /volley/i], ['hand', 'Handball', /hand/i], ['natation', 'Natation · nageurs (grande profondeur)', /natation|piscine|nage/i], ['natdeb', 'Natation · débutants (petite profondeur)', /natation|piscine|nage/i],
  ['endurance', "Course d'endurance", /endurance|course en dur/i], ['bad', 'Badminton', /badminton/i], ['danse', 'Danse', /danse/i], ['acro', 'Acrosport', /acro/i],
  ['prisonnier', 'Balle aux prisonniers', /prisonnier/i], ['athle', 'Athlétisme', /athl/i], ['foot', 'Football', /foot/i],
  ['corde', 'Corde à sauter', /corde/i], ['lutte', "Lutte (sport d'opposition)", /lutte|opposition/i]];
const PREPA_PRETS = ['hiver', 'basket', 'volley', 'hand', 'natation', 'natdeb', 'endurance', 'bad', 'danse', 'acro', 'prisonnier', 'athle', 'foot', 'corde', 'lutte'];  // bibliothèques écrites (carnet/prepas/<id>.js)
const prepaCat = () => PREPA_CAT.filter(([id]) => PREPA_PRETS.includes(id));
/* « Sports divers » (Kevin) : sports hors des grands sports. Corde et lutte = un cycle de 6 leçons valable pour toutes les années ;
   les jeux de la bibliothèque 'hiver' (une leçon chacun) sont listés un par un (valeur « hiver:N »), sans rubrique à part. */
const PREPA_DIVERS = ['corde', 'lutte', 'hiver'];
const prepaOpts = sel => { const o = ([id, n]) => `<option value="${id}" ${id === sel ? 'selected' : ''}>${esc(n)}</option>`, c = prepaCat(), H = PREPA_LIB.hiver;
  const hv = !c.some(x => x[0] === 'hiver') ? [] : H ? H.an[0].l.map((l, i) => [`hiver:${i + 1}`, l.t]).sort((a, b) => a[1].localeCompare(b[1], 'fr')) : [['hiver', 'Sports divers (une leçon)']];
  return c.filter(x => !PREPA_DIVERS.includes(x[0])).map(o).join('') + `<optgroup label="Sports divers">${PREPA_DIVERS.map(id => c.find(x => x[0] === id && id !== 'hiver')).filter(Boolean).map(o).join('')}${hv.map(o).join('')}</optgroup>`; };
// valeur d'une liste de sports → [id de la bibliothèque, n° du jeu pour « hiver:N »]
const prepaVal = v => { const m = /^hiver:(\d+)$/.exec(v || ''); return m ? ['hiver', +m[1]] : [v || '', 0]; };
const PREPA_LIB = window.PREPA_LIB = window.PREPA_LIB || {};
window.PREPA_ADD = o => { PREPA_LIB[o.id] = o; };
const prepaCatOf = sp => sp ? PREPA_CAT.find(([, , re]) => re.test(sp)) : null;
const AN_TXT = a => a ? (a === 1 ? '1re' : a + 'e') : 'toutes années';
function prepaLoad(ids){
  return Promise.all(['schemas', ...ids].filter((id, i, a) => a.indexOf(id) === i && (id === 'schemas' ? !window.PSCH : !PREPA_LIB[id]))
    .map(id => new Promise(ok => { const s = document.createElement('script'); s.src = 'prepas/' + id + '.js'; s.onload = s.onerror = () => ok(); document.head.appendChild(s); })));
}
/* cycles d'une année : 6 leçons chacun (cy = thèmes, sinon le thème de l'année) */
const ppCycles = A => Array.from({length: Math.max(1, Math.ceil(A.l.length / 6))}, (_, i) => ({k: i + 1, th: (A.cy && A.cy[i]) || A.th, de: i * 6 + 1, a: Math.min(A.l.length, i * 6 + 6)}));
const prepaRef = ref => { const [id, an, n] = String(ref || '').split('|'), L = PREPA_LIB[id], A = L && L.an && L.an[+an], l = A && A.l[+n - 1]; return l ? {L, A, l, id, an: +an, n: +n} : null; };
// bouton « Sélectionner une préparation » de la fiche Ce cours (agenda et appel)
const ppBtn = (pre, pp) => `<button class="btn block ag-ppb" type="button" id="${pre}-prepa">📋 ${pp ? `Prépa : <b>${esc(prepaCourt(pp))}</b> · changer` : 'Sélectionner une préparation'}</button>`;
/* « Ce que j'ai fait » suit la prépa choisie (Kevin, 26/10) : sa 1re ligne = la prépa, remplacée à chaque changement de prépa ;
   ce qui a été écrit ou dicté en dessous reste. Prépa effacée : la ligne part. */
function ppNote(n, old, nw){
  n = String(n || ''); const t = nw ? prepaCourt(nw) : '', o = old ? prepaCourt(old) : '', ls = n.split('\n');
  if (!n.trim()) return t;
  if (o && ls[0] === o){ if (t) ls[0] = t; else ls.shift(); return ls.join('\n').trim(); }
  return !t || ls[0] === t ? n : t + '\n' + n;
}
function prepaCourt(pp){
  if (!pp) return '';
  const hv = /^hiver\|/.test(pp.ref || '');
  return [hv ? '' : pp.sp, !hv && pp.n ? `L${pp.n}/${pp.nt || 6}` : '', pp.t].filter(Boolean).join(' · ');
}
/* une leçon de la bibliothèque → texte modifiable */
const ppLines = (items, full) => (items || []).map(([n, m, d, ok, va]) => `• ${n}${m ? ` (${m} min)` : ''} : ${d}${full && ok ? `\n   ✓ Réussite : ${ok}` : ''}${full && va ? `\n   ↻ Variante : ${va}` : ''}`).join('\n');
const ppMin = items => (items || []).reduce((a, x) => a + (+x[1] || 0), 0);
function prepaFromLib(id, an, n){
  const r = prepaRef(`${id}|${an}|${n}`); if (!r) return null; const {L, A, l} = r;
  return {ref: `${id}|${an}|${n}`, sp: L.sport, an: an || 0, n: id === 'hiver' ? 0 : n, nt: id === 'hiver' ? 0 : A.l.length, t: l.t, o: l.o || '', mat: l.mat || A.mat || L.mat || '',
    e: ppLines(l.e), c: ppLines(l.c, true), r: ppLines(l.r), d: [ppMin(l.e), ppMin(l.c), ppMin(l.r)], comp: l.comp || A.comp || [], bil: ''};
}
/* toutes les leçons datées avec une prépa : [{date, h, c (classe), l (leçon), pp}] + celles prévues avant l'appel */
function prepaAll(){
  const out = [];
  S.classes.forEach(c => c.lessons.forEach(l => { if (l.prepa) out.push({date: l.date, h: l.h, cls: [c], pp: l.prepa, prog: l.prog || null}); }));
  Object.entries(S.settings.ag || {}).forEach(([k, v]) => { if (!v.pp) return; const [date, h] = k.split('|'); const it = agItems(wdOf(date)).find(x => x.h === h);
    out.push({date, h, cls: (it ? it.cls : []).map(clsById).filter(Boolean), pp: v.pp, prog: v.p || null, plan: true}); });
  /* une même leçon pour un groupe mixte : une seule prépa, plusieurs classes */
  const m = new Map();
  out.forEach(x => { const k = x.date + '|' + x.h + '|' + (x.pp.ref || '') + '|' + x.pp.t; const y = m.get(k); if (y) x.cls.forEach(c => { if (!y.cls.includes(c)) y.cls.push(c); }); else m.set(k, {...x, cls: [...x.cls]}); });
  return [...m.values()].sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : hI(a.h || 'H1') - hI(b.h || 'H1'));
}
/* où en est ce cycle pour ces classes ? dernière leçon de la bibliothèque faite avant cette date */
function prepaSuite(ids, id, an, date){
  const done = prepaAll().filter(x => x.date < date && x.cls.some(c => ids.includes(c.id)) && String(x.pp.ref || '').startsWith(`${id}|${an}|`));
  if (!done.length) return null;
  const last = done[done.length - 1]; return {n: +last.pp.ref.split('|')[2], date: last.date, faites: new Set(done.map(x => +x.pp.ref.split('|')[2]))};
}

function openPrepa(date, slotId, ids, dansAppel){
  const d = wdOf(date), it = agItems(d).find(x => x.id === slotId); if (!it){ render(); return; }
  const g = agGet(date, it), cls = ids.map(clsById).filter(Boolean);
  const an0 = cls.map(progYear).find(Boolean) || 1;
  let pp = g.pp ? JSON.parse(JSON.stringify(g.pp)) : {ref: '', sp: g.s || '', an: an0, n: 0, t: '', o: '', mat: '', e: '', c: '', r: '', d: [10, 25, 5], bil: ''};
  let comp = Array.isArray(g.p) ? [...g.p] : (g.pp && g.pp.comp) || progDefault(g.s);
  /* sport proposé : celui du cours, sinon celui prévu au planning, sinon le dernier cycle de la classe */
  const lastPp = prepaAll().filter(x => x.date < date && x.cls.some(c => ids.includes(c.id)) && x.pp.ref && !/^hiver/.test(x.pp.ref)).pop();
  const cat0 = prepaCatOf(pp.sp || g.s || agPlanned(date, it)) || (lastPp && !g.s ? prepaCatOf(lastPp.pp.sp) : null);
  let libId = cat0 && PREPA_PRETS.includes(cat0[0]) ? cat0[0] : '', libAn = pp.an || an0;
  const title = `Prépa · ${fmtD(date)} · ${slotLabel(it)}`;
  /* durée, salle et nombre d'élèves (prepa-moteur.js) : ceux de la prépa enregistrée, sinon le cours, la salle de ce créneau et l'effectif */
  const PM = window.prepaMoteur, nEl = cls.reduce((a, c) => a + c.pupils.length, 0);
  if (PM) PM.setCtx(g.pp && g.pp.ctx || {h: it.b - it.a + 1 >= 2 ? 2 : 1, n: nEl || PM.ctx().n, sl: PM.salleDe(slotId)});
  let lastFill = g.pp && g.pp.ref ? {e: g.pp.e, c: g.pp.c, r: g.pp.r, mat: g.pp.mat} : null;
  openSheet(title, `
    <div class="card ag-sum"><b class="ag-who">${esc(clsName(ids))}</b><span class="small muted">${esc(fmtDL(date))} · ${esc(slotLabel(it))} · ${esc(slotTime(it))}${g.s ? ' · ' + esc(g.s) : ''}</span></div>
    <div class="card sec pp-lib"><h3>📚 Prépa toute faite</h3>
      <div class="row2"><label class="f" style="flex:1 1 150px">Sport<select class="inp" id="pp-lsp"><option value="">— Choisir —</option>${prepaOpts(libId === 'hiver' && /^hiver\|0\|\d+$/.test(pp.ref || '') ? 'hiver:' + pp.ref.split('|')[2] : libId)}</select></label>
      <label class="f" id="pp-lanw" style="flex:1 1 110px">Année<select class="inp" id="pp-lan">${[1, 2, 3, 4, 5, 6].map(a => `<option value="${a}" ${a === libAn ? 'selected' : ''}>${AN_TXT(a)} secondaire</option>`).join('')}</select></label></div>
      ${PM ? PM.bar('pp-x') : ''}
      <div id="pp-llist"><span class="small muted">Choisis un sport : ses leçons apparaissent ici.</span></div></div>
    <div class="card sec"><h3>En-tête</h3>
      <div class="row2"><label class="f" style="flex:2 1 180px">Sport / activité<input class="inp" id="pp-sp" value="${esc(pp.sp)}"></label>
      <label class="f" style="flex:1 1 100px">Année<select class="inp" id="pp-an">${[1, 2, 3, 4, 5, 6].map(a => `<option value="${a}" ${a === (pp.an || an0) ? 'selected' : ''}>${AN_TXT(a)}</option>`).join('')}</select></label>
      <label class="f" style="flex:1 1 90px">Leçon n°<input class="inp" id="pp-n" inputmode="numeric" value="${pp.n || ''}" placeholder="—"></label></div>
      <label class="f">Thème de la leçon<input class="inp" id="pp-t" value="${esc(pp.t)}" placeholder="ex. Passer et recevoir en mouvement"></label>
      <label class="f">Objectif(s) de la leçon<textarea class="inp" id="pp-o" rows="2" placeholder="L'élève sera capable de…">${esc(pp.o)}</textarea></label>
      <label class="f">Matériel<textarea class="inp" id="pp-mat" rows="2">${esc(pp.mat)}</textarea></label>
      <span class="small muted" style="font-weight:600">Compétences du programme · touche pour cocher / décocher</span>
      <div id="pp-pcs">${progChips(comp)}</div></div>
    ${[['e', 'Échauffement', 0], ['c', 'Corps de leçon', 1], ['r', 'Retour au calme', 2]].map(([k, n, i]) => `<div class="card sec pp-ph"><div class="pp-phh"><h3>${n}</h3><label class="pp-min"><input class="inp" id="pp-d${i}" inputmode="numeric" value="${pp.d && pp.d[i] || ''}"> min</label></div>
      <textarea class="inp" id="pp-${k}" rows="${k === 'c' ? 9 : 4}">${esc(pp[k])}</textarea><div class="pp-schs" id="pp-s${k}"></div></div>`).join('')}
    <div class="card sec"><h3>Bilan après la leçon</h3><textarea class="inp" id="pp-bil" rows="2" placeholder="Ce qui a marché, à revoir la prochaine fois…">${esc(pp.bil || '')}</textarea></div>
    <button class="btn pri block" type="button" id="pp-note" hidden>🎯 Noter cette évaluation (grille par critères)</button>
    <div class="row2"><button class="btn pri" type="button" id="pp-ok">Enregistrer la prépa</button><button class="btn" type="button" id="pp-print">🖨 Imprimer</button></div>
    <div class="row2"><button class="btn" type="button" id="pp-back">‹ Retour au cours</button><button class="btn danger" type="button" id="pp-del" ${g.pp ? '' : 'hidden'}>Effacer la prépa</button></div>
    <div id="pp-delc"></div>`);
  const F = k => $('pp-' + k);
  let live = null; const snap = () => { if (F('t')) live = read(); return live; };
  const grow = () => ['e', 'c', 'r'].forEach(k => { const t = F(k); if (t){ t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight + 4, 900) + 'px'; } });
  const read = () => ({...pp, sp: F('sp').value.trim(), an: +F('an').value, n: +F('n').value || 0, t: F('t').value.trim(), o: F('o').value.trim(), mat: F('mat').value.trim(),
    e: F('e').value.trim(), c: F('c').value.trim(), r: F('r').value.trim(), d: [0, 1, 2].map(i => +$('pp-d' + i).value || 0), bil: F('bil').value.trim(), comp: [...comp]});
  const empty = o => !o.t && !o.e && !o.c && !o.r && !o.o;
  const drawSch = () => { const r = prepaRef(pp.ref); $('pp-note').hidden = !(r && r.l.crit);
    ['e', 'c', 'r'].forEach(k => { const box = $('pp-s' + k); box.innerHTML = r && window.PSCH ? (r.l[k] || []).map(x => x[k === 'c' ? 5 : 3] ? PSCH(x[k === 'c' ? 5 : 3], esc(x[0])) : '').join('') : ''; }); };
  const pcs = $('pp-pcs');
  pcs.onclick = e => { const b = e.target.closest('[data-pc]'); if (!b) return; const k = b.dataset.pc;
    comp = comp.includes(k) ? comp.filter(x => x !== k) : PROG_CODES.filter(x => x === k || comp.includes(x)); pcs.innerHTML = progChips(comp); };
  const fill = (id, an, n, adapte) => {
    const o = prepaFromLib(id, an, n); if (!o) return;
    const go = () => { const keepBil = F('bil').value; pp = {...o, bil: keepBil}; lastFill = {e: pp.e, c: pp.c, r: pp.r, mat: pp.mat};
      ['sp', 't', 'o', 'mat', 'e', 'c', 'r'].forEach(k => F(k).value = pp[k]); F('an').value = id === 'hiver' ? (+F('an').value || an0) : an; F('n').value = pp.n || '';
      if (id === 'hiver') pp.an = +F('an').value;
      [0, 1, 2].forEach(i => $('pp-d' + i).value = pp.d[i] || ''); comp = [...pp.comp]; pcs.innerHTML = progChips(comp); drawSch(); drawList(); grow(); snap();
      if (adapte){ toast('Prépa adaptée à la durée, à la salle et aux élèves'); return; }
      toast(`${prepaCourt(pp)} : prépa remplie, tu peux la modifier`); F('t').scrollIntoView({behavior: 'smooth', block: 'center'}); };
    const cur = read(); if (empty(cur) || cur.ref === o.ref){ go(); return; }
    $('pp-llist').insertAdjacentHTML('afterbegin', `<div class="confirm" id="pp-repl"><b>Remplacer ce qui est déjà écrit par « ${esc(o.t)} » ?</b><div class="row2"><button class="btn" type="button" id="pp-rno">Garder</button><button class="btn pri" type="button" id="pp-ryes">Remplacer</button></div></div>`);
    $('pp-rno').onclick = () => $('pp-repl').remove(); $('pp-ryes').onclick = go; };
  const drawList = () => {
    const box = $('pp-llist'), L = PREPA_LIB[libId]; $('pp-lanw').hidden = PREPA_DIVERS.includes(libId);
    if (!libId){ box.innerHTML = '<span class="small muted">Choisis un sport : ses leçons apparaissent ici.</span>'; return; }
    if (!L){ box.innerHTML = '<span class="small muted">Chargement…</span>'; prepaLoad([libId]).then(() => { if (PREPA_LIB[libId]) drawList(); else box.innerHTML = '<span class="small">Pas de connexion : la bibliothèque n\'a pas pu se charger.</span>'; }); return; }
    if (PM) PM.majBar('pp-x', {pool: /^nat/.test(libId), jeux: PM.estJeux(libId), lieu: PM.lieuDe(libId)});
    if (libId === 'hiver'){
      const J = L.an[0].l, hn = prepaVal($('pp-lsp').value)[1] || +(/^hiver\|0\|(\d+)$/.exec(pp.ref || '') || [])[1] || 0;
      if (hn && J[hn - 1]){ box.innerHTML = `<div class="pp-hl"><button type="button" class="pp-lb${pp.ref === `hiver|0|${hn}` ? ' on' : ''}" data-pl="${hn}"><b>${esc(J[hn - 1].t)}</b><span>${esc(J[hn - 1].tags || '')} · une leçon</span></button></div>`; box.querySelector('[data-pl]').onclick = () => fill('hiver', 0, hn); return; }
      box.innerHTML = `<input class="inp" id="pp-hq" placeholder="Chercher un jeu (ex. ballon, cerceaux, petite salle)" autocomplete="off">
        <div class="pp-hl">${J.map((j, i) => `<button type="button" class="pp-lb${pp.ref === `hiver|0|${i + 1}` ? ' on' : ''}" data-pl="${i + 1}" data-q="${esc((j.t + ' ' + (j.tags || '') + ' ' + (j.mat || '')).toLowerCase())}"><b>${esc(j.t)}</b><span>${esc(j.tags || '')}</span></button>`).join('')}</div>`;
      $('pp-hq').oninput = e => { const q = e.target.value.toLowerCase().trim(); box.querySelectorAll('[data-pl]').forEach(b => b.hidden = q && !b.dataset.q.includes(q)); };
    } else {
      const A = L.an[libAn]; if (!A){ box.innerHTML = '<span class="small muted">Pas encore de séquence pour cette année.</span>'; return; }
      const tot = A.l.length, cys = ppCycles(A), su = prepaSuite(ids, libId, libAn, date), nx = su ? Math.min(tot, su.n + 1) : 1;
      const cyTxt = n => cys.length > 1 ? ` (cycle ${Math.ceil(n / 6)})` : '';
      box.innerHTML = `<b class="pp-th">${esc(cys.length > 1 ? `${cys.length} cycles de 6 leçons (5 leçons + 1 évaluation)` : A.th)}</b>
        ${su ? `<div class="pp-suite">${su.n >= tot ? `✓ ${cys.length > 1 ? 'Tous les cycles sont terminés' : 'Cycle terminé'} (leçon ${su.n} le ${esc(fmtD(su.date))}).` : `<span>Dernière leçon faite : <b>leçon ${su.n}</b>${cyTxt(su.n)} le ${esc(fmtD(su.date))}</span>`}
          ${su.n < tot ? `<button class="btn pri block" type="button" data-pl="${nx}">▶ ${su.n % 6 === 0 ? 'Commencer le cycle suivant' : 'Continuer le cycle'} : leçon ${nx} · ${esc(A.l[nx - 1].t)}</button>` : ''}</div>`
          : `<button class="btn pri block" type="button" data-pl="1">▶ Commencer le cycle : leçon 1 · ${esc(A.l[0].t)}</button>`}
        ${cys.map(cy => `${cys.length > 1 ? `<div class="pp-cy"><b>Cycle ${cy.k}</b><span>${esc(cy.th)}</span></div>` : ''}<div class="pp-ll">${A.l.slice(cy.de - 1, cy.a).map((l, j) => { const i = cy.de - 1 + j;
          return `<button type="button" class="pp-lb${pp.ref === `${libId}|${libAn}|${i + 1}` ? ' on' : ''}${l.crit ? ' ev' : ''}" data-pl="${i + 1}"><b>L${i + 1}</b><span>${l.crit ? '🎯 ' : ''}${esc(l.t)}</span>${su && su.faites.has(i + 1) ? '<i>✓ faite</i>' : ''}</button>`; }).join('')}</div>`).join('')}`;
    }
    box.querySelectorAll('[data-pl]').forEach(b => b.onclick = () => fill(libId, libId === 'hiver' ? 0 : libAn, +b.dataset.pl));
  };
  const sb = document.querySelector('#sheetroot .sb'); ['input', 'change', 'click'].forEach(ev => sb.addEventListener(ev, () => setTimeout(snap), true));
  setTimeout(() => { snap(); grow(); });
  $('pp-lsp').onchange = e => { const [k, hn] = prepaVal(e.target.value); libId = k; drawList(); if (hn && PREPA_LIB.hiver) fill('hiver', 0, hn); };
  $('pp-lan').onchange = e => { libAn = +e.target.value; drawList(); };
  // autre durée, salle ou effectif : la leçon de la bibliothèque est réécrite, sauf si le texte a été retouché
  if (PM) PM.bind('pp-x', () => { PM.salleDe(slotId, PM.ctx().sl); const r = prepaRef(pp.ref), cur = read(); if (libId) drawList();
    if (r && lastFill && ['e', 'c', 'r', 'mat'].every(k => cur[k] === lastFill[k])) fill(r.id, r.an, r.n, true); });
  prepaLoad(libId ? [libId] : []).then(() => { drawList(); drawSch(); });
  if (pp.ref) prepaLoad([pp.ref.split('|')[0]]).then(drawSch);
  const saveIt = given => {
    const o = given || read(); if (empty(o)){ toast('Écris au moins le thème ou une partie de la leçon'); return false; }
    const lib = prepaRef(o.ref); if (lib && o.t !== lib.l.t && !o.c.includes(lib.l.c[0] && lib.l.c[0][0] || '§')) o.ref = '';  // tout réécrit : plus de schémas de la bibliothèque
    const note = ppNote(g.n, g.pp, o); pp = o; const sport = g.s || addSport(o.sp) || o.sp;
    agSet(date, it, ids, sport, note, comp.length || Array.isArray(g.p) ? comp : null, o);
    Object.assign(g, {s: sport, n: note, p: comp, pp: o}); if ($('pp-del')) $('pp-del').hidden = false; return true; };
  $('pp-ok').onclick = () => { if (saveIt()){ toast('Prépa enregistrée'); closeSheet(); } };
  $('pp-note').onclick = () => { if (!saveIt()) return; sheetOnClose = null; closeSheet(); critFromPrepa(date, cls, pp); };
  $('pp-print').onclick = () => { const o = read(); if (empty(o)){ toast('La prépa est vide'); return; } saveIt();
    prepaPrint([{date, h: it.h, cls, pp: o, prog: comp}], `Prépa ${prepaCourt(o)}`); };
  $('pp-back').onclick = () => { const o = read(); if (!empty(o)) saveIt(); if (dansAppel){ sheetOnClose = null; closeSheet(); render(); } else openAgSlot(date, slotId); };
  $('pp-del').onclick = () => { $('pp-delc').innerHTML = `<div class="confirm"><b>Effacer la prépa de ce cours ?</b><span class="small">Le sport et la note restent.</span><div class="row2"><button class="btn" type="button" id="ppd-no">Garder</button><button class="btn pri" style="background:var(--bad);border-color:var(--bad)" type="button" id="ppd-yes">Effacer</button></div></div>`;
    $('ppd-no').onclick = () => $('pp-delc').innerHTML = '';
    $('ppd-yes').onclick = () => { agSet(date, it, ids, g.s, ppNote(g.n, g.pp, null), g.p, null); toast('Prépa effacée'); if (dansAppel){ sheetOnClose = null; closeSheet(); render(); } else openAgSlot(date, slotId); }; };
  sheetOnClose = () => { const o = live; if (o && !empty(o) && JSON.stringify(o) !== JSON.stringify(g.pp ? {...g.pp, comp: o.comp} : null)) saveIt(o); render(); };
}

/* ====== Évaluation de fin de cycle : grille par critères ======
   Une évaluation de classe comme les autres (c.evals : name, max, date, periodId, s → bulletin, Excel, Drive), avec en plus :
   crit = [{n: critère, p: points, i: indicateur}], cs = {pid: [points par critère]}, pref = leçon d'évaluation de la bibliothèque, cmax = « sur » du dernier calcul.
   Note = points obtenus ÷ total des points × « sur », au demi-point. Absent, dispensé, certificat : comme dans la feuille des notes. */
const crTot = e => e.crit.reduce((a, k) => a + (+k.p || 0), 0);
const crSum = v => (v || []).reduce((a, x) => a + (+x || 0), 0);
const crNote = (e, v) => { const T = crTot(e); return T ? Math.round(crSum(v) / T * +e.max * 2) / 2 : 0; };
const crDone = (e, pid) => { const v = (e.cs || {})[pid]; return !!v && e.crit.every((k, j) => typeof v[j] === 'number'); };
const crSteps = p => { const st = p <= 3 || p % 1 ? .5 : 1, out = []; for (let x = 0; x <= p + 1e-9; x += st) out.push(Math.round(x * 2) / 2); return out; };
function crSync(c, e){
  e.cs = e.cs || {};
  c.pupils.forEach(p => { if (crDone(e, p.id) && !evTag(e.s[p.id])) e.s[p.id] = crNote(e, e.cs[p.id]); });
  e.cmax = +e.max;
}
/* les leçons d'évaluation (avec une grille) d'un sport et d'une année */
function crLibEvals(id, an){
  const L = PREPA_LIB[id], A = L && L.an && L.an[an]; if (!A) return [];
  const ncy = Math.ceil(A.l.length / 6);
  return A.l.map((l, i) => ({L, l, ref: `${id}|${an}|${i + 1}`, n: i + 1, cy: ncy > 1 ? Math.ceil((i + 1) / 6) : 0})).filter(x => x.l.crit);
}
const crLibName = x => `${x.L.sport} · ${x.cy ? `cycle ${x.cy} · ` : ''}${x.l.t}`;

/* depuis la prépa d'une leçon d'évaluation : reprend l'évaluation déjà créée ce jour-là, sinon en crée une */
function critFromPrepa(date, cls, pp){
  cls = cls.filter(Boolean); if (!cls.length){ toast('Pas de classe pour ce cours'); return; }
  const items = cls.map(c => ({c, e: c.evals.find(e => e.crit && e.pref === pp.ref && e.date === date)})).filter(x => x.e);
  if (items.length) critOpen(items); else critNew(cls, null, {ref: pp.ref, date});
}

function critNew(cls, vp0, pre = {}){
  cls = cls.filter(Boolean); if (!cls.length){ toast('Pas de classe'); return; }
  const c0 = cls[0], multi = cls.length > 1, names = clsName(cls.map(c => c.id)), cat = prepaCat().filter(([k]) => k !== 'hiver');
  const [rid, ran] = String(pre.ref || '').split('|');
  let id = rid || (prepaCatOf((c0.lessons || []).filter(l => l.date <= today() && l.s).map(l => l.s).pop()) || [''])[0], an = +ran || progYear(c0) || 1;
  if (!cat.some(([k]) => k === id)) id = '';
  let ref = pre.ref || '', crit = [{n: '', p: 4, i: ''}], kind = 'cert', maxTouched = false, nameTouched = false;
  openSheet('Évaluation de fin de cycle', `
    <div class="card ag-sum"><b class="ag-who">${esc(names)}</b><span class="small muted">Choisis la grille, puis note chaque élève en touchant ses points, critère par critère. La note va dans le bulletin${multi ? ' de chaque classe' : ''}.</span></div>
    <div class="card sec"><h3>1. Quelle évaluation ?</h3>
      <div class="row2"><label class="f" style="flex:1 1 150px">Sport<select class="inp" id="cr-sp"><option value="">— Grille vide (je l'écris) —</option>${cat.map(([k, n]) => `<option value="${k}" ${k === id ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select></label>
      <label class="f" style="flex:1 1 110px">Année<select class="inp" id="cr-an">${[1, 2, 3, 4, 5, 6].map(a => `<option value="${a}" ${a === an ? 'selected' : ''}>${AN_TXT(a)} secondaire</option>`).join('')}</select></label></div>
      <div id="cr-ll"></div></div>
    <div class="card sec"><h3>2. Les critères</h3><p class="small muted" style="margin:0">Tu peux tout modifier : nom du critère, points, ce que tu observes.</p>
      <div id="cr-ks"></div><button class="btn block" type="button" id="cr-add">+ Ajouter un critère</button><div class="cr-tot" id="cr-tot"></div></div>
    <div class="card sec"><h3>3. Dans le bulletin</h3>
      <label class="f">Nom de l'évaluation<input class="inp" id="cr-name" placeholder="ex. Basket · évaluation de fin de cycle"></label>
      <div class="row2"><label class="f" style="flex:1">Date<input class="inp" type="date" id="cr-date" value="${esc(pre.date || today())}"></label><label class="f" style="flex:1">Note sur<input class="inp num" id="cr-max" inputmode="decimal"></label></div>
      <div class="ev-kind"><button class="chip" type="button" data-crk="cert" aria-pressed="true">✔ Certificative (compte dans le bulletin)</button><button class="chip" type="button" data-crk="form" aria-pressed="false">ℹ Formative (pour info)</button></div></div>
    <button class="btn pri block" type="button" id="cr-ok">Créer et noter les élèves ›</button>`);
  const used = new Set(cls.flatMap(c => c.evals.map(e => e.pref).filter(Boolean)));
  const drawTot = () => { const T = crit.reduce((a, k) => a + (+k.p || 0), 0);
    $('cr-tot').innerHTML = `Total : <b>${fr(T, 2)} points</b>${T && !maxTouched ? '' : T ? ` · ramené sur ${esc($('cr-max').value || '…')}` : ''}`;
    if (!maxTouched) $('cr-max').value = T ? fr(T, 2) : ''; };
  const drawKs = () => {
    $('cr-ks').innerHTML = crit.map((k, j) => `<div class="cr-k" data-k="${j}"><div class="cr-kh"><b>C${j + 1}</b><input class="inp" data-kn value="${esc(k.n)}" placeholder="Critère (ex. Passe à un partenaire démarqué)"><input class="inp num" data-kp inputmode="decimal" value="${k.p !== '' ? esc(fr(+k.p, 2)) : ''}" aria-label="Points"><span class="small">pts</span><button class="btn cr-kx" type="button" data-kx aria-label="Retirer ce critère">✕</button></div>
      <textarea class="inp" data-ki rows="2" placeholder="Ce que j'observe et comment je donne les points">${esc(k.i)}</textarea></div>`).join('');
    $('cr-ks').querySelectorAll('.cr-k').forEach(row => { const k = crit[+row.dataset.k];
      row.querySelector('[data-kn]').oninput = ev => k.n = ev.target.value;
      row.querySelector('[data-ki]').oninput = ev => k.i = ev.target.value;
      row.querySelector('[data-kp]').oninput = ev => { const v = parseNum(ev.target.value); k.p = v == null ? '' : v; drawTot(); };
      row.querySelector('[data-kx]').onclick = () => { crit.splice(+row.dataset.k, 1); if (!crit.length) crit.push({n: '', p: 4, i: ''}); drawKs(); }; });
    drawTot(); };
  let picked = false;
  const pick = x => { picked = true; ref = x.ref; crit = x.l.crit.map(([n, p, i]) => ({n, p, i: i || ''})); maxTouched = false;
    if (!nameTouched) $('cr-name').value = crLibName(x); drawKs(); drawList(); };
  const drawList = () => {
    const box = $('cr-ll');
    if (!id){ box.innerHTML = '<span class="small muted">Écris tes critères ci-dessous (ou choisis un sport pour reprendre sa grille toute faite).</span>'; return; }
    if (!PREPA_LIB[id]){ box.innerHTML = '<span class="small muted">Chargement…</span>'; prepaLoad([id]).then(() => PREPA_LIB[id] ? drawList() : box.innerHTML = '<span class="small">Pas de connexion : la grille n\'a pas pu se charger.</span>'); return; }
    const xs = crLibEvals(id, an);
    if (!xs.length){ box.innerHTML = '<span class="small muted">Pas de grille toute faite pour cette année : écris tes critères ci-dessous.</span>'; return; }
    box.innerHTML = `<div class="pp-ll">${xs.map((x, j) => `<button type="button" class="pp-lb ev${x.ref === ref ? ' on' : ''}" data-cx="${j}"><b>${x.cy ? 'C' + x.cy : 'L' + x.n}</b><span>🎯 ${esc(x.cy ? `Cycle ${x.cy} · ${x.l.t}` : x.l.t)}<small>${x.l.crit.length} critères · ${fr(x.l.crit.reduce((a, k) => a + k[1], 0), 2)} points</small></span>${used.has(x.ref) ? '<i>déjà notée</i>' : ''}</button>`).join('')}</div>`;
    box.querySelectorAll('[data-cx]').forEach(b => b.onclick = () => pick(xs[+b.dataset.cx]));
    const cur = xs.find(x => x.ref === ref);
    if (!cur) pick(xs.find(x => !used.has(x.ref)) || xs[0]); else if (!picked) pick(cur);
  };
  $('cr-sp').onchange = e => { id = e.target.value; ref = ''; if (!id){ crit = [{n: '', p: 4, i: ''}]; if (!nameTouched) $('cr-name').value = ''; drawKs(); } drawList(); };
  $('cr-an').onchange = e => { an = +e.target.value; ref = ''; drawList(); };
  $('cr-name').oninput = () => nameTouched = true;
  $('cr-max').oninput = () => { maxTouched = true; drawTot(); };
  $('cr-add').onclick = () => { crit.push({n: '', p: 4, i: ''}); drawKs(); const r = $('cr-ks').lastElementChild; if (r) r.querySelector('[data-kn]').focus(); };
  document.querySelectorAll('[data-crk]').forEach(b => b.onclick = () => { kind = b.dataset.crk; document.querySelectorAll('[data-crk]').forEach(x => x.setAttribute('aria-pressed', x === b)); });
  drawKs(); drawList(); sheetOnClose = () => render();
  $('cr-ok').onclick = () => {
    const ks = crit.map(k => ({n: k.n.trim(), p: +k.p || 0, i: k.i.trim()})).filter(k => k.n || k.i);
    if (!ks.length){ toast('Écris au moins un critère'); return; }
    const bad = ks.findIndex(k => !k.n || !(k.p > 0));
    if (bad >= 0){ toast(`Critère ${bad + 1} : il faut un nom et des points`); return; }
    const max = parseNum($('cr-max').value); if (!max || max <= 0){ $('cr-max').focus(); toast('Indique sur combien est la note'); return; }
    const date = $('cr-date').value || today(), name = $('cr-name').value.trim() || 'Évaluation de fin de cycle';
    const p0 = periodOf(c0, date) || vp0; if (!p0){ toast('Ajoute d\'abord une période (Classes › Élèves)'); return; }
    const pm = evPerMap(cls, p0), gid = nid('g'), out = [];
    cls.forEach(c => { const o = {id: nid('v'), s: {}, name, max, date, periodId: (pm.get(c.id) || periodOf(c, date) || p0).id, crit: ks.map(k => ({...k})), cs: {}, cmax: max, dec: true};
      if (ref && ks.length) o.pref = ref; if (kind === 'form') o.kind = 'form'; if (multi) o.gid = gid;
      c.evals.push(o); UI.period[c.id] = o.periodId; save(c.id); out.push({c, e: o}); });
    saveUI(); sheetOnClose = null; closeSheet(); render(); critOpen(out);
  };
}

/* noter : un élève à la fois (on touche les points de chaque critère), ou le tableau de la classe */
function critOpen(items, pid0){
  items = items.filter(({c, e}) => S.classes.includes(c) && c.evals.includes(e) && e.crit && e.crit.length); if (!items.length){ render(); return; }
  items.forEach(({c, e}) => { evCertFill(c, e); if (e.cmax !== +e.max){ crSync(c, e); save(c.id); } });
  const e0 = items[0].e, multi = items.length > 1, P = items.flatMap(({c, e}) => pupilsOf(c).map(p => ({c, e, p})));
  if (!P.length){ toast('Pas encore d\'élèves dans cette classe'); return; }
  const ok = x => crDone(x.e, x.p.id) || !!evTag(x.e.s[x.p.id]) || (typeof x.e.s[x.p.id] === 'number' && !(x.e.cs || {})[x.p.id]);
  let i = Math.max(0, P.findIndex(x => pid0 ? x.p.id === pid0 : !ok(x))), vue = 'el', tmo = null;
  const nextTodo = () => { for (let k = 1; k <= P.length; k++){ const j = (i + k) % P.length; if (!ok(P[j])) return j; } return -1; };
  const noteTxt = x => { const s = x.e.s[x.p.id], t = evTag(s); return t ? EV_TAGS[t] : typeof s === 'number' ? fr(s, 2) : ''; };
  const elHTML = () => { const {c, e, p} = P[i], v = (e.cs || {})[p.id] || [], t = evTag(e.s[p.id]), nb = P.filter(ok).length, done = crDone(e, p.id);
    return `<div class="cr-top"><button class="btn cr-nav" type="button" data-cgo="-1" ${i ? '' : 'disabled'} aria-label="Élève précédent">‹</button>
        <label class="cr-who">${avatar(p)}<span><b>${esc(p.n)}</b><span class="small muted">${multi ? esc(c.name) + ' · ' : ''}${i + 1}/${P.length} · ${nb} noté${nb > 1 ? 's' : ''}</span></span>
          <select id="cr-jump" aria-label="Aller à un élève">${P.map((x, j) => `<option value="${j}" ${j === i ? 'selected' : ''}>${ok(x) ? '✓ ' : '○ '}${esc(x.p.n)}${multi ? ' · ' + esc(x.c.name) : ''}${noteTxt(x) ? ' · ' + noteTxt(x) : ''}</option>`).join('')}</select></label>
        <button class="btn cr-nav" type="button" data-cgo="1" ${i < P.length - 1 ? '' : 'disabled'} aria-label="Élève suivant">›</button></div>
      <div class="cr-tags">${[['abs', 'Absent'], ['D', 'Dispensé'], ['CM', 'Certificat']].map(([k, l]) => `<button class="btn abs" type="button" data-ctag="${k}" aria-pressed="${t === k}">${l}</button>`).join('')}</div>
      ${t ? `<div class="card cr-off"><b>${esc(p.n)} : ${esc(evTagLong(t))}</b><span class="small">Ne compte pas dans la note. Touche à nouveau le bouton pour annuler.</span></div>`
        : e.crit.map((k, j) => `<div class="cr-c${typeof v[j] === 'number' ? ' ok' : ''}"><div class="cr-ch"><b><span>C${j + 1}</span> ${esc(k.n)}</b><em>${typeof v[j] === 'number' ? fr(v[j], 2) : '—'}/${fr(+k.p, 2)}</em></div>${k.i ? `<span class="cr-ci">${esc(k.i)}</span>` : ''}
          <div class="cr-pts">${crSteps(+k.p).map(s => `<button type="button" data-cj="${j}" data-cv="${s}" aria-pressed="${v[j] === s}">${fr(s, 2)}</button>`).join('')}</div></div>`).join('')}
      <div class="cr-sum${done ? ' ok' : ''}"><span>${t ? 'Pas de note' : done ? '✓ Note' : 'Note en cours'}</span><b>${t ? EV_TAGS[t] : `${fr(done || typeof e.s[p.id] !== 'number' ? crNote(e, v) : e.s[p.id], 2)}<small>/${fr(+e.max, 2)}</small>`}</b><span class="small">${t ? '' : `${fr(crSum(v), 2)} points sur ${fr(crTot(e), 2)}`}</span></div>
      <button class="btn pri block" type="button" id="cr-nx">${nextTodo() >= 0 ? 'Élève suivant pas encore noté ›' : '✓ Tout le monde est noté : voir le tableau'}</button>`; };
  const tbHTML = () => items.map(({c, e}) => { const ps = pupilsOf(c), vals = ps.map(p => e.s[p.id]).filter(s => typeof s === 'number'), avg = vals.length ? vals.reduce((a, x) => a + x, 0) / vals.length : null;
    return `${multi ? `<div class="lsub">${esc(c.name)}</div>` : ''}<div class="cr-tbw"><table class="cr-tb"><thead><tr><th>Élève</th>${e.crit.map((k, j) => `<th title="${esc(k.n)}">C${j + 1}<small>/${fr(+k.p, 2)}</small></th>`).join('')}<th>Note<small>/${fr(+e.max, 2)}</small></th></tr></thead>
      <tbody>${ps.map(p => { const x = P.findIndex(y => y.e === e && y.p.id === p.id), v = (e.cs || {})[p.id] || [], t = evTag(e.s[p.id]);
        return `<tr data-crow="${x}" class="${ok(P[x]) ? '' : 'todo'}"><td>${esc(p.n)}</td>${e.crit.map((k, j) => `<td>${t ? '' : typeof v[j] === 'number' ? fr(v[j], 2) : '·'}</td>`).join('')}<td><b>${noteTxt(P[x]) || '—'}</b></td></tr>`; }).join('')}</tbody>
      <tfoot><tr><td>Moyenne</td>${e.crit.map((k, j) => { const a = ps.filter(p => !evTag(e.s[p.id])).map(p => ((e.cs || {})[p.id] || [])[j]).filter(y => typeof y === 'number');
        return `<td>${a.length ? fr(a.reduce((s, y) => s + y, 0) / a.length, 1) : ''}</td>`; }).join('')}<td><b>${fr(avg, 1)}</b></td></tr></tfoot></table></div>`; }).join('')
    + `<ol class="cr-leg">${e0.crit.map(k => `<li><b>${esc(k.n)}</b> (${fr(+k.p, 2)} pts)${k.i ? ` : ${esc(k.i)}` : ''}</li>`).join('')}</ol><span class="small muted">Touche un élève pour le noter.</span>`;
  const body = () => `<div class="row2" style="align-items:center"><div class="seg cr-seg" role="group" aria-label="Affichage"><button type="button" data-cvue="el" aria-pressed="${vue === 'el'}">Élève par élève</button><button type="button" data-cvue="tb" aria-pressed="${vue === 'tb'}">Tableau</button></div>
      <button class="btn" type="button" id="cr-prt">🖨 Grille</button></div>
    <span class="small muted">${multi ? '<b>' + esc(items.map(x => x.c.name).join(' + ')) + '</b> · ' : ''}${e0.date ? esc(fmtDL(e0.date)) + ' · ' : ''}${e0.crit.length} critères, ${fr(crTot(e0), 2)} points → note sur ${fr(+e0.max, 2)}${e0.kind === 'form' ? ' · formative' : ''}</span>
    <div id="cr-v">${vue === 'el' ? elHTML() : tbHTML()}</div>`;
  openSheet('🎯 ' + e0.name, body());
  const sb = document.querySelector('.sheet .sb');
  const go = j => { clearTimeout(tmo); if (j < 0 || j >= P.length) return; i = j; vue = 'el'; draw(); const v = $('cr-v'); if (v) v.scrollIntoView({block: 'start'}); };
  const draw = () => { sb.innerHTML = body(); bind(); };
  const bind = () => {
    sb.querySelectorAll('[data-cvue]').forEach(b => b.onclick = () => { clearTimeout(tmo); vue = b.dataset.cvue; draw(); });
    $('cr-prt').onclick = () => critPrint(items);
    if (vue === 'tb'){ sb.querySelectorAll('[data-crow]').forEach(r => r.onclick = () => go(+r.dataset.crow)); return; }
    const x = P[i], {c, e, p} = x;
    sb.querySelectorAll('[data-cgo]').forEach(b => b.onclick = () => go(i + +b.dataset.cgo));
    $('cr-jump').onchange = ev => go(+ev.target.value);
    $('cr-nx').onclick = () => { const j = nextTodo(); if (j >= 0) go(j); else { vue = 'tb'; draw(); } };
    sb.querySelectorAll('[data-cj]').forEach(b => b.onclick = () => {
      const j = +b.dataset.cj, s = +b.dataset.cv, was = crDone(e, p.id); e.cs = e.cs || {};
      const v = e.cs[p.id] = e.crit.map((k, q) => (e.cs[p.id] || [])[q] ?? null);
      v[j] = v[j] === s ? null : s;
      if (crDone(e, p.id)) e.s[p.id] = crNote(e, v); else if (typeof e.s[p.id] === 'number') delete e.s[p.id];
      e.cmax = +e.max; save(c.id); draw();
      if (!was && crDone(e, p.id)){ toast(`✓ ${p.n} : ${fr(e.s[p.id], 2)}/${fr(+e.max, 2)}`); const nx = nextTodo(); if (nx >= 0) tmo = setTimeout(() => go(nx), 900); }
    });
    sb.querySelectorAll('[data-ctag]').forEach(b => b.onclick = () => { const k = b.dataset.ctag;
      if (e.s[p.id] === k){ delete e.s[p.id]; if (k === 'CM') (e.cmOff = e.cmOff || {})[p.id] = 1; if (crDone(e, p.id)) e.s[p.id] = crNote(e, e.cs[p.id]); }
      else { e.s[p.id] = k; if (e.cmOff) delete e.cmOff[p.id]; }
      save(c.id); draw(); if (evTag(e.s[p.id])){ const nx = nextTodo(); if (nx >= 0) tmo = setTimeout(() => go(nx), 700); } });
  };
  bind();
  sheetOnClose = () => { clearTimeout(tmo); render(); };
}

/* grille papier (paysage) : une page par classe, avec les points déjà donnés, ou vide pour noter au bord du terrain */
function critPrint(items){
  const en = prepaEn(); let h = '';
  items.forEach(({c, e}) => {
    h += `<article class="pr-page cr-pr"><header class="pr-hd">${en.logo ? `<img src="${esc(en.logo)}" alt="" onerror="this.remove()">` : ''}<div><b>${esc(en.ecole || '')}</b><span>Éducation physique · Grille d'évaluation</span>${en.prof ? `<span>Professeur : ${esc(en.prof)}</span>` : ''}</div>
      <div class="pr-hn"><b>${esc(c.name)}</b><span>${e.date ? esc(fmtDL(e.date)) : '…………………'}</span></div></header>
      <h2 class="cr-prt">${esc(e.name)} <small>· ${fr(crTot(e), 2)} points → note sur ${fr(+e.max, 2)}</small></h2>
      <table class="cr-prk">${e.crit.map((k, j) => `<tr><th>C${j + 1}</th><td><b>${esc(k.n)}</b> · ${fr(+k.p, 2)} pts${k.i ? ` : ${esc(k.i)}` : ''}</td></tr>`).join('')}</table>
      <table class="cr-prg"><thead><tr><th>Élève</th>${e.crit.map((k, j) => `<th>C${j + 1}<br><small>/${fr(+k.p, 2)}</small></th>`).join('')}<th>Total<br><small>/${fr(crTot(e), 2)}</small></th><th>Note<br><small>/${fr(+e.max, 2)}</small></th><th>Remarque</th></tr></thead>
      <tbody>${pupilsOf(c).map(p => { const v = (e.cs || {})[p.id] || [], t = evTag(e.s[p.id]), s = e.s[p.id];
        return `<tr><td>${esc(p.n)}</td>${e.crit.map((k, j) => `<td>${!t && typeof v[j] === 'number' ? fr(v[j], 2) : ''}</td>`).join('')}<td>${!t && crDone(e, p.id) ? fr(crSum(v), 2) : ''}</td><td>${t ? EV_TAGS[t] : typeof s === 'number' ? fr(s, 2) : ''}</td><td></td></tr>`; }).join('')}</tbody></table></article>`;
  });
  printHTML(h, `Grille · ${items[0].e.name}`, true);
}

/* --- En-tête imprimé : école, professeur, logo --- */
const PREPA_LOGO0 = 'https://www.saintlouis.be/secondaire/sites/default/files/stlouis_logo_208.png';
const prepaEn = () => ({ecole: 'Institut Saint-Louis', prof: '', logo: PREPA_LOGO0, ...(S.settings.prepaEn || {})});
const schoolYear = iso => { const d = dOf(iso), y = d.getMonth() >= 7 ? d.getFullYear() : d.getFullYear() - 1; return [y + '-08-20', (y + 1) + '-07-10', `${y}-${y + 1}`]; };

function prepaPage(x, en){
  const pp = x.pp, r = prepaRef(pp.ref), comp = (x.prog && x.prog.length ? x.prog : pp.comp) || [];
  /* à l'impression : pas les schémas « décor » (regroupement, étirements), pour tenir sur une page */
  const sch = k => r && window.PSCH ? (r.l[k] || []).map(it => { const z = it[k === 'c' ? 5 : 3]; return z && !(window.PSCH_DECOR ? PSCH_DECOR(z) : /^(explication|etirements)/.test(z)) ? PSCH(z, esc(it[0])) : ''; }).join('') : '';
  const lab = k => { for (const g of PROG) { const f = g.l.find(z => z[0] === k); if (f) return f[1]; } return ''; };
  const tot = (pp.d || []).reduce((a, b) => a + (+b || 0), 0);
  const ph = (n, i, k) => `<section class="pr-ph"><h3><span>${n}</span>${pp.d && pp.d[i] ? `<em>${pp.d[i]} min</em>` : ''}</h3><div class="pr-tx">${esc(pp[k] || '—')}</div>${sch(k) ? `<div class="pr-sch">${sch(k)}</div>` : ''}</section>`;
  return `<article class="pr-page">
    <header class="pr-hd">${en.logo ? `<img src="${esc(en.logo)}" alt="" onerror="this.remove()">` : ''}<div><b>${esc(en.ecole || '')}</b><span>Éducation physique · Préparation de leçon</span>${en.prof ? `<span>Professeur : ${esc(en.prof)}</span>` : ''}</div>
      <div class="pr-hn">${pp.n ? `<b>Leçon ${pp.n}${/^hiver/.test(pp.ref || '') ? '' : '/' + (pp.nt || 6)}</b>` : ''}<span>${esc(AN_TXT(pp.an))} secondaire</span></div></header>
    <table class="pr-tb"><tr><th>Date</th><td>${x.date ? esc(fmtDL(x.date)) : '…………………'}${x.h ? ' · ' + esc(x.h) : ''}</td><th>Classe(s)</th><td>${esc(x.cls.map(c => c.name).join(', ') || '…………')}</td></tr>
      <tr><th>Activité</th><td>${esc(pp.sp || '')}${r && r.A.th && r.id !== 'hiver' ? `<br><small>Séquence : ${esc(r.A.l.length > 6 ? `cycle ${Math.ceil(r.n / 6)} · ${ppCycles(r.A)[Math.ceil(r.n / 6) - 1].th}` : r.A.th)}</small>` : ''}</td><th>Durée</th><td>${tot ? tot + ' min de pratique' : '50 min'}</td></tr>
      <tr><th>Thème</th><td colspan="3"><b>${esc(pp.t || '')}</b></td></tr>
      <tr><th>Objectif(s)</th><td colspan="3">${esc(pp.o || '')}</td></tr>
      <tr><th>Compétences</th><td colspan="3">${comp.length ? comp.map(k => `<span class="pr-k"><b>${k}</b> ${esc(lab(k))}</span>`).join('') : '—'}</td></tr>
      <tr><th>Matériel</th><td colspan="3">${esc(pp.mat || '')}</td></tr></table>
    ${ph('Échauffement', 0, 'e')}${ph('Corps de leçon', 1, 'c')}${ph('Retour au calme', 2, 'r')}
    ${r && r.l.crit && pp.t === r.l.t ? `<section class="pr-ph pr-crit"><h3><span>Grille d'évaluation</span><em>${fr(r.l.crit.reduce((a, k) => a + k[1], 0), 2)} points</em></h3><table>${r.l.crit.map(([n, p, i]) => `<tr><th>${esc(n)}</th><td>${fr(p, 2)}</td><td>${esc(i || '')}</td></tr>`).join('')}</table></section>` : ''}
    ${pp.bil ? `<section class="pr-ph"><h3><span>Bilan</span></h3><div class="pr-tx">${esc(pp.bil)}</div></section>` : ''}
    ${r ? window.PSCH_LEGENDE || '' : ''}</article>`;
}
function prepaPrint(list, titre, avecResume){
  const en = prepaEn(), ids = [...new Set(list.map(x => String(x.pp.ref || '').split('|')[0]).filter(Boolean))];
  toast('Préparation de l\'impression…');
  prepaLoad(ids).then(() => {
    let h = '';
    if (avecResume){
      const par = {}; list.forEach(x => (par[x.pp.an || 0] = par[x.pp.an || 0] || []).push(x));
      h += `<article class="pr-page pr-cover"><header class="pr-hd">${en.logo ? `<img src="${esc(en.logo)}" alt="" onerror="this.remove()">` : ''}<div><b>${esc(en.ecole || '')}</b><span>Éducation physique</span>${en.prof ? `<span>Professeur : ${esc(en.prof)}</span>` : ''}</div></header>
        <h1>${esc(titre)}</h1><p>${list.length} leçon${list.length > 1 ? 's' : ''} préparée${list.length > 1 ? 's' : ''} · imprimé le ${esc(fmtDL(today()))}</p>
        ${Object.keys(par).sort().map(a => `<h2>${a > 0 ? esc(AN_TXT(+a)) + ' secondaire' : 'Autres'} · ${par[a].length} leçon${par[a].length > 1 ? 's' : ''}</h2>
          <table class="pr-sum"><tr><th>Date</th><th>Classe(s)</th><th>Activité</th><th>Leçon</th><th>Thème</th><th>Compétences</th></tr>
          ${par[a].map(x => `<tr><td>${esc(fmtD(x.date))}</td><td>${esc(x.cls.map(c => c.name).join(', '))}</td><td>${esc(x.pp.sp || '')}</td><td>${x.pp.n || ''}</td><td>${esc(x.pp.t || '')}</td><td>${esc(((x.prog && x.prog.length ? x.prog : x.pp.comp) || []).join(' '))}</td></tr>`).join('')}</table>`).join('')}</article>`;
      Object.keys(par).sort().forEach(a => par[a].forEach(x => h += prepaPage(x, en)));
    } else list.forEach(x => h += prepaPage(x, en));
    printHTML(h, titre);
  });
}
/* impression : la page est remplacée par #prt le temps de l'impression (Enregistrer en PDF sur téléphone) */
function printHTML(h, titre, paysage, page){
  let root = $('prt'); if (!root){ root = document.createElement('div'); root.id = 'prt'; document.body.appendChild(root); }
  root.innerHTML = h; root.classList.toggle('pr-land', !!paysage); document.documentElement.classList.add('prt');
  let st = $('prt-page'); if (!st){ st = document.createElement('style'); st.id = 'prt-page'; document.head.appendChild(st); }
  st.textContent = page || `@page{size:A4 ${paysage ? 'landscape' : 'portrait'};margin:12mm}`;
  const old = document.title; document.title = titre;
  const fin = () => { document.documentElement.classList.remove('prt'); root.innerHTML = ''; document.title = old; window.removeEventListener('afterprint', fin); };
  window.addEventListener('afterprint', fin);
  const imgs = [...root.querySelectorAll('img')].filter(i => !i.complete);
  Promise.race([Promise.all(imgs.map(i => new Promise(ok => { i.onload = i.onerror = ok; }))), new Promise(ok => setTimeout(ok, 2500))]).then(() => setTimeout(() => window.print(), 60));
}

/* --- « 🖨 Mes prépas » : tout imprimer par année (contrôle de l'inspection), en-tête, bibliothèque vierge --- */
function openPrepaPrint(){
  const en = prepaEn(), [d0, d1, sy] = schoolYear(today()), all = prepaAll();
  openSheet('Mes prépas', `
    <div class="card sec"><h3>🖨 Imprimer mes prépas</h3>
      <p class="small muted" style="margin:0">Une page de résumé par année (1re, 2e…), puis chaque prépa sur sa page. Sur téléphone, choisis « Enregistrer en PDF » ou une imprimante.</p>
      <div class="row2"><label class="f" style="flex:1 1 140px">Du<input class="inp" type="date" id="pr-d0" value="${d0}"></label><label class="f" style="flex:1 1 140px">Au<input class="inp" type="date" id="pr-d1" value="${d1}"></label></div>
      <span class="small muted" style="font-weight:600">Classes</span><div class="row2" id="pr-cls">${S.classes.map(c => `<button class="chip" type="button" data-prc="${c.id}" aria-pressed="true">${esc(c.name)}</button>`).join('')}</div>
      <span class="small" id="pr-n"></span>
      <button class="btn pri block" type="button" id="pr-go">🖨 Imprimer / PDF</button></div>
    <div class="card sec"><h3>En-tête des prépas</h3>
      <label class="f">École<input class="inp" id="pr-ec" value="${esc(en.ecole)}"></label>
      <label class="f">Professeur<input class="inp" id="pr-pf" value="${esc(en.prof)}" placeholder="Ton nom"></label>
      <div class="pr-logo">${en.logo ? `<img src="${esc(en.logo)}" alt="Logo" id="pr-lg" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'small muted',textContent:'Logo pas visible sans internet'}))">` : '<span class="small muted">Pas de logo</span>'}
        <label class="btn">Changer le logo<input type="file" accept="image/*" id="pr-lf" hidden></label>${en.logo ? '<button class="btn" type="button" id="pr-lx">Sans logo</button>' : '<button class="btn" type="button" id="pr-l0">Logo de Saint-Louis</button>'}</div></div>
    <div class="card sec"><h3>📚 Bibliothèque</h3><p class="small muted" style="margin:0">Imprimer une séquence vierge (sans date ni classe) pour la préparer ou l'emporter.</p>
      <div class="row2"><select class="inp" id="pr-bs" style="flex:2 1 150px">${prepaOpts('')}</select>
      <select class="inp" id="pr-ba" style="flex:1 1 100px">${[1, 2, 3, 4, 5, 6].map(a => `<option value="${a}">${AN_TXT(a)}</option>`).join('')}</select></div>
      <button class="btn block" type="button" id="pr-bgo">🖨 Imprimer la séquence</button>
      <p class="small muted" style="margin:6px 0 0">Ou tout le recueil pour une farde : toutes les séquences, classées par année puis par sport, avec pages de garde et onglets au bord droit.</p>
      <button class="btn block" type="button" id="pr-rec">📚 Imprimer le recueil complet</button></div>`);
  const on = new Set(S.classes.map(c => c.id));
  const pick = () => { const a = $('pr-d0').value, b = $('pr-d1').value; return all.filter(x => (!a || x.date >= a) && (!b || x.date <= b) && x.cls.some(c => on.has(c.id))); };
  const count = () => { const l = pick(), par = {}; l.forEach(x => par[x.pp.an || 0] = (par[x.pp.an || 0] || 0) + 1);
    $('pr-n').textContent = l.length ? `${l.length} prépa${l.length > 1 ? 's' : ''} : ${Object.keys(par).sort().map(a => `${a > 0 ? AN_TXT(+a) : 'autres'} ${par[a]}`).join(' · ')}` : 'Aucune prépa sur cette période : prépare un cours depuis l\'agenda (bouton 📋).';
    $('pr-go').disabled = !l.length; };
  document.querySelectorAll('[data-prc]').forEach(b => b.onclick = () => { const id = b.dataset.prc; if (on.has(id)) on.delete(id); else on.add(id); b.setAttribute('aria-pressed', on.has(id)); count(); });
  $('pr-d0').onchange = $('pr-d1').onchange = count; count();
  const putEn = o => { S.settings.prepaEn = {...prepaEn(), ...o}; save(); };
  $('pr-ec').onchange = e => putEn({ecole: e.target.value.trim()}); $('pr-pf').onchange = e => putEn({prof: e.target.value.trim()});
  if ($('pr-lx')) $('pr-lx').onclick = () => { putEn({logo: ''}); openPrepaPrint(); };
  if ($('pr-l0')) $('pr-l0').onclick = () => { putEn({logo: PREPA_LOGO0}); openPrepaPrint(); };
  $('pr-lf').onchange = e => { const f = e.target.files[0]; if (!f) return; const rd = new FileReader();
    rd.onload = () => { const im = new Image(); im.onload = () => { const k = Math.min(1, 240 / Math.max(im.width, im.height)), cv = document.createElement('canvas'); cv.width = Math.round(im.width * k); cv.height = Math.round(im.height * k);
      cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height); putEn({logo: cv.toDataURL('image/png')}); openPrepaPrint(); toast('Logo changé'); }; im.src = rd.result; }; rd.readAsDataURL(f); };
  $('pr-go').onclick = () => prepaPrint(pick(), `Préparations EPS ${sy}${prepaEn().prof ? ' · ' + prepaEn().prof : ''}`, true);
  $('pr-rec').onclick = () => prepaRecueil();
  $('pr-bgo').onclick = () => { const [id, hn] = prepaVal($('pr-bs').value), a = id === 'hiver' ? 0 : PREPA_DIVERS.includes(id) ? 1 : +$('pr-ba').value;
    prepaLoad([id]).then(() => { const L = PREPA_LIB[id]; if (!L || !L.an[a]){ toast('Bibliothèque pas disponible (internet ?)'); return; }
      const ns = hn ? [hn] : L.an[a].l.map((l, i) => i + 1);
      prepaPrint(ns.map(i => ({date: '', h: '', cls: [], pp: prepaFromLib(id, a, i), prog: null})), hn ? L.an[0].l[hn - 1].t : `${L.sport} · ${PREPA_DIVERS.includes(id) ? 'toutes années' : AN_TXT(a) + ' secondaire'}`); }); };
}

/* --- Recueil papier : toutes les prépas de la bibliothèque pour une farde (classées par année puis par sport, pages de garde, onglets au bord droit) --- */
const RC_PAGE = '@page{size:A4 portrait;margin:12mm 0 12mm 12mm}';  // marge droite à 0 : les onglets vont jusqu'au bord de la feuille
const RC_ONGLETS = [1, 2, 3, 4, 5, 6, 'natdeb', 'divers'];  // position verticale de l'onglet de chaque section
function rcTab(pos, haut, bas){
  const i = RC_ONGLETS.indexOf(pos);
  return `<div class="rc-tab" style="top:${8 + i * 29}mm"><b>${esc(haut)}</b>${bas ? `<span>${esc(bas)}</span>` : ''}</div>`;
}
function rcEnTete(en, sous){
  return `<header class="pr-hd">${en.logo ? `<img src="${esc(en.logo)}" alt="" onerror="this.remove()">` : ''}<div><b>${esc(en.ecole || '')}</b><span>Éducation physique · ${esc(sous)}</span>${en.prof ? `<span>Professeur : ${esc(en.prof)}</span>` : ''}</div></header>`;
}
function rcLecons(A, libId){
  const long = A.l.length > 6 && libId !== 'hiver';  // plusieurs cycles : sans les objectifs, pour tenir sur la page de garde
  return ppCycles(A).map(cy => `${long ? `<h3 class="rc-cy">Cycle ${cy.k} · ${esc(cy.th)}</h3>` : ''}<table class="rc-ls${long ? '' : ' rc-l3'}"><tr><th>Leçon</th><th>Thème</th>${long ? '' : '<th>Objectif</th>'}</tr>
    ${A.l.slice(cy.de - 1, cy.a).map((l, j) => `<tr${l.crit ? ' class="rc-ev"' : ''}><td>${libId === 'hiver' ? '' : 'L' + (cy.de + j)}</td><td><b>${esc(l.t)}</b>${l.crit ? ' <small>(grille d\'évaluation)</small>' : ''}</td>${long ? '' : `<td>${esc(l.o || l.tags || '')}</td>`}</tr>`).join('')}</table>`).join('');
}
async function prepaRecueilHTML(){
  const ids = PREPA_PRETS.filter(id => id !== 'natdeb' && !PREPA_DIVERS.includes(id)), nom = id => (PREPA_CAT.find(c => c[0] === id) || [0, id])[1];
  await prepaLoad([...PREPA_PRETS]);
  const en = prepaEn(), sy = schoolYear(today())[2], sp = ids.filter(id => PREPA_LIB[id]).sort((a, b) => nom(a).localeCompare(nom(b), 'fr'));
  const page = (x, tab) => prepaPage(x, en).replace('<article class="pr-page">', `<article class="pr-page rc-p">${tab}`).replace(window.PSCH_LEGENDE || '§', '');  // légende des schémas : une seule fois, en page 1
  const lecon = (id, an, n, tab) => page({date: '', h: '', cls: [], pp: prepaFromLib(id, an, n), prog: null}, tab);
  let h = `<article class="pr-page rc-p rc-cover">${rcEnTete(en, 'Recueil des préparations de leçons')}
    <h1>Recueil des préparations de leçons</h1><p class="rc-sub">Éducation physique · ${esc(sy)}${en.prof ? ' · ' + esc(en.prof) : ''}</p>
    <p>Chaque séquence compte 6 leçons : 5 leçons d'apprentissage et une leçon d'évaluation (la 6e), avec sa grille de critères. En natation (1re à 3e), deux cycles de plus sont prévus pour les classes qui ont 12 ou 18 semaines de piscine, et un parcours séparé existe pour le groupe débutants.</p>
    <h2>Comment trouver une prépa</h2><p>Les onglets noirs au bord droit des pages indiquent l'année (1re en haut, 6e plus bas), puis les sections « Natation débutants » et « Sports divers » (corde à sauter, lutte, puis les sports en une leçon). Dans chaque année, les sports sont classés par ordre alphabétique, chacun précédé d'une page de garde avec la liste de ses leçons.</p>
    <table class="rc-ls rc-som"><tr><th>Section</th><th>Contenu</th></tr>
      ${[1, 2, 3, 4, 5, 6].map(a => `<tr><td><b>${AN_TXT(a)} secondaire</b></td><td>${sp.filter(id => PREPA_LIB[id].an[a]).map(id => `${esc(nom(id).replace(/ \(.*\)$/, ''))} (${PREPA_LIB[id].an[a].l.length})`).join(' · ')}</td></tr>`).join('')}
      ${PREPA_LIB.natdeb ? `<tr><td><b>Natation débutants</b></td><td>3 cycles de 6 leçons (petite profondeur), toutes années</td></tr>` : ''}
      ${PREPA_DIVERS.some(id => id !== 'hiver' && PREPA_LIB[id]) ? `<tr><td><b>Sports divers</b></td><td>${PREPA_DIVERS.filter(id => id !== 'hiver' && PREPA_LIB[id]).map(id => esc(nom(id))).join(' · ')} : un cycle de 6 leçons, toutes années</td></tr>` : ''}
      ${PREPA_LIB.hiver ? `<tr><td><b>Sports divers en une leçon</b></td><td>${PREPA_LIB.hiver.an[0].l.length} sports et jeux complets en une leçon (petite salle, peu de matériel)</td></tr>` : ''}</table>
    <h2>Légende des schémas</h2>${window.PSCH_LEGENDE || ''}</article>`;
  [1, 2, 3, 4, 5, 6].forEach(a => {
    const lst = sp.filter(id => PREPA_LIB[id].an[a]), A_ = AN_TXT(a);
    h += `<article class="pr-page rc-p rc-div">${rcTab(a, A_)}<div class="rc-big"><span>${A_}</span><small>secondaire</small></div>
      <table class="rc-ls rc-som"><tr><th>Sport</th><th>Séquence</th><th>Leçons</th></tr>${lst.map(id => { const A = PREPA_LIB[id].an[a];
        return `<tr><td><b>${esc(nom(id))}</b></td><td>${esc(A.l.length > 6 ? ppCycles(A).map(c => c.th).join(' / ') : A.th)}</td><td>${A.l.length}</td></tr>`; }).join('')}</table></article>`;
    lst.forEach(id => { const L = PREPA_LIB[id], A = L.an[a], ab = planAbbr(L.sport), tab = rcTab(a, A_, ab);
      h += `<article class="pr-page rc-p rc-sp">${tab}${rcEnTete(en, A_ + ' secondaire')}<div class="rc-sph"><small>${A_} secondaire</small><h1>${esc(nom(id))}</h1><p>${esc(A.th)}</p></div>
        <p class="rc-mat"><b>Matériel :</b> ${esc(A.mat || L.mat || '')}</p>${id === 'natation' && a <= 3 && PREPA_LIB.natdeb ? '<p class="rc-mat"><b>Groupe débutants :</b> voir la section « Natation débutants » en fin de farde.</p>' : ''}${rcLecons(A, id)}</article>`;
      A.l.forEach((l, i) => h += lecon(id, a, i + 1, tab)); });
  });
  if (PREPA_LIB.natdeb){ const A = PREPA_LIB.natdeb.an[1], tab = rcTab('natdeb', 'Nat.', 'débutants');
    h += `<article class="pr-page rc-p rc-sp">${tab}${rcEnTete(en, 'Natation débutants')}<div class="rc-sph"><small>Toutes années · petite profondeur</small><h1>Natation débutants</h1><p>${esc(A.th)}</p></div>
      <p class="rc-mat"><b>Matériel :</b> ${esc(A.mat || PREPA_LIB.natdeb.mat || '')}</p><p class="rc-mat">Pour le groupe qui n'est pas encore à l'aise dans l'eau, en même temps que le groupe nageurs. L'évaluation du cycle 3 sert de test de passage vers le groupe nageurs.</p>${rcLecons(A, 'natdeb')}</article>`;
    A.l.forEach((l, i) => h += lecon('natdeb', 1, i + 1, tab).replace(/<span>1re secondaire<\/span>/, '<span>toutes années</span>')); }
  PREPA_DIVERS.filter(id => id !== 'hiver' && PREPA_LIB[id]).forEach(id => { const A = PREPA_LIB[id].an[1], tab = rcTab('divers', 'Divers', planAbbr(PREPA_LIB[id].sport));
    h += `<article class="pr-page rc-p rc-sp">${tab}${rcEnTete(en, 'Sports divers')}<div class="rc-sph"><small>Sports divers · toutes années</small><h1>${esc(nom(id))}</h1><p>${esc(A.th)}</p></div>
      <p class="rc-mat"><b>Matériel :</b> ${esc(A.mat || PREPA_LIB[id].mat || '')}</p><p class="rc-mat">Un seul cycle de 6 leçons, le même pour toutes les années : adapte les exigences à l'âge des élèves.</p>${rcLecons(A, id)}</article>`;
    A.l.forEach((l, i) => h += lecon(id, 1, i + 1, tab).replace(/<span>1re secondaire<\/span>/, '<span>toutes années</span>')); });
  if (PREPA_LIB.hiver){ const A = PREPA_LIB.hiver.an[0], tab = rcTab('divers', 'Divers', 'une leçon');
    h += `<article class="pr-page rc-p rc-sp">${tab}${rcEnTete(en, 'Sports divers')}<div class="rc-sph"><small>Toutes années · une leçon par sport</small><h1>Sports divers en une leçon</h1><p>Jeux pour la petite salle ou les jours sans installation, classés par mots-clés.</p></div>${rcLecons(A, 'hiver')}</article>`;
    A.l.forEach((l, i) => h += lecon('hiver', 0, i + 1, tab).replace(/<span>(toutes années|\d+r?e) secondaire<\/span>/, '<span>toutes années</span>')); }
  return h;
}
window.prepaRecueilHTML = prepaRecueilHTML;
function prepaRecueil(){
  toast('Préparation du recueil (plusieurs centaines de pages)…');
  prepaRecueilHTML().then(h => printHTML(h, `Recueil des prépas EPS ${schoolYear(today())[2]}`, false, RC_PAGE));
}

/* --- Onglet « Prépas » du tableau Google : un bloc par classe (classes dans l'ordre des années), leçons par date --- */
window.prepaFeuille = () => {
  const l = prepaAll(); if (!l.length) return null;
  const H = ['Date', 'Heure', 'Classe(s)', 'Année', 'Activité', 'Leçon', 'Thème', 'Compétences', 'Objectif(s)', 'Échauffement', 'Corps de leçon', 'Retour au calme', 'Bilan'];
  const lignes = [{h: 26, c: [['Mes prépas de leçon, par classe', XS.TITLE]]}], fusions = ['A1:M1'];
  const ligne = x => { const p = x.pp; return {h: 60, c: [[x.date, XS.TXT], [x.h || '', XS.TXT], [x.cls.map(c => c.name).join(', '), XS.TXT], [AN_TXT(p.an), XS.TXT], [p.sp || '', XS.TXT], [p.n || '', XS.INT], [p.t || '', XS.TXTB],
    [((x.prog && x.prog.length ? x.prog : p.comp) || []).join(' '), XS.TXT], [p.o || '', XS.NOTE], [p.e || '', XS.NOTE], [p.c || '', XS.NOTE], [p.r || '', XS.NOTE], [p.bil || '', XS.NOTE]]}; };
  const bloc = (titre, xs) => {
    lignes.push({h: 14, c: []});
    const r = lignes.length + 1; lignes.push({h: 24, c: H.map((t, i) => [i ? '' : titre, XS.GROUP])}); fusions.push(`A${r}:M${r}`);
    lignes.push({h: 30, c: H.map(t => [t, XS.HEAD])});
    xs.forEach(x => lignes.push(ligne(x)));
  };
  /* une leçon de groupe mixte apparaît dans chacune de ses classes ; prepaAll est déjà trié par date et par heure */
  const an = c => progYear(c) || 9;
  [...S.classes].sort((a, b) => an(a) - an(b) || a.name.localeCompare(b.name, 'fr', {numeric: true})).forEach(c => {
    const xs = l.filter(x => x.cls.includes(c)); if (!xs.length) return;
    bloc(`${c.name}${progYear(c) ? ' · ' + AN_TXT(progYear(c)) + ' secondaire' : ''} · ${xs.length} leçon${xs.length > 1 ? 's' : ''}`, xs);
  });
  const sans = l.filter(x => !x.cls.length); if (sans.length) bloc(`Sans classe · ${sans.length} leçon${sans.length > 1 ? 's' : ''}`, sans);
  return {nom: 'Prépas', lignes, fusions, largeurs: [11, 6, 14, 7, 14, 6, 26, 16, 34, 44, 60, 34, 30], figer: 1};
};

/* ====== Planning de l'année : quel sport, pour quelle classe, quelles semaines ======
   S.settings.planAn = {idClasse: {'AAAA-MM-JJ' (lundi): 'Basket-ball' | 'Congé'}}. Simple prévision : rien n'est imposé aux cours. */
const PLAN_COL = ['#1f63d6', '#f06400', '#8a3ffc', '#0f8a5f', '#c2185b', '#00838f', '#7a5a00', '#5d4037', '#3949ab', '#b23c17', '#2e7d32', '#6a1b9a'];
const planSet = () => S.settings.planAn && typeof S.settings.planAn === 'object' ? S.settings.planAn : {};
const planOf = (cid, iso) => (planSet()[cid] || {})[mondayOf(iso)] || '';
const PLAN_ABR = [[/basket/i, 'Basket'], [/volley/i, 'Volley'], [/hand/i, 'Hand'], [/natation/i, 'Nat.'], [/endurance/i, 'Endur.'], [/badminton/i, 'Bad'], [/acro/i, 'Acro'], [/prisonnier/i, 'Prison'], [/athl/i, 'Athlé'], [/foot/i, 'Foot'], [/hiver/i, 'Hiver'], [/gym/i, 'Gym'], [/tennis de table/i, 'Ping'], [/unihoc|floorball/i, 'Unihoc'], [/évaluation/i, 'Éval']];
const planAbbr = s => s === 'Congé' ? 'congé' : (PLAN_ABR.find(([re]) => re.test(s)) || [0, s.replace(/[-'’ ]/g, ' ').split(' ').filter(Boolean)[0].slice(0, 6)])[1];
function planWeeks(iso){
  const d = dOf(iso), y = d.getMonth() >= 7 ? d.getFullYear() : d.getFullYear() - 1;
  const out = []; let m = mondayOf(`${y}-08-24`); const end = `${y + 1}-07-03`;
  while (m <= end){ out.push(m); m = addDays(m, 7); }
  return {weeks: out, sy: `${y}-${y + 1}`};
}
function planColor(sp){
  const used = [...new Set(Object.values(planSet()).flatMap(o => Object.values(o)).filter(s => s !== 'Congé'))].sort((a, b) => sportsList().indexOf(a) - sportsList().indexOf(b));
  const i = used.indexOf(sp); return i < 0 ? PLAN_COL[0] : PLAN_COL[i % PLAN_COL.length];
}
function planHTML(weeks, forPrint){
  const t0 = mondayOf(today()), cls = S.classes;
  let h = `<div class="pl-wrap"><table class="pl-tb"><thead><tr><th class="pl-c">Classe</th>`;
  weeks.forEach((w, i) => { const d = dOf(w), nm = i === 0 || dOf(weeks[i - 1]).getMonth() !== d.getMonth();
    h += `<th class="${w === t0 ? 'pl-now' : ''}${nm ? ' pl-m' : ''}${calOffSem(w) ? ' pl-vac' : ''}" title="${calOffSem(w) ? esc(calOffSem(w).t) : ''}"><small>${nm ? MOIS[d.getMonth()] : ''}</small>${d.getDate()}</th>`; });
  h += '</tr></thead><tbody>';
  cls.forEach(c => {
    h += `<tr><th class="pl-c">${esc(c.name)}</th>`;
    weeks.forEach(w => { const sp = (planSet()[c.id] || {})[w] || '', wk = planWeekLessons(c, w), done = wk.filter(x => x.sport).map(x => x.sport), np = wk.filter(x => x.pp).length;
      const lab = `${c.name}, semaine du ${fmtD(w)}${sp ? ' : ' + sp : calOffSem(w) ? ' : ' + calOffSem(w).t : ''}${done.length ? ', fait : ' + [...new Set(done)].join(', ') : ''}${np ? ', ' + np + ' prépa' + (np > 1 ? 's' : '') : ''}`;
      const vac = !sp && !done.length && !np && calOffSem(w), off = sp === 'Congé' || vac;
      const inner = vac ? '<b class="pl-vact">vac.</b>' : `${sp ? `<b>${esc(planAbbr(sp))}</b>` : done.length ? `<b class="pl-fait">${esc(planAbbr(done[0]))}</b>` : ''}${np ? `<i>📋${np > 1 ? np : ''}</i>` : done.length ? '<i>✓</i>' : ''}`;
      h += forPrint ? `<td class="${off ? 'pl-off' : ''}" style="${sp && sp !== 'Congé' ? `--pc:${planColor(sp)}` : ''}">${inner}</td>`
        : `<td class="${w === t0 ? 'pl-now' : ''}${off ? ' pl-off' : ''}" style="${sp && sp !== 'Congé' ? `--pc:${planColor(sp)}` : ''}"><button type="button" data-plc="${c.id}" data-plw="${w}" aria-label="${esc(lab)}">${inner}</button></td>`; });
    h += '</tr>';
  });
  h += '</tbody></table></div>';
  const used = [...new Set(Object.values(planSet()).flatMap(o => Object.values(o)))];
  if (used.length || cls.length) h += `<div class="pl-leg"><span style="--pc:#888"><b>vac.</b>vacances de l'école</span>${used.sort((a, b) => sportsList().indexOf(a) - sportsList().indexOf(b)).map(s => `<span style="--pc:${s === 'Congé' ? '#888' : planColor(s)}"><b>${esc(planAbbr(s))}</b>${esc(s)}</span>`).join('')}<span><i>✓</i> sport noté dans un cours</span><span><i>📋</i> prépa faite (touche la case pour la voir)</span></div>`;
  return h;
}
/* ce qui a été fait (ou préparé) cette semaine-là par une classe : leçons + cours prévus avant l'appel */
function planWeekLessons(c, w){
  const end = addDays(w, 6), out = c.lessons.filter(l => l.date >= w && l.date <= end).map(l => ({date: l.date, h: l.h, sport: l.sport || '', pp: l.prepa || null, note: l.note || ''}));
  Object.entries(S.settings.ag || {}).forEach(([k, v]) => { const [date, h] = k.split('|'); if (date < w || date > end) return;
    const it = agItems(wdOf(date)).find(x => x.h === h); if (it && it.cls.includes(c.id) && !out.some(x => x.date === date && x.h === h)) out.push({date, h, sport: v.s || '', pp: v.pp || null, note: v.n || '', plan: true}); });
  return out.sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : hI(a.h || 'H1') - hI(b.h || 'H1'));
}
function renderPlanAn(m){
  const {weeks, sy} = planWeeks(UI.agDate || today());
  m.innerHTML = `<section class="sec"><div class="ag-top"><button class="btn" type="button" id="pl-back">‹ Agenda</button><h2 class="pl-h">Planning <small>${esc(sy)}</small></h2><button class="btn" type="button" id="pl-prt" aria-label="Imprimer le planning">🖨</button></div>
    <p class="small muted" style="margin:0">Touche une case pour prévoir un sport à une classe, sur une ou plusieurs semaines. C'est juste ta prévision : dans l'agenda, le sport prévu est proposé, tu fais ce que tu veux.</p>
    ${S.classes.length ? planHTML(weeks) : '<p class="small">Ajoute d\'abord tes classes.</p>'}</section>`;
  $('pl-back').onclick = () => { UI.agPlan = false; render(); };
  $('pl-prt').onclick = () => printHTML(`<article class="pr-page pr-plan"><h1>Planning EPS ${esc(sy)}${prepaEn().prof ? ' · ' + esc(prepaEn().prof) : ''}</h1>${planHTML(weeks, true)}</article>`, `Planning EPS ${sy}`, true);
  m.querySelectorAll('[data-plc]').forEach(b => b.onclick = () => openPlanCell(b.dataset.plc, b.dataset.plw));
  const now = m.querySelector('th.pl-now'), wrap = m.querySelector('.pl-wrap'); if (now && wrap) wrap.scrollLeft = Math.max(0, now.offsetLeft - 140);
}
function openPlanCell(cid, w){
  const c = clsById(cid); if (!c) return;
  const cur = (planSet()[cid] || {})[w] || '';
  let n = 1; if (cur){ let k = w; while ((planSet()[cid] || {})[addDays(k, 7)] === cur){ n++; k = addDays(k, 7); } }
  const same = S.classes.filter(x => x.id !== cid && progYear(x) && progYear(x) === progYear(c));
  openSheet(`${c.name} · semaine du ${fmtD(w)}`, `
    <div class="card sec"><h3>Fait cette semaine</h3>${planWeekHTML(c, w)}</div>
    <h3 style="margin:4px 0 0">Prévoir</h3>
    <label class="f">Sport prévu<select class="inp" id="plc-sp"><option value="">— Rien de prévu —</option><option value="Congé" ${cur === 'Congé' ? 'selected' : ''}>🏖 Congé / pas cours</option>${sportsList().filter(s => s !== 'Autre').map(s => `<option ${s === cur ? 'selected' : ''}>${esc(s)}</option>`).join('')}</select></label>
    <span class="small muted" style="font-weight:600">Pendant</span>
    <div class="row2" id="plc-n">${[1, 2, 3, 4, 5, 6, 8].map(k => `<button class="chip" type="button" data-pln="${k}" aria-pressed="${k === Math.min(n, 8)}">${k} sem.</button>`).join('')}</div>
    <span class="small muted">Un cycle de 6 leçons à 2 cours par semaine ≈ 3 semaines ; à 1 cours ≈ 6 semaines.</span>
    ${same.length ? `<span class="small muted" style="font-weight:600">Aussi pour</span><div class="row2" id="plc-o">${same.map(x => `<button class="chip" type="button" data-plo="${x.id}" aria-pressed="false">${esc(x.name)}</button>`).join('')}</div>` : ''}
    <button class="btn pri block" type="button" id="plc-ok">Enregistrer</button>`);
  document.querySelectorAll('[data-plo-open]').forEach(b => b.onclick = () => { const [date, sid] = b.dataset.ploOpen.split('|'); sheetOnClose = null; openPrepa(date, sid, [cid]); });
  document.querySelectorAll('[data-pln]').forEach(b => b.onclick = () => { n = +b.dataset.pln; document.querySelectorAll('[data-pln]').forEach(x => x.setAttribute('aria-pressed', x === b)); });
  document.querySelectorAll('[data-plo]').forEach(b => b.onclick = () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  if (!document.querySelector('[data-pln][aria-pressed="true"]')) n = 1;
  $('plc-ok').onclick = () => {
    const sp = $('plc-sp').value, ids = [cid, ...[...document.querySelectorAll('[data-plo][aria-pressed="true"]')].map(b => b.dataset.plo)], P = {...planSet()};
    ids.forEach(id => { const o = {...(P[id] || {})}; for (let i = 0; i < n; i++){ const k = addDays(w, 7 * i); if (sp) o[k] = sp; else delete o[k]; } P[id] = o; });
    S.settings.planAn = P; save(); closeSheet(); toast(sp ? `${sp} prévu ${n} semaine${n > 1 ? 's' : ''}` : 'Retiré du planning');
  };
  sheetOnClose = () => render();
}
