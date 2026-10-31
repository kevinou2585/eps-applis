/* Athlétisme en jeux : 6 leçons par année (1re → 6e secondaire), la 6e = évaluation.
   Format « jeux » (voir carnet/prepa-moteur.js). Toujours au stade : piste à couloirs, sautoir en longueur, aire de poids ;
   pas de haies ni de sautoir en hauteur (les obstacles sont des lattes posées sur des cônes).
   Idées mêlées et réécrites : classeur EPS, athlétisme des enfants (équipes, points, relais formule 1, saut de grenouille, lancer à genoux),
   défis de handicap, records de classe. On joue en équipes : chaque performance rapporte des points à son équipe. */
PREPA_JEUX({id: 'athle',
sport: 'Athlétisme',
mat: [['cône', 24, 'cones'], ['coupelle', 30, 'plots'], ['latte (ou bâton) pour les obstacles', 12], ['cerceau', 12, 'cerceaux'], ['témoin', 6], ['vortex (ou javelot en mousse)', 0.25], ['poids de 2 à 4 kg (ou sac de sable)', 0.25], ['anneau (ou frisbee)', 6], ['médecine-ball (1 à 2 kg)', 6], ['chasuble (4 couleurs)', 1, 'chasubles'], ['chronomètre', 4], ['décamètre', 2], ['fiche de points et crayon', 4]],
lieu: {n: 'Le stade d\'athlétisme', d: 'piste officielle avec couloirs, sautoir en longueur, aire de lancer du poids · pas de haies ni de sautoir en hauteur', pre: 'À emporter au stade : ', tk: {piste: 'la ligne droite de la piste', sable: 'le bac à sable'}, note: 'la ligne droite de la piste (couloirs), le sautoir en longueur et l\'aire de poids. Les obstacles sont des lattes ou des bâtons posés sur des cônes (on les emporte).', warn: 'Lancers : on lance tous au même signal, on ramasse tous au même signal ; personne dans le secteur pendant les lancers.'},
J: {
  millepattes: {n: 'Le mille-pattes', k: 'coop', s: 'files', f: 'e4', d: 'Relais : le premier fait l\'aller-retour jusqu\'au cône (20 m), puis prend la main du 2e et repart avec lui, puis du 3e… jusqu\'à ce que toute l\'équipe coure main dans la main. Si la chaîne casse, on revient au départ.'},
  cone: {n: 'Le cône du plus rapide', k: 'opp', s: 'deux', f: 'p', d: 'Par deux face à face, un cône entre eux. Le prof annonce « assis, saute, pas à droite, demi-tour… » puis « CÔNE ! » : le premier qui attrape le cône gagne le point. Le perdant change de partenaire.'},
  vague: {n: 'La vague', k: 'opp', s: 'saut', d: 'Toute la classe en ligne. Le prof (ou un élève) fait rouler un cerceau ou tourne une corde au ras du sol vers la ligne : on saute par-dessus sans se faire toucher les pieds. Touché = 3 sauts de grenouille et on revient.'},
  gammes: {n: 'Les gammes du champion', k: 'coop', s: 'course', f: 'e4', d: 'Toute la classe en même temps, un ou deux élèves par couloir sur la ligne droite : on part ensemble sur 20 m au coup de sifflet (montées de genoux, talons-fesses, pas chassés, foulées bondissantes, puis une accélération), on revient en trottinant et on repart avec le geste suivant. Un « coach » par couloir dit « top » quand le geste est bien fait.'},
  chatlignes: {n: 'Le chat des couloirs', k: 'opp', s: 'piste', d: 'On ne court que dans les couloirs de la piste, sans couper. {n/8 chat} touchent ; un touché fait 5 squats puis devient chat.'},
  baton: {n: 'Le bâton qui tombe', k: 'opp', s: 'deux', f: 'p', d: 'Par deux : A tient un bâton (ou un témoin) à la verticale et le lâche sans prévenir ; B, la main ouverte à côté, doit le rattraper avant qu\'il touche le sol. Puis B part en sprint 10 m dès qu\'il l\'a attrapé.'},
  ballon: {n: 'Plus vite que le ballon', k: 'opp', s: 'course', f: 'g4', d: 'Un élève fait rouler un gros ballon sur {piste} (20-30 m) ; les coureurs partent en même temps et doivent arriver au cône avant le ballon. On roule plus fort à chaque réussite.'},
  touchecours: {n: 'Touche et cours', k: 'opp', s: 'course', f: 'p', d: 'Par deux face à face : le fuyard tape dans les mains du chasseur puis sprinte vers une ligne à 10 m ; le chasseur réagit et essaie de le toucher avant la ligne. On change de rôle.'},
  handicap: {n: 'La course à handicap', k: 'fp', s: 'course', f: 'g4', d: 'Par 4, sur 40 m : chacun part de la ligne qui correspond à son temps (les plus rapides partent plus loin derrière). Le but : arriver tous en même temps ! Si un coureur gagne de loin, il recule d\'un plot.'},
  formule1: {n: 'La formule 1', k: 'coop', s: 'piste', f: 'e4', d: 'Relais en circuit : sprint 15 m, slalom entre 4 cônes, obstacles bas (lattes), roulade ou 3 sauts de grenouille, sprint jusqu\'au suivant. Le témoin (ou un cerceau) passe de main en main. L\'équipe la plus rapide gagne 4 points, la 2e 3 points…'},
  navette: {n: 'Le relais navette', k: 'coop', s: 'files', f: 'e4', d: 'Les équipes sont coupées en deux, face à face à 20-30 m. On sprinte jusqu\'à l\'autre moitié et on tape la main du suivant (ou on passe le témoin). Départ anticipé = on refait son trajet.'},
  temoin: {n: 'Le relais témoin', k: 'coop', s: 'course:athle:relais', f: 'e4', d: 'Relais en ligne droite, zone de passage marquée par des coupelles. Le receveur part quand le porteur touche la marque au sol, tend la main en arrière sans se retourner ; le porteur crie « hop ! ». Témoin tombé ou passé hors zone = 3 s de pénalité.'},
  obstacles: {n: 'Le couloir à obstacles', k: 'opp', s: 'course:athle:haies', f: 'g4', d: 'Dans un couloir de la piste, 4 à 6 obstacles bas (lattes sur cônes). Course à 4 : on franchit sans s\'arrêter, sans sauter à pieds joints, en gardant le même rythme entre les obstacles. Couloirs « courts » et « longs » pour que chacun trouve son rythme.'},
  pronostic: {n: 'Le pronostic', k: 'fp', s: 'course', f: 'p', d: 'Avant de courir (ou de sauter, de lancer), chacun annonce son pronostic : temps ou distance. Le partenaire mesure. Le gagnant n\'est pas le plus rapide, mais celui qui est le plus proche de son pronostic !'},
  minutes: {n: 'La chasse aux cônes', k: 'coop', s: 'piste', f: 'e4', d: 'Des cônes de couleur sont posés tout autour de la piste. En équipe et au chrono (4 à 8 min), chaque coureur rapporte un cône à la fois au camp. Plus le cône est loin, plus il rapporte de points. Allure régulière obligatoire : pas de marche.'},
  riviere: {n: 'La rivière aux crocodiles', k: 'opp', s: 'saut', f: 'g4', d: 'Deux cordes (ou deux lignes de coupelles) forment une rivière qui s\'élargit. On la franchit après un élan, appel sur un pied, réception à deux pieds. Pied dans l\'eau = mangé par les crocos ! On s\'arrête à la largeur où l\'on réussit 2 fois sur 3.'},
  grenouille: {n: 'Le saut de grenouille', k: 'coop', s: 'saut', f: 'e4', d: 'En équipe : le premier fait un saut pieds joints depuis la ligne ; le 2e part de l\'endroit où sont tombés les talons du 1er, et ainsi de suite. On mesure la distance totale de l\'équipe. On compare avec les autres équipes, puis on essaie de battre le record.'},
  cerceaux: {n: 'Le chemin des cerceaux', k: 'coop', s: 'files', f: 'g4', d: 'Une ligne de cerceaux espacés : un appui par cerceau, puis en cloche-pied, puis en « même-même-autre ». On écarte les cerceaux à chaque passage réussi.'},
  longueur: {n: 'Le saut des zones', k: 'opp', s: 'saut', f: 'g4', d: 'Au sautoir en longueur, des zones dans le sable valent 1, 2, 3, 4 points (coupelles sur le bord). Appel dans la zone d\'appel (1 m de large, pas de planche à mordre). 3 sauts, on additionne pour son équipe.'},
  cibles: {n: 'Le lancer sur cibles', k: 'opp', s: 'lancer', f: 'g4', d: 'Des cerceaux posés à 5, 10, 15 et 20 m valent 1, 2, 3, 4 points. Chacun lance 3 fois (balle, anneau, vortex). Les points vont à l\'équipe.'},
  genoux: {n: 'Le lancer à genoux', k: 'opp', s: 'lancer', f: 'g4', d: 'À genoux derrière une ligne, médecine-ball tenu à deux mains derrière la tête : on lance le plus loin possible en se redressant. Chaque lancer est marqué par une coupelle de la couleur du lanceur.'},
  poids: {n: 'La poussée du poids', k: 'opp', s: 'lancer', f: 'g4', d: 'Dans l\'aire de poids : le poids est calé contre le cou, coude haut, on pousse (on ne lance pas avec le bras) sans sortir du cercle. Zones à points dans le secteur.'},
  javelot: {n: 'Le javelot des chevaliers', k: 'opp', s: 'lancer', f: 'g4', d: 'Avec un vortex ou un javelot en mousse : viser un « dragon » (cerceau ou grand carton) posé à 10-15 m, puis lancer le plus loin possible après 3 pas d\'élan, au-dessus de l\'épaule, sans franchir la ligne.'},
  rotation: {n: 'Le lancer en rotation', k: 'opp', s: 'lancer', f: 'g4', d: 'Anneau ou frisbee : de profil, bras long en arrière, rotation des hanches ; puis dos à la zone avec un demi-tour. L\'engin doit tomber dans le secteur (coupelles) : sinon, 0.'},
  decathlon: {n: 'Le décathlon des équipes', k: 'coop', s: 'ateliers:athle:4', f: 'a4', d: 'Quatre ateliers (course, saut, lancer, défi d\'équipe) ; chaque équipe fait chaque atelier en 4 à 8 min et marque des points avec le barème affiché. Les points de tous les membres s\'additionnent : un élève qui progresse rapporte autant qu\'un champion.'},
  record: {n: 'Le record de la classe', k: 'coop', s: 'course', d: 'Toute la classe ensemble : on additionne les performances de tous (mètres sautés, mètres lancés, secondes de relais). Le total est affiché : à chaque leçon, on essaie de battre le record de la classe.'},
  bilan: {n: 'Le podium des progrès', k: 'fp', s: 'etirements', d: 'Étirements des mollets, des cuisses et des épaules. Chacun note sa meilleure performance. On fait monter sur le « podium » (un banc ou une ligne) celui qui a le plus progressé, celui qui a le plus encouragé, et un juge sérieux.'},
  marche: {n: 'Le tour du silence', k: 'coop', s: 'piste', d: 'Un tour de piste en marchant, par deux, en silence : on respire profondément ; puis étirements guidés. Chacun dit une chose qu\'il a mieux réussie qu\'au début.'},
  ombre: {n: 'L\'ombre de l\'athlète', k: 'coop', s: 'deux', f: 'p', d: 'Par deux, l\'un derrière l\'autre sur la pelouse : le meneur enchaîne les gestes de l\'athlète (montées de genoux, pas chassés, foulées bondissantes, sauts de grenouille, départ arrêt-sprint), son ombre le copie collée derrière lui. Toutes les 30 s, on change. Au sifflet, l\'ombre essaie de toucher le meneur qui sprinte 10 m.'},
  queues: {n: 'La chasse aux queues', k: 'opp', s: 'chat', d: 'Chacun glisse une chasuble à l\'arrière de son short (la queue). Dans un grand carré de pelouse, on essaie d\'arracher les queues des autres en gardant la sienne : départs, freinages, changements de direction. Queue arrachée = 1 point ; celui qui a perdu la sienne en reprend une au bac. 1 min 30 par manche.'},
  zoo: {n: 'Les sauts du zoo', k: 'coop', s: 'saut', d: 'Toute la classe sur la largeur de la pelouse. Le prof annonce un animal et chacun traverse 15 m à sa façon : kangourou (pieds joints), grenouille (accroupi), flamant (cloche-pied), gazelle (foulées bondissantes), cheval (pas sautés). Puis on compte ses bonds : qui traverse en faisant le moins de bonds ?'},
  corde: {n: 'La corde du sprinteur', k: 'coop', s: 'libre', d: 'Chacun sa corde à sauter (ou par deux avec une corde). Défis de 15 s : pieds joints, alternés, sur un pied, en courant sur place, en croisant. On compte ses sauts : record personnel sur chaque défi. Les appuis rapides et légers, c\'est le pied du sprinteur.'},
  feu: {n: 'Le feu tricolore', k: 'coop', s: 'piste', d: 'Tout le monde court sur la piste dans le même sens. Le prof montre une couleur : vert = sprint, orange = trot, rouge = arrêt en équilibre sur un pied, bleu = demi-tour et trot dans l\'autre sens. De plus en plus vite. On apprend à changer d\'allure à la demande.'},
  poursuite: {n: 'La poursuite', k: 'opp', s: 'piste', f: 'e2', d: 'La course poursuite de l\'athlétisme des enfants : deux équipes partent en même temps de deux côtés opposés d\'un circuit de 100 m (avec quelques lattes à franchir). Chaque coureur fait un tour puis passe le relais par une tape dans la main. L\'équipe qui rattrape l\'autre ou qui a fait le plus de tours au bout de 4 min gagne.'},
  crosshop: {n: 'La marelle en croix', k: 'coop', s: 'saut', f: 'g4', d: 'Quatre carrés de coupelles en croix autour d\'un carré central. Pieds joints, on saute du centre vers un carré, retour au centre, carré suivant… dans le sens d\'une montre. Chacun 15 s, un partenaire compte les sauts, les deux autres font des sauts sur place en attendant. Record du groupe : on additionne les 4 scores.'}
},
an: {
1: {th: 'Découvrir l\'athlétisme : courir vite, sauter loin, lancer loin', comp: ['HME1', 'HME2', 'HME4', 'GSS1'], l: [
  {t: 'Vitesse et réaction', o: 'Réagir vite à un signal, démarrer et courir droit à vitesse maximale.',
   e: [['millepattes', 6],
    ['cone', 7]],
   c: [['ballon', 15, 'Regard droit devant, on court jusqu\'au-delà de la ligne.', 'J\'arrive avant le ballon {3|2} fois sur 4.', 'Le départ se fait assis, couché ou dos à la course.'],
    ['touchecours', 16, '', 'Je réagis tout de suite.', 'Ligne plus loin.'],
    ['Les départs rigolos', 15, 'Sprints de 20 m depuis des positions différentes (assis, couché, dos à la course, à genoux), puis « à vos marques - prêts - partez ». Par vagues de 4 : le gagnant de la vague marque 1 point pour son équipe.', 'Je pars au signal, ni avant ni après.', 'Le starter change le temps entre « prêts » et « partez ».', 'course', 'g4']],
   x: [['handicap', 15, 'Premier temps sur 40 m chronométré par l\'équipe.', 'Je connais mon temps.']],
   r: [['bilan', 7]]},
  {t: 'Les relais', o: 'Transmettre un témoin sans s\'arrêter et partir au bon moment.',
   e: [['chatlignes', 6],
    ['Le témoin à l\'arrêt', 7, 'En colonne de 4 en marchant, puis en trottinant : le témoin passe de la main droite à la main gauche du suivant, qui tend la main en arrière sans se retourner. Le porteur crie « hop ! ».', '', '', 'files', 'e4']],
   c: [['navette', 15, '', 'Je pars au bon moment, sans tricher.', 'On passe un témoin.'],
    ['temoin', 16, 'Relais 4 × 30 m.', 'Notre témoin passe dans la zone sans tomber.', 'Le receveur part plus tôt (marque reculée).'],
    ['formule1', 15, '', 'Mon équipe gagne une manche.']],
   x: [['record', 15, 'Total des temps de relais de toute la classe.', 'La classe bat son premier record.']],
   r: [['marche', 7]]},
  {t: 'Les obstacles et le saut en longueur', o: 'Franchir des obstacles bas sans ralentir ; prendre son impulsion sur un pied.',
   e: [['vague', 6],
    ['cerceaux', 7]],
   c: [['obstacles', 15, 'On attaque l\'obstacle avec la même jambe, on ne saute pas à pieds joints.', 'Je franchis tous les obstacles sans m\'arrêter.', 'Couloir long pour les plus grands.'],
    ['riviere', 16, '', 'Je franchis une rivière de {2|1,5} m.', 'Élan plus long, la rivière se fait au sautoir (réception dans le sable).'],
    ['longueur', 15, 'Au sautoir : élan court (6 à 8 pas).', 'Mon équipe marque {20|12} points.']],
   x: [['poursuite', 15, 'Avec 3 lattes sur le circuit : on les franchit sans ralentir.', 'Mon équipe fait un tour de plus que l\'autre.']],
   r: [['meteo', 7]]},
  {t: 'Les bonds et le lancer du poids', o: 'Enchaîner des bonds ; pousser un engin depuis l\'épaule.',
   e: [['Le chat saute-mouton', 6, 'Les élèves touchés s\'accroupissent, tête rentrée ; un camarade les délivre en sautant par-dessus (mains sur le dos).', '', '', 'chat'],
    ['gammes', 7]],
   c: [['grenouille', 15, '', 'Mon équipe bat son record.', 'Trois bonds chacun au lieu d\'un.'],
    ['genoux', 16, 'On pousse avec tout le corps.', 'Je lance plus loin que mon 1er essai.', 'Debout, de face, puis de profil.'],
    ['poids', 15, 'Sac de sable ou poids léger.', 'Je pousse sans décoller le poids du cou avant la poussée.']],
   x: [['crosshop', 15, 'Pieds joints, appuis légers et rapides.', 'Je fais {20|15} sauts en 15 s.', 'Sur un pied pour les plus forts.']],
   r: [['mercis', 7]]},
  {t: 'Le disque et le javelot', o: 'Lancer en rotation et lancer en ligne avec élan.',
   e: [['queues', 6],
    ['zoo', 7]],
   c: [['rotation', 15, '', 'Mon anneau tombe dans le secteur {3|2} fois sur 3.', 'Demi-tour avant de lancer.'],
    ['javelot', 16, '', 'Je touche le dragon une fois.', 'Élan de 5 pas.'],
    ['cibles', 15, 'On lance avec l\'engin de son choix.', 'Mon équipe marque {25|15} points.']],
   x: [['decathlon', 15, 'Petit décathlon : un atelier de chaque famille.', 'Mon équipe marque des points dans chaque atelier.']],
   r: [['parole', 7]]},
  {t: 'Évaluation : triathlon', o: 'Réaliser une course, un saut et un lancer et comparer avec ses premiers essais.',
   crit: [['Course : départ et trajectoire', 4, '4 : part au signal, court droit, finit au-delà de la ligne · 2 : départ en retard ou ralentit avant la ligne · 0 : faux départs répétés'], ['Course : performance (meilleur temps)', 3, '3 : améliore son temps du premier essai du cycle · 2 : même temps · 1 : plus lent'], ['Saut : technique et règle', 4, '4 : appel sur un pied dans la zone, réception en sécurité · 2 : appel approximatif · 0 : ne saute pas'], ['Saut : performance', 3, '3 : améliore sa marque de départ · 2 : même marque · 1 : moins'], ['Lancer : technique et sécurité', 3, '3 : technique apprise, attend le signal, va chercher l\'engin au signal · 1 : approximative · 0 : non sécurisé'], ['Lancer : performance', 3, '3 : améliore sa marque · 2 : même marque · 1 : moins']],
   e: [['corde', 6],
    ['ombre', 7]],
   c: [['Épreuve 1 : sprint ou obstacles', 12, 'Chacun choisit : 30 m plat ou 30 m avec obstacles bas. 2 essais chronométrés par des camarades.', '', '', 'course', 'g4'],
    ['Épreuve 2 : saut en longueur', 13, '3 essais, zone d\'appel.', '', '', 'saut', 'g4'],
    ['Épreuve 3 : lancer au choix', 13, 'Poids, anneau ou javelot : 3 essais mesurés, on garde le meilleur.', '', '', 'lancer', 'g4']],
   r: [['respire', 6]]}
]},
2: {th: 'Mieux courir, sauter et lancer : départ, rythme, élan', comp: ['HME1', 'HME2', 'HME4', 'GSS1'], l: [
  {t: 'Le départ et la mise en action', o: 'Réussir un départ debout puis accroupi et accélérer sur 30 m.',
   e: [['baton', 6],
    ['gammes', 7]],
   c: [['Le duel des starters', 15, 'Par 4 : un starter, 2 coureurs, un juge d\'arrivée. Départs accroupis (« à vos marques, prêts, partez »). Le starter varie le temps. Faux départ = on recule d\'un mètre.', 'Je gagne {2|1} duels.', 'Départ avec les mains au sol (4 appuis).', 'course', 'g4'],
    ['ballon', 16, 'Départ accroupi.', 'J\'arrive avant le ballon.'],
    ['pronostic', 15, 'Sur 30 m.', 'Je suis à moins de {0,3|0,5} s de mon pronostic.']],
   x: [['handicap', 15, '', 'Mon groupe arrive presque ensemble.']],
   r: [['bilan', 7]]},
  {t: 'Les obstacles : le rythme à 3 appuis', o: 'Courir entre les obstacles avec un rythme régulier de 3 appuis.',
   e: [['cerceaux', 6, 'Rythme « 1-2-3, saute ».'],
    ['vague', 7]],
   c: [['obstacles', 15, 'On compte à voix haute : « 1-2-3, hop ».', 'Je garde 3 appuis entre chaque obstacle.', 'Obstacles plus hauts (2 cônes empilés).'],
    ['La poursuite des obstacles', 16, 'Deux couloirs côte à côte : le chasseur part 2 m derrière. Il doit toucher le fuyard avant la fin. Puis on change.', 'Je ne suis pas rattrapé.', 'Écart plus grand.', 'course:athle:haies', 'p'],
    ['formule1', 15, 'Avec obstacles réglés au rythme de 3.', 'Mon équipe gagne une manche.']],
   x: [['poursuite', 15, 'Avec des obstacles au rythme de 3 appuis.', 'Mon équipe rattrape l\'autre.']],
   r: [['marche', 7]]},
  {t: 'Le saut en longueur : élan et appel', o: 'Prendre un élan étalonné et appeler dans une zone.',
   e: [['zoo', 6, 'On termine par la gazelle : foulées bondissantes, comme l\'élan du saut.'],
    ['corde', 7]],
   c: [['L\'élan étalonné', 15, 'En partant de la zone d\'appel, on court à l\'envers 8 à 12 foulées : le partenaire pose une coupelle là où l\'on est. C\'est sa marque d\'élan. On essaie : on ajuste la coupelle.', 'Mon appel tombe dans la zone {2|1} fois sur 3.', '', 'saut', 'p'],
    ['longueur', 16, 'Avec son élan étalonné.', 'Mon équipe marque {24|15} points.', 'La zone d\'appel est plus étroite (50 cm).'],
    ['grenouille', 15, 'Puis le « triple bond » de l\'équipe.', 'Mon équipe bat son record.']],
   x: [['record', 15, 'Total des sauts de la classe.', 'La classe bat son record.']],
   r: [['meteo', 7]]},
  {t: 'Le lancer du poids : la poussée', o: 'Pousser le poids avec un transfert du poids du corps.',
   e: [['chatlignes', 6],
    ['queues', 7]],
   c: [['genoux', 15, 'Puis debout de face, puis de profil.', 'Je lance plus loin de profil que de face.'],
    ['poids', 16, 'Jambe arrière qui pousse, rotation, bras qui finit vers le haut.', 'Mon poids tombe dans la zone {3|2}.', 'Avec un petit pas chassé.'],
    ['cibles', 15, 'Au poids : les cerceaux sont des cibles.', 'Mon équipe marque des points.']],
   x: [['decathlon', 15, '', 'Mon équipe marque dans chaque atelier.']],
   r: [['mercis', 7]]},
  {t: 'Le relais 4 × 50 m', o: 'Passer le témoin en pleine vitesse dans une zone.',
   e: [['millepattes', 6],
    ['Le témoin à l\'arrêt', 7, '', '', '', 'files', 'e4']],
   c: [['temoin', 16, '4 × 50 m dans les couloirs.', 'Notre témoin passe dans la zone.', 'La marque de départ recule d\'un pied.'],
    ['L\'américaine', 15, 'Deux coureurs par équipe se relaient sans arrêt : un tour de 100 m chacun, le témoin passe dans la zone. 6 min : combien de passages ?', 'Mon équipe fait {10|6} passages.', '', 'piste', 'e4'],
    ['navette', 15, '', 'Je pars au bon moment.']],
   x: [['Le relais final', 15, 'Grand relais de toute la classe, équipes mélangées.', 'Mon équipe passe le témoin sans le faire tomber.', '', 'course:athle:relais', 'e4']],
   r: [['parole', 7]]},
  {t: 'Évaluation : triathlon', o: 'Évaluer une course, un saut et un lancer.',
   crit: [['40 m (ou obstacles) : départ et course', 3, '3 : départ au signal, course droite et rapide · 1 : départ en retard · 0 : faux départs'], ['40 m : performance', 4, '4 : améliore nettement son temps de départ · 3 : légèrement · 2 : même · 1 : moins'], ['Longueur : élan étalonné et appel', 3, '3 : appel dans la zone, élan régulier · 1 : appel mordu · 0 : pas d\'élan'], ['Longueur : performance', 4, '4 : progrès net · 3 : léger · 2 : même · 1 : moins'], ['Poids : poussée correcte', 3, '3 : poids collé au cou, poussé (pas lancé) · 1 : bras tendu · 0 : lancé'], ['Poids : performance', 3, '3 : progrès · 2 : même · 1 : moins']],
   e: [['feu', 6],
    ['ombre', 7]],
   c: [['Épreuve 1 : 40 m ou 40 m obstacles', 12, '2 essais chronométrés.', '', '', 'course', 'g4'],
    ['Épreuve 2 : longueur', 13, 'Élan étalonné, 3 essais.', '', '', 'saut', 'g4'],
    ['Épreuve 3 : poids', 13, '3 essais.', '', '', 'lancer', 'g4']],
   r: [['respire', 6]]}
]},
3: {th: 'Technique et performance : multibonds, triple saut, javelot, demi-fond', comp: ['HME1', 'HME2', 'GSS1', 'GSS2'], l: [
  {t: 'Les multibonds', o: 'Enchaîner des bonds longs et réguliers en gardant de la vitesse.',
   e: [['vague', 6],
    ['cerceaux', 7]],
   c: [['Le pentabond', 15, '5 bonds enchaînés (droite-gauche-droite-gauche-réception) depuis un départ arrêté, puis après 4 pas d\'élan. Le partenaire mesure.', 'Je fais {10|8} m en 5 bonds.', 'Avec élan plus long.', 'saut', 'p'],
    ['grenouille', 16, 'Version « pentabond » : chacun fait 5 bonds.', 'Mon équipe bat son record.'],
    ['Le moins de bonds', 15, 'Sur 20 m : qui fait le moins de bonds ? On compte à voix haute. On note son score et on essaie de faire 1 bond de moins.', 'Je fais 1 bond de moins qu\'au début.', '', 'saut', 'g4']],
   x: [['handicap', 15, '', 'Mon groupe arrive presque ensemble.']],
   r: [['bilan', 7]]},
  {t: 'Le triple saut', o: 'Enchaîner cloche-pied, foulée et saut (même-même-autre).',
   e: [['gammes', 6],
    ['zoo', 7, 'Flamant, flamant, kangourou : le rythme du triple saut.']],
   c: [['Les 3 cerceaux', 15, 'Trois cerceaux au sol avant le bac : cloche-pied, foulée, saut. On écarte les cerceaux à chaque réussite.', 'Je fais le bon rythme {3|2} fois sur 3.', '', 'saut', 'g4'],
    ['Le triple saut au bac', 16, 'Appel dans une zone à 5-7 m du bac, élan court. Mesure par l\'équipe.', 'Je fais un triple saut sans erreur de pied.', 'Zone d\'appel plus loin.', 'saut', 'g4'],
    ['longueur', 15, '', 'Mon équipe marque des points.']],
   x: [['record', 15, 'Total des triples sauts de la classe.', 'La classe bat son record.']],
   r: [['marche', 7]]},
  {t: 'Le javelot', o: 'Lancer le javelot (ou vortex) après un élan avec pas croisé.',
   e: [['chatlignes', 6],
    ['baton', 7]],
   c: [['javelot', 15, 'Bras tendu en arrière, pointe à hauteur des yeux.', 'Mon javelot vole droit {2|1} fois sur 3.'],
    ['Le pas croisé', 16, 'Sans engin puis avec : 3 pas d\'élan, puis pas croisé (la jambe arrière passe devant) et lancer. On compte « 1-2-croisé-lance ».', 'Je fais le pas croisé sans m\'arrêter.', 'Élan de 5 pas.', 'lancer', 'g4'],
    ['cibles', 15, 'Au javelot.', 'Mon équipe marque {25|15} points.']],
   x: [['decathlon', 15, '', 'Mon équipe marque dans chaque atelier.']],
   r: [['meteo', 7]]},
  {t: 'Le demi-fond : 1 000 m', o: 'Courir 1 000 m à une allure régulière.',
   e: [['millepattes', 6],
    ['feu', 7, 'Changer d\'allure à la demande : c\'est la clé du demi-fond.']],
   c: [['Le tour de l\'horloge', 15, 'Des coupelles tous les 50 m sur la piste. Le prof siffle toutes les 15 s : on doit être à une coupelle à chaque coup de sifflet. On choisit son groupe d\'allure.', 'Je suis à la coupelle {6|4} fois de suite.', 'Allure un peu plus vive.', 'piste', 'g4'],
    ['minutes', 16, '', 'Mon équipe marque {30|20} points.'],
    ['Le 1 000 m pronostic', 15, 'Chacun annonce son temps avant de courir 1 000 m (2 tours et demi). Le partenaire chronomètre et annonce les temps de passage.', 'Je suis à moins de {20|30} s de mon pronostic.', '', 'piste', 'p']],
   x: [['L\'américaine', 15, '', 'Mon équipe fait des passages.', '', 'piste', 'e4']],
   r: [['mercis', 7]]},
  {t: 'Le disque en rotation', o: 'Lancer le disque avec une rotation (demi-tour puis tour complet).',
   e: [['queues', 6],
    ['cone', 7]],
   c: [['rotation', 15, 'Puis avec un tour complet.', 'Mon anneau tombe dans le secteur {3|2} fois sur 3.'],
    ['Le lanceur de précision', 16, 'Des cerceaux dans le secteur : 3 lancers en rotation, points selon le cerceau.', 'Je marque {6|4} points.', '', 'lancer', 'g4'],
    ['genoux', 15, 'En rotation : de profil, médecine-ball lancé de côté.', 'Je lance plus loin qu\'au début.']],
   x: [['poursuite', 15, 'Pour finir en courant après les lancers.', 'Mon équipe rattrape l\'autre.']],
   r: [['parole', 7]]},
  {t: 'Évaluation : pentathlon', o: 'Évaluer 5 épreuves au choix : course, saut, lancer, demi-fond.',
   crit: [['Course (sprint ou obstacles)', 4, 'Barème : très bon = 4 · bon = 3 · moyen = 2 · faible = 1'], ['Saut (multibonds ou triple)', 4, 'Barème : très bon = 4 · bon = 3 · moyen = 2 · faible = 1'], ['Lancer (javelot ou disque)', 4, 'Barème : très bon = 4 · bon = 3 · moyen = 2 · faible = 1'], ['1 000 m', 4, 'Barème : très bon = 4 · bon = 3 · moyen = 2 · faible = 1'], ['Progrès (au moins 2 performances)', 4, '4 : améliore 3 performances ou plus · 3 : 2 · 2 : 1 · 0 : aucune']],
   e: [['corde', 6],
    ['ombre', 7]],
   c: [['Le pentathlon', 26, 'Ateliers sprint, saut, lancer, avec juges de l\'équipe ; barème affiché.', '', '', 'ateliers:athle:4', 'a4'],
    ['Le 1 000 m', 12, 'Par vagues, temps annoncés.', '', '', 'piste']],
   r: [['respire', 6]]}
]},
4: {th: 'Spécialités et entraînement : se préparer à une rencontre', comp: ['HME1', 'HME2', 'GSS1', 'HSC2'], l: [
  {t: 'Choisir sa spécialité', o: 'Tester plusieurs épreuves et choisir une course, un saut et un lancer à préparer.',
   e: [['millepattes', 6],
    ['gammes', 7]],
   c: [['decathlon', 22, 'Tour des ateliers : 40 m, obstacles, longueur, multibonds, poids, javelot, anneau. Chacun note sa performance et ses points.', 'J\'ai une performance dans chaque famille.'],
    ['Mon trio', 12, 'Chacun choisit sa course, son saut et son lancer d\'après ses points et son envie. On l\'écrit sur sa fiche avec un objectif chiffré.', 'Mon trio et mes objectifs sont écrits.', '', 'explication'],
    ['handicap', 12, '', 'Mon groupe arrive presque ensemble.']],
   x: [['formule1', 15, '', 'Mon équipe gagne une manche.']],
   r: [['bilan', 7]]},
  {t: 'Entraînement course', o: 'Améliorer sa course : départ et vitesse, obstacles ou demi-fond.',
   e: [['baton', 6],
    ['feu', 7]],
   c: [['Les trois couloirs', 16, 'Trois ateliers selon son choix : départs (duel des starters), obstacles (rythme à 3 appuis), demi-fond (tour de l\'horloge). Le prof tourne.', 'Je progresse sur mon atelier.', 'Chacun s\'auto-chronomètre.', 'ateliers:athle:4', 'g6'],
    ['pronostic', 15, '', 'Je suis proche de mon pronostic.'],
    ['temoin', 15, '', 'Notre témoin passe dans la zone.']],
   x: [['L\'américaine', 15, '', 'Mon équipe fait des passages.', '', 'piste', 'e4']],
   r: [['marche', 7]]},
  {t: 'Entraînement saut', o: 'Améliorer son saut : élan, appel et réception.',
   e: [['vague', 6],
    ['cerceaux', 7]],
   c: [['L\'élan étalonné', 15, '', 'Mon appel tombe dans la zone {2|1} fois sur 3.', '', 'saut', 'p'],
    ['Le coach vidéo', 16, 'Par 3 : un sauteur, un juge d\'appel, un « coach » qui filme ou observe un seul point (appel, bras, réception) et donne un conseil.', 'J\'applique le conseil de mon coach.', '', 'saut', 'g3'],
    ['longueur', 15, 'Longueur ou triple saut au choix.', 'Mon équipe marque des points.']],
   x: [['grenouille', 15, '', 'Mon équipe bat son record.']],
   r: [['meteo', 7]]},
  {t: 'Entraînement lancer', o: 'Améliorer son lancer : placement, transfert du poids, trajectoire.',
   e: [['chatlignes', 6],
    ['queues', 7]],
   c: [['genoux', 15, '', 'Je lance plus loin qu\'au début.'],
    ['Le lanceur de précision', 16, 'Au lancer choisi : des cerceaux dans le secteur, 3 lancers, on vise le plus loin possible dans le bon couloir.', 'Je touche un cerceau.', '', 'lancer', 'g4'],
    ['cibles', 15, 'Avec son engin.', 'Mon équipe marque des points.']],
   x: [['poursuite', 15, 'Pour finir l\'entraînement en courant.', 'Mon équipe rattrape l\'autre.']],
   r: [['mercis', 7]]},
  {t: 'Les officiels', o: 'Être starter, chronométreur, juge de saut ou de lancer lors d\'une rencontre d\'essai.',
   e: [['zoo', 6],
    ['corde', 7]],
   c: [['La rencontre d\'essai', 34, 'Chaque élève concourt dans son trio et tient un rôle d\'officiel : starter, chronos, juge d\'appel, mesureur, secrétaire. On tourne à chaque épreuve.', 'Je tiens mon rôle sans erreur.', 'Le secrétaire calcule les points d\'équipe.', 'ateliers:athle:4', 'a4'],
    ['Le quiz des juges', 12, 'Le prof mime : appel mordu, faux départ, poids lancé, sortie du cercle… Chaque équipe lève drapeau blanc (valable) ou rouge (faute).', 'Mon équipe a {6|4} bonnes réponses.', '', 'explication']],
   x: [['Le relais final', 15, 'Le relais de la rencontre d\'essai, avec juges de passage.', 'Mon équipe passe le témoin dans la zone.', '', 'course:athle:relais', 'e4']],
   r: [['parole', 7]]},
  {t: 'Évaluation : la rencontre', o: 'Concourir dans ses 3 épreuves et tenir un rôle d\'officiel.',
   crit: [['Épreuve 1', 4, 'Barème : très bon = 4 · bon = 3 · moyen = 2 · faible = 1'], ['Épreuve 2', 4, 'Barème : très bon = 4 · bon = 3 · moyen = 2 · faible = 1'], ['Épreuve 3', 4, 'Barème : très bon = 4 · bon = 3 · moyen = 2 · faible = 1'], ['Progrès (2 des 3 performances)', 4, '4 : améliore les 3 · 3 : 2 · 2 : 1 · 0 : aucune'], ['Rôle d\'officiel', 4, '4 : mesure, chronomètre ou juge sans erreur, note les résultats · 2 : erreurs · 0 : n\'officie pas']],
   e: [['ombre', 6],
    ['cone', 7]],
   c: [['La rencontre', 38, 'Ateliers tournants, officiels élèves ; le prof valide les performances.', '', '', 'ateliers:athle:4', 'a4']],
   r: [['respire', 6]]}
]},
5: {th: 'Se préparer physiquement par l\'athlétisme : vitesse, détente, force', comp: ['HME1', 'GSS1', 'GSS5'], l: [
  {t: 'Les tests physiques', o: 'Mesurer sa vitesse, sa détente et sa force, et se fixer des objectifs.',
   e: [['chatlignes', 6],
    ['gammes', 7]],
   c: [['Les 4 tests', 22, 'Ateliers : 30 m lancé, pentabond, lancer de médecine-ball à genoux, 6 min de course (distance). Chacun note ses 4 résultats.', 'Mes 4 résultats sont notés.', '', 'ateliers:athle:4', 'a4'],
    ['Mon contrat d\'athlète', 12, 'Chacun écrit un objectif chiffré pour chaque test et une phrase : « pour progresser, je vais… ».', 'Mon contrat est écrit.', '', 'explication'],
    ['handicap', 12, '', 'Mon groupe arrive presque ensemble.']],
   x: [['formule1', 15, '', 'Mon équipe gagne une manche.']],
   r: [['bilan', 7]]},
  {t: 'Développer sa vitesse', o: 'Améliorer sa vitesse : fréquence, amplitude, départ.',
   e: [['baton', 6],
    ['queues', 7]],
   c: [['L\'échelle de vitesse', 15, 'Une échelle de coupelles au sol : courir le plus vite possible un appui par case, puis cases écartées (amplitude). Par équipe, au chrono.', 'Mon équipe bat son temps.', '', 'files', 'e4'],
    ['touchecours', 16, 'Distances plus longues (15 m).', 'Je ne suis pas rattrapé.'],
    ['ballon', 15, '', 'J\'arrive avant le ballon.']],
   x: [['temoin', 15, '', 'Notre témoin passe dans la zone.']],
   r: [['marche', 7]]},
  {t: 'Développer sa détente', o: 'Améliorer sa détente par des bonds, avec des réceptions sûres.',
   e: [['vague', 6],
    ['cerceaux', 7]],
   c: [['grenouille', 15, '', 'Mon équipe bat son record.'],
    ['Le circuit des kangourous', 16, 'Circuit de bonds : pieds joints au-dessus de lattes, cloche-pied dans les cerceaux, montées de step (ou marches des gradins), pentabond. Réception genoux souples. 40 s par atelier.', 'Je fais le circuit avec des réceptions souples.', '', 'ateliers:athle:6', 'a6'],
    ['Le pentabond', 15, '', 'Je bats mon score du test.', '', 'saut', 'p']],
   x: [['longueur', 15, '', 'Mon équipe marque des points.']],
   r: [['meteo', 7]]},
  {t: 'Développer sa force', o: 'Renforcer les muscles de l\'athlète avec le poids du corps et des médecine-balls.',
   e: [['zoo', 6],
    ['corde', 7]],
   c: [['Le circuit des costauds', 16, 'Par deux, 6 ateliers de 40 s : squats, gainage, pompes sur genoux, lancers de médecine-ball contre un partenaire, fentes, abdominaux. 20 s de pause, on tourne.', 'Je fais tous les ateliers proprement.', 'Deux tours.', 'ateliers:athle:6', 'a6'],
    ['genoux', 15, '', 'Je bats mon score du test.'],
    ['poids', 15, '', 'Je lance plus loin.']],
   x: [['decathlon', 15, '', 'Mon équipe marque dans chaque atelier.']],
   r: [['mercis', 7]]},
  {t: 'Les re-tests', o: 'Mesurer ses progrès et les expliquer.',
   e: [['millepattes', 6],
    ['feu', 7]],
   c: [['Les 4 tests', 22, 'Mêmes tests qu\'en leçon 1.', 'Je progresse dans {3|2} tests.', '', 'ateliers:athle:4', 'a4'],
    ['Le journal de l\'athlète', 12, 'Chacun explique à son partenaire pourquoi il a progressé (ou pas) : sommeil, travail, échauffement, récupération.', 'J\'explique un progrès avec les bons mots.', '', 'explication'],
    ['record', 12, '', 'La classe bat son record.']],
   x: [['poursuite', 15, 'Pour finir les re-tests en équipe.', 'Mon équipe rattrape l\'autre.']],
   r: [['parole', 7]]},
  {t: 'Évaluation : l\'athlète complet', o: 'Réaliser une course, un saut et un lancer et expliquer comment s\'entraîner.',
   crit: [['Sprint 50 m', 4, 'Barème : très bon = 4 · bon = 3 · moyen = 2 · faible = 1'], ['Longueur ou triple saut', 4, 'Barème : très bon = 4 · bon = 3 · moyen = 2 · faible = 1'], ['Poids', 4, 'Barème : très bon = 4 · bon = 3 · moyen = 2 · faible = 1'], ['Objectifs atteints', 4, '4 : dans les 3 épreuves · 3 : 2 · 2 : 1 · 0 : aucun'], ['Questions sur l\'entraînement', 4, '2 points par question : explique avec les bons mots (récupération, réception…)']],
   e: [['ombre', 6],
    ['cone', 7]],
   c: [['Le triathlon d\'évaluation', 38, 'Ateliers 50 m, saut, poids ; le prof pose 2 questions à chacun entre les essais.', '', '', 'ateliers:athle:4', 'a4']],
   r: [['respire', 6]]}
]},
6: {th: 'Organiser une rencontre d\'athlétisme pour la classe (ou pour des plus jeunes)', comp: ['HSC1', 'HSC2', 'HSC3', 'GSS1'], l: [
  {t: 'Le projet de rencontre', o: 'Définir la rencontre : épreuves, rôles, barèmes, horaires.',
   e: [['millepattes', 6, 'Mené par un élève.'],
    ['gammes', 7]],
   c: [['Les commissions', 16, 'Commissions : épreuves et barèmes, officiels, horaires et rotations, affiche et cérémonie, matériel. Chaque commission rend une fiche.', 'Ma commission rend sa fiche.', '', 'explication', 'g4'],
    ['decathlon', 30, 'Tour des épreuves prévues, pour tester les barèmes.', 'J\'ai une performance dans chaque atelier.']],
   x: [['formule1', 15, '', 'Mon équipe gagne une manche.']],
   r: [['bilan', 7]]},
  {t: 'S\'entraîner en autonomie', o: 'S\'entraîner seul dans ses épreuves, d\'après son contrat.',
   e: [['echequipe', 13, 'Chaque équipe mène son échauffement d\'athlète.']],
   c: [['coach', 22, 'Chaque équipe choisit les jeux du cycle qui préparent ses épreuves.', 'Mon équipe progresse.'],
    ['pronostic', 12, '', 'Je suis proche de mon pronostic.'],
    ['temoin', 12, '', 'Notre témoin passe dans la zone.']],
   x: [['L\'américaine', 15, '', 'Mon équipe fait des passages.', '', 'piste', 'e4']],
   r: [['marche', 7]]},
  {t: 'Ajuster son entraînement', o: 'Ajuster son entraînement d\'après ses résultats.',
   e: [['queues', 6, 'Mené par un élève.'],
    ['zoo', 7]],
   c: [['Le coach vidéo', 16, 'Sur l\'épreuve la plus faible.', 'J\'applique le conseil de mon coach.', '', 'ateliers:athle:4', 'g3'],
    ['poursuite', 18, 'Chaque équipe s\'entraîne en poursuite sur le circuit de la rencontre.', 'Mon équipe rattrape l\'autre.'],
    ['handicap', 12, '', 'Mon groupe arrive presque ensemble.']],
   x: [['record', 15, '', 'La classe bat son record.']],
   r: [['meteo', 7]]},
  {t: 'La répétition générale', o: 'Tester l\'organisation : rotations, officiels, feuilles de résultats.',
   e: [['feu', 6, 'Mené par un élève.'],
    ['corde', 7]],
   c: [['La rencontre d\'essai', 34, 'Répétition avec les rotations et les officiels prévus par les commissions. On chronomètre le temps de chaque rotation.', 'Je tiens mon rôle sans erreur.', '', 'ateliers:athle:4', 'a4'],
    ['Le débriefing', 12, 'Chaque commission dit ce qui a coincé et le corrige.', 'Ma commission corrige un problème.', '', 'explication']],
   x: [['journaliste', 15, '', 'Les résultats sont annoncés.']],
   r: [['mercis', 7]]},
  {t: 'La rencontre', o: 'Vivre la rencontre organisée par la classe.',
   e: [['ombre', 6],
    ['chatlignes', 6]],
   c: [['La rencontre', 34, 'La vraie rencontre : épreuves, officiels, résultats affichés, cérémonie.', 'Je concours et j\'officie sérieusement.', '', 'ateliers:athle:4', 'a4'],
    ['Le relais final', 12, 'Grand relais de toute la classe (équipes mélangées), sous les encouragements.', 'Mon équipe finit le relais.', '', 'course:athle:relais', 'e4']],
   x: [['minutes', 15, 'Pour finir la rencontre : chasse aux cônes géante, équipes mélangées, puis remise des médailles (performance, progrès, officiels).', 'Mon équipe ramène tous ses cônes.']],
   r: [['parole', 7]]},
  {t: 'Évaluation : projet et performance', o: 'Évaluer ses performances, son rôle dans l\'organisation et son autonomie.',
   crit: [['Performances finales', 6, '6 : très bon niveau au barème · 4 : bon · 2 : moyen · 1 : faible'], ['Progrès depuis le départ', 5, '5 : dans toutes ses épreuves · 3 : dans la plupart · 1 : dans une'], ['Rôle dans l\'organisation (commission)', 5, '5 : tâche faite, sérieusement et à temps · 3 : partielle · 1 : peu impliqué'], ['Autonomie', 4, '4 : s\'échauffe, s\'organise et s\'entraîne seul · 2 : rappels · 0 : dépendant']],
   e: [['baton', 6],
    ['cone', 7]],
   c: [['La rencontre d\'évaluation', 40, 'Chacun fait ses épreuves avec les officiels élèves ; le prof observe et valide.', '', '', 'ateliers:athle:4', 'a4']],
   r: [['respire', 6]]}
]}
}});

