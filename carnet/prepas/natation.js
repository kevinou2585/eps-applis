/* Natation : 6 leçons par année (1re → 6e secondaire). Groupes de niveau conseillés (couloirs facile / moyen / fort).
   Sécurité à chaque leçon : comptage des élèves à l'entrée et à la sortie, un prof au bord, pas de plongeon en petite profondeur. */
PREPA_ADD({id: 'natation', sport: 'Natation', mat: 'Planches, pull-buoys, frites, anneaux lestés, lignes d\'eau, chronomètre, tableau des groupes, sifflet.', an: {
1: {th: 'Être à l\'aise et en sécurité dans l\'eau : flotter, glisser, crawl et dos', comp: ['HME1', 'HME4', 'GSS1', 'GSS2'], l: [
  {t: 'Test de départ et règles de sécurité', o: 'Connaître les règles de la piscine ; se situer (groupe de niveau) par un test simple.', comp: ['HME1', 'GSS2', 'GSS3', 'GSS4'], e: [
    ['Règles et entrée dans l\'eau', 5, 'Au bord : règles (on ne court pas, on attend le signal, on sort quand le prof siffle 3 fois). Entrée par l\'échelle ou assis au bord ; on se mouille la nuque.', 'explication'],
    ['Marche et déplacements', 5, 'En petite profondeur : marcher, sauter, souffler dans l\'eau (bulles), mettre la tête sous l\'eau 3 secondes.', 'piscine:sp:flotte']],
   c: [['Test de niveau', 15, 'Chacun nage 25 m comme il peut (sans aide), puis le plus loin possible en 3 minutes. Le prof note la distance et la façon de nager pour former 3 groupes (couloirs).', 'Je nage 25 m sans m\'arrêter (groupe moyen) ; 100 m (groupe fort).', 'Élèves en difficulté : test en petite profondeur avec frite.', 'piscine:sp:aller'],
    ['Flotter et récupérer', 10, 'Étoile de mer sur le ventre puis sur le dos (5 s, 10 s) ; se remettre debout seul.', 'Je flotte 10 s sur le dos sans aide.', 'Avec une frite sous la nuque.', 'piscine:sp:flotte']],
   r: [['Jeu calme', 5, 'Le « ramasse-anneaux » en petite profondeur ; sortie de l\'eau en comptant les élèves.', 'piscine:sp:flotte']]},
  {t: 'Flotter, glisser, souffler', o: 'Réaliser une coulée ventrale (« flèche ») et souffler dans l\'eau en rythme.', e: [
    ['Bulles et rythme', 5, 'Au bord : inspirer par la bouche, souffler longtemps dans l\'eau par la bouche et le nez, 10 fois.', 'piscine:sp:flotte'],
    ['Battements au bord', 5, 'Tenant le bord : battements de jambes tendues, pieds en extension, en soufflant dans l\'eau.', 'piscine:sp:flotte']],
   c: [['La flèche', 10, 'Pousser au mur, bras tendus derrière la tête, oreilles entre les bras : glisser le plus loin possible.', 'Je glisse 4 m sans bouger.', 'Flèche sur le dos.', 'piscine:sp:plongeon'],
    ['Planche et battements', 10, 'Planche tenue bras tendus : battements jusqu\'à l\'autre bord, visage dans l\'eau, on lève la tête pour respirer.', 'Je fais 15 m avec la planche.', 'Planche sous le ventre pour les plus faibles.', 'piscine:sp:flotte'],
    ['Relais planche', 5, 'Équipes de 4 par couloir de niveau : chacun fait 1 largeur (ou 12,5 m) en battements avec planche, visage dans l\'eau, puis tape la main du suivant. On recommence en changeant l\'ordre.', 'Je garde les jambes tendues et je souffle dans l\'eau pendant mon relais.', '', 'piscine:sp:relais']],
   r: [['Flottaison détente', 5, 'Étoile de mer sur le dos, respiration calme ; sortie et comptage.', 'piscine:sp:flotte']]},
  {t: 'Les bras du crawl', o: 'Tirer avec un bras puis l\'autre, main qui entre devant l\'épaule et pousse jusqu\'à la cuisse.', e: [
    ['Échauffement nage libre', 5, '2 longueurs à son rythme dans son couloir de niveau.', 'piscine:sp:aller'],
    ['Battements planche', 5, '2 longueurs de battements avec planche.', 'piscine:sp:flotte']],
   c: [['Bras debout', 5, 'Debout en petite profondeur, buste penché : bras de crawl en alternance, la main sort près de la cuisse.', 'Ma main sort près de la cuisse.', '', 'piscine:sp:flotte'],
    ['Rattrapé', 10, 'Planche tenue devant : un bras tire, revient sur la planche, puis l\'autre bras.', 'Je fais 15 m en rattrapé.', 'Sans planche.', 'piscine:sp:aller'],
    ['Crawl complet', 10, 'Crawl sur 25 m avec respiration quand on en a besoin ; les groupes forts : 4 × 25 m.', 'Je fais 25 m de crawl sans m\'arrêter.', 'Pull-buoy entre les jambes.', 'piscine:sp:aller']],
   r: [['Retour', 5, 'Nage libre lente, puis flottaison ; sortie et comptage.', 'piscine:sp:flotte']]},
  {t: 'Respirer sur le côté', o: 'Respirer sur le côté en crawl, sans lever la tête vers l\'avant.', e: [
    ['Bulles et rotation', 5, 'Tenant le bord : souffler dans l\'eau, tourner la tête sur le côté pour inspirer, oreille dans l\'eau.', 'piscine:sp:flotte'],
    ['Nage libre', 5, '2 longueurs à son rythme.', 'piscine:sp:aller']],
   c: [['Battements sur le côté', 10, 'Un bras tendu devant, l\'autre le long du corps, battements sur le côté ; tourner la tête pour respirer.', 'Je respire sans m\'arrêter.', 'Avec palmes.', 'piscine:sp:aller'],
    ['Respiration tous les 2 ou 3 temps', 10, 'Crawl en respirant tous les 2 temps, puis tous les 3 temps pour les plus à l\'aise.', 'Je nage 25 m en respirant sur le côté.', '', 'piscine:sp:aller'],
    ['Relais crawl', 5, 'Équipes de 4 par couloir : relais 4 × 25 m crawl (12,5 m pour le groupe facile, planche autorisée). Départ dans l\'eau, on touche le mur avant que le suivant parte.', 'Je nage mon relais sans m\'arrêter, en soufflant dans l\'eau.', '', 'piscine:sp:relais']],
   r: [['Retour', 5, 'Flottaison sur le dos.', 'piscine:sp:flotte']]},
  {t: 'Le dos crawlé et la sécurité', o: 'Nager sur le dos (dos crawlé) ; savoir se reposer et appeler à l\'aide.', comp: ['HME1', 'HME4', 'GSS2'], e: [
    ['Flottaison dorsale', 5, 'Étoile de mer sur le dos, puis battements sur le dos avec planche sur le ventre.', 'piscine:sp:flotte'],
    ['Nage libre', 5, '2 longueurs.', 'piscine:sp:aller']],
   c: [['Dos crawlé', 12, 'Battements sur le dos, puis bras alternés : le bras sort tendu par le pouce, entre par le petit doigt.', 'Je fais 25 m de dos sans m\'arrêter.', 'Un bras seulement.', 'piscine:sp:aller'],
    ['Survie', 10, 'Faire la planche, faire du « surplace » (godille et pédalage) 30 s, lever un bras pour appeler à l\'aide.', 'Je tiens 30 s sur place.', 'En grande profondeur pour le groupe fort.', 'piscine:sp:flotte']],
   r: [['Retour', 5, 'Jeu calme et comptage.', 'piscine:sp:flotte']]},
  {t: 'Évaluation : nager et être en sécurité', o: 'Montrer ses progrès : distance nagée, crawl, dos, flottaison.', comp: ['HME1', 'GSS1', 'GSS2', 'GSS4'], e: [
    ['Échauffement', 6, '4 longueurs libres dans son couloir.', 'piscine:sp:aller'],
    ['Rappel des consignes', 4, 'Au bord : explication des épreuves (ce qui est observé, l\'ordre de passage par couloir) et rappel des règles de sécurité.', 'explication']],
   c: [['Épreuve 1 : distance', 12, 'Nager le plus loin possible en 5 minutes (on peut changer de nage, pas s\'arrêter au bord).', 'J\'améliore la distance du test de départ.', '', 'piscine:sp:aller'],
    ['Épreuve 2 : technique', 10, '25 m crawl et 25 m dos observés ; flottaison 15 s.', 'Respiration sur le côté et corps allongé.', '', 'piscine:sp:aller']],
   r: [['Bilan', 5, 'Chacun compare son résultat avec son test de départ (distance, aide utilisée) et dit ce qu\'il a appris à faire.', 'explication']]}
]},
2: {th: 'Nager mieux et plus longtemps : crawl, dos, brasse, entrées dans l\'eau', comp: ['HME1', 'HME4', 'GSS1', 'GSS2'], l: [
  {t: 'Test et crawl allongé', o: 'Nager un crawl allongé, respiration régulière ; se situer par un test de 100 m.', e: [
    ['Échauffement', 5, '4 longueurs libres.', 'piscine:sp:aller'],
    ['Battements', 5, 'Battements planche, visage dans l\'eau.', 'piscine:sp:flotte']],
   c: [['Test 100 m', 10, '100 m chronométré dans la nage de son choix ; formation des groupes.', 'Je nage 100 m sans m\'arrêter.', '50 m pour les débutants.', 'piscine:sp:aller'],
    ['Crawl allongé', 15, '4 × 25 m : compter ses mouvements de bras par longueur et essayer d\'en faire moins (bras qui glisse devant).', 'Je fais 2 mouvements de moins qu\'au début.', 'Avec pull-buoy.', 'piscine:sp:aller']],
   r: [['Retour', 5, 'Dos lent et flottaison.', 'piscine:sp:flotte']]},
  {t: 'La brasse : les jambes', o: 'Réaliser le mouvement de jambes de brasse (pieds en flexion, ciseaux en arc).', e: [
    ['Échauffement', 5, '4 longueurs libres.', 'piscine:sp:aller'],
    ['Jambes au bord', 5, 'Assis au bord puis tenant le bord : mouvement de grenouille, pieds en « canard ».', 'piscine:sp:flotte']],
   c: [['Jambes de brasse planche', 12, '4 × 15 m jambes de brasse avec planche ; glisser 2 secondes après chaque poussée.', 'Je avance de 1 m à chaque coup de jambes.', 'Sur le dos.', 'piscine:sp:flotte'],
    ['Bras + jambes', 8, 'Coordination : tirer des bras (inspiration), pousser des jambes, glisser.', 'Je fais 15 m de brasse coordonnée.', '', 'piscine:sp:aller'],
    ['Relais 4 nages simples', 5, 'Équipes de 3 par couloir : le 1er nage 25 m crawl, le 2e 25 m dos, le 3e 25 m brasse. Deux tours en changeant de nage à chaque tour. Départ dans l\'eau.', 'Je nage la nage demandée sans la mélanger avec une autre.', '', 'piscine:sp:relais']],
   r: [['Retour', 5, 'Flottaison.', 'piscine:sp:flotte']]},
  {t: 'Entrées dans l\'eau et plongeon', o: 'Entrer dans l\'eau tête la première depuis le bord (grande profondeur) en toute sécurité.', comp: ['HME1', 'HME3', 'GSS2', 'GSS3'], e: [
    ['Sauts', 5, 'Sauts pieds en premier en grande profondeur, remonter et rejoindre le bord.', 'piscine:sp:plongeon'],
    ['Nage libre', 5, '2 longueurs.', 'piscine:sp:aller']],
   c: [['Plongeon assis puis à genoux', 10, 'Bras tendus, tête entre les bras, regarder le fond : glisser dans l\'eau assis, puis à genoux.', 'J\'entre mains en premier.', '', 'piscine:sp:plongeon'],
    ['Plongeon debout', 10, 'Debout, jambes fléchies, bras tendus : plongeon et coulée.', 'Je plonge et glisse 3 m.', 'Plongeon + 15 m de crawl.', 'piscine:sp:plongeon']],
   r: [['Retour', 5, 'Jeu calme ; règle : jamais de plongeon en petite profondeur.', 'piscine:sp:flotte']]},
  {t: 'Le virage simple', o: 'Faire demi-tour au mur sans s\'arrêter (virage main-mur) et repartir en coulée.', e: [
    ['Échauffement', 5, '4 longueurs.', 'piscine:sp:aller'],
    ['Coulées', 5, 'Pousser au mur et glisser.', 'piscine:sp:plongeon']],
   c: [['Virage main-mur', 12, 'Toucher le mur, ramener les genoux, pivoter, pieds au mur, pousser en coulée.', 'Je repars en moins de 3 secondes.', 'Virage culbute (initiation) pour les forts.', 'piscine:sp:aller'],
    ['50 m avec virage', 10, '4 × 50 m crawl ou dos avec 30 s de repos. À chaque mur : virage simple (toucher, tourner, repousser en flèche). Le partenaire au bord vérifie la poussée.', 'Je repousse le mur en flèche à chaque virage, sans m\'accrocher au bord.', '', 'piscine:sp:aller']],
   r: [['Retour', 5, 'Dos lent.', 'piscine:sp:flotte']]},
  {t: 'Nager longtemps à son rythme', o: 'Nager 200 m sans arrêt en gérant sa respiration.', comp: ['HME1', 'GSS1', 'GSS3'], e: [
    ['Échauffement', 5, '4 longueurs.', 'piscine:sp:aller'],
    ['Respiration', 5, 'Crawl respiration 3 temps.', 'piscine:sp:aller']],
   c: [['Nage continue', 15, 'Nager 6 à 10 minutes sans s\'arrêter (changer de nage si besoin).', 'Je nage 200 m sans m\'arrêter.', '', 'piscine:sp:aller'],
    ['Relais par équipes', 10, 'Équipes de 4 équilibrées (un nageur fort, deux moyens, un facile) : relais 4 × 25 m, chacun choisit sa nage. Deux manches ; les équipes discutent de l\'ordre entre les manches.', 'Mon équipe termine le relais sans faute de passage (on ne part qu\'après le toucher).', '', 'piscine:sp:relais']],
   r: [['Retour', 5, 'Flottaison.', 'piscine:sp:flotte']]},
  {t: 'Évaluation : 3 nages et distance', o: 'Montrer crawl, dos, brasse et une distance continue.', comp: ['HME1', 'GSS1', 'GSS2', 'GSS4'], e: [
    ['Échauffement', 6, '4 longueurs.', 'piscine:sp:aller'],
    ['Consignes', 4, 'Au bord : ordre de passage, ce que le prof observe pour chaque nage, rôle du partenaire qui compte les longueurs et chronomètre.', 'explication']],
   c: [['Épreuve 1 : 3 nages', 12, 'Chaque élève nage 25 m crawl, 25 m dos et 25 m brasse, avec 1 minute de repos entre chaque. Le prof observe avec la grille (respiration, position du corps, jambes).', 'Je nage les 3 × 25 m sans m\'arrêter, avec la bonne technique de jambes en brasse.', '', 'piscine:sp:aller'],
    ['Épreuve 2 : 200 m', 10, '200 m chronométrés, nage au choix, sans s\'arrêter ni toucher le fond. Le partenaire au bord compte les longueurs et note le temps.', 'Je nage 200 m sans arrêt ; je connais mon temps.', '', 'piscine:sp:aller']],
   r: [['Bilan', 5, 'Chacun compare son 200 m et ses nages avec le test de la 1re leçon et note un objectif pour l\'année suivante.', 'explication']]}
]},
3: {th: 'Perfectionner et survivre : brasse coordonnée, plongeon canard, nage habillée', comp: ['HME1', 'HME4', 'GSS1', 'GSS2'], l: [
  {t: 'Brasse coordonnée', o: 'Enchaîner bras-respiration-jambes-glisse en brasse.', e: [
    ['Échauffement', 5, '200 m au choix (crawl, dos, brasse) à allure facile, en changeant de nage tous les 50 m.', 'piscine:sp:aller'],
    ['Jambes planche', 5, '2 × 25 m jambes de brasse avec planche : pieds en « crochet », talons vers les fesses, fouetter et serrer ; le partenaire au bord vérifie la symétrie.', 'piscine:sp:flotte']],
   c: [['« Tire, souffle, pousse, glisse »', 12, '4 × 25 m brasse en comptant ses cycles : bras (tire), inspiration (souffle), jambes (pousse), glisse 1 seconde bras tendus. À chaque 25 m, essayer de faire 1 cycle de moins.', 'Je fais au moins 2 cycles de moins entre le 1er et le 4e 25 m grâce à la glisse.', '', 'piscine:sp:aller'],
    ['100 m brasse', 10, '100 m brasse en continu à allure régulière. Le partenaire au bord vérifie que les pieds sont en « crochet » (pieds de canard) et compte les cycles par longueur.', 'Je nage 100 m brasse sans m\'arrêter, jambes symétriques.', '', 'piscine:sp:aller']],
   r: [['Retour', 5, '100 m de dos lent ; chacun dit combien de cycles il a gagnés grâce à la glisse.', 'piscine:sp:flotte']]},
  {t: 'Le plongeon canard et l\'apnée', o: 'Descendre en profondeur pour aller chercher un objet (canard).', comp: ['HME1', 'HME3', 'GSS2', 'GSS3'], e: [
    ['Apnée statique', 5, 'Tenant le bord : 10 s puis 15 s la tête sous l\'eau.', 'piscine:sp:flotte'],
    ['Nage libre', 5, '4 longueurs à allure facile, dont 1 longueur en expirant longuement sous l\'eau à chaque cycle.', 'piscine:sp:aller']],
   c: [['Canard', 12, 'Nager, plier le buste, jambes vers le ciel, descendre ; ramasser un anneau à 2 m.', 'Je ramène l\'anneau.', 'Deux anneaux.', 'piscine:sp:flotte'],
    ['Parcours sous-marin', 10, 'Dans le grand bain, passer sous 3 frites ou cerceaux lestés espacés de 3 m, en coulée ventrale, puis remonter. Par 2 : un nage, l\'autre surveille au bord.', 'Je passe sous les 3 obstacles sans remonter entre eux.', '', 'piscine:sp:aller']],
   r: [['Retour', 5, 'Flottaison sur le dos 1 minute, bras écartés, respiration lente ; sortie de l\'eau en comptant les élèves.', 'piscine:sp:flotte']]},
  {t: 'Nage habillée et survie', o: 'Nager habillé, se reposer, se déshabiller dans l\'eau, appeler à l\'aide (prévention noyade).', comp: ['HME1', 'GSS2', 'GSS3'], e: [
    ['Explication', 5, 'Pourquoi c\'est difficile ? Les vêtements alourdissent ; garder son calme.', 'explication'],
    ['Entrée habillé', 5, 'Saut pieds en premier avec T-shirt et pantalon de training.', 'piscine:sp:plongeon']],
   c: [['Nager habillé', 10, 'Avec t-shirt et short long apportés : 25 m brasse habillé, puis 1 minute de flottaison sur le dos, puis retirer le t-shirt dans l\'eau. Discussion : pourquoi c\'est plus dur, que faire si on tombe à l\'eau.', 'Je nage 25 m habillé et je flotte 1 minute sans paniquer.', '', 'piscine:sp:aller'],
    ['Surplace et déshabillage', 12, 'Surplace 1 minute, enlever son T-shirt dans l\'eau, faire une bouée avec son pantalon (pour les forts).', 'Je tiens 1 minute.', '', 'piscine:sp:flotte']],
   r: [['Retour', 5, 'Au bord, en cercle : ce qu\'on retient en cas de chute dans l\'eau (garder ses vêtements, flotter, appeler, ne pas nager contre le courant).', 'explication']]},
  {t: 'Crawl rapide et départ plongé', o: 'Nager vite sur 25 m avec départ plongé.', e: [
    ['Échauffement', 5, '200 m : 100 m crawl facile, 50 m dos, 50 m crawl en accélérant sur les 10 derniers mètres.', 'piscine:sp:aller'],
    ['Plongeons', 5, 'Grand bain uniquement : départ assis, puis à genoux, puis debout, bras tendus au-dessus de la tête ; coulée de 5 m avant de nager. Petite profondeur : départ du mur dans l\'eau.', 'piscine:sp:plongeon']],
   c: [['Sprints 25 m', 12, '6 × 25 m à allure maximale dans sa nage préférée, 30 s de repos entre chaque. Le partenaire chronomètre les 1er, 3e et 6e passages.', 'Mon temps du 6e 25 m n\'est pas plus de 3 s au-dessus du 1er.', '', 'piscine:sp:aller'],
    ['Relais 4 × 25 m', 10, 'Équipes de 4 par couloir : relais crawl. Départ plongé pour les élèves qui le maîtrisent (grand bain uniquement), sinon départ dans l\'eau. Le suivant plonge quand le nageur touche le mur.', 'Je pars au bon moment, ni trop tôt ni trop tard.', '', 'piscine:sp:relais']],
   r: [['Retour', 5, '100 m de nage lente au choix pour récupérer, puis étirements des épaules au bord.', 'piscine:sp:flotte']]},
  {t: 'Nage longue : 400 m', o: 'Nager 400 m en régulant son allure.', comp: ['HME1', 'GSS1', 'GSS3'], e: [
    ['Échauffement', 5, '100 m facile puis 4 × 25 m en augmentant l\'allure.', 'piscine:sp:aller'],
    ['Allure', 5, '3 × 50 m : nager « facile » (on pourrait parler), « moyen », « vite » ; chacun repère son temps à chaque allure avec l\'horloge.', 'piscine:sp:aller']],
   c: [['400 m', 15, 'Nage continue ; le partenaire au bord note le temps à chaque 100 m.', 'Mes 100 m sont réguliers.', '', 'piscine:sp:aller'],
    ['Jeu', 10, 'Water-polo simplifié en petite profondeur : 2 équipes de 4-5, ballon souple, but = toucher le bord adverse avec le ballon. On ne garde pas le ballon plus de 3 s ; pas de contact.', 'Je fais des passes et je me déplace pour être démarqué.', '', 'piscine:sp:relais']],
   r: [['Retour', 5, 'Flottaison sur le dos et relâchement ; on note dans quelle allure on tiendrait 400 m.', 'piscine:sp:flotte']]},
  {t: 'Évaluation', o: 'Montrer brasse coordonnée, canard, survie et nage longue.', comp: ['HME1', 'GSS1', 'GSS2', 'GSS4'], e: [
    ['Échauffement', 6, '200 m à allure facile, dont 50 m de brasse coordonnée.', 'piscine:sp:aller'],
    ['Consignes', 4, 'Au bord : ordre des épreuves (brasse coordonnée, canard, 400 m), rôle du partenaire (compter, chronométrer), critères observés.', 'explication']],
   c: [['Épreuve 1 : parcours de sauvetage', 12, 'Plonger, nager 25 m, canard pour un anneau, revenir sur le dos.', 'Parcours complet.', '', 'piscine:sp:aller'],
    ['Épreuve 2 : 400 m', 10, '400 m chronométrés, nage(s) au choix, sans arrêt. Le partenaire compte les longueurs, note le temps au 200 m et à l\'arrivée.', 'Je nage 400 m sans m\'arrêter et mes deux 200 m sont proches.', '', 'piscine:sp:aller']],
   r: [['Bilan', 5, 'Auto-évaluation sur la fiche (brasse, canard, survie, 400 m) puis comparaison avec la note du prof.', 'explication']]}
]},
4: {th: 'Nager efficacement : virage culbute, papillon, sauvetage', comp: ['HME1', 'HME4', 'GSS1', 'GSS2'], l: [
  {t: 'Le virage culbute', o: 'Réaliser une culbute au mur en crawl et repartir sur le ventre.', e: [
    ['Échauffement', 5, '200 m crawl facile, avec un virage simple à chaque mur.', 'piscine:sp:aller'],
    ['Roulades', 5, 'Au milieu du bassin, debout : roulades avant en soufflant par le nez, menton sur la poitrine, genoux groupés ; 5 roulades, puis roulade après 3 mouvements de crawl.', 'piscine:sp:flotte']],
   c: [['Culbute au mur', 12, 'Arriver en crawl, roulade, pieds au mur, pousser sur le dos puis tourner.', 'Je culbute sans m\'arrêter.', '', 'piscine:sp:aller'],
    ['100 m avec culbutes', 10, '2 × 100 m crawl avec 1 minute de repos, culbute à chaque mur (ou virage simple pour ceux qui n\'y arrivent pas encore). Le partenaire compte les culbutes réussies.', 'Je réussis au moins 3 culbutes sur 4 virages.', '', 'piscine:sp:aller']],
   r: [['Retour', 5, '100 m de dos lent ; chacun dit à quelle distance du mur il commence sa culbute.', 'piscine:sp:flotte']]},
  {t: 'Le papillon : l\'ondulation', o: 'Onduler comme un dauphin, puis ajouter les bras.', e: [
    ['Échauffement', 5, '200 m au choix, dont 50 m de crawl avec respiration tous les 3 temps.', 'piscine:sp:aller'],
    ['Ondulations', 5, 'Ondulations sous l\'eau bras tendus devant, après une poussée au mur : la vague part de la poitrine ; 4 × 10 m.', 'piscine:sp:aller']],
   c: [['Ondulation avec palmes', 10, '4 × 15 m d\'ondulation sur le ventre avec palmes, bras devant tendus ; la vague part de la poitrine, pas des genoux. Retour en nage libre.', 'Je fais 15 m d\'ondulation en gardant les genoux peu fléchis.', '', 'piscine:sp:aller'],
    ['Papillon un bras', 10, '4 × 15 m : un bras seul (l\'autre devant), puis l\'autre bras, puis 2 bras sur quelques cycles, avec 2 ondulations par mouvement de bras.', 'J\'enchaîne 3 cycles de papillon complet.', '', 'piscine:sp:aller'],
    ['Relais', 5, 'Relais 4 nages par équipes de 4 : dos, brasse, papillon (ou crawl pour ceux qui ne le maîtrisent pas), crawl ; 25 m chacun, départ dos dans l\'eau.', 'Je nage ma partie dans la bonne nage et je respecte l\'ordre.', '', 'piscine:sp:relais']],
   r: [['Retour', 5, 'Flottaison sur le dos et étirements des épaules au bord.', 'piscine:sp:flotte']]},
  {t: 'Le sauvetage : remorquage', o: 'Remorquer un camarade sur 15 m en toute sécurité.', comp: ['HME1', 'HSC2', 'GSS2'], e: [
    ['Échauffement', 5, '200 m au choix, dont 50 m de crawl tête hors de l\'eau (comme pour surveiller une victime).', 'piscine:sp:aller'],
    ['Rétropédalage', 5, 'Nager sur le dos avec des jambes de brasse, mains sur le ventre, sur 2 × 25 m : c\'est la nage du remorquage.', 'piscine:sp:aller']],
   c: [['Remorquage', 12, 'Le « noyé » sur le dos, le sauveteur tient le menton et nage sur le dos.', 'Je remorque 15 m.', 'Avec frite ou bouée.', 'piscine:sp:relais'],
    ['Parcours sauvetage', 10, 'Canard, remonter un mannequin (ou planche lestée), remorquage.', '', '', 'piscine:sp:aller']],
   r: [['Retour', 5, 'Au bord : règles d\'alerte (appeler le 112, dire où on est, ce qui s\'est passé, combien de victimes) ; jeu de rôle d\'un appel.', 'explication']]},
  {t: 'Entraînement par intervalles', o: 'Nager des séries avec temps de départ (fractionné).', comp: ['HME1', 'GSS1', 'GSS5'], e: [
    ['Échauffement', 5, '200 m facile, dont 4 × 25 m en accélération progressive.', 'piscine:sp:aller'],
    ['Lecture de l\'horloge', 5, 'Explication de l\'horloge de la piscine : partir « toutes les 45 s » = repos = 45 s moins son temps de nage. Essai sur 4 × 25 m.', 'explication']],
   c: [['Série', 20, '8 × 50 m départ toutes les 1 min 15 (adapter par groupe).', 'Je tiens toute la série.', '', 'piscine:sp:aller']],
   r: [['Retour', 5, '100 m souple au choix ; chacun note dans le carnet le temps de départ qu\'il a tenu.', 'piscine:sp:flotte']]},
  {t: '4 nages et relais', o: 'Enchaîner les 4 nages (papillon, dos, brasse, crawl) en relais.', e: [
    ['Échauffement', 5, '200 m : 50 m de chaque nage à allure facile.', 'piscine:sp:aller'],
    ['Nages', 5, '25 m de chaque nage dans l\'ordre du 4 nages (papillon ou ondulation, dos, brasse, crawl) ; on vérifie les virages entre nages.', 'piscine:sp:aller']],
   c: [['Relais 4 nages', 20, 'Équipes de 4 ; on change d\'ordre à chaque course.', 'Mon passage de relais est correct.', '', 'piscine:sp:relais']],
   r: [['Retour', 5, 'Flottaison sur le dos ; rappel de l\'ordre des nages du relais (dos, brasse, papillon, crawl).', 'piscine:sp:flotte']]},
  {t: 'Évaluation', o: 'Montrer culbute, papillon (ou ondulation), sauvetage et série.', comp: ['HME1', 'GSS1', 'GSS2', 'GSS4'], e: [
    ['Échauffement', 6, '200 m au choix, dont 2 culbutes et 2 × 15 m d\'ondulation.', 'piscine:sp:aller'],
    ['Consignes', 4, 'Au bord : choix de l\'épreuve 1 par chaque élève, ordre de passage, déroulement du parcours de sauvetage.', 'explication']],
   c: [['Épreuve 1 : 100 m 4 nages ou 100 m crawl avec culbutes', 10, 'Au choix de l\'élève : 100 m 4 nages ou 100 m crawl avec culbutes. Le prof observe la technique avec la grille ; le partenaire chronomètre.', 'Je termine l\'épreuve choisie avec des virages corrects.', '', 'piscine:sp:aller'],
    ['Épreuve 2 : sauvetage', 12, 'Partir du bord, nager 15 m, faire un canard pour ramasser un mannequin ou un anneau lesté au fond, puis remorquer un camarade sur 15 m (prise sous les aisselles, nage sur le dos).', 'Je remonte l\'objet et je remorque 15 m en gardant le visage du camarade hors de l\'eau.', '', 'piscine:sp:relais']],
   r: [['Bilan', 5, 'Auto-évaluation sur la fiche (culbute, papillon, sauvetage, série) et comparaison avec la note du prof.', 'explication']]}
]},
5: {th: 'S\'entraîner et sauver : planifier une séance, sauvetage et premiers secours, water-polo', comp: ['HME1', 'HSC2', 'GSS1', 'GSS2', 'GSS5'], l: [
  {t: 'Construire sa séance', o: 'Construire une séance (échauffement, série, retour au calme) et la nager.', e: [
    ['Échauffement personnel', 6, 'Chacun suit son échauffement écrit.', 'piscine:sp:aller'],
    ['Lecture de la fiche', 4, 'Le prof présente un exemple de séance écrite (échauffement 300 m, série 6 × 50 m départ toutes les 1 min 15, retour au calme 100 m) et explique comment l\'adapter.', 'explication']],
   c: [['Ma séance', 20, 'Chaque élève nage la série qu\'il a construite (ex. 6 × 100 m) et note ses temps.', 'Ma séance est cohérente et réalisée.', '', 'piscine:sp:aller']],
   r: [['Bilan', 5, 'Chacun note dans son carnet ce qu\'il a réalisé, ses temps et ses sensations (de 1 à 10).', 'explication']]},
  {t: 'Sauvetage et premiers secours', o: 'Sortir une victime de l\'eau et réaliser la position latérale de sécurité (PLS).', comp: ['HSC2', 'GSS2'], e: [
    ['Échauffement', 5, '200 m au choix, dont 50 m de brasse tête hors de l\'eau.', 'piscine:sp:aller'],
    ['Rappel', 5, 'Au bord : la chaîne de secours (protéger, alerter le 112, secourir) et la position latérale de sécurité montrée par le prof.', 'explication']],
   c: [['Sortie de l\'eau', 10, 'Par 2 au bord en petite profondeur : amener le camarade dos au mur, lui tenir les poignets croisés, le hisser et l\'asseoir au bord en le faisant pivoter. Inverser les rôles.', 'Je sors mon camarade de l\'eau sans lui cogner la tête ni le dos.', '', 'piscine:sp:relais'],
    ['PLS et RCP', 12, 'Au bord : PLS, et gestes de réanimation sur mannequin si disponible.', 'Je fais la PLS correctement.', '', 'explication']],
   r: [['Retour', 5, 'Questions : que faire si la victime ne respire pas ? Qui appeler ? Rappel : on ne se met jamais en danger soi-même.', 'explication']]},
  {t: 'Water-polo', o: 'Jouer collectivement dans l\'eau : passes, nage tête hors de l\'eau.', comp: ['HME1', 'HME2', 'HSC1', 'HSC2'], e: [
    ['Crawl tête hors de l\'eau', 5, '2 × 25 m crawl tête hors de l\'eau, regard vers l\'avant, comme pour suivre le ballon.', 'piscine:sp:aller'],
    ['Passes', 5, 'Par deux dans l\'eau à 3 m : passes à une main en restant à flot (rétropédalage), puis en se déplaçant.', 'piscine:sp:relais']],
   c: [['Matchs', 20, '4 contre 4 en largeur ; buts flottants ou caisses.', 'Je fais des passes.', '', 'piscine:sp:relais']],
   r: [['Retour', 5, 'Flottaison sur le dos et récupération ; bilan sur l\'esprit d\'équipe.', 'piscine:sp:flotte']]},
  {t: 'Test de Cooper aquatique', o: 'Nager le plus loin possible en 12 minutes et estimer sa forme.', comp: ['HME1', 'GSS1', 'GSS5'], e: [
    ['Échauffement', 6, '200 m progressif : 50 m facile, 50 m moyen, 50 m facile, 50 m moyen.', 'piscine:sp:aller'],
    ['Consignes', 4, 'Explication du test de 12 minutes : partir à une allure tenable, le partenaire compte les longueurs à chaque 3 minutes.', 'explication']],
   c: [['12 minutes', 15, 'Nager 12 minutes sans arrêt, nage au choix. Le partenaire compte les longueurs et note le nombre de longueurs à chaque 3 minutes pour vérifier la régularité.', 'Je nage 12 minutes sans arrêt avec des tranches de 3 minutes régulières.', '', 'piscine:sp:aller'],
    ['Analyse', 5, 'Chacun calcule sa distance et la compare au tableau de référence (âge, sexe). On identifie sa principale faiblesse (souffle, technique, départ trop rapide).', 'Je situe mon résultat et je dis ce que je veux améliorer.', '', 'explication']],
   r: [['Retour', 5, '100 m de nage souple ; chacun prend son pouls après 1 minute de récupération.', 'piscine:sp:flotte']]},
  {t: 'Nage avec palmes et apnée dynamique', o: 'Découvrir la nage avec palmes et l\'apnée en sécurité (binôme).', comp: ['HME1', 'GSS2', 'GSS3'], e: [
    ['Échauffement', 5, '200 m au choix, dont 2 × 25 m d\'ondulation.', 'piscine:sp:aller'],
    ['Règles de l\'apnée', 5, 'Toujours en binôme, jamais d\'hyperventilation.', 'explication']],
   c: [['Palmes', 10, '4 × 50 m avec palmes, 30 s de repos : crawl, dos, ondulation sur le dos, au choix. Accent sur le gainage et l\'allongement.', 'Je garde le corps aligné et je respire régulièrement.', '', 'piscine:sp:aller'],
    ['Apnée dynamique', 10, 'Encadrée : nager 15 m sous l\'eau (brasse coulée ou ondulation). Un binôme au bord suit son partenaire des yeux tout le long. Jamais d\'hyperventilation avant ; 1 minute de repos entre chaque essai.', 'Je parcours 15 m sous l\'eau en restant calme ; je respecte les règles de sécurité.', '', 'piscine:sp:aller']],
   r: [['Retour', 5, 'Flottaison sur le dos, respiration lente ; rappel des règles de l\'apnée (jamais seul, jamais d\'hyperventilation).', 'piscine:sp:flotte']]},
  {t: 'Évaluation', o: 'Montrer sa séance, son sauvetage et sa performance.', comp: ['HME1', 'GSS1', 'GSS2', 'GSS5'], e: [
    ['Échauffement personnel', 6, 'Chacun réalise l\'échauffement écrit dans son carnet (environ 200 à 300 m).', 'piscine:sp:aller'],
    ['Consignes', 4, 'Au bord : ordre de passage, rôle du partenaire (vérifier la séance, chronométrer), déroulement du parcours de sauvetage.', 'explication']],
   c: [['Épreuve 1 : séance', 12, 'Chaque élève réalise la série d\'entraînement qu\'il a préparée (échauffement, série principale, récupération) ; le partenaire vérifie le respect des temps et des distances notés.', 'Je réalise ma séance comme prévue et je peux expliquer pourquoi je l\'ai construite ainsi.', '', 'piscine:sp:aller'],
    ['Épreuve 2 : sauvetage', 10, 'Parcours complet : entrée sautée, 25 m nage tête hors de l\'eau, canard et remontée d\'un objet, remorquage 15 m, sortie de l\'eau du camarade.', 'J\'enchaîne le parcours sans m\'arrêter et je sors mon camarade en sécurité.', '', 'piscine:sp:relais']],
   r: [['Bilan', 5, 'Auto-évaluation sur la fiche (séance, sauvetage, 12 minutes) et comparaison avec la note du prof.', 'explication']]}
]},
6: {th: 'Autonomie et santé : projet d\'entraînement personnel, sauvetage avancé', comp: ['HME1', 'GSS1', 'GSS2', 'GSS4', 'GSS5'], l: [
  {t: 'Diagnostic et projet', o: 'Choisir un objectif (santé, performance, sauvetage) et un plan sur 5 leçons.', e: [
    ['Échauffement libre', 6, '200 m à allure libre, en choisissant ses nages et son rythme.', 'piscine:sp:aller'],
    ['Présentation', 4, 'Le prof présente les projets possibles (performance sur 400 m, endurance 1 500 m, nouvelle nage, sauvetage, aquagym) et le carnet d\'entraînement.', 'explication']],
   c: [['Tests', 15, 'Deux tests : 400 m chronométrés (endurance) et 50 m le plus vite possible (vitesse). Le partenaire note les temps dans le carnet d\'entraînement.', 'Je connais mes deux temps de référence.', '', 'piscine:sp:aller'],
    ['Écriture du projet', 10, 'Chacun choisit un projet de 4 leçons (améliorer son 400 m, nager 1 500 m, apprendre le papillon, sauvetage, aquagym) et écrit dans son carnet : objectif chiffré, séances, moyens de vérifier.', 'Mon projet a un objectif chiffré et un plan pour 4 leçons.', '', 'explication']],
   r: [['Retour', 5, '100 m de nage souple ; chacun pense à son projet.', 'piscine:sp:flotte']]},
  {t: 'Séance projet 1', o: 'Réaliser sa séance et noter ses sensations.', e: [
    ['Échauffement personnel', 6, 'Chacun réalise l\'échauffement qu\'il a écrit dans son carnet.', 'piscine:sp:aller'],
    ['Objectif du jour', 4, 'Chacun relit l\'objectif de sa séance et le dit à son partenaire.', 'explication']],
   c: [['Séance personnelle', 25, 'Par groupes de projet, chacun dans son couloir : réalisation de la 1re séance écrite. Le prof passe dans chaque groupe et conseille ; chacun note ce qu\'il a réellement fait.', 'Je réalise ma séance et je la note dans le carnet.', '', 'piscine:sp:aller']],
   r: [['Carnet', 5, 'Chacun note dans le carnet ce qui était prévu, ce qui a été réalisé et ses sensations (de 1 à 10).', 'explication']]},
  {t: 'Sauvetage avancé', o: 'Enchaîner repérage, approche, dégagement, remorquage et sortie.', comp: ['HME1', 'HSC2', 'GSS2'], e: [
    ['Échauffement', 5, '200 m au choix, dont 50 m tête hors de l\'eau et 50 m de rétropédalage.', 'piscine:sp:aller'],
    ['Rappel', 5, 'Rappel de la chaîne de secours : repérer, alerter le 112, approcher, dégager, remorquer, sortir, position latérale de sécurité.', 'explication']],
   c: [['Parcours sauvetage complet', 25, 'Par 2, chronométré : entrée, 25 m nage tête hors de l\'eau, canard, remorquage 15 m, sortie du camarade. Le binôme inverse ensuite les rôles.', 'Je fais le parcours en sécurité et je cherche à améliorer mon temps.', '', 'piscine:sp:relais']],
   r: [['Retour', 5, 'Débriefing par binômes : ce qui a été difficile dans le parcours et comment gagner du temps sans perdre en sécurité.', 'explication']]},
  {t: 'Séance projet 2', o: 'Ajuster sa séance selon ses sensations.', e: [
    ['Échauffement personnel', 6, 'Chacun réalise l\'échauffement qu\'il a écrit dans son carnet.', 'piscine:sp:aller'],
    ['Objectif', 4, 'Chacun relit ses notes de la séance précédente et dit ce qu\'il change aujourd\'hui.', 'explication']],
   c: [['Séance personnelle', 25, 'Par groupes de projet : 2e séance, ajustée selon ce qui a été noté la fois précédente (plus de distance, plus vite, autre exercice).', 'J\'ajuste ma séance et j\'explique pourquoi.', '', 'piscine:sp:aller']],
   r: [['Carnet', 5, 'Notes dans le carnet : prévu, réalisé, sensations, et ce qu\'il faudra ajuster.', 'explication']]},
  {t: 'Aquagym et santé', o: 'Découvrir une activité aquatique de loisir pour la santé.', comp: ['HME4', 'HME5', 'GSS1', 'GSS5'], e: [
    ['Échauffement en musique', 5, 'En petite profondeur, en musique : marche dans l\'eau en avant, en arrière, sur le côté, avec mouvements de bras.', 'piscine:sp:flotte'],
    ['Mouvements', 5, 'Sauts groupés, rotations, battements de jambes au bord, mouvements de bras avec frite, en suivant le rythme de la musique.', 'piscine:sp:flotte']],
   c: [['Séance d\'aquagym', 20, 'En petite profondeur, en musique : un groupe d\'élèves mène une séance de 10 minutes (marche, sauts, mouvements de bras avec frites) préparée à l\'avance ; les autres suivent.', 'Nous menons la séance en donnant des consignes claires et en montrant les mouvements.', '', 'piscine:sp:flotte']],
   r: [['Retour', 5, 'Relaxation sur le dos avec frite sous la nuque et sous les genoux, 2 minutes.', 'piscine:sp:flotte']]},
  {t: 'Évaluation : projet', o: 'Réaliser le test final de son projet et l\'analyser.', comp: ['HME1', 'GSS1', 'GSS4', 'GSS5'], e: [
    ['Échauffement personnel', 6, 'Chacun réalise l\'échauffement prévu dans son carnet.', 'piscine:sp:aller'],
    ['Consignes', 4, 'Ordre de passage des tests selon les projets, rôle du partenaire qui chronomètre et vérifie.', 'explication']],
   c: [['Test final', 20, 'Chaque élève passe le test correspondant à son projet (ex. 400 m chronométré, 1 500 m, 25 m papillon, parcours de sauvetage) et compare au test de départ dans son carnet.', 'Je compare mon résultat final à mon point de départ et j\'explique la différence.', '', 'piscine:sp:aller']],
   r: [['Bilan', 5, 'Analyse écrite dans le carnet : résultat final, comparaison avec le test de départ, ce qui a marché et ce qu\'on ferait autrement.', 'explication']]}
]}
}});
