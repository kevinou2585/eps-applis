/* Travaux à rendre (Kevin, 26/10/2026), dans l'appel (salle et piscine).
   - Chip « 📝 Travail » sous l'élève qui ne fait pas pleinement le cours (absent, dispensé, oubli de tenue, ne nage pas,
     règles, perturbe / exclu) : L.m[pid].tr = 1 et c.trav[pid] = {l: id de la leçon, d: date, due: date + 7 jours}.
   - Leçon suivante (date ≥ due) : rappel « Travail du … à rendre » avec trois choix :
       Remis ✓      → c.trav[pid] effacé, L.m[pid].trOk = {d, l} (rien n'est retiré, il repart de zéro) ;
       +1 semaine   → due = date du jour + 7 ;
       Zéro (−1)    → L.m[pid].tz = {d, l} : compute() retire 1 point de tenue (en attitude s'il n'en reste plus).
     Chaque choix s'annule (« Annuler » remet le rappel).
   Branché sur lessonRow (ligne sous l'élève) et sur le clic de la liste d'appel (data-act tr…). */
(() => {
  const st = document.createElement('style');
  st.textContent = `.prow:has(.tr-line){flex-wrap:wrap}
  .tr-line{flex:1 1 100%; display:flex; flex-wrap:wrap; align-items:center; gap:6px 8px; padding-left:49px; margin-top:-2px}
  .tr-chip{display:inline-flex; align-items:center; gap:4px; padding:3px 10px; min-height:30px; border:1.5px dashed var(--muted); border-radius:999px; font-size:12.5px; font-weight:700; color:var(--muted); background:var(--surface)}
  .tr-chip.on{border-style:solid; border-color:var(--accent); background:var(--accent-soft); color:var(--fg)}
  .tr-rap{flex:1 1 100%; display:flex; flex-wrap:wrap; align-items:center; gap:6px; font-size:13px; font-weight:700; line-height:1.3; padding:6px 8px; border-radius:8px; border-left:4px solid var(--accent); background:var(--accent-soft); color:var(--fg)}
  .tr-rap.no{border-left-color:var(--bad, #c0392b); background:var(--bad-soft, #fdecea)}
  .tr-rap.ok{border-left-color:var(--good, #2e8b57); background:var(--good-soft, #e8f5ee)}
  .tr-rap span{flex:1 1 100%}
  .tr-rap button{border:1.5px solid var(--line); background:var(--surface); color:var(--fg); border-radius:999px; padding:4px 10px; min-height:32px; font-size:13px; font-weight:700}
  .tr-rap button.z{border-color:var(--bad, #c0392b); color:var(--bad, #c0392b)}`;
  document.head.appendChild(st);

  const jj = iso => iso.slice(8) + '/' + iso.slice(5, 7);
  // le travail de cet élève à vérifier à cette leçon (donné avant, échéance atteinte)
  const aRendre = (c, L, p) => { const t = (c.trav || {})[p.id]; return t && t.l !== L.id && t.d < L.date && t.due <= L.date ? t : null; };
  const horsCours = (c, L, p, mm) => { const a = effA(p, L); return a === 'A' || a === 'D' || mm.k || mm.np || mm.rg || mm.d || mm.x; };

  const travChip = (c, L, p) => { const mm = L.m[p.id] || {};
    return mm.tr || horsCours(c, L, p, mm) ? `<button class="tr-chip${mm.tr ? ' on' : ''}" type="button" data-act="tr" aria-pressed="${!!mm.tr}">${mm.tr ? '✓ ' : ''}📝 Travail</button>` : ''; };
  window.travLine = function(c, L, p, sansChip){
    const mm = L.m[p.id] || {}, t = aRendre(c, L, p), out = [], ch = sansChip ? '' : travChip(c, L, p);
    if (ch) out.push(ch);
    if (t) out.push(`<div class="tr-rap"><span>📝 Travail donné le ${jj(t.d)}${t.due > addDays(t.d, 7) ? ' (déjà prolongé)' : ''} : remis ?</span><button type="button" data-act="tr-ok">✓ Remis</button><button type="button" data-act="tr-plus">+1 semaine</button><button type="button" class="z" data-act="tr-zero">Zéro (−1 tenue)</button></div>`);
    if (mm.tz) out.push(`<div class="tr-rap no"><span>📝 Travail du ${jj(mm.tz.d)} pas remis : −1 point de tenue.</span><button type="button" data-act="tr-undo">Annuler</button></div>`);
    if (mm.trOk) out.push(`<div class="tr-rap ok"><span>📝 Travail du ${jj(mm.trOk.d)} remis ✓</span><button type="button" data-act="tr-undo">Annuler</button></div>`);
    return out.length ? `<div class="tr-line">${out.join('')}</div>` : '';
  };

  window.travAct = function(act, c, L, p){
    const mm = L.m[p.id] || (L.m[p.id] = {}), T = c.trav || (c.trav = {}), t = T[p.id], nom = nomCourt(p);
    if (act === 'tr'){
      if (mm.tr){ delete mm.tr; if (t && t.l === L.id) delete T[p.id]; toast(`${nom} : plus de travail`); }
      else { mm.tr = 1; T[p.id] = {l: L.id, d: L.date, due: addDays(L.date, 7)}; toast(`${nom} : travail donné, rappel au cours de la semaine prochaine`); }
    } else if (act === 'tr-ok' && t){ mm.trOk = {d: t.d, l: t.l}; delete T[p.id]; toast(`${nom} : travail remis ✓`); }
    else if (act === 'tr-plus' && t){ t.due = addDays(L.date, 7); toast(`${nom} : une semaine de plus, rappel au prochain cours`); }
    else if (act === 'tr-zero' && t){ mm.tz = {d: t.d, l: t.l}; delete T[p.id]; toast(`${nom} : zéro au travail, −1 point de tenue`); }
    else if (act === 'tr-undo'){ const x = mm.tz || mm.trOk; if (x){ T[p.id] = {l: x.l, d: x.d, due: L.date}; delete mm.tz; delete mm.trOk; } }
  };

  const lr0 = lessonRow;
  lessonRow = function(c, L, p, r, pool){
    let h = lr0(c, L, p, r, pool); const rg = h.includes('R · règles</button>'), ch = rg ? travChip(c, L, p) : '';
    if (ch) h = h.replace('R · règles</button>', 'R · règles</button>' + ch);   // filles à la piscine : sur la même ligne que « règles »
    const x = travLine(c, L, p, rg);
    return x ? h.replace(/<\/div>\s*$/, x + '</div>') : h;
  };
  /* --- Onglet « Travaux » dans le haut de l'écran (Kevin, 26/10) : tous les travaux pas encore rendus, sans passer par les présences.
     Classes par année puis par nom (1A, 1B… 2A…), élèves par ordre alphabétique. Mêmes choix que le rappel à l'appel :
     ils s'enregistrent sur le dernier cours de la classe (aujourd'hui ou avant), donc l'appel, les points et le bulletin suivent. */
  const st2 = document.createElement('style');
  st2.textContent = `.trv-btn{border:1px solid var(--line); background:var(--surface); color:var(--fg); border-radius:99px; padding:5px 10px; font:700 .85rem var(--body); white-space:nowrap}
  .trv-btn b{display:inline-block; min-width:18px; margin-left:4px; padding:0 5px; border-radius:99px; background:var(--accent); color:#fff; font-size:.75rem; line-height:18px; text-align:center}
  .trv h3{margin:14px 0 6px; font:700 1.1rem var(--display)}
  .trv-it{border:1px solid var(--line); border-radius:12px; background:var(--surface); padding:10px 12px; margin:0 0 8px; display:grid; gap:8px}
  .trv-it .nm{display:flex; flex-wrap:wrap; align-items:baseline; gap:2px 8px}
  .trv-it .nm span{font-size:.85rem; color:var(--muted)}
  .trv-it .nm span.late{color:var(--bad, #c0392b); font-weight:700}
  .trv-it .bt{display:flex; flex-wrap:wrap; gap:6px}
  .trv-it .bt button{border:1.5px solid var(--line); background:var(--surface); color:var(--fg); border-radius:999px; padding:4px 12px; min-height:36px; font-size:13.5px; font-weight:700}
  .trv-it .bt button.ok{border-color:var(--good, #2e8b57); color:var(--good, #2e8b57)}
  .trv-it .bt button.z{border-color:var(--bad, #c0392b); color:var(--bad, #c0392b)}
  .trv-it.fait{background:var(--surface2, var(--surface)); border-style:dashed}`;
  document.head.appendChild(st2);
  const nomTri = p => (p.n || nomCourt(p) || '').toString();
  const travTous = () => {
    const out = [];
    S.classes.forEach(c => Object.entries(c.trav || {}).forEach(([pid, t]) => { const p = c.pupils.find(x => x.id === pid); if (p && t) out.push({c, p, t}); }));
    return out;
  };
  const classeTri = (a, b) => (progYear(a) || 9) - (progYear(b) || 9) || a.name.localeCompare(b.name, 'fr', {numeric: true});
  // le cours sur lequel on note le choix : le dernier de la classe jusqu'à aujourd'hui (sinon celui où le travail a été donné)
  const coursPour = (c, t) => { const d = today(); let L = null;
    c.lessons.forEach(l => { if (l.date <= d && (!L || l.date > L.date || (l.date === L.date && (l.h || '') > (L.h || '')))) L = l; });
    return L || c.lessons.find(l => l.id === t.l) || null; };
  let faits = [];   // choix faits dans cet écran : on peut les annuler tant qu'il est ouvert
  function majTrvBtn(){ const b = document.getElementById('trv-btn'); if (!b) return; const n = travTous().length;
    b.innerHTML = 'Travaux' + (n ? `<b>${n}</b>` : ''); b.setAttribute('aria-label', `Travaux pas encore rendus : ${n}`); }
  function openTravaux(){
    const L0 = travTous(), d = today(), cls = [...new Set(L0.map(x => x.c))].sort(classeTri);
    const ligne = ({c, p, t}) => { const late = t.due <= d;
      return `<div class="trv-it" data-c="${c.id}" data-p="${p.id}"><div class="nm"><b>${esc(p.n || nomCourt(p))}</b><span>donné le ${jj(t.d)}${t.due > addDays(t.d, 7) ? ' (prolongé)' : ''}</span><span class="${late ? 'late' : ''}">${late ? 'à rendre depuis le ' : 'à rendre le '}${jj(t.due)}</span></div>
        <div class="bt"><button type="button" class="ok" data-trv="ok">✓ Remis</button><button type="button" data-trv="plus">+1 semaine</button><button type="button" class="z" data-trv="zero">Zéro (−1 tenue)</button></div></div>`; };
    const fait = f => `<div class="trv-it fait" data-f="${faits.indexOf(f)}"><div class="nm"><b>${esc(nomCourt(f.p))}</b><span>${esc(f.c.name)} · ${f.txt}</span></div><div class="bt"><button type="button" data-trv="undo">Annuler</button></div></div>`;
    openSheet('Travaux', `<div class="trv">
      <p class="small muted" style="margin:0">Les élèves qui ont un 📝 travail pas encore rendu, toutes classes. Il apparaît ici dès que tu le donnes à l'appel ; ce que tu choisis ici se retrouve à l'appel et dans les points.</p>
      ${faits.length ? `<h3>Fait à l'instant</h3>${faits.map(fait).join('')}` : ''}
      ${cls.length ? cls.map(c => `<h3>${esc(c.name)}</h3>${L0.filter(x => x.c === c).sort((a, b) => nomTri(a.p).localeCompare(nomTri(b.p), 'fr')).map(ligne).join('')}`).join('')
        : '<p style="margin:14px 0 0"><b>Aucun travail en attente.</b> 👍</p>'}
    </div>`);
    const box = document.querySelector('#sheetroot .trv'); if (!box) return;
    box.onclick = e => { const b = e.target.closest('[data-trv]'); if (!b) return; const it = b.closest('.trv-it'), act = b.dataset.trv;
      if (act === 'undo'){ const f = faits[+it.dataset.f]; if (!f) return;
        if (f.act === 'plus') f.t.due = f.due0; else travAct('tr-undo', f.c, f.L, f.p);
        faits = faits.filter(x => x !== f); save(f.c.id); toast(`${nomCourt(f.p)} : annulé`); }
      else {
        const c = S.classes.find(x => x.id === it.dataset.c), p = c && c.pupils.find(x => x.id === it.dataset.p), t = c && (c.trav || {})[p && p.id]; if (!t) return;
        const L = coursPour(c, t); if (!L){ toast('Pas de cours pour cette classe'); return; }
        if (act === 'plus'){ const due0 = t.due; t.due = addDays(d, 7); faits.unshift({act, c, p, L, t, due0, txt: `prolongé jusqu'au ${jj(t.due)}`}); toast(`${nomCourt(p)} : une semaine de plus`); }
        else { travAct(act === 'ok' ? 'tr-ok' : 'tr-zero', c, L, p); faits.unshift({act, c, p, L, txt: act === 'ok' ? 'remis ✓' : 'zéro, −1 point de tenue'}); }
        save(c.id);
      }
      render(); openTravaux(); };
    sheetOnClose = () => { faits = []; };
  }
  window.openTravaux = openTravaux;
  const top = document.querySelector('header.top .wrap'), brand = top && top.querySelector('.brand');
  if (brand && !document.getElementById('trv-btn')){   // entre « Carnet EPS » et « Aide »
    const b = document.createElement('button'); b.type = 'button'; b.className = 'trv-btn'; b.id = 'trv-btn';
    b.onclick = () => { faits = []; openTravaux(); }; brand.after(b);
  }
  const render0 = render;
  render = function(){ const r = render0.apply(this, arguments); majTrvBtn(); return r; };

  try { render(); } catch (e) {}   // le premier affichage a eu lieu avant ce fichier
})();
