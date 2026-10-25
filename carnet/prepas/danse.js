/* Danse : 6 leçons par année (1re → 6e secondaire). Une enceinte, de la musique au tempo clair (90-120 battements/min).
   Chaque leçon finit par un moment de présentation : on regarde, on applaudit, on dit une chose réussie avant une chose à améliorer. */
PREPA_ADD({id: 'danse', sport: 'Danse', mat: 'Enceinte et musiques (tempo net), plots pour délimiter la scène, foulards, fiches de chorégraphie, tableau, tablette pour filmer (avec accord).', an: {
1: {th: 'Bouger en rythme et créer une courte danse de groupe', comp: ['HME4', 'HME5', 'HSC2', 'GSS4'], l: [
  {t: 'Écouter et marquer le rythme', o: 'Repérer le temps fort d\'une musique et compter « 1 à 8 » en se déplaçant.', comp: ['HME4', 'HME5'], e: [
    ['Marcher sur la musique', 5, 'Tout le monde marche dans la salle en posant un pied sur chaque temps. Au signal : marcher deux fois plus vite, deux fois plus lentement, en arrière, sur la pointe des pieds.', 'libre'],
    ['Taper les 8 temps', 5, 'En cercle : taper dans les mains sur le 1, puis sur le 1 et le 5, puis frapper les cuisses sur 1-2-3-4 et les mains sur 5-6-7-8. Le prof compte à voix haute puis se tait.', 'danse:danse:cercle']],
   c: [['Le chef d\'orchestre', 10, 'En cercle, un élève propose un mouvement simple sur 8 temps (frapper, sauter, tourner) ; tout le monde le répète sur les 8 temps suivants. On passe au voisin.', 'Je reproduis le mouvement en restant sur le rythme.', 'Mouvements uniquement avec les bras pour les plus timides.', 'danse:danse:cercle'],
    ['Statues musicales', 8, 'On danse librement tant que la musique joue ; quand elle s\'arrête, on se fige dans une statue (haute, basse, sur un pied, à deux). Le prof nomme les plus belles statues.', 'Je m\'arrête net au silence et je tiens ma statue 5 s.', 'Imposer le type de statue (rond, pointu, tordu).', 'libre'],
    ['Phrase de 4 × 8 temps', 12, 'Le prof apprend une petite phrase : 8 pas en avant, 8 pas en arrière, 8 temps de pas chassés à droite et à gauche, 8 temps pour un tour et une pose. Répétition par moitié de classe.', 'Je danse la phrase entière en même temps que les autres.', 'Le groupe facile fait la phrase sur place.', 'danse:danse:lignes']],
   r: [['Retour au calme', 5, 'Respiration lente sur une musique douce, étirements debout ; chacun dit le moment qu\'il a préféré.', 'etirements']]},
  {t: 'Le miroir et l\'écoute du partenaire', o: 'Reproduire en même temps les mouvements d\'un partenaire.', comp: ['HME5', 'HSC2'], e: [
    ['Marche et rencontres', 5, 'Marcher sur la musique ; au signal, saluer la personne la plus proche d\'une façon différente (main, coude, pied, révérence).', 'libre'],
    ['Révision de la phrase', 5, 'Tout le monde danse la phrase de 4 × 8 temps de la leçon 1.', 'danse:danse:lignes']],
   c: [['Le miroir', 12, 'Par deux face à face : A fait des mouvements lents, B est son reflet. On change de meneur toutes les minutes, puis sans annoncer qui mène.', 'Un spectateur ne devine pas qui mène.', 'Mouvements plus rapides, ou en se déplaçant.', 'danse:danse:miroir'],
    ['L\'ombre', 8, 'A se déplace dans la salle avec des mouvements de bras, B le suit derrière comme son ombre. On inverse.', 'Je reste à la même distance et je copie le niveau (haut, bas).', '', 'danse:danse:groupes'],
    ['Duo de 2 × 8 temps', 10, 'Chaque duo crée 2 × 8 temps en miroir et les ajoute à la phrase de la classe. Présentation de 3 duos à la fois.', 'Notre duo est synchronisé.', '', 'danse:danse:miroir']],
   r: [['Présentation et retour', 5, 'Les spectateurs disent ce qui était le plus réussi. Étirements.', 'etirements']]},
  {t: 'L\'espace : niveaux et directions', o: 'Varier les niveaux (haut, moyen, bas) et les directions dans une phrase dansée.', comp: ['HME4', 'HME5'], e: [
    ['Les trois niveaux', 5, 'Sur la musique : se déplacer très haut (pointe des pieds, bras tendus), au niveau moyen, puis très bas (accroupi, au sol). Le prof annonce les changements.', 'libre'],
    ['Les directions', 5, 'Avancer, reculer, aller sur le côté, tourner : le prof annonce, les élèves exécutent sur 8 temps.', 'danse:danse:lignes']],
   c: [['Phrase à 3 niveaux', 12, 'Par 3 : reprendre la phrase de la classe et changer le niveau de chaque partie (une partie haute, une moyenne, une basse).', 'On voit clairement les 3 niveaux.', '', 'danse:danse:groupes'],
    ['Le dessin au sol', 10, 'Chaque groupe dessine sur papier un trajet (ligne, cercle, zigzag) et le danse sur 4 × 8 temps.', 'Notre trajet est le même à chaque répétition.', '', 'danse:danse:groupes'],
    ['Présentation', 8, 'Chaque groupe présente sa phrase ; les spectateurs nomment les niveaux et le trajet vus.', 'Je danse sans rire et sans m\'arrêter.', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Étirements au sol, respiration lente.', 'etirements']]},
  {t: 'Le canon et l\'unisson', o: 'Danser une même phrase ensemble (unisson) puis en décalé (canon).', comp: ['HME4', 'HSC2'], e: [
    ['Jeu du chef caché', 5, 'En cercle, un chef caché change de mouvement toutes les 8 temps ; un élève au centre doit le trouver.', 'danse:danse:cercle'],
    ['Révision', 5, 'Phrase de la classe à l\'unisson, 2 fois.', 'danse:danse:lignes']],
   c: [['Le canon', 12, 'Par groupes de 4 en ligne : le 1er commence la phrase, le 2e part 8 temps après, puis le 3e, puis le 4e.', 'Chacun part au bon moment sans se laisser entraîner.', 'Canon de 4 temps pour les groupes forts.', 'danse:danse:canon'],
    ['Unisson - canon - unisson', 12, 'Chaque groupe construit une danse : 2 × 8 temps à l\'unisson, la phrase en canon, puis une pose finale tous ensemble.', 'Notre danse a un début, un milieu et une fin clairs.', '', 'danse:danse:canon'],
    ['Présentation', 6, 'Deux groupes à la fois, l\'un regarde l\'autre puis on inverse.', 'Je reste concentré du début à la fin.', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Retour : qu\'est-ce qu\'un canon ? un unisson ? Étirements.', 'etirements']]},
  {t: 'Créer sa danse de groupe', o: 'Composer en groupe une danse de 6 × 8 temps avec début et fin.', comp: ['HME5', 'HSC2', 'GSS4'], e: [
    ['Échauffement dansé', 6, 'Le prof mène un échauffement en musique : épaules, bras, hanches, genoux, petits sauts.', 'danse:danse:lignes'],
    ['Consignes de création', 4, 'Au tableau : une pose de départ, une partie à l\'unisson, une partie en canon, un changement de niveau, un trajet, une pose finale.', 'explication']],
   c: [['Création par groupes', 22, 'Groupes de 4 ou 5 : chaque groupe crée sa danse avec la fiche de création ; le prof passe et conseille. On répète au moins 3 fois en entier.', 'Notre danse respecte toutes les consignes de la fiche.', 'Les groupes en difficulté reprennent la phrase de la classe et ajoutent 2 × 8 temps.', 'danse:danse:groupes'],
    ['Répétition générale', 8, 'Chaque groupe montre sa danse à un autre groupe, qui donne un conseil.', 'Nous tenons compte du conseil.', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Étirements ; chaque groupe note sa danse sur la fiche pour la prochaine fois.', 'etirements']]},
  {t: 'Évaluation : présentation des danses', o: 'Présenter sa danse de groupe devant la classe et regarder les autres avec respect.', comp: ['HME4', 'HME5', 'HSC2', 'HSC3', 'GSS4'], e: [
    ['Échauffement dansé', 5, 'Échauffement en musique mené par deux élèves volontaires.', 'danse:danse:lignes'],
    ['Dernière répétition', 5, 'Chaque groupe répète une dernière fois.', 'danse:danse:groupes']],
   c: [['Présentations', 25, 'Chaque groupe présente sa danse deux fois. Le prof évalue : rythme, mémorisation, respect des consignes de création, présence. Les spectateurs remplissent une fiche « une chose réussie, un conseil ».', 'Nous dansons toute la danse en rythme, sans nous arrêter.', 'Filmer (avec accord) pour que les groupes se voient.', 'danse:danse:groupes'],
    ['Le bal final', 5, 'Toute la classe danse la phrase commune ensemble.', 'Je danse avec toute la classe.', '', 'danse:danse:lignes']],
   r: [['Bilan', 5, 'Auto-évaluation : ce que j\'ai appris, ce qui était difficile (oser danser devant les autres ?).', 'explication']]}
]},
2: {th: 'Danses collectives et composition : procédés et qualités du mouvement', comp: ['HME4', 'HME5', 'HSC2', 'HSC3'], l: [
  {t: 'Une danse collective (line dance)', o: 'Apprendre une danse en ligne de 32 temps avec changement d\'orientation.', comp: ['HME4', 'HSC2'], e: [
    ['Pas de base', 6, 'Sur la musique : pas chassés, pas croisés (vigne), talon-pointe, quart de tour.', 'danse:danse:lignes'],
    ['Comptage', 4, 'Rappel des phrases de 8 temps ; taper les temps forts.', 'danse:danse:cercle']],
   c: [['Apprentissage de la danse', 18, 'Le prof apprend une danse en ligne de 4 × 8 temps (vigne à droite, vigne à gauche, 4 pas avant et 4 arrière, talons-pointes et quart de tour) et on la répète en tournant vers les 4 murs.', 'Je fais toute la danse et je tourne du bon côté.', 'Supprimer le quart de tour pour les élèves en difficulté.', 'danse:danse:lignes'],
    ['Varier la danse', 12, 'Par groupes : danser la même danse en changeant une chose (formation en cercle, en canon, en miroir).', 'Notre variante est claire pour les spectateurs.', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Étirements ; d\'où viennent les danses en ligne ? Exemples connus.', 'etirements']]},
  {t: 'Les qualités du mouvement', o: 'Danser un même geste de façon lente / rapide, légère / lourde, fluide / saccadée.', comp: ['HME5'], e: [
    ['Les contrastes', 5, 'Marcher comme un robot, comme un astronaute, comme dans du miel, comme sur des braises.', 'libre'],
    ['Révision', 5, 'Danse en ligne de la leçon 1.', 'danse:danse:lignes']],
   c: [['Un geste, quatre façons', 12, 'Chacun choisit un geste du quotidien (se coiffer, lancer, ouvrir une porte) et le danse en lent, rapide, saccadé et fluide.', 'Le spectateur reconnaît les 4 qualités.', '', 'libre'],
    ['Phrase de gestes', 12, 'Par 3 : enchaîner 3 gestes du quotidien transformés sur 4 × 8 temps, avec au moins deux qualités différentes.', 'Notre phrase montre des contrastes nets.', '', 'danse:danse:groupes'],
    ['Présentation', 6, 'Présentation par moitié de classe ; les spectateurs nomment les qualités vues.', 'Je garde la même qualité jusqu\'au bout du geste.', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Relaxation au sol, respiration ventrale.', 'etirements']]},
  {t: 'Les procédés de composition', o: 'Utiliser cascade, question-réponse et accumulation dans une danse de groupe.', comp: ['HME4', 'HSC2'], e: [
    ['La cascade', 5, 'En ligne : un mouvement passe d\'un élève à l\'autre comme une vague (chacun 1 temps après le précédent).', 'danse:danse:lignes'],
    ['Question-réponse', 5, 'Par deux : A danse 8 temps, B « répond » 8 temps, comme une conversation.', 'danse:danse:miroir']],
   c: [['Atelier procédés', 15, 'Par groupes de 4 : construire 3 courtes parties, une en cascade, une en question-réponse, une en accumulation (on ajoute un mouvement à chaque reprise).', 'Les 3 procédés se reconnaissent.', '', 'danse:danse:groupes'],
    ['Assemblage', 15, 'Chaque groupe assemble ses 3 parties avec une entrée et une sortie de scène, puis présente.', 'L\'enchaînement est fluide, sans temps morts.', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Étirements ; chaque groupe explique quel procédé il préfère.', 'etirements']]},
  {t: 'Le contact et le poids', o: 'Danser à deux avec appuis, contrepoids et portés simples, en sécurité.', comp: ['HME3', 'HME5', 'GSS2'], e: [
    ['Confiance', 5, 'Par deux : l\'un guide l\'autre, yeux fermés, en le tenant par la main dans la salle, sur une musique calme.', 'libre'],
    ['Contrepoids', 5, 'Par deux face à face, mains tenues, pieds contre pieds : se pencher en arrière en équilibre, descendre et remonter ensemble.', 'danse:danse:miroir']],
   c: [['Appuis à deux', 12, 'Explorer : dos contre dos, épaule contre épaule, main contre main ; trouver 4 appuis différents et passer de l\'un à l\'autre sans se lâcher.', 'Nous passons d\'un appui à l\'autre en douceur.', '', 'danse:danse:miroir'],
    ['Duo contact', 12, 'Chaque duo crée 4 × 8 temps avec au moins 2 appuis et 1 contrepoids.', 'Notre duo est sûr et maîtrisé.', '', 'danse:danse:miroir'],
    ['Présentation', 6, 'Quelques duos présentent.', 'Je fais confiance et je suis digne de confiance.', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Massage du dos par deux (avec accord), étirements.', 'etirements']]},
  {t: 'Créer une chorégraphie', o: 'Composer en groupe une danse de 1 minute utilisant procédés et qualités.', comp: ['HME5', 'HSC2', 'GSS4'], e: [
    ['Échauffement mené par des élèves', 6, 'Deux élèves mènent l\'échauffement dansé.', 'danse:danse:lignes'],
    ['Cahier des charges', 4, 'Au tableau : 1 minute, une partie de la danse en ligne, deux procédés, deux qualités, un moment de contact, une fin.', 'explication']],
   c: [['Création', 24, 'Groupes de 4 ou 5 : création avec la fiche ; répéter en entier au moins 3 fois.', 'Notre chorégraphie respecte le cahier des charges.', '', 'danse:danse:groupes'],
    ['Regard extérieur', 6, 'Un groupe montre à un autre qui donne deux conseils.', 'Nous intégrons un conseil.', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Étirements ; chaque groupe note sa chorégraphie.', 'etirements']]},
  {t: 'Évaluation : chorégraphie de groupe', o: 'Présenter la chorégraphie et analyser celles des autres.', comp: ['HME4', 'HME5', 'HSC2', 'HSC3'], e: [
    ['Échauffement en autonomie', 5, 'Chaque groupe s\'échauffe et répète.', 'danse:danse:groupes'],
    ['Ordre de passage', 5, 'Tirage au sort de l\'ordre et rappel du rôle de spectateur.', 'explication']],
   c: [['Présentations', 25, 'Chaque groupe présente deux fois. Grille : rythme, procédés visibles, qualités du mouvement, mémoire, engagement. Les spectateurs repèrent les procédés.', 'Notre chorégraphie est dansée en entier, en rythme, avec engagement.', '', 'danse:danse:groupes'],
    ['Danse collective', 5, 'Toute la classe danse la danse en ligne.', '', '', 'danse:danse:lignes']],
   r: [['Bilan', 5, 'Auto-évaluation de groupe et commentaires des spectateurs.', 'explication']]}
]},
3: {th: 'Danses urbaines : hip-hop, battle et chorégraphie', comp: ['HME1', 'HME4', 'HME5', 'HSC3'], l: [
  {t: 'Le bounce et les pas de base', o: 'Danser le « bounce » (rebond des genoux) et 3 pas de base hip-hop en rythme.', e: [
    ['Bounce', 5, 'Sur une musique hip-hop (90 bpm) : rebond des genoux vers le bas sur chaque temps, puis vers le haut ; ajouter les épaules.', 'danse:danse:lignes'],
    ['Isolations', 5, 'Bouger une seule partie du corps : tête, épaules, cage thoracique, hanches.', 'danse:danse:lignes']],
   c: [['Pas de base', 15, 'Apprendre 3 pas : le « step touch », le « kick ball change », le « running man » (simplifié). Chaque pas sur 8 temps, puis enchaîner.', 'J\'enchaîne les 3 pas sans perdre le bounce.', 'Running man sans saut pour les élèves en difficulté.', 'danse:danse:lignes'],
    ['Phrase hip-hop', 15, 'Le prof apprend une phrase de 4 × 8 temps avec les 3 pas, une isolation et une pose finale.', 'Je danse la phrase avec l\'attitude (regard, énergie).', '', 'danse:danse:lignes']],
   r: [['Retour au calme', 5, 'Étirements ; d\'où vient le hip-hop ? (New York, années 70, culture et valeurs : respect, partage).', 'etirements']]},
  {t: 'Les freezes et les niveaux', o: 'Réaliser un freeze (arrêt figé) au sol ou debout et le relier à la danse.', comp: ['HME3', 'HME5', 'GSS2'], e: [
    ['Bounce et pas de base', 5, 'Révision des pas de la leçon 1.', 'danse:danse:lignes'],
    ['Gainage', 5, 'Planche, planche latérale, appui sur une main et un pied : préparation des freezes.', 'libre']],
   c: [['Atelier freezes', 12, 'Sur tapis : freeze debout (pose figée), freeze accroupi, freeze « baby » au sol (appui coude-genou) pour ceux qui le peuvent ; parade d\'un camarade.', 'Je tiens mon freeze 3 secondes.', 'Freeze debout uniquement.', 'libre'],
    ['Phrase + freeze', 12, 'Par 3 : la phrase de la leçon 1 + 8 temps pour descendre au sol + un freeze sur le dernier temps.', 'Notre freeze tombe exactement sur la fin de la musique.', '', 'danse:danse:groupes'],
    ['Présentation', 6, 'Présentation par groupes.', '', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Étirements des poignets, des épaules et du dos.', 'etirements']]},
  {t: 'Le cypher et la battle', o: 'Danser à son tour dans un cercle (cypher) et respecter les règles de la battle.', comp: ['HME5', 'HSC1', 'HSC3', 'GSS3'], e: [
    ['Échauffement', 5, 'Bounce, isolations, pas de base.', 'danse:danse:lignes'],
    ['Les règles', 5, 'Au tableau : on entre quand le précédent sort, on ne touche pas l\'adversaire, on salue, on encourage. Le respect d\'abord.', 'explication']],
   c: [['Le cypher', 12, 'En cercle, la musique tourne : chacun entre au centre pour 8 à 16 temps (pas de base ou création) puis sort ; tout le monde encourage.', 'J\'entre au moins deux fois dans le cercle.', 'Entrer à deux pour les plus timides.', 'danse:danse:cercle'],
    ['Battle de groupes', 18, 'Deux groupes face à face : chacun leur tour, un élève (ou un duo) répond à l\'autre groupe sur 16 temps. Jury d\'élèves : technique, originalité, respect.', 'Je réponds à mon adversaire avec respect.', '', 'danse:danse:miroir']],
   r: [['Retour au calme', 5, 'Retour sur les émotions : stress avant d\'entrer, plaisir après. Étirements.', 'etirements']]},
  {t: 'Créer une chorégraphie hip-hop', o: 'Composer en groupe une chorégraphie avec pas de base, isolations, freeze et formation.', comp: ['HME4', 'HME5', 'HSC2'], e: [
    ['Échauffement mené par élèves', 6, 'Deux élèves mènent l\'échauffement hip-hop.', 'danse:danse:lignes'],
    ['Cahier des charges', 4, '8 × 8 temps : la phrase de la classe, une partie créée, un changement de formation (ligne, triangle, cercle), un canon, un freeze final.', 'explication']],
   c: [['Création', 24, 'Groupes de 4 ou 5 avec la fiche ; le prof passe et aide à compter.', 'Notre chorégraphie respecte le cahier des charges.', '', 'danse:danse:groupes'],
    ['Regard extérieur', 6, 'Présentation à un autre groupe qui donne deux conseils.', '', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Étirements ; noter la chorégraphie sur la fiche.', 'etirements']]},
  {t: 'Répéter et mettre en scène', o: 'Améliorer la synchronisation, l\'énergie et l\'occupation de la scène.', comp: ['HME4', 'HME5', 'HSC2'], e: [
    ['Échauffement en autonomie', 6, 'Chaque groupe s\'échauffe seul.', 'danse:danse:groupes'],
    ['Synchronisation', 4, 'Le prof montre une vidéo courte d\'un groupe synchronisé : que remarque-t-on ?', 'explication']],
   c: [['Répétition par parties', 15, 'Chaque groupe répète partie par partie en comptant à voix haute, puis en entier.', 'Nous sommes synchronisés sur les temps forts.', '', 'danse:danse:groupes'],
    ['Filage', 15, 'Chaque groupe présente une fois ; les autres notent synchronisation, énergie, scène.', 'Nous utilisons toute la scène.', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Étirements ; chaque groupe choisit une chose à améliorer.', 'etirements']]},
  {t: 'Évaluation : spectacle hip-hop', o: 'Présenter sa chorégraphie et participer à un cypher final.', comp: ['HME1', 'HME4', 'HME5', 'HSC3', 'GSS3'], e: [
    ['Échauffement en autonomie', 5, 'Chaque groupe s\'échauffe et répète.', 'danse:danse:groupes'],
    ['Ordre de passage', 5, 'Tirage au sort de l\'ordre de passage ; rappel du rôle des spectateurs ou des juges.', 'explication']],
   c: [['Présentations', 22, 'Chaque groupe présente deux fois. Grille : rythme (bounce), pas de base, freeze, synchronisation, formation, attitude.', 'Notre chorégraphie est dansée en entier, synchronisée, avec énergie.', '', 'danse:danse:groupes'],
    ['Cypher final', 8, 'Grand cercle de la classe, chacun entre au moins une fois.', 'J\'entre dans le cercle.', '', 'danse:danse:cercle']],
   r: [['Bilan', 5, 'Auto-évaluation et commentaires des spectateurs.', 'explication']]}
]},
4: {th: 'Danse contemporaine : un thème, une intention, une création', comp: ['HME4', 'HME5', 'HSC2', 'GSS4'], l: [
  {t: 'Du geste quotidien au geste dansé', o: 'Transformer des gestes du quotidien (amplitude, vitesse, répétition) pour en faire une danse.', e: [
    ['Marche variée', 5, 'Marcher en variant vitesse, direction, niveau ; s\'arrêter, repartir, sans musique puis avec.', 'libre'],
    ['Respiration et poids', 5, 'Debout : se laisser tomber vers l\'avant et se rattraper, s\'enrouler et se dérouler vertèbre par vertèbre.', 'libre']],
   c: [['Trois gestes', 12, 'Chacun choisit 3 gestes du quotidien et les transforme : plus grand, plus lent, répété, avec une autre partie du corps.', 'Le geste transformé reste reconnaissable.', '', 'libre'],
    ['Solo de 30 secondes', 12, 'Chacun enchaîne ses 3 gestes transformés avec des déplacements, sur une musique choisie par le prof.', 'Mon solo a un début et une fin clairs.', '', 'libre'],
    ['Présentation en miroir', 6, 'Par deux : A montre son solo, B le décrit puis l\'apprend.', 'Je décris le solo avec des mots précis.', '', 'danse:danse:miroir']],
   r: [['Retour au calme', 5, 'Relaxation au sol, scan du corps.', 'etirements']]},
  {t: 'L\'espace et le regard', o: 'Utiliser l\'espace scénique (avant-scène, fond, diagonales) et le regard.', comp: ['HME4', 'HME5'], e: [
    ['Remplir l\'espace', 5, 'Marcher en remplissant tous les trous de la salle ; au signal, s\'arrêter et vérifier que l\'espace est bien réparti.', 'libre'],
    ['Le regard', 5, 'Marcher en regardant le sol, au loin, un partenaire ; quel effet pour le spectateur ?', 'libre']],
   c: [['Trajets sur scène', 15, 'Par 4 : placer les solos de la leçon 1 sur scène avec une entrée, un trajet en diagonale, un regroupement et une sortie.', 'Notre placement est lisible pour le public.', '', 'danse:danse:groupes'],
    ['Présentation', 15, 'Chaque groupe présente ; le public dit ce que le regard et l\'espace racontent.', 'Le regard soutient notre intention.', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Étirements ; vocabulaire : avant-scène, fond de scène, cour, jardin.', 'etirements']]},
  {t: 'Choisir un thème et une intention', o: 'Partir d\'un thème (photo, mot, poème) pour créer une danse qui raconte quelque chose.', comp: ['HME5', 'HSC2'], e: [
    ['Improvisation guidée', 6, 'Le prof dit des mots (vent, foule, attente, colère) ; les élèves improvisent 30 s sur chaque mot.', 'libre'],
    ['Choix du thème', 4, 'Chaque groupe tire ou choisit une photo ou un mot inducteur.', 'explication']],
   c: [['Recherche', 15, 'Par groupes : improviser autour du thème, garder les meilleures trouvailles et les écrire.', 'Nous avons au moins 4 idées de mouvements liés au thème.', '', 'danse:danse:groupes'],
    ['Première ébauche', 15, 'Assembler les trouvailles en une ébauche de 1 minute et la montrer à un autre groupe, qui devine le thème.', 'Le thème est perceptible.', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Étirements ; chaque groupe écrit son intention en une phrase.', 'etirements']]},
  {t: 'Composer : procédés et relations', o: 'Enrichir sa création avec unisson, canon, contact, contraste.', comp: ['HME4', 'HSC2'], e: [
    ['Échauffement mené par élèves', 6, 'Deux élèves mènent un échauffement au sol et debout.', 'libre'],
    ['Rappel des procédés', 4, 'Au tableau : unisson, canon, cascade, question-réponse, accumulation, contact.', 'explication']],
   c: [['Composition', 22, 'Chaque groupe ajoute au moins 3 procédés à sa création et choisit sa musique (ou le silence).', 'Les procédés servent le thème.', '', 'danse:danse:canon'],
    ['Filage', 8, 'Chaque groupe danse en entier une fois.', '', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Étirements ; noter la structure sur la fiche.', 'etirements']]},
  {t: 'Répéter et regarder', o: 'Affiner la création grâce au regard d\'un spectateur.', comp: ['HME5', 'HSC2', 'HSC3'], e: [
    ['Échauffement en autonomie', 6, 'Chaque groupe s\'échauffe et répète.', 'danse:danse:groupes'],
    ['La grille du spectateur', 4, 'Explication de la grille : thème perçu, procédés, espace, engagement.', 'explication']],
   c: [['Répétition', 15, 'Répétition partie par partie, puis en entier.', 'La création est mémorisée.', '', 'danse:danse:groupes'],
    ['Spectateurs critiques', 15, 'Chaque groupe danse pour un autre qui remplit la grille et donne 2 conseils ; on inverse.', 'Je donne des conseils précis et bienveillants.', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Étirements ; chaque groupe choisit ce qu\'il modifie.', 'etirements']]},
  {t: 'Évaluation : création contemporaine', o: 'Présenter sa création et en expliquer l\'intention.', comp: ['HME4', 'HME5', 'HSC2', 'HSC3', 'GSS4'], e: [
    ['Échauffement en autonomie', 5, 'Échauffement et dernière répétition.', 'danse:danse:groupes'],
    ['Ordre de passage', 5, 'Tirage au sort de l\'ordre de passage ; rappel du rôle des spectateurs ou des juges.', 'explication']],
   c: [['Présentations', 25, 'Chaque groupe annonce son titre puis danse. Grille : intention lisible, transformation des gestes, procédés, espace, engagement. Après chaque passage, le public dit ce qu\'il a compris.', 'Le public perçoit notre intention.', '', 'danse:danse:groupes'],
    ['Échanges', 5, 'Chaque groupe explique son thème et ses choix.', '', '', 'explication']],
   r: [['Bilan', 5, 'Auto-évaluation écrite sur la fiche, puis comparaison avec la grille du prof.', 'explication']]}
]},
5: {th: 'Danser à deux : rock et danses de couple', comp: ['HME4', 'HME5', 'HSC2', 'HSC3'], l: [
  {t: 'Le pas de base du rock', o: 'Danser le pas de base du rock (6 temps) en rythme, seul puis à deux.', e: [
    ['Marche en rythme', 5, 'Marcher sur une musique rock ; taper les temps 2 et 4.', 'libre'],
    ['Pas de base seul', 5, 'Le pas de base : arrière (1), sur place (2), pied gauche (3-4), pied droit (5-6). Répéter en comptant.', 'danse:danse:lignes']],
   c: [['La tenue', 10, 'Par deux (on change de partenaire toutes les 3 minutes) : tenue main dans la main, bras souple ; le guide donne l\'impulsion, le suiveur répond.', 'Nous faisons 4 pas de base de suite ensemble.', '', 'danse:danse:miroir'],
    ['Pas de base en couple', 15, 'Pas de base à deux, puis en tournant sur place, puis en se déplaçant.', 'Nous gardons le rythme en tournant.', 'Garder le pas de base sur place pour ceux qui ont du mal.', 'danse:danse:miroir'],
    ['Changer de partenaire', 5, 'Ronde : au signal, chacun change de partenaire et reprend le pas.', 'Je m\'adapte à un nouveau partenaire.', '', 'danse:danse:cercle']],
   r: [['Retour au calme', 5, 'Étirements ; respecter son partenaire, quel que soit ce partenaire.', 'etirements']]},
  {t: 'Les passes simples', o: 'Réaliser 2 passes : passage sous le bras et changement de place.', e: [
    ['Pas de base', 5, 'Seul puis à deux, révision.', 'danse:danse:miroir'],
    ['Tour sur place', 5, 'Seul : tour sur soi en 2 temps sans perdre l\'équilibre.', 'libre']],
   c: [['Passage sous le bras', 12, 'Le guide lève le bras, le suiveur passe dessous en tournant ; reprise du pas de base.', 'La passe est fluide et sans forcer sur le bras.', '', 'danse:danse:miroir'],
    ['Changement de place', 10, 'Les partenaires échangent leur place en tournant.', 'Nous revenons dans le rythme après la passe.', '', 'danse:danse:miroir'],
    ['Enchaînement', 8, 'Pas de base, passe sous le bras, pas de base, changement de place. On change de partenaire.', 'J\'enchaîne sans m\'arrêter.', '', 'danse:danse:miroir']],
   r: [['Retour au calme', 5, 'Étirements des épaules et des poignets.', 'etirements']]},
  {t: 'Guider et suivre', o: 'Guider par la main (impulsion) et suivre sans anticiper.', comp: ['HME4', 'HSC2', 'HSC3'], e: [
    ['Jeu du guide', 5, 'Par deux, mains en contact : le guide déplace le suiveur yeux fermés.', 'libre'],
    ['Révision des passes', 5, 'Enchaînement de la leçon 2.', 'danse:danse:miroir']],
   c: [['Le guide improvise', 15, 'Le guide choisit l\'ordre des passes sans prévenir, uniquement par l\'impulsion de la main. Les rôles s\'inversent.', 'Mon partenaire comprend mes intentions sans parler.', '', 'danse:danse:miroir'],
    ['Nouvelle passe', 15, 'Apprendre une passe nouvelle (la « présentation » ou le tour du guide).', 'Nous réussissons la nouvelle passe 3 fois sur 5.', '', 'danse:danse:miroir']],
   r: [['Retour au calme', 5, 'Retour : qu\'est-ce qui rend un partenaire agréable ? Étirements.', 'etirements']]},
  {t: 'Une autre danse de couple', o: 'Découvrir une autre danse de couple (salsa, valse ou bachata simplifiée).', e: [
    ['Le rythme', 5, 'Écoute : compter la musique (valse en 3, salsa en 8 avec pause sur le 4).', 'danse:danse:cercle'],
    ['Pas de base seul', 5, 'Pas de base de la danse choisie, seul en ligne.', 'danse:danse:lignes']],
   c: [['Pas de base à deux', 15, 'Tenue et pas de base à deux, puis en tournant.', 'Nous dansons le pas de base en rythme.', '', 'danse:danse:miroir'],
    ['Comparaison', 15, 'Alterner rock et nouvelle danse selon la musique que le prof lance ; reconnaître la danse à la musique.', 'Je choisis la bonne danse selon la musique.', '', 'danse:danse:miroir']],
   r: [['Retour au calme', 5, 'Étirements ; d\'où viennent ces danses ?', 'etirements']]},
  {t: 'Créer un enchaînement à deux', o: 'Composer un enchaînement de 1 minute à deux avec au moins 3 passes.', comp: ['HME4', 'HME5', 'HSC2'], e: [
    ['Échauffement en couple', 6, 'Pas de base et passes sur plusieurs musiques.', 'danse:danse:miroir'],
    ['Cahier des charges', 4, '1 minute, au moins 3 passes, un début et une fin, rester dans le rythme.', 'explication']],
   c: [['Création', 20, 'Chaque couple compose et répète son enchaînement.', 'Notre enchaînement respecte le cahier des charges.', '', 'danse:danse:miroir'],
    ['Présentation intermédiaire', 10, 'Chaque couple montre à un autre qui donne un conseil.', '', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Étirements en cercle (mollets, cuisses, épaules, 20 s chacun) ; chacun dit une chose réussie pendant la leçon.', 'etirements']]},
  {t: 'Évaluation : danser à deux', o: 'Présenter son enchaînement et danser en improvisation avec un autre partenaire.', comp: ['HME4', 'HME5', 'HSC2', 'HSC3'], e: [
    ['Échauffement en couple', 5, 'Révision de l\'enchaînement.', 'danse:danse:miroir'],
    ['Consignes', 5, 'Deux épreuves : enchaînement préparé, puis improvisation avec un partenaire tiré au sort.', 'explication']],
   c: [['Épreuve 1 : enchaînement', 15, 'Présentation par 3 couples à la fois. Grille : rythme, passes, fluidité, tenue.', 'Nous dansons tout l\'enchaînement en rythme.', '', 'danse:danse:groupes'],
    ['Épreuve 2 : improvisation', 15, 'Avec un partenaire tiré au sort, danser 1 minute en improvisant à partir des passes apprises.', 'Je m\'adapte à mon partenaire.', '', 'danse:danse:miroir']],
   r: [['Bilan', 5, 'Auto-évaluation ; le bal de fin.', 'explication']]}
]},
6: {th: 'Projet chorégraphique : créer, mettre en scène, présenter un spectacle', comp: ['HME4', 'HME5', 'HSC1', 'HSC2', 'HSC3', 'GSS4'], l: [
  {t: 'Lancement du projet', o: 'Former des groupes, choisir un style et un thème, organiser le travail.', comp: ['HSC1', 'HSC2'], e: [
    ['Échauffement collectif', 6, 'Le prof mène un échauffement qui mélange les styles vus les années précédentes.', 'danse:danse:lignes'],
    ['Présentation du projet', 4, 'Spectacle de fin de cycle : 2 à 3 minutes par groupe, style libre, un thème, des rôles (chorégraphe, responsable musique, responsable mise en scène).', 'explication']],
   c: [['Formation des groupes', 10, 'Groupes de 4 à 6 : choix du style, du thème, de la musique, répartition des rôles, écriture du projet.', 'Notre projet est écrit et chacun a un rôle.', '', 'explication'],
    ['Premières recherches', 20, 'Improvisations et premières phrases autour du thème.', 'Nous avons au moins 4 × 8 temps créés.', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Étirements ; chaque groupe note où il en est.', 'etirements']]},
  {t: 'Créer (1)', o: 'Construire la structure de la chorégraphie.', comp: ['HME5', 'HSC2'], e: [
    ['Échauffement mené par un groupe', 6, 'Un groupe mène l\'échauffement de la classe dans son style.', 'danse:danse:lignes'],
    ['Objectif du jour', 4, 'Chaque groupe écrit l\'objectif de la séance.', 'explication']],
   c: [['Création', 30, 'Travail par groupes ; le prof passe comme conseiller (structure, procédés, espace). À la fin, chaque groupe note sa structure sur un schéma (parties, formations, comptes).', 'La structure de la chorégraphie est complète.', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Étirements en cercle (mollets, cuisses, épaules, 20 s chacun) ; chacun dit une chose réussie pendant la leçon.', 'etirements']]},
  {t: 'Créer (2)', o: 'Enrichir la chorégraphie avec procédés, contrastes et mise en scène.', comp: ['HME4', 'HME5', 'HSC2'], e: [
    ['Échauffement mené par un groupe', 6, 'Un autre groupe mène l\'échauffement.', 'danse:danse:lignes'],
    ['Objectif du jour', 4, 'Chaque groupe choisit 2 améliorations à apporter.', 'explication']],
   c: [['Création', 20, 'Travail par groupes : procédés, contrastes, entrée et sortie, éventuel accessoire ou costume simple.', 'Notre chorégraphie a au moins 3 procédés et un contraste.', '', 'danse:danse:canon'],
    ['Regard croisé', 10, 'Deux groupes se montrent leur travail et se donnent 2 conseils avec la grille.', 'Je donne des conseils précis.', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Étirements en cercle (mollets, cuisses, épaules, 20 s chacun) ; chacun dit une chose réussie pendant la leçon.', 'etirements']]},
  {t: 'Répéter', o: 'Mémoriser, synchroniser, gagner en présence.', comp: ['HME4', 'HSC2', 'GSS3'], e: [
    ['Échauffement en autonomie', 6, 'Chaque groupe s\'échauffe seul.', 'danse:danse:groupes'],
    ['La présence', 4, 'Exercice : traverser la scène en regardant le public, sans rire.', 'libre']],
   c: [['Répétition', 20, 'Répétition par parties puis en entier ; filmer (avec accord) pour se regarder.', 'Nous dansons en entier sans hésitation.', '', 'danse:danse:groupes'],
    ['Filage devant la classe', 10, 'Chaque groupe présente une fois en conditions de spectacle.', 'Nous gérons le stress et restons concentrés.', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Retour sur le stress de la scène et comment le gérer. Étirements.', 'etirements']]},
  {t: 'Répétition générale et organisation', o: 'Organiser le spectacle : ordre, transitions, son, public.', comp: ['HSC1', 'HSC2'], e: [
    ['Échauffement en autonomie', 6, 'Chaque groupe s\'échauffe.', 'danse:danse:groupes'],
    ['Organisation', 4, 'Les responsables fixent l\'ordre de passage, la gestion du son, la présentation des groupes.', 'explication']],
   c: [['Répétition générale', 30, 'Le spectacle entier dans l\'ordre, avec transitions et son, comme le jour J.', 'Le spectacle s\'enchaîne sans temps mort.', '', 'danse:danse:groupes']],
   r: [['Retour au calme', 5, 'Derniers ajustements notés par chaque groupe.', 'etirements']]},
  {t: 'Évaluation : le spectacle', o: 'Présenter le spectacle et analyser son travail.', comp: ['HME4', 'HME5', 'HSC2', 'HSC3', 'GSS4'], e: [
    ['Échauffement en autonomie', 6, 'Chaque groupe s\'échauffe et se concentre.', 'danse:danse:groupes'],
    ['Mise en place', 4, 'Installation de la scène et du public (autre classe invitée si possible).', 'explication']],
   c: [['Spectacle', 25, 'Chaque groupe présente sa chorégraphie. Grille : intention, composition, technique, synchronisation, présence, rôle tenu dans le groupe.', 'Notre chorégraphie est dansée avec engagement et précision.', '', 'danse:danse:groupes'],
    ['Échanges avec le public', 5, 'Le public pose des questions, les groupes expliquent leurs choix.', '', '', 'explication']],
   r: [['Bilan écrit', 5, 'Bilan individuel : mon rôle, ce que j\'ai appris, ce que je referais autrement.', 'explication']]}
]}
}});
