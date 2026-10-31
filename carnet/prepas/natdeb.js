/* Natation · débutants (petite profondeur) en jeux : pour le groupe qui n'est pas encore à l'aise dans l'eau, en parallèle du groupe « nageurs » (natation.js).
   3 cycles de 6 leçons (5 leçons + 1 évaluation), à suivre dans l'ordre quelle que soit l'année : on commence au cycle 1 et on avance au rythme du groupe.
   Format « jeux » (voir carnet/prepa-moteur.js). Toujours un bloc de 2 h (bus et vestiaires) : 40 min dans l'eau.
   Idées mêlées et réécrites : classeur EPS, jeux de familiarisation (sorcière aquatique, loto sous-marin, petit train, méduse, traîneau, perche),
   progression de l'aisance aquatique (entrer, s'immerger, flotter, se déplacer, s'équilibrer, sauter) jusqu'au test de passage vers le groupe nageurs.
   Sécurité : on a pied, un adulte au bord de ce groupe, comptage à l'entrée et à la sortie, frites et planches à portée de main. */
(() => {
const A = {th: 'Natation débutants : de la petite profondeur à 25 m et au grand bain', comp: ['HME1', 'HME4', 'GSS1', 'GSS2'], cy: ['Se familiariser : entrer, mettre la tête sous l\'eau, souffler, flotter', 'Se déplacer : flèche, battements, crawl et dos simplifiés, 12,5 m', 'Devenir autonome : sauter, aller en grande profondeur, nager 25 m'], l: [
  {t: 'Entrer dans l\'eau et se déplacer', o: 'Entrer seul dans l\'eau en petite profondeur et se déplacer sans se tenir au bord.',
   e: [['Les règles du groupe', 4, 'Au bord : on reste dans la zone de la ligne d\'eau, on entre par l\'échelle (dos à l\'eau) ou assis au bord, on sort au sifflet long. Puis on entre, on se mouille la nuque et le visage.', '', '', 'explication'],
    ['train', 4]],
   c: [['jardinier', 8, '', 'Je reste dans l\'eau quand on m\'arrose.', 'On s\'arrose la tête.'],
    ['sorciere', 10, 'Statue délivrée en lui touchant la main.', 'Je me déplace sans me tenir au bord.', 'On délivre en passant sous les bras.'],
    ['tresor', 10, 'Objets posés sur une marche ou au fond, là où c\'est le moins profond.', 'Je ramène 3 objets.', 'Objets un peu plus loin.']],
   r: [['etoile', 4, 'Avec une frite sous la nuque et un camarade à côté.']]},
  {t: 'Mettre la tête sous l\'eau et souffler', o: 'Mettre toute la tête sous l\'eau en soufflant par la bouche et le nez.',
   e: [['feux', 4],
    ['poissons', 4]],
   c: [['bulles', 10, '', 'Je fais des bulles 3 s, toute la tête dans l\'eau.', '5 s.'],
    ['cerceaux', 10, 'D\'abord le cerceau à moitié dans l\'eau, puis presque tout dedans.', 'Je passe sous le tunnel.', 'Sous 2 tunnels de suite.'],
    ['La sorcière sous-marine', 8]],
   r: [['bilan', 4]]},
  {t: 'Ouvrir les yeux sous l\'eau et ramasser des objets', o: 'Garder les yeux ouverts sous l\'eau et aller chercher un objet au fond en petite profondeur.',
   e: [['statues', 4],
    ['miroir', 4, 'Avec des gestes sous l\'eau.']],
   c: [['loto', 10, '', 'Je donne 3 bonnes réponses.', 'Deux mains, jusqu\'à 10.'],
    ['kim', 12, 'Les objets sont un peu plus loin et plus profond.', 'Mon équipe ramène tous les objets.', 'On ramène deux objets d\'un coup.'],
    ['dauphin', 6]],
   r: [['chanson', 4]]},
  {t: 'Flotter sur le ventre', o: 'Flotter à plat ventre, visage dans l\'eau, d\'abord avec une aide puis sans aide, et se remettre debout seul.',
   e: [['balles', 4],
    ['requins', 4]],
   c: [['Se remettre debout', 6, 'Allongé sur le ventre avec une frite : on ramène les genoux sous le ventre, on pousse les mains vers le fond, on relève la tête et on pose les pieds. À répéter jusqu\'à ce que ce soit facile.', 'Je me remets debout seul.', '', 'piscine:sp:flotte', 'p'],
    ['meduse', 12, 'Puis la méduse se déplie en étoile de mer, visage dans l\'eau.', 'Je flotte 5 s en étoile sur le ventre.', 'Sans la main du partenaire.'],
    ['traineau', 10, '', 'Je garde le visage dans l\'eau pendant tout le trajet.', 'B lâche la planche.']],
   r: [['glisse', 4]]},
  {t: 'Flotter sur le dos et se redresser', o: 'Flotter sur le dos, oreilles dans l\'eau, et se remettre debout sans paniquer.',
   e: [['nenuphars', 4],
    ['chatbulles', 4]],
   c: [['La sieste sur l\'eau', 10, 'Par deux : B soutient la nuque de A (une main), A est allongé sur le dos, oreilles dans l\'eau, ventre en haut. B enlève sa main petit à petit. Pour se relever : on regarde son ventre, on ramène les genoux, on pose les pieds.', 'Je flotte 5 s sur le dos sans la main.', 'Sans frite.', 'piscine:sp:flotte', 'p'],
    ['bateau', 10, '', 'Je traverse sur le dos.', 'Planche tenue au-dessus des genoux.'],
    ['radeau', 8, 'Radeau sur le ventre, puis on se retourne tous sur le dos sans se lâcher.', 'Je me retourne du ventre au dos.']],
   r: [['bouteille', 4]]},
  {t: 'Évaluation : à l\'aise dans l\'eau', o: 'Montrer qu\'on entre seul, qu\'on met la tête sous l\'eau, qu\'on ramasse un objet et qu\'on flotte sur le ventre et sur le dos.', comp: ['HME1', 'GSS1', 'GSS2', 'GSS4'],
   crit: [['Entrer seul et se déplacer', 3, '3 : entre seul par l\'échelle ou assis au bord et traverse la zone sans se tenir · 2 : se tient au bord ou à un camarade par moments · 1 : a besoin d\'aide pour entrer'], ['Tête sous l\'eau en soufflant (5 s)', 4, '4 : toute la tête 5 s en soufflant par la bouche et le nez · 3 : 3 s · 2 : jusqu\'aux yeux seulement · 0 : refuse'], ['Objet au fond, yeux ouverts', 4, '4 : ramasse l\'objet du premier coup, yeux ouverts · 2 : en plusieurs essais ou yeux fermés · 0 : n\'y arrive pas'], ['Flotter sur le ventre 5 s et se relever', 5, '5 : étoile de mer 5 s sans aide, visage dans l\'eau, se relève seul · 3 : avec une planche · 1 : avec frite ou aide du prof'], ['Flotter sur le dos 5 s et se relever', 4, '4 : 5 s sans aide, oreilles dans l\'eau, se relève seul · 2 : avec une frite · 1 : avec aide du prof']],
   e: [['tunnel', 6]],
   c: [['Épreuve 1 : entrer, souffler, ramasser', 14, 'Chacun à son tour devant le prof : entrée, traversée, 5 s de bulles, un objet au fond. Les autres jouent au loto par deux.', '', '', 'piscine:sp:flotte', 'p'],
    ['Épreuve 2 : flotter et se relever', 14, 'Étoile ventrale 5 s puis étoile dorsale 5 s, et se remettre debout seul à chaque fois.', '', '', 'piscine:sp:flotte', 'p']],
   r: [['berceuse', 6, 'Puis, au bord, chacun apprend ce qu\'il a réussi.']]},
  {t: 'La flèche : glisser sur le ventre', o: 'Pousser au mur et glisser bras tendus, visage dans l\'eau, le plus loin possible.',
   e: [['sorciere', 4],
    ['poissons', 4]],
   c: [['traineau', 8, 'B lâche la planche après 2 pas.', 'Je glisse seul après le lâcher.'],
    ['fleche', 12, '', 'Ma flèche dépasse 2 m.', 'Flèche sans planche, puis vers un cerceau lesté au fond.'],
    ['tresor', 8, 'On va chercher le trésor en flèche (on pousse au fond et on glisse).', 'Je ramène un objet en glissant.']],
   r: [['bilan', 4]]},
  {t: 'Battements avec planche', o: 'Avancer avec des battements de jambes tendues en soufflant dans l\'eau.',
   e: [['train', 4],
    ['crabe', 4]],
   c: [['Le moteur au bord', 6, 'Mains au bord, corps allongé : jambes tendues, pieds souples comme des palmes, petits battements qui font des bulles, pas des éclaboussures.', 'Mon moteur fait des bulles.', '', 'piscine:sp:aller', 'e3'],
    ['moteur', 12, '', 'Je traverse sans m\'arrêter.', 'Visage dans l\'eau, on lève la tête pour respirer.'],
    ['chevaux', 10, '', 'Mon cheval ne touche pas le fond.', 'Course sur le dos.']],
   r: [['etoile', 4]]},
  {t: 'Les bras du crawl et la respiration', o: 'Faire avancer son corps avec des bras alternés et respirer en tournant la tête.',
   e: [['bulles', 4, 'En tournant la tête sur le côté pour inspirer.'],
    ['miroir', 4]],
   c: [['rameur', 10, '', 'Je traverse en moins de coups de rame.', 'Sans frite, avec pull-buoy.'],
    ['La respiration du moulin', 8, 'Debout, buste penché, visage dans l\'eau : bras du crawl en marchant. Quand la main droite passe la cuisse, on tourne la tête à droite pour inspirer, oreille posée sur le bras.', 'Je respire sur le côté sans lever la tête.', '', 'piscine:sp:aller', 'e3'],
    ['ballon', 10, '', 'Mon équipe marque.', 'Allongé avec une frite.']],
   r: [['chanson', 4]]},
  {t: 'Le dos : battements et flèche dorsale', o: 'Glisser et avancer sur le dos avec des battements, oreilles dans l\'eau.',
   e: [['statues', 4, 'Positions : étoile sur le dos, flèche sur le dos, boule.'],
    ['jardinier', 4]],
   c: [['La flèche sur le dos', 8, 'Accroché au bord, pieds au mur, on se couche sur le dos et on pousse, bras le long du corps, oreilles dans l\'eau. Le partenaire marque l\'arrivée avec une frite.', 'Je glisse sur le dos 2 m.', 'Bras tendus derrière la tête.', 'piscine:sp:aller', 'p'],
    ['bateau', 10, '', 'Je traverse sur le dos sans m\'arrêter.', 'Sans planche, mains le long du corps.'],
    ['radeau', 10, 'Le radeau sur le dos, puis le radeau avance en battements.', 'Mon équipe finit le relais.']],
   r: [['berceuse', 4]]},
  {t: 'Nager 12,5 m sans aide', o: 'Enchaîner flèche, battements et bras pour nager 12,5 m sans aide, sur le ventre et sur le dos.',
   e: [['requins', 4, 'Les sardines traversent en flèche ou en battements.'],
    ['feux', 4, 'Rouge = on se met en flèche, bleu = étoile sur le dos.']],
   c: [['L\'échelle des aides', 10, 'Chacun traverse avec l\'aide qu\'il choisit : frite, planche, pull-buoy, rien. À chaque traversée réussie, on enlève une aide. Le partenaire coche.', 'J\'ai enlevé une aide.', '', 'piscine:sp:aller', 'p'],
    ['relais', 10, 'Nages : flèche + battements, crawl, dos.', 'Je traverse sans aide dans le relais.'],
    ['parcours', 8, 'Chacun fait la boucle avec l\'aide qu\'il a choisie (frite, planche, rien).', 'Je ramène un objet en nageant.']],
   r: [['glisse', 4]]},
  {t: 'Évaluation : se déplacer dans l\'eau', o: 'Montrer flèche, battements, nage ventrale et dos sans aide.', comp: ['HME1', 'GSS1', 'GSS2', 'GSS4'],
   crit: [['Flèche ventrale', 4, '4 : pousse au mur et glisse 3 m bras tendus, visage dans l\'eau · 2 : 1,5 m ou tête levée · 1 : ne glisse pas'], ['Battements avec planche 15 m', 4, '4 : 15 m jambes tendues sans arrêt, souffle dans l\'eau · 2 : 10 m ou genoux pliés · 1 : moins de 5 m'], ['12,5 m sur le ventre sans aide', 6, '6 : 12,5 m sans aide ni appui, respiration sur le côté · 4 : 12,5 m en levant la tête · 2 : 8 m · 1 : 5 m'], ['10 m sur le dos', 4, '4 : 10 m de battements sur le dos sans aide · 2 : avec une planche · 1 : avec frite ou aide'], ['Se remettre debout seul', 2, '2 : se redresse seul depuis le ventre et depuis le dos · 1 : depuis une seule position · 0 : a besoin d\'aide']],
   e: [['balles', 6]],
   c: [['Épreuve 1 : flèche et battements', 12, 'Flèche mesurée par le partenaire, puis 15 m de battements avec planche.', '', '', 'piscine:sp:aller', 'p'],
    ['Épreuve 2 : 12,5 m ventre et 10 m dos', 16, 'Devant le prof, sans aide ; on se remet debout seul à l\'arrivée.', '', '', 'piscine:sp:aller', 'p']],
   r: [['bouteille', 6]]},
  {t: 'Sauter dans l\'eau', o: 'Sauter dans l\'eau depuis le bord, remonter et rejoindre le bord seul.',
   e: [['train', 4],
    ['tunnel', 4]],
   c: [['L\'escalier du saut', 12, 'En petite profondeur : assis au bord, on se laisse tomber ; accroupi, on saute ; debout, on saute loin ; debout, on saute dans un cerceau flottant. On remonte, on se met sur le ventre et on revient au bord.', 'Je saute debout et je reviens seul.', 'Saut + flèche jusqu\'au bord.', 'piscine:sp:flotte', 'e3'],
    ['Le parachute', 8, 'Saut en étoile, en boule, en crayon : on remonte et on fait l\'étoile de mer 3 s avant de rejoindre le bord.', 'Je fais l\'étoile après mon saut.', '', 'piscine:sp:flotte', 'e3'],
    ['ballon', 8, '', 'Mon équipe marque.']],
   r: [['bouteille', 4]]},
  {t: 'Découvrir la grande profondeur', o: 'Se déplacer le long du bord en grande profondeur et lâcher le bord quelques secondes.', comp: ['HME1', 'HME4', 'GSS2'], sal: {c: {warn: 'Grande profondeur : un adulte juste au-dessus du groupe, perche en main ; un élève à la fois lâche le bord.'}},
   e: [['bulles', 4],
    ['nenuphars', 4, 'Les nénuphars sont près de la ligne d\'eau.']],
   c: [['crabe', 10, 'Maintenant en grande profondeur, le long du bord ; un camarade marche au bord à côté de chacun.', 'Je lâche le bord 3 s.', 'Je lâche le bord et je fais un tour sur moi-même.'],
    ['L\'ascenseur du bord', 8, 'Mains au bord en grande profondeur : on souffle, on descend le long du mur en se tenant, on remonte. Puis on lâche une main en remontant.', 'Je descends et je remonte seul.', '', 'piscine:sp:flotte', 'p'],
    ['sentinelle', 10, 'Avec une frite, près du bord.', 'Je reste 10 s sur place avec la frite.', 'Je lâche la frite 3 s.']],
   r: [['etoile', 4]]},
  {t: 'Nager 25 m en crawl', o: 'Nager 25 m sans aide en respirant sur le côté.',
   e: [['sorciere', 4],
    ['chatbulles', 4, 'Perché = toute la tête sous l\'eau.']],
   c: [['La respiration du moulin', 8, '', 'Je respire sur le côté.', '', 'piscine:sp:aller', 'e3'],
    ['Les îles', 12, 'Des frites ou planches posées sur l\'eau tous les 5 m : on nage d\'île en île (on peut s\'y reposer 3 s). À chaque passage, on enlève une île.', 'J\'arrive au bout avec une île de moins.', '25 m sans île.', 'piscine:sp:aller', 'e3'],
    ['relais', 8, 'En crawl.', 'Je nage ma longueur sans aide.']],
   r: [['chanson', 4]]},
  {t: 'Sauter en grande profondeur et revenir au bord', o: 'Sauter en grande profondeur, remonter, s\'orienter et nager jusqu\'au bord.', comp: ['HME1', 'HME4', 'GSS2'], sal: {c: {warn: 'Grande profondeur : un seul élève saute à la fois, la perche tenue par l\'adulte à côté ; les autres attendent assis au bord.'}},
   e: [['poissons', 4],
    ['statues', 4, 'Statue en étoile sur le dos, puis en boule.']],
   c: [['perche', 14, '', 'Je saute et je reviens au bord sans prendre la perche.', 'Je saute à 2 m du bord.'],
    ['dauphin', 8, 'En grande profondeur, près du bord : on saute par-dessus la frite tenue par le prof, on remonte et on revient au bord.', 'Je reste 5 s sur place.'],
    ['balles', 6, 'Retour en petite profondeur pour finir en jeu.', 'Je ramène un objet.']],
   r: [['berceuse', 4]]},
  {t: 'Enchaîner : saut, 25 m, surplace', o: 'Enchaîner les gestes de l\'évaluation finale et repérer ce qu\'il reste à travailler.',
   e: [['feux', 4],
    ['miroir', 4, 'Avec des gestes sous l\'eau.']],
   c: [['La répétition générale', 14, 'Chacun fait le test complet devant son binôme : saut en grande profondeur, retour au bord, 25 m, surplace 15 s, étoile sur le dos 10 s. Le binôme coche ce qui est réussi.', 'Je connais ce qu\'il me reste à travailler.', '', 'piscine:sp:aller', 'p'],
    ['L\'atelier du point faible', 9, 'Chacun va à l\'atelier de son point faible : perche, îles, sentinelle, étoile.', 'Je progresse sur mon point faible.', '', 'piscine:sp:flotte', 'g4'],
    ['parcours', 5, 'Le parcours avec saut, 10 m de crawl et étoile sur le dos.', 'Mon équipe marque.']],
   r: [['glisse', 4]]},
  {t: 'Évaluation : test de passage vers le groupe nageurs', o: 'Montrer saut en grande profondeur, 25 m, surplace et flottaison sur le dos.', comp: ['HME1', 'GSS1', 'GSS2', 'GSS4'], sal: {c: {warn: 'Grande profondeur : un seul élève à la fois, perche tenue par l\'adulte.'}},
   crit: [['Saut en grande profondeur et retour au bord', 5, '5 : saute debout, remonte, s\'oriente et nage 5 m jusqu\'au bord · 3 : rejoint le bord tout proche (1 m) · 1 : saute à côté de la perche ou avec aide'], ['25 m sans arrêt', 7, '7 : 25 m sans arrêt ni appui, respiration sur le côté · 5 : 25 m en levant la tête · 3 : 25 m avec un arrêt à la ligne · 1 : 12,5 m'], ['Surplace 15 s', 4, '4 : 15 s en grande profondeur sans s\'accrocher · 2 : 5 à 10 s · 0 : moins de 5 s'], ['Flotter sur le dos 10 s', 4, '4 : 10 s sans aide, oreilles dans l\'eau · 2 : 5 s · 1 : avec frite']],
   e: [['requins', 6, 'Les sardines traversent en nageant.']],
   c: [['Épreuve 1 : saut et retour', 8, 'Saut debout en grande profondeur, retour au bord seul (perche à côté).', '', '', 'piscine:sp:flotte', 'p'],
    ['Épreuve 2 : 25 m', 12, 'Sans toucher le fond ni la ligne d\'eau.', '', '', 'piscine:sp:aller', 'p'],
    ['Épreuve 3 : surplace et dos', 8, '15 s de surplace en grande profondeur près du bord, puis 10 s d\'étoile de mer sur le dos.', '', '', 'piscine:sp:flotte', 'p']],
   r: [['bilan', 6, 'Chacun apprend s\'il passe dans le groupe nageurs ; ceux qui n\'ont pas tout réussi savent ce qu\'il leur reste.']]}
]};
PREPA_JEUX({id: 'natdeb',
sport: 'Natation débutants',
pool: true,
mat: [['frite', 1], ['planche', 1], ['objet lesté (anneau, brique)', 12], ['cerceau lesté', 4], ['ballon léger', 2], ['tapis flottant'], ['perche'], ['sifflet']],
lieu: {n: 'La piscine (petite profondeur)', d: 'zone où l\'on a pied, fermée par une ligne d\'eau, 40 min dans l\'eau', pre: 'À prendre à la piscine (ou à emporter) : ', note: 'zone de petite profondeur fermée par une ligne d\'eau ; un adulte au bord de ce groupe, côté élèves.', warn: 'Comptage à l\'entrée et à la sortie de l\'eau ; une frite à portée de main de chacun ; en grande profondeur, seulement le long du bord ou avec la perche.'},
J: {
  train: {n: 'Les petits trains', k: 'coop', s: 'piscine:sp:flotte', f: 'g4', d: 'Par trains de 4, mains sur les épaules de celui de devant : tous les trains roulent en même temps dans la zone. Le train marche, court, saute, recule, fait « tchou-tchou » en soufflant dans l\'eau. À chaque gare (coup de sifflet), la locomotive passe en queue de son train.'},
  sorciere: {n: 'La sorcière aquatique', k: 'opp', s: 'piscine:sp:flotte', d: 'Dans la petite profondeur, {n/8 sorcière} (frite à la main) touchent les autres, qui deviennent statues, jambes écartées. Un camarade délivre une statue en passant entre ses jambes… ou, au début, en lui touchant la main sous l\'eau.'},
  jardinier: {n: 'Les jardiniers', k: 'coop', s: 'piscine:sp:flotte', f: 'p', d: 'Par deux, face à face : on s\'arrose avec les mains (d\'abord les bras, puis les épaules, puis la tête). Celui qui est arrosé garde les yeux ouverts et sourit. On change au signal ; à la fin, on s\'arrose tous ensemble.'},
  bulles: {n: 'La machine à bulles', k: 'coop', s: 'piscine:sp:flotte', f: 'p', d: 'Par deux, mains dans les mains : on souffle à la surface (les bulles font du bruit), puis bouche dans l\'eau, puis nez et bouche, puis toute la tête. Le partenaire compte les secondes de bulles. Qui fait la plus longue machine ?'},
  crabe: {n: 'Les crabes du bord', k: 'coop', s: 'piscine:sp:aller', f: 'e3', d: 'Mains sur le bord, on se déplace de côté comme un crabe, sans les pieds au fond si on peut. Puis on lâche une main pour faire coucou, puis les deux mains une seconde. On revient par le même chemin.'},
  miroir: {n: 'Le miroir de l\'eau', k: 'coop', s: 'piscine:sp:flotte', f: 'p', d: 'Par deux, A fait un geste dans l\'eau (sauter, tourner, s\'asseoir au fond, s\'allonger avec la frite…), B le refait en miroir. On change de chef toutes les minutes.'},
  tresor: {n: 'La chasse au trésor', k: 'opp', s: 'piscine:sp:flotte', f: 'e3', d: 'Des anneaux et objets de couleur au fond de la petite profondeur. Par équipes : au signal, chacun ramène un objet à la fois dans le cerceau de son équipe. Couleurs = points (1, 2, 3 : les plus loin valent plus).'},
  loto: {n: 'Le loto sous-marin', k: 'coop', s: 'piscine:sp:flotte', f: 'p', d: 'Par deux : B montre un nombre avec ses doigts sous l\'eau ; A met la tête sous l\'eau, les yeux ouverts, et annonce le nombre en remontant. 1 point par bonne réponse. Puis des formes (rond, croix) ou des couleurs d\'objets.'},
  tunnel: {n: 'Les tunnels qui avancent', k: 'coop', s: 'piscine:sp:flotte', f: 'g4', d: 'Par 4 : trois se mettent côte à côte, jambes écartées (le tunnel) ; le 4e passe dessous en se tirant aux jambes, puis se place au bout du tunnel. Le suivant passe à son tour : le tunnel avance. Tous les tunnels en même temps : lequel touche le premier la ligne d\'eau ? Au début, on passe sous des frites.'},
  meduse: {n: 'La méduse', k: 'coop', s: 'piscine:sp:flotte', f: 'p', d: 'On prend de l\'air, on attrape ses genoux, on se laisse flotter en boule, le dos à la surface : on est une méduse. Le partenaire compte et pose une main sur le dos pour rassurer. Puis on se déplie en étoile et on se remet debout.'},
  traineau: {n: 'Le traîneau', k: 'coop', s: 'piscine:sp:aller', f: 'p', d: 'Par deux : A s\'allonge, bras tendus sur une planche (ou une frite) ; B le tire en marchant à reculons. Visage dans l\'eau le plus longtemps possible, on souffle. Puis B lâche la planche : A glisse tout seul. On change.'},
  fleche: {n: 'La flèche', k: 'opp', s: 'piscine:sp:aller', f: 'p', d: 'Dos au mur, un pied contre le mur : on se penche, bras tendus, tête entre les bras, et on pousse. On glisse visage dans l\'eau sans bouger. Le partenaire pose une frite où l\'on s\'arrête : à chaque essai, on essaie de la dépasser.'},
  moteur: {n: 'La course des moteurs', k: 'opp', s: 'piscine:sp:relais', f: 'e3', d: 'Relais : bras tendus sur la planche, on avance avec des battements de jambes tendues (le moteur fait des bulles derrière, pas des éclaboussures). Le suivant part quand on lui tape dans la main.'},
  chevaux: {n: 'La course des chevaux', k: 'opp', s: 'piscine:sp:relais', f: 'e3', d: 'Une frite entre les jambes comme un cheval : on avance en pédalant et en ramant avec les bras, sans toucher le fond. Relais par équipes, puis course des chevaux sur le dos.'},
  rameur: {n: 'Les rameurs', k: 'coop', s: 'piscine:sp:aller', f: 'e3', d: 'Une frite sous les aisselles (ou un pull-buoy entre les jambes) : on avance seulement avec les bras, comme des rames, la main entre devant et pousse l\'eau jusqu\'à la cuisse. Le partenaire compte combien de « coups de rame » pour traverser.'},
  bateau: {n: 'Le bateau sur le dos', k: 'coop', s: 'piscine:sp:aller', f: 'e3', d: 'Sur le dos, une planche serrée sur le ventre (ou une frite sous la nuque), oreilles dans l\'eau, regard au plafond : on avance avec des battements. Le bateau ne doit pas couler : bassin en avant, ventre en haut.'},
  ballon: {n: 'Le ballon voyageur', k: 'opp', s: 'piscine:sp:relais', f: 'e2', d: 'Deux équipes, un ballon léger : on le pousse vers le bord adverse avec la tête, les mains sous l\'eau ou en soufflant dessus. Pas le droit de le lancer. On joue en marchant, puis allongé avec une frite.'},
  perche: {n: 'Le saut de la perche', k: 'coop', s: 'piscine:sp:flotte', f: 'e3', d: 'Au bord, le prof tend la perche à 1 m. On saute debout, on remonte, on attrape la perche puis le bord. Ensuite, la perche reste à côté sans qu\'on la prenne : on revient seul au bord. On ne passe à l\'étape suivante que quand on est prêt.'},
  sentinelle: {n: 'La sentinelle', k: 'coop', s: 'piscine:sp:flotte', f: 'p', d: 'Là où l\'on n\'a plus pied (ou en pliant les genoux pour ne pas toucher) : on reste sur place, tête hors de l\'eau, avec une frite, puis la frite lâchée et rattrapée, puis sans frite. Le partenaire compte les secondes.'},
  relais: {n: 'Le relais des débutants', k: 'opp', s: 'piscine:sp:relais', f: 'e3', d: 'Équipes équilibrées ; chacun traverse dans la nage tirée au sort (marche, traîneau, moteur, flèche + battements, dos). Le suivant part quand on touche sa main. Celui qui fait sans aide rapporte 1 point bonus à son équipe.'},
  etoile: {n: 'L\'étoile de mer', k: 'coop', s: 'piscine:sp:flotte', d: 'Sur le dos, bras et jambes écartés, oreilles dans l\'eau, frite sous la nuque si besoin : on flotte 20 s en regardant le plafond. Puis la classe se tient la main pour faire une grande étoile. Sortie et comptage.'},
  bilan: {n: 'Le mot du bord', k: 'fp', s: 'explication', d: 'On marche tranquillement jusqu\'à l\'échelle. Au bord : chacun montre avec le pouce comment il s\'est senti dans l\'eau et dit une chose qu\'il a osé faire aujourd\'hui. Sortie et comptage.'},
  feux: {n: 'Les feux de la piscine', k: 'coop', s: 'piscine:sp:flotte', d: 'Tout le monde se déplace dans la zone. Le prof montre une couleur : vert = on marche vite, orange = on saute à pieds joints, rouge = on s\'arrête et on fait des bulles, bleu = on s\'assoit dans l\'eau jusqu\'au menton. Le prof accélère, puis un élève devient le feu.'},
  poissons: {n: 'Les poissons et le filet', k: 'opp', s: 'piscine:sp:flotte', d: 'Deux pêcheurs se tiennent par la main : c\'est le filet. Ils attrapent les poissons en les touchant ; chaque poisson attrapé rejoint le filet, qui s\'allonge. Le filet ne doit jamais se casser. Un poisson peut s\'échapper en passant sous les bras du filet. Les 3 derniers poissons sont les pêcheurs de la manche suivante.'},
  statues: {n: 'Les statues de l\'eau', k: 'coop', s: 'piscine:sp:flotte', d: 'Musique : on marche, on court, on saute dans la zone. Musique coupée : on se fige dans la position annoncée pendant 5 s : statue sur un pied, assis dans l\'eau jusqu\'au menton, menton dans l\'eau, nez dans l\'eau, étoile avec une frite. Chaque fois, un peu plus mouillé.'},
  balles: {n: 'La guerre des balles', k: 'opp', s: 'piscine:sp:flotte', f: 'e2', d: 'Deux équipes, une de chaque côté d\'une frite posée sur l\'eau au milieu de la zone, plein de balles légères dans l\'eau. Pendant 1 min, on envoie les balles dans l\'autre camp à une main, en marchant et en sautant. Au sifflet, on compte : le camp avec le moins de balles gagne la manche.'},
  requins: {n: 'Les requins et les sardines', k: 'opp', s: 'piscine:sp:flotte', d: 'Les sardines sont le long du bord ; {n/7 requin} au milieu de la zone. Au signal « sardines ! », elles traversent jusqu\'à la ligne d\'eau en marchant, en courant ou en sautant. Une sardine touchée devient requin. Une sardine qui a la tête sous l\'eau ne peut pas être touchée.'},
  nenuphars: {n: 'Les nénuphars', k: 'coop', s: 'piscine:sp:flotte', d: 'Des cerceaux flottent dans la zone : ce sont des nénuphars. On se promène ; au sifflet, chacun doit poser les deux mains dans un nénuphar. Le prof en retire un à chaque tour, mais personne n\'est éliminé : il faut se serrer à plusieurs. Dernier tour : on passe la tête dans le nénuphar, puis on passe tout le corps dessous.'},
  chatbulles: {n: 'Le chat bulle', k: 'opp', s: 'piscine:sp:flotte', d: '{n/7 chat} avec une frite. On est « perché » (intouchable) quand on a le visage dans l\'eau en faisant des bulles, mais seulement 3 secondes. Touché = on prend la frite et on devient chat à son tour. Puis perché = la tête entière sous l\'eau.'},
  cerceaux: {n: 'Les cerceaux magiques', k: 'coop', s: 'piscine:sp:flotte', f: 'p', d: 'Par deux : B tient un cerceau debout, à moitié dans l\'eau. A passe au travers sans toucher le cerceau, en mettant la tête sous l\'eau. B l\'enfonce un peu plus à chaque passage. 5 passages, puis on change. Ensuite, deux cerceaux à la suite (deux paires ensemble).'},
  kim: {n: 'Le Kim du fond', k: 'coop', s: 'piscine:sp:flotte', f: 'p', d: 'Par deux : le prof dépose 5 objets différents au fond de la petite profondeur. A met la tête sous l\'eau, regarde les yeux ouverts sans rien toucher, remonte et dit à B tous les objets dont il se souvient. B vérifie sous l\'eau. Puis le prof déplace un objet : qu\'est-ce qui a changé ?'},
  dauphin: {n: 'Les dauphins', k: 'coop', s: 'piscine:sp:flotte', f: 'p', d: 'Par deux : B tient une frite à la surface, à bout de bras. A est un dauphin : il saute par-dessus la frite, puis passe dessous, puis par-dessus, sans s\'arrêter : 5 fois. On compte les « plongeons » réussis sans toucher la frite, puis on change.'},
  radeau: {n: 'Le radeau', k: 'coop', s: 'piscine:sp:flotte', f: 'g4', d: 'Par 4, on se tient par la main en cercle : au signal, tout le monde s\'allonge sur le ventre, visage dans l\'eau, bras et jambes écartés : le radeau flotte. On compte ensemble jusqu\'à 5, puis on se redresse sans se lâcher. Puis le radeau sur le dos, puis à 8.'},
  parcours: {n: 'Le parcours du débutant', k: 'coop', s: 'piscine:sp:flotte', f: 'e3', d: 'Un parcours en boucle dans la zone : passer sous une frite tenue sur l\'eau, traverser un cerceau, ramasser un anneau au fond et le reposer, faire 5 m en flèche, finir en étoile 3 s. On part toutes les 5 s, sans attendre, et on refait la boucle le plus de fois possible.'},
  'La sorcière sous-marine': {n: 'La sorcière sous-marine', k: 'opp', s: 'piscine:sp:flotte', d: 'La sorcière aquatique, en plus dur : la statue délivrée doit être libérée par un camarade qui passe entre ses jambes, la tête sous l\'eau. Deux sorcières, puis trois. Celui qui passe sous une statue est intouchable pendant qu\'il est sous l\'eau.'},
  chanson: {n: 'Les bulles qui chantent', k: 'coop', s: 'piscine:sp:flotte', f: 'p', d: 'Par deux : A « chante » une chanson connue en faisant des bulles, le visage dans l\'eau ; B, l\'oreille dans l\'eau, essaie de la deviner. 3 chansons chacun. Puis on marche tranquillement jusqu\'à l\'échelle. Sortie et comptage.'},
  bouteille: {n: 'La bouteille à la mer', k: 'coop', s: 'piscine:sp:flotte', f: 'g3', d: 'Par 3 : celui du milieu s\'allonge sur le dos, une frite sous la nuque, tout raide comme une bouteille ; les deux autres le font glisser doucement de l\'un à l\'autre. 1 min chacun, on parle à voix basse. Puis sortie et comptage.'},
  berceuse: {n: 'La berceuse', k: 'coop', s: 'piscine:sp:flotte', f: 'p', d: 'Par deux : A est allongé sur le dos, oreilles dans l\'eau, yeux fermés ; B lui tient la nuque d\'une main et le promène très lentement dans la zone, en faisant des vagues douces. 1 min chacun. Puis on marche jusqu\'à l\'échelle. Sortie et comptage.'},
  glisse: {n: 'La traversée silencieuse', k: 'coop', s: 'piscine:sp:aller', d: 'On traverse la zone le plus silencieusement possible : d\'abord en marchant, puis en glissant avec la planche, puis en flèche. Le prof ferme les yeux et écoute : qui fait le moins de bruit ? Puis on marche jusqu\'à l\'échelle. Sortie et comptage.'}
},
an: {
1: A,
2: A,
3: A,
4: A,
5: A,
6: A
}});
})();

