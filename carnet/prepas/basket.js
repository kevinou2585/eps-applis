/* Basket-ball en jeux : 6 leçons par année (1re → 6e secondaire), la 6e = évaluation.
   Format « jeux » (voir carnet/prepa-moteur.js) : catalogue J + leçons [clé, minutes pour 2 h, consigne du jour, réussite, variante, schéma?, organisation?].
   Esprit (Kevin, 26/10) : on apprend en jouant. Chaque leçon mélange opposition, coopération et fair-play ; les débutants
   prennent du plaisir et les confirmés sont défiés. {2 h|1 h} : exigence en 2 h | en 1 h. */
PREPA_JEUX({id: 'basket',
sport: 'Basket-ball',
mat: [['ballon de basket', 1, 'basket'], ['jeu de chasubles', 4, 'chasubles'], ['cône', 12, 'cones'], ['coupelle', 20, 'plots'], ['cerceau', 10, 'cerceaux'], ['sifflet et chrono']],
sal: {
  tk: {cible: 'le panier', terrain: 'la moitié du terrain'},
  g: {m: 3, tk: {cible: 'le panier'}, note: '2 demi-terrains avec panier + 1 terrain en largeur avec un « panier vivant » (un élève debout sur un banc tient un cerceau à bout de bras). On tourne pour que chaque équipe joue aussi sur un vrai panier.'},
  p: {m: 2, tk: {cible: 'le panier vivant (élève debout sur un plinth, cerceau à bout de bras)', terrain: 'la salle'}, note: 'pas de panier : 2 terrains en largeur, à chaque bout un « panier vivant » (un élève debout sur un plinth tient un cerceau à bout de bras, il change à chaque panier). Les tirs se travaillent aussi sur les gros tapis debout (cible scotchée).', warn: 'Petite salle : très bien pour les passes, le démarquage et les petits matchs ; pour le tir, on vise les paniers vivants.'},
  b: {m: 2, tk: {cible: 'le panier', terrain: 'la moitié du terrain'}, note: 'petit terrain à 2 paniers : 2 demi-terrains en même temps, les équipes au bord arbitrent depuis les bancs.'},
  c: {m: 2, tk: {cible: 'l\'anneau', terrain: 'la moitié du terrain de mini-foot'}, note: 'les 2 anneaux du terrain de mini-foot = 2 demi-terrains ; la 2e zone (sans tracé) accueille les jeux sans panier et les équipes en attente.', warn: 'Dehors : vérifier que le sol n\'est pas glissant, ballons un peu moins gonflés s\'il fait froid.'}
},
J: {
  voleurs: {n: 'Les voleurs de ballons', k: 'opp', s: 'voleurs', d: 'Tout le monde dribble dans {terrain}. {n/7 voleur} sans ballon (chasuble) essaient de faire sortir ou de chiper un ballon, sans toucher le joueur. Qui perd son ballon devient voleur et le voleur repart en dribble.'},
  crocos: {n: 'Les crocodiles', k: 'opp', s: 'chat', d: '{n/8 crocodile} au milieu du terrain, sans ballon. Les autres traversent en dribble d\'une ligne de fond à l\'autre au signal « Marée haute ! ». Un dribbleur touché devient crocodile, mais garde son ballon et doit continuer à dribbler pour chasser.'},
  atomes: {n: 'Les atomes', k: 'coop', s: 'libre', d: 'Tout le monde dribble partout. Le prof crie un nombre : on forme vite un groupe de ce nombre, ballons collés au centre. Le dernier groupe formé fait une mission éclair (5 passes sans faute) avant de repartir.'},
  miroir: {n: 'Le miroir du dribbleur', k: 'coop', s: 'deux', f: 'p', d: 'Par deux, un ballon chacun. Le meneur dribble et invente (changement de main, dribble bas, tour sur soi, arrêt) ; son ombre copie tout. Au sifflet, on inverse les rôles.'},
  chef: {n: 'Le chef d\'orchestre', k: 'coop', s: 'libre', d: 'Chacun dribble face au prof qui donne des signaux muets : bras levé = dribble haut, bras bas = dribble bas, doigt à gauche = main gauche, poing fermé = arrêt 2 pieds. Il faut regarder le prof, pas le ballon : qui se trompe fait 3 dribbles entre les jambes.'},
  demenage: {n: 'Le grand déménagement', k: 'opp', s: 'files', f: 'e4', d: 'Tous les ballons au rond central, une équipe dans chaque coin. Au signal, on va chercher un ballon (un seul à la fois) et on le ramène en dribble dans son coin. Quand le centre est vide, on a le droit de « déménager » les ballons des autres coins. Au bout de 2 min, on compte.'},
  roue: {n: 'La roue', k: 'coop', s: 'cercle', f: 'g5', d: 'En petit cercle, un ballon par joueur. « Hop ! » : tout le monde passe en même temps au voisin de droite et reçoit celui de gauche. On compte les tours sans ballon par terre ; au sifflet, on change de sens.'},
  pegobol: {n: 'Le pégobol', k: 'opp', s: 'chat', d: '{n/6 chasseur} avec un ballon de basket : on ne peut toucher un fuyard qu\'avec le ballon en main, et le porteur ne peut pas courir. Les chasseurs doivent donc se faire des passes pour coincer les fuyards. Touché = on devient chasseur.'},
  tourmonde: {n: 'Le tour du monde', k: 'opp', s: 'tir', f: 'g4', d: '5 coupelles en arc de cercle autour de {cible} (de la gauche à la droite, à 2-3 m). Chacun tire de la 1re coupelle : panier = on avance à la suivante, raté = on reste. Premier à faire le tour (aller ou aller-retour) gagne.'},
  passenom: {n: 'Passe-moi le nom', k: 'coop', s: 'cercle', f: 'g6', d: 'En cercle, on se passe le ballon en disant le prénom de celui qui reçoit. Puis 2 ballons en même temps, puis 3 : le groupe ne doit jamais faire tomber un ballon.'},
  roi: {n: 'Le roi du dribble', k: 'opp', s: 'voleurs', d: 'Chacun dribble dans un carré de cônes et essaie de faire sortir le ballon des autres tout en protégeant le sien (le corps entre le ballon et l\'adversaire). Qui perd son ballon fait un défi au bord (3 paniers ou 10 dribbles main faible) et revient. Toutes les 2 min, le carré rétrécit.'},
  taureau: {n: 'Le taureau', k: 'opp', s: 'carre:basket:2', f: 'g6', d: 'Cercle de 5-6 avec 1 ou 2 « taureaux » au centre. Le cercle se passe le ballon ; si un taureau touche le ballon, il prend la place du passeur fautif. Passe au voisin direct interdite.'},
  dixpasses: {n: 'La passe à 10', k: 'opp', s: 'match:basket:4c4', f: 'm4', d: 'Deux équipes dans {terrain}. 10 passes à la suite sans interception = 1 point, comptées à voix haute par toute l\'équipe. Pas de contact, pas de marcher ; le ballon tombé ou volé change de camp et on repart à 0.'},
  capitaine: {n: 'La balle au capitaine', k: 'coop', s: 'match:basket:4c4', f: 'm4', d: 'Chaque équipe a un capitaine debout dans un cerceau (ou sur un banc) derrière la ligne de fond adverse. Une passe attrapée par son capitaine = 1 point, et le passeur devient capitaine. Dribble limité à 3 rebonds.'},
  chateau: {n: 'Le château', k: 'opp', s: 'cercle', f: 'g8', d: 'Un cône sur un plot au centre d\'un grand cercle de coupelles, gardé par 1 ou 2 défenseurs (qui ne rentrent pas dans le cercle). Les attaquants autour se font des passes rapides pour déséquilibrer la défense et tirer à hauteur de poitrine sur le château. Château tombé = le tireur devient défenseur.'},
  knock: {n: 'Le knock-out', k: 'opp', s: 'tir', f: 'g5', d: 'Par groupes de 4 ou 5 à chaque cible (paniers et paniers vivants), les 2 premiers avec un ballon. Le 1er tire ; le 2e tire dès que le 1er a lâché le ballon. Si le 2e marque avant le 1er, le 1er est « knock-out » : il va faire 3 paniers au panier voisin et revient dans la partie (personne n\'attend longtemps).'},
  morpion: {n: 'Le morpion du basket', k: 'opp', s: 'tir:basket', f: 'g6', d: 'À chaque cible, 2 équipes de 3 et une grille de 9 cerceaux posée à 5 m. Les deux équipes tirent en même temps (un ballon par équipe) : panier = le tireur court poser une chasuble de sa couleur dans un cerceau, puis le suivant tire. 3 chasubles alignées = manche gagnée. Une fois les 3 chasubles posées, on déplace les siennes.'},
  minute: {n: 'Le défi minute', k: 'coop', s: 'tir:basket', f: 'g4', d: 'Par équipe à {cible}, 2 ballons. En 1 min : panier proche = 1 point, mi-distance = 2, en dehors de la raquette = 3. On ramasse son rebond et on rend le ballon au suivant. L\'équipe cherche à battre SON record, manche après manche.'},
  chat3: {n: 'Le jeu du C-H-A-T', k: 'opp', s: 'tir', f: 'g4', d: 'Le 1er choisit un tir (endroit et façon) : s\'il marque, tous les suivants doivent réussir le même tir, sinon ils prennent une lettre. Raté = le suivant invente un tir. Qui a les 4 lettres C-H-A-T fait un tour de terrain en dribble et revient.'},
  tir5: {n: 'Les 5 étoiles', k: 'coop', s: 'tir:basket', f: 'g3', d: 'Par trois à {cible} : 5 positions marquées au sol (les étoiles). Chaque trio doit marquer de chaque étoile ; le tireur suivant ramasse le rebond et fait la passe au tireur. Premier trio à allumer les 5 étoiles gagne, puis on recommence plus loin.'},
  deuxun: {n: 'Les vagues du 2 c 1', k: 'opp', s: 'demi:basket:2c1', f: 'g3', d: 'Par trois : 2 attaquants partent du milieu de terrain contre 1 défenseur qui attend dans la raquette. Le porteur fonce sur le défenseur pour l\'attirer, puis passe ou tire. Après l\'action, le défenseur devient attaquant avec le passeur.'},
  duel: {n: 'Le roi du panier (1 c 1)', k: 'opp', s: 'demi:basket:1c1', f: 'g4', d: '1 contre 1 à {cible} : l\'attaquant a 3 dribbles maximum pour aller marquer. Panier = il reste « roi » et défie le suivant ; défense réussie = le défenseur devient roi. Le roi compte ses victoires.'},
  m3: {n: 'Match 3 c 3', k: 'opp', s: 'demi:basket:3c3', f: 'm3', d: '3 contre 3 sur un demi-terrain. Après chaque ballon gagné en défense, on ressort le ballon derrière la ligne des 3 points avant d\'attaquer. Arbitrage par l\'équipe au bord : un arbitre, un marqueur.'},
  m4: {n: 'Match 4 c 4', k: 'opp', s: 'match:basket:4c4', f: 'm4', d: '4 contre 4 sur terrain réduit. Les arbitres sont les élèves au bord : ils sifflent marcher, reprise de dribble et contact.'},
  cartes: {n: 'Le match des cartes', k: 'fp', s: 'demi:basket:3c3', f: 'm3', d: 'Match où l\'écart ne doit pas exploser : dès qu\'une équipe mène de 3 paniers, l\'équipe menée choisit une carte « coup de pouce » (un joueur de plus en attaque, panier vivant plus bas, 3 points pour un panier après 4 passes…) ou impose une carte « défi » à l\'autre (main faible obligatoire, pas de dribble…). Les cartes s\'additionnent jusqu\'à la fin.'},
  roiterrain: {n: 'Le roi du terrain', k: 'opp', s: 'tournoi:basket', f: 'm3', d: 'Matchs courts en 2 paniers gagnants. L\'équipe qui gagne monte d\'un terrain (vers le terrain du roi), celle qui perd descend. Au bout du temps, l\'équipe sur le terrain du roi est championne… jusqu\'à la prochaine leçon.'},
  fairplay: {n: 'Le match fair-play', k: 'fp', s: 'match:basket:4c4', f: 'm4', d: 'Match normal, mais l\'équipe au bord distribue aussi des points fair-play : +1 pour un joueur qui reconnaît sa faute en levant la main, qui aide un adversaire à se relever, qui félicite. Le score final additionne paniers et points fair-play.'},
  silence: {n: 'Le lancer franc du silence', k: 'coop', s: 'tir', d: 'Toute la classe en silence autour des paniers : chacun a un lancer franc, la classe compte les réussites à voix basse. On cherche à battre le record de la classe. Puis étirements (mollets, cuisses, épaules) et un mot sur la leçon.'},
  bilan: {n: 'Le pouce et le mot', k: 'fp', s: 'etirements', d: 'En cercle, étirements guidés. Chacun montre son pouce (en haut, au milieu, en bas) : « j\'ai appris », « j\'ai pris du plaisir ». Chaque équipe cite un geste fair-play vu chez l\'adversaire.'},
  aveugle: {n: 'Dribble les yeux fermés', k: 'coop', s: 'cercle', d: 'En cercle, dribble sur place les yeux fermés : main droite, main gauche, puis en changeant de main au signal. Le ballon s\'échappe ? On le récupère sans bruit. Puis étirements des poignets, des épaules et des mollets.'},
  queues: {n: 'La chasse aux queues', k: 'opp', s: 'voleurs', d: 'Chacun dribble dans {terrain} avec une chasuble glissée à l\'arrière du short (la queue). On essaie d\'arracher les queues des autres sans arrêter son dribble et sans toucher le joueur. Queue arrachée = on la garde à la main (1 point) ; celui qui a perdu la sienne en prend une au bac et repart. Au bout de 2 min, on compte.'},
  gendarmes: {n: 'Les gendarmes et les voleurs', k: 'opp', s: 'chat', d: 'Les voleurs dribblent ; {n/5 gendarme} sans ballon (chasuble) les touchent. Voleur touché = il va dans la prison (un cerceau au bord) et tient son ballon au-dessus de la tête. Il est délivré quand un voleur libre lui fait une passe à rebond qu\'il attrape. Nouveaux gendarmes toutes les 90 s.'},
  statues: {n: 'Les statues à délivrer', k: 'coop', s: 'chat', d: '{n/7 chat} dribblent et touchent les autres dribbleurs. Touché = statue : jambes écartées, ballon tenu au-dessus de la tête. Un camarade délivre une statue en faisant rebondir son ballon entre ses jambes. Les chats gagnent s\'ils ont {n/3 statue} en même temps.'},
  crepes: {n: 'Les crêpes', k: 'opp', s: 'libre', f: 'e2', d: '40 coupelles éparpillées dans {terrain}, la moitié à l\'endroit, la moitié retournée. Deux équipes qui dribblent : les « crêpiers » retournent les coupelles à l\'endroit, les « mangeurs » les retournent à l\'envers, toujours en dribblant (main libre pour retourner). 1 min, on compte, on inverse les rôles.'},
  passeurs: {n: 'Les passeurs fous', k: 'coop', s: 'deux', f: 'p', d: 'Par deux avec un ballon, on se déplace partout dans {terrain} en se faisant des passes, sans jamais rester à moins de 3 m l\'un de l\'autre. Le prof annonce le type de passe (poitrine, à rebond, à une main). Chaque passe attrapée = 1 : en 1 min, quel duo bat son record ?'},
  cirque: {n: 'Le cirque du ballon', k: 'coop', s: 'libre', d: 'Chacun son ballon, en dispersion. Le prof annonce un tour de 30 s : ballon autour de la taille, en 8 entre les jambes, lancer en l\'air et taper 2 fois dans les mains avant de rattraper, dribble assis… Chacun compte ses réussites. Puis deux élèves inventent un tour pour la classe.'},
  pluie: {n: 'La pluie de paniers', k: 'opp', s: 'tir', f: 'e2', d: 'Deux équipes, une par {cible} (plus les paniers vivants s\'il y en a), un ballon pour deux. Pendant 1 min, tout le monde tire en même temps d\'où il veut, reprend son rebond et le donne au partenaire. Panier = 1 point, hors de la raquette = 2. Les équipes comptent à voix haute, puis on change de panier.'},
  genoux: {n: 'Touche-genou en dribble', k: 'opp', s: 'deux', f: 'p', d: 'Par deux face à face, chacun dribble son ballon. Avec la main libre, on essaie de toucher le genou de l\'autre, sans arrêter son dribble. 1 touche = 1 point. Le corps protège le ballon et les genoux : on apprend à dribbler bas et à regarder l\'adversaire. Duels de 30 s, puis on change de partenaire.'},
  duelvol: {n: 'Le duel des dribbleurs', k: 'opp', s: 'deux', f: 'p', d: 'Par deux dans un cerceau-arène de 4 m (4 coupelles), chacun son ballon : on essaie de faire sortir ou de toucher le ballon de l\'autre tout en gardant le sien. 1 point par ballon touché. 3 duels de 30 s contre 3 adversaires différents.'},
  danse: {n: 'La danse du défenseur', k: 'coop', s: 'deux', f: 'p', d: 'Par deux sans ballon : l\'attaquant se déplace (pas chassés, arrêts, départs), le défenseur le suit en restant face à lui, bras écartés, sans croiser les pieds. Au sifflet, l\'attaquant sprinte 3 pas : le défenseur doit le toucher avant. On inverse.'},
  statue: {n: 'Le chat et les statues-écrans', k: 'opp', s: 'chat', d: 'Jeu de poursuite : les fuyards peuvent se cacher derrière une « statue » (un camarade immobile, pieds écartés, bras croisés) : le chat doit la contourner et ne peut pas la traverser. Toutes les 30 s, le prof change les statues. On découvre l\'écran sans ballon.'},
  toupie: {n: 'La toupie', k: 'opp', s: 'deux', f: 'p', d: 'Par deux, un ballon : l\'un pivote (un pied fixe) pour protéger le ballon tenu à deux mains, l\'autre tourne autour pour le toucher. 20 s puis on change. Ballon touché = 1 point pour le chasseur ; pied fixe qui bouge = 1 point aussi.'},
  chasse: {n: 'La chasse au ballon', k: 'opp', s: 'deux', f: 'p', d: 'Par deux, dos à dos près de {cible} : le prof (ou un élève) lance un ballon au sol. Le premier qui l\'attrape tire, l\'autre devient défenseur et essaie de l\'en empêcher. Panier = 1 point. On joue à plusieurs paires en même temps (un lanceur par paire).'},
  appels: {n: 'Le chat aux appels', k: 'coop', s: 'chat', d: 'Jeu de poursuite : {n/7 chat} sans ballon. Un fuyard qui tient un ballon ne peut pas être touché, mais il n\'y a qu\'un ballon pour 4 fuyards. Les fuyards se passent vite les ballons pour protéger celui qui est en danger : il appelle « ici ! ». Touché = on devient chat.'},
  course: {n: 'Course contre le ballon', k: 'opp', s: 'files', f: 'g3', d: 'Par trois : un coureur sprinte d\'un panier à l\'autre pendant que ses 2 coéquipiers remontent le terrain en se passant le ballon (sans dribble). Le ballon doit arriver avant le coureur ! Puis le coureur reçoit et marque. On change de coureur à chaque traversée, plusieurs trios partent en même temps.'},
  feu: {n: 'Le feu tricolore', k: 'coop', s: 'libre', d: 'Chacun dribble partout. Vert = dribble rapide, orange = dribble sur place très bas, rouge = arrêt 2 pieds et pivot pour protéger son ballon, bleu = on échange son ballon avec un voisin par une passe. Le prof enchaîne de plus en plus vite et piège la classe (« rouge… non, vert ! »).'},
  passemur: {n: 'Le passe-muraille', k: 'opp', s: 'chat', d: 'Les murs : {n/6 joueur} sans ballon se tiennent sur la ligne médiane et se déplacent seulement le long de cette ligne. Les autres traversent le terrain en dribble, aller puis retour, sans se faire toucher en passant la ligne. Chaque traversée réussie = 1 point. Touché = on devient mur à la manche suivante.'},
  quatre: {n: 'Le match des 4 paniers', k: 'opp', s: 'match:basket:4c4', f: 'm4', d: 'Match sur tout le terrain avec 4 cibles : les 2 vrais paniers + 2 paniers vivants sur les côtés (un élève debout sur un banc tient un cerceau). Chaque équipe peut marquer dans n\'importe quelle cible : on cherche toujours le côté libre. Le panier vivant change à chaque panier marqué.'},
  banc: {n: 'Le banc des champions', k: 'coop', s: 'match:basket:4c4', f: 'm4', d: 'Chaque équipe a un banc derrière la ligne de fond adverse, avec un joueur debout dessus. Passe attrapée par un joueur sur le banc = le passeur monte le rejoindre. La première équipe dont tous les joueurs sont sur le banc gagne la manche. Dribble limité à 3 rebonds.'},
  iles: {n: 'Les îles', k: 'opp', s: 'match:basket:4c4', f: 'm4', d: '6 cerceaux (les îles) posés dans {terrain}. Une équipe marque 1 point quand un joueur reçoit une passe en s\'arrêtant les 2 pieds dans une île. On ne peut pas marquer 2 fois de suite dans la même île, et personne ne reste dans une île plus de 3 s. Ballon tombé ou volé = il change de camp.'},
  couloirs: {n: 'Les couloirs du 1 contre 1', k: 'opp', s: 'deux', f: 'p', d: '{terrain} divisé en couloirs de 3 m (coupelles), un duo par couloir. L\'attaquant part d\'un bout en dribble et marque s\'il s\'arrête les 2 pieds dans le cerceau au bout du couloir. Le défenseur part 1 m devant lui et ne touche que le ballon. 3 attaques, puis on inverse ; tous les couloirs jouent en même temps.'},
  traversee: {n: 'La traversée en passes', k: 'coop', s: 'match:basket:4c4', f: 'g4', d: 'Par équipe de 4 avec un ballon : on traverse le terrain uniquement en passes (pas de dribble, on ne court pas avec le ballon) et on termine par un tir. Cercle touché = 1 point, panier = 3 points. 5 départs, on additionne : l\'équipe cherche à battre son record. Deux équipes partent en même temps, chacune sur une moitié dans la longueur.'},
  carte: {n: 'Les tirs à la carte', k: 'coop', s: 'tir:basket', f: 'g4', d: 'Groupes de 4 à {cible} : 3 cerceaux au sol à 1 m, 3 m et 5 m du panier valent 1, 2 et 3 points. Rôles tournants : le tireur choisit son cerceau, le rebondeur rend le ballon, le passeur donne la balle au tireur, le compteur note. 5 tirs chacun, puis on tourne ; chacun cherche à battre son propre total.'},
  rapide: {n: 'Le tireur le plus rapide', k: 'opp', s: 'demi:basket:1c1', f: 'g4', d: 'Deux joueurs partent en même temps du milieu de terrain, chacun avec son ballon, vers {cible}. Le premier qui marque gagne la manche ; si on perd son ballon, on revient au milieu. Par groupes de 4 : pendant qu\'un duo joue, l\'autre renvoie les ballons et arbitre. Le gagnant défie le vainqueur de l\'autre duo.'},
  vingtun: {n: 'Le 21 de rue', k: 'opp', s: 'demi:basket:1c1', f: 'g4', d: 'Chacun pour soi à un panier, par 3 ou 4. Le porteur attaque, tous les autres défendent. Panier = 2 points (3 de loin) et le marqueur repart du haut de la raquette ; ballon perdu ou rebond pris par un autre = le nouveau porteur ressort derrière la ligne avant d\'attaquer. Premier à 11 points (ou 21 en 2 h).'},
  ultimate: {n: 'L\'ultimate-basket', k: 'opp', s: 'match:basket:4c4', f: 'm4', d: 'Pas de dribble : le porteur a 3 s pour passer et ne marche pas. On marque 1 point en attrapant une passe dans la zone d\'en-but (la raquette adverse), 2 points si on marque en plus le panier juste après. Ballon tombé ou intercepté = il change de camp. On compte les 3 secondes à voix haute.'},
  jokers: {n: 'Le match à jokers', k: 'coop', s: 'match:basket:4c4', f: 'm4', d: 'Match 3 c 3 avec 2 jokers (chasuble neutre) sur les lignes de côté : ils jouent toujours avec l\'équipe qui a le ballon, sans dribbler ni tirer. L\'équipe en attaque est donc à 5 contre 3 : il faut voir le partenaire libre. On change de jokers toutes les 3 min.'},
  deuxdeux: {n: 'Le 2 contre 2 continu', k: 'opp', s: 'demi:basket:2c2', f: 'g6', d: 'Par 3 duos à {cible} : un duo attaque, un défend, le 3e attend sous le panier. Le duo qui marque reste en attaque, celui qui a perdu sort et le duo en attente entre en défense. Le défenseur qui récupère ressort le ballon derrière la ligne et devient attaquant. Chaque panier = 1 point pour le duo.'},
  retard: {n: 'Le 3 contre 2 à retardement', k: 'opp', s: 'demi:basket:3c2', f: 'g6', d: 'Trois attaquants partent du milieu contre 2 défenseurs qui attendent près de {cible}. Un 3e défenseur part de la ligne de fond opposée au moment où le ballon passe la ligne médiane : il faut attaquer vite avant qu\'il arrive. Panier = 2 points, panier avant l\'arrivée du 3e défenseur = 3 points.'},
  couloirs3: {n: 'Le match des 3 couloirs', k: 'coop', s: 'match:basket:3c3', f: 'm3', d: 'Le terrain est coupé en 3 couloirs dans la longueur (gauche, centre, droit). En attaque, il doit toujours y avoir un joueur dans chaque couloir : l\'espace est occupé, les passes s\'ouvrent. En défense, on joue normalement. Un panier marqué depuis un couloir de côté vaut 2 points.'},
  chrono: {n: 'Le match chrono', k: 'opp', s: 'match:basket:4c4', f: 'm4', d: 'Match normal, mais chaque attaque a {12|15} secondes pour tirer (le banc compte à voix haute, comme le chronomètre des 24 s chez les pros). Tir qui touche le cercle = le chrono repart. Pas de tir à temps = ballon à l\'adversaire. Le dernier panier de la mi-temps vaut double.'},
  silencieux: {n: 'Le match silencieux', k: 'fp', s: 'match:basket:4c4', f: 'm4', d: 'Match où personne ne parle, même pas les arbitres : on s\'appelle avec la main levée, on arbitre avec les gestes officiels (marcher, reprise de dribble, contact, sortie). Une parole = lancer franc pour l\'adversaire. On découvre l\'importance des signes et du regard.'},
  sumo: {n: 'Le sumo du rebond', k: 'opp', s: 'deux', f: 'p', d: 'Par deux, un ballon posé au sol à 1 m. Au signal, le joueur placé entre l\'adversaire et le ballon se retourne : il regarde le ballon, dos à l\'adversaire, et doit le garder derrière lui pendant 3 s en reculant les fesses et en écartant les bras (sans pousser avec les mains). S\'il y arrive, il ramasse le ballon : 1 point. 5 essais puis on inverse. C\'est le geste du rebond.'},
  rebond: {n: 'Le roi du rebond', k: 'opp', s: 'tir:basket', f: 'g3', d: 'Par 3 sous {cible} : un tireur au bord tire, les 3 se battent (sans faute) pour le rebond. Celui qui l\'attrape marque tout de suite, les 2 autres le gênent. 3 rebonds pris = roi, il devient tireur. Les groupes jouent sur tous les paniers et paniers vivants.'},
  vagues3: {n: 'Les vagues', k: 'opp', s: 'tournoi:basket', f: 'e3', d: 'Trois équipes : A attaque contre B ; si B récupère (ou encaisse un panier), elle contre-attaque tout de suite vers l\'autre panier où C l\'attend. L\'équipe qui marque reste sur le terrain, celle qui perd sort et attend au fond. On compte les paniers de chaque équipe.'},
  facteur: {n: 'Le passe et va du facteur', k: 'coop', s: 'demi:basket:2c1', f: 'g3', d: 'Par trois sur une moitié de terrain : je passe au facteur (un camarade fixe sur le côté), je cours vers {cible}, le facteur me rend le ballon en course et je marque. Le 3e ramasse et devient tireur. Le facteur change après 3 passages ; plusieurs trios jouent en même temps sur chaque moitié.'},
  horloge: {n: 'L\'horloge du démarquage', k: 'opp', s: 'demi:basket:3c2', f: 'g5', d: 'Sur une moitié de terrain, 3 attaquants contre 2 défenseurs ; le porteur ne bouge pas (pivot uniquement). Les 2 autres se démarquent : passe réussie = 1 point (on avance d\'une heure). À 5 points, on a le droit d\'aller marquer au panier. On tourne les rôles toutes les 2 min.'},
  garde: {n: 'La garde du corps', k: 'opp', s: 'match:basket:4c4', f: 'm4', d: 'Chaque défenseur a un attaquant à suivre partout (on se le choisit au début). Passe à 10 : l\'équipe qui défend marque 1 point si son « protégé » ne reçoit aucune passe pendant 20 s. On change de protégé au sifflet.'},
  surnombre: {n: 'Le jeu du surnombre', k: 'coop', s: 'match:basket:4c4', f: 'm4', d: 'Match 4 c 4 où l\'équipe qui vient de récupérer le ballon reçoit un 5e joueur (le joker, chasuble neutre) jusqu\'à son tir. Le joker ne tire pas. Il faut aller vite vers l\'avant et trouver le joueur libre.'},
  murparle: {n: 'Le mur qui parle', k: 'coop', s: 'demi:basket:3c3', f: 'm3', d: '3 c 3 sur une moitié de terrain : les défenseurs doivent parler (« j\'ai le porteur ! », « écran ! », « aide ! »). Un défenseur muet pendant une attaque donne 1 point à l\'attaque. Ballon récupéré = 1 point pour la défense.'},
  pirates: {n: 'La zone des pirates', k: 'opp', s: 'demi:basket:3c3', f: 'g6', d: '3 défenseurs en zone (chacun garde son coin et n\'en sort pas) contre 4 attaquants. On fait tourner vite le ballon et on tire dans l\'espace libre. 1 point par panier, 1 point défensif par ballon récupéré. On change les rôles toutes les 3 min.'},
  couleurs: {n: 'Le jeu des trois couleurs', k: 'coop', s: 'match:basket:4c4', f: 'm4', d: 'Un élève au bord lève un plot de couleur au début de chaque attaque : rouge = tir en moins de 5 s, bleu = 3 passes avant de tirer, jaune = pick and roll obligatoire. L\'équipe qui respecte le code et marque gagne 2 points ; panier hors code = 1 point.'},
  conseiller: {n: 'Le match du conseiller', k: 'coop', s: 'demi:basket:3c3', f: 'm3', d: 'Chaque équipe a un conseiller au bord qui peut, une fois par attaque, crier un conseil d\'un mot (« tir ! », « écran ! », « côté ! »). Panier marqué en suivant le conseil = 3 points. Le conseiller change à chaque panier.'},
  pickroll: {n: 'Le 2 contre 2 pick and roll', k: 'opp', s: 'demi:basket:2c2', f: 'g4', d: 'L\'écraneur pose l\'écran sur le défenseur du porteur, puis pivote et file vers {cible} (le « roll »). Le porteur lit la défense : il tire si on le laisse, passe au rouleur si on le double, dribble si on recule. 5 attaques puis on inverse.'},
  troisxtrois: {n: 'Le 3x3 olympique', k: 'opp', s: 'demi:basket:3c3', f: 'm3', d: 'Règles du 3x3 : un seul panier ; panier = 1 point, tir de loin = 2 points ; après un panier ou une récupération, on ressort le ballon derrière l\'arc ; {12|20} secondes pour tirer ; match à 21 points ou 8 min. Pas d\'arbitre : les joueurs annoncent eux-mêmes les fautes.'},
  massage: {n: 'Le ballon masseur', k: 'coop', s: 'deux', f: 'p', d: 'Par deux : l\'un est allongé sur le ventre, l\'autre fait rouler doucement le ballon de basket sur son dos, ses épaules et ses mollets en lui racontant le meilleur moment de sa leçon. 1 min 30 puis on change. On finit par les étirements des épaules et des poignets.'},
  arbitre: {n: 'Le quiz de l\'arbitre', k: 'coop', s: 'explication', d: 'En demi-cercle : le prof (ou un élève) mime une action (il marche, reprend son dribble, pousse…) ; la classe fait le geste officiel de l\'arbitre en même temps. Puis on mime à l\'envers : le prof fait le geste, un élève montre la faute. Étirements pour finir.'},
  doigt: {n: 'Le ballon sur le doigt', k: 'coop', s: 'libre', d: 'Chacun son ballon, calmement : on essaie de faire tourner le ballon sur un doigt (comme les Harlem Globetrotters), puis de le faire passer autour de la taille les yeux fermés. Chacun garde son meilleur temps. Puis étirements des poignets, des épaules et des mollets.'},
  defi2: {n: 'Le défi des 2 minutes', k: 'coop', s: 'tir:basket', f: 'g4', d: 'Par équipe de 4 à {cible}, chacun son ballon, tous en même temps : on part du milieu de terrain en dribble, on marque en course, on reprend son ballon et on retourne toucher la ligne du milieu. En 2 min, l\'équipe compte tous ses paniers et essaie de battre son record à la manche suivante.'},
  'Les phases finales': {n: 'Les phases finales', k: 'opp', s: 'tournoi:basket', f: 'm4', d: 'Demi-finales et finales, aussi pour toutes les places (3e, 5e…) : toutes les équipes jouent autant. Rôles tournants pour les équipes au repos : arbitres, table de marque, chrono, journaliste.'}
},
an: {
1: {th: 'Découvrir le basket en jouant : dribbler, passer, tirer et jouer à 3 contre 3', comp: ['HME2', 'HME4', 'HSC1', 'HSC3'], l: [
  {t: 'Garder son ballon : le dribble', o: 'Dribbler main droite et main gauche en levant la tête et en protégeant son ballon.',
   e: [['queues', 6, 'Au début, on marche en dribblant ; ensuite on trottine.'],
    ['chef', 7, 'Main faible obligatoire pendant la dernière minute.']],
   c: [['crocos', 15, 'On regarde les crocodiles, pas son ballon : c\'est comme ça qu\'on les évite.', 'Je traverse {3|2} fois sans être touché.', 'Les crocodiles dribblent aussi.'],
    ['roi', 16, 'Le corps entre le ballon et l\'adversaire, dribble bas quand on est attaqué.', 'Je garde mon ballon {40|30} secondes sans le perdre.', 'Main faible imposée pendant 1 min.'],
    ['crepes', 15, 'On retourne les coupelles avec la main qui ne dribble pas : on change de main à chaque coupelle.', 'Mon équipe gagne au moins une manche.', 'On ne peut retourner une coupelle qu\'après un arrêt 2 pieds.']],
   x: [['demenage', 15, 'Les ballons se transportent uniquement en dribble.', 'Je ramène {4|3} ballons sans en perdre un.', 'Interdit de prendre deux fois dans le même coin.']],
   r: [['doigt', 7]]},
  {t: 'Passer et recevoir', o: 'Faire une passe à deux mains qui arrive dans les mains du partenaire ; recevoir bras tendus, mains en coupe.',
   e: [['atomes', 6, 'Quand le groupe est formé, 5 passes au sol avant de repartir.'],
    ['roue', 7, 'Passe à deux mains poitrine, puis passe à terre.']],
   c: [['taureau', 15, 'Des passes rapides et précises font tourner le taureau en bourrique !', 'Le taureau reste {2|1} min au centre sans toucher le ballon.', 'Passe à terre uniquement.'],
    ['dixpasses', 16, 'Pour recevoir, je me place là où le passeur me voit.', 'Mon équipe réussit {2|1} fois 10 passes.', '6 passes si la classe peine ; 2 dribbles autorisés.'],
    ['capitaine', 15, 'On lève les yeux avant de passer : où est mon capitaine ?', 'Je fais au moins une passe au capitaine.', 'Le capitaine doit attraper sans sortir de son cerceau.']],
   x: [['cartes', 15, 'Le panier ne compte qu\'après 3 passes.', 'Mon équipe marque après 3 passes au moins {2|1} fois.', 'Les cartes sont choisies par l\'arbitre.']],
   r: [['passenom', 7]]},
  {t: 'Tirer au panier', o: 'Tirer à une main, coude sous le ballon, en choisissant une distance où l\'on réussit.',
   e: [['pluie', 6, 'Tirs tout près du panier d\'abord : on prend confiance.'],
    ['tourmonde', 7, 'Coupelles proches du panier : on prend confiance.']],
   c: [['knock', 15, 'Coude sous le ballon, poignet cassé vers {cible}, on utilise la planche en diagonale.', 'Je reste {2|1} manches sans être knock-out.', 'Les débutants tirent d\'un pas plus près.'],
    ['morpion', 16, 'Avant de tirer, on s\'arrête équilibré (2 pieds).', 'Mon équipe gagne au moins une manche.', 'Un panier de loin donne le droit de poser 2 chasubles.'],
    ['minute', 15, 'Chacun choisit sa distance : 1, 2 ou 3 points.', 'Mon équipe bat son premier score.', 'On ne peut pas tirer 2 fois de suite du même endroit.']],
   x: [['m3', 15, 'Panier après 3 passes ; un panier hors de la raquette vaut 2 points.', 'Je tente au moins 2 tirs dans le match.', 'Panier vivant à hauteur variable pour les débutants.']],
   r: [['silence', 7]]},
  {t: 'Jouer ensemble vers le panier', o: 'Passer à un partenaire libre et avancer vers le panier pour marquer en équipe.',
   e: [['pegobol', 6, 'Le porteur ne court pas : les chasseurs doivent se placer.'],
    ['miroir', 7, 'L\'ombre ajoute une passe à son meneur au sifflet.']],
   c: [['chateau', 15, 'On fait vite tourner le ballon pour trouver le côté libre.', 'Mon équipe fait tomber le château {3|2} fois.', 'Deux châteaux, deux défenseurs.'],
    ['banc', 16, 'Le joueur sur le banc tend les bras : on lui fait une passe qu\'il peut attraper.', 'Je fais une passe à un joueur sur le banc.', 'Passe à rebond obligatoire pour monter sur le banc.'],
    ['quatre', 15, 'On marque où on veut : on regarde où il y a de la place avant de passer.', 'Je marque ou je fais la dernière passe.', 'Panier après 3 passes = 2 points.']],
   x: [['roiterrain', 15, 'On garde la règle des 3 passes.', 'Mon équipe monte au moins une fois.', 'L\'équipe qui monte choisit sa carte coup de pouce.']],
   r: [['bilan', 7]]},
  {t: 'Les règles en jouant', o: 'Jouer sans marcher ni reprise de dribble, arbitrer un match avec les bons gestes.',
   e: [['statues', 6, 'On ne délivre une statue qu\'en dribblant main faible.'],
    ['feu', 7, 'Au rouge, arrêt 2 pieds sans marcher : le prof regarde les pieds.']],
   c: [['fairplay', 16, 'Avant le match : 3 gestes d\'arbitre (marcher, reprise de dribble, faute de contact).', 'Je lève la main quand je fais une faute.', 'Chaque équipe prend un « temps mort » pour parler stratégie.'],
    ['silencieux', 15, 'Les gestes d\'arbitre appris au début de la leçon servent tout de suite.', 'Je fais les gestes d\'arbitre sans parler.', 'Une parole autorisée par équipe et par match.'],
    ['chat3', 15, 'Tirs inventés : sous {cible}, en course, de loin…', 'Je n\'ai pas toutes les lettres.', 'Le tir inventé doit avoir un dribble avant.']],
   x: [['rapide', 15, 'Celui qui marche ou reprend son dribble perd la manche.', 'Je gagne une manche sans faire de faute.', 'Départ dos au panier.']],
   r: [['arbitre', 7]]},
  {t: 'Évaluation : le défi du dribbleur, le concours de tirs et le match', o: 'Montrer ses progrès en dribble, en tir et dans le jeu à 3 contre 3.',
   crit: [['Défi du dribbleur', 4, '4 : slalom sans faute, tête levée, main droite à l\'aller et gauche au retour · 3 : sans faute mais regarde son ballon · 2 : une faute (cône, ballon perdu) · 1 : plusieurs fautes · 0 : ne termine pas'], ['Concours de tirs', 6, 'Réussites sur 8 tirs (5 à 2 points, 3 lancers francs) : 6 et plus = 6 · 5 = 5 · 4 = 4 · 3 = 3 · 2 = 2 · 1 = 1'], ['Match : passer et se placer', 5, '5 : se place pour recevoir et passe au partenaire libre · 3 : participe quand le ballon vient à lui · 1 : reste loin du jeu'], ['Match : règles et fair-play', 5, '5 : sans marcher ni reprise de dribble, accepte l\'arbitre et félicite · 3 : quelques fautes, accepte · 1 : fautes répétées ou contestations']],
   e: [['cirque', 6],
    ['carte', 7, 'Pour se régler avant le concours : chacun choisit sa distance.']],
   c: [['Épreuve 1 : le défi du dribbleur', 15, 'Slalom de 5 cônes main droite à l\'aller, main gauche au retour, puis tir. 2 essais, le meilleur compte. Les élèves en attente jouent au knock-out sur l\'autre panier.', '', '', 'slalom:basket', 'g4'],
    ['Épreuve 2 : le concours de tirs', 15, '5 tirs à 2 points (où l\'on veut autour de la raquette) puis 3 lancers francs. Un camarade compte et note.', '', '', 'tir:basket', 'g4'],
    ['Épreuve 3 : le match observé', 20, 'Matchs 3 contre 3 de 5 min, panier après 3 passes. Le prof observe avec la grille ; les équipes au bord arbitrent.', '', '', 'demi:basket:3c3', 'm3']],
   r: [['meteo', 6, 'On annonce le record de la classe au lancer franc et on félicite les meilleurs progrès.']]}
]},
2: {th: 'Avancer vers le panier : double pas, passe et va, démarquage', comp: ['HME2', 'HME4', 'HSC1', 'HSC2'], l: [
  {t: 'Marquer en course : le double pas', o: 'Marquer en course près du panier, en 2 pas après le dribble : on montre la bonne technique, mais ce qui compte, c\'est que le panier rentre.',
   e: [['voleurs', 6, 'Les voleurs ont aussi un ballon.'],
    ['miroir', 7, 'Le meneur montre « 1-2-saute » sans ballon, l\'ombre répète.']],
   c: [['rapide', 15, 'On arrive en course : 2 pas, on saute et on dépose le ballon contre la planche. Le prof montre une fois le rythme, puis on joue.', 'Je gagne {3|2} manches.', 'Panier de la main faible = la manche compte double.'],
    ['knock', 15, 'Le knock-out se joue maintenant en course, départ de la ligne des 3 points.', 'Je ne suis jamais knock-out sur une manche.', 'Seuls les paniers de la main faible comptent sur la dernière manche.'],
    ['defi2', 16, 'Panier en course seulement : on ne s\'arrête pas pour tirer.', 'Mon équipe bat son record de la 1re manche.', 'Panier de la main faible = 2 points.']],
   x: [['deuxdeux', 15, 'Panier marqué en course = 2 points.', 'Je tente au moins un panier en course.', 'Le défenseur commence assis : il se lève quand l\'attaquant passe la ligne des 3 points.']],
   r: [['silence', 7]]},
  {t: 'Passe et va', o: 'Après avoir passé, couper vers le panier pour recevoir de nouveau.',
   e: [['atomes', 6, 'Par 2 : une passe et on court se placer ailleurs.'],
    ['roue', 7, 'Après la passe, on change de place dans le cercle.']],
   c: [['facteur', 15, '', 'Je reçois en course sans m\'arrêter {4|3} fois sur 5.', 'Un défenseur passif suit le coupeur.'],
    ['deuxun', 16, 'Le passeur coupe vers {cible} dès qu\'il a passé.', 'Notre duo marque {3|2} fois sur 5.', 'Le défenseur peut jouer à fond.'],
    ['capitaine', 15, 'Point double si le passeur au capitaine coupe et reçoit la balle de retour.', 'Je fais un passe et va réussi.', 'Capitaine mobile sur la ligne de fond.']],
   x: [['cartes', 15, 'Panier après « passe et va » = 3 points.', 'Mon équipe marque un panier après passe et va.', 'Carte bonus : l\'équipe menée joue à 4 contre 3.']],
   r: [['bilan', 7]]},
  {t: 'Se démarquer', o: 'Se déplacer dans un espace libre, loin de son défenseur, pour être vu par le porteur.',
   e: [['pegobol', 6],
    ['appels', 7]],
   c: [['dixpasses', 15, 'On ne passe pas deux fois au même joueur de suite : il faut bouger !', 'Je reçois au moins {6|4} passes.', 'Le porteur ne peut pas dribbler.'],
    ['horloge', 15, '', 'Je me démarque pour recevoir {3|2} fois par tour.', 'Les défenseurs peuvent intercepter : point pour eux.'],
    ['m3', 16, 'Interdiction de rester immobile plus de 3 secondes sans ballon.', 'Je me démarque à l\'opposé de mon défenseur.', 'Panier après passe d\'un joueur qui vient de recevoir en mouvement = 3 points.']],
   x: [['ultimate', 15, 'On ne passe jamais deux fois de suite au même joueur.', 'Je reçois une passe dans l\'en-but.', 'En-but plus petit.']],
   r: [['aveugle', 7]]},
  {t: 'Arrêt, pivot et passe', o: 'S\'arrêter équilibré et pivoter pour protéger le ballon et trouver un partenaire.',
   e: [['chef', 6, 'Poing fermé = arrêt 2 pieds puis pivot d\'un demi-tour.'],
    ['toupie', 7]],
   c: [['taureau', 15, 'Le porteur pivote pour éviter le taureau avant de passer.', 'Je pivote avant de passer sans marcher.', 'Le taureau peut sortir du cercle.'],
    ['chateau', 15, 'Le tireur doit d\'abord faire un pivot.', 'Mon équipe fait tomber le château.', '3 défenseurs, cercle plus grand.'],
    ['iles', 16, 'Arrêt 2 pieds dans l\'île obligatoire, puis pivot pour passer : sinon le point ne compte pas.', 'Je marque un point dans une île sans marcher.', 'Pas de dribble.']],
   x: [['fairplay', 15, 'Les marchers reconnus par le joueur lui-même ne coûtent rien.', 'Je reconnais ma faute en levant la main.', 'Le capitaine de l\'équipe fair-play choisit l\'équipe suivante.']],
   r: [['massage', 7]]},
  {t: 'Tournoi du double pas', o: 'Utiliser le double pas, le passe et va et le démarquage dans un tournoi arbitré par les élèves.',
   e: [['crocos', 6, 'Un croco ne peut toucher qu\'un dribbleur qui regarde son ballon (sinon il est intouchable).'],
    ['tourmonde', 7, 'Aller-retour en double pas d\'un côté, tir de l\'autre.']],
   c: [['roiterrain', 18, 'Panier en double pas = 2 points.', 'Mon équipe gagne un match.', 'L\'équipe qui monte doit gagner par 2 paniers d\'écart.'],
    ['quatre', 16, 'On arbitre sans le prof : un arbitre de chaque équipe au repos.', 'J\'arbitre un match entier avec les bons gestes.', 'Chaque équipe a 1 temps mort.'],
    ['chat3', 12, 'Seuls les doubles pas inventés comptent (main faible, de loin…).', 'Je finis avec moins de 3 lettres.', 'C-H-A-T devient B-A-S-K-E-T.']],
   x: [['jokers', 15, 'Finale : les jokers sont choisis parmi les joueurs les plus fair-play du tournoi.', 'Je trouve le joueur libre.', 'Le public au bord vote l\'action du jour.']],
   r: [['quiz', 7]]},
  {t: 'Évaluation : double pas et jeu à 3 contre 3', o: 'Réussir un double pas en course et jouer en se démarquant.',
   crit: [['Parcours : dribble et réception en course', 4, '4 : slalom sans faute et reçoit en course sans s\'arrêter · 2 : s\'arrête pour recevoir ou 1 faute · 0 : plusieurs fautes'], ['Double pas', 6, '6 : rythme correct sans marcher et panier · 4 : rythme correct, panier raté · 2 : s\'arrête avant de tirer · 0 : pas de double pas'], ['Match : démarquage', 4, '4 : se démarque sans cesse dans un espace libre · 2 : parfois · 0 : reste derrière son défenseur'], ['Match : passe et va', 3, '3 : passe et coupe plusieurs fois · 1 : une fois · 0 : jamais'], ['Match : règles et arbitrage', 3, '3 : joue sans faute et arbitre avec les bons gestes · 1 : quelques fautes ou arbitrage hésitant · 0 : fautes répétées']],
   e: [['gendarmes', 6],
    ['duelvol', 7]],
   c: [['Épreuve 1 : parcours et double pas', 18, 'Slalom en dribble, passe au facteur, appel en course, réception et double pas. 2 passages à droite, 1 à gauche. Les autres font le tour du monde sur l\'autre panier.', '', '', 'slalom:basket', 'g4'],
    ['Épreuve 2 : match 3 contre 3 observé', 20, 'Matchs de 5 min, panier en double pas = 2 points. Le prof observe le démarquage et le passe et va ; les équipes au bord arbitrent.', '', '', 'demi:basket:3c3', 'm3'],
    ['Concours de lancers francs', 8, 'Pour finir ensemble : record de la classe, un essai chacun.', '', '', 'tir']],
   r: [['mercis', 6]]}
]},
3: {th: 'Attaquer vite et défendre : contre-attaque, défense individuelle, rebond', comp: ['HME2', 'HME4', 'HSC1', 'HSC2', 'GSS1'], l: [
  {t: 'Gagner la course : la contre-attaque', o: 'Après une récupération, courir vite vers l\'avant et passer au partenaire le plus avancé.',
   e: [['demenage', 6, 'Les déménageurs n\'ont droit qu\'à des passes (pas de dribble) entre coéquipiers.'],
    ['passemur', 7, 'On traverse le plus vite possible : c\'est la course de la contre-attaque.']],
   c: [['course', 15, '', 'Notre trio marque en moins de {8|10} secondes.', 'Un défenseur part 2 secondes après.'],
    ['deuxun', 16, 'Départ de l\'autre moitié du terrain : on attaque vite avant que le défenseur s\'organise.', 'Notre duo marque {3|2} fois sur 5.', 'Un 2e défenseur part en retard (2 c 1 qui devient 2 c 2).'],
    ['m4', 15, 'Panier marqué moins de 6 secondes après une récupération = 3 points.', 'Je cours vers l\'avant dès que mon équipe récupère.', 'Le prof compte à voix haute les 6 secondes.']],
   x: [['retard', 15, 'Contre-attaque : on attaque avant le retour du 3e défenseur.', 'Notre trio marque avant le retour du 3e défenseur.', 'Le 3e défenseur part plus tôt.']],
   r: [['bilan', 7]]},
  {t: 'Défendre : rester entre son joueur et le panier', o: 'Défendre sur un joueur en restant entre lui et le panier, sans faute.',
   e: [['danse', 6],
    ['couloirs', 7, 'Le défenseur reste entre l\'attaquant et le cerceau, sans toucher.']],
   c: [['duel', 15, 'Le défenseur reste entre l\'attaquant et {cible}, il recule vite et ne touche pas.', 'Je défends {3|2} fois sans faute.', 'L\'attaquant part de plus loin.'],
    ['garde', 16, '', 'Mon joueur reçoit moins de {3|4} passes.', 'On change de joueur à suivre au sifflet.'],
    ['m3', 15, 'Défense individuelle obligatoire : chacun son joueur, annoncé à voix haute.', 'Je ne perds jamais mon joueur.', 'Un panier de l\'attaquant que je défends coûte 1 point de plus.']],
   x: [['fairplay', 15, 'Faute de contact reconnue = ballon rendu à l\'attaque sans discussion.', 'Je défends sans faire de faute.', 'Celui qui défend le mieux est désigné par l\'équipe adverse.']],
   r: [['aveugle', 7]]},
  {t: 'Le rebond', o: 'Se placer entre son adversaire et le panier pour prendre le rebond et relancer.',
   e: [['knock', 6, 'Le knock-out avec rebond : le tireur doit reprendre son ballon avant qu\'il touche 2 fois le sol.'],
    ['chasse', 7]],
   c: [['rebond', 15, '', 'Je prends {2|1} rebonds par manche.', 'Rebond pris en sautant = 2 points.'],
    ['vingtun', 16, 'Le rebond pris = on devient attaquant : on se place entre l\'adversaire et le panier avant de sauter.', 'Je prends {3|2} rebonds.', 'Rebond offensif = on peut tirer tout de suite.'],
    ['deuxdeux', 15, 'Rebond défensif = on ressort derrière la ligne et on attaque ; rebond offensif = 1 point bonus.', 'Je garde mon joueur derrière moi avant d\'aller au rebond.', '3 c 3 avec les plus à l\'aise.']],
   x: [['chrono', 15, 'Tir qui touche le cercle = le chrono repart : il faut aller au rebond !', 'Mon équipe prend plus de rebonds que l\'adversaire.', 'L\'arbitre compte les rebonds de chaque équipe.']],
   r: [['silence', 7]]},
  {t: 'Attaquer et défendre : 3 contre 3 tout terrain', o: 'Enchaîner défense, rebond et contre-attaque en jeu réduit.',
   e: [['voleurs', 6, 'Le voleur qui récupère un ballon file en dribble toucher le mur du fond avant de revenir.'],
    ['roue', 7, 'Deux ballons de plus que de joueurs : il faut aller vite.']],
   c: [['vagues3', 18, '', 'Mon équipe marque {3|2} fois.', 'Un défenseur de plus au retour.'],
    ['quatre', 15, 'Après un panier, l\'équipe qui l\'a encaissé relance tout de suite : on peut contre-attaquer sur n\'importe quelle cible.', 'Je repars en défense dès qu\'on perd le ballon.', '1 point bonus pour chaque interception.'],
    ['chat3', 13, 'Pour respirer : tirs inventés en fin d\'action rapide.', 'Je finis sans les 4 lettres.', 'Le tireur choisit son côté de double pas.']],
   x: [['surnombre', 15, 'Le joker reste jusqu\'au tir : contre-attaque obligatoire.', 'Je cours vers l\'avant dès qu\'on récupère.', 'Le joker part de la ligne de fond.']],
   r: [['ralenti', 7]]},
  {t: 'Le tournoi des contre-attaques', o: 'Choisir entre attaque rapide et attaque placée en match.',
   e: [['gendarmes', 6, 'Les voleurs délivrés repartent en sprint-dribble vers l\'autre côté.'],
    ['passeurs', 7, 'Passes longues uniquement : on prépare la contre-attaque.']],
   c: [['roiterrain', 18, 'Panier en contre-attaque = 2 points.', 'Mon équipe gagne un match.', 'Panier après 5 passes = 2 points aussi : à chacun sa stratégie.'],
    ['cartes', 16, 'Arbitrage tout seul ; carte « défenseur en moins » quand l\'écart atteint 3 paniers.', 'Le match reste serré.', 'Les arbitres choisissent la carte.'],
    ['minute', 12, 'Défi minute par équipe de tournoi : le record de l\'équipe compte dans le classement.', 'Mon équipe bat son record.', '3 tirs au même endroit interdits.']],
   x: [['silencieux', 15, 'Finale silencieuse : les supporters encouragent seulement en applaudissant.', 'Mon équipe joue la finale ou je l\'arbitre.', 'Les supporters gagnent un point s\'ils restent positifs.']],
   r: [['meteo', 7]]},
  {t: 'Évaluation : contre-attaque et match', o: 'Montrer la contre-attaque à 2 contre 1, la défense individuelle et le rebond en match.',
   crit: [['2 contre 1 : décision', 4, '4 : attire le défenseur puis passe ou tire selon sa place · 2 : bonne décision une fois sur deux · 0 : au hasard'], ['2 contre 1 : réussite', 3, '3 : panier aux 2 passages · 2 : 1 panier · 0 : aucun'], ['Défense en 2 contre 1', 3, '3 : retarde l\'attaque, entre ballon et panier · 1 : recule sans gêner · 0 : laisse passer'], ['Match : défense individuelle', 4, '4 : tient son joueur, entre lui et le panier · 2 : le perd parfois · 0 : ne défend pas'], ['Match : rebond et contre-attaque', 3, '3 : va au rebond et lance l\'attaque rapide · 1 : parfois · 0 : jamais'], ['Match : règles et fair-play', 3, '3 : sans faute, respecte l\'arbitre · 1 : quelques fautes · 0 : fautes répétées']],
   e: [['genoux', 6],
    ['feu', 7]],
   c: [['Épreuve 1 : les vagues du 2 contre 1', 18, 'Chaque élève passe 2 fois en attaque et 1 fois en défense. Le prof note la décision, la réussite et la défense.', '', '', 'demi:basket:2c1', 'g3'],
    ['Épreuve 2 : match observé', 22, 'Matchs 3 contre 3 tout terrain de 5 min. Le prof observe défense, rebond et fair-play ; les équipes au bord arbitrent.', '', '', 'demi:basket:3c3', 'm3']],
   r: [['mercis', 6]]}
]},
4: {th: 'Le jeu collectif organisé : surnombre, écran, défense homme à homme', comp: ['HME2', 'HME4', 'HSC1', 'HSC2', 'GSS1'], l: [
  {t: 'Créer et jouer le surnombre', o: 'Reconnaître une situation de surnombre et la conclure par la bonne passe.',
   e: [['voleurs', 6, 'Les voleurs chassent par deux en se tenant la main.'],
    ['roue', 7, 'Passes à une main, puis passe aveugle (sans regarder le receveur).']],
   c: [['Le 3 contre 2 en vagues', 16, 'Trois attaquants contre 2 défenseurs ; après le tir, les 2 défenseurs + 1 attaquant repartent en 2 c 1 vers l\'autre panier. On enchaîne sans pause.', 'Notre trio marque {3|2} fois sur 5.', 'Un défenseur supplémentaire part du milieu de terrain.', 'demi:basket:3c2', 'g5'],
    ['surnombre', 15, '', 'Je trouve le joueur libre lors du surnombre.', 'Le joker ne peut pas tirer.'],
    ['minute', 15, 'Les tirs se font après une passe : on tire en 1 temps, sans dribble.', 'Mon équipe bat son record.', 'Tir à 3 points = 4 points.']],
   x: [['jokers', 15, 'Les jokers créent le surnombre : panier après un 3 c 2 ou un 2 c 1 = 3 points.', 'Je trouve le joueur libre.', 'Les jokers ne peuvent faire qu\'une passe par attaque.']],
   r: [['bilan', 7]]},
  {t: 'L\'écran', o: 'Poser un écran pour libérer un partenaire, et se servir de l\'écran.',
   e: [['statue', 6],
    ['miroir', 7, 'Le meneur dribble autour d\'une statue : l\'ombre suit.']],
   c: [['Le 2 c 2 de l\'écran', 16, 'Le non-porteur pose un écran sur le défenseur du porteur (pieds écartés, bras croisés, immobile). Le porteur dribble en frôlant l\'écran et tire. Panier après écran = 3 points.', 'Je pose un écran immobile, sans faute.', 'Le défenseur peut changer de joueur (on crie « change ! »).', 'demi:basket:2c2', 'g4'],
    ['m3', 15, 'Panier après écran = 3 points.', 'Mon équipe marque après un écran.', 'L\'écran doit être annoncé par un code (couleur, chiffre).'],
    ['chat3', 15, 'Le tireur part d\'un écran (posé par un coéquipier) avant de tirer.', 'Je réussis {2|1} tirs après écran.', 'Défenseur qui doit contourner l\'écran.']],
   x: [['fairplay', 15, 'Écran mobile (qui pousse) = faute reconnue par le joueur.', 'Je pose mes écrans sans contact illégal.', 'Les arbitres expliquent leur décision en une phrase.']],
   r: [['silence', 7]]},
  {t: 'Défense homme à homme', o: 'Défendre chacun son joueur, s\'entraider et communiquer.',
   e: [['danse', 6, 'On ajoute un ballon : l\'attaquant dribble, le défenseur reste devant.'],
    ['pegobol', 7, 'Les fuyards s\'aident en criant « attention à gauche ! ».']],
   c: [['garde', 16, 'Avec panier : on marque 1 point défensif par attaque où son joueur ne tire pas.', 'Mon joueur tire moins que moi.', 'On change de joueur à chaque panier.'],
    ['murparle', 15, '', 'Notre défense parle et récupère {2|1} ballons.', 'Aide défensive autorisée : on revient sur son joueur après.'],
    ['duel', 15, 'Duel en 2 dribbles maximum, départ dos au panier.', 'Je gagne {3|2} duels en défense.', 'L\'attaquant reçoit une passe avant d\'attaquer.']],
   x: [['chrono', 15, 'Défense homme à homme obligatoire ; {12|15} s pour tirer.', 'Notre équipe encaisse moins de paniers qu\'au match précédent.', 'Panier encaissé sur faute = 2 points pour l\'adversaire.']],
   r: [['massage', 7]]},
  {t: 'Jouer ensemble : écran, surnombre et défense', o: 'Combiner écran et passe et va dans un jeu collectif organisé.',
   e: [['crocos', 6, 'Les crocodiles chassent à 2 en se faisant des passes.'],
    ['passeurs', 7, 'Passe et va : après chaque passe, on change d\'espace en sprint.']],
   c: [['Le système secret', 18, 'Chaque équipe invente (2 min) une combinaison avec un écran et un passe et va, lui donne un nom de code et la joue en 3 c 3. Panier sur la combinaison annoncée = 3 points.', 'Notre combinaison réussit {2|1} fois.', 'L\'équipe adverse peut deviner la combinaison pour gagner 1 point.', 'demi:basket:3c3', 'm3'],
    ['cartes', 15, 'Les cartes de la leçon : « surnombre » (5 c 4 pendant 1 attaque), « défense de zone interdite »…', 'Le match reste serré.', 'Les équipes inventent une carte.'],
    ['tir5', 13, 'Chaque étoile se gagne après un écran ou une passe.', 'Notre trio allume les 5 étoiles.', 'Les étoiles s\'éteignent si on rate 2 fois de suite.']],
   x: [['couloirs3', 15, 'Chaque équipe garde son système, avec toujours un joueur dans chaque couloir.', 'Notre système marche avec les couloirs occupés.', 'Les arbitres notent aussi les écrans réussis.']],
   r: [['ralenti', 7]]},
  {t: 'Tournoi à 4 contre 4', o: 'Jouer un tournoi en organisant son équipe : rôles, système, arbitrage.',
   e: [['queues', 6, 'On joue en équipe : on protège la queue de ses coéquipiers.'],
    ['tourmonde', 7, 'Aller-retour, avec tirs à 3 points au bout.']],
   c: [['m4', 20, 'Tournoi : chaque équipe a un capitaine, un « coach » au bord pendant 1 min par match.', 'Mon équipe gagne au moins un match.', 'Panier sur système annoncé = 3 points.'],
    ['roiterrain', 16, 'Roi du terrain en 3 c 3 : les plus forts montent, tout le monde joue à son niveau.', 'Je joue contre des équipes de mon niveau.', 'Monter demande 2 paniers d\'écart.'],
    ['carte', 10, 'Pause du tournoi : tirs à la carte en équipe, le total compte au classement.', 'Mon équipe bat son record.', 'Cerceau à 3 points plus loin.']],
   x: [['troisxtrois', 15, 'Finale au format 3x3 : pas d\'arbitre, les joueurs annoncent leurs fautes.', 'Mon équipe joue la finale ou je l\'arbitre.', 'Le public au bord vote l\'action du jour.']],
   r: [['meteo', 7]]},
  {t: 'Évaluation : jeu collectif organisé', o: 'Montrer surnombre, écran et défense homme à homme en situation de match.',
   crit: [['3 contre 2 : conclure le surnombre', 4, '4 : trouve à chaque fois le joueur libre · 2 : une fois sur deux · 0 : force le passage'], ['Écran', 4, '4 : pose des écrans utiles et immobiles et s\'en sert · 2 : parfois ou écran mobile · 0 : jamais'], ['Défense homme à homme', 4, '4 : tient son joueur et aide · 2 : le perd parfois · 0 : ne défend pas'], ['Contribution au jeu', 4, '4 : passe, se démarque et tire au bon moment · 2 : participe peu · 0 : absent du jeu'], ['Arbitrage et fair-play', 4, '4 : arbitre juste et clair, joue sans contester · 2 : quelques hésitations · 0 : conteste ou refuse d\'arbitrer']],
   e: [['sumo', 6],
    ['retard', 7, 'Version d\'échauffement, défense passive.']],
   c: [['Épreuve 1 : vagues 3 contre 2', 15, 'Chaque élève passe 2 fois en attaque, 1 fois en défense.', '', '', 'demi:basket:3c2', 'g5'],
    ['Épreuve 2 : match observé 4 contre 4', 25, 'Matchs de 6 min ; le prof observe écran, défense et contribution ; les équipes au bord arbitrent.', '', '', 'match:basket:4c4', 'm4']],
   r: [['mercis', 6]]}
]},
5: {th: 'Construire une attaque : pick and roll, attaque de zone, choix tactiques', comp: ['HME2', 'HME4', 'HSC1', 'HSC2', 'GSS1'], l: [
  {t: 'Le pick and roll', o: 'Après l\'écran sur le porteur, rouler vers le panier pour recevoir ; le porteur choisit entre tir, passe et dribble.',
   e: [['voleurs', 6, 'Les voleurs ont aussi un ballon : on vole en dribblant.'],
    ['statue', 7, 'Après le passage du fuyard, la statue pivote et sprinte 3 m vers le panier (c\'est le « roll »).']],
   c: [['pickroll', 16, '', 'Notre duo marque {3|2} fois sur 5.', 'Les défenseurs peuvent changer de joueur (« switch ! »).'],
    ['Les tirs du meneur', 15, 'Par 3 : le meneur sort de l\'écran en dribble et tire à mi-distance, ou donne au rouleur qui finit en double pas. 2 min par meneur, on compte les points.', 'Je réussis {3|2} tirs sur 6 en sortie d\'écran.', 'Un défenseur gêne le tir à bras levés.', 'tir:basket', 'g3'],
    ['m3', 15, 'Panier après pick and roll = 3 points.', 'Je fais le bon choix après l\'écran.', 'La défense a le droit de doubler le porteur : il faut trouver le rouleur.']],
   x: [['deuxdeux', 15, '2 c 2 continu en pick and roll : panier après écran = 2 points.', 'Mon duo marque après un écran.', 'Les défenseurs ont le droit de changer (« switch ! »).']],
   r: [['bilan', 7, 'Chaque équipe montre son plus beau pick and roll au ralenti.']]},
  {t: 'Attaquer une défense de zone', o: 'Faire circuler vite le ballon et attaquer les espaces entre les défenseurs.',
   e: [['roue', 6, 'Passes en une touche, 2 ballons de plus que de joueurs.'],
    ['taureau', 7, 'Trois taureaux qui ne quittent pas leur coin : c\'est déjà une zone !']],
   c: [['pirates', 16, '', 'Mon équipe marque {3|2} fois contre la zone.', 'Les défenseurs ont le droit de sortir de leur coin pour doubler le porteur.'],
    ['m4', 15, 'Une équipe défend en zone, l\'autre en homme à homme ; on échange à la mi-temps.', 'Je trouve l\'espace libre entre deux défenseurs.', 'Panier hors de la raquette contre la zone = 3 points.'],
    ['minute', 15, 'Tirs de loin uniquement (hors raquette), après une passe.', 'Mon équipe bat son record.', 'Panier à 3 points = 4 points.']],
   x: [['cartes', 15, 'Carte « zone » : l\'équipe menée choisit si l\'adversaire défend en zone ou en homme à homme.', 'Le match reste serré jusqu\'au bout.', 'Les équipes inventent une nouvelle carte.']],
   r: [['silence', 7]]},
  {t: 'Faire les bons choix', o: 'Choisir entre tir, passe et dribble selon ce que fait la défense.',
   e: [['pegobol', 6, 'Les chasseurs annoncent un plan avant chaque attaque.'],
    ['chef', 7, 'Signaux combinés : 2 signaux à la suite, il faut les retenir.']],
   c: [['couleurs', 16, '', 'Mon équipe suit le code et marque {3|2} fois.', 'Le code est donné à voix haute par un chiffre, sans plot.'],
    ['conseiller', 15, '', 'Je fais au moins {2|1} bons choix sur conseil.', 'Le conseiller change à chaque panier.'],
    ['chat3', 15, 'Tirs « de match » : après une feinte, après un dribble, en course.', 'Je finis avec moins de 3 lettres.', 'Le tir inventé doit commencer par une passe reçue.']],
   x: [['chrono', 15, 'Le bon choix, mais vite : {12|15} s pour tirer.', 'Mon équipe tire à temps à chaque attaque.', 'Panier sur le bon choix (validé par l\'arbitre) = 2 points.']],
   r: [['parole', 7, 'Chacun dit un choix qu\'il referait et un qu\'il changerait.']]},
  {t: 'Le plan de jeu', o: 'Préparer en équipe un plan d\'attaque et de défense, puis l\'appliquer et le régler.',
   e: [['genoux', 6, 'Échauffement mené par un élève.'],
    ['passeurs', 7, 'Passes en une touche, en mouvement.']],
   c: [['Le tableau du coach', 18, 'Chaque équipe a 3 min pour dessiner son attaque et sa défense, puis joue 2 matchs. Entre les deux, 1 min de réglage. Un observateur de l\'équipe au bord compte combien de fois le plan est appliqué.', 'Notre plan est appliqué au moins {3|2} fois.', 'Le plan doit contenir un pick and roll et une défense de zone.', 'match:basket:4c4', 'm4'],
    ['couloirs3', 15, 'Le plan d\'attaque doit occuper les 3 couloirs.', 'Notre plan est appliqué {3|2} fois.', 'L\'équipe menée peut imposer « pas de dribble » pendant 1 min.'],
    ['tir5', 13, 'Les étoiles sont des positions à 3 points ; on tire après une passe.', 'Notre trio allume les 5 étoiles.', 'Une étoile ratée 2 fois s\'éteint.']],
   x: [['fairplay', 15, 'L\'équipe au bord donne aussi 1 point « plan appliqué ».', 'Je respecte l\'arbitre et l\'adversaire.', 'Le capitaine explique le plan à l\'arbitre avant le match.']],
   r: [['ralenti', 7]]},
  {t: 'Tournoi de l\'attaque', o: 'Appliquer ses choix tactiques dans un tournoi arbitré par les élèves.',
   e: [['crocos', 6, 'Les crocodiles chassent en se faisant des passes.'],
    ['tourmonde', 7, 'Tour du monde à 3 points.']],
   c: [['troisxtrois', 20, 'Tournoi au format 3x3 : chaque équipe a un coach au bord (1 temps mort de 30 s par match).', 'Mon équipe gagne au moins un match.', 'Panier sur pick and roll = 2 points.'],
    ['roiterrain', 16, 'Roi du terrain en 3 c 3 : on finit par jouer contre des équipes de son niveau.', 'Je joue contre des équipes de mon niveau.', 'Monter demande 2 paniers d\'écart.'],
    ['carte', 10, 'Le total de l\'équipe compte au classement du tournoi.', 'Mon équipe bat son record.', 'Tirs à 3 points seulement.']],
   x: [['silencieux', 15, 'Finale silencieuse : les plans de jeu se donnent par gestes.', 'Mon équipe joue la finale ou je l\'arbitre.', 'Le public au bord vote l\'action du jour.']],
   r: [['meteo', 7]]},
  {t: 'Évaluation : construire une attaque', o: 'Montrer le pick and roll, l\'attaque d\'une zone et des choix tactiques en match.',
   crit: [['Pick and roll', 5, '5 : écran utile, roll et bon choix du porteur · 3 : réalisé sans bon choix · 1 : tentative mal faite · 0 : jamais'], ['Attaque contre la zone', 4, '4 : fait circuler vite et attaque l\'espace libre · 2 : parfois · 0 : dribble seul contre la zone'], ['Choix tactiques', 4, '4 : tir, passe ou dribble selon la défense · 2 : parfois · 0 : toujours la même action'], ['Défense', 3, '3 : défend son joueur et aide · 1 : parfois · 0 : ne défend pas'], ['Arbitrage et fair-play', 4, '4 : arbitre juste, joue sans contester · 2 : hésite · 0 : conteste']],
   e: [['danse', 6, 'Par deux : l\'attaquant dribble, le défenseur reste devant.'],
    ['crepes', 7]],
   c: [['Épreuve 1 : pick and roll observé', 15, '2 contre 2 : chaque duo passe 3 fois en attaque. Les autres font le défi minute sur l\'autre panier.', '', '', 'demi:basket:2c2', 'g4'],
    ['Épreuve 2 : match 4 contre 4 observé', 25, 'Une mi-temps contre une zone, une mi-temps contre l\'homme à homme. Le prof observe ; les équipes au bord arbitrent.', '', '', 'match:basket:4c4', 'm4']],
   r: [['mercis', 6]]}
]},
6: {th: 'Autonomie et performance : projet d\'équipe et tournoi organisé par les élèves', comp: ['HME2', 'HSC1', 'HSC2', 'HSC3', 'GSS1', 'GSS5'], l: [
  {t: 'Créer son équipe et son projet', o: 'Former des équipes équilibrées et définir un projet de jeu.',
   e: [['voleurs', 6, 'Échauffement mené par un élève volontaire.'],
    ['roue', 7, 'Un élève donne les consignes et le rythme.']],
   c: [['La draft', 14, 'Le prof désigne les capitaines ; l\'ordre de choix est tiré au sort et s\'inverse à chaque tour (comme en NBA). Chaque équipe se donne un nom, une couleur et un cri.', 'Les équipes sont équilibrées : on le vérifie après le 1er match.', 'Le prof peut échanger 2 joueurs si une équipe est trop forte.', 'libre'],
    ['quatre', 18, 'Matchs de découverte : chaque équipe note 2 forces et 1 faiblesse.', 'Notre équipe écrit 2 forces et 1 faiblesse.', 'Un observateur par équipe note les tirs pris et réussis.'],
    ['Le contrat d\'équipe', 14, 'Chaque équipe écrit son contrat : un système d\'attaque, une défense, une règle de fair-play. Elle le teste en 3 c 3.', 'Notre contrat est écrit et testé.', 'Le contrat est montré à l\'équipe adverse après le match.', 'demi:basket:3c3', 'm3']],
   x: [['traversee', 15, 'Premier défi d\'équipe du tournoi : le record de la traversée compte au classement.', 'Notre équipe fixe son record.']],
   r: [['bilan', 7]]},
  {t: 'S\'entraîner en autonomie', o: 'Conduire seul l\'entraînement de son équipe à partir du contrat.',
   e: [['echequipe', 13, 'Chaque équipe mène son échauffement : un jeu de la saison, puis des tirs.']],
   c: [['L\'atelier du coach', 16, 'Chaque équipe choisit un jeu de la saison pour travailler son point faible (passes, tir, défense…). Le prof passe et conseille.', 'Notre équipe progresse sur son point faible.', 'Deux équipes s\'entraînent ensemble et se lancent un défi.', 'ateliers:basket:6', 'e4'],
    ['m3', 15, 'On teste le contrat d\'équipe.', 'Notre contrat est appliqué {3|2} fois.', 'Le coach peut arrêter le jeu 1 fois pour corriger.'],
    ['minute', 15, 'Record d\'équipe : il servira au classement du tournoi.', 'Mon équipe bat son record.']],
   x: [['cartes', 15, '', 'Le match reste serré.']],
   r: [['parole', 7]]},
  {t: 'Tournoi : la phase de poules', o: 'Organiser et vivre un tournoi : jouer, arbitrer, tenir la table de marque.',
   e: [['queues', 6, 'Mené par un élève de chaque équipe.'],
    ['pluie', 7, 'Équipes du tournoi : le score compte pour le classement.']],
   c: [['m4', 34, 'Phase de poules : chaque équipe joue contre toutes les autres. Rôles tournants : arbitres, table de marque, chrono, journaliste qui annonce les résultats.', 'Je tiens chaque rôle sérieusement.', 'Victoire = 3 points, nul = 2, défaite = 1, forfait = 0.', 'tournoi:basket', 'm4'],
    ['chat3', 12, 'Pause du tournoi : les équipes au repos jouent au C-H-A-T entre elles.', 'Je finis sans les 4 lettres.']],
   x: [['chrono', 15, 'Matchs de classement rapides : {12|15} s par attaque.', 'Mon équipe tire à temps à chaque attaque.']],
   r: [['meteo', 7]]},
  {t: 'Tournoi : la phase finale', o: 'Jouer les matchs à élimination directe avec le même esprit.',
   e: [['gendarmes', 6, 'Chaque capitaine présente ensuite le plan de son équipe en 30 secondes.'],
    ['passeurs', 7]],
   c: [['Les phases finales', 34, '', 'Mon équipe joue au meilleur de son niveau.', 'Chaque joueur doit marquer ou faire une passe décisive.'],
    ['vingtun', 12, 'Pendant les pauses, 21 de rue entre équipes au repos.', 'Je gagne une partie.']],
   x: [['fairplay', 15, 'Remise des « trophées » : meilleure attaque, meilleure défense, fair-play, plus beau progrès.', 'Mon équipe reçoit un trophée ou une mention.']],
   r: [['ralenti', 7]]},
  {t: 'Le 3 contre 3 de rue', o: 'Jouer au format olympique 3x3 et en appliquer les règles.',
   e: [['genoux', 6],
    ['tourmonde', 7, 'Avec des tirs à 2 points (format 3x3).']],
   c: [['troisxtrois', 20, '', 'Mon équipe gagne un match.', 'Les plus forts jouent à 12 secondes, les autres à 20.'],
    ['roiterrain', 16, 'En 3x3, matchs à 7 points.', 'Je joue contre des équipes de mon niveau.'],
    ['carte', 10, 'Tirs de streetball : chacun choisit son cerceau.', 'Je bats mon total.', 'Le tir doit commencer par un dribble entre les jambes.']],
   x: [['deuxdeux', 15, '2 c 2 de rue : les duos gagnants restent, pas d\'arbitre.', 'Je reconnais mes fautes sans arbitre.']],
   r: [['doigt', 7]]},
  {t: 'Évaluation : projet et tournoi', o: 'Évaluer le jeu, le rôle dans l\'équipe et l\'organisation du tournoi.',
   crit: [['Efficacité en match', 6, '6 : marque, passe décisive, défense efficace · 4 : contribue souvent · 2 : contribue peu · 0 : absent'], ['Application du contrat d\'équipe', 4, '4 : joue le système et la défense prévus · 2 : parfois · 0 : jamais'], ['Rôles (arbitre, table, coach)', 5, '5 : tient tous ses rôles avec sérieux · 3 : la plupart · 0 : refuse'], ['Fair-play et esprit d\'équipe', 5, '5 : encourage, respecte, félicite · 3 : correct · 0 : conflit']],
   e: [['statues', 6],
    ['danse', 7]],
   c: [['Le tournoi d\'évaluation', 40, 'Matchs de 6 min, rôles tournants. Le prof observe avec la grille.', '', '', 'tournoi:basket', 'm4']],
   r: [['mercis', 6]]}
]}
}});

