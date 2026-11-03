/* Journal de l'école : éditeur de mise en page libre (kevin, 3 nov. 2026 : « un vrai mélange entre Word, Paint, programme de photo »).
   Une page en plein écran : on touche un bloc pour le choisir, on le glisse pour le déplacer, les poignées le redimensionnent
   (grille magnétique + alignement sur les autres blocs et les marges). Le panneau (à droite sur ordinateur, en bas sur téléphone)
   règle tout : position, texte (police, tailles, couleurs, colonnes), photo (place, taille, recadrage, zoom, filtres), fond, bordure…
   Ajouter : article, encadré de texte, photo, forme, trait, dessin à main levée (Paint), sommaire, équipe, bandeau du titre.
   ↶ ↷ annuler / refaire (par page), dupliquer, devant / derrière, verrouiller. Double-touche : écrire le texte, choisir l'article,
   changer la photo, dessiner. Utilise window.JournalAPI (app.js). */
(() => {
  const M = () => window.Maquette, A = () => window.JournalAPI;
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  let n = null, p = 0, sel = null, k = 1, zoom = 1, grille = true, hist = [], futur = [], minSave = null, pageEl = null, editionTexte = false;
  const NOMS = {tetiere: 'Bandeau du titre', art: 'Article', texte: 'Texte', image: 'Photo', forme: 'Forme', dessin: 'Dessin', sommaire: 'Sommaire', ours: 'Équipe (ours)'};
  const blocsP = () => M().blocs(n, p);
  const leBloc = () => sel && blocsP().find(b => b.id === sel);
  const copie = o => JSON.parse(JSON.stringify(o));

  function ouvrir(num, page) {
    n = num; p = page || 0; sel = null; hist = []; futur = []; zoom = 1; editionTexte = false;
    try { grille = localStorage.getItem('journal-grille') !== '0'; } catch (e) {}
    const v = $('vue-mep'); v.hidden = false; document.body.style.overflow = 'hidden';
    v.innerHTML = `<div class="mep-barre">
        <button id="mep-fin">‹ Terminer</button>
        <select id="mep-page">${Array.from({length: M().nbPages(n)}, (_, i) => `<option value="${i}">${M().nomPage(i, M().nbPages(n))}</option>`).join('')}</select>
        <span class="sep"></span>
        <button id="mep-undo" title="Annuler">↶</button><button id="mep-redo" title="Refaire">↷</button>
        <button id="mep-zm" title="Zoom arrière">−</button><button id="mep-zp" title="Zoom avant">＋</button>
        <button id="mep-grille" title="Grille magnétique">▦</button>
      </div>
      <div class="mep-corps"><div class="mep-scene" id="mep-scene"><div class="mep-boite" id="mep-boite"></div></div><div class="mep-panneau" id="mep-pan"></div></div>`;
    $('mep-page').value = p;
    $('mep-fin').onclick = fermer;
    $('mep-page').onchange = e => { enregistrerVite(); p = +e.target.value; sel = null; hist = []; futur = []; dessiner(); };
    $('mep-undo').onclick = annuler; $('mep-redo').onclick = refaire;
    $('mep-zm').onclick = () => { zoom = Math.max(0.5, zoom / 1.25); dessiner(); };
    $('mep-zp').onclick = () => { zoom = Math.min(4, zoom * 1.25); dessiner(); };
    $('mep-grille').onclick = () => { grille = !grille; try { localStorage.setItem('journal-grille', grille ? '1' : '0'); } catch (e) {} majBarre(); dessiner(); };
    $('mep-scene').addEventListener('pointerdown', e => { if (e.target.id === 'mep-scene' || e.target.id === 'mep-boite') { choisir(null); } });
    document.addEventListener('keydown', clavier);
    dessiner();
  }
  function fermer() {
    enregistrerVite();
    document.removeEventListener('keydown', clavier);
    $('vue-mep').hidden = true; $('vue-mep').innerHTML = ''; document.body.style.overflow = ''; n = null;
    A().rendre();
  }
  function clavier(e) {
    if (!n || editionTexte || /INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || '')) return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? refaire() : annuler(); return; }
    const b = leBloc(); if (!b) return;
    if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); action('sup'); return; }
    const pas = e.shiftKey ? 5 : 1, dir = {ArrowLeft: [-pas, 0], ArrowRight: [pas, 0], ArrowUp: [0, -pas], ArrowDown: [0, pas]}[e.key];
    if (dir && !b.lock) { e.preventDefault(); avant(); b.x = +(b.x + dir[0]).toFixed(1); b.y = +(b.y + dir[1]).toFixed(1); changer(); }
  }

  /* ---------- historique et enregistrement ---------- */
  function avant() { hist.push(JSON.stringify(blocsP())); if (hist.length > 60) hist.shift(); futur = []; majBarre(); }
  function remettre(json) { n.pages[p].blocs = JSON.parse(json); if (sel && !blocsP().some(b => b.id === sel)) sel = null; changer(); }
  function annuler() { if (!hist.length) return; futur.push(JSON.stringify(blocsP())); remettre(hist.pop()); }
  function refaire() { if (!futur.length) return; hist.push(JSON.stringify(blocsP())); remettre(futur.pop()); }
  function changer(sansPanneau) { clearTimeout(minSave); minSave = setTimeout(enregistrerVite, 700); dessinerPage(); if (!sansPanneau) panneau(); majBarre(); }
  function enregistrerVite() { clearTimeout(minSave); minSave = null; if (n) A().sauver(n, true); }
  function majBarre() { if (!$('mep-undo')) return; $('mep-undo').disabled = !hist.length; $('mep-redo').disabled = !futur.length; $('mep-grille').classList.toggle('on', grille); }

  /* ---------- dessin de la page ---------- */
  function dessiner() { dessinerPage(); panneau(); majBarre(); }
  function dessinerPage() {
    const boite = $('mep-boite'), scene = $('mep-scene'); if (!boite) return;
    const sx = scene.scrollLeft, sy = scene.scrollTop;
    const W = Math.max(200, scene.clientWidth - 24), PWpx = M().PW * M().MM;
    const H = Math.max(200, scene.clientHeight - 24), PHpx = M().PH * M().MM;
    k = (scene.clientWidth > 700 ? Math.min(W / PWpx, H / PHpx) : Math.min(1.6, W / PWpx)) * zoom; // ordinateur : toute la page visible ; téléphone : toute la largeur
    pageEl = M().page(A().ctx(n), p, 'edit');
    if (grille) pageEl.classList.add('grille');
    boite.innerHTML = ''; boite.style.width = PWpx * k + 'px'; boite.style.height = M().PH * M().MM * k + 'px';
    pageEl.style.transform = `scale(${k})`; pageEl.style.transformOrigin = '0 0';
    boite.appendChild(pageEl);
    const go = () => { M().ajuster(pageEl); cadre(); };
    go(); pageEl.querySelectorAll('img').forEach(i => { if (!i.complete) i.addEventListener('load', go, {once: true}); });
    pageEl.addEventListener('pointerdown', appui);
    pageEl.addEventListener('dblclick', e => { const d = e.target.closest('.b'); if (d) double(d.dataset.b); });
    scene.scrollLeft = sx; scene.scrollTop = sy;
  }
  // le cadre de sélection et ses 8 poignées
  function cadre() {
    if (!pageEl) return;
    const old = pageEl.querySelector('.sel'); if (old) old.remove();
    const b = leBloc(); if (!b) return;
    const c = document.createElement('div'); c.className = 'sel' + (b.lock ? ' lock' : '');
    c.style.cssText = `left:${b.x}mm;top:${b.y}mm;width:${b.w}mm;height:${b.h}mm;${b.r ? `transform:rotate(${b.r}deg);` : ''}`;
    const t = 7 / k; // poignées de ~7 px à l'écran quel que soit le zoom (plus grandes au doigt)
    const tt = matchMedia('(pointer:coarse)').matches ? t * 2.2 : t * 1.4;
    if (!b.lock) ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].forEach(h => {
      const d = document.createElement('i'); d.dataset.h = h; d.style.width = d.style.height = tt + 'px';
      d.style.borderWidth = Math.max(1, 1.5 / k) + 'px';
      d.style.left = /w/.test(h) ? -tt / 2 + 'px' : /e/.test(h) ? `calc(100% - ${tt / 2}px)` : `calc(50% - ${tt / 2}px)`;
      d.style.top = /^n/.test(h) ? -tt / 2 + 'px' : /^s/.test(h) ? `calc(100% - ${tt / 2}px)` : `calc(50% - ${tt / 2}px)`;
      c.appendChild(d);
    });
    c.style.outlineWidth = Math.max(1, 2 / k) + 'px';
    pageEl.appendChild(c);
  }

  /* ---------- glisser, redimensionner (avec aimantation) ---------- */
  function aimants(sauf) {
    const xs = [11, 105, 199, 0, 210], ys = [9, 17, 148.5, 284, 0, 297];
    blocsP().forEach(o => { if (o.id === sauf) return; xs.push(o.x, o.x + o.w, o.x + o.w / 2); ys.push(o.y, o.y + o.h, o.y + o.h / 2); });
    return {xs, ys};
  }
  const pres = (v, l, tol) => { let best = null; l.forEach(c => { if (Math.abs(c - v) <= tol && (best == null || Math.abs(c - v) < Math.abs(best - v))) best = c; }); return best; };
  function appui(e) {
    if (editionTexte) return;
    const h = e.target.closest('.sel i'), d = e.target.closest('.b');
    if (!h && !d) { choisir(null); return; }
    const id = h ? sel : d.dataset.b;
    if (id !== sel) { choisir(id); if (!h) { /* on peut glisser tout de suite */ } }
    const b = leBloc(); if (!b || b.lock) return;
    e.preventDefault();
    const mm = 1 / (k * M().MM), x0 = e.clientX, y0 = e.clientY, ori = copie(b), mode = h ? h.dataset.h : 'move';
    const {xs, ys} = aimants(b.id), tol = 1.8, pas = grille ? 2.5 : 0.5;
    let bouge = false;
    const el = pageEl.querySelector(`.b[data-b="${b.id}"]`), cad = pageEl.querySelector('.sel');
    const move = ev => {
      const dx = (ev.clientX - x0) * mm, dy = (ev.clientY - y0) * mm;
      if (!bouge && Math.abs(ev.clientX - x0) + Math.abs(ev.clientY - y0) < 4) return;
      if (!bouge) { bouge = true; avant(); }
      const r = Object.assign({}, ori);
      const cal = (v, l) => { const a = pres(v, l, tol); return a != null ? a : Math.round(v / pas) * pas; };
      if (mode === 'move') {
        let nx = ori.x + dx, ny = ori.y + dy;
        const ax = [pres(nx, xs, tol), pres(nx + ori.w, xs, tol), pres(nx + ori.w / 2, xs, tol)];
        nx = ax[0] != null ? ax[0] : ax[1] != null ? ax[1] - ori.w : ax[2] != null ? ax[2] - ori.w / 2 : Math.round(nx / pas) * pas;
        const ay = [pres(ny, ys, tol), pres(ny + ori.h, ys, tol), pres(ny + ori.h / 2, ys, tol)];
        ny = ay[0] != null ? ay[0] : ay[1] != null ? ay[1] - ori.h : ay[2] != null ? ay[2] - ori.h / 2 : Math.round(ny / pas) * pas;
        r.x = nx; r.y = ny;
      } else {
        if (/e/.test(mode)) r.w = Math.max(5, cal(ori.x + ori.w + dx, xs) - ori.x);
        if (/s/.test(mode)) r.h = Math.max(3, cal(ori.y + ori.h + dy, ys) - ori.y);
        if (/w/.test(mode)) { const nx = Math.min(cal(ori.x + dx, xs), ori.x + ori.w - 5); r.w = ori.x + ori.w - nx; r.x = nx; }
        if (/^n/.test(mode)) { const ny = Math.min(cal(ori.y + dy, ys), ori.y + ori.h - 3); r.h = ori.y + ori.h - ny; r.y = ny; }
        if (ev.shiftKey && /^(nw|ne|se|sw)$/.test(mode)) { const ratio = ori.w / ori.h; r.h = r.w / ratio; if (/^n/.test(mode)) r.y = ori.y + ori.h - r.h; }
      }
      ['x', 'y', 'w', 'h'].forEach(c => { b[c] = +r[c].toFixed(1); });
      [el, cad].forEach(x => { if (x) { x.style.left = b.x + 'mm'; x.style.top = b.y + 'mm'; x.style.width = b.w + 'mm'; x.style.height = b.h + 'mm'; } });
      if (mode !== 'move' && el && el.classList.contains('t-art')) M().ajuster(pageEl);
    };
    const fin = () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', fin); document.removeEventListener('pointercancel', fin); if (bouge) changer(); };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', fin); document.addEventListener('pointercancel', fin);
    // double-touche au téléphone
    const t = Date.now(); if (appui.dernier && appui.dernier.id === id && t - appui.dernier.t < 350 && !h) { fin(); double(id); appui.dernier = null; return; }
    appui.dernier = {id, t};
  }
  function choisir(id) { if (editionTexte) finTexte(); sel = id; cadre(); panneau(); }

  /* ---------- double-touche : l'action naturelle du bloc ---------- */
  function double(id) {
    const b = blocsP().find(x => x.id === id); if (!b) return;
    sel = id;
    if (b.type === 'texte') texteSurPlace(b);
    else if (b.type === 'art') A().choisirArticle(n, p, b.id, () => { dessiner(); });
    else if (b.type === 'image') changerPhoto(b);
    else if (b.type === 'dessin') peindre(b);
    else if (b.type === 'tetiere' || b.type === 'ours') A().reglagesNumero(n);
  }
  function texteSurPlace(b) {
    const d = pageEl.querySelector(`.b[data-b="${b.id}"] .tx > div`); if (!d) return;
    editionTexte = b.id; const ph = d.querySelector('.ph-txt'); if (ph) d.innerHTML = '';
    d.contentEditable = 'true'; d.spellcheck = true; d.lang = 'fr'; d.focus();
    const r = document.createRange(); r.selectNodeContents(d); r.collapse(false); const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    d.addEventListener('blur', () => setTimeout(() => { if (editionTexte === b.id) finTexte(); }, 150), {once: true});
    panneau();
  }
  function finTexte() {
    const id = editionTexte; editionTexte = false; if (!id || !pageEl) return;
    const d = pageEl.querySelector(`.b[data-b="${id}"] .tx > div`), b = blocsP().find(x => x.id === id);
    if (d && b) { const h = A().propre(d.innerHTML); if (h !== (b.html || '')) { avant(); b.html = h; } }
    changer();
  }
  function changerPhoto(b) {
    const f = document.createElement('input'); f.type = 'file'; f.accept = 'image/*';
    f.onchange = async () => {
      const fi = f.files[0]; if (!fi) return;
      try { const d = await A().reduire(fi); avant(); const im = A().nouvelleImage(d, b.img); b.img = im; changer(); }
      catch (e) { A().toast('Cette photo n\'a pas pu être lue'); }
    };
    f.click();
  }

  /* ---------- ajouter, actions ---------- */
  function ajouter(type, extra) {
    avant();
    const b = Object.assign({id: M().uid(), type, x: 60, y: 110, w: 90, h: 60, s: {}}, extra || {});
    if (type === 'texte') Object.assign(b, {h: 30, html: '', s: {fs: 14, pol: 'georgia'}});
    if (type === 'forme') Object.assign(b, {w: 50, h: 30, forme: 'rect', s: {fc: '#0f766e'}});
    if (type === 'ligne') Object.assign(b, {type: 'forme', forme: 'ligne', y: 140, w: 120, h: 4, s: {fc: '#111111', ep: 0.8}});
    if (type === 'tetiere') Object.assign(b, {x: 11, y: 9, w: 188, h: 46});
    if (type === 'sommaire' || type === 'ours') Object.assign(b, {w: 60, h: 80});
    if (type === 'art') Object.assign(b, {w: 92, h: 120});
    blocsP().push(b); sel = b.id; changer();
    if (type === 'texte') setTimeout(() => texteSurPlace(b), 60);
    else if (type === 'image') changerPhoto(b);
    else if (type === 'dessin') peindre(b);
    else if (type === 'art') A().choisirArticle(n, p, b.id, () => dessiner());
  }
  function action(a) {
    const l = blocsP(), b = leBloc(); if (!b) return;
    const i = l.indexOf(b);
    avant();
    if (a === 'sup') { l.splice(i, 1); sel = null; }
    else if (a === 'dup') { const c = copie(b); c.id = M().uid(); c.x += 5; c.y += 5; if (c.type === 'art') delete c.art; l.splice(i + 1, 0, c); sel = c.id; }
    else if (a === 'devant') { l.splice(i, 1); l.push(b); }
    else if (a === 'derriere') { l.splice(i, 1); l.unshift(b); }
    else if (a === 'monter' && i < l.length - 1) { l.splice(i, 1); l.splice(i + 1, 0, b); }
    else if (a === 'descendre' && i > 0) { l.splice(i, 1); l.splice(i - 1, 0, b); }
    else if (a === 'lock') b.lock = b.lock ? 0 : 1;
    else if (a === 'centrer') b.x = +((210 - b.w) / 2).toFixed(1);
    else if (a === 'largeur') { b.x = 11; b.w = 188; }
    changer();
  }
  function gabarit(gid) {
    if (blocsP().length && !confirm('Remplacer toute la mise en page de cette page par ce gabarit ? (Les articles restent placés.)')) return;
    avant();
    const arts = blocsP().filter(b => b.type === 'art' && b.art).sort((a, b) => b.w * b.h - a.w * a.h).map(b => b.art);
    const l = M().blocsDuGabarit(gid, {}, p);
    l.filter(b => b.type === 'art').sort((a, b) => b.w * b.h - a.w * a.h).forEach(b => { if (arts.length) b.art = arts.shift(); });
    n.pages[p] = {g: gid, blocs: l}; sel = null; changer();
  }

  /* ---------- panneau de réglages ---------- */
  const champ = {
    nombre: (lab, cle, min, max, pas, unite, defaut) => { const b = leBloc(), v = (b.s || {})[cle];
      return `<label class="pr"><span>${lab}</span><input type="range" min="${min}" max="${max}" step="${pas}" data-s="${cle}" value="${v != null && v !== '' ? v : defaut}"><output>${v != null && v !== '' ? v + (unite || '') : (defaut === 0 && cle !== 'r' ? 'auto' : defaut + (unite || ''))}</output></label>`; },
    couleur: (lab, cle, defaut) => { const v = (leBloc().s || {})[cle];
      return `<label class="pr"><span>${lab}</span><input type="color" data-s="${cle}" value="${v || defaut || '#000000'}"><button type="button" class="mini-b ${v ? '' : 'on'}" data-sans="${cle}">${v ? 'aucune' : '—'}</button></label>`; },
    choix: (lab, cle, opts) => { const v = (leBloc().s || {})[cle] || '';
      return `<label class="pr"><span>${lab}</span><select data-s="${cle}">${opts.map(o => `<option value="${o[0]}" ${String(v) === String(o[0]) ? 'selected' : ''}>${o[1]}</option>`).join('')}</select></label>`; },
    case: (lab, cle) => `<label class="pr cb"><input type="checkbox" data-s="${cle}" ${(leBloc().s || {})[cle] ? 'checked' : ''}><span>${lab}</span></label>`
  };
  const polices = def => [['', def || 'Par défaut']].concat(M().POLICES.map(x => [x[0], x[2]]));
  const AL = [['', 'Par défaut'], ['left', 'À gauche'], ['center', 'Centré'], ['right', 'À droite'], ['justify', 'Justifié']];
  function sectionPhoto(avecPlace) {
    return `<h4>📷 Photo</h4>`
      + (avecPlace ? champ.choix('Place', 'ph', [['', 'En haut'], ['bas', 'En bas'], ['gauche', 'À gauche'], ['droite', 'À droite'], ['fond', 'En fond (texte par-dessus)'], ['non', 'Sans photo']])
        + champ.nombre('Hauteur', 'phH', 0, 200, 1, ' mm', 0) + champ.nombre('Largeur (côté)', 'phW', 20, 70, 1, ' %', 40) + champ.nombre('Voile blanc (fond)', 'voile', 0, 100, 5, ' %', 80) : '')
      + champ.nombre('Zoom', 'zoom', 100, 300, 5, ' %', 100) + champ.nombre('Cadrage ↔', 'px', 0, 100, 1, ' %', 50) + champ.nombre('Cadrage ↕', 'py', 0, 100, 1, ' %', 50)
      + champ.nombre('Coins arrondis', 'phR', 0, 30, 0.5, ' mm', 0)
      + `<div class="rangee-f">${champ.case('Noir et blanc', 'nb')}${champ.case('Sépia', 'sep')}${champ.case('Miroir', 'miroir')}</div>`
      + champ.nombre('Luminosité', 'lum', 30, 200, 5, ' %', 100) + champ.nombre('Contraste', 'con', 30, 200, 5, ' %', 100) + champ.nombre('Couleurs', 'sat', 0, 250, 5, ' %', 100)
      + champ.nombre('Flou', 'flou', 0, 20, 1, '', 0);
  }
  function panneau() {
    const pan = $('mep-pan'); if (!pan) return;
    const b = leBloc();
    if (!b) {
      const nb = M().nbPages(n);
      pan.innerHTML = `<h3>Ajouter sur la page</h3><div class="ajouts">
        <button data-aj="art">📰<span>Article</span></button><button data-aj="texte">🔤<span>Texte</span></button><button data-aj="image">🖼️<span>Photo</span></button>
        <button data-aj="dessin">✏️<span>Dessin</span></button><button data-aj="forme">⬛<span>Forme</span></button><button data-aj="ligne">➖<span>Trait</span></button>
        <button data-aj="sommaire">📑<span>Sommaire</span></button><button data-aj="ours">👥<span>Équipe</span></button>${p === 0 ? '<button data-aj="tetiere">🗞️<span>Bandeau</span></button>' : ''}</div>
        <p class="mut aide">Touche un élément pour le régler. Glisse-le pour le déplacer, tire les poignées pour changer sa taille. Double-touche : écrire, choisir l'article ou la photo, dessiner.</p>
        <h3>Partir d'un gabarit</h3><div class="gabs">${M().pour(p, nb).map(g => `<button class="gab" data-gab="${g.id}">${M().mini(g)}${esc(g.nom)}</button>`).join('')}</div>
        <h3>Toute la page</h3>
        <label class="pr"><span>Fond de la page</span><input type="color" id="mep-fond" value="${n.pages[p].fond || '#ffffff'}"><button type="button" class="mini-b" id="mep-fond0">blanc</button></label>`;
      pan.onclick = e => { const a = e.target.closest('[data-aj]'); if (a) ajouter(a.dataset.aj); const g = e.target.closest('[data-gab]'); if (g) gabarit(g.dataset.gab); };
      $('mep-fond').oninput = e => { n.pages[p].fond = e.target.value; dessinerPage(); clearTimeout(minSave); minSave = setTimeout(enregistrerVite, 700); };
      $('mep-fond0').onclick = () => { delete n.pages[p].fond; changer(); };
      return;
    }
    const s = b.s || (b.s = {});
    let h = `<div class="pan-tete"><b>${NOMS[b.type] || b.type}</b><button data-ac="fermer" class="mini-b">✕</button></div>
      <div class="pan-actions"><button data-ac="dup" title="Dupliquer">⧉</button><button data-ac="devant" title="Tout devant">⤒</button><button data-ac="monter" title="Un cran devant">↑</button><button data-ac="descendre" title="Un cran derrière">↓</button><button data-ac="derriere" title="Tout derrière">⤓</button><button data-ac="lock" title="Verrouiller" class="${b.lock ? 'on' : ''}">${b.lock ? '🔒' : '🔓'}</button><button data-ac="sup" title="Supprimer" class="r">🗑</button></div>`;
    if (b.type === 'art') {
      const a = b.art && A().items[b.art];
      h += `<div class="pan-b"><button data-ac="article" class="btn-pan">${a ? '🔁 Changer d\'article' : '＋ Choisir l\'article'}</button>${a ? '<button data-ac="ouvrir" class="btn-pan">✏️ Modifier le texte</button>' : ''}</div>`
        + (a ? `<p class="mut aide">« ${esc(a.titre || 'Sans titre')} » · ${A().motsDe(a)} mots (la case en prend ~${M().cap(b)})</p>` : '')
        + `<h4>🔠 Titre</h4>` + champ.choix('Police', 'polT', polices('Georgia')) + champ.nombre('Taille', 'ts', 0, 72, 1, ' pt', 0) + champ.couleur('Couleur', 'tc', '#111111') + champ.choix('Alignement', 'alT', AL)
        + `<h4>📝 Texte</h4>` + champ.choix('Police', 'pol', polices('Georgia')) + champ.nombre('Taille', 'fs', 0, 16, 0.25, ' pt', 0) + champ.choix('Colonnes', 'cols', [['', 'Auto'], [1, '1'], [2, '2'], [3, '3'], [4, '4']])
        + champ.choix('Alignement', 'al', AL) + champ.nombre('Interligne', 'lh', 1, 2, 0.05, '', 1.36) + champ.couleur('Couleur', 'c', '#111111')
        + `<div class="rangee-f">${champ.case('Sans rubrique', 'sansRub')}${champ.case('Sans chapeau', 'sansChap')}${champ.case('Sans signature', 'sansSign')}${champ.case('Sans légende', 'sansLeg')}${champ.case('Grand titre (Une)', 'grand')}</div>`
        + (a && a.img ? sectionPhoto(true) : '');
    } else if (b.type === 'texte') {
      h += `<div class="pan-b"><button data-ac="ecrire" class="btn-pan">✏️ Écrire le texte</button></div>`
        + (editionTexte ? `<div class="pan-actions txt"><button data-cmd="bold"><b>G</b></button><button data-cmd="italic"><i>I</i></button><button data-cmd="underline"><u>S</u></button><button data-cmd="h3">Titre</button><button data-cmd="insertUnorderedList">• Liste</button><button data-cmd="p">¶</button></div>` : '')
        + champ.choix('Police', 'pol', polices('Georgia')) + champ.nombre('Taille', 'fs', 6, 120, 0.5, ' pt', 12) + champ.couleur('Couleur', 'c', '#111111')
        + champ.choix('Alignement', 'al', AL) + champ.choix('Vertical', 'va', [['', 'En haut'], ['milieu', 'Au milieu'], ['bas', 'En bas']]) + champ.nombre('Interligne', 'lh', 0.8, 2.5, 0.05, '', 1.3)
        + `<div class="rangee-f">${champ.case('Gras', 'gras')}${champ.case('Italique', 'ital')}${champ.case('MAJUSCULES', 'maj')}</div>`;
    } else if (b.type === 'image') {
      h += `<div class="pan-b"><button data-ac="photo" class="btn-pan">${b.img ? '🔁 Changer la photo' : '＋ Choisir une photo'}</button></div>
        <label class="pr"><span>Légende</span><input type="text" id="mep-leg" maxlength="160" value="${esc(b.leg || '')}"></label>` + sectionPhoto(false);
    } else if (b.type === 'dessin') {
      h += `<div class="pan-b"><button data-ac="peindre" class="btn-pan">✏️ Dessiner</button></div>`;
    } else if (b.type === 'forme') {
      h += champ.couleur('Couleur', 'fc', '#0f766e') + (b.forme === 'ligne' ? champ.nombre('Épaisseur', 'ep', 0.2, 5, 0.1, ' mm', 0.8)
        : `<div class="pan-b"><button data-forme="rect" class="btn-pan ${b.forme !== 'rond' ? 'on' : ''}">▬ Rectangle</button><button data-forme="rond" class="btn-pan ${b.forme === 'rond' ? 'on' : ''}">⬤ Rond</button></div>`);
    } else if (b.type === 'tetiere') {
      h += `<div class="pan-b"><button data-ac="reglages" class="btn-pan">✏️ Nom, sous-titre, date…</button></div>`
        + champ.choix('Police du nom', 'polT', polices('Georgia')) + champ.nombre('Taille du nom', 'ts', 0, 110, 1, ' pt', 0) + champ.couleur('Couleur', 'tc', '#111111')
        + champ.choix('Police du sous-titre', 'pol', polices('Georgia')) + champ.choix('Alignement', 'al', AL);
    } else if (b.type === 'sommaire' || b.type === 'ours') {
      h += champ.choix('Police', 'pol', polices('Georgia'));
    }
    h += `<h4>🎨 Fond et bordure</h4>` + champ.couleur('Fond', 'bg', '#f4f1ea') + champ.nombre('Transparence', 'op', 10, 100, 5, ' %', 100)
      + champ.nombre('Bordure', 'bord', 0, 4, 0.25, ' mm', 0) + champ.couleur('Couleur bordure', 'bordC', '#111111') + champ.choix('Trait', 'bordT', [['', 'Plein'], ['dashed', 'Tirets'], ['dotted', 'Points'], ['double', 'Double']])
      + champ.nombre('Coins arrondis', 'rayon', 0, 30, 0.5, ' mm', 0) + champ.nombre('Marge intérieure', 'pad', 0, 15, 0.5, ' mm', 0)
      + `<div class="rangee-f">${champ.case('Ombre', 'ombre')}${b.type === 'art' ? champ.case('Filet à gauche', 'filet') : ''}</div>`
      + `<h4>📐 Position</h4><div class="pos4">${['x', 'y', 'w', 'h'].map(c => `<label><span>${{x: 'Gauche', y: 'Haut', w: 'Largeur', h: 'Hauteur'}[c]}</span><input type="number" step="0.5" data-pos="${c}" value="${b[c]}"> mm</label>`).join('')}</div>
        <label class="pr"><span>Rotation</span><input type="range" min="-180" max="180" step="1" data-pos="r" value="${b.r || 0}"><output>${b.r || 0}°</output></label>
        <div class="pan-b"><button data-ac="centrer" class="btn-pan">↔ Centrer</button><button data-ac="largeur" class="btn-pan">⇔ Toute la largeur</button></div>`;
    pan.innerHTML = h;
    pan.onclick = e => {
      const ac = e.target.closest('[data-ac]'), sans = e.target.closest('[data-sans]'), fo = e.target.closest('[data-forme]'), cmd = e.target.closest('[data-cmd]');
      if (cmd) { e.preventDefault(); const c = cmd.dataset.cmd; if (c === 'h3' || c === 'p') document.execCommand('formatBlock', false, c); else document.execCommand(c, false, null); return; }
      if (sans) { avant(); delete s[sans.dataset.sans]; changer(); return; }
      if (fo) { avant(); b.forme = fo.dataset.forme; changer(); return; }
      if (!ac) return;
      const k2 = ac.dataset.ac;
      if (k2 === 'fermer') choisir(null);
      else if (k2 === 'article') A().choisirArticle(n, p, b.id, () => dessiner());
      else if (k2 === 'ouvrir') { enregistrerVite(); A().ouvrirArticle(A().items[b.art], () => dessiner()); }
      else if (k2 === 'ecrire') texteSurPlace(b);
      else if (k2 === 'photo') changerPhoto(b);
      else if (k2 === 'peindre') peindre(b);
      else if (k2 === 'reglages') A().reglagesNumero(n, () => dessiner());
      else action(k2);
    };
    pan.onmousedown = e => { if (e.target.closest('[data-cmd]')) e.preventDefault(); };
    let premier = true;
    pan.oninput = e => {
      const t = e.target;
      if (t.id === 'mep-leg') { if (premier) { avant(); premier = false; } b.leg = t.value; changer(true); return; }
      if (t.dataset.pos) {
        if (premier) { avant(); premier = false; }
        const v = parseFloat(t.value); if (isNaN(v)) return;
        b[t.dataset.pos] = t.dataset.pos === 'r' ? v : Math.max(t.dataset.pos === 'w' || t.dataset.pos === 'h' ? 2 : -200, v);
        if (t.nextElementSibling && t.nextElementSibling.tagName === 'OUTPUT') t.nextElementSibling.textContent = v + '°';
        changer(true); return;
      }
      const cle = t.dataset.s; if (!cle) return;
      if (premier) { avant(); premier = false; }
      if (t.type === 'checkbox') s[cle] = t.checked ? 1 : 0;
      else if (t.type === 'range') { const v = parseFloat(t.value); s[cle] = v; const o = t.nextElementSibling; if (o) o.textContent = (v === 0 && /^(ts|fs|phH)$/.test(cle)) ? 'auto' : v + (o.textContent.replace(/^[-\d.,auto]+/, '') || ''); if (v === 0 && /^(ts|fs|phH)$/.test(cle)) delete s[cle]; }
      else if (t.tagName === 'SELECT') { if (t.value === '') delete s[cle]; else s[cle] = /^\d+$/.test(t.value) ? +t.value : t.value; }
      else s[cle] = t.value;
      changer(true);
    };
    pan.onchange = () => { premier = true; panneau(); };
  }

  /* ---------- Paint : dessin à main levée ---------- */
  function peindre(b) {
    const o = document.createElement('div'); o.className = 'paint';
    const ratio = b.w / b.h, L = ratio >= 1 ? 1400 : Math.round(1400 * ratio), H = ratio >= 1 ? Math.round(1400 / ratio) : 1400;
    const COUL = ['#111111', '#ffffff', '#dc2626', '#f59e0b', '#facc15', '#16a34a', '#0ea5e9', '#1d4ed8', '#7c3aed', '#db2777', '#92400e', '#6b7280'];
    o.innerHTML = `<div class="paint-barre"><button data-p="annuler">Annuler</button><b>✏️ Dessin</b><button data-p="ok" class="ok">Enregistrer</button></div>
      <div class="paint-zone"><canvas width="${L}" height="${H}"></canvas></div>
      <div class="paint-outils"><div class="coul">${COUL.map((c, i) => `<button data-c="${c}" style="background:${c}" class="${i === 0 ? 'on' : ''}"></button>`).join('')}<input type="color" data-ci value="#111111"></div>
      <div class="tailles">${[3, 8, 16, 32, 64].map((t, i) => `<button data-t="${t}" class="${i === 1 ? 'on' : ''}"><i style="width:${Math.min(26, t / 2 + 3)}px;height:${Math.min(26, t / 2 + 3)}px"></i></button>`).join('')}
      <button data-g>🧽 Gomme</button><button data-r>🪣 Remplir le fond</button><button data-u>↶</button><button data-x>🗑 Tout effacer</button></div></div>`;
    document.body.appendChild(o);
    const cv = o.querySelector('canvas'), cx = cv.getContext('2d');
    let coul = '#111111', taille = 8, gomme = false; const pile = [];
    const src = b.img && A().items[b.img] && A().items[b.img].d;
    if (src) { const im = new Image(); im.onload = () => cx.drawImage(im, 0, 0, L, H); im.src = src; }
    const pt = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * L / r.width, (e.clientY - r.top) * H / r.height]; };
    let actif = false, der = null;
    cv.addEventListener('pointerdown', e => {
      e.preventDefault(); cv.setPointerCapture(e.pointerId); actif = true; pile.push(cx.getImageData(0, 0, L, H)); if (pile.length > 25) pile.shift();
      der = pt(e); cx.globalCompositeOperation = gomme ? 'destination-out' : 'source-over';
      cx.fillStyle = coul; cx.beginPath(); cx.arc(der[0], der[1], taille / 2, 0, Math.PI * 2); cx.fill();
    });
    cv.addEventListener('pointermove', e => {
      if (!actif) return; const q = pt(e);
      cx.strokeStyle = coul; cx.lineWidth = taille; cx.lineCap = cx.lineJoin = 'round';
      cx.beginPath(); cx.moveTo(der[0], der[1]); cx.lineTo(q[0], q[1]); cx.stroke(); der = q;
    });
    const stop = () => { actif = false; }; cv.addEventListener('pointerup', stop); cv.addEventListener('pointercancel', stop);
    o.onclick = e => {
      const t = e.target.closest('button'); if (!t) return;
      if (t.dataset.c) { coul = t.dataset.c; gomme = false; o.querySelectorAll('.coul button,[data-g]').forEach(x => x.classList.remove('on')); t.classList.add('on'); }
      else if (t.dataset.t) { taille = +t.dataset.t; o.querySelectorAll('[data-t]').forEach(x => x.classList.remove('on')); t.classList.add('on'); }
      else if (t.hasAttribute('data-g')) { gomme = !gomme; t.classList.toggle('on', gomme); }
      else if (t.hasAttribute('data-r')) { pile.push(cx.getImageData(0, 0, L, H)); cx.globalCompositeOperation = 'destination-over'; cx.fillStyle = coul; cx.fillRect(0, 0, L, H); cx.globalCompositeOperation = 'source-over'; }
      else if (t.hasAttribute('data-u')) { const d = pile.pop(); if (d) cx.putImageData(d, 0, 0); }
      else if (t.hasAttribute('data-x')) { if (confirm('Tout effacer ?')) { pile.push(cx.getImageData(0, 0, L, H)); cx.clearRect(0, 0, L, H); } }
      else if (t.dataset.p === 'annuler') { o.remove(); if (!b.img && !src) { /* dessin vide : on garde le bloc pour plus tard */ } }
      else if (t.dataset.p === 'ok') { avant(); b.img = A().nouvelleImage(cv.toDataURL('image/png'), b.img); o.remove(); changer(); }
    };
    o.querySelector('[data-ci]').oninput = e => { coul = e.target.value; gomme = false; };
  }

  window.EditeurMEP = {ouvrir, ouvert: () => !!n, redessiner: () => { if (n) dessiner(); }};
})();
