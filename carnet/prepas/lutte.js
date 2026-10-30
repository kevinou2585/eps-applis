/* Sport d'opposition · lutte en jeux (jeux divers) : un seul cycle de 6 leçons (5 + l'évaluation), le même pour toutes les années.
   Format « jeux » (voir carnet/prepa-moteur.js). Règles d'or de tout le cycle : pas de coup, pas de clé, pas de prise au cou ni à la tête,
   on lâche dès que l'autre tape 2 fois ou dit « stop », pas de bijoux, ongles courts, adversaires de gabarit proche.
   Idées mêlées et réécrites : classeur EPS, jeux d'opposition (la tortue, le crocodile, les chiffonniers, le coffre-fort, le roi du tapis,
   le combat des coqs, le gardien du trésor), règles simplifiées de la lutte scolaire. On gagne des points, jamais en faisant mal. */
(() => {
const A = {th: 'Lutte : s\'opposer en sécurité, déséquilibrer, renverser et immobiliser, arbitrer', comp: ['HME1', 'HME3', 'HSC1', 'HSC3', 'GSS2', 'GSS3'], l: [
  {t: 'Les règles d\'or et le contact', o: 'Connaître et respecter les règles de sécurité ; accepter le contact et saluer.',
   e: [['regles', 6], ['chat4', 7]],
   c: [['tortue', 15, '', 'Je respecte toutes les règles pendant les reprises.', 'La tortue peut se déplacer à 4 pattes.'],
    ['chiffonniers', 16, '', 'Je garde mon foulard plus de 30 s.', 'Deux foulards chacun.'],
    ['crocodile', 15, '', 'Je touche les deux épaules au moins une fois.', 'Toucher une seule épaule pour les débutants.']],
   x: [['coffre', 15, '', 'Je garde le ballon 20 s.', '']],
   r: [['salut', 7]]},
  {t: 'Pousser, tirer : sortir l\'autre de la zone', o: 'Garder son équilibre et faire sortir l\'adversaire d\'une zone en poussant ou en tirant avec tout le corps.',
   e: [['regles', 4, 'Un élève redit les règles et montre le « stop ».'], ['coqs', 9]],
   c: [['sumo', 16, '', 'Je fais sortir mon adversaire au moins une fois.', 'Zone plus petite.'],
    ['roitapis', 15, '', 'Je reste sur le tapis jusqu\'à la fin d\'une reprise.', ''],
    ['planche', 15, '', 'Je reste gainé et je résiste.', 'La planche peut ramper.']],
   x: [['tire', 15, '', 'Je gagne au moins une manche.', '']],
   r: [['salut', 7, 'Qu\'est-ce qui aide à garder l\'équilibre ? (jambes fléchies, pieds écartés, centre bas).']]},
  {t: 'Déséquilibrer et renverser au sol', o: 'Renverser un adversaire à 4 pattes sur le dos en le faisant basculer, sans le soulever.',
   e: [['chutes', 7], ['coqs', 6]],
   c: [['renverse', 16, '', 'Je réussis {4|3} renversements sur 5.', 'Le partenaire résiste un peu.'],
    ['tortue', 15, 'On utilise les renversements appris.', 'Je retourne la tortue en moins de 20 s.', ''],
    ['tresor', 15, '', 'Je prends le trésor au moins une fois.', '']],
   x: [['roitapis', 15, '', 'Je reste sur le tapis.', '']],
   r: [['salut', 7, 'Rappel : on ne soulève jamais l\'autre.']]},
  {t: 'Immobiliser et se dégager', o: 'Maintenir un adversaire sur le dos 5 secondes (immobilisation) et savoir se dégager.',
   e: [['chutes', 6], ['tortue', 7, 'Rappel en 3 reprises de 20 s.']],
   c: [['immo', 16, '', 'Je tiens l\'immobilisation 5 s.', ''],
    ['degage', 15, '', 'Je me dégage au moins une fois sur trois.', 'L\'immobilisateur ne serre qu\'à moitié au début.'],
    ['enchaine', 15, '', 'J\'enchaîne renversement et immobilisation.', '']],
   x: [['coffre', 15, 'Au sol.', 'Je garde le ballon 20 s.', '']],
   r: [['salut', 7]]},
  {t: 'Combats arbitrés', o: 'Lutter en respectant les règles et arbitrer un combat : départ, points, arrêt, vainqueur.',
   e: [['coqs', 6], ['Les règles du combat', 7, 'Combat au sol, départ à genoux, 1 min 30 : sortie de la zone = 1 point à l\'autre, renversement = 1 point, immobilisation 5 s = 2 points. L\'arbitre dit « allez », « stop » et annonce le score avec les doigts.', '', '', 'explication', '']],
   c: [['poules', 22, '', 'Je marque des points dans chaque combat.', 'Combats de 1 min pour les débutants.'],
    ['Le tribunal de l\'arbitre', 10, 'Chaque poule rejoue une situation difficile à arbitrer ; la classe vote la bonne décision avec la règle.', 'J\'explique une décision avec la règle.', '', 'explication', ''],
    ['roitapis', 14, '', 'Je reste sur le tapis.', '']],
   x: [['tresor', 15, '', 'Je prends le trésor.', '']],
   r: [['salut', 7, 'Chacun dit une règle de sécurité qu\'il a appliquée.']]},
  {t: 'Évaluation : combattre et arbitrer', o: 'Montrer renversement, immobilisation, dégagement en combat et un arbitrage juste, en sécurité.',
   crit: [['Renversement (3 essais, partenaire qui résiste un peu)', 5, '5 : 3 réussis, sans soulever · 4 : 2 · 2 : 1 · 0 : aucun'], ['Immobilisation 5 s', 4, '4 : tenue 5 s, sans prise au cou · 2 : moins de 5 s · 0 : non réussie'], ['Dégagement (2 essais)', 3, '3 : se dégage 2 fois · 2 : 1 fois · 1 : tente en pont ou en se retournant'], ['Combat : engagement et stratégie', 4, '4 : attaque, enchaîne renversement et immobilisation · 2 : surtout en défense · 1 : peu actif'], ['Sécurité, salut et arbitrage', 4, '4 : règles toujours respectées, arbitre juste et clair · 2 : un rappel · 0 : règle de sécurité non respectée']],
   e: [['chutes', 6], ['coqs', 7]],
   c: [['Épreuve 1 : les gestes', 12, 'Par 3 : renversements, immobilisation, dégagements devant le prof.', '', '', 'tapis::sol', 'g3'],
    ['Épreuve 2 : combats arbitrés', 26, 'Poules de gabarit proche ; chacun arbitre au moins un combat.', '', '', 'tapis', 'g4']],
   r: [['salut', 6]]}
]};
PREPA_JEUX({id: 'lutte', sport: 'Lutte', divers: true,
mat: [['tapis', 0.5, 'tapis'], ['foulard', 1], ['ballon en mousse', 6, 'mousse'], ['coupelle', 20, 'plots'], ['chronomètre', 2], ['fiche d\'arbitrage et crayon', 0.25]],
sal: {
  tk: {zone: 'la zone de tapis'},
  g: {src: 'la Petite salle', note: 'les tapis Sarneige sont à apporter de la Petite salle (local partagé) : zones de 2 tapis (2 m × 2 m) séparées de 1 m, le reste de la classe assis au bord.'},
  p: {note: 'la meilleure salle : 15 tapis Sarneige en zones de 2 m × 2 m, les gros tapis contre les murs. Avec plus de 20 élèves, la moitié lutte, l\'autre arbitre.'},
  b: {src: 'la Petite salle', note: 'tapis à apporter de la Petite salle ; zones le long des murs, loin des poteaux.', warn: 'Peu de tapis transportables : jeux debout (sumo, coqs) sur le parquet, jeux au sol uniquement sur les tapis.'},
  c: {note: 'dehors : seulement sur l\'herbe, avec des tapis si possible.', warn: 'Sur le dur : uniquement les jeux debout (sumo, coqs, tir à deux), jamais de jeu au sol.'}
},
J: {
  regles: {n: 'Les règles d\'or', k: 'fp', s: 'explication', d: 'Assis au bord des tapis : on salue avant et après ; interdit : coups, clés, prises au cou ou à la tête, cheveux, vêtements tirés fort ; on lâche tout de suite si l\'autre tape 2 fois ou dit « stop ». Bijoux enlevés, ongles courts, pieds nus ou chaussettes.'},
  chat4: {n: 'Le chat à quatre pattes', k: 'opp', s: 'tapis::sol', d: 'Sur {zone}, tout le monde à 4 pattes : {n/8 chat} touchent le dos des autres. Un touché se met en tortue (en boule) et est délivré quand un camarade passe par-dessus.'},
  coqs: {n: 'Le combat des coqs', k: 'opp', s: 'tapis::cercle', f: 'p', d: 'Par deux, accroupis face à face, paumes contre paumes : en poussant ou en esquivant avec les mains seulement, faire perdre l\'équilibre à l\'autre (mains ou fesses au sol). 3 points et on change de partenaire.'},
  chutes: {n: 'Apprendre à tomber', k: 'coop', s: 'tapis::sol', d: 'Sur les tapis : roulades avant et arrière, chute sur le côté en tapant le tapis avec le bras, chute arrière menton rentré. Puis par deux : A pousse doucement B qui chute correctement.'},
  tortue: {n: 'Retourner la tortue', k: 'opp', s: 'tapis::sol', f: 'p', d: 'Par deux sur un tapis : A à 4 pattes (la tortue), B essaie de la retourner sur le dos en 20 s, sans la soulever et sans prise à la tête. On inverse ; on change de partenaire toutes les 2 reprises.'},
  crocodile: {n: 'Le crocodile', k: 'opp', s: 'tapis::sol', f: 'p', d: 'Par deux à genoux, dos contre dos : au signal, se retourner et essayer de poser les deux épaules de l\'autre au sol. 30 s par reprise.'},
  chiffonniers: {n: 'Les chiffonniers', k: 'opp', s: 'tapis', d: 'Chacun un foulard dans la ceinture, dans {zone} : à genoux, on attrape le foulard des autres sans protéger le sien avec les mains. Celui qui n\'a plus de foulard sort 20 s et fait 5 abdos.'},
  coffre: {n: 'Le coffre-fort', k: 'opp', s: 'tapis::sol', f: 'p', d: 'A est couché sur un ballon en mousse (le trésor), B a 20 s pour le lui prendre en le faisant rouler ou en glissant les mains dessous (jamais par la tête). On inverse.'},
  sumo: {n: 'Le sumo', k: 'opp', s: 'tapis::cercle', f: 'p', d: 'Par deux dans un cercle de coupelles : debout, mains sur les épaules ou les bras de l\'autre, on le fait sortir du cercle en poussant ou en tirant. Jambes fléchies, dos droit. 30 s, puis on change de partenaire.'},
  roitapis: {n: 'Le roi du tapis', k: 'opp', s: 'tapis', f: 'g4', d: 'Par 4 sur un tapis : à genoux, chacun essaie de faire sortir les autres. Le dernier sur le tapis gagne 1 point. Reprises de 45 s.'},
  planche: {n: 'La planche', k: 'opp', s: 'tapis::sol', f: 'p', d: 'A est allongé sur le ventre, gainé comme une planche ; B essaie de le retourner sur le dos en 15 s. Puis A à 4 pattes. On inverse.'},
  tire: {n: 'Le tir à deux', k: 'opp', s: 'tapis::cercle', f: 'p', d: 'Par deux, assis dos à dos, bras crochetés : au signal, chacun essaie d\'entraîner l\'autre au-delà de sa ligne en poussant avec les jambes. Puis face à face, mains tenues, debout : tirer l\'autre au-delà d\'une ligne.'},
  renverse: {n: 'Les deux renversements', k: 'coop', s: 'tapis::sol', f: 'p', d: 'Le prof montre : 1) saisir le bras et la jambe du même côté et tirer vers soi ; 2) passer le bras sous le ventre et faire rouler l\'autre sur l\'épaule. Par deux : 5 essais chacun, le partenaire se laisse faire, puis résiste un peu.'},
  tresor: {n: 'Le gardien du trésor', k: 'opp', s: 'tapis', f: 'g3', d: 'Un ballon (le trésor) au centre du tapis, un gardien à genoux devant ; deux voleurs à genoux essaient de le prendre et de le sortir du tapis. Le gardien peut renverser les voleurs (qui reviennent alors au bord). On tourne toutes les 45 s.'},
  immo: {n: 'L\'immobilisation 5 secondes', k: 'coop', s: 'tapis::sol', f: 'g3', d: 'Le prof montre : en travers du partenaire couché sur le dos, poitrine contre poitrine, un bras qui entoure son bras, l\'autre sous son épaule (jamais autour du cou). L\'arbitre compte 5 s à voix haute. On tourne les rôles.'},
  degage: {n: 'L\'évasion', k: 'opp', s: 'tapis::sol', f: 'p', d: 'A immobilise B ; B a 15 s pour s\'évader en pont (pousser sur les pieds, rouler sur l\'épaule) ou en se retournant sur le ventre. Évasion réussie = 1 point. On inverse.'},
  enchaine: {n: 'Renverser puis immobiliser', k: 'opp', s: 'tapis', f: 'p', d: 'Départ à 4 pattes / à genoux : renverser = 1 point, renverser puis immobiliser 5 s = 2 points. Reprises de 45 s, on change de partenaire.'},
  poules: {n: 'Les combats par poules', k: 'opp', s: 'tapis', f: 'g4', d: 'Poules de 4 de gabarit proche par tapis : chacun lutte contre les 3 autres (1 min 30) ; ceux qui ne luttent pas arbitrent et tiennent la fiche. On se salue avant et après chaque combat.'},
  salut: {n: 'Le salut et le dos qui respire', k: 'fp', s: 'etirements', d: 'Salut du partenaire. Étirements du dos (position de l\'enfant, chat-vache), des épaules et de la nuque, doucement. Un élève redit les règles d\'or ; chacun nomme un partenaire respectueux.'}
},
an: {1: A, 2: A, 3: A, 4: A, 5: A, 6: A}});
})();