/* ===== Schémas de chaque jeu (zone de petite profondeur vue de dessus, fermée par une ligne d'eau ; ou vue de côté) ===== */
(window.PSCH_SC = window.PSCH_SC || {}).natdeb = (() => {
  const COL = {a: '#1f63d6', b: '#e8590c', p: '#8a3ffc'}, EQ = ['#1f63d6', '#e8590c', '#16a34a', '#8a3ffc'];
  const PB = (g, o) => g.petitBain(o);
  // élèves debout dans l'eau (tête hors de l'eau)
  const deb = (g, P, o = {}) => { P.forEach(([x, y]) => g.nag(x, y, {k: 'tete', ...o})); return g; };
  // traversées dans des couloirs de la petite profondeur (de gauche à droite)
  const trav = (g, n, k, o = {}) => { for (let i = 0; i < n; i++){ const y = 50 + i * (150 / Math.max(1, n - 1)); g.nag(55, y, {k, ...o}); if (o.board) g.board(80, y); g.swim(o.board ? 94 : 78, y, 280, y); } return g; };
  const regles = (g, T) => { PB(g); g.row('a', 8, 40, 240, 250, 240).P(290, 240); T.forEach((t, i) => g.tag(160, 50 + i * 42, t, {s: 9.5})); return g; };
  return {
    'Les règles du groupe': g => regles(g, ['↔ on reste dans la zone de la ligne d\'eau', '🪜 on entre par l\'échelle (dos à l\'eau) ou assis', '📣 on sort au sifflet long', '💧 on se mouille la nuque et le visage']).echelle(36, 200),
    jardinier: g => { PB(g); [[80, 70], [200, 70], [80, 170], [200, 170]].forEach(([x, y]) => { deb(g, [[x, y]]).nag(x + 40, y, {k: 'tete', t: 'b'}).raw(`<path d="M${x + 10} ${y - 6}q10 -10 20 -2M${x + 10} ${y + 2}q10 -6 18 2" stroke="#0b6e99" stroke-width="1.6" fill="none" stroke-dasharray="2 2"/>`, 'top'); });
      return g.n(1, 'par deux, face à face, on s\'arrose avec les mains : bras, puis épaules, puis tête').n(2, 'l\'arrosé garde les yeux ouverts et sourit ; on change au signal'); },
    sorciere: g => { PB(g); deb(g, [[70, 60], [150, 50], [240, 80], [60, 170], [190, 190], [260, 160]]); g.nag(120, 120, {k: 'tete', t: 'x', lab: 'sorcière'}).frite(120, 136, 0, '#1d241f').run(134, 116, 160, 100, 0);
      g.nag(220, 125, {k: 'tete', t: 'g', lab: 'statue'}).label(220, 150, 'jambes écartées', {s: 8.5}).nag(280, 125, {k: 'sous', a: 180}).arrow('swim', 268, 125, 232, 125, 0);
      return g.n(1, 'la sorcière (frite noire) touche : on devient statue, jambes écartées').n(2, 'on délivre une statue en passant entre ses jambes (au début : en lui touchant la main sous l\'eau)'); },
    tresor: g => { PB(g); EQ.slice(0, 3).forEach((c, i) => { const y = 55 + i * 70; g.hoop(45, y, 14, c).nag(45, y, {c, k: 'tete'}).nag(70, y, {c, k: 'tete'}); });
      [[130, 60, '#d6336c'], [150, 150, '#d6336c'], [200, 100, '#f59f00'], [210, 200, '#f59f00'], [265, 60, '#16a34a'], [270, 150, '#16a34a']].forEach(([x, y, c]) => g.fond(x, y, c));
      g.arrow('swim', 85, 125, 190, 105, 0).arrow('run', 190, 115, 85, 132, 12).tag(160, 238, 'rose 1 · jaune 2 · vert 3 points', {s: 9});
      return g.n(1, 'au signal, chacun ramène un objet à la fois dans le cerceau de son équipe').n(2, 'les objets les plus loin valent le plus'); },
    etoile: g => { PB(g); for (let i = 0; i < 7; i++){ const a = i / 7 * 360; g.nag(160 + 58 * Math.cos(a * Math.PI / 180), 120 + 52 * Math.sin(a * Math.PI / 180), {k: 'etoile', a: a + 180}); }
      g.nag(60, 200, {k: 'etoile', a: -20}).frite(48, 200, 90).P(280, 240);
      return g.label(160, 124, 'on se tient la main', {s: 9}).n(1, 'sur le dos, bras et jambes écartés, oreilles dans l\'eau, frite sous la nuque si besoin : 20 s').n(2, 'puis la classe se tient la main : la grande étoile ; sortie et comptage'); },
    bulles: g => { PB(g); [[70, 70], [190, 70], [70, 170], [190, 170]].forEach(([x, y], i) => { g.nag(x, y, {k: i % 2 ? 'sous' : 'tete'}).bulles(x - 4, y - 8).nag(x + 34, y, {k: 'tete', t: 'b'}); });
      g.tag(160, 238, 'surface → bouche → nez et bouche → toute la tête', {s: 9});
      return g.n(1, 'par deux, mains dans les mains : on souffle de plus en plus profond').n(2, 'le partenaire compte les secondes de bulles : qui fait la plus longue machine ?'); },
    bilan: g => { PB(g); g.row('a', 8, 40, 240, 250, 240).P(290, 240).echelle(36, 200).arrow('run', 160, 120, 50, 190, 10).tag(160, 80, '👍 comment je me suis senti · ce que j\'ai osé', {s: 9.5});
      return g.n(1, 'on marche jusqu\'à l\'échelle ; au bord, chacun montre son pouce et dit ce qu\'il a osé faire'); },
    miroir: g => { PB(g); [[90, 80], [220, 80], [90, 180], [220, 180]].forEach(([x, y]) => { g.nag(x - 25, y, {k: 'tete'}).nag(x + 25, y, {k: 'tete', t: 'b'}).raw(`<path d="M${x} ${y - 20}V${y + 20}" stroke="#fff" stroke-width="2" stroke-dasharray="3 3"/>`, 'top'); });
      g.label(65, 55, 'A, le chef', {s: 9, b: 1}).label(115, 55, 'B, le miroir', {s: 9, b: 1});
      return g.n(1, 'A fait un geste (sauter, tourner, s\'asseoir au fond…), B le refait en miroir').n(2, 'on change de chef toutes les minutes'); },
    loto: g => { PB(g); [[100, 90], [100, 180]].forEach(([x, y]) => { g.nag(x, y, {k: 'sous', a: 0}).nag(x + 50, y, {k: 'tete', t: 'b'}).label(x + 50, y + 26, '✋ 3 doigts', {s: 9}); });
      g.tag(240, 90, 'A met la tête sous l\'eau, yeux ouverts', {s: 8.5}).tag(240, 180, 'il annonce « 3 ! » en remontant', {s: 8.5});
      return g.n(1, 'B montre un nombre avec ses doigts sous l\'eau ; 1 point par bonne réponse').n(2, 'puis des formes (rond, croix) ou des couleurs d\'objets'); },
    'Se remettre debout': g => { g.coupe({small: true}); g.side(110, 72, {a: 90}).frite(110, 64, 0).num(110, 44, 1).side(190, 110, {a: 140}).num(190, 80, 2).side(270, 150, {}).num(270, 118, 3);
      return g.n(1, 'allongé sur le ventre avec une frite').n(2, 'on ramène les genoux sous le ventre, on pousse les mains vers le fond, on relève la tête').n(3, 'on pose les pieds : debout !'); },
    meduse: g => { PB(g); [[80, 80], [200, 80], [80, 180], [200, 180]].forEach(([x, y], i) => { g.nag(x, y, {k: i < 2 ? 'boule' : 'etoile', a: 0}).nag(x + 34, y + 4, {k: 'tete', t: 'b'}); });
      g.label(140, 45, 'méduse : en boule, le dos à la surface', {s: 9, b: 1}).label(140, 145, 'puis on se déplie en étoile', {s: 9, b: 1});
      return g.n(1, 'on prend de l\'air, on attrape ses genoux, on flotte en boule ; le partenaire compte et pose une main sur le dos').n(2, 'puis étoile, et on se remet debout'); },
    traineau: g => { PB(g); [60, 130, 200].forEach(y => { g.nag(80, y, {}).board(103, y).nag(130, y, {k: 'tete', t: 'b'}).arrow('run', 145, y, 250, y, 0); });
      return g.label(130, 32, 'B tire à reculons', {s: 9, b: 1, c: COL.b}).n(1, 'A, bras tendus sur la planche, visage dans l\'eau, souffle ; B le tire en marchant à reculons').n(2, 'puis B lâche la planche : A glisse tout seul ; on change'); },
    'La sieste sur l\'eau': g => { PB(g); [[100, 80], [100, 180], [230, 130]].forEach(([x, y]) => g.nag(x, y, {k: 'dos'}).nag(x + 30, y - 18, {k: 'tete', t: 'b'}));
      return g.tag(160, 238, 'B soutient la nuque, puis enlève sa main petit à petit', {s: 9}).n(1, 'A sur le dos, oreilles dans l\'eau, ventre en haut').n(2, 'pour se relever : regarder son ventre, ramener les genoux, poser les pieds'); },
    bateau: g => { PB(g); trav(g, 3, 'dos'); [50, 125, 200].forEach(y => g.board(48, y + 2, 90)); return g.n(1, 'sur le dos, planche serrée sur le ventre, oreilles dans l\'eau, regard au plafond').n(2, 'on avance en battements ; bassin en avant, ventre en haut'); },
    'Épreuve 1 : entrer, souffler, ramasser': g => { PB(g); g.echelle(36, 60).arrow('run', 48, 70, 70, 100, 0, 1).nag(80, 110, {k: 'tete'}).arrow('run', 95, 110, 180, 110, 0, 2).bulles(195, 100).num(200, 80, 3).fond(240, 150).arrow('swim', 205, 120, 235, 145, 0, 4);
      deb(g, [[100, 200], [130, 200], [200, 200], [230, 200]]).label(165, 222, 'les autres : loto par deux', {s: 9}).P(290, 240).sheet(270, 240);
      return g.n(1, 'entrée').n(2, 'traversée').n(3, '5 s de bulles').n(4, 'un objet au fond'); },
    'Épreuve 2 : flotter et se relever': g => { PB(g); g.nag(90, 100, {k: 'etoile'}).label(90, 70, 'étoile ventrale 5 s', {s: 9, b: 1}).nag(210, 100, {k: 'etoile', a: 180}).label(210, 70, 'étoile dorsale 5 s', {s: 9, b: 1});
      return g.tag(150, 170, 'puis on se remet debout seul, à chaque fois', {s: 9.5}).P(290, 240).sheet(270, 240); },
    fleche: g => { PB(g); [50, 125, 200].forEach((y, i) => g.nag(45, y, {}).arrow('swim', 62, y, 130 + i * 25, y, 0).frite(140 + i * 25, y, 90, '#f59f00'));
      return g.n(1, 'dos au mur, un pied au mur : bras tendus, tête entre les bras, on pousse et on glisse sans bouger').n(2, 'le partenaire pose une frite où on s\'arrête : on essaie de la dépasser'); },
    crabe: g => { PB(g); [[60, 30], [140, 30], [220, 30]].forEach(([x], i) => g.nag(x, 34, {k: 'tete'}).arrow('run', x + 14, 34, x + 50, 34, 0));
      g.label(150, 58, 'mains sur le bord, de côté', {s: 9, b: 1}).nag(330, 60, {k: 'tete'}).label(340, 100, 'plus tard : grande profondeur', {s: 8.5}).label(340, 112, 'un camarade marche à côté', {s: 8.5});
      return g.n(1, 'on se déplace de côté comme un crabe, sans les pieds au fond si on peut').n(2, 'puis on lâche une main pour faire coucou, puis les deux une seconde'); },
    'Le moteur au bord': g => { PB(g); [60, 125, 190].forEach(y => g.nag(50, y, {a: 180}).bulles(72, y - 3).bulles(78, y + 6)); return g.label(140, 125, '← mains au bord, corps allongé', {s: 9.5, b: 1}).n(1, 'jambes tendues, pieds souples comme des palmes').n(2, 'petits battements qui font des bulles, pas des éclaboussures'); },
    moteur: g => { PB(g); EQ.slice(0, 3).forEach((c, i) => { const y = 55 + i * 70; g.nag(35, y - 12, {c, k: 'tete'}).nag(35, y + 12, {c, k: 'tete'}).nag(130, y, {c}).board(155, y).bulles(110, y).swim(170, y, 280, y); });
      return g.n(1, 'relais : bras tendus sur la planche, battements de jambes tendues').n(2, 'le suivant part quand on lui tape dans la main'); },
    chevaux: g => { PB(g); EQ.slice(0, 3).forEach((c, i) => { const y = 55 + i * 70; g.nag(35, y - 12, {c, k: 'tete'}).nag(35, y + 12, {c, k: 'tete'}).nag(140, y, {c, k: 'brasse'}).frite(140, y, 0, '#f59f00').swim(165, y, 280, y); });
      return g.n(1, 'frite entre les jambes comme un cheval : on pédale et on rame avec les bras, sans toucher le fond').n(2, 'relais par équipes, puis course des chevaux sur le dos'); },
    rameur: g => { PB(g); trav(g, 3, 'crawl'); [50, 125, 200].forEach(y => g.frite(55, y, 90, '#f59f00')); g.A(290, 240).label(160, 238, '« 1, 2, 3… coups de rame »', {s: 9});
      return g.n(1, 'frite sous les aisselles : on avance seulement avec les bras ; la main entre devant et pousse jusqu\'à la cuisse').n(2, 'le partenaire compte les coups de rame pour traverser'); },
    'La respiration du moulin': g => { PB(g); trav(g, 3, 'crawl'); return g.tag(160, 238, 'main droite passe la cuisse → tête à droite, on inspire', {s: 9}).n(1, 'debout, buste penché, visage dans l\'eau : bras du crawl en marchant'); },
    ballon: g => { PB(g); deb(g, [[70, 70], [60, 170], [120, 125]]); deb(g, [[240, 70], [250, 170], [200, 125]], {t: 'b'}); g.ball(160, 120, 'gros').arrow('run', 170, 118, 270, 110, -10).bulles(150, 108);
      g.label(30, 240, 'bord B', {s: 9, b: 1, c: COL.b, a: 'start'}).label(290, 240, 'bord A', {s: 9, b: 1, c: COL.a, a: 'end'});
      return g.n(1, 'on pousse le ballon vers le bord adverse : tête, mains sous l\'eau ou en soufflant ; jamais lancé').n(2, 'en marchant, puis allongé avec une frite'); },
    'La flèche sur le dos': g => { PB(g); [50, 125, 200].forEach((y, i) => g.nag(45, y, {k: 'dos'}).arrow('swim', 62, y, 120 + i * 25, y, 0).frite(130 + i * 25, y, 90, '#f59f00'));
      return g.n(1, 'pieds au mur, on se couche sur le dos et on pousse, bras le long du corps, oreilles dans l\'eau').n(2, 'le partenaire marque l\'arrivée avec une frite'); },
    'L\'échelle des aides': g => { PB(g); [['frite', 40], ['planche', 95], ['pull-buoy', 150], ['rien !', 205]].forEach(([t, y], i) => { g.nag(70, y, {k: 'crawl'}).swim(92, y, 270, y).tag(180, y - 14, t, {s: 8.5}); if (i === 0) g.frite(70, y + 10, 0); if (i === 1) g.board(95, y); });
      return g.n(1, 'chacun traverse avec l\'aide qu\'il choisit ; à chaque traversée réussie, on enlève une aide').n(2, 'le partenaire coche'); },
    relais: g => { PB(g); EQ.slice(0, 3).forEach((c, i) => { const y = 55 + i * 70; g.nag(35, y - 12, {c, k: 'tete'}).nag(35, y + 12, {c, k: 'tete'}).nag(150, y, {c, k: ['tete', 'nage', 'dos'][i]}).swim(172, y, 280, y); });
      return g.n(1, 'chacun traverse dans la nage tirée au sort (marche, traîneau, moteur, flèche, dos)').n(2, 'le suivant part quand on touche sa main ; sans aide = 1 point bonus'); },
    'Épreuve 1 : flèche et battements': g => { PB(g); g.nag(45, 70, {}).arrow('swim', 62, 70, 150, 70, 0).frite(160, 70, 90, '#f59f00').label(110, 48, 'flèche mesurée', {s: 9, b: 1}); g.nag(55, 170, {}).board(80, 170).swim(94, 170, 280, 170).label(160, 145, '15 m de battements avec planche', {s: 9, b: 1});
      return g.P(290, 240).sheet(270, 240); },
    'Épreuve 2 : 12,5 m ventre et 10 m dos': g => { PB(g); g.nag(55, 80, {k: 'crawl'}).swim(78, 80, 280, 80).label(160, 58, '12,5 m sur le ventre', {s: 9, b: 1}).nag(55, 170, {k: 'dos'}).swim(78, 170, 240, 170).label(150, 148, '10 m sur le dos', {s: 9, b: 1});
      return g.P(290, 240).sheet(270, 240).n(1, 'sans aide, devant le prof ; on se remet debout seul à l\'arrivée'); },
    'L\'escalier du saut': g => { g.coupe({small: true}); g.side(28, 22, {}).arrow('run', 45, 25, 90, 72, -20).raw('<ellipse cx="110" cy="63" rx="16" ry="4" fill="none" stroke="#f59f00" stroke-width="3.5"/>', 'top');
      ['1 · assis, on se laisse tomber', '2 · accroupi, on saute', '3 · debout, on saute loin', '4 · dans un cerceau flottant'].forEach((t, i) => g.tag(290, 95 + i * 22, t, {s: 9}));
      return g.n(1, 'on remonte, on se met sur le ventre et on revient au bord'); },
    'Le parachute': g => { g.coupe({small: true}); [['étoile', 120, 'etoile'], ['boule', 210, 'boule'], ['crayon', 300, 'nage']].forEach(([t, x, k]) => g.nag(x, 100, {k, a: 90}).label(x, 130, t, {s: 9.5, b: 1}));
      return g.side(28, 22, {}).n(1, 'saut en étoile, en boule, en crayon').n(2, 'on remonte et on fait l\'étoile de mer 3 s avant de rejoindre le bord'); },
    'L\'ascenseur du bord': g => { g.coupe({deep: 1}); g.side(75, 80, {up: 1}).arrow('run', 92, 85, 92, 135, 0, 1).arrow('run', 104, 135, 104, 85, 0, 2).bulles(80, 120).label(150, 100, 'on se tient au mur', {s: 9, a: 'start'});
      return g.n(1, 'mains au bord en grande profondeur : on souffle et on descend le long du mur').n(2, 'on remonte ; puis on lâche une main en remontant'); },
    sentinelle: g => { PB(g); [[325, 60], [340, 130], [325, 200]].forEach(([x, y], i) => { g.nag(x, y, {k: 'tete'}); if (i < 2) g.frite(x, y + 14, 0); }); g.A(390, 240).chrono(370, 240);
      g.tag(160, 90, 'avec frite → frite lâchée et rattrapée → sans frite', {s: 9});
      return g.n(1, 'là où on n\'a plus pied : on reste sur place, tête hors de l\'eau').n(2, 'le partenaire compte les secondes'); },
    'Les îles': g => { PB(g); [100, 160, 220].forEach(x => g.board(x, 125, 90)); g.nag(50, 125, {k: 'crawl'}).path('swim', [[70, 125], [95, 125]]).path('swim', [[110, 125], [155, 125]]).path('swim', [[170, 125], [215, 125]]).path('swim', [[230, 125], [285, 125]]);
      g.label(160, 100, 'une île tous les 5 m : on peut s\'y reposer 3 s', {s: 9, b: 1});
      return g.n(1, 'à chaque passage, on enlève une île'); },
    perche: g => { g.coupe({deep: 1}); g.side(16, 22, {c: COL.p}).perche(26, 30, 120, 66).side(48, 22, {}).arrow('run', 58, 20, 165, 84, -30, 1).side(170, 108, {k: 'sous'}).arrow('swim', 158, 92, 126, 70, 0, 2).label(120, 86, 'perche à 1 m', {s: 9, a: 'end'});
      return g.n(1, 'on saute debout, on remonte').n(2, 'on attrape la perche puis le bord ; ensuite, la perche reste à côté et on revient seul'); },
    'La répétition générale': g => { g.pool(3, {marks: false}); ['saut en grande profondeur + retour', '25 m', 'surplace 15 s · étoile sur le dos 10 s'].forEach((t, i) => { const y = +g.pool_y(i); g.tag(200, y - 20, t, {s: 9}); g.nag(90, y + 8, {k: i === 2 ? 'tete' : 'crawl'}); if (i < 2) g.swim(112, y + 8, 330, y + 8); });
      return g.A(390, 240).sheet(370, 240).n(1, 'chacun fait le test complet devant son binôme, qui coche ce qui est réussi'); },
    'L\'atelier du point faible': g => { PB(g); [['perche', 30, 30], ['îles', 165, 30], ['sentinelle', 30, 128], ['étoile', 165, 128]].forEach(([t, x, y], i) => g.zone(x, y, 128, 92, '', 'blue').num(x + 14, y + 14, i + 1).label(x + 26, y + 18, t, {s: 9.5, b: 1, a: 'start'}));
      g.perche(40, 90, 80, 70).board(200, 80, 90).board(240, 80, 90).nag(90, 180, {k: 'tete'}).frite(90, 194, 0).nag(230, 180, {k: 'etoile', a: 180});
      return g.n(1, 'chacun va à l\'atelier de son point faible'); },
    'Épreuve 1 : saut et retour': g => { g.coupe({deep: 1}); g.side(30, 22, {}).arrow('run', 50, 30, 150, 90, -20, 1).side(160, 100, {k: 'sous'}).arrow('swim', 140, 80, 70, 70, 10, 2).perche(45, 30, 110, 66);
      return g.P(380, 40).n(1, 'saut debout en grande profondeur').n(2, 'retour au bord seul (perche à côté, sans la prendre)'); },
    'Épreuve 2 : 25 m': g => { g.pool(3, {marks: false}); [0, 1, 2].forEach(i => { const y = +g.pool_y(i); g.nag(60, y, {k: 'crawl'}).swim(82, y, 360, y); }); return g.P(390, 240).sheet(370, 240).n(1, 'sans toucher le fond ni la ligne d\'eau'); },
    'Épreuve 3 : surplace et dos': g => { PB(g); g.nag(330, 80, {k: 'tete'}).label(290, 84, 'surplace 15 s →', {s: 10, b: 1, a: 'end'}).nag(335, 180, {k: 'etoile', a: 180}).label(290, 184, 'étoile sur le dos 10 s →', {s: 10, b: 1, a: 'end'});
      return g.P(390, 240).sheet(370, 240).n(1, 'en grande profondeur, près du bord'); },
    train: g => { PB(g); [[130, 60, 1], [170, 125, -1], [150, 190, 1]].forEach(([x, y, d], i) => { deb(g, [0, 1, 2, 3].map(j => [x - d * j * 26, y])); g.arrow('run', x + d * 16, y, x + d * 80, y, 0); if (i === 0) g.bulles(x - 30, y - 10); });
      g.label(130, 42, 'locomotive', {s: 9, b: 1}).tag(160, 238, 'marche · court · saute · recule · tchou-tchou', {s: 9});
      return g.n(1, 'trains de 4, mains sur les épaules : tous les trains roulent en même temps').n(2, 'au sifflet (gare), la locomotive passe en queue de son train'); },
    tunnel: g => { PB(g); [[60, 65, COL.a], [60, 175, COL.b]].forEach(([x, y, c]) => { [0, 1, 2].forEach(j => { const xx = x + 40 + j * 32; g.nag(xx, y, {k: 'tete', c}).raw(`<path d="M${xx - 6} ${y + 12}l-4 10M${xx + 6} ${y + 12}l4 10" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`, 'top'); });
        g.nag(x + 8, y + 22, {k: 'sous', c}).arrow('swim', x + 22, y + 22, x + 140, y + 22, 0).arrow('run', x + 150, y - 14, x + 215, y - 14, 0); });
      g.label(250, 44, 'le tunnel avance →', {s: 9, b: 1}).label(160, 120, 'on passe dessous puis on se met au bout', {s: 9});
      return g.n(1, 'par 4 : trois font le tunnel, jambes écartées ; le 4e passe dessous et se place au bout').n(2, 'tous les tunnels en même temps : le premier à la ligne d\'eau gagne'); },
    feux: g => { PB(g); deb(g, [[60, 60], [130, 90], [220, 55], [80, 170], [170, 150], [250, 190], [240, 110]]); g.arrow('run', 72, 60, 110, 70, 0).arrow('run', 182, 150, 220, 135, 0).bulles(240, 100).P(16, 125);
      [['#16a34a', 'marche'], ['#f59f00', 'saute'], ['#dc2626', 'bulles'], ['#1f63d6', 'assis']].forEach(([c, t], i) => g.raw(`<circle cx="${60 + i * 66}" cy="236" r="6" fill="${c}"/>`, 'top').label(90 + i * 66, 240, t, {s: 9}));
      return g.n(1, 'le prof montre une couleur : vert marche vite, orange saute, rouge bulles, bleu assis jusqu\'au menton'); },
    poissons: g => { PB(g); g.nag(130, 120, {k: 'tete', t: 'x'}).nag(160, 120, {k: 'tete', t: 'x'}).raw('<path d="M138 120H152" stroke="#1d241f" stroke-width="3"/>', 'top').label(145, 100, 'le filet', {s: 9, b: 1});
      deb(g, [[60, 60], [240, 60], [70, 190], [250, 170], [210, 210]]); g.arrow('run', 72, 64, 110, 75, 0).arrow('run', 238, 70, 200, 95, 0).nag(145, 140, {k: 'sous', a: 90});
      return g.n(1, 'deux pêcheurs main dans la main : chaque poisson touché rejoint le filet').n(2, 'un poisson s\'échappe en passant sous les bras du filet'); },
    statues: g => { PB(g); [[70, 60, 'tete'], [150, 80, 'tete'], [240, 60, 'etoile'], [80, 170, 'boule'], [170, 170, 'tete'], [250, 150, 'etoile']].forEach(([x, y, k]) => g.nag(x, y, {k})); g.bulles(170, 160).music(339, 180);
      return g.tag(160, 238, 'sur un pied · assis jusqu\'au menton · nez dans l\'eau · étoile', {s: 9}).n(1, 'musique : on bouge ; musique coupée : on se fige 5 s dans la position annoncée'); },
    balles: g => { PB(g); g.frite(160, 70, 90).frite(160, 125, 90).frite(160, 180, 90); deb(g, [[60, 70], [90, 140], [70, 200], [120, 100]]); deb(g, [[210, 70], [250, 140], [230, 200], [200, 110]], {t: 'b'});
      [[100, 60], [130, 170], [190, 150], [230, 90], [260, 190], [55, 110]].forEach(([x, y]) => g.ball(x, y)); g.arrow('pass', 125, 100, 200, 85, -15).arrow('pass', 200, 115, 135, 150, -15);
      return g.n(1, '1 min : on envoie les balles dans l\'autre camp à une main').n(2, 'au sifflet, le camp qui a le moins de balles gagne'); },
    requins: g => { PB(g); [50, 90, 130, 170, 210].forEach(y => g.nag(40, y, {k: 'tete'})); g.nag(130, 90, {k: 'tete', t: 'x', lab: 'requin'}).nag(170, 170, {k: 'tete', t: 'x', lab: 'requin'});
      g.arrow('run', 52, 50, 285, 60, -10).arrow('run', 52, 130, 285, 130, 10).arrow('run', 52, 210, 285, 200, 10).nag(240, 98, {k: 'sous'});
      return g.label(235, 80, 'tête sous l\'eau = intouchable', {s: 9}).n(1, '« sardines ! » : on traverse jusqu\'à la ligne d\'eau ; touché = on devient requin'); },
    nenuphars: g => { PB(g); [[80, 70], [200, 60], [150, 140], [70, 190], [240, 170]].forEach(([x, y]) => g.cerceauFlot(x, y, 16)); deb(g, [[70, 58], [92, 80], [200, 46], [210, 72], [140, 132], [162, 150], [80, 200]]);
      g.nag(240, 170, {k: 'sous'}).P(339, 120);
      return g.label(240, 200, 'dernier tour : la tête dedans', {s: 9}).n(1, 'au sifflet : les deux mains dans un nénuphar ; un nénuphar de moins à chaque tour').n(2, 'personne n\'est éliminé : on se serre à plusieurs'); },
    chatbulles: g => { PB(g); g.nag(150, 120, {k: 'tete', t: 'x', lab: 'chat'}).frite(150, 136, 0, '#1d241f').run(164, 116, 205, 95, 0); deb(g, [[60, 60], [70, 180], [260, 190], [60, 120]]);
      g.nag(220, 90, {k: 'sous'}).bulles(214, 80).label(220, 64, 'perché : bulles 3 s', {s: 9, b: 1});
      return g.n(1, 'visage dans l\'eau en faisant des bulles = intouchable, mais seulement 3 s').n(2, 'touché : on prend la frite et on devient chat'); },
    cerceaux: g => { g.coupe({small: true}); [[150, 'A'], [290, 'B']].forEach(([x], i) => { g.raw(`<ellipse cx="${x}" cy="${i ? 78 : 66}" rx="6" ry="26" fill="none" stroke="#f59f00" stroke-width="4"/>`, 'top').side(x + 34, 95, {c: COL.b}); });
      g.side(100, 70, {a: 70}).arrow('swim', 110, 80, 270, 95, 18).bulles(160, 92);
      return g.label(220, 150, 'B enfonce le cerceau un peu plus à chaque passage', {s: 9}).n(1, 'A passe dans le cerceau sans le toucher, la tête sous l\'eau ; 5 passages puis on change'); },
    kim: g => { PB(g); [[140, 70, '#d6336c'], [165, 95, '#f59f00'], [130, 110, '#16a34a'], [175, 60, '#8a3ffc'], [190, 115, '#1f63d6']].forEach(([x, y, c]) => g.fond(x, y, c));
      g.nag(110, 85, {k: 'sous', a: 0}).nag(80, 85, {k: 'tete', t: 'b'}); g.nag(220, 180, {k: 'tete'}).nag(250, 180, {k: 'tete', t: 'b'}).label(235, 205, '« un anneau rose, un vert… »', {s: 9});
      return g.n(1, 'A regarde le fond, yeux ouverts, sans rien toucher, puis dit à B tous les objets').n(2, 'le prof déplace un objet : qu\'est-ce qui a changé ?'); },
    dauphin: g => { g.coupe({small: true}); g.raw('<rect x="178" y="58" width="44" height="8" rx="4" fill="#16a34a"/>', 'top').side(250, 95, {c: COL.b}).label(250, 140, 'B tient la frite', {s: 9});
      g.side(110, 80, {a: 60}).raw('<path d="M120 70Q170 10 210 50" fill="none" stroke="#0b6e99" stroke-width="2" marker-end="url(#ah)"/>', 'top').raw('<path d="M215 75Q200 120 160 100Q130 85 125 78" fill="none" stroke="#0b6e99" stroke-width="2" stroke-dasharray="4 3"/>', 'top').num(165, 25, 1).num(185, 118, 2);
      return g.n(1, 'par-dessus la frite').n(2, 'puis dessous, la tête sous l\'eau ; 5 plongeons sans s\'arrêter, puis on change'); },
    radeau: g => { PB(g); [[100, 90], [220, 150]].forEach(([cx, cy], j) => { for (let i = 0; i < 4; i++){ const a = i * 90 + 45; g.nag(cx + 30 * Math.cos(a * Math.PI / 180), cy + 30 * Math.sin(a * Math.PI / 180), {k: 'etoile', a: a + 180, c: j ? COL.b : COL.a}); } });
      return g.label(100, 140, 'visage dans l\'eau', {s: 9}).label(220, 200, 'on compte jusqu\'à 5', {s: 9}).n(1, 'par 4, main dans la main : tous s\'allongent en même temps, bras et jambes écartés').n(2, 'puis on se redresse sans se lâcher ; ensuite sur le dos'); },
    parcours: g => { PB(g); g.frite(80, 60, 90).cerceauFlot(160, 50, 14).fond(240, 70).board(250, 150, 90).nag(160, 190, {k: 'etoile'});
      g.path('swim', [[40, 60], [70, 60]]).path('swim', [[95, 55], [145, 50]]).path('swim', [[175, 50], [235, 65]]).path('swim', [[250, 85], [255, 130]]).path('swim', [[240, 175], [180, 190]]).path('run', [[140, 195], [40, 160], [40, 75]]);
      g.num(80, 38, 1).num(160, 26, 2).num(262, 58, 3).num(275, 110, 4).num(160, 170, 5);
      return g.n(1, 'sous la frite').n(2, 'dans le cerceau').n(3, 'anneau au fond, on le repose').n(4, '5 m en flèche').n(5, 'étoile 3 s ; on repart, départ toutes les 5 s'); },
    'La sorcière sous-marine': g => { PB(g); deb(g, [[70, 60], [250, 60], [60, 190], [250, 200]]); g.nag(120, 120, {k: 'tete', t: 'x', lab: 'sorcière'}).frite(120, 136, 0, '#1d241f').nag(180, 70, {k: 'tete', t: 'x', lab: 'sorcière'}).frite(180, 86, 0, '#1d241f');
      g.nag(210, 140, {k: 'tete', t: 'g', lab: 'statue'}).raw('<path d="M204 152l-4 10M216 152l4 10" stroke="#9aa3a0" stroke-width="3" stroke-linecap="round"/>', 'top').nag(270, 150, {k: 'sous', a: 180}).arrow('swim', 258, 158, 222, 158, 0);
      return g.n(1, 'statue délivrée seulement si un camarade passe entre ses jambes, la tête sous l\'eau').n(2, 'sous l\'eau, on est intouchable'); },
    chanson: g => { PB(g); [[80, 70], [210, 70], [80, 170], [210, 170]].forEach(([x, y]) => { g.nag(x, y, {k: 'sous'}).bulles(x + 2, y - 10).nag(x + 36, y, {k: 'tete', t: 'b'}).label(x + 18, y - 22, '♪', {s: 12}); });
      return g.n(1, 'A chante sous l\'eau en faisant des bulles, B (l\'oreille dans l\'eau) devine la chanson').n(2, 'puis on marche jusqu\'à l\'échelle ; sortie et comptage'); },
    bouteille: g => { PB(g); [[100, 80], [210, 170]].forEach(([x, y]) => { g.nag(x - 50, y, {k: 'tete'}).nag(x + 50, y, {k: 'tete'}).nag(x, y, {k: 'dos', t: 'b'}).frite(x + 14, y, 90).arrow('rot', x - 20, y - 18, x + 25, y - 18, -8).arrow('rot', x + 25, y + 18, x - 20, y + 18, -8); });
      return g.n(1, 'par 3 : celui du milieu, tout raide sur le dos, glisse doucement de l\'un à l\'autre').n(2, '1 min chacun, à voix basse ; puis sortie et comptage'); },
    berceuse: g => { PB(g); [[80, 70], [100, 170], [220, 110]].forEach(([x, y]) => g.nag(x, y, {k: 'dos'}).nag(x - 6, y - 22, {k: 'tete', t: 'b'})); g.path('run', [[230, 90], [270, 70], [270, 160], [240, 190]]);
      return g.n(1, 'A sur le dos, yeux fermés ; B lui tient la nuque et le promène très lentement').n(2, '1 min chacun, puis on marche jusqu\'à l\'échelle'); },
    glisse: g => { PB(g); trav(g, 3, 'nage'); g.board(80, 125).P(160, 238);
      return g.label(215, 238, 'le prof écoute, yeux fermés', {s: 9, a: 'start'}).n(1, 'on traverse sans bruit : en marchant, puis avec la planche, puis en flèche'); }
  };
})();
