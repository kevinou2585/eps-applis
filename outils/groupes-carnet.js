/* ====== Nom / prénom, et onglet Évaluation par groupe (les classes qui ont cours ensemble) ======
   - Élève : p.n = « Nom Prénom » reste le nom complet (bulletin, Excel, Drive, commentaires, tri).
     p.nom et p.pre sont écrits à la création et quand on modifie la fiche. Pour les anciens élèves (p.n seul),
     ils sont déduits de p.n à l'affichage, sans rien enregistrer (pas de changement de c.ts, donc rien à synchroniser) :
       · des mots en MAJUSCULES et d'autres pas : MAJUSCULES = nom (« DUPONT Léa ») ;
       · sinon le dernier mot = prénom, le reste = nom (« Van Damme Léa ») ;
       · liste collée avec deux colonnes (tabulation, ; ou ,) : 1re = nom, 2e = prénom.
     Si p.n a changé ailleurs (ancienne version de l'appli) et ne correspond plus à p.nom + p.pre, p.n gagne.
   - Nom court (appel, compteur de tours) : le prénom ; deux prénoms pareils dans ce qui est affiché (l'appel peut réunir
     deux classes) : « Prénom N. », puis plus de lettres du nom si besoin.
   - Groupes de l'onglet Évaluation : les classes d'un même créneau de l'horaire S.settings.tt (sans les groupes d'activité),
     plus chaque classe qui n'est jamais en groupe (et un groupe d'activité seulement s'il a des évaluations).
     Une évaluation de groupe = une évaluation dans chaque classe (c.evals, rien ne change pour bulletin, Excel, Drive),
     liées par le même e.gid. Les anciennes sans gid sont réunies si nom + date + barème sont pareils.
   Tout passe par save(c.id) : appareil + Drive. */

/* --- Nom et prénom --- */
const nomUp = w => w.length > 1 && w === w.toLocaleUpperCase('fr') && w !== w.toLocaleLowerCase('fr');
const nomClean = s => String(s || '').replace(/\s+/g, ' ').trim();
function splitNom(n){
  const w = nomClean(n).split(' ').filter(x => x && !/^\d+$/.test(x));
  if (w.length < 2) return ['', w[0] || ''];
  const up = w.filter(nomUp);
  if (up.length && up.length < w.length) return [up.join(' '), w.filter(x => !nomUp(x)).join(' ')];
  return [w.slice(0, -1).join(' '), w[w.length - 1]];
}
const joinNom = (nom, pre) => [nomClean(nom), nomClean(pre)].filter(Boolean).join(' ');
function nomPre(p){
  if ((p.nom != null || p.pre != null) && joinNom(p.nom, p.pre) === nomClean(p.n)) return {nom: nomClean(p.nom), pre: nomClean(p.pre)};
  const [nom, pre] = splitNom(p.n); return {nom, pre};
}
function pupilNew(c, nom, pre){
  nom = nomClean(nom); pre = nomClean(pre);
  const p = {id: nid('e'), n: joinNom(nom, pre), nom, pre};
  if (c.sexe === 'G' || c.sexe === 'F') p.g = c.sexe;
  c.pupils.push(p); return p;
}
/* liste collée (création de classe, Ajouter des élèves) */
function addPupils(c, text){
  const out = [];
  String(text || '').split(/\r?\n/).forEach(l => {
    const f = l.split(/[\t;,]+/).map(nomClean).filter(x => x && !/^\d+$/.test(x)), n = f.join(' ');
    if (!n || /^(nom|élève|eleve)\b/i.test(n)) return;
    const [nom, pre] = f.length === 2 ? f : splitNom(n);
    out.push(pupilNew(c, nom, pre));
  });
  return out;
}

/* --- Nom court : prénom, + initiale(s) du nom si deux prénoms pareils parmi les élèves affichés --- */
const nomKey = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
function nomsCourts(ps){
  const m = new Map(), by = new Map();
  ps.forEach(p => { const {nom, pre} = nomPre(p), base = pre || nom || p.n, k = nomKey(base);
    if (!by.has(k)) by.set(k, []); by.get(k).push({p, nom, base}); });
  by.forEach(list => {
    if (list.length === 1){ m.set(list[0].p.id, list[0].base); return; }
    // pour chacun, juste assez de lettres du nom pour le distinguer des autres (au moins l'initiale)
    const pre = (x, k) => nomKey(x.nom.slice(0, k));
    list.forEach(x => {
      if (!x.nom){ m.set(x.p.id, x.base); return; }
      let k = 1; while (k < x.nom.length && list.some(y => y !== x && pre(y, k) === pre(x, k))) k++;
      m.set(x.p.id, k >= x.nom.length ? `${x.base} ${x.nom}` : `${x.base} ${x.nom.slice(0, k).trim()}.`);
    });
  });
  return m;
}
let NCOURT = new Map();
const nomCourt = p => NCOURT.get(p.id) || nomPre(p).pre || p.n;

