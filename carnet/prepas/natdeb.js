/* Natation · débutants (petite profondeur) : pour le groupe qui n'est pas encore à l'aise dans l'eau, en parallèle du groupe « nageurs » (fichier natation.js).
   3 cycles de 6 leçons (5 leçons + 1 évaluation), à suivre dans l'ordre quelle que soit l'année : on commence au cycle 1 et on avance au rythme du groupe.
   Sécurité : travail en petite profondeur (on a pied), un adulte au bord de ce groupe, comptage à l'entrée et à la sortie, frites et planches à portée de main.
   L'évaluation du cycle 3 sert de test de passage vers le groupe « nageurs ». */
(() => {
const SEQ = {th: "Natation débutants : de la petite profondeur à 25 m et au grand bain", comp: ["HME1", "HME4", "GSS1", "GSS2"], mat: "Frites, planches, anneaux et objets lestés, cerceaux lestés, tapis flottant, perche, ligne d'eau, sifflet.",
 cy: ["Se familiariser : entrer, mettre la tête sous l'eau, souffler, flotter", "Se déplacer : flèche, battements, crawl et dos simplifiés, 12,5 m", "Devenir autonome : sauter, aller en grande profondeur, nager 25 m"],
 l: [
  {t: "Entrer dans l'eau et se déplacer", o: "Entrer seul dans l'eau en petite profondeur et se déplacer sans se tenir au bord.", e: [
    ["Règles et entrée", 5, "Au bord : les règles du groupe (on reste dans la zone des lignes d'eau, on sort au signal du sifflet). Entrée par l'échelle, dos à l'eau, puis on s'asseoit au bord et on se laisse glisser. On se mouille la nuque et le visage.", "explication"],
    ["Marcher dans l'eau", 5, "Marcher en avant, en arrière, sur le côté, en levant les genoux ; puis courir doucement en poussant l'eau avec les mains.", "piscine:sp:flotte"]],
   c: [["Les déménageurs", 10, "Objets flottants (balles, planches) d'un côté de la zone : par équipes de 4, on les transporte un par un de l'autre côté en marchant, puis en sautant à pieds joints. L'équipe qui a tout déménagé en premier gagne.", "Je me déplace dans toute la zone sans me tenir au bord.", "Avec une frite autour de la taille pour les plus craintifs.", "piscine:sp:relais"],
    ["Le passage sous le pont", 8, "Deux élèves tiennent une frite à hauteur d'épaule ; les autres passent dessous en se baissant, puis la frite descend (menton, bouche, nez).", "Je passe sous la frite avec l'eau jusqu'au menton.", "On peut se boucher le nez au début.", "piscine:sp:flotte"],
    ["Le facteur", 7, "En cercle, eau à la taille : on se passe un ballon en l'éclaboussant le moins possible, puis en s'éclaboussant exprès pour s'habituer à l'eau sur le visage.", "Je garde les yeux ouverts quand l'eau m'éclabousse.", "", "piscine:sp:flotte"]],
   r: [["Jeu calme et sortie", 5, "Chacun raconte ce qui était facile et ce qui faisait peur ; sortie par l'échelle et comptage.", "explication"]]},
  {t: "Mettre la tête sous l'eau et souffler", o: "Mettre toute la tête sous l'eau en soufflant par la bouche et le nez.", e: [
    ["Entrée et marche", 5, "Entrée par l'échelle, marche avant et arrière dans la zone, on se mouille le visage avec les mains.", "piscine:sp:flotte"],
    ["Les bulles", 5, "Au bord : souffler sur l'eau (faire avancer une balle de ping-pong), puis souffler dans l'eau bouche à la surface, puis bouche et nez dans l'eau. On compte les bulles.", "piscine:sp:flotte"]],
   c: [["L'ascenseur", 10, "Tenant le bord à deux mains : inspirer par la bouche, descendre jusqu'aux yeux, au front, puis toute la tête en soufflant ; remonter. 10 fois, de plus en plus longtemps (3 s, 5 s).", "Je mets toute la tête sous l'eau 3 secondes en soufflant.", "S'arrêter aux yeux si la tête entière fait peur.", "piscine:sp:flotte"],
    ["Les pompiers", 8, "Par deux face à face, mains tenues : l'un descend sous l'eau en soufflant pendant que l'autre compte jusqu'à 3, puis on échange (comme une balançoire).", "Je descends sous l'eau sans lâcher les mains de mon partenaire et je remonte calmement.", "Sans les mains pour les plus à l'aise.", "piscine:sp:flotte"],
    ["Le tunnel", 7, "Des cerceaux flottants posés à la surface : on passe dessous en mettant la tête sous l'eau ; puis cerceaux tenus un peu plus bas par le prof ou des camarades.", "Je passe sous 3 cerceaux de suite.", "", "piscine:sp:flotte"]],
   r: [["Retour au calme", 5, "Souffler longuement dans l'eau 5 fois ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Ouvrir les yeux sous l'eau et ramasser des objets", o: "Garder les yeux ouverts sous l'eau et aller chercher un objet au fond en petite profondeur.", e: [
    ["Entrée et bulles", 5, "Entrée par l'échelle, puis 10 « ascenseurs » en soufflant, tenant le bord.", "piscine:sp:flotte"],
    ["Combien de doigts ?", 5, "Par deux, sous l'eau : l'un montre des doigts sous la surface, l'autre plonge la tête, regarde et dit le nombre en remontant.", "piscine:sp:flotte"]],
   c: [["La pêche aux trésors", 10, "Objets lestés de couleurs posés au fond (eau à la poitrine) : on descend les chercher en pliant les jambes ou en se penchant, un objet à la fois. On compte ses trésors.", "Je ramasse 5 objets en gardant les yeux ouverts.", "Objets sur une marche de l'escalier, moins profond.", "piscine:sp:flotte"],
    ["Le parcours sous-marin", 8, "Deux cerceaux lestés debout au fond : passer dedans en marchant ou en se poussant, la tête sous l'eau.", "Je passe dans les deux cerceaux en gardant la tête sous l'eau.", "Un seul cerceau.", "piscine:sp:flotte"],
    ["Relais des trésors", 7, "Équipes de 4 : chacun à son tour va chercher un objet au fond et le rapporte au bord. Premier à 8 objets.", "Je ramène mon objet sans m'arrêter.", "", "piscine:sp:relais"]],
   r: [["Retour au calme", 5, "On s'assied au fond quelques secondes en soufflant (pour ceux qui le peuvent), sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Flotter sur le ventre", o: "Flotter à plat ventre, visage dans l'eau, d'abord avec une aide puis sans aide, et se remettre debout seul.", e: [
    ["Entrée et bulles", 5, "Entrée par l'échelle, une largeur en marchant, puis tenant le bord : 10 « ascenseurs » (toute la tête sous l'eau en soufflant par la bouche et le nez).", "piscine:sp:flotte"],
    ["Se remettre debout", 5, "Tenant le bord, allongé : ramener les genoux sous le ventre, appuyer les mains vers le bas, relever la tête et poser les pieds. 6 fois. C'est le geste qui rassure.", "piscine:sp:flotte"]],
   c: [["La méduse", 8, "Inspirer, mettre le visage dans l'eau, attraper ses genoux : le dos remonte et on flotte en boule. Compter jusqu'à 5, se remettre debout.", "Je flotte en boule 5 secondes.", "Un camarade pose la main sur l'épaule.", "piscine:sp:flotte"],
    ["L'étoile de mer avec aide", 10, "Allongé sur le ventre, bras et jambes écartés, visage dans l'eau, en tenant une frite sous les bras ; puis une planche dans chaque main ; puis le partenaire tient seulement les mains. 5 s à chaque fois, se remettre debout seul.", "Je flotte 5 s avec une seule planche.", "Garder la frite.", "piscine:sp:flotte"],
    ["L'étoile de mer sans aide", 7, "Même chose sans rien ; le partenaire compte et vérifie que le visage est bien dans l'eau.", "Je flotte 5 s sans aide et je me remets debout seul.", "Flotter en tenant le bord d'une main.", "piscine:sp:flotte"]],
   r: [["Jeu calme", 5, "La « statue » : au signal, chacun prend une position de flottaison au choix ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Flotter sur le dos et se redresser", o: "Flotter sur le dos, oreilles dans l'eau, et se remettre debout sans paniquer.", e: [
    ["Entrée et rappel", 5, "Entrée, marche, 5 méduses, 5 étoiles de mer sur le ventre.", "piscine:sp:flotte"],
    ["La tête qui repose", 5, "Debout dos au bord, on se penche en arrière jusqu'à poser l'arrière de la tête dans l'eau (oreilles dans l'eau), le regard au plafond.", "piscine:sp:flotte"]],
   c: [["Le dos avec aide", 10, "Allongé sur le dos avec une frite sous la nuque et une sous les genoux ; puis frite seulement sous la nuque ; puis le partenaire tient l'arrière de la tête. Ventre en haut, comme si on était dans son lit.", "Je flotte 5 s sur le dos avec une seule frite.", "Le prof soutient sous le dos.", "piscine:sp:flotte"],
    ["Se redresser depuis le dos", 8, "Sur le dos : ramener les genoux vers la poitrine, pousser les mains vers l'avant (comme pour s'asseoir), poser les pieds. 6 fois, d'abord avec frite puis sans.", "Je me remets debout seul depuis le dos.", "Avec la main du partenaire dans le dos.", "piscine:sp:flotte"],
    ["Le lit flottant", 7, "Étoile de mer sur le dos sans aide, le partenaire compte ; on passe de 3 à 5 puis 10 secondes.", "Je flotte 5 s sur le dos sans aide.", "Garder une frite sous la nuque.", "piscine:sp:flotte"]],
   r: [["Retour au calme", 5, "Flottaison sur le dos avec frites, respiration lente ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Évaluation : à l'aise dans l'eau", o: "Montrer qu'on entre seul, qu'on met la tête sous l'eau, qu'on ramasse un objet et qu'on flotte sur le ventre et sur le dos.", comp: ["HME1", "GSS1", "GSS2", "GSS4"],
   crit: [["Entrer seul et se déplacer", 3, "3 : entre seul par l'échelle ou assis au bord et traverse la zone sans se tenir · 2 : se tient au bord ou à un camarade par moments · 1 : a besoin d'aide pour entrer"], ["Tête sous l'eau en soufflant (5 s)", 4, "4 : toute la tête 5 s en soufflant par la bouche et le nez · 3 : 3 s · 2 : jusqu'aux yeux seulement · 0 : refuse"], ["Objet au fond, yeux ouverts", 4, "4 : ramasse l'objet du premier coup, yeux ouverts · 2 : en plusieurs essais ou yeux fermés · 0 : n'y arrive pas"], ["Flotter sur le ventre 5 s et se relever", 5, "5 : étoile de mer 5 s sans aide, visage dans l'eau, se relève seul · 3 : avec une planche · 1 : avec frite ou aide du prof"], ["Flotter sur le dos 5 s et se relever", 4, "4 : 5 s sans aide, oreilles dans l'eau, se relève seul · 2 : avec une frite · 1 : avec aide du prof"]],
   e: [
    ["Entrée et échauffement", 6, "Entrée par l'échelle, une largeur en marchant, 10 « ascenseurs » en soufflant, puis 3 « méduses » (flotter en boule 5 s) pour se mettre en confiance.", "piscine:sp:flotte"],
    ["Rappel des épreuves", 4, "Au bord : les 5 épreuves (on les a toutes travaillées), on passe par deux, le partenaire compte les secondes.", "explication"]],
   c: [["Épreuve 1 : entrer, se déplacer, tête sous l'eau", 8, "Entrée seul, traversée de la zone sans se tenir, puis tête sous l'eau 5 s en soufflant (le partenaire compte).", "J'entre seul et je reste 5 s sous l'eau.", "", "piscine:sp:flotte"],
    ["Épreuve 2 : l'objet au fond", 6, "Ramasser un objet lesté posé au fond (eau à la poitrine), 2 essais.", "Je ramasse l'objet les yeux ouverts.", "", "piscine:sp:flotte"],
    ["Épreuve 3 : flotter ventre et dos", 11, "Étoile de mer 5 s sur le ventre, se relever ; puis 5 s sur le dos, se relever. 2 essais pour chaque, on garde le meilleur.", "Je flotte 5 s et je me relève seul.", "", "piscine:sp:flotte"]],
   r: [["Bilan", 5, "Chacun dit ce qu'il a réussi pour la première fois ; sortie et comptage.", "explication"]]},
  {t: "La flèche : glisser sur le ventre", o: "Pousser au mur et glisser bras tendus, visage dans l'eau, le plus loin possible.", e: [
    ["Entrée et bulles", 5, "Entrée, marche, 10 ascenseurs, 3 étoiles de mer.", "piscine:sp:flotte"],
    ["La position de la flèche", 5, "Debout : bras tendus au-dessus de la tête, mains l'une sur l'autre, oreilles entre les bras. On garde la position et on se penche jusqu'à avoir le visage dans l'eau.", "piscine:sp:flotte"]],
   c: [["Flèche depuis le fond", 8, "Debout, on pousse sur les pieds vers l'avant, on se met en flèche visage dans l'eau, on glisse et on se remet debout. 8 fois.", "Je glisse en flèche et je me remets debout seul.", "Le partenaire tire doucement par les mains.", "piscine:sp:plongeon"],
    ["Flèche au mur", 10, "Dos au mur, un pied contre le mur, on se penche en flèche et on pousse fort : on glisse le plus loin possible. Le partenaire marque l'arrivée avec un objet au fond.", "Je glisse 3 m.", "Avec une planche tenue bras tendus.", "piscine:sp:plongeon"],
    ["Le concours de flèches", 7, "Par équipes de 4 : chacun fait sa meilleure flèche, on additionne les distances (repères au fond tous les mètres).", "J'améliore ma distance à mon 2e essai.", "", "piscine:sp:relais"]],
   r: [["Flottaison", 5, "Étoile de mer sur le dos ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Battements avec planche", o: "Avancer avec des battements de jambes tendues en soufflant dans l'eau.", e: [
    ["Entrée et flèches", 5, "Entrée par l'échelle, une largeur en marchant, puis 5 flèches au mur visage dans l'eau, en se remettant debout seul à chaque fois.", "piscine:sp:plongeon"],
    ["Battements au bord", 5, "Tenant le bord, allongé : battements jambes tendues, pieds en extension (« comme des palmes »), petits et rapides. 4 × 15 secondes, visage dans l'eau quand on souffle.", "piscine:sp:flotte"]],
   c: [["Planche bras tendus", 10, "Planche tenue au bout, bras tendus : battements sur 4 × 10 m, visage dans l'eau, on lève la tête pour inspirer quand on en a besoin.", "Je fais 10 m avec la planche sans m'arrêter.", "Planche sous le ventre, ou frite sous les bras.", "piscine:sp:aller"],
    ["Le train", 8, "Par 3 : le premier tient la planche, les autres tiennent les chevilles de celui de devant ; seul le dernier bat des jambes, puis on change de place.", "Je fais avancer le train avec mes battements.", "", "piscine:sp:flotte"],
    ["Relais planche", 7, "Équipes de 4 : chacun fait 10 m en battements avec planche et donne la planche au suivant.", "Je garde les jambes tendues pendant mon relais.", "", "piscine:sp:relais"]],
   r: [["Retour au calme", 5, "Flottaison sur le dos avec frite ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Les bras du crawl et la respiration", o: "Faire avancer son corps avec des bras alternés et respirer en tournant la tête.", e: [
    ["Entrée et battements", 5, "Entrée par l'échelle, puis 2 × 10 m de battements avec planche bras tendus, visage dans l'eau, en soufflant.", "piscine:sp:aller"],
    ["Bras debout", 5, "Debout, buste penché, visage dans l'eau : bras de crawl en alternance (la main entre devant, pousse l'eau jusqu'à la cuisse, ressort). On souffle dans l'eau, on tourne la tête sur le côté pour inspirer.", "piscine:sp:flotte"]],
   c: [["Crawl en marchant", 8, "On marche en faisant les bras de crawl, visage dans l'eau, on tourne la tête pour respirer tous les 2 bras. 4 × 10 m.", "Je tourne la tête sur le côté pour respirer, sans la lever devant.", "", "piscine:sp:flotte"],
    ["Rattrapé avec planche", 10, "Planche tenue devant : battements, un bras tire jusqu'à la cuisse et revient sur la planche, puis l'autre. 4 × 10 m.", "Je fais 10 m en rattrapé.", "Avec une frite sous les bras.", "piscine:sp:aller"],
    ["Crawl avec frite", 7, "Frite sous les bras (ou ceinture flottante) : crawl complet sur 10 m.", "Je nage 10 m avec la frite en faisant bras et jambes.", "Sans frite pour les plus à l'aise.", "piscine:sp:aller"]],
   r: [["Flottaison", 5, "Étoile de mer sur le dos ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Le dos : battements et flèche dorsale", o: "Glisser et avancer sur le dos avec des battements, oreilles dans l'eau.", e: [
    ["Entrée et rappel", 5, "Entrée, 3 étoiles de mer sur le dos, se redresser à chaque fois.", "piscine:sp:flotte"],
    ["Planche sur le ventre", 5, "Sur le dos, planche serrée contre le ventre, frite sous la nuque si besoin : battements sur place puis en avançant.", "piscine:sp:flotte"]],
   c: [["Flèche dorsale", 8, "Dos au mur, mains au bord, pieds au mur : on pousse, on s'allonge sur le dos, bras le long du corps, et on glisse. 6 fois.", "Je glisse sur le dos 2 m et je me redresse seul.", "Le partenaire soutient la nuque.", "piscine:sp:plongeon"],
    ["Battements sur le dos", 10, "Flèche dorsale puis battements, bras le long du corps, ventre en haut : 4 × 10 m. Les genoux ne sortent pas de l'eau.", "Je fais 10 m de battements sur le dos.", "Planche sur le ventre ou frite sous la nuque.", "piscine:sp:aller"],
    ["Les bateaux", 7, "Par deux : l'un flotte sur le dos sans bouger, l'autre le pousse doucement par les pieds (« le bateau ») ; puis le bateau bat des jambes tout seul.", "Je reste allongé et détendu sur le dos.", "", "piscine:sp:flotte"]],
   r: [["Retour au calme", 5, "Flottaison sur le dos, respiration lente ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Nager 12,5 m sans aide", o: "Enchaîner flèche, battements et bras pour nager 12,5 m sans aide, sur le ventre et sur le dos.", e: [
    ["Entrée et flèches", 5, "Entrée, 3 flèches ventrales, 3 flèches dorsales.", "piscine:sp:plongeon"],
    ["Battements", 5, "2 × 10 m planche ventrale, 2 × 10 m sur le dos.", "piscine:sp:aller"]],
   c: [["Flèche et nage", 8, "Flèche au mur puis crawl (ou battements bras tendus) jusqu'à la ligne des 5 m, puis 8 m, puis 12,5 m. On se remet debout à chaque repère.", "J'atteins le repère des 8 m sans aide.", "Avec une planche.", "piscine:sp:aller"],
    ["12,5 m ventre et dos", 10, "12,5 m sur le ventre (comme on peut, sans aide, sans toucher le fond), repos, puis 12,5 m sur le dos en battements.", "Je nage 12,5 m sans m'arrêter.", "Avec une frite pour l'un des deux.", "piscine:sp:aller"],
    ["Relais des 12,5 m", 7, "Équipes de 4 : relais en 12,5 m, nage au choix, départ quand le précédent touche le mur.", "Je nage mon relais sans m'arrêter.", "", "piscine:sp:relais"]],
   r: [["Flottaison", 5, "Étoile de mer sur le dos 30 s en respirant lentement ; sortie par l'échelle et comptage des élèves.", "piscine:sp:flotte"]]},
  {t: "Évaluation : se déplacer dans l'eau", o: "Montrer flèche, battements, nage ventrale et dos sans aide.", comp: ["HME1", "GSS1", "GSS2", "GSS4"],
   crit: [["Flèche ventrale", 4, "4 : pousse au mur et glisse 3 m bras tendus, visage dans l'eau · 2 : 1,5 m ou tête levée · 1 : ne glisse pas"], ["Battements avec planche 15 m", 4, "4 : 15 m jambes tendues sans arrêt, souffle dans l'eau · 2 : 10 m ou genoux pliés · 1 : moins de 5 m"], ["12,5 m sur le ventre sans aide", 6, "6 : 12,5 m sans aide ni appui, respiration sur le côté · 4 : 12,5 m en levant la tête · 2 : 8 m · 1 : 5 m"], ["10 m sur le dos", 4, "4 : 10 m de battements sur le dos sans aide · 2 : avec une planche · 1 : avec frite ou aide"], ["Se remettre debout seul", 2, "2 : se redresse seul depuis le ventre et depuis le dos · 1 : depuis une seule position · 0 : a besoin d'aide"]],
   e: [
    ["Entrée et échauffement", 6, "Entrée par l'échelle, 3 flèches au mur, puis 2 × 10 m de battements avec planche en soufflant dans l'eau.", "piscine:sp:aller"],
    ["Rappel des épreuves", 4, "Au bord : ordre de passage par deux, ce qui est observé, le partenaire marque les distances.", "explication"]],
   c: [["Épreuve 1 : flèche et battements", 8, "Flèche au mur (2 essais, distance marquée), puis 15 m de battements avec planche.", "Je glisse 3 m et je fais 15 m de battements.", "", "piscine:sp:plongeon"],
    ["Épreuve 2 : 12,5 m sur le ventre", 9, "12,5 m sans aide ni appui, nage ventrale au choix.", "Je nage 12,5 m sans m'arrêter.", "", "piscine:sp:aller"],
    ["Épreuve 3 : 10 m sur le dos", 8, "Flèche dorsale et 10 m de battements sur le dos, puis se remettre debout.", "Je nage 10 m sur le dos et je me redresse seul.", "", "piscine:sp:aller"]],
   r: [["Bilan", 5, "Chacun compare avec la leçon 1 : de la marche à 12,5 m ! Sortie et comptage.", "explication"]]},
  {t: "Sauter dans l'eau", o: "Sauter dans l'eau depuis le bord, remonter et rejoindre le bord seul.", e: [
    ["Entrée et nage", 5, "Entrée par l'échelle, puis 2 × 12,5 m dans sa nage la plus facile (ventre ou dos), sans aide, repos au bord entre les deux.", "piscine:sp:aller"],
    ["Remonter seul", 5, "En petite profondeur : s'accroupir au fond en soufflant, puis se laisser remonter et se remettre debout ou en étoile de mer.", "piscine:sp:flotte"]],
   c: [["Sauts en petite profondeur", 8, "Assis au bord, on se laisse glisser ; puis accroupi ; puis debout, saut pieds joints. On se remet debout ou on flotte. 6 sauts, un élève à la fois par place.", "Je saute debout et je me remets debout seul.", "En tenant la main du prof.", "piscine:sp:plongeon"],
    ["Saut et nage", 10, "Saut debout, puis 5 m de nage jusqu'à la ligne ou l'échelle. 6 fois.", "J'enchaîne saut et nage sans m'arrêter.", "Saut avec une frite.", "piscine:sp:aller"],
    ["Saut vers le tapis", 7, "Saut, remonter, nager 3 m jusqu'au tapis flottant et s'y hisser. Puis tapis un peu plus loin.", "J'atteins le tapis seul après le saut.", "", "piscine:sp:flotte"]],
   r: [["Flottaison", 5, "Étoile de mer sur le dos 30 s en respirant lentement ; sortie par l'échelle et comptage des élèves.", "piscine:sp:flotte"]]},
  {t: "Découvrir la grande profondeur", o: "Se déplacer le long du bord en grande profondeur et lâcher le bord quelques secondes.", comp: ["HME1", "HME4", "GSS2"], e: [
    ["Entrée et nage", 5, "Entrée en petite profondeur, 2 × 12,5 m nage au choix.", "piscine:sp:aller"],
    ["Surplace avec frite", 5, "En petite profondeur, frite sous les bras : pédaler (comme à vélo) et faire la godille (mains en 8) sans toucher le fond.", "piscine:sp:flotte"]],
   c: [["Le singe", 8, "En grande profondeur, mains au bord : se déplacer en « singe » le long du bord sur toute la largeur, puis revenir. Le prof est au bord, la perche à la main.", "Je fais toute la largeur en grande profondeur en me tenant au bord.", "Avec une frite en plus.", "piscine:sp:flotte"],
    ["Lâcher le bord", 10, "Avec frite sous les bras : lâcher le bord, faire du surplace 10 s, revenir. Puis sans frite : lâcher le bord 3 s, 5 s, et le reprendre.", "Je lâche le bord 5 s sans frite et je le reprends calmement.", "Garder la frite.", "piscine:sp:flotte"],
    ["Flotter en grande profondeur", 7, "Tenant le bord d'une main : étoile de mer sur le dos, puis on lâche 5 s et on reprend le bord.", "Je flotte sur le dos en grande profondeur.", "Avec frite sous la nuque.", "piscine:sp:flotte"]],
   r: [["Retour en petite profondeur", 5, "Retour par le bord, flottaison détente ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Nager 25 m en crawl", o: "Nager 25 m sans aide en respirant sur le côté.", e: [
    ["Entrée et nage", 5, "Entrée par l'échelle, puis 2 × 12,5 m dans sa nage la plus facile (ventre ou dos), sans aide, repos au bord entre les deux.", "piscine:sp:aller"],
    ["Bulles et rotation", 5, "Tenant le bord : souffler dans l'eau, tourner la tête sur le côté pour inspirer, l'oreille reste dans l'eau. 10 fois.", "piscine:sp:flotte"]],
   c: [["Battements sur le côté", 8, "Un bras tendu devant, l'autre le long de la cuisse : battements, tête qui tourne pour respirer. 4 × 12,5 m.", "Je respire sur le côté sans m'arrêter.", "Planche dans la main tendue.", "piscine:sp:aller"],
    ["Crawl 12,5 m puis 25 m", 12, "2 × 12,5 m crawl en respirant sur le côté, puis 25 m (repos au milieu permis au début : on se tient à la ligne d'eau, pas au fond).", "Je nage 25 m de crawl sans m'arrêter.", "Avec palmes ou pull-buoy.", "piscine:sp:aller"],
    ["Le défi des 25 m", 5, "Chacun tente 25 m sans s'arrêter ; le partenaire marche au bord et l'encourage.", "Je réussis les 25 m.", "", "piscine:sp:aller"]],
   r: [["Flottaison", 5, "Étoile de mer sur le dos 30 s en respirant lentement ; sortie par l'échelle et comptage des élèves.", "piscine:sp:flotte"]]},
  {t: "Sauter en grande profondeur et revenir au bord", o: "Sauter en grande profondeur, remonter, s'orienter et nager jusqu'au bord.", comp: ["HME1", "HME4", "GSS2"], e: [
    ["Entrée et nage", 5, "Entrée par l'échelle, puis 2 × 25 m dans sa nage la plus facile, à allure lente, repos au bord entre les deux.", "piscine:sp:aller"],
    ["Rappel au bord de la grande profondeur", 5, "Mains au bord : 2 largeurs en singe, puis lâcher le bord 10 s en surplace.", "piscine:sp:flotte"]],
   c: [["Saut assis puis debout", 10, "En grande profondeur, le prof au bord avec la perche : saut assis, remonter, attraper le bord (1 m). Puis saut debout. Un élève à la fois.", "Je saute, je remonte et j'attrape le bord seul.", "Saut à côté de la perche tendue.", "piscine:sp:plongeon"],
    ["Saut et 5 m", 10, "Saut debout, remonter, regarder le prof, nager 5 m jusqu'à l'échelle. 4 fois.", "Je rejoins l'échelle sans aide.", "Rejoindre le bord (1 m).", "piscine:sp:aller"],
    ["Saut, surplace et bord", 5, "Saut, 10 s de surplace (le partenaire compte au bord), retour au bord.", "Je tiens 10 s sur place après le saut.", "", "piscine:sp:flotte"]],
   r: [["Flottaison", 5, "Étoile de mer en petite profondeur ; sortie et comptage.", "piscine:sp:flotte"]]},
  {t: "Enchaîner : saut, 25 m, surplace", o: "Enchaîner les gestes de l'évaluation finale et repérer ce qu'il reste à travailler.", e: [
    ["Entrée et nage", 5, "Entrée par l'échelle, puis 2 × 25 m dans sa nage la plus facile, à allure lente, repos au bord entre les deux.", "piscine:sp:aller"],
    ["Rappel des épreuves", 5, "Au bord : les épreuves du test de passage dans le groupe nageurs (saut en grande profondeur et retour au bord, 25 m, surplace 15 s, flottaison sur le dos 10 s).", "explication"]],
   c: [["Test blanc", 15, "Par deux, chacun passe le test complet ; le partenaire coche ce qui est réussi sur une fiche.", "Je sais ce que je réussis déjà.", "", "piscine:sp:aller"],
    ["Ateliers au choix", 10, "Chacun va à l'atelier de ce qu'il doit encore travailler : saut (grande profondeur), 25 m (couloir), surplace (bord), dos (petite profondeur).", "Je progresse sur mon point faible.", "", "piscine:sp:flotte"]],
   r: [["Bilan", 5, "Chacun dit ce qu'il lui reste à réussir pour la prochaine fois ; sortie et comptage.", "explication"]]},
  {t: "Évaluation : test de passage vers le groupe nageurs", o: "Montrer saut en grande profondeur, 25 m, surplace et flottaison sur le dos.", comp: ["HME1", "GSS1", "GSS2", "GSS4"],
   crit: [["Saut en grande profondeur et retour au bord", 5, "5 : saute debout, remonte, s'oriente et nage 5 m jusqu'au bord · 3 : rejoint le bord tout proche (1 m) · 1 : saute à côté de la perche ou avec aide"], ["25 m sans arrêt", 7, "7 : 25 m sans arrêt ni appui, respiration sur le côté · 5 : 25 m en levant la tête · 3 : 25 m avec un arrêt à la ligne · 1 : 12,5 m"], ["Surplace 15 s", 4, "4 : 15 s en grande profondeur sans s'accrocher · 2 : 5 à 10 s · 0 : moins de 5 s"], ["Flotter sur le dos 10 s", 4, "4 : 10 s sans aide, oreilles dans l'eau · 2 : 5 s · 1 : avec frite"]],
   e: [
    ["Entrée et échauffement", 6, "Entrée par l'échelle, puis 2 × 25 m dans sa nage la plus facile, à allure lente, repos au bord entre les deux.", "piscine:sp:aller"],
    ["Rappel des épreuves", 4, "Au bord : ordre de passage, ce qui est observé ; réussir le test = rejoindre le groupe nageurs.", "explication"]],
   c: [["Épreuve 1 : saut et retour au bord", 8, "Saut debout en grande profondeur, remonter, nager 5 m jusqu'à l'échelle. Le prof est au bord avec la perche.", "Je reviens au bord seul.", "", "piscine:sp:plongeon"],
    ["Épreuve 2 : 25 m", 9, "25 m sans aide, nage au choix, sans toucher le fond ni la ligne d'eau.", "Je nage 25 m sans m'arrêter.", "", "piscine:sp:aller"],
    ["Épreuve 3 : surplace et dos", 8, "15 s de surplace en grande profondeur près du bord, puis 10 s d'étoile de mer sur le dos.", "Je tiens 15 s et je flotte 10 s.", "", "piscine:sp:flotte"]],
   r: [["Bilan", 5, "Chacun apprend s'il passe dans le groupe nageurs ; ceux qui n'ont pas tout réussi savent ce qu'il leur reste. Sortie et comptage.", "explication"]]}
 ]};
PREPA_ADD({id: 'natdeb', sport: 'Natation débutants', mat: SEQ.mat, an: {1: SEQ, 2: SEQ, 3: SEQ, 4: SEQ, 5: SEQ, 6: SEQ}});
})();
