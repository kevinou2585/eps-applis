/* Handball en jeux : 6 leçons par année (1re → 6e secondaire), la 6e = évaluation.
   Format « jeux » (voir carnet/prepa-moteur.js). Idées mêlées et réécrites : classeur EPS, modules académiques (déménageurs,
   gendarmes et voleurs, douaniers, citadelle, jeu des portes, cartes coup de pouce), tchoukball, beach handball.
   Ballons souples pour les débutants : on n'a jamais peur de tirer ni d'être gardien. */
PREPA_JEUX({id: 'hand',
sport: 'Handball',
mat: [['ballon de hand (taille 1-2)', 0.5, 'hand'], ['ballon en mousse', 6, 'mousse'], ['jeu de chasubles', 4, 'chasubles'], ['coupelle (zones)', 30, 'plots'], ['cône', 12, 'cones'], ['cerceau', 8, 'cerceaux'], ['sifflet et chrono']],
sal: {
  tk: {but: 'le but', zone: 'la zone (demi-cercle de coupelles à 5 m du but)'},
  g: {m: 3, tk: {but: 'le but'}, note: '2 buts sur la largeur = 2 demi-terrains de match ; un 3e petit terrain avec 2 tapis debout comme buts. Zones en coupelles à 5 m (plus près pour les débutants). Les 2 tchoukballs servent les jours de tchoukball.'},
  p: {m: 2, tk: {but: 'le but (un gros tapis de réception mis debout contre le mur)'}, note: 'pas de but : les 3 énormes tapis de réception, debout contre les murs du fond, font 2 ou 3 buts (cible bien visible, aucun risque de blessure). 2 terrains en largeur.', warn: 'Petite salle : tirs uniquement avec des ballons souples, la salle résonne et les murs sont proches.'},
  b: {m: 2, tk: {but: 'le but (2 cônes à 3 m l\'un de l\'autre, ou un banc couché à viser)'}, note: 'pas de but : 2 cônes ou un banc couché contre le mur à chaque bout ; zones en coupelles. 2 demi-terrains en largeur.'},
  c: {m: 3, tk: {but: 'le but'}, note: 'les 2 buts de mini-foot = terrain principal ; la 2e zone avec 2 buts en cônes pour un 2e match. Zones tracées à la craie ou en coupelles.', warn: 'Dehors : ballons qui ne glissent pas (sol mouillé = ballons mousse).'}
},
J: {
  voleurs: {n: 'Les voleurs de ballons', k: 'opp', s: 'voleurs', d: 'Chacun dribble à une main dans la moitié du terrain. {n/7 voleur} sans ballon essaient de chiper un ballon sans toucher le joueur. Qui perd son ballon devient voleur.'},
  demenageurs: {n: 'Les déménageurs', k: 'opp', s: 'files', f: 'e2', d: 'Chaque équipe a une réserve de ballons (un cerceau) au fond de son camp. Au signal, on transporte un ballon à la fois de sa réserve vers celle de l\'adversaire… qui fait pareil ! Au bout de 2 min, l\'équipe qui a le moins de ballons chez elle gagne. Manche 2 : transport en dribble seulement ; manche 3 : par passes entre 2 coéquipiers.'},
  loco: {n: 'La locomotive', k: 'coop', s: 'deux', f: 'p', d: 'Par deux, un ballon chacun : le wagon suit la locomotive et copie tout ce qu\'elle fait avec son ballon (dribble, passe autour de la taille, lancer en l\'air…). Au sifflet, on inverse. Dernière manche : la locomotive essaie de toucher un autre wagon pour gagner 1 point.'},
  chasseur: {n: 'La balle chasseur', k: 'opp', s: 'chat', d: '{n/8 chasseur} avec un ballon en mousse touchent les fuyards sous les genoux (tir à une main). Les chasseurs se font des passes, le porteur ne court pas (3 pas). Touché = on devient chasseur et on prend une chasuble.'},
  pegobol: {n: 'Le pégobol', k: 'opp', s: 'chat', d: '{n/6 chasseur} : on ne touche un fuyard qu\'avec le ballon tenu en main, et le porteur ne peut faire que 3 pas. Les chasseurs se font donc des passes pour coincer les fuyards. Touché = on devient chasseur.'},
  dixpasses: {n: 'La passe à 10', k: 'opp', s: 'match:hand:4c4', f: 'm4', d: 'Deux équipes : 10 passes à la suite sans interception = 1 point, comptées à voix haute. 3 pas maximum avec le ballon, pas de contact. Ballon au sol ou volé = l\'autre équipe repart à 0.'},
  cerceau: {n: 'Le cerceau volant', k: 'coop', s: 'libre', f: 'g4', d: 'Un joueur du groupe fait rouler un cerceau ; les autres doivent faire passer leur ballon dans le cerceau en mouvement (tir à une main). 1 point par ballon qui passe, le rouleur change à chaque point.'},
  gendarmes: {n: 'Gendarmes et voleurs', k: 'opp', s: 'demi:hand:3c2', f: 'g6', d: 'Les voleurs (3 attaquants) doivent porter un ballon de leur réserve jusqu\'à la cachette ({but}) et marquer ; les gendarmes (1 défenseur + 1 gardien) essaient de le récupérer. 5 ballons dans la réserve, puis on échange les rôles. Le défenseur ne touche que le ballon.'},
  douaniers: {n: 'Douaniers et contrebandiers', k: 'opp', s: 'demi:hand:2c1', f: 'g4', d: 'Le terrain est coupé en 3 bandes ; un douanier garde chaque bande et ne peut pas en sortir. Les contrebandiers (par 2, un ballon) traversent les bandes par passes et dribbles sans se faire prendre le ballon, puis tirent au but. On tourne après 6 passages.'},
  citadelle: {n: 'L\'attaque de la citadelle', k: 'opp', s: 'match:hand:4c4', f: 'm4', d: 'Chaque équipe défend sa citadelle : un cône dans un cercle de coupelles de 4 m de diamètre où personne n\'entre. On marque en touchant ou renversant la citadelle adverse par un tir. Pas de dribble, 3 pas maximum : on avance par passes. Après un point, l\'équipe qui l\'a encaissé repart de sa citadelle.'},
  portes: {n: 'Le jeu des portes', k: 'opp', s: 'tir:hand', f: 'g6', d: 'Trois portes de couleur (2 cônes chacune) à 7-8 m du but. Le tireur part avec le ballon, choisit sa porte au dernier moment, puis tire. Le gardien, lui, doit toucher le plot de la même couleur posé dans sa zone avant de défendre. But sans toucher du gardien = 2 points ; gardien qui arrête = 2 points pour le gardien.'},
  trembler: {n: 'Faire trembler les filets', k: 'opp', s: 'tir:hand', f: 'g6', d: 'Par groupes de 6 à chaque but (vrais buts et buts-tapis), un gardien. Au signal, deux tireurs partent en même temps du milieu, chacun son ballon, et tirent sans entrer dans {zone} : le premier à marquer gagne 1 point. Puis les deux suivants partent tout de suite ; les tireurs ramassent leur ballon et reviennent par le côté. Gardien changé toutes les 2 min.'},
  tour: {n: 'Frappez la tour', k: 'opp', s: 'cercle', f: 'g7', d: 'Grand cercle de coupelles, une tour (cône sur un plot) au centre gardée par un défenseur. Les attaquants autour se passent vite le ballon pour faire bouger le défenseur et tirer sur la tour à travers le cercle. Tour tombée = le tireur devient défenseur.'},
  capitaine: {n: 'La balle au capitaine', k: 'coop', s: 'match:hand:4c4', f: 'm4', d: 'Le capitaine de chaque équipe est debout dans un cerceau derrière le camp adverse. Une passe attrapée par son capitaine = 1 point, et le passeur devient capitaine. 3 pas maximum, pas de dribble.'},
  tchouk: {n: 'Le tchoukball', k: 'fp', s: 'match:hand:4c4', f: 'm4', d: 'Le jeu sans contact : on marque en tirant sur le tchoukball (cadre de rebond) pour que le ballon retombe au sol dans le terrain sans être rattrapé. Interdit de gêner ou d\'intercepter une passe : on défend seulement en se plaçant pour rattraper les rebonds. 3 passes maximum avant de tirer.'},
  espion: {n: 'La balle-espion', k: 'opp', s: 'match:hand:4c4', f: 'm4', d: 'Chaque équipe a un espion derrière la ligne de fond adverse. Une passe réussie à son espion = 1 point, et le passeur devient espion à son tour. Les défenseurs peuvent intercepter mais pas toucher le porteur.'},
  canettes: {n: 'Le chamboule-tout', k: 'opp', s: 'match:hand:4c4', f: 'm4', d: 'À chaque bout, un banc avec des cônes ou des bouteilles posés dessus, protégé par {zone} où personne n\'entre. On marque 1 point par objet renversé au tir. L\'équipe qui a encore des objets debout à la fin gagne aussi 2 points de bonus.'},
  duelgardien: {n: 'Le roi des gardiens', k: 'opp', s: 'tir:hand', f: 'g6', d: 'Tirs à 7 m (le penalty du hand). Chaque tireur tire une fois : but = il reste tireur ; arrêt = il devient gardien et le gardien rejoint la file. Le gardien compte ses arrêts : le roi des gardiens est celui qui en a le plus.'},
  quicabol: {n: 'Le quicabol', k: 'opp', s: 'demi:hand:1c1', f: 'p', d: 'Petit terrain coupé par un banc couché (ou une corde au sol) : en 1 contre 1 ou 2 contre 2, on lance le ballon pour qu\'il rebondisse dans le camp adverse ; l\'adversaire doit l\'attraper avant le 2e rebond. On apprend à viser et à se placer.'},
  m4: {n: 'Match 4 c 4', k: 'opp', s: 'demi:hand:4c3', f: 'm4', d: '3 joueurs de champ + 1 gardien par équipe, sur un demi-terrain en largeur. Règles : 3 pas, 3 secondes, pas de reprise de dribble, personne dans {zone} sauf le gardien. Les arbitres sont les élèves au bord.'},
  m5: {n: 'Match 5 c 5', k: 'opp', s: 'match:hand:5c5', f: 'm5', d: '4 joueurs de champ + 1 gardien, sur le grand terrain. Règles officielles simplifiées : jet de 7 m sur faute dans la zone, 2 minutes d\'exclusion symbolique (on fait 5 tirs au bord) pour une faute dangereuse.'},
  roles: {n: 'Le match des rôles', k: 'coop', s: 'demi:hand:4c3', f: 'm4', d: 'Rôles fixes : un gardien, deux tireurs (qui ne passent pas au gardien), les autres sont passeurs (qui ne tirent pas). Les passeurs doivent donc trouver les tireurs : tout le monde est indispensable. On change les rôles à chaque but.'},
  cartes: {n: 'Le match des cartes', k: 'fp', s: 'demi:hand:4c3', f: 'm4', d: 'Dès qu\'une équipe mène de 3 buts, l\'équipe menée tire une carte « coup de pouce » (un joueur de plus, but élargi par 2 cônes, tir permis de plus près) ou impose une carte « défi » (2 gardiens en face, pas de dribble, tir de la main faible). Les cartes s\'additionnent.'},
  fairplay: {n: 'Le match fair-play', k: 'fp', s: 'match:hand:4c4', f: 'm4', d: 'Match normal, mais l\'équipe au bord donne aussi des points fair-play : +1 au joueur qui lève la main sur sa faute, qui relève un adversaire, qui serre la main du gardien après un but. Score final = buts + points fair-play.'},
  cible: {n: 'La cible du silence', k: 'coop', s: 'tir', d: 'En silence, chacun a un tir à 7 m sur une cible (cerceau suspendu au but, ou tapis) : la classe compte les réussites à voix basse et essaie de battre son record. Puis étirements (épaules, poignets, cuisses).'},
  bilan: {n: 'Le pouce et le mot', k: 'fp', s: 'etirements', d: 'En cercle, étirements guidés. Pouce en haut, au milieu ou en bas : « j\'ai appris », « j\'ai aimé ». Chaque équipe cite un geste fair-play vu chez l\'adversaire.'},
  nettoie: {n: 'Nettoie ton jardin', k: 'opp', s: 'libre', f: 'e2', d: 'Deux équipes, chacune dans sa moitié de terrain, avec tous les ballons en mousse répartis. Pendant 1 min, on lance les ballons dans le camp adverse, à une main, par-dessus la ligne médiane (qu\'on ne franchit pas). Au sifflet, tout le monde s\'arrête : le camp le plus propre gagne la manche.'},
  balleassise: {n: 'La balle assise', k: 'opp', s: 'chat', d: 'Chacun pour soi avec 2 ou 3 ballons en mousse : celui qui a un ballon ne court pas (3 pas) et touche un autre joueur sous les genoux. Touché = on s\'assoit. On se relève en interceptant une passe ou un ballon qui passe à portée, assis. Personne n\'est éliminé longtemps.'},
  queues: {n: 'La chasse aux queues', k: 'opp', s: 'voleurs', d: 'Chacun dribble à une main avec une chasuble glissée à l\'arrière du short (la queue). On essaie d\'arracher les queues des autres sans arrêter son dribble. Queue arrachée = 1 point ; celui qui a perdu la sienne en reprend une au bac et repart. 2 min, on compte.'},
  passeurs: {n: 'Les passeurs fous', k: 'coop', s: 'deux', f: 'p', d: 'Par deux avec un ballon, on se déplace partout en se faisant des passes à une main, jamais à moins de 4 m l\'un de l\'autre, et sans toucher les autres duos. Le prof annonce le type de passe (en appui, en course, à rebond, en suspension). Chaque passe attrapée = 1 : en 1 min, quel duo bat son record ?'},
  feu: {n: 'Le feu tricolore', k: 'coop', s: 'libre', d: 'Chacun dribble partout. Vert = dribble rapide, orange = dribble bas sur place, rouge = arrêt, 3 pas et tir dans le vide (bras armé), bleu = on échange son ballon avec un voisin par une passe. Le prof enchaîne de plus en plus vite et piège la classe.'},
  danse: {n: 'La danse du défenseur', k: 'coop', s: 'deux', f: 'p', d: 'Par deux sans ballon : l\'attaquant se déplace (feintes, arrêts, départs), le défenseur reste entre lui et le but, en pas chassés, bras hauts. Au sifflet, l\'attaquant sprinte 3 pas : le défenseur doit le toucher avant. On inverse.'},
  gardiens: {n: 'Les gardiens fous', k: 'coop', s: 'deux', f: 'p', d: 'Par deux, deux cônes à 3 m l\'un de l\'autre font un petit but. L\'un tire avec une balle en mousse à 5 m (à droite, à gauche, haut, bas), l\'autre arrête avec les mains ou les pieds. 5 tirs puis on change. 1 point par arrêt, 1 point par but : on bat son record.'},
  coins: {n: 'La cible des coins', k: 'coop', s: 'tir:hand', f: 'g6', d: 'À chaque but, 4 cibles dans les coins (cerceaux suspendus ou chasubles accrochées). Groupes de 6 : 2 tireurs à la fois, un gardien, les autres renvoient. Tir dans une cible = 3 points, but ailleurs = 1, arrêt du gardien = 1 point pour lui. On garde ses points, on change de gardien toutes les 2 min.'},
  buteurs: {n: 'Le match des buteurs', k: 'fp', s: 'demi:hand:4c3', f: 'm4', d: 'Match normal, mais le premier but de chaque joueur vaut 3 buts, les suivants 1. Toute l\'équipe a donc intérêt à faire marquer celui qui n\'a pas encore marqué. Le marqueur au bord coche les buteurs de chaque équipe.'},
  quatrebuts: {n: 'Le match des 4 buts', k: 'opp', s: 'match:hand:4c4', f: 'm4', d: 'Chaque équipe attaque 2 buts (le vrai but et un but-tapis dans le coin du même côté) et défend les 2 autres. Un seul gardien par équipe, qui court d\'un but à l\'autre. On cherche toujours le but le moins défendu : le jeu s\'écarte.'},
  sansdribble: {n: 'Le match sans dribble', k: 'opp', s: 'demi:hand:4c3', f: 'm4', d: 'Match où le dribble est interdit : le porteur a 3 pas et 3 secondes. Pour avancer, il faut donc que les partenaires se démarquent sans arrêt. Dribble = ballon rendu à l\'adversaire. But après 4 passes au moins = 2 buts.'},
  chronohand: {n: 'Le match chrono', k: 'opp', s: 'demi:hand:4c3', f: 'm4', d: 'Match où chaque attaque a {10|12} secondes pour tirer (le banc compte à voix haute) : c\'est la règle du jeu passif chez les pros. Tir arrêté par le gardien = l\'attaque repart à 0 si elle récupère. Pas de tir à temps = ballon à l\'adversaire.'},
  powerplay: {n: 'Le match des 2 minutes', k: 'fp', s: 'match:hand:5c5', f: 'm5', d: 'Match où les arbitres appliquent l\'exclusion : une faute dangereuse (pousser, tenir, frapper le bras) = le joueur sort 1 minute et son équipe joue en infériorité. L\'équipe en supériorité doit trouver le joueur libre ; l\'autre défend serré devant sa zone.'},
  gardienvol: {n: 'Le gardien volant', k: 'opp', s: 'match:hand:5c5', f: 'm5', d: 'Match où le gardien a le droit de sortir de sa zone pour devenir un joueur de champ en attaque (avec une chasuble de couleur). Son équipe attaque alors en supériorité, mais son but est vide : l\'adversaire peut tirer de loin s\'il récupère. On apprend à profiter du surnombre et à le punir.'},
  softhand: {n: 'Le soft-handball', k: 'fp', s: 'match:hand:4c4', f: 'm4', d: 'Le handball de rue venu de Scandinavie : ballon en mousse, pas de gardien, petits buts (tapis couchés ou cônes) avec une zone de 3 m où personne n\'entre. Aucun contact : on ne peut que se placer et intercepter. Dribble interdit, 3 pas et 3 secondes. Les matchs vont très vite et tout le monde touche le ballon.'},
  jokers: {n: 'Le match à jokers', k: 'coop', s: 'match:hand:4c4', f: 'm4', d: 'Match 3 c 3 + gardiens avec 2 jokers (chasuble neutre) sur les lignes de côté : ils jouent toujours avec l\'équipe qui a le ballon, sans tirer. L\'équipe en attaque est à 5 contre 3 : il faut fixer et décaler vers le joueur libre. On change de jokers toutes les 3 min.'},
  silencieux: {n: 'Le match silencieux', k: 'fp', s: 'match:hand:4c4', f: 'm4', d: 'Match où personne ne parle, même pas les arbitres : on s\'appelle avec la main levée, on arbitre avec les gestes officiels (marcher, reprise de dribble, zone, jet franc, 7 m). Une parole = jet de 7 m pour l\'adversaire.'},
  retard: {n: 'Le 3 contre 2 à retardement', k: 'opp', s: 'demi:hand:3c2', f: 'g6', d: 'Trois attaquants partent du milieu contre 2 défenseurs et un gardien. Un 3e défenseur part de la ligne de fond opposée au moment où le ballon passe la ligne médiane : il faut attaquer vite avant qu\'il arrive. But = 1 point, but avant l\'arrivée du 3e défenseur = 2 points.'},
  montante: {n: 'La montante', k: 'opp', s: 'tournoi:hand', f: 'm4', d: 'Matchs courts (3 min ou 3 buts) sur tous les terrains. L\'équipe qui gagne monte d\'un terrain vers le terrain du roi, celle qui perd descend. Chacun finit par jouer contre des équipes de son niveau ; l\'équipe sur le terrain du roi à la fin est championne.'},
  massage: {n: 'Le ballon masseur', k: 'coop', s: 'deux', f: 'p', d: 'Par deux : l\'un est allongé sur le ventre, l\'autre fait rouler doucement le ballon sur son dos, ses épaules et ses mollets en lui racontant son meilleur moment de la leçon. 1 min 30 puis on change. Étirements des épaules et des poignets pour finir.'},
  arbitre: {n: 'Le quiz de l\'arbitre', k: 'coop', s: 'explication', d: 'En demi-cercle : le prof (ou un élève) mime une action (il marche, entre dans la zone, reprend son dribble, pousse…) ; la classe fait le geste officiel de l\'arbitre en même temps. Puis à l\'envers : le prof fait le geste, un élève mime la faute. Étirements pour finir.'},
  'Les phases finales': {n: 'Les phases finales', k: 'opp', s: 'tournoi:hand', f: 'm5', d: 'Demi-finales et finales, aussi pour toutes les places (3e, 5e…) : toutes les équipes jouent autant. Rôles tournants pour les équipes au repos : arbitres, table de marque, chrono, journaliste.'}
},
an: {
1: {th: 'Découvrir le handball en jouant : passer, tirer, respecter la zone', comp: ['HME2', 'HME4', 'HSC1', 'HSC3'], l: [
  {t: 'Manipuler, passer, recevoir', o: 'Faire une passe à une main qui arrive au partenaire et recevoir à deux mains.',
   e: [['demenageurs', 6, 'Manche 1 : on porte le ballon ; manche 2 : en dribble.'],
    ['loco', 7, 'Passes de la locomotive au wagon toutes les 5 secondes.']],
   c: [['dixpasses', 15, 'Passe à une main, bras armé en arrière, ballon au-dessus de l\'épaule.', 'Mon équipe réussit {2|1} fois 10 passes.', '6 passes si la classe peine ; 1 dribble autorisé.'],
    ['capitaine', 16, 'On lève les yeux avant de passer : où est le capitaine ?', 'Je fais au moins une passe au capitaine.', 'Le capitaine doit attraper sans sortir de son cerceau.'],
    ['tour', 15, 'Passes rapides pour faire bouger le défenseur.', 'Mon groupe fait tomber la tour {3|2} fois.', '2 tours et 2 défenseurs.']],
   x: [['espion', 15, 'L\'espion se déplace sur toute la ligne de fond.', 'Mon équipe marque {3|2} points.', 'Le passeur devient espion seulement après 3 passes de son équipe.']],
   r: [['bilan', 7]]},
  {t: 'Tirer au but', o: 'Tirer à une main, bras armé haut, en visant les coins du but.',
   e: [['chasseur', 6, 'Tirs à une main sous les genoux uniquement.'],
    ['cerceau', 7, 'On vise le cerceau qui roule : c\'est un tir précis.']],
   c: [['trembler', 15, 'Viser les coins, loin du gardien.', 'Je marque {3|2} fois sur 5.', 'Le gardien a un ballon en mousse en main (il est moins mobile).'],
    ['portes', 16, 'On choisit sa porte au dernier moment pour tromper le gardien.', 'Je marque {4|2} points sur 5 tirs.', 'Les portes reculent pour les plus forts.'],
    ['coins', 15, 'Viser les coins, loin du gardien : on arme le bras haut.', 'Je touche au moins une cible.', 'Cibles plus grandes pour les débutants.']],
   x: [['duelgardien', 15, 'Penalty à 7 m pour tous, chacun passe aussi gardien.', 'J\'arrête au moins un tir ou je marque {3|2} fois.', 'Gardien à genoux pour les plus forts.']],
   r: [['cible', 7]]},
  {t: 'Les règles : les 3 pas et le dribble', o: 'Courir avec le ballon en respectant 3 pas, dribble et pas de reprise de dribble.',
   e: [['voleurs', 6, 'Dribble à une main ; le voleur qui vole fait 3 pas et passe à un autre voleur.'],
    ['pegobol', 7, '3 pas pour le porteur : on compte à voix haute !']],
   c: [['douaniers', 15, '3 pas puis passe ou dribble : le douanier gagne le ballon sur un marcher.', 'Notre duo traverse {3|2} fois sans faute.', 'Un douanier de plus dans la bande du milieu.'],
    ['gendarmes', 16, 'Pas de reprise de dribble : les gendarmes prennent le ballon sur faute.', 'Mon équipe marque {3|2} fois sur 5 ballons.', 'Gendarme supplémentaire.'],
    ['m4', 15, 'Les arbitres sifflent marcher et reprise de dribble ; on rejoue au pied de la faute.', 'Je ne fais aucun marcher.', 'Les arbitres comptent les fautes de chaque équipe : moins de fautes = 1 point.']],
   x: [['fairplay', 15, 'Faute reconnue par le joueur lui-même = pas de point perdu.', 'Je lève la main quand je fais une faute.', 'Chaque équipe a un temps mort.']],
   r: [['arbitre', 7]]},
  {t: 'Respecter la zone', o: 'Tirer sans entrer dans la zone ; le gardien seul y joue.',
   e: [['nettoie', 6, 'Lancer à une main, bras armé en arrière : c\'est le geste du tir.'],
    ['balleassise', 7]],
   c: [['canettes', 15, 'La zone est sacrée : un pied dedans = objet remis debout.', 'Je tire sans entrer dans la zone.', 'Zone plus grande pour les plus forts.'],
    ['Le saut au-dessus de la zone', 15, 'Course d\'élan, appel du pied opposé au bras qui tire, saut au-dessus d\'une corde tenue par 2 élèves ou d\'une rangée de coupelles, tir avant de retomber dans la zone. Comptez les buts.', 'Je réussis {3|2} tirs en saut sur 5.', 'La corde monte.', 'tir:hand', 'g6'],
    ['buteurs', 16, 'Le gardien est le seul dans la zone ; un attaquant qui y met le pied rend le ballon.', 'Je marque mon premier but du match.', 'But tiré d\'au-dessus de la zone, en l\'air = 2 buts.']],
   x: [['citadelle', 15, 'La zone de la citadelle est sacrée.', 'Mon équipe renverse la citadelle {3|2} fois.', 'Citadelle plus petite.']],
   r: [['meteo', 7]]},
  {t: 'Jouer ensemble et défendre', o: 'Passer au partenaire libre et défendre sans contact entre l\'attaquant et le but.',
   e: [['queues', 6],
    ['passeurs', 7, 'Le passeur suit sa passe, le receveur se démarque.']],
   c: [['roles', 16, 'Les passeurs doivent trouver les tireurs.', 'Je joue mon rôle à chaque attaque.', 'Un passeur peut tirer 1 fois par match.'],
    ['tchouk', 15, 'Sans contact ni interception : on gagne en se plaçant.', 'Mon équipe marque {4|2} points.', 'Point double si les 3 passes sont faites par 3 joueurs différents.'],
    ['cartes', 15, 'Défense : on reste entre l\'attaquant et le but, bras levés.', 'Le match reste serré.', 'Les cartes sont choisies par les arbitres.']],
   x: [['quatrebuts', 15, 'Défense : on se replace entre son joueur et le but le plus proche.', 'Je défends sans faire de faute.', 'Le gardien unique reste toujours devant le même but.']],
   r: [['mercis', 7]]},
  {t: 'Évaluation : tir et match', o: 'Montrer le tir après 3 pas et le jeu en équipe en match.',
   crit: [['Tir après 3 pas (5 tirs)', 6, '6 : 4-5 buts sans marcher, bras armé haut · 4 : 3 buts · 2 : 1-2 buts ou marcher · 0 : aucun'], ['Passe en match', 4, '4 : passes précises au partenaire libre · 2 : parfois · 0 : perd souvent le ballon'], ['Démarquage', 4, '4 : se déplace pour recevoir · 2 : parfois · 0 : reste immobile'], ['Règles (zone, marcher, contact)', 3, '3 : aucune faute · 1 : quelques fautes · 0 : fautes répétées'], ['Fair-play', 3, '3 : respecte et félicite · 1 : correct · 0 : conteste']],
   e: [['feu', 6],
    ['gardiens', 7, 'Pour se régler : chacun passe gardien et tireur.']],
   c: [['Épreuve 1 : le tir après 3 pas', 15, 'Chacun part du milieu, 3 pas, tir. 5 tirs, un camarade compte, le prof observe le geste. Les autres jouent au roi des gardiens sur l\'autre but.', '', '', 'tir:hand', 'g6'],
    ['Épreuve 2 : match observé', 22, 'Matchs 4 contre 4 de 5 min ; les équipes au bord arbitrent.', '', '', 'demi:hand:4c3', 'm4']],
   r: [['parole', 6]]}
]},
2: {th: 'Jouer vers l\'avant : tir en suspension, démarquage, montée de balle', comp: ['HME2', 'HME4', 'HSC1', 'HSC2'], l: [
  {t: 'Le tir en suspension', o: 'Prendre son appel, sauter haut et tirer pendant la suspension.',
   e: [['chasseur', 6],
    ['nettoie', 7, 'On lance en sautant, comme un tir en suspension, par-dessus la ligne.']],
   c: [['Le saut au-dessus de la zone', 15, 'La corde (ou un banc) marque la limite de la zone : on tire en l\'air.', 'Je réussis {3|2} tirs en suspension sur 5.', 'Un défenseur lève les bras devant la corde.'],
    ['trembler', 16, 'Seuls les buts en suspension comptent.', 'Je marque {2|1} buts en suspension.', 'Le premier qui marque en suspension gagne 2 points.'],
    ['m4', 15, 'But en suspension = 2 buts.', 'Je tente au moins 2 tirs en suspension.', 'Zone plus grande : tout tir est en suspension.']],
   x: [['coins', 15, 'Tir en suspension vers les coins.', 'Je touche une cible en suspension.', 'Tir de 9 m pour les plus forts.']],
   r: [['cible', 7]]},
  {t: 'Se démarquer pour recevoir', o: 'Se déplacer dans un espace libre, loin de son défenseur, pour être vu par le porteur.',
   e: [['pegobol', 6],
    ['Le chat aux appels', 7, 'Chaque fuyard qui tient un ballon est protégé ; les fuyards se passent les ballons pour protéger celui qui est en danger (il appelle « ici ! »).', '', '', 'chat']],
   c: [['dixpasses', 15, 'On ne rend jamais le ballon à celui qui vient de passer.', 'Je reçois au moins {6|4} passes.', 'Porteur immobile (pivot seulement).'],
    ['espion', 16, 'L\'espion change de côté sans arrêt pour se démarquer.', 'Mon équipe marque {4|2} points.', 'Deux espions.'],
    ['sansdribble', 15, 'Un joueur immobile plus de 3 s sans ballon : le ballon passe à l\'adversaire.', 'Je reçois au moins {5|3} passes.', 'But après 4 passes = 3 buts.']],
   x: [['tchouk', 15, 'Il faut se placer pour rattraper les rebonds : c\'est du démarquage défensif !', 'Mon équipe marque {4|2} points.']],
   r: [['bilan', 7]]},
  {t: 'La montée de balle rapide', o: 'Après une récupération, remonter le terrain vite par des passes vers l\'avant.',
   e: [['demenageurs', 6, 'Transport par passes uniquement, en courant.'],
    ['Course contre le ballon', 7, 'Un coureur sprinte du but au but opposé pendant que 2 coéquipiers remontent le terrain en se passant le ballon : le ballon doit arriver avant le coureur, qui reçoit et tire.', '', '', 'files', 'g3']],
   c: [['Le gardien relanceur', 15, 'Le gardien arrête (ou attrape) et relance tout de suite à un ailier qui sprinte ; l\'ailier tire au but opposé avant qu\'un défenseur parti en retard le rattrape.', 'Je marque {3|2} contre-attaques sur 5.', 'Deux ailiers et un défenseur.', 'match:hand:2c1', 'g4'],
    ['gendarmes', 16, 'Les voleurs doivent marquer en moins de 8 secondes.', 'Mon équipe marque {3|2} fois sur 5.'],
    ['quatrebuts', 15, 'But marqué en moins de 6 s après une récupération = 2 buts : on attaque le but le plus libre.', 'Je cours vers l\'avant dès qu\'on récupère.', 'Le prof compte les 6 secondes à voix haute.']],
   x: [['retard', 15, 'La montée de balle doit aller plus vite que le 3e défenseur.', 'Notre trio marque avant le retour du 3e défenseur.', 'Le 3e défenseur part plus tôt.']],
   r: [['meteo', 7]]},
  {t: 'Défendre en individuel', o: 'Suivre son attaquant, rester entre lui et le but, gêner sans contact.',
   e: [['loco', 6, 'Sans ballon : le wagon défend en restant face à la locomotive.'],
    ['danse', 7]],
   c: [['La garde du corps', 15, 'Chaque défenseur a un attaquant à suivre partout ; la passe à 10 : la défense marque si son « protégé » ne reçoit aucune passe pendant 20 s.', 'Mon joueur reçoit moins de {3|4} passes.', 'On change de joueur au sifflet.', 'match:hand:4c4', 'm4'],
    ['douaniers', 16, 'Les douaniers peuvent suivre un joueur jusqu\'au bout de la bande.', 'Comme douanier, je récupère {2|1} ballons.'],
    ['chronohand', 15, 'Défense individuelle annoncée à voix haute : si on tient {10|12} s sans faute, le ballon est à nous.', 'Je défends sans faute jusqu\'au bout du chrono.', 'Un but encaissé sur une faute = 2 buts.']],
   x: [['fairplay', 15, 'Faute de contact reconnue = jet franc sans discussion.', 'Je défends sans faute.']],
   r: [['massage', 7]]},
  {t: 'Règles et arbitrage', o: 'Jouer et arbitrer avec les bons gestes : marcher, zone, contact, jet de 7 m.',
   e: [['voleurs', 6],
    ['cerceau', 7]],
   c: [['silencieux', 16, 'Gestes du jour : marcher, reprise de dribble, zone, jet franc.', 'Je fais les gestes d\'arbitre sans parler.', 'Une parole autorisée par équipe et par match.'],
    ['cartes', 15, 'Arbitrage sans le prof.', 'Le match reste serré.'],
    ['duelgardien', 15, 'Les jets de 7 m sifflés pendant les matchs se tirent ici.', 'J\'arrête ou je marque 3 fois.']],
   x: [['m5', 15, 'Match final arbitré par deux élèves.', 'Mon équipe gagne ou j\'arbitre bien.']],
   r: [['quiz', 7]]},
  {t: 'Évaluation : suspension, démarquage, match', o: 'Montrer le tir en suspension, le démarquage et la montée de balle en match.',
   crit: [['Tir en suspension : geste', 4, '4 : appel, saut, tir en l\'air bras haut · 2 : saut sans tir en l\'air · 0 : tir à l\'arrêt'], ['Tir en suspension : buts (5 tirs)', 4, '4 : 4-5 buts · 3 : 3 · 2 : 2 · 1 : 1 · 0 : aucun'], ['Démarquage', 4, '4 : se libère sans cesse · 2 : parfois · 0 : reste derrière son défenseur'], ['Montée de balle', 3, '3 : court vers l\'avant à chaque récupération · 1 : parfois · 0 : jamais'], ['Défense et règles', 5, '5 : défend sans faute, joue sans marcher · 3 : quelques fautes · 0 : fautes répétées']],
   e: [['balleassise', 6],
    ['gardiens', 7, 'Tirs en suspension sur le gardien pour se régler.']],
   c: [['Épreuve 1 : tirs en suspension', 15, '5 tirs en suspension au-dessus de la corde. Les autres jouent au roi des gardiens.', '', '', 'tir:hand', 'g6'],
    ['Épreuve 2 : match observé', 22, 'Matchs 4 contre 4 de 5 min ; les équipes au bord arbitrent.', '', '', 'demi:hand:4c3', 'm4']],
   r: [['mercis', 6]]}
]},
3: {th: 'Attaque placée et défense de zone', comp: ['HME2', 'HME4', 'HSC1', 'HSC2', 'GSS1'], l: [
  {t: 'Les postes en attaque', o: 'Occuper les postes (ailiers, arrières, demi-centre, pivot) pour étirer la défense.',
   e: [['dixpasses', 6, 'Chacun a un poste marqué par une coupelle et doit y revenir après chaque passe.'],
    ['cerceau', 7]],
   c: [['Les cases', 15, 'Six cerceaux posés aux postes d\'attaque autour de la zone. Un attaquant ne peut recevoir que dans un cerceau ; on marque après une passe venue d\'un autre cerceau. 3 défenseurs gênent.', 'Mon équipe marque {3|2} fois sur 5 attaques.', 'Les cerceaux s\'écartent pour élargir le jeu.', 'demi:hand:6c5', 'g7'],
    ['buteurs', 16, 'Chacun annonce son poste avant l\'engagement ; le premier but de chaque poste vaut 3.', 'Je marque depuis mon poste.', 'Changement de poste à chaque but.'],
    ['canettes', 15, 'Les objets sont aux deux coins : il faut passer par les ailes.', 'Je renverse un objet depuis un poste d\'aile.']],
   x: [['cartes', 15, '', 'Le match reste serré.']],
   r: [['bilan', 7]]},
  {t: 'Fixer et décaler', o: 'Attirer un défenseur vers soi puis passer au partenaire libre.',
   e: [['pegobol', 6],
    ['tour', 7]],
   c: [['Le 2 contre 1 en couloir', 15, 'Couloirs de 5 m : 2 attaquants contre 1 défenseur. Le porteur fonce vers le défenseur (fixe), puis passe au partenaire (décale) qui tire.', 'Notre duo marque {4|3} fois sur 5.', 'Le défenseur peut choisir de rester entre les 2.', 'demi:hand:2c1', 'g3'],
    ['Le 3 contre 2', 16, '3 attaquants contre 2 défenseurs + gardien : on fixe et on décale jusqu\'au joueur libre.', 'Notre trio marque {3|2} fois sur 5.', 'Le 3e défenseur part en retard.', 'demi:hand:3c2', 'g5'],
    ['jokers', 15, 'Les jokers sur les côtés créent le surnombre : fixe et décale vers eux.', 'Je fixe mon défenseur avant de passer.', 'But après « fixe-décale » = 2 buts.']],
   x: [['silencieux', 15, 'Fixe et décale sans parler : on se fait signe avec les yeux et la main.', 'Je trouve le joueur libre sans parler.']],
   r: [['cible', 7]]},
  {t: 'La défense de zone 6-0', o: 'Défendre ensemble en ligne devant la zone, sortir sur le porteur et revenir.',
   e: [['La chaîne', 6, 'Jeu du chat qui s\'allonge : chaque élève touché donne la main au chat ; la chaîne avance ensemble, comme une défense qui coulisse.', '', '', 'chat'],
    ['loco', 7, 'Le wagon défend en pas chassés.']],
   c: [['Le mur qui coulisse', 15, 'Cinq défenseurs le long de la zone se tiennent par une corde imaginaire : quand le ballon bouge, toute la ligne coulisse. Le défenseur en face du porteur sort, les autres ferment. Ballon récupéré = 1 point défense.', 'Notre défense récupère {3|2} ballons.', 'La défense peut monter un joueur.', 'demi:hand:6c5', 'g7'],
    ['chronohand', 16, 'Défense de zone obligatoire : on sort sur le porteur, on rentre dès qu\'il passe.', 'Notre défense tient {10|12} s sans faute.', 'But encaissé sur une faute = 2 buts.'],
    ['citadelle', 15, 'Les défenseurs de la citadelle jouent en zone : ils sortent sur le porteur et rentrent.', 'Notre citadelle tient {2|1} min.', 'Deux citadelles par camp.']],
   x: [['softhand', 15, 'Sans gardien : la défense de zone est la seule protection.', 'Notre défense intercepte {2|1} ballons.', 'Ballon de hand à la place du ballon en mousse.']],
   r: [['meteo', 7]]},
  {t: 'Jouer avec le pivot', o: 'Trouver le pivot placé dans la défense et l\'utiliser pour tirer ou décaler.',
   e: [['queues', 6],
    ['passeurs', 7, 'Un joueur au centre (le pivot) reçoit et remet : une passe par le pivot compte double.']],
   c: [['Le pivot caché', 15, '4 attaquants + 1 pivot dans la défense contre 3 défenseurs. Passe au pivot qui tire = 2 buts ; le pivot peut aussi remettre à un arrière.', 'Mon équipe trouve le pivot {3|2} fois.', 'Le pivot bloque un défenseur (écran).', 'demi:hand:4c3', 'g7'],
    ['powerplay', 16, 'But du pivot = 2 buts ; une faute sur le pivot = 1 minute d\'exclusion.', 'Je trouve le pivot au moins une fois.', 'L\'équipe en supériorité doit marquer par le pivot.'],
    ['portes', 15, 'Les portes sont proches de la zone (tirs de pivot, à bout portant).', 'Je marque {3|2} fois sur 5.']],
   x: [['sansdribble', 15, 'Sans dribble, le pivot devient indispensable.', 'Je reçois du pivot ou je lui passe.']],
   r: [['parole', 7]]},
  {t: 'Tournoi', o: 'Utiliser postes, fixation et pivot dans un tournoi arbitré par les élèves.',
   e: [['voleurs', 6],
    ['trembler', 7]],
   c: [['m5', 20, 'Tournoi : chaque équipe a un coach au bord pendant 1 min.', 'Mon équipe gagne au moins un match.'],
    ['montante', 16, '', 'Mon équipe monte au moins une fois.', 'Il faut gagner par 2 buts d\'écart pour monter.'],
    ['duelgardien', 10, '', 'J\'arrête ou je marque 3 fois.']],
   x: [['fairplay', 15, 'Finale fair-play.', 'Mon équipe a des points de fair-play.']],
   r: [['ralenti', 7]]},
  {t: 'Évaluation : attaque placée et défense', o: 'Montrer la tenue de poste, la fixation et la défense de zone en match.',
   crit: [['Tenue du poste en attaque placée', 5, '5 : occupe son poste et l\'étire · 3 : parfois · 0 : se regroupe autour du ballon'], ['Fixation-passe', 5, '5 : fixe et décale à bon escient · 3 : parfois · 0 : jamais'], ['Défense de zone', 5, '5 : sort, revient, coulisse · 3 : parfois · 0 : reste immobile'], ['Règles et fair-play', 5, '5 : sans faute, respecte · 3 : quelques fautes · 0 : conteste']],
   e: [['feu', 6],
    ['danse', 7]],
   c: [['Épreuve : match observé', 38, 'Matchs 5 contre 5 de 6 min ; le prof observe avec la grille ; les équipes au bord arbitrent.', '', '', 'match:hand:5c5', 'm5']],
   r: [['mercis', 6]]}
]},
4: {th: 'Jeu collectif organisé : croisés, défense 5-1, contre-attaque, gardien', comp: ['HME2', 'HME4', 'HSC1', 'HSC2', 'GSS1'], l: [
  {t: 'Les croisés', o: 'Croiser avec un partenaire pour faire changer la défense de joueur et se libérer.',
   e: [['loco', 6, 'La locomotive et le wagon se croisent à chaque cône rencontré.'],
    ['La toupie', 7, 'Par deux : le porteur court en diagonale ; son partenaire passe derrière lui (le croisé) et reçoit le ballon de la main à la main au moment où ils se croisent. 10 croisés chacun, de plus en plus vite.', '', '', 'deux', 'p']],
   c: [['Le croisé à 2', 15, '2 attaquants contre 1 défenseur et 1 gardien : le porteur part en diagonale vers le défenseur, son partenaire croise derrière lui et reçoit lancé. Le défenseur doit choisir qui suivre. Croisé réussi + but = 2 points.', 'Notre duo marque {3|2} fois sur 5.', 'Deux défenseurs qui ont le droit de « changer » (s\'échanger les attaquants).', 'demi:hand:2c2', 'g4'],
    ['Le système secret', 16, 'Chaque équipe invente un croisé à 3 avec un nom de code (« Paris », « Volcan »…) et l\'annonce à voix haute. But sur la combinaison annoncée = 2 buts. Les défenseurs entendent le nom : à eux de deviner !', 'Notre combinaison réussit {2|1} fois.', 'Les équipes ont 2 combinaisons et un faux nom de code.', 'match:hand:5c5', 'm5'],
    ['portes', 15, 'Les portes sont placées en diagonale : il faut croiser pour les passer.', 'Je marque {3|2} fois sur 5.', 'Un défenseur passif à contourner avant la porte.']],
   x: [['cartes', 15, 'Carte « croisé obligatoire » pour l\'équipe qui mène.', 'Le match reste serré.']],
   r: [['ralenti', 7, 'Chaque équipe montre son croisé au ralenti.']]},
  {t: 'La défense 5-1', o: 'Défendre avec un joueur avancé qui gêne les passes, les autres en ligne devant la zone.',
   e: [['La chaîne', 6, 'Le chat s\'allonge en chaîne, puis la chaîne envoie un « éclaireur » devant elle.'],
    ['pegobol', 7, 'Un chasseur avancé coupe les passes.']],
   c: [['Le mur qui coulisse', 15, 'Défense 5-1 : le défenseur avancé (le « 1 ») chasse le ballon devant la ligne et coupe les passes vers le demi-centre ; les 5 autres coulissent. Ballon récupéré = 1 point défense.', 'Notre défense récupère {3|2} ballons.', 'Le défenseur avancé change à chaque attaque.'],
    ['espion', 16, 'Le défenseur avancé chasse les passes vers l\'espion ; interception = 1 point.', 'Mon équipe intercepte {2|1} passes.', 'Deux espions.'],
    ['chronohand', 15, 'Défense 5-1 obligatoire pour les 2 équipes.', 'Notre défenseur avancé récupère {2|1} ballons.', 'Le défenseur avancé change à chaque but.']],
   x: [['fairplay', 15, 'Faute de défense reconnue = jet franc rendu sans discussion.', 'Je défends sans faute.']],
   r: [['cible', 7]]},
  {t: 'La contre-attaque organisée', o: 'Organiser la contre-attaque en 2 vagues : les ailiers d\'abord, les arrières ensuite.',
   e: [['Course contre le ballon', 6, 'Avec 2 vagues : 2 coureurs, puis 2 passeurs qui suivent.', '', '', 'files', 'g3'],
    ['demenageurs', 7, 'Transport par passes longues uniquement.']],
   c: [['Le gardien relanceur', 15, 'Deux vagues : les 2 ailiers sprintent dès l\'arrêt du gardien (1re vague), les 2 arrières suivent pour un 2e tir si la 1re vague est bloquée.', 'Je marque {3|2} contre-attaques sur 5.', 'Deux défenseurs reviennent en retard.', 'match:hand:2c1', 'g4'],
    ['Les vagues', 16, 'Trois équipes : A attaque contre B ; si B récupère, elle contre-attaque vers l\'autre but où C l\'attend. L\'équipe qui marque reste, l\'autre sort.', 'Mon équipe marque {3|2} contre-attaques.', 'Défenseur supplémentaire au retour.', 'tournoi:hand', 'm4'],
    ['quatrebuts', 15, 'Contre-attaque : après une récupération, on attaque le but le plus libre en moins de 6 s.', 'Je cours vers l\'avant dès qu\'on récupère.', 'But en contre-attaque = 2 buts.']],
   x: [['retard', 15, 'Contre-attaque à 3 contre 2, le 3e défenseur revient.', 'Notre trio marque avant le retour du 3e défenseur.']],
   r: [['bilan', 7]]},
  {t: 'Le gardien de but', o: 'Garder son but : placement au milieu de l\'angle, réflexes, relance rapide.',
   e: [['Le jongleur du gardien', 6, 'Par deux : l\'un lance des balles en mousse à droite, à gauche, en haut, en bas ; l\'autre les arrête avec les mains ou les pieds. 20 secondes puis on change.', '', '', 'deux', 'p'],
    ['cerceau', 7, 'Le gardien du cerceau : un joueur protège le cerceau qui roule.']],
   c: [['duelgardien', 15, 'Tout le monde passe gardien : se placer au milieu de l\'angle de tir, bras levés, avancer d\'un pas vers le tireur.', 'J\'arrête {2|1} tirs.', 'Tir à 9 m pour les plus forts.'],
    ['coins', 16, 'Le gardien regarde le tireur, se place sur la ligne ballon-but et réagit tard.', 'J\'arrête {3|2} tirs en tant que gardien.', 'Cibles enlevées : on vise juste loin du gardien.'],
    ['gardienvol', 15, 'Arrêt du gardien + relance réussie = 1 point bonus ; le gardien peut sortir jouer.', 'Je relance vite après un arrêt.', 'Le gardien volant ne peut pas tirer.']],
   x: [['softhand', 15, 'Pour finir : sans gardien, tout le monde défend.', 'Je touche le ballon à chaque attaque.']],
   r: [['respire', 7]]},
  {t: 'Tournoi', o: 'Utiliser croisés, défense organisée et contre-attaque dans un tournoi arbitré par les élèves.',
   e: [['queues', 6],
    ['nettoie', 7]],
   c: [['m5', 20, 'Tournoi : chaque équipe a un coach au bord (1 temps mort de 30 s par match).', 'Mon équipe gagne au moins un match.', 'But sur croisé = 2 buts.'],
    ['montante', 16, '', 'Mon équipe monte au moins une fois.'],
    ['trembler', 10, 'Concours par équipe : il compte dans le classement du tournoi.', 'Mon équipe gagne des points.']],
   x: [['silencieux', 15, 'Finale silencieuse : les supporters encouragent seulement en applaudissant.', 'Mon équipe joue la finale ou je l\'arbitre.']],
   r: [['meteo', 7]]},
  {t: 'Évaluation : jeu collectif', o: 'Montrer croisés, défense organisée et contre-attaque en match.',
   crit: [['Action collective (croisé, passe et va)', 6, '6 : réalise et réussit · 3 : réalise · 0 : jamais'], ['Défense organisée', 5, '5 : tient son rôle · 3 : parfois · 0 : jamais'], ['Contre-attaque', 4, '4 : part vite à chaque récupération · 2 : parfois · 0 : jamais'], ['Règles et fair-play', 5, '5 : sans faute · 3 : quelques fautes · 0 : conteste']],
   e: [['balleassise', 6],
    ['passeurs', 7, 'Passe et croise : après la passe, on croise derrière le receveur.']],
   c: [['Épreuve : match observé', 38, 'Matchs 5 contre 5 de 6 min ; le prof observe avec la grille ; les équipes au bord arbitrent.', '', '', 'match:hand:5c5', 'm5']],
   r: [['mercis', 6]]}
]},
5: {th: 'Tactique : défense étagée, supériorité numérique, combinaisons', comp: ['HME2', 'HME4', 'HSC1', 'HSC2', 'GSS1'], l: [
  {t: 'Attaquer une défense 3-2-1', o: 'Trouver les espaces d\'une défense étagée par la circulation du ballon et le pivot.',
   e: [['tour', 6, 'Deux défenseurs, l\'un devant l\'autre (défense étagée).'],
    ['dixpasses', 7, 'Passes en une touche.']],
   c: [['Les cases', 15, 'Défense 3-2-1 en face : 3 défenseurs devant la zone, 2 au milieu, 1 avancé. Les espaces sont entre les lignes.', 'Mon équipe marque {3|2} fois sur 5 attaques.', 'Défense qui peut changer d\'organisation en criant un chiffre.'],
    ['Le pivot caché', 15, 'Le pivot se place entre les lignes de la défense étagée.', 'Mon équipe trouve le pivot {3|2} fois.'],
    ['chronohand', 16, 'Une équipe défend en 3-2-1, l\'autre en 6-0 ; on échange à la mi-temps.', 'Je trouve l\'espace entre deux lignes de défense.', 'But entre les lignes = 2 buts.']],
   x: [['cartes', 15, 'Carte « défense imposée » choisie par l\'équipe menée.', 'Le match reste serré.']],
   r: [['bilan', 7]]},
  {t: 'Supériorité et infériorité numérique', o: 'Profiter d\'un joueur en plus ; résister ensemble à un joueur en moins.',
   e: [['pegobol', 6],
    ['Course contre le ballon', 7]],
   c: [['Le 3 contre 2', 15, 'Puis 4 contre 3 : le joueur libre doit tirer.', 'Notre trio marque {3|2} fois sur 5.'],
    ['powerplay', 16, 'Toutes les 2 min, une équipe joue 1 min avec un joueur de moins.', 'En supériorité, mon équipe marque.', 'En infériorité, on défend serré devant la zone.'],
    ['gendarmes', 15, 'Les gendarmes sont 3 contre 4 voleurs.', 'Mon équipe marque {3|2} fois sur 5.']],
   x: [['fairplay', 15, 'Faute dangereuse = exclusion symbolique de 2 minutes (le joueur fait le tour du monde au bord).', 'Je n\'ai aucune exclusion.']],
   r: [['cible', 7]]},
  {t: 'Créer ses combinaisons', o: 'Inventer, nommer et réussir une combinaison d\'attaque.',
   e: [['loco', 6],
    ['La toupie', 7]],
   c: [['Le système secret', 18, 'Chaque équipe invente 2 combinaisons (croisé, écran pour le tireur, passe au pivot), leur donne un nom de code et les joue. But sur combinaison annoncée = 3 buts.', 'Notre combinaison réussit {2|1} fois.', 'L\'adversaire qui devine la combinaison gagne 1 point.'],
    ['jokers', 15, 'Les jokers peuvent servir de relais dans les combinaisons.', 'Notre combinaison passe par un joker.'],
    ['duelgardien', 13, 'Les buts du concours comptent pour l\'équipe.', 'J\'arrête ou je marque 3 fois.']],
   x: [['gardienvol', 15, 'Match sans arbitre : les joueurs annoncent eux-mêmes leurs fautes ; le gardien peut sortir jouer.', 'Je reconnais mes fautes.']],
   r: [['ralenti', 7]]},
  {t: 'Le beach handball', o: 'Jouer au beach handball : buts spectaculaires, gardien joueur, fair-play.',
   e: [['chasseur', 6],
    ['cerceau', 7, 'On vise le cerceau en sautant (tir en l\'air).']],
   c: [['Le beach hand', 18, 'Règles du beach : but normal = 1 point ; but en « kung-fu » (ballon reçu et tiré en l\'air) ou après un tour sur soi = 2 points ; but du gardien = 2 points. Pas de dribble. Manches de 4 min ; chaque manche se gagne séparément.', 'Je marque un but spectaculaire.', 'Les débutants marquent 2 points pour tout but en suspension.', 'demi:hand:4c3', 'm4'],
    ['tchouk', 15, 'Le jeu sans contact : on finit en douceur.', 'Mon équipe marque {4|2} points.'],
    ['Le saut au-dessus de la zone', 13, 'Pour réussir son kung-fu : recevoir en l\'air.', 'Je réussis {3|2} tirs en suspension sur 5.']],
   x: [['buteurs', 15, 'Beach : chaque nouveau buteur fait gagner 3 points ; on vote pour l\'action la plus spectaculaire.', 'Je marque au moins un but.']],
   r: [['meteo', 7]]},
  {t: 'Arbitrer et coacher', o: 'Tenir les rôles d\'arbitre, de coach et de table de marque.',
   e: [['voleurs', 6],
    ['trembler', 7]],
   c: [['silencieux', 16, 'Gestes du jour : marcher, zone, jet franc, 7 m, exclusion ; arbitrage par gestes seulement.', 'J\'arbitre avec les bons gestes.'],
    ['m5', 15, 'Un coach par équipe : 1 temps mort et 2 changements par mi-temps.', 'Mon conseil de coach est appliqué.'],
    ['montante', 15, 'Montante arbitrée et coachée par les élèves : le coach choisit qui monte sur le terrain.', 'Mon équipe monte au moins une fois.']],
   x: [['coins', 15, 'Les jets de 7 m sifflés pendant les matchs se tirent à la fin : une cible = 2 buts.', 'Je marque mon jet de 7 m.']],
   r: [['quiz', 7]]},
  {t: 'Évaluation : projet tactique', o: 'Appliquer un projet tactique d\'équipe en match.',
   crit: [['Projet tactique visible', 6, '6 : visible et réussi · 3 : visible · 0 : absent'], ['Efficacité', 4, '4 : buts et passes décisives · 2 : quelques-uns · 0 : aucun'], ['Défense', 3, '3 : tient son rôle · 1 : parfois · 0 : jamais'], ['Rôles (coach, arbitre)', 4, '4 : tenus avec sérieux · 2 : en partie · 0 : refus'], ['Fair-play', 3, '3 : exemplaire · 1 : correct · 0 : conflit']],
   e: [['feu', 6],
    ['queues', 7]],
   c: [['Épreuve : tournoi observé', 38, 'Chaque équipe annonce son projet (attaque et défense) avant de jouer. Matchs de 6 min, arbitrés par les élèves.', '', '', 'match:hand:5c5', 'm5']],
   r: [['mercis', 6]]}
]},
6: {th: 'Autonomie : projet d\'équipe, préparation physique, tournoi organisé', comp: ['HME2', 'HSC1', 'HSC2', 'HSC3', 'GSS1', 'GSS5'], l: [
  {t: 'Diagnostic et équipes', o: 'Faire le point sur son niveau et former des équipes équilibrées.',
   e: [['demenageurs', 6],
    ['dixpasses', 7]],
   c: [['draft', 14, 'Les capitaines s\'appuient sur les évaluations des années passées.', 'Les équipes sont équilibrées (vérifié au 1er match).', 'Le prof peut échanger 2 joueurs.'],
    ['quatrebuts', 18, 'Matchs de découverte : chaque équipe note 2 forces et 1 faiblesse.', 'Notre équipe écrit 2 forces et 1 faiblesse.'],
    ['contrat', 14, 'Le contrat contient une défense (6-0, 5-1 ou 3-2-1) et une combinaison.', 'Notre contrat est écrit et testé.', '', 'match:hand:5c5', 'm5']],
   x: [['cartes', 15, 'Premier classement.', 'Mon équipe gagne un match.']],
   r: [['bilan', 7]]},
  {t: 'Préparation physique du handballeur', o: 'Préparer jambes, épaules et gainage en jouant.',
   e: [['chasseur', 13, 'Version longue, chasseurs de plus en plus nombreux.']],
   c: [['Le circuit du handballeur', 20, '6 ateliers de 45 s par équipe : sauts au-dessus de lattes, pas chassés défensifs entre 2 cônes, lancers de ballon lesté contre le mur, gainage en se passant un ballon, sprints-relais, tirs en suspension. L\'équipe additionne ses scores.', 'Notre équipe bat son score au 2e tour.', 'Les ateliers sont choisis par les équipes.', 'ateliers:hand:6', 'a6'],
    ['softhand', 16, 'Après le circuit, on joue sans contact.', 'Je touche le ballon à chaque attaque.'],
    ['gardiens', 10, 'Pour souffler : gardiens fous par deux.', 'Je bats mon record.']],
   x: [['tchouk', 15, 'Tchoukball pour finir sans contact.', 'Mon équipe marque {4|2} points.']],
   r: [['cible', 7]]},
  {t: 'Préparer son équipe', o: 'S\'entraîner en autonomie sur ses points faibles.',
   e: [['echequipe', 13]],
   c: [['coach', 16, 'Jeux conseillés : le croisé à 2, le mur qui coulisse, le pivot caché, le gardien relanceur.', 'Notre équipe progresse sur son point faible.'],
    ['buteurs', 15, 'On teste le contrat d\'équipe : chacun doit marquer.', 'Toute l\'équipe a marqué.'],
    ['trembler', 15, 'Concours par équipe : il compte dans le classement du tournoi.', 'Mon équipe gagne des points.']],
   x: [['chronohand', 15, 'Matchs de classement rapides : {10|12} s par attaque.', 'Mon équipe tire à temps.']],
   r: [['parole', 7]]},
  {t: 'Tournoi organisé par les élèves (1)', o: 'Organiser et vivre un tournoi : jouer, arbitrer, tenir la table de marque.',
   e: [['balleassise', 6, 'Mené par un capitaine.'],
    ['passeurs', 7]],
   c: [['m5', 34, 'Phase de poules : chaque équipe rencontre les autres. Rôles tournants : 2 arbitres, table de marque, chrono, journaliste.', 'Je tiens chaque rôle sérieusement.', 'Victoire = 3 points, nul = 2, défaite = 1.', 'tournoi:hand', 'm5'],
    ['coins', 12, 'Les équipes au repos font le concours des coins : il compte au classement.', 'Mon équipe gagne des points.']],
   x: [['fairplay', 15, 'Le classement fair-play compte autant que celui des victoires.', 'Mon équipe a des points de fair-play.']],
   r: [['journaliste', 7]]},
  {t: 'Tournoi organisé par les élèves (2)', o: 'Jouer la phase finale avec le même esprit.',
   e: [['queues', 6, 'Mené par un capitaine.'],
    ['nettoie', 7]],
   c: [['Les phases finales', 34, '', 'Mon équipe joue au meilleur de son niveau.', 'Chaque joueur doit marquer ou faire une passe décisive.'],
    ['duelgardien', 12, 'Défi final : les finalistes contre le reste de la classe aux jets de 7 m.', 'Mon camp gagne le défi.']],
   x: [['montante', 15, 'Matchs de classement pour toutes les places, puis remise des trophées (meilleur buteur, gardien, fair-play, progrès).', 'Mon équipe reçoit un trophée ou une mention.']],
   r: [['ralenti', 7, 'Chaque équipe rejoue au ralenti son action du tournoi.']]},
  {t: 'Évaluation : performance et rôles', o: 'Évaluer le jeu et les rôles tenus dans le tournoi.',
   crit: [['Efficacité en match', 5, '5 : marque, passe, défend · 3 : contribue · 0 : absent'], ['Choix de jeu', 4, '4 : bons choix · 2 : parfois · 0 : jamais'], ['Défense', 3, '3 : efficace · 1 : parfois · 0 : jamais'], ['Implication dans le projet', 3, '3 : moteur · 1 : présent · 0 : absent'], ['Arbitrage', 5, '5 : juste et clair · 3 : quelques erreurs · 0 : refuse']],
   e: [['feu', 6],
    ['danse', 7]],
   c: [['Le tournoi d\'évaluation', 40, 'Matchs de 6 min, rôles tournants ; chaque élève arbitre au moins un match. Le prof observe avec la grille.', '', '', 'tournoi:hand', 'm5']],
   r: [['mercis', 6]]}
]}
}});