/* --- Fiche élève : deux cases --- */
function pupilNameFields(p){
  const {nom, pre} = nomPre(p);
  return `<div class="row2 gr-nom"><label class="f" style="flex:1 1 150px">Nom<input class="inp" id="pp-nom" value="${esc(nom)}" autocomplete="off" autocapitalize="words" spellcheck="false"></label>
    <label class="f" style="flex:1 1 120px">Prénom<input class="inp" id="pp-pre" value="${esc(pre)}" autocomplete="off" autocapitalize="words" spellcheck="false"></label></div>
    <span class="small muted">À l'appel et dans le compteur de tours : le prénom seulement (+ initiale du nom si deux prénoms pareils). Bulletin, Excel et Drive : nom complet.</span>`;
}
function bindPupilName(c, p){
  const upd = () => {
    const nom = nomClean($('pp-nom').value), pre = nomClean($('pp-pre').value);
    if (!nom && !pre){ const o = nomPre(p); $('pp-nom').value = o.nom; $('pp-pre').value = o.pre; toast('Il faut au moins un nom ou un prénom'); return; }
    p.nom = nom; p.pre = pre; p.n = joinNom(nom, pre); save(c.id);
    const h = document.querySelector('.sheet .sh h2'); if (h) h.textContent = p.n; $('sheetroot').dataset.title = p.n;
  };
  $('pp-nom').onchange = upd; $('pp-pre').onchange = upd;
}
/* --- Classe › Élèves : ajouter un élève avec ses deux cases --- */
function addOneHTML(){
  return `<div class="gr-add"><b class="small">Ajouter un élève</b>
    <div class="row2"><input class="inp" id="s-nom" placeholder="Nom" aria-label="Nom" autocomplete="off" autocapitalize="words" spellcheck="false" style="flex:1 1 130px">
    <input class="inp" id="s-pre" placeholder="Prénom" aria-label="Prénom" autocomplete="off" autocapitalize="words" spellcheck="false" style="flex:1 1 110px">
    <button class="btn pri" type="button" id="s-add1" style="flex:0 0 auto">Ajouter</button></div></div>`;
}
function bindAddOne(c){
  const go = () => { const nom = nomClean($('s-nom').value), pre = nomClean($('s-pre').value);
    if (!nom && !pre){ $('s-nom').focus(); toast('Écris le nom et le prénom'); return; }
    const p = pupilNew(c, nom, pre); save(c.id); render(); toast(`${p.n} ajouté${c.sexe === 'F' ? 'e' : ''}`); setTimeout(() => $('s-nom')?.focus(), 50); };
  $('s-add1').onclick = go;
  $('s-pre').onkeydown = e => { if (e.key === 'Enter') go(); };
  $('s-nom').onkeydown = e => { if (e.key === 'Enter') $('s-pre').focus(); };
}

