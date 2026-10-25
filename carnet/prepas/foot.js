/* Football (futsal en salle) : 6 leçons par année (1re → 6e secondaire). Ballon de futsal (rebond limité) ou ballon mousse en salle.
   Pas de tacle glissé, pas de frappe à pleine puissance près des autres ; protège-tibias conseillés pour les matchs. */
PREPA_ADD({id: 'foot', sport: 'Football', mat: '1 ballon de futsal (ou mousse) par élève, petits buts ou cônes, 2 buts de handball, chasubles de 4 couleurs, coupelles, bouteilles, cerceaux, sifflet, chrono.', an: {
1: {th: 'Découvrir le football : conduire, passer, tirer et jouer ensemble', comp: ['HME2', 'HME4', 'HSC1', 'HSC3'], l: [
  {t: 'Conduire le ballon', o: 'Conduire avec l\'intérieur, l\'extérieur et la semelle en levant la tête ; protéger son ballon.', comp: ['HME2', 'HME4'], e: [
    ['Voleurs de ballons', 5, 'Chacun conduit un ballon au pied dans un demi-terrain ; 2-3 voleurs sans ballon essaient de le prendre. Celui qui perd son ballon devient voleur.', 'voleurs'],
    ['Courir au centre', 5, 'Deux équipes sur les lignes de fond, ballons au centre : au signal, chacun va chercher un ballon et le ramène en conduite à sa ligne.', 'files']],
   c: [['Ateliers de conduite', 12, 'En colonnes de 4 : conduite à la semelle (ballon qui roule sous le pied), zigzag en alternant les deux pieds entre des coupelles, slalom entre 5 cônes, arrêt du ballon à la semelle sur une ligne.', 'Je fais le slalom sans toucher de cône et en levant la tête.', 'Cônes plus espacés pour les débutants.', 'slalom:foot'],
    ['Feux de circulation', 8, 'Tout le monde conduit dans la salle : « vert » = conduite rapide, « orange » = lente, « rouge » = arrêt semelle ; « marche arrière » = tirer le ballon avec la semelle.', 'Je réagis au signal sans perdre mon ballon.', '', 'libre'],
    ['Vous ne passerez pas', 10, 'Les élèves traversent le terrain ballon au pied ; un défenseur au centre essaie de prendre ou de sortir un ballon. Celui qui perd devient défenseur avec lui.', 'Je protège mon ballon avec mon corps et je change de direction.', '', 'chat']],
   r: [['Retour au calme', 5, 'Jonglage libre (ballon dans les mains, lâcher, une touche, rattraper), puis étirements des cuisses et des mollets.', 'etirements']]},
  {t: 'Passer et contrôler', o: 'Passer avec l\'intérieur du pied et contrôler à la semelle ou de l\'intérieur.', comp: ['HME2', 'HSC2'], e: [
    ['Formation de groupes', 5, 'Conduite libre ; au signal « 3 ! », former un trio et se faire 5 passes avant de repartir.', 'libre'],
    ['Passes à deux', 5, 'Par deux à 5 m : passe de l\'intérieur du pied (cheville bloquée, pied d\'appui à côté du ballon), contrôle à la semelle, puis de l\'intérieur.', 'deux']],
   c: [['Passe à travers la porte', 10, 'Par deux, une « porte » de 2 cônes à 1 m au milieu : passes à travers la porte ; on recule de 2 pas après 5 passes réussies, puis pied faible.', 'Ma passe traverse la porte 4 fois sur 5.', '', 'deux'],
    ['Toquinho', 8, 'Cercles de 5 : passes au pied, contrôle puis passe ; on compte le record ; une seule touche pour les plus avancés.', 'Notre cercle bat son record.', '', 'cercle'],
    ['Match à passes obligatoires', 12, 'Matchs 4 contre 4 sur petit terrain, petits buts sans gardien : un but ne compte qu\'après 3 passes.', 'Mon équipe marque après au moins 3 passes.', 'Joker toujours avec l\'équipe qui attaque.', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Étirements ; quelle surface du pied pour une passe précise ? (l\'intérieur).', 'etirements']]},
  {t: 'Frapper et tirer', o: 'Frapper du cou-de-pied (lacets) et viser une cible.', comp: ['HME2'], e: [
    ['Chat au ballon', 5, 'Le chat conduit un ballon et touche les fuyards en frappant bas dans leurs jambes ; les touchés deviennent chats.', 'chat'],
    ['Appel des numéros', 5, 'Deux équipes, chaque élève a un numéro ; au numéro appelé, les deux élèves courent frapper un ballon au but.', 'tir:foot']],
   c: [['Frappe sur cible', 10, 'Un ballon de basket posé sur un cône ; le faire tomber en frappant du cou-de-pied, pied droit puis gauche, à distance croissante.', 'Je fais tomber la cible à 6 m.', '', 'tir:foot'],
    ['Artilleur', 10, 'Par deux : un gardien et un buteur. Le gardien fait rouler le ballon au buteur qui doit marquer du premier coup dans un but de 3 m. On change quand on marque.', 'Je frappe sans arrêter le ballon.', '', 'tir:foot'],
    ['Conebol sans gardien', 10, 'Match sans gardien : des bouteilles sur la ligne de but ; un but = une bouteille renversée. Personne n\'entre dans la zone : on tire de l\'extérieur.', 'Je tire de loin et je vise.', '', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Étirements ; rappel de sécurité : pas de frappe forte quand quelqu\'un est devant.', 'etirements']]},
  {t: 'Occuper l\'espace', o: 'Rester à son poste, utiliser la largeur et passer à un partenaire mieux placé.', comp: ['HME4', 'HSC2'], e: [
    ['Chasseurs au pied', 5, 'Deux chasseurs aux extrémités frappent bas pour toucher les élèves au centre ; les touchés deviennent chasseurs.', 'chat'],
    ['Passe et suis', 5, 'Groupes de 3 en ligne : passe au suivant puis prendre sa place.', 'trois']],
   c: [['Attaque contre défense', 12, 'Le terrain est coupé en deux : les défenseurs ne dépassent pas la ligne médiane, les attaquants ne reviennent pas. Rotation des rôles et du gardien toutes les 3 minutes.', 'Je reste dans ma zone et je me montre pour recevoir.', '', 'demi:foot:3c2'],
    ['Jeu par couloirs', 18, 'Le terrain est divisé en 3 couloirs ; chaque équipe a un joueur par couloir qui ne peut pas en sortir (plus un joker). On marque après une passe d\'un couloir à l\'autre.', 'J\'occupe la largeur et je passe au partenaire libre.', '', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Étirements ; pourquoi ne pas courir tous vers le ballon ?', 'etirements']]},
  {t: 'Le gardien, les règles et le match', o: 'Connaître les règles du futsal et jouer avec un gardien ; arbitrer.', comp: ['HSC1', 'HSC3'], e: [
    ['Ballon et cône', 5, 'Chacun lance son ballon au sol, court le rattraper en conduite et le stoppe à la semelle.', 'libre'],
    ['Le gardien', 5, 'Par deux : arrêts au sol et à mi-hauteur, relance à la main en faisant rouler.', 'deux']],
   c: [['Les règles du futsal', 6, 'Présentation courte : touche au pied, 4 secondes pour remettre en jeu, zone du gardien, fautes (coup franc), pas de tacle glissé. Les élèves rejouent chaque situation.', 'Je connais les règles principales.', '', 'explication'],
    ['Match de futsal arbitré', 24, 'Matchs de 6 minutes avec gardien (changé à chaque but) ; l\'équipe au repos arbitre et compte les fautes.', 'Je respecte les règles et j\'arbitre avec le bon geste.', '', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Étirements ; retour des arbitres.', 'etirements']]},
  {t: 'Évaluation', o: 'Évaluer conduite, passe, frappe et jeu.', comp: ['HME2', 'HME4', 'HSC1', 'HSC3'], e: [
    ['Voleurs de ballons', 5, 'Conduite en fuyant les voleurs.', 'voleurs'],
    ['Toquinho', 5, 'Cercles de passes au pied.', 'cercle']],
   c: [['Épreuve 1 : parcours', 10, 'Slalom chronométré entre 6 cônes, arrêt semelle, passe dans un mini-but (2 cônes à 1 m) à 6 m. 2 essais.', 'Je fais le parcours sans faute avec une passe réussie.', '', 'slalom:foot'],
    ['Épreuve 2 : frappe', 5, '5 frappes du cou-de-pied vers des cibles à 8 m.', '3 cibles touchées sur 5.', '', 'tir:foot'],
    ['Épreuve 3 : match observé', 15, 'Matchs de 6 minutes avec gardien ; grille : passes, placement, règles, fair-play.', 'Je passe au partenaire libre et je respecte les règles.', '', 'match:foot:4c4']],
   r: [['Bilan', 5, 'Auto-évaluation sur la fiche.', 'explication']]}
]},
2: {th: 'Construire le jeu : contrôle orienté, démarquage, jeu à 3', comp: ['HME2', 'HME4', 'HSC1', 'HSC2'], l: [
  {t: 'Le contrôle orienté', o: 'Contrôler le ballon en l\'orientant vers l\'espace libre.', comp: ['HME2'], e: [
    ['Conduite et feintes', 5, 'Conduite libre ; au signal, feinte de corps et changement de direction.', 'libre'],
    ['Passes à deux', 5, 'Passes à deux, contrôle de l\'intérieur.', 'deux']],
   c: [['Contrôle vers la porte', 12, 'Par 3 : A passe à B, qui contrôle en orientant vers une porte à sa gauche ou à sa droite (annoncée par C) et passe à C.', 'Mon contrôle m\'emmène vers la porte en une touche.', '', 'trois'],
    ['Rondo 4 contre 1', 8, 'Carré de 8 m : 4 attaquants se passent le ballon, un défenseur au centre ; deux touches maximum.', 'Je contrôle vers un partenaire libre.', '', 'carre:foot:1'],
    ['Match', 10, 'Matchs 4 contre 4 : un but marqué après un contrôle orienté suivi d\'une frappe vaut 2.', 'J\'utilise le contrôle orienté pour gagner du temps.', '', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Étirements des adducteurs et des cuisses.', 'etirements']]},
  {t: 'Se démarquer', o: 'Se déplacer dans un espace libre pour recevoir (appel, contre-appel).', comp: ['HME4', 'HSC2'], e: [
    ['10 passes à la main', 5, 'Jeu des 10 passes à la main, pour comprendre le démarquage.', 'match:foot:4c4'],
    ['Passes en mouvement', 5, 'Par 2 : passes en se déplaçant.', 'deux']],
   c: [['3 contre 1', 10, 'Dans un carré : 3 attaquants contre 1 défenseur ; le non-porteur se place pour faire un triangle avec le porteur.', 'Je suis toujours visible pour le porteur.', '', 'carre:foot:1'],
    ['4 contre 2 + appui', 10, 'Demi-terrain : 4 attaquants contre 2 défenseurs, un joueur appui au fond ; marquer en passant à l\'appui.', 'Je fais un appel dans le dos du défenseur.', '', 'demi:foot:4c2'],
    ['Match', 10, 'Matchs 4 contre 4 avec gardiens.', 'Je me démarque après ma passe.', '', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Étirements ; qu\'est-ce qu\'un appel ?', 'etirements']]},
  {t: 'Le jeu à 3 : triangle et une-deux', o: 'Réaliser un une-deux pour éliminer un défenseur.', comp: ['HME2', 'HME4'], e: [
    ['Passes en triangle', 5, 'Par 3 en triangle : passe et suis.', 'trois'],
    ['Une-deux à vide', 5, 'Par 2 : passe, appel, remise en une touche.', 'deux']],
   c: [['Une-deux contre défenseur', 12, 'A conduit vers un défenseur, fait une passe à B sur le côté, B remet en une touche dans la course de A qui tire.', 'Le une-deux élimine le défenseur.', 'Défenseur passif au début.', 'demi:foot:2c1'],
    ['Match à thème', 18, 'Matchs 4 contre 4 : un but après un une-deux vaut 2.', 'Mon équipe réussit un une-deux par match.', '', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Étirements en cercle (mollets, cuisses, épaules, 20 s chacun) ; chacun dit une chose réussie pendant la leçon.', 'etirements']]},
  {t: 'Défendre ensemble', o: 'Se placer entre l\'adversaire et le but ; presser le porteur.', comp: ['HME4', 'HSC2'], e: [
    ['Duels 1 contre 1', 5, 'Par deux : attaquant contre défenseur dans un couloir, marquer en franchissant la ligne.', 'deux'],
    ['Position du défenseur', 5, 'Position de côté, genoux fléchis, ne pas se jeter.', 'explication']],
   c: [['1 contre 1 vers petit but', 10, 'Duels vers des petits buts ; le défenseur oriente l\'attaquant vers l\'extérieur.', 'Je ralentis l\'attaquant sans me jeter.', '', 'demi:foot:1c1'],
    ['2 contre 2', 8, 'Un défenseur presse le porteur, l\'autre couvre.', 'Nous défendons à deux : un presse, un couvre.', '', 'demi:foot:2c2'],
    ['Match', 12, 'Matchs 4 contre 4 : l\'équipe qui récupère le ballon dans le camp adverse marque 1 point bonus.', 'Je presse le porteur dès la perte.', '', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Étirements ; pourquoi un défenseur presse et l\'autre couvre ?', 'etirements']]},
  {t: 'Tournoi', o: 'Appliquer contrôle, démarquage et défense en tournoi ; arbitrer.', comp: ['HSC1', 'HSC3'], e: [
    ['Échauffement par équipe', 6, 'Passes, conduite, tirs sur le gardien.', 'trois'],
    ['Organisation', 4, 'Tableau du tournoi et arbitres.', 'explication']],
   c: [['Tournoi', 30, 'Matchs de 6 minutes, 4 contre 4 avec gardien ; les équipes au repos arbitrent.', 'Mon équipe joue en passes.', '', 'tournoi:foot']],
   r: [['Retour au calme', 5, 'Résultats et prix du fair-play.', 'etirements']]},
  {t: 'Évaluation', o: 'Évaluer contrôle orienté, une-deux, démarquage et défense.', comp: ['HME2', 'HME4', 'HSC1', 'HSC2'], e: [
    ['Échauffement en autonomie', 6, 'Par équipe : passes, contrôles, tirs.', 'trois'],
    ['Consignes', 4, 'Explication des épreuves, de l\'ordre de passage et de la grille d\'évaluation.', 'explication']],
   c: [['Épreuve 1 : contrôle-passe', 8, 'Recevoir, contrôler vers la porte annoncée, passer dans un mini-but : 5 essais.', '3 réussites sur 5.', '', 'trois'],
    ['Épreuve 2 : match observé', 22, 'Matchs 4 contre 4 ; grille : démarquage, une-deux, défense, règles.', 'Je me démarque et je défends avec mon équipe.', '', 'match:foot:4c4']],
   r: [['Bilan', 5, 'Auto-évaluation sur la fiche, puis comparaison avec la grille du prof.', 'explication']]}
]},
3: {th: 'Jouer en équipe organisée : postes, transitions, finition', comp: ['HME2', 'HME4', 'HSC1', 'HSC2'], l: [
  {t: 'Les postes en futsal', o: 'Connaître les postes (gardien, défenseur, ailiers, pivot) et occuper son poste.', comp: ['HME4', 'HSC2'], e: [
    ['Passes en losange', 5, 'Par 4 en losange : passes en suivant le ballon.', 'carre:foot:0'],
    ['Les postes', 5, 'Au tableau : le losange du futsal (défenseur, 2 ailiers, pivot).', 'explication']],
   c: [['Losange à vide', 10, 'Chaque équipe fait circuler le ballon en losange jusqu\'au tir, sans adversaire puis contre 2 défenseurs.', 'Chacun reste à son poste.', '', 'demi:foot:4c2'],
    ['Match à postes', 20, 'Matchs 4 contre 4 + gardien : chacun garde son poste 3 minutes, puis rotation.', 'J\'occupe mon poste et je connais mon rôle.', '', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Étirements ; quel poste vous convient ?', 'etirements']]},
  {t: 'La contre-attaque', o: 'Passer vite de la défense à l\'attaque après récupération.', comp: ['HME4', 'HSC2'], e: [
    ['Sprints avec ballon', 5, 'Conduites rapides sur 20 m.', 'files'],
    ['Passes longues', 5, 'Par deux à 15 m : passes longues au sol.', 'deux']],
   c: [['2 contre 1 en transition', 12, 'Le gardien relance vers 2 attaquants qui partent en 2 contre 1 contre un défenseur qui revient.', 'Nous tirons en moins de 3 passes.', '', 'demi:foot:2c1'],
    ['Match transitions', 18, 'Matchs 4 contre 4 : but en contre-attaque (moins de 3 passes après récupération) = 2 points.', 'Je pars dès la récupération.', '', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Étirements en cercle (mollets, cuisses, épaules, 20 s chacun) ; chacun dit une chose réussie pendant la leçon.', 'etirements']]},
  {t: 'La finition', o: 'Tirer avec précision (intérieur placé, cou-de-pied) dans différentes situations.', comp: ['HME2'], e: [
    ['Jonglages', 5, 'Jonglages pied, cuisse, tête (ballon mousse).', 'libre'],
    ['Tirs sur gardien', 5, 'Tirs à 8 m sur gardien, pieds alternés.', 'tir:foot']],
   c: [['Ateliers de tir', 15, '3 ateliers : tir après conduite, tir en une touche sur passe latérale, tir de volée sur lancer (ballon mousse). Gardien tournant.', 'Je cadre 3 tirs sur 5.', '', 'tir:foot'],
    ['Match', 15, 'Matchs 4 contre 4 : tir cadré non marqué = 1 point, but = 3 points.', 'Je tente ma chance quand je suis bien placé.', '', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Étirements en cercle (mollets, cuisses, épaules, 20 s chacun) ; chacun dit une chose réussie pendant la leçon.', 'etirements']]},
  {t: 'Les coups de pied arrêtés', o: 'Organiser corners, coups francs et touches.', comp: ['HSC1', 'HSC2'], e: [
    ['Passes', 5, 'Passes à deux.', 'deux'],
    ['Règles', 5, 'Corner, coup franc direct et indirect, touche au pied.', 'explication']],
   c: [['Combinaisons', 12, 'Chaque équipe invente une combinaison de corner et une de coup franc.', 'Notre combinaison se termine par un tir.', '', 'demi:foot:4c4'],
    ['Match', 18, 'Matchs 4 contre 4 ; on utilise ses combinaisons.', 'Nous utilisons nos combinaisons.', '', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Étirements en cercle (mollets, cuisses, épaules, 20 s chacun) ; chacun dit une chose réussie pendant la leçon.', 'etirements']]},
  {t: 'Tournoi avec arbitrage', o: 'Jouer et arbitrer un tournoi.', comp: ['HSC1', 'HSC3'], e: [
    ['Échauffement par équipe', 6, 'Mené par le capitaine.', 'trois'],
    ['Gestes de l\'arbitre', 4, 'Révision des gestes.', 'explication']],
   c: [['Tournoi', 30, 'Matchs de 6 minutes, arbitre élève.', 'Je joue à mon poste.', '', 'tournoi:foot']],
   r: [['Retour au calme', 5, 'Annonce des résultats et du prix du fair-play.', 'etirements']]},
  {t: 'Évaluation', o: 'Évaluer jeu à postes, transitions, finition.', comp: ['HME2', 'HME4', 'HSC1', 'HSC2'], e: [
    ['Échauffement en autonomie', 6, 'Chaque équipe s\'échauffe seule avec sa fiche (mobilisation, exercices techniques, essais).', 'trois'],
    ['Consignes', 4, 'Grille.', 'explication']],
   c: [['Épreuve 1 : tirs', 8, '5 tirs dans des situations différentes.', '3 cadrés.', '', 'tir:foot'],
    ['Épreuve 2 : matchs observés', 22, 'Grille : poste, transitions, finition, règles.', 'Je tiens mon poste.', '', 'match:foot:4c4']],
   r: [['Bilan', 5, 'Auto-évaluation sur la fiche, puis comparaison avec la grille du prof.', 'explication']]}
]},
4: {th: 'Tactique collective : système de jeu, pressing, supériorité numérique', comp: ['HME4', 'HSC1', 'HSC2', 'GSS1'], l: [
  {t: 'Les systèmes 3-1 et 2-2', o: 'Comprendre deux systèmes de jeu et choisir selon l\'adversaire.', comp: ['HME4', 'HSC2'], e: [
    ['Rondo 4 contre 2', 5, 'Carrés de 10 m : 4 attaquants, 2 défenseurs au centre ; deux touches maximum ; le défenseur qui récupère échange avec le fautif.', 'carre:foot:2'],
    ['Les systèmes', 5, 'Au tableau : 3-1 (trois joueurs derrière, un pivot devant qui garde le ballon dos au but) et 2-2 (carré, rotations entre les 4 joueurs).', 'explication']],
   c: [['Mise en place', 10, 'Chaque équipe fait circuler le ballon dans le 3-1 puis dans le 2-2, contre 2 défenseurs passifs puis actifs ; le prof arrête le jeu pour corriger les places.', 'Je connais ma place dans chaque système.', '', 'demi:foot:4c2'],
    ['Matchs', 20, 'Matchs 4 contre 4 + gardiens de 2 × 4 minutes : chaque équipe joue un système par mi-temps et note lequel a créé le plus d\'occasions.', 'Notre système est visible dans le jeu.', '', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Étirements ; chaque équipe explique quel système lui convient et pourquoi.', 'etirements']]},
  {t: 'Le pressing', o: 'Récupérer le ballon haut en pressant à plusieurs, au bon moment.', comp: ['HSC2', 'GSS1'], e: [
    ['Sprints courts', 5, 'Sprints de 10 m avec changements de direction au signal.', 'files'],
    ['Pressing à deux', 5, 'Par 3 : un porteur, deux défenseurs qui le ferment ensemble (un coupe la passe, l\'autre presse).', 'trois']],
   c: [['Pressing sur relance', 12, 'Le gardien relance à la main vers 3 joueurs ; 3 défenseurs pressent dès que le gardien a le ballon. Point pour la défense si elle récupère en moins de 5 s, pour l\'attaque si elle passe la ligne médiane.', 'Nous récupérons le ballon en moins de 5 s une fois sur deux.', '', 'match:foot:3c3'],
    ['Match', 18, 'Matchs 4 contre 4 : un ballon récupéré dans le camp adverse vaut 1 point.', 'Mon équipe presse ensemble et pas un joueur seul.', '', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Pouls après 1 minute ; étirements ; le pressing coûte de l\'énergie : quand l\'utiliser ?', 'etirements']]},
  {t: 'La supériorité numérique', o: 'Exploiter un surnombre (gardien volant, exclusion) en trouvant le joueur libre.', comp: ['HME4', 'HSC2'], e: [
    ['Passes à 3', 5, 'Par 3 en triangle : passes en une touche.', 'trois'],
    ['Règles', 5, 'Le gardien volant (un joueur de champ remplace le gardien pour attaquer à 5), l\'exclusion de 2 minutes.', 'explication']],
   c: [['5 contre 4', 12, 'Une équipe attaque à 5, l\'autre défend à 4 + gardien ; l\'attaque fait circuler vite pour décaler un joueur libre ; 6 attaques puis on inverse.', 'Nous trouvons le joueur libre et il tire.', '', 'demi:foot:5c4'],
    ['Match', 18, 'Matchs 4 contre 4 : gardien volant autorisé les 2 dernières minutes de chaque match.', 'Nous utilisons le surnombre sans perdre le ballon.', '', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Étirements ; risque du gardien volant (but dans le but vide).', 'etirements']]},
  {t: 'Le football à 7 (dehors) ou à 5', o: 'S\'adapter à un plus grand terrain : largeur, profondeur, passes longues.', comp: ['HME4', 'GSS1'], e: [
    ['Échauffement', 5, 'Course lente, mobilisation, passes en mouvement par deux.', 'files'],
    ['Passes longues', 5, 'Par deux à 15-20 m : passes longues au sol puis en l\'air (intérieur, cou-de-pied).', 'deux']],
   c: [['Changements de jeu', 10, 'Jeu à 6 contre 3 sur un grand rectangle : marquer en faisant passer le ballon d\'un côté à l\'autre du terrain.', 'Je change le jeu vers le côté libre.', '', 'demi:foot:6c3'],
    ['Matchs sur grand terrain', 20, 'Matchs à 7 (dehors) ou à 5 (salle), chaque joueur à un poste.', 'J\'occupe l\'espace et je donne de la largeur.', '', 'match:foot:5c5']],
   r: [['Retour au calme', 5, 'Étirements ; ce qui change sur un grand terrain.', 'etirements']]},
  {t: 'Tournoi', o: 'Appliquer système, pressing et surnombre en tournoi.', comp: ['HSC1', 'HSC3'], e: [
    ['Échauffement par équipe', 6, 'Mené par le capitaine : passes, rondo, tirs sur le gardien.', 'trois'],
    ['Organisation', 4, 'Tableau du tournoi, arbitres, chaque équipe annonce son système.', 'explication']],
   c: [['Tournoi', 30, 'Matchs de 7 minutes, 4 contre 4 + gardien ; les équipes au repos arbitrent et notent si le système annoncé est respecté.', 'Notre système est appliqué pendant tout le match.', '', 'tournoi:foot']],
   r: [['Retour au calme', 5, 'Résultats, prix du fair-play, étirements.', 'etirements']]},
  {t: 'Évaluation : tactique collective', o: 'Montrer sa compréhension et son application de la tactique collective.', comp: ['HME4', 'HSC1', 'HSC2'], e: [
    ['Échauffement en autonomie', 6, 'Chaque équipe s\'échauffe seule.', 'trois'],
    ['Consignes', 4, 'Explication de la grille.', 'explication']],
   c: [['Matchs observés', 25, 'Matchs 4 contre 4 + gardien ; grille : place dans le système, pressing, utilisation du surnombre, règles, fair-play.', 'Je comprends et j\'applique la tactique de mon équipe.', '', 'match:foot:4c4'],
    ['Question tactique', 5, 'Au tableau, chacun place les joueurs pour une situation donnée (ex. : relance adverse à presser).', 'Je place correctement les joueurs.', '', 'explication']],
   r: [['Bilan', 5, 'Auto-évaluation sur la fiche, puis comparaison avec la grille du prof.', 'explication']]}
]},
5: {th: 'Analyser, coacher et arbitrer', comp: ['HSC1', 'HSC2', 'HSC3', 'GSS1'], l: [
  {t: 'Observer un match', o: 'Utiliser une grille d\'observation pour analyser une équipe.', comp: ['HSC1', 'GSS5'], e: [
    ['Échauffement en autonomie', 6, 'Par équipe : passes, rondo, tirs.', 'trois'],
    ['La grille', 4, 'Explication : passes réussies, pertes de balle, tirs (cadrés ou non), récupérations, zones.', 'explication']],
   c: [['Matchs observés', 25, 'Par 3 équipes : 2 jouent, la 3e observe (chaque observateur suit un joueur ou une statistique). Rotation toutes les 7 minutes.', 'Je remplis la grille sans erreur.', '', 'match:foot:4c4'],
    ['Analyse', 5, 'Chaque équipe lit ses statistiques et choisit un point à améliorer.', 'Notre point à améliorer s\'appuie sur les chiffres.', '', 'explication']],
   r: [['Retour au calme', 5, 'Étirements en cercle (mollets, cuisses, épaules, 20 s chacun) ; chacun dit une chose réussie pendant la leçon.', 'etirements']]},
  {t: 'Coacher son équipe', o: 'Donner une consigne précise et observer son effet.', comp: ['HSC2', 'HSC3'], e: [
    ['Échauffement mené par le coach', 6, 'Le coach de chaque équipe (élève) mène l\'échauffement.', 'trois'],
    ['Le rôle du coach', 4, 'Une consigne à la fois, positive et précise ; temps mort de 30 s.', 'explication']],
   c: [['Matchs coachés', 30, 'Matchs de 2 × 5 minutes : à la mi-temps, le coach donne une consigne basée sur ce qu\'il a vu ; on change de coach à chaque match.', 'L\'équipe applique la consigne du coach.', '', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Les coachs expliquent leur consigne et son effet ; étirements.', 'etirements']]},
  {t: 'Arbitrer officiellement', o: 'Arbitrer avec les règles officielles du futsal (fautes cumulées, 4 secondes, cartons).', comp: ['HSC1', 'HSC3'], e: [
    ['Les règles officielles', 6, 'Fautes cumulées (à la 6e faute, coup franc des 10 m), 4 secondes, remises en jeu, cartons jaune et rouge, gestes officiels.', 'explication'],
    ['Échauffement', 4, 'Chaque équipe s\'échauffe seule avec sa fiche (mobilisation, exercices techniques, essais).', 'trois']],
   c: [['Matchs arbitrés', 30, 'Matchs à deux arbitres élèves + un chronométreur qui compte les fautes cumulées ; rotation des rôles.', 'J\'arbitre juste et je compte les fautes.', '', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Retour des arbitres sur une décision difficile.', 'etirements']]},
  {t: 'Préparation physique du footballeur', o: 'Travailler vitesse, changements de direction et endurance intermittente.', comp: ['GSS1', 'GSS5'], e: [
    ['Activation', 6, 'Course lente, gammes, accélérations.', 'files'],
    ['Pouls', 4, 'Pouls au repos et zones d\'effort.', 'explication']],
   c: [['Circuit football', 18, '6 ateliers de 40 s (20 s de repos) : slalom en conduite, sprint-arrêt, sauts latéraux, gainage, passes au mur en une touche, tirs. 2 tours.', 'Je garde une bonne technique fatigué.', '', 'ateliers:foot:6'],
    ['Matchs intermittents', 12, 'Matchs de 2 minutes à fond, 1 minute de repos, pouls pris à la fin.', 'Je mets toute mon intensité pendant 2 minutes.', '', 'match:foot:3c3']],
   r: [['Retour au calme', 5, 'Pouls de récupération, étirements.', 'etirements']]},
  {t: 'Tournoi coaché et arbitré', o: 'Jouer, coacher ou arbitrer pendant un tournoi.', comp: ['HSC1', 'HSC2', 'HSC3'], e: [
    ['Échauffement par équipe', 6, 'Mené par le coach.', 'trois'],
    ['Organisation', 4, 'Rôles : joueurs, coach, arbitres, chronométreur.', 'explication']],
   c: [['Tournoi', 30, 'Matchs de 7 minutes avec coach et arbitres officiels.', 'Je tiens mon rôle (joueur, coach ou arbitre).', '', 'tournoi:foot']],
   r: [['Retour au calme', 5, 'Annonce des résultats et du prix du fair-play, puis étirements en cercle.', 'etirements']]},
  {t: 'Évaluation : jouer, coacher, arbitrer', o: 'Évaluer le jeu, une consigne de coach et un arbitrage.', comp: ['HSC1', 'HSC2', 'HSC3', 'GSS1'], e: [
    ['Échauffement par équipe', 6, 'Chaque équipe s\'échauffe seule avec sa fiche (mobilisation, exercices techniques, essais).', 'trois'],
    ['Consignes', 4, 'Explication des 3 évaluations.', 'explication']],
   c: [['Évaluation', 30, 'Chaque élève est évalué en match (grille de jeu), une fois comme coach (consigne pertinente) et une fois comme arbitre (règles, gestes).', 'Je réussis mes trois rôles.', '', 'match:foot:4c4']],
   r: [['Bilan', 5, 'Bilan écrit : ce que j\'ai appris, mes progrès, ce que je ferais autrement.', 'explication']]}
]},
6: {th: 'Projet d\'équipe et tournoi organisé par la classe', comp: ['HSC1', 'HSC2', 'HSC3', 'GSS1'], l: [
  {t: 'Équipes et projet', o: 'Former des équipes équilibrées et écrire un projet d\'équipe.', comp: ['HSC1', 'HSC2'], e: [
    ['Échauffement en autonomie', 6, 'Passes, rondo, tirs.', 'trois'],
    ['Présentation', 4, 'Le projet : tournoi organisé par la classe en fin de cycle, équipes fixes, rôles.', 'explication']],
   c: [['Matchs test', 15, 'Matchs 4 contre 4 avec équipes tirées au sort ; les capitaines élus observent.', 'Je montre mes points forts.', '', 'match:foot:4c4'],
    ['Projet d\'équipe', 15, 'Les capitaines composent des équipes équilibrées ; chaque équipe écrit nom, système, objectif, rôles (capitaine, coach, responsable échauffement).', 'Notre projet est écrit.', '', 'explication']],
   r: [['Retour au calme', 5, 'Étirements en cercle (mollets, cuisses, épaules, 20 s chacun) ; chacun dit une chose réussie pendant la leçon.', 'etirements']]},
  {t: 'Entraînement d\'équipe', o: 'Mener une séance d\'entraînement pour son équipe.', comp: ['HSC2', 'GSS1'], e: [
    ['Échauffement d\'équipe', 6, 'Mené par le responsable échauffement.', 'trois'],
    ['Objectif', 4, 'Chaque équipe écrit l\'objectif de la séance.', 'explication']],
   c: [['Séance d\'équipe', 15, 'Chaque équipe choisit 2 exercices dans la banque (rondo, pressing, combinaisons, tirs) pour travailler son objectif.', 'La séance correspond à notre objectif.', '', 'demi:foot:4c2'],
    ['Matchs amicaux', 15, 'Matchs entre équipes ; le coach observe l\'objectif.', 'Nous progressons sur notre objectif.', '', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Notes de l\'équipe.', 'etirements']]},
  {t: 'Préparer le tournoi', o: 'Organiser le tournoi : planning, arbitres, résultats, règlement.', comp: ['HSC1', 'HSC2'], e: [
    ['Échauffement d\'équipe', 6, 'Chaque équipe s\'échauffe seule avec sa fiche (mobilisation, exercices techniques, essais).', 'trois'],
    ['Commissions', 4, 'Répartition : règlement, planning, arbitrage, résultats et classement.', 'explication']],
   c: [['Commissions', 15, 'Chaque commission prépare sa partie (règlement écrit, planning des matchs, liste des arbitres, tableau).', 'Notre commission est prête.', '', 'explication'],
    ['Matchs d\'essai', 15, 'Matchs avec le règlement du tournoi.', 'Le règlement fonctionne.', '', 'match:foot:4c4']],
   r: [['Retour au calme', 5, 'Mise en commun de ce que chaque groupe a préparé ; étirements.', 'etirements']]},
  {t: 'Tournoi : poules', o: 'Jouer et arbitrer la phase de poules.', comp: ['HSC1', 'HSC3'], e: [
    ['Échauffement d\'équipe', 6, 'Chaque équipe s\'échauffe seule avec sa fiche (mobilisation, exercices techniques, essais).', 'trois'],
    ['Lancement', 4, 'Présentation du tableau par la commission.', 'explication']],
   c: [['Phase de poules', 30, 'Matchs de 7 minutes, arbitrés par les équipes au repos ; résultats mis à jour par la commission.', 'Le tournoi se déroule sans l\'aide du prof.', '', 'tournoi:foot']],
   r: [['Retour au calme', 5, 'Classement.', 'etirements']]},
  {t: 'Tournoi : phase finale', o: 'Jouer et arbitrer la phase finale.', comp: ['HSC1', 'HSC3'], e: [
    ['Échauffement d\'équipe', 6, 'Chaque équipe s\'échauffe seule avec sa fiche (mobilisation, exercices techniques, essais).', 'trois'],
    ['Tableau final', 4, 'Présentation des demi-finales.', 'explication']],
   c: [['Phase finale', 30, 'Demi-finales et finale (2 × 6 minutes), match de classement ; arbitrage officiel par les meilleurs arbitres.', 'Je joue ou j\'arbitre avec respect.', '', 'tournoi:foot']],
   r: [['Prix', 5, 'Remise des prix : vainqueur, fair-play, meilleur arbitre.', 'explication']]},
  {t: 'Évaluation : performance et rôles', o: 'Évaluer son niveau de jeu et son rôle dans l\'équipe et l\'organisation.', comp: ['HSC1', 'HSC2', 'GSS1'], e: [
    ['Échauffement d\'équipe', 6, 'Chaque équipe s\'échauffe seule avec sa fiche (mobilisation, exercices techniques, essais).', 'trois'],
    ['Consignes', 4, 'Grille finale.', 'explication']],
   c: [['Matchs observés', 25, 'Grille : technique, tactique, rôle dans l\'équipe, fair-play.', 'Je joue efficacement et je tiens mon rôle.', '', 'match:foot:4c4'],
    ['Bilan d\'équipe', 5, 'Chaque équipe évalue son projet.', 'Notre objectif est atteint ou expliqué.', '', 'explication']],
   r: [['Bilan écrit', 5, 'Bilan individuel : où continuer le football (club, futsal, loisir) ?', 'explication']]}
]}
}});
