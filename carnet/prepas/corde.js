/* Corde à sauter en jeux (jeux divers) : un seul cycle de 6 leçons (5 + l'évaluation), le même pour toutes les années.
   Format « jeux » (voir carnet/prepa-moteur.js). Une corde par élève (pieds sur la corde, poignées aux aisselles), 2 grandes cordes.
   Idées mêlées et réécrites : classeur EPS, jeux de cour (le serpent, la vague, le métro, l'horloge), défis chronométrés,
   bingo des figures, double dutch d'initiation, enchaînements en musique. Exigences plus basses en 1 h, plus hautes avec les grands. */
(() => {
const A = {th: 'Corde à sauter : sauter en rythme, enchaîner des figures, sauter à plusieurs et créer un enchaînement', comp: ['HME1', 'HME3', 'HME4', 'GSS1'], l: [
  {t: 'Régler sa corde et sauter à pieds joints', o: 'Régler sa corde, la faire tourner avec les poignets et sauter à pieds joints, en rythme, sur l\'avant des pieds.',
   e: [['reglage', 6], ['serpent', 7]],
   c: [['trente', 15, '', 'Mon score augmente entre le 1er et le 3e essai.', 'Ceux qui bloquent sautent d\'abord la corde posée au sol, puis la font passer devant eux.'],
    ['chef', 16, 'Figures du jour : pieds joints, petit rebond, sauts lents puis rapides.', 'Je suis le chef sans m\'arrêter.', 'Le chef change toutes les 4 figures.'],
    ['classe', 15, 'Premier record de la classe.', 'La classe a un premier record.', '']],
   x: [['dernier', 15, '', 'Je reste en jeu au moins 1 min.', '']],
   r: [['bilan', 7]]},
  {t: 'Varier les appuis : course, cloche, slalom', o: 'Sauter en changeant d\'appuis (pied à pied, d\'avant en arrière, de gauche à droite) sans perdre le rythme.',
   e: [['vague', 6], ['lacorde', 7]],
   c: [['bingo', 18, 'Figures de la grille : course sur place, cloche-pied droit et gauche, slalom (gauche-droite), ski (avant-arrière), talon devant.', 'Mon groupe fait une ligne de bingo.', 'Les grilles des grands ont le croisé et le double saut.'],
    ['nombre', 14, '', 'Je fais le nombre exact {4|3} fois.', ''],
    ['relais', 14, 'En courant à la corde (pas de course).', 'Mon équipe finit le relais sans tomber.', '']],
   x: [['trente', 15, 'En course sur place.', 'Je bats mon score.', '']],
   r: [['bilan', 7]]},
  {t: 'La grande corde', o: 'Entrer, sauter et sortir d\'une grande corde tournée par deux camarades ; tourner régulièrement.',
   e: [['serpent', 6], ['vague', 7]],
   c: [['metro', 18, '', 'Mon équipe fait passer tout le monde sans arrêter la corde.', 'Chaque passager fait 1 saut, puis 2, puis 3 avant de sortir.'],
    ['horloge', 14, '', 'Je fais l\'horloge jusqu\'à {12|6} h.', 'Deux sauteurs en même temps.'],
    ['classe', 14, 'Record en grande corde : combien de sauteurs ensemble ?', 'La classe bat son record.', '']],
   x: [['dutch', 15, 'Première découverte pour les volontaires.', 'J\'entre dans les deux cordes.', '']],
   r: [['bilan', 7]]},
  {t: 'Sauter à deux et en musique', o: 'Sauter à deux dans la même corde ou côte à côte, en se synchronisant sur la musique.',
   e: [['lacorde', 6], ['serpent', 7]],
   c: [['jumeaux', 16, '', 'Notre duo fait {10|6} sauts ensemble.', 'Le passager entre pendant que la corde tourne.'],
    ['miroir', 15, '', 'Le public ne voit pas qui mène.', ''],
    ['chef', 15, 'En musique, changement de figure toutes les 8 temps.', 'Je change de figure sur le temps.', '']],
   x: [['metro', 15, 'Par deux dans la grande corde.', 'Notre duo passe sans arrêter la corde.', '']],
   r: [['bilan', 7]]},
  {t: 'Préparer son enchaînement', o: 'Construire et répéter un enchaînement de 6 × 8 temps avec au moins 4 figures, dont une à deux ou en grande corde.',
   e: [['vague', 6], ['trente', 7, 'Test de forme du jour.']],
   c: [['recette', 18, '', 'Tous les ingrédients sont dans notre enchaînement.', 'Ajouter un ingrédient tiré au sort.'],
    ['Répétition en musique', 16, 'Un élève compte « 5, 6, 7, 8 » pour lancer ; on répète sans s\'arrêter, même après une erreur.', 'Notre enchaînement va jusqu\'au bout.', '', 'corde::deux', 'g4'],
    ['groupemiroir', 12, '', 'Mon groupe applique le vœu.', '']],
   x: [['dernier', 15, '', 'Je reste en jeu au moins 1 min.', '']],
   r: [['bilan', 7]]},
  {t: 'Évaluation : saut de base, figures et enchaînement', o: 'Montrer la qualité du saut de base, la variété des figures et un enchaînement à plusieurs en musique.',
   crit: [['Saut de base : 30 s', 5, '5 : 60 sauts ou plus · 4 : 50-59 · 3 : 40-49 · 2 : 25-39 · 1 : moins de 25'], ['Figures maîtrisées (5 sauts de suite chacune)', 5, '1 point par figure réussie : course, cloche, slalom, croisé, sur un pied, double saut…'], ['Enchaînement : continuité', 4, '4 : sans arrêt · 3 : 1 arrêt · 2 : 2-3 arrêts · 1 : plus de 3'], ['Enchaînement : rythme et musique', 3, '3 : toujours sur la musique · 2 : souvent · 1 : rarement'], ['Partie à deux ou en grande corde', 3, '3 : réussie du premier coup · 2 : après un essai · 1 : tentée']],
   e: [['lacorde', 6], ['vague', 7]],
   c: [['Épreuve 1 : 30 s et figures', 14, 'Par deux : 30 s de saut de base compté par le partenaire, puis 5 sauts de chaque figure montrée.', '', '', 'corde::deux', 'p'],
    ['Épreuve 2 : enchaînements', 24, 'Chaque groupe présente en musique ; le prof observe avec la grille.', '', '', 'corde::deux', 'g4']],
   r: [['bilan', 6]]}
]};
PREPA_JEUX({id: 'corde', sport: 'Corde à sauter', divers: true,
mat: [['corde à sauter (à sa taille)', 1, 'cordes'], ['grande corde de 6 à 8 m', 2, 'cordes'], ['coupelle', 12, 'plots'], ['enceinte et musique'], ['chronomètre', 2], ['fiche de figures et crayon', 0.25]],
sal: {
  g: {note: 'chacun a 2 m autour de lui : on se met en quinconce sur tout le terrain ; les grandes cordes dans les deux moitiés.'},
  p: {note: 'petite pour sauter tous ensemble : la moitié de la classe saute, l\'autre compte et observe, puis on change. Une seule grande corde.', warn: 'Petite salle : jamais plus de 12 sauteurs en même temps (les cordes se croisent).'},
  b: {note: 'en quinconce sur le terrain de basket. Cordes à apporter de la Grande salle.'},
  c: {note: 'dehors : parfait pour la corde. Sol dur : baskets bien lacées, sauts petits, sur l\'avant des pieds.', warn: 'Dehors sur le dur : pas plus de 30 s de sauts intenses d\'affilée pour ménager les tibias.'}
},
J: {
  reglage: {n: 'Le réglage et la règle des 2 m', k: 'coop', s: 'explication', d: 'En demi-cercle : chacun pose les pieds au milieu de sa corde, les poignées arrivent aux aisselles (sinon on fait un nœud). Règles : 2 m d\'écart entre deux sauteurs, la corde reste au sol quand on ne saute pas. Puis petits sauts sans corde sur la musique.'},
  serpent: {n: 'Le serpent', k: 'opp', s: 'corde::grande', f: 'g6', d: 'Deux élèves agitent une grande corde au ras du sol comme un serpent ; les autres sautent par-dessus sans se faire piquer les pieds. Piqué = on prend la place d\'un agitateur. Le serpent devient de plus en plus nerveux.'},
  vague: {n: 'La vague', k: 'opp', s: 'corde::grande', f: 'g8', d: 'Deux élèves balancent une grande corde de gauche à droite (sans faire le tour), de plus en plus haut ; les autres sautent par-dessus l\'un après l\'autre en file, sans s\'arrêter. On monte la vague à chaque tour réussi.'},
  lacorde: {n: 'La corde hélico', k: 'coop', s: 'corde::deux', d: 'Corde pliée en deux dans une main, on la fait tourner sur le côté (hélico) et on saute au moment où elle touche le sol, comme si on sautait dedans. Puis main gauche, puis les deux mains, puis on ouvre la corde et on saute vraiment.'},
  trente: {n: 'Le défi des 30 secondes', k: 'opp', s: 'corde::deux', f: 'p', d: 'Par deux : l\'un saute 30 s, l\'autre compte les sauts réussis et observe un critère (coudes près du corps ? petits sauts ?). On note son score sur la fiche, 3 essais chacun.'},
  chef: {n: 'Le chef de la corde', k: 'coop', s: 'corde::deux', f: 'g5', d: 'En groupe, chacun sa corde : le chef fait une figure, les autres la copient en même temps. Au signal (ou à chaque erreur du chef), le chef change. On ne s\'arrête jamais de sauter.'},
  classe: {n: 'Le record de la classe', k: 'coop', s: 'corde::deux', d: 'Tout le monde saute 1 min en même temps ; chacun compte ses sauts et on additionne (au tableau). À chaque leçon, la classe essaie de battre son record : aider un camarade qui bloque fait monter le total.'},
  dernier: {n: 'Le dernier sauteur', k: 'opp', s: 'corde::deux', d: 'Tout le monde saute sur la musique ; le prof annonce une figure toutes les 10 s. Celui qui rate la figure ou s\'arrête s\'assoit et devient juge. Le dernier debout gagne ; on rejoue avec des figures plus faciles pour que d\'autres gagnent.'},
  bingo: {n: 'Le bingo des figures', k: 'coop', s: 'corde::deux', f: 'g3', d: 'Chaque groupe a une grille de 9 figures. Une figure validée (5 sauts de suite, vus par un camarade) = une case cochée. Une ligne = « bingo ! » : on crie, on montre la ligne au prof, puis on vise la grille complète.'},
  nombre: {n: 'Le nombre exact', k: 'opp', s: 'corde::deux', f: 'p', d: 'Le partenaire annonce un nombre (de 3 à 15) : on doit faire exactement ce nombre de sauts et bloquer la corde sous ses pieds au dernier. Exact = 1 point. Puis on combine : 5 pieds joints + 5 cloche-pied.'},
  relais: {n: 'Le relais sauteur', k: 'opp', s: 'files', f: 'e4', d: 'Relais par équipes sur 15 m : on avance en sautant à la corde jusqu\'au cône, on revient et on passe la corde au suivant. Corde emmêlée = on repart de l\'endroit où on s\'est arrêté.'},
  metro: {n: 'Le métro', k: 'coop', s: 'corde::grande', f: 'g6', d: 'Une grande corde tourne sans arrêt (2 tourneurs qui comptent à voix haute). Les passagers entrent l\'un après l\'autre, font un saut et sortent de l\'autre côté, comme dans un métro qui ne s\'arrête jamais. Si la corde s\'arrête, on recommence le décompte.'},
  horloge: {n: 'L\'horloge', k: 'opp', s: 'corde::grande', f: 'g6', d: 'Grande corde : le sauteur entre et fait 1 saut (1 h), sort ; puis entre et fait 2 sauts (2 h)… jusqu\'à midi. Une faute = on passe la main et on reprend à son heure au prochain tour. Qui arrive le premier à midi ?'},
  dutch: {n: 'Le double dutch', k: 'coop', s: 'corde::grande', f: 'g4', d: 'Deux grandes cordes tournées en sens inverse (un tourneur à chaque bout, une corde dans chaque main). D\'abord les tourneurs s\'entraînent à garder le rythme « tic-tac » ; puis on entre au moment où la corde du fond monte, et on saute en petits pas de course.'},
  jumeaux: {n: 'Les jumeaux', k: 'coop', s: 'corde::deux', f: 'p', d: 'Par deux dans la même corde : l\'un tourne, l\'autre est face à lui (ou derrière lui). Puis côte à côte, chacun tient une poignée de la même corde avec sa main extérieure. On compte les sauts ensemble à voix haute.'},
  miroir: {n: 'Le miroir sauteur', k: 'coop', s: 'corde::deux', f: 'p', d: 'Par deux face à face, chacun sa corde : l\'un mène (figures, vitesse), l\'autre copie en même temps. On change de meneur toutes les 8 temps de musique. Le but : qu\'on ne voie pas qui mène.'},
  recette: {n: 'La recette de l\'enchaînement', k: 'coop', s: 'corde::deux', f: 'g4', d: 'Par groupes de 3 ou 4, 6 × 8 temps en musique avec les ingrédients : un début figé, 4 figures différentes, un passage à deux (ou en grande corde), un moment en canon, une fin figée. On l\'écrit sur la fiche.'},
  groupemiroir: {n: 'Le groupe-miroir', k: 'fp', s: 'corde::deux', f: 'g4', d: 'Deux groupes se montrent leur enchaînement et se donnent 2 « étoiles » (ce qui est réussi) et 1 « vœu » (un conseil). Puis on répète en appliquant le vœu.'},
  bilan: {n: 'Le mollet heureux', k: 'fp', s: 'etirements', d: 'Étirements des mollets, des chevilles et des épaules (on en a besoin !). Chacun dit son meilleur score et la figure qu\'il veut réussir la prochaine fois. Applaudissements pour le plus gros progrès du jour.'}
},
an: {1: A, 2: A, 3: A, 4: A, 5: A, 6: A}});
})();

