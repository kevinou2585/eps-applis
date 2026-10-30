/* Schémas des prépas : dessins SVG faits par le code (presque rien à télécharger).
   Refaits le 30/10 (demande de Kevin : un schéma juste, détaillé et clair pour CHAQUE jeu de chaque prépa).
   - Chaque jeu a sa propre scène, écrite à la fin du fichier de sa bibliothèque :
       (window.PSCH_SC = window.PSCH_SC || {}).basket = {crocos: g => g.court('basket')…, …};
     clé = clé du jeu dans le catalogue J, ou son nom pour un jeu écrit directement dans une leçon.
   - Le moteur (prepa-moteur.js) donne au schéma la référence '@basket|crocos#voleurs' : scène du jeu,
     sinon l'ancien modèle après « # » (PSCH('demi:basket:2c1') marche toujours).
   - Joueurs : A = rond bleu, B = carré orange, défenseur / chat = losange noir, joker = triangle vert,
     prof = rond violet « P » (formes différentes, pas seulement la couleur : Kevin est un peu daltonien).
   - Repères numérotés ① ② ③ sur le dessin, expliqués sous le schéma (g.n(1, 'texte')).
   Un clic sur un schéma l'ouvre en grand. */
(() => {
const W = 400, H = 250, f = n => Math.round(n * 10) / 10;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const COL = {a: '#1f63d6', b: '#e8590c', x: '#1d241f', j: '#16a34a', p: '#8a3ffc', ink: '#2d3530', pass: '#1f63d6', shot: '#c2185b', run: '#2d3530', lob: '#7c3aed'};
const FONT = 'font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif"';
// petit générateur pseudo-aléatoire stable (mêmes positions à chaque affichage)
const rnd = seed => () => (seed = seed * 48271 % 2147483647) / 2147483647;

/* ---------- le « crayon » : une scène = suite d'appels g.xxx(…) ; tout renvoie g ---------- */
function G(sp){
  const L = {bg: [], mid: [], ar: [], top: [], lab: []}, notes = [];
  const g = {sp, W, H, notes, L, COL};
  const put = (k, s) => { L[k].push(s); return g; };
  g.raw = (s, k = 'mid') => put(k, s);

  /* ===== sols et terrains ===== */
  g.floor = (c = '#f4efe4') => put('bg', `<rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="${c}"/>`);
  g.hall = () => g.floor().raw(`<rect x="12" y="12" width="${W - 24}" height="${H - 24}" rx="3" fill="none" stroke="#cbbfa8" stroke-width="2"/>`, 'bg');
  g.grass = () => put('bg', `<rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="#d7ebc9"/><path d="M0 40H${W}M0 120H${W}M0 200H${W}" stroke="#cfe5bf" stroke-width="40" opacity=".6"/>`);
  g.line = (d, w = 2, c = '#fff', dash = '') => put('bg', `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`);
  const CL = '#c4b59a';   // lignes du terrain (sur parquet)
  // grand terrain : x 20→380, y 25→225
  g.court = (sport = sp, o = {}) => {
    const s = sport === 'hiver' || !sport ? 'salle' : sport;
    g.floor(); const x0 = 20, y0 = 25, w = 360, h = 200, cx = 200, cy = 125;
    if (s === 'volley'){ g.floor('#f2e2c6');
      g.line(`M${x0} ${y0}h${w}v${h}h${-w}Z`, 2.5, '#fff').line(`M${cx - 60} ${y0}V${y0 + h}M${cx + 60} ${y0}V${y0 + h}`, 2, '#fff');
      return g.net(cx, y0 - 8, y0 + h + 8); }
    if (s === 'bad') return g.badCourt(o);
    if (s === 'prisonnier') return g.prisonCourt(o);
    g.line(`M${x0} ${y0}h${w}v${h}h${-w}Z`, 2.5, CL).line(`M${cx} ${y0}V${y0 + h}`, 2, CL).raw(`<circle cx="${cx}" cy="${cy}" r="${s === 'basket' ? 24 : 28}" fill="none" stroke="${CL}" stroke-width="2"/>`, 'bg');
    [-1, 1].forEach(sd => g.goal(s, sd, o));
    return g;
  };
  // demi-terrain, cible à droite : x 110→380 (la gauche = bord du terrain, files d'attente)
  g.half = (sport = sp, o = {}) => {
    const s = sport === 'hiver' || !sport ? 'salle' : sport; g.floor();
    g.line(`M110 25H380V225H110`, 2.5, CL).line('M110 25V225', 2, CL, '7 5');
    if (s === 'basket') g.raw(`<path d="M110 101A24 24 0 0 1 110 149" fill="none" stroke="${CL}" stroke-width="2"/>`, 'bg');
    if (o.label !== false) g.label(60, 238, 'milieu du terrain →', {s: 10, c: '#8a7a5c'});
    return g.goal(s, 1, {...o, half: 1});
  };
  // cible d'un côté (sd = -1 gauche, 1 droite)
  g.goal = (s, sd, o = {}) => {
    const cy = 125, bx = sd > 0 ? 380 : 20, hf = o.half;
    if (s === 'basket'){
      const kd = hf ? 105 : 74, kw = 66, ar = hf ? 122 : 92;
      g.raw(`<rect x="${sd > 0 ? bx - kd : bx}" y="${cy - kw / 2}" width="${kd}" height="${kw}" fill="#f1dfc2" stroke="${CL}" stroke-width="2"/>`, 'bg');
      g.raw(`<path d="M${bx - sd * kd} ${cy - 22}A${hf ? 26 : 22} 22 0 0 ${sd > 0 ? 0 : 1} ${bx - sd * kd} ${cy + 22}" fill="none" stroke="${CL}" stroke-width="2"/>`, 'bg');
      g.raw(`<path d="M${bx} ${cy - 88}H${bx - sd * 18}A${ar} 88 0 0 ${sd > 0 ? 0 : 1} ${bx - sd * 18} ${cy + 88}H${bx}" fill="none" stroke="${CL}" stroke-width="2"/>`, 'bg');
      return g.hoopB(bx - sd * (hf ? 18 : 15), cy, sd);
    }
    if (s === 'hand' || s === 'foot'){
      const r6 = hf ? 57 : 50, r9 = hf ? 85 : 80, gw = 30;
      const D = r => `M${bx} ${cy - gw / 2 - r}A${r} ${r} 0 0 ${sd > 0 ? 0 : 1} ${bx - sd * r} ${cy - gw / 2}V${cy + gw / 2}A${r} ${r} 0 0 ${sd > 0 ? 0 : 1} ${bx} ${cy + gw / 2 + r}`;
      g.raw(`<path d="${D(r6)}" fill="${s === 'hand' ? '#f1dfc2' : 'none'}" stroke="${CL}" stroke-width="2"/>`, 'bg');
      if (s === 'hand') g.raw(`<path d="${D(r9)}" fill="none" stroke="${CL}" stroke-width="2" stroke-dasharray="7 5"/>`, 'bg');
      return g.cage(bx, cy, sd, gw);
    }
    if (o.none) return g;
    return g.cone(bx - sd * 10, cy - 18).cone(bx - sd * 10, cy + 18);
  };
  // panier vu de dessus (planche + cercle)
  g.hoopB = (x, y, sd = 1) => put('mid', `<path d="M${x + sd * 5} ${y - 11}V${y + 11}" stroke="#2d3530" stroke-width="3"/><circle cx="${f(x - sd * 3)}" cy="${y}" r="6" fill="none" stroke="#e8590c" stroke-width="2.5"/>`);
  // but (cage) vu de dessus
  g.cage = (x, y, sd = 1, w = 30) => put('mid', `<rect x="${sd > 0 ? x : x - 8}" y="${y - w / 2}" width="8" height="${w}" fill="#fff" stroke="#2d3530" stroke-width="2.5"/><path d="M${x + sd * 2} ${y - w / 2 + 4}h${sd * 4}M${x + sd * 2} ${y - w / 2 + 10}h${sd * 4}M${x + sd * 2} ${y}h${sd * 4}M${x + sd * 2} ${y + w / 2 - 10}h${sd * 4}M${x + sd * 2} ${y + w / 2 - 4}h${sd * 4}" stroke="#9aa" stroke-width="1"/>`);
  // petit but (2 cônes ou 2 plots) n'importe où
  g.minigoal = (x, y, vert = true, w = 26) => vert ? g.cone(x, y - w / 2).cone(x, y + w / 2) : g.cone(x - w / 2, y).cone(x + w / 2, y);
  // filet (vertical, vu de dessus)
  g.net = (x = 200, y1 = 17, y2 = 233) => put('mid', `<path d="M${x} ${y1}V${y2}" stroke="#2d3530" stroke-width="3.5"/><path d="M${x} ${y1}V${y2}" stroke="#fff" stroke-width="1" stroke-dasharray="2 3"/><circle cx="${x}" cy="${y1}" r="4" fill="#2d3530"/><circle cx="${x}" cy="${y2}" r="4" fill="#2d3530"/>`);
  g.netH = (y = 125, x1 = 17, x2 = 383) => put('mid', `<path d="M${x1} ${y}H${x2}" stroke="#2d3530" stroke-width="3.5"/><path d="M${x1} ${y}H${x2}" stroke="#fff" stroke-width="1" stroke-dasharray="2 3"/><circle cx="${x1}" cy="${y}" r="4" fill="#2d3530"/><circle cx="${x2}" cy="${y}" r="4" fill="#2d3530"/>`);
  // terrain de badminton (13,4 m × 6,1 m) : x 20→380, y 43→207 ; o.half = un seul côté en grand
  g.badCourt = (o = {}) => {
    g.floor('#e9eef0'); const x0 = 20, y0 = 43, w = 360, h = 164, m = w / 13.4, cx = 200, c = '#2f9e6b';
    g.raw(`<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="#cfe3d6"/>`, 'bg');
    const L = (d, wd = 2) => g.line(d, wd, c);
    L(`M${x0} ${y0}h${w}v${h}h${-w}Z`, 2.5); L(`M${x0} ${f(y0 + .46 * m)}H${x0 + w}M${x0} ${f(y0 + h - .46 * m)}H${x0 + w}`);
    L(`M${f(cx - 1.98 * m)} ${y0}V${y0 + h}M${f(cx + 1.98 * m)} ${y0}V${y0 + h}`); L(`M${f(x0 + .76 * m)} ${y0}V${y0 + h}M${f(x0 + w - .76 * m)} ${y0}V${y0 + h}`);
    L(`M${x0} ${y0 + h / 2}H${f(cx - 1.98 * m)}M${f(cx + 1.98 * m)} ${y0 + h / 2}H${x0 + w}`);
    return g.net(cx, y0 - 9, y0 + h + 9);
  };
  // balle aux prisonniers : 2 camps + une prison derrière chaque camp adverse
  g.prisonCourt = (o = {}) => {
    g.floor(); g.raw(`<rect x="62" y="25" width="276" height="200" fill="#f4efe4" stroke="${CL}" stroke-width="2.5"/>`, 'bg').line('M200 25V225', 2.5, CL);
    g.zone(14, 25, 44, 200, '', 'red').zone(342, 25, 44, 200, '', 'red');
    g.label(36, 20, 'prison B', {s: 10, b: 1}).label(364, 20, 'prison A', {s: 10, b: 1});
    if (o.camps !== false) g.label(131, 240, 'camp A', {s: 11, b: 1, c: COL.a}).label(269, 240, 'camp B', {s: 11, b: 1, c: COL.b});
    return g;
  };
  // bassin de 25 m vu de dessus, n couloirs ; o.deep : 'droite' (grand bain à droite), o.small : petit bain seul
  g.pool = (n = 5, o = {}) => {
    put('bg', `<rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="#e6e0d4"/>`);
    const x0 = 22, x1 = 378, y0 = 22, y1 = 228, lh = (y1 - y0) / n;
    put('bg', `<defs><linearGradient id="dp" x1="0" x2="1"><stop offset="0" stop-color="#bfe6f6"/><stop offset="1" stop-color="${o.small ? '#bfe6f6' : '#7cc3e6'}"/></linearGradient></defs><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="url(#dp)" stroke="#9fb7c2" stroke-width="3"/>`);
    for (let i = 1; i < n; i++) put('bg', `<path d="M${x0} ${f(y0 + i * lh)}H${x1}" stroke="#d6336c" stroke-width="3" stroke-dasharray="8 8"/><path d="M${x0 + 8} ${f(y0 + i * lh)}H${x1}" stroke="#fff" stroke-width="3" stroke-dasharray="8 8"/>`);
    if (o.marks !== false){ [5, 12.5, 20].forEach(m => put('bg', `<path d="M${f(x0 + m / 25 * (x1 - x0))} ${y0}v6M${f(x0 + m / 25 * (x1 - x0))} ${y1}v-6" stroke="#2d3530" stroke-width="1.5"/>`));
      g.label(f(x0 + 5 / 25 * (x1 - x0)), y1 + 13, '5 m', {s: 9, c: '#6b6455'}).label(200, y1 + 13, '12,5 m', {s: 9, c: '#6b6455'}).label(f(x0 + 20 / 25 * (x1 - x0)), y1 + 13, '20 m', {s: 9, c: '#6b6455'}); }
    if (o.small) g.label(200, 14, 'petit bain : on a pied partout', {s: 10, c: '#3d6f86'});
    else if (o.deep !== false) g.label(70, 14, '← petit bain', {s: 10, c: '#3d6f86'}).label(330, 14, 'grand bain →', {s: 10, c: '#3d6f86'});
    g.pool_lh = lh; g.pool_y = i => f(y0 + (i + .5) * lh);
    return g;
  };
  // piste d'athlétisme (ovale) ; g.track_pt(t) = point sur la corde (t de 0 à 1, départ en bas au milieu, sens inverse des aiguilles)
  g.track = (o = {}) => {
    g.grass(); const cx = 200, cy = 125, rx = 175, ry = 105, r = 105, L = rx - r;
    const ov = (d, fill, st, sw, dash) => put('bg', `<path d="M${cx - L} ${cy - d}H${cx + L}A${d} ${d} 0 0 1 ${cx + L} ${cy + d}H${cx - L}A${d} ${d} 0 0 1 ${cx - L} ${cy - d}Z" fill="${fill}" stroke="${st}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`);
    ov(r, '#d9876a', 'none', 0); for (let i = 0; i <= 4; i++) ov(r - 7 - i * 8, 'none', '#fff', 1.2); ov(r - 48, '#cfe6bf', '#fff', 2);
    if (o.finish !== false) put('bg', `<path d="M${cx + L - 10} ${cy + r - 48}V${cy + r}" stroke="#fff" stroke-width="3"/><path d="M${cx + L - 10} ${cy + r - 48}V${cy + r}" stroke="#2d3530" stroke-width="3" stroke-dasharray="3 3"/>`);
    g.track_pt = (t, k = 0) => { const P = 2 * L + Math.PI * (r - 20), per = 2 * P, d = ((t % 1) + 1) % 1 * per, rr = r - 20 - k;
      // départ en bas, au milieu, puis vers la droite (sens inverse des aiguilles d'une montre vu de dessus)
      const seg = [[L, 'b'], [Math.PI * rr, 'R'], [2 * L, 't'], [Math.PI * rr, 'Lft'], [L, 'b2']]; let s = d;
      if (s < L) return [cx + s, cy + rr]; s -= L;
      if (s < Math.PI * rr){ const a = Math.PI / 2 - s / rr; return [cx + L + rr * Math.cos(a), cy + rr * Math.sin(a)]; } s -= Math.PI * rr;
      if (s < 2 * L) return [cx + L - s, cy - rr]; s -= 2 * L;
      if (s < Math.PI * rr){ const a = -Math.PI / 2 - s / rr; return [cx - L + rr * Math.cos(a), cy + rr * Math.sin(a)]; } s -= Math.PI * rr;
      return [cx - L + s, cy + rr]; };
    return g;
  };
  // ligne droite de piste : n couloirs horizontaux, départ à gauche, arrivée à droite
  g.straight = (n = 4, o = {}) => {
    put('bg', `<rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="#d7ebc9"/><rect x="0" y="${o.y0 || 35}" width="${W}" height="${(o.lh || 40) * n}" fill="#d9876a"/>`);
    const y0 = o.y0 || 35, lh = o.lh || 40;
    for (let i = 0; i <= n; i++) g.line(`M0 ${y0 + i * lh}H${W}`, 1.5, '#fff');
    if (o.start !== false) g.line(`M${o.sx || 40} ${y0}V${y0 + n * lh}`, 3, '#fff');
    if (o.finish !== false) put('bg', `<path d="M${o.fx || 360} ${y0}V${y0 + n * lh}" stroke="#fff" stroke-width="4"/><path d="M${o.fx || 360} ${y0}V${y0 + n * lh}" stroke="#2d3530" stroke-width="4" stroke-dasharray="4 4"/>`);
    g.lane_y = i => y0 + (i + .5) * lh;
    return g;
  };
  // tapis, gros tapis, scène, zone colorée
  g.mat = (x, y, w, h, o = {}) => put(o.k || 'bg', `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 5}" fill="${o.c || '#9fc2ea'}" stroke="${o.st || '#5b87bd'}" stroke-width="1.5"/>` + (o.seams ? Array.from({length: o.seams - 1}, (_, i) => `<path d="M${f(x + w / o.seams * (i + 1))} ${y}v${h}" stroke="#5b87bd" stroke-width="1"/>`).join('') : '') + (o.t ? txt(x + w / 2, y + h / 2 + 4, o.t, {s: o.ts || 10, c: '#2d4a6e', b: 1}) : ''));
  g.stage = (o = {}) => { g.floor(); put('bg', `<rect x="20" y="14" width="360" height="190" rx="4" fill="#efe7f8" stroke="#b9a6d6" stroke-width="2"/>`);
    if (o.public !== false) g.label(200, 226, 'P U B L I C', {s: 12, b: 1, c: '#7a6a96'}).raw('<path d="M60 236H340" stroke="#b9a6d6" stroke-width="2" stroke-dasharray="3 5"/>', 'bg');
    return g; };
  const TONES = {blue: ['rgba(31,99,214,.10)', '#7ea5e0'], green: ['rgba(22,163,74,.14)', '#5fb784'], red: ['rgba(214,51,108,.12)', '#d98aa8'], grey: ['rgba(60,60,60,.08)', '#aaa'], yellow: ['rgba(250,204,21,.22)', '#d4b23a'], orange: ['rgba(232,89,12,.12)', '#e8a06c']};
  g.zone = (x, y, w, h, lab = '', tone = 'blue', o = {}) => { const [fi, st] = TONES[tone] || TONES.blue;
    put(o.k || 'bg', `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${o.rx ?? 6}" fill="${fi}" stroke="${st}" stroke-width="1.5"${o.dash !== false ? ' stroke-dasharray="5 4"' : ''}/>`);
    return lab ? g.label(x + w / 2, o.ly != null ? o.ly : y + (o.top ? 14 : h / 2 + 4), lab, {s: o.s || 10, b: 1, c: o.c || '#4a5550'}) : g; };
  g.czone = (x, y, r, lab = '', tone = 'blue', o = {}) => { const [fi, st] = TONES[tone] || TONES.blue;
    put('bg', `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${fi}" stroke="${st}" stroke-width="1.5" stroke-dasharray="5 4"/>`);
    return lab ? g.label(x, o.ly != null ? o.ly : y + 4, lab, {s: o.s || 10, b: 1}) : g; };

  /* ===== joueurs ===== */
  const pTxt = (x, y, lab, c = '#fff', s) => lab === '' || lab == null ? '' : `<text x="${f(x)}" y="${f(y + (s || 10) * .36)}" font-size="${s || (String(lab).length > 1 ? 8.5 : 10)}" font-weight="700" fill="${c}" text-anchor="middle">${esc(lab)}</text>`;
  const withBall = (x, y, o) => o.ball ? g.ball(x + (o.bx ?? 8), y + (o.by ?? 7), o.ball === true ? null : o.ball) : g;
  g.A = (x, y, lab = '', o = {}) => { put('top', `<circle cx="${f(x)}" cy="${f(y)}" r="9" fill="${o.c || COL.a}" stroke="#fff" stroke-width="2"/>${pTxt(x, y, lab)}`); return withBall(x, y, o); };
  g.B = (x, y, lab = '', o = {}) => { put('top', `<rect x="${f(x - 8.5)}" y="${f(y - 8.5)}" width="17" height="17" rx="3" fill="${o.c || COL.b}" stroke="#fff" stroke-width="2"/>${pTxt(x, y, lab)}`); return withBall(x, y, o); };
  g.X = (x, y, lab = '', o = {}) => { put('top', `<path d="M${f(x)} ${f(y - 11)}L${f(x + 11)} ${f(y)}L${f(x)} ${f(y + 11)}L${f(x - 11)} ${f(y)}Z" fill="${o.c || COL.x}" stroke="#fff" stroke-width="2"/>${pTxt(x, y, lab)}`); return withBall(x, y, o); };
  g.J = (x, y, lab = 'J', o = {}) => { put('top', `<path d="M${f(x)} ${f(y - 11)}L${f(x + 10.5)} ${f(y + 8)}L${f(x - 10.5)} ${f(y + 8)}Z" fill="${COL.j}" stroke="#fff" stroke-width="2"/>${pTxt(x, y + 2, lab, '#fff', 9)}`); return withBall(x, y, o); };
  g.P = (x, y, o = {}) => { put('top', `<circle cx="${f(x)}" cy="${f(y)}" r="10" fill="${COL.p}" stroke="#fff" stroke-width="2"/>${pTxt(x, y, 'P')}`); return withBall(x, y, o); };
  // joueur selon un code : 'a' 'b' 'x' 'j' 'p'
  g.pl = (t, x, y, lab = '', o = {}) => t === 'g' ? g.A(x, y, lab, {...o, c: '#9aa3a0'}) : t === 'b' ? g.B(x, y, lab, o) : t === 'x' ? g.X(x, y, lab, o) : t === 'j' ? g.J(x, y, lab || 'J', o) : t === 'p' ? g.P(x, y, o) : g.A(x, y, lab, o);
  // plusieurs joueurs : liste de [x, y, lab?, opts?]
  g.pls = (t, P, o = {}) => { P.forEach(p => g.pl(t, p[0], p[1], p[2] ?? '', {...o, ...(p[3] || {})})); return g; };
  // n joueurs répartis sans se chevaucher dans un rectangle (graine = seed)
  g.scatter = (t, n, x0, y0, x1, y1, o = {}) => { const r = rnd(o.seed || 7), cols = Math.ceil(Math.sqrt(n * (x1 - x0) / Math.max(1, y1 - y0))), rows = Math.ceil(n / cols), cw = (x1 - x0) / cols, rh = (y1 - y0) / rows, P = [];
    const cells = Array.from({length: cols * rows}, (_, i) => i).sort(() => r() - .5).slice(0, n);
    cells.forEach(c => { const x = x0 + (c % cols + .5) * cw + (r() - .5) * cw * .5, y = y0 + (Math.floor(c / cols) + .5) * rh + (r() - .5) * rh * .5; P.push([f(x), f(y)]); g.pl(t, x, y, o.lab || '', o); });
    g.last = P; return g; };
  // n joueurs en ligne de (x1,y1) à (x2,y2)
  g.row = (t, n, x1, y1, x2, y2, o = {}) => { const P = []; for (let i = 0; i < n; i++){ const k = n === 1 ? .5 : i / (n - 1), x = x1 + (x2 - x1) * k, y = y1 + (y2 - y1) * k; P.push([f(x), f(y)]); g.pl(t, x, y, o.labs ? o.labs[i] ?? '' : o.lab || '', {...o, ball: o.balls ? o.balls.includes(i) : o.ball}); } g.last = P; return g; };
  // n joueurs en cercle (ellipse) de centre (cx, cy)
  g.ring = (t, n, cx, cy, rx, ry = rx, o = {}) => { const P = []; for (let i = 0; i < n; i++){ const a = (o.a0 ?? -Math.PI / 2) + i / n * 2 * Math.PI, x = cx + rx * Math.cos(a), y = cy + ry * Math.sin(a); P.push([f(x), f(y)]); g.pl(t, x, y, o.labs ? o.labs[i] ?? '' : o.lab || '', {...o, ball: o.balls ? o.balls.includes(i) : o.ball}); } g.last = P; return g; };
  // file (colonne) de n joueurs qui attendent, tête en (x, y), file vers (dx, dy)
  g.file = (t, n, x, y, dx = -20, dy = 0, o = {}) => g.row(t, n, x, y, x + dx * (n - 1), y + dy * (n - 1), o);
  // pour chaque joueur du dernier groupe posé (scatter, row, ring, file)
  g.each = fn => { (g.last || []).forEach((p, i) => fn(p[0], p[1], i)); return g; };

  /* ===== scènes toutes faites (communes à plusieurs sports) ===== */
  // retour au calme : cercle d'élèves autour du prof, texte au centre
  g.calme = (t = '', o = {}) => { g.hall(); g.ring('a', o.n || 12, 200, 125, 150, 85, {ball: o.ball}); g.P(200, 125); if (t) g.tag(200, 100, t, {s: 10}); return g; };
  // équipes au bord (arbitres, remplaçants) le long d'un côté
  g.bord = (x, y, n = 3, lab = 'équipe au bord : arbitre', t = 'b', o = {}) => { g.row(t, n, x, y, x + (o.dx ?? 22) * (n - 1), y + (o.dy ?? 0) * (n - 1)); return lab ? g.label(x + (o.dx ?? 22) * (n - 1) / 2, y + (o.ly ?? -14), lab, {s: 9.5, b: 1, c: '#6b6455'}) : g; };
  // n terrains réduits côte à côte (tournoi, roi du terrain) ; renvoie les cadres dans g.T
  g.terrains = (n = 4, o = {}) => { g.floor(); const cols = n > 2 ? 2 : n, rows = Math.ceil(n / cols), w = (380 - (cols - 1) * 10) / cols, h = (o.h || 230 - (rows - 1) * 10) / rows; g.T = [];
    for (let i = 0; i < n; i++){ const x = 10 + (i % cols) * (w + 10), y = (o.y0 || 10) + Math.floor(i / cols) * (h + 10); g.T.push([x, y, w, h]);
      put('bg', `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="4" fill="#f9f5ec" stroke="${CL}" stroke-width="2"/>`);
      if (o.net) g.net(x + w / 2, y - 2, y + h + 2); else if (o.mid !== false) g.line(`M${f(x + w / 2)} ${y}v${h}`, 1.5, CL);
      if (o.goals) { g.goalMini(o.goals, x + 4, y + h / 2, -1); g.goalMini(o.goals, x + w - 4, y + h / 2, 1); }
      if (o.labs) g.tag(x + w / 2, y + 14, o.labs[i], {s: 9.5}); }
    return g; };
  // petite cible au bout d'un terrain réduit : 'basket' (panier), 'hand'/'foot' (but), 'cones'
  g.goalMini = (k, x, y, sd) => k === 'basket' ? g.hoopB(x - sd * 4, y, sd) : k === 'hand' || k === 'foot' ? g.cage(x, y, sd, 22) : g.minigoal(x - sd * 4, y, true, 22);

  /* ===== matériel ===== */
  const BALLS = {basket: ['#e8772e', '#7a3a10'], volley: ['#fff6d6', '#2f5fa8'], hand: ['#f6e05e', '#8a6d00'], foot: ['#ffffff', '#1d241f'], mousse: ['#ff8fab', '#a23b5c'], gros: ['#5fb784', '#226b40'], medecine: ['#6b4f3a', '#2d1f14'], lest: ['#d6336c', '#7a1d40']};
  g.ball = (x, y, k) => { const s = k || (g.sp === 'hiver' || g.sp === 'prisonnier' || g.sp === 'danse' ? 'mousse' : g.sp);
    if (s === 'volant') return g.volant(x, y);
    const [c, l] = BALLS[s] || ['#ffd23f', '#6b5800'], big = s === 'gros' ? 9 : s === 'medecine' ? 6.5 : 5;
    let d = '';
    if (s === 'basket') d = `<path d="M${f(x - big)} ${y}H${f(x + big)}M${x} ${f(y - big)}V${f(y + big)}" stroke="${l}" stroke-width=".9"/>`;
    else if (s === 'volley') d = `<path d="M${f(x - big * .7)} ${f(y - big * .7)}Q${x} ${y} ${f(x - big * .2)} ${f(y + big)}M${f(x + big)} ${f(y - big * .2)}Q${x} ${y} ${f(x - big)} ${f(y + big * .1)}" stroke="${l}" stroke-width=".9" fill="none"/>`;
    else if (s === 'foot') d = `<circle cx="${x}" cy="${y}" r="${f(big * .38)}" fill="${l}"/>`;
    return put('top', `<circle cx="${f(x)}" cy="${f(y)}" r="${big}" fill="${c}" stroke="${l}" stroke-width="1.2"/>${d}`); };
  g.volant = (x, y, a = -30) => put('top', `<g transform="translate(${f(x)} ${f(y)}) rotate(${a})"><path d="M0 -3L9 -6V6L0 3Z" fill="#fff" stroke="#555" stroke-width="1"/><circle cx="0" cy="0" r="3" fill="#2d3530"/></g>`);
  g.balls = (x, y, n = 6, k) => { for (let i = 0; i < n; i++) g.ball(x + (i % 3) * 9 - 9 + (Math.floor(i / 3) % 2) * 4, y + Math.floor(i / 3) * 8 - 4, k); return g; };
  g.bac = (x, y, lab = 'ballons', k) => { put('mid', `<rect x="${x - 18}" y="${y - 12}" width="36" height="24" rx="4" fill="#cdb79e" stroke="#7a6a52" stroke-width="1.5"/>`); g.balls(x, y, 6, k); return lab ? g.label(x, y + 24, lab, {s: 9}) : g; };
  g.cone = (x, y, c = '#f06400') => put('mid', `<path d="M${f(x - 6)} ${f(y + 5)}L${f(x)} ${f(y - 8)}L${f(x + 6)} ${f(y + 5)}Z" fill="${c}" stroke="#fff" stroke-width="1"/>`);
  g.disc = (x, y, c = '#facc15') => put('mid', `<ellipse cx="${f(x)}" cy="${f(y)}" rx="6" ry="4" fill="${c}" stroke="#a37f00" stroke-width="1.2"/><circle cx="${f(x)}" cy="${f(y)}" r="1.5" fill="#a37f00"/>`);
  g.plot = (x, y, c = '#e11d48') => put('mid', `<circle cx="${f(x)}" cy="${f(y)}" r="4" fill="${c}" stroke="#fff" stroke-width="1"/>`);
  g.hoop = (x, y, r = 11, c = '#d6336c') => put('mid', `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="none" stroke="${c}" stroke-width="3"/>`);
  g.bench = (x1, y1, x2, y2) => { const a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, l = Math.hypot(x2 - x1, y2 - y1);
    return put('mid', `<g transform="translate(${f(x1)} ${f(y1)}) rotate(${f(a)})"><rect x="0" y="-5" width="${f(l)}" height="10" rx="2" fill="#c08a4f" stroke="#7a5228" stroke-width="1.5"/><path d="M6 -5v10M${f(l - 6)} -5v10" stroke="#7a5228" stroke-width="2"/></g>`); };
  g.plinth = (x, y, w = 40, h = 22, lab = 'plinth') => put('mid', `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="4" fill="#d8b98a" stroke="#7a5228" stroke-width="1.5"/><path d="M${x - w / 2} ${y - h / 6}h${w}M${x - w / 2} ${y + h / 6}h${w}" stroke="#7a5228" stroke-width=".8"/>` + (lab ? txt(x, y + h / 2 + 10, lab, {s: 9}) : ''));
  g.step = (x, y) => put('mid', `<rect x="${x - 12}" y="${y - 7}" width="24" height="14" rx="3" fill="#7c8a99" stroke="#3e4a56" stroke-width="1.2"/>`);
  g.tramp = (x, y, lab = 'mini-trampoline') => put('mid', `<rect x="${x - 15}" y="${y - 15}" width="30" height="30" rx="5" fill="#2d3530"/><rect x="${x - 10}" y="${y - 10}" width="20" height="20" rx="2" fill="#5a6672"/>` + (lab ? txt(x, y + 26, lab, {s: 9}) : ''));
  g.board = (x, y, a = 0) => put('mid', `<rect x="${f(x - 11)}" y="${f(y - 6)}" width="22" height="12" rx="4" fill="#f59f00" stroke="#9a5b00" stroke-width="1.2" transform="rotate(${a} ${f(x)} ${f(y)})"/>`);
  g.frite = (x, y, a = 0, c = '#16a34a') => put('mid', `<rect x="${f(x - 22)}" y="${f(y - 3.5)}" width="44" height="7" rx="3.5" fill="${c}" stroke="#fff" stroke-width="1" transform="rotate(${a} ${f(x)} ${f(y)})"/>`);
  g.ring = g.ring; // (gardé : g.ring = joueurs en cercle)
  g.anneau = (x, y, c = '#d6336c') => put('mid', `<circle cx="${f(x)}" cy="${f(y)}" r="5" fill="none" stroke="${c}" stroke-width="3"/>`);
  // nageur vu de dessus : o.a = direction en degrés (0 = vers la droite), o.k = 'nage' (bras devant), 'crawl', 'dos', 'brasse',
  // 'etoile', 'boule', 'sous' (sous l'eau : en pointillés), 'tete' (tête hors de l'eau : surplace, debout), o.t = 'a' | 'b' | 'x' (couleur d'équipe)
  g.nag = (x, y, o = {}) => { const a = o.a || 0, c = o.c || (o.t === 'b' ? COL.b : o.t === 'x' ? COL.x : o.t === 'g' ? '#9aa3a0' : COL.a), k = o.k || 'nage', sd = k === 'sous' ? ' stroke-dasharray="3 2" fill-opacity=".35"' : '';
    let b;
    if (k === 'tete') b = `<circle cx="0" cy="0" r="12" fill="none" stroke="#fff" stroke-width="1.5" opacity=".9"/><circle cx="0" cy="0" r="7.5" fill="${c}" stroke="#fff" stroke-width="1.5"/>`;
    else if (k === 'etoile') b = `<path d="M0 0L-12 -12M0 0L-12 12M0 0L14 -10M0 0L14 10" stroke="${c}" stroke-width="4" stroke-linecap="round"/><ellipse cx="0" cy="0" rx="9" ry="6" fill="${c}"/><circle cx="12" cy="0" r="5" fill="${c}" stroke="#fff" stroke-width="1.2"/>`;
    else if (k === 'boule') b = `<circle cx="0" cy="0" r="10" fill="${c}" stroke="#fff" stroke-width="1.5"/><path d="M-5 -3a5 5 0 0 1 10 0" stroke="#fff" stroke-width="1.5" fill="none"/>`;
    else { const arms = k === 'crawl' ? `<path d="M8 -4L22 -5M2 4L-8 8" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>` : k === 'dos' ? `<path d="M8 -4L22 -6M8 4L-4 10" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>` : k === 'brasse' ? `<path d="M8 -4Q16 -14 22 -5M8 4Q16 14 22 5" stroke="${c}" stroke-width="3.5" fill="none" stroke-linecap="round"/>` : `<path d="M8 -4L21 -4M8 4L21 4" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>`;
      b = `${arms}<path d="M-8 -3L-20 -6M-8 3L-20 6" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="0" cy="0" rx="11" ry="6.5" fill="${c}"${sd}/><circle cx="12" cy="0" r="5" fill="${k === 'dos' ? '#fff' : c}" stroke="${c}" stroke-width="2"/>`; }
    put('top', `<g transform="translate(${f(x)} ${f(y)}) rotate(${a})"${k === 'sous' ? ' opacity=".55"' : ''}>${b}</g>` + (o.lab ? txt(x, y - 14, o.lab, {s: 9, b: 1}) : ''));
    return g; };
  // échelle de piscine, plot de départ, perche, ligne d'eau (bouchons) verticale, cerceau flottant, objet au fond
  g.echelle = (x, y) => put('mid', `<rect x="${x - 7}" y="${y - 10}" width="14" height="20" fill="none" stroke="#9ca3af" stroke-width="2"/><path d="M${x - 7} ${y - 3}h14M${x - 7} ${y + 4}h14" stroke="#9ca3af" stroke-width="1.6"/>`).label(x, y + 22, 'échelle', {s: 8.5});
  g.plotDep = (x, y) => put('mid', `<rect x="${x - 9}" y="${y - 8}" width="18" height="16" rx="2" fill="#e5e7eb" stroke="#475569" stroke-width="1.5"/>`);
  g.perche = (x1, y1, x2, y2) => put('mid', `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/><path d="M${x2} ${y2 - 8}v16" stroke="#94a3b8" stroke-width="4"/>`);
  g.ligneEau = (x, y1 = 22, y2 = 228) => put('mid', `<path d="M${x} ${y1}V${y2}" stroke="#d6336c" stroke-width="3.5" stroke-dasharray="7 7"/><path d="M${x} ${y1 + 7}V${y2}" stroke="#fff" stroke-width="3.5" stroke-dasharray="7 7"/>`);
  g.fond = (x, y, c = '#d6336c') => put('mid', `<circle cx="${f(x)}" cy="${f(y)}" r="5.5" fill="none" stroke="${c}" stroke-width="3.2"/><circle cx="${f(x)}" cy="${f(y)}" r="9" fill="none" stroke="#0b6e99" stroke-width=".8" stroke-dasharray="2 2"/>`);
  g.cerceauFlot = (x, y, r = 13) => put('mid', `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="none" stroke="#f59f00" stroke-width="3.5"/>`);
  g.bulles = (x, y) => put('top', `<circle cx="${x}" cy="${y}" r="2.5" fill="none" stroke="#fff" stroke-width="1.3"/><circle cx="${x + 5}" cy="${y - 5}" r="2" fill="none" stroke="#fff" stroke-width="1.3"/><circle cx="${x - 3}" cy="${y - 8}" r="1.6" fill="none" stroke="#fff" stroke-width="1.3"/>`);
  // bassin de petite profondeur seul (débutants) : zone fermée par une ligne d'eau à droite
  g.petitBain = (o = {}) => { put('bg', `<rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="#e6e0d4"/><rect x="22" y="22" width="356" height="206" fill="#c4e8f7" stroke="#9fb7c2" stroke-width="3"/>`);
    if (o.deep !== false) put('bg', `<rect x="300" y="22" width="78" height="206" fill="#7cc3e6"/>`).label(339, 14, 'on n\'a plus pied', {s: 9.5, c: '#3d6f86'});
    g.ligneEau(o.deep !== false ? 300 : 378); return g.label(160, 14, 'petite profondeur (zone du groupe)', {s: 9.5, c: '#3d6f86'}); };
  // bassin vu de côté (coupe) : bord à gauche, surface à y = 62, fond qui descend vers la droite ; o.small : petit bain seul ; g.fond_y(x) = hauteur du fond
  g.coupe = (o = {}) => { put('bg', `<rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="#f4f1ea"/>`);
    const yb = x => o.small ? 175 : x < 170 ? 150 : x > 250 ? 236 : 150 + (x - 170) / 80 * 86;
    put('bg', `<path d="${o.small ? 'M60 62H400V200H60Z' : o.deep ? 'M60 62H400V236H60Z' : 'M60 62H400V236H250L170 150H60Z'}" fill="#9fd6ef"/><rect x="0" y="40" width="60" height="${o.small ? 160 : o.deep ? 200 : 115}" fill="#d9d3c4"/><path d="${o.small ? 'M60 62V200H400' : o.deep ? 'M60 62V236H400' : 'M60 62V150H170L250 236H400'}" fill="none" stroke="#8a958c" stroke-width="3"/><path d="M60 62H400" stroke="#0b6e99" stroke-width="2" stroke-dasharray="10 4"/>`);
    g.fond_y = yb; g.label(30, 58, 'bord', {s: 9.5, c: '#6b6455'}).label(388, 56, 'surface', {s: 9, c: '#0b6e99', a: 'end'});
    if (o.deep) g.label(330, 247, 'grande profondeur : on n\'a pas pied', {s: 9, c: '#3d6f86'});
    else if (!o.small) g.label(110, 168, 'petit bain', {s: 9, c: '#3d6f86'}).label(330, 247, 'grand bain', {s: 9, c: '#3d6f86'});
    return g; };
  // personnage vu de côté (bonhomme) : o.a = rotation, o.c = couleur
  g.side = (x, y, o = {}) => { const c = o.c || (o.t === 'b' ? COL.b : o.t === 'x' ? COL.x : COL.a);
    return put('top', `<g transform="translate(${f(x)} ${f(y)}) rotate(${o.a || 0})"${o.k === 'sous' ? ' opacity=".6"' : ''}><circle cx="0" cy="-17" r="5.5" fill="${c}"/><path d="M0 -11V5M0 5L-5 17M0 5L5 17M0 -7L${o.up ? '-6 -22M0 -7L6 -22' : '-8 2M0 -7L8 2'}" stroke="${c}" stroke-width="3.2" stroke-linecap="round" fill="none"/></g>`); };
  // gymnaste vu de côté (acrosport) : pose = 'debout' | 'bras' | 'table' (à 4 pattes) | 'planche' | 'planchec' | 'allonge' | 'jambes' (sur le dos, jambes en l'air)
  // | 'chandelle' | 'atr' | 'pareur' | 'genou' (à genoux, buste droit) | 'avion' (sur un pied) | 'assis' | 'accroupi' ; (x, y) = point au sol ; o.r = regarde à gauche ; o.t = 'a' porteur, 'b' voltigeur, 'p' pareur
  const POSES = {
    debout: {H: [0, -37], N: [0, -31], P: [0, -16], M: [[-7, -17], [7, -17]], F: [[-5, 0], [5, 0]]},
    bras: {H: [0, -37], N: [0, -31], P: [0, -16], M: [[-7, -46], [7, -46]], F: [[-5, 0], [5, 0]]},
    pareur: {H: [-1, -37], N: [0, -31], P: [-2, -16], M: [[12, -28], [14, -22]], F: [[-9, 0], [5, 0]]},
    table: {H: [19, -22], N: [13, -18], P: [-11, -18], M: [[13, 0], [11, 0]], K: [[-11, 0], [-11, 0]], F: [[-25, 0], [-25, 0]]},
    genou: {H: [0, -32], N: [0, -26], P: [0, -12], M: [[8, -14], [9, -16]], K: [[2, 0], [2, 0]], F: [[-12, 0], [-12, 0]]},
    planche: {H: [21, -18], N: [14, -14], P: [-6, -8], M: [[14, 0], [12, 0]], F: [[-25, 0], [-25, 0]]},
    planchec: {H: [21, -24], N: [14, -19], P: [-6, -11], M: [[14, 0], [10, -32]], F: [[-25, 0], [-25, 0]]},
    allonge: {H: [21, -4], N: [14, -4], P: [-6, -4], M: [[24, -6], [4, -4]], F: [[-25, -3], [-25, -3]]},
    jambes: {H: [21, -4], N: [14, -4], P: [-4, -4], M: [[14, -22], [12, -22]], F: [[-4, -32], [-2, -32]]},
    chandelle: {H: [-7, -3], N: [0, -3], P: [0, -20], M: [[8, -3], [-12, -3]], F: [[0, -44], [2, -44]]},
    atr: {H: [0, -7], N: [0, -12], P: [0, -27], M: [[-5, 0], [5, 0]], F: [[-2, -47], [2, -47]]},
    avion: {H: [17, -24], N: [11, -22], P: [-4, -17], M: [[-6, -29], [26, -26]], F: [[-1, 0], [-24, -14]]},
    assis: {H: [-6, -28], N: [-5, -22], P: [-6, -4], M: [[4, -12], [6, -10]], F: [[18, 0], [18, 0]]},
    accroupi: {H: [5, -27], N: [3, -21], P: [-6, -9], M: [[12, -14], [11, -12]], K: [[6, -11], [6, -11]], F: [[1, 0], [1, 0]]}
  };
  g.fig = (x, y, pose = 'debout', o = {}) => { const S = POSES[pose] || POSES.debout, sx = o.r ? -1 : 1, k = o.s || 1, c = o.c || (o.t === 'b' ? COL.b : o.t === 'p' ? '#9aa3a0' : o.t === 'j' ? COL.j : COL.a);
    const T = ([a, b]) => `${f(x + a * sx * k)} ${f(y + b * k)}`; let d = `M${T(S.N)}L${T(S.P)}`;
    S.M.forEach(m => { d += `M${T(S.N)}L${T(m)}`; }); S.F.forEach((ft, i) => { d += S.K ? `M${T(S.P)}L${T(S.K[i])}L${T(ft)}` : `M${T(S.P)}L${T(ft)}`; });
    put('top', `<path d="${d}" fill="none" stroke="${c}" stroke-width="${f(4 * k)}" stroke-linecap="round" stroke-linejoin="round"${o.t === 'p' ? ' stroke-dasharray="5 3"' : ''}/><circle cx="${f(x + S.H[0] * sx * k)}" cy="${f(y + S.H[1] * k)}" r="${f(5.5 * k)}" fill="${c}"/>`);
    return o.lab ? g.label(x, y + 13, o.lab, {s: 8.5, b: 1}) : g; };
  // côté gymnase avec tapis vu de côté : sol à y, tapis de x1 à x2
  g.sol = (y = 200, x1 = 20, x2 = 380) => { g.floor(); return put('bg', `<rect x="${x1}" y="${y}" width="${x2 - x1}" height="8" rx="2" fill="#9fc2ea" stroke="#5b87bd" stroke-width="1.2"/><path d="M0 ${y + 8}H${W}" stroke="#cbbfa8" stroke-width="2"/>`); };
  g.tapisFlot = (x, y, w = 60, h = 34) => put('mid', `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="6" fill="#fde68a" stroke="#b78a00" stroke-width="1.5"/>`);
  g.sheet = (x, y, lab = '') => put('mid', `<rect x="${x - 9}" y="${y - 11}" width="18" height="22" rx="1.5" fill="#fff" stroke="#6b7280" stroke-width="1.2"/><path d="M${x - 5} ${y - 5}h10M${x - 5} ${y}h10M${x - 5} ${y + 5}h7" stroke="#9ca3af" stroke-width="1.2"/>` + (lab ? txt(x, y + 22, lab, {s: 9}) : ''));
  g.music = (x, y) => put('mid', `<rect x="${x - 10}" y="${y - 13}" width="20" height="26" rx="3" fill="#2d3530"/><circle cx="${x}" cy="${y + 4}" r="6" fill="#5a6672"/><circle cx="${x}" cy="${y - 7}" r="3" fill="#5a6672"/>`).label(x, y + 24, 'musique', {s: 9});
  g.chrono = (x, y) => put('mid', `<circle cx="${x}" cy="${y}" r="9" fill="#fff" stroke="#2d3530" stroke-width="2"/><path d="M${x} ${y}V${y - 6}M${x} ${y}h4" stroke="#2d3530" stroke-width="1.6"/><rect x="${x - 2.5}" y="${y - 13}" width="5" height="3" fill="#2d3530"/>`);
  g.rope = (x1, y1, x2, y2, sag = 0, c = '#c2185b') => put('mid', `<path d="M${f(x1)} ${f(y1)}Q${f((x1 + x2) / 2)} ${f((y1 + y2) / 2 + sag)} ${f(x2)} ${f(y2)}" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`);
  g.ladder = (x, y, n = 6, w = 22, h = 120) => { let s = `<path d="M${x} ${y}V${y + h}M${x + w} ${y}V${y + h}" stroke="#e8a000" stroke-width="2.5"/>`; for (let i = 0; i <= n; i++) s += `<path d="M${x} ${f(y + i * h / n)}h${w}" stroke="#e8a000" stroke-width="2"/>`; return put('mid', s); };
  g.hurdle = (x, y, l = 22, vert = true) => put('mid', vert ? `<path d="M${x} ${y - l / 2}V${y + l / 2}" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>` : `<path d="M${x - l / 2} ${y}H${x + l / 2}" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>`);
  g.sand = (x, y, w, h) => put('bg', `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="#efd9a6" stroke="#c9ad6a" stroke-width="1.5"/>`);
  g.wall = (x, y, w, h) => put('bg', `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#8a958c"/><path d="M${x} ${y + h}h${w}" stroke="#5d6a60" stroke-width="2"/>`);
  g.flag = (x, y, c = '#e11d48') => put('mid', `<path d="M${x} ${y + 8}V${y - 12}" stroke="#2d3530" stroke-width="1.8"/><path d="M${x} ${y - 12}l12 4l-12 4Z" fill="${c}"/>`);
  g.chasuble = (x, y, c = '#facc15') => put('mid', `<path d="M${x - 7} ${y - 8}l4 -2l3 3l3 -3l4 2l-1 16h-12Z" fill="${c}" stroke="#8a6d00" stroke-width="1"/>`);
  g.tresor = (x, y, lab = '') => put('mid', `<rect x="${x - 10}" y="${y - 7}" width="20" height="14" rx="2" fill="#f59f00" stroke="#7a4b00" stroke-width="1.5"/><path d="M${x - 10} ${y - 2}h20" stroke="#7a4b00" stroke-width="1.2"/>`).label(x, y + 20, lab, {s: 9});

  /* ===== flèches ===== */
  const head = (x2, y2, ux, uy, c, s = 7) => `<path d="M${f(x2)} ${f(y2)}L${f(x2 - ux * s - uy * s * .55)} ${f(y2 - uy * s + ux * s * .55)}L${f(x2 - ux * s + uy * s * .55)} ${f(y2 - uy * s - ux * s * .55)}Z" fill="${c}"/>`;
  const STY = {run: [COL.run, 2, ''], pass: [COL.pass, 2, '6 4'], shot: [COL.shot, 2.6, '2 4'], lob: [COL.lob, 2, '6 4'], drib: [COL.run, 1.8, ''], swim: ['#0b6e99', 2, ''], rot: ['#6b7280', 1.8, '4 3']};
  // flèche courbe de (x1,y1) à (x2,y2) ; bend > 0 = courbe vers la gauche ; n = repère numéroté
  g.arrow = (k, x1, y1, x2, y2, bend = 0, n) => {
    const [c, w, da] = STY[k] || STY.run, mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
    const cx = mx - dy / L * bend, cy = my + dx / L * bend, tx = x2 - cx, ty = y2 - cy, tl = Math.hypot(tx, ty) || 1, ux = tx / tl, uy = ty / tl;
    const ex = x2 - ux * 3, ey = y2 - uy * 3;
    let ln;
    if (k === 'drib' || k === 'swim'){ // ligne ondulée le long de la courbe
      const N = Math.max(6, Math.round(L / (k === 'swim' ? 14 : 9))); let d = `M${f(x1)} ${f(y1)}`;
      for (let i = 1; i <= N; i++){ const t = i / N * .92, qx = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * ex, qy = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * ey,
        gx = 2 * (1 - t) * (cx - x1) + 2 * t * (ex - cx), gy = 2 * (1 - t) * (cy - y1) + 2 * t * (ey - cy), gl = Math.hypot(gx, gy) || 1, a = i === N ? 0 : (i % 2 ? 4 : -4);
        d += `${k === 'swim' ? 'L' : 'L'}${f(qx - gy / gl * a)} ${f(qy + gx / gl * a)}`; }
      ln = `<path d="${d}L${f(ex - ux * 4)} ${f(ey - uy * 4)}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"/>`;
    } else ln = `<path d="M${f(x1)} ${f(y1)}Q${f(cx)} ${f(cy)} ${f(ex - ux * 4)} ${f(ey - uy * 4)}" fill="none" stroke="${c}" stroke-width="${w}"${da ? ` stroke-dasharray="${da}"` : ''} stroke-linecap="round"/>`;
    put('ar', ln + head(ex, ey, ux, uy, c));
    if (n != null) g.num(f(.25 * x1 + .5 * cx + .25 * x2 - dy / L * 9), f(.25 * y1 + .5 * cy + .25 * y2 + dx / L * 9), n);
    return g;
  };
  g.run = (x1, y1, x2, y2, b = 0, n) => g.arrow('run', x1, y1, x2, y2, b, n);
  g.pass = (x1, y1, x2, y2, b = 0, n) => g.arrow('pass', x1, y1, x2, y2, b, n);
  g.shot = (x1, y1, x2, y2, b = 0, n) => g.arrow('shot', x1, y1, x2, y2, b, n);
  g.lob = (x1, y1, x2, y2, b = 30, n) => g.arrow('lob', x1, y1, x2, y2, b, n);
  g.drib = (x1, y1, x2, y2, b = 0, n) => g.arrow('drib', x1, y1, x2, y2, b, n);
  g.swim = (x1, y1, x2, y2, b = 0, n) => g.arrow('swim', x1, y1, x2, y2, b, n);
  g.rot = (x1, y1, x2, y2, b = 0, n) => g.arrow('rot', x1, y1, x2, y2, b, n);
  // trajet passant par plusieurs points (lissé), flèche au bout
  g.path = (k, P, n) => { const [c, w, da] = STY[k] || STY.run; let d = `M${P[0][0]} ${P[0][1]}`;
    for (let i = 1; i < P.length - 1; i++){ const mx = (P[i][0] + P[i + 1][0]) / 2, my = (P[i][1] + P[i + 1][1]) / 2; d += `Q${P[i][0]} ${P[i][1]} ${i === P.length - 2 ? '' : ''}${f(mx)} ${f(my)}`; }
    const a = P[P.length - 2], b = P[P.length - 1], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, ux = dx / l, uy = dy / l;
    d += `L${f(b[0] - ux * 7)} ${f(b[1] - uy * 7)}`;
    put('ar', `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}"${da ? ` stroke-dasharray="${da}"` : ''} stroke-linejoin="round" stroke-linecap="round"/>` + head(b[0] - ux * 2, b[1] - uy * 2, ux, uy, c));
    if (n != null) g.num(P[1][0] + 10, P[1][1] - 10, n);
    return g; };
  // boucle fermée (tour, rotation), sens des aiguilles d'une montre si cw
  g.loop = (cx, cy, rx, ry, k = 'run', cw = true) => { const [c, w, da] = STY[k] || STY.run;
    put('ar', `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${c}" stroke-width="${w}"${da ? ` stroke-dasharray="${da}"` : ''}/>`);
    const ux = cw ? 1 : -1; return put('ar', head(cx + 4 * ux, cy - ry, ux, 0, c)) && put('ar', head(cx - 4 * ux, cy + ry, -ux, 0, c)); };

  /* ===== textes ===== */
  g.label = (x, y, t, o = {}) => put('lab', txt(x, y, t, o));
  // bulle de texte avec fond blanc
  g.tag = (x, y, t, o = {}) => { const s = o.s || 10.5, w = String(t).length * s * .53 + 10;
    return put('lab', `<rect x="${f(x - w / 2)}" y="${f(y - s * .9)}" width="${f(w)}" height="${f(s * 1.55)}" rx="${f(s * .7)}" fill="${o.bg || '#fff'}" stroke="${o.st || '#cfc6b4'}" stroke-width="1"/>` + txt(x, y + s * .02, t, {s, b: o.b ?? 1, c: o.c || COL.ink, halo: false})); };
  g.num = (x, y, n) => put('lab', `<circle cx="${f(x)}" cy="${f(y)}" r="8" fill="#2d3530" stroke="#fff" stroke-width="1.5"/><text x="${f(x)}" y="${f(y + 3.6)}" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">${esc(n)}</text>`);
  // repère numéroté expliqué sous le schéma
  g.n = (k, t) => { notes.push([k, t]); return g; };
  g.cap = t => { g.caption = t; return g; };
  return g;
}
function txt(x, y, t, o = {}){
  const s = o.s || 11, c = o.c || COL.ink, a = o.a || 'middle';
  return `<text x="${f(x)}" y="${f(y)}" font-size="${s}" font-weight="${o.b ? 700 : 500}" fill="${c}" text-anchor="${a}"${o.halo === false ? '' : ' stroke="#fff" stroke-width="3" stroke-linejoin="round" paint-order="stroke"'}${o.it ? ' font-style="italic"' : ''}>${esc(t)}</text>`;
}

/* ---------- anciens modèles (gardés pour les prépas écrites à la main et les jeux sans scène) ---------- */
const nv = s => { const m = /^(\d)c(\d)$/.exec(s || ''); return m ? [+m[1], +m[2]] : [3, 3]; };
const OLD = {
  libre: (g, sp) => g.hall().scatter('a', 10, 40, 40, 360, 210, {ball: true, seed: 11}),
  voleurs: (g, sp) => g.hall().scatter('a', 9, 40, 40, 360, 210, {ball: true, seed: 11}).scatter('x', 3, 80, 60, 320, 190, {seed: 3}).label(200, 243, 'losanges : voleurs sans ballon', {s: 10}),
  chat: g => g.hall().scatter('a', 10, 40, 40, 360, 210, {seed: 5}).scatter('x', 2, 120, 80, 280, 170, {seed: 9}).label(200, 243, 'losanges : les chats', {s: 10}),
  cercle: g => g.hall().ring('a', 8, 200, 125, 90, 80).ball(290, 120),
  deux: g => { g.hall(); [60, 125, 190].forEach(y => g.A(110, y, '1', {ball: true}).A(260, y, '2').pass(122, y - 5, 248, y - 5, -10)); return g.label(185, 243, 'par deux, 3 à 6 m', {s: 10}); },
  trois: g => { g.hall(); [60, 125, 190].forEach(y => g.A(80, y).A(200, y).A(320, y).pass(190, y - 4, 92, y - 4, -12)); return g; },
  carre: (g, sp, k) => { g.hall().zone(110, 45, 180, 160); [[110, 45], [290, 45], [290, 205], [110, 205]].forEach(([x, y]) => g.cone(x, y).A(x + (x < 200 ? 16 : -16), y + (y < 125 ? 16 : -16))); for (let i = 0; i < (+k || 0); i++) g.X(180 + i * 30, 125); return g.pass(126, 61, 274, 61, -8); },
  files: g => { g.hall(); [50, 100, 150, 200].forEach(y => g.A(50, y).A(30, y).cone(340, y).run(62, y - 5, 328, y - 5)); return g; },
  slalom: (g, sp) => { g.hall(); for (let i = 0; i < 5; i++) g.cone(100 + i * 40, 125); g.A(50, 125, '', {ball: true}); return g.path('drib', [[60, 125], [100, 100], [140, 150], [180, 100], [220, 150], [260, 100], [300, 125], [340, 125]]); },
  tir: (g, sp) => { g.half(['basket', 'hand', 'foot'].includes(sp) ? sp : 'basket'); [[230, 60, '1'], [210, 125, '2'], [230, 190, '3']].forEach(([x, y, l]) => g.A(x, y, l, {ball: true}).shot(x + 10, y, 355, 125 + (y - 125) * .1)); return g; },
  demi: (g, sp, k) => { const [a, d] = nv(k); g.half(['basket', 'hand', 'foot'].includes(sp) ? sp : 'basket'); g.row('a', a, 170, 50, 170, 200, {balls: [0]}).row('x', d, 300, 70, 300, 180); return g.label(240, 243, `${a} attaquants contre ${d} défenseur${d > 1 ? 's' : ''}`, {s: 10}); },
  match: (g, sp, k) => { const [a, b] = nv(k); g.court(sp); g.scatter('a', a, 60, 50, 190, 200, {seed: 3}).scatter('b', b, 210, 50, 340, 200, {seed: 8}); return g.label(200, 243, `match ${a} contre ${b}`, {s: 10}); },
  tournoi: (g, sp) => { g.hall(); [[20, 20], [205, 20], [20, 130], [205, 130]].forEach(([x, y], i) => g.zone(x, y, 175, 100, `Terrain ${i + 1}`, 'grey', {s: 13})); return g; },
  filet: (g, sp, k) => { const [a, b] = nv(k || '3c3'); g.court('volley').scatter('a', a, 40, 40, 170, 210, {seed: 3}).scatter('b', b, 230, 40, 360, 210, {seed: 4}); return g.lob(150, 100, 280, 120, -50); },
  bad: (g, sp, k) => g.badCourt().A(90, 125).B(310, 125).lob(100, 120, 330, 70, -40),
  mur: g => { g.floor().wall(10, 10, 380, 18); [100, 200, 300].forEach(x => g.A(x, 190).pass(x, 178, x, 34, -14)); return g.label(200, 243, '3 à 4 m du mur', {s: 10}); },
  ateliers: (g, sp, k) => { const n = +k || 4, cols = n > 4 ? 3 : 2, rows = Math.ceil(n / cols), w = 380 / cols, hh = 230 / rows; g.floor();
    for (let i = 0; i < n; i++){ const x = 10 + (i % cols) * w, y = 10 + Math.floor(i / cols) * hh; g.zone(x + 4, y + 4, w - 8, hh - 8, '', 'blue').num(x + 20, y + 22, i + 1); } return g; },
  prisonnier: g => g.court('prisonnier').scatter('a', 5, 80, 45, 185, 205, {seed: 2}).scatter('b', 5, 215, 45, 320, 205, {seed: 6}),
  piscine: (g, sp, k) => { g.pool(5); for (let i = 0; i < 5; i++) g.A(40, g.pool_y(i)).swim(52, g.pool_y(i), 360, g.pool_y(i)); return g; },
  piste: g => g.track(),
  course: g => { g.straight(4); [0, 1, 2, 3].forEach(i => g.A(25, g.lane_y(i)).run(36, g.lane_y(i), 340, g.lane_y(i))); return g; },
  saut: g => g.floor('#d7ebc9').sand(270, 80, 110, 90).A(40, 125).run(52, 125, 240, 125),
  lancer: g => g.grass().A(40, 125).shot(52, 120, 300, 110, -30),
  acro: g => g.floor().mat(30, 40, 340, 170, {seams: 4}),
  danse: g => g.stage().scatter('a', 8, 50, 40, 350, 180, {seed: 4}),
  explication: g => g.hall().ring('a', 12, 200, 135, 120, 70, {a0: 0.3}).P(200, 70),
  etirements: g => g.hall().ring('a', 12, 200, 125, 140, 85).P(200, 125),
  corde: g => g.hall(),
  tapis: g => g.floor().mat(30, 30, 160, 90).mat(210, 30, 160, 90).mat(30, 130, 160, 90).mat(210, 130, 160, 90)
};
const NOMS = {libre: 'Chacun son ballon', voleurs: 'Dribble et voleurs', chat: 'Jeu de poursuite', cercle: 'Passes en cercle', deux: 'Par deux', trois: 'Par trois', carre: 'Carré de passes', files: 'En colonnes', slalom: 'Parcours', tir: 'Tirs', demi: 'Demi-terrain', match: 'Match', tournoi: 'Tournoi sur 4 terrains', filet: 'Jeu au filet', bad: 'Terrain de badminton', mur: 'Contre le mur', ateliers: 'Ateliers tournants', prisonnier: 'Balle aux prisonniers', piscine: 'Bassin', piste: 'Boucle de course', course: 'Couloirs', saut: 'Saut', lancer: 'Lancer', acro: 'Figure acrobatique', danse: 'Espace scénique', explication: 'Regroupement', etirements: 'Retour au calme', corde: 'Corde à sauter', tapis: 'Tapis de lutte'};
const SPORT_LIB = {acro: 'acro', athle: 'athle', bad: 'bad', basket: 'basket', corde: 'corde', danse: 'danse', endurance: 'endurance', foot: 'foot', hand: 'hand', hiver: 'hiver', lutte: 'lutte', natation: 'natation', natdeb: 'natation', prisonnier: 'prisonnier', volley: 'volley'};

/* ---------- jeux communs à tous les sports (projet d'équipe : draft, contrat, échauffement d'équipe, coach, journaliste) ---------- */
const SPC = sp => ({basket: 'basket', hand: 'hand', foot: 'foot', volley: 'volley', bad: 'bad', prisonnier: 'prisonnier'})[sp] || 'salle';
const COMMUN = {
  draft: g => g.hall().pls('a', [[80, 60, 'C1'], [160, 60, 'C2'], [240, 60, 'C3'], [320, 60, 'C4']]).sheet(80, 95).sheet(160, 95).sheet(240, 95).sheet(320, 95).scatter('g', 10, 50, 140, 350, 215, {seed: 2})
    .label(200, 30, 'ordre de choix 1-2-3-4, puis 4-3-2-1', {s: 10, b: 1}).n(1, 'les capitaines choisissent sur une feuille : personne n\'est choisi en dernier à voix haute').n(2, 'chaque équipe se donne un nom, une couleur et un cri'),
  contrat: g => { g.hall(); [[105, 70], [295, 70], [105, 180], [295, 180]].forEach(([x, y]) => g.ring('a', 4, x, y, 34, 26).sheet(x, y)); return g.n(1, 'chaque équipe écrit son contrat : une force, un point faible, une règle de fair-play, un objectif chiffré').n(2, 'le contrat est relu avant chaque match'); },
  echequipe: g => { g.hall(); [[105, 70], [295, 70], [105, 180], [295, 180]].forEach(([x, y]) => g.zone(x - 85, y - 50, 170, 100, '', 'grey').ring('a', 4, x, y, 30, 25).X(x, y, 'C')); return g.P(200, 125).n(1, 'le capitaine (C) mène : jeu de mise en train, articulations, puis gestes du sport ; le prof passe et valide'); },
  coach: g => { g.floor(); ['équipe 1', 'équipe 2', 'équipe 3', 'équipe 4'].forEach((t, i) => { const x = 10 + (i % 2) * 192, y = 10 + Math.floor(i / 2) * 117; g.zone(x + 3, y + 3, 184, 110, t, 'blue', {top: 1}).ring('a', 4, x + 95, y + 65, 34, 24).X(x + 95, y + 65, 'C'); });
    return g.P(200, 125).n(1, 'chaque équipe choisit un jeu de la saison pour son point faible ; un élève est coach').n(2, 'à la fin, chaque coach dit ce que l\'équipe a amélioré'); },
  journaliste: g => g.calme('📰 résultats · joueur fair-play · action du jour').A(200, 155, 'J').sheet(222, 155).n(1, 'le journaliste de chaque équipe annonce les résultats, le joueur fair-play et l\'action du jour')
};
const NUMS = '①②③④⑤⑥⑦⑧⑨';
function render(spec){
  spec = String(spec || '');
  let lib = '', key = '', old = spec;
  if (spec[0] === '@'){ const i = spec.indexOf('#'); [lib, key] = (i < 0 ? spec.slice(1) : spec.slice(1, i)).split('|'); old = i < 0 ? '' : spec.slice(i + 1); }
  const SC = window.PSCH_SC || {}, fn = lib && ((SC[lib] && SC[lib][key]) || COMMUN[key]);
  let g, name;
  try {
    if (fn){ g = G(SPORT_LIB[lib] || lib); fn(g); name = key; }
    else { const [n, sp, k] = old.split(':'); if (!OLD[n]) return null; g = G(sp || SPORT_LIB[lib] || ''); OLD[n](g, sp || SPORT_LIB[lib] || '', k || ''); name = NOMS[n] || n; }
  } catch (e){ console.warn('schéma', spec, e); return null; }
  const L = g.L, svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Schéma : ${esc(name)}" ${FONT}>${L.bg.join('')}${L.mid.join('')}${L.ar.join('')}${L.top.join('')}${L.lab.join('')}</svg>`;
  return {svg, notes: g.notes, caption: g.caption};
}
window.PSCH = (spec, cap) => {
  if (!spec) return '';
  const r = render(spec); if (!r) return '';
  const nt = r.notes.length ? `<ol class="psch-n">${r.notes.map(([k, t]) => `<li><b>${typeof k === 'number' ? NUMS[k - 1] || k : esc(k)}</b> ${esc(t)}</li>`).join('')}</ol>` : '';
  return `<figure class="psch" tabindex="0" title="Toucher pour agrandir">${r.svg}${cap || r.caption || nt ? `<figcaption>${cap ? `<b>${cap}</b>` : ''}${r.caption ? `<span class="psch-c">${esc(r.caption)}</span>` : ''}${nt}</figcaption>` : ''}</figure>`;
};
// schéma « décor » (regroupement, étirements) : pas imprimé, pour que la prépa tienne sur une page
window.PSCH_DECOR = spec => { spec = String(spec || ''); const i = spec.indexOf('#'), old = spec[0] === '@' ? (i < 0 ? '' : spec.slice(i + 1)) : spec;
  if (spec[0] === '@'){ const [lib, key] = (i < 0 ? spec.slice(1) : spec.slice(1, i)).split('|'), D = (window.PSCH_SC || {})._decor || {}; if (D[lib + '|' + key] != null) return D[lib + '|' + key]; }
  return /^(explication|etirements)/.test(old); };
const sw = (k, inner, w = 30) => `<svg viewBox="0 0 ${w} 22" ${FONT}>${inner}</svg>`;
const G0 = G('');
window.PSCH_LEGENDE = `<div class="psch-leg">
<span>${sw(0, '<circle cx="11" cy="11" r="8" fill="#1f63d6" stroke="#fff" stroke-width="2"/>', 22)}équipe A / élève</span>
<span>${sw(0, '<rect x="3" y="3" width="16" height="16" rx="3" fill="#e8590c" stroke="#fff" stroke-width="2"/>', 22)}équipe B</span>
<span>${sw(0, '<path d="M11 1L21 11L11 21L1 11Z" fill="#1d241f" stroke="#fff" stroke-width="2"/>', 22)}défenseur, chat</span>
<span>${sw(0, '<path d="M11 1L21 19H1Z" fill="#16a34a" stroke="#fff" stroke-width="2"/>', 22)}joker</span>
<span>${sw(0, '<circle cx="11" cy="11" r="9" fill="#8a3ffc"/><text x="11" y="15" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">P</text>', 22)}prof</span>
<span>${sw(0, '<path d="M2 11H22" stroke="#2d3530" stroke-width="2"/><path d="M29 11L21 6V16Z" fill="#2d3530"/>')}course</span>
<span>${sw(0, '<path d="M2 11L6 7L10 15L14 7L18 15L21 11" fill="none" stroke="#2d3530" stroke-width="1.8"/><path d="M29 11L21 6V16Z" fill="#2d3530"/>')}dribble, conduite</span>
<span>${sw(0, '<path d="M2 11H22" stroke="#1f63d6" stroke-width="2" stroke-dasharray="6 4"/><path d="M29 11L21 6V16Z" fill="#1f63d6"/>')}passe</span>
<span>${sw(0, '<path d="M2 11H22" stroke="#c2185b" stroke-width="2.6" stroke-dasharray="2 4" stroke-linecap="round"/><path d="M29 11L21 6V16Z" fill="#c2185b"/>')}tir, lancer</span>
<span>${sw(0, '<path d="M2 11H22" stroke="#7c3aed" stroke-width="2" stroke-dasharray="6 4"/><path d="M29 11L21 6V16Z" fill="#7c3aed"/>')}balle haute</span>
<span>${sw(0, '<path d="M5 17L11 4L17 17Z" fill="#f06400"/>', 22)}cône</span>
<span>${sw(0, '<ellipse cx="11" cy="11" rx="7" ry="5" fill="#facc15" stroke="#a37f00"/>', 22)}coupelle</span>
<span>${sw(0, '<circle cx="11" cy="11" r="8" fill="none" stroke="#d6336c" stroke-width="3"/>', 22)}cerceau</span>
</div>`;

/* ---------- style des schémas (une seule fois) + agrandir au toucher ---------- */
if (typeof document !== 'undefined' && !document.getElementById('psch-css')){
  const st = document.createElement('style'); st.id = 'psch-css';
  st.textContent = `.psch{margin:0;background:#fff;border:1px solid var(--line,#ddd);border-radius:10px;padding:6px;cursor:zoom-in}
.psch svg{width:100%;height:auto;display:block;border-radius:6px}
.psch figcaption{font-size:12.5px;color:var(--muted,#555);margin:4px 2px 0;text-align:left;line-height:1.35}
.psch figcaption>b{display:block;color:var(--ink,#222);font-size:13px;text-align:center}
.psch .psch-c{display:block;text-align:center;font-style:italic}
.psch-n{list-style:none;margin:3px 0 0;padding:0}.psch-n li{margin:1px 0}.psch-n li b{color:#2d3530;font-size:14px;margin-right:2px}
.pp-schs,.plg-schs{grid-template-columns:repeat(auto-fill,minmax(260px,1fr))!important}
.psch-leg{display:flex;flex-wrap:wrap;gap:4px 14px;font-size:12px;color:#3d4a40;margin-top:8px}.psch-leg span{display:inline-flex;align-items:center;gap:5px}.psch-leg svg{height:15px;width:auto}
#psch-zoom{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;padding:12px;cursor:zoom-out}
#psch-zoom .psch{max-width:min(980px,100%);max-height:100%;overflow:auto;cursor:zoom-out;padding:10px}#psch-zoom figcaption{font-size:15px}#psch-zoom figcaption>b{font-size:17px}
@media print{.psch{break-inside:avoid;cursor:auto;-webkit-print-color-adjust:exact;print-color-adjust:exact}.pr-sch .psch{width:calc(33.3% - 5px)!important}.pr-sch .psch-n{font-size:7.5pt}}`;
  (document.head || document.documentElement).appendChild(st);
  document.addEventListener('click', e => {
    const z = document.getElementById('psch-zoom'); if (z){ z.remove(); return; }
    const fg = e.target.closest && e.target.closest('figure.psch'); if (!fg || fg.closest('#psch-zoom')) return;
    const o = document.createElement('div'); o.id = 'psch-zoom'; o.innerHTML = fg.outerHTML; document.body.appendChild(o);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape'){ const z = document.getElementById('psch-zoom'); if (z){ z.remove(); e.stopPropagation(); } } }, true);
}
window.PSCH_KIT = G;   // pour les tests
})();
