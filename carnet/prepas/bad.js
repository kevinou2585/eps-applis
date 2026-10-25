/* Badminton : 6 leçons par année (1re → 6e secondaire). 1 raquette par élève, 1 volant pour 2, filets ou cordes tendues à 1,55 m.
   e = échauffement, c = corps de leçon, r = retour au calme. [nom, minutes, consigne, (réussite, variante,) schéma] */
PREPA_ADD({id: 'bad', sport: 'Badminton', mat: '1 raquette par élève, 1 volant pour 2 (plastique), filets ou cordes à 1,55 m, cerceaux, coupelles, plots, feuilles de score.', an: {
1: {th: 'Découvrir le badminton : frapper, renvoyer et faire durer l\'échange', comp: ['HME2', 'HME4', 'HSC1', 'HSC3'], l: [
  {t: 'Tenir la raquette et jongler', o: 'Tenir la raquette en prise « poignée de main » et frapper le volant au-dessus de soi sans le faire tomber.', comp: ['HME2', 'HME4', 'GSS2'], e: [
    ['Règles de sécurité', 3, 'Au centre : on ne frappe jamais quand quelqu\'un est à moins d\'une longueur de bras et de raquette ; on ramasse le volant avec la main ; on ne passe pas derrière un joueur qui frappe.', 'explication'],
    ['La prise « poignée de main »', 7, 'Poser la raquette sur la tranche au sol, la prendre comme on serre une main (V entre pouce et index sur l\'arête). Puis jonglages : volant sur le tamis, petits rebonds coup droit, puis revers, puis en alternant.', 'libre']],
   c: [['Jongler en marchant', 10, 'Chacun son volant dans la salle : jongler en marchant, puis en s\'asseyant et en se relevant, puis en changeant de face de raquette à chaque frappe.', 'Je fais 10 jonglages de suite sans faire tomber le volant.', 'Volant plus lent (plume ou ballon de baudruche) pour les élèves en difficulté.', 'libre'],
    ['Échanges à deux sans filet', 12, 'Par deux à 3 m : échanges hauts et lents « en coopération ». On compte le record de l\'équipe ; on recule d\'un pas après 10 frappes réussies.', 'Nous faisons 10 échanges sans faute.', 'Le lanceur lance à la main, l\'autre renvoie, puis on inverse.', 'deux'],
    ['Le record de la classe', 8, 'Par deux par-dessus une corde tendue : chaque binôme essaie de battre son record d\'échanges en 2 minutes. Le prof note les records au tableau.', 'Notre binôme améliore son record entre le 1er et le 3e essai.', '', 'bad:badminton:1c1']],
   r: [['Retour au calme', 5, 'Ranger les volants dans la boîte (bouchon en bas). En cercle : étirements des poignets, avant-bras et épaules ; chacun dit son record.', 'etirements']]},
  {t: 'Frapper haut : le dégagé', o: 'Renvoyer le volant haut et loin au-dessus de la tête, bras armé derrière.', e: [
    ['Jonglages variés', 4, 'Chacun son volant : jongler coup droit, revers, puis alterné ; au signal, frapper une fois très haut et rattraper.', 'libre'],
    ['Lancer de volant', 6, 'Par deux sans raquette : lancer le volant au-dessus de la tête comme une balle de tennis (bras armé derrière, coude haut) le plus loin possible ; le partenaire attrape.', 'deux']],
   c: [['Dégagé sur lancer', 10, 'Par deux : A lance le volant haut au-dessus de B ; B se place sous le volant, de profil, raquette armée derrière la tête, et frappe haut et loin. 10 lancers puis on inverse.', 'Mon volant monte haut et passe au-dessus du partenaire 5 fois sur 10.', 'Frapper vers une zone de cerceaux au fond.', 'deux'],
    ['Échanges en dégagés', 12, 'Par deux de part et d\'autre du filet, au fond du terrain : échanges de dégagés en coopération, le volant doit retomber dans la moitié arrière.', 'Nous faisons 6 dégagés de suite sans faute.', 'Terrain réduit pour les débutants (frapper depuis le milieu).', 'bad:badminton:1c1'],
    ['Jeu du « plus loin »', 8, 'Match en coopération puis en opposition : un point si le volant tombe dans la moitié arrière adverse sans être touché.', 'Je marque au moins 2 points par le fond.', '', 'bad:badminton:1c1']],
   r: [['Retour au calme', 5, 'Étirements de l\'épaule et du triceps ; rappel : « de profil, bras armé, frapper devant et au-dessus de soi ».', 'etirements']]},
  {t: 'Servir', o: 'Réaliser un service par en dessous, volant tenu par les plumes, frappé sous la taille.', comp: ['HME2', 'HSC1'], e: [
    ['Jonglages et dégagés', 5, 'Par deux : 2 minutes de jonglages puis échanges libres par-dessus le filet.', 'deux'],
    ['Lâcher-frapper', 5, 'Seul face au mur ou au filet : lâcher le volant tenu par les plumes devant soi et le frapper par en dessous, raquette qui remonte.', 'mur']],
   c: [['Service vers une cible', 10, 'Des cerceaux posés dans le terrain adverse : chacun sert 10 volants vers les cerceaux, en diagonale. On compte les points (cerceau = 2, terrain = 1).', 'Je sers 6 volants sur 10 dans le terrain adverse.', 'Se rapprocher du filet pour les élèves en difficulté.', 'bad:badminton:zones'],
    ['Service + échange', 10, 'Par deux : A sert, B renvoie en dégagé, puis échanges en coopération. On change de serveur tous les 5 services.', 'L\'échange commence par un service réglementaire.', '', 'bad:badminton:1c1'],
    ['Montante-descendante', 10, 'Matchs de 3 minutes en simple, service en diagonale. Le gagnant monte d\'un terrain, le perdant descend.', 'Je respecte la règle du service (sous la taille, en diagonale).', '', 'tournoi:badminton']],
   r: [['Retour au calme', 5, 'Étirements ; quiz rapide : où se place le serveur ? Où doit tomber le service ?', 'etirements']]},
  {t: 'Les règles et le comptage', o: 'Jouer un match en simple en comptant les points (21 points, service à droite si score pair).', comp: ['HSC1', 'HSC3'], e: [
    ['Échanges libres', 5, 'Par deux par-dessus le filet : échanges en coopération, puis 5 services chacun.', 'bad:badminton:1c1'],
    ['Les règles', 5, 'Au tableau : volant dehors ou dedans (la ligne est bonne), le service, le comptage en 21 points (en classe : 11 points), changement de côté.', 'explication']],
   c: [['Matchs de 11 points', 22, 'Matchs en simple de 11 points sur demi-terrain ; le perdant arbitre le match suivant sur le même terrain et annonce le score après chaque point.', 'Je compte et j\'annonce le score sans me tromper.', 'Terrain plus étroit pour les débutants.', 'bad:badminton:1c1'],
    ['Défi du service', 8, 'Chacun sert 5 volants : le partenaire dit « bon » ou « faute » et explique pourquoi.', 'Je sais dire si un service est bon ou fautif.', '', 'bad:badminton:zones']],
   r: [['Retour au calme', 5, 'Étirements ; on se serre la main ; chacun dit une règle qu\'il a apprise.', 'etirements']]},
  {t: 'Jouer loin de l\'adversaire', o: 'Envoyer le volant là où l\'adversaire n\'est pas (fond, avant, côtés).', comp: ['HME2', 'HME4', 'HSC1'], e: [
    ['Le déplacement', 5, 'Sans volant, depuis le centre du terrain : aller toucher un plot dans chaque coin au signal du prof, revenir au centre à chaque fois.', 'bad:badminton:zones'],
    ['Échanges libres', 5, 'Par deux : échanges en coopération, en essayant de faire courir le partenaire gentiment.', 'bad:badminton:1c1']],
   c: [['Jeu des 4 coins', 12, 'Le terrain adverse a 4 cerceaux dans les coins ; un point bonus si le volant tombe dans un cerceau. Match de 5 minutes, puis on change d\'adversaire.', 'Je fais bouger mon adversaire vers l\'avant et vers l\'arrière.', '', 'bad:badminton:zones'],
    ['Revenir au centre', 10, 'Matchs en simple : après chaque frappe, revenir toucher le cerceau au centre de son terrain. Rappel : « je frappe, je reviens ».', 'Je reviens au centre après chaque frappe.', '', 'bad:badminton:1c1'],
    ['Matchs de 11 points', 8, 'Matchs en simple, arbitrés par un élève.', 'Je gagne des points en jouant loin de l\'adversaire.', '', 'bad:badminton:1c1']],
   r: [['Retour au calme', 5, 'Étirements des jambes et des épaules ; où faut-il envoyer le volant pour marquer ?', 'etirements']]},
  {t: 'Évaluation : échanger et jouer en simple', o: 'Montrer le service, le dégagé et un match en simple avec comptage.', comp: ['HME2', 'HME4', 'HSC1', 'HSC3'], crit: [['Service (10 essais)', 5, '5 : 8-10 réussis · 4 : 6-7 · 3 : 4-5 · 2 : 2-3 · 1 : 1'], ['Échanges (record en 2 minutes)', 5, '5 : 15 échanges de suite ou plus · 4 : 10-14 · 3 : 6-9 · 2 : 3-5 · 1 : 1-2'], ['Match : frappe haute', 4, '4 : frappe le volant au-dessus de la tête, bras tendu · 2 : frappe souvent sous l\'épaule · 0 : rarement'], ['Match : jouer loin de l\'adversaire', 3, '3 : envoie le volant loin de l\'adversaire · 1 : parfois · 0 : joue sur lui'], ['Match : comptage et règles', 3, '3 : compte les points et annonce le score · 1 : erreurs · 0 : ne compte pas']], e: [
    ['Échauffement connu', 6, 'Par deux : jonglages, échanges en coopération, puis 3 services chacun.', 'deux'],
    ['Consignes', 4, 'Explication des épreuves : service sur cible, record d\'échanges, match observé.', 'explication']],
   c: [['Épreuve 1 : service', 6, '10 services vers le terrain adverse en diagonale ; le partenaire compte les réussites.', '6 services sur 10 dans le terrain.', '', 'bad:badminton:zones'],
    ['Épreuve 2 : échanges', 6, 'Par deux : record d\'échanges en 2 minutes, volant au-dessus du filet.', '10 échanges de suite.', '', 'bad:badminton:1c1'],
    ['Épreuve 3 : match observé', 18, 'Matchs de 11 points ; le prof observe la frappe haute, le placement et le respect des règles.', 'Je joue loin de l\'adversaire et je compte les points.', '', 'bad:badminton:1c1']],
   r: [['Bilan', 5, 'Auto-évaluation sur la fiche (service, échanges, règles) puis rangement du matériel.', 'explication']]}
]},
2: {th: 'Construire l\'échange : dégagé, amorti et déplacements', comp: ['HME2', 'HME4', 'HSC1', 'HSC3'], l: [
  {t: 'Le pas de base et le replacement', o: 'Se déplacer en pas chassés et revenir au centre entre deux frappes.', comp: ['HME1', 'HME4', 'GSS1'], e: [
    ['Jonglages et échanges', 5, 'Par deux : jonglages puis échanges en coopération.', 'deux'],
    ['Shadow (sans volant)', 5, 'Depuis le centre du terrain : le prof montre un coin, les élèves s\'y déplacent en pas chassés, font le geste de frappe et reviennent au centre.', 'bad:badminton:zones']],
   c: [['Le chef d\'orchestre', 10, 'Par deux : A, au filet, montre un coin du terrain avec la main ; B s\'y déplace, mime la frappe et revient au centre. 8 déplacements puis on inverse.', 'Je reviens au centre avant le signal suivant.', 'A lance un volant à la main dans chaque coin, B le rattrape.', 'bad:badminton:zones'],
    ['Lancers dans les coins', 10, 'A lance le volant à la main vers les 4 coins du terrain de B ; B se déplace et renvoie avec la raquette. 10 volants puis on inverse.', 'Je renvoie 7 volants sur 10.', '', 'bad:badminton:zones'],
    ['Matchs avec replacement', 10, 'Matchs de 11 points : un point bonus si on gagne l\'échange en ayant touché le cerceau central entre chaque frappe.', 'Je reviens au centre après chaque frappe.', '', 'bad:badminton:1c1']],
   r: [['Retour au calme', 5, 'Étirements des mollets, des cuisses et des épaules ; pourquoi revient-on au centre ?', 'etirements']]},
  {t: 'Le dégagé long', o: 'Frapper un dégagé qui retombe au fond du terrain adverse (dans le dernier mètre).', e: [
    ['Échanges libres', 5, 'Par deux : échanges en coopération, en reculant progressivement.', 'bad:badminton:1c1'],
    ['Le lancer de volant', 5, 'Par deux sans raquette : lancer le volant le plus loin possible, bras armé, coude haut, en faisant un transfert du pied arrière au pied avant.', 'deux']],
   c: [['Dégagé vers la zone du fond', 12, 'Une bande de coupelles marque le dernier mètre du terrain. Par deux : échanges de dégagés ; 1 point chaque fois que le volant tombe dans la bande.', 'Mon dégagé tombe dans le dernier mètre 3 fois sur 10.', 'Bande de 2 m pour les débutants.', 'bad:badminton:zones'],
    ['Le duel du fond', 10, 'Match où l\'on ne joue que des dégagés : celui qui ne peut pas renvoyer derrière la ligne de service perd le point.', 'Je garde mon adversaire au fond du terrain.', '', 'bad:badminton:1c1'],
    ['Matchs', 8, 'Matchs de 11 points en simple, arbitrés par un élève.', 'J\'utilise le dégagé pour me sortir d\'une difficulté.', '', 'bad:badminton:1c1']],
   r: [['Retour au calme', 5, 'Étirements de l\'épaule ; rappel : « je frappe devant moi, le plus haut possible ».', 'etirements']]},
  {t: 'L\'amorti', o: 'Frapper un volant qui retombe juste derrière le filet, avec le même geste qu\'un dégagé.', e: [
    ['Échanges au filet', 5, 'Par deux tout près du filet : petites frappes douces de part et d\'autre, raquette devant soi.', 'bad:badminton:1c1'],
    ['Dégagés', 5, 'Par deux : échanges de dégagés en coopération.', 'bad:badminton:1c1']],
   c: [['Amorti sur lancer', 10, 'A lance haut au-dessus de B ; B prépare comme un dégagé mais ralentit au dernier moment pour faire tomber le volant devant la ligne de service. Cerceaux près du filet comme cibles.', 'Mon amorti tombe avant la ligne de service 5 fois sur 10.', '', 'bad:badminton:zones'],
    ['Dégagé ou amorti ?', 12, 'Échanges : A joue un dégagé, B choisit de répondre par un dégagé ou un amorti ; A doit courir chercher l\'amorti. On change les rôles toutes les 2 minutes.', 'Je cache mon amorti (même préparation que le dégagé).', '', 'bad:badminton:1c1'],
    ['Match à thème', 8, 'Matchs de 11 points : un point gagné sur amorti vaut 2 points.', 'Je gagne au moins un point sur amorti.', '', 'bad:badminton:1c1']],
   r: [['Retour au calme', 5, 'Étirements ; discussion : quand faut-il faire un amorti (adversaire au fond) ?', 'etirements']]},
  {t: 'Le revers', o: 'Renvoyer un volant côté revers, avec la prise du pouce sur le manche.', e: [
    ['Jonglages en revers', 5, 'Chacun son volant : jonglages en revers uniquement, puis alterner coup droit et revers.', 'libre'],
    ['Prise revers', 5, 'Explication et essai : pouce à plat sur le dos du manche. Par deux, échanges lents uniquement côté revers.', 'deux']],
   c: [['Lancers côté revers', 10, 'A lance le volant à la main vers le côté revers de B (à mi-hauteur), B renvoie en revers ; 10 lancers puis on inverse.', 'Je renvoie 6 volants sur 10 par-dessus le filet en revers.', '', 'deux'],
    ['Couloir revers', 10, 'Échanges sur un demi-terrain en diagonale : un joueur envoie tout sur le revers de l\'autre, qui doit renvoyer en revers. On inverse.', 'Je fais 5 revers de suite sans faute.', '', 'bad:badminton:1c1'],
    ['Matchs', 10, 'Matchs de 11 points en simple ; un point gagné en revers vaut 2 points.', 'J\'utilise le revers au lieu de contourner le volant.', '', 'bad:badminton:1c1']],
   r: [['Retour au calme', 5, 'Étirements des avant-bras et des poignets ; rappel de la prise revers.', 'etirements']]},
  {t: 'Tournoi montante-descendante', o: 'Appliquer dégagé, amorti et replacement en match ; arbitrer.', comp: ['HSC1', 'HSC3'], e: [
    ['Échauffement par deux', 6, 'Jonglages, dégagés, amortis et 3 services chacun.', 'bad:badminton:1c1'],
    ['Consignes', 4, 'Explication de la montante-descendante : matchs de 5 minutes, le gagnant monte d\'un terrain, le perdant descend.', 'explication']],
   c: [['Montante-descendante', 30, 'Matchs de 5 minutes en simple, chacun compte ses points et annonce le score. Le terrain 1 est le terrain « des rois ». Les élèves au repos arbitrent.', 'Je joue loin de l\'adversaire et je respecte les règles.', '', 'tournoi:badminton']],
   r: [['Retour au calme', 5, 'Étirements ; chacun dit sur quel terrain il a fini et quel coup lui a fait gagner des points.', 'etirements']]},
  {t: 'Évaluation : construire l\'échange', o: 'Montrer dégagé, amorti, replacement et comptage en match.', comp: ['HME2', 'HME4', 'HSC1', 'HSC3'], crit: [['Dégagés vers le fond (5 essais)', 4, '4 : 4-5 réussis · 3 : 3 · 2 : 2 · 1 : 1'], ['Amortis vers le filet (5 essais)', 4, '4 : 4-5 réussis · 3 : 3 · 2 : 2 · 1 : 1'], ['Match : variété (fond / avant)', 5, '5 : alterne fond et avant pour faire courir l\'adversaire · 3 : parfois · 1 : toujours le même coup'], ['Match : replacement au centre', 4, '4 : revient au centre après chaque frappe · 2 : parfois · 0 : reste où il a frappé'], ['Comptage et fair-play', 3, '3 : compte juste, respecte l\'adversaire · 1 : erreurs · 0 : contestations']], e: [
    ['Échauffement par deux', 6, 'Jonglages, dégagés, amortis et services.', 'bad:badminton:1c1'],
    ['Consignes', 4, 'Explication des épreuves : dégagés au fond, amortis, match observé.', 'explication']],
   c: [['Épreuve 1 : dégagé et amorti', 10, 'Sur lancer du partenaire : 5 dégagés vers la zone du fond et 5 amortis vers la zone du filet.', '3 dégagés et 3 amortis réussis.', '', 'bad:badminton:zones'],
    ['Épreuve 2 : match observé', 20, 'Matchs de 11 points en simple ; grille : variété des coups, replacement, comptage, fair-play.', 'J\'alterne fond et avant pour faire courir l\'adversaire.', '', 'bad:badminton:1c1']],
   r: [['Bilan', 5, 'Auto-évaluation sur la fiche, puis comparaison avec la grille du prof.', 'explication']]}
]},
3: {th: 'Attaquer et varier : smash, jeu au filet, tactique en simple', comp: ['HME2', 'HME4', 'HSC1', 'HSC3'], l: [
  {t: 'Le smash', o: 'Frapper le volant vers le bas, fort, quand il est haut et court.', e: [
    ['Échanges', 5, 'Par deux : dégagés et amortis en coopération.', 'bad:badminton:1c1'],
    ['Geste à vide', 5, 'Shadow : se placer de profil, armer, sauter légèrement et frapper vers le bas, 10 fois ; le partenaire vérifie que la frappe se fait devant la tête.', 'deux']],
   c: [['Smash sur lancer', 10, 'A, au filet, lance haut et court (vers la ligne de service) ; B smashe vers le sol adverse. 10 lancers puis on inverse. Cibles au sol.', 'Mon smash descend et tombe dans le terrain 5 fois sur 10.', 'Se rapprocher du filet pour les élèves en difficulté.', 'bad:badminton:zones'],
    ['Lever - smasher', 10, 'Échanges : A fait des lobs (volants hauts), B smashe ; A essaie de défendre. Rotation toutes les 8 frappes.', 'Je smashe seulement quand le volant est haut et devant moi.', '', 'bad:badminton:1c1'],
    ['Match à thème', 10, 'Matchs de 11 points : un point gagné sur smash vaut 2 points.', 'Je choisis le bon moment pour smasher.', '', 'bad:badminton:1c1']],
   r: [['Retour au calme', 5, 'Étirements de l\'épaule et du dos ; quand smasher, quand ne pas smasher ?', 'etirements']]},
  {t: 'Le jeu au filet', o: 'Jouer des volants courts au filet (contre-amorti) et pousser le volant quand il est haut.', e: [
    ['Échanges au filet', 6, 'Par deux tout près du filet : frappes douces, le volant doit passer juste au-dessus de la bande.', 'bad:badminton:1c1'],
    ['Fente avant', 4, 'Shadow : grand pas en avant (fente) pied droit devant pour un droitier, raquette tendue, retour au centre.', 'files']],
   c: [['Le roi du filet', 12, 'Échanges uniquement dans la zone entre le filet et la ligne de service : un volant qui sort de la zone est perdu.', 'Je fais passer le volant juste au-dessus du filet.', '', 'bad:badminton:zones'],
    ['Amorti - contre-amorti - lob', 10, 'Par deux : A fait un amorti, B répond par un contre-amorti au filet, A relève en lob vers le fond ; puis on rejoue librement.', 'J\'enchaîne les 3 coups dans l\'ordre.', '', 'bad:badminton:1c1'],
    ['Matchs', 8, 'Matchs de 11 points en simple, arbitrés par un élève.', 'Je gagne au moins un point au filet.', '', 'bad:badminton:1c1']],
   r: [['Retour au calme', 5, 'Étirements des cuisses (fentes) et des mollets.', 'etirements']]},
  {t: 'Le service long et le service court', o: 'Choisir entre service long (fond) et service court (juste derrière la ligne).', comp: ['HME2', 'HSC1'], e: [
    ['Échanges', 5, 'Par deux : échanges libres.', 'bad:badminton:1c1'],
    ['Service en revers', 5, 'Explication du service court en revers (volant devant soi, poussée douce). 10 essais chacun.', 'deux']],
   c: [['Services cibles', 10, 'Cibles : une bande près de la ligne de service (court) et une au fond (long). 5 services courts, 5 longs, on compte les réussites.', 'Je réussis 3 services courts et 3 longs.', '', 'bad:badminton:zones'],
    ['Service + 3 coups', 10, 'Le serveur choisit court ou long ; on joue seulement 3 coups puis on recommence. Le receveur doit deviner le service.', 'Mon service gêne la réception.', '', 'bad:badminton:1c1'],
    ['Matchs', 10, 'Matchs de 15 points : chacun doit utiliser les deux services.', 'J\'utilise les deux services au moins 3 fois chacun.', '', 'bad:badminton:1c1']],
   r: [['Retour au calme', 5, 'Étirements ; contre qui faut-il servir court ? long ?', 'etirements']]},
  {t: 'Tactique en simple', o: 'Construire le point : faire reculer l\'adversaire puis jouer court (ou l\'inverse).', comp: ['HME4', 'HSC1'], e: [
    ['Échanges dirigés', 5, 'Par deux : alterner un dégagé et un amorti en coopération.', 'bad:badminton:1c1'],
    ['Shadow 4 coins', 5, 'Déplacements vers les 4 coins avec retour au centre, 30 s × 4.', 'bad:badminton:zones']],
   c: [['Le point construit', 12, 'Match où un point ne compte que s\'il est gagné après au moins un dégagé ET un amorti dans l\'échange.', 'Je fais courir mon adversaire avant de finir le point.', '', 'bad:badminton:1c1'],
    ['Observation', 18, 'Par 3 : 2 jouent un match de 11 points, le 3e note sur une fiche où chaque point est gagné ou perdu (fond, filet, côté, faute directe). Rotation des rôles.', 'J\'utilise la fiche d\'observation pour donner un conseil à un joueur.', '', 'bad:badminton:1c1']],
   r: [['Retour au calme', 5, 'Chacun lit sa fiche : où perd-il le plus de points ? Étirements.', 'etirements']]},
  {t: 'Découvrir le double', o: 'Jouer à deux contre deux : se répartir le terrain (côte à côte).', comp: ['HME4', 'HSC1', 'HSC2'], e: [
    ['Échanges', 5, 'Par deux : échanges libres.', 'bad:badminton:1c1'],
    ['Les règles du double', 5, 'Au tableau : terrain de double (couloirs latéraux), service en double (plus court et plus large), qui sert.', 'explication']],
   c: [['Double côte à côte', 12, '2 contre 2, chaque joueur garde sa moitié gauche ou droite du terrain. Annoncer « j\'ai ! » pour les volants au milieu.', 'Nous ne laissons pas tomber de volant entre nous deux.', '', 'bad:badminton:2c2'],
    ['Matchs de double', 18, 'Matchs de 11 points, on change de partenaire à chaque match.', 'Je communique avec mon partenaire.', '', 'bad:badminton:2c2']],
   r: [['Retour au calme', 5, 'Étirements ; ce qui change entre simple et double.', 'etirements']]},
  {t: 'Évaluation : simple', o: 'Montrer smash, jeu au filet, services et tactique en match.', comp: ['HME2', 'HME4', 'HSC1', 'HSC3'], crit: [['Services courts (5 essais)', 3, '3 : 4-5 dans la cible · 2 : 3 · 1 : 1-2'], ['Services longs (5 essais)', 3, '3 : 4-5 dans la cible · 2 : 3 · 1 : 1-2'], ['Variété des coups (dégagé, amorti, smash, filet)', 5, '5 : au moins 4 coups différents · 4 : 3 · 2 : 2 · 1 : un seul'], ['Construction du point', 5, '5 : déplace l\'adversaire puis conclut (smash, amorti) · 3 : parfois · 1 : renvoie sans projet'], ['Règles et fair-play', 4, '4 : sans faute, respecte l\'adversaire · 2 : quelques erreurs · 0 : contestations']], e: [
    ['Échauffement en autonomie', 6, 'Par deux sans le prof : échanges, dégagés, amortis, services.', 'bad:badminton:1c1'],
    ['Consignes', 4, 'Explication des épreuves et des critères.', 'explication']],
   c: [['Épreuve 1 : services', 6, '5 services courts et 5 longs vers les cibles.', '3 de chaque.', '', 'bad:badminton:zones'],
    ['Épreuve 2 : match observé', 24, 'Matchs de 15 points ; le prof et un camarade observent avec la grille : variété des coups (dégagé, amorti, smash, filet), construction du point, règles.', 'Je construis mes points avec au moins 3 coups différents.', '', 'bad:badminton:1c1']],
   r: [['Bilan', 5, 'Auto-évaluation et comparaison avec la grille.', 'explication']]}
]},
4: {th: 'Le double et les coups rapides : drive, rush, placement', comp: ['HME2', 'HME4', 'HSC1', 'HSC2'], l: [
  {t: 'Le drive', o: 'Frapper un volant à plat, rapide, à hauteur de filet.', e: [
    ['Échanges', 5, 'Par deux : échanges libres puis dégagés.', 'bad:badminton:1c1'],
    ['Échanges rapides', 5, 'Par deux près du filet : petites frappes rapides, raquette haute devant soi.', 'bad:badminton:1c1']],
   c: [['Drive à deux', 12, 'Par deux à mi-terrain : échanges à plat, rapides, juste au-dessus du filet, en coup droit puis en revers.', 'Nous faisons 8 drives de suite sans que le volant monte.', '', 'bad:badminton:1c1'],
    ['Drive ou lob ?', 8, 'A drive, B choisit de répondre en drive ou en lob vers le fond ; A s\'adapte.', 'Je m\'adapte au coup de l\'adversaire.', '', 'bad:badminton:1c1'],
    ['Matchs de double', 10, 'Matchs de double de 11 points : un point gagné en drive vaut 2 points.', 'J\'utilise le drive quand le volant arrive à hauteur du filet.', '', 'bad:badminton:2c2']],
   r: [['Retour au calme', 5, 'Étirements des avant-bras et des épaules.', 'etirements']]},
  {t: 'Le placement en double : avant-arrière', o: 'Passer en position avant-arrière quand l\'équipe attaque.', comp: ['HME4', 'HSC2'], e: [
    ['Drives', 5, 'Par deux : échanges en drive.', 'bad:badminton:1c1'],
    ['Placement à vide', 5, 'Par équipe de 2 sur le terrain : le prof annonce « attaque » (avant-arrière) ou « défense » (côte à côte), les joueurs se placent.', 'bad:badminton:2c2']],
   c: [['Attaque avant-arrière', 12, 'L\'équipe qui reçoit un volant haut passe en avant-arrière : l\'arrière smashe, l\'avant coupe les retours au filet. L\'autre équipe lève et défend côte à côte.', 'Nous changeons de placement selon le volant.', '', 'bad:badminton:2c2'],
    ['Matchs de double', 18, 'Matchs de 15 points, le prof arrête le jeu pour corriger le placement.', 'Notre équipe passe en avant-arrière pour attaquer.', '', 'bad:badminton:2c2']],
   r: [['Retour au calme', 5, 'Au tableau : chaque équipe dessine ses deux placements. Étirements.', 'etirements']]},
  {t: 'Le service et le retour en double', o: 'Servir court en double et attaquer le retour de service (rush).', e: [
    ['Services courts', 5, 'Chacun sert 10 services courts en revers.', 'bad:badminton:zones'],
    ['Pousser au filet', 5, 'Par deux : A sert court, B « rush » (pousse vite le volant vers le bas) s\'il est haut.', 'bad:badminton:1c1']],
   c: [['Service + rush', 12, 'En double : service court, le receveur attaque le volant au plus tôt (rush au filet ou poussée vers le fond). On joue 4 coups puis on recommence.', 'Mon service passe bas ; mon retour attaque le volant.', '', 'bad:badminton:2c2'],
    ['Matchs', 18, 'Matchs de double de 15 points, service obligatoirement court.', 'Nous gagnons des points dès le retour de service.', '', 'bad:badminton:2c2']],
   r: [['Retour au calme', 5, 'Étirements ; quel est le service le plus efficace en double ?', 'etirements']]},
  {t: 'Défendre un smash', o: 'Défendre un smash en position basse, raquette devant, et relancer.', comp: ['HME2', 'HME4', 'GSS2'], e: [
    ['Échanges', 5, 'Par deux : dégagés et smashs en coopération.', 'bad:badminton:1c1'],
    ['Position de défense', 5, 'Par deux : position basse, raquette devant, prise revers ; A lance des volants rapides vers le corps de B, qui renvoie.', 'deux']],
   c: [['Smash - défense', 12, 'A smashe sur volants levés, B défend en bloquant court ou en relevant au fond. Rotation toutes les 8 frappes.', 'Je renvoie 5 smashs sur 10.', '', 'bad:badminton:1c1'],
    ['2 contre 1', 8, 'Deux attaquants smashent, un défenseur seul se défend ; il marque s\'il tient 5 frappes.', 'Je reste bas et calme en défense.', '', 'bad:badminton:2c2'],
    ['Matchs de double', 10, 'Matchs de double de 11 points.', 'Je défends en position basse.', '', 'bad:badminton:2c2']],
   r: [['Retour au calme', 5, 'Étirements des cuisses et des épaules.', 'etirements']]},
  {t: 'Tournoi de double', o: 'Jouer un tournoi de double, arbitrer, encourager son partenaire.', comp: ['HSC1', 'HSC2', 'HSC3'], e: [
    ['Échauffement en double', 6, 'Par équipe : drives, services courts, smashs.', 'bad:badminton:2c2'],
    ['Organisation', 4, 'Tableau du tournoi, rôles d\'arbitre et de marqueur.', 'explication']],
   c: [['Tournoi', 30, 'Poules de 3 ou 4 équipes, matchs de 15 points (10 minutes maximum), puis classement. Les équipes au repos arbitrent.', 'Nous appliquons les placements et nous nous encourageons.', '', 'tournoi:badminton']],
   r: [['Retour au calme', 5, 'Résultats et prix du fair-play ; étirements.', 'etirements']]},
  {t: 'Évaluation : double', o: 'Montrer drive, placement en double, service court et défense.', comp: ['HME2', 'HME4', 'HSC1', 'HSC2'], crit: [['Services courts de double (10 essais)', 5, '5 : 8-10 bas et dans la zone · 4 : 6-7 · 3 : 4-5 · 2 : 2-3 · 1 : 1'], ['Placement avant-arrière / côte à côte', 5, '5 : change de placement à bon escient (attaque / défense) · 3 : parfois · 1 : jamais'], ['Coups rapides (drive, poussette)', 4, '4 : utilise drive et poussette au bon moment · 2 : parfois · 0 : jamais'], ['Défense', 3, '3 : se met en défense côte à côte, renvoie les smashs · 1 : parfois · 0 : jamais'], ['Communication avec le partenaire', 3, '3 : annonce « à moi » / « à toi » · 1 : parfois · 0 : jamais']], e: [
    ['Échauffement en autonomie', 6, 'Par équipe : drives, services, smashs et défense.', 'bad:badminton:2c2'],
    ['Consignes', 4, 'Explication de l\'épreuve et de la grille.', 'explication']],
   c: [['Épreuve 1 : services courts', 6, '10 services courts de double ; le partenaire compte ceux qui passent bas et tombent dans la zone.', '6 sur 10.', '', 'bad:badminton:zones'],
    ['Épreuve 2 : matchs observés', 24, 'Matchs de double de 15 points ; grille : placement (avant-arrière / côte à côte), coups rapides, défense, communication.', 'Notre équipe change de placement à bon escient.', '', 'bad:badminton:2c2']],
   r: [['Bilan', 5, 'Auto-évaluation par équipe et comparaison avec la grille.', 'explication']]}
]},
5: {th: 'Stratégie et préparation physique du joueur de badminton', comp: ['HME2', 'HME4', 'HSC1', 'GSS1'], l: [
  {t: 'Diagnostic : mes points forts et faibles', o: 'Analyser son jeu avec une fiche d\'observation et se fixer un objectif.', comp: ['HSC1', 'GSS4'], e: [
    ['Échauffement en autonomie', 6, 'Par deux : échanges, dégagés, amortis, smashs, services.', 'bad:badminton:1c1'],
    ['La fiche d\'observation', 4, 'Explication : noter pour chaque point gagné ou perdu le coup et la zone.', 'explication']],
   c: [['Matchs observés', 30, 'Par 3 : 2 jouent un match de 15 points, le 3e remplit la fiche. Rotation des rôles. Chacun écrit ensuite son point fort, son point faible et un objectif pour le cycle.', 'Mon objectif est précis (ex. : moins de fautes de service).', '', 'bad:badminton:1c1']],
   r: [['Retour au calme', 5, 'Étirements ; chacun dit son objectif à voix haute.', 'etirements']]},
  {t: 'Préparation physique : les déplacements', o: 'Améliorer vitesse de déplacement et replacement (6 points du terrain).', comp: ['HME1', 'GSS1'], e: [
    ['Activation', 6, 'Corde à sauter 1 minute, pas chassés, montées de genoux, fentes avant.', 'files'],
    ['Shadow 6 points', 4, 'Déplacements vers les 6 points du terrain (2 avant, 2 milieu, 2 fond) avec retour au centre.', 'bad:badminton:zones']],
   c: [['Circuit badminton', 15, '6 ateliers de 40 s (20 s de repos) : shadow 6 points, corde à sauter, fentes, smashs sur lancer, gainage, échanges au filet.', 'Je garde une bonne technique même fatigué.', '', 'ateliers:badminton:6'],
    ['Matchs courts intenses', 15, 'Matchs de 7 points en rotation rapide.', 'Je reviens au centre à chaque frappe.', '', 'bad:badminton:1c1']],
   r: [['Retour au calme', 5, 'Pouls après 1 minute ; étirements des jambes.', 'etirements']]},
  {t: 'Varier les trajectoires et feinter', o: 'Tromper l\'adversaire : même préparation pour dégagé, amorti et smash.', e: [
    ['Échanges', 5, 'Par deux : dégagés et amortis.', 'bad:badminton:1c1'],
    ['Shadow avec feinte', 5, 'Geste à vide : préparation identique, puis frappe différente annoncée par le partenaire au dernier moment.', 'deux']],
   c: [['Devine mon coup', 12, 'A reçoit des volants hauts et choisit dégagé, amorti ou smash ; B annonce le coup dès qu\'il le devine. Point pour A si B se trompe ou est en retard.', 'Ma préparation ne trahit pas mon coup.', '', 'bad:badminton:1c1'],
    ['Matchs', 18, 'Matchs de 15 points : chaque point gagné sur feinte (adversaire pris à contre-pied) vaut 2 points.', 'Je prends l\'adversaire à contre-pied au moins une fois.', '', 'bad:badminton:1c1']],
   r: [['Retour au calme', 5, 'Étirements ; quelle feinte a le mieux marché ?', 'etirements']]},
  {t: 'Jouer selon l\'adversaire', o: 'Adapter sa stratégie aux points faibles de l\'adversaire.', comp: ['HME4', 'HSC1'], e: [
    ['Échauffement en autonomie', 6, 'Échanges et services.', 'bad:badminton:1c1'],
    ['Observation', 4, 'Pendant l\'échauffement de l\'adversaire, chacun repère un point faible (revers, fond, filet).', 'explication']],
   c: [['Matchs avec plan', 30, 'Avant chaque match de 15 points, chacun écrit son plan (ex. « jouer sur son revers »). À la fin, le partenaire-observateur dit si le plan a été appliqué. Trois matchs contre des adversaires différents.', 'J\'applique mon plan pendant le match.', '', 'bad:badminton:1c1']],
   r: [['Retour au calme', 5, 'Étirements ; le plan a-t-il marché ?', 'etirements']]},
  {t: 'Arbitrer officiellement', o: 'Arbitrer un match (annonces officielles, fautes, service) et tenir la feuille.', comp: ['HSC1', 'HSC3'], e: [
    ['Les annonces de l\'arbitre', 5, 'Au tableau : « Love all, play », annonce du score du serveur d\'abord, « faute », « let », fautes de service.', 'explication'],
    ['Échauffement', 5, 'Par deux : échanges et services.', 'bad:badminton:1c1']],
   c: [['Matchs arbitrés', 30, 'Par 3 ou 4 : un match de 21 points arbitré par un élève avec feuille de match, un juge de ligne. Rotation : chacun arbitre au moins une fois.', 'J\'arbitre avec les bonnes annonces et sans hésiter.', '', 'bad:badminton:1c1']],
   r: [['Retour au calme', 5, 'Les arbitres expliquent une décision difficile ; étirements.', 'etirements']]},
  {t: 'Évaluation : stratégie en match', o: 'Montrer un jeu varié et une stratégie adaptée ; atteindre son objectif.', comp: ['HME2', 'HME4', 'HSC1', 'GSS1'], crit: [['Variété des coups', 4, '4 : utilise tous les coups appris · 2 : 2-3 coups · 0 : un seul'], ['Construction du point', 4, '4 : construit puis conclut · 2 : parfois · 0 : renvoie sans projet'], ['Stratégie adaptée à l\'adversaire', 4, '4 : joue sur le point faible repéré de l\'adversaire · 2 : parfois · 0 : jamais'], ['Déplacements et replacement', 4, '4 : pas chassés, retour au centre · 2 : parfois · 0 : statique'], ['Progrès sur son objectif et fair-play', 4, '4 : progrès visible par rapport à la fiche de diagnostic, fair-play · 2 : léger · 0 : aucun']], e: [
    ['Échauffement personnel', 6, 'Chacun réalise son échauffement (déplacements, coups, services) sans le prof.', 'bad:badminton:1c1'],
    ['Objectif', 4, 'Chacun relit son objectif du début du cycle.', 'explication']],
   c: [['Matchs observés', 30, 'Matchs de 21 points (ou 15 minutes) arbitrés par des élèves ; grille du prof : variété, construction, stratégie, déplacements, fair-play. L\'observateur remplit la fiche du diagnostic.', 'J\'ai progressé sur mon objectif (comparaison avec la fiche du début).', '', 'bad:badminton:1c1']],
   r: [['Bilan', 5, 'Chacun compare sa fiche finale à celle du diagnostic et écrit son bilan.', 'explication']]}
]},
6: {th: 'Autonomie : projet de progression et tournoi organisé par la classe', comp: ['HME2', 'HSC1', 'HSC2', 'HSC3', 'GSS1', 'GSS5'], l: [
  {t: 'Projet et tests', o: 'Choisir un projet (simple, double, arbitrage) et faire ses tests de départ.', comp: ['HSC1', 'GSS4', 'GSS5'], e: [
    ['Échauffement personnel', 6, 'Chacun mène son échauffement avec la fiche (mobilisation, déplacements, coups).', 'bad:badminton:1c1'],
    ['Les projets', 4, 'Présentation des projets possibles et du carnet de progression.', 'explication']],
   c: [['Tests', 14, 'Ateliers en autonomie : 10 services courts, 10 longs, 10 dégagés au fond, 10 smashs sur lancer ; le partenaire note.', 'Je connais mes résultats de départ.', '', 'ateliers:badminton:4'],
    ['Matchs et écriture du projet', 16, 'Matchs libres de 11 points, puis chacun écrit son projet : objectif chiffré et moyens.', 'Mon projet a un objectif chiffré.', '', 'bad:badminton:1c1']],
   r: [['Retour au calme', 5, 'Étirements ; chacun annonce son projet.', 'etirements']]},
  {t: 'Séance de projet 1', o: 'Réaliser une séance construite pour atteindre son objectif.', comp: ['HME2', 'GSS1', 'GSS5'], e: [
    ['Échauffement personnel', 6, 'Chacun suit sa fiche d\'échauffement personnelle (mobilisation, déplacements, coups).', 'bad:badminton:1c1'],
    ['Objectif du jour', 4, 'Chacun relit son plan et le dit à son partenaire.', 'explication']],
   c: [['Exercices de projet', 18, 'Par groupes de projet : chacun choisit dans la banque d\'exercices (fiches) ceux qui correspondent à son objectif ; le prof passe dans chaque groupe.', 'Je réalise ma séance sans perdre de temps.', '', 'ateliers:badminton:4'],
    ['Matchs', 12, 'Matchs de 11 points contre un adversaire de même niveau.', 'Je mets en pratique ce que je travaille.', '', 'bad:badminton:1c1']],
   r: [['Carnet', 5, 'Chacun note ce qu\'il a fait, ses réussites et ce qu\'il changera.', 'explication']]},
  {t: 'Séance de projet 2', o: 'Ajuster sa séance selon ses résultats.', comp: ['HME2', 'GSS1', 'GSS5'], e: [
    ['Échauffement personnel', 6, 'Chacun suit sa fiche d\'échauffement personnelle (mobilisation, déplacements, coups).', 'bad:badminton:1c1'],
    ['Ajustement', 4, 'Chacun change une chose dans son plan d\'après ses notes.', 'explication']],
   c: [['Exercices de projet', 16, 'Par groupes de projet, en autonomie ; un élève de chaque groupe joue le rôle de « coach ».', 'J\'ajuste ma séance et j\'explique pourquoi.', '', 'ateliers:badminton:4'],
    ['Matchs à défi', 14, 'Chacun défie un adversaire choisi ; le perdant donne un conseil au gagnant et inversement.', 'Je donne et je reçois un conseil précis.', '', 'bad:badminton:1c1']],
   r: [['Carnet', 5, 'Notes dans le carnet de progression.', 'explication']]},
  {t: 'Organiser le tournoi', o: 'Préparer en groupe un tournoi : tableau, arbitres, horaires.', comp: ['HSC1', 'HSC2', 'HSC3'], e: [
    ['Échauffement', 6, 'Par deux, sans le prof : jonglages, échanges, dégagés, services.', 'bad:badminton:1c1'],
    ['Rôles', 4, 'Répartition des rôles : responsable du tableau, des arbitres, du temps, des résultats.', 'explication']],
   c: [['Tournoi : phase de poules', 30, 'Tournoi organisé par les élèves (simple ou double selon le choix de la classe) : poules de 4, matchs de 15 points, arbitrage par les joueurs au repos.', 'Le tournoi se déroule sans l\'aide du prof.', '', 'tournoi:badminton']],
   r: [['Retour au calme', 5, 'Mise à jour du tableau et étirements.', 'etirements']]},
  {t: 'Tournoi : phase finale', o: 'Jouer et arbitrer les phases finales.', comp: ['HSC1', 'HSC3'], e: [
    ['Échauffement', 6, 'Par deux, sans le prof : jonglages, échanges, dégagés, services.', 'bad:badminton:1c1'],
    ['Tableau final', 4, 'Les responsables présentent le tableau final.', 'explication']],
   c: [['Phases finales', 30, 'Quarts, demi-finales et finales (21 points) ; les éliminés arbitrent et jouent un tableau de consolante.', 'Je joue ou j\'arbitre en respectant les règles et l\'adversaire.', '', 'tournoi:badminton']],
   r: [['Prix', 5, 'Remise des résultats, prix du fair-play et du meilleur arbitre.', 'explication']]},
  {t: 'Évaluation : projet et rôles', o: 'Montrer ses progrès et sa capacité à arbitrer.', comp: ['HME2', 'HSC1', 'GSS1', 'GSS5'], crit: [['Progrès aux tests (mêmes tests qu\'en leçon 1)', 6, '6 : progrès dans tous les tests · 4 : dans la plupart · 2 : dans un test · 0 : aucun'], ['Match : jeu varié', 5, '5 : jeu varié et construit · 3 : moyennement varié · 1 : peu varié'], ['Match : stratégie', 3, '3 : joue sur les points faibles de l\'adversaire · 1 : parfois · 0 : jamais'], ['Arbitrage', 6, '6 : arbitre un match sans erreur, annonce le score, gère le service · 4 : quelques erreurs · 2 : hésitant']], e: [
    ['Échauffement personnel', 6, 'Chacun suit sa fiche d\'échauffement personnelle.', 'bad:badminton:1c1'],
    ['Consignes', 4, 'Ordre de passage, tests et matchs.', 'explication']],
   c: [['Tests finaux', 12, 'Les mêmes tests qu\'à la première leçon ; le partenaire note.', 'Je progresse sur mon objectif.', '', 'ateliers:badminton:4'],
    ['Match et arbitrage observés', 18, 'Chacun joue un match observé et en arbitre un autre.', 'Je joue un jeu varié et j\'arbitre sans erreur.', '', 'bad:badminton:1c1']],
   r: [['Bilan écrit', 5, 'Bilan dans le carnet : progrès, ce qui a marché, où continuer le badminton (club, loisir).', 'explication']]}
]}
}});
