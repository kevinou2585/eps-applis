/* Athlétisme : 6 leçons par année (1re → 6e secondaire). En salle ou dehors.
   Sécurité des lancers : tout le monde lance du même côté, on ramasse ensemble au signal, personne dans la zone de chute. */
PREPA_ADD({id: 'athle', sport: 'Athlétisme', mat: 'Cônes, plots, lattes ou haies basses réglables, cordes, cerceaux, témoins, sacs de sable ou poids (2-4 kg), vortex ou javelots en mousse, anneaux ou disques en caoutchouc, tapis de réception, chronomètres, décamètre.', an: {
1: {th: 'Découvrir l\'athlétisme : courir vite, sauter loin, lancer loin', comp: ['HME1', 'HME2', 'HME4', 'GSS1'], l: [
  {t: 'Vitesse et réaction', o: 'Réagir vite à un signal, démarrer en position basse et courir droit à vitesse maximale.', comp: ['HME1', 'HME4'], e: [
    ['Course mille-pattes', 5, 'En relais : le premier fait l\'aller-retour, puis prend la main du deuxième, puis du troisième, jusqu\'à ce que toute l\'équipe coure main dans la main.', 'files'],
    ['Courir dans le cône', 5, 'Par deux face à face, un cône entre eux. Le prof annonce « assis, saute, pas à droite, demi-tour… » puis « COURS ! » : le premier qui attrape le cône gagne le point.', 'deux']],
   c: [['Plus vite que le ballon', 10, 'Un élève fait rouler un gros ballon sur 20 m ; les coureurs partent en même temps et doivent arriver avant le ballon. On augmente la force du lancer.', 'J\'arrive avant le ballon 3 fois sur 4.', '', 'course'],
    ['Touche et cours', 8, 'Par deux face à face : le fuyard frappe les mains du chasseur puis sprinte vers une ligne à 10 m ; le chasseur réagit et essaie de le toucher avant la ligne.', 'Je réagis tout de suite au départ du partenaire.', '', 'course'],
    ['Départs variés', 12, 'Sprints de 20 m depuis différentes positions (assis, couché, dos à la course, à genoux) puis position « à vos marques - prêts - partez » ; par vagues de 4.', 'Je pars au signal, ni avant ni après.', '', 'course']],
   r: [['Retour au calme', 5, 'Marche, étirements des mollets et des cuisses ; quelle position de départ est la plus rapide ?', 'etirements']]},
  {t: 'Les relais', o: 'Transmettre un témoin sans s\'arrêter et partir au bon moment.', comp: ['HME1', 'HSC2'], e: [
    ['Je veux mon cône', 5, 'Cônes en cercle (un de moins que d\'élèves) ; on court autour et au sifflet chacun saisit un cône. Celui qui n\'en a pas fait 5 squats puis revient.', 'cercle'],
    ['Passe du témoin à l\'arrêt', 5, 'En colonne de 4, en marchant : le témoin passe de la main droite à la main gauche du suivant, qui tend la main en arrière sans se retourner.', 'files']],
   c: [['Relais navette', 10, 'Équipes en colonne : chacun court jusqu\'à un cône à 15 m et revient taper la main du suivant. Départ anticipé = on recommence sa course.', 'Je pars au bon moment, sans anticiper.', '', 'files'],
    ['Relais avec témoin', 12, 'Relais 4 × 30 m en ligne droite avec une zone de passage de 10 m marquée par des plots : le receveur part quand le porteur touche une marque au sol.', 'Notre témoin passe dans la zone sans tomber.', '', 'course:athle:relais'],
    ['Relais déménageur', 8, 'Devant chaque colonne, des cônes à 1-2 m d\'intervalle et 5 objets : on déplace les objets un par un jusqu\'au premier cône, puis au deuxième, jusqu\'au bout.', 'Mon équipe déménage tous les objets sans erreur.', '', 'files']],
   r: [['Retour au calme', 5, 'Étirements ; où partir pour recevoir le témoin en pleine vitesse ?', 'etirements']]},
  {t: 'Haies basses et saut en longueur', o: 'Franchir des obstacles bas sans ralentir ; prendre son impulsion sur un pied.', comp: ['HME1', 'HME4'], e: [
    ['Regarde la vague', 5, 'Le prof fait rouler un cerceau vers la ligne d\'élèves qui doivent sauter par-dessus.', 'saut'],
    ['Pas dans les cerceaux', 5, 'Course dans une ligne de cerceaux, un appui par cerceau, puis un cerceau sur deux.', 'files']],
   c: [['Course de haies basses', 12, 'Franchir 4 à 6 haies basses (lattes sur cônes) sur 30 m sans s\'arrêter ; haies de hauteurs différentes selon les couloirs.', 'Je franchis toutes les haies sans m\'arrêter ni sauter à pieds joints.', 'Espacement plus court pour les plus petits.', 'course:athle:haies'],
    ['Sauter la rivière', 13, 'Deux cordes forment une rivière que l\'on franchit après élan ; on écarte progressivement les cordes pour trouver sa distance maximale. Réception sur tapis ou sable, pieds joints.', 'J\'appelle sur un pied et je retombe sur les deux.', '', 'saut']],
   r: [['Retour au calme', 5, 'Étirements ; chacun dit sa meilleure distance.', 'etirements']]},
  {t: 'Saut en hauteur et lancer du poids', o: 'Franchir une corde en ciseau ; pousser un engin depuis l\'épaule.', comp: ['HME1', 'HME2', 'GSS2'], e: [
    ['Chat saute-mouton', 5, 'Les élèves touchés s\'accroupissent tête rentrée ; un camarade les délivre en sautant par-dessus (mains sur le dos).', 'chat'],
    ['Sauts sur un pied', 5, 'Sauts à cloche-pied, puis montées de genoux avec bras.', 'files']],
   c: [['Marée haute', 12, 'Une corde lâche tenue par deux élèves (ou élastique) ; on la franchit en ciseau après 3-5 pas d\'élan de côté. À chaque tour réussi par tous : « Marée haute ! », on monte la corde. Réception sur tapis.', 'Je franchis la corde à hauteur de mes genoux.', '', 'saut:athle:hauteur'],
    ['Lancer du poids', 13, 'Sac de sable de 1-2 kg : le poids calé contre le cou, coude haut, on pousse (on ne lance pas avec le bras) depuis un cercle sans en sortir. Tout le monde lance au même signal, on ramasse ensemble.', 'Je pousse le poids sans le décoller du cou avant la poussée.', '', 'lancer']],
   r: [['Retour au calme', 5, 'Étirements des épaules ; rappel des règles de sécurité des lancers.', 'etirements']]},
  {t: 'Disque et javelot', o: 'Lancer en rotation et lancer en ligne avec élan.', comp: ['HME2', 'GSS2'], e: [
    ['Lancer en rotation sur cible', 5, 'Dos aux cibles, faire un demi-tour puis lancer une petite balle vers la cible ; puis un tour complet.', 'tir'],
    ['Lancers de balles', 5, 'Par deux : lancers de balles de tennis à bras cassé, de plus en plus loin.', 'deux']],
   c: [['Le disque', 12, 'Avec un anneau en caoutchouc ou un frisbee : lancer de profil, bras long en arrière, rotation des hanches, vers des cibles à distances croissantes.', 'Mon disque atterrit dans le secteur 3 fois sur 3.', '', 'lancer'],
    ['Le javelot', 13, 'Avec un vortex ou un javelot en mousse : viser des cerceaux, puis lancer le plus loin possible après 3 pas d\'élan, au-dessus de l\'épaule, sans franchir la ligne.', 'Mon javelot part au-dessus de l\'épaule et vole droit.', '', 'lancer']],
   r: [['Retour au calme', 5, 'Étirements ; les épreuves des Jeux olympiques antiques.', 'etirements']]},
  {t: 'Évaluation : triathlon', o: 'Réaliser une course, un saut et un lancer et comparer avec ses premiers essais.', comp: ['HME1', 'HME2', 'GSS1'], e: [
    ['Course mille-pattes', 5, 'Relais de mise en train.', 'files'],
    ['Gammes', 5, 'Montées de genoux, talons-fesses, sauts sur un pied, 2 accélérations.', 'course']],
   c: [['Épreuve 1 : sprint ou haies', 10, 'Chacun choisit : 30 m plat ou 30 m haies basses. 2 essais chronométrés par des camarades.', 'Je pars au signal et je cours droit jusqu\'au bout.', '', 'course:athle:haies'],
    ['Épreuve 2 : saut', 10, 'Longueur (élan court) ou hauteur en ciseau : 3 essais.', 'Je respecte la planche ou la barre.', '', 'saut'],
    ['Épreuve 3 : lancer au choix', 10, 'Poids, disque ou javelot : 3 essais mesurés, on garde le meilleur.', 'Je lance avec la bonne technique, en sécurité.', '', 'lancer']],
   r: [['Bilan', 5, 'Chacun note ses 3 performances sur sa fiche et calcule ses points avec le barème.', 'explication']]}
]},
2: {th: 'Mieux courir, sauter et lancer : départ, rythme, élan', comp: ['HME1', 'HME2', 'HME4', 'GSS1'], l: [
  {t: 'Le départ et la mise en action', o: 'Réaliser un départ « debout » puis « accroupi » efficace et accélérer sur 30 m.', comp: ['HME1', 'HME4'], e: [
    ['Gammes', 5, 'Sur 20 m : montées de genoux, talons-fesses, pas chassés, foulées bondissantes, retour en marchant.', 'files'],
    ['Jeux de réaction', 5, 'Par deux : départ au signal sonore, visuel, au toucher.', 'deux']],
   c: [['Départ debout', 10, 'Pied fort devant, poids sur la jambe avant, bras opposé devant : 4 départs de 15 m.', 'Mes premiers pas sont courts et puissants.', '', 'course'],
    ['Départ accroupi', 10, 'Mains derrière la ligne, genou arrière au sol, puis « prêts » (bassin monte), « partez » : 4 départs.', 'Je me redresse progressivement.', '', 'course'],
    ['Sprint 40 m chronométré', 10, '2 essais chronométrés par des camarades.', 'Je connais mon temps sur 40 m.', '', 'course']],
   r: [['Retour au calme', 5, 'Étirements ; quel départ est le plus rapide pour moi ?', 'etirements']]},
  {t: 'Les haies : rythme à 3 appuis', o: 'Courir entre les haies avec un rythme régulier de 3 appuis.', comp: ['HME1', 'HME4'], e: [
    ['Gammes', 5, 'Gammes et talons-fesses.', 'files'],
    ['Passage de jambe', 5, 'Le long du mur : passage de la jambe d\'attaque (tendue) puis de la jambe d\'esquive (pliée sur le côté).', 'libre']],
   c: [['Rythme en lattes', 12, 'Lattes au sol à 5-6 m d\'écart : 3 appuis entre chaque latte, toujours la même jambe d\'attaque.', 'Je garde 3 appuis entre chaque latte.', 'Choisir le couloir avec l\'écart qui convient.', 'course:athle:haies'],
    ['Course de haies', 13, 'Haies basses (40-50 cm) sur 40 m : franchir en rasant la haie.', 'Je rase la haie et je reprends ma course vite.', '', 'course:athle:haies']],
   r: [['Retour au calme', 5, 'Étirements des hanches.', 'etirements']]},
  {t: 'Le saut en longueur : élan et appel', o: 'Prendre un élan étalonné et appeler dans une zone.', comp: ['HME1', 'HME4'], e: [
    ['Foulées bondissantes', 5, 'Sur 20 m, puis pas sautés à cloche-pied.', 'files'],
    ['Petits élans', 5, 'Saut après 3 pas d\'élan, appel sur le pied fort.', 'saut']],
   c: [['Étalonner son élan', 12, 'Courir 8 à 10 foulées depuis une marque ; le partenaire note où tombe l\'appel ; ajuster la marque.', 'Mon appel tombe dans la zone 3 fois sur 4.', '', 'saut'],
    ['Saut mesuré', 13, 'Sauts mesurés avec élan étalonné ; zone d\'appel de 1 m.', 'J\'améliore ma distance de la 1re année.', '', 'saut']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Le lancer de poids : la poussée', o: 'Lancer le poids en pousser avec transfert du poids du corps.', comp: ['HME2', 'GSS2'], e: [
    ['Mobilisation', 5, 'Épaules, poignets, rotation du tronc.', 'libre'],
    ['Lancers de ballon', 5, 'Ballon de médecine poussé à deux mains depuis la poitrine.', 'deux']],
   c: [['De face puis de profil', 12, 'Poussée de face, puis de profil (épaule vers la zone de chute), avec transfert du pied arrière au pied avant.', 'Je pousse le poids, coude haut.', '', 'lancer'],
    ['Concours', 13, '3 essais mesurés par élève ; un juge vérifie qu\'on ne sort pas du cercle par l\'avant (essai nul).', 'Je reste dans le cercle et je pousse le poids.', '', 'lancer']],
   r: [['Retour au calme', 5, 'Étirements des épaules.', 'etirements']]},
  {t: 'Le relais 4 × 50 m', o: 'Passer le témoin en pleine vitesse dans une zone.', comp: ['HME1', 'HSC2'], e: [
    ['Passes en marchant', 5, 'Passes du témoin en marchant puis en trottinant.', 'files'],
    ['Accélérations', 5, '3 accélérations de 30 m.', 'course']],
   c: [['Marque de départ', 12, 'Le receveur fixe sa marque (pieds) et part quand le porteur l\'atteint ; ajuster la marque.', 'Le témoin passe sans ralentir.', '', 'course:athle:relais'],
    ['Courses de relais', 13, 'Relais 4 × 50 m chronométrés, 2 courses ; on ajuste les marques entre les deux.', 'Notre équipe améliore son temps à la 2e course.', '', 'course:athle:relais']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Évaluation : triathlon', o: 'Évaluer une course, un saut et un lancer.', comp: ['HME1', 'HME2', 'GSS1'], e: [
    ['Échauffement', 5, 'Course lente, mobilisation, gammes.', 'files'],
    ['Accélérations', 5, '2 accélérations et 2 sauts d\'essai.', 'course']],
   c: [['Épreuve 1 : 40 m ou 40 m haies', 10, '2 essais chronométrés.', 'Je pars au signal.', '', 'course:athle:haies'],
    ['Épreuve 2 : longueur', 10, '3 essais mesurés avec élan étalonné.', 'Mon appel est dans la zone.', '', 'saut'],
    ['Épreuve 3 : poids', 10, '3 essais.', 'Je pousse le poids.', '', 'lancer']],
   r: [['Bilan', 5, 'Points avec le barème et comparaison avec la 1re année.', 'explication']]}
]},
3: {th: 'Technique et performance : hauteur, triple saut, javelot, demi-fond', comp: ['HME1', 'HME2', 'GSS1', 'GSS2'], l: [
  {t: 'Le saut en hauteur : élan courbe', o: 'Prendre un élan en courbe et franchir en ciseau puis en rouleau dorsal (sur gros tapis).', comp: ['HME1', 'GSS2'], e: [
    ['Course en courbe', 5, 'Courir des courbes et des cercles en se penchant vers l\'intérieur.', 'libre'],
    ['Impulsions', 5, 'Impulsions pied fort, genou opposé qui monte.', 'files']],
   c: [['Élan en J', 12, '4 pas droits puis 4 en courbe : franchir l\'élastique en ciseau.', 'Mon élan est régulier.', '', 'saut:athle:hauteur'],
    ['Rouleau dorsal (si gros tapis)', 13, 'Depuis le bord du tapis puis avec élan : franchir dos à la barre.', 'Je franchis dos à l\'élastique en sécurité.', 'Rester en ciseau sans gros tapis.', 'saut:athle:hauteur']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Le triple saut', o: 'Enchaîner cloche-pied, foulée et saut (même-même-autre).', comp: ['HME1', 'HME4'], e: [
    ['Bonds', 5, 'Bonds dans des cerceaux.', 'files'],
    ['Cloche-pied', 5, 'Cloche-pied sur 10 m de chaque jambe.', 'files']],
   c: [['Le rythme', 12, 'Cerceaux : gauche-gauche-droite (ou droite-droite-gauche), de plus en plus espacés.', 'Je respecte le rythme même-même-autre.', '', 'saut'],
    ['Triple saut mesuré', 13, 'Avec élan court, 3 essais mesurés.', 'Mes 3 bonds sont équilibrés.', '', 'saut']],
   r: [['Retour au calme', 5, 'Étirements des chevilles.', 'etirements']]},
  {t: 'Le javelot', o: 'Lancer le javelot (ou vortex) après un élan avec croisé.', comp: ['HME2', 'GSS2'], e: [
    ['Mobilisation épaules', 5, 'Rotations, étirements dynamiques.', 'libre'],
    ['Lancers de balles', 5, 'Balles lancées vers le haut et loin.', 'deux']],
   c: [['Lancer sans élan', 10, 'Bras tendu en arrière, épaule opposée vers la cible, lancer au-dessus de l\'épaule.', 'Mon engin vole droit.', '', 'lancer'],
    ['Élan avec pas croisé', 15, '3 pas puis croisé, bras en arrière, lancer ; 3 essais mesurés.', 'Je garde le bras en arrière pendant le croisé.', '', 'lancer']],
   r: [['Retour au calme', 5, 'Étirements des épaules.', 'etirements']]},
  {t: 'Le demi-fond : 1 000 m', o: 'Gérer une allure régulière sur 1 000 m.', comp: ['HME1', 'GSS1'], e: [
    ['Trot', 5, 'Trot lent 5 minutes.', 'piste'],
    ['Allures', 5, 'Tours à allure lente, moyenne, rapide.', 'piste']],
   c: [['Contrat d\'allure', 12, 'Chacun annonce son temps au tour et court 3 tours en essayant de le respecter.', 'Mes temps au tour sont réguliers.', '', 'piste:athle:plots'],
    ['1 000 m chronométrés', 13, '1 000 m chronométrés ; le partenaire annonce et note le temps à chaque tour pour vérifier la régularité.', 'Je cours le 1 000 m sans m\'arrêter avec des tours réguliers.', '', 'piste']],
   r: [['Retour au calme', 5, 'Marche, pouls, étirements.', 'etirements']]},
  {t: 'Le disque en rotation', o: 'Lancer le disque avec une rotation complète (ou demi-tour).', comp: ['HME2', 'GSS2'], e: [
    ['Mobilisation', 5, 'Rotations du tronc et des épaules.', 'libre'],
    ['Lancers en rotation', 5, 'Petite balle lancée après demi-tour.', 'tir']],
   c: [['Disque de face', 10, 'Disque (anneau ou frisbee) lancé de profil, bras long en arrière, rotation des hanches : 5 lancers vers le secteur.', 'Mon disque vole à plat dans le secteur.', '', 'lancer'],
    ['Disque avec rotation', 15, 'Demi-tour puis tour complet ; 3 essais mesurés.', 'Je reste dans le cercle.', '', 'lancer']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Évaluation : pentathlon', o: 'Évaluer 5 épreuves au choix (course, saut, lancer, demi-fond).', comp: ['HME1', 'HME2', 'GSS1'], e: [
    ['Échauffement', 5, 'Course, mobilisation, gammes.', 'files'],
    ['Essais', 5, 'Un essai dans chaque spécialité.', 'course']],
   c: [['Épreuves', 30, 'Ateliers tournants : sprint ou haies, hauteur ou triple saut, javelot ou disque ; le 1 000 m à la fin. Barème de points.', 'J\'améliore au moins 2 performances.', '', 'ateliers:athle:4']],
   r: [['Bilan', 5, 'Calcul du total de points.', 'explication']]}
]},
4: {th: 'Spécialités et entraînement : se préparer à une rencontre', comp: ['HME1', 'HME2', 'GSS1', 'HSC2'], l: [
  {t: 'Choisir sa spécialité', o: 'Tester plusieurs épreuves et choisir une course, un saut et un lancer à préparer.', comp: ['HME1', 'GSS4'], e: [
    ['Échauffement', 6, '5 minutes de course lente, mobilisation des chevilles, genoux, hanches et épaules, puis gammes sur 20 m (montées de genoux, talons-fesses, pas chassés).', 'files'],
    ['Accélérations', 4, '3 accélérations progressives de 40 m, retour en marchant.', 'course']],
   c: [['Tests en ateliers', 25, '6 ateliers de 4 minutes, un essai mesuré par élève dans chacun : 30 m départ accroupi, 40 m haies basses, longueur avec élan, hauteur en ciseau, poids, javelot (vortex). Chacun note ses résultats et les points du barème.', 'Je réalise un essai dans chaque atelier et je note mes points.', 'Un atelier peut être supprimé faute de matériel.', 'ateliers:athle:6'],
    ['Choix et objectifs', 5, 'Chacun choisit une course, un saut et un lancer (là où il a le plus de points ou le plus envie) et écrit un objectif chiffré pour chaque épreuve.', 'Mes objectifs sont chiffrés et réalistes.', '', 'explication']],
   r: [['Retour au calme', 5, 'Marche, étirements des mollets, des cuisses et des épaules ; chacun annonce ses 3 épreuves.', 'etirements']]},
  {t: 'Entraînement course', o: 'Améliorer sa course choisie : départ et vitesse, haies ou demi-fond.', comp: ['HME1', 'GSS1'], e: [
    ['Échauffement', 6, 'Course lente, mobilisation, gammes sur 20 m.', 'files'],
    ['Gammes spécifiques', 4, 'Sprinteurs : skippings et départs ; hurdlers : passages de jambe au mur ; demi-fond : 2 tours à allure moyenne.', 'files']],
   c: [['Séance par groupes', 25, 'Sprint : 6 départs accroupis sur 20 m, 3 × 40 m à 95 %, récupération complète en marchant. Haies : 6 passages de 3 haies en rythme à 3 appuis, puis 2 × 5 haies. Demi-fond : 4 × 300 m à l\'allure du contrat, 1 min 30 de récupération. Les partenaires chronomètrent.', 'Je réalise toute ma séance avec une technique propre.', 'Hauteur des haies et distances adaptées à chaque groupe.', 'course'],
    ['Essai chronométré', 5, 'Un essai chronométré dans sa course, noté dans le carnet.', 'Je compare avec mon test de la leçon 1.', '', 'course']],
   r: [['Retour au calme', 5, 'Trot lent, étirements ; chacun note son temps et ses sensations.', 'etirements']]},
  {t: 'Entraînement saut', o: 'Améliorer son saut choisi : élan, appel et réception.', comp: ['HME1', 'HME4'], e: [
    ['Échauffement', 6, 'Course lente, mobilisation, gammes et foulées bondissantes.', 'files'],
    ['Impulsions', 4, 'Impulsions sur 3 pas (pied fort), genou libre qui monte, bras qui montent.', 'files']],
   c: [['Séance par groupes', 25, 'Longueur : étalonnage de l\'élan (10-12 foulées), appel dans la zone, 6 sauts. Triple saut : rythme dans les cerceaux puis 5 sauts avec élan court. Hauteur : élan en J, 8 sauts à hauteur croissante (ciseau ou rouleau dorsal sur gros tapis). Un partenaire observe l\'appel avec la fiche.', 'Mon appel est dans la zone (ou mon élan est régulier) 3 fois sur 4.', '', 'saut'],
    ['Saut mesuré', 5, '2 sauts mesurés dans sa spécialité.', 'Je progresse par rapport à la leçon 1.', '', 'saut']],
   r: [['Retour au calme', 5, 'Étirements des chevilles, des mollets et des hanches.', 'etirements']]},
  {t: 'Entraînement lancer', o: 'Améliorer son lancer choisi : placement, transfert du poids, trajectoire.', comp: ['HME2', 'GSS2'], e: [
    ['Mobilisation', 6, 'Mobilisation des épaules, des poignets et du tronc ; rotations avec un bâton derrière les épaules.', 'libre'],
    ['Lancers légers', 4, 'Lancers de ballons de médecine à deux mains (au-dessus de la tête, depuis la poitrine), par deux.', 'deux']],
   c: [['Séance par groupes', 25, 'Poids : poussée de profil puis avec pas chassé, 8 lancers. Javelot : 3 pas + croisé, 8 lancers. Disque : demi-tour puis tour, 8 lancers. Tout le monde lance au même signal, on ramasse ensemble ; un partenaire observe un point technique.', 'Je réussis le point technique travaillé 3 fois sur 5.', '', 'lancer'],
    ['Concours', 5, '2 lancers mesurés dans sa spécialité.', 'Je progresse par rapport à la leçon 1.', '', 'lancer']],
   r: [['Retour au calme', 5, 'Étirements des épaules et du dos ; rappel des règles de sécurité.', 'etirements']]},
  {t: 'Les rôles d\'officiel', o: 'Être starter, chronométreur, juge de saut ou de lancer lors d\'une compétition d\'essai.', comp: ['HSC1', 'HSC2'], e: [
    ['Échauffement', 6, 'Course lente, mobilisation, gammes.', 'files'],
    ['Les rôles', 4, 'Explication : starter (commandes, faux départ), chronométreur (déclencher au geste ou au son), juge de saut (planche, mordu, mesure à la trace la plus proche), juge de lancer (secteur, cercle, mesure).', 'explication']],
   c: [['Compétition d\'essai', 30, 'La classe est divisée en 2 : la moitié concourt dans ses 3 épreuves, l\'autre officie avec les fiches ; on inverse à mi-temps. Les officiels remplissent les feuilles de résultats.', 'Je tiens mon rôle d\'officiel sans erreur de mesure.', '', 'ateliers:athle:4']],
   r: [['Retour au calme', 5, 'Retours des officiels : quelles décisions étaient difficiles ? Étirements.', 'etirements']]},
  {t: 'Évaluation : rencontre', o: 'Concourir dans ses 3 épreuves et tenir un rôle d\'officiel.', comp: ['HME1', 'HME2', 'GSS1', 'HSC2'], e: [
    ['Échauffement en autonomie', 7, 'Chacun s\'échauffe selon ses épreuves avec la fiche (course lente, mobilisation, gammes, essais).', 'files'],
    ['Organisation', 3, 'Rappel des rôles et de l\'ordre des épreuves.', 'explication']],
   c: [['Rencontre', 30, 'Rencontre officiée par les élèves : chacun fait 2 essais dans chacune de ses 3 épreuves et officie dans une autre. Barème de points.', 'J\'améliore au moins 2 de mes 3 performances de départ.', '', 'ateliers:athle:4']],
   r: [['Bilan', 5, 'Chacun compare ses résultats avec ses objectifs et son test de départ.', 'explication']]}
]},
5: {th: 'Préparation physique par l\'athlétisme : vitesse, détente, force', comp: ['HME1', 'GSS1', 'GSS5'], l: [
  {t: 'Tests physiques', o: 'Mesurer sa vitesse, sa détente et sa force, et se fixer des objectifs.', comp: ['GSS1', 'GSS4'], e: [
    ['Échauffement', 7, 'Course lente, mobilisation, gammes, 3 accélérations, 5 sauts sur place.', 'files'],
    ['Consignes', 3, 'Explication des 4 tests et du rôle du partenaire (mesure, chrono, note).', 'explication']],
   c: [['Tests', 30, '4 ateliers : sprint 30 m départ debout (2 essais), détente verticale (marque au mur, 3 essais), lancer de ballon de médecine 2 kg vers l\'avant à deux mains (3 essais), 5 bonds alternés sans élan (2 essais). Chaque résultat est noté dans le carnet.', 'Je connais mes 4 résultats.', '', 'ateliers:athle:4']],
   r: [['Retour au calme', 5, 'Étirements ; chacun écrit un objectif pour 2 des tests.', 'etirements']]},
  {t: 'Développer sa vitesse', o: 'Améliorer sa vitesse : fréquence, amplitude, départ.', comp: ['GSS1', 'HME1'], e: [
    ['Échauffement', 7, 'Course lente, mobilisation, gammes.', 'files'],
    ['Éducatifs', 3, 'Skippings bas et hauts, foulées bondissantes, 2 × 20 m chacun.', 'files']],
   c: [['Fréquence et amplitude', 12, 'Lattes au sol : espacées de 1 m (fréquence, appuis rapides) puis de 1,80 m (amplitude) ; 4 passages de chaque.', 'Je reste sur l\'avant du pied et je garde le rythme.', '', 'course'],
    ['Sprints courts', 18, '6 × 30 m départs variés (accroupi, couché, dos), récupération complète (1 min 30 en marchant) ; puis 2 × 50 m à 95 %.', 'Je garde une course relâchée à vitesse maximale.', '', 'course']],
   r: [['Retour au calme', 5, 'Trot lent, étirements ; pourquoi la récupération doit-elle être complète ?', 'etirements']]},
  {t: 'Développer sa détente', o: 'Améliorer sa détente par des bonds et des sauts, avec des réceptions sûres.', comp: ['GSS1', 'GSS2'], e: [
    ['Échauffement', 7, 'Course lente, mobilisation des chevilles et des genoux, sauts sur place.', 'files'],
    ['Réceptions', 3, 'Sauts sur place et réceptions amorties, genoux dans l\'axe, silencieuses.', 'libre']],
   c: [['Circuit de bonds', 18, '5 ateliers de 2 minutes : sauts pieds joints au-dessus de lattes, cloche-pied dans des cerceaux, sauts sur un banc (montée-descente), foulées bondissantes, sauts groupés. Qualité avant quantité.', 'Mes réceptions sont amorties et silencieuses.', '', 'ateliers:athle:6'],
    ['Application', 12, 'Sauts en longueur sans élan et triple saut avec élan court, mesurés.', 'Je saute plus loin qu\'au test.', '', 'saut']],
   r: [['Retour au calme', 5, 'Étirements des mollets, des cuisses et des fessiers.', 'etirements']]},
  {t: 'Développer sa force', o: 'Renforcer les muscles utiles à l\'athlète avec le poids du corps et des ballons lestés.', comp: ['GSS1', 'GSS2'], e: [
    ['Mobilisation', 7, 'Mobilisation articulaire complète, gainage 3 × 20 s.', 'libre'],
    ['Postures', 3, 'Le prof montre la bonne posture du squat, de la fente et de la pompe ; les élèves corrigent par deux.', 'explication']],
   c: [['Circuit force', 20, '6 ateliers de 40 s (20 s de repos), 2 tours : squats, fentes alternées, pompes (sur les genoux si besoin), gainage, lancers de ballon lesté contre le mur, montées sur banc.', 'Je garde une bonne posture même fatigué.', '', 'ateliers:athle:6'],
    ['Application', 10, 'Lancers de poids : 3 lancers mesurés.', 'J\'utilise mes jambes pour pousser.', '', 'lancer']],
   r: [['Retour au calme', 5, 'Étirements longs ; pourquoi se renforcer avant de lancer ou de sauter ?', 'etirements']]},
  {t: 'Re-tests', o: 'Mesurer ses progrès et les expliquer.', comp: ['GSS1', 'GSS5'], e: [
    ['Échauffement', 7, 'Échauffement complet en autonomie avec la fiche.', 'files'],
    ['Rappel', 3, 'Chacun relit ses résultats et ses objectifs de la leçon 1.', 'explication']],
   c: [['Re-tests', 25, 'Les 4 tests de la leçon 1 dans les mêmes conditions.', 'Je progresse sur au moins un test.', '', 'ateliers:athle:4'],
    ['Analyse', 5, 'Chacun calcule ses progrès en pourcentage et écrit une explication.', 'J\'explique mes progrès (ou leur absence).', '', 'explication']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Évaluation : athlète complet', o: 'Réaliser une course, un saut et un lancer et expliquer comment s\'entraîner.', comp: ['HME1', 'GSS1', 'GSS5'], e: [
    ['Échauffement en autonomie', 7, 'Chacun mène son échauffement et l\'explique au prof.', 'files'],
    ['Consignes', 3, 'Épreuves et questions orales.', 'explication']],
   c: [['Épreuves', 25, 'Sprint 50 m, longueur ou triple saut, poids : 2 essais chacun, barème.', 'J\'atteins mes objectifs dans au moins une épreuve.', '', 'ateliers:athle:4'],
    ['Questions', 5, 'Chacun répond à 2 questions (ex. : pourquoi la récupération complète en vitesse ? comment se réceptionner ?).', 'J\'explique avec les bons mots.', '', 'explication']],
   r: [['Bilan', 5, 'Bilan écrit : ce que j\'ai appris, mes progrès, ce que je ferais autrement.', 'explication']]}
]},
6: {th: 'Organiser une rencontre d\'athlétisme pour la classe (ou pour des plus jeunes)', comp: ['HSC1', 'HSC2', 'HSC3', 'GSS1'], l: [
  {t: 'Projet de rencontre', o: 'Définir la rencontre : épreuves, rôles, barèmes, horaires.', comp: ['HSC1', 'HSC2'], e: [
    ['Échauffement en autonomie', 7, 'Échauffement complet mené par deux élèves.', 'files'],
    ['Présentation', 3, 'Le projet : une rencontre organisée par la classe (épreuves, équipes, officiels, résultats).', 'explication']],
   c: [['Organisation', 15, 'Commissions : épreuves et matériel, officiels, résultats et barèmes, échauffement et sécurité. Chaque commission écrit sa fiche.', 'Chaque commission a une fiche complète.', '', 'explication'],
    ['Tests de départ', 15, 'Chacun fait un essai dans les épreuves de la rencontre.', 'Je connais mes résultats de départ.', '', 'ateliers:athle:4']],
   r: [['Retour au calme', 5, 'Étirements ; mise en commun des commissions.', 'etirements']]},
  {t: 'Entraînement autonome (1)', o: 'S\'entraîner en autonomie dans ses épreuves.', comp: ['GSS1', 'GSS5'], e: [
    ['Échauffement en autonomie', 7, 'Chacun suit sa fiche d\'échauffement.', 'files'],
    ['Objectif', 3, 'Chacun écrit l\'objectif de sa séance.', 'explication']],
   c: [['Séance', 30, 'Par épreuves, avec les fiches d\'exercices des années précédentes ; un « coach » par groupe observe et conseille.', 'Je réalise ma séance et je note mes résultats.', '', 'ateliers:athle:4']],
   r: [['Retour au calme', 5, 'Étirements ; notes dans le carnet.', 'etirements']]},
  {t: 'Entraînement autonome (2)', o: 'Ajuster son entraînement d\'après ses notes.', comp: ['GSS1', 'GSS5'], e: [
    ['Échauffement en autonomie', 7, 'Chacun suit sa fiche d\'échauffement.', 'files'],
    ['Ajustement', 3, 'Chacun change un élément de sa séance.', 'explication']],
   c: [['Séance', 20, 'Par épreuves, en autonomie avec les fiches ; le « coach » de chaque groupe vérifie un point technique.', 'J\'ajuste ma séance et j\'explique pourquoi.', '', 'ateliers:athle:4'],
    ['Préparation des commissions', 10, 'Les commissions préparent le matériel, les feuilles et le plan de la rencontre.', 'Notre commission est prête.', '', 'explication']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Répétition de la rencontre', o: 'Tester l\'organisation : rotations, officiels, feuilles de résultats.', comp: ['HSC1', 'HSC2'], e: [
    ['Échauffement collectif', 7, 'Mené par la commission échauffement.', 'files'],
    ['Plan', 3, 'Présentation du plan de la rencontre.', 'explication']],
   c: [['Rencontre d\'essai', 30, 'Rencontre complète en version courte ; chacun concourt et officie.', 'Les rotations et les mesures fonctionnent.', '', 'ateliers:athle:4']],
   r: [['Retour au calme', 5, 'Bilan : ce qu\'on corrige.', 'etirements']]},
  {t: 'La rencontre', o: 'Vivre la rencontre organisée par la classe.', comp: ['HSC1', 'HSC2', 'HSC3'], e: [
    ['Échauffement collectif', 7, 'Mené par la commission échauffement.', 'files'],
    ['Mise en place', 3, 'Installation des ateliers et des officiels.', 'explication']],
   c: [['Rencontre', 30, 'Rencontre par équipes, officiée par les élèves ; résultats affichés au fur et à mesure.', 'Je concours, j\'officie et j\'encourage.', '', 'ateliers:athle:4']],
   r: [['Retour au calme', 5, 'Résultats et remise des prix.', 'etirements']]},
  {t: 'Évaluation : projet et performance', o: 'Évaluer ses performances, son rôle dans l\'organisation et son autonomie.', comp: ['HSC1', 'HSC2', 'GSS1'], e: [
    ['Échauffement en autonomie', 7, 'Chacun s\'échauffe seul.', 'files'],
    ['Consignes', 3, 'Épreuves finales.', 'explication']],
   c: [['Épreuves finales', 25, 'Chacun fait 2 essais dans ses épreuves ; comparaison avec les tests de départ.', 'Je progresse depuis le début du cycle.', '', 'ateliers:athle:4'],
    ['Bilan des commissions', 5, 'Chaque commission évalue son travail.', '', '', 'explication']],
   r: [['Bilan écrit', 5, 'Bilan individuel : performances, rôle, ce que j\'ai appris.', 'explication']]}
]}
}});