/* ===== Schémas de chaque jeu (sauteurs vus de profil ; la corde est dessinée en rose) ===== */
(window.PSCH_SC = window.PSCH_SC || {}).corde = (() => {
  const EQ = ['#1f63d6', '#e8590c', '#16a34a', '#8a3ffc'], RC = '#c2185b';
  const sol = (g, y = 210) => { g.floor(); return g.raw(`<path d="M10 ${y}H390" stroke="#cbbfa8" stroke-width="3"/>`, 'bg'); };
  // sauteur avec sa corde (k = 1 échelle) ; o.haut : corde au-dessus de la tête
  const saut = (g, x, y, o = {}) => { const k = o.s || 1, c = o.c; g.fig(x, y - 6 * k, 'debout', {s: k, c, t: o.t});
    g.raw(`<path d="M${x - 8 * k} ${y - 23 * k}C${x - 26 * k} ${o.haut ? y - 80 * k : y + 14 * k} ${x + 26 * k} ${o.haut ? y - 80 * k : y + 14 * k} ${x + 8 * k} ${y - 23 * k}" fill="none" stroke="${RC}" stroke-width="2.5"/>`, 'top');
    return o.lab ? g.label(x, y + 14, o.lab, {s: 8.5, b: 1}) : g; };
  // grande corde : tourneurs aux deux bouts
  const grande = (g, x1, x2, y, o = {}) => { g.fig(x1, y, 'pareur', {s: 1.2, c: '#6b7280'}).fig(x2, y, 'pareur', {s: 1.2, r: 1, c: '#6b7280'});
    const ya = y - 30, sag = o.sag ?? 40; g.raw(`<path d="M${x1 + 15} ${ya}Q${(x1 + x2) / 2} ${ya + sag} ${x2 - 15} ${ya}" fill="none" stroke="${RC}" stroke-width="3"/>`, 'top');
    if (o.ret !== false) g.raw(`<path d="M${x1 + 15} ${ya}Q${(x1 + x2) / 2} ${ya - 70} ${x2 - 15} ${ya}" fill="none" stroke="${RC}" stroke-width="2" stroke-dasharray="5 4" opacity=".7"/>`, 'top');
    return g.label(x1, y + 14, 'tourneur', {s: 8.5}).label(x2, y + 14, 'tourneur', {s: 8.5}); };
  const calme = (g, T) => { g.hall(); g.ring('a', 8, 200, 140, 125, 70); g.sheet(200, 140); T.forEach((t, i) => g.tag(200, 28 + i * 22, t, {s: 9.5})); return g; };
  return {
    reglage: g => { sol(g); g.fig(110, 210, 'debout', {s: 2}).raw('<path d="M96 175Q100 214 110 214Q120 214 124 175" fill="none" stroke="#c2185b" stroke-width="3"/><path d="M96 175V150M124 175V150" stroke="#2d3530" stroke-width="5" stroke-linecap="round"/>', 'top');
      g.label(160, 150, '← poignées aux aisselles', {s: 9.5, b: 1, a: 'start'}).label(160, 205, '← pieds au milieu de la corde', {s: 9.5, b: 1, a: 'start'});
      saut(g, 270, 210, {s: .9}); saut(g, 360, 210, {s: .9}); g.raw('<path d="M280 150H350M280 145V155M350 145V155" stroke="#2d3530" stroke-width="1.5"/>', 'top').label(315, 142, '2 m', {s: 10, b: 1});
      return g.n(1, 'réglage : pieds au milieu de la corde, poignées aux aisselles (sinon un nœud)').n(2, '2 m entre deux sauteurs ; la corde reste au sol quand on ne saute pas'); },
    serpent: g => { g.hall(); g.fig; g.A(40, 125, 'T').A(360, 125, 'T').raw('<path d="M50 125C90 95 120 155 160 125S230 95 260 125S320 155 350 125" fill="none" stroke="#c2185b" stroke-width="3"/>', 'mid');
      g.pls('a', [[100, 80], [200, 170], [290, 85], [140, 175], [250, 175]]); g.lob(200, 160, 200, 95, 30);
      return g.label(200, 30, 'la corde agitée au ras du sol', {s: 9.5, b: 1}).n(1, 'on saute par-dessus le serpent sans se faire piquer les pieds').n(2, 'piqué = on prend la place d\'un agitateur (T)'); },
    trente: g => { sol(g); saut(g, 120, 210, {s: 1.6}); g.fig(250, 210, 'debout', {s: 1.6, t: 'b'}).sheet(280, 160).chrono(280, 130).label(250, 230, 'compte et observe', {s: 9, b: 1});
      return g.n(1, 'l\'un saute 30 s, l\'autre compte les sauts réussis et observe un critère (coudes près du corps ? petits sauts ?)').n(2, '3 essais chacun, score noté sur la fiche'); },
    chef: g => { sol(g); saut(g, 80, 210, {s: 1.3, t: 'j', c: '#16a34a'}).label(80, 228, 'le chef', {s: 9, b: 1}); [160, 230, 300, 360].forEach(x => saut(g, x, 210, {s: 1.1}));
      return g.n(1, 'le chef fait une figure, les autres la copient en même temps').n(2, 'au signal (ou à chaque erreur du chef), le chef change ; on ne s\'arrête jamais'); },
    classe: g => { sol(g); [50, 110, 170, 230, 290, 350].forEach(x => saut(g, x, 210)); return g.tag(200, 50, '1 min : on additionne les sauts de tous · record ?', {s: 10}).n(1, 'chacun compte ses sauts ; on additionne au tableau').n(2, 'aider un camarade qui bloque fait monter le total'); },
    dernier: g => { sol(g); [60, 130, 270, 340].forEach(x => saut(g, x, 210)); g.fig(200, 210, 'assis', {t: 'b'}).label(200, 228, 'raté : juge', {s: 9, b: 1}).P(200, 40).tag(200, 70, 'nouvelle figure toutes les 10 s', {s: 9.5});
      return g.n(1, 'celui qui rate la figure ou s\'arrête s\'assoit et devient juge ; le dernier debout gagne'); },
    bilan: g => calme(g, ['étirements : mollets · chevilles · épaules', 'mon meilleur score · la figure que je veux réussir']),
    vague: g => { g.hall(); g.A(60, 125, 'T').A(340, 125, 'T').raw('<path d="M70 125Q200 165 330 125" fill="none" stroke="#c2185b" stroke-width="3"/><path d="M70 125Q200 85 330 125" fill="none" stroke="#c2185b" stroke-width="2" stroke-dasharray="5 4"/>', 'mid');
      g.file('a', 3, 200, 200, 0, 16).arrow('run', 214, 195, 214, 60, 0).label(250, 30, 'on passe l\'un après l\'autre', {s: 9.5, b: 1}).rot(150, 165, 150, 90, 20);
      return g.n(1, 'la corde balance de gauche à droite (sans faire le tour), de plus en plus haut').n(2, 'on saute par-dessus en file, sans s\'arrêter'); },
    lacorde: g => { sol(g); g.fig(120, 204, 'debout', {s: 1.6}).raw('<path d="M132 176Q170 195 165 210" fill="none" stroke="#c2185b" stroke-width="3"/><ellipse cx="160" cy="207" rx="26" ry="5" fill="none" stroke="#c2185b" stroke-width="1.5" stroke-dasharray="4 3"/>', 'top');
      saut(g, 300, 210, {s: 1.5}); g.arrow('run', 190, 120, 250, 120, 0).label(120, 235, 'hélico sur le côté', {s: 9, b: 1}).label(300, 235, 'puis on ouvre la corde', {s: 9, b: 1});
      return g.n(1, 'corde pliée dans une main, on la fait tourner sur le côté et on saute quand elle touche le sol').n(2, 'main droite, main gauche, deux mains, puis on saute vraiment'); },
    bingo: g => { g.hall(); const F = ['course', 'cloche D', 'cloche G', 'slalom', 'ski', 'talon', 'croisé', 'arrière', 'double']; F.forEach((t, i) => { const x = 120 + (i % 3) * 60, y = 50 + Math.floor(i / 3) * 60; g.raw(`<rect x="${x - 28}" y="${y - 28}" width="56" height="56" fill="#fff" stroke="#2d3530" stroke-width="1.5"/>`, 'mid').label(x, y + 4, t, {s: 9}); });
      [0, 1, 2].forEach(i => g.label(120 + i * 60, 34, '✔', {s: 16, b: 1, c: '#16a34a'})); return g.tag(330, 50, 'BINGO !', {s: 12}).n(1, 'une figure validée = 5 sauts de suite vus par un camarade').n(2, 'une ligne = bingo ! puis on vise la grille complète'); },
    nombre: g => { sol(g); saut(g, 140, 210, {s: 1.5}); g.fig(260, 210, 'debout', {s: 1.5, t: 'b'}).tag(260, 120, '« 7 ! »', {s: 12}).label(140, 232, 'bloque la corde au 7e saut', {s: 9, b: 1});
      return g.n(1, 'exactement le nombre annoncé, la corde bloquée sous les pieds au dernier saut = 1 point').n(2, 'puis on combine : 5 pieds joints + 5 cloche-pied'); },
    relais: g => { g.hall(); [0, 1, 2, 3].forEach(i => { const y = 45 + i * 52; g.file('a', 3, 70, y, -20, 0, {c: EQ[i]}).cone(330, y).arrow('run', 85, y - 6, 320, y - 6, 0).arrow('run', 320, y + 8, 85, y + 8, 0); });
      return g.label(200, 240, '15 m en sautant à la corde', {s: 9.5, b: 1}).n(1, 'aller-retour en sautant, puis on passe la corde au suivant').n(2, 'corde emmêlée = on repart de l\'endroit où on s\'est arrêté'); },
    metro: g => { sol(g); grande(g, 70, 330, 210); saut; g.fig(200, 204, 'bras', {s: 1.3}).fig(120, 210, 'debout').arrow('run', 130, 200, 175, 200, 0).arrow('run', 225, 200, 290, 200, 0).label(200, 60, 'entre · un saut · sort', {s: 10, b: 1});
      return g.n(1, 'la grande corde tourne sans arrêt ; les tourneurs comptent à voix haute').n(2, 'chacun entre, fait un saut et sort de l\'autre côté'); },
    horloge: g => { sol(g); grande(g, 70, 330, 210); g.fig(200, 204, 'bras', {s: 1.3}); return g.tag(200, 60, '1 h = 1 saut · 2 h = 2 sauts … jusqu\'à midi', {s: 10}).n(1, 'une faute : on passe la main et on reprend à son heure au tour suivant'); },
    dutch: g => { sol(g); g.fig(70, 210, 'pareur', {s: 1.2, c: '#6b7280'}).fig(330, 210, 'pareur', {s: 1.2, r: 1, c: '#6b7280'}).raw('<path d="M85 180Q200 240 315 180" fill="none" stroke="#c2185b" stroke-width="3"/><path d="M85 180Q200 110 315 180" fill="none" stroke="#1f63d6" stroke-width="3"/>', 'top');
      g.fig(200, 204, 'debout', {s: 1.3, t: 'b'}); return g.tag(200, 50, '« tic - tac » : deux cordes en sens inverse', {s: 10}).n(1, 'les tourneurs gardent le rythme ; on entre quand la corde du fond monte').n(2, 'petits pas de course sur place'); },
    jumeaux: g => { sol(g); g.fig(110, 204, 'debout', {s: 1.4}).fig(140, 204, 'debout', {s: 1.4, t: 'b'}).raw('<path d="M100 175C80 225 160 225 150 175" fill="none" stroke="#c2185b" stroke-width="2.5"/>', 'top').label(125, 232, 'face à face', {s: 9, b: 1});
      g.fig(270, 204, 'debout', {s: 1.4}).fig(300, 204, 'debout', {s: 1.4, t: 'b'}).raw('<path d="M258 175C240 225 330 225 312 175" fill="none" stroke="#c2185b" stroke-width="2.5"/>', 'top').label(285, 232, 'côte à côte', {s: 9, b: 1});
      return g.n(1, 'par deux dans la même corde ; on compte les sauts ensemble à voix haute'); },
    miroir: g => { sol(g); saut(g, 140, 210, {s: 1.4}); saut(g, 260, 210, {s: 1.4, t: 'b'}); g.raw('<path d="M200 90V210" stroke="#8a3ffc" stroke-width="2" stroke-dasharray="4 4"/>', 'mid'); return g.n(1, 'face à face : l\'un mène (figures, vitesse), l\'autre copie en même temps').n(2, 'on change de meneur toutes les 8 temps'); },
    recette: g => { sol(g); [80, 150, 220].forEach(x => saut(g, x, 210)); g.sheet(320, 150).music(320, 60); return g.tag(160, 50, 'début figé · 4 figures · à deux · canon · fin figée', {s: 9}).n(1, '6 × 8 temps en musique, écrits sur la fiche'); },
    'Répétition en musique': g => { sol(g); [80, 150, 220, 290].forEach(x => saut(g, x, 210)); g.music(360, 60).J(360, 150, '5'); return g.n(1, 'un élève compte « 5, 6, 7, 8 » ; on répète sans s\'arrêter, même après une erreur'); },
    groupemiroir: g => { sol(g); [70, 130, 190].forEach(x => saut(g, x, 210)); [280, 345].forEach(x => saut(g, x, 210, {t: 'b'})); return g.tag(200, 50, '⭐⭐ deux étoiles · 🙏 un vœu', {s: 10}).n(1, 'deux groupes se montrent leur enchaînement, puis on répète en appliquant le vœu'); },
    'Épreuve 1 : 30 s et figures': g => { sol(g); saut(g, 120, 210, {s: 1.6}); g.fig(250, 210, 'debout', {s: 1.6, t: 'b'}).chrono(285, 130).P(360, 200).sheet(340, 200); return g.n(1, '30 s de saut de base compté par le partenaire, puis 5 sauts de chaque figure'); },
    'Épreuve 2 : enchaînements': g => { sol(g); [80, 150, 220].forEach(x => saut(g, x, 210)); g.music(320, 60).P(330, 200).sheet(355, 200); return g.n(1, 'chaque groupe présente en musique ; le prof observe avec la grille'); }
  };
})();
