/* ====== Skore (Smartschool) : copier les notes et les commentaires, puis le favori « Remplir Skore » les tape ======
   Chargé après le carnet (<script src="skore.js"> dans carnet/index.html : à remettre si construire.py régénère la page).
   - Classes › Bulletins : savoir-faire, savoir-être (sous « Commentaires bulletin » : les commentaires).
   - Classes › Évaluations : chaque évaluation séparément.
   - Classes regroupées : les classes à la suite (par nom), comme dans Skore ; élèves rangés par nom de famille, comme Skore.
   - Absent, dispensé, certificat, pas de note = case vide.
   - Réglages › Skore : installer le favori (source : SK_FAVORI ci-dessous).
   Presse-papiers : notes « SKORE:v1;v2;… » ; commentaires « SKORECOM:[{n:"Prénom Nom", t:"texte"}] » (le favori lit le nom
   affiché dans la fenêtre de Skore et met le bon texte ; un élève de Skore absent du carnet est laissé tel quel). */
(() => {
  const LS = (k, v) => { const ls = window.DEMO_LS || localStorage; try { if (v === undefined) return ls.getItem(k); ls.setItem(k, v); } catch(e){ return null; } };
  const SANS = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const cmp = (a, b) => SANS(a).localeCompare(SANS(b), 'fr', {numeric: true});
  const skClasses = cs => [...cs].filter(c => !c.act).sort((a, b) => cmp(a.name, b.name));
  // ordre de Skore : nom de famille, puis prénom (quel que soit l'ordre choisi dans le carnet)
  const skEleves = c => [...c.pupils].sort((a, b) => { const x = nomPre(a), y = nomPre(b); return cmp(x.nom || a.n, y.nom || b.n) || cmp(x.pre, y.pre); });
  const skNom = p => { const x = nomPre(p); return [x.pre, x.nom].filter(Boolean).join(' ') || p.n; };
  const skVal = v => v == null || isNaN(v) ? '' : String(Math.round(v * 10) / 10).replace('.', ',');
  const skNb = s => { const v = parseNum(String(s || '')); return v != null && v > 0 ? v : null; };
  const AIDE_NOTES = 'Dans Skore (sur l\'ordinateur), clique la case du <b>1er élève</b> de la colonne, puis le favori <b>⭐ Remplir Skore</b>. Il tape les notes une à une et saute les lignes grises des classes.';

  /* --- fenêtre commune : liste des valeurs, « sur combien dans Skore », bouton copier --- */
  function skSheet(titre, intro, blocs, maxDef, cle){
    let max = skNb(LS(cle)) || maxDef;
    const vals = () => blocs.flatMap(b => b.rows.map(r => r.v == null ? '' : skVal(r.v / r.sur * max)));
    const body = () => `
      <p class="small muted" style="margin:0">${intro}</p>
      <label class="f">Sur combien dans Skore ?<input class="inp num" id="sk-max" inputmode="decimal" value="${esc(skVal(max))}"><span class="small muted" style="font-weight:400">Le total de la colonne dans Skore. Les notes sont converties et arrondies au dixième.</span></label>
      <button class="btn pri block" type="button" id="sk-cp">📋 Copier pour Skore (${blocs.reduce((a, b) => a + b.rows.length, 0)} élèves)</button>
      <p class="small" style="margin:0">${AIDE_NOTES}</p>
      <div id="sk-list">${liste()}</div>`;
    const liste = () => { const v = vals(); let i = 0;
      return blocs.map(b => `<h3 class="fi-cl">${esc(b.titre)}</h3><div class="tblw"><table class="bt num"><tbody>${b.rows.map(r => { const x = v[i++];
        return `<tr><td>${esc(r.nom)}</td><td>${x === '' ? `<span class="muted">vide${r.pq ? ' · ' + esc(r.pq) : ''}</span>` : x}</td></tr>`; }).join('')}</tbody></table></div>`).join(''); };
    openSheet(titre, body());
    $('sk-max').oninput = e => { const v = skNb(e.target.value); if (!v) return; max = v; LS(cle, String(v)); $('sk-list').innerHTML = liste(); };
    $('sk-cp').onclick = () => { const v = vals(); comCopy('SKORE:' + v.join(';'), `${v.filter(x => x !== '').length} note${v.length > 1 ? 's' : ''} copiée${v.length > 1 ? 's' : ''} : va dans Skore`); };
  }

  /* --- Bulletins : savoir-faire / savoir-être --- */
  function skBulletin(cs, quoi){
    const seP = +S.settings.se, sur = quoi === 'sf' ? 100 - seP : seP, lab = quoi === 'sf' ? 'Savoir-faire' : 'Savoir-être';
    const blocs = skClasses(cs).map(c => { const vp = viewPeriod(c); if (!vp) return {titre: c.name, rows: skEleves(c).map(p => ({nom: p.n, v: null, sur, pq: 'pas de période'}))};
      const X = vp === 'year' ? computeYear(c) : compute(c, vp);
      return {titre: `${c.name} · ${vp === 'year' ? 'année' : vp.name}`, rows: skEleves(c).map(p => { const r = X.res[p.id], v = r ? r[quoi] : null;
        return {nom: p.n, v: v == null ? null : v, sur, pq: quoi === 'sf' && v == null ? 'pas d\'évaluation' : ''}; })}; });
    skSheet(`Skore · ${lab}`, `${lab} de chaque élève (sur ${sur} dans le carnet), ${blocs.length > 1 ? 'les classes à la suite, ' : ''}dans l'ordre de Skore (nom de famille).`, blocs, sur, 'carnet-skore-max-' + quoi);
  }

  /* --- Évaluations : une à la fois (classes regroupées : même nom d'évaluation) --- */
  function skEvals(cs){
    const cl = skClasses(cs), g = new Map();
    cl.forEach(c => { const v = viewPeriod(c);
      c.evals.filter(e => v === 'year' || e.periodId === v?.id).forEach(e => { const k = SANS(e.name).trim();
        if (!g.has(k)) g.set(k, {nom: e.name.trim() || 'Évaluation', date: e.date || '', par: new Map(), form: e.kind === 'form'});
        const o = g.get(k); if (!o.par.has(c.id)) o.par.set(c.id, e); if ((e.date || '') < o.date) o.date = e.date || ''; }); });
    const evs = [...g.values()].sort((a, b) => a.date.localeCompare(b.date));
    if (!evs.length){ toast('Pas d\'évaluation sur cette période'); return; }
    openSheet('Skore · Évaluations', `<p class="small muted" style="margin:0">Choisis l'évaluation à copier dans sa colonne de Skore.${cl.length > 1 ? ' Les classes du groupe sont mises à la suite (même nom d\'évaluation).' : ''}</p>
      ${evs.map((o, i) => `<button class="ev" type="button" data-skev="${i}"><span class="t"><b>${esc(o.nom)}${o.form ? ' (F)' : ''}</b><span class="small muted">${o.date ? esc(fmtD(o.date)) + ' · ' : ''}${cl.map(c => o.par.has(c.id) ? esc(c.name) + ' /' + fr(+o.par.get(c.id).max, 2) : `<s>${esc(c.name)}</s>`).join(' · ')}</span></span><span class="sur">📋</span></button>`).join('')}`);
    document.querySelectorAll('[data-skev]').forEach(b => b.onclick = () => { const o = evs[+b.dataset.skev], e0 = o.par.values().next().value;
      const blocs = cl.map(c => { const e = o.par.get(c.id);
        return {titre: c.name + (e ? '' : ' · pas cette évaluation'), rows: skEleves(c).map(p => { const s = e ? e.s[p.id] : null;
          return {nom: p.n, v: typeof s === 'number' ? s : null, sur: e ? +e.max : 1, pq: evTag(s) ? evTagLong(s) : e ? '' : 'pas d\'évaluation'}; })}; });
      skSheet(`Skore · ${o.nom}`, `Notes de « ${esc(o.nom)} » (sur ${fr(+e0.max, 2)} dans le carnet). Absent, dispensé, certificat : case vide.`, blocs, +e0.max, 'carnet-skore-max-ev-' + SANS(o.nom).trim()); });
  }

  /* --- Commentaires de bulletin (texte modifié, sinon automatique), toutes les classes ouvertes --- */
  function skComs(cs){
    const auto = S.settings.comAuto !== false, L = [], blocs = [];
    skClasses(cs).forEach(c => { const vp = viewPeriod(c); if (!vp) return;
      const X = vp === 'year' ? computeYear(c) : compute(c, vp), key = vp === 'year' ? 'year' : vp.id, mine = (c.com || {})[key] || {};
      const rows = skEleves(c).map(p => { const t = (typeof mine[p.id] === 'string' ? mine[p.id] : auto ? comText(c, vp, X, p) : '').replace(/\s*\n\s*/g, ' ').trim().slice(0, 1200);
        if (t) L.push({n: skNom(p), t}); return {p, t}; });
      blocs.push({c, vp, rows}); });
    if (!L.length){ toast('Aucun commentaire à copier'); return; }
    openSheet('Skore · Commentaires', `<p class="small muted" style="margin:0">${L.length} commentaire${L.length > 1 ? 's' : ''}${blocs.length > 1 ? ' (' + blocs.map(b => esc(b.c.name)).join(' + ') + ')' : ''}. Chacun porte le nom de son élève : le favori met le bon texte même si l'ordre change.</p>
      <button class="btn pri block" type="button" id="sk-cp">📋 Copier les commentaires pour Skore</button>
      <p class="small" style="margin:0">Dans Skore, clique la case « Commentaire » du <b>1er élève</b> : sa fenêtre s'ouvre. Clique le favori <b>⭐ Remplir Skore</b>. OK = remplacer les commentaires déjà écrits, Annuler = les garder. Ne touche à rien jusqu'au message de fin.</p>
      ${blocs.map(b => `<h3 class="fi-cl">${esc(b.c.name)} · ${b.vp === 'year' ? 'année' : esc(b.vp.name)}</h3>${b.rows.map(r => `<div class="card small"><b>${esc(r.p.n)}</b><br>${r.t ? esc(r.t) : '<span class="muted">pas de commentaire</span>'}</div>`).join('')}`).join('')}`);
    $('sk-cp').onclick = () => comCopy('SKORECOM:' + JSON.stringify(L), `${L.length} commentaire${L.length > 1 ? 's' : ''} copié${L.length > 1 ? 's' : ''} : va dans Skore`);
  }

  /* --- boutons ajoutés aux vues de classe et carte des Réglages --- */
  const btn = (txt, f, cls) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'btn block ' + (cls || ''); b.textContent = txt; b.onclick = f; return b; };
  function skPoser(){
    if (UI.tab === 'settings') return skReglages();
    const cv = $('cv'), c = C(); if (UI.tab !== 'classes' || !UI.cview || !cv || !c) return;
    const cs = fiClassesOpen(c), noms = skClasses(cs).map(x => x.name).join(' + '), grp = cs.length > 1;
    if (!skClasses(cs).length) return;
    if (UI.ctab === 'report'){
      const coms = [...cv.querySelectorAll('button')].filter(b => /Commentaires bulletin/.test(b.textContent));
      coms.forEach(b => b.after(btn(`📋 Copier les commentaires pour Skore${grp ? ' (' + noms + ')' : ''}`, () => skComs(cs))));
      const row = document.createElement('div'); row.className = 'row2 sk-row';
      row.append(btn('📋 Savoir-faire', () => skBulletin(cs, 'sf')), btn('📋 Savoir-être', () => skBulletin(cs, 'se')));
      const h = document.createElement('p'); h.className = 'small muted'; h.style.margin = '0'; h.textContent = 'Copier pour Skore' + (grp ? ' (' + noms + ' à la suite)' : '') + ' :';
      if (grp){ const fin = cv.querySelector(':scope > section.sec:last-child'); if (fin){ fin.prepend(row); fin.prepend(h); } }
      else { const last = coms[coms.length - 1]?.nextSibling; if (last){ last.after(h); h.after(row); } }
    } else if (UI.ctab === 'evals'){
      const sec = cv.querySelector('section.sec'), p = sec && sec.querySelector(':scope > p'); if (!p) return;
      p.after(btn(`📋 Copier une évaluation pour Skore${grp ? ' (' + noms + ')' : ''}`, () => skEvals(cs)));
    }
  }
  function skReglages(){
    const ref = $('reg-com'); if (!ref || $('reg-skore')) return;
    const d = document.createElement('div'); d.className = 'card sec reg'; d.style.paddingBlock = '14px'; d.id = 'reg-skore';
    d.innerHTML = `<h3>Skore (Smartschool)</h3>
      <p class="small muted" style="margin:0">En fin de période, les boutons 📋 Skore (Classes › Bulletins et Évaluations) copient les notes ou les commentaires ; le favori « Remplir Skore » les tape dans Skore, sur l'ordinateur. À installer une seule fois dans Chrome (ou Edge), sur l'ordinateur où tu ouvres Skore.</p>
      <ol class="small" style="margin:0;padding-left:20px">
        <li>Affiche la barre des favoris : Ctrl+Maj+B (Mac : Cmd+Maj+B).</li>
        <li>Fais <b>glisser</b> ce bouton dans la barre des favoris : <a class="btn" id="sk-fav" draggable="true" style="display:inline-flex;cursor:grab;text-decoration:none;color:inherit">⭐ Remplir Skore</a></li>
        <li>Si le glisser ne marche pas : touche <b>Copier le favori</b>, puis clic droit sur la barre des favoris › Ajouter une page. Nom : Remplir Skore ; URL : colle (Ctrl+V).</li>
      </ol>
      <button class="btn" type="button" id="sk-favc">📋 Copier le favori</button>
      <p class="small muted" style="margin:0">Quand le carnet est mis à jour, il peut être utile de réinstaller le favori (supprime l'ancien). Pas sur téléphone : Skore se remplit depuis l'ordinateur.</p>`;
    ref.after(d);
    const a = $('sk-fav'); a.href = SK_LIEN;
    a.onclick = e => { e.preventDefault(); toast('Ne clique pas : fais-le glisser dans la barre des favoris'); };
    $('sk-favc').onclick = () => comCopy(SK_LIEN, 'Favori copié : colle-le comme adresse du nouveau favori');
  }
  // rubrique dans la table des matières des Réglages, après « Commentaires »
  try { const i = REG_SECS.findIndex(x => x[0] === 'reg-com'); REG_SECS.splice(i + 1, 0, ['reg-skore', 'Skore']); } catch(e){}
  const rend0 = render;
  render = function(){ rend0.apply(this, arguments); try { skPoser(); } catch(e){ console.error(e); } };
  window.skore = {bulletin: skBulletin, evals: skEvals, coms: skComs};

  /* --- le favori (tourne dans la page de Skore) --- */
  const SK_FAVORI = async () => {
    const T = 'Remplir Skore : ', P = ms => new Promise(r => setTimeout(r, ms));
    const docs = () => { const l = [document]; for (let i = 0; i < l.length; i++) for (const f of l[i].querySelectorAll('iframe,frame')){ try { if (f.contentDocument) l.push(f.contentDocument); } catch(e){} } return l; };
    const vis = e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const N = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]+/g, ' ').trim().split(' ').filter(Boolean).sort().join(' ');
    let t = ''; try { t = await navigator.clipboard.readText(); } catch(e){}
    if (!/\d|SKORE/.test(t || '')) t = prompt(T + 'colle ici ce que tu as copié dans le carnet (Ctrl+V), puis OK.') || '';
    if (/^\s*SKORECOM:/.test(t)){
      let L; try { L = JSON.parse(t.replace(/^\s*SKORECOM:/, '')); } catch(e){ alert(T + 'les commentaires copiés sont incomplets. Recopie-les dans le carnet.'); return; }
      const byN = {}; L.forEach(x => { if (x.n) byN[N(x.n)] = x; }); const parNom = L.some(x => x.n), nb = Object.keys(byN).length;
      const fr = d => { try { return d.defaultView.frameElement; } catch(e){ return null; } };
      const aire = e => { const r = e.getBoundingClientRect(); return r.width * r.height; };
      const zone = () => { let best = null, ba = 0; for (const d of docs()){ const c = [...d.querySelectorAll('textarea'), ...[...d.querySelectorAll('[contenteditable]')].filter(e => e.isContentEditable && !(e.parentElement && e.parentElement.isContentEditable))];
        if (d.body && (d.designMode === 'on' || d.body.isContentEditable) && fr(d)) c.push(d.body);
        for (const e of c){ const box = (e === d.body && fr(d)) ? fr(d) : e; if (!vu2(box)) continue; const a = aire(box); if (a > ba){ ba = a; best = e; } } } return best; };
      const val = z => z.tagName === 'TEXTAREA' ? z.value : (z.innerText || '');
      const ecr = (z, v) => { if (z.tagName === 'TEXTAREA') Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(z, v);
        else { z.focus && z.focus(); z.innerHTML = v.split('\n').map(l => l.replace(/&/g, '&amp;').replace(/</g, '&lt;')).join('<br>'); }
        ['input', 'keyup', 'change'].forEach(e => z.dispatchEvent(new Event(e, {bubbles: true}))); };
      const bouton = () => { let best = null, bt = -1; for (const d of docs()) for (const b of d.querySelectorAll('button,input[type=button],input[type=submit],a,span,div,td,em')){
        if (b.disabled || !vu2(b)) continue; const s = (b.tagName === 'INPUT' ? b.value : b.textContent || '').trim(); if (!/^ins[ée]rer$/i.test(s)) continue;
        if (!/BUTTON|INPUT/.test(b.tagName) && b.children.length) continue; if (b.closest('th,thead,[class*="hd"],[class*="header"]')) continue;
        let top = b.getBoundingClientRect().top; const f = fr(d); if (f) top += f.getBoundingClientRect().top; if (/BUTTON|INPUT/.test(b.tagName)) top += 10000; if (top > bt){ bt = top; best = b; } } return best; };
      const diag = () => { let ta = 0, ce = 0, ifr = 0, ins = []; for (const d of docs()){ ta += d.querySelectorAll('textarea').length; ce += d.querySelectorAll('[contenteditable]').length; ifr += d.querySelectorAll('iframe,frame').length;
        for (const e of d.querySelectorAll('*')) if (!e.children.length && /^ins[ée]rer$/i.test((e.textContent || e.value || '').trim())) ins.push(e.tagName + '.' + String(e.className).slice(0, 25)); }
        return 'zones texte ' + ta + ', éditables ' + ce + ', cadres ' + ifr + ', Insérer : ' + (ins.join(' ') || 'aucun'); };
      const vu2 = e => { if (!vis(e)) return false; const r = e.getBoundingClientRect(), w = e.ownerDocument.defaultView; if (r.bottom < 0 || r.right < 0 || r.top > w.innerHeight || r.left > w.innerWidth) return false;
        const c = w.getComputedStyle(e); return c.visibility !== 'hidden' && c.display !== 'none' && +c.opacity !== 0; };
      const nomDans = racine => { const ks = Object.keys(byN); let part = ''; const d = racine.ownerDocument || racine, w = d.createTreeWalker(racine, 4); let x;
        while ((x = w.nextNode())){ const s = (x.nodeValue || '').trim(); if (!s || s.length > 80 || s.indexOf(',') >= 0) continue; const p = x.parentElement;
          if (!p || /SCRIPT|STYLE|TEXTAREA|OPTION/.test(p.tagName) || !vu2(p)) continue; const k = N(s); if (byN[k]) return k;
          if (!part){ const tt = ' ' + k + ' ', c = ks.filter(q => q.split(' ').every(m => tt.indexOf(' ' + m + ' ') >= 0)); if (c.length === 1) part = c[0]; } } return part; };
      const nom = () => { if (!parNom) return ''; const z = zone(); if (!z) return ''; let e = (z.tagName === 'BODY' && fr(z.ownerDocument)) || z; for (let j = 0; j < 14 && e; j++){ const k = nomDans(e); if (k) return k; e = e.parentElement; } return ''; };
      // texte autour de la case (nom de l'élève, etc.) pour voir que Skore est passé à l'élève suivant
      const snap = z => { if (!z) return ''; let e = (z.tagName === 'BODY' && fr(z.ownerDocument)) || z; for (let j = 0; j < 4 && e.parentElement; j++) e = e.parentElement; return (e.innerText || '').replace(/\d+\s*\/\s*\d+/g, '').slice(0, 300); };
      if (!zone() || !bouton()){ alert(T + 'ouvre d\'abord la fenêtre « Commentaire » du 1er élève (clique sa case), puis touche à nouveau le favori.\n\nSi elle est déjà ouverte, envoie une capture de ce message à Claude : ' + (zone() ? '' : 'case de texte introuvable. ') + (bouton() ? '' : 'bouton Insérer introuvable. ') + diag()); return; }
      const remplacer = confirm(T + L.length + ' commentaire(s) prêts. OK = écrire, même s\'il y a déjà un texte. Annuler = ne pas toucher aux élèves qui ont déjà un commentaire.');
      let n = 0, saut = 0, hors = 0, i = 0; const vu = new Set();
      while (true){
        const z = zone(), b = bouton(); if (!z || !b) break;
        let x = null, k = '';
        if (parNom){ k = nom(); if (k){ if (vu.has(k)) break; vu.add(k); x = byN[k]; } else hors++; }
        else { if (i >= L.length) break; x = L[i++]; }
        if (x){ if (val(z).trim() && !remplacer) saut++; else { ecr(z, String(x.t || '').slice(0, 1200)); n++; } }
        const avant = snap(z); b.click();
        if (parNom && vu.size >= nb){ await P(1500); break; }
        let ok = false;
        for (let w = 0; w < 80; w++){ await P(150); const z2 = zone(); if (!z2) break; const k2 = nom();
          if (k2 ? k2 !== k : snap(z2) !== avant){ ok = true; break; } }
        if (!ok) break;
      }
      const manque = parNom ? Object.keys(byN).filter(k => !vu.has(k)).map(k => byN[k].n) : [];
      alert(T + n + ' commentaire(s) écrit(s)' + (saut ? ', ' + saut + ' laissé(s) tel(s) quel(s)' : '') + (hors ? ', ' + hors + ' élève(s) de Skore pas dans le carnet (laissés tels quels)' : '') + '. Vérifie avant de fermer.'
        + (manque.length ? '\n\nPas trouvés dans Skore : ' + manque.join(', ') + '.' : ''));
      return;
    }
    const A = () => { let d = document, a = d.activeElement; while (a && /IFRAME|FRAME/.test(a.tagName)){ try { d = a.contentDocument; a = d.activeElement; } catch(e){ break; } } return a; };
    const OK = a => a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA' || a.isContentEditable);
    let a = A(); if (!OK(a)){ alert(T + 'clique d\'abord dans la case du 1er élève, puis touche à nouveau le favori.'); return; }
    const V = t.replace(/^\s*SKORE:/, '').split(/[;\n\t]/).map(x => x.trim()); while (V.length && V[V.length - 1] === '') V.pop();
    if (!V.length){ alert(T + 'pas de notes. Copie-les d\'abord dans le carnet.'); return; }
    const W = (a, v) => { if (a.isContentEditable) a.textContent = v; else { const p = a.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype; Object.getOwnPropertyDescriptor(p, 'value').set.call(a, v); }
      a.dispatchEvent(new Event('input', {bubbles: true})); a.dispatchEvent(new Event('change', {bubbles: true})); };
    const K = (a, k, c) => ['keydown', 'keypress', 'keyup'].forEach(t => a.dispatchEvent(new KeyboardEvent(t, {key: k, code: k, keyCode: c, which: c, bubbles: true, cancelable: true})));
    let n = 0;
    for (let i = 0; i < V.length; i++){ a = A(); if (!OK(a)) break; W(a, V[i]); n++;
      for (const [k, c] of [['Enter', 13], ['ArrowDown', 40], ['Tab', 9]]){ K(a, k, c); await P(300); if (A() !== a) break; }
      if (A() === a) break; }
    alert(T + n + ' note(s) tapée(s) sur ' + V.length + '. Vérifie la colonne avant d\'enregistrer.');
  };
  const SK_LIEN = 'javascript:' + encodeURIComponent('(' + SK_FAVORI.toString() + ')();');
  window.SK_LIEN = SK_LIEN;
})();
