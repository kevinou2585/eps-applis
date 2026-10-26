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
  try { render(); } catch (e) {}   // le premier affichage a eu lieu avant ce fichier
})();
