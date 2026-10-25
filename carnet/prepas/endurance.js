/* Course d'endurance : 6 leçons par année (1re → 6e secondaire). Du « courir longtemps sans s'arrêter » au projet d'entraînement personnel. */
PREPA_ADD({id: 'endurance', sport: "Course d'endurance", mat: 'Plots ou cônes tous les 20-25 m, chronomètre, sifflet, fiches de suivi, cardiofréquencemètre ou montre (facultatif).', an: {
1: {th: 'Courir longtemps sans s\'arrêter, à une allure régulière', comp: ['HME1', 'HME4', 'GSS1', 'GSS3'], l: [
  {t: 'Découvrir son allure', o: 'Courir 6 minutes sans s\'arrêter en parlant avec un camarade (allure « je peux parler »).', e: [
    ['Jeu du « feu rouge »', 5, 'Course libre : vert = trotter, orange = marcher, rouge = arrêt. Le prof change de couleur.', 'libre'],
    ['Mobilisation', 5, 'Montées de genoux, talons-fesses, pas chassés sur 15 m ; rotations des chevilles et des bras.', 'files']],
   c: [['6 minutes en binôme', 10, 'Par deux, courir 6 minutes autour de la boucle en pouvant se parler. Si on est essoufflé, on ralentit, on ne s\'arrête pas.', 'Je cours 6 minutes sans m\'arrêter.', '4 minutes pour les élèves en difficulté.', 'piste:sp:groupes'],
    ['Courir / marcher', 10, '3 × (2 min de course + 1 min de marche) en prenant le pouls après chaque course.', 'Je sens que mon cœur bat plus vite.', '', 'piste:sp']],
   r: [['Pouls et étirements', 6, 'Prise du pouls à la fin (15 s × 4), puis étirements des mollets, cuisses, fessiers en cercle.', 'etirements']]},
  {t: 'Le pouls et l\'effort', o: 'Prendre son pouls et relier l\'allure à la fréquence cardiaque.', comp: ['HME1', 'GSS1', 'GSS5'], e: [
    ['Pouls de repos', 4, 'Assis : trouver son pouls au poignet ou au cou, compter 15 s, multiplier par 4.', 'explication'],
    ['Trottinement progressif', 6, '3 tours lents puis 1 tour un peu plus vite.', 'piste:sp']],
   c: [['3 allures', 15, '3 minutes « tranquille », 3 minutes « moyen », 2 minutes « rapide », pouls après chaque allure noté sur la fiche.', 'Mon pouls monte quand j\'accélère.', '', 'piste:sp:groupes'],
    ['Relais 2 × 3 minutes', 7, 'Par deux : l\'un court 3 minutes pendant que l\'autre compte ses tours, puis on échange.', 'Je fais le même nombre de tours qu\'au début.', '', 'piste:sp']],
   r: [['Récupération', 6, 'Pouls après 1 minute de repos ; étirements.', 'etirements']]},
  {t: 'Courir à allure régulière (les plots)', o: 'Passer chaque plot au bon moment au signal (allure régulière).', e: [
    ['Échauffement', 5, 'Trottinement 3 minutes, mobilisation.', 'piste:sp'],
    ['Repérage des plots', 5, 'Le prof explique : un signal sonore toutes les 15 s, on doit être à un plot à chaque signal.', 'piste:sp:plots']],
   c: [['Course aux plots', 15, '2 × 5 minutes : chacun choisit sa distance entre plots (20, 25, 30 m) et doit arriver au plot à chaque signal.', 'J\'arrive au plot à chaque signal pendant 5 minutes.', 'Changer de distance à la 2e série.', 'piste:sp:plots'],
    ['Jeu des montres', 7, 'Courir 2 minutes sans montre et annoncer quand on pense que 2 minutes sont passées.', 'Je me trompe de moins de 20 s.', '', 'piste:sp']],
   r: [['Étirements', 6, 'Étirements et bilan : régulier ou pas ?', 'etirements']]},
  {t: 'Courir plus longtemps', o: 'Courir 10 minutes sans s\'arrêter à allure régulière.', e: [
    ['Échauffement en groupe', 5, 'Course en file indienne, le dernier remonte en tête.', 'piste:sp:groupes'],
    ['Mobilisation', 5, 'Gammes athlétiques.', 'files']],
   c: [['10 minutes', 15, 'Course continue par groupes d\'allure, un meneur par groupe.', 'Je cours 10 minutes sans marcher.', '8 minutes.', 'piste:sp:groupes'],
    ['Jeu de relais', 7, 'Équipes de 4 : chacun court 1 tour de salle ou de piste à son allure de « course facile » (on doit pouvoir parler), puis passe un témoin. 3 relais de suite sans s\'arrêter : l\'équipe la plus régulière gagne, pas la plus rapide.', 'Je cours mon tour à la même allure à chaque relais.', '', 'piste:sp']],
   r: [['Étirements', 6, 'Pouls et étirements.', 'etirements']]},
  {t: 'Gérer son effort et ses émotions', o: 'Connaître les signes de fatigue et les gérer (respirer, ralentir, s\'encourager).', comp: ['HME1', 'GSS1', 'GSS3', 'GSS4'], e: [
    ['Échauffement', 5, '5 minutes de course très lente en groupe, en pouvant parler, puis mobilisation des chevilles et des hanches.', 'piste:sp'],
    ['Respiration', 5, 'Inspirer sur 3 pas, expirer sur 3 pas.', 'piste:sp']],
   c: [['Course à deux', 15, '12 minutes : un « coach » court à côté et encourage, on change à 6 minutes.', 'J\'encourage mon partenaire.', '', 'piste:sp:groupes'],
    ['Discussion', 7, 'Qu\'est-ce qui est difficile ? Qu\'est-ce qui aide ?', '', '', 'explication']],
   r: [['Relaxation', 6, 'Allongé, respiration ventrale.', 'etirements']]},
  {t: 'Évaluation : courir longtemps', o: 'Courir 12 minutes (ou le plus longtemps possible) à allure régulière.', comp: ['HME1', 'GSS1', 'GSS4'], e: [
    ['Échauffement', 6, 'Trottinement et mobilisation.', 'piste:sp'],
    ['Consignes', 4, 'Explication de l\'épreuve : durée, parcours balisé, rôle du partenaire qui compte les tours.', 'explication']],
   c: [['Épreuve : 12 minutes', 15, 'Course de 12 minutes ; un camarade compte les tours et note la régularité (temps à chaque 3 minutes).', 'Je cours sans m\'arrêter, à allure régulière.', '', 'piste:sp'],
    ['Bilan chiffré', 7, 'Chacun calcule la distance parcourue (nombre de tours × longueur du tour) et la compare à son test de la 1re leçon dans le carnet.', 'Je sais combien de mètres j\'ai couru et si j\'ai progressé.', '', 'explication']],
   r: [['Retour', 6, 'Marche 2 minutes, puis étirements doux des mollets, des cuisses (avant et arrière) et des fessiers, 20 s chacun.', 'etirements']]}
]},
2: {th: 'Courir à son allure : vitesse moyenne et régularité', comp: ['HME1', 'HME4', 'GSS1', 'GSS3'], l: [
  {t: 'Test : distance en 6 minutes', o: 'Mesurer sa capacité (distance en 6 minutes) pour choisir ses allures.', e: [
    ['Échauffement', 6, 'Trottinement, gammes, accélérations progressives.', 'piste:sp'],
    ['Consignes', 4, 'Par deux : un court, l\'autre compte les tours et note le plot atteint au signal final ; puis on inverse.', 'explication']],
   c: [['Test 6 minutes', 10, 'Courir la plus grande distance possible en 6 minutes autour d\'un parcours balisé (plots tous les 20 m). Le partenaire compte les tours et note le plot atteint au coup de sifflet final.', 'Je cours les 6 minutes sans marcher.', '', 'piste:sp'],
    ['Calcul de sa vitesse', 12, 'Distance ÷ 100 = vitesse en km/h (ex. 1200 m = 12 km/h). Récupération active en marchant.', 'Je connais ma vitesse.', '', 'explication']],
   r: [['Étirements', 6, 'Marche 2 minutes, puis étirements doux des mollets, des cuisses (avant et arrière) et des fessiers, 20 s chacun.', 'etirements']]},
  {t: 'Courir à 80 % de sa vitesse', o: 'Courir longtemps à environ 80 % de sa vitesse du test.', e: [
    ['Échauffement', 6, '8 minutes : 4 minutes de trot très lent, mobilisation des chevilles, genoux et hanches, puis 2 accélérations progressives de 50 m.', 'piste:sp'],
    ['Plots personnels', 4, 'Chacun place son plot selon sa vitesse.', 'piste:sp:plots']],
   c: [['2 × 6 minutes', 15, 'À 80 % : arriver à son plot à chaque signal de 30 s.', 'Je suis régulier.', '', 'piste:sp:plots'],
    ['Récupération active', 7, '5 minutes de marche, puis prise du pouls 15 s (× 4). Comparaison avec le pouls au repos et juste après l\'effort.', 'Je sais prendre mon pouls et je vois qu\'il redescend.', '', 'piste:sp']],
   r: [['Étirements', 6, 'Marche 2 minutes, puis étirements doux des mollets, des cuisses (avant et arrière) et des fessiers, 20 s chacun.', 'etirements']]},
  {t: 'Le fractionné court', o: 'Alterner course rapide et récupération (30 s / 30 s).', e: [
    ['Échauffement', 6, '8 minutes : 4 minutes de trot très lent, mobilisation des chevilles, genoux et hanches, puis 2 accélérations progressives de 50 m.', 'piste:sp'],
    ['Gammes', 4, 'Montées de genoux, foulées bondissantes.', 'files']],
   c: [['30/30', 15, '2 séries de 6 × (30 s course rapide / 30 s trot), 3 minutes de marche entre les séries. Plots à repérer : chacun doit atteindre le même plot à chaque répétition.', 'J\'atteins le même plot à chaque répétition rapide.', '', 'piste:sp:plots'],
    ['Relais', 7, 'Relais par équipes de 4 : chacun court 2 tours à allure soutenue mais régulière ; on note les temps de chaque tour pour voir qui est régulier.', 'Mes deux tours ont des temps proches (moins de 5 s d\'écart).', '', 'piste:sp']],
   r: [['Étirements', 6, 'Marche 2 minutes, puis étirements doux des mollets, des cuisses (avant et arrière) et des fessiers, 20 s chacun.', 'etirements']]},
  {t: 'Courir 15 minutes', o: 'Courir 15 minutes à allure régulière.', e: [
    ['Échauffement', 6, '8 minutes : 4 minutes de trot très lent, mobilisation des chevilles, genoux et hanches, puis 2 accélérations progressives de 50 m.', 'piste:sp'],
    ['Allure', 4, 'Rappel de son allure.', 'explication']],
   c: [['15 minutes', 18, '15 minutes de course continue par groupes d\'allure (3 ou 4 groupes) avec un meneur qui tient l\'allure annoncée ; on peut changer de groupe au signal des 5 minutes.', 'Je cours 15 minutes dans un groupe sans m\'arrêter.', '12 minutes.', 'piste:sp:groupes'],
    ['Bilan', 4, 'Chacun regarde ses temps au tour notés par le partenaire et colorie sa régularité (vert : écart de moins de 5 s, orange, rouge).', 'Je sais si j\'ai couru régulièrement et pourquoi.', '', 'explication']],
   r: [['Étirements', 6, 'Marche 2 minutes, puis étirements doux des mollets, des cuisses (avant et arrière) et des fessiers, 20 s chacun.', 'etirements']]},
  {t: 'Course d\'orientation en endurance', o: 'Courir longtemps en trouvant des balises dans la cour ou le parc.', comp: ['HME1', 'HME4', 'GSS1', 'HSC2'], e: [
    ['Échauffement', 5, '8 minutes : 4 minutes de trot très lent, mobilisation des chevilles, genoux et hanches, puis 2 accélérations progressives de 50 m.', 'piste:sp'],
    ['Lecture du plan', 5, 'Repérer les balises.', 'explication']],
   c: [['Parcours', 20, 'Par deux, trouver le plus de balises en 15 minutes.', 'Nous courons tout le temps.', '', 'libre']],
   r: [['Étirements', 8, 'Correction et étirements.', 'etirements']]},
  {t: 'Évaluation', o: 'Courir à allure régulière et améliorer sa distance.', comp: ['HME1', 'GSS1', 'GSS4'], e: [
    ['Échauffement', 6, '8 minutes : 4 minutes de trot très lent, mobilisation des chevilles, genoux et hanches, puis 2 accélérations progressives de 50 m.', 'piste:sp'],
    ['Consignes', 4, 'Explication de l\'épreuve de 12 minutes : partir à son allure, le partenaire compte les tours et note le temps à chaque tour.', 'explication']],
   c: [['Épreuve 12 minutes', 15, 'Test de 12 minutes : courir la plus grande distance possible ; le partenaire compte les tours et note le temps à chaque tour pour la régularité.', 'Je cours 12 minutes sans marcher avec une allure régulière.', '', 'piste:sp'],
    ['Bilan', 7, 'Comparaison du 12 minutes avec le test de 6 minutes de la 1re leçon (distance doublée ou non) et avec les objectifs fixés.', 'J\'explique si j\'ai progressé et ce qui m\'a aidé.', '', 'explication']],
   r: [['Étirements', 6, 'Marche 2 minutes, puis étirements doux des mollets, des cuisses (avant et arrière) et des fessiers, 20 s chacun.', 'etirements']]}
]},
3: {th: 'Connaître sa VMA et courir à différentes allures', comp: ['HME1', 'HME4', 'GSS1', 'GSS5'], l: [
  {t: 'Test VMA (Luc Léger ou demi-Cooper)', o: 'Mesurer sa vitesse maximale aérobie (VMA).', e: [
    ['Échauffement', 7, '10 minutes : 5 minutes de trot lent, mobilisation articulaire, gammes (talons-fesses, montées de genoux), puis 3 accélérations de 60 m.', 'piste:sp'],
    ['Consignes', 3, 'Explication du test de VMA (demi-Cooper : 6 minutes, distance ÷ 100 = VMA en km/h) et rôle du partenaire.', 'explication']],
   c: [['Test', 15, 'Demi-Cooper (6 minutes) : VMA = distance ÷ 100.', 'Je donne mon maximum.', 'Luc Léger navette si la salle le permet.', 'piste:sp'],
    ['Tableau d\'allures', 7, 'À partir de la VMA (vitesse maximale aérobie) mesurée au test, chacun calcule ses allures à 70 %, 80 % et 90 % et le temps correspondant pour un tour de piste ou de salle.', 'Je connais mon temps au tour pour chaque allure.', '', 'explication']],
   r: [['Étirements', 6, 'Marche 2 minutes, puis étirements doux des mollets, des cuisses (avant et arrière) et des fessiers, 20 s chacun.', 'etirements']]},
  {t: 'Courir à 70 % et 80 % de VMA', o: 'Tenir une allure d\'endurance fondamentale.', e: [
    ['Échauffement', 6, '8 minutes : 4 minutes de trot très lent, mobilisation des chevilles, genoux et hanches, puis 2 accélérations progressives de 50 m.', 'piste:sp'],
    ['Plots', 4, 'Chacun place son plot personnel à la distance qu\'il doit atteindre en 30 s à l\'allure prévue (calcul fait avec le prof).', 'piste:sp:plots']],
   c: [['Allures', 18, '8 minutes à 70 % de VMA puis 6 minutes à 80 %, avec un coup de sifflet à chaque tour : chacun vérifie qu\'il est au bon plot au signal (avance ou retard).', 'Je suis au bon plot au signal sur la plupart des tours.', '', 'piste:sp:plots'],
    ['Pouls', 4, 'Relevé du pouls à la fin de chaque allure (15 s × 4) ; on note dans le carnet et on compare : plus l\'allure est rapide, plus le pouls est élevé.', 'Je relie l\'allure de course à mon pouls.', '', 'explication']],
   r: [['Étirements', 6, 'Marche 2 minutes, puis étirements doux des mollets, des cuisses (avant et arrière) et des fessiers, 20 s chacun.', 'etirements']]},
  {t: 'Fractionné à 100 % de VMA', o: 'Courir des intervalles courts à VMA.', e: [
    ['Échauffement', 7, '8 minutes : 4 minutes de trot très lent, mobilisation des chevilles, genoux et hanches, puis 2 accélérations progressives de 50 m.', 'piste:sp'],
    ['Gammes', 3, 'Gammes sur 20 m : talons-fesses, montées de genoux, pas chassés, foulées bondissantes, retour en marchant.', 'files']],
   c: [['15/15', 18, '2 séries de 8 × (15 s à 100 % de VMA / 15 s trot). Chacun a un plot cible à atteindre en 15 s calculé avec sa VMA ; 3 minutes de marche entre les séries.', 'J\'atteins mon plot cible à chaque répétition.', '', 'piste:sp:plots'],
    ['Récup', 4, '5 minutes de marche, respiration lente, pouls pris à 1 minute et à 3 minutes.', 'Mon pouls redescend sous 120 après 3 minutes.', '', 'piste:sp']],
   r: [['Étirements', 6, 'Marche 2 minutes, puis étirements doux des mollets, des cuisses (avant et arrière) et des fessiers, 20 s chacun.', 'etirements']]},
  {t: 'Courir 20 minutes', o: 'Courir 20 minutes à 70-75 % de VMA.', e: [
    ['Échauffement', 6, '8 minutes : 4 minutes de trot très lent, mobilisation des chevilles, genoux et hanches, puis 2 accélérations progressives de 50 m.', 'piste:sp'],
    ['Allure', 4, 'Chacun rappelle à son partenaire son allure cible (temps au tour) avant de partir.', 'explication']],
   c: [['20 minutes', 22, '20 minutes de course continue par groupes d\'allure (70-75 % de VMA) avec un meneur ; le prof donne le temps à chaque tour.', 'Je cours 20 minutes à l\'allure prévue.', '', 'piste:sp:groupes']],
   r: [['Étirements', 8, 'Marche 2 minutes, puis étirements doux des mollets, des cuisses (avant et arrière) et des fessiers, 20 s chacun.', 'etirements']]},
  {t: 'Le carnet d\'entraînement', o: 'Noter prévu / réalisé / sensations après chaque course.', comp: ['HME1', 'GSS1', 'GSS3', 'GSS5'], e: [
    ['Échauffement', 6, '8 minutes : 4 minutes de trot très lent, mobilisation des chevilles, genoux et hanches, puis 2 accélérations progressives de 50 m.', 'piste:sp'],
    ['Présentation du carnet', 4, 'Le prof présente le carnet d\'entraînement : test, allures, séances prévues, temps réalisés, pouls, sensations.', 'explication']],
   c: [['Séance au choix', 18, 'Chaque élève choisit une séance (continue ou fractionnée) et la note.', 'Mon carnet est rempli.', '', 'piste:sp:plots'],
    ['Partage', 4, 'Discussion par groupes : qu\'est-ce qui aide à courir longtemps (allure, respiration, musique, groupe) ? Chaque groupe note 3 conseils au tableau.', 'Je donne un conseil concret pour courir longtemps.', '', 'explication']],
   r: [['Étirements', 8, 'Marche 2 minutes, puis étirements doux des mollets, des cuisses (avant et arrière) et des fessiers, 20 s chacun.', 'etirements']]},
  {t: 'Évaluation', o: 'Courir à une allure prévue et la tenir.', comp: ['HME1', 'GSS1', 'GSS4', 'GSS5'], e: [
    ['Échauffement', 6, '8 minutes : 4 minutes de trot très lent, mobilisation des chevilles, genoux et hanches, puis 2 accélérations progressives de 50 m.', 'piste:sp'],
    ['Contrat', 4, 'Chacun annonce son allure.', 'explication']],
   c: [['Épreuve', 18, '12 minutes à l\'allure annoncée ; écart prévu / réalisé.', 'Mon écart est inférieur à 5 %.', '', 'piste:sp:plots'],
    ['Bilan', 4, 'Chacun compare le test final avec le test de départ, analyse sa régularité et écrit un objectif pour la suite.', 'J\'explique mon résultat et je fixe un objectif réaliste.', '', 'explication']],
   r: [['Étirements', 8, 'Marche 2 minutes, puis étirements doux des mollets, des cuisses (avant et arrière) et des fessiers, 20 s chacun.', 'etirements']]}
]},
4: {th: 'S\'entraîner : fractionné long, pyramide, fartlek et récupération', comp: ['HME1', 'HME4', 'GSS1', 'GSS5'], l: [
  {t: 'Test VMA et objectif de progrès', o: 'Mesurer sa VMA et se fixer un objectif chiffré pour la fin du cycle.', e: [
    ['Échauffement progressif', 7, '5 minutes de trot, gammes (montées de genoux, talons-fesses, pas chassés), 3 accélérations de 50 m.', 'piste:sp'],
    ['Consignes du test', 3, 'Rappel : partir prudemment, accélérer dans la 2e moitié ; un camarade compte les tours.', 'explication']],
   c: [['Test demi-Cooper', 12, 'Courir la plus grande distance en 6 minutes. VMA (km/h) = distance ÷ 100.', 'Je donne mon maximum sans m\'effondrer à la fin.', 'Test navette (Luc Léger) en salle.', 'piste:sp'],
    ['Objectif et tableau d\'allures', 10, 'Dans le carnet : VMA, allures à 70, 80, 90 % (temps pour 100 m ou distance entre plots), objectif de progrès réaliste (+0,5 à +1 km/h).', 'Mon objectif est chiffré et réaliste.', '', 'explication']],
   r: [['Retour au calme', 6, 'Marche, pouls après 1 minute, étirements des mollets et des ischios.', 'etirements']]},
  {t: 'Le fractionné long : 3 × 3 minutes', o: 'Courir 3 fois 3 minutes à 90 % de VMA avec récupération active.', e: [
    ['Échauffement', 7, 'Trot progressif, gammes, 2 accélérations.', 'piste:sp'],
    ['Placement des plots', 3, 'Chacun place son plot d\'arrivée pour 30 s à 90 % de sa VMA.', 'piste:sp:plots']],
   c: [['3 × 3 minutes à 90 %', 18, '3 minutes à 90 % (arriver au plot à chaque signal de 30 s), 2 minutes de trot entre les répétitions.', 'Je tiens mon allure sur les 3 répétitions.', '4 × 2 minutes pour les moins entraînés.', 'piste:sp:plots'],
    ['Sensations', 4, 'Note de 1 à 10 de l\'effort ressenti dans le carnet.', '', '', 'explication']],
   r: [['Retour au calme', 8, '5 minutes de trot très lent, puis étirements.', 'etirements']]},
  {t: 'La pyramide', o: 'Enchaîner des durées croissantes puis décroissantes en gardant son allure.', e: [
    ['Échauffement', 7, 'Trot progressif et gammes.', 'piste:sp'],
    ['Explication', 3, 'Pyramide 1-2-3-2-1 minute, récupération égale à la moitié de l\'effort.', 'explication']],
   c: [['Pyramide à 90 % de VMA', 20, '1 min - 2 min - 3 min - 2 min - 1 min à 90 %, récupération en trottinant (30 s, 1 min, 1 min 30, 1 min, 30 s).', 'Je finis la pyramide à la même allure qu\'au début.', 'Pyramide 30 s - 1 min - 1 min 30 pour les débutants.', 'piste:sp:plots']],
   r: [['Retour au calme', 8, 'Trot lent, pouls, étirements.', 'etirements']]},
  {t: 'Le fartlek en nature', o: 'Varier l\'allure selon le terrain (côtes, descentes, plat) dans un parc ou autour de l\'école.', e: [
    ['Échauffement', 6, 'Trot et gammes.', 'piste:sp'],
    ['Sécurité du parcours', 4, 'Présentation de la boucle, points de regroupement, règles (on reste par deux, on ne traverse pas sans le prof).', 'explication']],
   c: [['Fartlek', 20, 'En groupes d\'allure : accélérer dans les montées et sur les lignes droites, récupérer dans les descentes ; regroupement à chaque point de contrôle.', 'Je change d\'allure sans m\'arrêter.', 'Le meneur du groupe choisit les accélérations.', 'libre']],
   r: [['Retour au calme', 8, 'Marche, étirements au retour.', 'etirements']]},
  {t: 'Boire, manger, dormir : récupérer pour progresser', o: 'Connaître les règles simples d\'hydratation, d\'alimentation et de récupération.', comp: ['GSS1', 'GSS5'], e: [
    ['Échauffement', 6, '8 minutes de trot de plus en plus vite, puis mobilisation articulaire et 2 accélérations de 50 m.', 'piste:sp'],
    ['Quiz vrai ou faux', 4, '« Boire seulement quand on a soif », « courir à jeun fait maigrir », « s\'étirer évite les courbatures »… Réponses expliquées.', 'explication']],
   c: [['Course de 20 minutes', 20, 'À 75 % de VMA, en groupes d\'allure, avec une pause hydratation à la 10e minute.', 'Je tiens 20 minutes à mon allure.', '', 'piste:sp:groupes']],
   r: [['Récupération active et passive', 8, 'Comparaison : 3 minutes de trot lent puis pouls, ou 3 minutes assis puis pouls. Lequel redescend le plus vite ?', 'explication']]},
  {t: 'Évaluation : séance prévue et réalisée', o: 'Réaliser une séance annoncée et analyser l\'écart entre prévu et réalisé.', comp: ['HME1', 'GSS1', 'GSS4', 'GSS5'], e: [
    ['Échauffement personnel', 6, 'Chacun réalise l\'échauffement qu\'il a appris.', 'piste:sp'],
    ['Contrat', 4, 'Chacun écrit sa séance (ex. 3 × 3 min à 90 %) et ses temps de passage prévus.', 'explication']],
   c: [['Épreuve', 20, 'Réalisation de la séance ; un camarade note les temps réels.', 'Mon écart prévu / réalisé est inférieur à 5 %.', '', 'piste:sp:plots']],
   r: [['Analyse', 8, 'Dans le carnet : écart, sensations, ce que je changerais.', 'explication']]}
]},
5: {th: 'Planifier son entraînement : projet santé ou performance', comp: ['HME1', 'GSS1', 'GSS3', 'GSS5'], l: [
  {t: 'Choisir son mobile et son projet', o: 'Choisir un mobile (santé, performance, bien-être) et construire un plan de 4 séances.', e: [
    ['Échauffement', 7, 'Trot progressif et gammes.', 'piste:sp'],
    ['Les 3 mobiles', 3, 'Santé (endurance fondamentale, régularité), performance (fractionné, VMA), bien-être (allure facile, plaisir, sensations).', 'explication']],
   c: [['Test demi-Cooper', 12, '6 minutes de course à la plus grande distance possible ; VMA = distance (m) ÷ 100 (en km/h). Le partenaire compte les tours.', 'Je connais ma VMA du jour.', '', 'piste:sp'],
    ['Écriture du projet', 10, 'Objectif, 4 séances types, indicateurs (temps, pouls, sensations).', 'Mon projet est cohérent avec mon mobile.', '', 'explication']],
   r: [['Retour au calme', 6, 'Marche 2 minutes, puis étirements doux des mollets, des cuisses (avant et arrière) et des fessiers, 20 s chacun.', 'etirements']]},
  {t: 'Séance de projet 1', o: 'Réaliser la séance prévue et noter prévu, réalisé et sensations.', e: [
    ['Échauffement personnel', 7, 'L\'élève suit l\'échauffement écrit dans son projet.', 'piste:sp'],
    ['Objectif du jour', 3, 'Rappel rapide en groupe de projet.', 'explication']],
   c: [['Séance de projet', 22, 'Par groupes de même mobile : santé (25 min à 70 %), performance (2 × 8 × 30/30), bien-être (course libre à allure confortable + respiration).', 'Je respecte ma séance.', '', 'piste:sp:plots']],
   r: [['Carnet', 6, 'Chacun note dans le carnet ce qui était prévu, ce qui a été réalisé (temps, distances) et ses sensations de 1 à 10.', 'explication']]},
  {t: 'Séance de projet 2 : ajuster', o: 'Ajuster sa séance selon les sensations de la précédente.', e: [
    ['Échauffement personnel', 7, 'Chacun réalise l\'échauffement écrit dans son projet (trot progressif, gammes, 2 accélérations).', 'piste:sp'],
    ['Ajustement', 3, 'Chacun modifie une variable : durée, intensité ou récupération.', 'explication']],
   c: [['Séance ajustée', 22, 'Par groupes de projet ; le prof circule et conseille.', 'Mon ajustement est justifié.', '', 'piste:sp:plots']],
   r: [['Carnet', 6, 'Notes et pouls.', 'explication']]},
  {t: 'Renforcement du coureur', o: 'Gainage et renforcement pour courir mieux et prévenir les blessures.', comp: ['HME1', 'GSS1', 'GSS2'], e: [
    ['Échauffement', 6, 'Trot et mobilisation articulaire.', 'piste:sp'],
    ['Pourquoi se renforcer ?', 4, 'Chevilles, genoux, dos : les blessures fréquentes du coureur.', 'explication']],
   c: [['Circuit de renforcement', 20, '6 ateliers de 40 s (20 s de pause) : gainage face, gainage côté, fentes, montées sur pointes, équilibre sur un pied yeux fermés, montées de genoux sur place. 2 tours.', 'Je garde une bonne position.', '', 'ateliers:sp:6']],
   r: [['Étirements', 8, 'Étirements guidés.', 'etirements']]},
  {t: 'Séance de projet 3', o: 'Dernière séance avant le test : confirmer ses allures.', e: [
    ['Échauffement personnel', 7, 'Chacun réalise l\'échauffement écrit dans son projet (trot progressif, gammes, 2 accélérations).', 'piste:sp'],
    ['Objectif du jour', 3, 'Confirmer son allure cible.', 'explication']],
   c: [['Séance', 22, 'Par groupes de projet (santé, performance, perte de poids, préparation à une course), chacun réalise la séance qu\'il a écrite ; le prof passe dans chaque groupe.', 'Je réalise ma séance comme prévue et je note ce que j\'ai fait.', '', 'piste:sp:plots']],
   r: [['Carnet', 6, 'Chacun note dans le carnet la séance réalisée, ses temps, son pouls et ses sensations (de 1 à 10).', 'explication']]},
  {t: 'Évaluation : projet', o: 'Réaliser et analyser sa séance de projet (conception, réalisation, analyse).', comp: ['HME1', 'GSS1', 'GSS4', 'GSS5'], e: [
    ['Échauffement personnel', 7, 'Chacun réalise l\'échauffement écrit dans son projet (trot progressif, gammes, 2 accélérations).', 'piste:sp'],
    ['Contrat', 3, 'Annonce de la séance et des temps prévus.', 'explication']],
   c: [['Épreuve', 22, 'Séance évaluée : conception (/7), réalisation (/10), analyse (/3).', 'Ma séance est conforme à mon projet.', '', 'piste:sp:plots']],
   r: [['Bilan écrit', 6, 'Analyse dans le carnet.', 'explication']]}
]},
6: {th: 'Autonomie et santé durable : concevoir et conduire ses séances', comp: ['HME1', 'GSS1', 'GSS3', 'GSS4', 'GSS5'], l: [
  {t: 'Diagnostic et projet personnel', o: 'Faire le point sur sa forme et fixer un projet personnel réaliste pour 5 séances.', e: [
    ['Échauffement autonome', 7, 'Chacun mène son échauffement sans consigne.', 'piste:sp'],
    ['Le projet', 3, 'Objectif personnel : santé, préparation d\'une course (5 km, jogging de quartier), performance.', 'explication']],
   c: [['Test', 12, 'Au choix : demi-Cooper (6 minutes) ou Cooper complet (12 minutes). Le partenaire compte les tours ; chacun calcule sa VMA et ses allures pour le projet.', 'Je connais ma VMA et mes allures d\'entraînement.', '', 'piste:sp'],
    ['Plan de 5 séances', 10, 'Chaque élève écrit son plan et les indicateurs qu\'il suivra.', 'Mon plan est progressif.', '', 'explication']],
   r: [['Étirements', 6, 'Marche 2 minutes, puis étirements doux des mollets, des cuisses (avant et arrière) et des fessiers, 20 s chacun.', 'etirements']]},
  {t: 'Séance autonome 1', o: 'Conduire sa séance seul, en gérant son temps et ses allures.', e: [
    ['Échauffement autonome', 7, 'Chacun réalise l\'échauffement écrit dans son plan (trot progressif, gammes, accélérations), sans attendre le prof.', 'piste:sp'],
    ['Objectif', 3, 'Chacun relit l\'objectif de sa séance dans le carnet et le dit à son partenaire.', 'explication']],
   c: [['Séance autonome', 22, 'Chaque élève suit son plan ; le prof joue le rôle de coach sur demande.', 'Je mène ma séance sans aide.', '', 'piste:sp:plots']],
   r: [['Carnet', 6, 'Chacun note dans le carnet ce qui était prévu, ce qui a été réalisé (temps, distances) et ses sensations de 1 à 10.', 'explication']]},
  {t: 'Séance autonome 2', o: 'Ajuster sa séance selon ses données.', e: [
    ['Échauffement autonome', 7, 'Chacun réalise l\'échauffement écrit dans son plan (trot progressif, gammes, accélérations), sans attendre le prof.', 'piste:sp'],
    ['Ajustement', 3, 'Chacun choisit une seule chose à changer par rapport à la séance précédente : durée, allure, nombre de répétitions ou récupération.', 'explication']],
   c: [['Séance ajustée', 22, 'Séance réalisée en autonomie, ajustée à partir du carnet (allure, durée, récupérations) ; le partenaire chronomètre.', 'J\'ajuste ma séance d\'après ce que j\'ai noté la fois précédente.', '', 'piste:sp:plots']],
   r: [['Carnet', 6, 'Chacun note dans le carnet la séance réalisée, ses temps, son pouls et ses sensations (de 1 à 10).', 'explication']]},
  {t: 'Courir en dehors de l\'école', o: 'Préparer une sortie sûre : parcours, applis, équipement, sécurité.', comp: ['GSS1', 'GSS2', 'GSS5'], e: [
    ['Échauffement', 6, '8 minutes de trot de plus en plus vite, puis mobilisation articulaire et 2 accélérations de 50 m.', 'piste:sp'],
    ['Préparer sa sortie', 4, 'Choix du parcours, visibilité, prévenir quelqu\'un, applis de suivi (esprit critique sur les données).', 'explication']],
   c: [['Course en groupe à l\'extérieur', 22, 'Boucle extérieure en groupes d\'allure avec meneur.', 'Je respecte les règles de sécurité.', '', 'libre']],
   r: [['Discussion', 6, 'Comment garder une activité physique après l\'école ?', 'explication']]},
  {t: 'Séance autonome 3', o: 'Dernière séance avant l\'évaluation.', e: [
    ['Échauffement autonome', 7, 'Chacun réalise l\'échauffement écrit dans son plan (trot progressif, gammes, accélérations), sans attendre le prof.', 'piste:sp'],
    ['Objectif', 3, 'Chacun confirme son allure cible (temps au tour) à partir des notes de la séance précédente.', 'explication']],
   c: [['Séance', 22, 'Dernière séance du projet, en autonomie : chacun suit son plan, note les temps et son ressenti (échelle de 1 à 10).', 'Je suis mon plan et je note mon ressenti.', '', 'piste:sp:plots']],
   r: [['Carnet', 6, 'Chacun note dans le carnet la séance réalisée, ses temps, son pouls et ses sensations (de 1 à 10).', 'explication']]},
  {t: 'Évaluation : projet personnel', o: 'Réaliser et analyser son projet.', comp: ['HME1', 'GSS1', 'GSS4', 'GSS5'], e: [
    ['Échauffement autonome', 7, 'Chacun réalise l\'échauffement écrit dans son plan (trot progressif, gammes, accélérations), sans attendre le prof.', 'piste:sp'],
    ['Contrat', 3, 'Chacun annonce à son partenaire la séance prévue et les temps visés, que le partenaire vérifiera.', 'explication']],
   c: [['Épreuve', 22, 'Conception, réalisation, analyse critique de ses données.', 'J\'atteins (ou j\'explique) mon objectif.', '', 'piste:sp:plots']],
   r: [['Bilan', 6, 'Chacun réalise l\'échauffement écrit dans son projet (trot progressif, gammes, 2 accélérations).', 'explication']]}
]}
}});
