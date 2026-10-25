/* Natation · nageurs (grande profondeur) : 6 leçons par année (1re → 6e secondaire) ; en 1re, 2e et 3e, 2 cycles de plus (18 leçons) en bas du fichier. Groupe débutants : natdeb.js. Groupes de niveau conseillés (couloirs facile / moyen / fort).
   Sécurité à chaque leçon : comptage des élèves à l'entrée et à la sortie, un prof au bord, pas de plongeon en petite profondeur. */
(() => {
const N = ({id: 'natation', sport: 'Natation', mat: 'Planches, pull-buoys, frites, anneaux lestés, lignes d\'eau, chronomètre, tableau des groupes, sifflet.', an: {
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
  {t: 'Évaluation : nager et être en sécurité', o: 'Montrer ses progrès : distance nagée, crawl, dos, flottaison.', comp: ['HME1', 'GSS1', 'GSS2', 'GSS4'], crit: [['Distance en 5 minutes', 6, '6 : améliore nettement la distance du test de départ (au moins 2 longueurs de plus) · 4 : améliore d\'1 longueur · 2 : même distance · 1 : nage moins mais sans s\'arrêter'], ['25 m crawl : respiration sur le côté', 4, '4 : souffle dans l\'eau et inspire sur le côté sans lever la tête · 2 : respire en levant la tête · 0 : nage en apnée ou s\'arrête'], ['25 m crawl : corps allongé et jambes', 3, '3 : corps horizontal, battements depuis la hanche · 1 : jambes qui coulent · 0 : ne termine pas'], ['25 m dos', 4, '4 : corps allongé, oreilles dans l\'eau, bras tendus, 25 m sans arrêt · 2 : bassin assis ou arrêt · 0 : ne termine pas'], ['Flottaison 15 s', 3, '3 : 15 s sur le ventre ou le dos sans bouger · 1 : moins de 15 s · 0 : ne flotte pas']], e: [
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
  {t: 'Évaluation : 3 nages et distance', o: 'Montrer crawl, dos, brasse et une distance continue.', comp: ['HME1', 'GSS1', 'GSS2', 'GSS4'], crit: [['25 m crawl', 4, '4 : respiration latérale, corps allongé, sans arrêt · 2 : technique partielle · 0 : ne termine pas'], ['25 m dos', 4, '4 : corps allongé, bras tendus, sans arrêt · 2 : bassin assis · 0 : ne termine pas'], ['25 m brasse : jambes', 4, '4 : talons aux fesses, pieds en flexion, fouet symétrique · 2 : ciseaux ou pieds en extension · 0 : ne termine pas'], ['200 m sans arrêt', 6, '6 : 200 m sans s\'arrêter ni toucher le fond · 4 : 1 arrêt · 2 : 150 m · 1 : 100 m'], ['Connaître son temps', 2, '2 : connaît son temps et le compare au test de départ · 1 : connaît son temps · 0 : ne sait pas']], e: [
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
  {t: 'Évaluation', o: 'Montrer brasse coordonnée, canard, survie et nage longue.', comp: ['HME1', 'GSS1', 'GSS2', 'GSS4'], crit: [['Plongeon et 25 m', 4, '4 : entrée tête la première, 25 m sans arrêt · 2 : saut pieds puis 25 m · 0 : ne termine pas'], ['Canard et anneau', 4, '4 : canard en un mouvement, remonte l\'anneau du premier coup · 2 : 2 essais · 0 : ne remonte pas l\'anneau'], ['Retour sur le dos', 2, '2 : retour sur le dos sans arrêt, anneau tenu · 1 : avec arrêt · 0 : ne termine pas'], ['400 m sans arrêt', 7, '7 : 400 m sans arrêt · 5 : 1 arrêt · 3 : 300 m · 1 : 200 m'], ['Régularité (deux 200 m)', 3, '3 : écart de moins de 10 s entre les deux 200 m · 2 : moins de 20 s · 1 : plus de 20 s']], e: [
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
  {t: 'Évaluation', o: 'Montrer culbute, papillon (ou ondulation), sauvetage et série.', comp: ['HME1', 'GSS1', 'GSS2', 'GSS4'], crit: [['Épreuve choisie terminée', 5, '5 : 100 m 4 nages ou 100 m crawl avec culbutes terminés sans arrêt · 3 : 1 arrêt · 1 : 50 m'], ['Technique des nages', 4, '4 : chaque nage correcte (respiration, coordination) · 2 : une nage faible · 0 : technique très faible'], ['Virages (culbute ou virage réglementaire)', 3, '3 : tous les virages corrects · 2 : la plupart · 1 : virages non réglementaires'], ['Sauvetage : canard et objet', 4, '4 : remonte l\'objet du premier essai · 2 : 2 essais · 0 : ne remonte pas'], ['Sauvetage : remorquage 15 m', 4, '4 : 15 m, prise sous les aisselles, visage du camarade hors de l\'eau · 2 : visage qui passe sous l\'eau ou arrêt · 0 : ne termine pas']], e: [
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
  {t: 'Évaluation', o: 'Montrer sa séance, son sauvetage et sa performance.', comp: ['HME1', 'GSS1', 'GSS2', 'GSS5'], crit: [['Conception de la séance', 4, '4 : échauffement, série principale et récupération écrits avec distances et repos · 2 : incomplet · 0 : pas de séance écrite'], ['Réalisation de la séance', 5, '5 : respecte temps et distances prévus · 3 : quelques écarts · 1 : séance très différente'], ['Explication des choix', 3, '3 : explique clairement pourquoi la séance est construite ainsi · 1 : explication vague · 0 : aucune'], ['Sauvetage : parcours enchaîné', 4, '4 : entrée sautée, 25 m tête hors de l\'eau, canard, sans arrêt · 2 : un arrêt · 0 : ne termine pas'], ['Sauvetage : remorquage et sortie', 4, '4 : remorque 15 m et sort le camarade en sécurité · 2 : sortie aidée · 0 : ne termine pas']], e: [
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
  {t: 'Évaluation : projet', o: 'Réaliser le test final de son projet et l\'analyser.', comp: ['HME1', 'GSS1', 'GSS4', 'GSS5'], crit: [['Test final réalisé', 6, '6 : test du projet réalisé en entier, conforme au règlement · 4 : réalisé avec un arrêt · 2 : partiel'], ['Progrès par rapport au départ', 6, '6 : progrès net · 4 : léger progrès · 2 : même résultat · 1 : régression'], ['Comparaison et analyse', 4, '4 : compare chiffres à l\'appui et explique la différence · 2 : compare sans expliquer · 0 : rien'], ['Carnet de projet tenu', 4, '4 : carnet complet (tests, séances, ressentis) · 2 : incomplet · 0 : absent']], e: [
    ['Échauffement personnel', 6, 'Chacun réalise l\'échauffement prévu dans son carnet.', 'piscine:sp:aller'],
    ['Consignes', 4, 'Ordre de passage des tests selon les projets, rôle du partenaire qui chronomètre et vérifie.', 'explication']],
   c: [['Test final', 20, 'Chaque élève passe le test correspondant à son projet (ex. 400 m chronométré, 1 500 m, 25 m papillon, parcours de sauvetage) et compare au test de départ dans son carnet.', 'Je compare mon résultat final à mon point de départ et j\'explique la différence.', '', 'piscine:sp:aller']],
   r: [['Bilan', 5, 'Analyse écrite dans le carnet : résultat final, comparaison avec le test de départ, ce qui a marché et ce qu\'on ferait autrement.', 'explication']]}
]}
}});

/* Nageurs (grande profondeur), 1re à 3e : cycles 2 et 3 (6 leçons chacun : 5 leçons + 1 évaluation), à la suite du cycle 1.
   On les fait quand la natation dure 12 ou 18 semaines. */
N.an[1].cy = ["Être à l'aise et en sécurité : flotter, glisser, crawl et dos", "Nager plus longtemps en grande profondeur : crawl coordonné, dos, jambes de brasse", "Autonomie en grande profondeur : plongeon, brasse, objet au fond, 200 m"];
N.an[1].l.push(
  {t: "Sauter en grande profondeur et faire du surplace", o: "Entrer seul dans l'eau profonde, remonter, s'orienter et tenir sur place 30 s.", e: [
    ["Nage libre et rappel des règles", 5, "4 longueurs à son rythme dans son couloir. Au bord : rappel des règles de la grande profondeur (on saute seulement au signal, un seul élève à la fois par couloir, on s'écarte tout de suite du point de chute).", "piscine:sp:aller"],
    ["Godille au bord", 5, "Tenant le bord d'une main en grande profondeur : godille de l'autre main (mouvement en 8, paume vers le bas) et pédalage des jambes ; puis lâcher le bord 5 s, 10 s.", "piscine:sp:flotte"]],
   c: [["Saut droit et retour au bord", 10, "Saut pieds joints depuis le bord (bras le long du corps), on se laisse remonter, on souffle, on regarde le prof puis on nage 5 m jusqu'à l'échelle. 4 sauts chacun, le suivant attend que le précédent ait rejoint le bord.", "Je remonte seul, je m'oriente et je rejoins le bord sans m'accrocher à un camarade.", "Groupe moins à l'aise : saut près de la perche tenue par le prof.", "piscine:sp:plongeon"],
    ["Surplace", 10, "Au milieu du couloir profond : surplace 15 s, 30 s puis 45 s (godille + pédalage, tête hors de l'eau, respiration calme). Entre deux essais, repos au bord 30 s.", "Je tiens 30 s sur place sans m'accrocher.", "Lever une main hors de l'eau (« j'appelle à l'aide ») pendant 10 s.", "piscine:sp:flotte"],
    ["Le chronomètre humain", 5, "Par deux : l'un saute, fait 20 s de surplace et rejoint le bord ; l'autre, au bord, compte les secondes à voix haute et vérifie qu'il ne s'accroche pas. On inverse.", "Je fais le saut, le surplace et le retour sans aide.", "Surplace avec un bras levé.", "piscine:sp:flotte"]],
   r: [["Flottaison et sortie", 5, "Étoile de mer sur le dos 30 s en grande profondeur, puis sortie par l'échelle et comptage des élèves.", "piscine:sp:flotte"]]},
  {t: "Crawl : coordonner bras et respiration", o: "Nager le crawl en respirant sur le côté sans casser le rythme des bras.", e: [
    ["Nage libre", 5, "4 longueurs dans son couloir : 2 de crawl lent en soufflant dans l'eau, 2 de dos, sans s'arrêter au mur.", "piscine:sp:aller"],
    ["Battements sur le côté", 5, "Un bras tendu devant, l'autre le long de la cuisse : battements sur le côté, tête dans l'eau, on tourne la tête pour respirer toutes les 6 battements. 2 longueurs (une par côté).", "piscine:sp:aller"]],
   c: [["Crawl un bras", 8, "Un bras tendu devant tient la planche, l'autre fait le crawl ; on respire du côté du bras qui tire, au moment où la main passe à la cuisse. 2 × 25 m par bras.", "Ma tête tourne quand ma main passe près de la cuisse, sans se lever vers l'avant.", "Sans planche, bras tendu devant.", "piscine:sp:aller"],
    ["Crawl en comptant", 10, "4 × 25 m crawl en respirant tous les 2 temps (toujours du même côté), 20 s de repos entre chaque. Le partenaire au bord observe : tête qui se lève vers l'avant ? oui / non.", "Je nage 25 m sans lever la tête vers l'avant.", "Respiration tous les 3 temps pour les plus à l'aise.", "piscine:sp:aller"],
    ["Relais crawl", 7, "Équipes de 4 par couloir : relais 4 × 25 m crawl, départ dans l'eau quand le nageur précédent touche le mur. Deux manches, on change l'ordre.", "Je nage mon relais sans m'arrêter, en respirant sur le côté.", "Groupe moins à l'aise : 12,5 m.", "piscine:sp:relais"]],
   r: [["Nage souple", 5, "2 longueurs de dos lent, puis flottaison ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Le dos : bras continus et position du corps", o: "Nager 50 m en dos crawlé avec des bras continus et le corps allongé.", e: [
    ["Nage libre", 5, "4 longueurs à son rythme dans son couloir, nages au choix, en soufflant longuement dans l'eau à chaque respiration.", "piscine:sp:aller"],
    ["Battements sur le dos", 5, "Bras le long du corps, oreilles dans l'eau, regard au plafond : battements sur 2 longueurs, le nombril reste à la surface.", "piscine:sp:aller"]],
   c: [["Dos un bras", 8, "Un bras le long du corps, l'autre fait le dos : il sort tendu par le pouce, passe près de l'oreille, entre par le petit doigt. 2 × 25 m par bras.", "Mon bras passe tendu près de l'oreille.", "Planche tenue sur le ventre par l'autre main.", "piscine:sp:aller"],
    ["Dos complet en continu", 10, "4 × 25 m dos complet : quand un bras entre dans l'eau, l'autre sort (comme un moulin), 20 s de repos entre chaque. On compte ses mouvements de bras par longueur.", "Je nage 25 m de dos sans m'asseoir, avec des bras qui ne s'arrêtent pas.", "50 m d'un coup pour les plus à l'aise.", "piscine:sp:aller"],
    ["Repère de fin de bassin", 7, "On repère les fanions (5 m du mur) : en dos, on compte ses bras entre les fanions et le mur pour arriver sans se cogner. 4 arrivées chacun.", "J'arrive au mur sans me cogner la tête, grâce à mon compte de bras.", "", "piscine:sp:aller"]],
   r: [["Flottaison", 5, "Étoile de mer sur le dos, respiration lente ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Les jambes de brasse", o: "Faire un mouvement de jambes de brasse symétrique, pieds en flexion, qui fait avancer.", e: [
    ["Nage libre", 5, "4 longueurs dans son couloir en alternant crawl et dos, allure lente, on double seulement par la gauche.", "piscine:sp:aller"],
    ["Jambes au bord", 5, "Assis au bord puis tenant le bord à plat ventre : talons aux fesses, pieds en flexion (orteils vers les genoux), pieds écartés vers l'extérieur puis on serre jambes tendues. 3 séries de 8.", "piscine:sp:flotte"]],
   c: [["Brasse jambes avec planche", 10, "Planche tenue bras tendus : jambes de brasse sur 4 × 15 m, on glisse 2 secondes après chaque fouet (« plier, ouvrir, serrer, glisser »).", "J'avance en 10 mouvements de jambes ou moins sur 15 m.", "Sur le dos, planche sur le ventre : on voit ses genoux.", "piscine:sp:aller"],
    ["Le test des pieds", 8, "Par deux : l'un nage jambes de brasse, l'autre marche au bord et observe les pieds (flexion ? symétrie ? ciseaux ?). Il donne un conseil, on inverse.", "Mes deux pieds font le même mouvement, en flexion.", "", "piscine:sp:aller"],
    ["Course jambes de brasse", 7, "Relais 2 × 15 m jambes de brasse avec planche, par équipes de 4 dans son couloir.", "Je garde un mouvement correct même en allant vite.", "", "piscine:sp:relais"]],
   r: [["Nage libre lente", 5, "2 longueurs de dos lent ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Nager 100 m sans s'arrêter", o: "Nager 100 m en continu, en choisissant ses nages et en gérant son souffle.", e: [
    ["Échauffement", 6, "3 longueurs à son rythme, puis 1 longueur de battements avec planche.", "piscine:sp:aller"],
    ["Rappel des repères", 4, "Au bord : pour durer, on part lentement, on souffle dans l'eau à chaque respiration, et si on est fatigué on passe sur le dos au lieu de s'arrêter.", "explication"]],
   c: [["2 × 50 m", 8, "2 × 50 m à allure lente, 1 minute de repos entre les deux. Le partenaire au bord compte les longueurs.", "Je nage 50 m sans m'arrêter.", "Groupe moins à l'aise : 4 × 25 m.", "piscine:sp:aller"],
    ["100 m en continu", 12, "100 m sans s'arrêter ni toucher le fond, nages au choix (on peut passer du crawl au dos). Le partenaire compte les longueurs et note le temps.", "Je nage 100 m sans m'arrêter et je connais mon temps.", "Les plus forts : 150 m.", "piscine:sp:aller"],
    ["Bilan à deux", 5, "Chacun dit à son partenaire : ma nage la plus facile, le moment où j'ai eu envie de m'arrêter, ce qui m'a aidé.", "Je sais quelle nage m'aide à récupérer.", "", "explication"]],
   r: [["Flottaison", 5, "Étoile de mer sur le dos ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Évaluation : nager 100 m et être en sécurité en grande profondeur", o: "Montrer ses progrès : 100 m sans arrêt, crawl coordonné, saut et surplace, jambes de brasse.", comp: ["HME1", "GSS1", "GSS2", "GSS4"],
   crit: [["100 m sans arrêt", 6, "6 : 100 m sans s'arrêter ni toucher le fond · 4 : 1 arrêt au mur · 2 : 75 m · 1 : 50 m"], ["50 m crawl : respiration et bras", 5, "5 : respire sur le côté sans lever la tête, bras continus · 3 : respire en levant la tête ou s'arrête une fois · 1 : crawl très saccadé"], ["Saut en grande profondeur et retour au bord", 3, "3 : saute seul, remonte, s'oriente et rejoint le bord · 2 : hésite ou cherche la perche · 0 : refuse"], ["Surplace 30 s", 3, "3 : 30 s sans s'accrocher, tête hors de l'eau · 2 : 15 s · 1 : moins de 15 s"], ["15 m jambes de brasse", 3, "3 : pieds en flexion, mouvement symétrique, avance bien · 2 : ciseaux ou pieds en extension · 1 : n'avance presque pas"]],
   e: [
    ["Échauffement", 6, "4 longueurs libres dans son couloir à allure lente, puis 2 coulées au mur pour se préparer.", "piscine:sp:aller"],
    ["Rappel des épreuves", 4, "Au bord : ordre de passage par couloir, ce qui est observé, rôle du partenaire (compter les longueurs, chronométrer).", "explication"]],
   c: [["Épreuve 1 : 100 m", 10, "100 m sans arrêt, nages au choix, par vagues de 4 (un par couloir). Le partenaire compte les longueurs et note le temps.", "Je nage 100 m sans m'arrêter.", "", "piscine:sp:aller"],
    ["Épreuve 2 : 50 m crawl et 15 m jambes de brasse", 8, "50 m crawl observé (respiration, bras), puis après 1 minute de repos 15 m jambes de brasse avec planche.", "Je respire sur le côté et mes pieds sont en flexion en brasse.", "", "piscine:sp:aller"],
    ["Épreuve 3 : saut et surplace", 7, "Saut pieds joints en grande profondeur, 30 s de surplace, retour au bord à la nage.", "Je tiens 30 s et je reviens seul.", "", "piscine:sp:plongeon"]],
   r: [["Bilan", 5, "Chacun compare avec le test de la leçon 1 (distance, nages) ; sortie et comptage.", "explication"]]},
  {t: "Le plongeon : assis, à genoux, puis debout", o: "Entrer dans l'eau tête la première, bras tendus, sans faire de « plat ».", e: [
    ["Nage libre", 5, "4 longueurs à son rythme dans son couloir, nages au choix, en soufflant dans l'eau ; on double par la gauche.", "piscine:sp:aller"],
    ["Coulées", 5, "Flèche ventrale au mur : bras tendus, mains l'une sur l'autre, tête entre les bras ; glisser le plus loin possible. 6 coulées.", "piscine:sp:plongeon"]],
   c: [["Plongeon assis", 6, "Assis au bord, pieds sur la goulotte, bras tendus au-dessus de la tête, menton sur la poitrine : on bascule vers l'avant et on vise un point dans l'eau à 1 m. 4 essais. Uniquement en grande profondeur.", "J'entre dans l'eau mains en premier, sans plat.", "", "piscine:sp:plongeon"],
    ["Plongeon à genoux puis accroupi", 8, "Un genou au bord, l'autre pied aux orteils sur le bord ; même position des bras, on bascule. Puis accroupi. 4 essais par position ; le prof corrige la tête (entre les bras).", "Mes mains, ma tête puis mon corps passent par le même trou.", "Rester à genoux si l'accroupi fait peur.", "piscine:sp:plongeon"],
    ["Plongeon debout et coulée", 11, "Debout, pieds au bord, orteils accrochés, jambes un peu fléchies : on pousse vers l'avant, bras tendus, et on glisse sous l'eau avant de nager 10 m de crawl. 6 essais.", "Je plonge et je glisse au moins 3 m avant de nager.", "Les plus à l'aise : plongeon puis 25 m.", "piscine:sp:plongeon"]],
   r: [["Flottaison et sortie", 5, "Étoile de mer sur le dos ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "La brasse : bras et coordination", o: "Coordonner bras et jambes de brasse : « tirer, respirer, pousser, glisser ».", e: [
    ["Nage libre", 5, "2 longueurs crawl, 2 longueurs jambes de brasse avec planche.", "piscine:sp:aller"],
    ["Bras debout", 5, "Debout en petite profondeur, buste penché : les mains s'écartent, tirent jusqu'aux épaules (pas plus loin), se rejoignent sous le menton et repartent devant. On souffle quand les bras s'allongent.", "piscine:sp:flotte"]],
   c: [["Bras de brasse avec pull-buoy", 7, "Pull-buoy entre les cuisses : bras de brasse sur 2 × 25 m, on lève le menton pour respirer quand les mains tirent.", "Mes mains ne dépassent pas mes épaules.", "Battements de crawl à la place du pull-buoy.", "piscine:sp:aller"],
    ["Coordination 1 bras - 1 jambe", 10, "On décompose : bras (et respiration), puis jambes, puis glisse 2 s bras tendus. 4 × 25 m en disant dans sa tête « bras, jambes, glisse ».", "Mes jambes poussent quand mes bras repartent devant.", "2 coups de jambes pour 1 coup de bras pour ceux qui mélangent.", "piscine:sp:aller"],
    ["Brasse comptée", 8, "25 m de brasse en comptant ses cycles ; on recommence en essayant d'en faire 2 de moins en glissant plus longtemps.", "Je fais 25 m de brasse coordonnée et je gagne au moins un cycle.", "", "piscine:sp:aller"]],
   r: [["Nage souple", 5, "2 longueurs de dos lent ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Aller chercher un objet au fond", o: "Descendre en grande profondeur par un canard et remonter un objet.", e: [
    ["Nage libre", 5, "4 longueurs à son rythme dans son couloir, nages au choix, en soufflant dans l'eau ; on double par la gauche.", "piscine:sp:aller"],
    ["Apnée et bulles", 5, "Tenant le bord : s'immerger entièrement en soufflant doucement par le nez, compter jusqu'à 5, remonter. Puis s'asseoir au fond en petite profondeur.", "piscine:sp:flotte"]],
   c: [["Le canard", 10, "En nageant la brasse : bras tendus devant, on plie le buste vers le fond, on lève les jambes tendues hors de l'eau : leur poids fait descendre. On commence vers 1,5 m de fond, puis plus profond. 6 essais.", "Je descends en un mouvement, sans pédaler.", "Descendre le long d'une perche ou de l'échelle.", "piscine:sp:plongeon"],
    ["Ramasse-anneaux", 10, "Anneaux lestés posés au fond (couleurs = points). Par équipes de 3 : chacun à son tour descend chercher un anneau et le ramène au bord. On compte les points de l'équipe en 5 minutes.", "Je remonte un anneau à chaque descente.", "Les plus à l'aise : 2 anneaux en une descente.", "piscine:sp:flotte"],
    ["Canard et nage", 5, "Canard, remonter un anneau, puis le ramener au bord en nageant sur le dos 10 m.", "J'enchaîne descente, remontée et retour sans m'arrêter.", "", "piscine:sp:aller"]],
   r: [["Flottaison", 5, "Étoile de mer, respiration lente ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Nager longtemps : 200 m en alternant les nages", o: "Nager 200 m en continu en utilisant le dos ou la brasse pour récupérer.", e: [
    ["Échauffement", 6, "4 longueurs dans son couloir : 2 de crawl, 1 de dos, 1 de brasse, à allure lente.", "piscine:sp:aller"],
    ["Plan de nage", 4, "Au bord : chacun choisit son plan pour 200 m (ex. 2 longueurs crawl, 1 longueur dos, et on recommence) et le dit à son partenaire.", "explication"]],
   c: [["2 × 100 m", 8, "2 × 100 m en suivant son plan, 1 minute de repos entre les deux. Le partenaire note les temps.", "Mes deux 100 m ont presque le même temps.", "Groupe moins à l'aise : 4 × 50 m.", "piscine:sp:aller"],
    ["200 m en continu", 12, "200 m sans arrêt en suivant son plan. Le partenaire compte les longueurs et note le temps à 100 m et à l'arrivée.", "Je nage 200 m sans m'arrêter.", "Les plus forts : 300 m.", "piscine:sp:aller"],
    ["Bilan", 5, "On compare les deux 100 m : plus rapide au début ou à la fin ? Chacun ajuste son plan pour la prochaine fois.", "J'explique comment j'ai géré mon effort.", "", "explication"]],
   r: [["Flottaison", 5, "Étoile de mer sur le dos 30 s en respirant lentement ; sortie par l'échelle et comptage des élèves.", "piscine:sp:flotte"]]},
  {t: "Aider un camarade : premiers gestes de sauvetage", o: "Porter secours sans se mettre en danger : tendre un objet, rassurer, remorquer une planche.", comp: ["HME1", "HME4", "GSS2", "GSS3"], e: [
    ["Nage libre", 5, "4 longueurs à son rythme : crawl, dos, brasse.", "piscine:sp:aller"],
    ["La règle d'or", 5, "Au bord : face à quelqu'un en difficulté, on donne l'alerte (crier, appeler un adulte), puis on aide du bord en tendant un objet (perche, planche, frite). On ne saute jamais à l'eau pour agripper quelqu'un qui panique.", "explication"]],
   c: [["Tendre la perche ou la frite", 8, "Par deux : l'un fait semblant d'être en difficulté à 2 m du bord (en grande profondeur, en s'agitant), l'autre se couche au bord (pour ne pas être tiré dans l'eau), lui tend la frite ou la perche et le ramène au bord en lui parlant. On inverse.", "Je reste stable au bord et je ramène mon camarade en lui parlant.", "Le camarade est en petite profondeur.", "piscine:sp:flotte"],
    ["Lancer une planche", 7, "Depuis le bord, lancer une planche à côté (pas sur) d'un camarade à 4 m ; il l'attrape et revient en battements.", "Ma planche arrive à portée de main de mon camarade.", "Distance réduite à 2 m.", "piscine:sp:flotte"],
    ["Remorquer une planche", 10, "Sur le dos, jambes de brasse ou battements, une planche tenue sur la poitrine (c'est le « camarade fatigué ») : 2 × 15 m. Puis par deux : le camarade flotte sur le dos en tenant une frite, le sauveteur tire la frite sur 10 m.", "Je remorque 10 m en gardant la tête du camarade hors de l'eau.", "Remorquer la frite seule.", "piscine:sp:aller"]],
   r: [["Bilan et sortie", 5, "Chacun redit les 3 gestes : alerter, tendre un objet, rassurer ; sortie et comptage.", "explication"]]},
  {t: "Évaluation : autonomie en grande profondeur", o: "Montrer plongeon, brasse, objet au fond et 200 m.", comp: ["HME1", "GSS1", "GSS2", "GSS4"],
   crit: [["Plongeon et 25 m", 4, "4 : plongeon debout sans plat, coulée, 25 m sans arrêt · 3 : plongeon accroupi ou petit plat · 2 : entrée sautée puis 25 m · 0 : ne termine pas"], ["25 m brasse coordonnée", 4, "4 : bras, jambes, glisse bien enchaînés · 2 : coordination incomplète · 1 : ciseaux ou mains au-delà des épaules"], ["Canard et objet au fond", 4, "4 : canard en un mouvement, objet remonté du premier coup · 2 : en 2 essais · 0 : ne remonte pas l'objet"], ["200 m sans arrêt", 6, "6 : 200 m sans arrêt · 4 : 1 arrêt · 2 : 150 m · 1 : 100 m"], ["Gestion de l'effort", 2, "2 : écart de moins de 15 s entre les deux 100 m · 1 : plus de 15 s"]],
   e: [
    ["Échauffement", 6, "4 longueurs libres à allure lente dans son couloir, puis 2 coulées au mur.", "piscine:sp:aller"],
    ["Rappel des épreuves", 4, "Au bord : ordre de passage, ce qui est observé, rôle du partenaire.", "explication"]],
   c: [["Épreuve 1 : plongeon, 25 m et brasse", 10, "Plongeon, 25 m crawl, puis après 1 minute de repos 25 m brasse observée.", "Je plonge sans plat et ma brasse est coordonnée.", "", "piscine:sp:plongeon"],
    ["Épreuve 2 : objet au fond", 5, "Canard pour remonter un anneau en grande profondeur (2 essais).", "Je remonte l'anneau.", "", "piscine:sp:flotte"],
    ["Épreuve 3 : 200 m", 10, "200 m sans arrêt, nages au choix ; le partenaire compte les longueurs et note le temps à 100 m et à l'arrivée.", "Je nage 200 m sans m'arrêter.", "", "piscine:sp:aller"]],
   r: [["Bilan de l'année", 5, "Chacun compare avec le test de la leçon 1 : distance, nages, profondeur ; sortie et comptage.", "explication"]]}
);

N.an[2].cy = ["Nager mieux et plus longtemps : crawl, dos, brasse, entrées dans l'eau", "Nager efficacement : brasse complète, crawl respiré des deux côtés, canard, séries", "Endurance et sécurité : 300 m, virage, nage habillée, remorquage, départ plongé"];
N.an[2].l.push(
  {t: "La brasse complète", o: "Nager 50 m de brasse coordonnée en glissant après chaque cycle.", e: [
    ["Nage libre", 5, "4 longueurs dans son couloir en alternant crawl et dos, allure lente, on double seulement par la gauche.", "piscine:sp:aller"],
    ["Jambes de brasse", 5, "2 longueurs jambes de brasse avec planche, en glissant 2 s après chaque fouet.", "piscine:sp:aller"]],
   c: [["Bras et respiration", 7, "Pull-buoy entre les cuisses : bras de brasse sur 2 × 25 m ; on lève le menton pour inspirer quand les mains tirent, on souffle quand les bras repartent devant.", "Mes mains restent devant mes épaules.", "", "piscine:sp:aller"],
    ["Brasse « bras, jambes, glisse »", 10, "4 × 25 m de brasse en décomposant : bras (et inspiration), jambes, glisse 2 s bras tendus. 20 s de repos entre chaque.", "Mes jambes poussent quand mes bras sont déjà devant.", "2 coups de jambes pour 1 coup de bras pour ceux qui mélangent.", "piscine:sp:aller"],
    ["50 m de brasse", 8, "50 m de brasse en comptant les cycles par longueur ; le partenaire observe la glisse.", "Je nage 50 m de brasse coordonnée avec une glisse à chaque cycle.", "Les plus forts : 100 m.", "piscine:sp:aller"]],
   r: [["Nage souple", 5, "2 longueurs de dos lent ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Crawl : respirer des deux côtés", o: "Respirer tous les 3 temps en crawl pour nager droit et équilibré.", e: [
    ["Nage libre", 5, "4 longueurs à son rythme dans son couloir, nages au choix, en soufflant dans l'eau ; on double par la gauche.", "piscine:sp:aller"],
    ["Battements sur le côté", 5, "Battements sur le côté droit puis gauche, bras devant tendu, respiration en tournant la tête. 2 longueurs.", "piscine:sp:aller"]],
   c: [["Respiration 3 temps", 10, "4 × 25 m crawl en respirant tous les 3 mouvements de bras (une fois à droite, une fois à gauche), 20 s de repos.", "Je respire des deux côtés sans m'arrêter.", "Respirer tous les 2 temps puis passer au 3 temps sur la dernière longueur.", "piscine:sp:aller"],
    ["Crawl rattrapé", 7, "Crawl rattrapé (une main attend l'autre devant) en 3 temps sur 2 × 25 m : on s'allonge et on a le temps de tourner la tête.", "Mon corps reste allongé quand je respire.", "Avec planche tenue devant.", "piscine:sp:aller"],
    ["Nager droit", 8, "Par deux : l'un nage 25 m en 3 temps au milieu du couloir, l'autre observe s'il dérive vers la ligne d'eau. On inverse.", "Je nage droit au milieu de mon couloir.", "", "piscine:sp:aller"]],
   r: [["Dos lent", 5, "2 longueurs de dos lent ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Le dos : rotation des épaules et départ", o: "Nager le dos en roulant des épaules et partir du mur en coulée dorsale.", e: [
    ["Nage libre", 5, "4 longueurs dans son couloir en alternant crawl et dos, allure lente, on double seulement par la gauche.", "piscine:sp:aller"],
    ["Battements sur le dos", 5, "2 longueurs de battements, bras tendus derrière la tête, mains l'une sur l'autre.", "piscine:sp:aller"]],
   c: [["Épaule au menton", 8, "Dos complet : l'épaule du bras qui sort vient toucher le menton (rotation du corps). 4 × 25 m.", "Mes épaules roulent à chaque mouvement de bras.", "Avec un bras seulement.", "piscine:sp:aller"],
    ["Départ de dos", 9, "Dans l'eau face au mur, mains à la goulotte, pieds contre le mur : on pousse en arrière, bras tendus derrière la tête, coulée sur le dos puis on nage. 6 départs.", "Je glisse au moins 3 m avant de nager.", "Départ sans les mains à la goulotte.", "piscine:sp:aller"],
    ["Relais dos", 8, "Relais 4 × 25 m dos par équipes de 4 ; chaque nageur part en départ de dos quand le précédent touche le mur.", "Je pars en coulée et je nage droit.", "", "piscine:sp:relais"]],
   r: [["Flottaison", 5, "Étoile de mer sur le dos 30 s en respirant lentement ; sortie par l'échelle et comptage des élèves.", "piscine:sp:flotte"]]},
  {t: "Le canard et l'apnée", o: "Descendre à 2-3 m par un canard, se déplacer sous l'eau et remonter un objet.", e: [
    ["Nage libre", 5, "4 longueurs à son rythme dans son couloir, nages au choix, en soufflant dans l'eau ; on double par la gauche.", "piscine:sp:aller"],
    ["Apnée au bord", 5, "Tenant le bord : immersion 5 s, 8 s, 10 s en soufflant lentement par le nez. Jamais d'hyperventilation (on ne respire pas vite avant).", "piscine:sp:flotte"]],
   c: [["Canard", 8, "Canard depuis la brasse : buste plié vers le fond, jambes tendues levées hors de l'eau. Toucher le fond en grande profondeur, 6 essais.", "Je touche le fond en un seul canard.", "Le long d'une perche.", "piscine:sp:plongeon"],
    ["Parcours sous l'eau", 10, "Deux cerceaux lestés au fond à 3 m l'un de l'autre : canard, passer dans les deux cerceaux, remonter. Un camarade surveille au bord, un seul élève sous l'eau par couloir.", "Je passe dans les deux cerceaux sans remonter.", "Un seul cerceau.", "piscine:sp:flotte"],
    ["Pêche aux anneaux", 7, "Anneaux au fond : par équipes de 3, à tour de rôle, on ramène un anneau à chaque descente. 5 minutes.", "Je remonte un anneau à chaque descente.", "2 anneaux par descente.", "piscine:sp:flotte"]],
   r: [["Flottaison", 5, "Étoile de mer, respiration lente ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Séries : 4 × 50 m avec repos", o: "Nager une série à allure régulière et utiliser l'horloge (temps de départ).", e: [
    ["Échauffement", 6, "4 longueurs dans son couloir : 2 de crawl, 1 de dos, 1 de brasse, à allure lente.", "piscine:sp:aller"],
    ["Lire l'horloge", 4, "Au bord : comment partir « sur le 0 » de la trotteuse et lire son temps à l'arrivée ; on calcule son repos.", "explication"]],
   c: [["4 × 50 m", 12, "4 × 50 m crawl (ou nage au choix), 30 s de repos entre chaque. Le partenaire note les 4 temps.", "Mes 4 temps ont moins de 5 s d'écart.", "Groupe moins à l'aise : 4 × 25 m.", "piscine:sp:aller"],
    ["Analyse des temps", 5, "Chacun regarde ses 4 temps : suis-je parti trop vite ? On fixe le temps à viser par 50 m.", "Je sais quel temps je peux tenir.", "", "explication"],
    ["Série visée", 8, "2 × 50 m en essayant de nager exactement le temps visé (± 2 s).", "Je nage dans le temps que j'ai annoncé.", "", "piscine:sp:aller"]],
   r: [["Nage souple", 5, "2 longueurs de dos lent ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Évaluation : nager efficacement", o: "Montrer brasse coordonnée, crawl respiré des deux côtés, canard et régularité.", comp: ["HME1", "GSS1", "GSS2", "GSS4"],
   crit: [["50 m brasse coordonnée", 5, "5 : bras, jambes et glisse bien enchaînés, sans arrêt · 3 : coordination incomplète · 1 : ciseaux ou arrêt"], ["50 m crawl respiration 3 temps", 5, "5 : respire des deux côtés, nage droit, sans arrêt · 3 : respire d'un seul côté · 1 : tête qui se lève ou arrêt"], ["Canard et parcours sous l'eau", 4, "4 : canard, passe les deux cerceaux · 2 : un cerceau · 0 : ne descend pas"], ["4 × 50 m : régularité", 4, "4 : moins de 5 s d'écart entre les 4 temps · 3 : 5 à 10 s · 2 : plus de 10 s · 1 : série non terminée"], ["Départ de dos et 25 m dos", 2, "2 : coulée puis dos continu · 1 : départ sans coulée ou dos assis"]],
   e: [
    ["Échauffement", 6, "4 longueurs libres à allure lente dans son couloir, puis 2 coulées au mur.", "piscine:sp:aller"],
    ["Rappel des épreuves", 4, "Au bord : ordre de passage, ce qui est observé, rôle du partenaire (chronométrer, noter).", "explication"]],
   c: [["Épreuve 1 : 50 m brasse et 50 m crawl", 9, "50 m brasse observée, 1 minute de repos, 50 m crawl en respirant tous les 3 temps.", "Je nage les deux 50 m avec la bonne technique.", "", "piscine:sp:aller"],
    ["Épreuve 2 : canard et dos", 6, "Canard et parcours des deux cerceaux, puis départ de dos et 25 m dos.", "Je passe les cerceaux et je pars en coulée.", "", "piscine:sp:flotte"],
    ["Épreuve 3 : 4 × 50 m", 10, "4 × 50 m, 30 s de repos ; le partenaire note les 4 temps.", "Mes temps sont réguliers.", "", "piscine:sp:aller"]],
   r: [["Bilan", 5, "Chacun compare ses temps avec ceux de la leçon 5 ; sortie et comptage.", "explication"]]},
  {t: "Nager 300 m à son allure", o: "Nager 300 m en continu en tenant une allure régulière.", e: [
    ["Échauffement", 6, "4 longueurs à son rythme en changeant de nage à chaque longueur (crawl, dos, brasse, au choix).", "piscine:sp:aller"],
    ["Allure", 4, "Au bord : « nager à une allure où je peux encore parler ». Chacun annonce son temps visé au 100 m.", "explication"]],
   c: [["3 × 100 m", 10, "3 × 100 m, 45 s de repos ; le partenaire note les temps.", "Mes 3 temps ont moins de 10 s d'écart.", "Groupe moins à l'aise : 3 × 50 m.", "piscine:sp:aller"],
    ["300 m en continu", 12, "300 m sans arrêt, nages au choix ; le partenaire note les temps à 100, 200 et 300 m.", "Je nage 300 m sans m'arrêter.", "Les plus forts : 400 m.", "piscine:sp:aller"],
    ["Bilan", 3, "On compare les trois 100 m : ai-je ralenti ? Pourquoi ?", "J'explique ma gestion d'allure.", "", "explication"]],
   r: [["Flottaison", 5, "Étoile de mer sur le dos 30 s en respirant lentement ; sortie par l'échelle et comptage des élèves.", "piscine:sp:flotte"]]},
  {t: "Le virage : toucher, pivoter, pousser", o: "Faire un virage rapide (toucher-pivoter) en crawl et en brasse, puis une initiation à la culbute.", e: [
    ["Nage libre", 5, "4 longueurs à son rythme dans son couloir, nages au choix, en soufflant dans l'eau ; on double par la gauche.", "piscine:sp:aller"],
    ["Coulées", 5, "Pousser au mur sur le ventre, bras tendus : 6 coulées, on cherche à aller le plus loin.", "piscine:sp:plongeon"]],
   c: [["Virage toucher-pivoter", 10, "À 5 m du mur : on arrive, on touche d'une main (deux mains en brasse), on ramène les genoux, on pivote sur le côté et on pousse en coulée. 8 virages.", "Je repars en moins de 2 secondes après avoir touché.", "Virage décomposé debout en petite profondeur.", "piscine:sp:aller"],
    ["Roulade avant dans l'eau", 7, "Au milieu du couloir : roulade avant groupée, en soufflant par le nez. Puis roulade après 3 mouvements de crawl.", "Je fais la roulade sans boire la tasse.", "Avec une frite sous le ventre.", "piscine:sp:flotte"],
    ["Culbute au mur", 8, "En arrivant au mur en crawl : roulade, pieds au mur, pousser sur le dos puis tourner sur le ventre. 6 essais.", "Mes pieds touchent le mur et je repars en coulée.", "Rester sur le virage toucher-pivoter.", "piscine:sp:aller"]],
   r: [["Nage souple", 5, "2 longueurs de dos très lent, en relâchant les épaules ; sortie par l'échelle et comptage des élèves.", "piscine:sp:flotte"]]},
  {t: "Nage habillée et survie", o: "Nager habillé (t-shirt, short) et adopter les bons gestes pour économiser ses forces.", comp: ["HME1", "HME4", "GSS2"], e: [
    ["Nage libre", 5, "4 longueurs en maillot à son rythme, nages au choix, pour comparer ensuite avec la nage habillée.", "piscine:sp:aller"],
    ["Ce qui change habillé", 5, "Au bord, avec t-shirt et short propres par-dessus le maillot : pourquoi les vêtements gênent (poids, frein), et la règle : on ne cherche pas à nager vite, on flotte et on appelle.", "explication"]],
   c: [["Entrée et flottaison habillé", 8, "Saut pieds joints habillé en grande profondeur, remonter, flotter sur le dos 30 s, puis surplace 30 s en levant un bras.", "Je flotte et je fais du surplace habillé sans paniquer.", "Entrée par l'échelle.", "piscine:sp:flotte"],
    ["Nager habillé", 10, "50 m habillé en brasse (la nage qui fatigue le moins), puis 25 m sur le dos. On compare avec le même trajet en maillot.", "Je nage 50 m habillé sans m'arrêter.", "25 m pour le groupe moins à l'aise.", "piscine:sp:aller"],
    ["Position d'attente", 7, "Par 3 : on se serre en cercle et on flotte 1 minute (garder la chaleur), puis on se déshabille dans l'eau (t-shirt) et on s'en sert comme flotteur.", "Je reste calme et je sais économiser mes forces.", "", "piscine:sp:flotte"]],
   r: [["Sortie et bilan", 5, "Sortie, on se change ; bilan : les 3 réflexes (flotter, appeler, rejoindre un appui).", "explication"]]},
  {t: "Remorquer un camarade", o: "Remorquer un camarade sur 10 m en gardant son visage hors de l'eau.", comp: ["HME1", "HME4", "GSS2", "GSS3"], e: [
    ["Nage libre", 5, "4 longueurs à son rythme dans son couloir, nages au choix, en soufflant dans l'eau ; on double par la gauche.", "piscine:sp:aller"],
    ["Dos jambes de brasse", 5, "2 longueurs sur le dos avec jambes de brasse, bras le long du corps : c'est la nage du sauveteur.", "piscine:sp:aller"]],
   c: [["Remorquer une planche", 7, "Sur le dos, jambes de brasse, une planche tenue sur la poitrine : 2 × 15 m.", "J'avance en jambes de brasse sur le dos.", "", "piscine:sp:aller"],
    ["Prise sous les aisselles", 10, "Par deux de même taille : le « nageur fatigué » flotte sur le dos ; le sauveteur se place derrière, mains sous les aisselles, et le remorque en dos jambes de brasse. 2 × 10 m chacun, en petite puis en grande profondeur.", "Le visage de mon camarade reste hors de l'eau.", "Le camarade aide avec des battements.", "piscine:sp:aller"],
    ["Rassurer et remorquer", 8, "Le sauveteur arrive, parle (« je suis là, mets-toi sur le dos »), fait la prise, remorque 10 m et l'aide à s'accrocher au bord.", "Je parle à mon camarade et je l'amène au bord.", "", "piscine:sp:aller"]],
   r: [["Flottaison", 5, "Étoile de mer sur le dos 30 s en respirant lentement ; sortie par l'échelle et comptage des élèves.", "piscine:sp:flotte"]]},
  {t: "Départ plongé et relais", o: "Plonger depuis le bord avec une bonne coulée et passer le relais au bon moment.", e: [
    ["Nage libre", 5, "4 longueurs à son rythme dans son couloir, nages au choix, en soufflant dans l'eau ; on double par la gauche.", "piscine:sp:aller"],
    ["Plongeons", 5, "4 plongeons accroupis puis debout, coulée et 10 m de crawl.", "piscine:sp:plongeon"]],
   c: [["Départ au signal", 8, "« À vos marques » : pieds au bord, regard vers l'eau ; au coup de sifflet, plongeon, coulée, 15 m de crawl vite. 4 départs, chronométrés par un camarade.", "Je pars au signal et je glisse avant de nager.", "Départ dans l'eau pour ceux qui ne plongent pas encore.", "piscine:sp:plongeon"],
    ["Passage de relais", 7, "Le relayeur attend debout au bord et plonge quand la main du nageur touche le mur (pas avant). Par 2, 6 passages.", "Je plonge juste au moment où mon camarade touche le mur.", "", "piscine:sp:relais"],
    ["Relais 4 × 25 m", 10, "Équipes de 4 de niveau équilibré : relais 4 × 25 m crawl, départ plongé. 2 manches avec un ordre différent ; un juge par couloir vérifie les passages.", "Notre équipe n'a aucun départ anticipé.", "Relais 4 nages simplifié pour les plus forts.", "piscine:sp:relais"]],
   r: [["Nage souple", 5, "2 longueurs de dos très lent, en relâchant les épaules ; sortie par l'échelle et comptage des élèves.", "piscine:sp:flotte"]]},
  {t: "Évaluation : endurance et sécurité", o: "Montrer 300 m sans arrêt, virage, nage habillée, remorquage et départ plongé.", comp: ["HME1", "GSS1", "GSS2", "GSS4"],
   crit: [["300 m sans arrêt", 6, "6 : 300 m sans arrêt · 4 : 1 arrêt · 2 : 200 m · 1 : 100 m"], ["Virages pendant le 300 m", 2, "2 : virages rapides (toucher-pivoter ou culbute) · 1 : s'arrête au mur avant de repartir"], ["Nage habillée : entrée, flottaison, 25 m", 4, "4 : saut, 30 s de flottaison calme, 25 m sans arrêt · 2 : arrêt ou panique · 0 : ne termine pas"], ["Remorquage 10 m", 5, "5 : prise sous les aisselles, visage hors de l'eau sur 10 m · 3 : visage qui passe sous l'eau · 1 : remorquage incomplet"], ["Départ plongé et 25 m", 3, "3 : départ au signal, coulée, 25 m crawl · 2 : sans coulée · 1 : départ sauté"]],
   e: [
    ["Échauffement", 6, "4 longueurs libres à allure lente dans son couloir, puis 2 coulées au mur.", "piscine:sp:aller"],
    ["Rappel des épreuves", 4, "Au bord : ordre de passage, ce qui est observé, rôle du partenaire. Chacun a apporté un t-shirt et un short propres.", "explication"]],
   c: [["Épreuve 1 : 300 m", 12, "300 m sans arrêt avec virages ; le partenaire compte les longueurs et note le temps.", "Je nage 300 m sans m'arrêter.", "", "piscine:sp:aller"],
    ["Épreuve 2 : nage habillée et remorquage", 9, "Saut habillé, 30 s de flottaison, 25 m ; puis (en maillot) remorquage d'un camarade sur 10 m.", "Je reste calme habillé et je remorque 10 m.", "", "piscine:sp:flotte"],
    ["Épreuve 3 : départ plongé", 4, "Départ plongé au signal (« À vos marques », coup de sifflet), puis 25 m de crawl chronométré par le partenaire.", "Je pars au signal avec une coulée.", "", "piscine:sp:plongeon"]],
   r: [["Bilan de l'année", 5, "Chacun compare avec le test de la leçon 1 et écrit son objectif pour l'an prochain ; sortie et comptage.", "explication"]]}
);

N.an[3].cy = ["Perfectionner et survivre : brasse coordonnée, plongeon canard, nage habillée", "Vitesse : départs, virages réglementaires, ondulation, relais", "Sauvetage et nage longue : apnée, remorquages, parcours, 600 m"];
N.an[3].l.push(
  {t: "Virages réglementaires : brasse et dos", o: "Faire un virage réglementaire en brasse (deux mains) et en dos (sur le ventre puis culbute).", e: [
    ["Nage libre", 5, "6 longueurs dans son couloir : 2 de crawl, 2 de dos, 2 de brasse, à allure lente.", "piscine:sp:aller"],
    ["Coulées", 5, "Coulées ventrales et dorsales au mur, 3 de chaque, en cherchant la distance.", "piscine:sp:plongeon"]],
   c: [["Virage de brasse", 8, "Arriver bras tendus, toucher à deux mains en même temps, ramener les genoux, pivoter, repousser en coulée : une traction de bras sous l'eau puis la nage. 6 virages.", "Je touche à deux mains et je repars en coulée.", "Sans traction sous l'eau.", "piscine:sp:aller"],
    ["Virage de dos", 10, "Repérer les fanions, compter ses bras, se tourner sur le ventre au dernier mouvement, culbute, pousser sur le dos. 6 virages.", "Je fais le virage de dos sans m'arrêter.", "Toucher à la main puis pivoter.", "piscine:sp:aller"],
    ["100 m avec virages", 7, "100 m dos ou brasse avec 3 virages réglementaires ; le partenaire vérifie chaque virage.", "Mes 3 virages sont réglementaires.", "", "piscine:sp:aller"]],
   r: [["Nage souple", 5, "2 longueurs très lentes dans la nage de son choix, en soufflant longuement ; sortie et comptage des élèves.", "piscine:sp:flotte"]]},
  {t: "La culbute en crawl", o: "Faire une culbute en crawl sans s'arrêter au mur.", e: [
    ["Nage libre", 5, "6 longueurs à son rythme dans son couloir, nages au choix ; on double par la gauche et on ne s'arrête pas au milieu du mur.", "piscine:sp:aller"],
    ["Roulades", 5, "Roulades avant groupées au milieu du couloir en soufflant par le nez, 6 de suite.", "piscine:sp:flotte"]],
   c: [["Culbute sans mur", 6, "3 mouvements de crawl, roulade, on finit sur le dos ; puis on se retourne sur le ventre.", "Je ne bois pas la tasse pendant la roulade.", "", "piscine:sp:flotte"],
    ["Culbute au mur", 12, "Au dernier mouvement de bras (1 m du mur), roulade, pieds au mur jambes fléchies, pousser sur le dos et tourner sur le ventre en coulée. 8 essais, le prof observe la distance au mur.", "Mes pieds touchent le mur au bon endroit et je repars en coulée.", "Avec palmes.", "piscine:sp:aller"],
    ["50 m avec culbute", 7, "50 m crawl avec une culbute ; puis 100 m avec 3 culbutes pour les plus à l'aise.", "Je fais la culbute sans m'arrêter.", "", "piscine:sp:aller"]],
   r: [["Nage souple", 5, "2 longueurs de dos très lent, en relâchant les épaules ; sortie par l'échelle et comptage des élèves.", "piscine:sp:flotte"]]},
  {t: "L'ondulation et le papillon", o: "Onduler à partir de la poitrine et découvrir le papillon sur 15 m.", e: [
    ["Nage libre", 5, "6 longueurs à son rythme dans son couloir, nages au choix ; on double par la gauche et on ne s'arrête pas au milieu du mur.", "piscine:sp:aller"],
    ["Ondulation au mur", 5, "Bras tendus devant, la poitrine appuie vers le bas puis relâche : le mouvement va jusqu'aux pieds (« dauphin »). 4 coulées ondulées.", "piscine:sp:plongeon"]],
   c: [["Ondulation sur le ventre", 8, "Ondulation sur 4 × 15 m, bras tendus devant ; on respire en levant la tête à la fin d'une onde.", "Mes pieds suivent ma poitrine, sans plier les genoux à 90°.", "Avec palmes.", "piscine:sp:aller"],
    ["Ondulation sur le côté et sur le dos", 7, "Ondulation 2 × 15 m sur le côté (un bras devant, l'autre le long du corps), puis 2 × 15 m sur le dos, bras tendus derrière la tête.", "J'ondule dans les trois positions.", "", "piscine:sp:aller"],
    ["Papillon simplifié", 10, "Deux ondulations pour un mouvement de bras (les bras sortent ensemble et reviennent devant au-dessus de l'eau). 4 × 12,5 m.", "Je fais 12,5 m de papillon sans m'arrêter.", "Papillon un bras.", "piscine:sp:aller"]],
   r: [["Nage souple", 5, "2 longueurs de dos très lent, en relâchant les épaules ; sortie par l'échelle et comptage des élèves.", "piscine:sp:flotte"]]},
  {t: "Vitesse : 25 m et 50 m départ plongé", o: "Nager vite sur 25 et 50 m : départ, coulée, fréquence de bras, arrivée.", e: [
    ["Échauffement", 6, "6 longueurs en augmentant l'allure toutes les 2 longueurs.", "piscine:sp:aller"],
    ["Départs", 4, "4 départs plongés au signal du prof : coulée bras tendus, puis 5 m de crawl vite et retour lent.", "piscine:sp:plongeon"]],
   c: [["25 m vite", 8, "3 × 25 m vite, départ plongé, 1 minute de repos ; le partenaire chronomètre et compte les respirations.", "Je respire peu (tous les 3 ou 4 temps) et je garde ma fréquence.", "Départ dans l'eau.", "piscine:sp:plongeon"],
    ["Arrivée", 5, "On s'entraîne à finir bras tendu, sans respirer sur les 5 derniers mètres. 4 arrivées.", "Je touche le mur bras tendu, sans ralentir.", "", "piscine:sp:aller"],
    ["50 m chronométré", 12, "50 m départ plongé, nage au choix, chronométré ; 2 essais séparés de 3 minutes, on garde le meilleur.", "J'améliore mon temps au 2e essai.", "", "piscine:sp:aller"]],
   r: [["Nage souple", 5, "2 longueurs très lentes dans la nage de son choix, en soufflant longuement ; sortie et comptage des élèves.", "piscine:sp:flotte"]]},
  {t: "Relais 4 × 50 m", o: "Nager un relais en équipe : ordre des nageurs, passages sûrs et rapides.", e: [
    ["Échauffement", 6, "6 longueurs en changeant de nage toutes les 2 longueurs (crawl, dos, brasse), à allure lente.", "piscine:sp:aller"],
    ["Composer l'équipe", 4, "Par équipes de 4 de niveau équilibré : on choisit l'ordre (le plus rapide en dernier ?) et la nage de chacun.", "explication"]],
   c: [["Passages de relais", 8, "Le relayeur plonge quand la main du nageur touche le mur. Par 4, 2 passages chacun ; le juge signale tout départ anticipé.", "Je plonge au moment où mon camarade touche.", "", "piscine:sp:relais"],
    ["Relais 4 × 50 m", 12, "Relais 4 × 50 m crawl (ou 4 nages pour les plus forts), 2 manches, chronométrées. Un départ anticipé = 5 s de pénalité.", "Notre équipe améliore son temps à la 2e manche.", "4 × 25 m pour le groupe moins à l'aise.", "piscine:sp:relais"],
    ["Bilan d'équipe", 5, "L'équipe analyse : passages, ordre, allure de chacun ; ce qu'elle changerait.", "Nous expliquons ce qui nous a fait gagner du temps.", "", "explication"]],
   r: [["Nage souple", 5, "2 longueurs très lentes dans la nage de son choix, en soufflant longuement ; sortie et comptage des élèves.", "piscine:sp:flotte"]]},
  {t: "Évaluation : vitesse et virages", o: "Montrer 50 m départ plongé, virages réglementaires, ondulation et relais.", comp: ["HME1", "GSS1", "GSS2", "GSS4"],
   crit: [["50 m chronométré : progrès", 6, "6 : améliore son temps de la leçon 10 de plus de 2 s · 4 : de 0 à 2 s · 2 : même temps ou un peu moins bon · 1 : ne termine pas vite"], ["Départ plongé et arrivée", 3, "3 : départ au signal, coulée, arrivée bras tendu · 2 : un des trois manque · 1 : départ sauté"], ["Virages (culbute, brasse, dos)", 5, "5 : les 3 virages réglementaires et rapides · 3 : 2 sur 3 · 1 : 1 sur 3"], ["15 m ondulation ou papillon", 3, "3 : papillon ou ondulation fluide sur 15 m · 2 : ondulation saccadée · 1 : ne termine pas"], ["Relais : passage", 3, "3 : passage juste, sans départ anticipé · 2 : départ tardif · 0 : départ anticipé"]],
   e: [
    ["Échauffement", 6, "6 longueurs en augmentant l'allure toutes les 2 longueurs (lent, moyen, assez vite), nages au choix.", "piscine:sp:aller"],
    ["Rappel des épreuves", 4, "Au bord : ordre de passage, ce qui est observé, rôle des juges et chronométreurs.", "explication"]],
   c: [["Épreuve 1 : 50 m", 8, "50 m départ plongé chronométré, nage au choix.", "Je bats mon temps de la leçon 10.", "", "piscine:sp:plongeon"],
    ["Épreuve 2 : virages et ondulation", 9, "75 m avec culbute en crawl, virage de brasse et virage de dos (observés), puis 15 m d'ondulation ou de papillon.", "Mes virages sont réglementaires.", "", "piscine:sp:aller"],
    ["Épreuve 3 : relais", 8, "Relais 4 × 50 m par équipes ; le juge observe chaque passage.", "Je pars au bon moment.", "", "piscine:sp:relais"]],
   r: [["Bilan", 5, "Comparaison des temps avec ceux de la leçon 10 ; sortie et comptage.", "explication"]]},
  {t: "Apnée en profondeur et sécurité", o: "Descendre à 3-4 m, se déplacer en apnée en sécurité et remonter un objet lourd.", comp: ["HME1", "HME4", "GSS2"], e: [
    ["Nage libre", 5, "6 longueurs à son rythme dans son couloir, nages au choix ; on double par la gauche et on ne s'arrête pas au milieu du mur.", "piscine:sp:aller"],
    ["Règles de l'apnée", 5, "Au bord : jamais d'hyperventilation, jamais seul (un surveillant par plongeur), on remonte dès la première envie de respirer, on souffle en remontant.", "explication"]],
   c: [["Canard pieds et canard tête", 8, "Canard tête (bras devant, jambes levées) puis canard pieds (on se laisse couler pieds en premier en poussant l'eau vers le haut). 4 de chaque jusqu'au fond.", "Je touche le fond avec les deux techniques.", "", "piscine:sp:plongeon"],
    ["Apnée en déplacement", 9, "Par deux (un plonge, un surveille au bord) : canard, nager 5 m au fond, remonter. Puis 10 m pour les plus à l'aise.", "Je nage 5 m sous l'eau et je remonte calmement.", "Le long de la ligne d'eau.", "piscine:sp:flotte"],
    ["Objet lourd", 8, "Remonter un mannequin ou une brique lestée (2-3 kg) et la ramener au bord en la tenant contre soi, sur le dos.", "Je remonte l'objet et je le ramène 10 m.", "Objet plus léger (anneau).", "piscine:sp:flotte"]],
   r: [["Flottaison", 5, "Étoile de mer, respiration lente ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Remorquages : aisselles et menton", o: "Remorquer un camarade sur 15 m avec deux prises et choisir la bonne.", comp: ["HME1", "HME4", "GSS2", "GSS3"], e: [
    ["Nage libre", 5, "6 longueurs à son rythme dans son couloir, nages au choix ; on double par la gauche et on ne s'arrête pas au milieu du mur.", "piscine:sp:aller"],
    ["Dos jambes de brasse", 5, "2 longueurs sur le dos en jambes de brasse, bras sur la poitrine.", "piscine:sp:aller"]],
   c: [["Prise sous les aisselles", 8, "Par deux de même taille : remorquage du camarade sur le dos, mains sous les aisselles, 2 × 15 m chacun.", "Le visage de mon camarade reste hors de l'eau.", "", "piscine:sp:aller"],
    ["Prise au menton", 9, "Une main sous le menton (sans serrer la gorge), le bras le long de la poitrine du camarade ; l'autre bras nage. 2 × 15 m.", "Je garde une prise sûre et j'avance droit.", "Le camarade aide avec des battements.", "piscine:sp:aller"],
    ["Quelle prise ?", 8, "Le prof annonce une situation (camarade calme, camarade qui s'agite, camarade plus lourd) : chaque binôme choisit sa prise et la réalise sur 15 m.", "Je choisis une prise adaptée et je l'explique.", "", "piscine:sp:aller"]],
   r: [["Flottaison", 5, "Étoile de mer sur le dos 30 s en respirant lentement ; sortie par l'échelle et comptage des élèves.", "piscine:sp:flotte"]]},
  {t: "Parcours de sauvetage chronométré", o: "Enchaîner entrée, nage tête hors de l'eau, objet au fond et remorquage.", comp: ["HME1", "HME4", "GSS2", "GSS3"], e: [
    ["Nage libre", 5, "6 longueurs à son rythme dans son couloir, nages au choix ; on double par la gauche et on ne s'arrête pas au milieu du mur.", "piscine:sp:aller"],
    ["Nage tête hors de l'eau", 5, "2 longueurs de crawl puis de brasse tête hors de l'eau, regard sur un camarade au bout du couloir (on ne le perd pas des yeux).", "piscine:sp:aller"]],
   c: [["Le parcours décomposé", 10, "Entrée sautée (jambes écartées, tête hors de l'eau), 15 m de nage tête hors de l'eau, canard pour remonter l'anneau ou le mannequin, puis remorquage du camarade sur 10 m. On répète chaque partie 2 fois.", "Je réussis chaque partie.", "", "piscine:sp:flotte"],
    ["Parcours complet chronométré", 10, "Le parcours enchaîné, chronométré ; 2 essais, on garde le meilleur. Le partenaire vérifie que le visage du remorqué reste hors de l'eau.", "J'enchaîne le parcours sans m'arrêter.", "Sans le remorquage pour le groupe moins à l'aise.", "piscine:sp:flotte"],
    ["Sortie du camarade", 5, "Aider le camarade à sortir de l'eau par le bord : on le tient aux poignets, on le hisse et on l'allonge sur le côté.", "Je sors mon camarade en sécurité.", "", "explication"]],
   r: [["Bilan", 5, "Ce qui ralentit le parcours, comment gagner du temps sans prendre de risque ; sortie et comptage.", "explication"]]},
  {t: "Nager 600 m : gérer son allure", o: "Nager 600 m en continu en tenant l'allure annoncée.", e: [
    ["Échauffement", 6, "6 longueurs en changeant de nage toutes les 2 longueurs (crawl, dos, brasse), à allure lente.", "piscine:sp:aller"],
    ["Allure annoncée", 4, "Au bord : chacun annonce son temps au 100 m (d'après son 400 m de la leçon 5) et le note au tableau.", "explication"]],
   c: [["4 × 100 m à l'allure", 10, "4 × 100 m à l'allure annoncée, 20 s de repos ; le partenaire note les temps.", "Mes 4 temps sont à ± 3 s de mon allure.", "4 × 50 m pour le groupe moins à l'aise.", "piscine:sp:aller"],
    ["600 m en continu", 12, "600 m sans arrêt (ou 500 m), nages au choix ; le partenaire note le temps à chaque 100 m.", "Je nage 600 m sans m'arrêter, mes 100 m sont réguliers.", "Les plus forts : 800 m.", "piscine:sp:aller"],
    ["Analyse", 3, "Chacun repère son 100 m le plus lent et explique pourquoi.", "J'explique ma gestion d'allure.", "", "explication"]],
   r: [["Flottaison", 5, "Étoile de mer sur le dos 30 s en respirant lentement ; sortie par l'échelle et comptage des élèves.", "piscine:sp:flotte"]]},
  {t: "Préparer son évaluation : séance au choix", o: "Construire et réaliser une séance pour progresser sur son point faible.", e: [
    ["Échauffement", 6, "6 longueurs en changeant de nage toutes les 2 longueurs (crawl, dos, brasse), à allure lente.", "piscine:sp:aller"],
    ["Choisir son point faible", 4, "Au bord : chacun choisit ce qu'il doit travailler pour l'évaluation (apnée, remorquage, 600 m, parcours) et écrit sa séance (3 exercices, distances, repos).", "explication"]],
   c: [["Séance personnelle", 15, "Chacun réalise sa séance dans le couloir correspondant ; un camarade vérifie distances et repos. Le prof passe et corrige.", "Je réalise ma séance comme je l'ai écrite.", "Séance proposée par le prof pour ceux qui ne savent pas quoi choisir.", "piscine:sp:aller"],
    ["Test blanc", 10, "On teste la partie travaillée (ex. parcours chronométré, 300 m à l'allure) et on note le résultat.", "Je sais où j'en suis avant l'évaluation.", "", "piscine:sp:aller"]],
   r: [["Bilan", 5, "Chacun note dans son carnet ce qu'il doit encore améliorer ; sortie et comptage.", "explication"]]},
  {t: "Évaluation : sauvetage et nage longue", o: "Montrer le parcours de sauvetage, le remorquage et 600 m à allure régulière.", comp: ["HME1", "GSS1", "GSS2", "GSS4"],
   crit: [["Parcours : entrée et nage tête hors de l'eau", 3, "3 : entrée sautée tête hors de l'eau, 15 m sans perdre de vue la cible · 2 : tête qui plonge · 1 : arrêt"], ["Parcours : objet au fond", 4, "4 : objet remonté du premier canard · 2 : en 2 essais · 0 : pas remonté"], ["Remorquage 10 m et sortie", 5, "5 : prise sûre, visage hors de l'eau, sortie du camarade en sécurité · 3 : visage qui passe sous l'eau ou sortie aidée · 1 : remorquage incomplet"], ["600 m sans arrêt", 6, "6 : 600 m sans arrêt · 4 : 500 m · 2 : 400 m · 1 : moins"], ["Régularité de l'allure", 2, "2 : 100 m à ± 5 s de l'allure annoncée · 1 : plus irrégulier"]],
   e: [
    ["Échauffement", 6, "6 longueurs libres à allure lente dans son couloir, puis 2 coulées au mur.", "piscine:sp:aller"],
    ["Rappel des épreuves", 4, "Au bord : ordre de passage, ce qui est observé, rôle du partenaire (chronométrer, vérifier le visage du remorqué).", "explication"]],
   c: [["Épreuve 1 : parcours de sauvetage", 10, "Entrée sautée, 15 m tête hors de l'eau, canard pour l'objet, remorquage 10 m, sortie du camarade.", "J'enchaîne tout le parcours en sécurité.", "", "piscine:sp:flotte"],
    ["Épreuve 2 : 600 m", 15, "600 m sans arrêt, nages au choix ; le partenaire note le temps à chaque 100 m.", "Je nage 600 m et je tiens mon allure.", "", "piscine:sp:aller"]],
   r: [["Bilan de l'année", 5, "Comparaison avec le test de la leçon 1 et objectif pour l'an prochain ; sortie et comptage.", "explication"]]}
);

PREPA_ADD(N);
})();
