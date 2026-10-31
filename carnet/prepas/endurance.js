/* Course d'endurance en jeux : 6 leçons par année (1re → 6e secondaire), la 6e = évaluation.
   Format « jeux » (voir carnet/prepa-moteur.js). Toujours dehors, sur la grande plaine (taille d'un terrain de foot).
   Idées mêlées et réécrites : classeur EPS, jeux d'endurance (morpion en relais, poker du coureur, scrabble, tour de France,
   locomotive, course au pronostic), méthodes d'entraînement (plots d'allure, fractionné, pyramide, fartlek, VMA).
   Principe : on court longtemps sans s'en rendre compte, parce qu'on joue ; l'allure régulière gagne toujours. */
PREPA_JEUX({id: 'endurance',
sport: 'Course d\'endurance',
mat: [['cône', 30, 'cones'], ['coupelle', 40, 'plots'], ['chasuble (4 couleurs)', 1, 'chasubles'], ['chronomètre', 4], ['sifflet'], ['jeu de cartes', 2], ['cerceau', 9, 'cerceaux'], ['dé', 4], ['fiche de suivi et crayon', 0.5]],
lieu: {n: 'La plaine', d: 'une grande plaine de la taille d\'un terrain de foot, dehors', pre: 'À emporter sur la plaine : ', tk: {boucle: 'la boucle de 300 m tracée avec des cônes autour de la plaine'}, note: 'une boucle balisée autour de la plaine (cônes tous les 25 m, environ 300 m le tour) ; le centre sert aux jeux et au matériel.', warn: 'Gourdes au bord de la plaine. Par forte chaleur : boucles plus courtes et pauses à l\'ombre ; par pluie : on garde la boucle, on raccourcit les jeux.'},
J: {
  locomotive: {n: 'La locomotive', k: 'coop', s: 'piste', f: 'g5', d: 'Par groupes de 4 à 6 en file indienne, on trottine sur {boucle}. Le dernier remonte toute la file en accélérant et devient la locomotive. On ne s\'arrête jamais : l\'allure du groupe reste celle où l\'on peut parler.'},
  parler: {n: 'Je cours, je parle', k: 'coop', s: 'piste', f: 'p', d: 'Par deux, on trottine en discutant (sujet tiré au sort : vacances, film, animal préféré…). Si l\'un n\'arrive plus à parler, on ralentit : c\'est l\'allure d\'endurance.'},
  chatcouleurs: {n: 'Le chat des couleurs', k: 'opp', s: 'chat', d: 'Sur un grand carré du centre de la plaine, {n/8 chat} avec une chasuble. Un joueur touché fait un tour de carré en trottinant puis revient. Toutes les minutes, les chats changent.'},
  miroir: {n: 'L\'ombre', k: 'coop', s: 'deux', f: 'p', d: 'Par deux, l\'un derrière l\'autre : celui de devant change d\'allure, de direction, ajoute un saut ou un pas chassé ; l\'ombre copie tout. On change toutes les 1 min 30.'},
  morpion: {n: 'Le morpion en relais', k: 'coop', s: 'piste', f: 'e4', d: 'Un grand morpion de 9 cerceaux au centre ; chaque équipe a 3 chasubles de sa couleur. Tout le monde court en même temps : on fait une petite boucle (un côté de la plaine), puis on peut poser ou déplacer UNE chasuble de son équipe et on repart aussitôt. Personne n\'attend. Trois alignés = 1 point, on vide et on recommence.'},
  poker: {n: 'Le poker du coureur', k: 'opp', s: 'piste', f: 'g4', d: 'Des cartes face cachée au centre. Chaque tour de boucle complet donne le droit de piocher une carte. Au bout du temps, chacun montre sa meilleure main de 5 cartes (paire, couleur, suite…). Plus on fait de tours réguliers, plus on a de choix.'},
  scrabble: {n: 'Le scrabble des coureurs', k: 'coop', s: 'piste', f: 'e4', d: 'Des lettres (cartons) au bout de la plaine. Chaque coureur rapporte une lettre par aller-retour à son équipe, qui forme le mot le plus long possible. On peut rapporter une lettre pour l\'échanger.'},
  tresor: {n: 'La chasse au trésor', k: 'coop', s: 'piste', f: 'e4', d: 'Des cônes de couleurs sont posés partout sur la plaine, avec un chiffre dessous. Chaque équipe a une liste de 10 cônes à trouver et note les chiffres. On court seul ou par deux, jamais en marchant. Première équipe avec les 10 chiffres justes.'},
  plots: {n: 'Les plots d\'allure', k: 'coop', s: 'piste', f: 'g4', d: 'Des coupelles tous les 25 m sur {boucle}. Le prof siffle à intervalle régulier (toutes les 9 à 15 s selon les groupes) : à chaque coup de sifflet, on doit passer à côté d\'une coupelle. En avance, on ralentit ; en retard, on accélère. Chaque groupe choisit son allure.'},
  pronostic: {n: 'La course au pronostic', k: 'fp', s: 'piste', f: 'p', d: 'Avant de courir, chacun annonce combien de tours il fera en {6|4} min (ou en combien de temps il fera 2 tours). Pas de montre ! Le partenaire compte. Celui qui est le plus près de son pronostic gagne, pas le plus rapide.'},
  de: {n: 'Le dé de l\'endurance', k: 'coop', s: 'piste', f: 'p', d: 'Par deux, un dé : on lance, on court autant de côtés de la plaine (ou de quarts de boucle) que le chiffre. Le partenaire relance et part dès qu\'on revient. Le duo additionne ses côtés : record de la leçon ?'},
  duo: {n: 'Le relais en duo', k: 'coop', s: 'piste', f: 'p', d: 'Par deux pendant {10|6} min : A court une boucle pendant que B récupère en marchant ; quand A revient, B part. Le duo compte ses boucles. Le but : le même temps à chaque boucle.'},
  tourfrance: {n: 'Le tour de France', k: 'fp', s: 'piste', f: 'e4', d: 'Chaque leçon est une étape. Maillot jaune : équipe qui fait le plus de tours ; maillot vert : la plus régulière (temps au tour proches) ; maillot à pois : la plus encourageante (vote des autres équipes). Le classement général est affiché.'},
  horloge: {n: 'Le chrono dans la tête', k: 'fp', s: 'piste', f: 'g4', d: 'Sans montre, chacun court et revient se poser au centre quand il pense que {4|3} min sont passées. Le prof annonce l\'écart de chacun. Le plus précis gagne. Puis on recommence en courant plus vite.'},
  fractionne: {n: 'Le fractionné des lièvres', k: 'opp', s: 'piste', f: 'g4', d: '30 s vite / 30 s trottinée, 6 à 10 fois. Pendant le « vite », chacun essaie d\'aller un cône plus loin que la fois précédente. Pendant le « lent », on récupère en trottinant (jamais en marchant).'},
  pyramide: {n: 'La pyramide', k: 'coop', s: 'piste', f: 'g4', d: '1 min, 2 min, 3 min, 2 min, 1 min de course à allure soutenue, avec 1 min de trot entre chaque. On garde la même allure du début à la fin : le prof annonce le cône d\'arrivée attendu.'},
  fartlek: {n: 'Le fartlek des montagnes russes', k: 'coop', s: 'piste', f: 'g4', d: 'On court en suivant les ordres du « guide » (un élève qui change toutes les 2 min) : « montée » = accélération, « descente » = trot, « plat » = allure normale, « tunnel » = pas chassés. 8 à 12 min sans s\'arrêter.'},
  orientation: {n: 'La course d\'orientation', k: 'coop', s: 'piste', f: 'g3', d: 'Une carte de la plaine avec 10 balises (cônes avec un code). Par groupes, on court de balise en balise et on note les codes ; on ne marche jamais. Chaque balise trouvée rapporte 1 point, 2 si elle est loin.'},
  pouls: {n: 'Le pouls-mètre', k: 'coop', s: 'explication', d: 'On prend son pouls 15 s (au cou ou au poignet) × 4. Au repos, après le trot, après le jeu rapide. On note sur la fiche et on compare : à quelle allure mon cœur est-il « dans la zone d\'endurance » (je peux parler) ?'},
  bilan: {n: 'Le cercle des coureurs', k: 'fp', s: 'etirements', d: 'Marche lente, puis étirements des mollets, des cuisses et des hanches en cercle. Chacun note sur sa fiche : tours, sensations (facile, moyen, dur). Applaudissements pour le plus régulier et le plus encourageant.'},
  respire: {n: 'La respiration du coureur', k: 'coop', s: 'etirements', d: 'Allongés dans l\'herbe (ou assis), on respire : 4 temps pour inspirer, 6 pour expirer, main sur le ventre. On sent le cœur ralentir. Puis étirements lents.'},
  feu: {n: 'Le feu tricolore', k: 'coop', s: 'piste', d: 'Tout le monde trottine sur la boucle. Le prof montre une couleur : vert = allure « je peux parler », orange = allure « je peux juste dire oui ou non », rouge = marche active, bleu = demi-tour. On découvre ses allures en jouant.'},
  atomes: {n: 'Les atomes', k: 'coop', s: 'libre', d: 'On trottine partout au centre de la plaine. Le prof crie un nombre : on forme le plus vite possible des groupes de ce nombre en se tenant par les épaules. Ceux qui restent seuls font un petit tour de cône et reviennent dans le jeu. Puis le prof crie un nombre et une consigne (« 3, pas chassés ! »).'},
  bonjours: {n: 'La course des bonjours', k: 'coop', s: 'libre', d: 'On trottine partout sur la plaine en saluant chaque personne croisée d\'une façon différente annoncée par le prof : tape dans la main, check du coude, révérence, bonjour en néerlandais, en anglais, en langue des signes… On essaie de saluer toute la classe en 3 min sans jamais s\'arrêter.'},
  queues: {n: 'La chasse aux queues', k: 'opp', s: 'chat', d: 'Chacun glisse une chasuble à l\'arrière de son short. Dans un grand carré de la plaine, on essaie d\'arracher les queues des autres en gardant la sienne. Queue arrachée = 1 point ; celui qui a perdu la sienne fait un petit tour de cône, en reprend une au bac et repart. 1 min 30 par manche, en trottinant entre les attaques.'},
  ballonvoyageur: {n: 'Le ballon voyageur', k: 'coop', s: 'piste', f: 'g4', d: 'Par groupes de 4, on trottine ensemble sur la boucle en se passant un ballon (à la main) sans jamais s\'arrêter. À chaque cône, le ballon change de main ; il doit faire le tour du groupe avant le cône suivant. Ballon tombé = le groupe fait 5 sauts sur place et repart.'},
  statues: {n: 'Les statues du coureur', k: 'coop', s: 'libre', d: 'Musique : on trottine partout sur la plaine. Musique coupée : on se fige dans la pose annoncée (fente avant, équilibre sur un pied, genou levé, bras du coureur) et on tient 5 secondes sans bouger. Les poses deviennent des étirements dynamiques qui préparent les jambes.'},
  chifoumi: {n: 'Le chifoumi géant', k: 'opp', s: 'chat', f: 'e2', d: 'Deux équipes face à face au milieu de la plaine, chacune sa base à 20 m derrière elle. Chaque équipe choisit en secret pierre, feuille ou ciseaux et le montre au signal. L\'équipe gagnante poursuit l\'autre jusqu\'à sa base : chaque joueur touché change d\'équipe. Égalité = tout le monde fait un tour de cône.'},
  gammes: {n: 'Les gammes en vague', k: 'coop', s: 'piste', d: 'Toute la classe en ligne sur la largeur de la plaine. On traverse ensemble (30 m) avec un geste différent à chaque fois : montées de genoux, talons-fesses, pas chassés, foulées bondissantes, course arrière, puis une accélération progressive. Retour en trottinant.'},
  memory: {n: 'Le memory du coureur', k: 'coop', s: 'piste', f: 'e4', d: 'Des paires de cartes face cachée au bout de la plaine. Par équipe, chaque coureur fait une boucle (ou un aller-retour), retourne 2 cartes : paire trouvée = il la ramène, sinon il les recache. Tous les coureurs partent en même temps et l\'équipe s\'organise pour se souvenir des cartes vues. Toutes les paires trouvées = fin.'},
  lievre: {n: 'Le lièvre et les chiens', k: 'opp', s: 'piste', f: 'g5', d: 'Par groupes de 5 sur la boucle : un lièvre part avec 25 m d\'avance (une coupelle) et laisse tomber une coupelle tous les 50 m ; les 4 chiens courent ensemble et ramassent les coupelles. Le lièvre doit garder son avance 3 min : rattrapé, il devient chien. Tout le monde court tout le temps, à des allures différentes.'},
  oie: {n: 'Le jeu de l\'oie géant', k: 'coop', s: 'piste', f: 'e4', d: 'Un jeu de l\'oie dessiné sur une feuille au centre de la plaine. Par équipe : chaque coureur qui revient d\'une boucle lance le dé et fait avancer le pion de son équipe. Les cases spéciales donnent des défis (boucle en duo, 10 sauts, boucle à reculons sur 20 m…). Tous les coureurs sont sur la boucle en même temps.'},
  bingo: {n: 'Le bingo des balises', k: 'coop', s: 'piste', f: 'p', d: 'Chaque duo a une grille de bingo de 9 cases (des chiffres). Les chiffres sont écrits sur des cônes dispersés dans toute la plaine. Le duo court ensemble pour trouver les chiffres de sa grille et les coche : une ligne = « Bingo ! », on vient la montrer et on repart pour la grille complète.'},
  puzzle: {n: 'Le puzzle des coureurs', k: 'coop', s: 'piste', f: 'e4', d: 'Chaque équipe a un puzzle (une affiche découpée en 12 morceaux) dont les pièces sont cachées sous des cônes tout autour de la boucle. Chaque coureur rapporte une pièce par boucle. L\'équipe assemble le puzzle au centre : celle qui le termine d\'abord découvre l\'image… et le message caché.'},
  sommes: {n: 'La course aux nombres', k: 'coop', s: 'piste', f: 'e4', d: 'Des cartes avec des nombres (de 1 à 10) sont posées le long de la boucle. Chaque coureur rapporte une carte par boucle. L\'équipe doit atteindre exactement 50 points : si elle dépasse, il faut aller reposer une carte. On calcule en courant !'},
  handicap: {n: 'La course à handicap', k: 'fp', s: 'piste', f: 'g4', d: 'Chacun part d\'un cône différent selon son test (les plus lents devant, les plus rapides derrière), pour que tout le monde arrive en même temps au bout de 6 min si chacun court à son allure. Si le calcul est juste, la classe franchit la ligne en un seul peloton.'},
  elastique: {n: 'L\'élastique', k: 'coop', s: 'piste', f: 'g3', d: 'Par groupes de 3, on court sur la boucle pendant {8|6} min sans jamais être à plus de 5 m les uns des autres, comme reliés par un élastique. Le groupe se règle sur le plus lent et se parle pour garder une allure où tout le monde peut parler. Le prof vérifie les élastiques à chaque passage.'},
  tourmonde: {n: 'Le tour du monde', k: 'coop', s: 'piste', d: 'Une carte du monde au centre de la plaine. Chaque boucle courue par un élève fait avancer la classe d\'une étape (Bruxelles → Paris → Madrid → Rabat → Dakar…). On court à son allure, sans s\'arrêter : à la fin, jusqu\'où la classe est-elle allée ensemble ? On reprend le voyage la leçon suivante.'},
  'Prévu-réalisé : j\'ajuste': {n: 'Prévu-réalisé : j\'ajuste', k: 'coop', s: 'piste', f: 'p', d: 'Chacun relit les temps de sa séance précédente et change UNE seule chose (durée, allure ou récupération), l\'écrit, puis court sa séance. Le partenaire chronomètre et note : la nouvelle séance est-elle plus proche du prévu ?'},
  'Prévu-réalisé : je confirme': {n: 'Prévu-réalisé : je confirme', k: 'coop', s: 'piste', f: 'p', d: 'Dernière séance avant l\'évaluation : chacun court la séance qu\'il présentera, en entier, avec ses allures. Le partenaire note les temps et l\'écart avec le prévu ; on garde ce qui marche et on l\'écrit au propre.'}
},
an: {
1: {th: 'Courir longtemps sans s\'arrêter, à une allure régulière', comp: ['HME1', 'HME4', 'GSS1', 'GSS3'], l: [
  {t: 'Découvrir son allure', o: 'Courir sans s\'arrêter en pouvant parler avec un camarade.',
   e: [['chatcouleurs', 6],
    ['parler', 7]],
   c: [['morpion', 16, 'On court une boucle avant chaque pose : pas de sprint, on n\'aurait plus de jus.', 'Je cours tout le jeu sans marcher.', 'Deux boucles avant chaque pose.'],
    ['pronostic', 15, 'En {6|4} min.', 'Je suis à 1 tour de mon pronostic.'],
    ['elastique', 15, 'Première fois sur {boucle} : le groupe reste ensemble, à une allure où l\'on parle.', 'Notre élastique ne casse pas.', 'Groupes de 4.']],
   x: [['oie', 15]],
   r: [['bilan', 7]]},
  {t: 'Le pouls et l\'effort', o: 'Prendre son pouls et relier l\'allure aux battements du cœur.',
   e: [['atomes', 6],
    ['miroir', 7]],
   c: [['pouls', 12, 'Au repos, puis après l\'échauffement.', 'Je sais prendre mon pouls.'],
    ['Le cœur-thermomètre', 18, 'Trois courses de 3 min : en marchant vite, en trottinant en parlant, en courant vite. On prend son pouls après chacune et on fait un mini-graphique.', 'Mes 3 pouls sont notés.', '', 'piste'],
    ['de', 16, '', 'Notre duo bat son record.']],
   x: [['scrabble', 15, '', 'Mon équipe forme un mot de {7|5} lettres.']],
   r: [['respire', 7]]},
  {t: 'Courir à allure régulière', o: 'Passer chaque plot au bon moment au signal.',
   e: [['feu', 6],
    ['bonjours', 7]],
   c: [['plots', 18, 'On apprend à ralentir quand on est en avance.', 'Je suis à la coupelle {6|4} fois de suite.', 'Allure un peu plus vive.'],
    ['memory', 14, 'On court une boucle avant chaque retournement : pas de sprint.', 'Mon équipe trouve toutes les paires.'],
    ['horloge', 14, '', 'Je suis à moins de 30 s.']],
   x: [['tresor', 15, '', 'Mon équipe trouve tous les chiffres.']],
   r: [['meteo', 7]]},
  {t: 'Courir plus longtemps', o: 'Courir 10 minutes sans s\'arrêter à allure régulière.',
   e: [['ballonvoyageur', 6],
    ['queues', 7]],
   c: [['poker', 16, '{10|8} min de course : on garde une allure « je peux parler ».', 'Je cours {10|8} min sans marcher.'],
    ['duo', 15, '', 'Notre duo fait des boucles régulières.'],
    ['tourmonde', 15, 'On court {10|8} min à son allure : chaque boucle fait voyager la classe.', 'Je cours sans m\'arrêter.']],
   x: [['bingo', 15]],
   r: [['mercis', 7]]},
  {t: 'Gérer son effort et ses émotions', o: 'Reconnaître les signes de fatigue et les gérer : respirer, ralentir, s\'encourager.',
   e: [['chifoumi', 6],
    ['statues', 7]],
   c: [['Le coureur et son ange', 16, 'Par deux : le coureur fait {10|8} min ; l\'« ange » court à côté une boucle sur deux et l\'encourage avec une phrase préparée. On change.', 'Je cours sans m\'arrêter grâce à mon ange.', '', 'piste', 'p'],
    ['lievre', 15, 'Le lièvre gère son avance, les chiens restent ensemble : chacun gère son effort.', 'Je cours tout le jeu sans m\'arrêter.'],
    ['puzzle', 15]],
   x: [['sommes', 15]],
   r: [['parole', 7]]},
  {t: 'Évaluation : courir longtemps', o: 'Courir 12 minutes (ou le plus longtemps possible) à allure régulière.',
   crit: [['Courir 12 minutes sans s\'arrêter', 6, '6 : sans marcher · 4 : 1 arrêt court · 2 : plusieurs arrêts · 1 : abandonne mais repart'], ['Régularité de l\'allure', 5, '5 : les 4 tranches de 3 minutes ont presque le même nombre de tours · 3 : ralentit à la fin · 1 : part trop vite et s\'effondre'], ['Distance par rapport au test de départ', 5, '5 : progrès net · 3 : léger progrès · 2 : même distance · 1 : moins'], ['Bilan chiffré', 4, '4 : calcule ses mètres et compare au premier essai · 2 : calcule sans comparer · 0 : rien']],
   e: [['gammes', 6],
    ['locomotive', 7]],
   c: [['Les 12 minutes', 30, 'Par deux : l\'un court {12|10} min, l\'autre compte les tours et note toutes les 3 min ; puis on change.', '', '', 'piste', 'p'],
    ['Le calcul du champion', 8, 'Chacun calcule sa distance et la compare à son premier essai.', '', '', 'explication']],
   r: [['quiz', 6]]}
]},
2: {th: 'Courir à son allure : vitesse moyenne et régularité', comp: ['HME1', 'HME4', 'GSS1', 'GSS3'], l: [
  {t: 'Test : la distance en 6 minutes', o: 'Mesurer sa capacité (distance en 6 minutes) pour choisir ses allures.',
   e: [['locomotive', 6],
    ['miroir', 7]],
   c: [['Le test des 6 minutes', 18, 'Par deux : l\'un court 6 min, l\'autre compte les cônes. Distance = tours × 300 m + cônes × 25 m. On change.', 'Je connais ma distance en 6 min.', '', 'piste', 'p'],
    ['pronostic', 13, 'Après le test : combien de tours en 3 min ?', 'Je suis à 1 cône de mon pronostic.'],
    ['de', 15, '', 'Notre duo bat son record.']],
   x: [['morpion', 15, '', 'Mon équipe aligne 3 chasubles.']],
   r: [['bilan', 7]]},
  {t: 'Courir à 80 % de sa vitesse', o: 'Courir longtemps à environ 80 % de sa vitesse du test.',
   e: [['parler', 6],
    ['chatcouleurs', 7]],
   c: [['plots', 18, 'Groupes d\'allure faits avec le test : chaque groupe a son coup de sifflet.', 'Je suis à la coupelle {8|5} fois de suite.'],
    ['poker', 14, '', 'Je fais une paire ou mieux.'],
    ['elastique', 14, 'Groupes d\'allure faits avec le test : l\'élastique tient à 80 %.', 'Notre élastique ne casse pas.']],
   x: [['lievre', 15]],
   r: [['respire', 7]]},
  {t: 'Le fractionné court', o: 'Alterner course rapide et récupération (30 s / 30 s).',
   e: [['feu', 6],
    ['atomes', 7]],
   c: [['fractionne', 16, '', 'Je fais {8|6} fractions en gardant la même distance.'],
    ['duo', 15, 'Boucle courte (un côté de la plaine).', 'Notre duo fait des boucles régulières.'],
    ['pouls', 15, 'Après le fractionné, puis toutes les 30 s : à quelle vitesse le cœur redescend ?', 'Je note mes 3 pouls.']],
   x: [['scrabble', 15, '', 'Mon équipe forme un long mot.']],
   r: [['meteo', 7]]},
  {t: 'Courir 15 minutes', o: 'Courir 15 minutes à allure régulière.',
   e: [['bonjours', 6],
    ['ballonvoyageur', 7]],
   c: [['tourfrance', 20, 'Étape unique : contre-la-montre par équipes de {15|10} min, maillots jaune, vert et à pois.', 'Mon équipe gagne un maillot.'],
    ['horloge', 13, '', 'Je suis à moins de 20 s.'],
    ['memory', 13]],
   x: [['bingo', 15]],
   r: [['mercis', 7]]},
  {t: 'La course d\'orientation', o: 'Courir longtemps en trouvant des balises sur la plaine.',
   e: [['queues', 6],
    ['chifoumi', 7]],
   c: [['orientation', 20, '', 'Mon groupe trouve {10|7} balises.', 'Une balise piège (code faux) à repérer.'],
    ['tresor', 13, '', 'Mon équipe trouve tous les chiffres.'],
    ['puzzle', 13]],
   x: [['tourmonde', 15]],
   r: [['parole', 7]]},
  {t: 'Évaluation', o: 'Courir à allure régulière et améliorer sa distance.',
   crit: [['12 minutes sans marcher', 6, '6 : sans marcher · 4 : 1 arrêt · 2 : plusieurs arrêts'], ['Régularité (temps au tour)', 5, '5 : temps au tour presque identiques · 3 : écart moyen · 1 : très irrégulier'], ['Distance et objectif', 5, '5 : atteint ou dépasse son objectif · 3 : s\'en approche · 1 : loin'], ['Bilan : progrès et explication', 4, '4 : compare au test de 6 min et explique ce qui l\'a aidé · 2 : compare sans expliquer · 0 : rien']],
   e: [['statues', 6],
    ['gammes', 7]],
   c: [['Les 12 minutes', 30, 'Par deux, temps au tour notés par le partenaire.', '', '', 'piste', 'p'],
    ['Le calcul du champion', 8, '', '', '', 'explication']],
   r: [['quiz', 6]]}
]},
3: {th: 'Connaître sa VMA et courir à différentes allures', comp: ['HME1', 'HME4', 'GSS1', 'GSS5'], l: [
  {t: 'Le test VMA', o: 'Mesurer sa vitesse maximale aérobie (VMA).',
   e: [['locomotive', 6],
    ['miroir', 7]],
   c: [['Le test des plots qui accélèrent', 22, 'Test progressif : coupelles tous les 25 m, le sifflet accélère chaque minute (tableau du prof). On s\'arrête quand on est en retard de 2 coupelles. Le dernier palier tenu donne sa VMA.', 'Je connais ma VMA.', '', 'piste', 'p'],
    ['Ma table d\'allures', 12, 'Avec la VMA, chacun calcule son temps pour 300 m à 70 %, 80 % et 100 %.', 'Ma table d\'allures est écrite.', '', 'explication'],
    ['oie', 12, 'Après le test, on récupère en jouant : boucles en trottinant.', 'Je trottine sans m\'arrêter.']],
   x: [['lievre', 15]],
   r: [['respire', 7]]},
  {t: 'Courir à 70 % et 80 % de VMA', o: 'Tenir une allure d\'endurance fondamentale.',
   e: [['parler', 6],
    ['chatcouleurs', 7]],
   c: [['plots', 18, 'Sifflet calculé sur sa VMA : groupes à 70 % puis 80 %.', 'Je suis à la coupelle {8|5} fois de suite.'],
    ['pronostic', 13, 'Un tour à 80 % : temps prévu avec la table.', 'Je suis à moins de 5 s de mon temps prévu.'],
    ['morpion', 15, '', 'Mon équipe aligne 3 chasubles.']],
   x: [['tourfrance', 15, '', 'Mon équipe gagne un maillot.']],
   r: [['bilan', 7]]},
  {t: 'Fractionné à 100 % de VMA', o: 'Courir des intervalles courts à VMA.',
   e: [['feu', 6],
    ['atomes', 7]],
   c: [['fractionne', 16, '30 s à 100 % de VMA : distance calculée et marquée par une coupelle.', 'J\'atteins ma coupelle {8|6} fois.'],
    ['Le chat et la souris', 15, 'Par deux sur la boucle : la souris part avec 25 m d\'avance ; les deux courent à VMA 1 min. Rattrapée ou pas ? On change.', 'Je ne suis pas rattrapé.', '', 'piste', 'p'],
    ['duo', 15, '', 'Notre duo est régulier.']],
   x: [['scrabble', 15, '', 'Mon équipe forme un long mot.']],
   r: [['meteo', 7]]},
  {t: 'Courir 20 minutes', o: 'Courir 20 minutes à 70-75 % de VMA.',
   e: [['bonjours', 6],
    ['ballonvoyageur', 7]],
   c: [['poker', 20, '{20|12} min à son allure.', 'Je cours {20|12} min sans marcher.'],
    ['horloge', 13, '', 'Je suis à moins de 20 s.'],
    ['elastique', 13, 'Par 3, à 70 % de VMA : on garde l\'élastique 13 min.', 'Notre élastique ne casse pas.']],
   x: [['orientation', 15, '', 'Mon groupe trouve toutes les balises.']],
   r: [['mercis', 7]]},
  {t: 'Le carnet d\'entraînement', o: 'Noter prévu, réalisé et sensations après chaque course.',
   e: [['queues', 6],
    ['chifoumi', 7]],
   c: [['Prévu-réalisé', 18, 'Chacun écrit sa séance (ex. 3 × 4 min à 80 %), la court ; le partenaire note les temps réels.', 'Mon écart prévu/réalisé est de moins de {10|15} %.', '', 'piste', 'p'],
    ['handicap', 14, 'Départs calculés avec la VMA de chacun.', 'J\'arrive avec le peloton.'],
    ['pouls', 14, 'Ajouté au carnet.', 'Mon carnet est complet.']],
   x: [['tresor', 15, '', 'Mon équipe trouve tous les chiffres.']],
   r: [['parole', 7]]},
  {t: 'Évaluation', o: 'Courir à une allure prévue et la tenir.',
   crit: [['Allure annoncée tenue (écart prévu / réalisé)', 8, '8 : écart inférieur à 5 % · 6 : 5 à 10 % · 4 : 10 à 15 % · 2 : plus de 15 %'], ['Course sans arrêt', 4, '4 : 12 minutes sans marcher · 2 : 1 arrêt · 0 : plusieurs'], ['Régularité', 4, '4 : temps au tour réguliers · 2 : variable · 0 : très irrégulier'], ['Bilan et objectif pour la suite', 4, '4 : analyse sa course et écrit un objectif réaliste · 2 : bilan sans objectif · 0 : rien']],
   e: [['statues', 6],
    ['gammes', 7]],
   c: [['La course annoncée', 30, 'Chacun annonce son allure et court {12|10} min ; le partenaire note les temps au tour.', '', '', 'piste', 'p'],
    ['Le calcul du champion', 8, 'Écart prévu/réalisé en %.', '', '', 'explication']],
   r: [['quiz', 6]]}
]},
4: {th: 'S\'entraîner : fractionné long, pyramide, fartlek et récupération', comp: ['HME1', 'HME4', 'GSS1', 'GSS5'], l: [
  {t: 'Test VMA et objectif de progrès', o: 'Mesurer sa VMA et se fixer un objectif chiffré pour la fin du cycle.',
   e: [['locomotive', 6],
    ['miroir', 7]],
   c: [['Le test des plots qui accélèrent', 22, '', 'Je connais ma VMA.', '', 'piste', 'p'],
    ['Mon contrat de coureur', 12, 'Objectif chiffré pour la fin du cycle (VMA, distance en 12 min ou régularité) et 2 moyens pour y arriver.', 'Mon contrat est écrit.', '', 'explication'],
    ['oie', 12, 'Après le test, récupération en jouant.', 'Je trottine sans m\'arrêter.']],
   x: [['memory', 15]],
   r: [['respire', 7]]},
  {t: 'Le fractionné long : 3 × 3 minutes', o: 'Courir 3 fois 3 minutes à 90 % de VMA avec récupération active.',
   e: [['parler', 6],
    ['chatcouleurs', 7]],
   c: [['Les 3 coupelles', 20, '3 × 3 min ({2|1} min de trot entre) : chacun pose sa coupelle d\'arrivée calculée à 90 % de VMA. On doit l\'atteindre à chaque fois, pas plus loin.', 'J\'atteins ma coupelle {3|2} fois.', '4 × 3 min.', 'piste', 'g4'],
    ['duo', 13, '', 'Notre duo est régulier.'],
    ['bingo', 13, 'Récupération active entre les fractions : le bingo se fait en trottinant.', 'Notre duo fait une ligne.']],
   x: [['tourfrance', 15, '', 'Mon équipe gagne un maillot.']],
   r: [['bilan', 7]]},
  {t: 'La pyramide', o: 'Enchaîner des durées croissantes puis décroissantes en gardant son allure.',
   e: [['feu', 6],
    ['atomes', 7]],
   c: [['pyramide', 20, '', 'Je garde la même allure du début à la fin.', 'Pyramide 1-2-3-4-3-2-1.'],
    ['horloge', 13, '', 'Je suis à moins de 15 s.'],
    ['morpion', 13, '', 'Mon équipe aligne 3 chasubles.']],
   x: [['scrabble', 15, '', 'Mon équipe forme un long mot.']],
   r: [['meteo', 7]]},
  {t: 'Le fartlek', o: 'Varier l\'allure selon les ordres et le terrain sans s\'arrêter.',
   e: [['bonjours', 6],
    ['ballonvoyageur', 7]],
   c: [['fartlek', 20, 'Utiliser les pentes et les bords de la plaine si possible.', 'Je cours tout le fartlek sans marcher.', 'Le guide ajoute des « tunnels ».'],
    ['orientation', 13, '', 'Mon groupe trouve toutes les balises.'],
    ['de', 13, '', 'Notre duo bat son record.']],
   x: [['lievre', 15]],
   r: [['mercis', 7]]},
  {t: 'Boire, manger, dormir : récupérer pour progresser', o: 'Connaître les règles simples d\'hydratation, d\'alimentation et de récupération.',
   e: [['queues', 6],
    ['chifoumi', 7]],
   c: [['Le quiz en courant', 20, 'Des questions (vrai/faux) sur l\'eau, le sommeil, les repas, les étirements sont cachées sous des cônes de la plaine. Par deux, on court chercher une question, on revient répondre ; 1 point par bonne réponse.', 'Mon duo a {8|5} bonnes réponses.', '', 'piste', 'p'],
    ['poker', 13, '', 'Je fais une paire ou mieux.'],
    ['pouls', 13, '', 'Je note mes pouls.']],
   x: [['tresor', 15, '', 'Mon équipe trouve tous les chiffres.']],
   r: [['parole', 7]]},
  {t: 'Évaluation : séance prévue et réalisée', o: 'Réaliser une séance annoncée et analyser l\'écart entre prévu et réalisé.',
   crit: [['Séance écrite et adaptée', 5, '5 : séance complète (durées, allures, récupérations) adaptée à son niveau · 3 : incomplète · 1 : très vague'], ['Réalisation : écart prévu / réalisé', 8, '8 : écart inférieur à 5 % · 6 : 5 à 10 % · 4 : 10 à 15 % · 2 : plus de 15 %'], ['Analyse de l\'écart', 4, '4 : explique l\'écart et ce qu\'il changerait · 2 : constate sans expliquer · 0 : rien'], ['Rôle d\'observateur', 3, '3 : note les temps réels du camarade avec précision · 1 : notes incomplètes · 0 : rien']],
   e: [['statues', 6],
    ['gammes', 7]],
   c: [['Prévu-réalisé', 30, 'Séance écrite à l\'avance, observée par le partenaire.', '', '', 'piste', 'p'],
    ['Le calcul du champion', 8, '', '', '', 'explication']],
   r: [['quiz', 6]]}
]},
5: {th: 'Planifier son entraînement : projet santé ou performance', comp: ['HME1', 'GSS1', 'GSS3', 'GSS5'], l: [
  {t: 'Choisir son mobile et son projet', o: 'Choisir un mobile (santé, performance, bien-être) et construire un plan de 4 séances.',
   e: [['locomotive', 6],
    ['miroir', 7]],
   c: [['Le test des plots qui accélèrent', 20, '', 'Je connais ma VMA.', '', 'piste', 'p'],
    ['Mon plan', 14, 'Choix du mobile et plan de 4 séances (méthodes du cycle : plots, fractionné, pyramide, fartlek).', 'Mon plan est écrit.', '', 'explication'],
    ['de', 12, '', 'Notre duo bat son record.']],
   x: [['lievre', 15]],
   r: [['bilan', 7]]},
  {t: 'Séance de projet 1', o: 'Réaliser la séance prévue et noter prévu, réalisé et sensations.',
   e: [['parler', 6],
    ['chatcouleurs', 7]],
   c: [['Prévu-réalisé', 30, 'Chacun suit son plan ; le partenaire chronomètre.', 'Mon écart est de moins de {10|15} %.', '', 'piste', 'p'],
    ['horloge', 16, '', 'Je suis à moins de 15 s.']],
   x: [['morpion', 15, '', 'Mon équipe aligne 3 chasubles.']],
   r: [['respire', 7]]},
  {t: 'Séance de projet 2 : ajuster', o: 'Ajuster sa séance selon les sensations de la précédente.',
   e: [['feu', 6],
    ['atomes', 7]],
   c: [['Prévu-réalisé : j\'ajuste', 30, '', 'Mon écart prévu/réalisé diminue.'],
    ['poker', 16, '', 'Je fais une paire ou mieux.']],
   x: [['scrabble', 15, '', 'Mon équipe forme un long mot.']],
   r: [['meteo', 7]]},
  {t: 'Renforcement du coureur', o: 'Gainage et renforcement pour courir mieux et prévenir les blessures.',
   e: [['bonjours', 6],
    ['ballonvoyageur', 7]],
   c: [['Le circuit du coureur', 18, 'Par deux, 6 ateliers de 40 s sur l\'herbe : gainage face et côté, montées de genoux, squats, fentes, mollets sur un pied. Entre chaque atelier, un côté de la plaine en trottinant.', 'Je fais tous les ateliers proprement.', '', 'ateliers:sp:6', 'a6'],
    ['fartlek', 14, '', 'Je cours sans marcher.'],
    ['elastique', 14, 'Par 3 après le circuit : on récupère en courant ensemble.', 'Notre élastique ne casse pas.']],
   x: [['orientation', 15, '', 'Mon groupe trouve toutes les balises.']],
   r: [['mercis', 7]]},
  {t: 'Séance de projet 3', o: 'Dernière séance avant le test : confirmer ses allures.',
   e: [['queues', 6],
    ['chifoumi', 7]],
   c: [['Prévu-réalisé : je confirme', 30, '', 'Je cours ma séance comme prévu.'],
    ['tourfrance', 16, 'Étape unique : contre-la-montre par équipes, remise des maillots.', 'Mon équipe gagne un maillot.']],
   x: [['tresor', 15, '', 'Mon équipe trouve tous les chiffres.']],
   r: [['parole', 7]]},
  {t: 'Évaluation : projet', o: 'Réaliser et analyser sa séance de projet (conception, réalisation, analyse).',
   crit: [['Conception de la séance', 7, 'Barème annoncé : objectif clair, échauffement, corps de séance (durées, allures, récupérations), retour au calme'], ['Réalisation', 10, '10 : séance réalisée comme prévue (écart < 5 %) · 7 : écart 5-10 % · 4 : écart > 10 % · 2 : non terminée'], ['Analyse', 3, '3 : analyse ses données et propose un ajustement · 1 : constat seul · 0 : rien']],
   e: [['statues', 6],
    ['gammes', 7]],
   c: [['Ma séance d\'évaluation', 30, 'Chacun réalise sa séance de projet ; le partenaire note.', '', '', 'piste', 'p'],
    ['Le calcul du champion', 8, '', '', '', 'explication']],
   r: [['quiz', 6]]}
]},
6: {th: 'Autonomie et santé durable : concevoir et conduire ses séances', comp: ['HME1', 'GSS1', 'GSS3', 'GSS4', 'GSS5'], l: [
  {t: 'Diagnostic et projet personnel', o: 'Faire le point sur sa forme et fixer un projet réaliste pour 5 séances.',
   e: [['locomotive', 6, 'Mené par un élève.'],
    ['miroir', 7]],
   c: [['Le test des plots qui accélèrent', 20, '', 'Je connais ma VMA.', '', 'piste', 'p'],
    ['Mon plan', 14, 'Projet personnel : objectif, 5 séances, comment mesurer.', 'Mon projet est écrit.', '', 'explication'],
    ['horloge', 12, '', 'Je suis à moins de 15 s.']],
   x: [['poker', 15, '', 'Je fais une paire ou mieux.']],
   r: [['bilan', 7]]},
  {t: 'Séance autonome 1', o: 'Conduire sa séance seul, en gérant son temps et ses allures.',
   e: [['echequipe', 13, 'Chaque groupe mène son échauffement de coureur.']],
   c: [['Prévu-réalisé', 30, 'En autonomie : chacun gère son chrono.', 'Mon écart est de moins de {10|15} %.', '', 'piste', 'p'],
    ['coach', 16, 'Chaque groupe choisit un jeu du cycle.', 'Mon groupe joue sans aide.']],
   x: [['morpion', 15, '', 'Mon équipe aligne 3 chasubles.']],
   r: [['respire', 7]]},
  {t: 'Séance autonome 2', o: 'Ajuster sa séance selon ses données.',
   e: [['feu', 6, 'Mené par un élève.'],
    ['atomes', 7]],
   c: [['Prévu-réalisé : j\'ajuste', 30, 'Ajustement d\'après les données de la séance 1.', 'Mon écart prévu/réalisé diminue.'],
    ['pouls', 16, '', 'Mon carnet est complet.']],
   x: [['scrabble', 15, '', 'Mon équipe forme un long mot.']],
   r: [['meteo', 7]]},
  {t: 'Courir en dehors de l\'école', o: 'Préparer une sortie sûre : parcours, applis, équipement, sécurité.',
   e: [['parler', 6, 'Sujet : « Où pourrais-je courir près de chez moi ? »'],
    ['chatcouleurs', 7]],
   c: [['Le parcours imaginaire', 16, 'Par groupes, on trace sur une carte un parcours de 3 à 5 km près de l\'école, avec les règles de sécurité (visibilité, routes, prévenir quelqu\'un).', 'Notre parcours est sûr.', '', 'explication', 'g4'],
    ['orientation', 15, '', 'Mon groupe trouve toutes les balises.'],
    ['fartlek', 15, '', 'Je cours sans marcher.']],
   x: [['tourfrance', 15, '', 'Mon équipe gagne un maillot.']],
   r: [['mercis', 7]]},
  {t: 'Séance autonome 3', o: 'Dernière séance avant l\'évaluation.',
   e: [['queues', 6, 'Mené par un élève.'],
    ['bonjours', 7]],
   c: [['Prévu-réalisé : je confirme', 30, '', 'Je cours ma séance comme prévu.'],
    ['lievre', 16, 'Pour finir en jouant : lièvres et chiens par groupes.', 'Je cours tout le jeu.']],
   x: [['tresor', 15, '', 'Mon équipe trouve tous les chiffres.']],
   r: [['parole', 7]]},
  {t: 'Évaluation : projet personnel', o: 'Réaliser et analyser son projet.',
   crit: [['Conception du projet', 6, '6 : objectif chiffré, plan de séances cohérent · 4 : plan incomplet · 2 : objectif vague'], ['Réalisation de la séance finale', 8, '8 : séance réalisée comme prévue · 5 : quelques écarts · 2 : non terminée'], ['Objectif atteint ou expliqué', 3, '3 : atteint, ou écart expliqué avec ses données · 1 : non atteint sans explication'], ['Analyse critique des données', 3, '3 : utilise ses données (pouls, temps, ressenti) pour conclure · 1 : peu de données · 0 : rien']],
   e: [['statues', 6, 'Mené par un élève.'],
    ['gammes', 7]],
   c: [['Ma séance d\'évaluation', 30, '', '', '', 'piste', 'p'],
    ['Le calcul du champion', 10, '', '', '', 'explication']],
   r: [['quiz', 6]]}
]}
}});

