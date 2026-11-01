/* ====== Prépas « en jeux » : la leçon s'adapte à la durée, à la salle et au nombre d'élèves ======
   Chargé avant prepa-guide.js (<script src="prepa-moteur.js"> dans carnet/index.html : à remettre si construire.py régénère la page).
   Kevin (26/10) : dans la fiche de la prépa, choisir 1 h ou 2 h, la salle et le nombre d'élèves (10 à 26) ;
   - 1 h = 50 min dont 7 min de vestiaires au début seulement → 43 min de cours ; 2 h → 86 min (7 min avant et après) ;
   - même contenu en 1 h et en 2 h, mais moins d'exigence en 1 h ({2 h|1 h} dans les textes) ; les jeux « x » ne se font qu'en 2 h ;
   - salles : 1 Grande salle, 2 Petite salle, 3 Le Brel, 4 Cour extérieure (pas pour la natation).
   Bibliothèque « jeux » : PREPA_JEUX({id, sport, mat, sal, J, an}) dans carnet/prepas/<id>.js. Elle est traduite au format
   des autres bibliothèques (PREPA_LIB[id], leçons {t, o, mat, e, c, r}) pour le contexte choisi : tout le reste du carnet
   (liste des leçons, fiche, impression, guide) marche sans changement.
   - J = catalogue des jeux du sport : {clé: {n: nom, d: règle, s: schéma, f: organisation, k: 'opp'|'coop'|'fp'}} ;
   - item d'une leçon = [clé du catalogue ou nom, minutes (pour 2 h), consigne du jour, réussite, variante, schéma?, organisation?] ;
   - leçon = {t, o, e: [items], c: [items], x: [items en 2 h seulement], r: [items], crit?} ;
   - textes : {2 h|1 h}, {n} élèves, {n/8 chat} → « 3 chats », mots de la salle ({cible}, {filet}, {terrain}… dans sal[salle].tk) ;
   - organisation f : 'p' paires, 'g4' groupes de 4, 'e2' 2 équipes, 'm3' matchs 3 c 3 (terrains de la salle), 'f2' 2 c 2 au filet,
     'a4' 4 ateliers tournants : une ligne « 👥 » calculée pour le nombre d'élèves et la salle est ajoutée à la consigne. */
