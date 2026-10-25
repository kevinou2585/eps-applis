/* Volley-ball : 6 leçons par année (1re → 6e secondaire). [nom, minutes, consigne, (réussite, variante,) schéma] */
PREPA_ADD({id: 'volley', sport: 'Volley-ball', mat: 'Ballons de volley souples (1 pour 2), filets ou cordes tendues à 2 m – 2,24 m, cônes, cerceaux, chasubles, sifflet.', an: {
1: {th: 'Découvrir le volley : garder le ballon en l\'air et le renvoyer', comp: ['HME2', 'HME4', 'HSC1', 'HSC2'], l: [
  {t: 'Apprivoiser le ballon : la passe haute', o: 'Se placer sous le ballon et le renvoyer à deux mains au-dessus du front (doigts en coupe).', e: [
    ['Lancer-attraper au-dessus de la tête', 5, 'Chacun son ballon : lancer haut, se placer dessous, rattraper au-dessus du front, mains en forme de « triangle ».', 'libre'],
    ['Baudruches', 5, 'Garder une baudruche en l\'air avec les doigts, puis avec les avant-bras. Au signal, échanger sa baudruche.', 'libre']],
   c: [['Jonglage seul', 8, 'Passes hautes à soi-même en comptant. Si le ballon tombe, on recommence en battant son record.', '10 touches d\'affilée.', 'Assis puis debout ; alterner passe haute et rattraper.', 'libre'],
    ['Passes à deux', 10, 'Par deux à 3 m : lancer à deux mains à son partenaire qui renvoie en passe haute. Puis passes hautes continues.', 'Notre série atteint 10 passes.', 'Une touche de contrôle pour soi avant de passer.', 'deux'],
    ['Passe et traverse', 8, 'Par deux, traverser le gymnase en se faisant des passes hautes sans laisser tomber le ballon.', 'Nous traversons sans chute.', 'Course entre binômes.', 'deux']],
   r: [['Toquinho au calme', 5, 'Groupes de 5 en cercle : record de passes hautes du groupe, puis étirements des doigts et des épaules.', 'cercle']]},
  {t: 'La manchette', o: 'Renvoyer un ballon bas avec les avant-bras, bras tendus, mains jointes, jambes fléchies.', e: [
    ['Le plateau', 5, 'Bras tendus, mains jointes : le ballon posé sur les avant-bras, marcher sans le faire tomber, puis petits rebonds.', 'libre'],
    ['Qui passe dessous ?', 5, 'Le prof lance le ballon très haut ; à chaque rebond un élève passe dessous en position basse.', 'libre']],
   c: [['Manchette sur lancer', 10, 'Par deux : A lance à deux mains vers le ventre de B qui renvoie en manchette dans les mains de A. 10 fois puis on change.', 'Le ballon revient 6 fois sur 10 dans les mains du lanceur.', 'Le lanceur vise à droite et à gauche : B se déplace.', 'deux'],
    ['Manchette contre le mur', 8, 'Manchettes contre le mur au-dessus d\'une ligne à 2 m.', '5 manchettes de suite.', 'Alterner passe haute et manchette.', 'mur'],
    ['Cercle mixte', 8, 'En cercle : passe haute si le ballon arrive haut, manchette s\'il arrive bas. On compte le record.', 'Je choisis le bon geste.', '', 'cercle']],
   r: [['Retour', 5, 'Étirements des avant-bras et des cuisses ; rappel : « je plie les jambes, pas les bras ».', 'etirements']]},
  {t: 'Le service par en dessous', o: 'Mettre le ballon en jeu par en dessous, de derrière une ligne, au-dessus du filet.', e: [
    ['Lancer par-dessus le filet', 5, 'Par deux de part et d\'autre du filet bas : lancers à une main par en dessous, réception à deux mains.', 'filet:volley:1c1'],
    ['Passes à deux', 5, 'Passes hautes et manchettes par deux.', 'deux']],
   c: [['Service près du filet', 8, 'Pied opposé devant, ballon tenu bas, frappe avec le talon de la main. À 4 m du filet, puis on recule d\'un mètre après 3 réussites.', 'Je réussis 3 services sur 5.', 'Viser un cerceau posé au sol.', 'filet:volley:1c1'],
    ['Service-réception', 10, 'Par deux de part et d\'autre du filet : A sert, B attrape ou renvoie en manchette.', 'Mon service tombe dans le terrain.', 'Le receveur fait une manchette vers lui-même puis attrape.', 'filet:volley:1c1'],
    ['Balle au camp', 8, '3 contre 3 : on attrape et on relance par-dessus le filet ; on sert par en dessous pour commencer.', 'Notre équipe ne laisse pas tomber le ballon.', '', 'filet:volley:3c3']],
   r: [['Bilan', 5, 'Qui a progressé au service ? Étirements des épaules.', 'explication']]},
  {t: 'Renvoyer en 2 touches', o: 'Contrôler le ballon puis le renvoyer de l\'autre côté (contrôle + renvoi).', e: [
    ['Jonglage', 5, 'Passe haute à soi puis manchette à soi en alternance.', 'libre'],
    ['Passes au-dessus du filet', 5, 'Par deux de part et d\'autre du filet : passes hautes.', 'filet:volley:1c1']],
   c: [['1 contre 1 en 2 touches', 10, 'Petit terrain (3 m x 3 m) : je contrôle le ballon pour moi puis je le renvoie. Points au rebond dans le terrain.', 'Je fais 2 touches à chaque fois.', 'Autoriser une prise de balle pour les plus faibles.', 'filet:volley:1c1'],
    ['2 contre 2 coopératif', 8, 'Garder le plus longtemps possible le ballon en jeu entre les deux équipes.', 'Nous faisons 8 renvois.', '', 'filet:volley:2c2'],
    ['2 contre 2 opposition', 8, 'Même jeu, mais on cherche à marquer en visant les espaces libres.', 'Je vise un espace vide.', '', 'filet:volley:2c2']],
   r: [['Retour', 5, 'Étirements et partage des réussites.', 'etirements']]},
  {t: 'Jouer à 2 contre 2 : règles et rotation', o: 'Connaître les règles de base (filet, ligne, 3 touches, double touche) et jouer en tournoi.', comp: ['HME2', 'HSC1', 'HSC2', 'HSC3'], e: [
    ['Les règles', 5, 'Démonstration : ballon dehors, touche du filet, 3 touches maximum, double touche, comptage des points.', 'explication'],
    ['Échauffement à deux', 5, 'Passes et manchettes par deux, puis services.', 'deux']],
   c: [['Tournoi 2 contre 2', 20, 'Matchs de 5 minutes sur mini-terrains. On sert à tour de rôle. Une équipe au repos arbitre.', 'Je respecte les règles et j\'arbitre honnêtement.', 'Montée-descente : les gagnants montent d\'un terrain.', 'tournoi:volley'],
    ['L\'arbitre', 6, 'Arbitre élève sur chaise : il annonce les fautes et le score.', 'J\'annonce clairement le score.', '', 'filet:volley:2c2']],
   r: [['Fair-play', 5, 'Poignée de mains sous le filet, équipe la plus fair-play.', 'etirements']]},
  {t: 'Évaluation : gestes et jeu à 2 contre 2', o: 'Montrer la passe haute, la manchette, le service et le jeu à 2.', crit: [['Passe haute (5 essais)', 5, '1 point par passe réussie : ballon frappé à deux mains au-dessus du front et qui monte plus haut que la tête du partenaire'], ['Manchette (5 essais)', 5, '1 point par manchette réussie : bras tendus, ballon dirigé vers le cerceau, au-dessus de la tête du partenaire'], ['Service (5 essais)', 4, '4 : 4 ou 5 dans le terrain · 3 : 3 · 2 : 2 · 1 : 1 · 0 : aucun'], ['Match 2 contre 2 : jeu en 2 touches', 3, '3 : renvoie souvent en 2 touches · 1 : renvoie en 1 touche ou au hasard · 0 : ne touche presque pas le ballon'], ['Match : placement et règles', 3, '3 : revient au centre de son demi-terrain, respecte les règles · 1 : se place mal ou fautes · 0 : immobile']], e: [
    ['Échauffement connu', 5, 'Jonglage, passes à deux.', 'deux'],
    ['Services', 5, 'Services libres.', 'filet:volley:1c1']],
   c: [['Épreuve 1 : gestes', 10, 'Sur lancer du prof : 5 passes hautes et 5 manchettes vers un cerceau ; 5 services.', 'Passe et manchette au-dessus de la tête du partenaire ; 3 services sur 5.', '', 'deux'],
    ['Épreuve 2 : match 2 contre 2', 18, 'Matchs observés : placement, renvoi en 2 touches, règles.', 'Je fais 2 touches et je respecte les règles.', '', 'filet:volley:2c2']],
   r: [['Bilan', 5, 'Auto-évaluation et étirements.', 'explication']]}
]},
2: {th: 'Construire l\'échange : passe orientée, réception, jeu à 3', comp: ['HME2', 'HME4', 'HSC1', 'HSC2'], l: [
  {t: 'La passe haute orientée', o: 'Se placer sous le ballon et orienter sa passe vers un partenaire.', e: [
    ['Jonglage en déplacement', 5, 'Passes hautes à soi en marchant, puis en tournant sur soi.', 'libre'],
    ['Passes à deux', 5, 'Passes hautes puis manchettes.', 'deux']],
   c: [['Passe à 3 en triangle', 10, 'Par 3 en triangle : je reçois de A, je me tourne face à B et je lui passe.', 'Ma passe arrive au-dessus de la tête de B.', 'Le triangle tourne dans l\'autre sens.', 'trois'],
    ['Passe au-dessus du filet', 8, 'Par 3 : A lance, B (au filet) fait une passe haute vers C de l\'autre côté.', 'La passe passe le filet et retombe dans la zone.', '', 'filet:volley:2c1'],
    ['Défi zones', 8, '2 contre 2 : un point bonus si on renvoie dans un cerceau.', '', '', 'filet:volley:2c2']],
   r: [['Retour', 5, 'Étirements des épaules et des doigts.', 'etirements']]},
  {t: 'La réception en manchette', o: 'Recevoir un service en manchette et l\'orienter vers le passeur.', e: [
    ['Déplacements', 5, 'Pas chassés, course avant-arrière, position basse au signal.', 'files'],
    ['Manchettes à deux', 5, 'Lancer-manchette puis manchette continue.', 'deux']],
   c: [['Réception de service', 10, 'Un serveur, un receveur, un passeur cible au filet : le receveur vise le passeur.', 'Ma réception arrive près du passeur 5 fois sur 10.', 'Service plus loin, plus fort.', 'filet:volley:2c1'],
    ['Réception à deux', 8, 'Deux receveurs se partagent le terrain : « j\'ai ! » pour annoncer.', 'Nous ne laissons pas tomber de ballon entre nous.', '', 'filet:volley:2c2'],
    ['Match à thème', 8, '2 contre 2 : un point vaut double si la 1re touche est une manchette.', '', '', 'filet:volley:2c2']],
   r: [['Bilan', 5, 'Pourquoi annoncer « j\'ai ! » ? Étirements.', 'explication']]},
  {t: 'Le service tennis (par le haut)', o: 'Servir par le haut, lancer devant l\'épaule, frappe main ferme.', e: [
    ['Lancers par le haut', 5, 'Lancer de balle par le haut par-dessus le filet, en enchaînant pied opposé devant.', 'filet:volley:1c1'],
    ['Lancer du ballon', 5, 'Lancer le ballon droit devant soi, il doit retomber devant le pied avant.', 'libre']],
   c: [['Service tennis à 5 m', 10, 'Par deux de part et d\'autre du filet : service tennis de près, on recule après 3 réussites.', 'Je réussis 3 services sur 5 depuis 6 m.', 'Choisir : service par en dessous ou tennis.', 'filet:volley:1c1'],
    ['Service cible', 8, 'Viser des zones (cerceaux, tapis) dans le terrain adverse.', 'Je touche une zone 2 fois sur 10.', '', 'filet:volley:1c1'],
    ['Match 3 contre 3', 8, 'Le service est libre ; on tourne le serveur à chaque point gagné.', '', '', 'filet:volley:3c3']],
   r: [['Retour', 5, 'Étirements de l\'épaule.', 'etirements']]},
  {t: 'Jouer à 3 : réception, passe, renvoi', o: 'Utiliser les 3 touches : réception en manchette, passe haute, renvoi.', e: [
    ['Passes à 3', 5, 'Passe, manchette en triangle.', 'trois'],
    ['Jeu du « plus haut »', 5, 'En cercle, chaque passe doit monter plus haut que le filet.', 'cercle']],
   c: [['3 touches coopératives', 10, '3 contre 3 : chaque équipe doit faire 3 touches avant de renvoyer. Le point compte double si on renvoie en passe haute.', 'Nous faisons 3 touches au moins 3 fois.', '', 'filet:volley:3c3'],
    ['3 contre 3 compétition', 12, 'Matchs de 5 minutes, rotation à chaque service gagné.', 'Je fais la touche qui correspond à ma place.', '', 'filet:volley:3c3']],
   r: [['Retour', 5, 'Étirements et bilan.', 'etirements']]},
  {t: 'Règles, rotation et arbitrage', o: 'Appliquer la rotation, les fautes (filet, pénétration, double touche) et arbitrer.', comp: ['HME2', 'HSC1', 'HSC2', 'HSC3'], e: [
    ['Rotation sans ballon', 5, 'Les équipes de 4 apprennent la rotation dans le sens des aiguilles d\'une montre.', 'filet:volley:4c4'],
    ['Services', 5, 'Services libres.', 'filet:volley:1c1']],
   c: [['Tournoi 3 contre 3 / 4 contre 4', 20, 'Matchs avec rotation ; arbitres élèves avec gestes officiels (balle dedans, dehors, filet, double).', 'J\'arbitre avec les bons gestes.', 'Feuille de match.', 'tournoi:volley'],
    ['Les gestes', 6, 'Révision rapide des gestes d\'arbitre entre deux matchs.', '', '', 'explication']],
   r: [['Retour', 5, 'Fair-play et étirements.', 'etirements']]},
  {t: 'Évaluation : jeu à 3', o: 'Montrer la réception, la passe orientée, le service et le jeu à 3.', crit: [['Service (5 essais)', 5, '1 point par service tombé dans le terrain adverse'], ['Réception vers le passeur', 4, '4 : réceptionne en manchette vers l\'avant presque toujours · 2 : une fois sur deux · 0 : renvoie au hasard'], ['Passe orientée', 4, '4 : passe haute vers le partenaire ou la zone voulue · 2 : passe haute sans direction · 0 : ne fait pas de passe'], ['Jeu à 3 touches', 4, '4 : son équipe construit souvent en 3 touches et il y participe · 2 : parfois · 0 : jamais'], ['Placement et règles', 3, '3 : bon placement, appel « j\'ai », règles respectées · 1 : moyen · 0 : passif']], e: [
    ['Échauffement par groupes', 5, 'Passes, manchettes, services.', 'deux'],
    ['Services', 5, 'Services libres.', 'filet:volley:1c1']],
   c: [['Épreuve 1 : service', 6, 'Chaque élève fait 5 services (par en dessous ou tennis, au choix) depuis la ligne de fond ; le partenaire compte les services qui tombent dans le terrain adverse.', '3 services sur 5 dans le terrain.', '', 'filet:volley:1c1'],
    ['Épreuve 2 : match observé', 22, '3 contre 3 : utilisation des 3 touches, placement, règles.', 'Mon équipe construit l\'échange.', '', 'filet:volley:3c3']],
   r: [['Bilan', 5, 'Auto-évaluation.', 'explication']]}
]},
3: {th: 'Attaquer : la passe pour l\'attaquant et la frappe d\'attaque', comp: ['HME2', 'HME4', 'HSC1', 'HSC2'], l: [
  {t: 'La passe de l\'attaque (le passeur)', o: 'Placer une passe haute près du filet pour un partenaire attaquant.', e: [
    ['Passes à deux', 5, 'Par deux à 4 m : 20 passes hautes de suite, puis 20 manchettes, puis alterner passe et manchette sans faire tomber le ballon.', 'deux'],
    ['Passe en avant / en arrière', 5, 'Par 3 en ligne : passe vers l\'avant puis passe arrière par-dessus la tête.', 'trois']],
   c: [['Passeur au filet', 10, 'Un lanceur, un passeur au filet, un attaquant qui attrape au plus haut.', 'Ma passe arrive à 1 m du filet, haute.', 'L\'attaquant frappe à la main.', 'filet:volley:2c1'],
    ['Réception-passe-attaque', 10, 'Par 3 : réception de service, passe, renvoi en attaque.', 'Nous enchaînons les 3 touches 4 fois sur 10.', '', 'filet:volley:3c3'],
    ['Match', 6, '3 contre 3 sur terrain réduit avec un passeur désigné : la 1re touche va au passeur, qui fait la 2e touche pour un partenaire. Le passeur change à chaque rotation.', 'Mon équipe construit l\'attaque en 3 touches au moins une fois sur deux.', '', 'filet:volley:3c3']],
   r: [['Retour', 5, 'Étirements des épaules, des poignets et des doigts ; chacun dit à quelle hauteur et à quelle distance du filet la passe est la plus facile à attaquer.', 'etirements']]},
  {t: 'La frappe d\'attaque', o: 'Frapper le ballon au-dessus du filet après un élan de 2-3 pas.', e: [
    ['Élan sans ballon', 5, 'Le rythme gauche-droite-gauche (droitier), bras en arrière puis vers le haut.', 'files'],
    ['Frappe au sol', 5, 'Frapper le ballon tenu par un partenaire au-dessus de lui, puis frappe contre le sol.', 'deux']],
   c: [['Attaque sur lancer', 10, 'Le prof ou un élève lance haut près du filet ; l\'attaquant prend son élan et frappe.', 'Je frappe au-dessus du filet dans le terrain.', 'Filet plus bas pour les débutants.', 'filet:volley:2c1'],
    ['Attaque sur passe', 10, 'Par 3 : un lanceur envoie au passeur, qui fait une passe haute pour l\'attaquant ; l\'attaquant prend son élan et frappe. Rotation des rôles toutes les 5 balles.', 'L\'attaque passe le filet et retombe dans le terrain 3 fois sur 5.', '', 'filet:volley:2c1'],
    ['Match à bonus', 6, '3 contre 3 sur terrain réduit : un point marqué par une attaque en 3e touche (frappe ou ballon placé) vaut 2 points. Rotation à chaque reprise du service.', 'Je tente une attaque chaque fois que la passe est bonne.', '', 'filet:volley:3c3']],
   r: [['Retour', 5, 'Étirements des épaules et des poignets ; rappel : on frappe avec la main ouverte, le bras tendu au-dessus de la tête.', 'etirements']]},
  {t: 'Défendre : la couverture et la défense basse', o: 'Récupérer une attaque en position basse et couvrir l\'attaquant.', e: [
    ['Plongeons au sol', 5, 'Sur tapis : chutes amorties sur le côté (sécurité).', 'libre'],
    ['Manchette sur frappe', 5, 'Par deux : A frappe vers B qui défend en manchette.', 'deux']],
   c: [['Défense sur attaque', 10, 'Un attaquant sur plinth ou au filet frappe ; 2 défenseurs récupèrent.', 'Je relève le ballon 3 fois sur 10.', '', 'filet:volley:2c1'],
    ['Couverture', 8, 'Quand mon partenaire attaque, je me place derrière lui (accroupi).', 'Je suis prêt quand le ballon revient.', '', 'filet:volley:3c3'],
    ['Match 4 contre 4', 8, '4 contre 4 avec rotation à chaque reprise du service ; le joueur qui arrive au filet est passeur. Attaque obligatoire en 3e touche (manchette, passe haute ou smash).', 'Je respecte la rotation et je sais quand je suis passeur.', '', 'filet:volley:4c4']],
   r: [['Retour', 5, 'Étirements ; bilan : où se placer quand un partenaire attaque (derrière lui, accroupi) ?', 'etirements']]},
  {t: 'Jouer à 4 contre 4', o: 'Organiser son équipe : réceptionneurs, passeur, attaquants ; rotation.', e: [
    ['Échauffement d\'équipe', 5, 'Par équipe de 4 en carré : passes et manchettes en annonçant « j\'ai ! » avant chaque touche, puis 2 services chacun.', 'cercle'],
    ['Rotation', 5, 'Au tableau puis sur le terrain : rappel de la rotation à 4 (sens des aiguilles d\'une montre), qui sert, qui est passeur au filet.', 'filet:volley:4c4']],
   c: [['4 contre 4 coopération puis opposition', 22, '2 minutes en coopération (garder le ballon), puis 6 minutes de match. On change d\'adversaire.', 'Mon équipe construit 3 touches.', '', 'filet:volley:4c4']],
   r: [['Bilan d\'équipe', 6, 'Chaque équipe dit ce qui a marché (une réussite) et ce qu\'elle change pour le prochain match (une consigne).', 'explication']]},
  {t: 'Le contre (initiation)', o: 'Sauter au filet bras tendus au bon moment pour gêner l\'attaque.', comp: ['HME2', 'HME4', 'HSC1', 'GSS2'], e: [
    ['Sauts au filet', 5, 'Sauts verticaux mains au-dessus du filet sans le toucher, pas chassés le long du filet.', 'filet:volley:2c2'],
    ['Passes', 5, 'Par deux : passes hautes puis passes en sautant au-dessus de la tête, pour préparer les sauts au filet.', 'deux']],
   c: [['Attaque contre 1 contreur', 10, 'L\'attaquant frappe sur lancer, le contreur saute en face.', 'Je saute après l\'attaquant, mains fermes.', '', 'filet:volley:1c1'],
    ['Match 4 contre 4', 14, '4 contre 4 : un contre réussi (ballon renvoyé directement au sol adverse) vaut 2 points. Les joueurs avant sautent au contre quand l\'adversaire attaque fort.', 'Je saute au contre au bon moment, bras tendus au-dessus du filet.', '', 'filet:volley:4c4']],
   r: [['Sécurité', 5, 'Rappel : ne pas passer sous le filet ; étirements.', 'etirements']]},
  {t: 'Évaluation : attaque et jeu à 4', o: 'Montrer la passe pour l\'attaque, la frappe et le jeu organisé à 4.', crit: [['Réception vers le passeur', 4, 'Sur 5 essais : 5 réussies = 4 · 4 = 3 · 3 = 2 · 1-2 = 1 · 0 = 0'], ['Passe pour l\'attaque', 4, 'Sur 5 essais : passe haute près du filet, attaquable : 5 = 4 · 4 = 3 · 3 = 2 · 1-2 = 1'], ['Attaque (frappe)', 4, 'Sur 5 essais : frappe à une main par-dessus le filet dans le terrain : 4-5 = 4 · 3 = 3 · 2 = 2 · 1 = 1'], ['Match : organisation (rotation, passeur)', 4, '4 : tourne correctement et tient son rôle au poste · 2 : erreurs de rotation · 0 : ignore l\'organisation'], ['Match : défense et règles', 4, '4 : défend, respecte les règles et l\'arbitre · 2 : quelques fautes · 0 : passif ou fautes répétées']], e: [
    ['Échauffement en autonomie', 5, 'Chaque équipe s\'échauffe seule : trot et mobilisation, passes et manchettes en carré, 3 services chacun. Le prof observe le sérieux.', 'cercle'],
    ['Services et attaques', 5, 'Chaque élève fait 3 services et 3 attaques sur lancer pour se préparer à l\'épreuve.', 'filet:volley:2c1']],
   c: [['Épreuve 1 : enchaînement', 8, 'Par 3 : le prof sert, un élève réceptionne vers le passeur, le passeur fait une passe haute, le 3e attaque. 5 essais par élève à chaque poste.', 'Au moins 3 enchaînements réussis sur 5.', '', 'filet:volley:3c3'],
    ['Épreuve 2 : match observé', 20, '4 contre 4 : le prof observe avec une grille l\'organisation (rotation, passeur), l\'attaque, la défense et le respect des règles.', 'Je tiens mon rôle et je respecte la rotation.', '', 'filet:volley:4c4']],
   r: [['Bilan', 5, 'Auto-évaluation sur la fiche (passe, attaque, défense, rôle) puis comparaison avec l\'évaluation du prof.', 'explication']]}
]},
4: {th: 'Le jeu à 6 : réception en W, passeur, attaque et contre', comp: ['HME2', 'HME4', 'HSC1', 'HSC2', 'GSS1'], l: [
  {t: 'Le placement à 6 et la réception en W', o: 'Se placer à 6 en réception (W) et orienter la réception vers le passeur.', e: [
    ['Passes à 3', 5, 'Par 3 en triangle : manchette vers le passeur, passe haute vers le 3e, qui renvoie en manchette ; on tourne toutes les 10 touches.', 'trois'],
    ['Services', 5, 'Chacun fait 5 services tennis depuis la ligne de fond ; le partenaire en face compte les réussites.', 'filet:volley:1c1']],
   c: [['Réception en W', 12, 'Une équipe de 6 en W reçoit les services de l\'autre ; le passeur au filet attrape.', 'Ma réception arrive au passeur.', 'Le passeur fait une passe pour un attaquant.', 'filet:volley:6c6'],
    ['Match 6 contre 6', 12, 'Matchs 6 contre 6 sur terrain réglementaire, rotation dans le sens des aiguilles d\'une montre à chaque reprise du service. Arbitrage par les élèves non joueurs.', 'Je suis à la bonne place au moment du service de mon équipe et de l\'adversaire.', '', 'filet:volley:6c6']],
   r: [['Retour', 5, 'Étirements ; au tableau, chacun replace les 6 joueurs en W de réception.', 'etirements']]},
  {t: 'Le passeur et l\'attaque à l\'aile', o: 'Passer vers les ailes (poste 4 et 2) et attaquer en diagonale.', e: [
    ['Élan d\'attaque', 5, 'Élans sans ballon depuis la ligne des 3 m : 3 pas (pour un droitier : droite, gauche, droite-gauche en appel), bras en arrière puis vers le haut, saut et frappe dans le vide.', 'files'],
    ['Passes avant / arrière', 5, 'Par 3 en ligne : celui du milieu reçoit et fait une passe vers l\'avant, puis une passe arrière par-dessus sa tête ; on tourne toutes les 6 passes.', 'trois']],
   c: [['Passe et attaque poste 4', 10, 'Lanceur - passeur - attaquant à l\'aile gauche ; attaque en diagonale.', 'Mon attaque tombe dans le terrain.', 'Attaque en ligne.', 'filet:volley:2c1'],
    ['Attaque poste 2', 8, 'Le passeur en poste 3 fait une passe arrière (par-dessus sa tête) vers l\'aile droite ; un attaquant en poste 2 attaque. Rotation des rôles toutes les 5 balles.', 'La passe arrière arrive haute et près du filet pour l\'attaquant.', '', 'filet:volley:2c1'],
    ['Match à thème', 8, '6 contre 6 : un point marqué par une attaque (smash ou attaque placée en 3e touche) vaut 2 points.', 'Mon équipe marque au moins un point d\'attaque par set.', '', 'filet:volley:6c6']],
   r: [['Retour', 5, 'Étirements des épaules ; rappel : passe en avant vers le poste 4, passe arrière vers le poste 2.', 'etirements']]},
  {t: 'Le contre à deux', o: 'Se déplacer à deux le long du filet et contrer ensemble.', comp: ['HME2', 'HME4', 'HSC2', 'GSS2'], e: [
    ['Pas chassés au filet', 5, 'Le long du filet : pas chassés de 3 m, arrêt, saut au contre mains au-dessus du filet ; aller-retour 4 fois, sans toucher le filet.', 'filet:volley:2c2'],
    ['Attaques', 5, 'Attaques sur lancer du prof à l\'aile gauche, pour préparer le travail des contreurs.', 'filet:volley:2c1']],
   c: [['Contre à 2', 10, 'Attaquant contre 2 contreurs qui se rejoignent.', 'Nos mains forment un mur.', '', 'filet:volley:2c2'],
    ['Défense derrière le contre', 8, 'Le contre ferme la ligne : les défenseurs arrière se placent dans la diagonale, là où le contre ne ferme pas. Le prof attaque depuis une chaise, les élèves défendent et relèvent.', 'Je me place hors de l\'ombre du contre et je relève le ballon haut.', '', 'filet:volley:4c4'],
    ['Match', 8, '6 contre 6 avec passeur fixe par équipe ; le prof note le nombre de 3 touches construites par chaque équipe.', 'Mon équipe joue en 3 touches le plus souvent possible.', '', 'filet:volley:6c6']],
   r: [['Retour', 5, 'Étirements des épaules et des mollets ; rappel de sécurité : on ne passe jamais sous le filet.', 'etirements']]},
  {t: 'Varier le service', o: 'Viser une zone faible et varier vitesse et trajectoire du service.', e: [
    ['Services cible', 6, 'Le terrain adverse est divisé en zones numérotées (1, 5, 6 au fond) : chacun sert 3 fois vers chaque zone ; on compte les réussites.', 'filet:volley:1c1'],
    ['Passes', 4, 'Par deux : passes et manchettes continues pendant 4 minutes.', 'deux']],
   c: [['Service et réception', 10, 'Par équipes de 3 : un joueur sert vers une zone choisie, les 3 autres réceptionnent et construisent passe et attaque.', 'Mon service gêne la réception (pas de passe possible) au moins 1 fois sur 3.', 'Service flottant.', 'filet:volley:3c3'],
    ['Match', 14, '6 contre 6 : avant chaque service, l\'équipe choisit une cible (joueur faible en réception, zone vide) annoncée au capitaine.', 'Je sers vers la cible choisie par mon équipe.', '', 'filet:volley:6c6']],
   r: [['Bilan', 5, 'Chaque équipe dit où elle servira contre l\'adversaire du prochain match et pourquoi (joueur faible, zone vide).', 'explication']]},
  {t: 'Tournoi 6 contre 6', o: 'Jouer en équipe organisée, arbitrer officiellement.', comp: ['HSC1', 'HSC2', 'HSC3'], e: [
    ['Échauffement d\'équipe', 6, 'Mené par le capitaine : trot, mobilisation, passes en carré, attaques sur passe du passeur.', 'cercle'],
    ['Services', 4, '3 services chacun avant le premier match, vers la zone choisie par l\'équipe.', 'filet:volley:1c1']],
   c: [['Tournoi', 24, 'Sets de 15 points en 6 contre 6 ; les équipes au repos arbitrent (1 arbitre, 1 marqueur). Chaque équipe joue au moins 3 sets.', 'Notre équipe joue organisée : réception en W, passeur, rotation correcte.', '', 'filet:volley:6c6']],
   r: [['Classement', 5, 'Mise à jour du classement et prix du fair-play voté par les arbitres.', 'explication']]},
  {t: 'Évaluation : jeu à 6', o: 'Montrer son rôle dans l\'équipe et l\'efficacité de ses gestes.', crit: [['Réception', 4, '4 : réception précise vers le passeur · 2 : réception haute mais mal dirigée · 0 : ratée le plus souvent'], ['Passe', 3, '3 : passe haute et attaquable · 1 : passe imprécise · 0 : jamais'], ['Attaque', 3, '3 : attaque frappée gagnante ou difficile · 1 : renvoi sans attaque · 0 : jamais'], ['Service', 4, '4 : 80 % des services dans le terrain · 3 : 60 % · 2 : 40 % · 1 : moins'], ['Placement et rôle dans l\'équipe', 4, '4 : tient son poste et sa rotation, appelle le ballon · 2 : se trompe parfois · 0 : perdu sur le terrain'], ['Règles et fair-play', 2, '2 : aucune contestation, respecte les règles · 1 : un écart · 0 : plusieurs']], e: [
    ['Échauffement en autonomie', 6, 'Chaque équipe s\'échauffe seule : mobilisation, passes, attaques et 3 services par joueur.', 'cercle'],
    ['Services', 4, '3 services chacun vers une zone choisie.', 'filet:volley:1c1']],
   c: [['Matchs observés', 28, 'Matchs 6 contre 6 ; grille du prof : réception, passe, attaque, service, placement et respect des règles.', 'Je tiens mon rôle et mes gestes sont efficaces.', '', 'filet:volley:6c6']],
   r: [['Bilan', 5, 'Auto-évaluation sur la fiche puis comparaison avec l\'évaluation du prof.', 'explication']]}
]},
5: {th: 'Tactique d\'équipe : systèmes de jeu, attaque rapide, stratégie', comp: ['HME2', 'HME4', 'HSC1', 'HSC2', 'GSS1'], l: [
  {t: 'Système à passeur unique (4-2 / 5-1)', o: 'Organiser l\'équipe avec un passeur qui pénètre et deux pointus.', e: [
    ['Échauffement mené par élèves', 6, 'Deux élèves mènent l\'échauffement : mobilisation, passes et manchettes à 3, attaques sur passe.', 'trois'],
    ['Services', 4, 'Services ciblés vers les zones 1, 6 et 5 ; on compte les réussites.', 'filet:volley:1c1']],
   c: [['Mise en place du système', 10, 'À vide puis sur services du prof : le passeur part de l\'arrière et pénètre au filet entre le poste 2 et 3 ; les autres réceptionnent et attaquent aux ailes.', 'Chacun connaît sa place et son déplacement au moment du service.', '', 'filet:volley:6c6'],
    ['Match à thème', 14, '6 contre 6 : la 2e touche doit être faite par le passeur (s\'il ne peut pas, le point est rejoué). Les autres joueurs envoient la réception vers la zone du passeur.', 'Ma réception arrive dans la zone du passeur.', '', 'filet:volley:6c6']],
   r: [['Retour', 5, 'Bilan : le système était-il clair ? Chaque équipe note sur sa fiche les places de départ des 6 joueurs.', 'explication']]},
  {t: 'L\'attaque rapide et la feinte', o: 'Attaquer en passe courte au centre ou feinter (balle placée).', e: [
    ['Élans', 5, 'Élans d\'attaque sans ballon, puis élan rapide (2 pas) pour l\'attaque au centre.', 'files'],
    ['Passes courtes', 5, 'Passeur et attaquant au centre : passe basse et rapide juste au-dessus du filet, l\'attaquant saute avant la passe.', 'filet:volley:2c1']],
   c: [['Attaque au centre', 10, 'Passe courte (« 1re tempo ») pour l\'attaquant central.', 'L\'attaque part avant le contre.', '', 'filet:volley:2c1'],
    ['Feinte', 8, 'L\'attaquant fait semblant de frapper fort et pose le ballon du bout des doigts juste derrière le contre ou dans une zone vide.', 'Ma feinte tombe au sol sans être récupérée 2 fois sur 5.', '', 'filet:volley:2c2'],
    ['Match', 8, '6 contre 6 avec système de jeu choisi par l\'équipe (passeur fixe ou passeur avant) ; temps mort de 30 s possible pour réajuster.', 'Mon équipe applique le système choisi pendant tout le set.', '', 'filet:volley:6c6']],
   r: [['Retour', 5, 'Étirements ; chacun dit quand utiliser une feinte (contre bien placé, défenseurs reculés).', 'etirements']]},
  {t: 'La défense organisée', o: 'Organiser contre et défense en fonction de l\'attaque adverse.', e: [
    ['Défense basse', 5, 'Par deux : A frappe le ballon vers B, qui défend en position basse (manchette ou mains hautes) et renvoie haut ; 10 frappes puis on change.', 'deux'],
    ['Contre', 5, 'Sauts au contre le long du filet, seul puis à deux en se rejoignant ; mains fermes et inclinées vers le terrain adverse.', 'filet:volley:2c2']],
   c: [['Défense en « 6 en retrait »', 12, 'Mise en place sans ballon : 3 joueurs avant au contre ou au filet, le joueur 6 recule en fond de terrain, les ailiers arrière couvrent les côtés. Puis le prof attaque depuis une chaise, les élèves défendent.', 'Je me place à ma position de défense avant l\'attaque adverse.', '', 'filet:volley:6c6'],
    ['Match', 12, '6 contre 6 : un point gagné après une défense (ballon relevé sur attaque adverse puis point marqué) vaut 2 points.', 'Je relève au moins un ballon attaqué pendant le set.', '', 'filet:volley:6c6']],
   r: [['Retour', 5, 'Bilan : comment la défense s\'organise-t-elle quand l\'adversaire attaque au poste 4 ? Étirements.', 'explication']]},
  {t: 'Volley de plage à 2 (beach)', o: 'S\'adapter au jeu à deux : communication, couverture du terrain.', e: [
    ['Passes à deux', 5, 'Passes et manchettes continues par deux, sur un demi-terrain réduit (comme au beach), en se déplaçant.', 'deux'],
    ['Services', 5, 'Services ciblés vers le fond et les côtés du terrain réduit.', 'filet:volley:1c1']],
   c: [['Tournoi 2 contre 2', 24, 'Terrains réduits, règles du beach (3 touches, signaux dans le dos).', 'Nous communiquons à chaque ballon.', '', 'tournoi:volley']],
   r: [['Retour', 6, 'Étirements ; discussion : qu\'est-ce qui change à deux (communication, couverture du terrain) ?', 'etirements']]},
  {t: 'Arbitrer et coacher', o: 'Arbitrer un match à deux (1er et 2e arbitre) ; coacher son équipe.', comp: ['HSC1', 'HSC2', 'HSC3', 'GSS3'], e: [
    ['Gestes officiels', 5, 'Révision des gestes de l\'arbitre : point, ballon dehors, 4 touches, faute de filet, service, changement de joueur, temps mort.', 'explication'],
    ['Échauffement', 5, 'Chaque équipe s\'échauffe avec son coach, qui annonce la consigne du premier set.', 'cercle']],
   c: [['Tournoi avec coachs', 24, 'Tournoi de sets de 15 points : chaque équipe a un coach (élève dispensé ou remplaçant) qui donne une consigne entre les sets ; deux arbitres (1er arbitre et marqueur) par match.', 'Le coach donne une consigne précise et l\'équipe l\'applique.', '', 'filet:volley:6c6']],
   r: [['Retour', 6, 'Bilan des arbitres : quelles fautes ont été difficiles à voir ? Les coachs disent si leur consigne a été appliquée.', 'explication']]},
  {t: 'Évaluation : projet tactique', o: 'Appliquer en match un système de jeu choisi par l\'équipe.', crit: [['Application du système de jeu', 6, '6 : joue le système de l\'équipe à chaque échange · 4 : souvent · 2 : rarement · 0 : jamais'], ['Efficacité en attaque', 4, '4 : gagne régulièrement des points en attaque · 2 : parfois · 0 : jamais'], ['Services réussis', 4, '4 : 80 % dans le terrain · 3 : 60 % · 2 : 40 % · 1 : moins'], ['Rôles (capitaine, coach, arbitre)', 3, '3 : tient son rôle avec des consignes ou décisions justes · 1 : hésitant · 0 : refuse'], ['Fair-play', 3, '3 : respect total · 1 : un écart · 0 : plusieurs']], e: [
    ['Échauffement en autonomie', 6, 'Échauffement préparé par l\'équipe et réalisé sans le prof (mobilisation, passes, attaques, services).', 'cercle'],
    ['Projet', 4, 'Chaque équipe écrit son projet tactique : système de jeu, cible du service, défense prévue.', 'explication']],
   c: [['Matchs observés', 28, 'Matchs 6 contre 6 ; grille : application du système, efficacité (points gagnés en attaque, services réussis), rôles et fair-play.', 'Notre projet est visible dans le jeu.', '', 'filet:volley:6c6']],
   r: [['Bilan', 5, 'Auto-évaluation de l\'équipe : le projet a-t-il été appliqué ? Comparaison avec la grille du prof.', 'explication']]}
]},
6: {th: 'Autonomie et compétition : projet d\'équipe et tournoi organisé', comp: ['HME2', 'HSC1', 'HSC2', 'HSC3', 'GSS1', 'GSS5'], l: [
  {t: 'Diagnostic et équipes', o: 'Évaluer son niveau et former des équipes équilibrées.', e: [
    ['Échauffement libre', 6, 'Échauffement individuel avec la fiche (mobilisation, passes, manchettes, services) ; chacun choisit ses exercices.', 'deux'],
    ['Tests', 4, '10 services : le partenaire compte ceux qui tombent dans le terrain.', 'filet:volley:1c1']],
   c: [['Matchs test', 18, '4 contre 4 avec équipes tirées au sort, sets de 10 points ; le prof et les élèves repèrent les points forts de chacun (service, passe, attaque, défense).', 'Je montre ce que je sais faire et j\'observe les autres.', '', 'filet:volley:4c4'],
    ['Constitution des équipes', 10, 'Les capitaines (élus) composent des équipes équilibrées à partir des observations ; chaque équipe choisit un nom, un système de jeu et note ses objectifs.', 'Notre équipe est équilibrée et a un objectif écrit.', '', 'explication']],
   r: [['Projet', 5, 'Chaque équipe écrit son nom et son objectif (place au tournoi, système de jeu à maîtriser).', 'explication']]},
  {t: 'Préparation physique du volleyeur', o: 'Travailler détente, gainage et déplacements.', comp: ['HME2', 'GSS1', 'GSS5'], e: [
    ['Activation', 6, 'Sauts sur place, pas chassés latéraux, gainage 3 × 30 s, sauts au contre.', 'files'],
    ['Pouls', 4, 'Prise du pouls au repos ; rappel des zones d\'effort (récupération, endurance, intense).', 'explication']],
   c: [['Circuit volley', 16, '6 ateliers de 45 s : sauts au filet, déplacements défensifs, gainage, services, passes au mur, sauts en contre.', 'Je garde une bonne technique fatigué.', '', 'ateliers:volley:6'],
    ['Matchs courts', 12, '3 contre 3 sur terrain réduit, sets de 7 points, rotation rapide des adversaires : beaucoup de touches de balle et d\'échanges.', 'Je joue chaque ballon qui arrive dans ma zone.', '', 'filet:volley:3c3']],
   r: [['Récupération', 5, 'Étirements longs des mollets, des cuisses et des épaules ; pouls après 3 minutes.', 'etirements']]},
  {t: 'Préparer son équipe', o: 'Répéter son système et ses combinaisons.', e: [
    ['Échauffement d\'équipe', 6, 'Le capitaine mène l\'échauffement de son équipe avec passes, attaques et services.', 'cercle'],
    ['Services', 4, 'Services ciblés selon la stratégie de l\'équipe.', 'filet:volley:1c1']],
   c: [['Répétition', 10, 'Chaque équipe répète sa combinaison d\'attaque : d\'abord à vide (sans adversaire), puis contre une défense passive, puis contre une défense active.', 'L\'enchaînement réception-passe-attaque est réussi 3 fois sur 5 contre défense passive.', '', 'filet:volley:6c6'],
    ['Opposition', 18, 'Matchs d\'entraînement entre équipes (sets de 15 points) ; entre deux sets, l\'équipe analyse ce qui a marché et corrige.', 'Nous changeons au moins une chose entre les deux sets.', '', 'filet:volley:6c6']],
   r: [['Ajustements', 5, 'Chaque équipe note ce qu\'elle garde et ce qu\'elle change pour le tournoi.', 'explication']]},
  {t: 'Tournoi organisé par les élèves (1)', o: 'Organiser un tournoi : planning, arbitrage, feuilles de match.', comp: ['HSC1', 'HSC2', 'HSC3', 'GSS3'], e: [
    ['Organisation', 6, 'Les élèves se répartissent les rôles : responsable du planning, des arbitres, des feuilles de match, du tableau des résultats.', 'explication'],
    ['Échauffement', 4, 'Chaque équipe s\'échauffe en autonomie avant son premier match.', 'cercle']],
   c: [['Tournoi', 28, 'Tournoi organisé par les élèves (planning des rencontres, arbitres, marqueurs, tableau des résultats). Chaque équipe joue au moins 3 matchs.', 'Le tournoi se déroule sans l\'aide du prof : chaque élève sait quand il joue et quand il arbitre.', '', 'tournoi:volley']],
   r: [['Classement', 5, 'Mise à jour du tableau des résultats par les responsables.', 'explication']]},
  {t: 'Tournoi organisé par les élèves (2)', o: 'Phase finale, analyse et adaptation.', comp: ['HSC1', 'HSC2', 'HSC3', 'GSS5'], e: [
    ['Analyse', 5, 'Chaque équipe lit ses statistiques de la 1re journée (services, points en attaque) et décide d\'un ajustement.', 'explication'],
    ['Échauffement', 5, 'Échauffement en autonomie par équipe.', 'cercle']],
   c: [['Phase finale', 28, 'Demi-finales et finales (sets de 25 points), les équipes éliminées arbitrent et tiennent la feuille de match.', 'Je joue ou j\'arbitre en respectant les règles et l\'adversaire.', '', 'filet:volley:6c6']],
   r: [['Prix', 5, 'Fair-play, meilleur arbitre.', 'explication']]},
  {t: 'Évaluation : performance et rôles', o: 'Montrer son niveau et sa capacité à arbitrer ou coacher.', crit: [['Service', 3, '3 : 80 % dans le terrain, avec intention · 2 : 60 % · 1 : 40 %'], ['Réception', 3, '3 : précise vers le passeur · 2 : haute mais imprécise · 1 : souvent ratée'], ['Passe', 3, '3 : passe attaquable · 2 : imprécise · 1 : rare'], ['Attaque', 3, '3 : frappe efficace · 2 : renvoi contrôlé · 1 : renvoi au hasard'], ['Placement', 3, '3 : toujours au bon poste · 2 : parfois mal placé · 1 : perdu'], ['Arbitrage (1er arbitre d\'un set)', 5, '5 : set sans erreur sur les fautes principales, gestes officiels, score annoncé · 3 : quelques erreurs · 1 : hésitant']], e: [
    ['Échauffement en autonomie', 6, 'Chaque équipe s\'échauffe seule (mobilisation, passes, attaques, services).', 'cercle'],
    ['Services', 4, '3 services chacun avant les matchs.', 'filet:volley:1c1']],
   c: [['Matchs observés', 22, 'Matchs 6 contre 6 ; chaque élève est observé avec une grille de performance (service, réception, passe, attaque, placement) par un camarade et par le prof.', 'Je réussis mes gestes de base en match et je me place correctement.', '', 'filet:volley:6c6'],
    ['Arbitrage évalué', 6, 'Chaque élève arbitre un set (1er arbitre) : coups de sifflet, gestes officiels (faute de filet, ballon dehors, 4 touches), annonce du score.', 'J\'arbitre un set sans erreur sur les fautes principales.', '', 'filet:volley:6c6']],
   r: [['Après l\'école', 5, 'Où continuer le volley ? Clubs, beach.', 'explication']]}
]}
}});
