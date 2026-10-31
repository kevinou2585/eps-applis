/* Acrosport en jeux : 6 leçons par année (1re → 6e secondaire), la 6e = évaluation.
   Format « jeux » (voir carnet/prepa-moteur.js). Sur tapis, chaussettes ou pieds nus, pas de bijoux.
   Règles d'or : appuis sur les zones solides du porteur (épaules, bassin, cuisses près de la hanche), jamais sur le dos creux ni la nuque ;
   le voltigeur monte et descend sans sauter ; chaque figure a un pareur ; on tient 3 secondes ; on démonte dans l'ordre inverse.
   Idées mêlées et réécrites : classeur EPS, jeux d'appuis (« 3 joueurs, 4 appuis »), cartes-figures, photomaton, musée de cire,
   machine infernale, crêpe gainée, codes de difficulté A-B-C des compétitions scolaires. */
PREPA_JEUX({id: 'acro',
sport: 'Acrosport',
mat: [['tapis', 0.5, 'tapis'], ['jeu de cartes-figures (duo, trio, quatuor)', 4], ['fiche de juge et crayon', 0.25], ['enceinte et musique'], ['coupelle', 12, 'plots'], ['tablette pour photographier (facultatif)']],
sal: {
  tk: {tapis: 'les tapis'},
  g: {note: 'les tapis Sarneige sont à apporter de la Petite salle (local partagé) : une rangée de tapis par groupe, avec 1 m entre les rangées.', warn: 'Sans tapis, pas de figure : on ne monte jamais sur le parquet nu.'},
  p: {note: 'la meilleure salle pour l\'acrosport : 15 tapis Sarneige en îlots, les gros tapis de réception pour les éléments gymniques (roulades, ATR). Avec plus de 16 élèves, des îlots de 2 tapis.'},
  b: {src: 'la Petite salle', note: 'les tapis sont à apporter de la Petite salle (prévoir le transport avec les élèves). Îlots de 2 tapis le long des murs.', warn: 'Peu de tapis transportables : figures à 2 et à 3 seulement, pas de pyramide haute.'},
  c: {note: 'sur l\'herbe ou un sol souple seulement, avec les tapis apportés.', warn: 'Dehors sur le dur : figures basses uniquement (à genoux ou à quatre pattes), aucun voltigeur debout, aucun élément au sol. Si possible, rester en salle.'}
},
J: {
  appuis: {n: 'Le jeu des appuis', k: 'coop', s: 'acro:acrosport:trio', f: 'g4', d: 'Le prof annonce « 3 joueurs, 5 appuis ! » : chaque groupe doit tenir 3 s en ne touchant le sol qu\'avec 5 appuis (pieds, mains, genoux…). Puis « 3 joueurs, 4 appuis », « 4 joueurs, 6 appuis »… Le groupe le plus rapide gagne le point.'},
  statues: {n: 'Le chat gainé', k: 'opp', s: 'chat', d: '{n/8 chat}. Un joueur touché se fige en planche (gainage face ou côté) ; il est délivré quand un camarade passe sous lui (planche face) ou l\'enjambe (planche côté). Le chat change toutes les minutes.'},
  crepe: {n: 'La crêpe', k: 'coop', s: 'acro:acrosport:duo', f: 'g3', d: 'Un joueur allongé, gainé « comme une planche ». Les deux autres essaient de le retourner (dos → ventre) ; s\'il plie, la crêpe est ratée ! Puis on le soulève de 10 cm par les chevilles : tout le corps doit suivre.'},
  miroir: {n: 'Le miroir', k: 'coop', s: 'deux', f: 'p', d: 'Par deux face à face : l\'un fait des positions d\'équilibre (sur un pied, planche, chandelle, avion), l\'autre copie en même temps. Le meneur change au signal. Puis on tient la position ensemble 3 s : « 1-2-3 ».'},
  transport: {n: 'Les déménageurs', k: 'coop', s: 'acro:acrosport:quatuor', f: 'g4', d: 'Par 4 : un joueur gainé est porté par les trois autres (épaules, bassin, chevilles) sur 5 m, puis reposé doucement. On tourne. Si le « meuble » plie, on recommence.'},
  cartes: {n: 'La pioche des figures', k: 'coop', s: 'acro:acrosport:duo', f: 'g3', d: 'Chaque groupe pioche une carte-figure (dessin + valeur A, B ou C). Il la réalise : montage, tenue 3 s, démontage, avec un pareur. Le prof (ou un juge) valide et le groupe garde la carte. Le groupe qui a le plus de points à la fin gagne.'},
  photo: {n: 'Le photomaton', k: 'coop', s: 'acro:acrosport:trio', f: 'g4', d: 'Le prof montre une photo ou un dessin de figure pendant 10 s puis la cache. Les groupes doivent la reproduire à l\'identique, de mémoire. Au « clic ! », on se fige 3 s : la photo est-elle ressemblante ?'},
  musee: {n: 'Le musée de cire', k: 'fp', s: 'acro:acrosport:trio', f: 'g4', d: 'La moitié des groupes sont les statues : ils montent une figure et la tiennent. L\'autre moitié sont les visiteurs : ils passent et donnent des étoiles (1 à 3) pour la tenue et la sécurité. Si une statue bouge, elle « fond » et recommence.'},
  bingo: {n: 'Le bingo des figures', k: 'coop', s: 'acro:acrosport:quatuor', f: 'g4', d: 'Chaque groupe a une grille de 9 figures (3 duos, 3 trios, 3 quatuors). Une figure validée = une case cochée. Une ligne = « bingo » ! Le groupe qui fait le premier bingo crie et montre ses 3 figures au prof.'},
  machine: {n: 'La machine infernale', k: 'coop', s: 'acro:acrosport:pyramide', f: 'e2', d: 'Un premier élève entre sur le tapis et fait une position avec un mouvement répété (et un bruit !). Un 2e s\'accroche à lui avec un appui, puis un 3e… jusqu\'à une grande machine vivante. Au signal, elle tombe en panne : tout le monde se fige 3 s.'},
  liaisons: {n: 'Le fil rouge', k: 'coop', s: 'acro:acrosport:trio', f: 'g4', d: 'Entre deux figures, il faut une liaison : roulade, saut, tour, pas dansé, déplacement à 4 pattes. Le prof annonce la liaison ; tous les groupes enchaînent figure 1 → liaison → figure 2 sans s\'arrêter. Le groupe le plus fluide gagne.'},
  juge: {n: 'Le juge mystère', k: 'fp', s: 'acro:acrosport:quatuor', f: 'g4', d: 'Un groupe présente, un autre juge avec la fiche (sécurité, tenue 3 s, gainage). Chaque juge a en plus un critère « mystère » tiré au sort (regard, synchronisation, sourire, pointes de pieds…) qu\'il ne dévoile qu\'à la fin.'},
  pyramide: {n: 'La grande pyramide', k: 'coop', s: 'acro:acrosport:pyramide', f: 'e2', d: 'Deux groupes s\'associent pour construire une pyramide à 6 ou plus : on choisit sur fiche, on place les pareurs, on monte dans l\'ordre, on tient 3 s, on démonte dans l\'ordre inverse. Photo souvenir !'},
  bilan: {n: 'La photo de classe', k: 'fp', s: 'etirements', d: 'Étirements du dos, des épaules et des poignets en cercle. Chacun dit sa figure préférée et le nom d\'un pareur sérieux. On finit par une « photo de classe » : toute la classe en une figure basse.'},
  massage: {n: 'La pizza', k: 'coop', s: 'deux', f: 'p', d: 'Par deux : l\'un est allongé sur le ventre, l\'autre fait la « pizza » sur son dos (étaler la pâte, la sauce, les ingrédients) avec des gestes doux. On change. Puis étirements des poignets et des épaules.'},
  aimants: {n: 'Les aimants', k: 'coop', s: 'deux', d: 'On se déplace dans la salle (marche, pas chassés, quadrupédie). Le prof annonce deux parties du corps : « dos-dos ! », « main-genou ! », « pied-épaule ! » : on se colle le plus vite possible à un camarade par ces deux parties et on tient 3 s gainé. Puis « par 3 ! » : un aimant à trois.'},
  duelplanche: {n: 'Le duel en planche', k: 'opp', s: 'deux', f: 'p', d: 'Par deux, face à face en planche sur les mains : chacun essaie de toucher la main de l\'autre, qui l\'esquive sans poser le genou. 1 point par touche, manches de 30 s. Puis en planche de côté, pied contre pied. On change de partenaire à chaque manche.'},
  feux: {n: 'Les feux de l\'acrobate', k: 'coop', s: 'deux', d: 'On court dans la salle. Le prof montre une couleur : vert = on court, orange = statue sur un pied, rouge = planche face au sol, bleu = « table » (à 4 pattes, dos plat) ; violet = par deux, l\'un fait la table et l\'autre s\'assoit dessus sans bouger les mains. Le dernier en position fait 3 sauts.'},
  ombre: {n: 'L\'ombre de l\'acrobate', k: 'coop', s: 'deux', f: 'p', d: 'Par deux, l\'un derrière l\'autre sur les tapis : le chef se déplace et enchaîne des éléments (roulade, saut, demi-tour, quadrupédie, équilibre sur un pied) ; son ombre fait exactement la même chose, au même moment. On change de chef toutes les minutes.'},
  zoo: {n: 'Le zoo gymnique', k: 'opp', s: 'chat', d: '{n/8 chasseur}. Les autres se déplacent comme l\'animal annoncé : ours (mains et pieds), crabe (sur le dos, ventre en haut), phoque (bras tendus, jambes traînées), grenouille, kangourou. Un animal touché fait la « table » et est délivré quand un camarade passe dessous. Nouvel animal toutes les 45 s.'},
  chaise: {n: 'Les chaises à plusieurs', k: 'coop', s: 'deux', f: 'p', d: 'Par deux, dos à dos, bras croisés : on s\'assoit au sol ensemble et on se relève sans se lâcher ni poser les mains. Réussi ? On passe à 3, puis à 4, puis à 6. Quel groupe arrive à se relever au plus grand nombre ?'},
  cigognes: {n: 'Les cigognes', k: 'opp', s: 'deux', f: 'p', d: 'Par deux, face à face sur un pied, paumes contre paumes : on se pousse doucement par les mains (pas ailleurs) pour faire poser le pied de l\'autre. 1 point, puis on change de pied et de partenaire. Variante : en équilibre accroupi (« la poule »).'},
  jacques: {n: 'Jacques a dit gymnique', k: 'coop', s: 'deux', d: 'Jacques a dit, avec des positions d\'acrosport : planche, chandelle, avion, pont, table, statue à deux. Si le prof n\'a pas dit « Jacques a dit », on ne bouge pas : celui qui bouge fait un gage de gainage (5 s de planche) et reste dans le jeu. Puis un élève devient Jacques.'},
  stop: {n: 'Stop, figure !', k: 'coop', s: 'acro:acrosport:duo', f: 'p', d: 'Musique : on se déplace en dansant dans la salle. Musique coupée : on rejoint le camarade le plus proche et on monte une figure à deux simple (banc, chaise, avion bas), tenue 3 s sans bouger. Puis la musique reprend et on change de partenaire. Ensuite, le prof annonce « à trois ! ».'},
  ponts: {n: 'La rivière aux ponts', k: 'coop', s: 'deux', d: 'La moitié de la classe fait des ponts dispersés sur les tapis : table, planche face, pont, chandelle jambes écartées. Les autres traversent en passant sous 6 ponts différents, puis reviennent en enjambant les planches. Au sifflet, on change de rôle ; chaque pont change de forme à chaque manche.'},
  etirduo: {n: 'Les étirements à deux', k: 'coop', s: 'etirements', f: 'p', d: 'Par deux : assis dos à dos, on respire ensemble ; puis l\'un tire doucement les mains de l\'autre (dos, épaules), on s\'étire les poignets ensemble, et on finit allongés tête contre tête, bras au-dessus de la tête. Chacun dit à son partenaire une chose qu\'il a bien faite.'},
  sculpteur: {n: 'Le sculpteur', k: 'coop', s: 'acro:acrosport:trio', f: 'g4', d: 'Dans chaque groupe, le sculpteur va voir une photo de figure chez le prof. Il revient et « modèle » ses camarades (yeux fermés, ils se laissent placer) sans montrer la photo et sans parler. Le groupe tient 3 s : le prof compare avec la photo. On change de sculpteur.'},
  echo: {n: 'La figure écho', k: 'coop', s: 'acro:acrosport:trio', f: 'g4', d: 'Un groupe monte une figure de son choix et la tient. Tous les autres groupes ont 15 s pour la reproduire, en même temps, avec pareur. Le groupe suivant propose la sienne. Chaque figure reproduite par tous = 1 point pour la classe.'},
  escalier: {n: 'L\'escalier des figures', k: 'opp', s: 'acro:acrosport:trio', f: 'g4', d: 'Chaque groupe monte les marches dans l\'ordre : duo A, duo B, trio A, trio B, quatuor B, figure C. Une marche validée (tenue 3 s, démontage sans chute) = on peut passer à la suivante. Interdit de sauter une marche. Quel groupe est le plus haut à la fin ?'},
  monstre: {n: 'Le monstre à pattes', k: 'coop', s: 'acro:acrosport:quatuor', f: 'g4', d: 'Le prof annonce « 4 joueurs, 6 pattes ! » : le groupe doit traverser le tapis accroché ensemble, en ne touchant le sol qu\'avec 6 appuis à la fois. Puis 5, puis 4 pattes. Un pareur suit le monstre. Le monstre qui tombe recommence.'},
  alphabet: {n: 'L\'alphabet humain', k: 'coop', s: 'acro:acrosport:quatuor', f: 'g4', d: 'Le prof annonce une lettre (A, H, M, T, X…) : chaque groupe la forme avec ses corps, debout ou au sol, en 15 s. Puis un mot de 3 lettres avec deux groupes. Les lettres debout demandent du gainage et des appuis solides.'},
  surprise: {n: 'La figure surprise', k: 'coop', s: 'acro:acrosport:trio', f: 'g4', d: 'Le prof tire deux cartes : un nombre de joueurs (2, 3 ou 4) et une forme (basse, haute, sur le dos, avec un équilibre). Chaque groupe invente une figure qui respecte les deux cartes en 30 s, avec pareur. Le prof valide les figures sûres et tenues 3 s.'},
  relaisfig: {n: 'La course aux cartes', k: 'opp', s: 'acro:acrosport:duo', f: 'g4', d: 'Les cartes-figures sont face cachée au milieu. Un élève de chaque groupe court en prendre une ; le groupe la monte, la fait valider par le prof (ou un juge), puis un autre élève court rendre la carte et en prendre une nouvelle. Tous les groupes jouent en même temps : le plus de points en {8|5} min.'},
  public: {n: 'Les cartons du public', k: 'fp', s: 'acro:acrosport:quatuor', f: 'g4', d: 'Un groupe présente ; tous les autres sont le public et lèvent un carton à la fin de chaque figure : vert = tenue 3 s et sûre, orange = elle a bougé, rouge = danger. Le groupe compte ses verts et choisit la figure à corriger. On tourne.'},
  contraintes: {n: 'La répétition à contraintes', k: 'coop', s: 'acro:acrosport:quatuor', f: 'g4', d: 'On répète son enchaînement trois fois de suite, avec une contrainte tirée au sort à chaque passage : en silence total, au ralenti, en comptant les 3 s à voix haute, deux fois plus vite pour les liaisons, ou devant un autre groupe. Un élève note ce qui a bougé.'},
  troispassages: {n: 'Les trois passages', k: 'coop', s: 'acro:acrosport:quatuor', f: 'g4', d: 'Trois passages, un objectif chacun : 1) la mémoire (tout l\'enchaînement sans arrêt), 2) la tenue (un observateur compte les 3 s à chaque figure), 3) la musique (on part et on finit avec elle). Entre deux passages, 1 min pour corriger une seule chose.'}
},
an: {
1: {th: 'Découvrir l\'acrosport : sécurité, porteur, voltigeur, pareur et figures à deux', comp: ['HME1', 'HME3', 'HSC2', 'GSS2'], l: [
  {t: 'Les règles de sécurité et le gainage', o: 'Connaître les zones d\'appui et être gainé (corps « planche ») pour porter et être porté.',
   e: [['statues', 6],
    ['miroir', 7]],
   c: [['crepe', 15, 'On apprend le mot magique : « gainé ! » (ventre et fesses serrés, corps dur).', 'Je reste gainé quand on me retourne.', 'On soulève la crêpe par les épaules.'],
    ['Les zones solides', 16, 'Le prof montre sur un élève : épaules, bassin, cuisses près de la hanche = OK ; dos creux, nuque, ventre = interdit. Jeu : le prof touche une zone, les groupes crient « solide ! » ou « interdit ! ». Puis chaque duo fait une table (à 4 pattes) et l\'autre pose les mains sur les zones solides.', 'Je pose mes appuis sur les zones solides.', '', 'acro:acrosport:duo', 'p'],
    ['appuis', 15, '', 'Mon groupe gagne {3|2} points.', '« 2 joueurs, 2 appuis ! »']],
   x: [['transport', 15, '', 'Mon groupe porte sans que le meuble plie.']],
   r: [['massage', 7]]},
  {t: 'Figures à deux : monter, tenir, démonter', o: 'Réaliser 4 figures à deux : montage, tenue 3 s, démontage.',
   e: [['aimants', 6],
    ['duelplanche', 7]],
   c: [['cartes', 18, 'Cartes de duos seulement. Un 3e élève est le pareur.', 'Mon groupe gagne {4|3} cartes.', 'Cartes B pour les rapides.'],
    ['photo', 14, 'Figures à deux.', 'Notre photo ressemble.'],
    ['musee', 14, '', 'Notre statue a 2 étoiles ou plus.']],
   x: [['monstre', 15]],
   r: [['bilan', 7]]},
  {t: 'Les éléments de liaison', o: 'Relier les figures par des éléments simples : roulade, saut, tour, pas dansé.',
   e: [['feux', 6],
    ['ombre', 7]],
   c: [['Le parcours gymnique', 15, 'Sur les tapis : roulade avant, saut extension, demi-tour sauté, roulade arrière (ou sur l\'épaule), chandelle. On passe par 3 et on se donne des conseils.', 'Je fais les 5 éléments sans aide.', 'Enchaîner 3 éléments sans s\'arrêter.', 'ateliers:acrosport:4', 'g3'],
    ['liaisons', 16, '', 'Mon groupe enchaîne sans s\'arrêter.'],
    ['escalier', 15]],
   x: [['echo', 15]],
   r: [['etirduo', 7]]},
  {t: 'Figures à trois', o: 'Réaliser des figures à trois : deux porteurs ou un porteur et deux voltigeurs.',
   e: [['zoo', 6],
    ['chaise', 7]],
   c: [['relaisfig', 16],
    ['bingo', 15, 'Grille de duos et de trios.', 'Mon groupe fait un bingo.'],
    ['sculpteur', 15]],
   x: [['machine', 15, '', 'Notre machine tient 3 s.']],
   r: [['meteo', 7]]},
  {t: 'Construire son enchaînement', o: 'Composer en groupe un enchaînement de 4 figures avec liaisons, sur une musique.',
   e: [['cigognes', 6],
    ['jacques', 7]],
   c: [['Le plan de l\'enchaînement', 16, 'Chaque groupe choisit 4 figures (2 duos, 2 trios), les liaisons et un début/une fin, et dessine son plan.', 'Notre plan est dessiné.', 'Une figure de plus.', 'acro:acrosport:trio', 'g4'],
    ['Répétition en musique', 15, 'On répète l\'enchaînement sur la musique ; un élève compte les 3 s.', 'Notre enchaînement tient sans arrêt.', '', 'acro:acrosport:trio', 'g4'],
    ['juge', 15, 'Première présentation.', 'Je juge avec ma fiche.']],
   x: [['public', 15]],
   r: [['respire', 7]]},
  {t: 'Évaluation : présentation des enchaînements', o: 'Présenter son enchaînement en sécurité, gainé et synchronisé.',
   crit: [['Sécurité (zones d\'appui, parade)', 6, '6 : appuis sur épaules, bassin, cuisses uniquement, parade présente · 4 : un oubli · 2 : plusieurs oublis · 0 : dangereux'], ['Figures tenues 3 s', 5, '5 : toutes les figures tenues 3 s · 3 : la plupart · 1 : peu'], ['Gainage', 4, '4 : corps gainé, aucune cambrure · 2 : gainage irrégulier · 0 : relâché'], ['Liaisons et synchronisation', 3, '3 : liaisons fluides, groupe ensemble · 1 : arrêts entre les figures · 0 : désorganisé'], ['Rôle de juge spectateur', 2, '2 : remplit sa fiche de juge avec attention · 1 : incomplète · 0 : dérange']],
   e: [['ponts', 6],
    ['stop', 7]],
   c: [['Dernière répétition', 10, 'Chaque groupe répète une fois.', '', '', 'acro:acrosport:trio', 'g4'],
    ['Le spectacle', 28, 'Chaque groupe présente ; un autre groupe juge avec la fiche.', '', '', 'acro:acrosport:trio', 'g4']],
   r: [['mercis', 6]]}
]},
2: {th: 'Trios et quatuors : figures plus hautes, liaisons gymniques, composition', comp: ['HME1', 'HME3', 'HSC2', 'GSS2'], l: [
  {t: 'Révision et figures à trois', o: 'Réviser les règles et réaliser des figures à trois plus difficiles.',
   e: [['statues', 6],
    ['appuis', 7]],
   c: [['Le quiz de sécurité', 12, 'Le prof monte une figure avec une erreur (appui sur le dos creux, pas de pareur, saut à la descente…). Le premier groupe qui trouve l\'erreur gagne 1 point.', 'Mon groupe trouve {4|3} erreurs.', '', 'explication'],
    ['cartes', 18, 'Trios de valeur B.', 'Mon groupe gagne {4|3} cartes.'],
    ['photo', 16, '', 'Notre photo ressemble.']],
   x: [['transport', 15, '', 'Mon groupe porte sans que le meuble plie.']],
   r: [['massage', 7]]},
  {t: 'L\'appui renversé et la roue', o: 'Réaliser un appui tendu renversé (ATR) contre un mur ou avec parade, et une roue.',
   e: [['miroir', 6],
    ['crepe', 7]],
   c: [['L\'horloge de l\'ATR', 16, 'Par 3 : monter à l\'ATR contre le mur ou avec deux pareurs (aux cuisses). On compte les secondes : « 1 heure, 2 heures… ». Record du groupe.', 'Je tiens {5|3} s à l\'ATR avec parade.', 'ATR sans mur, avec un seul pareur.', 'ateliers:acrosport:4', 'g3'],
    ['La roue dans le couloir', 15, 'Couloir de 2 coupelles : on fait la roue sans sortir du couloir, mains puis pieds dans une ligne. Puis une roue enchaînée avec une figure.', 'Ma roue reste dans le couloir.', 'Roue d\'une main.', 'ateliers:acrosport:4', 'g3'],
    ['liaisons', 15, 'Liaison au choix : roue ou roulade.', 'Mon groupe enchaîne sans s\'arrêter.']],
   x: [['musee', 15, '', 'Notre statue a 2 étoiles.']],
   r: [['bilan', 7]]},
  {t: 'Les figures à quatre', o: 'Réaliser des figures à quatre (pyramides simples).',
   e: [['aimants', 6],
    ['duelplanche', 7]],
   c: [['escalier', 16, 'Quatuors.'],
    ['bingo', 15, 'Grille avec quatuors.', 'Mon groupe fait un bingo.'],
    ['machine', 15, '', 'Notre machine tient 3 s.']],
   x: [['pyramide', 15, '', 'Notre pyramide tient 3 s.']],
   r: [['etirduo', 7]]},
  {t: 'Composer avec des contraintes', o: 'Composer un enchaînement à 4 avec figures, liaisons et changements de formation.',
   e: [['feux', 6],
    ['ombre', 7]],
   c: [['Les dés de la composition', 16, 'Chaque groupe lance 3 dés : nombre de figures (2 à 4), liaisons imposées, une contrainte (« un moment au sol », « un canon », « une figure en mouvement »). Il compose avec.', 'Notre enchaînement respecte les dés.', 'On relance un dé en cours.', 'acro:acrosport:quatuor', 'g4'],
    ['Répétition en musique', 15, '', 'Notre enchaînement tient sans arrêt.', '', 'acro:acrosport:quatuor', 'g4'],
    ['sculpteur', 15]],
   x: [['juge', 15, '', 'Je juge avec ma fiche.']],
   r: [['meteo', 7]]},
  {t: 'Répéter et juger', o: 'Améliorer son enchaînement et apprendre à juger (exécution, sécurité).',
   e: [['zoo', 6],
    ['chaise', 7]],
   c: [['public', 18],
    ['contraintes', 14, 'On corrige le point faible donné par le juge.'],
    ['echo', 14]],
   x: [['surprise', 15]],
   r: [['respire', 7]]},
  {t: 'Évaluation : enchaînement à quatre', o: 'Présenter un enchaînement à quatre et juger un autre groupe.',
   crit: [['Sécurité', 6, '6 : aucune chute, parade et montée/descente correctes · 4 : un déséquilibre · 2 : une chute · 0 : dangereux'], ['Difficulté des figures', 4, '4 : figures à 4 variées et exigeantes · 2 : figures simples · 0 : figures à 2 seulement'], ['Exécution (tenue, gainage)', 5, '5 : figures tenues 3 s, gainées · 3 : tenue courte · 1 : figures écroulées'], ['Composition (liaisons, musique)', 3, '3 : enchaînement fluide sur la musique · 1 : arrêts · 0 : pas d\'enchaînement'], ['Juge', 2, '2 : note l\'autre groupe avec justesse · 1 : au hasard · 0 : ne juge pas']],
   e: [['cigognes', 6],
    ['jacques', 7]],
   c: [['Dernière répétition', 10, '', '', '', 'acro:acrosport:quatuor', 'g4'],
    ['Le spectacle', 28, 'Présentation et jugement croisé.', '', '', 'acro:acrosport:quatuor', 'g4']],
   r: [['mercis', 6]]}
]},
3: {th: 'Difficulté et exécution : choisir ses figures selon un code', comp: ['HME3', 'HME5', 'HSC1', 'HSC2', 'GSS2'], l: [
  {t: 'Le code des figures', o: 'Connaître la valeur des figures (A, B, C) et choisir selon son niveau.',
   e: [['appuis', 6],
    ['statues', 7]],
   c: [['La bourse aux figures', 18, 'Les cartes ont un prix : A = 1 point, B = 2, C = 3. Chaque groupe a 10 min pour « acheter » (réussir) le plus de points. Une figure ratée coûte 1 point.', 'Mon groupe a {10|6} points.', 'Les C comptent double s\'ils sont tenus 5 s.', 'acro:acrosport:quatuor', 'g4'],
    ['bingo', 14, 'Grille A-B-C.', 'Mon groupe fait un bingo.'],
    ['photo', 14, 'Figures C.', 'Notre photo ressemble.']],
   x: [['transport', 15, '', 'Mon groupe porte sans que le meuble plie.']],
   r: [['massage', 7]]},
  {t: 'Les figures dynamiques', o: 'Réaliser des montages et démontages dynamiques sûrs (petite impulsion, réception amortie).',
   e: [['crepe', 6],
    ['miroir', 7]],
   c: [['L\'atterrissage', 15, 'Par 3 : le voltigeur descend d\'une figure basse en sautant pieds joints, réception genoux souples, bras devant, et se fige. Les pareurs tiennent les bras. Note de l\'atterrissage (1 à 3).', 'Mon atterrissage a 3.', 'Descente d\'une figure plus haute.', 'acro:acrosport:trio', 'g3'],
    ['cartes', 16, 'Cartes « dynamiques ».', 'Mon groupe gagne des cartes.'],
    ['liaisons', 15, '', 'Mon groupe enchaîne sans s\'arrêter.']],
   x: [['machine', 15, '', 'Notre machine tient 3 s.']],
   r: [['bilan', 7]]},
  {t: 'Les éléments gymniques individuels', o: 'Enrichir l\'enchaînement d\'éléments individuels (ATR, roue, roulades, sauts, équilibres).',
   e: [['aimants', 6],
    ['duelplanche', 7]],
   c: [['L\'horloge de l\'ATR', 15, '', 'Je tiens {5|3} s.', '', 'ateliers:acrosport:4', 'g3'],
    ['Le parcours gymnique', 16, 'Ajouter roue et ATR-roulade.', 'Je fais tout le parcours.', '', 'ateliers:acrosport:4', 'g3'],
    ['monstre', 15]],
   x: [['musee', 15, '', 'Notre statue a 3 étoiles.']],
   r: [['etirduo', 7]]},
  {t: 'Composer pour un jury', o: 'Composer un enchaînement de 2 minutes en musique pour un jury.',
   e: [['feux', 6],
    ['ombre', 7]],
   c: [['La feuille de route', 16, 'Chaque groupe déclare ses figures (valeur A-B-C), ses liaisons, ses éléments individuels sur la feuille du jury.', 'Notre feuille est complète.', '', 'explication', 'g4'],
    ['Répétition en musique', 16, '', 'Notre enchaînement tient sans arrêt.', '', 'acro:acrosport:quatuor', 'g4'],
    ['sculpteur', 14]],
   x: [['juge', 15, '', 'Je juge avec justesse.']],
   r: [['meteo', 7]]},
  {t: 'Juger : difficulté et exécution', o: 'Juger la difficulté et l\'exécution avec une fiche ; améliorer son enchaînement.',
   e: [['zoo', 6],
    ['chaise', 7]],
   c: [['Le jury de la compétition', 20, 'Un jury de 3 : un juge de difficulté (figures déclarées réussies), deux juges d\'exécution (tenue, gainage, chutes). On compare les notes des deux juges d\'exécution.', 'Les notes de mon jury sont proches.', '', 'acro:acrosport:quatuor', 'g4'],
    ['contraintes', 14, 'On corrige d\'après le jury.'],
    ['echo', 12]],
   x: [['pyramide', 15, '', 'Notre pyramide tient 3 s.']],
   r: [['respire', 7]]},
  {t: 'Évaluation : compétition', o: 'Présenter son enchaînement et juger les autres.',
   crit: [['Sécurité', 5, '5 : aucune chute, parade · 3 : un déséquilibre · 1 : une chute'], ['Difficulté', 5, '5 : figures de niveau élevé, toutes réalisées · 3 : moyennes · 1 : faciles'], ['Exécution', 5, '5 : tenue 3 s, gainage, alignement · 3 : moyenne · 1 : faible'], ['Originalité et composition', 3, '3 : original, liaisons fluides · 1 : banal ou haché'], ['Rôle de juge', 2, '2 : juge avec justesse · 1 : approximatif · 0 : ne juge pas']],
   e: [['cigognes', 6],
    ['jacques', 7]],
   c: [['Dernière répétition', 10, '', '', '', 'acro:acrosport:quatuor', 'g4'],
    ['La compétition', 28, 'Jury élève et prof.', '', '', 'acro:acrosport:quatuor', 'g4']],
   r: [['mercis', 6]]}
]},
4: {th: 'Acrosport et expression : un thème, une histoire', comp: ['HME3', 'HME5', 'HSC2', 'GSS2'], l: [
  {t: 'Les figures expressives', o: 'Donner une intention aux figures : forme, regard, bras.',
   e: [['miroir', 6, 'Avec une émotion imposée : joie, peur, colère, fierté.'],
    ['statues', 7]],
   c: [['Le musée des émotions', 16, 'Chaque groupe tire une émotion et monte une figure qui la montre (regard, bras, tête). Les autres devinent. 1 point par émotion devinée, 1 point au groupe qui devine.', 'Mon groupe fait deviner {3|2} émotions.', '', 'acro:acrosport:trio', 'g4'],
    ['photo', 15, 'Photos de sculptures célèbres (Le Penseur, la Liberté…).', 'Notre photo ressemble.'],
    ['cartes', 15, 'Chaque carte réussie doit avoir une intention.', 'Mon groupe gagne des cartes.']],
   x: [['machine', 15, 'Machine sur un thème : l\'usine, la jungle, l\'orage.', 'Notre machine tient 3 s.']],
   r: [['massage', 7]]},
  {t: 'Choisir un thème', o: 'Choisir un thème (machine, nature, conte, sport) et trouver des figures qui le racontent.',
   e: [['appuis', 6],
    ['crepe', 7]],
   c: [['Le chapeau des thèmes', 16, 'Chaque groupe tire 3 thèmes et en garde un. Il trouve 3 figures qui le racontent et les montre en 1 min : les autres devinent le thème.', 'Notre thème est deviné.', '', 'acro:acrosport:quatuor', 'g4'],
    ['Le story-board', 15, 'On dessine l\'histoire en 4 cases : début, 2 moments forts, fin. Chaque case = une figure.', 'Notre story-board est dessiné.', '', 'explication', 'g4'],
    ['musee', 15, 'Statues du thème.', 'Notre statue a 2 étoiles.']],
   x: [['transport', 15, '', 'Mon groupe porte sans que le meuble plie.']],
   r: [['bilan', 7]]},
  {t: 'Construire le spectacle', o: 'Organiser figures, liaisons et espace pour raconter une histoire.',
   e: [['aimants', 6],
    ['duelplanche', 7]],
   c: [['Le plan de scène', 16, 'Chaque groupe place son histoire sur la scène : où commence-t-on, où va-t-on, où est le public ?', 'Notre plan de scène est clair.', '', 'acro:acrosport:quatuor', 'g4'],
    ['Répétition en musique', 16, 'Musique choisie par le groupe.', 'Notre spectacle tient sans arrêt.', '', 'acro:acrosport:quatuor', 'g4'],
    ['liaisons', 14, 'Liaisons qui racontent (ramper, s\'enfuir, se transformer).', 'Mon groupe enchaîne.']],
   x: [['juge', 15, 'Critère mystère : l\'histoire est-elle compréhensible ?', 'Je juge avec ma fiche.']],
   r: [['etirduo', 7]]},
  {t: 'Les figures de groupe', o: 'Réaliser une grande figure en associant deux groupes.',
   e: [['feux', 6],
    ['ombre', 7]],
   c: [['pyramide', 18, '', 'Notre pyramide tient 3 s.'],
    ['alphabet', 14],
    ['bingo', 14, '', 'Mon groupe fait un bingo.']],
   x: [['sculpteur', 15]],
   r: [['meteo', 7]]},
  {t: 'Répétition et regard critique', o: 'Améliorer le spectacle grâce au regard des autres.',
   e: [['zoo', 6],
    ['chaise', 7]],
   c: [['Le groupe-miroir', 18, 'Deux groupes se regardent : chacun dit au partenaire 2 « étoiles » (ce qui marche) et 1 « vœu » (à améliorer).', 'Mon groupe applique le vœu.', '', 'acro:acrosport:quatuor', 'g4'],
    ['contraintes', 16],
    ['echo', 12]],
   x: [['public', 15]],
   r: [['respire', 7]]},
  {t: 'Évaluation : spectacle', o: 'Présenter le spectacle acrobatique sur un thème.',
   crit: [['Sécurité', 5, '5 : aucune chute, parade · 3 : un déséquilibre · 1 : une chute'], ['Figures : difficulté et tenue', 5, '5 : figures exigeantes tenues 3 s · 3 : moyennes ou tenue courte · 1 : faibles'], ['Thème lisible', 4, '4 : le public comprend le thème · 2 : en partie · 0 : pas lisible'], ['Expression', 3, '3 : regard, intention, costumes ou accessoires au service du thème · 1 : peu · 0 : aucun'], ['Synchronisation', 3, '3 : groupe ensemble sur la musique · 1 : décalages · 0 : désorganisé']],
   e: [['cigognes', 6],
    ['jacques', 7]],
   c: [['Dernière répétition', 10, '', '', '', 'acro:acrosport:quatuor', 'g4'],
    ['Le spectacle', 28, 'Chaque groupe annonce son thème, puis présente.', '', '', 'acro:acrosport:quatuor', 'g4']],
   r: [['mercis', 6]]}
]},
5: {th: 'Acrosport et condition physique : force, souplesse, gainage au service des figures', comp: ['HME1', 'HME3', 'GSS1', 'GSS2'], l: [
  {t: 'Tests et objectifs', o: 'Évaluer sa force, sa souplesse et son gainage ; fixer un objectif.',
   e: [['statues', 6],
    ['miroir', 7]],
   c: [['Les 4 tests', 18, 'Par 2 : gainage face (temps), pompes en 30 s, souplesse assis jambes tendues (cm), squats chaise contre le mur (temps). On note.', 'Mes 4 résultats sont notés.', '', 'ateliers:acrosport:4', 'a4'],
    ['Mon contrat', 12, 'Un objectif chiffré par test pour la fin du cycle.', 'Mon contrat est écrit.', '', 'explication'],
    ['cartes', 16, 'Cartes « force » (porteur) et « souplesse » (voltigeur).', 'Mon groupe gagne des cartes.']],
   x: [['transport', 15, '', 'Mon groupe porte.']],
   r: [['massage', 7]]},
  {t: 'Gainage et figures', o: 'Améliorer le gainage pour tenir les figures plus longtemps.',
   e: [['crepe', 6],
    ['aimants', 7]],
   c: [['Le chrono des statues', 16, 'Chaque groupe monte une figure et la tient le plus longtemps possible (sécurité d\'abord). Record de la classe affiché.', 'Notre figure tient {10|6} s.', '', 'acro:acrosport:trio', 'g4'],
    ['Le circuit gainé', 15, 'Ateliers de 40 s : planche face, planche côté, chaise, superman, planche à deux (on se tape dans les mains).', 'Je tiens tous les ateliers.', '', 'ateliers:acrosport:6', 'a6'],
    ['monstre', 15]],
   x: [['musee', 15, '', 'Notre statue a 3 étoiles.']],
   r: [['bilan', 7]]},
  {t: 'Souplesse et figures', o: 'Travailler la souplesse pour des figures plus belles (grand écart, pont).',
   e: [['duelplanche', 6],
    ['feux', 7]],
   c: [['L\'escalier de la souplesse', 15, 'Postures tenues 30 s, de plus en plus difficiles : pince, papillon, fente, pont sur la tête, pont. Chacun s\'arrête à sa marche.', 'Je monte d\'une marche.', '', 'ateliers:acrosport:4', 'g3'],
    ['escalier', 16],
    ['photo', 15, '', 'Notre photo ressemble.']],
   x: [['machine', 15, '', 'Notre machine tient 3 s.']],
   r: [['etirduo', 7]]},
  {t: 'Composer un enchaînement exigeant', o: 'Composer un enchaînement qui met en valeur force, souplesse et gainage.',
   e: [['appuis', 6],
    ['ombre', 7]],
   c: [['La feuille de route', 16, 'Au moins 2 figures de force, 2 de souplesse, 1 figure tenue 5 s.', 'Notre feuille est complète.', '', 'explication', 'g4'],
    ['Répétition en musique', 16, '', 'Notre enchaînement tient sans arrêt.', '', 'acro:acrosport:quatuor', 'g4'],
    ['bingo', 14, '', 'Mon groupe fait un bingo.']],
   x: [['pyramide', 15, '', 'Notre pyramide tient 3 s.']],
   r: [['meteo', 7]]},
  {t: 'Re-tests et répétition', o: 'Mesurer ses progrès et répéter l\'enchaînement.',
   e: [['zoo', 6],
    ['chaise', 7]],
   c: [['Les 4 tests', 18, 'Mêmes tests.', 'Je progresse dans {3|2} tests.', '', 'ateliers:acrosport:4', 'a4'],
    ['contraintes', 16],
    ['juge', 12, '', 'Je juge avec ma fiche.']],
   x: [['echo', 15]],
   r: [['respire', 7]]},
  {t: 'Évaluation : enchaînement et progrès', o: 'Présenter un enchaînement exigeant et analyser ses progrès physiques.',
   crit: [['Sécurité', 5, '5 : aucune chute, parade · 3 : un déséquilibre · 1 : une chute'], ['Figures de force', 4, '4 : figures de force exigeantes réussies · 2 : simples · 0 : absentes'], ['Figures de souplesse', 4, '4 : avec amplitude · 2 : amplitude faible · 0 : absentes'], ['Tenue et composition', 4, '4 : figures tenues, enchaînement fluide · 2 : moyen · 0 : haché'], ['Analyse des progrès physiques', 3, '3 : compare ses tests du début et de la fin · 1 : vague · 0 : rien']],
   e: [['cigognes', 6],
    ['jacques', 7]],
   c: [['Dernière répétition', 10, '', '', '', 'acro:acrosport:quatuor', 'g4'],
    ['Le spectacle', 28, 'Présentation, puis chacun explique un progrès à l\'aide de ses tests.', '', '', 'acro:acrosport:quatuor', 'g4']],
   r: [['mercis', 6]]}
]},
6: {th: 'Projet autonome : créer, juger et présenter un numéro acrobatique', comp: ['HME3', 'HME5', 'HSC1', 'HSC2', 'GSS2'], l: [
  {t: 'Lancement du projet', o: 'Former des groupes et définir le projet de numéro.',
   e: [['appuis', 6, 'Mené par un élève.'],
    ['statues', 7]],
   c: [['Les rôles du numéro', 14, 'Groupes de 4 à 6 ; chacun a un rôle en plus : chorégraphe, responsable sécurité, régisseur (musique, ordre), costumier.', 'Chacun a son rôle.', '', 'explication', 'g5'],
    ['La bourse aux figures', 18, '', 'Mon groupe a {12|8} points.', '', 'acro:acrosport:quatuor', 'g4'],
    ['Le chapeau des thèmes', 14, '', 'Notre thème est choisi.', '', 'acro:acrosport:quatuor', 'g4']],
   x: [['alphabet', 15]],
   r: [['bilan', 7]]},
  {t: 'Créer (1)', o: 'Construire la structure du numéro.',
   e: [['echequipe', 13, 'Chaque groupe mène son échauffement (gainage, appuis).']],
   c: [['Le story-board', 14, '', 'Notre story-board est dessiné.', '', 'explication', 'g4'],
    ['Répétition en musique', 18, '', 'Le début et la fin tiennent.', '', 'acro:acrosport:quatuor', 'g4'],
    ['musee', 14, '', 'Notre statue a 3 étoiles.']],
   x: [['machine', 15, '', 'Notre machine tient 3 s.']],
   r: [['massage', 7]]},
  {t: 'Créer (2)', o: 'Enrichir le numéro : difficulté, liaisons, effets.',
   e: [['aimants', 13, 'Mené par un élève (le chef d\'échauffement) ; puis chaque groupe ajoute 3 min de gainage et de poignets.']],
   c: [['coach', 16, 'Chaque groupe choisit un jeu du cycle pour son point faible.', 'Mon groupe progresse.'],
    ['contraintes', 18],
    ['Le groupe-miroir', 12, '', 'Mon groupe applique le vœu.', '', 'acro:acrosport:quatuor', 'g4']],
   x: [['surprise', 15]],
   r: [['etirduo', 7]]},
  {t: 'Former les juges', o: 'Se former au jugement : difficulté, exécution, artistique.',
   e: [['duelplanche', 13, 'Mené par un élève (le chef d\'échauffement) ; puis chaque groupe ajoute 3 min de gainage et de poignets.']],
   c: [['Le jury de la compétition', 20, 'Ajouter un juge artistique.', 'Les notes de mon jury sont proches.', '', 'acro:acrosport:quatuor', 'g4'],
    ['troispassages', 14],
    ['juge', 12, '', 'Je trouve le critère mystère.']],
   x: [['echo', 15]],
   r: [['meteo', 7]]},
  {t: 'Répétition générale', o: 'Répéter le spectacle entier dans les conditions du jour J.',
   e: [['zoo', 13, 'Mené par un élève (le chef d\'échauffement) ; puis chaque groupe ajoute 3 min de gainage et de poignets.']],
   c: [['La générale', 34, 'Ordre de passage, entrées, musique par le régisseur, jury en place : comme le jour J.', 'Notre numéro passe sans arrêt.', '', 'acro:acrosport:quatuor', 'g4'],
    ['public', 12]],
   x: [['pyramide', 15, 'Final de la classe : une grande pyramide avec tous les groupes.']],
   r: [['respire', 7]]},
  {t: 'Évaluation : le spectacle', o: 'Présenter le numéro et juger les autres.',
   crit: [['Sécurité', 4, '4 : aucune chute, parade · 2 : un déséquilibre · 0 : une chute'], ['Difficulté', 4, '4 : figures de haut niveau · 2 : moyennes · 1 : faciles'], ['Exécution', 4, '4 : tenue, gainage, précision · 2 : moyenne · 1 : faible'], ['Artistique (thème, musique, originalité)', 4, '4 : numéro original, au service d\'un thème · 2 : peu travaillé · 1 : banal'], ['Rôle tenu (juge, régisseur, chorégraphe)', 4, '4 : rôle tenu avec sérieux et justesse · 2 : partiel · 0 : absent']],
   e: [['jacques', 13, 'Mené par un élève (le chef d\'échauffement) ; puis chaque groupe ajoute 3 min de gainage et de poignets.']],
   c: [['Le spectacle', 40, 'Jury élève et prof, régie par les élèves.', '', '', 'acro:acrosport:quatuor', 'g4']],
   r: [['mercis', 6]]}
]}
}});