(() => {
  const LS = (k, v) => { const ls = window.DEMO_LS || localStorage; try { if (v === undefined) return ls.getItem(k); ls.setItem(k, v); } catch(e){ return null; } };
  const VEST = 7;
  // minutes de cours réelles (sans vestiaires ni bus) : 1 h → 43, 2 h → 86 ; piscine : toujours 40 min dans l'eau
  const plMin = (h, pool) => pool ? 40 :   // natation : toujours un bloc de 2 h (bus), 40 min dans l'eau
    h >= 2 ? 100 - 2 * VEST : 50 - VEST;
  const SALLES = {
    g: {n: 'Grande salle', k: 'Salle 1', d: 'un terrain de basket officiel ou un peu plus · 2 paniers, 2 buts, filet de volley, tout le matériel'},
    p: {n: 'Petite salle', k: 'Salle 2', d: 'un grand terrain de badminton · 4 bancs, 2 plinths, sautoirs, 15 à 20 steps, espaliers, 3 gros tapis, 15 tapis de gym (1 × 2 m), filet bas ou haut · petite pour un grand groupe'},
    b: {n: 'Le Brel', k: 'Salle 3', d: 'un petit terrain de basket · bancs, 10 ballons de basket, plots, cônes : le reste est à apporter'},
    c: {n: 'Cour extérieure', k: 'Salle 4', d: 'terrain de mini-foot (2 buts, 2 anneaux) + une 2e zone de même taille sans tracé · rien sur place'}
  };
  const SALLE_IDS = ['g', 'p', 'b', 'c'];
  const BREL = {basket: 10, plots: 99, cones: 99, bancs: 4};  // ce qui est sur place au Brel

  /* --- contexte choisi : durée (h), salle (sl), nombre d'élèves (n) --- */
  const cl = (v, a, b) => Math.max(a, Math.min(b, v));
  let C = (() => { try { const o = JSON.parse(LS('carnet-pl-ctx') || '{}'); return {h: o.h === 1 ? 1 : 2, sl: SALLES[o.sl] ? o.sl : 'g', n: cl(+o.n || 20, 10, 26)}; } catch(e){ return {h: 2, sl: 'g', n: 20}; } })();
  const RAW = {};
  /* jeux communs à tous les sports (projet d'équipe, autonomie, bilan) : {sport} = nom du sport */
  const JG = {
    draft: {n: 'La draft', k: 'fp', s: 'libre', d: 'Le prof désigne les capitaines ; l\'ordre de choix est tiré au sort et s\'inverse à chaque tour (1-2-3-4 puis 4-3-2-1), comme dans les ligues pro. Chaque équipe se donne un nom, une couleur et un cri. Règle d\'or : personne n\'est choisi en dernier à voix haute, les capitaines choisissent sur une feuille.'},
    contrat: {n: 'Le contrat d\'équipe', k: 'coop', s: 'libre', d: 'Chaque équipe écrit sur une feuille son contrat : une force à utiliser, un point faible à travailler, une règle de fair-play, et un objectif chiffré pour le tournoi. Le contrat est relu avant chaque match.'},
    echequipe: {n: 'L\'échauffement d\'équipe', k: 'coop', s: 'libre', f: 'e4', d: 'Chaque équipe mène son propre échauffement : un jeu de mise en train de la saison (choisi par le capitaine), une activation des articulations, puis des gestes du {sport}. Le prof passe et valide.'},
    coach: {n: 'L\'atelier du coach', k: 'coop', s: 'libre', f: 'e4', d: 'Chaque équipe choisit un jeu de la saison qui travaille son point faible et le dirige elle-même (un élève = coach). Au bout du temps, chaque coach dit ce que l\'équipe a amélioré.'},
    // retours au calme communs à tous les sports (31/10 : un retour au calme différent à chaque leçon d'un cycle)
    meteo: {n: 'La météo de la leçon', k: 'fp', s: 'etirements', d: 'En cercle, étirements guidés (mollets, cuisses, épaules). Puis chacun montre sa météo avec les bras : soleil (bras en rond au-dessus de la tête) = j\'ai réussi et j\'ai aimé, nuage (bras croisés) = moyen, orage (mains qui tremblent) = c\'était dur. Deux ou trois élèves expliquent leur météo en une phrase.'},
    ralenti: {n: 'Le ralenti de la télé', k: 'coop', s: 'libre', d: 'Par équipe (1 min de préparation), on rejoue au ralenti, comme au replay de la télé, la plus belle action de la leçon. Les autres disent ce qui l\'a rendue réussie. Puis étirements doux en cercle.'},
    parole: {n: 'L\'objet de la parole', k: 'fp', s: 'etirements', d: 'Assis en cercle, étirements guidés. Un objet du {sport} circule : seul celui qui le tient parle. Il dit une chose qu\'il a apprise ou réussie aujourd\'hui, puis le passe à quelqu\'un qui n\'a pas encore parlé (5 ou 6 élèves par leçon, jamais les mêmes).'},
    mercis: {n: 'Le cercle des mercis', k: 'fp', s: 'etirements', d: 'En cercle, étirements guidés. Qui le veut dit merci à un camarade pour une action précise de la leçon (« merci Léa pour ta passe quand j\'étais seul »). Le prof dit les siens à la fin.'},
    respire: {n: 'La statue qui respire', k: 'coop', s: 'etirements', d: 'Allongés sur le dos, yeux fermés, mains sur le ventre : 5 grandes respirations, le ventre monte et descend. Le prof raconte la leçon en 3 phrases ; chacun repense à son meilleur moment. On se relève doucement et on s\'étire.'},
    quiz: {n: 'Le quiz vrai ou faux', k: 'coop', s: 'explication', d: 'Toute la classe debout sur la ligne du milieu : le prof dit 4 phrases sur la leçon (règles, conseils, sécurité). Vrai = un pas à droite, faux = un pas à gauche. Chaque erreur est expliquée par un élève qui avait juste. Puis étirements.'},
    journaliste: {n: 'Le journal du tournoi', k: 'fp', s: 'libre', d: 'Un élève par équipe (à tour de rôle) est journaliste : il note les résultats, le joueur fair-play du match et l\'action du jour, puis les annonce à la classe en fin de leçon.'}
  };
  function setCtx(o){
    const nv = {h: o.h === 1 || o.h === 2 ? o.h : C.h, sl: SALLES[o.sl] ? o.sl : C.sl, n: cl(+o.n || C.n, 10, 26)};
    const chg = nv.h !== C.h || nv.sl !== C.sl || nv.n !== C.n; C = nv; LS('carnet-pl-ctx', JSON.stringify(C));
    if (chg) Object.keys(RAW).forEach(id => window.PREPA_LIB[id] = compile(RAW[id]));
    return chg;
  }

  /* --- petits outils de texte --- */
  // pluriel des mots avant le complément (« grande corde de 6 m » → « grandes cordes de 6 m »)
  const pl1 = w => /[sxz]$/.test(w) ? w : /al$/.test(w) ? w.slice(0, -2) + 'aux' : /(eau|eu)$/.test(w) ? w + 'x' : w + 's';
  const plur = (k, mot) => { if (k <= 1) return mot; let stop = false;
    return mot.split(' ').map(w => { if (stop || /^(de|d'|du|des|à|au|en|ou|et|pour|sur|avec)$/.test(w) || /^([(\d]|d')/.test(w)) { stop = true; return w; } return pl1(w); }).join(' '); };
  const nb = (k, mot) => k + ' ' + plur(k, mot);
  // n élèves en k groupes → « 5 groupes de 4 » / « 5 groupes (2 de 5, 3 de 4) »
  function parts(n, k, mot){
    k = Math.max(1, Math.min(n, k)); const b = Math.floor(n / k), x = n % k;
    return x ? `${nb(k, mot)} (${x} de ${b + 1}, ${k - x} de ${b})` : `${nb(k, mot)} de ${b}`;
  }
  const paires = n => n % 2 ? `${nb((n - 3) / 2, 'paire')} et 1 trio` : nb(n / 2, 'paire');

  /* --- organisation calculée pour le nombre d'élèves et la salle --- */
  function orga(f, n, S, mm){
    if (!f) return '';
    const m = /^([pgemfa])(\d*)$/.exec(f); if (!m) return '';
    const t = m[1], k = +m[2] || 0;
    if (t === 'p') return paires(n);
    if (t === 'g') return parts(n, Math.max(1, Math.round(n / (k || 4))), 'groupe');
    if (t === 'e') return parts(n, k || 2, 'équipe');
    if (t === 'a'){ const g = k || 4, rot = Math.max(3, Math.floor(mm / g)); return `${parts(n, g, 'groupe')} sur ${g} ateliers · on tourne toutes les ${rot} min`; }
    // matchs N c N (m) ou au filet (f) : équipes de N, terrains de la salle, rotation des équipes au bord
    const N = k || 3, ter0 = t === 'f' ? (S.f || 1) : (S.m || 1), ter = t === 'f' && N >= 6 ? 1 : N >= (t === 'f' ? 4 : 5) ? Math.max(1, Math.floor(ter0 / 2)) : ter0;
    if (t === 'f' && N === 1){   // simple : 2 matchs par terrain, chacun sur une moitié dans la longueur
      const pl = Math.min(2 * Math.floor(n / 2), 4 * ter0), bd = n - pl, tm = Math.max(3, Math.min(8, Math.round(mm / (bd ? 3 : 2))));
      return `${n} joueurs en simple · ${nb(Math.ceil(pl / 4), 'terrain')} au filet, 2 matchs par terrain (chacun sur une moitié, dans la longueur)` + (bd ? ` · ${bd === 1 ? '1 joueur au bord arbitre' : bd + ' joueurs au bord arbitrent et comptent les points'}, on tourne toutes les ${tm} min` : ` · matchs de ${tm} min, puis on change d'adversaire`);
    }
    let q = Math.max(2, Math.round(n / N)); if (q * N < n - q) q++;   // pas plus d'1 remplaçant par équipe
    const jeu = Math.min(Math.floor(q / 2), ter), bord = q - 2 * jeu, b = Math.floor(n / q), x = n % q;
    const eq = x ? `${q} équipes de ${b}${b + 1 > N ? ` (${x} avec 1 remplaçant)` : ` ou ${b + 1}`}` : `${q} équipes de ${b}`;
    const tm = Math.max(3, Math.min(8, Math.round(mm / (bord ? 3 : 2))));
    return `${eq} · ${nb(jeu, 'terrain')}${t === 'f' ? ' au filet' : ''}` + (bord ? ` · ${bord === 1 ? '1 équipe au bord arbitre' : bord + ' équipes au bord arbitrent et comptent les points'}, on tourne toutes les ${tm} min` : ` · matchs de ${tm} min, puis on change d'adversaire`);
  }

  /* --- matériel : [nom, par élève ou nombre fixe, clé de stock] → quantités et où le prendre --- */
  function materiel(L, l, n, sl, S){
    const lst = [...(L.mat || []), ...(l.mat2 || []), ...(S.mat || [])];
    if (typeof L.mat === 'string') return L.mat;
    const qte = q => typeof q === 'number' ? (q > 0 && q < 1 ? Math.ceil(n * q) : q === 1 ? n : q) : q;
    const items = lst.map(([nom, q, st]) => {
      const v = qte(q), num = typeof v === 'number';
      let s = num ? `${v} ${plur(v, nom)}` : (q ? `${nom} (${v})` : nom);
      if (sl === 'b' && st){ const ici = BREL[st] || 0; if (num && ici < v) s += ici ? ` (${ici} au Brel, ${v - ici} à apporter de ${S.src || 'la Grande salle'})` : ` (à apporter de ${S.src || 'la Grande salle'})`; else if (!num && !ici) s += ' (à apporter)'; }
      return s; });
    const pre = S.pre != null ? S.pre : sl === 'c' ? 'Tout est à emporter dehors : ' : sl === 'p' ? 'Au local de la salle 1 (partagé) : ' : '';
    return pre + items.join(' · ') + '.';
  }

  /* --- texte d'un item : catalogue + consigne du jour, mots de la salle, 2 h|1 h, nombres --- */
  function txt(s, ctx, S){
    return String(s || '')
      .replace(/\{([^{}|]*)\|([^{}]*)\}/g, (_, a, b) => ctx.h >= 2 ? a : b)
      .replace(/\{n\/(\d+(?:\.\d+)?)\s+([^{}]+)\}/g, (_, d, mot) => nb(Math.max(1, Math.round(ctx.n / +d)), mot.trim()))
      .replace(/\{n\}/g, ctx.n)
      .replace(/\{salle\}/g, S.n || SALLES[ctx.sl].n).replace(/\{sport\}/g, S.sport || 'sport')
      .replace(/\{(\w+)\}/g, (all, k) => S.tk && S.tk[k] != null ? S.tk[k] : all);
  }

  /* --- une leçon « jeux » → leçon au format de la bibliothèque, pour ce contexte --- */
  function lecon(L, l, ctx){
    if (L.pool) ctx = {...ctx, h: 2};   // natation : toujours un bloc de 2 h
    // lieu fixe (ex. l'endurance, toujours sur la plaine) : il remplace le choix de salle
    const sl = L.lieu ? 'c' : ctx.sl, S = Object.assign({sport: (L.sport || '').toLowerCase()}, L.lieu || (L.sal || {})[sl] || {}), T = plMin(ctx.h, L.pool);
    S.tk = Object.assign({}, (L.sal && L.sal.tk) || {}, S.tk || {});
    // une leçon peut ajouter sa propre note pour une salle (ex. jeux divers : « dehors, prendre un ballon lourd »)
    const LS2 = (l.sal || {})[sl] || {}; ['m', 'f', 'ff', 'src'].forEach(k => { if (LS2[k] != null) S[k] = LS2[k]; });
    const tx = s => txt(s, ctx, S);
    const items = k => (l[k] || []).map(it => { const [key, m, d, ok, va, sch, f] = it, A0 = auto(L)[key], J = (L.J || {})[key] || JG[key] || (A0 && A0.it !== it ? A0 : null);
      return {nom: tx(J ? J.n : key), m: +m || 0, d: J ? (d ? `${tx(J.d)}\n   → ${tx(d)}` : tx(J.d)) : tx(d), ok: tx(ok), va: tx(va), sch: '@' + L.id + '|' + key + '#' + (sch || (J && J.s) || ''), f: f || (J && J.f) || ''}; });
    const e = items('e'), c = [...items('c'), ...(ctx.h >= 2 ? items('x') : [])], r = items('r');
    // minutes : échauffement et retour au calme bougent peu, les jeux du corps de leçon prennent le reste
    const sum = a => a.reduce((s, x) => s + x.m, 0), tot = sum(e) + sum(c) + sum(r) || 1, fa = T / tot;
    e.forEach(x => x.m = Math.max(3, Math.round(x.m * cl(fa, .65, 1.3))));
    r.forEach(x => x.m = Math.max(3, Math.round(x.m * cl(fa, .65, 1.2))));
    const reste = Math.max(c.length * 5, T - sum(e) - sum(r)), sc = sum(c) || 1; let fait = 0;
    c.forEach((x, i) => { x.m = i === c.length - 1 ? Math.max(5, reste - fait) : Math.max(5, Math.round(x.m * reste / sc)); fait += x.m; });
    // S.ff : une salle peut remplacer une organisation (ex. petite salle : 2 équipes au lieu de 4)
    const org = x => { const o = orga((S.ff && S.ff[x.f]) || x.f, ctx.n, S, x.m); return o ? `${x.d}\n   👥 ${o}.` : x.d; };
    const out = {t: tx(l.t), o: tx(l.o), comp: l.comp, crit: l.crit, ...(l.tags ? {tags: tx(l.tags)} : {}), ...(l.ps ? {ps: 1} : {}), jeux: true, ctx: {...ctx},
      e: e.map(x => [x.nom, x.m, org(x), x.sch]), c: c.map(x => [x.nom, x.m, org(x), x.ok, x.va, x.sch]), r: r.map(x => [x.nom, x.m, org(x), x.sch])};
    const place = [S.note ? `📍 ${L.lieu ? L.lieu.n : SALLES[sl].n} : ${tx(S.note)}` : '', LS2.note ? `📍 ${tx(LS2.note)}` : '', S.warn ? `⚠ ${tx(S.warn)}` : '', LS2.warn ? `⚠ ${tx(LS2.warn)}` : ''].filter(Boolean).join('\n');
    out.mat = (place ? place + '\n' : '') + '🧺 ' + materiel(L, l, ctx.n, sl, S);
    return out;
  }
  /* jeu écrit dans une leçon et repris plus loin sous le même nom : la règle de la 1re fois sert de catalogue */
  function auto(L){
    if (L._auto) return L._auto;
    const A = {};
    Object.values(L.an).forEach(Y => Y.l.forEach(l => ['e', 'c', 'x', 'r'].forEach(k => (l[k] || []).forEach(it => {
      const [key, , d, , , sch, f] = it; if (!(L.J || {})[key] && !JG[key] && d && !A[key]) A[key] = {n: key, d, s: sch || '', f: f || '', it}; }))));
    Object.defineProperty(L, '_auto', {value: A}); return A;
  }
  function compile(L){
    const an = {};
    Object.entries(L.an).forEach(([a, A]) => { an[a] = {...A, l: A.l.map(l => lecon(L, l, C))}; });
    // matériel de base du sport pour ce contexte (sans le matériel propre à chaque leçon) : pour la page de garde du recueil
    const sl = L.lieu ? 'c' : C.sl, mat = materiel(L, {}, C.n, sl, Object.assign({}, L.lieu || (L.sal || {})[sl] || {}));
    return {id: L.id, sport: L.sport, mat, divers: L.divers, an, jeux: true, ctx: {...C}};
  }
  window.PREPA_JEUX = L => { RAW[L.id] = L; window.PREPA_LIB[L.id] = compile(L); };

  /* --- barre « Durée · Salle · Élèves » des fiches de prépa --- */
  // pool : piscine (pas de salle) ; jeux : la bibliothèque du sport s'adapte (sinon seules les minutes bougent)
  function bar(pre, o = {}){
    const pool = !!o.pool, fixe = pool || !!o.lieu;
    return `<div class="row2 plx" id="${pre}-ctx">
      <label class="f plx-h"${pool ? ' hidden' : ''}>Durée<select class="inp" id="${pre}-h">${[1, 2].map(h => `<option value="${h}" ${h === C.h ? 'selected' : ''}>${h === 1 ? '1 h (' + plMin(1, pool) + ' min)' : '2 h (' + plMin(2, pool) + ' min)'}</option>`).join('')}</select></label>
      <label class="f plx-s"${fixe ? ' hidden' : ''}>Salle<select class="inp" id="${pre}-sl">${SALLE_IDS.map(k => `<option value="${k}" ${k === C.sl ? 'selected' : ''}>${SALLES[k].k.replace('Salle ', '')} · ${SALLES[k].n}</option>`).join('')}</select></label>
      <label class="f plx-n">Élèves<select class="inp" id="${pre}-n">${Array.from({length: 17}, (_, i) => i + 10).map(v => `<option value="${v}" ${v === C.n ? 'selected' : ''}>${v}</option>`).join('')}</select></label></div>
      <p class="small muted plx-i" id="${pre}-ci">${esc2(info(pool, o.jeux, o.lieu))}</p>`;
  }
  const esc2 = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  function info(pool, jeux, lieu){
    if (pool) return `⏱ Natation : toujours un bloc de 2 h (bus et vestiaires compris), ${plMin(2, true)} min dans l'eau.`;
    const S = lieu || SALLES[C.sl];
    return `⏱ ${C.h >= 2 ? `2 h : ${plMin(2)} min de cours (7 min de vestiaires avant et après)` : `1 h : ${plMin(1)} min de cours (7 min de vestiaires au début)`} · 📍 ${S.n} : ${S.d}.` + (jeux === false ? ' Ce sport n\'a pas encore sa version en jeux : seules les minutes s\'adaptent.' : '');
  }
  function bind(pre, onChange, o = {}){
    BIND[pre] = onChange;
    const g = id => document.getElementById(pre + '-' + id);
    const go = () => { const ch = setCtx({h: +g('h').value, sl: g('sl').value, n: +g('n').value}); const i = g('ci'); if (i) i.textContent = info(!!o.pool, o.jeux, o.lieu); if (ch && onChange) onChange(C); };
    ['h', 'sl', 'n'].forEach(k => { const e = g(k); if (e) e.onchange = go; });
  }
  // la barre suit le sport choisi : pas de salle à la piscine ; un mot si le sport n'a pas encore sa version en jeux
  function majBar(pre, o = {}){
    const s = document.querySelector(`#${pre}-ctx .plx-s`), i = document.getElementById(pre + '-ci'), h = document.getElementById(pre + '-h');
    if (s) s.hidden = !!o.pool || !!o.lieu;
    const hl = document.querySelector(`#${pre}-ctx .plx-h`); if (hl) hl.hidden = !!o.pool;
    if (h) [1, 2].forEach((v, j) => h.options[j].textContent = `${v} h (${plMin(v, o.pool)} min)`);
    if (i) i.textContent = info(!!o.pool, o.jeux, o.lieu);
    bind(pre, BIND[pre], o);
  }
  const BIND = {};
  // salle habituelle d'un créneau de l'agenda
  function salleDe(k, sl){
    let m = {}; try { m = JSON.parse(LS('carnet-pl-salles') || '{}'); } catch(e){}
    if (sl === undefined) return m[k] || C.sl;
    m[k] = sl; LS('carnet-pl-salles', JSON.stringify(m)); return sl;
  }
  const st = document.createElement('style');
  st.textContent = `.plx{align-items:flex-end}.plx .f{flex:1 1 90px;min-width:0}.plx .plx-s{flex:2 1 150px}.plx-i{margin:0}.plx .f[hidden]{display:none}`;
  document.head.appendChild(st);

  window.prepaMoteur = {plMin, VEST, SALLES, SALLE_IDS, ctx: () => ({...C}), setCtx, bar, bind, compile, orga, txt, RAW, JG, auto, majBar, salleDe, estJeux: id => !!RAW[id], lieuDe: id => (RAW[id] && RAW[id].lieu) || null};
})();
