/* ====== Retirer une classe / classes retirées (kevin, 1er nov. 2026) ======
   Chargé après les autres scripts du carnet : enveloppe fiClassList() (liste « Mes classes »).
   Sous « Bulletin Excel de toutes les classes » :
   - « Retirer une classe » : la classe disparaît de partout (Classes, Présences, Agenda, horaire, planning de l'année…)
     et part dans les archives, avec tout ce qui la concerne : élèves, leçons, évaluations, ses cours de l'horaire,
     son planning (planAn, planAn2) ;
   - « Classes retirées (N) » : la liste des archives, avec « Remettre » (tout revient) et « Supprimer pour de bon ».
   Archives : S.settings.archives = [{c: classe, at: date, tt: [cours de l'horaire], pa: planAn, pa2: planAn2}]
   (dans les réglages : enregistré sur l'appareil et en ligne comme le reste).
   Une classe retirée est marquée supprimée (S.deleted) pour la synchro ; remise, elle reprend un nouvel identifiant
   (sinon la synchro la supprimerait de nouveau). */
(() => {
  const arch = () => Array.isArray(S.settings.archives) ? S.settings.archives : (S.settings.archives = []);
  const copie = o => JSON.parse(JSON.stringify(o));
  const quand = ts => { const d = new Date(ts); return `${d.getDate()} ${MOIS[d.getMonth()]} ${d.getFullYear()}`; };

  function retirer(c){
    const slots = tt().filter(s => s.cls.includes(c.id)).map(copie);
    const pa = (S.settings.planAn || {})[c.id], pa2 = (S.settings.planAn2 || {})[c.id], pj = (S.settings.planJ || {})[c.id], pj2 = (S.settings.planJ2 || {})[c.id];
    arch().push({c: copie(c), at: Date.now(), tt: slots, ...(pa ? {pa: copie(pa)} : {}), ...(pa2 ? {pa2: copie(pa2)} : {}), ...(pj ? {pj: copie(pj)} : {}), ...(pj2 ? {pj2: copie(pj2)} : {})});
    S.classes = S.classes.filter(x => x !== c); S.deleted.push(c.id);
    tt().forEach(s => s.cls = s.cls.filter(id => id !== c.id)); S.settings.tt = tt().filter(s => s.cls.length);
    if (S.settings.planAn) delete S.settings.planAn[c.id];
    if (S.settings.planAn2) delete S.settings.planAn2[c.id];
    if (S.settings.planJ) delete S.settings.planJ[c.id];
    if (S.settings.planJ2) delete S.settings.planJ2[c.id];
    if (S.cur === c.id) S.cur = S.classes[0]?.id || null;
    if (Array.isArray(UI.cgrp)) UI.cgrp = UI.cgrp.filter(id => id !== c.id);
    UI.cview = false; save(c.id);
  }

  function remettre(a){
    const nid2 = nid('c'), old = a.c.id, c = {...copie(a.c), id: nid2, ts: Date.now()};
    S.classes.push(c);
    (a.tt || []).forEach(s0 => {
      /* le même cours existe encore (groupe avec une autre classe) : on y rajoute la classe ; sinon on le recrée */
      const s = tt().find(x => x.d === s0.d && x.h === s0.h && (x.h2 || null) === (s0.h2 || null) && !!x.pick === !!s0.pick);
      if (s){ if (!s.cls.includes(nid2)) s.cls.push(nid2); }
      else S.settings.tt = [...tt(), {...copie(s0), cls: s0.cls.map(id => id === old ? nid2 : id).filter(id => id === nid2 || S.classes.some(x => x.id === id))}];
    });
    if (a.pa) S.settings.planAn = {...(S.settings.planAn || {}), [nid2]: copie(a.pa)};
    if (a.pa2) S.settings.planAn2 = {...(S.settings.planAn2 || {}), [nid2]: copie(a.pa2)};
    if (a.pj) S.settings.planJ = {...(S.settings.planJ || {}), [nid2]: copie(a.pj)};
    if (a.pj2) S.settings.planJ2 = {...(S.settings.planJ2 || {}), [nid2]: copie(a.pj2)};
    S.settings.archives = arch().filter(x => x !== a);
    save(nid2);
    return c;
  }

  function supprimer(a){
    (a.c.pupils || []).forEach(p => { if (PH[p.id]){ delete PH[p.id]; phDel.add(p.id); } (p.certs || []).forEach(x => { delete PH['cert_' + x.id]; phDel.add('cert_' + x.id); }); });
    persistPhotos();
    S.settings.archives = arch().filter(x => x !== a); save();
  }

  const resume = c => `${c.pupils.length} élève${c.pupils.length > 1 ? 's' : ''} · ${c.lessons.length} leçon${c.lessons.length > 1 ? 's' : ''} · ${c.evals.length} éval${c.evals.length > 1 ? 's' : ''}`;

  function ouvrirRetirer(){
    if (!S.classes.length){ toast('Aucune classe à retirer'); return; }
    openSheet('Retirer une classe', `
      <p class="small muted" style="margin:0">Choisis la classe. Elle disparaît de partout (classes, présences, agenda, horaire, planning) et va dans « Classes retirées », d'où tu peux la remettre.</p>
      <div class="ar-l">${S.classes.map(c => `<button class="ev" type="button" data-arr="${c.id}"><span class="t"><b>${esc(c.name)}</b><span class="small muted">${resume(c)}</span></span></button>`).join('')}</div>
      <div id="ar-cf"></div>`);
    document.querySelectorAll('[data-arr]').forEach(b => b.onclick = () => {
      const c = S.classes.find(x => x.id === b.dataset.arr); if (!c) return;
      document.querySelectorAll('[data-arr]').forEach(x => x.setAttribute('aria-pressed', x === b));
      $('ar-cf').innerHTML = `<div class="confirm"><b>Retirer la classe ${esc(c.name)} ?</b><span class="small">Elle n'apparaîtra plus nulle part. Tout est gardé dans « Classes retirées » : tu peux la remettre telle quelle.</span>
        <div class="row2"><button class="btn" type="button" id="ar-no">Garder</button><button class="btn pri" type="button" id="ar-ok" style="background:var(--bad);border-color:var(--bad)">Retirer ${esc(c.name)}</button></div></div>`;
      $('ar-cf').scrollIntoView({block: 'nearest'});
      $('ar-no').onclick = () => { $('ar-cf').innerHTML = ''; b.setAttribute('aria-pressed', 'false'); };
      $('ar-ok').onclick = () => { retirer(c); closeSheet(); render(); toast(`${c.name} retirée (dans « Classes retirées »)`); };
    });
  }

  function ouvrirArchives(){
    const l = [...arch()].reverse();
    openSheet('Classes retirées', l.length ? `
      <p class="small muted" style="margin:0">« Remettre » rend la classe avec tout ce qu'elle avait (élèves, leçons, évaluations, horaire, planning).</p>
      ${l.map((a, i) => `<div class="card ar-c"><div><b>${esc(a.c.name)}</b><span class="small muted">Retirée le ${quand(a.at)} · ${resume(a.c)}</span></div>
        <div class="row2"><button class="btn" type="button" data-arb="${i}">Remettre</button><button class="btn" type="button" data-ard="${i}" style="color:var(--bad)">Supprimer pour de bon</button></div><div data-arc="${i}"></div></div>`).join('')}`
      : '<p class="small muted">Aucune classe retirée.</p>');
    document.querySelectorAll('[data-arb]').forEach(b => b.onclick = () => { const c = remettre(l[+b.dataset.arb]); closeSheet(); render(); toast(`${c.name} est de retour`); });
    document.querySelectorAll('[data-ard]').forEach(b => b.onclick = () => {
      const i = +b.dataset.ard, a = l[i], box = document.querySelector(`[data-arc="${i}"]`);
      box.innerHTML = `<div class="confirm"><b>Supprimer ${esc(a.c.name)} pour de bon ?</b><span class="small">Tout ce qu'elle contient sera effacé, sans retour possible.</span>
        <div class="row2"><button class="btn" type="button" data-x="no">Garder</button><button class="btn pri" type="button" data-x="ok" style="background:var(--bad);border-color:var(--bad)">Supprimer</button></div></div>`;
      box.querySelector('[data-x="no"]').onclick = () => box.innerHTML = '';
      box.querySelector('[data-x="ok"]').onclick = () => { supprimer(a); toast(`${a.c.name} supprimée`); ouvrirArchives(); };
    });
  }

  const fcl0 = fiClassList;
  fiClassList = function(m){
    const r = fcl0.apply(this, arguments);
    const x = $('cl-xls'), n = arch().length;
    if (x){
      const ap = x.nextElementSibling && x.nextElementSibling.tagName === 'P' ? x.nextElementSibling : x;
      ap.insertAdjacentHTML('afterend', `<div class="ar-bt"><button class="btn block" type="button" id="cl-ret">Retirer une classe</button>
        ${n ? `<button class="btn block" type="button" id="cl-arch">Classes retirées (${n})</button>` : ''}</div>`);
      $('cl-ret').onclick = ouvrirRetirer;
      if ($('cl-arch')) $('cl-arch').onclick = ouvrirArchives;
    }
    return r;
  };
  window.carnetArchives = {retirer, remettre, ouvrirRetirer, ouvrirArchives};

  const css = document.createElement('style');
  css.textContent = `
.ar-bt{display:grid; gap:8px; margin-top:4px; padding-top:12px; border-top:1px solid var(--line)}
.ar-l{display:grid; gap:8px}
.ar-l .ev[aria-pressed="true"]{outline:2px solid var(--bad); outline-offset:-2px}
.ar-c{display:grid; gap:10px; padding:12px 14px}
.ar-c > div:first-child{display:grid; gap:2px}`;
  document.head.appendChild(css);
})();
