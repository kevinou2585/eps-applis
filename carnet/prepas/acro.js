/* Acrosport : 6 leçons par année (1re → 6e secondaire). Sur tapis uniquement, chaussettes ou pieds nus, pas de bijoux.
   Règles d'or rappelées à chaque leçon : appuis sur les zones solides du porteur (épaules, bassin, cuisses près de la hanche) — jamais sur le dos creux ni la nuque ;
   le voltigeur monte et descend sans sauter ; chaque figure a un pareur ; on tient 3 secondes ; on démonte dans l'ordre inverse. */
PREPA_ADD({id: 'acro', sport: 'Acrosport', mat: 'Tapis de gymnastique (beaucoup), fiches de figures (duo, trio, quatuor), enceinte, plots, fiches de juge, tablette pour photographier les figures.', an: {
1: {th: 'Découvrir l\'acrosport : sécurité, porteur, voltigeur, pareur et figures à deux', comp: ['HME1', 'HME3', 'HSC2', 'GSS2'], l: [
  {t: 'Les règles de sécurité et le gainage', o: 'Connaître les zones d\'appui et être gainé (corps « planche ») pour porter et être porté.', comp: ['HME3', 'GSS2'], e: [
    ['Les règles d\'or', 4, 'Au tableau avec un élève modèle : zones d\'appui autorisées (épaules, bassin) et interdites (dos creux, nuque, ventre), rôles de porteur, voltigeur et pareur ; on ne saute jamais d\'un porteur.', 'explication'],
    ['Mobilisation et gainage', 6, 'Mobilisation des poignets, épaules, dos ; puis gainage ventral, dorsal et latéral, 20 s chacun : « le corps est une planche ».', 'libre']],
   c: [['La planche rigide', 10, 'Par 3 : un élève allongé raide comme une planche ; les deux autres le soulèvent par les chevilles puis par les épaules sans qu\'il plie. Puis debout : il se laisse tomber raide vers l\'avant et l\'arrière, rattrapé par les deux autres tout près.', 'Je reste gainé du début à la fin.', 'Réduire l\'amplitude de la chute.', 'acro:acrosport:trio'],
    ['Les positions du porteur', 8, 'Découvrir les 3 positions de base du porteur : à quatre pattes (table : dos plat, mains sous les épaules, genoux sous les hanches), à genoux dressés, debout jambes fléchies (chaise). Le prof vérifie le dos plat.', 'Mon dos reste plat en position de table.', '', 'acro:acrosport:duo'],
    ['Premières figures à deux', 12, 'Par deux sur tapis : 3 figures simples sur fiche (voltigeur à genoux sur la table, voltigeur debout sur les cuisses du porteur assis, équilibre en appui sur les mains du porteur). Montée et descente lentes, tenue 3 s.', 'Nous tenons chaque figure 3 secondes sans trembler.', 'Le pareur tient le voltigeur pendant toute la figure.', 'acro:acrosport:duo']],
   r: [['Retour au calme', 5, 'Étirements des poignets et du dos ; chaque élève redit une règle de sécurité.', 'etirements']]},
  {t: 'Figures à deux : monter, tenir, démonter', o: 'Réaliser 4 figures à deux en respectant montage, tenue 3 s et démontage.', comp: ['HME3', 'HSC2', 'GSS2'], e: [
    ['Mobilisation', 4, 'Mobilisation articulaire et gainage, 3 × 20 s.', 'libre'],
    ['Les positions du porteur', 6, 'Par deux : le porteur prend chacune des 3 positions de base, le partenaire vérifie (dos plat, bras tendus, appuis larges).', 'acro:acrosport:duo']],
   c: [['Atelier fiches duos', 18, 'Les duos choisissent 4 figures sur la fiche (2 statiques au sol, 2 avec voltigeur en hauteur). Pour chaque figure : montage, tenue 3 s en comptant à voix haute, démontage dans l\'ordre inverse. Le pareur est à côté.', 'Nous réalisons 4 figures en sécurité.', 'Ne garder que les figures au sol pour les duos qui hésitent.', 'acro:acrosport:duo'],
    ['Présentation photo', 12, 'Chaque duo montre ses 2 plus belles figures ; le prof (ou un élève) les photographie pour vérifier la position.', 'La photo montre un porteur au dos plat et un voltigeur gainé.', '', 'acro:acrosport:duo']],
   r: [['Retour au calme', 5, 'Étirements ; regarder les photos : qu\'est-ce qui rend une figure belle ?', 'etirements']]},
  {t: 'Les éléments de liaison', o: 'Relier les figures par des éléments gymniques simples (roulade, saut, tour, pas dansé).', comp: ['HME1', 'HME3', 'HME5'], e: [
    ['Roulades', 6, 'Sur tapis : roulade avant depuis la position accroupie (menton sur la poitrine, mains à plat), puis roulade arrière sur plan incliné pour ceux qui le peuvent.', 'libre'],
    ['Sauts', 4, 'Sauts groupés, demi-tours, sauts écart sur place, réception jambes fléchies.', 'libre']],
   c: [['Liaisons à deux', 12, 'Par deux : enchaîner « figure 1 - roulade - figure 2 - saut - figure 3 », en miroir ou à l\'unisson.', 'Nos liaisons sont faites en même temps.', 'Remplacer la roulade par un tour ou un pas.', 'acro:acrosport:duo'],
    ['Enchaînement court', 18, 'Chaque duo construit un enchaînement de 3 figures et 2 liaisons, avec une pose de départ et une pose finale. Répéter 3 fois.', 'Notre enchaînement est fluide et en sécurité.', '', 'acro:acrosport:duo']],
   r: [['Retour au calme', 5, 'Étirements du dos et des jambes.', 'etirements']]},
  {t: 'Figures à trois', o: 'Réaliser des figures à trois avec deux porteurs ou un porteur et deux voltigeurs.', comp: ['HME3', 'HSC2', 'GSS2'], e: [
    ['Mobilisation et gainage', 5, 'Mobilisation articulaire, gainage par deux (l\'un pousse doucement, l\'autre reste gainé).', 'libre'],
    ['Révision duos', 5, 'Chaque duo refait ses 2 meilleures figures.', 'acro:acrosport:duo']],
   c: [['Atelier fiches trios', 18, 'Par 3 : 3 figures sur la fiche trio (deux porteurs en table côte à côte et un voltigeur à genoux sur les deux, un porteur et deux voltigeurs symétriques…). Le 3e élève pare quand il n\'est pas dans la figure.', 'Nous réalisons 3 figures à trois en sécurité.', '', 'acro:acrosport:trio'],
    ['Inventer une figure', 12, 'Chaque trio invente une figure respectant les règles d\'or et la dessine ; le prof valide avant de la tenter.', 'Notre figure inventée respecte les zones d\'appui.', '', 'acro:acrosport:trio']],
   r: [['Retour au calme', 5, 'Étirements ; présentation de quelques figures inventées.', 'etirements']]},
  {t: 'Construire son enchaînement', o: 'Composer en groupe un enchaînement de 4 figures avec liaisons sur une musique.', comp: ['HME3', 'HME5', 'HSC2'], e: [
    ['Échauffement', 6, 'Mobilisation, gainage, roulades et sauts.', 'libre'],
    ['Cahier des charges', 4, 'Au tableau : 4 figures (dont 2 à trois), des liaisons, une pose de départ et une finale, en musique, chaque figure tenue 3 s.', 'explication']],
   c: [['Création', 22, 'Par 3 : composer et répéter l\'enchaînement avec la fiche de composition (dessin des figures dans l\'ordre).', 'Notre enchaînement respecte le cahier des charges.', 'Groupes à l\'aise : ajouter une figure à quatre avec un autre groupe.', 'acro:acrosport:trio'],
    ['Regard extérieur', 8, 'Chaque groupe montre à un autre groupe qui vérifie la tenue de 3 s et la sécurité.', 'Nous tenons compte des remarques.', '', 'acro:acrosport:trio']],
   r: [['Retour au calme', 5, 'Étirements ; noter l\'enchaînement sur la fiche.', 'etirements']]},
  {t: 'Évaluation : présentation des enchaînements', o: 'Présenter son enchaînement en sécurité, gainé et synchronisé.', comp: ['HME1', 'HME3', 'HSC2', 'GSS2'], crit: [['Sécurité (zones d\'appui, parade)', 6, '6 : appuis sur épaules, bassin, cuisses uniquement, parade présente · 4 : un oubli · 2 : plusieurs oublis · 0 : dangereux'], ['Figures tenues 3 s', 5, '5 : toutes les figures tenues 3 s · 3 : la plupart · 1 : peu'], ['Gainage', 4, '4 : corps gainé, aucune cambrure · 2 : gainage irrégulier · 0 : relâché'], ['Liaisons et synchronisation', 3, '3 : liaisons fluides, groupe ensemble · 1 : arrêts entre les figures · 0 : désorganisé'], ['Rôle de juge spectateur', 2, '2 : remplit sa fiche de juge avec attention · 1 : incomplète · 0 : dérange']], e: [
    ['Échauffement en autonomie', 5, 'Chaque groupe s\'échauffe (mobilisation, gainage, roulades).', 'libre'],
    ['Dernière répétition', 5, 'Une répétition complète par groupe.', 'acro:acrosport:trio']],
   c: [['Présentations', 25, 'Chaque groupe présente deux fois en musique. Grille : sécurité (zones d\'appui, parade), tenue 3 s, gainage, liaisons, synchronisation. Les spectateurs jouent les juges sur une fiche simple.', 'Toutes nos figures sont tenues 3 s en sécurité.', '', 'acro:acrosport:trio'],
    ['Figure collective', 5, 'Toute la classe construit une grande figure (vagues de porteurs en table, voltigeurs à genoux).', '', '', 'acro:acrosport:pyramide']],
   r: [['Bilan', 5, 'Auto-évaluation : rôle préféré, ce qui était difficile.', 'explication']]}
]},
2: {th: 'Trios et quatuors : figures plus hautes, liaisons gymniques, composition', comp: ['HME1', 'HME3', 'HSC2', 'GSS2'], l: [
  {t: 'Révision et figures à trois', o: 'Réviser les règles et réaliser des figures à trois plus difficiles.', comp: ['HME3', 'GSS2'], e: [
    ['Les règles d\'or', 4, 'Rappel par les élèves des zones d\'appui et des rôles.', 'explication'],
    ['Gainage', 6, 'Circuit gainage : planche, planche latérale, chaise contre le mur, 30 s chacun.', 'libre']],
   c: [['Trios niveau 1', 14, 'Fiche trios : 4 figures avec un voltigeur en hauteur (genoux, debout sur cuisses). Tenue 3 s, parade.', 'Nous réussissons 3 figures sur 4.', '', 'acro:acrosport:trio'],
    ['Trios niveau 2', 16, 'Les trios qui ont réussi passent au niveau 2 (voltigeur debout sur deux porteurs en table, appui renversé tenu).', 'Nous réussissons une figure du niveau 2.', 'Rester au niveau 1 en améliorant la tenue.', 'acro:acrosport:trio']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'L\'appui renversé et la roue', o: 'Réaliser un appui tendu renversé (ATR) contre un mur ou avec parade, et une roue.', comp: ['HME1', 'HME3', 'GSS2'], e: [
    ['Mobilisation des poignets', 4, 'Poignets, épaules ; appui sur les mains en marchant à quatre pattes.', 'libre'],
    ['Montées de jambes', 6, 'Appui sur les mains, jambes qui montent alternativement (« ruade »).', 'libre']],
   c: [['ATR', 15, 'Par 3 : ATR contre le mur (ventre face au mur ou dos au mur), puis avec deux pareurs qui tiennent les cuisses. Corps aligné.', 'Je tiens l\'ATR 3 secondes avec parade.', 'Appui renversé jambes fléchies (chandelle) pour les élèves en difficulté.', 'acro:acrosport:trio'],
    ['La roue', 15, 'Roue le long d\'une ligne, mains l\'une après l\'autre, jambes tendues ; d\'abord en passant par-dessus un tapis plié.', 'Ma roue passe par la ligne.', '', 'libre']],
   r: [['Retour au calme', 5, 'Étirements des poignets et des épaules.', 'etirements']]},
  {t: 'Les figures à quatre', o: 'Réaliser des figures à quatre (pyramides simples).', comp: ['HME3', 'HSC2', 'GSS2'], e: [
    ['Mobilisation et gainage', 5, 'Mobilisation articulaire, gainage 3 × 20 s, roulades avant sur tapis.', 'libre'],
    ['Révision trios', 5, 'Chaque trio refait 2 figures.', 'acro:acrosport:trio']],
   c: [['Quatuors', 20, 'Par 4 : 3 figures sur la fiche quatuor (deux porteurs en table, un troisième à genoux au-dessus, un voltigeur…). Montage par étages, démontage du haut vers le bas.', 'Nous réalisons 2 figures à quatre en sécurité.', '', 'acro:acrosport:quatuor'],
    ['Pyramide inventée', 10, 'Chaque quatuor invente une pyramide, la fait valider puis la réalise.', 'Notre pyramide est stable.', '', 'acro:acrosport:pyramide']],
   r: [['Retour au calme', 5, 'Étirements ; photo des pyramides.', 'etirements']]},
  {t: 'Composer avec des contraintes', o: 'Composer un enchaînement à 4 avec figures, liaisons, changements de formation.', comp: ['HME3', 'HME5', 'HSC2'], e: [
    ['Échauffement', 6, 'Mobilisation, gainage 3 × 20 s, roulades avant et arrière, roues le long d\'une ligne.', 'libre'],
    ['Cahier des charges', 4, '5 figures (2 duos simultanés, 1 trio + 1 soliste, 2 quatuors), 1 ATR ou 1 roue, des liaisons dansées, musique, 1 min 30.', 'explication']],
   c: [['Création', 25, 'Par 4 : composer l\'enchaînement avec la fiche ; répéter.', 'Notre enchaînement respecte le cahier des charges.', '', 'acro:acrosport:quatuor'],
    ['Montrer', 5, 'Chaque groupe présente son enchaînement à un autre groupe, qui vérifie avec la liste du cahier des charges et signale ce qui manque.', 'Il ne manque aucun élément du cahier des charges.', '', 'acro:acrosport:quatuor']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Répéter et juger', o: 'Améliorer son enchaînement et apprendre à juger (exécution, sécurité).', comp: ['HSC1', 'HSC2'], e: [
    ['Échauffement en autonomie', 6, 'Chaque groupe s\'échauffe.', 'libre'],
    ['La fiche de juge', 4, 'Explication : figure tenue 3 s ? gainage ? chute ou aide ? synchronisation ?', 'explication']],
   c: [['Répétition', 15, 'Chaque groupe répète partie par partie (montage, tenue 3 s, démontage), puis l\'enchaînement entier en musique 2 fois.', 'Nous enchaînons sans hésiter sur l\'ordre des figures.', '', 'acro:acrosport:quatuor'],
    ['Jugement croisé', 15, 'Chaque groupe passe devant un autre groupe qui le juge avec la fiche ; on inverse.', 'Notre jugement est juste et argumenté.', '', 'acro:acrosport:quatuor']],
   r: [['Retour au calme', 5, 'Étirements ; chaque groupe corrige un point.', 'etirements']]},
  {t: 'Évaluation : enchaînement à quatre', o: 'Présenter un enchaînement à quatre et juger un autre groupe.', comp: ['HME1', 'HME3', 'HSC1', 'HSC2', 'GSS2'], crit: [['Sécurité', 6, '6 : aucune chute, parade et montée/descente correctes · 4 : un déséquilibre · 2 : une chute · 0 : dangereux'], ['Difficulté des figures', 4, '4 : figures à 4 variées et exigeantes · 2 : figures simples · 0 : figures à 2 seulement'], ['Exécution (tenue, gainage)', 5, '5 : figures tenues 3 s, gainées · 3 : tenue courte · 1 : figures écroulées'], ['Composition (liaisons, musique)', 3, '3 : enchaînement fluide sur la musique · 1 : arrêts · 0 : pas d\'enchaînement'], ['Juge', 2, '2 : note l\'autre groupe avec justesse · 1 : note au hasard · 0 : ne juge pas']], e: [
    ['Échauffement en autonomie', 5, 'Échauffement par groupe.', 'libre'],
    ['Dernière répétition', 5, 'Une fois en entier.', 'acro:acrosport:quatuor']],
   c: [['Présentations jugées', 30, 'Chaque groupe présente en musique ; un groupe de juges élèves note avec la fiche, le prof note aussi. Grille : sécurité, difficulté, exécution, composition.', 'Notre enchaînement est réalisé sans chute et avec des figures tenues.', '', 'acro:acrosport:quatuor']],
   r: [['Bilan', 5, 'Comparaison des notes des juges élèves et du prof.', 'explication']]}
]},
3: {th: 'Difficulté et exécution : choisir ses figures selon un code', comp: ['HME3', 'HME5', 'HSC1', 'HSC2', 'GSS2'], l: [
  {t: 'Le code des figures', o: 'Connaître la valeur des figures (A, B, C) et choisir selon son niveau.', comp: ['HSC1', 'GSS2'], e: [
    ['Échauffement gainage', 6, 'Circuit gainage et mobilisation.', 'libre'],
    ['Le code', 4, 'Présentation du code simplifié : figures A (1 point), B (2 points), C (3 points) ; une figure ratée ne compte pas.', 'explication']],
   c: [['Atelier par niveaux', 20, 'Par 3 ou 4 : essayer des figures A, B et C de la fiche ; chacun note celles qu\'il réussit.', 'Nous réussissons au moins 2 figures B.', '', 'acro:acrosport:quatuor'],
    ['Choix stratégique', 10, 'Chaque groupe choisit 5 figures pour obtenir le meilleur total en restant en sécurité.', 'Nos choix sont réalistes.', '', 'explication']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Les figures dynamiques', o: 'Réaliser des montages et démontages dynamiques sûrs (petite impulsion, réception amortie).', comp: ['HME1', 'HME3', 'GSS2'], e: [
    ['Sauts et réceptions', 6, 'Sauts, réceptions amorties sur tapis, demi-tours.', 'libre'],
    ['Gainage', 4, 'Gainage dynamique par deux.', 'libre']],
   c: [['Montées avec impulsion', 15, 'Par 3 : le voltigeur monte sur les cuisses du porteur avec une petite impulsion, aidé par le pareur, puis tient 3 s.', 'Je monte en un seul temps, sans hésiter.', '', 'acro:acrosport:trio'],
    ['Démontages', 15, 'Démontages en saut avant sur tapis, tenu par les mains du porteur et du pareur ; réception jambes fléchies.', 'Ma réception est stable.', 'Démontage en descendant pour les élèves qui hésitent.', 'acro:acrosport:trio']],
   r: [['Retour au calme', 5, 'Étirements des chevilles et des genoux.', 'etirements']]},
  {t: 'Les éléments gymniques individuels', o: 'Enrichir l\'enchaînement d\'éléments individuels (ATR, roue, roulades, sauts, équilibres).', comp: ['HME1', 'HME3'], e: [
    ['Mobilisation', 6, 'Mobilisation, roulades, ruades.', 'libre'],
    ['Équilibres', 4, 'Équilibres sur un pied (planche, chandelle).', 'libre']],
   c: [['Ateliers gym', 30, '4 ateliers de 7 min : ATR avec parade, roue et rondade, roulade avant sautée et roulade arrière, équilibres. Chacun note ses réussites.', 'Je réussis un élément de chaque atelier.', '', 'ateliers:acrosport:4']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Composer pour un jury', o: 'Composer un enchaînement de 2 minutes en musique pour un jury.', comp: ['HME3', 'HME5', 'HSC2'], e: [
    ['Échauffement', 6, 'Mobilisation, gainage 3 × 20 s, roulades, roue, ATR au mur.', 'libre'],
    ['Cahier des charges', 4, '6 figures (dont 1 C), 2 éléments individuels par élève, liaisons, formation qui change, musique.', 'explication']],
   c: [['Création', 25, 'Groupes de 4 ou 5 : composition avec la fiche.', 'Notre enchaînement respecte le cahier des charges.', '', 'acro:acrosport:quatuor'],
    ['Montrer', 5, 'Chaque groupe présente à un autre groupe, qui calcule la difficulté avec le code et signale les figures risquées.', 'Notre total de difficulté est celui que nous avions prévu.', '', 'acro:acrosport:quatuor']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Juger : difficulté et exécution', o: 'Juger la difficulté et l\'exécution avec une fiche ; améliorer son enchaînement.', comp: ['HSC1', 'HSC2', 'HSC3'], e: [
    ['Échauffement en autonomie', 6, 'Chaque groupe s\'échauffe seul : mobilisation des poignets, épaules et dos, gainage 3 × 20 s, roulades, puis une figure connue.', 'libre'],
    ['Les deux jurys', 4, 'Jury difficulté (compte les points du code) et jury exécution (retire des points pour aide, chute, tenue courte).', 'explication']],
   c: [['Répétition', 15, 'Chaque groupe répète en entier en se filmant (avec accord), regarde la vidéo et corrige 2 points d\'exécution (tenue, gainage, synchronisation).', 'Nous corrigeons 2 points vus sur la vidéo.', '', 'acro:acrosport:quatuor'],
    ['Passage devant jury', 15, 'Chaque groupe passe devant deux juges (difficulté, exécution) ; on compare les notes.', 'Les notes de mes juges sont proches de celles du prof.', '', 'acro:acrosport:quatuor']],
   r: [['Retour au calme', 5, 'Étirements ; ajustements.', 'etirements']]},
  {t: 'Évaluation : compétition', o: 'Présenter son enchaînement et juger les autres.', comp: ['HME3', 'HME5', 'HSC1', 'HSC2', 'GSS2'], crit: [['Sécurité', 5, '5 : aucune chute, parade · 3 : un déséquilibre · 1 : une chute'], ['Difficulté', 5, '5 : figures prévues de niveau élevé, toutes réalisées · 3 : moyennes · 1 : faciles'], ['Exécution', 5, '5 : tenue 3 s, gainage, alignement · 3 : moyenne · 1 : faible'], ['Originalité et composition', 3, '3 : enchaînement original, liaisons fluides · 1 : banal ou haché'], ['Rôle de juge', 2, '2 : juge avec justesse (difficulté, exécution) · 1 : approximatif · 0 : ne juge pas']], e: [
    ['Échauffement en autonomie', 5, 'Chaque groupe s\'échauffe seul : mobilisation des poignets, épaules et dos, gainage 3 × 20 s, roulades, puis une figure connue.', 'libre'],
    ['Ordre de passage', 5, 'Tirage au sort ; installation des jurys.', 'explication']],
   c: [['Compétition', 30, 'Chaque groupe présente ; jurys élèves (difficulté, exécution) et prof. Classement et prix (difficulté, exécution, originalité).', 'Notre enchaînement est réalisé en sécurité avec les figures prévues.', '', 'acro:acrosport:pyramide']],
   r: [['Bilan', 5, 'Bilan et comparaison des notes.', 'explication']]}
]},
4: {th: 'Acrosport et expression : un thème, une histoire', comp: ['HME3', 'HME5', 'HSC2', 'GSS2'], l: [
  {t: 'Les figures expressives', o: 'Donner une intention aux figures (forme, regard, bras).', e: [
    ['Échauffement', 6, 'Mobilisation, gainage, roulades.', 'libre'],
    ['Formes', 4, 'Par deux : créer des formes (rond, pointu, étoile) avec son corps.', 'acro:acrosport:duo']],
   c: [['Même figure, autre intention', 15, 'Chaque groupe reprend une figure et la présente de 3 façons (puissance, légèreté, tristesse) par les bras, le regard, la tête.', 'Les spectateurs reconnaissent l\'intention.', '', 'acro:acrosport:trio'],
    ['Liaisons dansées', 15, 'Relier deux figures par une liaison dansée qui correspond à l\'intention.', 'La liaison prolonge l\'intention.', '', 'acro:acrosport:trio']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Choisir un thème', o: 'Choisir un thème (machine, nature, conte, sport) et trouver des figures qui le racontent.', comp: ['HME5', 'HSC2'], e: [
    ['Échauffement', 6, 'Un élève mène l\'échauffement habituel : mobilisation, gainage, roulades.', 'libre'],
    ['Thèmes', 4, 'Chaque groupe choisit un thème et une musique.', 'explication']],
   c: [['Recherche', 30, 'Recherche de figures et de liaisons évoquant le thème ; on garde les meilleures et on les dessine.', 'Nous avons 4 figures liées au thème.', '', 'acro:acrosport:quatuor']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Construire le spectacle', o: 'Organiser figures, liaisons et espace en une histoire.', comp: ['HME3', 'HME5', 'HSC2'], e: [
    ['Échauffement en autonomie', 6, 'Chaque groupe s\'échauffe seul : mobilisation des poignets, épaules et dos, gainage 3 × 20 s, roulades, puis une figure connue.', 'libre'],
    ['Structure', 4, 'Début - développement - fin : au tableau.', 'explication']],
   c: [['Composition', 30, 'Assemblage : entrée, figures dans l\'ordre de l\'histoire, liaisons, fin ; répéter.', 'Notre histoire est compréhensible.', '', 'acro:acrosport:quatuor']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Les figures de groupe', o: 'Réaliser une grande figure en associant deux groupes.', comp: ['HME3', 'HSC2', 'GSS2'], e: [
    ['Échauffement', 6, 'Mobilisation des poignets, épaules, dos et chevilles, puis gainage ventral, dorsal et latéral, 20 s chacun.', 'libre'],
    ['Révision', 4, 'Chaque groupe refait sa figure la plus haute.', 'acro:acrosport:quatuor']],
   c: [['Figures à 8', 15, 'Deux groupes s\'associent pour une figure à 8 (pyramide en V, vagues).', 'Notre figure à 8 est stable et sûre.', '', 'acro:acrosport:pyramide'],
    ['Répétition', 15, 'Retour en groupe : on intègre la figure à 8 dans le spectacle, puis on répète le spectacle en entier 2 fois.', 'La figure à 8 s\'intègre sans temps mort.', '', 'acro:acrosport:quatuor']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Répétition et regard critique', o: 'Améliorer le spectacle grâce au regard des autres.', comp: ['HSC2', 'HSC3'], e: [
    ['Échauffement en autonomie', 6, 'Chaque groupe s\'échauffe seul : mobilisation des poignets, épaules et dos, gainage 3 × 20 s, roulades, puis une figure connue.', 'libre'],
    ['Grille', 4, 'Grille : thème, sécurité, difficulté, expression.', 'explication']],
   c: [['Regards croisés', 30, 'Chaque groupe passe devant un autre qui remplit la grille et donne 2 conseils ; puis on corrige.', 'Nous améliorons un point.', '', 'acro:acrosport:quatuor']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Évaluation : spectacle', o: 'Présenter le spectacle acrobatique sur un thème.', comp: ['HME3', 'HME5', 'HSC2', 'GSS2'], crit: [['Sécurité', 5, '5 : aucune chute, parade · 3 : un déséquilibre · 1 : une chute'], ['Figures : difficulté et tenue', 5, '5 : figures exigeantes tenues 3 s · 3 : moyennes ou tenue courte · 1 : faibles'], ['Thème lisible', 4, '4 : le public comprend le thème · 2 : en partie · 0 : pas lisible'], ['Expression', 3, '3 : regard, intention, costumes ou accessoires au service du thème · 1 : peu · 0 : aucun'], ['Synchronisation', 3, '3 : groupe ensemble sur la musique · 1 : décalages · 0 : désorganisé']], e: [
    ['Échauffement en autonomie', 6, 'Chaque groupe s\'échauffe seul : mobilisation des poignets, épaules et dos, gainage 3 × 20 s, roulades, puis une figure connue.', 'libre'],
    ['Mise en place', 4, 'Tirage au sort de l\'ordre de passage ; installation de la scène et des juges.', 'explication']],
   c: [['Spectacle', 30, 'Chaque groupe présente. Grille : sécurité, figures (difficulté et tenue), thème lisible, expression, synchronisation.', 'Notre spectacle est sûr, maîtrisé et raconte notre thème.', '', 'acro:acrosport:pyramide']],
   r: [['Bilan', 5, 'Auto-évaluation sur la fiche puis comparaison avec la grille du prof.', 'explication']]}
]},
5: {th: 'Acrosport et condition physique : force, souplesse, gainage au service des figures', comp: ['HME1', 'HME3', 'GSS1', 'GSS2'], l: [
  {t: 'Tests et objectifs', o: 'Évaluer sa force, sa souplesse et son gainage ; fixer un objectif.', comp: ['GSS1', 'GSS4'], e: [
    ['Mobilisation', 6, 'Mobilisation articulaire complète.', 'libre'],
    ['Consignes', 4, 'Les 4 tests : gainage ventral (durée), pompes (30 s), souplesse (flexion avant assis), chaise contre le mur.', 'explication']],
   c: [['Tests', 20, 'Par deux : chacun passe les 4 tests, le partenaire note.', 'Je connais mes résultats.', '', 'ateliers:acrosport:4'],
    ['Figures libres', 10, 'Par groupes de 3-4 : chacun refait les 3 figures qu\'il maîtrise le mieux, en notant celles où le gainage ou la force manque.', 'Je repère la figure où je manque de force ou de gainage.', '', 'acro:acrosport:trio']],
   r: [['Retour au calme', 5, 'Étirements ; chacun écrit un objectif.', 'etirements']]},
  {t: 'Gainage et figures', o: 'Améliorer le gainage pour tenir les figures plus longtemps.', comp: ['GSS1', 'HME3'], e: [
    ['Activation', 6, 'Corde à sauter, mobilisation.', 'libre'],
    ['Gainage', 4, 'Gainage ventral, latéral, dorsal.', 'libre']],
   c: [['Circuit gainage', 15, '6 ateliers de 40 s : gainage, gainage dynamique, chaise, pompes, superman, ATR au mur.', 'Je termine le circuit sans perdre la position.', '', 'ateliers:acrosport:6'],
    ['Figures tenues 5 s', 15, 'Par groupes : figures tenues 5 s au lieu de 3.', 'Nous tenons 5 s.', '', 'acro:acrosport:trio']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Souplesse et figures', o: 'Travailler la souplesse pour des figures plus esthétiques (grand écart, pont).', comp: ['GSS1', 'HME3'], e: [
    ['Échauffement', 6, 'Trot, mobilisation.', 'libre'],
    ['Souplesse active', 4, 'Balancés de jambes, fentes.', 'libre']],
   c: [['Atelier souplesse', 15, 'Pont, grand écart progressif, fermeture (jambes tendues, mains vers les pieds) ; sans forcer, avec respiration.', 'Je gagne en amplitude sans douleur.', '', 'libre'],
    ['Figures esthétiques', 15, 'Figures incluant une position de souplesse (voltigeur en arabesque, pont sur porteur).', 'Notre figure est belle et sûre.', '', 'acro:acrosport:trio']],
   r: [['Retour au calme', 5, 'Étirements longs.', 'etirements']]},
  {t: 'Composer un enchaînement exigeant', o: 'Composer un enchaînement mettant en valeur force, souplesse et gainage.', comp: ['HME3', 'HSC2'], e: [
    ['Échauffement en autonomie', 6, 'Chaque groupe s\'échauffe seul : mobilisation des poignets, épaules et dos, gainage 3 × 20 s, roulades, puis une figure connue.', 'libre'],
    ['Cahier des charges', 4, '6 figures dont 2 de force, 1 de souplesse, 1 dynamique ; 2 minutes.', 'explication']],
   c: [['Création', 30, 'Par groupes : composition de l\'enchaînement (6 figures dont 2 de force, 1 de souplesse, 1 dynamique) avec la fiche, puis 3 répétitions en entier.', 'Notre enchaînement respecte le cahier des charges.', '', 'acro:acrosport:quatuor']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Re-tests et répétition', o: 'Mesurer ses progrès et répéter l\'enchaînement.', comp: ['GSS1', 'GSS5'], e: [
    ['Mobilisation', 6, 'Mobilisation complète.', 'libre'],
    ['Rappel', 4, 'Rappel des objectifs.', 'explication']],
   c: [['Re-tests', 15, 'Par deux : les 4 tests de la leçon 1 (gainage, pompes 30 s, souplesse, chaise) dans les mêmes conditions ; le partenaire note.', 'Je progresse sur au moins un test.', '', 'ateliers:acrosport:4'],
    ['Répétition', 15, 'Répétition de l\'enchaînement en entier ; on vérifie que les figures de force sont tenues 5 s.', 'Les figures de force sont tenues 5 s.', '', 'acro:acrosport:quatuor']],
   r: [['Retour au calme', 5, 'Étirements ; analyse des progrès.', 'etirements']]},
  {t: 'Évaluation : enchaînement et progrès', o: 'Présenter un enchaînement exigeant et analyser ses progrès physiques.', comp: ['HME1', 'HME3', 'GSS1', 'GSS2'], crit: [['Sécurité', 5, '5 : aucune chute, parade · 3 : un déséquilibre · 1 : une chute'], ['Figures de force', 4, '4 : figures de force exigeantes réussies · 2 : simples · 0 : absentes'], ['Figures de souplesse', 4, '4 : figures de souplesse avec amplitude · 2 : amplitude faible · 0 : absentes'], ['Tenue et composition', 4, '4 : figures tenues, enchaînement fluide · 2 : moyen · 0 : haché'], ['Analyse des progrès physiques', 3, '3 : compare ses tests de force et de souplesse du début et de la fin · 1 : vague · 0 : rien']], e: [
    ['Échauffement en autonomie', 6, 'Chaque groupe s\'échauffe seul : mobilisation des poignets, épaules et dos, gainage 3 × 20 s, roulades, puis une figure connue.', 'libre'],
    ['Ordre de passage', 4, 'Tirage au sort de l\'ordre de passage ; rappel du rôle des juges et des spectateurs.', 'explication']],
   c: [['Présentations', 30, 'Grille : sécurité, figures de force et de souplesse, tenue, composition.', 'Notre enchaînement est sûr et exigeant.', '', 'acro:acrosport:quatuor']],
   r: [['Bilan écrit', 5, 'Bilan : progrès physiques et figures.', 'explication']]}
]},
6: {th: 'Projet autonome : créer, juger et présenter un numéro acrobatique', comp: ['HME3', 'HME5', 'HSC1', 'HSC2', 'GSS2'], l: [
  {t: 'Lancement du projet', o: 'Former des groupes et définir le projet de numéro.', comp: ['HSC1', 'HSC2'], e: [
    ['Échauffement mené par élèves', 6, 'Deux élèves mènent l\'échauffement.', 'libre'],
    ['Présentation', 4, 'Numéro de 2 à 3 minutes, thème libre, code de difficulté, jury d\'élèves.', 'explication']],
   c: [['Projet', 10, 'Groupes de 4 à 6 : thème, musique, rôles (chorégraphe, responsable sécurité, responsable musique).', 'Le projet est écrit.', '', 'explication'],
    ['Recherche', 20, 'Chaque groupe essaie des figures du code (A, B, C) et des idées liées à son thème ; on garde les réussites et on les photographie.', 'Nous avons au moins 6 figures réussies et photographiées.', '', 'acro:acrosport:quatuor']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Créer (1)', o: 'Construire la structure du numéro.', comp: ['HME3', 'HSC2'], e: [
    ['Échauffement mené par un groupe', 6, 'Un groupe mène l\'échauffement de la classe (mobilisation, gainage, roulades) avec sa fiche.', 'libre'],
    ['Objectif', 4, 'Objectif de séance écrit.', 'explication']],
   c: [['Création', 30, 'Travail par groupes ; le prof est conseiller sécurité.', 'Notre structure est complète.', '', 'acro:acrosport:quatuor']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Créer (2)', o: 'Enrichir le numéro.', comp: ['HME3', 'HME5', 'HSC2'], e: [
    ['Échauffement mené par un groupe', 6, 'Un autre groupe mène l\'échauffement de la classe avec sa fiche.', 'libre'],
    ['Objectif', 4, 'Deux améliorations choisies.', 'explication']],
   c: [['Création', 20, 'Enrichissement : difficulté, liaisons, expression.', '', '', 'acro:acrosport:quatuor'],
    ['Regard croisé', 10, 'Deux groupes se présentent mutuellement leur travail et se donnent 2 conseils précis (sécurité, difficulté, expression).', 'Je donne des conseils précis et bienveillants.', '', 'acro:acrosport:quatuor']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Former les juges', o: 'Se former au jugement (difficulté, exécution, artistique).', comp: ['HSC1', 'HSC3'], e: [
    ['Échauffement en autonomie', 6, 'Chaque groupe s\'échauffe seul : mobilisation des poignets, épaules et dos, gainage 3 × 20 s, roulades, puis une figure connue.', 'libre'],
    ['Les fiches de juge', 4, 'Explication des trois jurys.', 'explication']],
   c: [['Répétition', 15, 'Chaque groupe répète en entier en musique, en vérifiant la tenue de 3 s et la sécurité de chaque figure.', 'Nous passons l\'enchaînement sans erreur.', '', 'acro:acrosport:quatuor'],
    ['Jugement d\'essai', 15, 'Passage devant les jurys d\'essai ; comparaison des notes.', 'Mes notes sont proches de celles des autres juges.', '', 'acro:acrosport:quatuor']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Répétition générale', o: 'Répéter le spectacle entier dans les conditions du jour J.', comp: ['HSC1', 'HSC2', 'GSS3'], e: [
    ['Échauffement en autonomie', 6, 'Chaque groupe s\'échauffe seul : mobilisation des poignets, épaules et dos, gainage 3 × 20 s, roulades, puis une figure connue.', 'libre'],
    ['Organisation', 4, 'Ordre, transitions, musique, jurys.', 'explication']],
   c: [['Répétition générale', 30, 'Le spectacle entier dans l\'ordre de passage, avec musique, transitions et jurys en place, comme le jour J.', 'Le spectacle s\'enchaîne sans temps mort.', '', 'acro:acrosport:pyramide']],
   r: [['Retour au calme', 5, 'Chaque groupe note les derniers ajustements à faire.', 'etirements']]},
  {t: 'Évaluation : le spectacle', o: 'Présenter le numéro et juger les autres.', comp: ['HME3', 'HME5', 'HSC1', 'HSC2', 'GSS2'], crit: [['Sécurité', 4, '4 : aucune chute, parade · 2 : un déséquilibre · 0 : une chute'], ['Difficulté', 4, '4 : figures de haut niveau · 2 : moyennes · 1 : faciles'], ['Exécution', 4, '4 : tenue, gainage, précision · 2 : moyenne · 1 : faible'], ['Artistique (thème, musique, originalité)', 4, '4 : numéro original, au service d\'un thème · 2 : peu travaillé · 1 : banal'], ['Rôle tenu (juge, régisseur, chorégraphe)', 4, '4 : rôle tenu avec sérieux et justesse · 2 : partiel · 0 : absent']], e: [
    ['Échauffement en autonomie', 6, 'Chaque groupe s\'échauffe seul : mobilisation des poignets, épaules et dos, gainage 3 × 20 s, roulades, puis une figure connue.', 'libre'],
    ['Mise en place', 4, 'Installation des tapis, de la musique et des jurys.', 'explication']],
   c: [['Spectacle jugé', 30, 'Chaque groupe présente ; jurys élèves et prof. Grille : sécurité, difficulté, exécution, artistique, rôle tenu.', 'Notre numéro est sûr, maîtrisé et original.', '', 'acro:acrosport:pyramide']],
   r: [['Bilan écrit', 5, 'Bilan individuel écrit : mon rôle, mes progrès, ce que je referais autrement.', 'explication']]}
]}
}});
