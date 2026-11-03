/* Journal de l'école : les pages du journal (A4), faites d'« éléments » (blocs) placés librement.
   Kevin (03/11/2026) : nombre de pages au choix (1 à 8, recto seul ou recto-verso) ; mise en page libre « entre Word, Paint et un
   programme photo » : chaque bloc se déplace, se redimensionne et a son style (police, tailles, couleurs, photo, filtres…).
   Un gabarit = une grille de départ (colonnes, lignes, zones) qui crée les blocs ; on les modifie ensuite à la main (editeur.js).
   Bloc = {id, type, x, y, w, h (en mm, page 210 × 297), r (rotation), lock, s: style, art (article), img (photo), html (texte), forme}
   Types : tetiere (titre du journal), art (article), texte (encadré, titre libre), image (photo seule), forme, dessin, sommaire, ours. */
(() => {
  const G = [
    // ---- la Une (page 1) ----
    {id: 'une-classique', nom: 'Classique', une: 1, cols: '1fr 1fr', rows: '2.1fr 1fr', areas: ['a a', 'b c'], grand: 'a'},
    {id: 'une-sommaire', nom: 'Avec sommaire', une: 1, cols: '2.1fr 1fr', rows: '1.5fr 1fr', areas: ['a s', 'b s'], grand: 'a', auto: {s: 'sommaire'}},
    {id: 'une-trois', nom: 'Une + 3 brèves', une: 1, cols: '1fr 1fr 1fr', rows: '1.7fr 1fr', areas: ['a a a', 'b c d'], grand: 'a'},
    {id: 'une-edito', nom: 'Édito à gauche', une: 1, cols: '1fr 2.1fr', rows: '1.4fr 1fr', areas: ['e a', 'e b'], grand: 'a'},
    {id: 'une-totale', nom: 'Grand sujet', une: 1, cols: '1fr', rows: '1fr', areas: ['a'], grand: 'a'},
    {id: 'une-recto', nom: 'Tout sur 1 page', une: 1, cols: '1fr 1fr 1fr', rows: '1.4fr 1fr 1fr', areas: ['a a s', 'b c s', 'd e o'], grand: 'a', auto: {s: 'sommaire', o: 'ours'}},
    // ---- pages intérieures et dos ----
    {id: 'pleine', nom: 'Pleine page', cols: '1fr', rows: '1fr', areas: ['a']},
    {id: 'deux-h', nom: '2 bandes', cols: '1fr', rows: '1fr 1fr', areas: ['a', 'b']},
    {id: 'deux-v', nom: '2 colonnes', cols: '1fr 1fr', rows: '1fr', areas: ['a b']},
    {id: 'grand-deux', nom: '1 grand + 2', cols: '1fr 1fr', rows: '1.3fr 1fr', areas: ['a a', 'b c']},
    {id: 'deux-grand', nom: '2 + 1 grand', cols: '1fr 1fr', rows: '1fr 1.3fr', areas: ['a b', 'c c']},
    {id: 'trois-bandes', nom: '3 bandes', cols: '1fr', rows: '1fr 1fr 1fr', areas: ['a', 'b', 'c']},
    {id: 'quatre', nom: '4 cases', cols: '1fr 1fr', rows: '1fr 1fr', areas: ['a b', 'c d']},
    {id: 'grand-breves', nom: 'Grand + brèves', cols: '2fr 1fr', rows: '1fr 1fr 1fr', areas: ['a b', 'a c', 'a d']},
    {id: 'l-forme', nom: 'En L', cols: '2fr 1fr', rows: '1.2fr 1fr', areas: ['a b', 'c c']},
    {id: 'cinq', nom: '5 brèves', cols: '1fr 1fr', rows: '1.2fr 1fr 1fr', areas: ['a a', 'b c', 'd e']},
    {id: 'dos-ours', nom: 'Dos + équipe', dos: 1, cols: '2fr 1fr', rows: '1.3fr 1fr', areas: ['a a', 'b o'], auto: {o: 'ours'}},
    {id: 'dos-jeux', nom: 'Dos détente', dos: 1, cols: '1fr 1fr', rows: '1fr 1fr .55fr', areas: ['a b', 'c c', 'd o'], auto: {o: 'ours'}}
  ];
  const parId = {}; G.forEach(g => { parId[g.id] = g; });
  const MM = 96 / 25.4; // pixels par millimètre
  const PW = 210, PH = 297, MARGE = 11, GAP = 4;
  const POLICES = [
    ['georgia', 'Georgia, "Times New Roman", serif', 'Georgia'], ['times', '"Times New Roman", Times, serif', 'Times'],
    ['playfair', '"Playfair Display", Georgia, serif', 'Playfair'], ['merri', 'Merriweather, Georgia, serif', 'Merriweather'],
    ['arial', 'Arial, Helvetica, sans-serif', 'Arial'], ['roboto', 'Roboto, Arial, sans-serif', 'Roboto'],
    ['oswald', 'Oswald, "Arial Narrow", sans-serif', 'Oswald'], ['bebas', '"Bebas Neue", Impact, sans-serif', 'Bebas Neue'],
    ['marker', '"Permanent Marker", cursive', 'Marqueur'], ['pacifico', 'Pacifico, cursive', 'Pacifico'],
    ['machine', '"Special Elite", "Courier New", monospace', 'Machine à écrire'], ['courier', '"Courier New", monospace', 'Courier']
  ];
  const POL = {}; POLICES.forEach(p => { POL[p[0]] = p[1]; });
  const pol = k => POL[k] || '';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const dateLongue = d => { const m = /^(\d{4})-(\d\d)-(\d\d)$/.exec(d || ''); return m ? `${+m[3]} ${MOIS[+m[2] - 1]} ${m[1]}` : ''; };
  const uid = () => 'b' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  /* ---------- pages : nombre, noms, gabarits permis ---------- */
  const nbPages = num => Math.max(1, Math.min(8, +num.nb || (num.pages && num.pages.length) || 2));
  const nomPage = (p, nb) => p === 0 ? 'La Une' : nb > 2 && p === nb - 1 ? 'Le dos' : `Page ${p + 1}`;
  const feuilleDe = (p, rv) => rv ? `feuille ${Math.floor(p / 2) + 1} ${p % 2 ? 'verso' : 'recto'}` : `feuille ${p + 1}`;
  const pour = (p, nb) => G.filter(g => p === 0 ? g.une : !g.une && (!g.dos || (p === (nb || 4) - 1)));
  const gabDefaut = (p, nb) => p === 0 ? (nb === 1 ? 'une-recto' : 'une-classique') : p === nb - 1 ? 'dos-ours' : ['grand-deux', 'quatre', 'grand-breves', 'l-forme'][(p - 1) % 4];

  /* ---------- zones d'un gabarit, en mm ---------- */
  function zones(g) {
    if (g._z) return g._z;
    const fr = s => s.split(/\s+/).map(x => parseFloat(x) || 1);
    const c = fr(g.cols), r = fr(g.rows);
    const x0 = MARGE, W = PW - 2 * MARGE, y0 = g.une ? 59 : 17, H = PH - 13 - y0;
    const larg = c.map(v => v / c.reduce((a, b) => a + b, 0) * (W - GAP * (c.length - 1)));
    const haut = r.map(v => v / r.reduce((a, b) => a + b, 0) * (H - GAP * (r.length - 1)));
    const z = {};
    g.areas.map(l => l.trim().split(/\s+/)).forEach((ligne, i) => ligne.forEach((k, j) => {
      const o = z[k] = z[k] || {k, c0: j, c1: j, r0: i, r1: i};
      o.c0 = Math.min(o.c0, j); o.c1 = Math.max(o.c1, j); o.r0 = Math.min(o.r0, i); o.r1 = Math.max(o.r1, i);
    }));
    const somme = (l, a, b) => l.slice(a, b).reduce((s, v) => s + v, 0);
    Object.values(z).forEach(o => {
      o.x = x0 + somme(larg, 0, o.c0) + GAP * o.c0; o.w = somme(larg, o.c0, o.c1 + 1) + GAP * (o.c1 - o.c0);
      o.y = y0 + somme(haut, 0, o.r0) + GAP * o.r0; o.h = somme(haut, o.r0, o.r1 + 1) + GAP * (o.r1 - o.r0);
      o.type = (g.auto && g.auto[o.k]) || 'art'; o.grand = g.grand === o.k;
      o.cap = cap(o);
    });
    return (g._z = Object.keys(z).sort().map(k => z[k]));
  }
  // nombre de mots qui rentrent à peu près dans une case (texte 9,5 pt ; une page intérieure entière ≈ 1000 mots)
  function cap(b) { return Math.max(40, Math.round(b.w * b.h / (188 * 267) * 1000 - (b.grand || (b.s && b.s.grand) ? 90 : 45))); }
  const zonesArt = g => zones(g).filter(z => z.type === 'art');

  // les blocs créés par un gabarit (z = {lettre de zone: id d'article})
  function blocsDuGabarit(gid, z, p) {
    const g = parId[gid]; if (!g) return [];
    const l = [];
    if (g.une) l.push({id: uid(), type: 'tetiere', x: MARGE, y: 9, w: PW - 2 * MARGE, h: 46, s: {}});
    zones(g).forEach(o => {
      const b = {id: uid(), type: o.type, x: +o.x.toFixed(1), y: +o.y.toFixed(1), w: +o.w.toFixed(1), h: +o.h.toFixed(1), s: {}};
      if (o.grand) b.s.grand = 1;
      if (o.type === 'art' && z && z[o.k]) b.art = z[o.k];
      if (o.c0 > 0 && o.type === 'art') b.s.filet = 1;
      l.push(b);
    });
    return l;
  }
  // les blocs d'une page (les maquettes d'avant le 03/11 soir avaient {g, z} : on les convertit)
  function blocs(num, p) {
    const pg = num.pages && num.pages[p];
    if (pg && Array.isArray(pg.blocs)) return pg.blocs;
    const gid = (pg && pg.g) || gabDefaut(p, nbPages(num));
    const l = blocsDuGabarit(gid, pg && pg.z, p);
    if (num.pages) { num.pages[p] = {g: gid, blocs: l}; }
    return l;
  }
  // tous les articles placés : [{p, b, id}]
  const artsDe = num => { const l = []; for (let p = 0; p < nbPages(num); p++) blocs(num, p).forEach(b => { if (b.type === 'art' && b.art) l.push({p, b, id: b.art}); }); return l; };

  // petite image d'un gabarit (sélecteur)
  function mini(g) {
    const z = zones(g);
    return `<div class="mini" style="grid-template-rows:${g.une ? '9px ' : ''}${g.rows};grid-template-columns:${g.cols};grid-template-areas:${g.une ? `'${g.areas[0].split(/\s+/).map(() => 'm').join(' ')}' ` : ''}${g.areas.map(a => `'${a}'`).join(' ')}">`
      + (g.une ? '<i class="m" style="grid-area:m"></i>' : '') + z.map(o => `<i class="${o.type !== 'art' ? 's' : ''}" style="grid-area:${o.k}"></i>`).join('') + '</div>';
  }

  /* ---------- photo : recadrage, zoom et filtres ---------- */
  function filtre(s) {
    const f = [];
    if (s.nb) f.push('grayscale(1)'); if (s.sep) f.push('sepia(.8)');
    if (s.lum && s.lum != 100) f.push(`brightness(${s.lum / 100})`); if (s.con && s.con != 100) f.push(`contrast(${s.con / 100})`);
    if (s.sat != null && s.sat !== '' && s.sat != 100) f.push(`saturate(${s.sat / 100})`); if (s.flou) f.push(`blur(${s.flou / 10}mm)`);
    return f.join(' ');
  }
  function photo(src, s, style) {
    const px = s.px != null ? s.px : 50, py = s.py != null ? s.py : 50, zm = (+s.zoom || 100) / 100;
    return `<div class="ph" style="${style || ''}${s.phR ? `border-radius:${s.phR}mm;` : ''}"><img src="${src}" alt="" draggable="false" style="object-position:${px}% ${py}%;transform-origin:${px}% ${py}%;${zm !== 1 ? `transform:scale(${zm});` : ''}${s.miroir ? `transform:scale(${zm}) scaleX(-1);` : ''}filter:${filtre(s)}"></div>`;
  }

  /* ---------- rendu d'une page ----------
     ctx = {num, art(id), img(id), equipe, roleNom, propre} ; mode : 'ecran' (aperçu), 'edit' (éditeur) ou 'papier' (impression) */
  function page(ctx, p, mode) {
    const num = ctx.num, nb = nbPages(num);
    const el = document.createElement('div'); el.className = 'page' + (mode !== 'papier' ? ' mode-ecran' : '') + (mode === 'edit' ? ' mode-edit' : '');
    const nomJ = num.nom || 'Le Journal';
    const l = blocs(num, p);
    if (p > 0 && !num.sansEntete) el.insertAdjacentHTML('beforeend', `<div class="haut-int"><span>${esc(nomJ)}</span><span>N° ${esc(num.n || 1)}${num.parution ? ' · ' + esc(dateLongue(num.parution)) : ''}</span></div>`);
    if (nb > 1) el.insertAdjacentHTML('beforeend', `<div class="pied-p">— ${p + 1} —</div>`);
    const fond = (num.pages && num.pages[p] && num.pages[p].fond) || num.fond; if (fond) el.style.backgroundColor = fond;
    l.forEach((b, i) => el.appendChild(bloc(ctx, b, mode, i)));
    return el;
  }
  function bloc(ctx, b, mode, i) {
    const s = b.s || {}, d = document.createElement('div');
    d.className = 'b z t-' + b.type; d.dataset.b = b.id;
    d.style.cssText = `left:${b.x}mm;top:${b.y}mm;width:${b.w}mm;height:${b.h}mm;z-index:${i + 1};`
      + (b.r ? `transform:rotate(${b.r}deg);` : '')
      + (s.bg ? `background:${s.bg};` : '') + (s.bord ? `border:${s.bord}mm ${s.bordT || 'solid'} ${s.bordC || '#111'};` : '')
      + (s.rayon ? `border-radius:${s.rayon}mm;` : '') + (s.pad ? `padding:${s.pad}mm;` : '') + (s.op != null && s.op !== '' && s.op < 100 ? `opacity:${s.op / 100};` : '')
      + (s.ombre ? 'box-shadow:0 1.2mm 3mm rgba(0,0,0,.35);' : '') + (s.c ? `color:${s.c};` : '');
    ['fs', 'cols', 'ts', 'phH'].forEach(k => { if (s[k]) d.dataset[k] = s[k]; });
    if (s.filet && !s.bord) d.classList.add('filet-g');
    if (s.grand) d.classList.add('grand');
    const fT = pol(s.polT), fB = pol(s.pol);
    if (b.type === 'tetiere') {
      const num = ctx.num;
      d.classList.add('tetiere');
      d.innerHTML = `<div class="nom" style="${fT ? `font-family:${fT};` : ''}${s.ts ? `font-size:${s.ts}pt;` : ''}${s.tc ? `color:${s.tc};` : ''}">${esc(num.nom || 'Le Journal')}</div>`
        + (num.slogan ? `<div class="slogan" style="${fB ? `font-family:${fB};` : ''}">${esc(num.slogan)}</div>` : '')
        + `<div class="infos" style="${s.tc ? `border-color:${s.tc};` : ''}"><span>N° ${esc(num.n || 1)}</span><span>${esc(num.ecole || '')}</span><span>${esc(dateLongue(num.parution))}</span></div>`;
      if (s.al) d.style.textAlign = s.al;
    } else if (b.type === 'sommaire') { d.classList.add('sommaire'); d.innerHTML = sommaire(ctx); if (fB) d.style.fontFamily = fB; }
    else if (b.type === 'ours') { d.classList.add('ours'); d.innerHTML = ours(ctx); }
    else if (b.type === 'texte') {
      d.innerHTML = `<div class="tx" style="font-family:${fB || 'Georgia,serif'};font-size:${s.fs || 12}pt;text-align:${s.al || 'left'};line-height:${s.lh || 1.3};${s.gras ? 'font-weight:800;' : ''}${s.ital ? 'font-style:italic;' : ''}${s.maj ? 'text-transform:uppercase;letter-spacing:.04em;' : ''}justify-content:${{haut: 'flex-start', milieu: 'center', bas: 'flex-end'}[s.va || 'haut']}"><div>${ctx.propre(b.html || '') || (mode !== 'papier' ? '<span class="ph-txt">Touche deux fois pour écrire…</span>' : '')}</div></div>`;
    } else if (b.type === 'image' || b.type === 'dessin') {
      const src = b.img ? ctx.img(b.img) : null;
      if (src) d.innerHTML = b.type === 'dessin' ? `<img class="dessin" src="${src}" alt="" draggable="false">` : photo(src, s, 'position:absolute;inset:0;') + (b.leg ? `<div class="leg-img">${esc(b.leg)}</div>` : '');
      else if (mode !== 'papier') { d.classList.add('vide-z'); d.innerHTML = `<div><b>${b.type === 'dessin' ? '✏️ Dessin' : '🖼️ Photo'}</b>touche deux fois</div>`; }
    } else if (b.type === 'forme') {
      const coul = s.fc || '#0f766e';
      d.innerHTML = b.forme === 'ligne' ? `<div class="ligne" style="height:${s.ep || 0.8}mm;background:${coul}"></div>`
        : `<div class="forme" style="background:${coul};${b.forme === 'rond' ? 'border-radius:50%;' : ''}"></div>`;
      d.style.overflow = 'visible';
    } else { // article
      const a = b.art ? ctx.art(b.art) : null;
      if (!a) { if (mode !== 'papier') { d.classList.add('vide-z'); d.innerHTML = `<div><b>＋ Placer un article</b>environ ${cap(b)} mots</div>`; } }
      else {
        d.dataset.art = a.id;
        const src = a.img && s.ph !== 'non' ? ctx.img(a.img) : null, pos = s.ph || 'haut';
        const leg = [a.leg, a.credit ? 'Photo : ' + a.credit : ''].filter(Boolean).join(' — ');
        const fig = src ? `<figure class="fig-${pos}" style="${pos === 'gauche' || pos === 'droite' ? `width:${s.phW || 40}%;` : ''}">${photo(src, s, s.phH ? `height:${s.phH}mm;` : '')}${leg && !s.sansLeg ? `<figcaption>${esc(leg)}</figcaption>` : ''}</figure>` : '';
        const tete = (a.rub && !s.sansRub ? `<div class="z-rub" style="${s.tc ? `color:${s.tc};border-color:${s.tc};` : ''}">${esc(a.rub)}</div>` : '')
          + `<h2 class="z-titre" style="${fT ? `font-family:${fT};` : ''}${s.ts ? `font-size:${s.ts}pt;` : ''}${s.tc ? `color:${s.tc};` : ''}${s.alT ? `text-align:${s.alT};` : ''}">${esc(a.titre || 'Sans titre')}</h2>`
          + (a.chapeau && !s.sansChap ? `<p class="z-chap" style="${fB ? `font-family:${fB};` : ''}">${esc(a.chapeau)}</p>` : '');
        const texte = `<div class="z-texte" style="${fB ? `font-family:${fB};` : ''}${s.al ? `text-align:${s.al};` : ''}${s.lh ? `line-height:${s.lh};` : ''}">${ctx.propre(a.corps || '')}</div>`;
        const signe = a.auteurs && !s.sansSign ? `<div class="z-sign">${esc(a.auteurs)}</div>` : '';
        if (pos === 'fond' && src) {
          d.innerHTML = `<div class="fond-ph">${photo(src, s, 'position:absolute;inset:0;')}</div><div class="voile" style="background:rgba(255,255,255,${(s.voile != null ? s.voile : 80) / 100})">${tete}${texte}${signe}</div>`;
        } else if (pos === 'gauche' || pos === 'droite') {
          d.innerHTML = tete + `<div class="z-corps ${pos}">${fig}${texte}</div>` + signe;
        } else d.innerHTML = tete + `<div class="z-corps ${pos === 'bas' ? 'bas' : ''}">${fig}${texte}</div>` + signe;
      }
    }
    return d;
  }

  function sommaire(ctx) {
    const l = artsDe(ctx.num).filter(x => x.p > 0).map(x => [x.p + 1, ctx.art(x.id)]).filter(x => x[1]);
    return '<h2>Dans ce numéro</h2>' + (l.length ? l.slice(0, 9).map(([p, a]) => `<div class="l"><b>${p}</b><div>${a.rub ? `<small>${esc(a.rub)}</small>` : ''}${esc(a.titre || 'Sans titre')}</div></div>`).join('')
      : '<p style="font:italic 9pt system-ui">Le sommaire se remplit tout seul avec les articles des autres pages.</p>');
  }
  function ours(ctx) {
    const parRole = {};
    (ctx.equipe || []).forEach(m => (m.roles || [m.role]).forEach(id => { const r = ctx.roleNom(id); (parRole[r] = parRole[r] || []).push(m.nom); }));
    const num = ctx.num;
    return `<h2>${esc(num.nom || 'Le Journal')}</h2>`
      + `<p>N° ${esc(num.n || 1)}${num.parution ? ', ' + esc(dateLongue(num.parution)) : ''}${num.ecole ? ' · ' + esc(num.ecole) : ''}</p>`
      + Object.keys(parRole).map(r => `<p><b>${esc(r)}</b> : ${esc(parRole[r].join(', '))}</p>`).join('')
      + '<p style="font-style:italic;margin-top:2mm">Ne pas jeter sur la voie publique : passe-le à un ami !</p>';
  }

  /* Ajuste les articles à leur bloc (la page doit être dans le document) : colonnes selon la largeur, texte de 11 à 7 pt,
     photo plus petite si besoin. Les réglages faits à la main (taille, colonnes, hauteur de photo) sont respectés.
     Renvoie la liste des articles trop longs. */
  function ajuster(el) {
    const trop = [];
    const marquer = (z, tx) => {
      const old = z.querySelector('.trop'); if (old) old.remove();
      const pct = Math.round((tx.scrollWidth / Math.max(1, tx.clientWidth) - 1) * 100) || Math.round((tx.scrollHeight / Math.max(1, tx.clientHeight) - 1) * 100);
      const b = document.createElement('div'); b.className = 'trop'; b.textContent = `✂️ trop long (+${Math.max(5, pct)} %)`; z.appendChild(b);
    };
    el.querySelectorAll('.b.t-art[data-art]').forEach(z => {
      const old = z.querySelector('.trop'); if (old) old.remove();
      const tx = z.querySelector('.z-texte'), ph = z.querySelector('figure .ph'), h2 = z.querySelector('.z-titre'), fig = z.querySelector('figure');
      const sty = z.dataset; // réglages faits à la main (fs, cols, ts, phH), posés par bloc()
      const lmm = (tx.clientWidth || z.clientWidth) / MM, hmm = z.clientHeight / MM;
      const cols = +sty.cols || (lmm >= 140 ? 3 : lmm >= 82 ? 2 : 1);
      tx.style.columnCount = cols;
      if (h2 && !sty.ts) h2.style.fontSize = (z.classList.contains('grand') ? 30 : z.clientWidth / MM >= 140 ? 22 : z.clientWidth / MM >= 82 ? 17 : 13.5) + 'pt';
      const deborde = () => tx.scrollWidth > tx.clientWidth + 2 || tx.scrollHeight > tx.clientHeight + 2 || tx.clientHeight < 8;
      const cote = fig && /fig-(gauche|droite)/.test(fig.className);
      const essai = fracImg => {
        if (ph && !sty.phH) ph.style.height = cote ? Math.max(20, hmm * 0.55) + 'mm' : Math.max(18, Math.min(hmm * fracImg, (fig.clientWidth / MM) * 0.75)) + 'mm';
        if (sty.fs) { tx.style.fontSize = sty.fs + 'pt'; return !deborde(); }
        for (let fs = 11; fs >= 7; fs -= 0.25) { tx.style.fontSize = fs + 'pt'; if (!deborde()) return true; }
        return false;
      };
      let ok = essai(z.classList.contains('grand') ? 0.42 : 0.34);
      if (!ok && ph && !sty.phH) ok = essai(0.22);
      if (!ok) { marquer(z, tx); trop.push(z.dataset.art); }
    });
    el.querySelectorAll('.b.t-texte .tx').forEach(tx => { const z = tx.parentNode; const old = z.querySelector('.trop'); if (old) old.remove(); if (tx.scrollHeight > tx.clientHeight + 2) marquer(z, tx); });
    return trop;
  }

  /* Propositions de mise en page : beaucoup de combinaisons de gabarits, le plus long à la plus grande case (la photo à la Une),
     on garde les meilleures, toutes différentes. candidats = [{id, mots, photo}] ; renvoie [{pages: [{g, blocs}], places, total}] */
  function proposer(candidats, nb, combien) {
    combien = combien || 4;
    const arts = candidats.slice().sort((a, b) => b.mots - a.mots);
    const essais = [], vus = {};
    const hasard = l => l[Math.floor(Math.random() * l.length)];
    for (let i = 0; i < 700; i++) {
      const gs = []; for (let p = 0; p < nb; p++) gs.push(hasard(pour(p, nb)));
      const cle = gs.map(g => g.id).join('|'); if (vus[cle]) continue; vus[cle] = 1;
      const cases = []; gs.forEach((g, p) => zonesArt(g).forEach(z => cases.push({p, z})));
      cases.sort((a, b) => (b.z.grand && b.p === 0) - (a.z.grand && a.p === 0) || b.z.cap - a.z.cap);
      const reste = arts.slice(), zs = gs.map(() => ({}));
      let note = 0, places = 0;
      cases.forEach((c, i) => {
        if (!reste.length) { note += 1.4; return; }
        let k = 0;
        if (i === 0) { const j = reste.slice(0, 3).findIndex(a => a.photo); if (j > 0) k = j; }
        const a = reste.splice(k, 1)[0]; zs[c.p][c.z.k] = a.id; places++;
        const r = a.mots / c.z.cap;
        note += r > 1.25 ? (r - 1) * 7 : r < 0.3 ? (0.3 - r) * 3 : r < 0.6 ? (0.6 - r) : 0;
      });
      note += reste.length * 2.5;
      essais.push({gs, zs, note, places, total: cases.length, cle: gs.map(g => g.id)});
    }
    essais.sort((a, b) => a.note - b.note);
    const choisis = [];
    for (const e of essais) {
      if (choisis.every(c => c.cle.filter((x, i) => x !== e.cle[i]).length >= Math.min(2, nb))) choisis.push(e);
      if (choisis.length >= combien) break;
    }
    return choisis.map(e => ({pages: e.gs.map((g, p) => ({g: g.id, blocs: blocsDuGabarit(g.id, e.zs[p], p)})), places: e.places, total: e.total}));
  }

  window.Maquette = {GABARITS: G, gabarit: id => parId[id], pour, zones, zonesArt, mini, page, bloc, ajuster, proposer, dateLongue, MM, PW, PH, POLICES,
    blocs, blocsDuGabarit, artsDe, cap, nbPages, nomPage, feuilleDe, gabDefaut, uid, filtre};
})();