/* ===== Schémas de chaque jeu (la plaine vue de dessus, avec la boucle de 300 m balisée : un cône tous les 25 m) ===== */
(window.PSCH_SC = window.PSCH_SC || {}).endurance = (() => {
  const COL = {a: '#1f63d6', b: '#e8590c', p: '#8a3ffc'}, EQ = ['#1f63d6', '#e8590c', '#16a34a', '#8a3ffc'];
  const X0 = 40, X1 = 360, Y0 = 35, Y1 = 215, PER = 2 * (X1 - X0 + Y1 - Y0);
  // point de la boucle (t de 0 à 1, départ en haut à gauche, sens des aiguilles d'une montre) ; k = décalage vers l'intérieur
  const bp = (t, k = 0) => { let d = ((t % 1) + 1) % 1 * PER; const w = X1 - X0, h = Y1 - Y0;
    if (d < w) return [X0 + d, Y0 + k]; d -= w; if (d < h) return [X1 - k, Y0 + d]; d -= h; if (d < w) return [X1 - d, Y1 - k]; d -= w; return [X0 + k, Y1 - d]; };
  // la plaine et sa boucle balisée
  const boucle = (g, o = {}) => { g.grass(); g.raw(`<rect x="${X0}" y="${Y0}" width="${X1 - X0}" height="${Y1 - Y0}" rx="2" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="8 6"/>`, 'bg');
    for (let i = 0; i < 12; i++){ const [x, y] = bp(i / 12); g.cone(x, y, i ? '#f06400' : '#e11d48'); }
    if (o.lab !== false) g.label(X0 + 8, Y0 - 12, 'départ', {s: 9, b: 1, a: 'start'}).label(X1, Y1 + 18, 'boucle de 300 m : un cône tous les 25 m', {s: 9, a: 'end', c: '#4b6b3c'});
    return g; };
  // coureurs sur la boucle (positions t), avec flèche de course
  const cour = (g, T, o = {}) => { T.forEach((t, i) => { const [x, y] = bp(t, o.k ?? 0), [x2, y2] = bp(t + .045, o.k ?? 0); g.pl(o.t || 'a', x, y, o.labs ? o.labs[i] : ''); if (o.ar !== false) g.run(x, y, x2, y2, 0); }); return g; };
  const centre = (g, o = {}) => g.zone(140, 85, 120, 80, o.lab || '', o.tone || 'yellow', {top: 1});
  const fiche = (g, x, y) => g.sheet(x, y);
  return {
    chatcouleurs: g => { g.grass().zone(70, 30, 260, 190, 'grand carré au centre de la plaine', 'green', {top: 1}); g.scatter('a', 9, 95, 60, 310, 200, {seed: 4});
      g.X(170, 110).chasuble(170, 92).run(180, 115, 205, 130).X(260, 160).chasuble(260, 142).run(250, 160, 225, 170);
      g.pl('g', 345, 125).loop(200, 125, 145, 108, 'run').label(345, 105, 'touché : 1 tour', {s: 8.5, b: 1});
      return g.n(1, 'les chats (chasuble) touchent ; un joueur touché fait un tour du carré en trottinant puis revient').n(2, 'toutes les minutes, les chats changent'); },
    parler: g => { boucle(g); [.08, .3, .55, .8].forEach(t => { const [x, y] = bp(t, 14), [x2, y2] = bp(t + .02, 14); g.A(x, y).B(x2, y2); }); return g.tag(200, 125, '💬 sujet tiré au sort : vacances, film, animal…', {s: 9.5})
      .n(1, 'par deux, on trottine en discutant').n(2, 'si l\'un n\'arrive plus à parler, on ralentit : c\'est l\'allure d\'endurance'); },
    morpion: g => { boucle(g); for (let i = 0; i < 9; i++) g.hoop(170 + (i % 3) * 30, 95 + Math.floor(i / 3) * 30, 12); g.chasuble(170, 95, EQ[0]).chasuble(200, 125, EQ[0]).chasuble(230, 95, EQ[1]).chasuble(200, 155, EQ[1]);
      g.row('a', 3, 90, 125, 130, 125).row('b', 3, 270, 125, 310, 125); g.pl('a', bp(.2, 0)[0], bp(.2)[1]).run(...bp(.2), ...bp(.26), 0, 1).arrow('run', 130, 115, 160, 100, 0, 2);
      return g.n(1, 'on court une boucle').n(2, 'puis on pose (ou déplace) une chasuble de son équipe ; 3 alignées = 1 point'); },
    pronostic: g => { boucle(g); cour(g, [.1, .35, .62]); g.A(200, 140).sheet(222, 140).tag(200, 100, 'annoncé : 5 tours · réalisé : 5 tours ¼', {s: 9});
      return g.n(1, 'avant de courir, chacun annonce combien de tours il fera ; pas de montre').n(2, 'le partenaire compte ; le plus près de son pronostic gagne'); },
    locomotive: g => { boucle(g); const T = [.12, .1, .08, .06, .04]; T.forEach((t, i) => { const [x, y] = bp(t); g.pl(i ? 'a' : 'b', x, y + 14, i ? '' : 'L'); });
      g.path('run', [[bp(.04)[0], bp(.04)[1] + 30], [bp(.14)[0] + 10, bp(.14)[1] + 30], [bp(.15)[0], bp(.15)[1] + 14]]).label(150, 90, 'le dernier remonte la file en accélérant', {s: 9}).label(150, 102, 'et devient la locomotive', {s: 9});
      cour(g, [.45, .43, .41, .39], {k: 14, ar: false}); return g.n(1, 'en file indienne sur la boucle ; on ne s\'arrête jamais').n(2, 'l\'allure du groupe reste celle où l\'on peut parler'); },
    poker: g => { boucle(g); for (let i = 0; i < 6; i++) g.raw(`<rect x="${165 + i * 12}" y="112" width="14" height="20" rx="2" fill="#fff" stroke="#2d3530" stroke-width="1.2" transform="rotate(${i * 6 - 15} ${172 + i * 12} 122)"/>`, 'mid');
      g.label(200, 150, 'cartes face cachée', {s: 9}); cour(g, [.15, .4, .7]); g.A(150, 120).arrow('run', 160, 120, 165, 120, 0);
      return g.n(1, 'chaque tour complet donne le droit de piocher une carte').n(2, 'à la fin, chacun montre sa meilleure main de 5 cartes : la régularité paie'); },
    bilan: g => { g.grass(); g.ring('a', 10, 200, 125, 130, 75).P(200, 125).sheet(225, 125); return g.tag(200, 92, 'tours · facile / moyen / dur', {s: 9.5})
      .n(1, 'marche lente puis étirements des mollets, des cuisses, des hanches en cercle').n(2, 'chacun note ses tours et ses sensations ; bravo au plus régulier et au plus encourageant'); },
    miroir: g => { g.grass(); [[70, 70], [230, 60], [100, 170], [270, 160]].forEach(([x, y], i) => { g.A(x, y).B(x - 28, y + 6).path('run', [[x + 10, y], [x + 50, y - 15], [x + 80, y + 20]]); });
      return g.label(42, 90, 'l\'ombre', {s: 9, b: 1, c: COL.b}).n(1, 'celui de devant change d\'allure, de direction, ajoute un saut ou un pas chassé ; l\'ombre copie tout').n(2, 'on change toutes les 1 min 30'); },
    pouls: g => { g.grass(); g.ring('a', 8, 200, 125, 120, 72); g.raw('<path d="M180 125h10l5 -12l7 24l5 -12h13" fill="none" stroke="#e11d48" stroke-width="2.5"/>', 'top').tag(200, 160, '15 s × 4 = battements par minute', {s: 9.5}).chrono(200, 92);
      return g.n(1, 'pouls au cou ou au poignet : au repos, après le trot, après le jeu rapide').n(2, 'on note et on compare : la zone d\'endurance = je peux parler'); },
    'Le cœur-thermomètre': g => { boucle(g); [['marche vite', .08, 'a'], ['trot en parlant', .35, 'a'], ['course vite', .6, 'a']].forEach(([t, s], i) => { const [x, y] = bp(s, 0); g.A(x, y).run(x, y, ...bp(s + .05), 0); });
      [[160, 'marche', 30], [200, 'trot', 50], [240, 'vite', 70]].forEach(([x, t, h]) => g.raw(`<rect x="${x - 12}" y="${160 - h}" width="24" height="${h}" fill="#e11d48" opacity=".75"/>`, 'mid').label(x, 172, t, {s: 8.5}));
      return g.label(200, 80, 'mon pouls après chaque course', {s: 9, b: 1}).n(1, 'trois courses de 3 min ; pouls après chacune et mini-graphique'); },
    de: g => { boucle(g); g.raw('<rect x="188" y="110" width="24" height="24" rx="4" fill="#fff" stroke="#2d3530" stroke-width="2"/><circle cx="194" cy="116" r="2.2"/><circle cx="206" cy="128" r="2.2"/><circle cx="200" cy="122" r="2.2"/>', 'top');
      g.B(170, 140).A(...bp(.08)).path('run', [bp(.08), [X1, Y0], bp(.44)]).label(200, 160, '3 = trois quarts de boucle', {s: 9});
      return g.n(1, 'on lance le dé et on court autant de quarts de boucle que le chiffre').n(2, 'le partenaire relance et part dès qu\'on revient ; le duo additionne ses quarts'); },
    scrabble: g => { g.grass(); ['A', 'R', 'E', 'T', 'S', 'O', 'U', 'N'].forEach((t, i) => g.raw(`<rect x="${330 + (i % 2) * 26}" y="${40 + Math.floor(i / 2) * 40}" width="18" height="22" rx="2" fill="#fff" stroke="#2d3530"/>`, 'mid').label(339 + (i % 2) * 26, 56 + Math.floor(i / 2) * 40, t, {s: 11, b: 1}));
      EQ.forEach((c, i) => { const y = 45 + i * 50; g.pl(['a', 'b', 'g', 'x'][i], 40, y, '', {c}).pl(['a', 'b', 'g', 'x'][i], 60, y, '', {c}); }); g.A(150, 70).run(160, 70, 315, 60, 0).run(315, 85, 160, 95, 0);
      return g.label(340, 225, 'lettres au bout de la plaine', {s: 9}).n(1, 'chaque coureur rapporte une lettre par aller-retour à son équipe').n(2, 'l\'équipe forme le mot le plus long ; on peut rapporter une lettre pour l\'échanger'); },
    respire: g => { g.grass(); [[90, 70], [200, 60], [310, 70], [90, 180], [200, 190], [310, 180]].forEach(([x, y]) => g.raw(`<g transform="translate(${x} ${y})"><circle cx="-22" cy="0" r="7" fill="#1f63d6"/><rect x="-15" y="-6" width="34" height="12" rx="6" fill="#1f63d6"/></g>`, 'top'));
      return g.tag(200, 125, 'inspirer 4 temps · expirer 6 temps, main sur le ventre', {s: 10}).n(1, 'allongés dans l\'herbe : on sent le cœur ralentir ; puis étirements lents'); },
    plots: g => { boucle(g); cour(g, [.04, .2, .37, .54, .7, .87]); g.P(200, 125).label(200, 105, 'coup de sifflet toutes les 9 à 15 s', {s: 9}).label(200, 150, '= on doit passer à un cône', {s: 9});
      return g.n(1, 'à chaque coup de sifflet, on passe à côté d\'un cône : en avance on ralentit, en retard on accélère').n(2, 'chaque groupe a son allure'); },
    horloge: g => { boucle(g); cour(g, [.1, .3, .62, .82]); centre(g, {lab: 'on se pose ici à 4 min'}); g.A(185, 130).A(215, 130).P(320, 125).chrono(300, 125);
      return g.n(1, 'sans montre, on revient au centre quand on pense que le temps est passé').n(2, 'le prof annonce l\'écart : le plus précis gagne'); },
    tresor: g => { g.grass(); [[60, 50, '#e11d48', 3], [150, 200, '#1f63d6', 7], [230, 70, '#16a34a', 1], [320, 180, '#f59f00', 9], [350, 60, '#e11d48', 4], [110, 120, '#8a3ffc', 2], [260, 140, '#1f63d6', 5]].forEach(([x, y, c, n]) => g.cone(x, y, c).label(x, y + 16, n, {s: 8.5, b: 1}));
      g.A(190, 125).path('run', [[198, 120], [228, 85]]).B(130, 70).sheet(110, 70); return g.n(1, 'chaque équipe a une liste de 10 cônes à trouver et note le chiffre caché dessous').n(2, 'on court seul ou par deux, jamais en marchant'); },
    duo: g => { boucle(g); g.A(...bp(.15)).run(...bp(.15), ...bp(.22), 0); g.B(90, 70).arrow('run', 102, 70, 125, 70, 0).label(90, 90, 'B marche', {s: 8.5}); g.label(200, 120, 'A court une boucle, B récupère en marchant', {s: 9.5}).label(200, 134, 'quand A revient, B part', {s: 9.5});
      return g.n(1, 'par deux, le duo compte ses boucles').n(2, 'le but : le même temps à chaque boucle'); },
    'Le coureur et son ange': g => { boucle(g); const [x, y] = bp(.12), [x2, y2] = bp(.12, 16); g.A(x, y).run(x, y, ...bp(.18), 0).J(x2, y2, 'A').tag(x2 + 40, y2 + 24, '« Allez, tu tiens ton allure ! »', {s: 8.5});
      return g.n(1, 'le coureur fait son temps ; l\'ange court à côté une boucle sur deux et l\'encourage avec une phrase préparée').n(2, 'on change'); },
    'Les 12 minutes': g => { boucle(g); cour(g, [.1, .3, .5, .7]); g.B(200, 125).sheet(222, 125).chrono(178, 125).label(200, 150, 'le partenaire compte les tours, note toutes les 3 min', {s: 9});
      return g.n(1, 'l\'un court 12 min, l\'autre compte ; puis on change'); },
    'Le calcul du champion': g => { g.grass(); g.ring('a', 6, 200, 140, 130, 75); g.sheet(200, 140).tag(200, 28, 'tours × 300 m + cônes × 25 m', {s: 10}).tag(200, 165, 'comparé au premier essai', {s: 9}); return g; },
    'Le test des 6 minutes': g => { boucle(g); cour(g, [.2, .55]); g.B(200, 125).sheet(222, 125).tag(200, 100, 'distance = tours × 300 m + cônes × 25 m', {s: 9});
      return g.n(1, 'l\'un court 6 min, l\'autre compte les tours et les cônes ; on change'); },
    tourfrance: g => { boucle(g); cour(g, [.1, .3, .5, .7], {t: 'a'}); [['#facc15', 'jaune : le plus de tours'], ['#16a34a', 'vert : la plus régulière'], ['#e11d48', 'à pois : la plus encourageante']].forEach(([c, t], i) => g.chasuble(130, 95 + i * 25, c).label(145, 99 + i * 25, t, {s: 9, a: 'start', b: 1}));
      return g.n(1, 'chaque leçon est une étape ; classement général affiché'); },
    fractionne: g => { g.grass(); [0, 1, 2, 3].forEach(i => { const y = 50 + i * 50; g.pl(i ? 'a' : 'a', 40, y).run(52, y, 220 + i * 6, y, 0); for (let j = 0; j < 6; j++) g.cone(200 + j * 25, y + 12); });
      g.label(270, 30, 'un cône plus loin que la fois d\'avant', {s: 9, b: 1}).tag(110, 238, '30 s vite · 30 s trottinée (jamais en marchant)', {s: 9});
      return g.n(1, '6 à 10 fois ; pendant le « vite », on vise un cône plus loin'); },
    orientation: g => { g.grass(); [[60, 50], [180, 40], [330, 50], [360, 140], [290, 210], [150, 200], [50, 160], [120, 110], [240, 120], [300, 90]].forEach(([x, y], i) => g.cone(x, y).label(x, y + 16, String.fromCharCode(65 + i), {s: 8.5, b: 1}));
      g.A(200, 230).path('run', [[200, 218], [240, 132]]).path('run', [[250, 112], [292, 95]]).raw('<rect x="14" y="200" width="40" height="32" fill="#fff" stroke="#2d3530"/><path d="M20 206h28M20 214h20M20 222h24" stroke="#9ca3af"/>', 'mid').label(34, 244, 'carte', {s: 8.5});
      return g.n(1, 'par groupes, on court de balise en balise et on note les codes ; on ne marche jamais').n(2, '1 point par balise, 2 si elle est loin'); },
    'Le test des plots qui accélèrent': g => { boucle(g); cour(g, [.05, .22, .4, .6]); g.P(200, 125).sheet(222, 125).label(200, 100, 'le sifflet accélère chaque minute', {s: 9});
      return g.n(1, 'on s\'arrête quand on est en retard de 2 cônes ; le dernier palier tenu donne la VMA'); },
    'Ma table d\'allures': g => { g.grass(); g.raw('<rect x="110" y="50" width="180" height="150" fill="#fff" stroke="#2d3530"/><path d="M110 85h180M110 120h180M110 155h180M200 50v150" stroke="#9ca3af"/>', 'mid');
      [['70 %', '2 min 10'], ['80 %', '1 min 54'], ['100 %', '1 min 31']].forEach(([a, b], i) => g.label(155, 107 + i * 35, a, {s: 11, b: 1}).label(245, 107 + i * 35, b, {s: 11}));
      return g.label(155, 72, 'allure', {s: 10, b: 1}).label(245, 72, 'temps pour 300 m', {s: 10, b: 1}).n(1, 'avec sa VMA, chacun calcule son temps pour 300 m (exemple)'); },
    'Le chat et la souris': g => { boucle(g); const [x, y] = bp(.05), [x2, y2] = bp(.13); g.A(x, y, 'S').run(x, y, ...bp(.11), 0).X(...bp(.0)).run(...bp(.0), ...bp(.04), 0).label(x2, y2 + 24, '25 m d\'avance', {s: 9});
      return g.n(1, 'la souris part avec 25 m d\'avance ; les deux courent à VMA 1 min').n(2, 'rattrapée ou pas ? on change'); },
    'Prévu-réalisé': g => { boucle(g); cour(g, [.15, .5]); g.B(200, 125).sheet(222, 125).tag(200, 98, 'prévu 3 × 4 min à 80 % · réalisé ?', {s: 9}); return g.n(1, 'chacun écrit sa séance et la court ; le partenaire note les temps réels'); },
    'La course annoncée': g => { boucle(g); cour(g, [.15, .5, .8]); g.B(200, 125).sheet(222, 125).chrono(178, 125); return g.n(1, 'chacun annonce son allure et court ; le partenaire note les temps au tour'); },
    'Mon contrat de coureur': g => { g.grass(); g.ring('a', 6, 200, 140, 130, 75); g.sheet(200, 140).tag(200, 28, '🎯 objectif chiffré + 2 moyens', {s: 10}); return g; },
    'Les 3 coupelles': g => { g.grass(); [0, 1, 2].forEach(i => { const y = 60 + i * 65; g.A(40, y).run(52, y, 290, y, 0).disc(310, y, EQ[i]).label(330, y + 4, 'ma coupelle', {s: 8.5, a: 'start'}); });
      return g.tag(170, 238, '3 × 3 min, trot entre', {s: 9}).n(1, 'chacun pose sa coupelle d\'arrivée calculée à 90 % de VMA : on doit l\'atteindre, pas plus loin'); },
    pyramide: g => { g.grass(); [1, 2, 3, 2, 1].forEach((m, i) => g.raw(`<rect x="${60 + i * 58}" y="${190 - m * 40}" width="44" height="${m * 40}" fill="#1f63d6" opacity=".8"/>`, 'mid').label(82 + i * 58, 182 - m * 40, m + ' min', {s: 10, b: 1}));
      [0, 1, 2, 3].forEach(i => g.label(111 + i * 58, 205, 'trot 1 min', {s: 8}));
      return g.n(1, 'même allure du début à la fin ; le prof annonce le cône d\'arrivée attendu'); },
    fartlek: g => { boucle(g, {lab: false}); cour(g, [.1, .14, .18, .22], {ar: false}); g.J(...bp(.26), 'G'); [['⬆ montée = accélération', .37], ['⬇ descente = trot', .55], ['➡ plat = allure normale', .7], ['↔ tunnel = pas chassés', .88]].forEach(([t], i) => g.tag(200, 75 + i * 30, t, {s: 9}));
      return g.n(1, 'on suit les ordres du guide (un élève qui change toutes les 2 min), 8 à 12 min sans s\'arrêter'); },
    'Le quiz en courant': g => { g.grass(); [[80, 50], [200, 40], [330, 60], [340, 180], [200, 210], [70, 180]].forEach(([x, y]) => g.cone(x, y).label(x, y + 16, '?', {s: 10, b: 1}));
      g.A(190, 125).B(210, 125).path('run', [[190, 115], [205, 55]]).sheet(232, 125); return g.label(200, 150, 'vrai ou faux ? eau, sommeil, repas, étirements', {s: 9}).n(1, 'par deux, on court chercher une question, on revient répondre : 1 point par bonne réponse'); },
    'Mon plan': g => { g.grass(); g.ring('a', 6, 200, 140, 130, 75); g.sheet(200, 140).tag(200, 28, 'mon objectif · mes séances · comment je mesure', {s: 9.5}); return g; },
    'Le circuit du coureur': g => { boucle(g, {lab: false}); [['gainage face', 85, 75], ['gainage côté', 200, 75], ['montées de genoux', 315, 75], ['squats', 85, 175], ['fentes', 200, 175], ['mollets', 315, 175]].forEach(([t, x, y], i) => g.zone(x - 52, y - 30, 104, 60, '', 'blue').num(x - 38, y - 16, i + 1).label(x, y + 14, t, {s: 9, b: 1}).A(x, y - 4));
      return g.n(1, 'par deux, 40 s par atelier ; entre chaque atelier, un côté de la plaine en trottinant'); },
    'Ma séance d\'évaluation': g => { boucle(g); cour(g, [.15, .5]); g.P(200, 125).sheet(222, 125); return g.n(1, 'chacun réalise sa séance de projet ; le partenaire note'); },
    echequipe: g => { boucle(g, {lab: false}); [[120, 90], [280, 90], [120, 165], [280, 165]].forEach(([x, y], i) => g.ring('a', 5, x, y, 30, 22, {c: EQ[i]}).J(x, y, 'M')); return g.n(1, 'chaque groupe mène son échauffement de coureur ; le meneur (triangle vert) guide'); },
    coach: g => { boucle(g, {lab: false}); cour(g, [.1, .35, .6, .85]); g.J(200, 125, 'C').sheet(222, 125); return g.n(1, 'chaque groupe choisit un jeu du cycle et l\'anime'); },
    'Le parcours imaginaire': g => { g.floor(); g.raw('<rect x="60" y="25" width="280" height="200" fill="#fff" stroke="#2d3530"/><path d="M60 110H340M200 25V225" stroke="#d1d5db" stroke-width="10"/><path d="M110 60Q200 40 290 80T250 190Q160 210 110 160Z" fill="none" stroke="#e11d48" stroke-width="3" stroke-dasharray="7 4"/>', 'mid');
      return g.label(200, 18, 'carte du quartier de l\'école', {s: 9.5, b: 1}).tag(200, 238, 'visibilité · routes · prévenir quelqu\'un', {s: 9}).n(1, 'par groupes, on trace un parcours de 3 à 5 km près de l\'école'); },
    feu: g => { boucle(g); cour(g, [.05, .2, .38, .55, .7, .86]); g.P(200, 110).raw('<circle cx="232" cy="102" r="7" fill="#16a34a"/><circle cx="249" cy="102" r="7" fill="#f59f00"/><circle cx="266" cy="102" r="7" fill="#e11d48"/><circle cx="283" cy="102" r="7" fill="#1f63d6"/>', 'top');
      return g.label(200, 140, 'vert : je parle · orange : oui/non · rouge : marche · bleu : demi-tour', {s: 8.5, b: 1}).n(1, 'tout le monde trottine sur la boucle et change d\'allure selon la couleur'); },
    atomes: g => { g.grass(); g.P(200, 30).tag(250, 30, '« 3 ! »', {s: 11}); [[90, 100], [200, 120], [300, 95], [140, 190], [270, 185]].forEach(([x, y], k) => { if (k < 4) g.ring('a', 3, x, y, 16, 16); else g.A(x, y).run(x + 12, y, x + 60, y - 10, 10, 1); });
      return g.cone(340, 170).label(330, 215, 'seul ? petit tour de cône', {s: 9}).n(1, 'on trottine partout ; au nombre crié, on forme des groupes en se tenant par les épaules'); },
    bonjours: g => { g.grass(); g.scatter('a', 12, 40, 40, 360, 215, {seed: 9}).each((x, y, i) => i % 2 || g.run(x + 10, y + 4, x + 40, y + 16, 6)); g.tag(g.last[3][0] + 22, g.last[3][1] - 18, '🖐 tape !', {s: 9}).tag(g.last[8][0] + 22, g.last[8][1] - 18, 'hello !', {s: 9});
      return g.tag(200, 238, 'tape dans la main · coude · révérence · hallo · hello', {s: 9.5}).n(1, 'on trottine en saluant chaque personne croisée de la façon annoncée'); },
    queues: g => { g.grass(); g.zone(30, 25, 340, 200, '', 'grey'); g.scatter('a', 11, 50, 45, 350, 210, {seed: 12}).each((x, y, i) => g.chasuble(x - 13, y + 3, i % 3 ? '#facc15' : '#16a34a')); g.run(g.last[2][0] + 8, g.last[2][1] - 4, g.last[4][0] - 16, g.last[4][1], -10, 1);
      return g.bac(360, 238, '').n(1, 'on arrache les queues des autres en gardant la sienne').n(2, 'queue perdue : petit tour de cône, on en reprend une au bac'); },
    ballonvoyageur: g => { boucle(g); [[.08, 0], [.42, 1], [.75, 2]].forEach(([t, c]) => { const [x, y] = bp(t, 0); g.A(x - 14, y + 14, '', {c: EQ[c]}).A(x, y + 22, '', {c: EQ[c]}).A(x + 14, y + 14, '', {c: EQ[c], ball: true}).A(x, y + 6, '', {c: EQ[c]}); });
      return g.n(1, 'par 4, on trottine sur la boucle en se passant le ballon : il fait le tour du groupe entre deux cônes'); },
    statues: g => { g.grass(); g.scatter('a', 11, 40, 50, 360, 215, {seed: 2}); g.raw('<text x="200" y="34" text-anchor="middle" font-size="18">🎵</text>', 'top');
      return g.tag(200, 238, 'fente avant · un pied · genou levé · bras du coureur', {s: 9.5}).n(1, 'musique : on trottine ; musique coupée : on se fige 5 s dans la pose annoncée'); },
    chifoumi: g => { g.grass(); g.zone(20, 30, 60, 190, 'base A', 'blue', {top: 1}).zone(320, 30, 60, 190, 'base B', 'red', {top: 1}); g.row('a', 5, 170, 60, 170, 190).row('b', 5, 230, 60, 230, 190); g.tag(140, 40, '✊', {s: 12}).tag(260, 40, '✋', {s: 12});
      return g.run(242, 125, 315, 120, 0).run(182, 125, 300, 140, -10, 1).n(1, 'l\'équipe gagnante (feuille bat pierre) poursuit l\'autre jusqu\'à sa base').n(2, 'chaque joueur touché change d\'équipe'); },
    gammes: g => { g.grass(); g.line('M40 20V230M340 20V230', 3, '#fff'); g.row('a', 7, 55, 40, 55, 210).each((x, y, i) => g.run(x + 12, y, 325, y, 0, i ? null : 1));
      return g.label(340, 14, '30 m', {s: 9.5, b: 1}).tag(190, 125, 'genoux · talons-fesses · pas chassés · bonds · arrière', {s: 9}).n(1, 'toute la classe traverse ensemble avec un geste différent, retour en trottinant'); },
    memory: g => { boucle(g, {lab: false}); for (let i = 0; i < 8; i++) g.raw(`<rect x="${300 + (i % 2) * 24}" y="${60 + Math.floor(i / 2) * 34}" width="18" height="24" rx="2" fill="${i === 2 || i === 5 ? '#fde68a' : '#94a3b8'}" stroke="#2d3530"/>`, 'mid');
      g.A(250, 90).run(262, 90, 296, 80, 0, 1).A(70, 125, '', {}).A(110, 100).sheet(140, 140); return g.label(323, 205, 'cartes face cachée', {s: 9}).n(1, 'chaque coureur retourne 2 cartes : paire = il la ramène, sinon il les recache').n(2, 'tous les coureurs partent en même temps ; l\'équipe se souvient des cartes vues'); },
    lievre: g => { boucle(g); const [lx, ly] = bp(.3); g.J(lx, ly, 'L'); g.run(lx, ly + 10, ...bp(.36), 0, 1); [.18, .2, .22, .24].forEach(t => { const [x, y] = bp(t, 0); g.A(x, y); }); [.27, .33].forEach(t => g.disc(...bp(t, -8)));
      return g.label(200, 125, '25 m d\'avance · une coupelle tous les 50 m', {s: 10, b: 1}).n(1, 'le lièvre garde son avance 3 min ; les chiens courent ensemble et ramassent les coupelles').n(2, 'lièvre rattrapé = il devient chien'); },
    oie: g => { boucle(g); g.raw('<rect x="140" y="80" width="120" height="90" rx="6" fill="#fff" stroke="#2d3530" stroke-width="1.5"/><path d="M155 155h20v-20h20v20h20v-20h20v-20h-20v-20h-20" fill="none" stroke="#8a3ffc" stroke-width="2"/>', 'mid').label(200, 72, 'jeu de l\'oie', {s: 9.5, b: 1});
      cour(g, [.1, .3, .55, .8]); return g.A(150, 195).raw('<rect x="166" y="187" width="14" height="14" rx="3" fill="#fff" stroke="#2d3530"/><circle cx="173" cy="194" r="2" fill="#2d3530"/>', 'top').n(1, 'chaque coureur qui revient d\'une boucle lance le dé et fait avancer le pion de son équipe'); },
    bingo: g => { g.grass(); [[60, 50, 7], [150, 200, 3], [230, 60, 12], [330, 190, 5], [350, 70, 9], [110, 120, 1], [260, 150, 4], [190, 110, 8]].forEach(([x, y, n]) => g.cone(x, y, '#f59f00').label(x, y + 16, n, {s: 9, b: 1}));
      g.A(90, 175).A(108, 185).run(118, 178, 145, 196, 0, 1); g.raw('<g transform="translate(20 200)"><rect width="42" height="42" fill="#fff" stroke="#2d3530"/><path d="M14 0V42M28 0V42M0 14H42M0 28H42" stroke="#2d3530"/></g>', 'top');
      return g.label(41, 194, 'grille', {s: 9}).n(1, 'le duo court ensemble chercher les chiffres de sa grille ; une ligne = « Bingo ! »'); },
    puzzle: g => { boucle(g, {lab: false}); for (let i = 0; i < 6; i++){ const [x, y] = bp(i / 6 + .04, -14); g.raw(`<path d="M${x - 6} ${y - 6}h12v12h-12z" fill="#fde68a" stroke="#2d3530"/>`, 'top'); }
      cour(g, [.15, .4, .65]); g.raw('<rect x="160" y="95" width="80" height="60" fill="#fff" stroke="#2d3530"/><path d="M160 125h80M200 95v60M180 95v30M220 125v30" stroke="#94a3b8"/>', 'mid'); return g.label(200, 88, 'le puzzle de l\'équipe', {s: 9.5, b: 1}).n(1, 'chaque coureur rapporte une pièce par boucle ; l\'équipe assemble au centre'); },
    sommes: g => { boucle(g, {lab: false}); [[.06, 7], [.2, 3], [.35, 10], [.52, 5], [.68, 2], [.85, 8]].forEach(([t, n]) => { const [x, y] = bp(t, -16); g.raw(`<rect x="${x - 9}" y="${y - 11}" width="18" height="22" rx="2" fill="#fff" stroke="#2d3530"/>`, 'top').label(x, y + 4, n, {s: 10, b: 1}); });
      cour(g, [.12, .45]); g.sheet(200, 125).tag(200, 98, '7 + 10 + 5 + … = 50 pile !', {s: 10}); return g.n(1, 'chaque coureur rapporte une carte par boucle ; l\'équipe doit faire exactement 50'); },
    handicap: g => { boucle(g); [[.0, 'lent'], [.03, ''], [.06, ''], [.09, 'rapide']].forEach(([t, l], i) => { const [x, y] = bp(-t, 0); g.A(x, y, String(i + 1)); }); g.label(200, 150, '1 = le plus lent, devant · 4 = le plus rapide, derrière', {s: 9});
      return g.label(200, 125, 'tout le monde doit arriver ensemble au bout de 6 min', {s: 10, b: 1}).n(1, 'chacun part d\'un cône calculé avec son test : si le calcul est juste, la classe arrive en un seul peloton'); },
    elastique: g => { boucle(g); [[.1, 0], [.45, 1], [.75, 2]].forEach(([t, c]) => { const P = [t, t - .02, t - .04].map(u => bp(u, 0)); P.forEach(([x, y]) => g.A(x, y, '', {c: EQ[c]})); g.rope(...P[0], ...P[2], 0, '#e11d48'); });
      return g.label(200, 125, 'jamais plus de 5 m entre nous', {s: 10, b: 1}).n(1, 'par 3, on court ensemble {8|6} min à l\'allure du plus lent'); },
    tourmonde: g => { boucle(g); cour(g, [.08, .3, .55, .78]); g.raw('<rect x="140" y="80" width="120" height="90" rx="6" fill="#dbeafe" stroke="#2d3530"/><path d="M160 105L190 115L215 140L235 155" fill="none" stroke="#e11d48" stroke-width="2.5" stroke-dasharray="4 3"/>', 'mid');
      return g.label(160, 98, 'Bruxelles', {s: 8, a: 'start'}).label(232, 165, 'Dakar', {s: 8, a: 'end'}).n(1, 'chaque boucle courue fait avancer la classe d\'une étape sur la carte'); },
    'Prévu-réalisé : j\'ajuste': g => { boucle(g); cour(g, [.15, .5]); g.B(200, 125).sheet(222, 125).tag(200, 98, 'je change UNE chose', {s: 9.5}); return g.n(1, 'chacun relit sa séance, change une seule chose, la court ; le partenaire note les temps'); },
    'Prévu-réalisé : je confirme': g => { boucle(g); cour(g, [.15, .5]); g.B(200, 125).sheet(222, 125).tag(200, 98, 'ma séance d\'évaluation, en entier', {s: 9.5}); return g.n(1, 'on court la séance qu\'on présentera ; le partenaire note l\'écart avec le prévu'); }
  };
})();
