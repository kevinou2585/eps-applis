/* ====== Réglages : tout le barème et les règles de l'appli au même endroit ======
   Réglages déjà là (repris, pas dupliqués) : S.settings.T, C (points par période), se (% savoir-être), X (attitude par
   exclusion), npCounts (« ne nage pas » compte), comAuto (commentaires), work (travail laissé, piscine), tt (horaire), sports.
   Ajoutés (valeur absente = comportement d'avant) :
     kitPts (1) points de tenue par oubli · dPts (1) points d'attitude par perturbation · npPts (1) points de tenue par
     « ne nage pas » (si npCounts) · spill (true) colonne vide → on retire dans l'autre · rgWarn (true) avertissement
     « Ne semaine de suite » des règles · evMax (10) « sur combien » proposé · enGuard (5) secondes entre deux tours
     comptés · enStep (0,5) arrondi des notes d'endurance · enLast (true) alerte « plus qu'une minute ».
   Tout passe par save() : appareil + Drive. La roue dentée ouvre la rubrique qui va avec l'onglet en cours. */
const REG_DEF = {kitPts: 1, dPts: 1, npPts: 1, spill: true, rgWarn: true, evMax: 10, enGuard: 5, enStep: 0.5, enLast: true};
const stN = k => { const v = +S.settings[k]; return S.settings[k] == null || S.settings[k] === '' || isNaN(v) ? REG_DEF[k] : v; };
const stB = k => S.settings[k] == null ? REG_DEF[k] : S.settings[k] !== false;
const regPl = (n, w) => `${fr(n, 2)} ${w}${n > 1 ? 's' : ''}`;
function regKitTxt(){
  return `−${fr(stN('kitPts'), 2)} tenue${stB('spill') ? ' ; plus de points en tenue : retiré en attitude' : ''}`;
}
const REG_SECS = [['tt-card', 'Horaire'], ['sp-card', 'Sports'], ['reg-bareme', 'Barème'], ['reg-pool', 'Piscine'], ['reg-evals', 'Évaluations'], ['reg-com', 'Commentaires'], ['reg-per', 'Périodes'], ['reg-save', 'Sauvegarde']];
const REG_JUMP = {today: 'reg-bareme', evals: 'reg-evals', classes: 'reg-bareme', agenda: 'tt-card'};
function regJump(id){
  setTimeout(() => { const el = $(id); if (!el) return; el.scrollIntoView({block: 'start'}); window.scrollBy(0, -12);
    el.classList.remove('reg-flash'); void el.offsetWidth; el.classList.add('reg-flash'); }, 60);
}
function regGear(){
  if (UI.tab === 'settings'){ UI.tab = UI.regBack && UI.regBack !== 'settings' ? UI.regBack : 'today'; saveUI(); render(); window.scrollTo(0, 0); return; }
  const id = REG_JUMP[UI.tab] || 'reg-bareme';
  UI.regBack = UI.tab; UI.tab = 'settings'; saveUI(); render(); window.scrollTo(0, 0); regJump(id);
}
function regToc(){
  return `<nav class="chips reg-toc" aria-label="Rubriques des réglages">${REG_SECS.map(([id, l]) => `<button class="chip" type="button" data-regj="${id}">${l}</button>`).join('')}</nav>`;
}
function regCards(){
  const st = S.settings, n = (id, k, lab, help, mode = 'numeric') => `<label class="f">${lab}<input class="inp num" id="${id}" inputmode="${mode}" value="${esc(fr(stN(k), 2))}" data-regk="${k}">${help ? `<span class="small muted" style="font-weight:400">${help}</span>` : ''}</label>`;
  const tg = (id, k, lab, help) => `<label class="toggle"><input type="checkbox" id="${id}" data-regb="${k}" ${stB(k) ? 'checked' : ''}>${lab}</label>${help ? `<p class="small muted" style="margin:-6px 0 0">${help}</p>` : ''}`;
  return `<div class="card sec reg" style="padding-block:14px" id="reg-bareme">
      <h3>Barème (toutes les classes)</h3>
      <p class="small muted" style="margin:0">Chaque élève commence chaque période avec tous ses points, puis on retire.</p>
      <div class="row2"><label class="f" style="flex:1">Points de tenue par période<input class="inp num" id="s-T" inputmode="numeric" value="${st.T}"></label>
      <label class="f" style="flex:1">Points d'attitude par période<input class="inp num" id="s-C" inputmode="numeric" value="${st.C}"></label></div>
      <label class="f">Savoir-être en % du bulletin<input class="inp num" id="s-se" inputmode="numeric" value="${st.se}"></label>
      <p class="small" id="s-separt" style="margin:-4px 0 0">${regPart(st.se)}</p>
      <b class="small reg-sub">Points retirés</b>
      <div class="row2">${n('s-kit', 'kitPts', 'Oubli de tenue (salle ou maillot)', 'en tenue')}${n('s-d', 'dPts', 'Perturbe le cours', 'en attitude')}</div>
      <label class="f">Exclusion du cours<input class="inp num" id="s-X" inputmode="numeric" value="${st.X}"><span class="small muted" style="font-weight:400">en attitude</span></label>
      ${tg('s-spill', 'spill', 'Colonne vide : on retire dans l\'autre', 'Activé (comme avant) : plus de points en tenue → l\'oubli suivant retire en attitude, et inversement. Désactivé : une colonne à 0 reste à 0, rien n\'est retiré ailleurs.')}
    </div>
    <div class="card sec reg" style="padding-block:14px" id="reg-pool">
      <h3>Piscine &amp; règles</h3>
      <label class="toggle"><input type="checkbox" id="s-np" ${st.npCounts ? 'checked' : ''}>« Ne nage pas » retire des points de tenue</label>
      <div id="s-npw" ${st.npCounts ? '' : 'hidden'}>${n('s-npp', 'npPts', 'Points de tenue par « ne nage pas »', '')}</div>
      ${tg('s-rgw', 'rgWarn', 'Règles : avertir à l\'appel « ⚠ 2e semaine de suite »', 'Les règles ne coûtent jamais de point et ne sont jamais écrites dans les commentaires ni dans le message aux éducateurs (« ne nage pas »).')}
      <label class="f">Travail laissé (message aux éducateurs)<input class="inp" id="s-work" value="${esc(st.work ?? 'J\'ai laissé un travail à faire.')}"></label>
    </div>
    <div class="card sec reg" style="padding-block:14px" id="reg-evals">
      <h3>Évaluations &amp; endurance</h3>
      ${n('s-evmax', 'evMax', '« Sur combien » proposé pour une nouvelle évaluation', '', 'decimal')}
      ${n('s-eng', 'enGuard', 'Compteur de tours : secondes avant de recompter le même élève', 'contre les doubles touchers (0 = jamais bloqué)', 'decimal')}
      <label class="f">Arrondi des notes d'endurance<select class="inp" id="s-enstep">${[[0.1, 'au dixième (0,1)'], [0.25, 'au quart de point (0,25)'], [0.5, 'au demi-point (0,5)'], [1, 'au point entier (1)']].map(([v, l]) => `<option value="${v}" ${stN('enStep') === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
      ${tg('s-enl', 'enLast', 'Compteur : alerte « plus qu\'une minute » (bip, vibration)', '')}
    </div>`;
}
// partage du bulletin écrit en clair : savoir-être / savoir-faire
function regPart(se){ se = Math.max(0, Math.min(100, Math.round(+se) || 0));
  return `<b>${se} %</b> savoir-être (tenue, attitude, participation) et <b>${100 - se} %</b> savoir-faire (évaluations des sports pratiqués)`; }
function regPerCard(){
  const cl = S.classes.filter(c => !c.act);
  return `<div class="card sec reg" style="padding-block:14px" id="reg-per">
      <h3>Périodes et dates</h3>
      <p class="small muted" style="margin:0">Chaque classe a ses périodes (nom, date de début, salle ou piscine). Touche une classe pour les modifier.</p>
      ${cl.length ? `<div class="row2">${cl.map(c => `<button class="chip" type="button" data-regper="${c.id}">${esc(c.name)} · ${c.periods.length} pér.</button>`).join('')}</div>` : '<span class="small muted">Pas encore de classe.</span>'}
    </div>`;
}
function bindReg(){
  const st = S.settings;
  const num = (id, k, lo, hi, int = true) => { const el = $(id); if (!el) return; el.onchange = e => { let v = parseNum(e.target.value); if (v != null && int) v = Math.round(v);
    if (v == null || isNaN(v) || v < lo || v > hi){ e.target.value = k in REG_DEF ? fr(stN(k), 2) : st[k]; toast(`Entre ${lo} et ${hi}`); return; }
    st[k] = v; save(); toast('Enregistré'); }; };
  num('s-T', 'T', 0, 20); num('s-X', 'X', 0, 20); num('s-C', 'C', 0, 20); num('s-se', 'se', 0, 100);
  if ($('s-se')) $('s-se').oninput = e => { const v = parseNum(e.target.value); if (v != null && v >= 0 && v <= 100) $('s-separt').innerHTML = regPart(v); };
  num('s-kit', 'kitPts', 0, 10); num('s-d', 'dPts', 0, 10); num('s-npp', 'npPts', 0, 10);
  num('s-evmax', 'evMax', 1, 1000, false); num('s-eng', 'enGuard', 0, 60, false);
  $('s-np').onchange = e => { st.npCounts = e.target.checked; $('s-npw').hidden = !st.npCounts; save(); };
  document.querySelectorAll('[data-regb]').forEach(x => x.onchange = () => { st[x.dataset.regb] = x.checked; save(); toast('Enregistré'); });
  $('s-enstep').onchange = e => { st.enStep = +e.target.value; save(); toast('Enregistré'); };
  $('s-work').onchange = e => { st.work = e.target.value; save(); toast('Enregistré'); };
  document.querySelectorAll('[data-regj]').forEach(b => b.onclick = () => regJump(b.dataset.regj));
  document.querySelectorAll('[data-regper]').forEach(b => b.onclick = () => { S.cur = b.dataset.regper; UI.tab = 'classes'; UI.cview = true; UI.ctab = 'pupils'; save(); render(); setTimeout(() => $('s-addper')?.scrollIntoView({block: 'center'}), 60); });
}
