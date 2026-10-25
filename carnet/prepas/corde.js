/* Corde à sauter (jeux divers) : un seul cycle de 6 leçons (5 + l'évaluation), le même pour toutes les années.
   Une corde par élève (longueur : pieds sur la corde, poignées aux aisselles), 2 grandes cordes de 6 à 8 m, plots, chrono, fiches de figures.
   e = échauffement, c = corps de leçon, r = retour au calme. [nom, minutes, consigne, (réussite, variante,) schéma] */
(() => {
const A = {th: 'Corde à sauter : sauter en rythme, enchaîner des figures, sauter à plusieurs et créer un enchaînement', comp: ['HME1', 'HME3', 'HME4', 'GSS1'], mat: '1 corde par élève (réglée à sa taille), 2 grandes cordes de 6 à 8 m, plots, chrono, enceinte, fiches de figures, fiches d\'évaluation.', l: [
  {t: 'Régler sa corde et sauter à pieds joints', o: 'Régler sa corde, la faire tourner avec les poignets et sauter à pieds joints, en rythme, sur l\'avant des pieds.', comp: ['HME1', 'HME4', 'GSS1'], e: [
    ['Consignes et réglage', 4, 'En demi-cercle : chacun pose les deux pieds au milieu de sa corde, les poignées doivent arriver sous les aisselles ; on fait un nœud près de la poignée si elle est trop longue. Règles : 2 m d\'écart entre deux sauteurs, la corde reste au sol quand on ne saute pas.', 'explication'],
    ['Sauts sans corde', 6, 'Dispersés, corde pliée dans une main : petits sauts sur place au son de la musique (pieds joints, sur l\'avant des pieds, genoux souples), puis la même chose en faisant tourner la corde pliée sur le côté (« hélicoptère ») pour trouver le rythme.', 'libre']],
   c: [['Le saut de base', 10, 'Chacun sa corde : corde derrière les talons, bras le long du corps, coudes près des hanches ; faire tourner la corde avec les poignets et sauter quand elle arrive devant les pieds. Séries de 30 s de saut, 30 s de repos ; le prof compte les sauts de suite.', 'Je fais 15 sauts de suite à pieds joints sans m\'arrêter.', 'Difficulté : la corde passe une fois, je fais un rebond entre deux passages (saut « double rebond »), puis sans rebond.', 'corde'],
    ['Le défi des 30 secondes', 10, 'Par deux : l\'un saute 30 s, l\'autre compte les sauts réussis et observe un critère (coudes près du corps ? sauts petits ?). On note son score sur la fiche, 3 essais chacun.', 'Mon score augmente entre le 1er et le 3e essai.', 'Les élèves en difficulté sautent avec la corde à l\'arrêt au sol puis la font passer par-dessus la tête à chaque saut.', 'corde::deux'],
    ['Relais corde', 10, 'En 4 colonnes : aller en sautant à la corde jusqu\'au plot (15 m), retour en courant, on passe la corde au suivant. Deux tours.', 'Je sais avancer en sautant sans m\'emmêler.', 'Retour aussi en sautant pour les plus à l\'aise.', 'files']],
   r: [['Retour au calme', 5, 'Ranger les cordes pliées en 4 dans le bac. Étirements des mollets et des chevilles ; chacun donne son meilleur score de 30 s.', 'etirements']]},
  {t: 'Varier les appuis : course, cloche, slalom', o: 'Sauter en changeant d\'appuis (pied à pied, d\'avant en arrière, de gauche à droite) sans perdre le rythme.', comp: ['HME1', 'HME3', 'HME4'], e: [
    ['Rythme en musique', 5, 'Chacun sa corde : saut de base sur la musique ; au signal « stop » la corde s\'arrête sous les pieds, au signal « go » on repart.', 'corde'],
    ['Appuis sans corde', 5, 'Face à une ligne au sol : sauts avant-arrière (cloche), gauche-droite (slalom), pas de course sur place, 20 s chacun.', 'libre']],
   c: [['Trois nouveaux sauts', 12, 'Le prof montre et les élèves essaient : 1) la course (un pied puis l\'autre, comme en trottinant) ; 2) la cloche (avant-arrière) ; 3) le slalom (gauche-droite). 1 minute par saut, deux fois.', 'Je réussis 10 sauts de suite dans 2 des 3 figures.', 'Ralentir la corde et marquer un rebond.', 'corde'],
    ['Enchaîner', 10, 'Par deux : A propose un ordre (ex. 8 pieds joints, 8 course, 8 cloche), B le réalise, puis on inverse. On essaie de ne pas arrêter la corde entre deux figures.', 'Je passe d\'une figure à l\'autre sans arrêter la corde.', 'Groupes de 4 sauts au lieu de 8 pour simplifier.', 'corde::deux'],
    ['Course à la corde', 8, 'Sur une boucle de plots (40 m) : on avance en saut « course ». Au coup de sifflet, on change de sens. 3 tours de 1 min 30.', 'Je fais un tour complet sans m\'arrêter.', '', 'piste']],
   r: [['Retour au calme', 5, 'Marche, respiration, étirements des mollets et des cuisses ; quelle figure était la plus facile ? La plus dure ?', 'etirements']]},
  {t: 'La grande corde', o: 'Entrer, sauter et sortir d\'une grande corde tournée par deux camarades ; tourner régulièrement.', comp: ['HME1', 'HME4', 'HSC2'], e: [
    ['Rappel des sauts', 5, 'Chacun sa corde : 30 s de chaque figure (pieds joints, course, cloche, slalom).', 'corde'],
    ['Tourner la grande corde', 5, 'Par groupes de 6 autour d\'une grande corde : deux tourneurs (« T ») font de grands cercles avec tout le bras, en même temps ; on change de tourneurs toutes les minutes.', 'corde::grande']],
   c: [['Entrer et sortir', 12, 'Corde qui tourne « vers le sauteur » : on part à côté du tourneur, on entre quand la corde vient de toucher le sol devant soi, 1 saut, on sort en diagonale de l\'autre côté. Colonne derrière, on tourne tous les 5 passages.', 'J\'entre, je saute et je sors 3 fois sans toucher la corde.', 'Corde qui balance d\'un côté à l\'autre (« serpent ») avant de tourner, pour les plus craintifs.', 'corde::grande'],
    ['Compter ensemble', 10, 'Même organisation : on entre et on reste 5 sauts, puis 10 ; ensuite deux sauteurs entrent l\'un après l\'autre et sautent ensemble.', 'Nous sautons à deux 5 fois de suite.', 'Le 2e sauteur tient la main du 1er.', 'corde::grande'],
    ['La chenille', 8, 'Toute la colonne passe sans arrêt : un saut chacun, sans laisser un tour vide. On compte les passages réussis de suite.', 'Notre groupe fait 10 passages de suite sans tour vide.', '', 'corde::grande']],
   r: [['Retour au calme', 5, 'Enrouler les grandes cordes ; étirements des épaules et des mollets ; rappel : quand entrer dans la corde ?', 'etirements']]},
  {t: 'Sauter à deux et en musique', o: 'Sauter à deux dans la même corde ou côte à côte, en se synchronisant sur la musique.', comp: ['HME4', 'HME5', 'HSC2'], e: [
    ['Sauts en musique', 5, 'Chacun sa corde : changer de figure toutes les 8 temps de la musique (le prof compte « 5, 6, 7, 8 »).', 'corde'],
    ['Miroir', 5, 'Par deux face à face, sans corde : A fait des sauts, B l\'imite en même temps. Puis on inverse.', 'deux']],
   c: [['Côte à côte', 10, 'Par deux, chacun sa corde, côte à côte : sauter exactement en même temps (la corde touche le sol au même moment). Puis 8 sauts chacun en alternance.', 'Nos cordes touchent le sol en même temps pendant 8 sauts.', 'Un seul des deux compte à voix haute.', 'corde::deux'],
    ['Dans la même corde', 12, 'A tourne sa corde, B entre devant lui (face à face ou dos) et ils sautent ensemble ; puis B entre pendant que la corde tourne. Changer de rôle.', 'Nous faisons 5 sauts à deux dans la même corde.', 'Côte à côte en tenant chacun une poignée de la même corde (corde « partagée »).', 'corde::deux'],
    ['Petit enchaînement à deux', 8, 'Créer 4 × 8 temps à deux sur la musique avec au moins 3 figures différentes ; présenter à un autre binôme.', 'Notre enchaînement se fait du début à la fin sans arrêt.', '', 'corde::deux']],
   r: [['Retour au calme', 5, 'Étirements ; chaque binôme dit la figure la plus réussie de l\'autre binôme.', 'etirements']]},
  {t: 'Préparer son enchaînement', o: 'Construire et répéter un enchaînement de 6 × 8 temps avec au moins 4 figures, dont une à deux ou en grande corde.', comp: ['HME4', 'HME5', 'HSC2', 'GSS1'], e: [
    ['Échauffement en musique', 6, 'Chacun sa corde : 1 minute pieds joints, 1 minute course, 1 minute cloche-slalom, 1 minute libre ; marche entre deux.', 'corde'],
    ['Le test d\'endurance', 4, 'Saut de base le plus longtemps possible (2 minutes au maximum) ; on note le temps.', 'corde']],
   c: [['Choisir ses figures', 10, 'Par 2 ou 3 avec la fiche des figures : choisir au moins 4 figures (dont une nouvelle : croisé, double saut, saut sur un pied…) et une partie à deux ou en grande corde. Écrire l\'ordre sur la fiche.', 'Notre fiche contient 6 × 8 temps et au moins 4 figures.', 'Figures plus simples autorisées (moins de vitesse).', 'corde::deux'],
    ['Répéter', 12, 'Répéter l\'enchaînement en musique ; le prof passe et conseille. Un camarade d\'un autre groupe observe avec la fiche d\'évaluation.', 'Nous enchaînons sans nous arrêter plus d\'une fois.', '', 'corde'],
    ['Répétition générale', 8, 'Chaque groupe passe devant un autre groupe, qui donne un conseil.', 'Nous tenons compte du conseil reçu.', '', 'explication']],
   r: [['Retour au calme', 5, 'Étirements ; rappel de l\'évaluation de la semaine prochaine (critères au tableau).', 'etirements']]},
  {t: 'Évaluation : saut de base, figures et enchaînement', o: 'Montrer la qualité du saut de base, la variété des figures et un enchaînement à plusieurs en musique.', comp: ['HME1', 'HME4', 'HME5', 'HSC2'], crit: [
    ['Saut de base : 30 s', 5, '5 : 60 sauts ou plus · 4 : 50-59 · 3 : 40-49 · 2 : 25-39 · 1 : moins de 25'],
    ['Figures maîtrisées (5 sauts de suite chacune)', 5, '1 point par figure réussie : course, cloche, slalom, croisé, sur un pied, double saut…'],
    ['Enchaînement : continuité', 4, '4 : sans arrêt · 3 : 1 arrêt · 2 : 2-3 arrêts · 1 : plus de 3'],
    ['Enchaînement : rythme et musique', 3, '3 : toujours sur la musique · 2 : souvent · 1 : rarement'],
    ['Partie à deux ou en grande corde', 3, '3 : réussie du premier coup · 2 : après un essai · 1 : tentée']], e: [
    ['Échauffement', 6, 'Chacun sa corde : saut de base, course, cloche, slalom en musique, 1 minute chaque, marche entre deux.', 'corde'],
    ['Dernière répétition', 4, 'Par groupe : une dernière fois l\'enchaînement, sans arrêt.', 'corde::deux']],
   c: [['Saut de base et figures', 12, 'Par deux : A passe, B compte (30 s de saut de base), puis A montre ses figures (5 sauts de suite chacune). Le prof valide les figures. On inverse.', 'Je montre au moins 4 figures réussies.', '', 'corde::deux'],
    ['Passage des enchaînements', 15, 'Chaque groupe présente son enchaînement en musique devant la classe ; le prof note la continuité, le rythme et la partie à deux.', 'Notre enchaînement va jusqu\'au bout.', '', 'explication']],
   r: [['Retour au calme', 5, 'Étirements ; chacun dit ce qu\'il a le plus progressé pendant le cycle.', 'etirements']]}
]};
PREPA_ADD({id: 'corde', sport: 'Corde à sauter', mat: A.mat, divers: true, an: {1: A, 2: A, 3: A, 4: A, 5: A, 6: A}});
})();
