/* Schémas des prépas : petits dessins SVG faits par le code (presque rien à télécharger).
   PSCH('demi:basket:2c1') → <svg>…</svg>. Nom du modèle, puis réglages séparés par « : ».
   Joueurs : A = rond plein, B = carré, défenseur / chat = losange (pas seulement la couleur, Kevin est un peu daltonien). */
(() => {
const W = 320, H = 190, f = n => Math.round(n * 10) / 10;
const pl = (x, y, t = 'a', lab = '') => {
  const L = lab ? `<text x="${f(x)}" y="${f(y + 3.3)}" class="pt">${lab}</text>` : '';
  if (t === 'b') return `<g class="pb"><rect x="${f(x - 7)}" y="${f(y - 7)}" width="14" height="14" rx="2"/>${L}</g>`;
  if (t === 'x') return `<g class="px"><path d="M${f(x)} ${f(y - 9)}L${f(x + 9)} ${f(y)}L${f(x)} ${f(y + 9)}L${f(x - 9)} ${f(y)}Z"/>${L}</g>`;
  if (t === 'p') return `<g class="pp"><circle cx="${f(x)}" cy="${f(y)}" r="8"/><text x="${f(x)}" y="${f(y + 3.3)}" class="pt">P</text></g>`;
  return `<g class="pa"><circle cx="${f(x)}" cy="${f(y)}" r="7.5"/>${L}</g>`;
};
const ball = (x, y, r = 3.4) => `<circle class="ball" cx="${f(x)}" cy="${f(y)}" r="${r}"/>`;
const cone = (x, y) => `<path class="cone" d="M${f(x - 5)} ${f(y + 4)}L${f(x)} ${f(y - 6)}L${f(x + 5)} ${f(y + 4)}Z"/>`;
const hoop = (x, y, r = 10) => `<circle class="hoop" cx="${f(x)}" cy="${f(y)}" r="${r}"/>`;
const txt = (x, y, t, c = 'lb') => `<text x="${f(x)}" y="${f(y)}" class="${c}">${t}</text>`;
function arr(x1, y1, x2, y2, k = 'run', bend = 0){
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
  const cx = mx - dy / L * bend, cy = my + dx / L * bend;
  const tx = x2 - cx, ty = y2 - cy, tl = Math.hypot(tx, ty) || 1, ux = tx / tl, uy = ty / tl, s = 6, ex = x2 - ux * 2, ey = y2 - uy * 2;
  const hd = `M${f(ex)} ${f(ey)}L${f(ex - ux * s - uy * s * .6)} ${f(ey - uy * s + ux * s * .6)}L${f(ex - ux * s + uy * s * .6)} ${f(ey - uy * s - ux * s * .6)}Z`;
  return `<g class="ar ${k}"><path class="ln" d="M${f(x1)} ${f(y1)}Q${f(cx)} ${f(cy)} ${f(ex - ux * 3)} ${f(ey - uy * 3)}"/><path class="hd" d="${hd}"/></g>`;
}
function zig(x1, y1, x2, y2){ // dribble / conduite de balle
  const n = 8, dx = (x2 - x1) / n, dy = (y2 - y1) / n, L = Math.hypot(dx, dy) || 1, nx = -dy / L * 4, ny = dx / L * 4;
  let d = `M${f(x1)} ${f(y1)}`; for (let i = 1; i < n; i++) d += `L${f(x1 + dx * i + (i % 2 ? nx : -nx))} ${f(y1 + dy * i + (i % 2 ? ny : -ny))}`;
  return `<g class="ar run"><path class="ln" d="${d}L${f(x2 - dx * .4)} ${f(y2 - dy * .4)}"/></g>` + arr(x2 - dx * .5, y2 - dy * .5, x2, y2, 'run');
}
const floor = () => `<rect class="floor" x="4" y="4" width="${W - 8}" height="${H - 8}" rx="5"/>`;
const zone = (x, y, w, h, lab) => `<rect class="zone" x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="4"/>` + (lab ? txt(x + w / 2, y + h / 2 + 4, lab, 'lb c') : '');
const net = (x = W / 2) => `<path class="net" d="M${x} 10V${H - 10}"/><circle class="post" cx="${x}" cy="10" r="3"/><circle class="post" cx="${x}" cy="${H - 10}" r="3"/>`;
function target(sp, x, side){ // côté -1 gauche, 1 droite ; y au milieu
  const y = H / 2;
  if (sp === 'basket') return `<path class="ln2" d="M${x} ${y - 9}v18"/>${hoop(x - side * 7, y, 5.5)}`;
  if (sp === 'hand') return `<path class="ln2" d="M${x} ${y - 42}A42 42 0 0 ${side < 0 ? 1 : 0} ${x} ${y + 42}"/><rect class="goal" x="${side < 0 ? x - 6 : x}" y="${y - 14}" width="6" height="28"/>`;
  if (sp === 'foot') return `<rect class="ln2" x="${side < 0 ? x : x - 32}" y="${y - 34}" width="32" height="68"/><rect class="goal" x="${side < 0 ? x - 6 : x}" y="${y - 14}" width="6" height="28"/>`;
  return cone(x - side * 6, y - 14) + cone(x - side * 6, y + 14);
}
function court(sp){
  let h = floor() + `<rect class="ln2" x="12" y="12" width="${W - 24}" height="${H - 24}"/>`;
  if (sp === 'basket' || sp === 'hand' || sp === 'foot') h += `<path class="ln2" d="M${W / 2} 12V${H - 12}"/><circle class="ln2" cx="${W / 2}" cy="${H / 2}" r="18"/>`;
  if (sp === 'basket') h += `<rect class="ln2" x="12" y="${H / 2 - 20}" width="44" height="40"/><rect class="ln2" x="${W - 56}" y="${H / 2 - 20}" width="44" height="40"/><path class="ln2" d="M12 30Q120 ${H / 2} 12 ${H - 30}M${W - 12} 30Q${W - 120} ${H / 2} ${W - 12} ${H - 30}"/>`;
  return h;
}
const half = sp => { // demi-terrain, cible à droite
  let h = floor() + `<rect class="ln2" x="12" y="12" width="${W - 24}" height="${H - 24}"/>` + target(sp, W - 12, 1);
  if (sp === 'basket') h += `<rect class="ln2" x="${W - 66}" y="${H / 2 - 22}" width="54" height="44"/><path class="ln2" d="M${W - 12} 22Q${W - 170} ${H / 2} ${W - 12} ${H - 22}"/>`;
  return h;
};
const R = (seed => () => (seed = seed * 48271 % 2147483647) / 2147483647);
const nv = s => { const m = /^(\d)c(\d)$/.exec(s || ''); return m ? [+m[1], +m[2]] : [3, 3]; };
const team = (n, x0, x1, y0, y1) => Array.from({length: n}, (_, i) => [x0 + (x1 - x0) * ((i % 3) + .5) / Math.min(3, n), y0 + (y1 - y0) * (Math.floor(i / 3) * 1 + (i % 2 ? .7 : .3)) / Math.ceil(n / 3)]);

const T = {
  libre(sp){ const r = R(11); let h = floor(); for (let i = 0; i < 9; i++){ const x = 36 + r() * 248, y = 30 + r() * 130; h += pl(x, y) + ball(x + 9, y + 6) + arr(x, y, x + (r() - .5) * 60, y + (r() - .5) * 50, 'run', 10); } return h; },
  voleurs(sp){ let h = T.libre(sp); [[110, 80], [200, 120], [240, 50]].forEach(([x, y]) => h += pl(x, y, 'x') + arr(x, y, x - 28, y + 18, 'run', -8)); return h + txt(160, 182, 'losanges : voleurs sans ballon', 'lb c'); },
  chat(sp){ const r = R(5); let h = floor(), P = []; for (let i = 0; i < 9; i++){ const x = 36 + r() * 248, y = 30 + r() * 130; P.push([x, y]); h += pl(x, y); }
    [[150, 95], [70, 60]].forEach(([x, y], j) => { const p = P[j * 3 + 1]; h += pl(x, y, 'x') + arr(x, y, p[0] + (p[0] > x ? -10 : 10), p[1], 'run', 12) + arr(p[0], p[1], p[0] + (p[0] - x) * .5, p[1] + (p[1] - y) * .5, 'run', 6); });
    return h + txt(160, 182, 'losanges : les chats', 'lb c'); },
  cercle(){ let h = floor(); const n = 8, cx = 160, cy = 95, Rr = 60; for (let i = 0; i < n; i++){ const a = i / n * 2 * Math.PI, x = cx + Rr * Math.cos(a), y = cy + Rr * .8 * Math.sin(a); h += pl(x, y); if (i % 2 === 0){ const b = (i + 3) / n * 2 * Math.PI; h += arr(x, y, cx + Rr * Math.cos(b), cy + Rr * .8 * Math.sin(b), 'pass', 0); } } return h + ball(cx + Rr + 9, cy - 6); },
  deux(sp){ let h = floor(); [44, 95, 146].forEach((y, i) => { h += pl(70, y, 'a', '1') + pl(170, y, 'a', '2') + arr(80, y - 4, 160, y - 4, 'pass', -8) + arr(160, y + 5, 80, y + 5, i === 1 ? 'run' : 'pass', -8); });
    return h + `<path class="dim" d="M70 172H170"/>` + txt(120, 184, '3 à 6 m', 'lb c') + txt(250, 98, 'par deux', 'lb c'); },
  trois(){ let h = floor(); [50, 100, 150].forEach(y => h += pl(60, y) + pl(160, y) + pl(260, y) + arr(152, y - 4, 70, y - 4, 'pass', -10) + arr(164, y + 8, 250, y + 8, 'run', 8)); return h; },
  carre(sp, k){ let h = floor() + zone(90, 35, 140, 120); const C = [[90, 35], [230, 35], [230, 155], [90, 155]]; C.forEach(([x, y]) => h += cone(x, y) + pl(x + (x < 160 ? 14 : -14), y + (y < 95 ? 14 : -14)));
    h += arr(104, 49, 216, 49, 'pass', -8) + arr(216, 49, 216, 141, 'pass', -8) + ball(110, 56);
    if (k) for (let i = 0; i < +k; i++) h += pl(150 + i * 22, 95 + i * 10, 'x');
    return h + txt(160, 182, k ? `${4} contre ${k} : garder le ballon dans le carré` : 'passes dans le carré, puis on suit sa passe', 'lb c'); },
  files(){ let h = floor() + `<path class="ln3" d="M54 12V${H - 12}"/>`; [40, 80, 120, 160].forEach(y => h += pl(40, y) + pl(24, y) + cone(262, y) + arr(62, y - 5, 250, y - 5, 'run') + arr(250, y + 5, 62, y + 5, 'run')); return h + txt(54, 10, '', 'lb'); },
  slalom(sp){ let h = floor(); for (let i = 0; i < 5; i++) h += cone(70 + i * 34, 95); h += pl(34, 95) + ball(44, 103);
    let d = 'M46 95'; for (let i = 0; i < 5; i++) d += ` Q${70 + i * 34} ${i % 2 ? 122 : 68} ${87 + i * 34} 95`;
    h += `<g class="ar run"><path class="ln" d="${d}"/></g>`;
    return h + (['basket', 'hand', 'foot'].includes(sp) ? target(sp, W - 12, 1) + arr(240, 95, 290, 95, 'shot') : hoop(285, 95, 12)); },
  tir(sp){ let h = half(sp); [[150, 45, '1'], [130, 95, '2'], [150, 145, '3']].forEach(([x, y, l]) => h += pl(x, y, 'a', l) + arr(x + 10, y, W - 22, 95 + (y - 95) * .25, 'shot', -(y - 95) * .2));
    return h + pl(60, 95) + pl(44, 95) + arr(70, 95, 120, 95, 'run') + txt(150, 182, 'chacun son tour, on récupère son ballon', 'lb c'); },
  demi(sp, k){ const [a, d] = nv(k); let h = half(sp); const A = team(a, 70, 210, 30, 160), D = team(d, 220, 270, 40, 150);
    A.forEach(([x, y], i) => h += pl(x, y, 'a')); D.forEach(([x, y]) => h += pl(x, y, 'x'));
    if (A.length > 1) h += arr(A[0][0], A[0][1], A[1][0], A[1][1], 'pass', -12) + arr(A[1][0], A[1][1], A[1][0] + 40, A[1][1] - 8, 'run', 6);
    h += ball(A[0][0] + 8, A[0][1] + 7) + arr(A[A.length - 1][0] + 10, A[A.length - 1][1], W - 24, 95, 'shot', 8);
    return h + txt(110, 182, `${a} attaquants (ronds) contre ${d} défenseur${d > 1 ? 's' : ''} (losanges)`, 'lb c'); },
  match(sp, k){ const [a, b] = nv(k); let h = court(sp);
    h += ['basket', 'hand', 'foot'].includes(sp) ? target(sp, 12, -1) + target(sp, W - 12, 1) : sp === 'volley' ? net() : cone(18, 85) + cone(18, 105) + cone(302, 85) + cone(302, 105);
    const A = team(a, 80, 220, 30, 160), B = team(b, 110, 250, 40, 150); A.forEach(([x, y]) => h += pl(x, y)); B.forEach(([x, y]) => h += pl(x + 6, y + 8, 'b'));
    if (A.length > 2) h += arr(A[0][0], A[0][1], A[1][0], A[1][1], 'pass', -14) + arr(A[1][0], A[1][1], A[2][0], A[2][1], 'pass', 12);
    h += ball(A[0][0] + 8, A[0][1] - 6) + arr(A[A.length - 1][0], A[A.length - 1][1], W - 26, 95, 'shot', 6);
    return h + txt(160, 184, `match ${a} contre ${b}`, 'lb c'); },
  tournoi(sp){ let h = floor(); [[12, 12], [164, 12], [12, 100], [164, 100]].forEach(([x, y], i) => { h += `<rect class="ln2" x="${x}" y="${y}" width="144" height="78"/>` + txt(x + 72, y + 46, `Terrain ${i + 1}`, 'big c');
    h += sp === 'volley' || sp === 'bad' ? `<path class="net" d="M${x + 72} ${y}V${y + 78}"/>` : ''; });
    return h; },
  filet(sp, k){ const [a, b] = nv(k || '3c3'); let h = floor() + `<rect class="ln2" x="20" y="20" width="${W - 40}" height="${H - 40}"/>` + net();
    team(a, 40, 140, 30, 160).forEach(([x, y]) => h += pl(x, y)); team(b, 180, 280, 30, 160).forEach(([x, y]) => h += pl(x, y, 'b'));
    return h + ball(118, 58) + arr(112, 80, 208, 86, 'pass', -46) + arr(250, 70, 212, 100, 'pass', -12) + txt(160, 184, `${a} contre ${b} au filet`, 'lb c'); },
  bad(sp, k){ let h = floor() + `<rect class="ln2" x="20" y="24" width="280" height="142"/><path class="ln2" d="M20 44H300M20 146H300M110 24V166M210 24V166M20 95H110M210 95H300M36 24V166M284 24V166"/>` + net();
    const dbl = k === '2c2'; h += dbl ? pl(70, 60) + pl(70, 130) + pl(250, 60, 'b') + pl(250, 130, 'b') : pl(80, 95) + pl(240, 95, 'b');
    h += arr(86, 88, 270, 40, 'pass', -40) + arr(244, 104, 50, 150, 'shot', 30);
    return h + (k === 'zones' ? zone(250, 26, 48, 30, 'cible') + zone(250, 134, 48, 30, 'cible') : '') + txt(160, 184, dbl ? 'double : 2 contre 2' : 'simple : 1 contre 1, volant haut et loin', 'lb c'); },
  mur(){ let h = floor() + `<rect class="wall" x="4" y="4" width="${W - 8}" height="16"/>`; [70, 160, 250].forEach((x, i) => h += pl(x, 140) + (i === 1 ? pl(x + 24, 152, 'b') : '') + arr(x, 130, x + (i - 1) * 8, 28, 'pass', -14) + arr(x + (i - 1) * 8, 28, x + 10, 128, 'pass', -14));
    return h + txt(160, 182, '3 à 4 m du mur', 'lb c'); },
  ateliers(sp, k){ const n = +k || 4, cols = n > 4 ? 3 : 2, rows = Math.ceil(n / cols), w = (W - 16) / cols, hh = (H - 16) / rows; let h = floor();
    for (let i = 0; i < n; i++){ const x = 8 + (i % cols) * w, y = 8 + Math.floor(i / cols) * hh; h += `<rect class="zone" x="${f(x + 3)}" y="${f(y + 3)}" width="${f(w - 6)}" height="${f(hh - 6)}" rx="6"/>` + txt(x + 18, y + 26, String(i + 1), 'big') + pl(x + w / 2, y + hh / 2 + 6) + pl(x + w / 2 + 20, y + hh / 2 + 10, 'b'); }
    return h + txt(160, H / 2 + 4, '→ rotation au signal →', 'lb c'); },
  prisonnier(){ let h = floor() + `<rect class="ln2" x="12" y="12" width="${W - 24}" height="${H - 24}"/><path class="ln2" d="M160 12V${H - 12}"/>` + zone(12, 12, 28, H - 24) + zone(W - 40, 12, 28, H - 24) + txt(26, 186, 'prison', 'lb c') + txt(294, 186, 'prison', 'lb c');
    [[80, 50], [110, 100], [70, 140], [130, 60]].forEach(p => h += pl(p[0], p[1])); [[210, 50], [240, 110], [200, 140], [250, 70]].forEach(p => h += pl(p[0], p[1], 'b'));
    return h + pl(294, 95) + pl(26, 80, 'b') + ball(118, 94) + arr(118, 94, 232, 108, 'shot', -8) + arr(286, 95, 250, 72, 'shot', 4); },
  piscine(sp, k){ let h = `<rect class="water" x="4" y="4" width="${W - 8}" height="${H - 8}" rx="4"/>`; const n = 5, lh = (H - 8) / n;
    for (let i = 1; i < n; i++) h += `<path class="lane" d="M4 ${f(4 + i * lh)}H${W - 4}"/>`;
    h += `<rect class="edge" x="4" y="4" width="10" height="${H - 8}"/><rect class="edge" x="${W - 14}" y="4" width="10" height="${H - 8}"/>`;
    for (let i = 0; i < n; i++){ const y = 4 + (i + .5) * lh;
      if (k === 'relais') h += pl(22, y) + pl(150 + (i % 2) * 40, y, 'b') + arr(160 + (i % 2) * 40, y, 290, y, 'run');
      else if (k === 'flotte') h += i % 2 ? `<ellipse class="swim" cx="${100 + i * 30}" cy="${f(y)}" rx="16" ry="5"/>` + pl(84 + i * 30, y) : `<rect class="board2" x="${90 + i * 20}" y="${f(y - 5)}" width="22" height="10" rx="3"/>` + pl(80 + i * 20, y) + arr(116 + i * 20, y, 170 + i * 20, y, 'run');
      else if (k === 'plongeon') h += pl(10, y) + arr(16, y - 6, 60, y, 'shot', -10) + `<ellipse class="swim" cx="90" cy="${f(y)}" rx="16" ry="5"/>`;
      else h += pl(30 + i * 14, y) + arr(42 + i * 14, y - 3, 280, y - 3, 'run') + (i % 2 ? arr(280, y + 5, 42 + i * 14, y + 5, 'run') : ''); }
    return h + txt(160, 15, k === 'relais' ? 'relais par couloir' : k === 'flotte' ? 'planche, flotter, glisser' : k === 'plongeon' ? 'entrée dans l\'eau, coulée' : 'aller-retour dans son couloir', 'lb c'); },
  piste(sp, k){ let h = floor() + `<rect class="track" x="20" y="24" width="280" height="142" rx="70"/><rect class="infield" x="48" y="50" width="224" height="90" rx="45"/>`;
    if (k === 'plots'){ for (let i = 0; i < 10; i++){ const a = i / 10 * 2 * Math.PI, x = 160 + 125 * Math.cos(a), y = 95 + 58 * Math.sin(a); h += cone(x, y); } h += txt(160, 100, 'un plot tous les 20 à 25 m', 'lb c'); }
    else if (k === 'groupes'){ [[110, 31, 'a'], [130, 31, 'a'], [220, 159, 'b'], [200, 159, 'b']].forEach(([x, y, t]) => h += pl(x, y, t)); h += txt(160, 100, 'groupes d\'allure', 'lb c'); }
    else h += txt(160, 100, 'boucle de 200 à 400 m', 'lb c');
    return h + pl(160, 159) + arr(170, 159, 230, 157, 'run') + arr(150, 31, 90, 33, 'run'); },
  course(sp, k){ let h = floor(); for (let i = 0; i < 5; i++) h += `<path class="ln2" d="M14 ${30 + i * 30}H306"/>`;
    h += `<path class="ln3" d="M44 26V154"/><path class="fin" d="M280 26V154"/>`;
    [45, 75, 105, 135].forEach((y, i) => h += pl(30, y) + arr(46, y, 200 + i * 16, y, 'run'));
    if (k === 'haies') for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) h += `<path class="hurdle" d="M${100 + j * 45} ${36 + i * 30}v18"/>`;
    if (k === 'relais') h += zone(150, 26, 40, 128, '') + txt(170, 22, 'zone de transmission', 'lb c');
    return h + txt(44, 172, 'départ', 'lb c') + txt(280, 172, 'arrivée', 'lb c'); },
  saut(sp, k){ let h = floor();
    if (k === 'hauteur'){ h += `<rect class="mat" x="200" y="60" width="96" height="70" rx="6"/><path class="bar" d="M196 58V132"/>` + pl(70, 160) + arr(80, 156, 150, 120, 'run', -20) + arr(150, 120, 190, 70, 'run', 10) + txt(110, 180, 'élan courbe, appel pied extérieur', 'lb c'); return h; }
    h += `<rect class="sand" x="220" y="60" width="86" height="70" rx="6"/><path class="ln3" d="M200 60V130"/>` + pl(30, 95) + arr(42, 95, 150, 95, 'run');
    [[165, 89], [185, 101], [205, 89]].forEach(([x, y]) => h += `<ellipse class="foot" cx="${x}" cy="${y}" rx="5" ry="3"/>`);
    return h + arr(205, 90, 250, 92, 'run', -18) + txt(100, 80, 'élan', 'lb c') + txt(200, 148, 'appel', 'lb c') + txt(263, 148, 'réception', 'lb c'); },
  lancer(){ let h = floor() + `<path class="ln2" d="M40 95L300 20M40 95L300 170"/>`;
    [80, 135, 190, 245].forEach((d, i) => h += `<path class="ln2" d="M${f(40 + d * .92)} ${f(95 - d * .27)}Q${40 + d} 95 ${f(40 + d * .92)} ${f(95 + d * .27)}"/>` + txt(40 + d + 6, 99, (i + 1) * 5 + ' m'));
    return h + `<circle class="zone" cx="34" cy="95" r="14"/>` + pl(34, 95) + arr(46, 90, 180, 70, 'shot', -30) + ball(180, 72) + pl(30, 160, 'b', 'J') + txt(110, 182, 'les autres attendent derrière le lanceur', 'lb c'); },
  acro(sp, k){ let h = floor() + `<rect class="mat" x="30" y="40" width="260" height="120" rx="6"/>`;
    const st = (x, y, s = 1, pose = 'up') => { const r = 6 * s; let p = `<circle class="fig" cx="${f(x)}" cy="${f(y - 30 * s)}" r="${f(r)}"/><path class="figl" d="M${f(x)} ${f(y - 24 * s)}V${f(y - 8 * s)}`;
      p += pose === 'up' ? `M${f(x - 12 * s)} ${f(y - 30 * s)}L${f(x)} ${f(y - 20 * s)}L${f(x + 12 * s)} ${f(y - 30 * s)}M${f(x - 7 * s)} ${f(y + 6 * s)}L${f(x)} ${f(y - 8 * s)}L${f(x + 7 * s)} ${f(y + 6 * s)}` : `M${f(x - 12 * s)} ${f(y - 14 * s)}L${f(x)} ${f(y - 20 * s)}L${f(x + 12 * s)} ${f(y - 14 * s)}M${f(x - 10 * s)} ${f(y + 6 * s)}L${f(x - 6 * s)} ${f(y - 2 * s)}L${f(x)} ${f(y - 8 * s)}L${f(x + 6 * s)} ${f(y - 2 * s)}L${f(x + 10 * s)} ${f(y + 6 * s)}`;
      return p + '"/>'; };
    const quad = (x, y) => `<path class="figl" d="M${x - 16} ${y}L${x - 16} ${y - 14}L${x + 14} ${y - 16}L${x + 16} ${y}M${x - 16} ${y - 14}L${x - 24} ${y - 12}"/><circle class="fig" cx="${x - 28}" cy="${y - 13}" r="5"/>`;
    if (k === 'trio'){ h += quad(120, 150) + quad(200, 150) + st(160, 120, .9) + txt(120, 168, 'porteur', 'lb c') + txt(200, 168, 'porteur', 'lb c') + txt(160, 50, 'voltigeur', 'lb c'); }
    else if (k === 'pyramide'){ h += quad(100, 155) + quad(160, 155) + quad(220, 155) + quad(130, 128) + quad(190, 128) + st(160, 100, .8) + txt(160, 36, 'pyramide à 6 : porteurs, puis voltigeurs', 'lb c'); }
    else if (k === 'quatuor'){ h += st(110, 150, 1, 'squat') + st(210, 150, 1, 'squat') + st(160, 128, .85) + st(160, 82, .7) + txt(160, 36, 'quatuor : 2 porteurs, 1 intermédiaire, 1 voltigeur', 'lb c'); }
    else h += quad(140, 150) + st(170, 128, .9) + txt(140, 168, 'porteur', 'lb c') + txt(200, 76, 'voltigeur', 'lb c');
    return h + pl(270, 120, 'x', 'A') + txt(270, 140, 'pareur', 'lb c'); },
  danse(sp, k){ let h = floor() + `<rect class="stage" x="20" y="16" width="280" height="130" rx="4"/>` + txt(160, 172, '⬇ public ⬇', 'lb c');
    if (k === 'cercle'){ for (let i = 0; i < 8; i++){ const a = i / 8 * 2 * Math.PI; h += pl(160 + 70 * Math.cos(a), 80 + 46 * Math.sin(a)); } h += arr(230, 80, 200, 118, 'run', -14); }
    else if (k === 'canon'){ [0, 1, 2].forEach(j => { for (let i = 0; i < 3; i++) h += pl(60 + j * 100 + i * 22, 70 + (i % 2) * 30, j === 1 ? 'b' : 'a', String(j + 1)); }); h += txt(160, 34, 'groupe 1, puis 2, puis 3 : même phrase décalée', 'lb c'); }
    else if (k === 'miroir'){ [[90, 60], [90, 110], [200, 60], [200, 110]].forEach(([x, y], i) => h += pl(x, y) + pl(x + 34, y, 'b')); h += txt(160, 34, 'face à face : l\'un mène, l\'autre copie', 'lb c'); }
    else if (k === 'groupes'){ [[70, 70], [160, 110], [250, 70]].forEach(([x, y], j) => { h += zone(x - 34, y - 30, 68, 60); for (let i = 0; i < 4; i++) h += pl(x - 12 + (i % 2) * 24, y - 10 + Math.floor(i / 2) * 20, j % 2 ? 'b' : 'a'); }); }
    else { for (let i = 0; i < 4; i++) h += pl(60 + i * 66, 60) + pl(93 + i * 66, 110, 'b'); h += arr(60, 60, 60, 100, 'run') + arr(93, 110, 93, 70, 'run'); }
    return h; },
  explication(){ let h = floor() + `<rect class="board" x="110" y="16" width="100" height="32" rx="3"/>` + txt(160, 36, 'CONSIGNES', 'lb c bw') + pl(160, 66, 'p');
    for (let i = 0; i < 9; i++){ const a = Math.PI * (.15 + i * .0875); h += pl(160 + 82 * Math.cos(a), 66 + 82 * Math.sin(a) * .95); } return h; },
  // corde à sauter : '' = chacun sa corde, 'grande' = grande corde tournée par deux élèves, 'deux' = à deux dans une corde
  corde(sp, k){ let h = floor(); const rope = (x1, y1, x2, y2, b) => `<path class="bar" style="fill:none" d="M${f(x1)} ${f(y1)}Q${f((x1 + x2) / 2)} ${f(Math.max(y1, y2) + b)} ${f(x2)} ${f(y2)}"/>`;
    if (k === 'grande'){ h += pl(50, 95, 'b', 'T') + pl(270, 95, 'b', 'T') + rope(58, 95, 262, 95, 55) + rope(58, 95, 262, 95, -55);
      [[120, 165], [95, 165], [70, 165]].forEach(([x, y]) => h += pl(x, y)); h += pl(160, 95) + arr(120, 157, 156, 104, 'run', -6) + arr(168, 92, 230, 30, 'run', -6);
      return h + txt(160, 14, 'T = tourneurs ; on entre, on saute, on sort', 'lb c'); }
    if (k === 'deux'){ [[90, 60], [230, 60], [90, 140], [230, 140]].forEach(([x, y]) => h += pl(x - 9, y + 4) + pl(x + 9, y + 4) + rope(x - 24, y + 14, x + 24, y + 14, -62)); return h + txt(160, 184, 'à deux dans la même corde', 'lb c'); }
    [[60, 55], [160, 55], [260, 55], [60, 140], [160, 140], [260, 140]].forEach(([x, y]) => h += pl(x, y) + rope(x - 14, y + 12, x + 14, y + 12, -58));
    return h + txt(160, 184, 'chacun sa corde, 2 m d\'écart au moins', 'lb c'); },
  // lutte : '' = duels sur 4 tapis, 'cercle' = sortir l'adversaire du cercle, 'sol' = au sol (immobiliser)
  tapis(sp, k){ let h = floor();
    if (k === 'cercle'){ h += `<rect class="mat" x="60" y="15" width="200" height="160" rx="6"/><circle class="ln3" style="fill:none" cx="160" cy="95" r="62"/>` + pl(148, 95) + pl(172, 95, 'b') + arr(140, 95, 104, 95, 'run') + arr(180, 95, 216, 95, 'run'); return h + txt(160, 186, 'pousser l\'autre hors du cercle', 'lb c'); }
    [[20, 12], [170, 12], [20, 100], [170, 100]].forEach(([x, y], i) => { h += `<rect class="mat" x="${x}" y="${y}" width="130" height="78" rx="5"/>`;
      if (k === 'sol') h += pl(x + 56, y + 46) + pl(x + 70, y + 36, 'b');
      else h += pl(x + 50, y + 39) + pl(x + 80, y + 39, 'b') + arr(x + 58, y + 30, x + 72, y + 30, 'run', -4); });
    return h; },
  etirements(){ let h = floor(); for (let i = 0; i < 10; i++){ const a = i / 10 * 2 * Math.PI; h += pl(160 + 100 * Math.cos(a), 95 + 60 * Math.sin(a)); } return h + pl(160, 95, 'p') + txt(160, 182, 'en cercle, le prof ou un élève guide', 'lb c'); }
};
const NOMS = {libre: 'Chacun son ballon', voleurs: 'Dribble et voleurs', chat: 'Jeu de poursuite', cercle: 'Passes en cercle', deux: 'Par deux', trois: 'Par trois', carre: 'Carré de passes', files: 'En colonnes', slalom: 'Parcours', tir: 'Tirs', demi: 'Demi-terrain', match: 'Match', tournoi: 'Tournoi sur 4 terrains', filet: 'Jeu au filet', bad: 'Terrain de badminton', mur: 'Contre le mur', ateliers: 'Ateliers tournants', prisonnier: 'Balle aux prisonniers', piscine: 'Bassin', piste: 'Boucle de course', course: 'Couloirs', saut: 'Saut', lancer: 'Lancer', acro: 'Figure acrobatique', danse: 'Espace scénique', explication: 'Regroupement', etirements: 'Retour au calme', corde: 'Corde à sauter', tapis: 'Tapis de lutte'};
window.PSCH = (spec, cap) => {
  if (!spec) return '';
  const [n, sp, k] = String(spec).split(':'); if (!T[n]) return '';
  let inner; try { inner = T[n](sp || '', k || ''); } catch (e) { return ''; }
  return `<figure class="psch"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Schéma : ${NOMS[n] || n}">${inner}</svg>${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;
};
window.PSCH_LEGENDE = `<div class="psch-leg"><span><svg viewBox="0 0 20 20"><g class="pa"><circle cx="10" cy="10" r="7.5"/></g></svg>équipe A</span><span><svg viewBox="0 0 20 20"><g class="pb"><rect x="3" y="3" width="14" height="14" rx="2"/></g></svg>équipe B</span><span><svg viewBox="0 0 20 20"><g class="px"><path d="M10 1L19 10L10 19L1 10Z"/></g></svg>défenseur, chat</span><span><svg viewBox="0 0 30 12"><g class="ar run"><path class="ln" d="M2 6H22"/><path class="hd" d="M28 6L21 2V10Z"/></g></svg>déplacement</span><span><svg viewBox="0 0 30 12"><g class="ar pass"><path class="ln" d="M2 6H22"/><path class="hd" d="M28 6L21 2V10Z"/></g></svg>passe</span><span><svg viewBox="0 0 30 12"><g class="ar shot"><path class="ln" d="M2 6H22"/><path class="hd" d="M28 6L21 2V10Z"/></g></svg>tir, lancer</span></div>`;
})();