/* ===== Schémas de chaque jeu (stade : ligne droite à couloirs, sautoir en longueur, aire de poids) ===== */
(window.PSCH_SC = window.PSCH_SC || {}).athle = (() => {
  const COL = {a: '#1f63d6', b: '#e8590c', p: '#8a3ffc'}, EQ = ['#1f63d6', '#e8590c', '#16a34a', '#8a3ffc'];
  // ligne droite : n couloirs de 45 px à partir de y = 35 ; g.lane_y(i) = centre du couloir i
  const droite = (g, n = 4, o = {}) => g.straight(n, {y0: o.y0 || 25, lh: o.lh || Math.min(50, 200 / n), ...o});
  // sautoir en longueur vu de dessus : piste d'élan, zone d'appel (1 m), bac à sable ; o.zones = lignes de points dans le sable
  const sautoir = (g, o = {}) => { g.grass(); g.raw('<rect x="10" y="108" width="250" height="34" fill="#d9876a"/>', 'bg').sand(258, 80, 132, 90).raw('<rect x="226" y="108" width="20" height="34" fill="#fff" fill-opacity=".45" stroke="#fff" stroke-width="2" stroke-dasharray="4 3"/>', 'bg');
    g.label(236, 102, 'zone d\'appel', {s: 8.5, b: 1}).label(80, 160, 'piste d\'élan', {s: 9, c: '#6b4a3a'}).label(324, 186, 'bac à sable', {s: 9, c: '#8a6d2a'});
    if (o.zones) [1, 2, 3, 4].forEach(i => { const x = 268 + i * 26; g.raw(`<path d="M${x} 82V168" stroke="#b08a3a" stroke-width="1.5" stroke-dasharray="4 3"/>`, 'mid').disc(x, 76).label(x - 13, 128, i, {s: 11, b: 1, c: '#8a6d2a'}); });
    return g; };
  // aire de lancer : cercle (ou ligne) à gauche, secteur vers la droite, arcs de distance
  const secteur = (g, o = {}) => { g.grass(); const cx = 45, cy = 125;
    g.raw(`<path d="M${cx} ${cy}L392 ${cy - 112}M${cx} ${cy}L392 ${cy + 112}" stroke="#fff" stroke-width="2.5"/>`, 'bg');
    (o.arcs || [5, 10, 15, 20]).forEach((m, i) => { const r = 70 + i * 80 / 1.1 * .9; g.raw(`<path d="M${cx + r * .95} ${cy - r * .31}A${r} ${r} 0 0 1 ${cx + r * .95} ${cy + r * .31}" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="5 4"/>`, 'bg').label(cx + r * .95 + 4, cy - r * .31 - 4, m + ' m', {s: 9, b: 1, c: '#4b6b3c'}); });
    if (o.ligne) g.raw(`<path d="M${cx - 5} ${cy - 40}V${cy + 40}" stroke="#fff" stroke-width="4"/>`, 'bg'); else g.raw(`<circle cx="${cx}" cy="${cy}" r="16" fill="#cfcac0" stroke="#fff" stroke-width="3"/>`, 'bg');
    return g; };
  // 4 ateliers en carrés (course, saut, lancer, 4e)
  const ateliers = (g, T, o = {}) => { g.grass(); const n = T.length, cols = n > 4 ? 3 : 2, rows = Math.ceil(n / cols), w = (380 - (cols - 1) * 8) / cols, h = (230 - (rows - 1) * 8) / rows;
    T.forEach(([t, fn], i) => { const x = 10 + (i % cols) * (w + 8), y = 10 + Math.floor(i / cols) * (h + 8); g.zone(x, y, w, h, '', 'grey', {rx: 6}).num(x + 13, y + 13, i + 1).label(x + 25, y + 17, t, {s: 9.5, b: 1, a: 'start'}); if (fn) fn(x, y, w, h); });
    return g; };
  const AT = { // dessins d'atelier
    sprint: (x, y, w, h) => { g0.A(x + 18, y + h / 2 + 8).run(x + 30, y + h / 2 + 8, x + w - 20, y + h / 2 + 8).raw(`<path d="M${x + w - 14} ${y + 28}V${y + h - 8}" stroke="#2d3530" stroke-width="2.5" stroke-dasharray="3 3"/>`, 'mid'); },
    saut: (x, y, w, h) => { g0.sand(x + w - 50, y + 28, 42, h - 38).A(x + 20, y + h / 2 + 8).run(x + 32, y + h / 2 + 8, x + w - 60, y + h / 2 + 8).lob(x + w - 60, y + h / 2 + 8, x + w - 28, y + h / 2 + 8, -16); },
    lancer: (x, y, w, h) => { g0.A(x + 20, y + h / 2 + 8).ball(x + 30, y + h / 2 + 2, 'medecine').lob(x + 34, y + h / 2 + 4, x + w - 20, y + h / 2 + 8, -22); for (let i = 1; i < 4; i++) g0.disc(x + 30 + i * (w - 50) / 3, y + h - 12); },
    defi: (x, y, w, h) => { g0.ring('a', 4, x + w / 2, y + h / 2 + 8, 22, 16); },
    endu: (x, y, w, h) => { g0.loop(x + w / 2, y + h / 2 + 8, w / 2 - 18, h / 2 - 22, 'run').A(x + w / 2, y + 30); },
    juge: (x, y, w, h) => { g0.B(x + w - 18, y + h - 16).sheet(x + w - 36, y + h - 16); }
  };
  let g0; const at = (g, T, o) => { g0 = g; return ateliers(g, T.map(([t, k, k2]) => [t, (...a) => { if (AT[k]) AT[k](...a); if (k2 && AT[k2]) AT[k2](...a); }]), o); };
  const quatre = [['sprint', 'sprint', 'juge'], ['saut en longueur', 'saut', 'juge'], ['lancer', 'lancer', 'juge'], ['défi d\'équipe', 'defi']];
  const calme = (g, T) => { g.grass(); g.ring('a', 8, 200, 140, 130, 72); g.sheet(200, 140); T.forEach((t, i) => g.tag(200, 26 + i * 22, t, {s: 9.5})); return g; };
  const vagues = (g, n = 4, o = {}) => { droite(g, n); for (let i = 0; i < n; i++){ const y = g.lane_y(i); g.pl(o.t || 'a', 25, y).run(38, y, o.e || 340, y, 0); } return g; };
  return {
    millepattes: g => { droite(g, 4, {finish: false}); for (let i = 0; i < 4; i++){ const y = g.lane_y(i), c = EQ[i]; g.file('a', 3, 70, y, -16, 0, {c}).cone(330, y); }
      const y = g.lane_y(0); g.A(250, y - 8, '', {c: EQ[0]}).A(268, y - 8, '', {c: EQ[0]}).raw(`<path d="M250 ${y - 8}H268" stroke="${EQ[0]}" stroke-width="3"/>`, 'mid').path('run', [[280, y - 8], [325, y - 14], [325, y + 10], [240, y + 12]]);
      return g.label(330, 18, 'cône à 20 m', {s: 9, b: 1}).n(1, 'le 1er fait l\'aller-retour, puis repart avec le 2e main dans la main, puis le 3e…').n(2, 'si la chaîne casse, on revient au départ'); },
    cone: g => { g.grass(); [[100, 70], [300, 70], [100, 180], [300, 180]].forEach(([x, y]) => g.A(x - 30, y).cone(x, y).B(x + 30, y)); g.P(200, 125).tag(200, 100, '« assis ! … saute ! … CÔNE ! »', {s: 9.5});
      return g.n(1, 'le premier qui attrape le cône gagne le point ; le perdant change de partenaire'); },
    ballon: g => { droite(g, 4, {finish: false}); g.ball(60, g.lane_y(0), 'gros').A(30, g.lane_y(0) - 14, 'R').arrow('pass', 72, g.lane_y(0), 320, g.lane_y(0), 0); [1, 2, 3].forEach(i => g.A(25, g.lane_y(i)).run(38, g.lane_y(i), 320, g.lane_y(i), 0));
      [0, 1, 2, 3].forEach(i => g.cone(335, g.lane_y(i))); return g.label(335, 18, 'arrivée à 20-30 m', {s: 9, b: 1}).n(1, 'les coureurs partent en même temps que le ballon roulé : arriver au cône avant lui').n(2, 'on roule plus fort à chaque réussite'); },
    touchecours: g => { g.grass(); g.line('M330 20V230', 3, '#fff'); [60, 125, 190].forEach(y => { g.A(150, y, 'F').B(122, y, 'C').run(162, y, 320, y, 0).arrow('run', 134, y + 8, 300, y + 8, 0); });
      return g.label(330, 14, 'ligne à 10 m', {s: 9, b: 1}).n(1, 'le fuyard tape dans les mains du chasseur puis sprinte vers la ligne').n(2, 'le chasseur réagit et essaie de le toucher avant la ligne ; on change'); },
    'Les départs rigolos': g => { droite(g, 4); [['assis', 'A'], ['couché', 'A'], ['dos à la course', 'A'], ['à genoux', 'A']].forEach(([t], i) => { const y = g.lane_y(i); g.A(28, y).label(56, y - 13, t, {s: 8.5, a: 'start', b: 1}).run(42, y, 200, y, 0); });
      return g.label(200, 238, '20 m · par vagues de 4 : le gagnant marque 1 point', {s: 9}).n(1, 'sprints depuis des positions différentes, puis « à vos marques - prêts - partez »'); },
    handicap: g => { droite(g, 4); [0, 30, 55, 80].forEach((d, i) => { const y = g.lane_y(i); g.A(130 - d, y).run(142 - d, y, 350, y, 0).raw(`<path d="M${130 - d} ${y - 18}v36" stroke="#fff" stroke-width="2"/>`, 'mid'); });
      return g.label(90, 240, 'les plus rapides partent plus loin derrière', {s: 9}).n(1, 'par 4, sur 40 m : le but est d\'arriver tous en même temps').n(2, 'un coureur qui gagne de loin recule d\'un plot'); },
    bilan: g => { g.grass(); g.ring('a', 9, 200, 140, 130, 75); g.bench(150, 125, 250, 125).A(170, 115, '2').A(200, 110, '1').A(230, 115, '3');
      return g.label(200, 92, 'podium : le plus de progrès · le plus d\'encouragements · un juge sérieux', {s: 9}).n(1, 'étirements des mollets, des cuisses et des épaules ; chacun note sa meilleure performance'); },
    chatlignes: g => { droite(g, 5, {start: false, finish: false}); [[60, 0], [150, 1], [260, 2], [90, 3], [320, 4], [210, 4]].forEach(([x, i]) => g.A(x, g.lane_y(i)).run(x + 12, g.lane_y(i), x + 40, g.lane_y(i), 0));
      g.X(200, g.lane_y(1)).run(212, g.lane_y(1), 250, g.lane_y(1), 0).X(140, g.lane_y(3)); return g.n(1, 'on ne court que dans les couloirs, sans couper').n(2, 'un touché fait 5 squats puis devient chat'); },
    'Le témoin à l\'arrêt': g => { g.grass(); [70, 160].forEach(y => { g.row('a', 4, 90, y, 300, y); g.raw(`<rect x="${110}" y="${y - 3}" width="14" height="5" rx="2" fill="#e11d48"/>`, 'top').pass(124, y + 4, 150, y + 4, 0); });
      return g.tag(200, 220, 'main droite → main gauche du suivant · « hop ! »', {s: 9.5}).n(1, 'en colonne de 4, en marchant puis en trottinant : le suivant tend la main en arrière sans se retourner'); },
    navette: g => { droite(g, 4, {start: false, finish: false}); for (let i = 0; i < 4; i++){ const y = g.lane_y(i), c = EQ[i]; g.file('a', 2, 60, y, -18, 0, {c}).file('a', 2, 320, y, 18, 0, {c}); }
      g.run(75, g.lane_y(0), 305, g.lane_y(0), 0); return g.label(190, 240, '20 à 30 m', {s: 9, b: 1}).n(1, 'on sprinte jusqu\'à l\'autre moitié de l\'équipe et on tape la main du suivant').n(2, 'départ anticipé = on refait son trajet'); },
    temoin: g => { droite(g, 4, {start: false}); for (let i = 0; i < 4; i++){ const y = g.lane_y(i); g.disc(150, y - 15).disc(230, y - 15).disc(150, y + 15).disc(230, y + 15); }
      const y = g.lane_y(1); g.A(110, y).raw(`<rect x="118" y="${y - 2}" width="12" height="5" rx="2" fill="#e11d48"/>`, 'top').run(122, y, 175, y, 0).A(195, y).run(207, y, 300, y, 0).disc(100, y + 15, '#e11d48');
      return g.label(190, 18, 'zone de passage', {s: 9, b: 1}).n(1, 'le receveur part quand le porteur touche la marque ; il tend la main en arrière, le porteur crie « hop ! »').n(2, 'témoin tombé ou passé hors zone = 3 s de pénalité'); },
    formule1: g => { g.grass(); g.A(30, 200).run(42, 200, 90, 200, 0, 1); for (let i = 0; i < 4; i++) g.cone(110 + i * 25, 200 + (i % 2 ? -10 : 10)); g.path('run', [[100, 200], [122, 185], [147, 215], [172, 185], [197, 210]]).num(150, 228, 2);
      [230, 260, 290].forEach(x => g.hurdle(x, 200, 22, true)); g.arrow('run', 215, 200, 310, 200, 0, 3).mat(320, 165, 50, 30, {t: 'roulade'}).num(345, 150, 4).path('run', [[345, 160], [340, 70], [60, 60], [40, 180]]).num(200, 50, 5).label(200, 80, 'sprint jusqu\'au suivant', {s: 9});
      return g.n(1, 'sprint 15 m').n(2, 'slalom entre 4 cônes').n(3, 'obstacles bas (lattes)').n(4, 'roulade ou 3 sauts de grenouille').n(5, 'sprint ; le témoin passe de main en main'); },
    record: g => { calme(g, ['mètres sautés + mètres lancés + secondes de relais', '🏆 record de la classe : 412 → ?']); return g.n(1, 'on additionne les performances de toute la classe ; à chaque leçon, on essaie de battre le record'); },
    marche: g => { g.track(); [[.1], [.35], [.6], [.85]].forEach(([t]) => { const [x, y] = g.track_pt(t), [x2, y2] = g.track_pt(t, 10); g.A(x, y).B(x2, y2); }); return g.label(200, 125, '🤫 un tour en marchant, par deux, en silence', {s: 10, b: 1}).n(1, 'on respire profondément, puis étirements ; chacun dit ce qu\'il a mieux réussi'); },
    vague: g => { g.grass(); g.row('a', 9, 60, 150, 340, 150); g.P(200, 40).hoop(200, 80, 13, '#f59f00').arrow('run', 200, 95, 200, 132, 0).label(250, 80, 'cerceau qu\'on fait rouler', {s: 9, a: 'start'});
      return g.n(1, 'on saute par-dessus le cerceau (ou la corde au ras du sol) sans se faire toucher les pieds').n(2, 'touché = 3 sauts de grenouille et on revient'); },
    cerceaux: g => { g.grass(); [60, 125, 190].forEach((y, r) => { g.A(30, y); for (let i = 0; i < 6; i++) g.hoop(80 + i * (40 + r * 6), y, 11); g.path('run', [[42, y], [80, y - 3], [120 + r * 6, y + 3], [160 + r * 12, y - 3]]); });
      return g.label(200, 238, 'un appui par cerceau → cloche-pied → même-même-autre', {s: 9}).n(1, 'on écarte les cerceaux à chaque passage réussi'); },
    obstacles: g => { droite(g, 4); for (let i = 0; i < 4; i++){ const y = g.lane_y(i), d = i < 2 ? 50 : 62; for (let j = 0; j < 5; j++) g.hurdle(100 + j * d, y, 26, true); g.A(28, y).run(40, y, 92, y, 0); }
      return g.label(150, 18, 'couloirs « courts »', {s: 9, b: 1}).label(150, 240, 'couloirs « longs »', {s: 9, b: 1}).n(1, 'lattes sur cônes : on franchit sans s\'arrêter, en gardant le même rythme entre les obstacles'); },
    riviere: g => { g.grass(); g.raw('<path d="M150 30L130 220H260L200 30Z" fill="#7cc3e6"/>', 'bg').rope(200, 30, 260, 220, 0, '#2d3530').rope(150, 30, 130, 220, 0, '#2d3530').label(180, 125, '🐊', {s: 22});
      [60, 125, 190].forEach(y => g.A(40, y).run(52, y, 120, y, 0)); g.lob(120, 60, 225, 60, -20);
      return g.label(160, 18, 'étroit', {s: 9, b: 1}).label(195, 238, 'large', {s: 9, b: 1}).n(1, 'élan, appel sur un pied, réception à deux pieds : pied dans l\'eau = mangé !').n(2, 'on s\'arrête à la largeur réussie 2 fois sur 3'); },
    longueur: g => { sautoir(g, {zones: 1}); g.A(30, 125).run(42, 125, 225, 125, 0).lob(240, 125, 330, 125, -30); return g.n(1, 'appel dans la zone d\'appel (1 m), pas de planche à mordre').n(2, 'zones à 1, 2, 3, 4 points : 3 sauts, on additionne pour son équipe'); },
    'Le chat saute-mouton': g => { g.grass(); g.scatter('a', 7, 50, 40, 350, 210, {seed: 6}); g.X(200, 120).run(212, 120, 240, 105, 0).raw('<circle cx="120" cy="170" r="11" fill="#9aa3a0"/>', 'top').label(120, 195, 'touché : accroupi', {s: 9}).A(95, 160).lob(95, 160, 145, 175, -20);
      return g.n(1, 'un touché s\'accroupit, tête rentrée').n(2, 'un camarade le délivre en sautant par-dessus (mains sur le dos)'); },
    grenouille: g => { g.grass(); g.line('M40 40V210', 3, '#fff'); [70, 160].forEach((y, k) => { const c = EQ[k]; [0, 1, 2, 3].forEach(i => g.lob(40 + i * 60, y, 100 + i * 60, y, -18)); [1, 2, 3, 4].forEach(i => g.A(40 + i * 60, y + 18, i, {c})); });
      return g.n(1, 'le 2e part de l\'endroit où sont tombés les talons du 1er, et ainsi de suite').n(2, 'on mesure la distance totale de l\'équipe'); },
    genoux: g => { secteur(g, {ligne: 1}); g.A(30, 125).ball(42, 112, 'medecine').lob(45, 115, 175, 100, -30); [[120, 140, EQ[0]], [180, 100, EQ[1]], [210, 150, EQ[2]]].forEach(([x, y, c]) => g.disc(x, y, c));
      return g.n(1, 'à genoux derrière la ligne, médecine-ball à deux mains derrière la tête : on lance en se redressant').n(2, 'chaque lancer est marqué par une coupelle de la couleur du lanceur'); },
    poids: g => { secteur(g, {arcs: [3, 5, 7, 9]}); g.A(45, 125).ball(53, 118, 'medecine').lob(55, 120, 195, 110, -25); return g.label(45, 160, 'cercle', {s: 9, b: 1}).n(1, 'poids calé contre le cou, coude haut : on pousse, on ne lance pas').n(2, 'sans sortir du cercle ; zones à points dans le secteur'); },
    rotation: g => { secteur(g, {ligne: 1}); g.A(35, 125).rot(30, 108, 52, 108, -14).hoop(60, 120, 7, '#f59f00').lob(60, 118, 210, 105, -25); return g.n(1, 'anneau ou frisbee : de profil, bras long en arrière, rotation des hanches ; puis dos à la zone avec un demi-tour').n(2, 'l\'engin doit tomber dans le secteur, sinon 0'); },
    javelot: g => { secteur(g, {ligne: 1}); g.A(25, 125).run(10, 140, 25, 135, 0).lob(40, 120, 245, 125, -30).hoop(260, 125, 18, '#e11d48').label(260, 95, '🐉 le dragon', {s: 10, b: 1}); return g.n(1, 'vortex ou javelot en mousse : viser le dragon à 10-15 m, puis lancer le plus loin après 3 pas d\'élan').n(2, 'au-dessus de l\'épaule, sans franchir la ligne'); },
    cibles: g => { secteur(g, {ligne: 1}); [[110, 1], [180, 2], [250, 3], [320, 4]].forEach(([x, p]) => g.hoop(x, 125, 16, '#e11d48').label(x, 129, p, {s: 11, b: 1})); g.A(25, 125).lob(35, 118, 180, 115, -25); return g.n(1, 'cerceaux à 5, 10, 15 et 20 m : 1, 2, 3, 4 points').n(2, 'chacun lance 3 fois (balle, anneau, vortex) ; les points vont à l\'équipe'); },
    decathlon: g => at(g, quatre).n(1, 'chaque équipe fait chaque atelier et marque des points avec le barème affiché').n(2, 'un élève qui progresse rapporte autant qu\'un champion'),
    'Épreuve 1 : sprint ou obstacles': g => { droite(g, 4); [0, 1].forEach(i => g.A(28, g.lane_y(i)).run(40, g.lane_y(i), 340, g.lane_y(i), 0)); [2, 3].forEach(i => { const y = g.lane_y(i); g.A(28, y).run(40, y, 340, y, 0); for (let j = 0; j < 4; j++) g.hurdle(110 + j * 60, y, 26, true); });
      return g.B(375, 15).chrono(375, 240).n(1, '30 m plat ou 30 m avec obstacles bas : 2 essais chronométrés par des camarades'); },
    'Épreuve 2 : saut en longueur': g => { sautoir(g); g.A(30, 125).run(42, 125, 225, 125, 0).lob(240, 125, 320, 125, -30).B(330, 200).sheet(350, 200); return g.n(1, '3 essais, appel dans la zone d\'appel ; on garde le meilleur'); },
    'Épreuve 3 : lancer au choix': g => { secteur(g); g.A(45, 125).lob(55, 118, 200, 110, -25).B(220, 200).sheet(240, 200); return g.n(1, 'poids, anneau ou javelot : 3 essais mesurés, on garde le meilleur'); },
    baton: g => { g.grass(); [[90, 70], [250, 70], [90, 175], [250, 175]].forEach(([x, y]) => { g.A(x, y, 'A').raw(`<rect x="${x + 14}" y="${y - 18}" width="5" height="22" rx="2" fill="#e11d48"/>`, 'top').B(x + 40, y, 'B').run(x + 52, y, x + 110, y, 0); });
      return g.n(1, 'A lâche le bâton sans prévenir ; B le rattrape avant qu\'il touche le sol').n(2, 'puis B part en sprint 10 m'); },
    'Le duel des starters': g => { droite(g, 2, {lh: 60, y0: 60}); [0, 1].forEach(i => g.A(55, g.lane_y(i)).run(67, g.lane_y(i), 330, g.lane_y(i), 0)); g.J(30, 40, 'S').B(375, 40, 'J').tag(150, 30, '« à vos marques… prêts… partez ! »', {s: 9});
      return g.n(1, 'par 4 : un starter, 2 coureurs, un juge d\'arrivée ; départs accroupis').n(2, 'le starter varie le temps ; faux départ = on recule d\'un mètre'); },
    pronostic: g => { droite(g, 4); [0, 1, 2, 3].forEach(i => g.A(28, g.lane_y(i)).run(40, g.lane_y(i), 340, g.lane_y(i), 0)); g.B(375, 15).chrono(375, 240).tag(200, 240 - 0, 'annoncé 6,2 s · réalisé 6,3 s', {s: 9});
      return g.n(1, 'avant de courir (ou sauter, lancer), chacun annonce son temps ou sa distance').n(2, 'le gagnant est le plus proche de son pronostic'); },
    'La poursuite des obstacles': g => { droite(g, 2, {lh: 60, y0: 60}); [0, 1].forEach(i => { const y = g.lane_y(i); for (let j = 0; j < 5; j++) g.hurdle(110 + j * 50, y, 30, true); });
      g.A(60, g.lane_y(0), 'F').run(72, g.lane_y(0), 100, g.lane_y(0), 0).X(40, g.lane_y(1)).run(52, g.lane_y(1), 100, g.lane_y(1), 0).label(40, g.lane_y(1) + 24, '2 m derrière', {s: 9});
      return g.n(1, 'le chasseur part 2 m derrière et doit toucher le fuyard avant la fin ; on change'); },
    'L\'élan étalonné': g => { sautoir(g); g.A(236, 125).arrow('run', 222, 125, 70, 125, 0, 1).disc(60, 125, '#e11d48').label(60, 102, 'ma marque', {s: 9, b: 1}).B(60, 160);
      return g.n(1, 'depuis la zone d\'appel, on court à l\'envers 8 à 12 foulées ; le partenaire pose une coupelle').n(2, 'on essaie l\'élan depuis la coupelle et on l\'ajuste'); },
    'L\'américaine': g => { g.track(); const [x, y] = g.track_pt(.0), [x2, y2] = g.track_pt(.25); g.A(x, y, '1').A(x - 20, y - 18, '2', {c: EQ[0]}).A(x2, y2, '', {c: EQ[1]}).run(x2, y2, ...g.track_pt(.3), 0);
      return g.label(200, 125, 'un tour de 100 m chacun, sans arrêt, 6 min', {s: 9.5, b: 1}).n(1, 'deux coureurs par équipe se relaient ; le témoin passe dans la zone').n(2, 'combien de passages en 6 min ?'); },
    'Épreuve 1 : 40 m ou 40 m obstacles': g => { droite(g, 4); [0, 1].forEach(i => g.A(28, g.lane_y(i)).run(40, g.lane_y(i), 340, g.lane_y(i), 0)); [2, 3].forEach(i => { const y = g.lane_y(i); g.A(28, y).run(40, y, 340, y, 0); for (let j = 0; j < 5; j++) g.hurdle(100 + j * 50, y, 26, true); });
      return g.B(375, 15).chrono(375, 240).n(1, '40 m plat ou 40 m obstacles : 2 essais chronométrés'); },
    'Épreuve 2 : longueur': g => { sautoir(g); g.disc(70, 125, '#e11d48').A(50, 125).run(62, 125, 225, 125, 0).lob(240, 125, 330, 125, -30).B(330, 200).sheet(350, 200); return g.n(1, 'élan étalonné, 3 essais'); },
    'Épreuve 3 : poids': g => { secteur(g, {arcs: [3, 5, 7, 9]}); g.A(45, 125).ball(53, 118, 'medecine').lob(55, 120, 200, 110, -25).B(220, 200).sheet(240, 200); return g.n(1, '3 essais mesurés, on garde le meilleur'); },
    'Le pentabond': g => { g.grass(); g.line('M50 70V180', 3, '#fff'); ['D', 'G', 'D', 'G', '2 pieds'].forEach((t, i) => { g.lob(50 + i * 60, 125, 110 + i * 60, 125, -22).label(110 + i * 60, 150, t, {s: 9.5, b: 1}); });
      return g.A(35, 125).B(330, 190).sheet(350, 190).n(1, '5 bonds enchaînés depuis un départ arrêté, puis après 4 pas d\'élan').n(2, 'le partenaire mesure'); },
    'Le moins de bonds': g => { g.grass(); g.line('M40 40V210M360 40V210', 3, '#fff'); [80, 170].forEach(y => { g.A(25, y); for (let i = 0; i < 6; i++) g.lob(40 + i * 53, y, 93 + i * 53, y, -16).label(66 + i * 53, y - 18, i + 1, {s: 9, b: 1}); });
      return g.label(200, 238, '20 m', {s: 9, b: 1}).n(1, 'qui fait le moins de bonds ? on compte à voix haute').n(2, 'on note son score et on essaie de faire 1 bond de moins'); },
    'Les 3 cerceaux': g => { sautoir(g); g.hoop(130, 125, 12).hoop(170, 125, 12).hoop(210, 125, 12); g.A(40, 125).run(52, 125, 120, 125, 0).lob(130, 125, 170, 125, -16).lob(170, 125, 210, 125, -16).lob(210, 125, 300, 125, -26);
      return g.label(130, 176, 'cloche-pied', {s: 8.5}).label(172, 190, 'foulée', {s: 8.5}).label(212, 176, 'saut', {s: 8.5}).n(1, 'on écarte les cerceaux à chaque réussite'); },
    'Le triple saut au bac': g => { sautoir(g); g.zone(130, 108, 40, 34, '', 'yellow').label(150, 98, 'appel à 5-7 m', {s: 8.5, b: 1}).A(40, 125).run(52, 125, 135, 125, 0).lob(155, 125, 195, 125, -14).lob(195, 125, 235, 125, -14).lob(235, 125, 300, 125, -22);
      return g.n(1, 'élan court, appel dans la zone, puis cloche-pied, foulée, saut ; mesure par l\'équipe'); },
    'Le pas croisé': g => { secteur(g, {ligne: 1}); g.tag(110, 215, '« 1 - 2 - croisé - lance ! »', {s: 10});
      return g.A(30, 125).lob(40, 118, 220, 110, -30).n(1, 'sans engin puis avec : 3 pas d\'élan, puis la jambe arrière passe devant, et on lance'); },
    'Le tour de l\'horloge': g => { g.track(); for (let i = 0; i < 8; i++) g.disc(...g.track_pt(i / 8)); [.06, .3, .55].forEach(t => g.A(...g.track_pt(t)).run(...g.track_pt(t), ...g.track_pt(t + .06), 0)); g.P(200, 125).label(200, 105, 'sifflet toutes les 15 s', {s: 9});
      return g.n(1, 'une coupelle tous les 50 m : à chaque coup de sifflet, on doit être à une coupelle').n(2, 'chacun choisit son groupe d\'allure'); },
    minutes: g => { g.track(); [[.1, '#e11d48'], [.2, '#f59f00'], [.35, '#16a34a'], [.5, '#1f63d6'], [.62, '#f59f00'], [.75, '#16a34a'], [.88, '#e11d48']].forEach(([t, c]) => g.cone(...g.track_pt(t, -12), c)); g.zone(160, 95, 80, 60, 'camp', 'yellow', {top: 1});
      g.A(...g.track_pt(.04)).run(...g.track_pt(.04), ...g.track_pt(.09), 0); return g.n(1, 'en équipe, chaque coureur rapporte un cône à la fois au camp').n(2, 'plus le cône est loin, plus il rapporte ; pas de marche'); },
    'Le 1 000 m pronostic': g => { g.track(); [.1, .3].forEach(t => g.A(...g.track_pt(t)).run(...g.track_pt(t), ...g.track_pt(t + .05), 0)); g.B(200, 125).sheet(222, 125).chrono(178, 125).label(200, 100, '1 000 m = 2 tours et demi', {s: 9.5, b: 1});
      return g.n(1, 'chacun annonce son temps avant de courir ; le partenaire chronomètre et annonce les temps de passage'); },
    'Le lanceur de précision': g => { secteur(g, {ligne: 1}); [[150, 100, 1], [200, 150, 2], [260, 115, 3], [320, 140, 4]].forEach(([x, y, p]) => g.hoop(x, y, 15, '#e11d48').label(x, y + 4, p, {s: 10, b: 1})); g.A(30, 125).rot(25, 108, 47, 108, -14).lob(40, 118, 255, 115, -30);
      return g.n(1, 'des cerceaux dans le secteur : 3 lancers en rotation, points selon le cerceau'); },
    'Le pentathlon': g => at(g, [['sprint', 'sprint', 'juge'], ['saut', 'saut', 'juge'], ['lancer', 'lancer', 'juge'], ['barème affiché', 'defi']]).n(1, 'ateliers sprint, saut, lancer, avec juges de l\'équipe'),
    'Le 1 000 m': g => { g.track(); [.1, .3, .55].forEach(t => g.A(...g.track_pt(t)).run(...g.track_pt(t), ...g.track_pt(t + .05), 0)); g.P(200, 125).chrono(222, 125).label(200, 100, '2 tours et demi', {s: 9.5, b: 1}); return g.n(1, 'par vagues, temps annoncés'); },
    'Mon trio': g => calme(g, ['ma course · mon saut · mon lancer', '🎯 un objectif chiffré pour chacun']),
    'Les trois couloirs': g => at(g, [['départs', 'sprint'], ['obstacles (3 appuis)', 'sprint'], ['demi-fond (horloge)', 'endu']]).P(330, 200).n(1, 'chacun choisit son atelier ; le prof tourne'),
    'Le coach vidéo': g => { sautoir(g); g.A(30, 125).run(42, 125, 225, 125, 0).lob(240, 125, 320, 125, -30).B(236, 165, 'J').J(180, 80, 'C').raw('<rect x="192" y="70" width="12" height="18" rx="2" fill="#2d3530"/>', 'top');
      return g.n(1, 'par 3 : un sauteur, un juge d\'appel, un coach qui filme ou observe un seul point').n(2, 'le coach donne un conseil (au lancer : le transfert du poids)'); },
    'La rencontre d\'essai': g => at(g, quatre).P(390, 238).n(1, 'chacun concourt et tient un rôle d\'officiel : starter, chronos, juge d\'appel, mesureur, secrétaire').n(2, 'on tourne à chaque épreuve'),
    'Le quiz des juges': g => { g.grass(); g.P(200, 70).tag(200, 40, 'mime : appel mordu, faux départ, sortie du cercle…', {s: 9}); [70, 160, 250, 340].forEach((x, i) => { g.ring('a', 3, x, 175, 20, 16, {c: EQ[i]}); g.flag(x - 10, 140, '#fff').flag(x + 10, 140, '#e11d48'); });
      return g.n(1, 'chaque équipe lève drapeau blanc (valable) ou rouge (faute)'); },
    'La rencontre': g => at(g, quatre).P(390, 238).n(1, 'épreuves, officiels élèves, résultats affichés, cérémonie'),
    'Les 4 tests': g => at(g, [['30 m lancé', 'sprint', 'juge'], ['pentabond', 'saut'], ['médecine-ball à genoux', 'lancer'], ['6 min de course', 'endu']]).n(1, 'chacun note ses 4 résultats'),
    'Mon contrat d\'athlète': g => calme(g, ['🎯 un objectif chiffré par test', '« pour progresser, je vais… »']),
    'L\'échelle de vitesse': g => { droite(g, 2, {lh: 70, y0: 50, finish: false}); [0, 1].forEach(i => { const y = g.lane_y(i), d = i ? 30 : 20; for (let j = 0; j < 9; j++) g.disc(80 + j * d, y + 22).disc(80 + j * d, y - 22); g.A(40, y).path('run', Array.from({length: 9}, (_, j) => [80 + j * d + d / 2, y + (j % 2 ? 6 : -6)])); });
      return g.label(200, 36, 'cases serrées : fréquence', {s: 9, b: 1}).label(200, 215, 'cases écartées : amplitude', {s: 9, b: 1}).n(1, 'un appui par case, le plus vite possible ; par équipe, au chrono'); },
    'Le circuit des kangourous': g => { ateliers(g, [['pieds joints', (x, y, w, h) => { [0, 1, 2].forEach(i => g.hurdle(x + 40 + i * 30, y + h / 2 + 8, 22, true)); g.A(x + 18, y + h / 2 + 8); }], ['cloche-pied', (x, y, w, h) => { [0, 1, 2].forEach(i => g.hoop(x + 45 + i * 28, y + h / 2 + 8, 10)); g.A(x + 18, y + h / 2 + 8); }],
      ['montées de step', (x, y, w, h) => { g.step(x + w / 2, y + h / 2 + 8).A(x + w / 2 - 28, y + h / 2 + 8); }], ['pentabond', (x, y, w, h) => { [0, 1, 2].forEach(i => g.lob(x + 20 + i * 30, y + h / 2 + 12, x + 50 + i * 30, y + h / 2 + 12, -12)); }],
      ['réception', (x, y, w, h) => { g.mat(x + 30, y + 35, w - 60, h - 50, {t: 'tapis'}); }], ['sauts sans élan', (x, y, w, h) => { g.sand(x + w - 50, y + 30, 40, h - 40).A(x + 25, y + h / 2 + 8).lob(x + 35, y + h / 2 + 8, x + w - 30, y + h / 2 + 8, -16); }]]); return g.n(1, '40 s par atelier ; réception genoux souples'); },
    'Le circuit des costauds': g => { ateliers(g, [['squats'], ['gainage'], ['pompes (genoux)'], ['médecine-ball', (x, y, w, h) => { g.A(x + 30, y + h / 2 + 8).B(x + w - 30, y + h / 2 + 8).ball(x + w / 2, y + h / 2 + 2, 'medecine').pass(x + 42, y + h / 2 + 8, x + w - 42, y + h / 2 + 8, -8); }], ['fentes'], ['abdominaux']].map(([t, fn]) => [t, fn || ((x, y, w, h) => g.A(x + w / 2 - 12, y + h / 2 + 8).B(x + w / 2 + 12, y + h / 2 + 8))])); return g.n(1, 'par deux, 40 s par atelier, 20 s de pause, on tourne'); },
    'Le journal de l\'athlète': g => calme(g, ['pourquoi j\'ai progressé (ou pas) ?', 'sommeil · travail · échauffement · récupération']),
    'Le triathlon d\'évaluation': g => at(g, [['50 m', 'sprint', 'juge'], ['saut', 'saut', 'juge'], ['poids', 'lancer', 'juge']]).P(330, 200).n(1, 'ateliers 50 m, saut, poids ; le prof pose 2 questions à chacun entre les essais'),
    'Les commissions': g => { g.grass(); ['épreuves et barèmes', 'officiels', 'horaires et rotations', 'affiche et cérémonie', 'matériel'].forEach((t, i) => { const x = 70 + (i % 3) * 130, y = 60 + Math.floor(i / 3) * 110; g.ring('a', 4, x, y + 20, 24, 18).sheet(x, y + 20).label(x, y - 12, t, {s: 9.5, b: 1}); });
      return g.n(1, 'chaque commission prépare la rencontre et rend une fiche'); },
    echequipe: g => { droite(g, 4, {finish: false}); for (let i = 0; i < 4; i++){ const y = g.lane_y(i); g.file('a', 4, 120, y, -20, 0, {c: EQ[i]}).J(150, y, 'M').run(165, y, 300, y, 0); } return g.n(1, 'chaque équipe mène son échauffement (gammes, accélérations) avec son meneur'); },
    coach: g => at(g, quatre).n(1, 'chaque équipe choisit et anime un atelier du cycle'),
    'Le débriefing': g => calme(g, ['qu\'est-ce qui a coincé ?', 'comment on le corrige ?']),
    journaliste: g => calme(g, ['📰 résultats · records · action du jour']).A(200, 180, 'J'),
    'Le relais final': g => { g.track(); [.0, .25, .5, .75].forEach((t, i) => g.A(...g.track_pt(t), '', {c: EQ[i]})); g.run(...g.track_pt(.02), ...g.track_pt(.1), 0); return g.label(200, 125, '📣 toute la classe encourage', {s: 10, b: 1}).n(1, 'grand relais de toute la classe, équipes mélangées'); },
    'La rencontre d\'évaluation': g => at(g, quatre).P(390, 238).n(1, 'chacun fait ses épreuves avec les officiels élèves ; le prof observe et valide'),
    gammes: g => { droite(g, 6, {finish: false}); for (let i = 0; i < 6; i++){ const y = g.lane_y(i); g.A(50, y).A(30, y, '', {c: '#7aa7e8'}).run(62, y, 250, y, 0, i ? null : 1).J(290, y, 'C'); }
      return g.label(160, 14, 'genoux · talons-fesses · pas chassés · bonds · accélération', {s: 9, b: 1}).n(1, 'tout le monde part ensemble sur 20 m, un ou deux par couloir, et revient en trottinant').n(2, 'le coach (C) de chaque couloir dit « top » quand le geste est bien fait').num(290, 238, 2); },
    ombre: g => { g.grass(); [[110, 70], [290, 70], [110, 180], [290, 180]].forEach(([x, y], i) => g.A(x, y, 'M').A(x - 26, y + 6, 'O', {c: '#7aa7e8'}).run(x + 12, y, x + 60, y, 0, i ? null : 1).run(x - 14, y + 8, x + 25, y + 12, 0));
      return g.tag(200, 125, 'genoux · pas chassés · bonds · grenouille · départ', {s: 9.5}).n(1, 'le meneur (M) enchaîne les gestes, son ombre (O) le copie ; on change toutes les 30 s').n(2, 'au sifflet, le meneur sprinte 10 m, l\'ombre essaie de le toucher'); },
    queues: g => { g.grass(); g.zone(30, 25, 340, 200, '', 'grey'); g.scatter('a', 11, 50, 45, 350, 210, {seed: 12}).each((x, y, i) => g.chasuble(x - 13, y + 3, i % 3 ? '#facc15' : '#16a34a')); g.run(g.last[2][0] + 8, g.last[2][1] - 4, g.last[4][0] - 16, g.last[4][1], -10, 1);
      return g.bac(360, 238, '').n(1, 'on arrache les queues des autres en gardant la sienne : départs, freinages, crochets').n(2, 'queue perdue : on en reprend une au bac'); },
    zoo: g => { g.grass(); g.line('M40 20V230M340 20V230', 3, '#fff'); const T = ['kangourou', 'grenouille', 'flamant', 'gazelle', 'cheval']; T.forEach((t, i) => { const y = 40 + i * 42; g.A(55, y).arrow('jump', 66, y, 330, y, 0, i ? null : 1).label(190, y - 12, t, {s: 9, b: 1}); });
      return g.label(340, 14, '15 m', {s: 9.5, b: 1}).n(1, 'le prof annonce un animal : chacun traverse à sa façon, tous ensemble').n(2, 'puis on compte : qui traverse avec le moins de bonds ?'); },
    corde: g => { g.grass(); g.scatter('a', 10, 50, 50, 350, 215, {seed: 3}).each((x, y) => g.raw(`<path d="M${x - 11} ${y + 2}C${x - 14} ${y + 22} ${x + 14} ${y + 22} ${x + 11} ${y + 2}" fill="none" stroke="#8a3ffc" stroke-width="2"/>`, 'mid')); g.chrono(200, 236);
      return g.tag(200, 26, 'pieds joints · alternés · un pied · course sur place · croisés', {s: 9.5}).n(1, 'défis de 15 s : on compte ses sauts et on bat son record'); },
    feu: g => { g.track(); [[.05, 'run'], [.2, 'run'], [.4, 'run'], [.6, 'run'], [.78, 'run'], [.92, 'run']].forEach(([t], i) => { const [x, y] = g.track_pt(t); g.A(x, y); }); g.P(200, 125);
      g.raw('<circle cx="232" cy="117" r="7" fill="#16a34a"/><circle cx="249" cy="117" r="7" fill="#f59f00"/><circle cx="266" cy="117" r="7" fill="#e11d48"/><circle cx="283" cy="117" r="7" fill="#1f63d6"/>', 'top');
      return g.label(200, 150, 'vert sprint · orange trot · rouge équilibre · bleu demi-tour', {s: 8.5, b: 1}).n(1, 'tout le monde court sur la piste et change d\'allure selon la couleur'); },
    poursuite: g => { g.grass(); g.raw('<rect x="60" y="45" width="280" height="160" rx="70" fill="none" stroke="#fff" stroke-width="10"/>', 'bg'); [[200, 45], [200, 205], [60, 125], [340, 125]].forEach(([x, y], i) => i < 2 && g.raw(`<path d="M${x - 8} ${y - 8}L${x + 8} ${y + 8}" stroke="#8a6d2a" stroke-width="3"/>`, 'top'));
      g.row('a', 3, 25, 105, 25, 145).A(60, 125, '', {}).run(60, 112, 120, 52, -20, 1).row('b', 3, 375, 105, 375, 145).B(340, 125).run(340, 138, 280, 198, -20); return g.label(200, 125, 'circuit de 100 m', {s: 10, b: 1}).label(200, 30, 'latte', {s: 9})
        .n(1, 'deux équipes partent en même temps de deux côtés opposés : un tour chacun, relais par une tape dans la main').n(2, 'on rattrape l\'autre équipe ou on fait le plus de tours en 4 min').num(375, 85, 2); },
    crosshop: g => { g.grass(); [[110, 125], [290, 125]].forEach(([cx, cy], k) => { [[0, 0], [0, -40], [40, 0], [0, 40], [-40, 0]].forEach(([dx, dy]) => g.zone(cx + dx - 17, cy + dy - 17, 34, 34, '', dx || dy ? 'grey' : 'yellow'));
        g.A(cx, cy).arrow('jump', cx, cy - 8, cx, cy - 34, 0, k ? null : 1).arrow('jump', cx + 6, cy - 34, cx + 34, cy - 4, 20).B(cx + 70, cy + 55, '', {}).chrono(cx + 92, cy + 55); });
      return g.n(1, 'pieds joints : centre → carré → centre → carré suivant, dans le sens d\'une montre').n(2, '15 s chacun ; un partenaire compte, record du groupe'); }
  };
})();
