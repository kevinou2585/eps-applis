/* Handball : 6 leçons par année (1re → 6e secondaire). [nom, minutes, consigne, (réussite, variante,) schéma] */
PREPA_ADD({id: 'hand', sport: 'Handball', mat: 'Ballons de hand taille 1-2 (1 pour 2), chasubles, cônes, 2 à 4 buts (ou tapis debout), plots pour la zone, sifflet.', an: {
1: {th: 'Découvrir le handball : passer, tirer, respecter la zone', comp: ['HME2', 'HME4', 'HSC1', 'HSC3'], l: [
  {t: 'Manipuler, passer, recevoir', o: 'Passer à une main (bras armé, coude haut) et recevoir à deux mains en « W ».', e: [
    ['Manipulations', 4, 'Chacun son ballon : le faire tourner autour de la taille, le lancer et le rattraper, dribbler main droite et main gauche.', 'libre'],
    ['Balle au chasseur', 6, 'Les chasseurs se passent le ballon (sans courir avec) et touchent les fuyards avec le ballon tenu en main.', 'chat']],
   c: [['Passes à deux', 8, 'Par deux à 4 m : passe à une main, bras armé derrière la tête, pied opposé devant. Réception mains en W devant la poitrine.', 'Je réussis 8 passes sur 10.', 'Reculer de 2 m après chaque série réussie.', 'deux'],
    ['Passe et suis', 8, 'Carré de 4 cônes : je passe et je cours à la place de celui qui a reçu.', 'Le ballon ne tombe pas pendant 2 minutes.', 'Deux ballons dans le carré.', 'carre:hand'],
    ['10 passes', 10, 'Deux équipes : 10 passes à la suite = 1 point. Interdit de courir avec le ballon (3 pas maximum).', 'Mon équipe réussit 10 passes.', '6 passes pour les classes qui peinent.', 'match:hand:4c4']],
   r: [['Passes au calme', 5, 'En cercle, passe à celui qu\'on nomme ; étirements des épaules.', 'cercle']]},
  {t: 'Tirer au but', o: 'Tirer en appui, bras armé haut, en visant les coins du but.', e: [
    ['Lancers de précision', 5, 'Viser des cônes posés sur un banc à 5 m.', 'tir:hand'],
    ['Passes à deux', 5, 'Passes en reculant après réussite.', 'deux']],
   c: [['Tir en appui', 8, 'Colonnes à 7 m : tir en appui, pied opposé devant, viser les coins (cerceaux accrochés).', 'Je touche un coin 3 fois sur 6.', 'Tir après 3 pas.', 'tir:hand'],
    ['Le gardien', 8, 'Par 3 : un tireur, un gardien, un ramasseur ; on tourne. Le gardien se tient bas, bras écartés.', 'Je marque 2 fois sur 5 ; comme gardien j\'arrête 1 tir.', '', 'tir:hand'],
    ['Passe et tir', 10, 'Une passe du partenaire, réception et tir en appui.', 'J\'enchaîne sans marcher.', '', 'demi:hand:2c1']],
   r: [['Bilan', 5, 'Où viser ? Étirements.', 'explication']]},
  {t: 'Les règles : les 3 pas et le dribble', o: 'Faire au maximum 3 pas avec le ballon, dribbler pour avancer, pas de double dribble.', comp: ['HME2', 'HME4', 'HSC1'], e: [
    ['Les 3 pas', 5, 'Ballon en main : 3 pas puis arrêt ; dribble, attraper, 3 pas, passe.', 'files'],
    ['Dribble', 5, 'Dribble libre, changement de main au signal.', 'libre']],
   c: [['Parcours 3 pas + tir', 8, 'Départ au milieu : dribble jusqu\'à un cône placé à 9 m du but, prise de balle à deux mains, 3 appuis, tir en suspension dans un but sans gardien. Retour en trottinant ; 2 colonnes.', 'Je fais au maximum 3 appuis après le dribble et je tire avant la zone.', '', 'slalom:hand'],
    ['Jeu des passes avec règles', 8, '4 contre 4 : 3 pas, 3 secondes, pas de contact. L\'arbitre élève siffle.', 'Je fais moins de 2 fautes.', '', 'match:hand:4c4'],
    ['Petits matchs', 10, '4 contre 4 sur un demi-terrain transversal, deux petits buts (ou tapis debout), sans gardien : pas plus de 3 pas avec le ballon, pas de contact.', 'Je passe le ballon au lieu de courir avec.', '', 'match:hand:4c4']],
   r: [['Gestes d\'arbitre', 5, 'Mimer les gestes : marcher, reprise de dribble, faute.', 'explication']]},
  {t: 'Respecter la zone', o: 'Ne pas entrer dans la zone du gardien ; tirer avant la zone.', comp: ['HME2', 'HME4', 'HSC1', 'HSC2'], e: [
    ['Chat dans la zone', 5, 'Jeu du chat où la zone (6 m) est un refuge pendant 3 secondes.', 'chat'],
    ['Tirs à 7 m', 5, 'Deux colonnes à 7 m : passe au prof, réception, tir en appui ; on vise les coins du but.', 'tir:hand']],
   c: [['Tir sur appui au bord de la zone', 8, 'Tir en suspension simple au bord de la zone (on peut retomber dedans si le tir est parti avant).', 'Mon pied d\'appel est hors zone.', '', 'tir:hand'],
    ['3 contre 2 au but', 8, '3 attaquants contre 2 défenseurs hors zone et un gardien.', 'Nous marquons 2 fois sur 4.', '', 'demi:hand:3c2'],
    ['Match 4 contre 4 + gardien', 10, '4 contre 4 avec un gardien par équipe : zone des 6 m interdite aux joueurs, 3 pas, 3 secondes, pas de reprise de dribble, remise en jeu au gardien après un but. Gardien changé à chaque but.', 'Je respecte la zone et la règle des 3 pas.', '', 'match:hand:4c4']],
   r: [['Retour', 5, 'Étirements des épaules, des cuisses et des mollets, 20 s chacun ; rappel d\'une règle vue pendant la leçon.', 'etirements']]},
  {t: 'Jouer ensemble et défendre', o: 'Avancer par des passes vers le but ; défendre entre son adversaire et le but.', e: [
    ['Passes en course', 5, 'Par deux, traverser le terrain en se faisant des passes.', 'deux'],
    ['Miroir défensif', 5, 'Par deux sans ballon.', 'deux']],
   c: [['Montée de balle', 8, '3 contre 2 sur tout le terrain : marquer en moins de 6 passes.', 'Nous avançons vers le but.', '', 'match:hand:3c2'],
    ['Tournoi 4 contre 4', 18, 'Matchs de 5 minutes, équipes au repos arbitrent.', 'Je participe en attaque et en défense.', '', 'match:hand:4c4']],
   r: [['Fair-play', 5, 'Poignée de mains et bilan.', 'etirements']]},
  {t: 'Évaluation : tir et match', o: 'Montrer la passe, le tir et le respect des règles en match.', e: [
    ['Échauffement connu', 5, 'Échauffement connu des élèves : trot, mobilisation, passes à deux, tirs à 7 m.', 'deux'],
    ['Tirs', 5, 'Chaque joueur tire 3 fois de son poste habituel sur le gardien de son équipe, en variant les coins.', 'tir:hand']],
   c: [['Épreuve 1 : tir', 8, '5 tirs après 3 pas sur gardien, viser les coins.', '2 buts sur 5.', '', 'tir:hand'],
    ['Épreuve 2 : match observé', 20, '4 contre 4 + gardien : passes, démarquage, respect des règles.', 'Je participe et je respecte les règles.', '', 'match:hand:4c4']],
   r: [['Bilan', 5, 'Auto-évaluation sur la fiche puis comparaison avec l\'évaluation du prof.', 'explication']]}
]},
2: {th: 'Jouer vers l\'avant : tir en suspension, démarquage, montée de balle', comp: ['HME2', 'HME4', 'HSC1', 'HSC2'], l: [
  {t: 'Le tir en suspension', o: 'Tirer en l\'air après 3 pas, appel sur le pied opposé au bras tireur, bras armé haut.', e: [
    ['Le rythme des 3 pas', 5, 'Sans ballon puis ballon en main : 3 appuis (pour un droitier : gauche, droite, appel sur le pied gauche) puis saut vers le haut en levant le genou droit. Le prof frappe le rythme dans les mains.', 'files'],
    ['Passes à deux en reculant', 5, 'Passes à une main, on recule d\'un pas toutes les 3 passes réussies.', 'deux']],
   c: [['Suspension au-dessus d\'un obstacle', 10, 'Un petit tapis ou un banc bas à 7 m représente la zone : 3 pas, appel avant l\'obstacle, tir en l\'air, réception sur le tapis.', 'Mon ballon part avant que je retombe.', 'Viser un cerceau dans un coin du but.', 'tir:hand'],
    ['Passe et tir en suspension', 10, 'Deux colonnes : le passeur donne au tireur lancé, réception en course, 3 pas, tir en suspension sur gardien.', 'Je marque 2 fois sur 5 sans marcher.', 'Le passeur devient défenseur passif.', 'demi:hand:2c1'],
    ['Concours par équipes', 6, 'Deux équipes, deux buts avec gardien : chaque but en suspension rapporte 1 point à son équipe. Première équipe à 10.', 'Mon équipe atteint 10 buts.', '', 'tir:hand']],
   r: [['Retour au calme', 5, 'Étirements des épaules, des mollets et des cuisses ; chacun montre le geste au ralenti à son voisin.', 'etirements']]},
  {t: 'Se démarquer pour recevoir', o: 'Se déplacer dans un espace libre, loin de son défenseur, pour offrir une passe au porteur.', e: [
    ['Chat et souris', 5, 'Par deux sans ballon : la souris essaie de se décoller de son chat par des changements de rythme et de direction. Au signal, la souris lève la main : est-elle libre ?', 'chat'],
    ['4 contre 1 dans un carré', 5, 'Garder le ballon dans un carré de 8 m ; le défenseur qui touche le ballon change de place avec le passeur.', 'carre:hand:1']],
   c: [['3 contre 2 conserver', 10, 'Sur un demi-terrain : 8 passes consécutives = 1 point. Le porteur ne peut pas courir ; les 2 autres doivent se démarquer.', 'Je me rends disponible à chaque passe.', '3 contre 3 avec 10 passes.', 'demi:hand:3c2'],
    ['Match à thème « vers l\'avant »', 16, 'Matchs 5 contre 5 avec gardien : un but marqué après une passe reçue en course vers l\'avant vaut 2 points.', 'Mon équipe marque un but « vers l\'avant ».', 'Dribble interdit pour forcer les passes.', 'match:hand:5c5']],
   r: [['Bilan', 5, 'Discussion : où se placer pour recevoir ? (loin du défenseur, dans l\'axe du but). Étirements.', 'explication']]},
  {t: 'La montée de balle rapide', o: 'Remonter le terrain vite après une récupération, en passes vers l\'avant.', comp: ['HME2', 'HME4', 'HSC2', 'GSS1'], e: [
    ['Passes en course à 3', 5, 'Traversées du terrain à 3 de front, passes au milieu, sans dribble.', 'trois'],
    ['Sprints avec ballon', 5, 'Sprints de 15 m en dribble, puis en passe avec un partenaire.', 'files']],
   c: [['2 contre 1 tout terrain', 10, 'Le défenseur attend au milieu ; 2 attaquants partent de leur zone et doivent marquer en moins de 6 secondes.', 'Nous marquons en moins de 6 s, 2 fois sur 3.', '3 contre 2.', 'match:hand:2c1'],
    ['Vague continue', 10, 'Après le tir, le défenseur et le gardien relancent vers 2 nouveaux attaquants dans l\'autre sens.', 'Je relance vite après le tir.', '', 'match:hand:2c1'],
    ['Petit match', 6, '5 contre 5 : un but en moins de 5 secondes après la récupération vaut 2 points.', '', '', 'match:hand:5c5']],
   r: [['Retour au calme', 5, 'Marche, prise du pouls (15 s × 4) et étirements.', 'etirements']]},
  {t: 'Défendre en individuel', o: 'Défendre entre son adversaire et le but, bras levés, sans contact illégal.', e: [
    ['Pas chassés et course arrière', 5, 'Sur la largeur du terrain, au signal : pas chassés, course arrière, sprint.', 'files'],
    ['Le cône à protéger', 5, 'Par deux sans ballon : l\'attaquant essaie de toucher un cône que le défenseur protège en restant face à lui.', 'deux']],
   c: [['1 contre 1 au but', 10, 'Départ à 12 m : l\'attaquant a 3 pas et 1 dribble pour aller tirer ; le défenseur gêne, bras levés, sans pousser.', 'Je défends sans faute.', 'Ajouter une passe d\'un partenaire.', 'demi:hand:1c1'],
    ['Match en défense individuelle', 16, '5 contre 5 : chaque défenseur suit un attaquant de la même couleur de chasuble.', 'Je sais toujours où est mon joueur.', '', 'match:hand:5c5']],
   r: [['Retour au calme', 5, 'Étirements et rappel des fautes (pousser, tenir, frapper le bras).', 'etirements']]},
  {t: 'Règles et arbitrage', o: 'Appliquer zone, marcher, reprise de dribble, jet franc et jet de 7 m ; arbitrer avec les gestes.', comp: ['HME2', 'HSC1', 'HSC2', 'HSC3'], e: [
    ['Les gestes de l\'arbitre', 5, 'Le prof montre une situation, les élèves font le geste : marcher, reprise de dribble, zone, jet franc, 7 m, 2 minutes.', 'explication'],
    ['Jets de 7 m', 5, 'Chaque élève tire 2 jets de 7 m sur gardien.', 'tir:hand']],
   c: [['Tournoi arbitré', 22, 'Matchs de 5 minutes : chaque élève arbitre une fois avec un sifflet ; l\'équipe au repos tient la feuille de match.', 'J\'arbitre en annonçant la faute avec le bon geste.', 'Deux arbitres (un par demi-terrain).', 'match:hand:5c5']],
   r: [['Retour', 6, 'Les arbitres racontent une décision difficile ; élection de l\'équipe la plus fair-play.', 'explication']]},
  {t: 'Évaluation : suspension, démarquage, match', o: 'Montrer le tir en suspension, le démarquage et la montée de balle.', e: [
    ['Échauffement en autonomie', 5, 'Par groupes, avec la fiche : passes, 3 pas, tirs.', 'deux'],
    ['Tirs libres', 5, 'Tirs en appui et en suspension.', 'tir:hand']],
   c: [['Épreuve 1 : tir en suspension', 8, '5 tirs en suspension après passe, sur gardien.', '2 buts et un geste correct.', '', 'tir:hand'],
    ['Épreuve 2 : match observé', 20, 'Matchs 5 contre 5 : démarquage, montée de balle, défense, respect des règles.', 'Je participe en attaque et en défense.', '', 'match:hand:5c5']],
   r: [['Bilan', 5, 'Auto-évaluation sur fiche et étirements.', 'explication']]}
]},
3: {th: 'Attaque placée et défense de zone', comp: ['HME2', 'HME4', 'HSC1', 'HSC2', 'GSS1'], l: [
  {t: 'Les postes en attaque', o: 'Occuper les postes (ailiers, arrières, demi-centre, pivot) et faire circuler le ballon.', e: [
    ['Passes en arc de cercle', 5, 'Les joueurs se placent autour de la zone à 9 m et font circuler le ballon d\'un ailier à l\'autre le plus vite possible.', 'cercle'],
    ['Tirs de chaque poste', 5, 'Une colonne par poste ; on tire puis on change de poste.', 'tir:hand']],
   c: [['Circulation à 6 sans défense', 8, 'Le ballon doit faire l\'aller-retour d\'un ailier à l\'autre en moins de 10 secondes, chacun avançant vers le but quand il reçoit.', 'Le ballon ne tombe pas.', 'Ajouter 2 défenseurs.', 'demi:hand:6c0'],
    ['4 contre 3 au but', 10, '4 attaquants (2 arrières, 2 ailiers) contre 3 défenseurs devant la zone et un gardien.', 'Nous trouvons l\'ailier libre.', '', 'demi:hand:4c3'],
    ['Match 6 contre 6', 8, 'Match 6 contre 6 : chaque joueur reste à son poste en attaque (ailiers, arrières, demi-centre, pivot) ; arrêts du jeu pour corriger les placements.', 'Je reste dans mon couloir et j\'occupe la largeur.', '', 'match:hand:6c6']],
   r: [['Retour au calme', 5, 'Étirements ; chacun nomme son poste préféré.', 'etirements']]},
  {t: 'Fixer et décaler', o: 'Attirer un défenseur vers soi (fixer) puis passer au partenaire libre.', e: [
    ['Passes par 3', 5, 'Passes en mouvement par trois.', 'trois'],
    ['Feinte de corps', 5, '1 contre 1 passif : feinte à droite, départ à gauche.', 'demi:hand:1c1']],
   c: [['2 contre 1 : fixer', 10, 'L\'arrière attaque l\'intervalle ; si le défenseur vient, il passe à l\'ailier, sinon il tire.', 'Je passe quand le défenseur vient sur moi.', 'Défenseur plus actif.', 'demi:hand:2c1'],
    ['3 contre 2', 10, 'Enchaîner deux fixations pour libérer le 3e joueur.', 'Nous marquons 2 fois sur 4.', '', 'demi:hand:3c2'],
    ['Match à thème', 6, 'Un but après une fixation-passe vaut 2 points.', '', '', 'match:hand:6c6']],
   r: [['Bilan', 5, 'Quand faut-il passer plutôt que tirer ?', 'explication']]},
  {t: 'La défense de zone 6-0', o: 'Défendre en ligne devant la zone, glisser avec le ballon, sortir sur le tireur.', e: [
    ['Déplacements en ligne', 5, '6 joueurs en ligne glissent à droite et à gauche suivant un ballon tenu par le prof.', 'files'],
    ['Passes', 5, 'Passes à deux en mouvement.', 'deux']],
   c: [['La ligne qui glisse', 12, '6 contre 6 lent : la ligne glisse vers le ballon, le défenseur en face du porteur sort, les autres ferment.', 'Notre ligne reste groupée, sans trou.', 'Attaque à vitesse réelle.', 'demi:hand:6c6'],
    ['Match défense 6-0', 12, 'Défense en zone obligatoire ; 1 point bonus par ballon récupéré.', 'Je sors puis je reviens dans la ligne.', '', 'match:hand:6c6']],
   r: [['Retour au calme', 5, 'Étirements des jambes.', 'etirements']]},
  {t: 'Jouer avec le pivot', o: 'Trouver le pivot entre les défenseurs et le faire tirer.', e: [
    ['Passes au pivot', 5, 'Passes à rebond vers un partenaire entouré de cônes.', 'deux'],
    ['Tir du pivot', 5, 'Dos au but : réception, pivot, tir.', 'tir:hand']],
   c: [['Arrière + pivot contre 2', 10, 'L\'arrière fixe ; le pivot se place dans le dos du défenseur pour recevoir.', 'Notre passe au pivot réussit 2 fois sur 5.', '', 'demi:hand:2c2'],
    ['Match avec pivot', 14, 'Chaque équipe a un pivot ; un but du pivot vaut 2.', '', '', 'match:hand:6c6']],
   r: [['Bilan', 6, 'Le pivot explique ce qui l\'aide à recevoir.', 'explication']]},
  {t: 'Tournoi', o: 'Appliquer attaque placée et défense de zone en match, arbitrage par les élèves.', comp: ['HSC1', 'HSC2', 'HSC3'], e: [
    ['Échauffement d\'équipe', 6, 'Mené par le capitaine : passes, circulation, tirs.', 'cercle'],
    ['Tirs', 4, 'Tirs de chaque poste (ailiers, arrières, pivot) sur le gardien, 2 tirs par joueur et par poste.', 'tir:hand']],
   c: [['Tournoi', 24, 'Matchs de 6 minutes ; l\'équipe au repos arbitre et tient les statistiques (buts, tirs ratés, ballons perdus).', 'Mon équipe applique la défense de zone.', '', 'match:hand:6c6']],
   r: [['Classement', 5, 'Statistiques et fair-play.', 'explication']]},
  {t: 'Évaluation : attaque placée et défense', o: 'Montrer son rôle en attaque placée et en défense de zone.', e: [
    ['Échauffement en autonomie', 6, 'Chaque équipe s\'échauffe seule : trot, mobilisation, passes en mouvement, tirs de chaque poste.', 'cercle'],
    ['Tirs', 4, 'Tirs de chaque poste (ailiers, arrières, pivot) sur le gardien, 2 tirs par joueur et par poste.', 'tir:hand']],
   c: [['Matchs observés', 28, 'Grille : tenue du poste, fixation-passe, défense de zone, respect des règles.', 'Je tiens mon poste et je participe à la défense.', '', 'match:hand:6c6']],
   r: [['Bilan', 5, 'Auto-évaluation sur la fiche puis comparaison avec l\'évaluation du prof.', 'explication']]}
]},
4: {th: 'Jeu collectif organisé : croisés, défense 5-1, contre-attaque, gardien', comp: ['HME2', 'HME4', 'HSC1', 'HSC2', 'GSS1'], l: [
  {t: 'Les croisés', o: 'Croiser à deux pour désorganiser la défense et créer un tir.', e: [
    ['Passes en mouvement', 5, 'Par deux, passes en se croisant.', 'deux'],
    ['Tirs des arrières', 5, 'Tirs à 9 m en suspension.', 'tir:hand']],
   c: [['Croisé à 2', 10, 'Le demi-centre attaque en diagonale, l\'arrière croise dans son dos et reçoit.', 'Notre croisé crée un tir.', 'Contre 2 défenseurs actifs.', 'demi:hand:2c2'],
    ['Croisé à 3', 10, 'Ajouter l\'ailier qui rentre ou reste au large.', 'Je lis où est le joueur libre.', '', 'demi:hand:3c3'],
    ['Match', 6, 'Match 6 contre 6 : un but marqué après un croisé (deux attaquants qui se croisent avec passe) vaut 2 points.', 'Mon équipe tente au moins 3 croisés par mi-temps.', '', 'match:hand:6c6']],
   r: [['Retour', 5, 'Étirements des épaules, des cuisses et des mollets, 20 s chacun ; rappel d\'une règle vue pendant la leçon.', 'etirements']]},
  {t: 'La défense 5-1', o: 'Un défenseur avancé gêne la relance, les cinq autres en ligne.', e: [
    ['Déplacements défensifs', 5, 'Pas chassés, sorties et retours.', 'files'],
    ['Interceptions', 5, 'Jeu des 10 passes avec interceptions.', 'match:hand:4c4']],
   c: [['Mise en place 5-1', 12, 'Le défenseur avancé gêne le demi-centre et coupe les passes ; la ligne de 5 glisse.', 'L\'attaque met plus de temps à construire.', '', 'demi:hand:6c6'],
    ['Match', 12, 'Défense 5-1 obligatoire ; ballon intercepté = 1 point.', '', '', 'match:hand:6c6']],
   r: [['Bilan', 5, '6-0 ou 5-1 : laquelle nous convient ?', 'explication']]},
  {t: 'Contre-attaque organisée', o: 'Relancer vite après l\'arrêt du gardien (1re vague par les ailiers, 2e vague).', comp: ['HME2', 'HME4', 'HSC2', 'GSS1'], e: [
    ['Passes longues', 5, 'Du gardien vers un ailier qui court.', 'deux'],
    ['Sprints', 5, 'Sprints avec dribble.', 'files']],
   c: [['1re vague', 10, 'Tir, arrêt du gardien, relance directe vers l\'ailier qui part dès le tir.', 'L\'ailier reçoit au-delà du milieu.', '', 'match:hand:2c1'],
    ['2e vague', 10, 'Si la 1re vague est bloquée, 3 contre 2 avec les arrières qui arrivent.', 'Nous marquons avant le retour de toute la défense.', '', 'match:hand:3c2'],
    ['Match', 6, 'Match 6 contre 6 : un but marqué en contre-attaque (en moins de 3 passes après la récupération) vaut 2 points.', 'Je pars en course dès que mon équipe récupère le ballon.', '', 'match:hand:6c6']],
   r: [['Retour', 5, 'Pouls et étirements.', 'etirements']]},
  {t: 'Le gardien de but', o: 'Se placer sur l\'arc, réduire l\'angle, réagir et relancer.', comp: ['HME2', 'HME4', 'GSS2', 'GSS4'], e: [
    ['Réflexes', 5, 'Par deux : attraper des balles lancées vite à droite, à gauche, en haut, en bas.', 'deux'],
    ['Placement sur l\'arc', 5, 'Le gardien suit un ballon qui circule à 9 m en restant sur l\'arc.', 'tir:hand']],
   c: [['Tout le monde gardien', 12, 'Chacun passe 3 minutes dans le but face à des tirs de différents postes.', 'Je me place pour réduire l\'angle.', 'Tirs en suspension.', 'tir:hand'],
    ['Match avec gardien tournant', 12, 'Match 6 contre 6 : le gardien change à chaque but encaissé, pour que chacun teste le poste. Le gardien relance vite vers l\'ailier qui part.', 'Comme gardien, je me place sur la bissectrice et je relance vite.', '', 'match:hand:6c6']],
   r: [['Retour', 5, 'Étirements ; qu\'est-ce qui fait peur dans le but ?', 'etirements']]},
  {t: 'Tournoi', o: 'Utiliser croisés, défense et contre-attaque en match.', comp: ['HSC1', 'HSC2', 'HSC3'], e: [
    ['Échauffement d\'équipe', 6, 'Le capitaine mène l\'échauffement : trot, mobilisation, passes en mouvement, tirs sur le gardien.', 'cercle'],
    ['Tirs', 4, 'Tirs de chaque poste (ailiers, arrières, pivot) sur le gardien, 2 tirs par joueur et par poste.', 'tir:hand']],
   c: [['Tournoi', 24, 'Matchs de 7 minutes ; arbitres et table de marque élèves.', 'Notre équipe utilise ses combinaisons.', '', 'match:hand:6c6']],
   r: [['Classement', 5, 'Mise à jour du classement et prix du fair-play voté par les arbitres.', 'explication']]},
  {t: 'Évaluation : jeu collectif', o: 'Montrer croisés, défense organisée et contre-attaque.', e: [
    ['Échauffement en autonomie', 6, 'Chaque équipe s\'échauffe seule : trot, mobilisation, passes en mouvement, tirs de chaque poste.', 'cercle'],
    ['Tirs', 4, 'Chaque joueur tire 3 fois de son poste habituel sur le gardien de son équipe, en variant les coins.', 'tir:hand']],
   c: [['Matchs observés', 28, 'Grille : action collective, défense, contre-attaque, règles.', 'J\'utilise une action collective par match.', '', 'match:hand:6c6']],
   r: [['Bilan', 5, 'Auto-évaluation sur la fiche puis comparaison avec l\'évaluation du prof.', 'explication']]}
]},
5: {th: 'Tactique : défense étagée, supériorité numérique, combinaisons', comp: ['HME2', 'HME4', 'HSC1', 'HSC2', 'GSS1'], l: [
  {t: 'Attaquer une défense 3-2-1', o: 'Trouver les intervalles d\'une défense étagée par des passes rapides.', e: [
    ['Échauffement mené par élèves', 6, 'Un groupe mène passes, circulation et tirs.', 'cercle'],
    ['Tirs à distance', 4, 'Arrières à 9 m.', 'tir:hand']],
   c: [['Mise en place 3-2-1', 10, 'Une équipe apprend la défense étagée, l\'autre attaque lentement puis vite.', 'Je repère l\'intervalle libre.', '', 'demi:hand:6c6'],
    ['Attaque des intervalles', 14, 'L\'attaque doit pénétrer entre deux défenseurs avant de passer ou tirer.', 'Notre attaque crée un tir de près.', '', 'demi:hand:6c6']],
   r: [['Bilan', 5, 'Points faibles d\'une défense étagée.', 'explication']]},
  {t: 'Supériorité et infériorité numérique', o: 'Exploiter un joueur en plus ; défendre à 5 contre 6.', e: [
    ['Circulation rapide', 5, 'Passes autour de la zone.', 'cercle'],
    ['Tirs des ailiers', 5, 'Angle fermé.', 'tir:hand']],
   c: [['6 contre 5', 12, 'L\'attaque cherche le joueur libre par des passes rapides, sans précipiter.', 'Nous marquons 3 fois sur 5.', '', 'demi:hand:6c5'],
    ['5 contre 6', 12, 'Une équipe attaque à 6, l\'autre défend à 5 (un défenseur exclu 2 minutes) : la défense se resserre et protège l\'axe ; l\'attaque cherche à exploiter la supériorité numérique par des passes rapides vers l\'aile.', 'En défense, je réduis l\'espace avec mes voisins ; en attaque, je donne le ballon au joueur libre.', '', 'demi:hand:5c6']],
   r: [['Retour', 5, 'Étirements des épaules, des cuisses et des mollets, 20 s chacun ; rappel d\'une règle vue pendant la leçon.', 'etirements']]},
  {t: 'Créer ses combinaisons', o: 'Inventer et répéter 2 combinaisons d\'équipe.', e: [
    ['Échauffement d\'équipe', 6, 'Le capitaine mène l\'échauffement : trot, mobilisation, passes en mouvement, tirs sur le gardien.', 'cercle'],
    ['Tirs', 4, 'Tirs de chaque poste (ailiers, arrières, pivot) sur le gardien, 2 tirs par joueur et par poste.', 'tir:hand']],
   c: [['Atelier combinaisons', 12, 'Chaque équipe invente 2 combinaisons (croisé, bloc, entrée d\'ailier) et les dessine.', 'Chacun connaît son déplacement.', '', 'demi:hand:6c6'],
    ['Opposition', 12, 'L\'attaque annonce sa combinaison par un code.', 'La combinaison marche 1 fois sur 3.', '', 'match:hand:6c6']],
   r: [['Bilan', 5, 'Ce qu\'on garde.', 'explication']]},
  {t: 'Beach handball', o: 'Découvrir une autre forme du handball : 4 contre 4, but spectaculaire.', e: [
    ['Passes courtes', 5, 'Par deux en se déplaçant : passes courtes et rapides à hauteur de poitrine, 2 minutes.', 'deux'],
    ['Tirs acrobatiques', 5, 'Tir en vrille ou « kung-fu » (passe en l\'air et tir) en initiation, sur tapis.', 'tir:hand']],
   c: [['Tournoi 4 contre 4', 24, 'But spectaculaire = 2 points ; gardien qui monte en attaque.', 'Je tente une action spectaculaire en sécurité.', '', 'match:hand:4c4']],
   r: [['Retour', 6, 'Étirements des épaules, des cuisses et des mollets, 20 s chacun ; rappel d\'une règle vue pendant la leçon.', 'etirements']]},
  {t: 'Arbitrer et coacher', o: 'Arbitrer à deux, coacher son équipe (temps mort, changements).', comp: ['HSC1', 'HSC2', 'HSC3', 'GSS3'], e: [
    ['Gestes officiels', 5, 'Révision : jet franc, 7 m, 2 minutes, jeu passif.', 'explication'],
    ['Échauffement', 5, 'Le coach élève mène l\'échauffement de son équipe et annonce la consigne du premier match.', 'cercle']],
   c: [['Tournoi avec coachs', 24, 'Chaque équipe a un coach ; temps mort d\'une minute ; deux arbitres.', 'Mes consignes de coach sont courtes et claires.', '', 'match:hand:6c6']],
   r: [['Retour', 6, 'Les arbitres expliquent une décision.', 'explication']]},
  {t: 'Évaluation : projet tactique', o: 'Appliquer en match le projet tactique de son équipe.', e: [
    ['Échauffement en autonomie', 6, 'Échauffement préparé et mené par l\'équipe sans le prof : trot, mobilisation, passes, tirs.', 'cercle'],
    ['Projet écrit', 4, 'Une combinaison d\'attaque, une défense.', 'explication']],
   c: [['Matchs observés', 28, 'Grille : projet visible, efficacité, rôles (joueur, coach, arbitre), fair-play.', 'Notre projet est visible en match.', '', 'match:hand:6c6']],
   r: [['Bilan', 5, 'Retour sur le projet.', 'explication']]}
]},
6: {th: 'Autonomie : projet d\'équipe, préparation physique, tournoi organisé', comp: ['HME2', 'HSC1', 'HSC2', 'HSC3', 'GSS1', 'GSS5'], l: [
  {t: 'Diagnostic et équipes', o: 'Évaluer son niveau, former des équipes équilibrées et choisir un projet.', e: [
    ['Échauffement libre guidé', 6, 'Les élèves choisissent les exercices sur une fiche.', 'deux'],
    ['Tests de tir', 4, '5 tirs de 9 m chronométrés.', 'tir:hand']],
   c: [['Matchs test', 18, 'Équipes tirées au sort, matchs de 5 minutes ; on note les points forts.', 'Je connais mes points forts.', '', 'match:hand:6c6'],
    ['Constitution des équipes', 10, 'Équipes équilibrées (avec le prof) et capitaine.', 'Les équipes sont équilibrées.', '', 'explication']],
   r: [['Projet', 5, 'Nom et objectif d\'équipe.', 'explication']]},
  {t: 'Préparation physique du handballeur', o: 'Vitesse, détente, gainage et prévention des blessures (épaule, genou, cheville).', comp: ['HME2', 'GSS1', 'GSS2', 'GSS5'], e: [
    ['Activation', 6, 'Sauts, appuis, gainage dynamique.', 'files'],
    ['Pouls et zones', 4, 'Pouls de repos, explication des zones d\'effort.', 'explication']],
   c: [['Circuit hand', 16, '6 ateliers de 45 s : sprints navette, sauts sur un pied, gainage, tirs rapides, pas chassés, équilibre sur un pied (prévention cheville).', 'Je garde une bonne technique fatigué.', '2 tours.', 'ateliers:hand:6'],
    ['Matchs courts intenses', 12, '3 contre 3 sur demi-terrain, 3 minutes, récupération active.', '', '', 'demi:hand:3c3']],
   r: [['Récupération', 5, 'Pouls après effort et étirements longs.', 'etirements']]},
  {t: 'Préparer son équipe', o: 'Répéter systèmes, combinaisons et rôles.', e: [
    ['Échauffement d\'équipe', 6, 'Le capitaine mène l\'échauffement : trot, mobilisation, passes en mouvement, tirs sur le gardien.', 'cercle'],
    ['Tirs', 4, 'Aux postes du système.', 'tir:hand']],
   c: [['Répétition', 10, 'Chaque équipe répète ses 2 combinaisons d\'attaque : à vide, puis contre une défense passive, puis contre une défense active ; le capitaine annonce la combinaison par un code.', 'La combinaison se termine par un tir 3 fois sur 5 contre défense passive.', '', 'demi:hand:6c6'],
    ['Opposition', 18, 'Matchs d\'entraînement en annonçant la combinaison.', 'La combinaison crée un tir ouvert.', '', 'match:hand:6c6']],
   r: [['Ajustements', 5, 'Ce qu\'on garde, ce qu\'on change.', 'explication']]},
  {t: 'Tournoi organisé par les élèves (1)', o: 'Organiser un tournoi : planning, arbitrage, table de marque, statistiques.', comp: ['HSC1', 'HSC2', 'HSC3', 'GSS3'], e: [
    ['Organisation', 6, 'Répartition des rôles : arbitres, chrono, statistiques, matériel.', 'explication'],
    ['Échauffement d\'équipe', 4, 'Chaque équipe s\'échauffe seule avant son premier match.', 'cercle']],
   c: [['Tournoi', 28, 'Tournoi organisé par les élèves (planning, arbitres, tableau des résultats) ; chaque équipe joue au moins 3 matchs de 2 × 7 minutes.', 'Le tournoi se déroule sans l\'aide du prof.', '', 'match:hand:6c6']],
   r: [['Classement', 5, 'Mise à jour du classement et du fair-play.', 'explication']]},
  {t: 'Tournoi organisé par les élèves (2)', o: 'Phase finale ; analyser ses statistiques et adapter sa stratégie.', comp: ['HSC1', 'HSC2', 'HSC3', 'GSS5'], e: [
    ['Analyse', 5, 'Lecture des statistiques et objectif du jour.', 'explication'],
    ['Échauffement', 5, 'Chaque équipe s\'échauffe seule : trot, mobilisation, passes en mouvement, tirs de chaque poste.', 'cercle']],
   c: [['Finales', 28, 'Demi-finales et finales ; coachs et arbitres élèves.', 'Notre équipe applique son objectif.', '', 'match:hand:6c6']],
   r: [['Remise des prix', 5, 'Équipe championne, équipe fair-play, meilleur arbitre.', 'explication']]},
  {t: 'Évaluation : performance et rôles', o: 'Montrer son niveau de jeu et sa capacité à arbitrer ou coacher.', e: [
    ['Échauffement en autonomie', 6, 'Échauffement préparé et mené par l\'équipe sans le prof : trot, mobilisation, passes, tirs.', 'cercle'],
    ['Tirs', 4, 'Chaque joueur tire 3 fois de son poste habituel sur le gardien de son équipe, en variant les coins.', 'tir:hand']],
   c: [['Matchs observés', 22, 'Grille : efficacité, choix, défense, implication dans le projet.', 'Je contribue au projet de mon équipe.', '', 'match:hand:6c6'],
    ['Arbitrage évalué', 6, 'Chaque élève arbitre une période : coups de sifflet, gestes officiels (marcher, zone, jet de 7 m, exclusion), gestion du temps.', 'J\'arbitre une période sans erreur sur les fautes principales.', '', 'match:hand:6c6']],
   r: [['Bilan de fin de cursus', 5, 'Où continuer le handball ou une activité physique après l\'école ?', 'explication']]}
]}
}});