/* ===== Schémas de chaque jeu (dessinés par carnet/prepas/schemas.js) ===== */
(window.PSCH_SC = window.PSCH_SC || {}).basket = {
  voleurs: g => g.half().scatter('a', 8, 130, 40, 360, 215, {ball: true, seed: 4}).each((x, y, i) => g.drib(x, y, x + (i % 2 ? 26 : -24), y + (i % 3 ? 18 : -16), 6))
    .X(215, 95, 'V').X(300, 170, 'V').run(226, 98, 250, 115, -6, 1).run(290, 165, 268, 150, 6).tag(55, 70, 'voleurs =', {s: 9.5}).X(55, 95, 'V').label(55, 120, 'sans ballon', {s: 9})
    .n(1, 'le voleur chipe ou fait sortir un ballon, sans toucher le joueur').n(2, 'qui perd son ballon devient voleur, le voleur repart en dribble'),
  chef: g => g.hall().P(200, 38).tag(200, 62, 'signaux muets du prof', {s: 9.5}).scatter('a', 12, 50, 90, 350, 215, {ball: true, seed: 3})
    .label(60, 30, 'bras levé = dribble haut', {s: 9, a: 'start'}).label(60, 44, 'bras bas = dribble bas', {s: 9, a: 'start'}).label(340, 30, 'doigt à gauche = main gauche', {s: 9, a: 'end'}).label(340, 44, 'poing fermé = arrêt 2 pieds', {s: 9, a: 'end'})
    .n(1, 'tout le monde regarde le prof, pas le ballon'),
  relaislom: g => { g.hall(); [70, 180].forEach((y, k) => { g.file('a', 3, 50, y, -16, 0).A(70, y, '', {ball: true}); for (let i = 0; i < 5; i++) g.cone(120 + i * 45, y); g.cone(345, y);
      g.path('drib', [[82, y], [120, y - 18], [165, y + 18], [210, y - 18], [255, y + 18], [300, y - 18], [345, y - 18], [360, y], [345, y + 20]]).drib(330, y + 22, 85, y + 16, -6); });
    return g.n(1, 'aller en slalom main droite, tour du dernier cône').n(2, 'retour en sprint-dribble main gauche, on tape la main du suivant').num(220, 45, 1).num(220, 110, 2); },
  demenage: g => { g.court(); g.balls(200, 125, 9, 'basket'); [[45, 48, 'a'], [355, 48, 'b'], [45, 202, 'x'], [355, 202, 'j']].forEach(([x, y, t], i) => { g.zone(x - 24, y - 20, 48, 40, '', 'grey'); g.pl(t, x, y, ''); });
    return g.run(60, 55, 185, 115, -10, 1).drib(185, 135, 62, 195, 12, 2).drib(340, 60, 218, 118, 0).tag(200, 160, 'ballons au rond central', {s: 9.5})
      .n(1, 'on va chercher UN ballon à la fois').n(2, 'retour en dribble dans son coin ; centre vide = on prend dans les autres coins'); },
  aveugle: g => g.hall().ring('a', 10, 200, 125, 140, 80, {ball: true}).P(200, 125).tag(200, 98, 'yeux fermés', {s: 10}).label(200, 155, 'main droite → main gauche → changement au signal', {s: 9}),
  atomes: g => { g.hall().scatter('a', 9, 40, 40, 220, 215, {ball: true, seed: 6}); g.ring('a', 4, 300, 90, 22, 22, {}).balls(300, 90, 3, 'basket').ring('a', 3, 300, 175, 20, 20);
    return g.P(200, 30).tag(200, 54, '« Par 4 ! »', {s: 10}).run(210, 120, 270, 95, -8, 1).zone(255, 145, 90, 65, '', 'red').label(300, 220, 'dernier groupe : 5 passes', {s: 9})
      .n(1, 'au nombre crié, on forme vite un groupe, ballons collés au centre').n(2, 'le dernier groupe formé fait une mission éclair').num(345, 160, 2); },
  roue: g => { g.hall(); [[120, 125], [290, 125]].forEach(([cx, cy], k) => { g.ring('a', 5, cx, cy, 55, 55, {ball: true, bx: 0, by: -14}); g.each((x, y, i) => { const a = -Math.PI / 2 + (i + 1) / 5 * 2 * Math.PI; if (k === 0 || i % 2 === 0) g.pass(x, y, cx + 55 * Math.cos(a), cy + 55 * Math.sin(a), 8); }); });
    return g.tag(200, 30, '« Hop ! » : tout le monde passe en même temps', {s: 10}).n(1, 'on passe au voisin de droite et on reçoit celui de gauche').n(2, 'au sifflet, on change de sens'); },
  taureau: g => g.hall().ring('a', 6, 200, 125, 95, 80, {balls: [0]}).X(190, 120, 'T').X(215, 145, 'T').pass(200, 52, 285, 105, -10, 1).pass(282, 165, 125, 165, 20).tag(200, 243, 'passe au voisin direct interdite', {s: 9.5})
    .n(1, 'le cercle se passe le ballon').n(2, 'le taureau touche le ballon = il prend la place du passeur').num(170, 105, 2),
  dixpasses: g => g.half().scatter('a', 4, 140, 45, 360, 210, {seed: 2}).each((x, y, i) => i < 3 && g.pass(x, y, ...g.last[i + 1], 12, i ? null : 1)).scatter('b', 4, 150, 60, 350, 200, {seed: 9}).ball(g.last[0][0] - 4, g.last[0][1] - 10)
    .tag(240, 243, '10 passes de suite = 1 point', {s: 10}).n(1, 'on compte les passes à voix haute ; ballon perdu = on repart à 0'),
  capitaine: g => g.court().scatter('a', 4, 60, 45, 190, 205, {seed: 3}).scatter('b', 4, 210, 45, 340, 205, {seed: 5}).hoop(368, 125, 13).A(368, 125, 'C').hoop(32, 125, 13).B(32, 125, 'C')
    .pass(185, 110, 355, 122, -12, 1).drib(100, 80, 170, 100, 6).label(368, 152, 'capitaine A', {s: 9}).label(32, 152, 'capitaine B', {s: 9})
    .n(1, 'passe attrapée par son capitaine (dans un cerceau derrière la ligne de fond) = 1 point').n(2, 'le passeur devient capitaine ; dribble limité à 3 rebonds'),
  cartes: g => g.half().pls('a', [[200, 70, '', {ball: true}], [180, 170], [300, 200]]).pls('b', [[255, 85], [240, 155], [325, 180]]).pass(206, 80, 186, 160, 12)
    .sheet(50, 70, 'coup de pouce').sheet(50, 150, 'défi').tag(55, 200, 'écart de 3 paniers', {s: 9}).n(1, 'l\'équipe menée de 3 paniers pioche une carte « coup de pouce » ou impose une carte « défi »').num(50, 40, 1),
  passenom: g => g.hall().ring('a', 7, 200, 125, 100, 85, {balls: [0, 3]}).pass(200, 52, 278, 172, 10, 1).pass(128, 182, 118, 100, -10).tag(290, 60, '« Léa ! »', {s: 10}).n(1, 'on dit le prénom de celui qui reçoit ; puis 2, puis 3 ballons'),
  tourmonde: g => { g.half(); const P = [[350, 52], [300, 70], [282, 125], [300, 180], [350, 198]]; P.forEach(([x, y], i) => g.disc(x, y).label(x - (i === 2 ? 14 : 0), y + (i < 2 ? -8 : i > 2 ? 18 : -10), String(i + 1), {s: 10, b: 1}));
    return g.A(330, 52, '', {ball: true}).shot(334, 60, 357, 118, -6, 1).file('a', 4, 190, 60, -20, 0).run(212, 60, 318, 52, -8).label(170, 85, 'les autres attendent', {s: 9})
      .n(1, 'panier = on avance à la coupelle suivante, raté = on reste').n(2, 'le premier qui fait le tour gagne').run(300, 75, 285, 110, -10, 2); },
  pegobol: g => g.hall().scatter('a', 9, 40, 40, 360, 215, {seed: 5}).X(170, 110, '', {ball: true}).X(260, 90).X(220, 170).pass(181, 112, 250, 94, -10, 1).run(268, 98, 300, 120, -6, 2).tag(110, 243, 'le porteur ne court pas', {s: 9.5})
    .n(1, 'les chasseurs se font des passes pour coincer un fuyard').n(2, 'on touche un fuyard avec le ballon en main ; touché = chasseur'),
  miroir: g => { g.hall(); [[110, 70], [290, 70], [110, 180], [290, 180]].forEach(([x, y], i) => g.A(x - 30, y, 'M', {ball: true}).A(x + 30, y, 'O', {ball: true, c: '#5b8de0'}).drib(x - 30, y + 12, x - 30, y + 38, -10).drib(x + 30, y + 12, x + 30, y + 38, 10));
    return g.label(200, 125, 'M = meneur · O = ombre qui copie tout', {s: 10, b: 1}).n(1, 'le meneur invente, l\'ombre copie ; au sifflet, on inverse'); },
  chateau: g => g.hall().czone(200, 125, 70, '', 'red').cone(200, 125).label(200, 145, 'château', {s: 9}).X(160, 100).X(240, 150).ring('a', 7, 200, 125, 105, 95, {balls: [0]})
    .pass(200, 42, 290, 95, -12, 1).shot(290, 105, 205, 122, 0, 2).label(200, 243, 'les défenseurs ne rentrent pas dans le cercle', {s: 9.5})
    .n(1, 'passes rapides pour trouver le côté libre').n(2, 'tir à hauteur de poitrine : château tombé = le tireur devient défenseur'),
  roiterrain: g => { g.terrains(4, {labs: ['terrain du roi 👑', 'terrain 2', 'terrain 3', 'terrain 4'], goals: 'basket'}); g.T.forEach(([x, y, w, h], i) => g.row('a', 2, x + w * .3, y + h * .4, x + w * .3, y + h * .8).row('b', 2, x + w * .7, y + h * .4, x + w * .7, y + h * .8));
    return g.run(150, 150, 150, 98, 0, 1).run(245, 98, 245, 150, 0, 2).n(1, 'l\'équipe qui gagne monte vers le terrain du roi').n(2, 'celle qui perd descend'); },
  bilan: g => g.calme('👍 j\'ai appris · j\'ai pris du plaisir').n(1, 'étirements guidés, puis chacun montre son pouce et chaque équipe cite un geste fair-play'),
  fairplay: g => g.court().scatter('a', 4, 60, 50, 190, 200, {seed: 3}).scatter('b', 4, 210, 50, 340, 200, {seed: 8}).ball(118, 70).bord(178, 238, 3, '', 'g').tag(200, 13, 'équipe au bord : +1 fair-play (faute reconnue, aide, félicitations)', {s: 9.5})
    .n(1, 'score final = paniers + points fair-play'),
  chat3: g => g.half().A(250, 70, '1', {ball: true}).shot(258, 75, 355, 120, -10, 1).file('a', 4, 220, 175, -20, 0).run(232, 168, 248, 85, 10).tag(180, 30, 'C - H - A - T', {s: 12})
    .n(1, 'le 1er invente un tir : s\'il marque, les suivants doivent le réussir, sinon ils prennent une lettre').n(2, '4 lettres = un tour de terrain en dribble').num(150, 175, 2),
  'Épreuve 1 : le défi du dribbleur': g => { g.half(); for (let i = 0; i < 5; i++) g.cone(140 + i * 30, 90); g.A(115, 90, '', {ball: true});
    return g.path('drib', [[125, 90], [140, 72], [170, 108], [200, 72], [230, 108], [260, 72], [285, 90]]).drib(285, 100, 150, 160, 10, 2).drib(150, 170, 250, 165, -6).shot(260, 160, 356, 130, 6, 3)
      .num(200, 50, 1).n(1, 'slalom main droite à l\'aller').n(2, 'retour main gauche').n(3, 'puis tir ; 2 essais, le meilleur compte'); },
  'Épreuve 2 : le concours de tirs': g => g.half().A(280, 70, '', {ball: true}).A(260, 180, '', {ball: true}).shot(288, 75, 355, 120, -6, 1).shot(270, 175, 355, 130, 6).A(275, 125, '', {ball: true}).shot(286, 125, 355, 125, 0, 2).A(150, 50, '').sheet(170, 50).label(150, 75, 'il compte et note', {s: 9})
    .n(1, '5 tirs à 2 points autour de la raquette').n(2, 'puis 3 lancers francs'),
  'Épreuve 3 : le match observé': g => g.half().pls('a', [[230, 60, '', {ball: true}], [210, 180], [320, 205]]).pls('x', [[265, 80], [250, 170], [330, 175]]).pass(236, 70, 214, 168, 14).P(60, 60).sheet(85, 60).label(70, 85, 'prof : grille', {s: 9}).bord(30, 160, 3, 'au bord : arbitres')
    .n(1, '3 contre 3, panier après 3 passes'),
  'Le chemin des cerceaux': g => g.half().A(170, 165, '', {ball: true}).drib(180, 160, 240, 140, 0, 1).hoop(262, 135, 11).hoop(292, 120, 11).label(262, 155, 'pied D', {s: 9}).label(292, 140, 'pied G', {s: 9}).run(300, 115, 345, 118, -8, 2)
    .file('a', 3, 150, 165, -20, 0).n(1, 'en dribble, on prend le ballon à 2 mains, pied droit dans le 1er cerceau').n(2, 'pied gauche dans le 2e, on saute et on dépose le ballon (double pas)'),
  'Le relais du double pas': g => g.court().file('a', 4, 215, 70, 0, -14).A(215, 84, '', {ball: true}).drib(225, 88, 320, 112, -8, 1).run(322, 114, 352, 122, 0).pass(345, 140, 225, 92, -30, 2)
    .file('b', 4, 185, 180, 0, 14).B(185, 166, '', {ball: true}).drib(175, 162, 80, 138, -8).run(78, 136, 48, 128, 0).pass(55, 110, 175, 160, -30).label(200, 243, 'une équipe par panier', {s: 9.5}).n(1, 'du milieu en dribble, double pas').n(2, 'rebond et passe au suivant ; panier = 1 point'),
  'Le passe et va du facteur': g => g.half().A(190, 160, '', {ball: true}).A(260, 70, 'F').pass(200, 155, 255, 80, -10, 1).run(198, 168, 320, 150, 12, 2).pass(268, 80, 318, 140, -8, 3).shot(325, 140, 355, 128, 0).file('a', 2, 165, 175, -20, 0)
    .n(1, 'je passe au facteur (camarade fixe)').n(2, 'je cours vers le panier').n(3, 'le facteur me rend le ballon, je marque'),
  deuxun: g => g.half().A(150, 80, '', {ball: true}).A(150, 175).X(300, 125).drib(160, 85, 270, 115, -6, 1).run(160, 175, 320, 170, -6).pass(275, 125, 318, 162, 10, 2).shot(325, 160, 356, 132, 0)
    .tag(230, 30, 'le porteur attire le défenseur, puis passe ou tire', {s: 9.5}).n(1, 'le porteur fonce sur le défenseur pour l\'attirer').n(2, 'passe au partenaire libre (ou tir) ; le défenseur repart en attaque avec le passeur'),
  'Le chat aux appels': g => g.hall().scatter('a', 9, 40, 40, 360, 215, {seed: 2, balls: []}).ball(g.last[1][0] + 8, g.last[1][1] + 7).ball(g.last[5][0] + 8, g.last[5][1] + 7).X(250, 140).run(240, 140, g.last[4][0] + 12, g.last[4][1], 8, 1)
    .pass(g.last[5][0], g.last[5][1], g.last[4][0], g.last[4][1], 10, 2).tag(g.last[4][0], g.last[4][1] - 20, '« ici ! »', {s: 9.5})
    .n(1, 'le chat poursuit un fuyard').n(2, 'un fuyard qui tient un ballon est protégé : on lui passe vite le ballon quand il appelle'),
  "L'horloge du démarquage": g => g.half().A(250, 125, 'P', {ball: true}).A(200, 60).A(310, 200).X(230, 85).X(285, 175).run(200, 60, 270, 45, -10, 1).pass(260, 115, 268, 52, -6, 2).run(310, 200, 340, 165, 10)
    .tag(240, 243, 'le porteur ne bouge pas (pivot seulement)', {s: 9.5}).n(1, 'les 2 autres attaquants se démarquent').n(2, 'passe réussie = 1 point ; 5 points = on va marquer au panier'),
  'La toupie': g => { g.hall(); [[110, 80], [290, 80], [110, 180], [290, 180]].forEach(([x, y]) => g.A(x, y, '', {ball: true}).B(x + 34, y - 10).loop(x, y, 36, 28, 'run')); return g.label(200, 130, 'pied fixe : on pivote pour protéger le ballon', {s: 10, b: 1}).n(1, 'l\'autre tourne autour pour toucher le ballon ; 20 s puis on change'); },
  m4: g => g.court().scatter('a', 4, 70, 50, 190, 200, {seed: 3}).scatter('b', 4, 210, 50, 330, 200, {seed: 8}).ball(g.last[0][0] - 50, g.last[0][1]).bord(178, 238, 3, '', 'g').tag(200, 13, 'au bord : arbitres (marcher, reprise de dribble, contact)', {s: 9.5}),
  'Épreuve 1 : parcours et double pas': g => { g.half(); for (let i = 0; i < 4; i++) g.cone(140 + i * 30, 190); g.A(115, 190, '', {ball: true}).A(260, 60, 'F');
    return g.path('drib', [[125, 190], [140, 172], [170, 208], [200, 172], [230, 208], [250, 190]]).pass(255, 182, 258, 72, -8, 2).run(255, 192, 315, 140, 10, 3).pass(268, 66, 312, 132, -6).shot(320, 132, 356, 126, 0)
      .num(170, 225, 1).n(1, 'slalom en dribble').n(2, 'passe au facteur').n(3, 'appel en course, réception et double pas'); },
  'Épreuve 2 : match 3 contre 3 observé': g => g.half().pls('a', [[230, 60, '', {ball: true}], [210, 180], [320, 205]]).pls('x', [[265, 80], [250, 170], [330, 175]]).run(320, 196, 345, 145, -10).pass(236, 70, 214, 168, 14).P(60, 60).sheet(85, 60).bord(30, 160, 3, 'au bord : arbitres')
    .n(1, 'double pas = 2 points ; le prof observe démarquage et passe et va'),
  'Les relais de la passe': g => { g.court(); [70, 180].forEach((y, k) => { g.file('a', 3, 60, y, -16, 0); g.A(110, y - 22).A(160, y + 22).A(210, y - 22); g.pass(70, y - 8, 104, y - 20, 0).pass(116, y - 18, 154, y + 18, 0).pass(166, y + 18, 204, y - 18, 0); g.run(220, y - 20, 350, 125 + (k ? 12 : -12), k ? 10 : -10); });
    return g.chrono(30, 125).n(1, 'passes en avançant jusqu\'au panier, double pas').n(2, 'retour en sprint ; on chronomètre toute l\'équipe').num(290, 80, 1); },
  'Course contre le ballon': g => g.court().A(40, 125, 'C').run(50, 125, 330, 125, 0, 1).A(60, 60, '', {ball: true}).A(120, 200).pass(70, 65, 115, 190, 0, 2).A(200, 60).pass(125, 190, 195, 70, 0).A(280, 195).pass(205, 70, 275, 185, 0).pass(285, 185, 330, 135, 0).shot(345, 125, 360, 125, 0)
    .n(1, 'le coureur sprinte d\'un panier à l\'autre').n(2, 'les 2 coéquipiers se passent le ballon : il doit arriver avant le coureur, qui reçoit et marque'),
  'La danse du défenseur': g => { g.hall(); [[100, 70], [280, 70], [100, 180], [280, 180]].forEach(([x, y]) => g.A(x, y - 16).X(x, y + 16).run(x + 12, y - 16, x + 50, y - 16, 0).run(x + 14, y + 16, x + 50, y + 16, 0).run(x - 12, y - 16, x - 50, y - 16, 0)); return g.label(200, 128, 'pas chassés, face à face, sans croiser les pieds', {s: 10, b: 1}).n(1, 'l\'attaquant se déplace, le défenseur le suit en restant devant lui, bras écartés'); },
  duel: g => g.half().A(220, 125, 'R', {ball: true}).X(300, 125).drib(230, 118, 290, 92, -6, 1).shot(300, 90, 355, 120, -6).file('a', 4, 170, 200, -20, 0).label(140, 225, 'challengers', {s: 9})
    .n(1, 'le roi attaque avec 3 dribbles maximum').n(2, 'panier = il reste roi ; défense réussie = le défenseur devient roi').num(300, 150, 2),
  'La garde du corps': g => g.court().pls('a', [[90, 70], [150, 120], [110, 190], [180, 60, '', {ball: true}]]).pls('x', [[100, 85], [162, 132], [122, 200], [192, 72]]).pass(186, 72, 150, 108, 0)
    .rope(90, 70, 100, 85, 0, '#9aa').tag(280, 200, 'chaque défenseur colle SON attaquant', {s: 10}).n(1, 'passe à 10 : la défense marque si son protégé ne reçoit aucune passe pendant 20 s'),
  'La chasse au ballon': g => g.half().A(200, 110, '').A(200, 140, '').P(250, 40).ball(290, 120).run(255, 50, 285, 110, 0, 1).run(210, 110, 282, 118, -10, 2).shot(298, 120, 356, 124, 0)
    .label(170, 125, 'dos à dos', {s: 9.5}).n(1, 'le prof lance le ballon au sol').n(2, 'le 1er qui l\'attrape tire, l\'autre devient défenseur'),
  'Le roi du rebond': g => g.half().P(250, 125, {ball: true}).shot(262, 125, 356, 125, 0, 1).A(330, 90).A(320, 165).A(300, 125).run(330, 100, 345, 115, 0, 2).label(330, 205, 'sans faute !', {s: 9.5})
    .n(1, 'le prof tire').n(2, 'les 3 se battent pour le rebond ; celui qui l\'attrape marque, les 2 autres le gênent'),
  'Les vagues': g => g.court().pls('a', [[250, 70], [280, 125, '', {ball: true}], [250, 180]]).pls('b', [[300, 85], [335, 165], [300, 175]]).pls('j', [[70, 80, 'C'], [60, 125, 'C'], [70, 170, 'C']])
    .shot(290, 125, 356, 125, 0, 1).drib(310, 150, 120, 140, 10, 2).label(65, 205, 'équipe C attend', {s: 9}).n(1, 'A attaque contre B').n(2, 'B récupère et contre-attaque vers l\'autre panier où C l\'attend ; qui marque reste'),
  "Épreuve 1 : les vagues du 2 contre 1": g => g.half().A(150, 80, '', {ball: true}).A(150, 175).X(300, 125).drib(160, 85, 270, 115, -6).run(160, 175, 320, 170, -6).pass(275, 125, 318, 162, 10).P(60, 60).sheet(85, 60).label(70, 85, 'prof : grille', {s: 9})
    .n(1, 'chaque élève : 2 fois en attaque, 1 fois en défense ; on note décision, réussite, défense'),
  'Épreuve 2 : match observé': g => g.court().pls('a', [[90, 70, '', {ball: true}], [160, 130], [110, 190]]).pls('x', [[120, 80], [185, 135], [130, 180]]).pls('b', [[260, 70], [300, 140], [250, 190]]).P(200, 238).sheet(225, 238)
    .n(1, '3 contre 3 tout terrain ; le prof observe défense, rebond et fair-play'),
  'Le 3 contre 2 en vagues': g => g.court().pls('a', [[210, 60], [200, 125, '', {ball: true}], [210, 190]]).pls('x', [[310, 95], [310, 155]]).pass(210, 120, 215, 75, 8, 1).shot(220, 62, 355, 115, -10)
    .drib(300, 160, 120, 150, 10, 2).run(300, 100, 100, 100, -10).label(150, 230, 'retour : les 2 défenseurs + 1 attaquant en 2 c 1', {s: 9}).n(1, '3 attaquants contre 2 défenseurs').n(2, 'après le tir, 2 c 1 vers l\'autre panier, sans pause'),
  'Le jeu du surnombre': g => g.court().scatter('a', 4, 70, 50, 190, 200, {seed: 3}).scatter('b', 4, 210, 50, 330, 200, {seed: 8}).J(190, 125, 'J').run(190, 112, 250, 90, -10, 1).ball(g.last[0][0] - 50, g.last[0][1])
    .n(1, 'le joker joue avec l\'équipe qui vient de récupérer le ballon, jusqu\'au tir'),
  'La statue': g => g.hall().A(200, 125, 'S').label(200, 148, 'statue (bras croisés)', {s: 9}).A(150, 110).run(160, 110, 225, 100, -16, 1).X(120, 140).run(130, 140, 190, 140, 0).scatter('a', 6, 40, 40, 360, 215, {seed: 4})
    .n(1, 'le fuyard frôle la statue : le chat doit la contourner (c\'est l\'écran)').n(2, 'variante : la statue pivote et sprinte vers le panier (le « roll »)').run(212, 125, 290, 140, -8, 2),
  'Le 2 c 2 de l\'écran': g => g.half().A(210, 120, 'P', {ball: true}).X(232, 120).A(240, 70, 'E').X(255, 60).run(245, 80, 240, 108, 8, 1).drib(220, 128, 290, 150, 12, 2).shot(300, 148, 356, 128, 0)
    .n(1, 'le non-porteur pose un écran sur le défenseur du porteur (immobile, bras croisés)').n(2, 'le porteur dribble en frôlant l\'écran et tire : panier après écran = 3 points'),
  'Le mur qui parle': g => g.half().pls('a', [[230, 60, '', {ball: true}], [210, 180], [320, 205]]).pls('x', [[265, 80], [250, 170], [330, 175]]).tag(285, 40, '« j\'ai le porteur ! »', {s: 9}).tag(200, 140, '« écran ! »', {s: 9})
    .n(1, '3 contre 3 : les défenseurs parlent ; un défenseur muet donne 1 point à l\'attaque'),
  'Le système secret': g => g.half().pls('a', [[210, 125, '', {ball: true}], [250, 60], [250, 195]]).pls('x', [[235, 125], [275, 70], [275, 185]]).run(255, 72, 238, 108, 6, 1).pass(212, 135, 248, 185, 10, 2).run(220, 120, 320, 140, -10, 3).sheet(60, 70, 'code « Éclair »')
    .n(1, 'écran').n(2, 'passe').n(3, 'et va : la combinaison annoncée qui marque = 3 points'),
  tir5: g => { g.half(); [[345, 50], [280, 70], [255, 125], [280, 180], [345, 200]].forEach(([x, y]) => g.label(x, y + 5, '★', {s: 18, c: '#e0a800'}));
    return g.A(270, 70, 'T', {ball: true}).shot(275, 76, 356, 120, -6, 1).A(330, 140, 'R').pass(330, 150, 262, 172, 10, 2).A(260, 190).n(1, 'on tire d\'une étoile').n(2, 'le suivant prend le rebond et passe au tireur ; 5 étoiles allumées = gagné'); },
  'Épreuve 1 : vagues 3 contre 2': g => g.court().pls('a', [[210, 60], [200, 125, '', {ball: true}], [210, 190]]).pls('x', [[310, 95], [310, 155]]).pass(210, 120, 215, 75, 8).P(100, 40).sheet(125, 40).n(1, 'chaque élève : 2 fois en attaque, 1 fois en défense'),
  'Épreuve 2 : match observé 4 contre 4': g => g.court().scatter('a', 4, 70, 50, 190, 200, {seed: 3}).scatter('b', 4, 210, 50, 330, 200, {seed: 8}).P(200, 238).sheet(225, 238).n(1, 'matchs de 6 min ; le prof observe écran, défense et contribution'),
  'Le 2 c 2 pick and roll': g => g.half().A(200, 125, 'P', {ball: true}).X(222, 125).A(240, 75, 'E').X(258, 64).run(244, 85, 232, 110, 8, 1).drib(210, 135, 270, 160, 10, 2).run(240, 115, 330, 105, -10, 3).pass(272, 155, 326, 112, -6)
    .n(1, 'l\'écraneur pose l\'écran').n(2, 'le porteur sort en dribble : tir s\'il est libre').n(3, 'l\'écraneur pivote et file au panier (roll) : passe s\'il est doublé'),
  'Les tirs du meneur': g => g.half().A(190, 125, 'M', {ball: true}).A(230, 100, 'E').drib(200, 132, 270, 150, 10, 1).shot(276, 146, 356, 128, 0, 2).run(236, 92, 320, 100, -8).label(330, 85, 'rouleur', {s: 9})
    .n(1, 'le meneur sort de l\'écran en dribble').n(2, 'tir à mi-distance, ou passe au rouleur qui finit en double pas'),
  'La zone des pirates': g => g.half().zone(290, 28, 88, 62, 'coin 1', 'grey', {top: 1}).zone(290, 160, 88, 62, 'coin 2', 'grey', {ly: 216}).zone(205, 95, 70, 60, 'coin 3', 'grey', {top: 1}).X(325, 65).X(325, 185).X(240, 130)
    .pls('a', [[180, 60], [170, 125, '', {ball: true}], [180, 190], [270, 230]]).pass(180, 120, 180, 72, -8, 1).pass(185, 62, 180, 180, 30).shot(190, 185, 355, 132, -6, 2)
    .n(1, 'on fait tourner vite le ballon').n(2, 'on tire dans l\'espace libre ; chaque défenseur reste dans son coin'),
  'Le jeu des trois couleurs': g => g.half().pls('a', [[230, 60, '', {ball: true}], [210, 180], [320, 205]]).pls('x', [[265, 80], [250, 170], [330, 175]]).A(60, 125, 'S').cone(80, 95, '#e11d48').cone(95, 95, '#1f63d6').cone(110, 95, '#facc15')
    .label(60, 160, 'rouge : tir < 5 s', {s: 9}).label(60, 174, 'bleu : 3 passes', {s: 9}).label(60, 188, 'jaune : pick and roll', {s: 9}).n(1, 'l\'élève au bord lève un plot ; code respecté + panier = 2 points'),
  'Le match du conseiller': g => g.half().pls('a', [[230, 60, '', {ball: true}], [210, 180], [320, 205]]).pls('x', [[265, 80], [250, 170], [330, 175]]).A(60, 125, 'C').tag(60, 100, '« écran ! »', {s: 9.5}).n(1, 'le conseiller crie un conseil d\'un mot par attaque ; panier sur conseil = 3 points'),
  'Le tableau du coach': g => g.court().scatter('a', 4, 70, 50, 190, 200, {seed: 3}).scatter('b', 4, 210, 50, 330, 200, {seed: 8}).sheet(200, 238).label(240, 241, 'plan dessiné', {s: 9}).B(130, 238, 'O').label(90, 241, 'observateur', {s: 9})
    .n(1, '3 min pour dessiner attaque et défense, 2 matchs, 1 min de réglage entre les deux'),
  'Épreuve 1 : pick and roll observé': g => g.half().A(200, 125, 'P', {ball: true}).X(222, 125).A(240, 75, 'E').X(258, 64).run(244, 85, 232, 110, 8).drib(210, 135, 270, 160, 10).run(240, 115, 330, 105, -10).P(60, 60).sheet(85, 60).n(1, 'chaque duo passe 3 fois en attaque ; les autres font le défi minute sur l\'autre panier'),
  'Épreuve 2 : match 4 contre 4 observé': g => g.court().scatter('a', 4, 70, 50, 190, 200, {seed: 3}).pls('x', [[260, 90], [260, 160], [320, 90], [320, 160]]).zone(240, 60, 130, 130, 'zone', 'grey', {top: 1}).P(200, 238).sheet(225, 238)
    .n(1, 'une mi-temps contre une zone, une contre l\'homme à homme'),
  'La draft': g => g.hall().pls('a', [[80, 60, 'C1'], [160, 60, 'C2'], [240, 60, 'C3'], [320, 60, 'C4']]).sheet(80, 95).sheet(160, 95).sheet(240, 95).sheet(320, 95).scatter('a', 10, 50, 140, 350, 215, {seed: 2, c: '#9aa'})
    .label(200, 30, 'ordre 1-2-3-4 puis 4-3-2-1', {s: 10, b: 1}).n(1, 'les capitaines choisissent sur une feuille (personne n\'est choisi en dernier à voix haute)'),
  "Le contrat d'équipe": g => g.half().sheet(60, 80, 'contrat').pls('a', [[230, 60, '', {ball: true}], [210, 180], [320, 205]]).pls('x', [[265, 80], [250, 170], [330, 175]]).n(1, 'chaque équipe écrit son contrat puis le teste en 3 c 3'),
  "Échauffement d'équipe": g => { g.hall(); [[105, 70], [295, 70], [105, 180], [295, 180]].forEach(([x, y], i) => g.zone(x - 85, y - 50, 170, 100, '', 'grey').ring('a', 4, x, y, 30, 25, {balls: [0]}).A(x, y, 'C', {c: '#1d241f'})); return g.n(1, 'le capitaine (C) mène : un jeu de mise en train, puis des tirs'); },
  "L'atelier du coach": g => { g.floor(); ['passes', 'tir', 'défense', 'dribble', 'rebond', 'match'].forEach((t, i) => { const x = 10 + (i % 3) * 127, y = 10 + Math.floor(i / 3) * 117; g.zone(x + 3, y + 3, 120, 110, t, 'blue', {top: 1}).ring('a', 3, x + 63, y + 65, 22, 18, {balls: [0]}); });
    return g.P(200, 125).n(1, 'chaque équipe choisit un jeu de la saison pour son point faible ; le prof passe et conseille'); },
  'Le 3x3 olympique': g => g.half().pls('a', [[230, 60, '', {ball: true}], [210, 180], [320, 205]]).pls('x', [[265, 80], [250, 170], [330, 175]]).tag(190, 30, '12 s pour tirer · match à 21 points', {s: 9.5}).run(330, 168, 220, 125, 10, 1)
    .n(1, 'après un panier, l\'adversaire ressort le ballon derrière l\'arc ; loin = 2 points'),
  "Le tournoi d'évaluation": g => { g.terrains(2, {goals: 'basket', labs: ['terrain 1', 'terrain 2'], h: 200, y0: 15}); g.T.forEach(([x, y, w, h]) => g.scatter('a', 4, x + 15, y + 30, x + w / 2 - 10, y + h - 15, {seed: 3}).scatter('b', 4, x + w / 2 + 10, y + 30, x + w - 15, y + h - 15, {seed: 5}));
    return g.P(200, 238).sheet(225, 238).n(1, 'matchs de 6 min, rôles tournants ; le prof observe avec la grille'); },

  queues: g => g.half().scatter('a', 9, 130, 40, 360, 215, {ball: true, seed: 12}).each((x, y, i) => g.chasuble(x - 12, y + 2, i % 3 ? '#facc15' : '#16a34a')).run(g.last[2][0] + 8, g.last[2][1] - 4, g.last[4][0] - 16, g.last[4][1], -10, 1)
    .tag(55, 70, 'chasuble = queue', {s: 9.5}).chasuble(55, 100).bac(55, 165, 'réserve').n(1, 'on arrache la queue des autres sans arrêter son dribble').n(2, 'queue perdue : on en reprend une à la réserve et on repart (1 point par queue arrachée)'),
  gendarmes: g => { g.hall().scatter('a', 9, 120, 40, 360, 215, {ball: true, seed: 3}).X(200, 90, 'G').X(290, 170, 'G').run(212, 95, g.last[1][0] - 12, g.last[1][1], -8, 1);
    return g.hoop(55, 125, 26).label(55, 165, 'prison', {s: 9.5, b: 1}).A(55, 125, '', {ball: true, by: -14}).pass(g.last[0][0] - 10, g.last[0][1] + 5, 68, 118, 20, 2)
      .n(1, 'un gendarme touche un voleur : il va en prison, ballon au-dessus de la tête').n(2, 'un voleur libre le délivre par une passe à rebond qu\'il attrape'); },
  statues: g => { g.hall().scatter('a', 9, 40, 40, 360, 215, {ball: true, seed: 9}).X(120, 120, 'C', {ball: true}).X(270, 80, 'C', {ball: true}).run(130, 115, g.last[4][0] - 12, g.last[4][1] + 4, 8, 1);
    g.raw('<path d="M300 172l-10 22M300 172l10 22" stroke="#1f63d6" stroke-width="3.5" stroke-linecap="round"/>', 'mid').A(300, 160, '', {ball: true, by: -16}).drib(250, 200, 296, 190, -6, 2);
    return g.label(300, 215, 'statue', {s: 9, b: 1}).n(1, 'touché par un chat = statue, jambes écartées, ballon au-dessus de la tête').n(2, 'on la délivre en faisant rebondir son ballon entre ses jambes'); },
  crepes: g => { g.hall(); const r = [[70, 60], [120, 110], [90, 190], [170, 55], [200, 150], [240, 95], [280, 200], [320, 70], [340, 150], [150, 200], [260, 40], [60, 130]];
    r.forEach(([x, y], i) => g.disc(x, y, i % 2 ? '#facc15' : '#16a34a')); g.A(110, 90, '', {ball: true}).A(230, 175, '', {ball: true}).B(190, 115, '', {ball: true}).B(300, 110, '', {ball: true});
    return g.drib(118, 98, 136, 108, 0, 1).drib(300, 120, 333, 145, 0, 2).label(200, 236, 'coupelle jaune = à l\'endroit · verte = retournée', {s: 9}).n(1, 'les crêpiers (ronds) remettent les coupelles à l\'endroit, en dribblant').n(2, 'les mangeurs (carrés) les retournent ; 1 min, on compte, on inverse'); },
  passeurs: g => { g.hall(); [[80, 70, 160, 55], [250, 60, 330, 95], [70, 170, 140, 210], [220, 160, 300, 200], [180, 120, 260, 125]].forEach(([a, b, c, d], i) => g.A(a, b, '', {ball: true}).A(c, d).pass(a + 8, b, c - 10, d, -8, i ? null : 1).run(c, d + 12, c + 18, d + 26, 6));
    return g.tag(200, 238, 'jamais à moins de 3 m de son partenaire', {s: 9.5}).n(1, 'par deux, on se déplace partout en se faisant des passes (type de passe annoncé par le prof)').n(2, 'chaque passe attrapée = 1 : on bat son record en 1 min'); },
  cirque: g => { g.hall().scatter('a', 9, 40, 70, 360, 215, {ball: true, seed: 5}).P(200, 32);
    return g.label(80, 30, 'autour de la taille', {s: 9}).label(320, 30, 'lancer + 2 clap', {s: 9}).label(80, 46, 'en 8 entre les jambes', {s: 9}).label(320, 46, 'dribble assis', {s: 9})
      .loop(g.last[3][0], g.last[3][1], 16, 12, 'drib').n(1, 'le prof annonce un tour de 30 s, chacun compte ses réussites').n(2, 'puis deux élèves inventent un tour pour la classe'); },
  pluie: g => { g.court(); g.scatter('a', 6, 230, 50, 340, 200, {ball: true, seed: 2}).each((x, y, i) => i < 3 && g.shot(x + 8, y, 360, 125, (i - 1) * 10, i ? null : 1));
    g.scatter('b', 6, 60, 50, 170, 200, {ball: true, seed: 6}).each((x, y, i) => i < 2 && g.shot(x - 8, y, 40, 125, (i - .5) * 10));
    return g.tag(200, 238, '1 min : panier = 1 pt · hors raquette = 2 pts', {s: 9.5}).n(1, 'tout le monde tire en même temps, prend son rebond et le donne au partenaire').n(2, 'chaque équipe compte à voix haute, puis on change de panier'); },
  genoux: g => { g.hall(); [[110, 75], [290, 75], [110, 180], [290, 180]].forEach(([x, y], i) => g.A(x - 28, y, '', {ball: true, bx: -12}).B(x + 28, y, '', {ball: true, bx: 10}).arrow('run', x - 16, y - 4, x + 14, y + 4, -10, i ? null : 1));
    return g.label(200, 128, 'face à face, chacun dribble son ballon', {s: 10, b: 1}).n(1, 'avec la main libre, on touche le genou de l\'autre sans arrêter son dribble').n(2, 'duels de 30 s, puis on change de partenaire'); },
  duelvol: g => { g.hall(); [[105, 75], [295, 75], [105, 180], [295, 180]].forEach(([x, y], i) => { g.czone(x, y, 40, '', 'blue'); [[-40, 0], [40, 0], [0, -40], [0, 40]].forEach(([a, b]) => g.disc(x + a, y + b)); g.A(x - 14, y - 6, '', {ball: true}).B(x + 14, y + 6, '', {ball: true}); if (!i) g.run(x - 6, y - 8, x + 12, y + 14, -10, 1); });
    return g.label(200, 128, 'arène de 4 m', {s: 10, b: 1}).n(1, 'faire sortir ou toucher le ballon de l\'autre en gardant le sien').n(2, '3 duels de 30 s contre 3 adversaires différents'); },
  danse: g => { g.hall(); [[100, 70], [280, 70], [100, 180], [280, 180]].forEach(([x, y], i) => g.A(x, y - 16).X(x, y + 16).run(x + 12, y - 16, x + 50, y - 16, 0, i ? null : 1).run(x + 14, y + 16, x + 50, y + 16, 0).run(x - 12, y - 16, x - 50, y - 16, 0));
    return g.label(200, 128, 'pas chassés, face à face, sans croiser les pieds', {s: 10, b: 1}).n(1, 'l\'attaquant se déplace, le défenseur le suit bras écartés').n(2, 'au sifflet, l\'attaquant sprinte 3 pas : le défenseur doit le toucher'); },
  toupie: g => { g.hall(); [[110, 80], [290, 80], [110, 180], [290, 180]].forEach(([x, y]) => g.A(x, y, '', {ball: true}).B(x + 34, y - 10).loop(x, y, 36, 28, 'run'));
    return g.label(200, 130, 'pied fixe : on pivote pour protéger le ballon', {s: 10, b: 1}).n(1, 'l\'autre tourne autour pour toucher le ballon ; 20 s puis on change'); },
  chasse: g => g.half().A(200, 110, '').B(200, 140, '').P(250, 40).ball(290, 120).run(255, 50, 285, 110, 0, 1).run(210, 110, 282, 118, -10, 2).shot(298, 120, 356, 124, 0)
    .A(170, 205).B(170, 228).ball(240, 210).label(150, 125, 'dos à dos', {s: 9.5}).n(1, 'le lanceur fait rouler le ballon').n(2, 'le 1er qui l\'attrape tire, l\'autre défend'),
  appels: g => g.hall().scatter('a', 9, 40, 40, 360, 215, {seed: 2}).ball(g.last[1][0] + 8, g.last[1][1] + 7).ball(g.last[5][0] + 8, g.last[5][1] + 7).X(250, 140, 'C').run(240, 140, g.last[4][0] + 12, g.last[4][1], 8, 1)
    .pass(g.last[5][0], g.last[5][1], g.last[4][0], g.last[4][1], 10, 2).tag(g.last[4][0], g.last[4][1] - 22, '« ici ! »', {s: 9.5})
    .n(1, 'le chat poursuit un fuyard').n(2, 'un fuyard qui tient un ballon est protégé : on lui passe vite le ballon quand il appelle'),
  course: g => g.court().A(40, 125, 'C').run(50, 125, 330, 125, 0, 1).A(60, 60, '', {ball: true}).A(120, 200).pass(70, 65, 115, 190, 0, 2).A(200, 60).pass(125, 190, 195, 70, 0).A(280, 195).pass(205, 70, 275, 185, 0).pass(285, 185, 330, 135, 0).shot(345, 125, 360, 125, 0)
    .label(200, 240, 'les 2 passeurs se déplacent avec le ballon (dessinés à plusieurs moments)', {s: 8.5}).n(1, 'le coureur sprinte d\'un panier à l\'autre').n(2, 'ses 2 coéquipiers se passent le ballon sans dribbler : il doit arriver avant le coureur, qui reçoit et marque'),
  feu: g => g.hall().P(200, 38).raw('<circle cx="232" cy="30" r="7" fill="#16a34a"/><circle cx="249" cy="30" r="7" fill="#f59f00"/><circle cx="266" cy="30" r="7" fill="#e11d48"/><circle cx="283" cy="30" r="7" fill="#1f63d6"/>', 'top')
    .scatter('a', 11, 50, 80, 350, 215, {ball: true, seed: 8}).label(60, 30, 'vert = vite · orange = bas', {s: 9, a: 'start'}).label(60, 46, 'rouge = arrêt + pivot', {s: 9, a: 'start'}).label(340, 52, 'bleu = échange de ballon', {s: 9, a: 'end'})
    .pass(g.last[2][0] + 6, g.last[2][1], g.last[3][0] - 8, g.last[3][1], 8, 1).n(1, 'au bleu, on échange son ballon avec un voisin par une passe ; le prof piège la classe'),
  passemur: g => { g.court().scatter('a', 6, 40, 40, 110, 210, {ball: true, seed: 3}); g.X(200, 60, 'M').X(200, 125, 'M').X(200, 190, 'M').run(200, 72, 200, 100, 0).run(200, 178, 200, 150, 0);
    return g.drib(100, 80, 330, 70, -10, 1).drib(80, 150, 330, 175, 10).label(200, 240, 'les murs ne quittent pas la ligne du milieu', {s: 9.5}).n(1, 'on traverse en dribble, aller puis retour : chaque traversée réussie = 1 point').n(2, 'touché = on devient mur à la manche suivante').num(200, 30, 2); },
  quatre: g => { g.court(); g.vivant(200, 15, '').vivant(200, 235, ''); g.scatter('a', 4, 70, 50, 190, 200, {seed: 3}).scatter('b', 4, 210, 50, 340, 200, {seed: 8});
    g.ball(g.last[0][0] - 50, g.last[0][1] + 7); return g.label(285, 18, '← panier vivant', {s: 8.5}).label(285, 240, '← panier vivant', {s: 8.5}).pass(g.last[0][0] - 52, g.last[0][1], 200, 40, -10, 1)
      .n(1, '4 cibles : 2 paniers + 2 paniers vivants ; on marque où on veut, on cherche le côté libre').n(2, 'le panier vivant change à chaque panier marqué').num(330, 125, 2); },
  banc: g => { g.court(); g.bench(365, 70, 365, 180); g.bench(35, 70, 35, 180); g.A(365, 100, 'B').B(35, 150, 'B'); g.scatter('a', 4, 70, 50, 190, 200, {seed: 4}).scatter('b', 4, 210, 50, 330, 200, {seed: 1});
    return g.pass(195, 110, 355, 105, -14, 1).run(195, 120, 352, 140, 18, 2).label(365, 200, 'banc A', {s: 9, b: 1}).label(35, 200, 'banc B', {s: 9, b: 1})
      .n(1, 'passe attrapée par un joueur sur le banc').n(2, 'le passeur monte le rejoindre : toute l\'équipe sur le banc = manche gagnée'); },
  couloirs: g => { g.hall(); for (let i = 0; i < 5; i++){ const y = 40 + i * 42; g.line(`M30 ${y - 21}H370`, 1.5, '#c4b59a', '4 4'); g.hoop(350, y, 13).A(50, y, '', {ball: true}).X(95, y); if (i === 1) g.drib(60, y, 330, y + 2, 0, 1); }
    g.line('M30 229H370', 1.5, '#c4b59a', '4 4'); return g.label(350, 236, 'cerceau = but', {s: 9}).n(1, 'l\'attaquant marque s\'il s\'arrête 2 pieds dans le cerceau au bout de son couloir').n(2, 'le défenseur part 1 m devant et ne touche que le ballon ; tous les couloirs en même temps').num(95, 145, 2); },
  traversee: g => { g.court(); g.line('M20 125H380', 1.5, '#c4b59a', '6 4'); g.A(50, 60, '', {ball: true}).A(120, 35).A(150, 95).A(240, 50).pass(58, 58, 114, 40, 0, 1).pass(126, 42, 146, 88, 0).pass(158, 92, 234, 56, 0).shot(250, 55, 362, 118, 10, 2);
    g.B(50, 190, '', {ball: true}).B(110, 215).B(140, 160).B(220, 205).pass(58, 192, 104, 212, 0).pass(116, 210, 136, 168, 0); return g.tag(290, 200, 'cercle = 1 · panier = 3', {s: 9.5})
      .n(1, 'on traverse uniquement en passes, sans dribble').n(2, 'on finit par un tir ; 5 départs, on bat le record de l\'équipe'); },
  vingtun: g => g.half().A(260, 90, '', {ball: true}).B(300, 110).X(305, 150).pl('g', 250, 170).drib(268, 95, 320, 112, -6, 1).shot(325, 115, 356, 122, 0).run(240, 175, 230, 210, 0, 2).label(200, 225, 'ligne : on ressort ici', {s: 9}).line('M215 40Q160 125 215 210', 2, '#c2185b', '6 4')
    .n(1, 'chacun pour soi : le porteur attaque, tous les autres défendent').n(2, 'ballon récupéré = on ressort derrière la ligne avant d\'attaquer ; premier à 11'),
  jokers: g => { g.court(); g.J(130, 18).J(270, 232); g.pls('a', [[100, 80], [170, 150], [250, 90, '', {ball: true}]]).pls('b', [[130, 110], [210, 170], [290, 120]]);
    return g.pass(250, 80, 266, 220, 20, 1).pass(130, 28, 172, 140, 10).tag(300, 18, 'jokers sur les côtés', {s: 9.5}).n(1, 'les jokers jouent avec l\'équipe qui a le ballon, sans dribbler ni tirer').n(2, 'on change de jokers toutes les 3 min'); },
  retard: g => g.court().pls('a', [[150, 70, '', {ball: true}], [180, 125], [150, 180]]).pls('x', [[310, 100], [310, 150]]).X(30, 200, '3').run(42, 196, 230, 170, 10, 2).drib(160, 72, 250, 85, -6, 1).line('M200 25V225', 3, '#e8590c', '8 5')
    .label(200, 18, 'le 3e défenseur part quand le ballon passe ici', {s: 9}).n(1, '3 attaquants contre 2 défenseurs').n(2, 'un 3e défenseur part du fond quand le ballon passe le milieu : panier avant son arrivée = 3 points'),
  chrono: g => g.court().scatter('a', 4, 210, 50, 340, 200, {seed: 3}).scatter('b', 4, 220, 60, 350, 210, {seed: 7}).ball(g.last[0][0] + 8, g.last[0][1] + 7).bord(70, 236, 3, '', 'g').chrono(40, 236)
    .tag(110, 205, '« 12, 11, 10… »', {s: 10}).n(1, 'le banc compte le temps d\'attaque à voix haute').n(2, 'pas de tir à temps = ballon à l\'adversaire ; tir qui touche le cercle = le chrono repart').num(150, 236, 1),
  silencieux: g => g.court().scatter('a', 4, 60, 50, 190, 200, {seed: 3}).scatter('b', 4, 210, 50, 340, 200, {seed: 8}).each((x, y, i) => i === 1 && g.raw(`<path d="M${x + 4} ${y - 10}v-12" stroke="#e8590c" stroke-width="3" stroke-linecap="round"/>`, 'top')).ball(110, 70)
    .tag(200, 13, '🤫 personne ne parle', {s: 10}).bord(178, 238, 3, '', 'g').n(1, 'on appelle avec la main levée, on arbitre avec les gestes officiels').n(2, 'une parole = lancer franc pour l\'adversaire'),
  rebond: g => g.half().A(230, 125, 'T', {ball: true}).shot(240, 125, 356, 125, 0, 1).A(330, 90).B(320, 165).X(300, 125).run(330, 100, 345, 115, 0, 2).label(320, 205, 'sans faute !', {s: 9.5}).vivant(160, 40, '')
    .n(1, 'le tireur tire').n(2, 'les 3 se battent pour le rebond ; celui qui l\'attrape marque, les 2 autres le gênent'),
  vagues3: g => g.court().pls('a', [[250, 70], [280, 125, '', {ball: true}], [250, 180]]).pls('b', [[300, 85], [335, 165], [300, 175]]).pls('j', [[70, 80, 'C'], [60, 125, 'C'], [70, 170, 'C']])
    .shot(290, 125, 356, 125, 0, 1).drib(310, 150, 120, 140, 10, 2).label(65, 205, 'équipe C attend', {s: 9}).n(1, 'A attaque contre B').n(2, 'B récupère et contre-attaque vers l\'autre panier où C l\'attend ; qui marque reste'),
  horloge: g => g.half().A(250, 125, 'P', {ball: true}).A(200, 60).A(310, 200).X(230, 85).X(285, 175).run(200, 60, 270, 45, -10, 1).pass(260, 115, 268, 52, -6, 2).run(310, 200, 340, 165, 10)
    .tag(240, 238, 'le porteur ne bouge pas (pivot seulement)', {s: 9.5}).n(1, 'les 2 autres attaquants se démarquent').n(2, 'passe réussie = 1 point ; à 5 points, on va marquer au panier'),
  garde: g => g.court().pls('a', [[90, 70], [150, 120], [110, 190], [180, 60, '', {ball: true}]]).pls('x', [[104, 82], [164, 132], [124, 202], [194, 72]]).pass(186, 72, 150, 108, 0)
    .tag(280, 200, 'chaque défenseur colle SON attaquant', {s: 10}).n(1, 'passe à 10 : la défense marque si son protégé ne reçoit aucune passe pendant 20 s'),
  murparle: g => g.half().pls('a', [[200, 80, '', {ball: true}], [220, 180], [320, 205]]).pls('x', [[245, 90, '', {}], [255, 170], [330, 175]]).tag(250, 50, '« j\'ai le porteur ! »', {s: 9.5}).tag(275, 140, '« écran ! »', {s: 9.5})
    .n(1, 'les défenseurs parlent : un défenseur muet = 1 point pour l\'attaque').n(2, 'ballon récupéré = 1 point pour la défense'),
  pirates: g => g.half().zone(250, 30, 125, 95, '', 'grey').zone(250, 125, 125, 95, '', 'grey').zone(170, 80, 80, 90, '', 'grey').X(310, 75).X(310, 175).X(210, 125)
    .pls('a', [[140, 60, '', {ball: true}], [140, 190], [250, 120], [220, 40]]).pass(148, 66, 214, 44, 0, 1).pass(226, 48, 245, 112, 10).shot(256, 122, 356, 125, 0, 2)
    .n(1, 'chaque défenseur garde son coin de la zone et n\'en sort pas').n(2, 'on fait tourner vite et on tire dans l\'espace libre'),
  conseiller: g => g.half().pls('a', [[230, 60, '', {ball: true}], [210, 180], [320, 205]]).pls('x', [[265, 80], [250, 170], [330, 175]]).A(70, 120, 'C').tag(70, 90, '« écran ! »', {s: 10}).sheet(70, 155)
    .n(1, 'une fois par attaque, le conseiller crie un conseil d\'un mot').n(2, 'panier en suivant le conseil = 3 points ; le conseiller change à chaque panier'),
  pickroll: g => g.half().A(210, 125, 'P', {ball: true}).X(232, 125).A(250, 105, 'E').X(300, 70).run(250, 95, 238, 112, 0, 1).drib(220, 132, 270, 160, 10, 2).run(255, 100, 330, 110, -10, 3)
    .n(1, 'l\'écraneur (E) pose l\'écran sur le défenseur du porteur').n(2, 'le porteur frôle l\'écran : tir, passe ou dribble selon la défense').n(3, 'l\'écraneur pivote et file vers le panier (roll)'),
  troisxtrois: g => g.half().line('M330 30A110 110 0 0 0 330 220', 2, '#c4b59a').pls('a', [[200, 70, '', {ball: true}], [220, 180], [320, 210]]).pls('x', [[240, 85], [255, 165], [330, 180]])
    .label(200, 125, 'ressortir derrière l\'arc', {s: 9}).tag(240, 238, 'panier = 1 · tir de loin = 2 · match à 21', {s: 9.5}).n(1, 'un seul panier, on ressort derrière l\'arc après chaque panier ou récupération').n(2, 'les joueurs annoncent eux-mêmes leurs fautes'),
  massage: g => { g.hall(); [[100, 75], [300, 75], [100, 180], [300, 180]].forEach(([x, y], i) => g.raw(`<g transform="translate(${x} ${y})"><circle cx="-34" cy="0" r="8" fill="#e8590c"/><rect x="-26" y="-7" width="48" height="14" rx="7" fill="#e8590c"/><path d="M22 -4H44M22 4H44" stroke="#e8590c" stroke-width="5" stroke-linecap="round"/></g>`, 'mid').A(x, y - 26).ball(x - 6, y - 2).arrow('run', x - 20, y - 12, x + 20, y - 12, 0, i ? null : 1));
    return g.label(200, 130, 'le ballon roule doucement sur le dos', {s: 10, b: 1}).n(1, 'l\'un est allongé, l\'autre fait rouler le ballon en racontant son meilleur moment').n(2, '1 min 30 puis on change ; étirements des épaules et des poignets'); },
  arbitre: g => { g.hall().ring('a', 9, 200, 160, 150, 70, {a0: Math.PI * 1.1}); g.P(200, 70); return g.tag(200, 40, 'marcher ? reprise ? contact ?', {s: 10}).label(200, 175, 'la classe fait le geste de l\'arbitre', {s: 10, b: 1})
      .n(1, 'le prof mime une faute, la classe fait le geste officiel').n(2, 'puis l\'inverse : le prof fait le geste, un élève mime la faute'); },
  doigt: g => g.hall().scatter('a', 10, 40, 40, 360, 215, {seed: 13}).each((x, y) => g.raw(`<path d="M${x + 10} ${y - 4}v-14" stroke="#1f63d6" stroke-width="2.5" stroke-linecap="round"/>`, 'top').ball(x + 10, y - 22).raw(`<path d="M${x + 2} ${y - 22}a8 4 0 1 0 16 0" fill="none" stroke="#7a3a10" stroke-width="1" stroke-dasharray="2 2"/>`, 'top'))
    .n(1, 'faire tourner le ballon sur un doigt, puis autour de la taille les yeux fermés').n(2, 'étirements des poignets, des épaules et des mollets'),

  'Les phases finales': g => { g.terrains(2, {goals: 'basket', labs: ['finale 🏆', 'match pour la 3e place'], h: 190, y0: 12}); g.T.forEach(([x, y, w, h]) => g.scatter('a', 4, x + 15, y + 30, x + w / 2 - 8, y + h - 15, {seed: 3}).scatter('b', 4, x + w / 2 + 8, y + 30, x + w - 15, y + h - 15, {seed: 5}));
    return g.bord(60, 232, 3, '', 'g').sheet(150, 232).chrono(175, 232).label(270, 232, 'au repos : arbitres, table, chrono', {s: 9}).n(1, 'toutes les places se jouent : tout le monde joue autant'); },
  crocos: g => g.court().zone(150, 30, 100, 190, 'rivière', 'blue', {top: 1}).X(185, 90, 'C').X(215, 150, 'C').X(195, 200, 'C')
    .row('a', 4, 45, 70, 45, 200, {ball: true}).each((x, y, i) => g.drib(x + 10, y, 345, y + (i - 1.5) * 6, 0, i === 0 ? 1 : null)).tag(200, 243, '« Marée haute ! » : on traverse en dribble', {s: 10})
    .n(1, 'au signal, on traverse d\'une ligne de fond à l\'autre en dribble').n(2, 'touché par un crocodile = on devient crocodile (en gardant son ballon)').run(208, 152, 290, 175, 10, 2),
  roi: g => g.hall().zone(90, 40, 220, 170, 'carré de cônes', 'blue', {top: 1}).cone(90, 40).cone(310, 40).cone(310, 210).cone(90, 210)
    .scatter('a', 8, 110, 60, 290, 195, {ball: true, seed: 8}).X(250, 120, '', {}).run(245, 128, 225, 150, 6, 1).zone(320, 70, 70, 110, 'défi', 'yellow').A(355, 150, '', {ball: true})
    .zone(130, 70, 140, 110, '', 'grey').label(200, 230, 'toutes les 2 min, le carré rétrécit', {s: 9.5, it: 1})
    .n(1, 'on fait sortir le ballon des autres en protégeant le sien').n(2, 'ballon perdu : défi au bord (3 paniers ou 10 dribbles main faible), puis on revient').num(355, 95, 2),
  knock: g => g.half().pls('a', [[240, 165], [218, 185], [196, 205]]).A(285, 140, '1', {ball: true}).A(255, 105, '2', {ball: true}).shot(295, 138, 356, 127, 0, 1).shot(265, 103, 356, 120, -12, 2)
    .vivant(150, 60, '').label(150, 98, 'un autre groupe au panier vivant', {s: 8.5}).tag(240, 236, 'groupes de 4 ou 5 par cible', {s: 9.5})
    .n(1, 'le 1er tire').n(2, 'le 2e tire dès que le 1er a lâché ; s\'il marque avant, le 1er sort (3 paniers au panier voisin puis revient)'),
  morpion: g => { g.hall(); for (let i = 0; i < 9; i++) g.hoop(150 + (i % 3) * 30, 95 + Math.floor(i / 3) * 30, 12); g.chasuble(150, 95, '#1f63d6').chasuble(180, 125, '#1f63d6').chasuble(210, 95, '#e8590c');
    g.hoopB(370, 125, 1).pls('a', [[300, 95, '', {ball: true}], [255, 70], [255, 45]]).pls('b', [[300, 155, '', {ball: true}], [255, 180], [255, 205]]).shot(308, 95, 360, 120, 0, 1).shot(308, 155, 360, 130, 0).run(250, 80, 215, 120, 10, 2);
    return g.label(180, 190, 'grille de 9 cerceaux', {s: 9.5}).label(110, 236, '(même jeu aux autres cibles)', {s: 9, it: 1}).n(1, 'deux équipes de 3 tirent en même temps, chacune son ballon').n(2, 'panier = on court poser une chasuble ; 3 alignées = manche gagnée'); },
  minute: g => g.half().zone(275, 92, 105, 66, '', 'green').label(328, 86, '1 pt', {s: 10, b: 1}).label(240, 60, '2 pts', {s: 10, b: 1}).label(170, 40, '3 pts', {s: 10, b: 1})
    .A(300, 145, '', {ball: true}).A(240, 85, '').A(185, 170).A(345, 175).shot(308, 142, 356, 128, 0, 1).pass(340, 168, 196, 170, 18, 2).chrono(150, 85).label(150, 108, '1 minute', {s: 9})
    .n(1, 'proche = 1, mi-distance = 2, hors raquette = 3 points').n(2, 'on prend son rebond et on rend le ballon au suivant'),
  m3: g => g.half().pls('a', [[230, 60, '', {ball: true}], [210, 180], [320, 205]]).pls('x', [[265, 80], [250, 170], [330, 175]]).pass(236, 70, 214, 168, 14, 1).run(320, 196, 345, 150, -10, 2)
    .row('g', 3, 45, 100, 45, 160).label(55, 70, 'au bord :', {s: 9, b: 1}).label(55, 84, 'arbitre, marqueur', {s: 9})
    .n(1, '3 contre 3 sur un demi-terrain').n(2, 'ballon gagné en défense : on ressort derrière la ligne des 3 points avant d\'attaquer'),
  silence: g => g.half().ring('a', 9, 270, 125, 70, 88, {a0: Math.PI / 2}).A(275, 125, '', {ball: true}).shot(286, 125, 356, 125, 0).tag(245, 12, 'silence : on compte à voix basse', {s: 10}).label(275, 145, 'lancer franc', {s: 9}),
  'Concours de lancers francs': g => g.half().ring('a', 8, 270, 125, 70, 88, {a0: Math.PI / 2}).A(275, 125, '', {ball: true}).shot(286, 125, 356, 125, 0).tag(245, 12, 'record de la classe : un essai chacun', {s: 10}),
  rapide: g => g.half().A(130, 90, '1', {ball: true}).B(130, 160, '2', {ball: true}).drib(140, 88, 300, 100, -8, 1).drib(140, 162, 300, 150, 8).shot(310, 105, 356, 122, 0, 2).shot(310, 145, 356, 128, 0)
    .pls('g', [[230, 205], [260, 205]]).label(245, 12, 'les 2 autres renvoient les ballons et arbitrent (gris)', {s: 9}).n(1, 'départ en même temps du milieu, chacun son ballon').n(2, 'le premier qui marque gagne la manche'),
  carte: g => { g.half(); [[318, 155, '1 pt'], [265, 80, '2 pts'], [200, 165, '3 pts']].forEach(([x, y, t]) => g.hoop(x, y, 15).label(x, y - 22, t, {s: 9.5, b: 1}));
    return g.A(265, 80, 'T', {ball: true}).shot(276, 84, 355, 120, -6, 1).A(345, 195, 'R').pass(338, 188, 160, 100, 25, 2).A(160, 90, 'P').A(150, 210, 'C').sheet(172, 210)
      .n(1, 'le tireur (T) choisit son cerceau : 1, 2 ou 3 points').n(2, 'rôles tournants : rebondeur (R), passeur (P), compteur (C) ; 5 tirs chacun'); },
  defi2: g => { g.half(); g.line('M110 25V225', 3, '#e8590c', '8 5'); [[130, 60], [130, 110], [130, 160], [130, 205]].forEach(([x, y], i) => { g.A(x, y, '', {ball: true}); if (i === 1) g.drib(140, y, 300, 115, -6).run(330, 140, 145, 158, 35); });
    return g.shot(305, 112, 356, 122, 0).num(220, 98, 1).num(240, 175, 2).chrono(70, 40).label(70, 62, '2 min', {s: 9}).n(1, 'tous en même temps : dribble, panier en course').n(2, 'on reprend son ballon et on retourne toucher la ligne du milieu ; on compte les paniers de l\'équipe'); },
  deuxdeux: g => g.half().pls('a', [[230, 80, '', {ball: true}], [260, 180]]).pls('x', [[270, 95], [295, 165]]).pls('b', [[372, 45], [372, 205]]).pass(238, 86, 254, 172, 10, 1).label(340, 236, 'duo en attente (carrés)', {s: 9})
    .n(1, '2 contre 2 : le duo qui marque reste en attaque').n(2, 'le duo qui perd sort, le duo en attente entre en défense').num(350, 45, 2),
  facteur: g => g.half().A(190, 160, '', {ball: true}).A(260, 60, 'F').pass(200, 155, 255, 70, -10, 1).run(198, 168, 320, 150, 12, 2).pass(268, 66, 318, 140, -8, 3).shot(325, 140, 355, 128, 0).A(352, 175, 'R')
    .A(180, 90, '', {ball: true}).A(240, 205, 'F').label(245, 12, 'plusieurs trios en même temps sur chaque moitié', {s: 9}).n(1, 'je passe au facteur (camarade fixe)').n(2, 'je cours vers le panier').n(3, 'le facteur me rend le ballon en course, je marque ; R ramasse et devient tireur'),
  ultimate: g => { g.court(); g.zone(296, 92, 84, 66, '', 'green').label(338, 86, 'en-but A', {s: 9, b: 1}); g.zone(20, 92, 84, 66, '', 'orange').label(62, 86, 'en-but B', {s: 9, b: 1}); g.pls('b', [[130, 60], [170, 180], [250, 110], [300, 190]]).pls('a', [[90, 150], [180, 100], [300, 60]]);
    return g.A(240, 70, '', {ball: true}).A(320, 130).pass(248, 74, 314, 124, -8, 1).tag(160, 238, 'pas de dribble · 3 s pour passer', {s: 9.5})
      .n(1, 'passe attrapée dans l\'en-but = 1 point ; panier juste après = 2 points').n(2, 'ballon tombé ou intercepté = il change de camp'); },
  iles: g => { g.court('salle', {none: 1}); [[90, 60], [90, 190], [200, 125], [310, 60], [310, 190], [160, 200]].forEach(([x, y]) => g.hoop(x, y, 15));
    g.pls('a', [[310, 60], [140, 110], [250, 175, '', {ball: true}], [60, 130]]).pls('b', [[280, 80], [180, 70], [230, 140], [120, 170]]);
    return g.pass(254, 165, 306, 72, -10, 1).label(345, 92, 'arrêt 2 pieds', {s: 9}).tag(200, 238, 'pas 2 fois de suite la même île', {s: 9.5})
      .n(1, 'passe reçue avec un arrêt 2 pieds dans une île = 1 point').n(2, 'personne ne reste plus de 3 s dans une île'); },
  surnombre: g => g.court().pls('a', [[230, 70, '', {ball: true}], [260, 140], [200, 190], [150, 110]]).pls('b', [[280, 80], [300, 150], [250, 200], [210, 120]]).J(320, 110).pass(238, 74, 314, 106, -8, 1).drib(150, 110, 260, 100, -6)
    .tag(200, 238, 'joker : seulement pour l\'équipe qui vient de récupérer', {s: 9}).n(1, 'l\'équipe qui récupère joue à 5 contre 4 jusqu\'au tir ; le joker ne tire pas'),
  statue: g => { g.hall().pls('a', [[70, 60], [300, 200], [340, 70], [90, 200], [200, 210]]).pls('g', [[170, 110, 'S'], [270, 150, 'S'], [270, 60, 'S']]).X(110, 150, 'C').A(205, 95);
    return g.run(120, 140, 150, 115, 10, 1).run(212, 88, 245, 70, -6).label(170, 138, 'statue', {s: 9}).tag(200, 238, 'le chat contourne la statue : c\'est un écran', {s: 9.5}).n(1, 'le fuyard se cache derrière une statue (gris), le chat doit la contourner').n(2, 'le prof change les statues toutes les 30 s'); },
  couloirs3: g => { g.court(); g.line('M20 92H380M20 158H380', 2, '#e8590c', '8 5'); g.label(160, 40, 'couloir gauche', {s: 9}).label(160, 110, 'centre', {s: 9}).label(160, 215, 'couloir droit', {s: 9});
    return g.pls('a', [[230, 55, '', {ball: true}], [215, 130], [250, 195]]).pls('x', [[275, 70], [260, 135], [295, 180]]).pass(238, 62, 244, 186, 40, 1).shot(258, 196, 360, 132, 10, 2)
      .n(1, 'en attaque, toujours un joueur dans chaque couloir').n(2, 'panier marqué depuis un couloir de côté = 2 points'); },
  sumo: g => { g.hall(); [[110, 80], [290, 80], [110, 185], [290, 185]].forEach(([x, y], i) => g.ball(x + 32, y).A(x, y).B(x - 22, y).run(x - 6, y - 12, x - 18, y - 12, 0).arrow('run', x - 26, y + 12, x - 10, y + 16, 0, i ? null : 1));
    return g.label(200, 132, 'le rond regarde le ballon, dos à son adversaire', {s: 10, b: 1}).n(1, 'le rond garde l\'autre derrière lui 3 s, fesses en arrière, bras écartés, sans pousser').n(2, 'réussi = il ramasse le ballon : 1 point ; 5 essais puis on inverse'); },
  couleurs: g => g.court().J(36, 236, '').raw('<rect x="46" y="226" width="10" height="16" rx="2" fill="#e11d48"/>', 'top').label(110, 238, 'rouge · bleu · jaune', {s: 9})
    .scatter('a', 4, 210, 50, 340, 200, {seed: 3}).scatter('b', 4, 220, 60, 350, 210, {seed: 7}).ball(g.last[0][0] + 8, g.last[0][1] + 7)
    .n(1, 'rouge = tir en moins de 5 s · bleu = 3 passes avant de tirer · jaune = pick and roll').n(2, 'code respecté + panier = 2 points ; panier hors code = 1')
};
