/* Journal de l'école : les mises en page (gabarits) des 4 pages A4, le rendu d'une page et les propositions automatiques.
   Kevin (03/11/2026) : 2 feuilles A4 recto-verso = 4 pages. Page 1 = la Une (avec le nom du journal), page 4 = le dos.
   Un gabarit = une grille (colonnes, lignes, zones). Zone « art » = un article ; « sommaire » et « ours » se remplissent tout seuls.
   Pour ajouter un gabarit : une ligne dans GABARITS (areas = lignes de lettres, une lettre = une zone). */
(() => {
  const G = [
    // ---- la Une (page 1) ----
    {id: 'une-classique', nom: 'Classique', une: 1, cols: '1fr 1fr', rows: '2.1fr 1fr', areas: ['a a', 'b c'], grand: 'a'},
    {id: 'une-sommaire', nom: 'Avec sommaire', une: 1, cols: '2.1fr 1fr', rows: '1.5fr 1fr', areas: ['a s', 'b s'], grand: 'a', auto: {s: 'sommaire'}},
    {id: 'une-trois', nom: 'Une + 3 brèves', une: 1, cols: '1fr 1fr 1fr', rows: '1.7fr 1fr', areas: ['a a a', 'b c d'], grand: 'a'},
    {id: 'une-edito', nom: 'Édito à gauche', une: 1, cols: '1fr 2.1fr', rows: '1.4fr 1fr', areas: ['e a', 'e b'], grand: 'a'},
    {id: 'une-totale', nom: 'Grand sujet', une: 1, cols: '1fr', rows: '1fr', areas: ['a'], grand: 'a'},
    // ---- pages intérieures (2, 3) et dos (4) ----
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
  const MOTS_PAGE = 1000; // une page intérieure entière, texte 9,5 pt sur 3 colonnes (environ)

  // fraction de la page et position de chaque zone d'un gabarit
  function zones(g) {
    if (g._z) return g._z;
    const fr = s => s.split(/\s+/).map(x => parseFloat(x) || 1);
    const c = fr(g.cols), r = fr(g.rows), sc = c.reduce((a, b) => a + b, 0), sr = r.reduce((a, b) => a + b, 0);
    const cell = g.areas.map(l => l.trim().split(/\s+/));
    const z = {};
    cell.forEach((ligne, i) => ligne.forEach((k, j) => {
      const o = z[k] = z[k] || {k, c0: j, c1: j, r0: i, r1: i};
      o.c0 = Math.min(o.c0, j); o.c1 = Math.max(o.c1, j); o.r0 = Math.min(o.r0, i); o.r1 = Math.max(o.r1, i);
    }));
    const corps = g.une ? 0.78 : 0.97;
    Object.values(z).forEach(o => {
      const fc = c.slice(o.c0, o.c1 + 1).reduce((a, b) => a + b, 0) / sc, frr = r.slice(o.r0, o.r1 + 1).reduce((a, b) => a + b, 0) / sr;
      o.frac = fc * frr * corps; o.largeur = fc;
      o.type = (g.auto && g.auto[o.k]) || 'art';
      o.grand = g.grand === o.k;
      o.cap = Math.max(60, Math.round(o.frac * MOTS_PAGE - (o.grand ? 90 : 45)));
    });
    return (g._z = Object.keys(z).sort().map(k => z[k]));
  }
  const zonesArt = g => zones(g).filter(z => z.type === 'art');
  const pour = p => G.filter(g => p === 0 ? g.une : !g.une && (!g.dos || p === 3));

  // petite image du gabarit (sélecteur)
  function mini(g) {
    const z = zones(g);
    return `<div class="mini" style="grid-template-rows:${g.une ? '9px ' : ''}${g.rows};grid-template-columns:${g.cols};grid-template-areas:${g.une ? `'${g.areas[0].split(/\s+/).map(() => 'm').join(' ')}' ` : ''}${g.areas.map(a => `'${a}'`).join(' ')}">`
      + (g.une ? '<i class="m" style="grid-area:m"></i>' : '') + z.map(o => `<i class="${o.type !== 'art' ? 's' : ''}" style="grid-area:${o.k}"></i>`).join('') + '</div>';
  }

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const dateLongue = d => { const m = /^(\d{4})-(\d\d)-(\d\d)$/.exec(d || ''); return m ? `${+m[3]} ${MOIS[+m[2] - 1]} ${m[1]}` : ''; };

  /* Une page du journal. ctx = {num, art(id), img(id), mots(article), equipe: [{nom, role}], roleNom(role)}
     mode : 'ecran' (aperçu, zones vides et dépassements visibles, cases cliquables) ou 'papier'. */
  function page(ctx, p, mode) {
    const num = ctx.num, pg = (num.pages && num.pages[p]) || {}, g = parId[pg.g] || pour(p)[0];
    const el = document.createElement('div'); el.className = 'page' + (mode === 'ecran' ? ' mode-ecran' : '');
    const nomJ = num.nom || 'Le Journal';
    if (g.une) el.innerHTML = `<div class="tetiere"><div class="nom">${esc(nomJ)}</div>${num.slogan ? `<div class="slogan">${esc(num.slogan)}</div>` : ''}
      <div class="infos"><span>N° ${esc(num.n || 1)}</span><span>${esc(num.ecole || '')}</span><span>${esc(dateLongue(num.parution))}</span></div></div>`;
    else el.innerHTML = `<div class="haut-int"><span>${esc(nomJ)}</span><span>N° ${esc(num.n || 1)}${num.parution ? ' · ' + esc(dateLongue(num.parution)) : ''}</span></div>`;
    const corps = document.createElement('div'); corps.className = 'corps-p';
    corps.style.gridTemplateColumns = g.cols; corps.style.gridTemplateRows = g.rows;
    corps.style.gridTemplateAreas = g.areas.map(a => `"${a}"`).join(' ');
    zones(g).forEach(z => {
      const d = document.createElement('div'); d.className = 'z'; d.style.gridArea = z.k; d.dataset.k = z.k; d.dataset.p = p;
      if (z.c0 > 0 && z.type !== 'sommaire') d.classList.add('filet-g');
      if (z.type === 'sommaire') { d.classList.add('sommaire'); d.innerHTML = sommaire(ctx); }
      else if (z.type === 'ours') { d.classList.remove('filet-g'); d.classList.add('ours'); d.innerHTML = ours(ctx); }
      else {
        const a = pg.z && pg.z[z.k] ? ctx.art(pg.z[z.k]) : null;
        if (z.grand) d.classList.add('grand');
        if (!a) {
          if (mode === 'ecran') { d.classList.add('vide-z'); d.innerHTML = `<div><b>＋ Placer un article</b>environ ${z.cap} mots</div>`; }
        } else {
          d.dataset.art = a.id;
          const im = a.img ? ctx.img(a.img) : null;
          const leg = [a.leg, a.credit ? 'Photo : ' + a.credit : ''].filter(Boolean).join(' — ');
          d.innerHTML = (a.rub ? `<div class="z-rub">${esc(a.rub)}</div>` : '')
            + `<h2 class="z-titre">${esc(a.titre || 'Sans titre')}</h2>`
            + (a.chapeau ? `<p class="z-chap">${esc(a.chapeau)}</p>` : '')
            + (im ? `<figure><img src="${im}" alt="">${leg ? `<figcaption>${esc(leg)}</figcaption>` : ''}</figure>` : '')
            + `<div class="z-texte">${ctx.propre(a.corps || '')}</div>`
            + (a.auteurs ? `<div class="z-sign">${esc(a.auteurs)}</div>` : '');
        }
        if (mode === 'ecran') d.classList.add('cliquable');
      }
      corps.appendChild(d);
    });
    el.appendChild(corps);
    const pied = document.createElement('div'); pied.className = 'pied-p'; pied.textContent = `— ${p + 1} —`;
    el.appendChild(pied);
    return el;
  }

  function sommaire(ctx) {
    const l = [];
    (ctx.num.pages || []).forEach((pg, p) => { if (p === 0 || !pg || !pg.z) return; Object.keys(pg.z).sort().forEach(k => { const a = ctx.art(pg.z[k]); if (a) l.push([p + 1, a]); }); });
    return '<h2>Dans ce numéro</h2>' + (l.length ? l.slice(0, 9).map(([p, a]) => `<div class="l"><b>${p}</b><div>${a.rub ? `<small>${esc(a.rub)}</small>` : ''}${esc(a.titre || 'Sans titre')}</div></div>`).join('')
      : '<p style="font:italic 9pt system-ui">Le sommaire se remplit tout seul avec les articles des pages 2 à 4.</p>');
  }
  function ours(ctx) {
    const parRole = {};
    (ctx.equipe || []).forEach(m => { const r = ctx.roleNom(m.role); (parRole[r] = parRole[r] || []).push(m.nom); });
    const num = ctx.num;
    return `<h2>${esc(num.nom || 'Le Journal')}</h2>`
      + `<p>N° ${esc(num.n || 1)}${num.parution ? ', ' + esc(dateLongue(num.parution)) : ''}${num.ecole ? ' · ' + esc(num.ecole) : ''}</p>`
      + Object.keys(parRole).map(r => `<p><b>${esc(r)}</b> : ${esc(parRole[r].join(', '))}</p>`).join('')
      + '<p style="font-style:italic;margin-top:2mm">Ne pas jeter sur la voie publique : passe-le à un ami !</p>';
  }

  /* Ajuste chaque article à sa case (la page doit être dans le document) : colonnes selon la largeur,
     taille du texte de 11 pt à 7,25 pt, photo plus petite si besoin. Renvoie la liste des articles trop longs. */
  function ajuster(el) {
    const trop = [];
    el.querySelectorAll('.z[data-art]').forEach(z => {
      const tx = z.querySelector('.z-texte'), img = z.querySelector('figure img'), h2 = z.querySelector('.z-titre');
      const lmm = z.clientWidth / MM, hmm = z.clientHeight / MM;
      const cols = lmm >= 140 ? 3 : lmm >= 82 ? 2 : 1;
      tx.style.columnCount = cols;
      if (h2 && !z.classList.contains('grand')) h2.style.fontSize = (cols === 3 ? 22 : cols === 2 ? 17 : 13.5) + 'pt';
      const deborde = () => tx.scrollWidth > tx.clientWidth + 2 || tx.clientHeight < 8;
      const essai = fracImg => {
        if (img) img.style.height = Math.max(18, Math.min(hmm * fracImg, lmm * 0.75)) + 'mm';
        for (let fs = 11; fs >= 7.25; fs -= 0.25) { tx.style.fontSize = fs + 'pt'; if (!deborde()) return true; }
        return false;
      };
      let ok = essai(z.classList.contains('grand') ? 0.42 : 0.34);
      if (!ok && img) ok = essai(0.22);
      const old = z.querySelector('.trop'); if (old) old.remove();
      if (!ok) {
        const pct = Math.round((tx.scrollWidth / Math.max(1, tx.clientWidth) - 1) * 100);
        const b = document.createElement('div'); b.className = 'trop'; b.textContent = `✂️ trop long (+${Math.max(5, pct)} %)`;
        z.appendChild(b); trop.push(z.dataset.art);
      }
    });
    return trop;
  }

  /* Propositions de mise en page : on essaie beaucoup de combinaisons de gabarits, on range les articles
     (le plus long dans la plus grande case, la photo à la Une si possible) et on garde les meilleures, toutes différentes.
     candidats = [{id, mots, photo}] ; renvoie [{pages: [{g, z}], note, places, total}] */
  function proposer(candidats, nb) {
    nb = nb || 4;
    const arts = candidats.slice().sort((a, b) => b.mots - a.mots);
    const essais = [], vus = {};
    const hasard = l => l[Math.floor(Math.random() * l.length)];
    const combos = [];
    for (let i = 0; i < 600; i++) combos.push([hasard(pour(0)), hasard(pour(1)), hasard(pour(2)), hasard(pour(3))]);
    combos.forEach(gs => {
      const cle = gs.map(g => g.id).join('|'); if (vus[cle]) return; vus[cle] = 1;
      const cases = []; gs.forEach((g, p) => zonesArt(g).forEach(z => cases.push({p, z})));
      cases.sort((a, b) => (b.z.grand && b.p === 0) - (a.z.grand && a.p === 0) || b.z.cap - a.z.cap);
      const reste = arts.slice(), pages = gs.map(g => ({g: g.id, z: {}}));
      let note = 0, places = 0;
      // à la Une : de préférence un article avec photo parmi les plus longs
      cases.forEach((c, i) => {
        if (!reste.length) { note += 1.4; return; }
        let k = 0;
        if (i === 0) { const j = reste.slice(0, 3).findIndex(a => a.photo); if (j > 0) k = j; }
        const a = reste.splice(k, 1)[0]; pages[c.p].z[c.z.k] = a.id; places++;
        const r = a.mots / c.z.cap;
        note += r > 1.25 ? (r - 1) * 7 : r < 0.3 ? (0.3 - r) * 3 : r < 0.6 ? (0.6 - r) : 0;
      });
      note += reste.length * 2.5;
      essais.push({pages, note, places, total: cases.length, cle: gs.map(g => g.id)});
    });
    essais.sort((a, b) => a.note - b.note);
    const choisis = [];
    for (const e of essais) {
      if (choisis.every(c => c.cle.filter((x, i) => x !== e.cle[i]).length >= 2)) choisis.push(e);
      if (choisis.length >= nb) break;
    }
    return choisis;
  }

  window.Maquette = {GABARITS: G, gabarit: id => parId[id], pour, zones, zonesArt, mini, page, ajuster, proposer, dateLongue, MM};
})();
