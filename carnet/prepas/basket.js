/* Basket-ball en jeux : 6 leçons par année (1re → 6e secondaire), la 6e = évaluation.
   Format « jeux » (voir carnet/prepa-moteur.js) : catalogue J + leçons [clé, minutes pour 2 h, consigne du jour, réussite, variante, schéma?, organisation?].
   Esprit (Kevin, 26/10) : on apprend en jouant. Chaque leçon mélange opposition, coopération et fair-play ; les débutants
   prennent du plaisir et les confirmés sont défiés. {2 h|1 h} : exigence en 2 h | en 1 h. */
PREPA_JEUX({id: 'basket', sport: 'Basket-ball',
mat: [['ballon de basket', 1, 'basket'], ['jeu de chasubles', 4, 'chasubles'], ['cône', 12, 'cones'], ['coupelle', 20, 'plots'], ['cerceau', 10, 'cerceaux'], ['sifflet et chrono']],
sal: {
  tk: {cible: 'le panier', terrain: 'la moitié du terrain'},
  g: {m: 3, tk: {cible: 'le panier'}, note: '2 demi-terrains avec panier + 1 terrain en largeur avec un « panier vivant » (un élève debout sur un banc tient un cerceau à bout de bras). On tourne pour que chaque équipe joue aussi sur un vrai panier.'},
  p: {m: 2, tk: {cible: 'le panier vivant (élève debout sur un plinth, cerceau à bout de bras)', terrain: 'la salle'}, note: 'pas de panier : 2 terrains en largeur, à chaque bout un « panier vivant » (un élève debout sur un plinth tient un cerceau à bout de bras, il change à chaque panier). Les tirs se travaillent aussi sur les gros tapis debout (cible scotchée).', warn: 'Petite salle : très bien pour les passes, le démarquage et les petits matchs ; pour le tir, on vise les paniers vivants.'},
  b: {m: 2, tk: {cible: 'le panier', terrain: 'la moitié du terrain'}, note: 'petit terrain à 2 paniers : 2 demi-terrains en même temps, les équipes au bord arbitrent depuis les bancs.'},
  c: {m: 2, tk: {cible: 'l\'anneau', terrain: 'la moitié du terrain de mini-foot'}, note: 'les 2 anneaux du terrain de mini-foot = 2 demi-terrains ; la 2e zone (sans tracé) accueille les jeux sans panier et les équipes en attente.', warn: 'Dehors : vérifier que le sol n\'est pas glissant, ballons un peu moins gonflés s\'il fait froid.'}
},
J: {
  // ===== mise en train (échauffement en jeu) =====
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
  // ===== jeux du corps de leçon =====
  roi: {n: 'Le roi du dribble', k: 'opp', s: 'voleurs', d: 'Chacun dribble dans un carré de cônes et essaie de faire sortir le ballon des autres tout en protégeant le sien (le corps entre le ballon et l\'adversaire). Qui perd son ballon fait un défi au bord (3 paniers ou 10 dribbles main faible) et revient. Toutes les 2 min, le carré rétrécit.'},
  relaislom: {n: 'Le relais des dribbleurs', k: 'opp', s: 'slalom:basket', f: 'e4', d: 'En colonnes : slalom entre 5 cônes en dribble, tour du dernier cône, retour en sprint-dribble et tape dans la main du suivant. Toucher un cône = revenir le contourner.'},
  taureau: {n: 'Le taureau', k: 'opp', s: 'carre:basket:2', f: 'g6', d: 'Cercle de 5-6 avec 1 ou 2 « taureaux » au centre. Le cercle se passe le ballon ; si un taureau touche le ballon, il prend la place du passeur fautif. Passe au voisin direct interdite.'},
  dixpasses: {n: 'La passe à 10', k: 'opp', s: 'match:basket:4c4', f: 'm4', d: 'Deux équipes dans {terrain}. 10 passes à la suite sans interception = 1 point, comptées à voix haute par toute l\'équipe. Pas de contact, pas de marcher ; le ballon tombé ou volé change de camp et on repart à 0.'},
  capitaine: {n: 'La balle au capitaine', k: 'coop', s: 'match:basket:4c4', f: 'm4', d: 'Chaque équipe a un capitaine debout dans un cerceau (ou sur un banc) derrière la ligne de fond adverse. Une passe attrapée par son capitaine = 1 point, et le passeur devient capitaine. Dribble limité à 3 rebonds.'},
  chateau: {n: 'Le château', k: 'opp', s: 'cercle', f: 'g8', d: 'Un cône sur un plot au centre d\'un grand cercle de coupelles, gardé par 1 ou 2 défenseurs (qui ne rentrent pas dans le cercle). Les attaquants autour se font des passes rapides pour déséquilibrer la défense et tirer à hauteur de poitrine sur le château. Château tombé = le tireur devient défenseur.'},
  knock: {n: 'Le knock-out', k: 'opp', s: 'tir', f: 'g8', d: 'Une colonne devant {cible}, les 2 premiers avec un ballon. Le 1er tire ; le 2e tire dès que le 1er a lâché le ballon. Si le 2e marque avant le 1er, le 1er est « knock-out » : il va au panier voisin faire 3 paniers et revient dans la partie (personne n\'attend longtemps).'},
  morpion: {n: 'Le morpion du basket', k: 'opp', s: 'tir:basket', f: 'e2', d: '9 cerceaux en grille de morpion à mi-terrain. Deux équipes en colonne, une couleur de chasubles chacune. Le 1er tire : panier = il court poser une chasuble dans un cerceau. Raté = il revient taper la main du suivant. 3 chasubles alignées = manche gagnée. Une fois les 3 chasubles posées, on déplace les siennes.'},
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
  // ===== retour au calme =====
  silence: {n: 'Le lancer franc du silence', k: 'coop', s: 'tir', d: 'Toute la classe en silence autour des paniers : chacun a un lancer franc, la classe compte les réussites à voix basse. On cherche à battre le record de la classe. Puis étirements (mollets, cuisses, épaules) et un mot sur la leçon.'},
  bilan: {n: 'Le pouce et le mot', k: 'fp', s: 'etirements', d: 'En cercle, étirements guidés. Chacun montre son pouce (en haut, au milieu, en bas) : « j\'ai appris », « j\'ai pris du plaisir ». Chaque équipe cite un geste fair-play vu chez l\'adversaire.'},
  aveugle: {n: 'Dribble les yeux fermés', k: 'coop', s: 'cercle', d: 'En cercle, dribble sur place les yeux fermés : main droite, main gauche, puis en changeant de main au signal. Le ballon s\'échappe ? On le récupère sans bruit. Puis étirements des poignets, des épaules et des mollets.'}
},
an: {
1: {th: 'Découvrir le basket en jouant : dribbler, passer, tirer et jouer à 3 contre 3', comp: ['HME2', 'HME4', 'HSC1', 'HSC3'], l: [
  {t: 'Garder son ballon : le dribble', o: 'Dribbler main droite et main gauche en levant la tête et en protégeant son ballon.',
   e: [['voleurs', 6, 'Au début, les voleurs marchent ; ensuite ils courent.'], ['chef', 7, 'Main faible obligatoire pendant la dernière minute.']],
   c: [['crocos', 15, 'On regarde les crocodiles, pas son ballon : c\'est comme ça qu\'on les évite.', 'Je traverse {3|2} fois sans être touché.', 'Les crocodiles dribblent aussi.'],
    ['roi', 16, 'Le corps entre le ballon et l\'adversaire, dribble bas quand on est attaqué.', 'Je garde mon ballon {40|30} secondes sans le perdre.', 'Main faible imposée pendant 1 min.'],
    ['relaislom', 15, 'Main droite à l\'aller, main gauche au retour.', 'Mon équipe finit sans aucun cône touché.', 'Le dernier cône devient un tir : on revient quand on a marqué.']],
   x: [['demenage', 15, 'Les ballons se transportent uniquement en dribble.', 'Je ramène {4|3} ballons sans en perdre un.', 'Interdit de prendre deux fois dans le même coin.']],
   r: [['aveugle', 7]]},
  {t: 'Passer et recevoir', o: 'Faire une passe à deux mains qui arrive dans les mains du partenaire ; recevoir bras tendus, mains en coupe.',
   e: [['atomes', 6, 'Quand le groupe est formé, 5 passes au sol avant de repartir.'], ['roue', 7, 'Passe à deux mains poitrine, puis passe à terre.']],
   c: [['taureau', 15, 'Des passes rapides et précises font tourner le taureau en bourrique !', 'Le taureau reste {2|1} min au centre sans toucher le ballon.', 'Passe à terre uniquement.'],
    ['dixpasses', 16, 'Pour recevoir, je me place là où le passeur me voit.', 'Mon équipe réussit {2|1} fois 10 passes.', '6 passes si la classe peine ; 2 dribbles autorisés.'],
    ['capitaine', 15, 'On lève les yeux avant de passer : où est mon capitaine ?', 'Je fais au moins une passe au capitaine.', 'Le capitaine doit attraper sans sortir de son cerceau.']],
   x: [['cartes', 15, 'Le panier ne compte qu\'après 3 passes.', 'Mon équipe marque après 3 passes au moins {2|1} fois.', 'Les cartes sont choisies par l\'arbitre.']],
   r: [['passenom', 7]]},
  {t: 'Tirer au panier', o: 'Tirer à une main, coude sous le ballon, en choisissant une distance où l\'on réussit.',
   e: [['voleurs', 6, 'Le voleur qui chipe un ballon tire tout de suite au panier avant de rejoindre les dribbleurs.'], ['tourmonde', 7, 'Coupelles proches du panier : on prend confiance.']],
   c: [['knock', 15, 'Coude sous le ballon, poignet cassé vers {cible}, on utilise la planche en diagonale.', 'Je reste {2|1} manches sans être knock-out.', 'Les débutants tirent d\'un pas plus près.'],
    ['morpion', 16, 'Avant de tirer, on s\'arrête équilibré (2 pieds).', 'Mon équipe gagne au moins une manche.', 'Un panier de loin donne le droit de poser 2 chasubles.'],
    ['minute', 15, 'Chacun choisit sa distance : 1, 2 ou 3 points.', 'Mon équipe bat son premier score.', 'On ne peut pas tirer 2 fois de suite du même endroit.']],
   x: [['m3', 15, 'Panier après 3 passes ; un panier hors de la raquette vaut 2 points.', 'Je tente au moins 2 tirs dans le match.', 'Panier vivant à hauteur variable pour les débutants.']],
   r: [['silence', 7]]},
  {t: 'Jouer ensemble vers le panier', o: 'Passer à un partenaire libre et avancer vers le panier pour marquer en équipe.',
   e: [['pegobol', 6, 'Le porteur ne court pas : les chasseurs doivent se placer.'], ['miroir', 7, 'L\'ombre ajoute une passe à son meneur au sifflet.']],
   c: [['chateau', 15, 'On fait vite tourner le ballon pour trouver le côté libre.', 'Mon équipe fait tomber le château {3|2} fois.', 'Deux châteaux, deux défenseurs.'],
    ['capitaine', 16, 'Le capitaine est maintenant sous {cible} : il marque, ou il tire après avoir reçu.', 'Je fais une passe décisive au capitaine.', 'Le capitaine change à chaque point.'],
    ['m3', 15, 'Panier après 3 passes.', 'Je reçois au moins {3|2} passes dans le match.', 'Les plus forts n\'ont droit qu\'à 1 dribble.']],
   x: [['roiterrain', 15, 'On garde la règle des 3 passes.', 'Mon équipe monte au moins une fois.', 'L\'équipe qui monte choisit sa carte coup de pouce.']],
   r: [['bilan', 7]]},
  {t: 'Les règles en jouant', o: 'Jouer sans marcher ni reprise de dribble, arbitrer un match avec les bons gestes.',
   e: [['crocos', 6, 'Un croco touché commet une faute (marcher) ? Le joueur est libre !'], ['roue', 7, 'On ajoute un pivot avant de passer.']],
   c: [['fairplay', 16, 'Avant le match : 3 gestes d\'arbitre (marcher, reprise de dribble, faute de contact).', 'Je lève la main quand je fais une faute.', 'Chaque équipe prend un « temps mort » pour parler stratégie.'],
    ['cartes', 15, 'On arbitre seul : l\'équipe au bord a un arbitre par demi-terrain.', 'J\'arbitre avec les bons gestes.', 'Si l\'arbitre hésite, on rejoue le ballon à l\'entre-deux.'],
    ['chat3', 15, 'Tirs inventés : sous {cible}, en course, de loin…', 'Je n\'ai pas toutes les lettres.', 'Le tir inventé doit avoir un dribble avant.']],
   x: [['roiterrain', 15, 'Chaque montée gagne aussi 1 point fair-play si l\'équipe a respecté l\'arbitre.', 'Mon équipe finit avec un point fair-play.', 'Matchs de 3 min à durée fixe au lieu de 2 paniers.']],
   r: [['bilan', 7]]},
  {t: 'Évaluation : le défi du dribbleur, le concours de tirs et le match', o: 'Montrer ses progrès en dribble, en tir et dans le jeu à 3 contre 3.',
   crit: [['Défi du dribbleur', 4, '4 : slalom sans faute, tête levée, main droite à l\'aller et gauche au retour · 3 : sans faute mais regarde son ballon · 2 : une faute (cône, ballon perdu) · 1 : plusieurs fautes · 0 : ne termine pas'], ['Concours de tirs', 6, 'Réussites sur 8 tirs (5 à 2 points, 3 lancers francs) : 6 et plus = 6 · 5 = 5 · 4 = 4 · 3 = 3 · 2 = 2 · 1 = 1'], ['Match : passer et se placer', 5, '5 : se place pour recevoir et passe au partenaire libre · 3 : participe quand le ballon vient à lui · 1 : reste loin du jeu'], ['Match : règles et fair-play', 5, '5 : sans marcher ni reprise de dribble, accepte l\'arbitre et félicite · 3 : quelques fautes, accepte · 1 : fautes répétées ou contestations']],
   e: [['voleurs', 6], ['tourmonde', 7, 'Pour se régler avant le concours.']],
   c: [['Épreuve 1 : le défi du dribbleur', 15, 'Slalom de 5 cônes main droite à l\'aller, main gauche au retour, puis tir. 2 essais, le meilleur compte. Les élèves en attente jouent au knock-out sur l\'autre panier.', '', '', 'slalom:basket', 'g4'],
    ['Épreuve 2 : le concours de tirs', 15, '5 tirs à 2 points (où l\'on veut autour de la raquette) puis 3 lancers francs. Un camarade compte et note.', '', '', 'tir:basket', 'g4'],
    ['Épreuve 3 : le match observé', 20, 'Matchs 3 contre 3 de 5 min, panier après 3 passes. Le prof observe avec la grille ; les équipes au bord arbitrent.', '', '', 'demi:basket:3c3', 'm3']],
   r: [['bilan', 6, 'On annonce le record de la classe au lancer franc et on félicite les meilleurs progrès.']]}
]},
2: {th: 'Avancer vers le panier : double pas, passe et va, démarquage', comp: ['HME2', 'HME4', 'HSC1', 'HSC2'], l: [
  {t: 'Le double pas en jeu', o: 'Enchaîner dribble, deux appuis (droite-gauche à droite) et tir en course près du panier.',
   e: [['voleurs', 6, 'Les voleurs ont aussi un ballon.'], ['miroir', 7, 'Le meneur montre « 1-2-saute » sans ballon, l\'ombre répète.']],
   c: [['Le chemin des cerceaux', 15, 'Deux cerceaux au sol avant {cible} : on dribble, on prend le ballon à 2 mains en posant le pied dans le 1er cerceau (droit à droite), le 2e pied dans le 2e cerceau, on saute et on dépose le ballon. Les cerceaux disparaissent quand c\'est acquis.', 'Je réussis {4|3} doubles pas sur 5 sans marcher.', 'Côté gauche : gauche-droite et main gauche.', 'slalom:basket', 'g4'],
    ['knock', 15, 'Le knock-out se joue maintenant en double pas, départ de la ligne des 3 points.', 'Je ne suis jamais knock-out sur une manche.', 'Seuls les paniers de la main faible comptent sur la dernière manche.'],
    ['Le relais du double pas', 16, 'Deux équipes, une par panier : chacun part du milieu de terrain en dribble, double pas, rebond, passe au suivant. Panier = 1 point. Première équipe à {15|10} paniers gagne.', 'Mon équipe gagne une manche.', 'Panier en double pas main faible = 2 points.', 'files', 'e2']],
   x: [['m3', 15, 'Un panier marqué en double pas vaut 3 points.', 'Je tente au moins un double pas dans le match.', 'Le défenseur commence assis : il se lève quand l\'attaquant passe la ligne des 3 points.']],
   r: [['silence', 7]]},
  {t: 'Passe et va', o: 'Après avoir passé, couper vers le panier pour recevoir de nouveau.',
   e: [['atomes', 6, 'Par 2 : une passe et on court se placer ailleurs.'], ['roue', 7, 'Après la passe, on change de place dans le cercle.']],
   c: [['Le passe et va du facteur', 15, 'Par trois sur un demi-terrain : je passe au facteur (un camarade fixe), je cours vers {cible}, le facteur me rend le ballon, je marque. Le facteur change après 3 passages.', 'Je reçois en course sans m\'arrêter {4|3} fois sur 5.', 'Un défenseur passif suit le coupeur.', 'demi:basket:2c1', 'g3'],
    ['deuxun', 16, 'Le passeur coupe vers {cible} dès qu\'il a passé.', 'Notre duo marque {3|2} fois sur 5.', 'Le défenseur peut jouer à fond.'],
    ['capitaine', 15, 'Point double si le passeur au capitaine coupe et reçoit la balle de retour.', 'Je fais un passe et va réussi.', 'Capitaine mobile sur la ligne de fond.']],
   x: [['cartes', 15, 'Panier après « passe et va » = 3 points.', 'Mon équipe marque un panier après passe et va.', 'Carte bonus : l\'équipe menée joue à 4 contre 3.']],
   r: [['bilan', 7]]},
  {t: 'Se démarquer', o: 'Se déplacer dans un espace libre, loin de son défenseur, pour être vu par le porteur.',
   e: [['pegobol', 6], ['Le chat aux appels', 7, 'Jeu de poursuite où chaque fuyard tenant un ballon est protégé. Les fuyards se passent vite les ballons pour protéger celui qui est en danger (il appelle « ici ! »).', '', '', 'chat']],
   c: [['dixpasses', 15, 'On ne passe pas deux fois au même joueur de suite : il faut bouger !', 'Je reçois au moins {6|4} passes.', 'Le porteur ne peut pas dribbler.'],
    ['L\'horloge du démarquage', 15, 'Sur un demi-terrain, 3 attaquants contre 2 défenseurs ; le porteur ne bouge pas (pivot uniquement). Les 2 autres se démarquent : passe réussie = 1 point. 5 points = on marque au panier. On tourne toutes les 2 min.', 'Je me démarque pour recevoir {3|2} fois par tour.', 'Les défenseurs peuvent intercepter : point pour eux.', 'demi:basket:3c2', 'g5'],
    ['m3', 16, 'Interdiction de rester immobile plus de 3 secondes sans ballon.', 'Je me démarque à l\'opposé de mon défenseur.', 'Panier après passe d\'un joueur qui vient de recevoir en mouvement = 3 points.']],
   x: [['roiterrain', 15, 'On garde la règle des 3 secondes immobile.', 'Mon équipe monte au moins une fois.', 'Matchs en 3 paniers gagnants.']],
   r: [['aveugle', 7]]},
  {t: 'Arrêt, pivot et passe', o: 'S\'arrêter équilibré et pivoter pour protéger le ballon et trouver un partenaire.',
   e: [['chef', 6, 'Poing fermé = arrêt 2 pieds puis pivot d\'un demi-tour.'], ['La toupie', 7, 'Par deux, un ballon : l\'un pivote (pied fixe) pour protéger le ballon, l\'autre tourne autour pour le toucher. 20 secondes puis on change.', '', '', 'deux', 'p']],
   c: [['taureau', 15, 'Le porteur pivote pour éviter le taureau avant de passer.', 'Je pivote avant de passer sans marcher.', 'Le taureau peut sortir du cercle.'],
    ['chateau', 15, 'Le tireur doit d\'abord faire un pivot.', 'Mon équipe fait tomber le château.', '3 défenseurs, cercle plus grand.'],
    ['m4', 16, 'Arrêt 2 pieds obligatoire avant chaque passe : sinon le ballon change de camp.', 'Je ne commets aucun marcher.', 'Les arbitres comptent les marchers de chaque équipe.']],
   x: [['fairplay', 15, 'Les marchers reconnus par le joueur lui-même ne coûtent rien.', 'Je reconnais ma faute en levant la main.', 'Le capitaine de l\'équipe fair-play choisit l\'équipe suivante.']],
   r: [['bilan', 7]]},
  {t: 'Tournoi du double pas', o: 'Utiliser le double pas, le passe et va et le démarquage dans un tournoi arbitré par les élèves.',
   e: [['crocos', 6, 'Un croco ne peut toucher qu\'un dribbleur qui regarde son ballon (sinon il est intouchable).'], ['tourmonde', 7, 'Aller-retour en double pas d\'un côté, tir de l\'autre.']],
   c: [['roiterrain', 18, 'Panier en double pas = 2 points.', 'Mon équipe gagne un match.', 'L\'équipe qui monte doit gagner par 2 paniers d\'écart.'],
    ['cartes', 16, 'On arbitre sans le prof.', 'J\'arbitre un match entier avec les bons gestes.', 'Chaque équipe a 1 temps mort.'],
    ['chat3', 12, 'Seuls les doubles pas inventés comptent (main faible, de loin…).', 'Je finis avec moins de 3 lettres.', 'C-H-A-T devient B-A-S-K-E-T.']],
   x: [['fairplay', 15, 'Finale : les 2 meilleures équipes contre les 2 équipes les plus fair-play.', 'Je félicite mon adversaire à la fin.', 'Le public au bord vote l\'action du jour.']],
   r: [['silence', 7]]},
  {t: 'Évaluation : double pas et jeu à 3 contre 3', o: 'Réussir un double pas en course et jouer en se démarquant.',
   crit: [['Parcours : dribble et réception en course', 4, '4 : slalom sans faute et reçoit en course sans s\'arrêter · 2 : s\'arrête pour recevoir ou 1 faute · 0 : plusieurs fautes'], ['Double pas', 6, '6 : rythme correct sans marcher et panier · 4 : rythme correct, panier raté · 2 : s\'arrête avant de tirer · 0 : pas de double pas'], ['Match : démarquage', 4, '4 : se démarque sans cesse dans un espace libre · 2 : parfois · 0 : reste derrière son défenseur'], ['Match : passe et va', 3, '3 : passe et coupe plusieurs fois · 1 : une fois · 0 : jamais'], ['Match : règles et arbitrage', 3, '3 : joue sans faute et arbitre avec les bons gestes · 1 : quelques fautes ou arbitrage hésitant · 0 : fautes répétées']],
   e: [['voleurs', 6], ['La toupie', 7, 'Par deux : pivot et protection du ballon, 20 s chacun.', '', '', 'deux', 'p']],
   c: [['Épreuve 1 : parcours et double pas', 18, 'Slalom en dribble, passe au facteur, appel en course, réception et double pas. 2 passages à droite, 1 à gauche. Les autres font le tour du monde sur l\'autre panier.', '', '', 'slalom:basket', 'g4'],
    ['Épreuve 2 : match 3 contre 3 observé', 20, 'Matchs de 5 min, panier en double pas = 2 points. Le prof observe le démarquage et le passe et va ; les équipes au bord arbitrent.', '', '', 'demi:basket:3c3', 'm3'],
    ['Concours de lancers francs', 8, 'Pour finir ensemble : record de la classe, un essai chacun.', '', '', 'tir', '']],
   r: [['bilan', 6]]}
]},
3: {th: 'Attaquer vite et défendre : contre-attaque, défense individuelle, rebond', comp: ['HME2', 'HME4', 'HSC1', 'HSC2', 'GSS1'], l: [
  {t: 'Gagner la course : la contre-attaque', o: 'Après une récupération, courir vite vers l\'avant et passer au partenaire le plus avancé.',
   e: [['demenage', 6, 'Les déménageurs n\'ont droit qu\'à des passes (pas de dribble) entre coéquipiers.'], ['Les relais de la passe', 7, 'Équipes en colonne : passes en avançant jusqu\'au panier, double pas, et retour en sprint. On chronomètre l\'aller-retour de toute l\'équipe.', '', '', 'files', 'e4']],
   c: [['Course contre le ballon', 15, 'Un joueur sprinte du fond au panier opposé pendant que ses 2 coéquipiers se passent le ballon en remontant le terrain : le ballon doit arriver avant le coureur ! Puis le coureur reçoit et marque.', 'Notre trio marque en moins de {8|10} secondes.', 'Un défenseur part 2 secondes après.', 'files', 'g3'],
    ['deuxun', 16, 'Départ de l\'autre moitié du terrain : on attaque vite avant que le défenseur s\'organise.', 'Notre duo marque {3|2} fois sur 5.', 'Un 2e défenseur part en retard (2 c 1 qui devient 2 c 2).'],
    ['m4', 15, 'Panier marqué moins de 6 secondes après une récupération = 3 points.', 'Je cours vers l\'avant dès que mon équipe récupère.', 'Le prof compte à voix haute les 6 secondes.']],
   x: [['roiterrain', 15, 'Panier en contre-attaque = 2 points.', 'Mon équipe marque une contre-attaque.', 'L\'équipe qui perd ressort tout de suite (pas de pause).']],
   r: [['bilan', 7]]},
  {t: 'Défendre : rester entre son joueur et le panier', o: 'Défendre sur un joueur en restant entre lui et le panier, sans faute.',
   e: [['La danse du défenseur', 6, 'Par deux, sans ballon : l\'attaquant se déplace en pas chassés, le défenseur le suit en restant face à lui, bras écartés, sans croiser les pieds. Au sifflet, on inverse.', '', '', 'deux', 'p'], ['pegobol', 7]],
   c: [['duel', 15, 'Le défenseur reste entre l\'attaquant et {cible}, il recule vite et ne touche pas.', 'Je défends {3|2} fois sans faute.', 'L\'attaquant part de plus loin.'],
    ['La garde du corps', 16, 'Chaque défenseur a un attaquant à suivre partout (on se le choisit au début). Passe à 10 : l\'équipe qui défend marque si son « protégé » ne reçoit aucune passe pendant 20 s.', 'Mon joueur reçoit moins de {3|4} passes.', 'On change de joueur à suivre au sifflet.', 'match:basket:4c4', 'm4'],
    ['m3', 15, 'Défense individuelle obligatoire : chacun son joueur, annoncé à voix haute.', 'Je ne perds jamais mon joueur.', 'Un panier de l\'attaquant que je défends coûte 1 point de plus.']],
   x: [['fairplay', 15, 'Faute de contact reconnue = ballon rendu à l\'attaque sans discussion.', 'Je défends sans faire de faute.', 'Celui qui défend le mieux est désigné par l\'équipe adverse.']],
   r: [['aveugle', 7]]},
  {t: 'Le rebond', o: 'Se placer entre son adversaire et le panier pour prendre le rebond et relancer.',
   e: [['knock', 6, 'Le knock-out avec rebond : le tireur doit reprendre son ballon avant qu\'il touche 2 fois le sol.'], ['La chasse au ballon', 7, 'Par deux dos à dos, un ballon lancé au sol par le prof : le premier qui l\'attrape tire. Le perdant devient défenseur.', '', '', 'deux', 'p']],
   c: [['Le roi du rebond', 15, 'Par 3 sous {cible} : le prof (ou un élève) tire, les 3 se battent (sans faute) pour le rebond. Celui qui l\'attrape marque, les deux autres le gênent. 3 rebonds pris = roi.', 'Je prends {2|1} rebonds par manche.', 'Rebond pris en sautant = 2 points.', 'tir:basket', 'g3'],
    ['m3', 16, 'Un rebond offensif pris par l\'attaque = 1 point bonus.', 'Je fais écran au rebond (je me place devant mon joueur).', 'Tout rebond défensif doit donner une passe vers l\'avant en moins de 3 secondes.'],
    ['deuxun', 15, 'Le défenseur qui prend le rebond lance une contre-attaque vers l\'autre panier.', 'Je relance vite après un rebond.', '3 c 2 avec les plus à l\'aise.']],
   x: [['roiterrain', 15, 'Rebond offensif = 1 point en plus.', 'Mon équipe prend plus de rebonds que l\'adversaire.', 'L\'arbitre compte les rebonds de chaque équipe.']],
   r: [['silence', 7]]},
  {t: 'Attaquer et défendre : 3 contre 3 tout terrain', o: 'Enchaîner défense, rebond et contre-attaque en jeu réduit.',
   e: [['voleurs', 6, 'Le voleur qui récupère un ballon file en dribble toucher le mur du fond avant de revenir.'], ['roue', 7, 'Deux ballons de plus que de joueurs : il faut aller vite.']],
   c: [['Les vagues', 18, 'Trois équipes : l\'équipe A attaque contre B ; si B récupère, elle contre-attaque vers l\'autre panier où C l\'attend. L\'équipe qui marque reste, l\'autre sort. On compte les paniers de chaque équipe.', 'Mon équipe marque {3|2} fois.', 'Défenseur supplémentaire au retour.', 'tournoi:basket', 'm3'],
    ['m3', 15, 'Après un panier, l\'équipe qui l\'a encaissé relance tout de suite du fond (pas d\'arrêt).', 'Je repars en défense dès qu\'on perd le ballon.', '1 point bonus pour chaque interception.'],
    ['chat3', 13, 'Pour respirer : tirs inventés en fin d\'action rapide.', 'Je finis sans les 4 lettres.', 'Le tireur choisit son côté de double pas.']],
   x: [['cartes', 15, 'Écart de 3 paniers = carte « défenseur en moins » pour l\'équipe qui mène.', 'Notre écart reste petit : le match reste serré.', 'Les arbitres choisissent la carte.']],
   r: [['bilan', 7]]},
  {t: 'Le tournoi des contre-attaques', o: 'Choisir entre attaque rapide et attaque placée en match.',
   e: [['pegobol', 6], ['Course contre le ballon', 7, 'Version courte, sans défenseur.', '', '', 'files', 'g3']],
   c: [['roiterrain', 18, 'Panier en contre-attaque = 2 points.', 'Mon équipe gagne un match.', 'Panier après 5 passes = 2 points aussi : à chacun sa stratégie.'],
    ['fairplay', 16, 'Arbitrage tout seul ; une carte verte est donnée par les arbitres au joueur le plus fair-play.', 'Je gagne une carte verte.', 'Les joueurs peuvent demander un temps mort de 30 s.'],
    ['minute', 12, 'Défi minute par équipe de tournoi : le record de l\'équipe compte dans le classement.', 'Mon équipe bat son record.', '3 tirs au même endroit interdits.']],
   x: [['m4', 15, 'Finale 4 c 4 tout terrain : les équipes au bord sont supporters d\'une équipe (encouragements uniquement positifs).', 'Mon équipe joue la finale ou je l\'arbitre.', 'Les supporters gagnent un point s\'ils restent positifs.']],
   r: [['silence', 7]]},
  {t: 'Évaluation : contre-attaque et match', o: 'Montrer la contre-attaque à 2 contre 1, la défense individuelle et le rebond en match.',
   crit: [['2 contre 1 : décision', 4, '4 : attire le défenseur puis passe ou tire selon sa place · 2 : bonne décision une fois sur deux · 0 : au hasard'], ['2 contre 1 : réussite', 3, '3 : panier aux 2 passages · 2 : 1 panier · 0 : aucun'], ['Défense en 2 contre 1', 3, '3 : retarde l\'attaque, entre ballon et panier · 1 : recule sans gêner · 0 : laisse passer'], ['Match : défense individuelle', 4, '4 : tient son joueur, entre lui et le panier · 2 : le perd parfois · 0 : ne défend pas'], ['Match : rebond et contre-attaque', 3, '3 : va au rebond et lance l\'attaque rapide · 1 : parfois · 0 : jamais'], ['Match : règles et fair-play', 3, '3 : sans faute, respecte l\'arbitre · 1 : quelques fautes · 0 : fautes répétées']],
   e: [['La danse du défenseur', 6, '', '', '', 'deux', 'p'], ['Course contre le ballon', 7, '', '', '', 'files', 'g3']],
   c: [['Épreuve 1 : les vagues du 2 contre 1', 18, 'Chaque élève passe 2 fois en attaque et 1 fois en défense. Le prof note la décision, la réussite et la défense.', '', '', 'demi:basket:2c1', 'g3'],
    ['Épreuve 2 : match observé', 22, 'Matchs 3 contre 3 tout terrain de 5 min. Le prof observe défense, rebond et fair-play ; les équipes au bord arbitrent.', '', '', 'demi:basket:3c3', 'm3']],
   r: [['bilan', 6]]}
]},
4: {th: 'Le jeu collectif organisé : surnombre, écran, défense homme à homme', comp: ['HME2', 'HME4', 'HSC1', 'HSC2', 'GSS1'], l: [
  {t: 'Créer et jouer le surnombre', o: 'Reconnaître une situation de surnombre et la conclure par la bonne passe.',
   e: [['voleurs', 6, 'Les voleurs chassent par deux en se tenant la main.'], ['roue', 7, 'Passes à une main, puis passe aveugle (sans regarder le receveur).']],
   c: [['Le 3 contre 2 en vagues', 16, 'Trois attaquants contre 2 défenseurs ; après le tir, les 2 défenseurs + 1 attaquant repartent en 2 c 1 vers l\'autre panier. On enchaîne sans pause.', 'Notre trio marque {3|2} fois sur 5.', 'Un défenseur supplémentaire part du milieu de terrain.', 'demi:basket:3c2', 'g5'],
    ['Le jeu du surnombre', 15, 'Match 4 c 4 où l\'équipe qui vient de récupérer le ballon a un 5e joueur (joker en chasuble neutre) jusqu\'au tir.', 'Je trouve le joueur libre lors du surnombre.', 'Le joker ne peut pas tirer.', 'match:basket:4c4', 'm4'],
    ['minute', 15, 'Les tirs se font après une passe : on tire en 1 temps, sans dribble.', 'Mon équipe bat son record.', 'Tir à 3 points = 4 points.']],
   x: [['roiterrain', 15, 'Panier après un surnombre (3 c 2 ou 2 c 1) = 3 points.', 'Mon équipe monte au moins une fois.', 'Matchs de 3 min chronométrés.']],
   r: [['bilan', 7]]},
  {t: 'L\'écran', o: 'Poser un écran pour libérer un partenaire, et se servir de l\'écran.',
   e: [['La statue', 6, 'Jeu de poursuite : les fuyards peuvent se cacher derrière une « statue » (un camarade immobile, bras croisés) : le chat doit contourner. On découvre l\'écran sans ballon.', '', '', 'chat'], ['miroir', 7, 'Le meneur dribble autour d\'une statue : l\'ombre suit.']],
   c: [['Le 2 c 2 de l\'écran', 16, 'Le non-porteur pose un écran sur le défenseur du porteur (pieds écartés, bras croisés, immobile). Le porteur dribble en frôlant l\'écran et tire. Panier après écran = 3 points.', 'Je pose un écran immobile, sans faute.', 'Le défenseur peut changer de joueur (on crie « change ! »).', 'demi:basket:2c2', 'g4'],
    ['m3', 15, 'Panier après écran = 3 points.', 'Mon équipe marque après un écran.', 'L\'écran doit être annoncé par un code (couleur, chiffre).'],
    ['chat3', 15, 'Le tireur part d\'un écran (posé par un coéquipier) avant de tirer.', 'Je réussis {2|1} tirs après écran.', 'Défenseur qui doit contourner l\'écran.']],
   x: [['fairplay', 15, 'Écran mobile (qui pousse) = faute reconnue par le joueur.', 'Je pose mes écrans sans contact illégal.', 'Les arbitres expliquent leur décision en une phrase.']],
   r: [['silence', 7]]},
  {t: 'Défense homme à homme', o: 'Défendre chacun son joueur, s\'entraider et communiquer.',
   e: [['La danse du défenseur', 6, 'On ajoute un ballon : l\'attaquant dribble, le défenseur reste devant.', '', '', 'deux', 'p'], ['pegobol', 7, 'Les fuyards s\'aident en criant « attention à gauche ! ».']],
   c: [['La garde du corps', 16, 'Avec panier : on marque 1 point défensif par possession où son joueur ne tire pas.', 'Mon joueur tire moins que moi.', 'On change de joueur à chaque panier.', 'match:basket:4c4', 'm4'],
    ['Le mur qui parle', 15, '3 c 3 sur un demi-terrain : les défenseurs doivent parler (« j\'ai le porteur ! », « écran ! »). Un défenseur muet donne 1 point à l\'attaque.', 'Notre défense parle et récupère {2|1} ballons.', 'Aide défensive autorisée : on revient sur son joueur après.', 'demi:basket:3c3', 'm3'],
    ['duel', 15, 'Duel en 2 dribbles maximum, départ dos au panier.', 'Je gagne {3|2} duels en défense.', 'L\'attaquant reçoit une passe avant d\'attaquer.']],
   x: [['roiterrain', 15, 'Défense homme à homme obligatoire.', 'Notre équipe encaisse moins de paniers qu\'au match précédent.', 'Panier encaissé sur faute = 2 points pour l\'adversaire.']],
   r: [['bilan', 7]]},
  {t: 'Jouer ensemble : écran, surnombre et défense', o: 'Combiner écran et passe et va dans un jeu collectif organisé.',
   e: [['crocos', 6, 'Les crocodiles chassent à 2 en se faisant des passes.'], ['Les relais de la passe', 7, 'Chaque passe en une touche : plus vite !', '', '', 'files', 'e4']],
   c: [['Le système secret', 18, 'Chaque équipe invente (2 min) une combinaison avec un écran et un passe et va, lui donne un nom de code et la joue en 3 c 3. Panier sur la combinaison annoncée = 3 points.', 'Notre combinaison réussit {2|1} fois.', 'L\'équipe adverse peut deviner la combinaison pour gagner 1 point.', 'demi:basket:3c3', 'm3'],
    ['cartes', 15, 'Les cartes de la leçon : « surnombre » (5 c 4 pendant 1 attaque), « défense de zone interdite »…', 'Le match reste serré.', 'Les équipes inventent une carte.'],
    ['tir5', 13, 'Chaque étoile se gagne après un écran ou une passe.', 'Notre trio allume les 5 étoiles.', 'Les étoiles s\'éteignent si on rate 2 fois de suite.']],
   x: [['fairplay', 15, 'Chaque équipe annonce son système avant le match.', 'Je respecte l\'arbitre et l\'adversaire.', 'Les arbitres notent aussi les écrans réussis.']],
   r: [['silence', 7]]},
  {t: 'Tournoi à 4 contre 4', o: 'Jouer un tournoi en organisant son équipe : rôles, système, arbitrage.',
   e: [['voleurs', 6], ['tourmonde', 7, 'Aller-retour, avec tirs à 3 points au bout.']],
   c: [['m4', 20, 'Tournoi : chaque équipe a un capitaine, un « coach » au bord pendant 1 min par match.', 'Mon équipe gagne au moins un match.', 'Panier sur système annoncé = 3 points.'],
    ['roiterrain', 16, 'Roi du terrain en 3 c 3 : les plus forts montent, tout le monde joue à son niveau.', 'Je joue contre des équipes de mon niveau.', 'Monter demande 2 paniers d\'écart.'],
    ['chat3', 10, 'Retour au calme du tournoi : tirs inventés en équipe.', 'Je finis sans les 4 lettres.', '']],
   x: [['fairplay', 15, 'Finale fair-play : les points de fair-play s\'ajoutent au score.', 'Mon équipe a des points de fair-play.', 'Le vote final du public désigne le meilleur esprit d\'équipe.']],
   r: [['bilan', 7]]},
  {t: 'Évaluation : jeu collectif organisé', o: 'Montrer surnombre, écran et défense homme à homme en situation de match.',
   crit: [['3 contre 2 : conclure le surnombre', 4, '4 : trouve à chaque fois le joueur libre · 2 : une fois sur deux · 0 : force le passage'], ['Écran', 4, '4 : pose des écrans utiles et immobiles et s\'en sert · 2 : parfois ou écran mobile · 0 : jamais'], ['Défense homme à homme', 4, '4 : tient son joueur et aide · 2 : le perd parfois · 0 : ne défend pas'], ['Contribution au jeu', 4, '4 : passe, se démarque et tire au bon moment · 2 : participe peu · 0 : absent du jeu'], ['Arbitrage et fair-play', 4, '4 : arbitre juste et clair, joue sans contester · 2 : quelques hésitations · 0 : conteste ou refuse d\'arbitrer']],
   e: [['La danse du défenseur', 6, '', '', '', 'deux', 'p'], ['Le 3 contre 2 en vagues', 7, 'Version d\'échauffement, défense passive.', '', '', 'demi:basket:3c2', 'g5']],
   c: [['Épreuve 1 : vagues 3 contre 2', 15, 'Chaque élève passe 2 fois en attaque, 1 fois en défense.', '', '', 'demi:basket:3c2', 'g5'],
    ['Épreuve 2 : match observé 4 contre 4', 25, 'Matchs de 6 min ; le prof observe écran, défense et contribution ; les équipes au bord arbitrent.', '', '', 'match:basket:4c4', 'm4']],
   r: [['bilan', 6]]}
]},
5: {th: 'Construire une attaque : pick and roll, attaque de zone, choix tactiques', comp: ['HME2', 'HME4', 'HSC1', 'HSC2', 'GSS1'], l: [
  {t: 'Le pick and roll', o: 'Après l\'écran sur le porteur, rouler vers le panier pour recevoir ; le porteur choisit entre tir, passe et dribble.',
   e: [['voleurs', 6, 'Les voleurs ont aussi un ballon : on vole en dribblant.'], ['La statue', 7, 'Après le passage du fuyard, la statue pivote et sprinte 3 m vers le panier (c\'est le « roll »).', '', '', 'chat']],
   c: [['Le 2 c 2 pick and roll', 16, 'L\'écraneur pose l\'écran sur le défenseur du porteur, puis pivote et file vers {cible}. Le porteur lit la défense : tir si on le laisse, passe au rouleur si on le double, dribble si on recule.', 'Notre duo marque {3|2} fois sur 5.', 'Les défenseurs peuvent changer de joueur (« switch ! »).', 'demi:basket:2c2', 'g4'],
    ['Les tirs du meneur', 15, 'Par 3 : le meneur sort de l\'écran en dribble et tire à mi-distance, ou donne au rouleur qui finit en double pas. 2 min par meneur, on compte les points.', 'Je réussis {3|2} tirs sur 6 en sortie d\'écran.', 'Un défenseur gêne le tir à bras levés.', 'tir:basket', 'g3'],
    ['m3', 15, 'Panier après pick and roll = 3 points.', 'Je fais le bon choix après l\'écran.', 'La défense a le droit de doubler le porteur : il faut trouver le rouleur.']],
   x: [['roiterrain', 15, 'Panier après pick and roll = 2 points.', 'Mon équipe marque après un pick and roll.', 'Matchs de 3 min chronométrés.']],
   r: [['bilan', 7, 'Chaque équipe montre son plus beau pick and roll au ralenti.']]},
  {t: 'Attaquer une défense de zone', o: 'Faire circuler vite le ballon et attaquer les espaces entre les défenseurs.',
   e: [['roue', 6, 'Passes en une touche, 2 ballons de plus que de joueurs.'], ['taureau', 7, 'Trois taureaux qui ne quittent pas leur coin : c\'est déjà une zone !']],
   c: [['La zone des pirates', 16, '3 défenseurs en zone (chacun garde son coin et n\'en sort pas) contre 4 attaquants. On fait tourner vite le ballon et on tire dans l\'espace libre. 1 point par panier, 1 point défensif par ballon récupéré.', 'Mon équipe marque {3|2} fois contre la zone.', 'Les défenseurs ont le droit de sortir de leur zone 1 fois par attaque.', 'demi:basket:4c4', 'g7'],
    ['m4', 15, 'Une équipe défend en zone, l\'autre en homme à homme ; on échange à la mi-temps.', 'Je trouve l\'espace libre entre deux défenseurs.', 'Panier hors de la raquette contre la zone = 3 points.'],
    ['minute', 15, 'Tirs de loin uniquement (hors raquette), après une passe.', 'Mon équipe bat son record.', 'Panier à 3 points = 4 points.']],
   x: [['cartes', 15, 'Carte « zone » : l\'équipe menée choisit si l\'adversaire défend en zone ou en homme à homme.', 'Le match reste serré jusqu\'au bout.', 'Les équipes inventent une nouvelle carte.']],
   r: [['silence', 7]]},
  {t: 'Faire les bons choix', o: 'Choisir entre tir, passe et dribble selon ce que fait la défense.',
   e: [['pegobol', 6, 'Les chasseurs annoncent un plan avant chaque attaque.'], ['chef', 7, 'Signaux combinés : 2 signaux à la suite, il faut les retenir.']],
   c: [['Le jeu des trois couleurs', 16, 'Un élève au bord lève un plot : rouge = tir en moins de 5 s, bleu = 3 passes avant de tirer, jaune = pick and roll. L\'équipe qui respecte le code et marque gagne 2 points.', 'Mon équipe suit le code et marque {3|2} fois.', 'Le code est donné à voix haute par un chiffre, sans plot.', 'demi:basket:3c3', 'm3'],
    ['Le match du conseiller', 15, 'Chaque équipe a un conseiller au bord qui peut, une fois par attaque, crier un conseil d\'un mot (« tir ! », « écran ! », « côté ! »). Panier sur conseil = 3 points.', 'Je fais au moins {2|1} bons choix sur conseil.', 'Le conseiller change à chaque panier.', 'demi:basket:3c3', 'm3'],
    ['chat3', 15, 'Tirs « de match » : après une feinte, après un dribble, en course.', 'Je finis avec moins de 3 lettres.', 'Le tir inventé doit commencer par une passe reçue.']],
   x: [['roiterrain', 15, 'Panier sur le bon choix (validé par l\'arbitre) = 2 points.', 'Mon équipe gagne un match.', 'L\'arbitre explique en une phrase pourquoi le choix était bon.']],
   r: [['bilan', 7, 'Chacun dit un choix qu\'il referait et un qu\'il changerait.']]},
  {t: 'Le plan de jeu', o: 'Préparer en équipe un plan d\'attaque et de défense, puis l\'appliquer et le régler.',
   e: [['voleurs', 6, 'Échauffement mené par un élève.'], ['Les relais de la passe', 7, 'Passes en une touche jusqu\'au panier, double pas, retour en sprint. On chronomètre l\'équipe.', '', '', 'files', 'e4']],
   c: [['Le tableau du coach', 18, 'Chaque équipe a 3 min pour dessiner son attaque et sa défense, puis joue 2 matchs. Entre les deux, 1 min de réglage. Un observateur de l\'équipe au bord compte combien de fois le plan est appliqué.', 'Notre plan est appliqué au moins {3|2} fois.', 'Le plan doit contenir un pick and roll et une défense de zone.', 'match:basket:4c4', 'm4'],
    ['cartes', 15, 'Les cartes peuvent obliger à changer de plan (« défense de zone », « pas de dribble »).', 'Le match reste serré.', 'L\'équipe menée choisit la carte.'],
    ['tir5', 13, 'Les étoiles sont des positions à 3 points ; on tire après une passe.', 'Notre trio allume les 5 étoiles.', 'Une étoile ratée 2 fois s\'éteint.']],
   x: [['fairplay', 15, 'L\'équipe au bord donne aussi 1 point « plan appliqué ».', 'Je respecte l\'arbitre et l\'adversaire.', 'Le capitaine explique le plan à l\'arbitre avant le match.']],
   r: [['silence', 7]]},
  {t: 'Tournoi de l\'attaque', o: 'Appliquer ses choix tactiques dans un tournoi arbitré par les élèves.',
   e: [['crocos', 6, 'Les crocodiles chassent en se faisant des passes.'], ['tourmonde', 7, 'Tour du monde à 3 points.']],
   c: [['m4', 20, 'Tournoi 4 c 4 : chaque équipe a un coach au bord (1 temps mort de 30 s par match).', 'Mon équipe gagne au moins un match.', 'Panier sur pick and roll = 3 points.'],
    ['roiterrain', 16, 'Roi du terrain en 3 c 3 : on finit par jouer contre des équipes de son niveau.', 'Je joue contre des équipes de mon niveau.', 'Monter demande 2 paniers d\'écart.'],
    ['minute', 10, 'Le record de l\'équipe compte dans le classement du tournoi.', 'Mon équipe bat son record.', 'Tirs à 3 points seulement.']],
   x: [['fairplay', 15, 'Finale : les points fair-play s\'ajoutent au score.', 'Mon équipe a des points de fair-play.', 'Le public au bord vote l\'action du jour.']],
   r: [['bilan', 7]]},
  {t: 'Évaluation : construire une attaque', o: 'Montrer le pick and roll, l\'attaque d\'une zone et des choix tactiques en match.',
   crit: [['Pick and roll', 5, '5 : écran utile, roll et bon choix du porteur · 3 : réalisé sans bon choix · 1 : tentative mal faite · 0 : jamais'], ['Attaque contre la zone', 4, '4 : fait circuler vite et attaque l\'espace libre · 2 : parfois · 0 : dribble seul contre la zone'], ['Choix tactiques', 4, '4 : tir, passe ou dribble selon la défense · 2 : parfois · 0 : toujours la même action'], ['Défense', 3, '3 : défend son joueur et aide · 1 : parfois · 0 : ne défend pas'], ['Arbitrage et fair-play', 4, '4 : arbitre juste, joue sans contester · 2 : hésite · 0 : conteste']],
   e: [['La danse du défenseur', 6, 'Par deux : l\'attaquant dribble, le défenseur reste devant.', '', '', 'deux', 'p'], ['Le 2 c 2 pick and roll', 7, 'Défense passive pour se régler.', '', '', 'demi:basket:2c2', 'g4']],
   c: [['Épreuve 1 : pick and roll observé', 15, '2 contre 2 : chaque duo passe 3 fois en attaque. Les autres font le défi minute sur l\'autre panier.', '', '', 'demi:basket:2c2', 'g4'],
    ['Épreuve 2 : match 4 contre 4 observé', 25, 'Une mi-temps contre une zone, une mi-temps contre l\'homme à homme. Le prof observe ; les équipes au bord arbitrent.', '', '', 'match:basket:4c4', 'm4']],
   r: [['bilan', 6]]}
]},
6: {th: 'Autonomie et performance : projet d\'équipe et tournoi organisé par les élèves', comp: ['HME2', 'HSC1', 'HSC2', 'HSC3', 'GSS1', 'GSS5'], l: [
  {t: 'Créer son équipe et son projet', o: 'Former des équipes équilibrées et définir un projet de jeu.',
   e: [['voleurs', 6, 'Échauffement mené par un élève volontaire.'], ['roue', 7, 'Un élève donne les consignes et le rythme.']],
   c: [['La draft', 14, 'Le prof désigne les capitaines ; l\'ordre de choix est tiré au sort et s\'inverse à chaque tour (comme en NBA). Chaque équipe se donne un nom, une couleur et un cri.', 'Les équipes sont équilibrées : on le vérifie après le 1er match.', 'Le prof peut échanger 2 joueurs si une équipe est trop forte.', 'libre', ''],
    ['m4', 18, 'Matchs de découverte : chaque équipe note 2 forces et 1 faiblesse.', 'Notre équipe écrit 2 forces et 1 faiblesse.', 'Un observateur par équipe note les tirs pris et réussis.'],
    ['Le contrat d\'équipe', 14, 'Chaque équipe écrit son contrat : un système d\'attaque, une défense, une règle de fair-play. Elle le teste en 3 c 3.', 'Notre contrat est écrit et testé.', 'Le contrat est montré à l\'équipe adverse après le match.', 'demi:basket:3c3', 'm3']],
   x: [['roiterrain', 15, 'Premier classement des équipes.', 'Mon équipe gagne un match.', '']],
   r: [['bilan', 7]]},
  {t: 'S\'entraîner en autonomie', o: 'Conduire seul l\'entraînement de son équipe à partir du contrat.',
   e: [['Échauffement d\'équipe', 13, 'Chaque équipe mène son échauffement : un jeu de mise en train de la saison, puis des tirs.', '', '', 'libre', 'e4']],
   c: [['L\'atelier du coach', 16, 'Chaque équipe choisit un jeu de la saison pour travailler son point faible (passes, tir, défense…). Le prof passe et conseille.', 'Notre équipe progresse sur son point faible.', 'Deux équipes s\'entraînent ensemble et se lancent un défi.', 'ateliers:basket:6', 'e4'],
    ['m3', 15, 'On teste le contrat d\'équipe.', 'Notre contrat est appliqué {3|2} fois.', 'Le coach peut arrêter le jeu 1 fois pour corriger.'],
    ['minute', 15, 'Record d\'équipe : il servira au classement du tournoi.', 'Mon équipe bat son record.', '']],
   x: [['cartes', 15, '', 'Le match reste serré.', '']],
   r: [['bilan', 7]]},
  {t: 'Tournoi : la phase de poules', o: 'Organiser et vivre un tournoi : jouer, arbitrer, tenir la table de marque.',
   e: [['Échauffement d\'équipe', 13, 'Mené par le capitaine.', '', '', 'libre', 'e4']],
   c: [['m4', 34, 'Phase de poules : chaque équipe joue contre toutes les autres. Rôles tournants : arbitres, table de marque, chrono, journaliste qui annonce les résultats.', 'Je tiens chaque rôle sérieusement.', 'Victoire = 3 points, nul = 2, défaite = 1, forfait = 0.', 'tournoi:basket', 'm4'],
    ['chat3', 12, 'Pause du tournoi : les équipes au repos jouent au C-H-A-T entre elles.', 'Je finis sans les 4 lettres.', '']],
   x: [['fairplay', 15, 'Le classement fair-play compte autant que le classement des victoires.', 'Mon équipe a des points de fair-play.', '']],
   r: [['bilan', 7]]},
  {t: 'Tournoi : la phase finale', o: 'Jouer les matchs à élimination directe avec le même esprit.',
   e: [['Échauffement d\'équipe', 13, 'Chaque capitaine présente le plan de son équipe en 30 secondes.', '', '', 'libre', 'e4']],
   c: [['m4', 34, 'Demi-finales et finales, aussi pour toutes les places. Tous les élèves jouent autant.', 'Mon équipe joue au meilleur de son niveau.', 'Chaque joueur doit marquer ou faire une passe décisive.', 'tournoi:basket', 'm4'],
    ['minute', 12, 'Défi minute final : le record de la classe est affiché.', 'Mon équipe bat son record.', '']],
   x: [['fairplay', 15, 'Remise des « trophées » : meilleure attaque, meilleure défense, fair-play, plus beau progrès.', 'Mon équipe reçoit un trophée ou une mention.', '']],
   r: [['bilan', 7]]},
  {t: 'Le 3 contre 3 de rue', o: 'Jouer au format olympique 3x3 et en appliquer les règles.',
   e: [['voleurs', 6], ['tourmonde', 7, 'Avec des tirs à 2 points (format 3x3).']],
   c: [['Le 3x3 olympique', 20, 'Règles du 3x3 : un seul panier ; panier = 1 point, tir de loin = 2 points ; après un panier, l\'adversaire ressort le ballon derrière l\'arc ; 12 secondes pour tirer ; match à 21 points ou 8 min.', 'Mon équipe gagne un match.', 'Les plus forts jouent à 12 secondes, les autres à 20.', 'demi:basket:3c3', 'm3'],
    ['roiterrain', 16, 'En 3x3, matchs à 7 points.', 'Je joue contre des équipes de mon niveau.', ''],
    ['chat3', 10, 'Tirs de « streetball » inventés.', 'Je finis sans les 4 lettres.', 'Le tir inventé doit commencer par un dribble entre les jambes.']],
   x: [['fairplay', 15, 'Au 3x3, pas d\'arbitre : les joueurs annoncent eux-mêmes les fautes.', 'Je reconnais mes fautes sans arbitre.', '']],
   r: [['silence', 7]]},
  {t: 'Évaluation : projet et tournoi', o: 'Évaluer le jeu, le rôle dans l\'équipe et l\'organisation du tournoi.',
   crit: [['Efficacité en match', 6, '6 : marque, passe décisive, défense efficace · 4 : contribue souvent · 2 : contribue peu · 0 : absent'], ['Application du contrat d\'équipe', 4, '4 : joue le système et la défense prévus · 2 : parfois · 0 : jamais'], ['Rôles (arbitre, table, coach)', 5, '5 : tient tous ses rôles avec sérieux · 3 : la plupart · 0 : refuse'], ['Fair-play et esprit d\'équipe', 5, '5 : encourage, respecte, félicite · 3 : correct · 0 : conflit']],
   e: [['Échauffement d\'équipe', 13, 'Mené par chaque équipe.', '', '', 'libre', 'e4']],
   c: [['Le tournoi d\'évaluation', 40, 'Matchs de 6 min, rôles tournants. Le prof observe avec la grille.', '', '', 'tournoi:basket', 'm4']],
   r: [['bilan', 6]]}
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
  crocos: g => g.court().zone(150, 30, 100, 190, 'rivière', 'blue', {top: 1}).X(185, 80, 'C').X(215, 150, 'C').X(195, 200, 'C')
    .row('a', 5, 45, 45, 45, 205, {ball: true}).each((x, y, i) => g.drib(x + 10, y, 345, y + (i - 2) * 6, 0, i === 0 ? 1 : null)).tag(200, 243, '« Marée haute ! » : on traverse en dribble', {s: 10})
    .n(1, 'au signal, on traverse d\'une ligne de fond à l\'autre en dribble').n(2, 'touché par un crocodile = on devient crocodile (en gardant son ballon)').run(208, 152, 300, 175, 10, 2),
  roi: g => g.hall().zone(90, 40, 220, 170, 'carré de cônes', 'blue', {top: 1}).cone(90, 40).cone(310, 40).cone(310, 210).cone(90, 210)
    .scatter('a', 8, 110, 60, 290, 195, {ball: true, seed: 8}).X(250, 120, '', {}).run(245, 128, 225, 150, 6, 1).zone(320, 70, 70, 110, 'défi', 'yellow').A(355, 140, '', {ball: true})
    .zone(130, 70, 140, 110, '', 'grey').label(200, 230, 'toutes les 2 min, le carré rétrécit', {s: 9.5, it: 1})
    .n(1, 'on fait sortir le ballon des autres en protégeant le sien').n(2, 'ballon perdu : défi au bord (3 paniers ou 10 dribbles main faible), puis on revient').num(355, 115, 2),
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
  knock: g => g.half().file('a', 5, 255, 125, -22, 0).pl('a', 278, 125, '1', {ball: true}).A(255, 125, '2', {ball: true}).shot(288, 122, 356, 124, 0, 1).shot(262, 115, 356, 118, -18, 2)
    .tag(190, 200, '2e marque avant le 1er → 1er « knock-out »', {s: 9.5}).n(1, 'le 1er tire').n(2, 'le 2e tire dès que le 1er a lâché ; s\'il marque avant, le 1er sort (3 paniers au panier voisin puis revient)'),
  morpion: g => { g.hall(); for (let i = 0; i < 9; i++) g.hoop(170 + (i % 3) * 30, 95 + Math.floor(i / 3) * 30, 12); g.chasuble(170, 95, '#1f63d6').chasuble(200, 125, '#1f63d6').chasuble(230, 95, '#e8590c');
    g.hoopB(370, 70, 1).hoopB(370, 180, 1).file('a', 3, 310, 70, -18, 0).file('b', 3, 310, 180, -18, 0).shot(318, 66, 360, 70, 0, 1).run(300, 80, 235, 125, 10, 2);
    return g.label(200, 190, 'grille de 9 cerceaux', {s: 9.5}).n(1, 'panier = on court poser une chasuble dans un cerceau').n(2, '3 chasubles alignées = manche gagnée ; raté = on tape la main du suivant'); },
  minute: g => g.half().zone(275, 92, 105, 66, '1 pt', 'green', {s: 10}).label(250, 75, '2 pts', {s: 10, b: 1}).label(200, 55, '3 pts', {s: 10, b: 1}).A(290, 135, '', {ball: true}).A(240, 95, '').A(195, 160).shot(298, 132, 356, 125, 0, 1).pass(350, 140, 205, 160, 18, 2).chrono(150, 40)
    .label(150, 63, '1 minute', {s: 9}).n(1, 'proche = 1, mi-distance = 2, hors raquette = 3 points').n(2, 'on prend son rebond et on rend le ballon au suivant'),
  m3: g => g.half().pls('a', [[230, 60, '', {ball: true}], [210, 180], [320, 205]]).pls('x', [[265, 80], [250, 170], [330, 175]]).pass(236, 70, 214, 168, 14, 1).run(320, 196, 345, 150, -10, 2).bord(55, 100, 3, 'au bord : arbitre, marqueur', 'g', {dx: 0, dy: 22, ly: -16})
    .n(1, '3 contre 3 sur un demi-terrain').n(2, 'ballon gagné en défense : on ressort derrière la ligne des 3 points avant d\'attaquer'),
  silence: g => g.half().ring('a', 9, 300, 125, 95, 95, {a0: Math.PI / 2}).A(275, 125, '', {ball: true}).shot(286, 125, 356, 125, 0).tag(180, 30, 'silence : on compte à voix basse', {s: 10}).label(275, 145, 'lancer franc', {s: 9}),
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
  'Concours de lancers francs': g => g.half().ring('a', 8, 300, 125, 95, 95, {a0: Math.PI / 2}).A(275, 125, '', {ball: true}).shot(286, 125, 356, 125, 0).tag(180, 30, 'record de la classe : un essai chacun', {s: 10}),
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
    return g.P(200, 238).sheet(225, 238).n(1, 'matchs de 6 min, rôles tournants ; le prof observe avec la grille'); }
};
