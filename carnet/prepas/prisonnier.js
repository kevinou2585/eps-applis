/* Balle aux prisonniers (et balles brûlées) : 6 leçons par année (1re → 6e secondaire).
   Règle de sécurité permanente : on touche sous les épaules, ballons en mousse ou caoutchouc souple ; un tir à la tête ne compte pas et donne la balle à l'autre équipe. */
PREPA_ADD({id: 'prisonnier', sport: 'Balle aux prisonniers', mat: 'Ballons en mousse ou caoutchouc souple (6 à 10), cônes et bouteilles, cerceaux, chasubles de 4 couleurs, bancs ou tapis comme abris.', an: {
1: {th: 'Lancer, esquiver, attraper : les règles de la balle aux prisonniers', comp: ['HME1', 'HME2', 'HSC1', 'HSC3'], l: [
  {t: 'Lancer et esquiver', o: 'Lancer à une main vers une cible mobile, sous les épaules ; esquiver en restant dans l\'espace de jeu.', comp: ['HME1', 'HME2', 'GSS2'], e: [
    ['La bouteille chanceuse', 5, 'En cercle autour d\'un cerceau où tournent une bouteille et une balle. Celui que désigne la bouteille prend la balle et essaie de toucher quelqu\'un ; tous s\'enfuient dans les limites du terrain de volley.', 'cercle'],
    ['Pierre-papier-ciseaux brûlé', 5, 'Par deux, une balle sur un cône entre eux : le gagnant du chifoumi prend la balle et essaie de toucher l\'autre qui s\'enfuit vers sa ligne. 5 points puis on change de partenaire.', 'deux']],
   c: [['Brûler dans le cercle', 10, '4 élèves en colonne (mains sur les hanches du précédent) dans un cercle ; 4 autres à l\'extérieur se passent la balle pour toucher le dernier de la colonne, que le premier protège en bougeant. On tourne toutes les 2 minutes.', 'Je touche le dernier en moins de 10 passes.', 'Deux ballons pour les groupes rapides.', 'cercle'],
    ['Le couloir brûlant', 12, 'Une équipe traverse un couloir de 6 m de large ; l\'autre, à l\'extérieur des lignes, lance pour toucher les coureurs sous les épaules. On compte les coureurs arrivés intacts, puis on inverse.', 'Je traverse en regardant le lanceur et j\'esquive.', 'Couloir plus large pour les débutants.', 'course'],
    ['Règle de sécurité', 8, 'Jeu libre (chat à la balle) : un tir à la tête ne compte pas et le lanceur devient chat à pied. Le prof s\'arrête sur chaque exemple pour faire comprendre la règle.', 'Je lance sous les épaules à chaque fois.', '', 'chat']],
   r: [['Retour au calme', 5, 'En cercle, passes à deux mains en disant le prénom du receveur ; étirements des épaules. Rappel : « toucher sous les épaules, jamais plus haut ».', 'etirements']]},
  {t: 'Viser juste : les cibles', o: 'Lancer précisément sur une cible fixe et la protéger.', comp: ['HME2', 'HSC2'], e: [
    ['Roulette brûlée', 5, 'Comme la bouteille chanceuse : le désigné fait 3 pas puis lance sur le plus proche.', 'cercle'],
    ['Lancers sur cônes', 5, 'Par deux à 6 m, une bouteille entre eux : la faire tomber à tour de rôle ; on recule d\'un pas après chaque réussite.', 'deux']],
   c: [['Le cône protégé', 10, 'En duel : chacun protège son cône (à 50 cm minimum, sans se coucher devant) et essaie de faire tomber celui de l\'autre à la main.', 'Je fais tomber le cône adverse au moins une fois.', '', 'deux'],
    ['Bowling brûlé', 20, 'Chaque équipe a des quilles dans un grand cercle au centre de son camp et 2-3 ballons. On lance depuis son camp ou les côtés du camp adverse pour faire tomber toutes les quilles adverses ; personne n\'entre dans les cercles.', 'Mon équipe protège ses quilles et se passe la balle pour viser.', 'Plus de quilles pour allonger les manches.', 'prisonnier']],
   r: [['Retour au calme', 5, 'Étirements ; comment viser juste ? (regarder la cible, bras tendu vers elle).', 'etirements']]},
  {t: 'La balle aux prisonniers : les règles', o: 'Connaître les règles : touché sans rebond, prison, libération.', comp: ['HSC1', 'HSC3'], e: [
    ['Qui en prend le plus', 5, 'Tous au centre ; deux lanceurs derrière les lignes de fond. Chaque élève touché rejoint l\'équipe de celui qui l\'a touché. Quelle équipe sera la plus grande ?', 'course'],
    ['Attraper la balle', 5, 'Par deux : lancers de plus en plus forts vers le ventre, le receveur attrape en serrant la balle contre lui.', 'deux']],
   c: [['Les règles', 5, 'Au tableau : touché sans rebond = prisonnier derrière le camp adverse ; balle attrapée = pas touché ; un prisonnier qui touche un adversaire revient dans son camp ; on ne sort pas de son camp.', 'Je connais les règles.', '', 'explication'],
    ['Balle aux prisonniers', 25, 'Deux équipes, terrain de volley, deux ballons. Manches de 5 minutes ; l\'équipe qui a le moins de prisonniers à la fin gagne. On change les équipes à chaque manche.', 'J\'attrape la balle au lieu de l\'esquiver quand elle arrive vers mon ventre.', 'Quand il y a plus de 3 prisonniers, le premier revient en changeant d\'équipe (jeu équilibré).', 'prisonnier']],
   r: [['Retour au calme', 5, 'Étirements ; retour sur le fair-play : on dit « touché » soi-même.', 'etirements']]},
  {t: 'Variantes : l\'ange gardien et le diamant', o: 'Jouer des variantes et protéger un partenaire ou une cible.', comp: ['HSC1', 'HSC2'], e: [
    ['Bang-bang', 5, 'Duels dos à dos à 5 m, mains sur la tête ; au sifflet, se retourner, ramasser la balle et lancer pendant que l\'autre esquive.', 'deux'],
    ['Passes en mouvement', 5, 'Par 3 : passes en se déplaçant, pour préparer le jeu collectif.', 'trois']],
   c: [['L\'ange gardien', 12, 'Chaque équipe choisit un « ange » qui ne peut jamais être touché : il attrape et renvoie toutes les balles. Ses coéquipiers se protègent derrière lui.', 'Mon équipe utilise l\'ange pour se protéger.', '', 'prisonnier'],
    ['Le diamant', 18, 'Un cône (le diamant) au milieu de chaque camp : le faire tomber fait gagner la manche. Un « immortel » par équipe protège le diamant. Les prisonniers peuvent aussi viser le diamant.', 'Je choisis : viser un joueur ou le diamant.', '', 'prisonnier']],
   r: [['Retour au calme', 5, 'Étirements ; quelle variante préférez-vous et pourquoi ?', 'etirements']]},
  {t: 'Jouer en équipe : passes et stratégie', o: 'Se faire des passes pour lancer de plus près ; élaborer une stratégie d\'équipe.', comp: ['HME4', 'HSC2'], e: [
    ['Brûler dans le cercle', 5, 'Rotation rapide toutes les minutes.', 'cercle'],
    ['Passes avec les prisonniers', 5, 'Explication : la prison peut faire des passes à son camp pour prendre l\'adversaire en tenaille.', 'explication']],
   c: [['Balle aux prisonniers aux échecs', 15, 'Chaque équipe désigne en secret (au prof) un roi, une reine et un cavalier. Roi touché = fin de la manche ; reine touchée = l\'équipe libère tous ses prisonniers adverses ; cavalier touché = il révèle le roi et la reine.', 'Mon équipe protège son roi sans le montrer.', '', 'prisonnier'],
    ['Balle brûlée des quatre coins', 15, '4 équipes en chasubles, une prison dans chaque coin, un ballon par équipe ; on ne marche pas avec la balle (passes). Manches de 3 minutes : l\'équipe qui a le moins de prisonniers marque.', 'Je fais une passe avant de lancer quand je suis loin.', '', 'prisonnier']],
   r: [['Retour au calme', 5, 'Étirements ; quelle stratégie a marché ?', 'etirements']]},
  {t: 'Évaluation : tournoi', o: 'Évaluer la précision du lancer, la réception et l\'esquive, le jeu d\'équipe et le fair-play.', comp: ['HME1', 'HME2', 'HSC1', 'HSC3'], e: [
    ['La bouteille chanceuse', 5, 'Échauffement connu.', 'cercle'],
    ['Consignes', 5, 'Explication des épreuves et de la grille.', 'explication']],
   c: [['Épreuve 1 : précision', 8, '5 lancers sur 3 cônes à 6 m puis 5 lancers sur un camarade qui traverse un couloir : nombre de réussites.', '6 réussites sur 10.', '', 'tir'],
    ['Épreuve 2 : tournoi observé', 22, 'Tournoi de balle aux prisonniers « le diamant » ou « l\'ange gardien » (au choix de la classe), manches de 5 minutes. Le prof observe esquives, réceptions, lancers et fair-play.', 'J\'attrape, j\'esquive et je respecte les règles.', '', 'prisonnier']],
   r: [['Bilan', 5, 'Auto-évaluation et prix du fair-play.', 'explication']]}
]},
2: {th: 'Jeux de balle brûlée à stratégie : rôles, abris et coopération', comp: ['HME1', 'HME2', 'HSC1', 'HSC2'], l: [
  {t: 'Lancer fort et précis', o: 'Améliorer le lancer à bras cassé (élan, rotation, transfert du poids).', comp: ['HME2'], e: [
    ['Passes à deux', 5, 'Par deux à 6 m : passes à une main, de plus en plus loin.', 'deux'],
    ['Le lancer', 5, 'Explication : de profil, bras armé derrière, pas en avant du pied opposé, rotation du tronc.', 'explication']],
   c: [['Tir sur cibles', 12, 'Ateliers : bouteilles à 6, 8 et 10 m ; cerceaux suspendus. Chacun note ses réussites.', 'Je réussis à 8 m au moins 3 fois sur 5.', '', 'tir'],
    ['Balle aux prisonniers classique', 18, 'Matchs de 5 minutes ; un point bonus pour chaque balle attrapée.', 'J\'utilise le lancer appris.', '', 'prisonnier']],
   r: [['Retour au calme', 5, 'Étirements des épaules et des bras.', 'etirements']]},
  {t: 'Les abris : traverse si tu peux', o: 'Se déplacer en utilisant des abris ; lancer au bon moment.', comp: ['HME1', 'HME4'], e: [
    ['Chat à la balle', 5, 'Le chat touche avec la balle (sous les épaules) ; touché = chat aussi.', 'chat'],
    ['Esquives', 5, 'Par 3 : deux lanceurs se font des passes, le troisième esquive au milieu.', 'trois']],
   c: [['Traverse si tu peux', 15, 'Des abris (tapis debout, bancs) jalonnent le terrain. Les coureurs traversent en s\'abritant pendant que les lanceurs tentent de les toucher. Arrivé intact = 1 point.', 'Je choisis le bon moment pour sortir de mon abri.', '', 'libre'],
    ['Prisonniers avec abris', 15, 'Balle aux prisonniers avec 2 abris dans chaque camp.', 'Mon équipe utilise les abris intelligemment.', '', 'prisonnier']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Brûlé à trois équipes', o: 'Coopérer dans une équipe pendant que deux autres s\'opposent.', comp: ['HSC2'], e: [
    ['Qui en prend le plus', 5, 'Jeu de la 1re année.', 'course'],
    ['Passes', 5, 'Passes en mouvement par 4.', 'carre:prisonnier:0']],
   c: [['Brûlé à trois équipes', 20, 'Deux équipes sur les lignes de côté lancent ; la troisième, au centre, ramène un par un des cônes posés sur les côtés. On compte les cônes avant que tous soient touchés ; chaque équipe passe au centre.', 'Mon équipe ramène plus de cônes en se protégeant.', '', 'course'],
    ['Prisonniers', 10, 'Balle aux prisonniers classique avec 2 ballons, manches de 4 minutes.', 'J\'attrape la balle quand elle arrive vers mon ventre.', '', 'prisonnier']],
   r: [['Retour au calme', 5, 'Étirements ; comment avez-vous coopéré ?', 'etirements']]},
  {t: 'Le brûlé en circuit', o: 'Courir, lancer et se passer la balle dans un jeu de type « balle au camp ».', comp: ['HME1', 'HME2', 'HSC2'], e: [
    ['Course de réaction', 5, 'Au signal, sprint vers le cône annoncé.', 'files'],
    ['Lancer loin', 5, 'Lancers le plus loin possible.', 'lancer']],
   c: [['Brûlé en circuit', 30, 'Une équipe de coureurs : chacun lance la balle au loin puis fait le tour des cônes. L\'autre équipe récupère la balle et se fait des passes pour toucher le coureur ou ramener la balle au centre avant lui. Point aux coureurs qui bouclent le tour ; on change après 3 retirés.', 'Je lance loin et dans un trou ; en défense, je passe vite.', '', 'files']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Inventer une variante', o: 'Inventer en groupe une variante de balle aux prisonniers et la faire jouer.', comp: ['HSC1', 'HSC2'], e: [
    ['Échauffement mené par élèves', 5, 'Un groupe mène un jeu d\'échauffement connu.', 'cercle'],
    ['Consignes', 5, 'Chaque groupe invente une règle nouvelle (rôle, cible, abri, libération) qui garde le jeu sûr et équilibré.', 'explication']],
   c: [['Création', 10, 'Par groupes de 4-5 : écrire la variante (but, règle nouvelle, sécurité) et dessiner le terrain.', 'Notre variante est claire, sûre et équilibrée.', '', 'explication'],
    ['Essais', 20, 'Chaque groupe fait jouer sa variante 5 minutes à la classe ; la classe vote pour la meilleure.', 'J\'explique ma règle clairement.', '', 'prisonnier']],
   r: [['Retour au calme', 5, 'Étirements ; quelle variante garder ?', 'etirements']]},
  {t: 'Évaluation : tournoi des stratèges', o: 'Montrer lancer, esquive et stratégie d\'équipe.', comp: ['HME1', 'HME2', 'HSC1', 'HSC2'], e: [
    ['Échauffement connu', 5, 'Bouteille chanceuse et brûler dans le cercle.', 'cercle'],
    ['Consignes', 5, 'Explication des épreuves, de l\'ordre de passage et de la grille d\'évaluation.', 'explication']],
   c: [['Épreuve 1 : lancer', 8, '5 lancers sur des cibles (bouteilles ou cerceaux) à 8 m ; le partenaire compte les réussites.', '3 réussites sur 5.', '', 'tir'],
    ['Épreuve 2 : tournoi', 22, 'Tournoi avec la variante votée et le jeu des échecs ; grille : lancers, esquives, réceptions, stratégie, fair-play.', 'Je joue pour mon équipe et je respecte les règles.', '', 'prisonnier']],
   r: [['Bilan', 5, 'Auto-évaluation sur la fiche puis comparaison avec la grille du prof.', 'explication']]}
]},
3: {th: 'Jeux de cibles et d\'invasion : du prisonnier au tchoukball et au kin-ball', comp: ['HME2', 'HME4', 'HSC1', 'HSC2'], l: [
  {t: 'Le jeu de la tour (passes et démarquage)', o: 'Se démarquer et faire des passes pour atteindre une cible.', comp: ['HME4', 'HSC2'], e: [
    ['Passes à 4', 5, 'Carrés de passes en mouvement.', 'carre:prisonnier:0'],
    ['10 passes', 5, 'Jeu des 10 passes.', 'match:prisonnier:4c4']],
   c: [['La tour', 30, 'Un élève debout sur un banc (ou dans un cerceau) au fond de chaque camp : marquer en lui faisant une passe qu\'il attrape. Pas de contact, 3 pas maximum, zone interdite autour.', 'Je me démarque pour recevoir.', '', 'match:prisonnier:5c5']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Balle brûlée et passes', o: 'Combiner passes et tirs pour toucher dans une balle aux prisonniers rapide.', comp: ['HME2', 'HSC2'], e: [
    ['Brûler dans le cercle', 5, 'Rotation rapide.', 'cercle'],
    ['Passes rapides', 5, 'Par 3, passes rapides.', 'trois']],
   c: [['Prisonniers sans camp', 15, 'Tout le terrain : on ne marche pas avec la balle, on se fait des passes pour toucher un adversaire (équipes en chasubles). Touché = assis sur le côté, libéré si un coéquipier attrape une balle.', 'Je passe vite pour surprendre.', '', 'libre'],
    ['Prisonniers classique', 15, 'Balle aux prisonniers classique, matchs de 5 minutes ; un point bonus pour une passe avant un tir réussi.', 'Je fais une passe avant de tirer quand je suis loin.', '', 'prisonnier']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Le tchoukball (initiation)', o: 'Tirer sur un cadre de rebond et attraper le rebond (jeu sans contact).', comp: ['HME2', 'HSC1', 'HSC3'], e: [
    ['Rebonds', 5, 'Par deux : lancer contre le mur et rattraper le rebond.', 'mur'],
    ['Règles', 5, 'Pas de contact, pas d\'interception ; un point si le rebond tombe au sol dans le terrain.', 'explication']],
   c: [['Tchoukball', 30, 'Avec un cadre (ou un banc renversé contre le mur) : 3 passes maximum, puis tir ; l\'équipe adverse doit attraper le rebond.', 'Je tire vers une zone vide.', '', 'match:prisonnier:5c5']],
   r: [['Retour au calme', 5, 'Étirements ; le tchoukball, un jeu sans contact créé pour éviter les blessures.', 'etirements']]},
  {t: 'Le kin-ball ou la balle géante', o: 'Coopérer à 4 pour frapper et attraper une grosse balle.', comp: ['HME2', 'HSC2'], e: [
    ['Passes coopératives', 5, 'Par 4 : garder un gros ballon en l\'air.', 'carre:prisonnier:0'],
    ['Règles', 5, 'On annonce « omnikin » + couleur de l\'équipe qui doit attraper.', 'explication']],
   c: [['Kin-ball', 30, 'Trois équipes de 4 ; l\'équipe annoncée doit attraper la balle avant qu\'elle tombe.', 'Mon équipe attrape la balle 3 fois sur 5.', 'Avec un gros ballon de gym si pas de kin-ball.', 'match:prisonnier:4c4']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules, du dos et des jambes, 20 s chacun, en cercle.', 'etirements']]},
  {t: 'Tournoi multi-jeux', o: 'Jouer à plusieurs jeux de balle et arbitrer.', comp: ['HSC1', 'HSC3'], e: [
    ['Échauffement par équipe', 5, 'Passes et lancers.', 'trois'],
    ['Organisation', 5, 'Rotation sur 3 terrains (prisonniers, tchoukball, kin-ball).', 'explication']],
   c: [['Tournoi', 30, 'Rotation toutes les 8 minutes sur les 3 terrains ; une équipe arbitre.', 'J\'adapte mon jeu à chaque règle.', '', 'tournoi:prisonnier']],
   r: [['Retour au calme', 5, 'Résultats, étirements.', 'etirements']]},
  {t: 'Évaluation : jeux de balle', o: 'Montrer passes, démarquage, tirs et fair-play dans plusieurs jeux.', comp: ['HME2', 'HME4', 'HSC1', 'HSC2'], e: [
    ['Échauffement en autonomie', 5, 'Chaque équipe s\'échauffe seule avec sa fiche (mobilisation, exercices techniques, essais).', 'trois'],
    ['Consignes', 5, 'Explication de la grille d\'observation et des critères.', 'explication']],
   c: [['Matchs observés', 30, 'Matchs de balle aux prisonniers et du jeu préféré de la classe ; grille : passes, démarquage, tirs, règles, fair-play.', 'Je participe au jeu collectif en respectant les règles.', '', 'prisonnier']],
   r: [['Bilan', 5, 'Auto-évaluation sur la fiche puis comparaison avec la grille du prof.', 'explication']]}
]},
4: {th: 'Arbitrer, organiser et inventer des jeux de balle', comp: ['HSC1', 'HSC2', 'HSC3', 'HME2'], l: [
  {t: 'Arbitrer la balle aux prisonniers', o: 'Arbitrer : voir les touches, les rebonds, les sorties et les tirs à la tête ; annoncer clairement.', comp: ['HSC1', 'HSC3'], e: [
    ['La bouteille chanceuse', 5, 'Échauffement connu : le désigné par la bouteille essaie de toucher quelqu\'un sous les épaules.', 'cercle'],
    ['Gestes de l\'arbitre', 5, 'Au tableau puis debout : gestes pour « touché », « rebond, pas touché », « tête : balle à l\'autre équipe », « sortie du camp », « balle attrapée ».', 'explication']],
   c: [['Situations à juger', 8, 'Le prof et 4 élèves rejouent des situations litigieuses (balle qui touche puis est rattrapée par un coéquipier, rebond sur le mur…) ; la classe décide et justifie.', 'Je justifie ma décision avec la règle.', '', 'explication'],
    ['Matchs arbitrés', 22, 'Matchs de 5 minutes ; deux arbitres élèves par match (un par camp), rotation à chaque match. Après chaque match, les joueurs disent si l\'arbitrage était clair.', 'J\'arbitre sans hésiter et avec les bons gestes.', '', 'prisonnier']],
   r: [['Retour au calme', 5, 'Retour des arbitres : quelle décision était difficile ? Étirements.', 'etirements']]},
  {t: 'Balle aux prisonniers à 4 camps', o: 'Jouer un jeu à 4 équipes en choisissant ses cibles et ses alliances.', comp: ['HME4', 'HSC2'], e: [
    ['Passes en carré', 5, 'Par 4 en carré : passes rapides à une main, changement de sens au signal.', 'carre:prisonnier:0'],
    ['Règles', 5, 'Terrain en croix (4 camps), chaque équipe peut viser les 3 autres ; prison derrière chaque camp ; un prisonnier libéré revient dans son camp.', 'explication']],
   c: [['4 camps', 20, 'Manches de 4 minutes avec 3 ballons ; l\'équipe qui a le moins de prisonniers à la fin marque 3 points, la 2e 2 points, la 3e 1 point.', 'Mon équipe choisit une cible plutôt que de lancer au hasard.', '', 'prisonnier'],
    ['4 camps avec rois', 10, 'Chaque équipe a un roi secret ; roi touché = toute l\'équipe en prison.', 'Nous protégeons notre roi sans le montrer.', '', 'prisonnier']],
   r: [['Retour au calme', 5, 'Étirements ; faut-il viser l\'équipe la plus forte ou la plus faible ?', 'etirements']]},
  {t: 'Inventer un jeu pour des plus jeunes', o: 'Concevoir en groupe un jeu de balle sûr et amusant pour des élèves de 1re.', comp: ['HSC1', 'HSC2'], e: [
    ['Jeu connu', 5, 'Brûler dans le cercle, rotation rapide.', 'cercle'],
    ['La fiche du jeu', 5, 'Explication de la fiche : but du jeu, terrain et matériel, règles (3 maximum), sécurité, variante plus facile et plus difficile.', 'explication']],
   c: [['Conception', 15, 'Par groupes de 4-5 : remplir la fiche et dessiner le terrain.', 'Notre fiche est complète et notre jeu est sûr.', '', 'explication'],
    ['Premier essai', 15, 'Deux groupes testent leur jeu avec la classe (7 minutes chacun) ; la classe donne un avis.', 'J\'explique les règles en moins d\'une minute.', '', 'prisonnier']],
   r: [['Retour au calme', 5, 'Étirements ; chaque groupe note ce qu\'il change.', 'etirements']]},
  {t: 'Mener un jeu et un échauffement', o: 'Mener un échauffement ludique et un jeu pour la classe.', comp: ['HSC1', 'GSS1'], e: [
    ['Échauffements menés par élèves', 10, 'Trois groupes mènent chacun 3 minutes d\'échauffement ludique (jeu de course, de passes, de réaction).', 'cercle']],
   c: [['Jeux menés par les groupes', 30, 'Les autres groupes mènent leur jeu (7 minutes chacun) ; après chaque jeu, la classe dit une chose réussie et un conseil (consignes, sécurité, rythme).', 'Mon groupe gère le jeu sans l\'aide du prof.', '', 'prisonnier']],
   r: [['Retour au calme', 5, 'Retours sur l\'animation ; étirements.', 'etirements']]},
  {t: 'Tournoi organisé par les élèves', o: 'Organiser un tournoi : planning, arbitres, résultats.', comp: ['HSC1', 'HSC2', 'HSC3'], e: [
    ['Organisation', 5, 'Répartition des rôles : responsable du planning, des arbitres, des résultats, du matériel.', 'explication'],
    ['Échauffement par équipe', 5, 'Chaque équipe s\'échauffe seule (passes, lancers sur cibles).', 'cercle']],
   c: [['Tournoi', 30, 'Tournoi sur 2 terrains avec les deux meilleurs jeux inventés et la balle aux prisonniers ; matchs de 6 minutes ; arbitrage par les équipes au repos.', 'Le tournoi se déroule sans l\'aide du prof.', '', 'tournoi:prisonnier']],
   r: [['Retour au calme', 5, 'Résultats et prix du fair-play ; étirements.', 'etirements']]},
  {t: 'Évaluation : arbitrer et animer', o: 'Évaluer l\'arbitrage, l\'animation d\'un jeu et le jeu lui-même.', comp: ['HSC1', 'HSC2', 'HSC3'], e: [
    ['Échauffement mené par un groupe', 5, 'Un groupe mène l\'échauffement de la classe (jeu de course, de passes ou de réaction) avec sa fiche.', 'cercle'],
    ['Consignes', 5, 'Explication de la grille : arbitrage, animation, jeu.', 'explication']],
   c: [['Arbitrage observé', 15, 'Matchs de balle aux prisonniers : chaque élève arbitre 5 minutes, observé par le prof.', 'J\'arbitre avec les bons gestes et sans hésiter.', '', 'prisonnier'],
    ['Animation observée', 15, 'Les groupes qui n\'ont pas été évalués mènent leur jeu.', 'Mes consignes sont claires et le jeu est sûr.', '', 'prisonnier']],
   r: [['Bilan', 5, 'Auto-évaluation sur la fiche puis comparaison avec la grille du prof.', 'explication']]}
]},
5: {th: 'Jeux de balle et condition physique : intensité, coopération, stratégie', comp: ['HME1', 'HSC2', 'GSS1'], l: [
  {t: 'Jouer et mesurer son effort', o: 'Mesurer l\'intensité d\'un jeu par le pouls et la relier à la santé.', comp: ['GSS1', 'GSS5'], e: [
    ['Pouls au repos', 4, 'Chacun prend son pouls au repos (15 s × 4) et le note.', 'explication'],
    ['Échauffement', 6, 'Course lente, mobilisation, chat à la balle.', 'chat']],
   c: [['Prisonniers rapides', 25, '4 matchs de 4 minutes avec 3 ballons ; après chaque match, pouls pris et noté.', 'Je relie l\'intensité du jeu à mon pouls.', '', 'prisonnier'],
    ['Comparaison', 5, 'Chacun compare ses pouls à sa fréquence maximale estimée (220 - âge) et à la zone d\'effort recommandée.', 'Je situe mon effort dans une zone.', '', 'explication']],
   r: [['Retour au calme', 5, 'Pouls de récupération après 1 et 3 minutes ; étirements.', 'etirements']]},
  {t: 'Prisonniers fitness', o: 'Combiner jeu et renforcement : le prisonnier fait un exercice avant de rejoindre la prison.', comp: ['GSS1', 'HSC2'], e: [
    ['Activation', 6, 'Course, montées de genoux, gainage 2 × 20 s.', 'libre'],
    ['Consignes', 4, 'Au mur, la liste des exercices (10 squats, 5 pompes, 20 s de gainage) ; chaque prisonnier en fait un avant d\'entrer en prison.', 'explication']],
   c: [['Prisonniers fitness', 30, 'Balle aux prisonniers classique avec exercice obligatoire ; manches de 5 minutes, on change d\'exercice à chaque manche.', 'Je fais l\'exercice correctement avant de reprendre le jeu.', '', 'prisonnier']],
   r: [['Retour au calme', 5, 'Étirements des cuisses et des épaules.', 'etirements']]},
  {t: 'Stratégie d\'équipe', o: 'Préparer un plan de jeu et l\'adapter pendant le match.', comp: ['HSC2'], e: [
    ['Échauffement par équipe', 6, 'Passes et lancers sur cibles.', 'cercle'],
    ['Plan de jeu', 4, 'Chaque équipe écrit son plan (qui protège le roi, qui attaque, comment utiliser la prison).', 'explication']],
   c: [['Matchs avec plan', 30, 'Échecs ou diamant ; un temps mort de 30 s par manche ; après chaque match, l\'équipe dit si son plan a fonctionné.', 'Notre plan est visible dans le jeu.', '', 'prisonnier']],
   r: [['Retour au calme', 5, 'Bilan des plans ; étirements.', 'etirements']]},
  {t: 'Jeux coopératifs', o: 'Jouer des jeux où l\'on gagne ensemble ; mesurer le progrès de la classe.', comp: ['HSC2', 'HSC3'], e: [
    ['Ballon géant', 6, 'Par 4 : garder un gros ballon en l\'air sans le tenir.', 'carre:prisonnier:0'],
    ['Défis', 4, 'Présentation des défis de classe.', 'explication']],
   c: [['Défis coopératifs', 30, 'Record de passes de la classe sans chute ; brûlé inversé (la classe doit libérer tous ses prisonniers en moins de 3 minutes) ; parcours de passes chronométré. On essaie de battre son record.', 'La classe bat au moins un record.', '', 'libre']],
   r: [['Retour au calme', 5, 'Retour : qu\'est-ce qui a aidé la classe à réussir ? Étirements.', 'etirements']]},
  {t: 'Tournoi en autonomie', o: 'Jouer un tournoi en autonomie, arbitré par les élèves.', comp: ['HSC1', 'HSC3'], e: [
    ['Échauffement en autonomie', 6, 'Chaque équipe s\'échauffe seule.', 'cercle'],
    ['Organisation', 4, 'Tableau du tournoi et arbitres.', 'explication']],
   c: [['Tournoi', 30, 'Tournoi avec plusieurs variantes, matchs de 6 minutes.', 'Je joue et j\'arbitre en respectant les règles.', '', 'tournoi:prisonnier']],
   r: [['Retour au calme', 5, 'Annonce des résultats et du prix du fair-play, puis étirements en cercle.', 'etirements']]},
  {t: 'Évaluation', o: 'Évaluer le jeu, la stratégie et la gestion de l\'effort.', comp: ['HME1', 'HSC2', 'GSS1'], e: [
    ['Échauffement en autonomie', 6, 'Chaque équipe s\'échauffe.', 'cercle'],
    ['Consignes', 4, 'Explication de la grille d\'observation et des critères.', 'explication']],
   c: [['Matchs observés', 30, 'Grille : lancers, esquives, réceptions, stratégie, fair-play ; chacun note son pouls à la fin.', 'Je joue intensément et intelligemment.', '', 'prisonnier']],
   r: [['Bilan', 5, 'Auto-évaluation écrite sur la fiche, puis comparaison avec la grille du prof.', 'explication']]}
]},
6: {th: 'Animer : concevoir et mener des jeux de balle pour un groupe', comp: ['HSC1', 'HSC2', 'HSC3', 'GSS1'], l: [
  {t: 'Projet d\'animation', o: 'Choisir un public (plus jeunes, classe) et préparer un jeu à mener.', comp: ['HSC1', 'HSC2'], e: [
    ['Jeu connu', 5, 'La bouteille chanceuse.', 'cercle'],
    ['Présentation', 5, 'Le projet : chaque groupe mènera un échauffement et un jeu de balle de 10 minutes.', 'explication']],
   c: [['Préparation', 30, 'Par groupes : fiche du jeu (but, règles, matériel, sécurité, variantes), plan de l\'échauffement, répartition des rôles dans le groupe.', 'Notre fiche est complète.', '', 'explication']],
   r: [['Retour au calme', 5, 'Mise en commun de ce que chaque groupe a préparé ; étirements.', 'etirements']]},
  {t: 'Tester son jeu', o: 'Faire tester son jeu et l\'améliorer.', comp: ['HSC1', 'HSC2'], e: [
    ['Échauffement mené par un groupe', 10, 'Un groupe mène son échauffement.', 'cercle']],
   c: [['Tests', 30, 'Trois groupes mènent leur jeu 8 minutes ; la classe donne une chose réussie et un conseil.', 'Nos consignes sont claires.', '', 'prisonnier']],
   r: [['Retour au calme', 5, 'Ajustements notés.', 'etirements']]},
  {t: 'Animer (1)', o: 'Mener son jeu devant la classe.', comp: ['HSC1', 'HSC3'], e: [
    ['Échauffement mené par un groupe', 10, 'Un autre groupe mène l\'échauffement de la classe avec sa fiche.', 'cercle']],
   c: [['Animation', 30, 'Les groupes suivants mènent leur jeu ; observation avec la grille.', 'Je gère le groupe et la sécurité.', '', 'prisonnier']],
   r: [['Retour au calme', 5, 'Chacun dit une chose réussie et un conseil ; étirements.', 'etirements']]},
  {t: 'Animer (2)', o: 'Mener son jeu amélioré.', comp: ['HSC1', 'HSC3'], e: [
    ['Échauffement mené par un groupe', 10, 'Un autre groupe mène l\'échauffement de la classe avec sa fiche.', 'cercle']],
   c: [['Animation', 30, 'Les groupes mènent leur jeu amélioré (ou pour des plus jeunes si possible).', 'J\'ajuste selon les retours.', '', 'prisonnier']],
   r: [['Retour au calme', 5, 'Chacun dit une chose réussie et un conseil ; étirements.', 'etirements']]},
  {t: 'Tournoi final', o: 'Organiser le tournoi des meilleurs jeux.', comp: ['HSC1', 'HSC2', 'HSC3'], e: [
    ['Organisation', 10, 'Rôles et planning.', 'explication']],
   c: [['Tournoi', 30, 'Tournoi des 3 meilleurs jeux inventés par la classe, sur 3 terrains en rotation, arbitré par les élèves.', 'Le tournoi se déroule sans le prof.', '', 'tournoi:prisonnier']],
   r: [['Retour au calme', 5, 'Annonce des résultats et du prix du fair-play, puis étirements en cercle.', 'etirements']]},
  {t: 'Évaluation : animation', o: 'Évaluer l\'animation d\'un jeu et la participation.', comp: ['HSC1', 'HSC2', 'HSC3', 'GSS1'], e: [
    ['Échauffement mené par un groupe', 10, 'Un groupe mène l\'échauffement de la classe avec sa fiche.', 'cercle']],
   c: [['Animation observée', 30, 'Grille : clarté des consignes, sécurité, gestion du groupe, adaptation du jeu.', 'J\'anime avec clarté et sécurité.', '', 'prisonnier']],
   r: [['Bilan écrit', 5, 'Bilan individuel écrit : mon rôle, mes progrès, ce que je referais autrement.', 'explication']]}
]}
}});