/* ===== Schémas de chaque jeu (zone de tapis vue de dessus, ou lutteurs dessinés de profil) ===== */
(window.PSCH_SC = window.PSCH_SC || {}).lutte = (() => {
  const EQ = ['#1f63d6', '#e8590c', '#16a34a', '#8a3ffc'];
  const zone = g => { g.hall(); g.mat(25, 25, 350, 200, {seams: 4}); return g; };
  const prof = g => { g.sol(205); return g; };
  const tapis4 = (g, fn) => { g.hall(); [[20, 20], [205, 20], [20, 130], [205, 130]].forEach(([x, y], i) => { g.mat(x, y, 175, 100); if (fn) fn(x + 87, y + 50, i); }); return g; };
  return {
    regles: g => { zone(g); g.row('a', 9, 50, 240, 300, 240).P(340, 240); ['🙇 on salue avant et après', '🚫 pas de coups, de clés, rien au cou ni à la tête', '✋ 2 tapes ou « stop » = on lâche tout de suite', '💍 bijoux enlevés · ongles courts · pieds nus'].forEach((t, i) => g.tag(200, 55 + i * 42, t, {s: 9.5})); return g; },
    chat4: g => { zone(g); g.scatter('a', 9, 50, 50, 350, 200, {seed: 3}); g.X(190, 120).run(202, 120, 230, 100, 0).raw('<circle cx="120" cy="170" r="11" fill="#9aa3a0"/>', 'top').label(120, 195, 'touché : tortue', {s: 9}).A(90, 150).lob(90, 150, 140, 180, -18);
      return g.n(1, 'tout le monde à 4 pattes ; les chats touchent le dos des autres').n(2, 'un touché se met en tortue ; délivré quand un camarade passe par-dessus'); },
    tortue: g => { prof(g); g.fig(160, 205, 'table', {s: 1.8}).fig(250, 205, 'genou', {s: 1.8, t: 'b', r: 1}).rot(200, 150, 160, 120, -20); return g.tag(200, 50, '20 s pour retourner la tortue sur le dos', {s: 10}).n(1, 'A à 4 pattes ; B la retourne sans la soulever et sans prise à la tête').n(2, 'on inverse ; nouveau partenaire toutes les 2 reprises'); },
    chiffonniers: g => { zone(g); g.scatter('a', 9, 50, 50, 350, 200, {seed: 5}).each((x, y, i) => g.raw(`<path d="M${x + 6} ${y + 6}l8 6" stroke="${['#facc15', '#e11d48', '#16a34a'][i % 3]}" stroke-width="4" stroke-linecap="round"/>`, 'top'));
      return g.tag(200, 238, 'à genoux · sans protéger son foulard avec les mains', {s: 9}).n(1, 'on attrape le foulard des autres (dans la ceinture)').n(2, 'sans foulard : on sort 20 s et on fait 5 abdos'); },
    crocodile: g => { prof(g); g.fig(170, 205, 'genou', {s: 1.8, r: 1}).fig(230, 205, 'genou', {s: 1.8, t: 'b'}); return g.tag(200, 50, 'dos à dos · au signal : se retourner', {s: 10}).n(1, 'essayer de poser les deux épaules de l\'autre au sol ; 30 s par reprise'); },
    coffre: g => { prof(g); g.fig(160, 205, 'planche', {s: 1.6}).ball(165, 196, 'gros').fig(260, 205, 'genou', {s: 1.8, t: 'b', r: 1}); return g.tag(200, 50, '20 s pour prendre le trésor', {s: 10}).n(1, 'A est couché sur le ballon ; B le fait rouler ou glisse les mains dessous (jamais par la tête)').n(2, 'on inverse'); },
    salut: g => { g.hall(); g.ring('a', 10, 200, 145, 125, 70); g.P(200, 145); return g.tag(200, 35, '🙇 salut · position de l\'enfant · chat-vache', {s: 9.5}).n(1, 'étirements doux du dos, des épaules et de la nuque').n(2, 'un élève redit les règles ; chacun nomme un partenaire respectueux'); },
    coqs: g => { prof(g); g.fig(170, 205, 'accroupi', {s: 1.8}).fig(232, 205, 'accroupi', {s: 1.8, t: 'b', r: 1}); return g.tag(200, 50, 'paumes contre paumes', {s: 10}).n(1, 'en poussant ou en esquivant avec les mains, faire perdre l\'équilibre à l\'autre').n(2, 'mains ou fesses au sol = 1 point ; 3 points et on change'); },
    sumo: g => { g.hall(); for (let i = 0; i < 12; i++){ const a = i / 12 * 2 * Math.PI; g.disc(200 + 90 * Math.cos(a), 125 + 90 * Math.sin(a)); } g.A(180, 125).B(220, 125).run(232, 125, 290, 125, 0); return g.label(200, 238, 'cercle de coupelles', {s: 9.5, b: 1}).n(1, 'debout, mains sur les épaules : faire sortir l\'autre du cercle en poussant ou en tirant').n(2, 'jambes fléchies, dos droit ; 30 s puis on change'); },
    roitapis: g => tapis4(g, (x, y, i) => g.ring('a', 4, x, y, 30, 22, {c: EQ[i]})).n(1, 'à genoux, chacun essaie de faire sortir les autres du tapis').n(2, 'le dernier sur le tapis gagne 1 point ; reprises de 45 s'),
    planche: g => { prof(g); g.fig(160, 205, 'allonge', {s: 1.8}).fig(260, 205, 'genou', {s: 1.8, t: 'b', r: 1}).rot(200, 160, 165, 140, -20); return g.tag(200, 50, '15 s pour retourner la planche', {s: 10}).n(1, 'A allongé sur le ventre, gainé ; B le retourne sur le dos').n(2, 'puis A à 4 pattes ; on inverse'); },
    tire: g => { g.hall(); g.line('M90 40V210M310 40V210', 3, '#e11d48'); g.A(185, 80).B(215, 80).run(175, 80, 110, 80, 0).run(225, 80, 290, 80, 0).label(200, 60, 'assis dos à dos, bras crochetés', {s: 9, b: 1}); g.A(185, 170).B(215, 170).run(175, 170, 110, 170, 0).run(225, 170, 290, 170, 0).label(200, 150, 'debout, mains tenues', {s: 9, b: 1});
      return g.n(1, 'chacun essaie d\'entraîner l\'autre au-delà de sa ligne'); },
    chutes: g => { g.sol(205); [['roulade avant', 60, 'accroupi'], ['roulade arrière', 150, 'accroupi'], ['chute sur le côté', 245, 'allonge'], ['chute arrière', 340, 'assis']].forEach(([t, x, p], i) => g.fig(x, 205, p, {s: 1.3}).num(x, 130, i + 1).label(x, 115, t, {s: 9, b: 1}));
      return g.n(1, 'sur le côté, on tape le tapis avec le bras ; en arrière, menton rentré').n(2, 'puis par deux : A pousse doucement B, qui chute correctement'); },
    renverse: g => { prof(g); g.fig(120, 205, 'table', {s: 1.5}).fig(160, 205, 'genou', {s: 1.5, t: 'b', r: 1}).num(140, 120, 1).fig(280, 205, 'table', {s: 1.5}).fig(300, 205, 'genou', {s: 1.5, t: 'b', r: 1}).num(290, 120, 2).rot(250, 160, 300, 160, -20);
      return g.n(1, 'saisir le bras et la jambe du même côté et tirer vers soi').n(2, 'passer le bras sous le ventre et faire rouler l\'autre sur l\'épaule ; 5 essais chacun'); },
    tresor: g => tapis4(g, (x, y) => { g.ball(x, y, 'gros').A(x - 22, y, 'G').B(x + 40, y - 25).B(x + 40, y + 25); }).n(1, 'le gardien (à genoux) défend le trésor ; deux voleurs à genoux essaient de le sortir du tapis').n(2, 'un voleur renversé revient au bord ; on tourne toutes les 45 s'),
    immo: g => { prof(g); g.fig(180, 205, 'allonge', {s: 1.8, r: 1}).fig(185, 190, 'planche', {s: 1.4, t: 'b'}).J(320, 150, 'A').tag(320, 110, '« 1, 2, 3, 4, 5 ! »', {s: 10});
      return g.n(1, 'en travers du partenaire, poitrine contre poitrine ; un bras entoure son bras, l\'autre sous son épaule (jamais autour du cou)').n(2, 'l\'arbitre compte 5 s à voix haute'); },
    degage: g => { prof(g); g.fig(180, 205, 'allonge', {s: 1.8, r: 1}).fig(185, 190, 'planche', {s: 1.4, t: 'b'}).rot(150, 165, 120, 130, 20); return g.tag(200, 50, '15 s pour s\'évader : pont ou retournement', {s: 10}).n(1, 'B pousse sur les pieds et roule sur l\'épaule, ou se retourne sur le ventre').n(2, 'évasion réussie = 1 point'); },
    enchaine: g => { prof(g); g.fig(110, 205, 'table', {s: 1.4}).fig(140, 205, 'genou', {s: 1.4, t: 'b', r: 1}).arrow('run', 170, 150, 230, 150, 0).fig(290, 205, 'allonge', {s: 1.4, r: 1}).fig(295, 193, 'planche', {s: 1.1, t: 'b'});
      return g.tag(200, 50, 'renverser = 1 point · renverser + immobiliser 5 s = 2 points', {s: 9}).n(1, 'départ à 4 pattes / à genoux ; reprises de 45 s'); },
    'Les règles du combat': g => { zone(g); g.A(180, 125).B(220, 125).J(200, 60, 'A'); ['sortie de la zone = 1 point à l\'autre', 'renversement = 1 point', 'immobilisation 5 s = 2 points'].forEach((t, i) => g.tag(200, 165 + i * 22, t, {s: 9.5})); return g.n(1, 'combat au sol, départ à genoux, 1 min 30 ; l\'arbitre dit « allez », « stop » et montre le score'); },
    poules: g => tapis4(g, (x, y, i) => { g.A(x - 12, y, '', {c: EQ[i]}).A(x + 12, y, '', {c: EQ[i]}).J(x, y - 32, 'A').A(x + 55, y + 25, '', {c: '#9aa3a0'}).sheet(x + 75, y + 25); }).n(1, 'poules de 4 de gabarit proche : chacun lutte contre les 3 autres').n(2, 'ceux qui ne luttent pas arbitrent et tiennent la fiche ; salut avant et après'),
    'Le tribunal de l\'arbitre': g => { zone(g); g.A(180, 110).B(220, 110).J(200, 70, 'A'); g.row('g', 8, 60, 240, 340, 240); return g.tag(200, 160, 'la classe vote la bonne décision', {s: 10}).n(1, 'chaque poule rejoue une situation difficile à arbitrer'); },
    'Épreuve 1 : les gestes': g => { prof(g); g.fig(110, 205, 'table', {s: 1.4}).fig(140, 205, 'genou', {s: 1.4, t: 'b', r: 1}).fig(270, 205, 'allonge', {s: 1.4, r: 1}).fig(275, 193, 'planche', {s: 1.1, t: 'b'}).P(360, 150).sheet(360, 180); return g.n(1, 'par 3 : renversements, immobilisation, dégagements devant le prof'); },
    'Épreuve 2 : combats arbitrés': g => tapis4(g, (x, y, i) => g.A(x - 12, y, '', {c: EQ[i]}).A(x + 12, y, '', {c: EQ[i]}).J(x, y - 32, 'A')).n(1, 'poules de gabarit proche ; chacun arbitre au moins un combat')
  };
})();