/* ===== Schémas de chaque jeu (dessinés par carnet/prepas/schemas.js) ===== */
(window.PSCH_SC = window.PSCH_SC || {}).hand = {
  demenageurs: g => g.court('salle', {none: 1}).hoop(45, 125, 20).balls(45, 125, 5, 'hand').hoop(355, 125, 20).balls(355, 125, 5, 'hand').label(45, 160, 'réserve A', {s: 9.5, b: 1}).label(355, 160, 'réserve B', {s: 9.5, b: 1})
    .A(80, 80).A(150, 60, '', {ball: true}).run(160, 62, 330, 105, -10, 1).A(120, 190).B(320, 80).B(250, 180, '', {ball: true}).run(240, 182, 68, 140, 10).B(290, 150)
    .n(1, 'on porte UN ballon à la fois de sa réserve vers celle de l\'adversaire').n(2, 'au bout de 2 min, l\'équipe qui a le moins de ballons chez elle gagne (manche 2 : en dribble, manche 3 : par passes)'),
  loco: g => { g.hall(); [[90, 70], [280, 80], [110, 180], [290, 185]].forEach(([x, y]) => g.A(x + 22, y, 'L', {ball: true}).A(x - 22, y, 'W', {ball: true, c: '#5b8de0'}).run(x + 34, y, x + 70, y - 12, -8)); return g.label(200, 130, 'L = locomotive · W = wagon qui copie tout', {s: 10, b: 1}).n(1, 'le wagon suit et copie ; au sifflet, on inverse'); },
  dixpasses: g => g.half('hand').scatter('a', 4, 130, 45, 300, 210, {seed: 2}).each((x, y, i) => i < 3 && g.pass(x, y, ...g.last[i + 1], 12, i ? null : 1)).scatter('b', 4, 150, 60, 290, 200, {seed: 9}).tag(230, 243, '10 passes de suite = 1 point · 3 pas maximum', {s: 9.5})
    .n(1, 'on compte les passes à voix haute ; ballon au sol ou volé = l\'autre équipe repart à 0'),
  capitaine: g => g.court('salle', {none: 1}).scatter('a', 4, 60, 45, 190, 205, {seed: 3}).scatter('b', 4, 210, 45, 340, 205, {seed: 5}).hoop(368, 125, 13).A(368, 125, 'C').hoop(32, 125, 13).B(32, 125, 'C')
    .pass(185, 110, 355, 122, -12, 1).label(368, 152, 'capitaine A', {s: 9}).label(32, 152, 'capitaine B', {s: 9}).n(1, 'passe attrapée par son capitaine = 1 point ; le passeur devient capitaine (3 pas, pas de dribble)'),
  tour: g => g.hall().czone(200, 125, 65, '', 'red').cone(200, 125).label(200, 145, 'tour', {s: 9}).X(165, 105).ring('a', 7, 200, 125, 105, 95, {balls: [0]})
    .pass(200, 42, 290, 95, -12, 1).shot(290, 105, 205, 122, 0, 2).label(200, 243, 'personne n\'entre dans le cercle', {s: 9.5}).n(1, 'passes rapides pour faire bouger le défenseur').n(2, 'tir sur la tour : tour tombée = le tireur devient défenseur'),
  espion: g => g.court('salle', {none: 1}).scatter('a', 4, 60, 45, 190, 205, {seed: 3}).scatter('b', 4, 210, 45, 340, 205, {seed: 5}).A(372, 80, 'E').run(372, 92, 372, 160, 0).B(28, 160, 'E').pass(180, 100, 360, 85, -10, 1)
    .label(372, 185, 'espion A', {s: 9}).n(1, 'passe réussie à son espion (derrière la ligne de fond adverse) = 1 point, le passeur devient espion'),
  bilan: g => g.calme('👍 j\'ai appris · j\'ai aimé').n(1, 'étirements guidés, pouce levé, puis chaque équipe cite un geste fair-play'),
  chasseur: g => g.hall().scatter('a', 9, 40, 40, 360, 215, {seed: 5}).X(170, 110, '', {ball: 'mousse'}).X(260, 80).pass(181, 108, 252, 86, -10, 1).shot(270, 88, g.last[6][0], g.last[6][1] + 8, 0, 2)
    .tag(100, 243, 'touche sous les genoux · 3 pas', {s: 9.5}).n(1, 'les chasseurs se font des passes').n(2, 'tir à une main sous les genoux : touché = on devient chasseur'),
  cerceau: g => g.hall().hoop(150, 125, 16).A(60, 125, 'R').run(72, 125, 135, 125, 0).run(165, 125, 300, 125, 0, 1).A(200, 55, '', {ball: true}).A(260, 200, '', {ball: true}).A(300, 60, '', {ball: true})
    .shot(205, 65, 205, 118, 0, 2).shot(260, 188, 240, 132, 0).label(60, 150, 'rouleur', {s: 9}).n(1, 'le rouleur fait rouler le cerceau').n(2, 'tir à une main à travers le cerceau en mouvement = 1 point'),
  portes: g => g.half('hand').X(372, 125, 'G').minigoal(270, 60, true, 24).minigoal(250, 125, true, 24).minigoal(270, 190, true, 24).plot(355, 100, '#e11d48').plot(355, 125, '#1f63d6').plot(355, 150, '#facc15')
    .A(150, 125, '', {ball: true}).run(160, 125, 245, 70, -10, 1).shot(275, 62, 372, 115, 0, 2).label(225, 40, '3 portes de couleur', {s: 9.5})
    .n(1, 'le tireur choisit sa porte au dernier moment').n(2, 'il tire ; le gardien doit d\'abord toucher le plot de la même couleur'),
  canettes: g => g.court('salle', {none: 1}).czone(20, 125, 55, '', 'red').czone(380, 125, 55, '', 'red').bench(30, 100, 30, 150).bench(370, 100, 370, 150).cone(28, 112).cone(28, 125).cone(28, 138).cone(372, 112).cone(372, 125).cone(372, 138)
    .scatter('a', 4, 120, 50, 200, 200, {seed: 3}).scatter('b', 4, 210, 50, 290, 200, {seed: 6}).A(300, 70, '', {ball: true}).shot(310, 78, 368, 115, 0, 1).n(1, 'tir depuis l\'extérieur de la zone : 1 point par objet renversé sur le banc'),
  duelgardien: g => g.half('hand').X(372, 125, 'G').A(290, 125, 'T', {ball: true}).shot(300, 125, 368, 118, 0, 1).file('a', 4, 230, 125, -20, 0).label(290, 145, '7 m', {s: 9.5, b: 1}).run(372, 140, 230, 185, -30, 2)
    .n(1, 'penalty à 7 m : but = le tireur reste tireur').n(2, 'arrêt = le tireur devient gardien et le gardien rejoint la file'),
  cible: g => g.half('hand').hoop(375, 110, 10).ring('a', 8, 250, 125, 70, 85, {a0: Math.PI / 2}).A(290, 125, '', {ball: true}).shot(300, 122, 366, 112, 0).tag(190, 30, 'en silence : on compte à voix basse', {s: 10}).label(375, 95, 'cible', {s: 9}),
  voleurs: g => g.half('hand').scatter('a', 8, 130, 40, 300, 215, {ball: true, seed: 4}).each((x, y, i) => g.drib(x, y, x + (i % 2 ? 26 : -24), y + (i % 3 ? 18 : -16), 6)).X(215, 95, 'V').X(270, 170, 'V').run(226, 98, 250, 115, -6, 1)
    .n(1, 'dribble à une main ; les voleurs chipent un ballon sans toucher le joueur').n(2, 'qui perd son ballon devient voleur'),
  pegobol: g => g.hall().scatter('a', 9, 40, 40, 360, 215, {seed: 5}).X(170, 110, '', {ball: true}).X(260, 90).X(220, 170).pass(181, 112, 250, 94, -10, 1).run(268, 98, 300, 120, -6, 2).tag(110, 243, 'le porteur : 3 pas maximum', {s: 9.5})
    .n(1, 'les chasseurs se font des passes pour coincer un fuyard').n(2, 'on touche un fuyard avec le ballon tenu en main ; touché = chasseur'),
  douaniers: g => { g.half('hand').zone(130, 25, 60, 200, 'bande 1', 'grey', {top: 1}).zone(195, 25, 60, 200, 'bande 2', 'grey', {top: 1}).zone(260, 25, 50, 200, 'bande 3', 'grey', {top: 1}); g.X(160, 110, 'D').X(225, 150, 'D').X(285, 100, 'D').X(372, 125, 'G');
    return g.A(80, 90, '', {ball: true}).A(80, 165).drib(90, 90, 150, 70, 0).pass(150, 75, 180, 170, 10, 1).run(90, 165, 175, 180, 0).pass(185, 175, 230, 70, -10).run(240, 70, 300, 60, 0).shot(310, 70, 372, 115, 0, 2)
      .n(1, 'par 2 avec un ballon, on traverse les bandes par passes et dribbles').n(2, 'puis tir au but ; chaque douanier reste dans sa bande'); },
  gendarmes: g => g.half('hand').hoop(70, 125, 20).balls(70, 125, 5, 'hand').label(70, 160, 'réserve (5 ballons)', {s: 9}).pls('a', [[160, 80], [140, 125, '', {ball: true}], [160, 170]]).X(270, 125).X(372, 125, 'G')
    .pass(150, 120, 160, 88, 6, 1).run(170, 80, 290, 70, -10).pass(170, 85, 285, 75, -6).shot(295, 75, 370, 115, 0, 2).n(1, '3 voleurs portent un ballon de la réserve').n(2, 'jusqu\'à la cachette (le but) et marquent ; le gendarme ne touche que le ballon'),
  m4: g => g.half('hand').pls('a', [[180, 60], [160, 125, '', {ball: true}], [180, 190]]).pls('x', [[290, 70], [270, 125], [290, 180]]).X(372, 125, 'G').pass(165, 118, 178, 70, 8, 1).shot(188, 65, 368, 115, -6, 2).bord(40, 60, 3, 'au bord : arbitres', 'g', {dx: 0, dy: 22})
    .n(1, '3 joueurs de champ + 1 gardien').n(2, 'personne dans la zone sauf le gardien ; 3 pas, 3 secondes, pas de reprise de dribble'),
  fairplay: g => g.court().X(28, 125, 'G').B(372, 125, 'G').scatter('a', 4, 80, 50, 190, 200, {seed: 3}).scatter('b', 4, 210, 50, 320, 200, {seed: 8}).ball(118, 70, 'hand').bord(178, 238, 3, '', 'g')
    .tag(200, 13, 'équipe au bord : +1 fair-play (faute reconnue, aide, main au gardien)', {s: 9.5}).n(1, 'score final = buts + points fair-play'),
  'Le saut au-dessus de la zone': g => g.half('hand').X(372, 125, 'G').rope(318, 85, 318, 165, 0, '#c2185b').A(318, 75, '', {}).A(318, 175).A(200, 140, '', {ball: true}).run(210, 140, 300, 128, -6, 1).shot(325, 122, 368, 118, 0, 2)
    .label(318, 200, 'corde tenue par 2 élèves', {s: 9}).n(1, 'course d\'élan, appel sur le pied opposé au bras qui tire').n(2, 'saut au-dessus de la corde et tir avant de retomber dans la zone'),
  citadelle: g => g.court('salle', {none: 1}).czone(55, 125, 30, '', 'red').cone(55, 125).czone(345, 125, 30, '', 'red').cone(345, 125).scatter('a', 4, 100, 50, 190, 200, {seed: 2}).scatter('b', 4, 210, 50, 300, 200, {seed: 7})
    .A(280, 125, '', {ball: true}).shot(290, 125, 340, 125, 0, 1).n(1, 'on avance par passes (3 pas, pas de dribble) et on tire pour renverser la citadelle adverse'),
  roles: g => g.half('hand').X(372, 125, 'G').pls('a', [[190, 60, 'P'], [150, 125, 'P', {ball: true}], [190, 190, 'P'], [270, 85, 'T'], [270, 165, 'T']]).pls('x', [[310, 100], [310, 150]])
    .pass(160, 120, 185, 70, 8, 1).pass(198, 66, 262, 82, -6).shot(280, 85, 368, 115, 0, 2).n(1, 'les passeurs (P) ne tirent pas : ils cherchent les tireurs').n(2, 'les tireurs (T) ne passent pas : ils marquent'),
  tchouk: g => { g.court('salle', {none: 1}); g.raw('<rect x="22" y="105" width="10" height="40" rx="3" fill="#2d3530" transform="rotate(-10 27 125)"/><rect x="368" y="105" width="10" height="40" rx="3" fill="#2d3530" transform="rotate(10 373 125)"/>');
    g.czone(40, 125, 30, '', 'red').czone(360, 125, 30, '', 'red').label(360, 170, 'tchoukball', {s: 9}).scatter('a', 4, 120, 50, 230, 200, {seed: 3}).scatter('b', 4, 240, 50, 320, 200, {seed: 6}).A(270, 120, '', {ball: true});
    return g.shot(280, 120, 362, 122, 0, 1).lob(362, 128, 300, 200, -20, 2).n(1, 'tir sur le cadre de rebond').n(2, 'le ballon doit retomber dans le terrain sans être rattrapé : on défend en se plaçant, sans contact ni interception'); },
  cartes: g => g.half('hand').X(372, 125, 'G').pls('a', [[180, 60], [160, 125, '', {ball: true}], [180, 190]]).pls('x', [[290, 70], [270, 125], [290, 180]]).sheet(50, 70, 'coup de pouce').sheet(50, 150, 'défi')
    .n(1, 'l\'équipe menée de 3 buts pioche une carte « coup de pouce » ou impose une carte « défi »'),
  'Épreuve 1 : le tir après 3 pas': g => g.half('hand').X(372, 125, 'G').A(130, 125, '', {ball: true}).run(140, 125, 270, 125, 0, 1).label(170, 112, '1', {s: 10, b: 1}).label(210, 112, '2', {s: 10, b: 1}).label(250, 112, '3', {s: 10, b: 1}).shot(280, 125, 368, 120, 0, 2)
    .P(250, 200).sheet(275, 200).n(1, 'du milieu, 3 pas').n(2, 'tir ; 5 tirs, un camarade compte, le prof observe le geste'),
  'Épreuve 2 : match observé': g => g.half('hand').pls('a', [[180, 60], [160, 125, '', {ball: true}], [180, 190]]).pls('x', [[290, 70], [270, 125], [290, 180]]).X(372, 125, 'G').P(60, 60).sheet(85, 60).bord(40, 150, 3, 'au bord : arbitres', 'g', {dx: 0, dy: 22})
    .n(1, 'matchs 4 contre 4 de 5 min'),
  'Le saut de grenouille': g => { g.hall(); [70, 180].forEach(y => { g.file('a', 3, 60, y, -18, 0).A(80, y, '', {ball: true}); [140, 200, 260].forEach(x => g.hurdle(x, y, 26)); g.path('run', [[92, y], [140, y - 26], [170, y], [200, y - 26], [230, y], [260, y - 26], [300, y]]).pass(300, y + 10, 92, y + 12, -12); });
    return g.num(140, 40, 1).n(1, 'saut au-dessus des 3 lattes : appel 1 pied, réception 2 pieds, ballon armé au-dessus de l\'épaule').n(2, 'puis passe au suivant').num(200, 210, 2); },
  'Le chat aux appels': g => g.hall().scatter('a', 9, 40, 40, 360, 215, {seed: 2}).ball(g.last[1][0] + 8, g.last[1][1] + 7, 'hand').ball(g.last[5][0] + 8, g.last[5][1] + 7, 'hand').X(250, 140).run(240, 140, g.last[4][0] + 12, g.last[4][1], 8, 1)
    .pass(g.last[5][0], g.last[5][1], g.last[4][0], g.last[4][1], 10, 2).tag(g.last[4][0], g.last[4][1] - 20, '« ici ! »', {s: 9.5}).n(1, 'le chat poursuit').n(2, 'un fuyard qui tient un ballon est protégé : on lui passe le ballon quand il appelle'),
  'Course contre le ballon': g => g.court().A(40, 125, 'C').run(50, 125, 330, 125, 0, 1).A(60, 60, '', {ball: true}).A(130, 200).pass(70, 65, 125, 190, 0, 2).A(210, 55).pass(135, 190, 205, 65, 0).A(290, 195).pass(215, 65, 285, 185, 0).pass(295, 185, 330, 135, 0).shot(340, 125, 372, 125, 0)
    .n(1, 'le coureur sprinte d\'un but à l\'autre').n(2, 'les 2 passeurs remontent le terrain : le ballon doit arriver avant le coureur, qui reçoit et tire'),
  'Le gardien relanceur': g => g.court().X(28, 125, 'G', {ball: true}).pass(40, 118, 180, 45, -20, 1).A(110, 45).run(120, 45, 300, 60, 0, 2).shot(310, 65, 372, 118, 0).B(372, 125, 'G').X(100, 200).run(110, 195, 280, 90, 10, 3)
    .n(1, 'le gardien arrête et relance tout de suite').n(2, 'l\'ailier sprinte et tire au but opposé').n(3, 'un défenseur parti en retard essaie de le rattraper'),
  m5: g => g.court().X(28, 125, 'G').B(372, 125, 'G').pls('a', [[290, 55], [255, 100, '', {ball: true}], [255, 160], [310, 200]]).pls('b', [[320, 80], [320, 125], [320, 170], [290, 220]]).pass(260, 108, 258, 152, 10)
    .shot(265, 95, 368, 118, -6, 1).n(1, '4 joueurs de champ + 1 gardien ; jet de 7 m sur faute dans la zone'),
  'La garde du corps': g => g.court().pls('a', [[90, 70], [150, 120], [110, 190], [180, 60, '', {ball: true}]]).pls('x', [[100, 85], [162, 132], [122, 200], [192, 72]]).pass(186, 72, 150, 108, 0).tag(280, 200, 'chaque défenseur colle SON attaquant', {s: 10})
    .n(1, 'passe à 10 : la défense marque si son protégé ne reçoit aucune passe pendant 20 s'),
  'Épreuve 1 : tirs en suspension': g => g.half('hand').X(372, 125, 'G').rope(318, 85, 318, 165, 0, '#c2185b').A(318, 75).A(318, 175).A(200, 140, '', {ball: true}).run(210, 140, 300, 128, -6).shot(325, 122, 368, 118, 0, 1).n(1, '5 tirs en suspension au-dessus de la corde ; les autres jouent au roi des gardiens'),
  'Les cases': g => { g.half('hand'); const C = [[300, 45], [250, 80], [230, 125], [250, 170], [300, 205], [290, 125]]; C.forEach(([x, y]) => g.hoop(x, y, 13)); g.pls('a', C.map(p => [p[0], p[1]])).X(372, 125, 'G').pls('x', [[290, 100], [275, 150], [325, 125]]);
    return g.ball(238, 128, 'hand').pass(238, 120, 250, 92, 6, 1).pass(255, 88, 295, 55, 6).shot(305, 50, 370, 115, 0, 2).n(1, 'on ne reçoit que dans un cerceau').n(2, 'on marque après une passe venue d\'un autre cerceau'); },
  'Le 2 contre 1 en couloir': g => g.half('hand').zone(120, 60, 200, 130, 'couloir de 5 m', 'grey', {top: 1}).X(372, 125, 'G').A(140, 100, '', {ball: true}).A(140, 160).X(250, 110).run(150, 100, 230, 108, 0, 1).pass(235, 115, 270, 158, 6, 2).run(150, 160, 265, 165, 0).shot(280, 160, 368, 128, 0)
    .n(1, 'le porteur fonce sur le défenseur (il le fixe)').n(2, 'puis passe au partenaire (il décale) qui tire'),
  'Le 3 contre 2': g => g.half('hand').X(372, 125, 'G').pls('a', [[170, 60], [150, 125, '', {ball: true}], [170, 190]]).pls('x', [[270, 100], [270, 150]]).run(160, 125, 240, 125, 0, 1).pass(245, 135, 182, 182, -14, 2).shot(185, 185, 368, 132, -10)
    .n(1, 'on fixe un défenseur').n(2, 'on décale jusqu\'au joueur libre, qui tire'),
  'La chaîne': g => g.hall().scatter('a', 8, 40, 40, 360, 120, {seed: 9}).pls('x', [[170, 180], [195, 180], [220, 180]]).rope(170, 180, 220, 180, 0, '#1d241f').run(195, 166, 195, 135, 0, 1)
    .n(1, 'chaque élève touché donne la main au chat : la chaîne avance ensemble (comme une défense qui coulisse)'),
  'Le mur qui coulisse': g => { g.half('hand').X(372, 125, 'G'); g.pls('x', [[330, 45], [310, 80], [305, 125], [310, 170], [330, 205]]); g.pls('a', [[230, 50], [200, 90, '', {ball: true}], [190, 140], [210, 190], [260, 220]]);
    return g.run(310, 80, 270, 88, 0, 1).run(305, 125, 310, 100, 0, 2).run(310, 170, 307, 145, 0).n(1, 'le défenseur en face du porteur sort').n(2, 'les autres ferment : toute la ligne coulisse avec le ballon'); },
  'Le pivot caché': g => g.half('hand').X(372, 125, 'G').pls('x', [[290, 80], [280, 125], [290, 170]]).pls('a', [[190, 50], [170, 105, '', {ball: true}], [170, 160], [200, 210], [320, 110, 'Pi']]).pass(180, 108, 312, 110, -6, 1).shot(330, 115, 368, 120, 0, 2)
    .n(1, 'passe au pivot caché dans la défense').n(2, 'le pivot tire (2 buts) ou remet à un arrière'),
  'Épreuve : match observé': g => g.court().X(28, 125, 'G').B(372, 125, 'G').scatter('a', 4, 80, 50, 190, 200, {seed: 3}).scatter('b', 4, 210, 50, 320, 200, {seed: 8}).P(200, 238).sheet(225, 238).n(1, 'matchs 5 contre 5 de 6 min ; le prof observe avec la grille ; les équipes au bord arbitrent'),
  'La toupie': g => { g.hall(); [[110, 80], [290, 80], [110, 185], [290, 185]].forEach(([x, y]) => g.A(x - 40, y + 25, 'P', {ball: true}).A(x - 40, y - 25).run(x - 30, y + 20, x + 30, y - 20, 0).run(x - 30, y - 20, x + 30, y + 22, 0)); return g.label(200, 133, 'le croisé : on se croise, le ballon passe de la main à la main', {s: 10, b: 1}).n(1, '10 croisés chacun, de plus en plus vite'); },
  'Le croisé à 2': g => g.half('hand').X(372, 125, 'G').X(280, 125).A(170, 90, '1', {ball: true}).A(170, 165, '2').run(180, 95, 250, 150, -14, 1).run(180, 160, 260, 95, 14, 2).pass(240, 140, 245, 108, 0).shot(270, 95, 368, 118, 0)
    .n(1, 'le porteur part en diagonale vers le défenseur').n(2, 'son partenaire croise derrière lui et reçoit lancé : le défenseur doit choisir'),
  'Le système secret': g => g.court().X(28, 125, 'G').B(372, 125, 'G').pls('a', [[250, 60], [230, 125, '', {ball: true}], [250, 190], [330, 125]]).pls('b', [[310, 75], [300, 125], [310, 175]]).run(240, 125, 280, 160, 10, 1).run(255, 190, 268, 112, -14, 2).shot(280, 110, 368, 118, 0)
    .sheet(60, 60, 'code « Volcan »').n(1, 'croisé').n(2, 'but sur la combinaison annoncée = 2 buts (les défenseurs entendent le nom !)'),
  'Les vagues': g => g.court().X(372, 125, 'G').pls('a', [[250, 70], [280, 125, '', {ball: true}], [250, 180]]).pls('b', [[300, 85], [320, 160], [300, 175]]).pls('j', [[70, 80, 'C'], [60, 125, 'C'], [70, 170, 'C']])
    .shot(290, 125, 366, 125, 0, 1).drib(310, 150, 120, 140, 10, 2).label(65, 205, 'équipe C attend', {s: 9}).n(1, 'A attaque contre B').n(2, 'B récupère et contre-attaque vers l\'autre but où C l\'attend ; qui marque reste'),
  'Le jongleur du gardien': g => { g.hall(); [[110, 75], [290, 75], [110, 185], [290, 185]].forEach(([x, y]) => g.A(x - 45, y, 'L').X(x + 45, y, 'G').lob(x - 35, y - 3, x + 40, y - 18, 10).ball(x + 30, y - 20, 'mousse')); return g.n(1, 'l\'un lance des balles en mousse à droite, à gauche, en haut, en bas ; le gardien arrête ; 20 s puis on change'); },
  'Le beach hand': g => g.half('hand').X(372, 125, 'G').pls('a', [[180, 60], [160, 125, '', {ball: true}], [180, 190]]).pls('x', [[290, 70], [270, 125], [290, 180]]).lob(170, 120, 300, 100, 30, 1).shot(305, 95, 368, 115, 0).tag(220, 243, 'kung-fu, tour sur soi, but du gardien = 2 points', {s: 9.5})
    .n(1, 'le « kung-fu » : ballon reçu en l\'air et tiré avant de retomber'),
  'Épreuve : tournoi observé': g => g.court().X(28, 125, 'G').B(372, 125, 'G').scatter('a', 4, 80, 50, 190, 200, {seed: 3}).scatter('b', 4, 210, 50, 320, 200, {seed: 8}).sheet(60, 238).label(100, 241, 'projet annoncé', {s: 9}).P(200, 238).sheet(225, 238)
    .n(1, 'chaque équipe annonce son projet (attaque, défense), puis matchs de 6 min arbitrés par les élèves'),
  'Le circuit du handballeur': g => { g.floor(); const T = ['sauts de lattes', 'pas chassés', 'ballon lesté au mur', 'gainage + passes', 'sprints-relais', 'tirs en suspension']; T.forEach((t, i) => { const x = 10 + (i % 3) * 127, y = 10 + Math.floor(i / 3) * 117; g.zone(x + 3, y + 3, 120, 110, '', 'blue').num(x + 18, y + 20, i + 1).label(x + 30, y + 24, t, {s: 9.5, b: 1, a: 'start'}); });
    g.hurdle(40, 80, 18).hurdle(70, 80, 18).hurdle(100, 80, 18).cone(160, 80).cone(230, 80).X(195, 80).run(185, 92, 225, 92, 0).wall(270, 34, 112, 8).A(326, 90, '', {ball: 'medecine'}).A(60, 190).A(100, 190).pass(70, 185, 92, 185, 0);
    g.cone(160, 165).cone(230, 165).A(180, 190).run(190, 190, 228, 190, 0).X(360, 175, 'G').A(300, 190, '', {ball: true}).shot(310, 185, 352, 175, 0);
    return g.rot(200, 120, 260, 120, 0).n(1, '45 s par atelier, puis on tourne ; l\'équipe additionne ses scores'); },
  'Le tournoi d\'évaluation': g => { g.terrains(2, {goals: 'hand', labs: ['terrain 1', 'terrain 2'], h: 200, y0: 15}); g.T.forEach(([x, y, w, h]) => g.scatter('a', 4, x + 20, y + 30, x + w / 2 - 10, y + h - 15, {seed: 3}).scatter('b', 4, x + w / 2 + 10, y + 30, x + w - 20, y + h - 15, {seed: 5}));
    return g.P(200, 238).sheet(225, 238).n(1, 'matchs de 6 min, rôles tournants ; chacun arbitre au moins un match'); },
  nettoie: g => { g.court('salle', {none: 1}); g.line('M200 25V225', 3, '#e8590c'); g.scatter('a', 6, 40, 40, 185, 210, {seed: 3}).scatter('b', 6, 215, 40, 360, 210, {seed: 8});
    [[90, 70], [150, 180], [300, 60], [260, 160], [330, 200], [60, 150]].forEach(([x, y]) => g.ball(x, y, 'mousse'));
    return g.shot(g.last[0][0] - 10, g.last[0][1], 120, 100, -30, 1).A(160, 110, '', {ball: 'mousse'}).shot(170, 105, 290, 110, -30).chrono(200, 238)
      .n(1, '1 min : on lance les ballons dans le camp adverse, à une main, sans franchir la ligne').n(2, 'au sifflet, le camp le plus propre gagne la manche'); },
  balleassise: g => { g.hall().scatter('a', 9, 40, 40, 360, 215, {seed: 4}); g.A(150, 110, '', {ball: 'mousse'}).A(280, 90, '', {ball: 'mousse'}).shot(160, 112, g.last[6][0] - 6, g.last[6][1] + 10, 10, 1);
    g.raw('<g transform="translate(240 180)"><circle cx="0" cy="-6" r="7" fill="#1f63d6"/><path d="M-9 4h18" stroke="#1f63d6" stroke-width="7" stroke-linecap="round"/></g>', 'top').label(240, 202, 'assis', {s: 9}).pass(290, 98, 250, 170, 10, 2);
    return g.n(1, 'le porteur ne court pas (3 pas) et touche sous les genoux').n(2, 'touché = assis ; on se relève en interceptant une passe'); },
  queues: g => g.hall().scatter('a', 10, 40, 40, 360, 215, {ball: true, seed: 12}).each((x, y, i) => g.chasuble(x - 12, y + 2, i % 3 ? '#facc15' : '#16a34a')).run(g.last[2][0] + 8, g.last[2][1] - 4, g.last[4][0] - 16, g.last[4][1], -10, 1)
    .bac(370, 230, '').n(1, 'on arrache la queue des autres sans arrêter son dribble').n(2, 'queue perdue : on en reprend une au bac et on repart'),
  passeurs: g => { g.hall(); [[80, 70, 165, 55], [250, 60, 335, 95], [70, 170, 145, 210], [220, 160, 305, 200], [180, 120, 265, 125]].forEach(([a, b, c, d], i) => g.A(a, b, '', {ball: true}).A(c, d).pass(a + 8, b, c - 10, d, -8, i ? null : 1).run(c, d + 12, c + 18, d + 26, 6));
    return g.tag(200, 238, 'jamais à moins de 4 m de son partenaire', {s: 9.5}).n(1, 'par deux, on se déplace partout en se faisant des passes à une main (type annoncé par le prof)').n(2, 'chaque passe attrapée = 1 : on bat son record en 1 min'); },
  danse: g => { g.hall(); [[100, 70], [280, 70], [100, 180], [280, 180]].forEach(([x, y], i) => g.A(x, y - 16).X(x, y + 16).run(x + 12, y - 16, x + 50, y - 16, 0, i ? null : 1).run(x + 14, y + 16, x + 50, y + 16, 0).run(x - 12, y - 16, x - 50, y - 16, 0));
    return g.label(200, 128, 'pas chassés, bras hauts, entre l\'attaquant et le but', {s: 10, b: 1}).n(1, 'l\'attaquant feinte et se déplace, le défenseur le suit').n(2, 'au sifflet, l\'attaquant sprinte 3 pas : le défenseur doit le toucher'); },
  gardiens: g => { g.hall(); [[110, 75], [290, 75], [110, 185], [290, 185]].forEach(([x, y], i) => { g.cone(x + 40, y - 18).cone(x + 40, y + 18).A(x + 46, y, 'G').A(x - 40, y, '', {ball: 'mousse'}); g.shot(x - 30, y, x + 36, y - 12 + (i % 2) * 22, 0, i ? null : 1); });
    return g.label(200, 132, '2 cônes à 3 m = un petit but · tir à 5 m', {s: 10, b: 1}).n(1, 'tir à droite, à gauche, haut, bas : le gardien arrête').n(2, '5 tirs puis on change ; 1 point par arrêt, 1 point par but'); },
  coins: g => { g.half('hand'); [[376, 98], [376, 152]].forEach(([x, y]) => g.hoop(x - 6, y, 8)); g.X(372, 125, 'G').A(240, 80, '', {ball: true}).A(240, 170, '', {ball: true}).shot(250, 82, 366, 99, -6, 1).shot(250, 168, 366, 150, 6)
    .pls('g', [[170, 215], [200, 215]]).label(185, 236, 'renvoient', {s: 9}); return g.label(345, 80, 'cible', {s: 9}).n(1, 'tir dans une cible = 3 points, but ailleurs = 1').n(2, 'arrêt = 1 point pour le gardien ; on change de gardien toutes les 2 min').num(372, 175, 2); },
  buteurs: g => g.half('hand').pls('a', [[180, 60, '3'], [160, 125, '', {ball: true}], [180, 190]]).pls('x', [[290, 70], [270, 125], [290, 180]]).X(372, 125, 'G').pass(165, 118, 178, 70, 8, 1).shot(188, 65, 368, 115, -6, 2)
    .bord(40, 60, 3, '', 'g', {dx: 0, dy: 22}).sheet(70, 150).label(55, 180, 'buteurs cochés', {s: 9}).n(1, 'on fait marquer celui qui n\'a pas encore marqué').n(2, 'premier but de chaque joueur = 3 buts, les suivants = 1'),
  quatrebuts: g => { g.court('hand'); g.mat(368, 20, 12, 34, {c: '#9fc2ea'}).mat(20, 196, 12, 34, {c: '#9fc2ea'}); g.label(330, 18, 'but-tapis', {s: 8.5}).label(70, 236, 'but-tapis', {s: 8.5});
    g.scatter('a', 4, 80, 50, 300, 200, {seed: 5}).scatter('b', 4, 100, 50, 320, 200, {seed: 9}).X(372, 125, 'G').X(28, 125, 'G');
    return g.A(280, 70, '', {ball: true}).shot(290, 64, 366, 38, 0, 1).n(1, 'on attaque le vrai but ou le but-tapis du même côté : le moins défendu').n(2, 'un seul gardien par équipe, qui court d\'un but à l\'autre'); },
  sansdribble: g => g.half('hand').pls('a', [[170, 60], [150, 125, '', {ball: true}], [180, 195], [240, 110]]).pls('x', [[260, 70], [255, 135], [280, 190]]).X(372, 125, 'G')
    .pass(160, 118, 166, 70, 8, 1).run(240, 110, 300, 100, -8, 2).run(180, 195, 230, 170, 6).tag(240, 238, 'pas de dribble · 3 pas · 3 secondes', {s: 9.5}).n(1, 'pour avancer, on passe').n(2, 'les partenaires se démarquent sans arrêt'),
  chronohand: g => g.half('hand').pls('a', [[180, 60], [160, 125, '', {ball: true}], [180, 190]]).pls('x', [[290, 70], [270, 125], [290, 180]]).X(372, 125, 'G').bord(40, 60, 3, '', 'g', {dx: 0, dy: 22}).chrono(70, 160)
    .tag(70, 190, '« 10, 9, 8… »', {s: 9.5}).n(1, 'le banc compte le temps d\'attaque à voix haute').n(2, 'pas de tir à temps = ballon à l\'adversaire (jeu passif)'),
  powerplay: g => g.court('hand').pls('a', [[230, 60], [260, 125, '', {ball: true}], [230, 190], [300, 90]]).pls('b', [[320, 75], [320, 125], [320, 175]]).X(372, 125, 'G').X(28, 125, 'G')
    .B(200, 238).chrono(225, 238).label(290, 238, 'exclu 1 minute', {s: 9}).pass(266, 132, 238, 182, 10, 1).n(1, 'en supériorité, on trouve le joueur libre').n(2, 'faute dangereuse = 1 minute sur le banc').num(170, 238, 2),
  gardienvol: g => g.court('hand').pls('a', [[230, 60], [260, 125, '', {ball: true}], [230, 190], [300, 90]]).A(210, 140, 'G', {c: '#16a34a'}).pls('b', [[320, 75], [320, 125], [320, 175]]).X(372, 125, 'G')
    .run(40, 125, 200, 140, 10, 1).label(45, 100, 'but vide !', {s: 9.5, b: 1}).shot(300, 170, 40, 130, -10, 2).n(1, 'le gardien sort et devient joueur de champ : supériorité').n(2, 'mais son but est vide : l\'adversaire peut tirer de loin s\'il récupère'),
  jokers: g => { g.court('hand'); g.J(130, 18).J(270, 232); g.pls('a', [[100, 80], [170, 150], [250, 90, '', {ball: true}]]).pls('b', [[150, 110], [230, 170], [300, 120]]).X(372, 125, 'G').X(28, 125, 'G');
    return g.pass(250, 80, 266, 220, 20, 1).pass(276, 226, 300, 140, 0).tag(300, 18, 'jokers sur les côtés', {s: 9.5}).n(1, 'les jokers jouent avec l\'équipe qui a le ballon, sans tirer').n(2, 'on change de jokers toutes les 3 min'); },
  silencieux: g => g.court('hand').scatter('a', 4, 60, 50, 190, 200, {seed: 3}).scatter('b', 4, 210, 50, 340, 200, {seed: 8}).each((x, y, i) => i === 1 && g.raw(`<path d="M${x + 4} ${y - 10}v-12" stroke="#e8590c" stroke-width="3" stroke-linecap="round"/>`, 'top')).ball(110, 70)
    .tag(200, 13, '🤫 personne ne parle', {s: 10}).bord(178, 238, 3, '', 'g').n(1, 'on appelle avec la main levée, on arbitre avec les gestes officiels').n(2, 'une parole = jet de 7 m pour l\'adversaire'),
  retard: g => g.court('hand').pls('a', [[150, 70, '', {ball: true}], [180, 125], [150, 180]]).pls('x', [[310, 100], [310, 150]]).X(372, 125, 'G').X(30, 200, '3').run(42, 196, 230, 170, 10, 2).drib(160, 72, 250, 85, -6, 1).line('M200 25V225', 3, '#e8590c', '8 5')
    .label(200, 18, 'le 3e défenseur part quand le ballon passe ici', {s: 9}).n(1, '3 attaquants contre 2 défenseurs et le gardien').n(2, 'un 3e défenseur part du fond quand le ballon passe le milieu : but avant son arrivée = 2 points'),
  montante: g => { g.terrains(4, {labs: ['terrain du roi 👑', 'terrain 2', 'terrain 3', 'terrain 4'], goals: 'hand'}); g.T.forEach(([x, y, w, h]) => g.row('a', 2, x + w * .3, y + h * .4, x + w * .3, y + h * .8).row('b', 2, x + w * .7, y + h * .4, x + w * .7, y + h * .8));
    return g.run(150, 150, 150, 98, 0, 1).run(245, 98, 245, 150, 0, 2).n(1, 'l\'équipe qui gagne monte vers le terrain du roi').n(2, 'celle qui perd descend'); },
  massage: g => { g.hall(); [[100, 75], [300, 75], [100, 180], [300, 180]].forEach(([x, y], i) => g.raw(`<g transform="translate(${x} ${y})"><circle cx="-34" cy="0" r="8" fill="#e8590c"/><rect x="-26" y="-7" width="48" height="14" rx="7" fill="#e8590c"/><path d="M22 -4H44M22 4H44" stroke="#e8590c" stroke-width="5" stroke-linecap="round"/></g>`, 'mid').A(x, y - 26).ball(x - 6, y - 2).arrow('run', x - 20, y - 12, x + 20, y - 12, 0, i ? null : 1));
    return g.label(200, 130, 'le ballon roule doucement sur le dos', {s: 10, b: 1}).n(1, 'l\'un est allongé, l\'autre fait rouler le ballon en racontant son meilleur moment').n(2, '1 min 30 puis on change ; étirements des épaules et des poignets'); },
  'Les phases finales': g => { g.terrains(2, {goals: 'hand', labs: ['finale 🏆', 'match pour la 3e place'], h: 190, y0: 12}); g.T.forEach(([x, y, w, h]) => g.scatter('a', 4, x + 15, y + 30, x + w / 2 - 8, y + h - 15, {seed: 3}).scatter('b', 4, x + w / 2 + 8, y + 30, x + w - 15, y + h - 15, {seed: 5}));
    return g.bord(60, 232, 3, '', 'g').sheet(150, 232).chrono(175, 232).label(270, 232, 'au repos : arbitres, table, chrono', {s: 9}).n(1, 'toutes les places se jouent : tout le monde joue autant'); },
  trembler: g => g.half('hand').X(372, 125, 'G').A(160, 85, '', {ball: true}).B(160, 165, '', {ball: true}).drib(170, 85, 270, 95, -6, 1).shot(278, 98, 368, 118, 0, 2).drib(170, 165, 270, 155, 6).shot(278, 152, 368, 132, 0)
    .pls('a', [[130, 60], [130, 190]]).pls('g', [[200, 222], [230, 222]]).label(215, 238, 'les autres renvoient', {s: 9}).label(245, 13, 'groupes de 6 à chaque but (vrais buts et buts-tapis)', {s: 9})
    .n(1, 'deux tireurs partent en même temps, chacun son ballon').n(2, 'le premier qui marque gagne 1 point, les deux suivants partent tout de suite'),
  feu: g => g.hall().P(200, 38).raw('<circle cx="232" cy="30" r="7" fill="#16a34a"/><circle cx="249" cy="30" r="7" fill="#f59f00"/><circle cx="266" cy="30" r="7" fill="#e11d48"/><circle cx="283" cy="30" r="7" fill="#1f63d6"/>', 'top')
    .scatter('a', 11, 50, 80, 350, 215, {ball: true, seed: 8}).label(28, 30, 'vert = vite · orange = bas', {s: 9, a: 'start'}).label(28, 46, 'rouge = 3 pas + tir à vide', {s: 9, a: 'start'}).label(372, 52, 'bleu = échange de ballon', {s: 9, a: 'end'})
    .n(1, 'chacun dribble partout et obéit à la couleur ; le prof piège la classe'),
  softhand: g => { g.court('salle', {none: 1}); [[42, 125], [358, 125]].forEach(([x, y]) => g.czone(x, y, 36, '', 'red').mat(x - 6, y - 16, 12, 32)); g.scatter('a', 4, 90, 50, 190, 200, {seed: 3}).scatter('b', 4, 210, 50, 310, 200, {seed: 8});
    return g.A(250, 125, '', {ball: 'mousse'}).shot(262, 124, 346, 125, 0, 1).tag(200, 238, 'pas de gardien · pas de contact · zone de 3 m', {s: 9.5}).n(1, 'on tire sur le petit but (tapis) sans entrer dans la zone').n(2, 'pas de dribble : 3 pas, 3 secondes'); },
  arbitre: g => { g.hall(); for (let i = 0; i < 9; i++){ const a = (.1 + i * .8 / 8) * Math.PI; g.A(200 + 165 * Math.cos(a), 62 + 150 * Math.sin(a)); } g.P(200, 70);
    return g.tag(200, 36, 'marcher ? zone ? reprise de dribble ?', {s: 10}).label(200, 130, 'la classe fait le geste de l\'arbitre', {s: 10, b: 1})
      .n(1, 'le prof mime une faute, la classe fait le geste officiel').n(2, 'puis l\'inverse : le prof fait le geste, un élève mime la faute'); }
};
