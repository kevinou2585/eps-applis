/* Basket-ball : une séquence de 6 leçons par année (1re → 6e secondaire), du plus simple au plus exigeant.
   e = échauffement, c = corps de leçon, r = retour au calme. [nom, minutes, consigne, (réussite, variante,) schéma] */
PREPA_ADD({id: 'basket', sport: 'Basket-ball', mat: '1 ballon par élève (taille 5 ou 6), chasubles de 4 couleurs, cônes, coupelles, 2 à 6 paniers, sifflet, chrono.', an: {
1: {th: 'Découvrir le basket : dribbler, passer, tirer et jouer à 3 contre 3', comp: ['HME2', 'HME4', 'HSC1', 'HSC3'], l: [
  {t: 'Maîtriser le ballon : le dribble', o: 'Dribbler main droite et main gauche sans regarder le ballon, en protégeant son ballon.', e: [
    ['Manipulations sur place', 4, 'Chacun son ballon : faire le tour de la taille, des genoux, en 8 entre les jambes ; dribbles très bas, puis très hauts, main droite puis main gauche.', 'libre'],
    ['Attraper la balle', 6, 'Tout le monde dribble dans un demi-terrain. 2 à 3 « voleurs » sans ballon essaient de chiper un ballon : celui qui le perd devient voleur. Le dribble est obligatoire.', 'voleurs']],
   c: [['Le dribble protégé', 10, 'Dans un demi-terrain, chacun dribble et protège son ballon (corps entre ballon et adversaire) tout en essayant de faire sortir le ballon des autres. Qui perd son ballon fait un tour de terrain en dribble puis revient.', 'Je garde mon ballon 30 secondes sans le perdre.', 'Main faible imposée pendant une minute.', 'libre'],
    ['Slalom aller-retour', 8, 'Par colonnes de 4 : slalom entre 5 cônes main droite à l\'aller, main gauche au retour, puis on passe le ballon au suivant.', 'Je fais l\'aller-retour sans toucher de cône et sans regarder le ballon.', 'Changer de main à chaque cône.', 'slalom:basket'],
    ['Traverser la rivière', 8, '2 « crocodiles » au milieu du terrain. Les autres traversent en dribble d\'une ligne de fond à l\'autre ; un dribbleur touché ou qui perd son ballon devient crocodile.', 'Je traverse 3 fois sans être touché.', 'Les crocodiles ont aussi un ballon et doivent dribbler.', 'chat']],
   r: [['Dribble les yeux fermés', 5, 'En cercle, dribble sur place les yeux fermés, main droite puis gauche, puis étirements des poignets, épaules et mollets. Rappel : « je regarde devant moi, pas mon ballon ».', 'etirements']]},
  {t: 'Passer et recevoir', o: 'Réaliser une passe à deux mains poitrine et une passe à terre, recevoir mains en coupe bras tendus.', e: [
    ['Formation de groupes', 4, 'Tout le monde dribble ; au signal le prof annonce un nombre (2, 3, 4) : former un groupe de ce nombre sans arrêter de dribbler.', 'libre'],
    ['Passes à deux sur place', 6, 'Par deux à 3-4 m : passe poitrine (pouces vers le bas à la fin), puis passe à terre (rebond aux 2/3 de la distance). On recule d\'un pas après 5 passes réussies.', 'deux']],
   c: [['Va rapidement', 8, 'Groupes de 4-5 en petit cercle, un ballon chacun : tous passent en même temps au voisin de droite. Compter les tours sans faire tomber de ballon.', 'Notre groupe fait 5 tours sans chute.', 'Changer de sens au sifflet ; passe à terre uniquement.', 'cercle'],
    ['Bobinho', 8, 'Cercle de 6 avec 2 défenseurs au centre. Le cercle se passe le ballon ; le défenseur qui intercepte prend la place du passeur fautif.', 'Ma passe arrive dans les mains du partenaire.', 'Interdire la passe au voisin direct.', 'carre:basket:2'],
    ['Jeu des 10 passes', 12, 'Deux équipes sur un demi-terrain. 10 passes à la suite sans interception = 1 point. Interdit de marcher avec le ballon et pas de contact.', 'Mon équipe réussit 10 passes au moins une fois.', 'Autoriser 2 dribbles ; 6 passes si la classe peine.', 'match:basket:4c4']],
   r: [['Passe-moi le nom', 5, 'En cercle, on se passe le ballon en disant le prénom du receveur. Puis étirements des bras et des épaules.', 'cercle']]},
  {t: 'Tirer au panier', o: 'Tirer à une main, coude sous le ballon, poignet cassé vers le panier ; choisir une distance adaptée.', e: [
    ['Course au centre', 5, 'Deux équipes sur les lignes de fond, ballons au centre. Au signal, chacun prend un ballon, revient en dribble puis le rapporte. Première équipe complète gagne.', 'files'],
    ['Le geste du tireur', 5, 'Sans panier : allongé sur le dos, lancer le ballon vers le plafond à une main (coude sous le ballon) et le rattraper. Puis debout, tirs très près du panier en s\'aidant de la planche.', 'libre']],
   c: [['1, 2 ou 3 points', 10, 'Par 3 au panier : 3 distances marquées (proche = 1 pt, moyenne = 2 pts, loin = 3 pts). Chacun tire de face puis en diagonale en utilisant la planche.', 'Je réussis 2 tirs sur 5 à 2 points.', 'Défi : battre son score de la première série.', 'tir:basket'],
    ['Dribble + tir', 8, 'Départ du milieu de terrain : dribble jusqu\'à la raquette, arrêt 2 pieds, tir. On récupère son rebond et on revient par le côté.', 'Je m\'arrête équilibré avant de tirer.', 'Arrêt en 1-2 (pied droit puis gauche).', 'slalom:basket'],
    ['Panier !', 10, 'Une colonne par panier. Celui qui marque gagne un point ; celui qui rate retourne en fin de colonne. Pas d\'élimination : on compte les points.', 'Je marque au moins 3 paniers.', 'Le tireur choisit sa zone : 1, 2 ou 3 points.', 'tir:basket']],
   r: [['Lancers francs au calme', 5, 'Chacun 3 lancers francs en respirant calmement avant chaque tir ; étirements des épaules et des poignets.', 'tir:basket']]},
  {t: 'Jouer ensemble : conserver et avancer', o: 'Faire progresser le ballon vers le panier par des passes et se démarquer dans un espace libre.', e: [
    ['Chat passeur', 5, 'Les chats ne touchent un fuyard qu\'avec le ballon en main : ils doivent se faire des passes pour s\'approcher (pas de dribble).', 'chat'],
    ['Passe et suis', 5, 'Par 4 dans un carré de cônes : je passe et je cours prendre la place de celui à qui j\'ai passé.', 'carre:basket']],
   c: [['Passe à l\'espion', 10, 'Deux équipes, chacune dans son demi-terrain ; un joueur de chaque équipe se place derrière la ligne de fond adverse. Une passe réussie à son « espion » : le passeur va le rejoindre.', 'Je me déplace dans un espace libre pour recevoir.', 'Ajouter un défenseur devant la ligne de fond.', 'match:basket:4c4'],
    ['3 contre 1 vers la cible', 8, 'Sur demi-terrain, 3 attaquants contre 1 défenseur : marquer en moins de 4 passes. On tourne les rôles.', 'Nous marquons sans perdre le ballon 2 fois sur 3.', '3 contre 2.', 'demi:basket:3c1'],
    ['Panier après 5 passes', 10, '4 contre 4 sur demi-terrain. Un panier ne compte qu\'après 5 passes entre joueurs différents.', 'Mon équipe marque au moins une fois.', 'Classes à l\'aise : 3 passes, dribble autorisé.', 'match:basket:4c4']],
   r: [['Bilan en équipe', 5, 'Assis par équipe : chacun dit une bonne action d\'un coéquipier. Étirements des jambes.', 'explication']]},
  {t: 'Les règles et le match à 3 contre 3', o: 'Connaître et faire respecter le marcher, le double dribble, le contact ; arbitrer un camarade.', comp: ['HME2', 'HSC1', 'HSC2', 'HSC3'], e: [
    ['Dribble + changement de main', 5, 'Traversées en dribble, changement de main à chaque ligne du terrain.', 'files'],
    ['Les règles mimées', 5, 'Le prof montre le marcher, le double dribble, le contact et la sortie ; les élèves miment chaque faute et le geste de l\'arbitre.', 'explication']],
   c: [['Tournoi 3 contre 3', 20, 'Matchs de 5 minutes sur demi-terrain. L\'équipe au repos arbitre (un arbitre, un marqueur). Panier valable après 3 passes, puis jeu libre au 3e match.', 'Je fais moins de 2 fautes par match ; j\'arbitre avec le bon geste.', 'Lancer franc après chaque faute de contact.', 'demi:basket:3c3'],
    ['Les rôles', 8, 'Au repos : un arbitre (siffle et montre la faute), un marqueur (score), un observateur (compte les passes de son équipe).', 'Je tiens mon rôle tout le match.', 'L\'observateur donne un conseil à la fin.', 'match:basket:3c3']],
   r: [['Fair-play', 5, 'Poignée de mains entre équipes, puis chaque équipe désigne le joueur le plus fair-play. Étirements.', 'etirements']]},
  {t: 'Évaluation : parcours, tirs et match', o: 'Montrer ses progrès en dribble, en tir et dans le jeu à 3 contre 3.', e: [
    ['Échauffement connu', 5, 'Attraper la balle (voleurs) puis manipulations main droite / main gauche.', 'voleurs'],
    ['Tirs libres', 5, 'Chacun à son panier : tirs proches puis à distance moyenne.', 'tir:basket']],
   c: [['Épreuve 1 : parcours dribble', 8, 'Slalom main droite à l\'aller entre 5 cônes, main gauche au retour, puis tir. 2 essais, le meilleur compte.', 'Parcours sans faute en moins de 25 s.', 'Les élèves en attente chronomètrent.', 'slalom:basket'],
    ['Épreuve 2 : tirs', 7, '5 tirs à 2 points et 3 lancers francs. Un camarade compte les réussites.', '4 réussites sur 8.', '', 'tir:basket'],
    ['Épreuve 3 : match observé', 13, 'Matchs 3 contre 3 de 5 minutes « panier après 3 passes ». Le prof observe : démarquage, passes, respect des règles ; les élèves au repos arbitrent.', 'Je participe au jeu et je respecte les règles.', '', 'demi:basket:3c3']],
   r: [['Retour sur le cycle', 5, 'Chacun dit ce qu\'il a le plus amélioré. Étirements.', 'explication']]}
]},
2: {th: 'Avancer vers le panier : double pas, passe et va, démarquage', comp: ['HME2', 'HME4', 'HSC1', 'HSC2'], l: [
  {t: 'Dribble de progression et changements de direction', o: 'Dribbler vite vers l\'avant, changer de direction devant un défenseur sans perdre le ballon.', e: [
    ['Dribble en musique', 5, 'Dribble libre ; au signal : changement de main, demi-tour, arrêt 2 pieds, accélération.', 'libre'],
    ['Miroir dribbleur', 5, 'Par deux, chacun son ballon : le meneur dribble et change de direction, l\'autre copie.', 'deux']],
   c: [['Dribble contre défenseur', 10, 'Couloir de 4 m : 1 dribbleur contre 1 défenseur qui recule. Atteindre la ligne de fond en changeant de main et de direction. Le défenseur garde les mains dans le dos au début.', 'Je passe la ligne 3 fois sur 5.', 'Le défenseur peut utiliser les mains (sans contact).', 'demi:basket:1c1'],
    ['Relais slalom chronométré', 8, 'Par équipes de 4 : slalom aller en accélérant, changement de main devant chaque cône, retour en vitesse, on donne le ballon au suivant.', 'Je ne perds jamais le ballon.', 'Retour en dribble main faible uniquement.', 'slalom:basket'],
    ['Jeu des 4 coins', 8, '4 équipes dans les 4 coins. Au signal, traverser en dribble vers le coin opposé sans contact ni perte de balle ; on compte les traversées réussies.', 'Je change de direction pour éviter les autres.', 'Un défenseur au centre.', 'libre']],
   r: [['Retour en marchant', 5, 'Dribble en marchant, respiration lente ; étirements des mollets et des cuisses.', 'etirements']]},
  {t: 'Le double pas (lay-up)', o: 'Enchaîner course, deux appuis (droite-gauche à droite) et tir à une main contre la planche.', e: [
    ['Le rythme sans ballon', 5, 'Courses avec le rythme « grand pas, petit pas, saut vers le haut » ; on lève le genou du côté de la main qui tire.', 'files'],
    ['Lay-up à l\'arrêt', 5, 'Ballon en main à 1 pas du panier : un appui gauche (pour les droitiers) et tir dans le carré de la planche.', 'tir:basket']],
   c: [['Double pas en colonnes', 10, 'Colonne à 45° du panier : 1 dribble, double pas, tir. On récupère son rebond et on passe au suivant. Côté droit puis côté gauche.', 'Je réussis le double pas sans marcher 4 fois sur 5.', 'Partir de plus loin avec 2-3 dribbles.', 'tir:basket'],
    ['Passe et double pas', 8, 'Deux colonnes : le passeur donne au coureur qui part, réception en course, double pas et tir.', 'Je reçois en courant et j\'enchaîne sans arrêt.', 'Passe à terre.', 'deux'],
    ['Course aux paniers', 10, 'Deux équipes au milieu du terrain, chacune vers un panier : un double pas réussi = 1 point. Première équipe à 15.', 'Mon équipe marque 15 paniers.', 'Panier seulement s\'il touche la planche.', 'tir:basket']],
   r: [['Le geste au ralenti', 5, 'Chacun refait le double pas au ralenti en le décrivant. Étirements.', 'etirements']]},
  {t: 'Passe et va : avancer avec le partenaire', o: 'Après avoir passé, courir vers le panier pour recevoir de nouveau (passe et va).', e: [
    ['Passes en mouvement', 5, 'Par deux en traversant le terrain : passes poitrine en courant côte à côte, sans dribble.', 'deux'],
    ['Passes à 3', 5, 'Par 3 en ligne : le milieu passe à un bout et prend sa place.', 'trois']],
   c: [['Passe et va à 2', 10, 'Deux joueurs face au panier : A passe à B, court vers le panier, reçoit à nouveau et tire en double pas.', 'Je cours vers le panier dès que j\'ai passé.', 'Ajouter un défenseur passif.', 'demi:basket:2c1'],
    ['2 contre 1', 8, 'Un défenseur sous le panier ; 2 attaquants partent du milieu. Marquer en utilisant le passe et va. On tourne.', 'Nous marquons 2 fois sur 3.', 'Le défenseur devient actif.', 'demi:basket:2c1'],
    ['Match 3 contre 3', 10, 'Matchs avec une règle : un panier marqué après un passe et va vaut 3 points.', 'Mon équipe marque après un passe et va.', '', 'demi:basket:3c3']],
   r: [['Ce qui marche', 5, 'Par équipe : qu\'est-ce qui nous a fait marquer ? Étirements.', 'explication']]},
  {t: 'Se démarquer et jouer à 3 contre 3', o: 'Se déplacer dans un espace libre, loin de son défenseur, pour offrir une solution au porteur.', e: [
    ['Chat et souris', 5, 'Par deux sans ballon : la souris essaie de se décoller de son chat en changeant de rythme.', 'chat'],
    ['Passes dans le carré', 5, '4 contre 1 dans un carré : garder le ballon le plus longtemps possible.', 'carre:basket:1']],
   c: [['3 contre 2 conserver', 10, '3 attaquants contre 2 défenseurs dans un demi-terrain : 8 passes = 1 point. Le porteur ne peut pas dribbler.', 'Je propose une solution à chaque passe.', '3 contre 3.', 'demi:basket:3c2'],
    ['Montée de balle 3 contre 3', 8, 'Sur tout le terrain : faire remonter le ballon en moins de 8 secondes puis marquer.', 'Nous passons la ligne médiane en moins de 8 s.', 'Dribble limité à 3 par joueur.', 'match:basket:3c3'],
    ['Tournoi 3 contre 3', 10, 'Matchs de 4 minutes, équipes au repos arbitrent.', 'Je me démarque et je respecte les règles.', '', 'demi:basket:3c3']],
   r: [['Étirements', 5, 'Étirements guidés par un élève ; rappel des règles du démarquage.', 'etirements']]},
  {t: 'Règles complètes et arbitrage', o: 'Appliquer marcher, double dribble, contact, 3 secondes et sorties ; arbitrer avec les bons gestes.', comp: ['HME2', 'HSC1', 'HSC2', 'HSC3'], e: [
    ['Quiz des gestes', 5, 'Le prof montre une situation, les élèves font le geste d\'arbitre correspondant (marcher, double dribble, faute, 3 secondes, panier à 3).', 'explication'],
    ['Lay-up des deux côtés', 5, 'Colonnes à droite et à gauche du panier.', 'tir:basket']],
   c: [['Matchs arbitrés', 20, 'Matchs 3 contre 3 ou 4 contre 4 de 5 minutes. Chaque élève arbitre au moins une fois avec un sifflet. Lancers francs après une faute sur tir.', 'J\'arbitre en annonçant la faute et en montrant le geste.', 'Feuille de match tenue par un élève.', 'match:basket:4c4'],
    ['La règle des 3 secondes', 8, 'Jeu à 3 contre 3 où l\'arbitre compte à voix haute dans la raquette.', 'Je ne reste pas plus de 3 s dans la raquette.', '', 'demi:basket:3c3']],
   r: [['Retour sur l\'arbitrage', 5, 'Qu\'est-ce qui est difficile quand on arbitre ? Étirements.', 'explication']]},
  {t: 'Évaluation : double pas et jeu à 3 contre 3', o: 'Réussir un parcours avec double pas et jouer en équipe en se démarquant.', e: [
    ['Échauffement en autonomie', 5, 'Par groupes : dribbles, passes, lay-up (fiche affichée).', 'libre'],
    ['Tirs libres', 5, 'Tirs proches et double pas.', 'tir:basket']],
   c: [['Épreuve 1 : parcours', 10, 'Slalom en dribble, passe au mur ou au prof, réception en course et double pas. 2 essais.', 'Double pas sans marcher, panier marqué.', '', 'slalom:basket'],
    ['Épreuve 2 : match 3 contre 3', 18, 'Matchs de 5 minutes observés : démarquage, passe et va, respect des règles. Les élèves au repos arbitrent.', 'Je participe et je me démarque.', '', 'demi:basket:3c3']],
   r: [['Bilan du cycle', 5, 'Auto-évaluation sur une fiche ; étirements.', 'explication']]}
]},
3: {th: 'Attaquer vite et défendre : contre-attaque, défense individuelle, rebond', comp: ['HME2', 'HME4', 'HSC1', 'HSC2', 'GSS1'], l: [
  {t: 'La position de défense', o: 'Défendre entre son adversaire et le panier, en position basse, avec des pas chassés.', e: [
    ['Pas chassés et sprints', 5, 'Sur la largeur du terrain : pas chassés, course arrière, sprints, au signal du prof.', 'files'],
    ['Miroir défensif', 5, 'Par deux : l\'attaquant se déplace sans ballon, le défenseur reste face à lui en pas chassés.', 'deux']],
   c: [['Zig-zag 1 contre 1', 10, 'L\'attaquant dribble en zig-zag sur la largeur d\'un couloir, le défenseur l\'accompagne sans contact, en restant entre lui et la ligne de fond.', 'Je reste devant le dribbleur sur toute la longueur.', 'Le défenseur peut voler le ballon à la fin.', 'demi:basket:1c1'],
    ['1 contre 1 au panier', 10, 'Départ à 6 m : l\'attaquant a 3 dribbles pour marquer. Le défenseur gagne s\'il récupère ou s\'il empêche le tir.', 'Je défends sans faute de contact.', 'Attaquant sans limite de dribble.', 'demi:basket:1c1'],
    ['3 contre 3 défense individuelle', 8, 'Chaque défenseur suit un attaquant désigné (même chasuble).', 'Je sais toujours où est mon joueur.', '', 'demi:basket:3c3']],
   r: [['Étirements des jambes', 5, 'Étirements des quadriceps, ischios et mollets ; on reprend son souffle.', 'etirements']]},
  {t: 'Le rebond', o: 'Se placer entre l\'adversaire et le panier, sauter et attraper le ballon à deux mains.', e: [
    ['Rebonds sur la planche', 5, 'Chacun lance le ballon contre la planche et le rattrape au plus haut.', 'tir:basket'],
    ['Sauts et réceptions', 5, 'Sauts pieds joints, réception équilibrée, ballon protégé sous le menton.', 'libre']],
   c: [['Écran de retrait', 10, 'Par deux : le prof tire, le défenseur se retourne vers son attaquant (contact dos), puis va au rebond.', 'Je bloque mon joueur avant de sauter.', 'Trois contre trois au rebond.', 'demi:basket:2c2'],
    ['Rebond et relance', 8, 'Le joueur qui prend le rebond fait une passe rapide vers un partenaire sur le côté.', 'Ma passe part dans les 2 secondes.', '', 'demi:basket:2c1'],
    ['Match « rebond »', 10, 'Matchs 3 contre 3 : un rebond offensif = 1 point en plus.', 'Mon équipe prend plus de rebonds.', '', 'demi:basket:3c3']],
   r: [['Bilan', 5, 'Où se placer au rebond ? Étirements.', 'explication']]},
  {t: 'La contre-attaque à 2 contre 1', o: 'Après la récupération, remonter vite le terrain en surnombre et finir en double pas.', comp: ['HME2', 'HME4', 'HSC2', 'GSS1'], e: [
    ['Passes en course à 2', 5, 'Traversées du terrain par deux en se faisant des passes sans dribble.', 'deux'],
    ['Lay-up en vitesse', 5, 'Départ de la ligne médiane, 2 dribbles et double pas.', 'tir:basket']],
   c: [['2 contre 1 tout terrain', 12, 'Le défenseur attend à la ligne des lancers francs. Les 2 attaquants partent de la ligne de fond opposée : marquer en moins de 6 secondes.', 'Nous attirons le défenseur et passons au joueur libre.', '3 contre 2.', 'match:basket:2c1'],
    ['Vague continue', 10, '2 contre 1, puis le défenseur et le tireur repartent en 2 contre 1 vers l\'autre panier avec un nouveau défenseur.', 'Je décide vite : passer ou tirer.', '', 'match:basket:2c1'],
    ['Petit match', 6, '3 contre 3 avec bonus : un panier marqué en moins de 5 secondes vaut 3 points.', '', '', 'match:basket:3c3']],
   r: [['Retour au calme', 5, 'Marche, respiration, prise du pouls (on compte 15 s × 4).', 'etirements']]},
  {t: '3 contre 2 et prise de décision', o: 'Choisir entre passer, dribbler ou tirer en fonction de la défense.', e: [
    ['Passe à 3 en course', 5, 'Traversées à 3 avec passes croisées.', 'trois'],
    ['Tirs à mi-distance', 5, 'Tirs après réception depuis 3 positions.', 'tir:basket']],
   c: [['3 contre 2 sur demi-terrain', 10, 'Les attaquants doivent créer et trouver le joueur libre. On tourne toutes les 3 actions.', 'Nous marquons 2 fois sur 4.', 'Le défenseur supplémentaire arrive au bout de 3 s.', 'demi:basket:3c2'],
    ['3 contre 2 puis 2 contre 1', 10, 'Après l\'action, les 2 défenseurs repartent en 2 contre 1 vers l\'autre panier.', 'Je change vite de rôle.', '', 'match:basket:3c2'],
    ['Match 4 contre 4', 8, 'Matchs sur tout le terrain, arbitrés par les élèves.', '', '', 'match:basket:4c4']],
   r: [['Qui décide ?', 5, 'Discussion : quand faut-il passer plutôt que tirer ? Étirements.', 'explication']]},
  {t: 'Jouer à 4 contre 4 sur tout le terrain', o: 'Enchaîner défense, récupération et attaque rapide ; tenir son poste.', comp: ['HME2', 'HSC1', 'HSC2', 'HSC3'], e: [
    ['Échauffement par équipe', 5, 'Chaque équipe mène son échauffement (dribble, passes, lay-up).', 'libre'],
    ['Défense en pas chassés', 5, 'Défense en zig-zag sur la largeur.', 'demi:basket:1c1']],
   c: [['Tournoi 4 contre 4', 22, 'Matchs de 6 minutes ; l\'équipe au repos arbitre et tient les statistiques (paniers, rebonds, balles perdues).', 'Mon équipe défend en individuel et contre-attaque.', 'Temps mort d\'une minute par match.', 'match:basket:4c4']],
   r: [['Statistiques', 6, 'Chaque équipe lit ses statistiques et choisit un objectif pour la prochaine fois.', 'explication']]},
  {t: 'Évaluation : contre-attaque et match', o: 'Montrer la contre-attaque 2 contre 1, la défense individuelle et le rebond en match.', e: [
    ['Échauffement en autonomie', 5, 'Fiche d\'échauffement par groupes.', 'libre'],
    ['Tirs', 5, 'Lay-up et tirs à mi-distance.', 'tir:basket']],
   c: [['Épreuve 1 : 2 contre 1', 10, 'Chaque élève passe 2 fois en attaque et 1 fois en défense ; on note la décision et la réussite.', 'Bonne décision et panier.', '', 'match:basket:2c1'],
    ['Épreuve 2 : match observé', 18, 'Matchs 4 contre 4 : défense individuelle, rebond, contre-attaque.', 'Je tiens mon joueur et je participe à l\'attaque.', '', 'match:basket:4c4']],
   r: [['Bilan', 5, 'Auto-évaluation et étirements.', 'explication']]}
]},
4: {th: 'Le jeu collectif organisé : surnombre, écran, défense homme à homme', comp: ['HME2', 'HME4', 'HSC1', 'HSC2', 'GSS1'], l: [
  {t: 'Le passe et va et le jeu sans ballon', o: 'Couper vers le panier au bon moment, se replacer pour libérer l\'espace.', e: [
    ['Passes en 8', 5, 'Par 3, passes croisées en traversant le terrain (le passeur passe derrière le receveur).', 'trois'],
    ['Lay-up main droite / main gauche', 5, 'Colonnes des deux côtés du panier.', 'tir:basket']],
   c: [['Give and go 2 contre 2', 10, 'Le porteur passe à l\'ailier et coupe vers le panier ; si le défenseur suit, l\'ailier joue 1 contre 1.', 'Je coupe dès que je passe.', 'Ajouter un 3e attaquant.', 'demi:basket:2c2'],
    ['3 contre 3 sans dribble', 10, 'Il faut se démarquer en permanence pour avancer.', 'Mon équipe marque sans dribbler.', '1 dribble autorisé.', 'demi:basket:3c3'],
    ['Match à thème', 8, 'Un panier après un « passe et va » vaut double.', '', '', 'demi:basket:3c3']],
   r: [['Retour', 5, 'Étirements guidés par un élève.', 'etirements']]},
  {t: 'L\'écran simple', o: 'Poser un écran immobile pour libérer un partenaire, et en profiter.', e: [
    ['Le placement de l\'écran', 5, 'Sans ballon : poser un écran (pieds écartés, bras croisés) à côté du défenseur ; le partenaire frôle l\'écran.', 'demi:basket:2c1'],
    ['Dribble + tir', 5, 'Tirs après 2 dribbles depuis l\'aile.', 'tir:basket']],
   c: [['Écran sur porteur 2 contre 2', 12, 'Un joueur pose un écran sur le défenseur du porteur ; le porteur dribble en frôlant l\'écran et tire ou passe.', 'Mon écran est immobile (sinon c\'est une faute).', 'L\'écran roule ensuite vers le panier.', 'demi:basket:2c2'],
    ['3 contre 3 avec écran', 10, 'Chaque attaque doit utiliser un écran.', 'Notre écran libère un tireur.', '', 'demi:basket:3c3'],
    ['Défendre l\'écran', 6, 'Les défenseurs annoncent « écran ! » et choisissent de passer devant ou d\'échanger.', 'Je parle à mon partenaire.', '', 'demi:basket:2c2']],
   r: [['Analyse', 5, 'Quand l\'écran est-il utile ? Étirements.', 'explication']]},
  {t: 'La défense homme à homme et l\'aide', o: 'Défendre son joueur et aider un partenaire débordé.', e: [
    ['Pas chassés et glissés', 5, 'Défense en zig-zag sur la largeur.', 'demi:basket:1c1'],
    ['1 contre 1 au poste', 5, 'Dos au panier : prendre position et recevoir.', 'demi:basket:1c1']],
   c: [['2 contre 2 aide et reprise', 10, 'Quand l\'attaquant passe son défenseur, l\'autre défenseur aide puis revient sur son joueur.', 'J\'aide et je reviens.', '3 contre 3.', 'demi:basket:2c2'],
    ['Défense 4 contre 4', 10, 'Matchs où la défense marque 1 point par ballon récupéré.', 'Mon équipe récupère au moins 3 ballons.', '', 'demi:basket:4c4'],
    ['Match libre', 8, '4 contre 4 sur tout le terrain.', '', '', 'match:basket:4c4']],
   r: [['Retour', 5, 'Pouls et étirements.', 'etirements']]},
  {t: 'Le jeu rapide à 3 contre 2', o: 'Remonter le terrain en 3 couloirs et finir avant le retour de la défense.', comp: ['HME2', 'HME4', 'HSC2', 'GSS1'], e: [
    ['Les 3 couloirs', 5, 'Traversées à 3 dans les 3 couloirs du terrain, passes au milieu.', 'trois'],
    ['Lay-up en vitesse', 5, 'Départs de la ligne médiane.', 'tir:basket']],
   c: [['3 contre 2 + 1', 12, '3 attaquants contre 2 défenseurs ; un 3e défenseur part de la ligne de fond 2 s plus tard.', 'Nous marquons avant le retour du 3e défenseur.', '', 'match:basket:3c2'],
    ['Vague 3 contre 2 continue', 10, 'Les 2 défenseurs + le tireur repartent vers l\'autre panier.', 'Je décide vite.', '', 'match:basket:3c2'],
    ['Match 5 contre 5', 6, 'Si possible sur tout le terrain.', '', '', 'match:basket:5c5']],
   r: [['Retour', 5, 'Marche et étirements.', 'etirements']]},
  {t: 'Match 5 contre 5 et rôles', o: 'Jouer à 5 en tenant son poste (meneur, ailiers, intérieurs) et arbitrer officiellement.', comp: ['HME2', 'HSC1', 'HSC2', 'HSC3'], e: [
    ['Échauffement d\'équipe', 5, 'Chaque équipe mène son échauffement (passes, lay-up, tirs).', 'libre'],
    ['Les postes', 5, 'Le prof présente les postes : meneur, ailiers, intérieurs ; chaque équipe se répartit les rôles.', 'explication']],
   c: [['Tournoi 5 contre 5', 22, 'Matchs de 7 minutes ; 2 arbitres et une table de marque tenus par l\'équipe au repos.', 'Je tiens mon poste et je respecte les règles.', 'Temps morts et changements.', 'match:basket:5c5']],
   r: [['Bilan d\'équipe', 6, 'Chaque équipe dit ce qui a fonctionné.', 'explication']]},
  {t: 'Évaluation : jeu collectif', o: 'Montrer l\'utilisation du passe et va, de l\'écran et du jeu rapide en match.', e: [
    ['Échauffement en autonomie', 5, 'Par équipe.', 'libre'],
    ['Tirs', 5, 'Tirs après réception.', 'tir:basket']],
   c: [['Épreuve : matchs observés', 28, 'Matchs 4 contre 4 ou 5 contre 5. Grille : démarquage, passe et va / écran, défense, respect des règles et de l\'arbitre.', 'J\'utilise au moins une action collective par match.', '', 'match:basket:5c5']],
   r: [['Bilan', 5, 'Auto-évaluation et étirements.', 'explication']]}
]},
5: {th: 'Construire une attaque : pick and roll, attaque de zone, choix tactiques', comp: ['HME2', 'HME4', 'HSC1', 'HSC2', 'GSS1'], l: [
  {t: 'Le pick and roll', o: 'Utiliser un écran sur porteur puis le roll vers le panier.', e: [
    ['Échauffement mené par élèves', 6, 'Un groupe mène : footwork, dribble, lay-up.', 'libre'],
    ['Tirs après dribble', 4, 'Tir en suspension après 1-2 dribbles.', 'tir:basket']],
   c: [['Pick and roll 2 contre 2', 12, 'Écran, le porteur attaque, l\'écran roule vers le panier ; lecture : tir, passe au rouleur ou passe dehors.', 'Je lis la défense avant de décider.', 'Défense qui change (switch).', 'demi:basket:2c2'],
    ['3 contre 3 avec pick and roll', 10, 'Le 3e attaquant se place à l\'opposé pour recevoir.', 'Nous marquons sur un pick and roll.', '', 'demi:basket:3c3'],
    ['Match à thème', 6, 'Panier sur pick and roll = 3 points.', '', '', 'demi:basket:4c4']],
   r: [['Retour', 5, 'Étirements et analyse rapide.', 'etirements']]},
  {t: 'Attaquer une défense de zone', o: 'Faire circuler vite le ballon, attaquer les intervalles et tirer de loin.', e: [
    ['Passes rapides', 5, 'Circulation à 5 autour de la raquette, passes sans dribble.', 'cercle'],
    ['Tirs à 3 points', 5, 'Séries de tirs depuis 5 positions.', 'tir:basket']],
   c: [['Défense de zone 2-3', 8, 'Explication et mise en place de la zone : chacun défend un espace.', 'Je défends mon espace et je parle.', '', 'demi:basket:5c5'],
    ['5 contre 5 contre la zone', 12, 'L\'attaque doit faire au moins 4 passes, attaquer l\'intervalle entre deux défenseurs.', 'Nous trouvons un tir ouvert.', 'Zone 3-2.', 'demi:basket:5c5'],
    ['Zone ou individuelle ?', 8, 'Matchs : chaque équipe choisit sa défense et peut changer au temps mort.', '', '', 'match:basket:5c5']],
   r: [['Bilan', 5, 'Avantages et défauts de chaque défense.', 'explication']]},
  {t: 'Le tir en suspension et le tir à 3 points', o: 'Tirer en suspension après réception ou dribble, avec un geste constant.', comp: ['HME2', 'HME4', 'GSS1', 'GSS4'], e: [
    ['Le geste sans saut', 5, 'Tirs proches, focus coude, poignet, suivi du geste.', 'tir:basket'],
    ['Footwork', 5, 'Réception en 1-2 et en 2 temps, arrêt équilibré.', 'files']],
   c: [['Spot shooting', 10, 'Par 3 : un tireur, un rebondeur, un passeur ; 5 positions, on compte les réussites.', 'Je réussis 5 tirs sur 15.', 'Après dribble.', 'tir:basket'],
    ['Tir sous pression', 8, '1 contre 1 au tir : le défenseur arrive de loin, il faut tirer vite.', 'Je tire avant que le défenseur arrive.', '', 'demi:basket:1c1'],
    ['Concours en équipes', 10, 'Le tour du monde par équipes ; puis 3 contre 3 où un panier à 3 points vaut 4.', '', '', 'demi:basket:3c3']],
   r: [['Retour', 5, 'Étirements des épaules, poignets, mollets.', 'etirements']]},
  {t: 'Situations de fin de match', o: 'Gérer le score et le temps : possession, faute volontaire, dernier tir.', comp: ['HME4', 'HSC1', 'HSC2', 'GSS3'], e: [
    ['Échauffement en équipe', 5, 'Chaque équipe.', 'libre'],
    ['Lancers francs sous pression', 5, 'Chaque élève tire 2 lancers francs pendant que les autres comptent à voix haute.', 'tir:basket']],
   c: [['Dernière minute', 12, 'Situations : +2 avec 1 minute à jouer, -1 avec 20 secondes, égalité, possession. Chaque équipe choisit sa stratégie au temps mort.', 'Notre décision est réfléchie.', '', 'match:basket:5c5'],
    ['Matchs de 5 minutes', 12, 'Avec chrono de 24 secondes approximatif (le prof annonce 10 s).', 'Je reste calme sous pression.', '', 'match:basket:5c5']],
   r: [['Gérer le stress', 6, 'Respiration et partage : comment rester lucide en fin de match ?', 'etirements']]},
  {t: 'Arbitrer et coacher', o: 'Arbitrer un match à deux, coacher une équipe (temps mort, changements).', comp: ['HSC1', 'HSC2', 'HSC3', 'GSS3'], e: [
    ['Gestes officiels', 5, 'Révision des gestes : violations, fautes, panier à 3, temps mort.', 'explication'],
    ['Échauffement d\'équipe', 5, 'Mené par le coach élève.', 'libre']],
   c: [['Tournoi avec coachs et arbitres', 24, 'Chaque équipe a un coach (un élève qui ne joue pas pendant un match). Arbitrage à deux, table de marque officielle.', 'J\'arbitre en me plaçant bien ; je coache avec des consignes claires.', '', 'match:basket:5c5']],
   r: [['Retour', 5, 'Les arbitres expliquent une décision difficile.', 'explication']]},
  {t: 'Évaluation : projet tactique', o: 'Mettre en œuvre en match un projet d\'attaque et de défense choisi par l\'équipe.', e: [
    ['Échauffement en autonomie', 6, 'Par équipe, préparé à l\'avance.', 'libre'],
    ['Préparer le projet', 4, 'Chaque équipe écrit son projet : 1 action d\'attaque, 1 défense.', 'explication']],
   c: [['Matchs observés', 28, 'Matchs 5 contre 5. Grille : projet appliqué, efficacité, rôles (joueur, coach, arbitre), fair-play.', 'Notre projet est visible en match.', '', 'match:basket:5c5']],
   r: [['Bilan', 5, 'Retour de l\'équipe sur son projet.', 'explication']]}
]},
6: {th: 'Autonomie et performance : projet d\'équipe, organisation d\'un tournoi', comp: ['HME2', 'HSC1', 'HSC2', 'HSC3', 'GSS1', 'GSS5'], l: [
  {t: 'Diagnostic et formation des équipes', o: 'Évaluer son niveau, constituer des équipes équilibrées et choisir un projet.', e: [
    ['Échauffement libre guidé', 6, 'Les élèves choisissent les exercices d\'échauffement en suivant une fiche.', 'libre'],
    ['Tests rapides', 4, 'Tir en 1 minute, lancers francs, parcours dribble chronométré.', 'tir:basket']],
   c: [['Matchs test', 18, 'Matchs de 5 minutes avec équipes tirées au sort ; observation des points forts de chacun.', 'Je connais mes points forts.', '', 'match:basket:5c5'],
    ['Constitution des équipes', 10, 'Les élèves forment des équipes équilibrées (avec le prof) et nomment un capitaine.', 'Les équipes sont équilibrées.', '', 'explication']],
   r: [['Projet', 5, 'Chaque équipe choisit un nom et un objectif.', 'explication']]},
  {t: 'Préparer son équipe : systèmes simples', o: 'Mettre en place un système d\'attaque (pick and roll, écran hors ballon) et une défense.', e: [
    ['Échauffement d\'équipe', 6, 'Mené par le capitaine.', 'libre'],
    ['Tirs', 4, 'Tirs aux positions du système.', 'tir:basket']],
   c: [['Mise en place à vide', 10, 'Chaque équipe répète son système sans défense puis avec défense passive.', 'Chacun connaît son déplacement.', '', 'demi:basket:5c5'],
    ['Opposition', 18, 'Matchs : l\'équipe en attaque annonce son système.', 'Le système crée un tir ouvert.', '', 'match:basket:5c5']],
   r: [['Ajustements', 5, 'Ce qu\'on garde, ce qu\'on change.', 'explication']]},
  {t: 'Condition physique du basketteur', o: 'Travailler explosivité, vitesse et endurance spécifique ; connaître ses limites.', comp: ['HME2', 'GSS1', 'GSS5'], e: [
    ['Activation', 6, 'Pas chassés, sauts, sprints courts, gainage.', 'files'],
    ['Pouls de repos', 4, 'Prise du pouls et explication des zones d\'effort.', 'explication']],
   c: [['Circuit basket', 16, '6 ateliers de 45 s : sauts au rebond, défense en zig-zag, sprint-dribble, gainage, tirs rapides, passes au mur. 15 s pour changer.', 'Je garde une bonne technique fatigué.', '2 tours.', 'ateliers:basket:6'],
    ['Matchs courts intenses', 12, '3 contre 3 de 3 minutes, récupération active.', '', '', 'demi:basket:3c3']],
   r: [['Récupération', 5, 'Pouls après effort et étirements longs.', 'etirements']]},
  {t: 'Tournoi organisé par les élèves (1)', o: 'Organiser et vivre un tournoi : planning, arbitrage, table de marque, statistiques.', comp: ['HSC1', 'HSC2', 'HSC3', 'GSS3'], e: [
    ['Organisation', 6, 'Les élèves répartissent les rôles : arbitres, chronométreurs, statisticiens, responsables du matériel.', 'explication'],
    ['Échauffement d\'équipe', 4, 'Chaque équipe.', 'libre']],
   c: [['Tournoi', 28, 'Matchs de 6 minutes selon le planning des élèves. Statistiques tenues par l\'équipe au repos.', 'Le tournoi se déroule sans l\'aide du prof.', '', 'tournoi:basket']],
   r: [['Classement', 5, 'Mise à jour du classement et du fair-play.', 'explication']]},
  {t: 'Tournoi organisé par les élèves (2)', o: 'Analyser les statistiques et adapter sa stratégie.', comp: ['HSC1', 'HSC2', 'HSC3', 'GSS5'], e: [
    ['Lecture des stats', 5, 'Chaque équipe lit ses statistiques et fixe un objectif.', 'explication'],
    ['Échauffement d\'équipe', 5, 'Mené par le capitaine.', 'libre']],
   c: [['Phase finale', 28, 'Demi-finales et finales ; arbitres et coachs élèves.', 'Notre équipe applique son objectif.', '', 'match:basket:5c5']],
   r: [['Remise des prix', 5, 'Meilleure équipe, équipe la plus fair-play, meilleur arbitre.', 'explication']]},
  {t: 'Évaluation : performance et rôles', o: 'Montrer son niveau de jeu et sa capacité à tenir un rôle d\'arbitre ou de coach.', e: [
    ['Échauffement en autonomie', 6, 'Préparé par chaque équipe.', 'libre'],
    ['Tirs', 4, 'Libre.', 'tir:basket']],
   c: [['Matchs observés', 22, 'Grille : efficacité, choix, défense, implication dans le projet.', 'Je contribue au projet de mon équipe.', '', 'match:basket:5c5'],
    ['Arbitrage évalué', 6, 'Chaque élève arbitre une période.', 'Je suis juste et bien placé.', '', 'match:basket:5c5']],
   r: [['Bilan de fin de cursus', 5, 'Comment continuer le basket ou une activité physique après l\'école ?', 'explication']]}
]}
}});