/* ====== Onglet Évaluation ====== */
const EVG_KEY = 'carnet-eps-evgroupe';
function evGroups(){
  const idx = id => S.classes.findIndex(c => c.id === id), seen = new Map();
  tt().forEach(s => { const ids = [...new Set(s.cls)].filter(id => idx(id) >= 0 && !isAct(id)).sort((a, b) => idx(a) - idx(b));
    if (ids.length) seen.set(ids.join(','), ids); });
  const inMulti = new Set([...seen.values()].filter(x => x.length > 1).flat());
  const out = [...seen.values()].filter(x => x.length > 1 || !inMulti.has(x[0]));
  S.classes.forEach(c => { if (out.some(x => x.includes(c.id)) || (c.act && !c.evals.length)) return; out.push([c.id]); });
  return out.map(ids => ({key: ids.join(','), ids, cls: ids.map(id => S.classes[idx(id)]), name: clsName(ids)}))
    .sort((a, b) => (a.cls.some(c => c.act) - b.cls.some(c => c.act)) || a.name.localeCompare(b.name, 'fr', {numeric: true}));
}
function evSlots(ids){
  return tt().filter(s => [...new Set(s.cls)].filter(id => !isAct(id) && S.classes.some(c => c.id === id)).sort().join(',') === [...ids].sort().join(','))
    .sort((a, b) => a.d - b.d || hI(a.h) - hI(b.h)).map(s => DAYS.find(d => d[0] === s.d)[1].slice(0, 2).toLowerCase() + '. ' + slotLabel(s)).join(' · ');
}
/* la même période dans chaque classe (même nom, sinon même rang, sinon la date) */
function evPerMap(cls, vp0){
  const i0 = periodsOf(cls[0]).findIndex(p => p.id === vp0.id);
  return new Map(cls.map(c => { const ps = periodsOf(c); return [c.id, c === cls[0] ? vp0 : ps.find(p => p.name === vp0.name) || ps[i0] || periodOf(c, vp0.start)]; }));
}
function evBuckets(cls, pm){
  const out = [];
  cls.forEach(c => { const vp = pm.get(c.id); if (!vp) return;
    c.evals.filter(e => e.periodId === vp.id).forEach(e => {
      const k = e.gid ? 'g:' + e.gid : 'n:' + nomKey(e.name) + '|' + (e.date || '') + '|' + (+e.max);
      let b = out.find(x => x.k === k && !x.items.some(it => it.c === c));
      if (!b) out.push(b = {k, items: []});
      b.items.push({c, e});
    }); });
  return out.sort((a, b) => { const x = a.items[0].e.date || '', y = b.items[0].e.date || ''; return x < y ? -1 : x > y ? 1 : 0; });
}
function renderEvalTab(m){
  const gs = evGroups();
  if (!gs.length){ m.innerHTML = `<section class="sec"><h2>Évaluation</h2><div class="card empty"><p class="muted">Pas encore de classe à évaluer. Crée une classe dans l'onglet Classes.</p></div></section>`; return; }
  let key = null; try { key = localStorage.getItem(EVG_KEY); } catch(e){}
  const g = gs.find(x => x.key === key) || gs[0], c0 = g.cls[0], multi = g.cls.length > 1;
  let vp0 = viewPeriod(c0); if (vp0 === 'year') vp0 = periodOf(c0, today());
  const chips = `<label class="f">Classe / groupe<select class="inp" id="evg">${gs.map(x => { const sl = evSlots(x.ids);
    return `<option value="${esc(x.key)}"${x === g ? ' selected' : ''}>${esc(x.name)} · ${esc(sl || (x.cls[0].act ? 'activité' : 'seule'))}</option>`; }).join('')}</select></label>`;
  if (!vp0){ m.innerHTML = `<section class="sec"><h2>Évaluation</h2>${chips}<div class="card empty"><p>Ajoute une période dans Classes › Élèves.</p></div></section>`; bindEvTab(m, g, null); return; }
  const pm = evPerMap(g.cls, vp0), bs = evBuckets(g.cls, pm);
  const tot = g.cls.map(c => { const vp = pm.get(c.id); return vp ? c.evals.filter(e => e.periodId === vp.id && e.kind !== 'form').reduce((a, e) => a + +e.max, 0) : 0; });
  const totTxt = new Set(tot).size === 1 ? 'total sur ' + fr(tot[0]) : 'total sur ' + g.cls.map((c, i) => `${fr(tot[i])} en ${esc(c.name)}`).join(', ');
  m.innerHTML = `<section class="sec">
    <h2>Évaluation</h2>
    ${chips}
    <div class="chips" id="egp">${periodsOf(c0).map(p => `<button class="chip" type="button" data-egp="${p.id}" aria-pressed="${p.id === vp0.id}">${esc(p.name)}${p.type === 'piscine' ? ' <span class="tag piscine" style="padding:1px 6px">P</span>' : ''}</button>`).join('')}</div>
    <p class="small muted" style="margin:0">${multi ? `Une évaluation créée ici est faite pour <b>${esc(g.name)}</b> en même temps (même nom, date et barème). Les notes vont dans le bulletin de chaque classe.` : `Les notes vont dans le bulletin de ${esc(g.name)}.`} Les évaluations certificatives de la période s'additionnent (${totTxt}) et comptent pour ${100 - S.settings.se} % du bulletin. Les formatives (pour info) ne comptent pas.</p>
    <div class="row2 eg-btns"><button class="btn pri" type="button" id="eg-new">+ Nouvelle évaluation${multi ? ' · ' + esc(g.name) : ''}</button><button class="btn pri" type="button" id="eg-crit">🎯 Fin de cycle (grille)</button></div>
    ${bs.length ? bs.map((b, i) => { const e = b.items[0].e, n = b.items.reduce((a, it) => a + it.c.pupils.length, 0);
      const vals = b.items.flatMap(({c, e}) => c.pupils.map(p => e.s[p.id]).filter(v => typeof v === 'number')), avg = vals.length ? vals.reduce((a, x) => a + x, 0) / vals.length : null;
      const part = multi && b.items.length < g.cls.length;
      return `<button class="ev" type="button" data-eb="${i}"><span class="t"><b>${esc(e.name)}${evTags(e)}</b><span class="small muted">${e.date ? esc(fmtD(e.date)) + ' · ' : ''}${vals.length}/${n} notés · moyenne ${fr(avg)}</span>${part ? `<span class="tag gr-only">${esc(b.items.map(x => x.c.name).join(' + '))} seulement</span>` : ''}</span><span class="sur num">/${fr(+e.max)}</span></button>`; }).join('')
      : `<div class="card empty"><p class="muted">Pas encore d'évaluation pour ${esc(vp0.name)}.</p></div>`}
  </section>`;
  bindEvTab(m, g, vp0);
  $('eg-new').onclick = () => openGroupEvalForm(g.cls, vp0, null);
  $('eg-crit').onclick = () => critNew(g.cls, vp0);
  m.querySelectorAll('[data-eb]').forEach(x => x.onclick = () => openGroupScores(bs[+x.dataset.eb].items));
}
function bindEvTab(m, g, vp0){
  const evg = m.querySelector('#evg'); if (evg) evg.onchange = () => { try { localStorage.setItem(EVG_KEY, evg.value); } catch(e){} render(); };
  m.querySelectorAll('[data-egp]').forEach(x => x.onclick = () => { const p = g.cls[0].periods.find(q => q.id === x.dataset.egp); if (!p) return;
    evPerMap(g.cls, p).forEach((vp, cid) => { if (vp) UI.period[cid] = vp.id; }); saveUI(); render(); });
}

/* formulaire : celui des évaluations (type, endurance, formative), enregistré dans chaque classe du groupe */
function openGroupEvalForm(cls, vp0, items){
  if (items) cls = items.map(x => x.c);
  const c0 = cls[0], e0 = items ? items[0].e : null, names = clsName(cls.map(c => c.id)), multi = cls.length > 1;
  openEvalForm(c0, items ? null : vp0, e0);
  const sb = document.querySelector('.sheet .sb');
  if (multi){
    document.querySelector('.sheet .sh h2').textContent = (items ? 'Modifier · ' : 'Nouvelle évaluation · ') + names;
    sb.insertAdjacentHTML('afterbegin', `<div class="gr-for"><b>Pour ${esc(names)}</b><span class="small muted">${items ? 'Les changements valent pour les ' + cls.length + ' classes.' : 'Une évaluation dans chaque classe, liées entre elles : modifier ou supprimer change les ' + cls.length + '.'}</span></div>`);
  }
  $('ef-ok').onclick = () => {
    const max = parseNum($('ef-max').value); if (!max || max <= 0){ $('ef-max').focus(); toast('Indique sur combien est l\'évaluation'); return; }
    if (!evFormOk()) return;
    const name = $('ef-name').value.trim() || 'Évaluation', date = $('ef-date').value || today();
    const p0 = c0.periods.find(p => p.id === $('ef-per').value) || periodOf(c0, date), pm = evPerMap(cls, p0);
    const gid = (items && (items.find(x => x.e.gid) || {}).e?.gid) || nid('g'), out = [];
    const put = (c, o) => { o.name = name; o.max = max; o.date = date; o.periodId = (pm.get(c.id) || periodOf(c, date)).id; if (multi) o.gid = gid; evFormApply(c, o); };
    if (items) items.forEach(({c, e}) => { if (EF) EF.max0 = +e.max; put(c, e); out.push({c, e}); });
    else cls.forEach(c => { const o = {id: nid('v'), s: {}}; put(c, o); c.evals.push(o); out.push({c, e: o}); });
    cls.forEach(c => { UI.period[c.id] = (pm.get(c.id) || {}).id || UI.period[c.id]; save(c.id); });
    closeSheet(); render(); openGroupScores(out);
    if (!items && multi) toast(`Évaluation créée pour ${names}`);
  };
  if (items && $('ef-del')) $('ef-del').onclick = () => {
    $('ef-delc').innerHTML = `<div class="confirm"><b>Supprimer « ${esc(e0.name)} »${multi ? ' de ' + esc(names) : ''} et toutes ses notes ?</b><div class="row2"><button class="btn" type="button" id="ef-no">Garder</button><button class="btn pri" style="background:var(--bad);border-color:var(--bad)" type="button" id="ef-yes">Supprimer</button></div></div>`;
    $('ef-no').onclick = () => $('ef-delc').innerHTML = '';
    $('ef-yes').onclick = () => { items.forEach(({c, e}) => { c.evals = c.evals.filter(x => x !== e); save(c.id); }); closeSheet(); render(); toast('Évaluation supprimée'); };
  };
}

/* feuille des notes : les élèves de toutes les classes, classe par classe */
function grHead(items){
  const e0 = items[0].e; let h = '';
  if (e0.kind === 'form') h += '<div class="ev-formnote"><span class="tag ev-form">FORMATIVE</span><span class="small">Pour info : ne compte pas dans le bulletin.</span></div>';
  if (e0.crit) h += `<div class="card cr-card"><div><b>🎯 Grille de critères</b><br><span class="small muted">${e0.crit.length} critères · ${fr(crTot(e0), 2)} points → note sur ${fr(+e0.max, 2)}</span></div>
    <div class="row2"><button class="btn pri" type="button" id="es-crit">▶ Noter avec la grille</button><button class="btn" type="button" id="es-crprt">🖨 Grille papier</button></div></div>`;
  if (e0.endu){
    const run = enRunGet(), mine = run && enKey(run) === enKey({items: items.map(({c, e}) => ({cid: c.id, eid: e.id}))});
    const nl = items.reduce((a, {e}) => a + Object.keys(e.endu?.laps || {}).length, 0), np = items.reduce((a, {c}) => a + c.pupils.length, 0);
    h += `<div class="card ev-endu-c"><div><b>🏃 Endurance · ${fr(e0.endu.min, 2)} min</b><br><span class="small muted">${e0.endu.tours} tours = ${fr(+e0.max, 2)}/${fr(+e0.max, 2)} · ${np} élèves${items.length > 1 ? ' sur un seul écran' : ''}${nl ? ` · ${nl} déjà compté${nl > 1 ? 's' : ''}` : ''}</span></div>
      <button class="btn pri block en-go" type="button" id="es-endu">${mine ? '▶ Reprendre le compteur' : '▶ Démarrer l\'évaluation'}</button></div>`;
  }
  return h;
}
function openGroupScores(items){
  items = items.filter(({c, e}) => S.classes.includes(c) && c.evals.includes(e)); if (!items.length){ render(); return; }
  const e0 = items[0].e, multi = items.length > 1, names = items.map(x => x.c.name).join(' + ');
  const body = () => `${grHead(items)}
    <div class="row2" style="align-items:center"><span class="small muted" style="flex:1">${multi ? '<b>' + esc(names) + '</b> · ' : ''}${e0.date ? esc(fmtDL(e0.date)) + ' · ' : ''}sur ${fr(+e0.max, 2)}. Laisse vide si pas encore noté.</span><button class="btn" type="button" id="es-edit">Modifier</button></div>
    <div class="list">${items.map(({c, e}) => (multi ? `<div class="lsub">${esc(c.name)} <span>${c.pupils.length} élève${c.pupils.length > 1 ? 's' : ''}</span></div>` : '') + pupilsOf(c).map(p => { const s = e.s[p.id], abs = s === 'abs';
      return `<div class="prow" data-pid="${p.id}"><span class="who">${avatar(p)}<span class="nm"><b>${esc(p.n)}</b>${evLapsTxt(e, p)}</span></span>
        ${evSinHTML(p, s, c.id)}</div>`; }).join('')).join('')}</div>`;
  items.forEach(({c, e}) => evCertFill(c, e));
  openSheet(e0.name, body());
  const sb = document.querySelector('.sheet .sb'), it = cid => items.find(x => x.c.id === cid);
  const bind = () => {
    $('es-edit').onclick = () => { closeSheet(); openGroupEvalForm(null, null, items); };
    if ($('es-endu')) $('es-endu').onclick = () => { closeSheet(); enOpen(items.map(({c, e}) => ({cid: c.id, eid: e.id}))); };
    if ($('es-crit')) $('es-crit').onclick = () => { sheetOnClose = null; closeSheet(); critOpen(items); };
    if ($('es-crprt')) $('es-crprt').onclick = () => critPrint(items);
    evBindSin(sb, el => it(el.dataset.cid), () => { sb.innerHTML = body(); bind(); });
  };
  bind();
  sheetOnClose = () => render();
}
