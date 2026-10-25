/* Sport d'opposition · lutte (jeux divers) : un seul cycle de 6 leçons (5 + l'évaluation), le même pour toutes les années.
   Tapis de sol (4 à 6 zones de 2 m × 2 m), chasubles ou foulards, plots, chrono, fiches d'arbitrage.
   Règles de sécurité de tout le cycle : pas de coup, pas de clé, pas de prise au cou ni à la tête, on lâche dès que l'autre tape 2 fois ou dit « stop », pas de bijoux, ongles courts.
   e = échauffement, c = corps de leçon, r = retour au calme. [nom, minutes, consigne, (réussite, variante,) schéma] */
(() => {
const A = {th: 'Lutte : s\'opposer en sécurité, déséquilibrer, renverser et immobiliser, arbitrer', comp: ['HME1', 'HME3', 'HSC1', 'HSC3', 'GSS2', 'GSS3'], mat: 'Tapis de sol (4 à 6 zones de 2 m × 2 m), foulards ou chasubles, plots, chrono, fiches d\'arbitrage, fiches d\'évaluation.', l: [
  {t: 'Les règles de sécurité et le contact', o: 'Connaître et respecter les règles de sécurité de la lutte ; accepter le contact et le salut.', comp: ['HSC1', 'HSC3', 'GSS2'], e: [
    ['Les règles d\'or', 5, 'Assis au bord des tapis : on salue avant et après ; interdit : coups, clés, prises au cou ou à la tête, cheveux, vêtements tirés fort ; on lâche tout de suite si l\'autre tape 2 fois ou dit « stop ». Bijoux enlevés, ongles courts, pieds nus.', 'explication'],
    ['Déplacements à quatre pattes', 5, 'Sur les tapis : déplacements en quadrupédie avant, arrière, de côté ; puis « chat » à 4 pattes : le chat touche le dos des autres.', 'tapis::sol']],
   c: [['Le bernard-l\'ermite', 10, 'Par deux sur un tapis : A à 4 pattes (la « tortue »), B essaie de le retourner sur le dos en 20 s, sans le soulever et sans prise à la tête. On inverse ; on change de partenaire toutes les 2 reprises (gabarit proche).', 'Je résiste 20 s sans me faire retourner, ou je retourne mon partenaire en sécurité.', 'Partir à genoux face à face pour les plus craintifs.', 'tapis::sol'],
    ['Le crocodile', 10, 'Par deux à genoux, dos contre dos : au signal, se retourner et essayer de toucher les deux épaules de l\'autre au sol. 30 s par reprise.', 'Je respecte toutes les règles de sécurité pendant les reprises.', 'Toucher une seule épaule pour gagner.', 'tapis'],
    ['Le ramasse-foulards', 8, 'Chacun un foulard dans la ceinture, dans la zone des tapis : à genoux, attraper le foulard des autres sans protéger le sien avec les mains. Celui qui n\'a plus de foulard sort 20 s.', 'Je garde mon foulard plus de 30 s.', '', 'tapis::sol']],
   r: [['Retour au calme', 5, 'Salut du partenaire. Étirements du dos et des épaules ; rappel des règles d\'or par un élève.', 'etirements']]},
  {t: 'Pousser, tirer : sortir l\'autre de la zone', o: 'Garder son équilibre et faire sortir l\'adversaire d\'une zone en poussant ou en tirant avec tout le corps.', comp: ['HME1', 'HME3', 'HSC1'], e: [
    ['Rappel des règles', 3, 'Les règles d\'or redites par les élèves, montrer le salut et le « stop ».', 'explication'],
    ['Les sumos', 7, 'Par deux debout, mains sur les épaules de l\'autre : pousser doucement, puis plus fort, en gardant les jambes fléchies et le dos droit. Puis dos contre dos.', 'tapis::cercle']],
   c: [['Sortir du cercle', 12, 'Par deux dans un cercle (cerceau géant ou cercle de plots sur le tapis) : debout, saisie aux épaules ou aux bras, faire sortir l\'autre en poussant ou en tirant. 30 s, on change de partenaire.', 'Je fais sortir mon adversaire au moins une fois sur trois reprises.', 'À genoux pour les plus petits gabarits.', 'tapis::cercle'],
    ['La planche', 8, 'A est allongé sur le ventre, gainé ; B essaie de le retourner sur le dos en 15 s. Puis A à 4 pattes. On inverse.', 'Je reste gainé comme une planche et je résiste.', '', 'tapis::sol'],
    ['Le roi du tapis', 10, 'Groupes de 4 sur un tapis : à genoux, chacun essaie de faire sortir les autres. Le dernier sur le tapis gagne 1 point. Reprises de 45 s.', 'Je reste sur le tapis jusqu\'à la fin d\'une reprise.', '', 'tapis']],
   r: [['Retour au calme', 5, 'Salut. Étirements des jambes et des épaules ; qu\'est-ce qui aide à garder l\'équilibre ? (jambes fléchies, pieds écartés, centre bas).', 'etirements']]},
  {t: 'Déséquilibrer et renverser au sol', o: 'Renverser un adversaire à 4 pattes sur le dos en le faisant basculer, sans le soulever.', comp: ['HME1', 'HME3', 'GSS2'], e: [
    ['Roulades et chutes', 6, 'Sur les tapis : roulades avant, arrière, chute sur le côté en tapant le tapis avec le bras (pour amortir). Le prof montre la chute arrière, menton rentré.', 'tapis::sol'],
    ['Équilibres à deux', 4, 'Par deux à 4 pattes face à face : pousser épaule contre épaule sans tomber.', 'tapis::sol']],
   c: [['Les renversements', 12, 'Le prof montre 2 renversements : 1) saisir le bras et la jambe du même côté et tirer vers soi ; 2) passer le bras sous le ventre et faire rouler l\'autre sur l\'épaule. Par deux : 5 essais chacun, le partenaire se laisse faire puis résiste un peu.', 'Je réussis un renversement sans soulever mon partenaire.', 'Le partenaire reste à genoux, mains au sol, sans résister.', 'tapis::sol'],
    ['Combat au sol', 10, 'Départ : A à 4 pattes, B à genoux à côté. 30 s pour renverser A sur le dos. Arbitre : un 3e élève dit « allez », « stop » et compte les renversements.', 'Je marque un renversement en 30 s.', '', 'tapis::sol'],
    ['Petit tournoi', 8, 'Groupes de 3 par tapis (2 luttent, 1 arbitre) : 3 reprises de 30 s, on tourne les rôles.', 'J\'arbitre en disant clairement « allez » et « stop ».', '', 'tapis']],
   r: [['Retour au calme', 5, 'Salut. Étirements du dos (position de l\'enfant, chat-vache) ; rappel : on ne soulève jamais l\'autre.', 'etirements']]},
  {t: 'Immobiliser et se dégager', o: 'Maintenir un adversaire sur le dos 5 secondes (immobilisation) et savoir se dégager.', comp: ['HME1', 'HME3', 'HSC1', 'GSS2'], e: [
    ['Chutes et roulades', 5, 'Chutes sur le côté et en arrière en tapant le tapis ; roulades sur l\'épaule.', 'tapis::sol'],
    ['Le bernard-l\'ermite', 5, 'Rappel : par deux, 3 reprises de 20 s pour retourner la tortue.', 'tapis::sol']],
   c: [['L\'immobilisation', 12, 'Le prof montre : se mettre en travers du partenaire couché sur le dos, poitrine contre poitrine, un bras qui entoure son bras, l\'autre passé sous son épaule (jamais autour du cou ni de la tête). L\'arbitre compte 5 secondes. Par deux, 5 essais chacun.', 'Je tiens mon partenaire sur le dos 5 s sans prise au cou.', 'Tenir 3 s pour les débutants.', 'tapis::sol'],
    ['Se dégager', 10, 'A immobilise B ; B a 15 s pour se dégager en pont (pousser sur les pieds, rouler sur l\'épaule) ou en se retournant sur le ventre. On inverse.', 'Je me dégage au moins une fois sur trois.', 'A ne serre qu\'à moitié au début.', 'tapis::sol'],
    ['Renverser puis immobiliser', 8, 'Départ à 4 pattes / à genoux : renverser, puis immobiliser 5 s = 2 points ; renverser seulement = 1 point. Reprises de 45 s.', 'J\'enchaîne renversement et immobilisation.', '', 'tapis']],
   r: [['Retour au calme', 5, 'Salut. Étirements de la nuque (doucement), des épaules et du dos ; rappel des points.', 'etirements']]},
  {t: 'Combats arbitrés', o: 'Lutter en respectant les règles et arbitrer un combat (départ, points, arrêt, vainqueur).', comp: ['HSC1', 'HSC3', 'GSS3'], e: [
    ['Échauffement en duo', 6, 'Par deux : sumos debout, bernard-l\'ermite, chutes ; 1 minute chaque.', 'tapis::cercle'],
    ['Les règles du combat', 4, 'Au tableau : combat au sol, départ à genoux, 1 min 30 ; sortie de la zone = 1 point à l\'autre, renversement = 1 point, immobilisation 5 s = 2 points. L\'arbitre dit « allez », « stop » et le score.', 'explication']],
   c: [['Combats par poules', 18, 'Poules de 4 de gabarit proche par tapis : chacun lutte contre les 3 autres ; ceux qui ne luttent pas arbitrent et tiennent la fiche des points.', 'Je gagne au moins un combat ou je marque des points dans chaque combat.', 'Combat à genoux contre un partenaire coopérant pour les plus craintifs.', 'tapis'],
    ['Débriefing arbitrage', 7, 'Chaque poule montre une situation difficile à arbitrer ; la classe décide de la bonne décision.', 'J\'explique une décision d\'arbitrage avec la règle.', '', 'explication']],
   r: [['Retour au calme', 5, 'Salut collectif. Étirements ; chacun dit une règle de sécurité qu\'il a appliquée.', 'etirements']]},
  {t: 'Évaluation : combattre et arbitrer', o: 'Montrer renversement, immobilisation, dégagement en combat et un arbitrage juste, en respectant la sécurité.', comp: ['HME1', 'HME3', 'HSC1', 'HSC3', 'GSS2'], crit: [
    ['Renversement (3 essais, partenaire qui résiste un peu)', 5, '5 : 3 réussis, sans soulever · 4 : 2 · 2 : 1 · 0 : aucun'],
    ['Immobilisation 5 s', 4, '4 : tenue 5 s, sans prise au cou · 2 : moins de 5 s · 0 : non réussie'],
    ['Dégagement (2 essais)', 3, '3 : se dégage 2 fois · 2 : 1 fois · 1 : tente en pont ou en se retournant'],
    ['Combat : engagement et stratégie', 4, '4 : attaque, enchaîne renversement et immobilisation · 2 : surtout en défense · 1 : peu actif'],
    ['Sécurité, salut et arbitrage', 4, '4 : règles toujours respectées, arbitre juste et clair · 2 : un rappel · 0 : règle de sécurité non respectée']], e: [
    ['Échauffement', 6, 'Chutes, roulades, sumos et bernard-l\'ermite, 1 minute chaque, par deux de gabarit proche.', 'tapis'],
    ['Rappel des critères', 4, 'Au tableau : les 5 critères et les règles du combat.', 'explication']],
   c: [['Ateliers techniques', 12, 'Par deux devant le prof : 3 renversements, une immobilisation de 5 s, 2 dégagements. Les autres font des reprises libres sur les autres tapis.', 'Je montre chaque technique sans prise interdite.', '', 'tapis::sol'],
    ['Combats arbitrés', 15, 'Poules de 3 ou 4 : combats de 1 min 30, les élèves arbitrent ; le prof note l\'engagement, la sécurité et l\'arbitrage.', 'Je combats et j\'arbitre en respectant les règles.', '', 'tapis']],
   r: [['Retour au calme', 5, 'Salut collectif. Étirements ; chacun dit ce qu\'il retient du cycle.', 'etirements']]}
]};
PREPA_ADD({id: 'lutte', sport: 'Lutte (sport d\'opposition)', mat: A.mat, divers: true, an: {1: A, 2: A, 3: A, 4: A, 5: A, 6: A}});
})();