/* ===== Schémas de chaque jeu (gymnase avec tapis ; les figures sont dessinées de profil : porteur bleu, voltigeur orange, pareur gris en pointillés) ===== */
(window.PSCH_SC = window.PSCH_SC || {}).acro = (() => {
  const EQ = ['#1f63d6', '#e8590c', '#16a34a', '#8a3ffc'];
  // figures montées (x = milieu, y = sol)
  const FIG = {
    banc: (g, x, y, k = 1) => g.fig(x - 6 * k, y, 'table', {s: k}).fig(x - 2 * k, y - 18 * k, 'bras', {t: 'b', s: k}),
    avion: (g, x, y, k = 1) => g.fig(x - 6 * k, y, 'jambes', {s: k}).fig(x - 4 * k, y - 33 * k, 'allonge', {t: 'b', s: k}),
    chaise: (g, x, y, k = 1) => g.fig(x - 4 * k, y, 'genou', {s: k}).fig(x - 18 * k, y, 'planche', {t: 'b', r: 1, s: .9 * k}),
    trio: (g, x, y, k = 1) => g.fig(x - 28 * k, y, 'table', {s: k}).fig(x + 26 * k, y, 'table', {s: k}).fig(x, y - 18 * k, 'bras', {t: 'b', s: k}),
    quatuor: (g, x, y, k = 1) => g.fig(x - 50 * k, y, 'table', {s: k}).fig(x, y, 'table', {s: k}).fig(x + 50 * k, y, 'table', {s: k}).fig(x - 6 * k, y - 18 * k, 'bras', {t: 'b', s: k}),
    pyramide: (g, x, y, k = 1) => g.fig(x - 54 * k, y, 'table', {s: k}).fig(x, y, 'table', {s: k}).fig(x + 54 * k, y, 'table', {s: k}).fig(x - 28 * k, y - 18 * k, 'table', {t: 'b', s: k}).fig(x + 26 * k, y - 18 * k, 'table', {t: 'b', s: k}).fig(x - 2 * k, y - 36 * k, 'bras', {t: 'b', s: k})
  };
  const pareur = (g, x, y, r) => g.fig(x, y, 'pareur', {t: 'p', r});
  // plusieurs groupes de profil sur les tapis
  const groupes = (g, L, o = {}) => { const y = o.y || 205, s = o.s || (L.length > 1 ? 1.3 : 1.6); g.sol(y); L.forEach(([k, x]) => { FIG[k](g, x, y, s); if (o.pareur !== false) g.fig(x + (k === 'quatuor' || k === 'pyramide' ? 80 : 46) * s, y, 'pareur', {t: 'p', r: 1, s}); }); return g; };
  const tapis = g => { g.hall(); g.mat(30, 40, 340, 170, {seams: 4}); return g; };
  const quatreTop = (g, fn) => { tapis(g); [[115, 85], [285, 85], [115, 165], [285, 165]].forEach(([x, y], i) => { g.ring('a', 3, x, y, 26, 20, {c: EQ[i]}); if (fn) fn(x, y, i); }); return g; };
  const calme = (g, T) => { g.hall(); g.ring('a', 8, 200, 140, 125, 70); g.sheet(200, 140); T.forEach((t, i) => g.tag(200, 28 + i * 22, t, {s: 9.5})); return g; };
  const leg = g => g.label(268, 20, 'porteur', {s: 9.5, b: 1, a: 'end', c: EQ[0]}).label(322, 20, 'voltigeur', {s: 9.5, b: 1, a: 'end', c: EQ[1]}).label(388, 20, 'pareur', {s: 9.5, b: 1, a: 'end', c: '#7b8480'});
  const jury = g => g.row('g', 3, 160, 238, 240, 238).sheet(262, 238);
  return {
    statues: g => { tapis(g); g.scatter('a', 8, 50, 55, 350, 195, {seed: 3}); g.X(200, 120).run(212, 120, 240, 100, 0); g.sol; return g.tag(200, 26, 'touché : figé en planche', {s: 9.5}).n(1, 'un touché se fige en planche (face ou côté)').n(2, 'délivré quand un camarade passe sous lui (face) ou l\'enjambe (côté) ; le chat change toutes les minutes'); },
    miroir: g => { g.sol(205); [[70, 'avion'], [200, 'planchec'], [320, 'bras']].forEach(([x, p]) => g.fig(x - 24, 205, p, {}).fig(x + 24, 205, p, {t: 'b', r: 1})); return g.tag(200, 40, 'on tient ensemble 3 s : « 1 - 2 - 3 »', {s: 9.5}).n(1, 'face à face : l\'un fait des positions d\'équilibre, l\'autre copie en même temps').n(2, 'le meneur change au signal'); },
    crepe: g => { g.sol(205); g.fig(110, 205, 'allonge', {lab: 'gainé !'}).fig(80, 205, 'pareur', {t: 'b'}).fig(150, 205, 'pareur', {t: 'b', r: 1}).rot(100, 170, 130, 170, -14);
      g.fig(280, 205, 'allonge').fig(240, 205, 'pareur', {t: 'b'}).raw('<path d="M255 195L262 182" stroke="#2d3530" stroke-width="2"/>', 'top').label(290, 175, 'soulevé de 10 cm par les chevilles', {s: 9});
      return g.n(1, 'allongé et gainé comme une planche : les deux autres le retournent (dos → ventre) sans qu\'il plie').n(2, 'puis on le soulève par les chevilles : tout le corps suit'); },
    'Les zones solides': g => { g.sol(205); g.fig(200, 205, 'table', {s: 2.2}); g.tag(150, 130, '✅ épaules', {s: 9}).tag(205, 100, '❌ dos creux', {s: 9}).tag(265, 130, '✅ bassin', {s: 9}).tag(330, 175, '✅ cuisses (près de la hanche)', {s: 8.5}).tag(95, 175, '❌ nuque', {s: 9});
      return g.n(1, 'on n\'appuie que sur les zones solides : épaules, bassin, cuisses près de la hanche').n(2, 'jeu : le prof touche une zone, les groupes crient « solide ! » ou « interdit ! »'); },
    appuis: g => { g.sol(205); g.fig(80, 205, 'table').fig(120, 205, 'avion', {t: 'b'}).fig(160, 205, 'debout');
      return g.tag(120, 120, '« 3 joueurs, 5 appuis ! »', {s: 10}).tag(300, 120, '« 4 joueurs, 6 appuis ! »', {s: 10}).fig(260, 205, 'planche').fig(310, 205, 'genou', {t: 'b'}).fig(350, 205, 'debout').n(1, 'chaque groupe tient 3 s en ne touchant le sol qu\'avec le nombre d\'appuis annoncé').n(2, 'le groupe le plus rapide gagne le point'); },
    transport: g => { g.sol(205); g.fig(150, 168, 'allonge', {}).fig(120, 205, 'pareur', {t: 'b'}).fig(160, 205, 'pareur', {t: 'b'}).fig(200, 205, 'pareur', {t: 'b', r: 1}).arrow('run', 230, 150, 330, 150, 0).label(280, 140, '5 m', {s: 10, b: 1});
      return g.n(1, 'par 4 : le « meuble » gainé est porté aux épaules, au bassin et aux chevilles, puis reposé doucement').n(2, 'si le meuble plie, on recommence'); },
    massage: g => { g.sol(205); [[90], [260]].forEach(([x]) => g.fig(x, 205, 'allonge').fig(x + 10, 205, 'genou', {t: 'b', r: 1})); return g.tag(200, 100, '🍕 étaler la pâte · la sauce · les ingrédients', {s: 9.5}).n(1, 'gestes doux sur le dos du partenaire ; on change').n(2, 'puis étirements des poignets et des épaules'); },
    cartes: g => { groupes(g, [['banc', 80], ['avion', 240]]); g.raw('<rect x="320" y="40" width="50" height="66" rx="4" fill="#fff" stroke="#2d3530" stroke-width="1.5"/>', 'mid').label(345, 66, 'B', {s: 18, b: 1, c: '#e8590c'}).label(345, 96, '2 pts', {s: 9});
      return leg(g).n(1, 'on pioche une carte-figure : montage, tenue 3 s, démontage, avec un pareur').n(2, 'le prof valide : le groupe garde la carte ; le plus de points gagne'); },
    photo: g => { groupes(g, [['trio', 150]]); g.raw('<rect x="290" y="40" width="80" height="60" rx="3" fill="#fff" stroke="#2d3530" stroke-width="1.5"/>', 'mid').label(330, 75, '🖼 photo', {s: 11}).label(330, 115, 'montrée 10 s, puis cachée', {s: 9});
      return leg(g).n(1, 'on reproduit la figure de mémoire ; au « clic ! », on se fige 3 s'); },
    musee: g => { groupes(g, [['banc', 70], ['trio', 250]]); g.A(150, 60).A(180, 60).label(165, 40, 'visiteurs', {s: 9, b: 1}).tag(330, 50, '⭐⭐⭐', {s: 10});
      return leg(g).n(1, 'les statues tiennent leur figure ; les visiteurs donnent 1 à 3 étoiles (tenue, sécurité)').n(2, 'une statue qui bouge « fond » et remonte'); },
    bilan: g => { g.sol(205); [40, 85, 130, 175, 220, 265, 310, 355].forEach((x, i) => g.fig(x, 205, i % 2 ? 'genou' : 'assis', {t: i % 3 ? 'a' : 'b'})); return g.tag(200, 110, '📸 la photo de classe : toute la classe en une figure basse', {s: 9.5}).n(1, 'étirements du dos, des épaules, des poignets ; chacun dit sa figure préférée et un pareur sérieux'); },
    'Le parcours gymnique': g => { g.sol(205, 20, 380); [['roulade avant', 60, 'accroupi'], ['saut extension', 130, 'bras'], ['demi-tour sauté', 200, 'bras'], ['roulade arrière', 270, 'accroupi'], ['chandelle', 340, 'chandelle']].forEach(([t, x, p], i) => g.fig(x, 205, p).num(x, 140, i + 1).label(x, 125, t, {s: 8.5, b: 1}));
      return g.arrow('run', 40, 225, 360, 225, 0).n(1, 'on passe par 3 et on se donne des conseils'); },
    liaisons: g => { g.sol(205); FIG.banc(g, 80, 205, 1.4); g.arrow('run', 125, 150, 225, 150, -30).label(170, 130, 'liaison : roulade, saut, tour…', {s: 9.5, b: 1}); FIG.avion(g, 290, 205, 1.4); return leg(g).n(1, 'figure 1 → liaison → figure 2 sans s\'arrêter').n(2, 'le groupe le plus fluide gagne'); },
    bingo: g => { g.hall(); for (let i = 0; i < 9; i++){ const x = 120 + (i % 3) * 55, y = 50 + Math.floor(i / 3) * 55; g.raw(`<rect x="${x - 25}" y="${y - 25}" width="50" height="50" fill="#fff" stroke="#2d3530" stroke-width="1.5"/>`, 'mid').label(x, y + 4, ['duo', 'trio', 'quatuor'][Math.floor(i / 3)], {s: 9}); }
      [0, 4, 8].forEach(i => g.label(120 + (i % 3) * 55, 50 + Math.floor(i / 3) * 55 - 10, '✔', {s: 16, b: 1, c: '#16a34a'})); g.raw('<path d="M100 30L250 180" stroke="#16a34a" stroke-width="3"/>', 'top').tag(320, 105, 'BINGO !', {s: 12});
      return g.n(1, 'une figure validée = une case cochée ; une ligne = bingo !').n(2, 'on montre ses 3 figures au prof'); },
    machine: g => { g.sol(205); g.fig(90, 205, 'bras').fig(130, 205, 'table', {t: 'b'}).fig(185, 205, 'avion').fig(230, 205, 'planchec', {t: 'b'}).fig(290, 205, 'genou'); g.tag(110, 80, '« tchic ! »', {s: 9}).tag(200, 70, '« bzzz ! »', {s: 9}).tag(290, 90, '« pouf ! »', {s: 9});
      return g.n(1, 'chacun entre à son tour, s\'accroche avec un appui et répète un mouvement (et un bruit)').n(2, 'au signal, la machine tombe en panne'); },
    'Le plan de l\'enchaînement': g => quatreTop(g, (x, y) => g.sheet(x, y)).tag(200, 126, '2 duos · 2 trios · liaisons · début · fin', {s: 9}).n(1, 'chaque groupe choisit ses figures et dessine son plan'),
    'Répétition en musique': g => { groupes(g, [['trio', 110], ['quatuor', 270]]); g.music(30, 40); return leg(g).n(1, 'on répète sur la musique ; un élève compte les 3 s de tenue').n(2, 'on corrige le point faible donné par le juge'); },
    juge: g => { groupes(g, [['quatuor', 160]]); jury(g); g.tag(320, 60, '🔍 critère mystère', {s: 9.5}); return leg(g).n(1, 'un groupe présente, un autre juge : sécurité, tenue 3 s, gainage').n(2, 'chaque juge a aussi un critère mystère dévoilé à la fin'); },
    'Dernière répétition': g => groupes(g, [['trio', 110], ['quatuor', 270]]).n(1, 'chaque groupe répète une fois'),
    'Le spectacle': g => { groupes(g, [['quatuor', 160]], {y: 190}); g.row('g', 7, 80, 238, 320, 238); return leg(g).n(1, 'chaque groupe présente ; un autre groupe juge avec la fiche'); },
    'Le quiz de sécurité': g => { g.sol(205); g.fig(150, 205, 'table').fig(150, 187, 'bras', {t: 'b'}).label(150, 120, '❓', {s: 22}).tag(290, 110, 'appui sur le dos creux ? pareur ? saut ?', {s: 9}); return g.n(1, 'le prof monte une figure avec une erreur : le premier groupe qui la trouve gagne 1 point'); },
    'L\'horloge de l\'ATR': g => { g.sol(205); g.wall(372, 20, 18, 185).fig(352, 205, 'atr').fig(110, 205, 'atr').fig(85, 205, 'pareur', {t: 'p'}).fig(135, 205, 'pareur', {t: 'p', r: 1});
      return g.tag(230, 80, '« 1 heure, 2 heures… »', {s: 10}).n(1, 'monter à l\'ATR contre le mur ou avec deux pareurs aux cuisses').n(2, 'on compte les secondes : record du groupe'); },
    'La roue dans le couloir': g => { tapis(g); g.disc(60, 100).disc(340, 100).disc(60, 150).disc(340, 150); g.raw('<path d="M60 100H340M60 150H340" stroke="#2d3530" stroke-width="1.5" stroke-dasharray="5 4"/>', 'mid');
      [100, 160, 220, 280].forEach((x, i) => g.raw(`<rect x="${x - 6}" y="${118}" width="12" height="14" rx="3" fill="${i % 2 ? '#e8590c' : '#1f63d6'}"/>`, 'top')); g.A(40, 125).arrow('run', 52, 125, 330, 125, 0);
      return g.label(200, 175, 'mains puis pieds sur une même ligne', {s: 9.5, b: 1}).n(1, 'on fait la roue sans sortir du couloir, puis une roue enchaînée avec une figure'); },
    pyramide: g => { g.sol(205); FIG.pyramide(g, 200, 205, 1.5); g.fig(70, 205, 'pareur', {t: 'p', s: 1.5}).fig(330, 205, 'pareur', {t: 'p', r: 1, s: 1.5}); return leg(g).tag(200, 50, 'monter dans l\'ordre · tenir 3 s · démonter à l\'envers', {s: 9}).n(1, 'deux groupes s\'associent pour une pyramide à 6 ou plus, avec pareurs').n(2, 'on monte dans l\'ordre, on tient 3 s, on démonte dans l\'ordre inverse'); },
    'Les dés de la composition': g => quatreTop(g, (x, y) => g.raw(`<rect x="${x - 10}" y="${y - 10}" width="20" height="20" rx="3" fill="#fff" stroke="#2d3530" stroke-width="1.6"/><circle cx="${x - 4}" cy="${y - 4}" r="1.8"/><circle cx="${x + 4}" cy="${y + 4}" r="1.8"/>`, 'top')).n(1, '3 dés : nombre de figures, liaisons imposées, une contrainte (au sol, canon, figure en mouvement)'),
    'La bourse aux figures': g => { groupes(g, [['chaise', 70], ['trio', 210]]); return leg(g).tag(320, 60, 'A = 1 · B = 2 · C = 3 points', {s: 9.5}).n(1, '10 min pour « acheter » le plus de points ; une figure ratée coûte 1 point'); },
    'L\'atterrissage': g => { g.sol(205); g.fig(110, 205, 'table').fig(112, 187, 'debout', {t: 'b'}).arrow('run', 125, 150, 190, 180, -20).fig(210, 205, 'accroupi', {t: 'b'}).fig(240, 205, 'pareur', {t: 'p', r: 1}).fig(180, 205, 'pareur', {t: 'p'});
      return g.tag(300, 80, 'note de l\'atterrissage : 1 à 3', {s: 9}).n(1, 'saut pieds joints, réception genoux souples, bras devant, et on se fige').n(2, 'les pareurs tiennent les bras'); },
    'La feuille de route': g => calme(g, ['figures (A-B-C) · liaisons · éléments individuels', '2 de force · 2 de souplesse · 1 tenue 5 s']),
    'Le jury de la compétition': g => { groupes(g, [['quatuor', 160]], {y: 190}); g.row('g', 3, 160, 238, 240, 238).label(130, 242, 'difficulté', {s: 8.5, a: 'end'}).label(270, 242, 'exécution × 2', {s: 8.5, a: 'start'}); return g.n(1, 'un juge de difficulté, deux juges d\'exécution ; on compare leurs notes'); },
    'La compétition': g => { groupes(g, [['quatuor', 160]], {y: 190}); jury(g); g.P(330, 238); return leg(g).n(1, 'jury élève et prof'); },
    'Le musée des émotions': g => { groupes(g, [['banc', 90], ['trio', 260]]); g.tag(90, 70, '😨 peur ?', {s: 10}).tag(260, 70, '😄 joie ?', {s: 10}); return g.n(1, 'chaque groupe montre une émotion avec sa figure (regard, bras, tête) ; les autres devinent'); },
    'Le chapeau des thèmes': g => quatreTop(g, (x, y) => g.label(x, y + 4, '🎩', {s: 16})).n(1, 'on tire 3 thèmes, on en garde un, on trouve 3 figures qui le racontent').n(2, 'on montre en 1 min : les autres devinent le thème'),
    'Le story-board': g => { g.hall(); ['début', 'moment fort 1', 'moment fort 2', 'fin'].forEach((t, i) => g.raw(`<rect x="${20 + i * 92}" y="60" width="84" height="110" fill="#fff" stroke="#2d3530" stroke-width="1.5"/>`, 'mid').label(62 + i * 92, 185, t, {s: 9.5, b: 1}).fig(62 + i * 92, 150, ['debout', 'table', 'bras', 'genou'][i], {s: .9})); return g.n(1, 'l\'histoire en 4 cases : chaque case = une figure'); },
    'Le plan de scène': g => { g.stage(); g.ring('a', 4, 90, 150, 20, 14).path('run', [[110, 140], [200, 80], [300, 130]]).label(90, 185, 'début', {s: 9, b: 1}).label(310, 155, 'fin', {s: 9, b: 1}); return g.n(1, 'où commence-t-on, où va-t-on, où est le public ?'); },
    'Le groupe-miroir': g => { groupes(g, [['quatuor', 160]], {y: 190}); g.row('a', 4, 120, 238, 240, 238); return g.tag(320, 50, '⭐⭐ deux étoiles · 🙏 un vœu', {s: 9}).n(1, 'deux groupes se regardent et se donnent 2 étoiles et 1 vœu'); },
    'Les 4 tests': g => { g.sol(205); [['gainage face', 60, 'planche'], ['pompes 30 s', 160, 'planche'], ['souplesse assis', 250, 'assis'], ['chaise au mur', 340, 'accroupi']].forEach(([t, x, p], i) => g.fig(x, 205, p).num(x, 130, i + 1).label(x, 115, t, {s: 9, b: 1}));
      return g.wall(372, 140, 16, 65).n(1, 'par deux, on note : temps, nombre, centimètres, temps'); },
    'Mon contrat': g => calme(g, ['🎯 un objectif chiffré par test']),
    'Le chrono des statues': g => { groupes(g, [['trio', 160]]); g.chrono(320, 60).label(320, 85, 'record de la classe', {s: 9, b: 1}); return leg(g).n(1, 'chaque groupe tient sa figure le plus longtemps possible, la sécurité d\'abord'); },
    'Le circuit gainé': g => { g.sol(205); [['planche face', 50, 'planche'], ['planche côté', 130, 'planchec'], ['chaise', 210, 'accroupi'], ['superman', 280, 'allonge'], ['planche à deux', 355, 'planche']].forEach(([t, x, p], i) => g.fig(x, 205, p).num(x, 130, i + 1).label(x, 115, t, {s: 8.5, b: 1}));
      return g.n(1, '40 s par atelier ; à deux : on se tape dans les mains en planche'); },
    'L\'escalier de la souplesse': g => { g.sol(205); [['pince', 60, 'assis'], ['papillon', 140, 'assis'], ['fente', 220, 'genou'], ['pont', 320, 'jambes']].forEach(([t, x, p], i) => g.fig(x, 205, p).num(x, 205 - 60 - i * 15, i + 1).label(x, 190 - 60 - i * 15 - 10, t, {s: 9, b: 1}));
      return g.n(1, 'postures tenues 30 s, de plus en plus difficiles ; chacun s\'arrête à sa marche'); },
    'Les rôles du numéro': g => calme(g, ['chorégraphe · sécurité · régisseur · costumier']),
    echequipe: g => quatreTop(g, (x, y) => g.J(x, y, 'M')).n(1, 'chaque groupe mène son échauffement : gainage, appuis'),
    coach: g => quatreTop(g, (x, y) => g.sheet(x, y)).n(1, 'chaque groupe choisit un jeu du cycle pour son point faible'),
    'La générale': g => { groupes(g, [['quatuor', 160]], {y: 190}); jury(g); g.music(40, 40).A(40, 80, 'R'); return g.n(1, 'ordre de passage, entrées, musique par le régisseur, jury en place : comme le jour J'); },
    aimants: g => { g.sol(205); g.fig(70, 205, 'debout', {r: 1}).fig(84, 205, 'debout', {t: 'b'}).tag(77, 140, '« dos-dos ! »', {s: 9.5});
      g.fig(185, 205, 'genou').fig(215, 205, 'pareur', {t: 'b', r: 1}).tag(200, 140, '« main-genou ! »', {s: 9.5});
      g.fig(300, 205, 'debout').fig(322, 205, 'debout', {t: 'b', r: 1}).fig(344, 205, 'debout', {c: '#16a34a', r: 1}).tag(322, 140, '« par 3 ! »', {s: 9.5});
      return g.tag(200, 40, 'on se déplace, puis on se colle le plus vite possible et on tient 3 s gainé', {s: 9}).n(1, 'le prof annonce deux parties du corps : on se colle à un camarade par celles-ci'); },
    duelplanche: g => { g.sol(205); [[60, 0], [230, 1]].forEach(([x, i]) => { g.fig(x + 30, 205, 'planche').fig(x + 108, 205, 'planchec', {t: 'b', r: 1}); });
      g.arrow('run', 160, 160, 128, 182, 0).tag(110, 120, 'je touche sa main', {s: 9}).tag(290, 120, 'il esquive sans poser le genou', {s: 9});
      return g.tag(200, 40, '1 point par touche · manches de 30 s · on change de partenaire', {s: 9}).n(1, 'en planche face à face : toucher la main de l\'autre, qui esquive').n(2, 'puis en planche de côté, pied contre pied'); },
    feux: g => { g.hall(); g.scatter('a', 9, 50, 50, 350, 175, {seed: 7}); g.P(200, 30);
      [['#16a34a', 'cours'], ['#f59f00', 'sur un pied'], ['#dc2626', 'planche'], ['#1f63d6', 'table'], ['#8a3ffc', 'assis dessus']].forEach(([c, t], i) => g.raw(`<circle cx="${30 + i * 76}" cy="226" r="6" fill="${c}"/>`, 'top').label(40 + i * 76, 230, t, {s: 8.5, a: 'start'}));
      return g.n(1, 'le prof montre une couleur : chacun prend la position, le dernier fait 3 sauts'); },
    ombre: g => { tapis(g); g.A(70, 90).B(45, 90).label(70, 72, 'chef', {s: 9, b: 1}).label(45, 110, 'ombre', {s: 9, b: 1}).path('run', [[82, 90], [160, 70], [240, 95], [330, 80]]); g.A(330, 165).B(355, 165).label(330, 147, 'chef', {s: 9, b: 1}).label(355, 185, 'ombre', {s: 9, b: 1}).path('run', [[318, 165], [240, 185], [160, 160], [70, 175]]);
      return g.tag(200, 128, 'roulade · saut · demi-tour · quadrupédie · équilibre', {s: 9}).n(1, 'l\'ombre fait la même chose que le chef, au même moment').n(2, 'on change de chef toutes les minutes'); },
    zoo: g => { tapis(g); g.scatter('a', 9, 50, 55, 350, 195, {seed: 11}); g.X(160, 120).run(172, 118, 205, 100, 0).X(280, 160);
      return g.tag(200, 28, '🐻 ours · 🦀 crabe · 🦭 phoque · 🐸 grenouille · 🦘 kangourou', {s: 9.5}).n(1, 'on se déplace comme l\'animal annoncé ; touché = on fait la table').n(2, 'délivré quand un camarade passe sous la table ; nouvel animal toutes les 45 s'); },
    chaise: g => { g.sol(205); g.fig(78, 205, 'assis', {r: 1}).fig(92, 205, 'assis', {t: 'b'}).arrow('run', 85, 150, 85, 110, 0).fig(160, 205, 'debout', {r: 1}).fig(174, 205, 'debout', {t: 'b'}).label(130, 95, 'à 2', {s: 10, b: 1});
      [260, 285, 310, 335].forEach((x, i) => g.fig(x, 205, 'assis', {r: i % 2 === 0, t: i % 2 ? 'b' : 'a'})); g.label(298, 95, 'à 3, à 4, à 6…', {s: 10, b: 1});
      return g.n(1, 'dos à dos, bras croisés : on s\'assoit et on se relève ensemble sans poser les mains').n(2, 'réussi ? on ajoute un joueur'); },
    cigognes: g => { g.sol(205); [[110], [280]].forEach(([x]) => g.fig(x - 14, 205, 'pareur').fig(x + 14, 205, 'pareur', {t: 'b', r: 1}));
      return g.tag(200, 70, 'sur un pied, paumes contre paumes : on pousse seulement par les mains', {s: 9}).n(1, 'faire poser le pied de l\'autre = 1 point').n(2, 'on change de pied et de partenaire ; puis accroupi (« la poule »)'); },
    jacques: g => { g.sol(205); g.P(40, 120).tag(150, 60, '« Jacques a dit : planche ! »', {s: 10});
      [[110, 'planche'], [180, 'planche'], [250, 'planche']].forEach(([x, p]) => g.fig(x, 205, p)); g.fig(330, 205, 'debout', {t: 'b'}).label(330, 150, 'gage : 5 s de planche', {s: 9});
      return g.n(1, 'sans « Jacques a dit », on ne bouge pas ; celui qui bouge fait un gage et reste dans le jeu').n(2, 'positions : planche, chandelle, avion, table, statue à deux'); },
    ponts: g => { g.sol(205); g.fig(90, 205, 'table').fig(200, 205, 'planche').fig(310, 205, 'jambes');
      g.fig(40, 205, 'accroupi', {t: 'b'}).raw('<path d="M55 200Q90 215 120 200Q200 218 240 200Q290 214 350 196" fill="none" stroke="#2d3530" stroke-width="2" marker-end="url(#ah)"/>', 'top');
      return g.tag(200, 90, 'on passe sous 6 ponts différents, on revient en enjambant les planches', {s: 9}).n(1, 'la moitié fait les ponts (table, planche, chandelle jambes écartées)').n(2, 'au sifflet on change de rôle ; chaque pont change de forme'); },
    stop: g => { g.sol(205); g.music(30, 50); FIG.banc(g, 110, 205, 1.2); FIG.chaise(g, 230, 205, 1.2); FIG.avion(g, 330, 205, 1.1);
      return leg(g).tag(200, 70, 'musique coupée : une figure à deux, tenue 3 s', {s: 9.5}).n(1, 'musique : on se déplace en dansant ; arrêt : figure à deux avec le plus proche').n(2, 'nouveau partenaire à chaque fois ; puis « à trois ! »'); },
    etirduo: g => { g.sol(205); g.fig(90, 205, 'assis', {r: 1}).fig(104, 205, 'assis', {t: 'b'}).label(97, 140, 'dos à dos, on respire', {s: 9});
      g.fig(250, 205, 'assis').fig(310, 205, 'assis', {t: 'b', r: 1}).raw('<path d="M258 193H302" stroke="#2d3530" stroke-width="2"/>', 'top').label(280, 140, 'on se tire doucement les mains', {s: 9});
      return g.n(1, 'étirements à deux : dos, épaules, poignets').n(2, 'chacun dit à son partenaire une chose qu\'il a bien faite'); },
    sculpteur: g => { g.sol(205); FIG.trio(g, 150, 205, 1.3); g.fig(260, 205, 'pareur', {c: '#16a34a', r: 1}).label(260, 140, 'le sculpteur', {s: 9, b: 1});
      g.raw('<rect x="320" y="40" width="60" height="46" rx="3" fill="#fff" stroke="#2d3530" stroke-width="1.5"/>', 'mid').label(350, 68, '🖼', {s: 16}).label(350, 100, 'photo chez le prof', {s: 8.5});
      return leg(g).tag(150, 90, 'yeux fermés, on se laisse placer', {s: 9}).n(1, 'le sculpteur a vu la photo : il place ses camarades sans parler et sans montrer').n(2, 'le groupe tient 3 s ; on compare avec la photo'); },
    echo: g => { g.sol(205); FIG.trio(g, 90, 205, 1.1); FIG.trio(g, 220, 205, 1.1); FIG.trio(g, 340, 205, 1.1); g.label(90, 228, 'le groupe qui propose', {s: 9, b: 1});
      g.arrow('run', 140, 120, 300, 120, -12).label(250, 98, 'tous les autres copient en 15 s', {s: 9});
      return leg(g).n(1, 'un groupe monte une figure ; tous les autres la reproduisent, avec pareur').n(2, 'figure copiée par toute la classe = 1 point pour la classe'); },
    escalier: g => { g.hall(); ['duo A', 'duo B', 'trio A', 'trio B', 'quatuor B', 'figure C'].forEach((t, i) => { const x = 30 + i * 58, y = 200 - i * 28; g.raw(`<rect x="${x}" y="${y}" width="58" height="${228 - y}" fill="${i % 2 ? '#e7edf3' : '#d9e3ec'}" stroke="#7b8b99" stroke-width="1.2"/>`, 'bg').label(x + 29, y + 16, t, {s: 9, b: 1}); });
      g.fig(118, 172, 'bras', {t: 'b'}).fig(146, 144, 'debout').label(250, 40, 'interdit de sauter une marche', {s: 9.5, b: 1});
      return g.n(1, 'une marche validée (tenue 3 s, démontage sans chute) = on monte d\'une marche').n(2, 'le groupe le plus haut à la fin gagne'); },
    monstre: g => { g.sol(205); g.fig(90, 205, 'table').fig(132, 205, 'planche', {t: 'b'}).fig(176, 205, 'genou', {c: '#16a34a'}).fig(205, 205, 'debout', {c: '#8a3ffc'}); g.arrow('run', 230, 160, 340, 160, 0).fig(370, 205, 'pareur', {t: 'p', r: 1});
      return g.tag(150, 70, '« 4 joueurs, 6 pattes ! »', {s: 10.5}).n(1, 'le monstre traverse le tapis accroché, avec seulement le nombre de pattes annoncé').n(2, 'un pareur suit le monstre ; puis 5, puis 4 pattes'); },
    alphabet: g => { g.hall(); g.mat(30, 40, 340, 170, {seams: 4}); const body = (x1, y1, x2, y2, c = '#1f63d6') => g.raw(`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="9" stroke-linecap="round"/><circle cx="${x1}" cy="${y1}" r="7" fill="${c}" stroke="#fff" stroke-width="1.5"/>`, 'top');
      body(70, 70, 70, 160); body(130, 70, 130, 160); body(80, 115, 122, 115, '#e8590c'); g.label(100, 190, 'H', {s: 16, b: 1});
      body(200, 70, 290, 70, '#16a34a'); body(245, 80, 245, 165, '#8a3ffc'); g.label(245, 190, 'T', {s: 16, b: 1});
      return g.tag(200, 26, 'le prof annonce une lettre : 15 s pour la former', {s: 9.5}).n(1, 'au sol ou debout ; puis un mot de 3 lettres avec deux groupes'); },
    surprise: g => { groupes(g, [['trio', 150]]); [['3', 290, 'joueurs'], ['⬆', 350, 'haute']].forEach(([t, x, l]) => g.raw(`<rect x="${x - 24}" y="40" width="48" height="62" rx="4" fill="#fff" stroke="#2d3530" stroke-width="1.5"/>`, 'mid').label(x, 76, t, {s: 20, b: 1, c: '#e8590c'}).label(x, 118, l, {s: 9}));
      return leg(g).n(1, 'deux cartes : un nombre de joueurs et une forme ; 30 s pour inventer la figure').n(2, 'le prof valide les figures sûres et tenues 3 s'); },
    relaisfig: g => quatreTop(g, (x, y, i) => { const cx = 200, cy = 125; g.arrow('run', x + (cx - x) * .25, y + (cy - y) * .25, cx + (x - cx) * .25, cy + (y - cy) * .25, 0); })
      .raw('<rect x="186" y="112" width="28" height="26" rx="3" fill="#fff" stroke="#2d3530" stroke-width="1.5"/>', 'top').label(200, 152, 'cartes', {s: 9, b: 1}).n(1, 'un élève court chercher une carte ; le groupe monte la figure et la fait valider').n(2, 'un autre élève rend la carte et en prend une nouvelle'),
    public: g => { groupes(g, [['quatuor', 160]], {y: 190}); g.row('g', 7, 80, 238, 320, 238); [['#16a34a', 110], ['#16a34a', 180], ['#f59f00', 250], ['#16a34a', 300]].forEach(([c, x]) => g.raw(`<rect x="${x - 7}" y="212" width="14" height="10" fill="${c}"/>`, 'top'));
      return leg(g).tag(200, 40, 'vert = tenue 3 s et sûre · orange = ça a bougé · rouge = danger', {s: 9}).n(1, 'à la fin de chaque figure, le public lève un carton').n(2, 'le groupe compte ses verts et choisit la figure à corriger'); },
    contraintes: g => { groupes(g, [['trio', 110], ['quatuor', 270]]); g.music(30, 50);
      return leg(g).tag(210, 105, '🎲 silence · ralenti · compter à voix haute · liaisons rapides · devant un groupe', {s: 8.5}).n(1, 'trois passages de suite, une contrainte tirée au sort à chaque fois').n(2, 'un élève note ce qui a bougé'); },
    troispassages: g => { groupes(g, [['quatuor', 160]]); g.music(30, 50); [['mémoire', 110], ['tenue 3 s', 210], ['musique', 310]].forEach(([t, x], i) => g.num(x - 30, 48, i + 1).label(x, 52, t, {s: 9.5, b: 1}));
      return leg(g).n(1, 'passage 1 : tout sans arrêt ; 2 : un observateur compte les 3 s ; 3 : on part et on finit avec la musique').n(2, 'entre deux passages, 1 min pour corriger une seule chose'); }
  };
})();
