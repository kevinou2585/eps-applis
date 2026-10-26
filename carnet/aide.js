/* ====== Aide du Carnet : bouton « Aide » dans la barre du haut (entre l'année et « Cet appareil ») ======
   Le texte est dans CARNET_AIDE (repris tel quel par le guide PDF pour les collègues).
   Chaque partie = {ic, t, intro?, pts: [[titre, texte]]} ; le texte peut contenir <b>. */
window.CARNET_AIDE = [
  {ic: '🚀', t: 'Mettre en route (une seule fois)', intro: 'Dans l\'ordre, compte 15 minutes. Les étapes 3 à 5 se font sur un ordinateur.', pts: [
    ['1. Installer l\'appli', 'Ouvre le lien d\'EPS ultime dans <b>Safari</b> (iPhone) ou <b>Chrome</b> (Android), pas depuis WhatsApp ou un mail. Touche « Ouvrir l\'appli EPS ultime », puis Partager › <b>Sur l\'écran d\'accueil</b> (Android : menu ⋮ › Installer l\'application). Ouvre ensuite l\'appli par son icône et entre le code de l\'école.'],
    ['2. Ouvrir le Carnet', 'Touche la grande tuile <b>Carnet EPS</b> et entre le code du Carnet. Tu peux d\'abord essayer avec la <b>classe d\'exemple</b>, puis la supprimer.'],
    ['3. Créer le tableau Google', 'Sur ordinateur, connecté à ton compte Google, ouvre <b>sheets.new</b> : un tableau vide se crée sur ton Drive. Nomme-le « Carnet EPS ».'],
    ['4. Coller le script', 'Dans ce tableau : <b>Extensions › Apps Script</b>. Efface tout, puis colle le script de la page <b>carnet/google/</b> (bouton « Copier le script »). 💾 Enregistrer. Rien à modifier dedans.'],
    ['5. Déployer le script', '<b>Déployer › Nouveau déploiement</b>, roue dentée › <b>Application Web</b>. Exécuter en tant que : <b>Moi</b>. Qui a accès : <b>Tout le monde</b>. Déployer, puis autoriser l\'accès (si Google prévient « application non validée » : Paramètres avancés › Accéder, c\'est ton propre script). Copie l\'adresse qui finit par <b>/exec</b> et envoie-la-toi.'],
    ['6. Relier le Carnet au Drive', 'Sur ton téléphone : ⚙️ Réglages › <b>Sauvegarde</b> › Google Drive. Colle l\'adresse, garde le code proposé et touche <b>Lier à mon Google Drive</b>. Le code est aussi écrit dans l\'onglet « Lisez-moi » du tableau. À partir de là, chaque changement part tout seul sur ton Drive.'],
    ['7. Créer tes classes', 'Onglet <b>Classes › + Nouvelle classe</b> : le nom (ex. 3B) et la liste des élèves collée depuis Smartschool ou Excel, un élève par ligne (nom puis prénom). Les périodes sont créées toutes seules : vérifie leurs dates dans Réglages › Périodes.'],
    ['8. Remplir ton horaire', 'Onglet <b>Agenda</b> : touche une heure libre et choisis la ou les classes (plusieurs = groupe mixte). C\'est ta semaine type : chaque semaine pareil. Tu peux aussi le faire dans Réglages › Horaire.']
  ]},
  {ic: '✅', t: 'Présences : l\'appel', intro: 'L\'écran du cours en cours. Le carnet ouvre tout seul le bon cours d\'après ton horaire.', pts: [
    ['Présence', 'Un toucher sur la case = <b>absent</b>, puis <b>retard</b>, puis <b>dispensé</b> (là mais ne fait pas cours), puis de nouveau présent.'],
    ['Tenue', 'Le t-shirt : un toucher = <b>oubli de tenue</b>. À la piscine : maillot oublié ou « ne nage pas ».'],
    ['Attitude', 'Le pouce : 1er toucher = <b>perturbe</b>, 2e = <b>exclu du cours</b>, 3e = annuler. Les points retirés suivent ton barème (Réglages › Barème).'],
    ['Règles', 'Chez les filles, en salle comme à la piscine : <b>R · règles</b> = elle ne participe pas (ne nage pas) à cause de ses règles. C\'est une trace datée, sans point retiré ; un avertissement apparaît à partir de la 2e fois de suite.'],
    ['Alertes', 'Au 3e oubli ou à la 3e perturbation de la période, un bandeau prévient à l\'appel et dans la fiche de l\'élève.'],
    ['Travail', 'Sous un élève qui ne fait pas le cours (absent, dispensé, oubli, ne nage pas, règles, perturbe) : <b>📝 Travail</b> = tu lui as donné un travail. Au cours de la semaine suivante, un rappel propose <b>✓ Remis</b> (rien n\'est retiré), <b>+1 semaine</b> ou <b>Zéro</b> : −1 point de tenue (en attitude s\'il n\'en reste plus). Chaque choix s\'annule.'],
    ['Ce cours', 'En bas : la même fiche que dans l\'Agenda (sport, prévu au planning, programme, 📋 sélectionner une préparation, ▶ Lancer la prépa et 🎤 Dicter, puis <b>ce que tu as fait</b> : la prépa choisie s\'y écrit en 1re ligne et change si tu en choisis une autre). Ce que tu changes ici change aussi dans l\'Agenda, à la bonne date.'],
    ['Piscine : éducateurs', 'Le message à copier ou à envoyer sur WhatsApp liste ceux qui restent à l\'école (affaires oubliées, ne nage pas, règles, dispensés) et les <b>absents</b>.'],
    ['Autre cours', '« + Autre » : faire l\'appel d\'un cours qui n\'est pas dans l\'horaire (remplacement, cours déplacé).'],
    ['Fiche d\'un élève', 'Touche son nom : son bulletin, tout son historique daté, ses certificats médicaux.']
  ]},
  {ic: '📅', t: 'Agenda et prépas', pts: [
    ['Semaine type', 'Vue <b>Jour</b> ou <b>Semaine</b>. Touche un cours pour faire l\'appel et noter le sport ; touche une heure libre pour ajouter un cours.'],
    ['Préparer un cours', 'Dans un cours, le bouton 📋 ouvre la prépa : choisis le sport et la leçon dans la <b>bibliothèque</b> (une séquence par sport et par année), ou écris la tienne. Objectif, échauffement, corps de leçon, retour au calme, avec schémas.'],
    ['Cycles', 'Chaque séquence va par cycles de <b>6 leçons</b> : 5 leçons puis une <b>évaluation 🎯</b> avec sa grille de critères. « Commencer le cycle suivant » enchaîne sur le cycle d\'après.'],
    ['Évaluation depuis la prépa', 'Sur la leçon 🎯, le bouton « Noter cette évaluation » crée l\'évaluation dans la classe avec la grille toute prête. Elle apparaît ensuite dans l\'onglet Évaluation et compte dans le bulletin.'],
    ['Préparations', '📚 <b>Préparations</b>, onglet <b>Mes prépas</b> : imprimer ou faire un PDF de tes prépas (choisis les dates et les classes), une séquence vierge de la bibliothèque, ou le <b>recueil complet</b> pour une farde. L\'en-tête (école, professeur, logo) se règle au même endroit.'],
    ['La bibliothèque', '📚 Préparations › <b>Bibliothèque</b> : toutes les leçons toutes faites, par sport et par année, à lire, à imprimer (une leçon ou toute la séquence) ou à lancer en mode guidé. Choisis la durée (1 h ou 2 h) : les minutes s\'adaptent. Dans la liste des sports, <b>Sports divers</b> : corde à sauter et lutte (un cycle de 6 leçons, le même pour toutes les années), puis des sports et jeux complets en une seule leçon (tchoukball, kin-ball, ultimate, gaga ball…), pour la petite salle ou les jours sans installation.'],
    ['Lancer la prépa', 'Dans un cours, à gauche de 🎤 Dicter : <b>▶ Lancer la prépa</b>. Plein écran : d\'abord la mise en place (matériel, déroulé, schémas), puis chaque exercice avec un <b>minuteur</b>, le schéma, la réussite et la variante. Bip 30 s avant la fin et au changement d\'exercice, l\'écran reste allumé. Sans prépa, tu choisis une leçon de la bibliothèque (la suivante du cycle est proposée) : elle est enregistrée pour ce cours. À la fin, tu peux noter le bilan.'],
    ['Le temps de cours', '1 h = 50 min, dont 7 min de vestiaires avant et après : <b>36 min</b> de cours. 2 h : <b>86 min</b>. Piscine : bus et vestiaires, <b>40 min</b> dans l\'eau sur 2 h. Les minutes des leçons de la bibliothèque sont adaptées au temps du cours : l\'échauffement et le retour au calme bougent peu, le corps de leçon prend le reste.'],
    ['Planning de l\'année', '📅 <b>Planning</b> : touche une case pour prévoir un sport à une classe sur une ou plusieurs semaines. Le sport prévu est proposé à l\'appel, rien n\'est imposé.']
  ]},
  {ic: '📝', t: 'Évaluation', intro: 'Choisis la classe (ou le groupe qui a cours ensemble) et la période.', pts: [
    ['Nouvelle évaluation', '<b>+ Nouvelle évaluation</b> : un nom, « sur combien », la date. <b>Certificative</b> = compte dans le bulletin ; <b>formative</b> = pour info. Ensuite, note chaque élève (notes à virgule si tu veux).'],
    ['Endurance', 'Type <b>🏃 Endurance</b> : un compteur de tours. Tu touches le nom de l\'élève à chaque tour ; la note se calcule toute seule (tours faits / objectif). Une alerte prévient à une minute de la fin.'],
    ['Fin de cycle (grille)', '<b>🎯 Fin de cycle</b> : une grille de critères (ex. 4 critères sur 20). Tu touches les points de chaque critère, élève par élève ; la note se calcule et va dans le bulletin. Les grilles des séquences de la bibliothèque sont toutes prêtes, et tout se modifie.'],
    ['Dans le bulletin', 'Les évaluations certificatives de la période s\'additionnent pour faire le <b>savoir-faire</b> (40 % du bulletin par défaut, réglable dans Réglages › Barème).'],
    ['Modifier', 'Touche une évaluation pour changer une note, le barème ou la supprimer.']
  ]},
  {ic: '👥', t: 'Classes et bulletins', pts: [
    ['Élèves', 'La liste avec le pourcentage de chacun et ses absences, oublis et perturbations. Touche un élève pour sa <b>fiche complète</b> et son bulletin. ✏️ <b>Gérer les élèves</b> : ajouter, renommer, retirer.'],
    ['Suivi', 'Tenue et attitude de la période, avec les dates : la fiche à montrer à un parent ou à l\'éducateur. Jamais de notes d\'évaluation dedans.'],
    ['Bulletins', 'Savoir-être (sur 60) + savoir-faire (sur 40) = total en %, pour la période ou l\'année. Tri par nom, note, absences. 📝 <b>Commentaires bulletin</b> : un texte tout prêt par élève (savoir-être en % avec tenue et attitude, savoir-faire en % avec les évaluations, oublis, perturbations, exclusions), à modifier. <b>Bulletin Excel</b> prêt à imprimer. Boutons 📋 pour Skore : voir « Copier dans Skore ».'],
    ['Évaluations', 'Toutes les notes de la période d\'un coup d\'œil, un élève par ligne. Touche le titre d\'une colonne pour modifier ses notes.'],
    ['Certificats médicaux', 'Dans la fiche de l\'élève : <b>+ Ajouter un certificat</b>, prends-le en photo ; le carnet le redresse comme un scanner. Pendant ses dates, l\'élève est noté dispensé.'],
    ['Groupes', 'La case <b>Regrouper par groupes</b> réunit les classes qui ont cours ensemble (même heure dans ton horaire). Les bulletins restent séparés.'],
    ['Toutes les classes', '<b>Bulletin Excel de toutes les classes</b> : un fichier, un onglet par classe.']
  ]},
  {ic: '📤', t: 'Copier dans Skore (Smartschool)', intro: 'En fin de période, sur un ordinateur : le carnet copie, le favori « Remplir Skore » tape dans Skore à ta place.', pts: [
    ['1. Installer le favori (une fois)', 'Sur l\'ordinateur, dans Chrome ou Edge : ouvre le Carnet, ⚙️ Réglages › <b>Skore</b>. Affiche la barre des favoris (Ctrl+Maj+B) et fais <b>glisser</b> le bouton ⭐ Remplir Skore dedans. Sinon : « Copier le favori », clic droit sur la barre › Ajouter une page, URL : colle. Après une mise à jour du carnet, réinstalle-le.'],
    ['2. Savoir-faire et savoir-être', 'Classes › ta classe › <b>Bulletins</b> › « Copier pour Skore » : 📋 <b>Savoir-faire</b> ou 📋 <b>Savoir-être</b>. Indique sur combien est la colonne dans Skore : les notes sont converties. Touche <b>Copier pour Skore</b>.'],
    ['3. Une évaluation', 'Classes › ta classe › <b>Évaluations</b> › 📋 <b>Copier une évaluation pour Skore</b>, puis choisis l\'évaluation. Absent, dispensé ou certificat : la case reste vide.'],
    ['4. Taper les notes', 'Dans Skore, clique la case du <b>1er élève</b> de la colonne, puis le favori ⭐ <b>Remplir Skore</b>. Il tape les notes une à une, dans l\'ordre de Skore (nom de famille), et saute les lignes grises des classes. Vérifie, puis enregistre dans Skore.'],
    ['5. Les commentaires', 'Bulletins › 📋 <b>Copier les commentaires pour Skore</b> (sous « Commentaires bulletin »). Dans Skore, clique la case Commentaire du 1er élève : sa fenêtre s\'ouvre. Clique le favori. OK = remplacer ce qui est déjà écrit, Annuler = le garder. Il lit le nom de l\'élève, écrit son commentaire, touche Insérer et passe au suivant. Ne touche à rien jusqu\'au message de fin.'],
    ['Classes regroupées', 'Si la classe est ouverte en groupe (ex. 1G + 1H), tout est copié à la suite, classe par classe, comme dans Skore. Une seule classe ouverte : seulement elle.'],
    ['Si ça bloque', 'Le favori demande parfois d\'autoriser la lecture du presse-papiers : accepte. Sinon une petite fenêtre s\'ouvre : colle (Ctrl+V) et OK. Un élève de Skore qui n\'est pas dans le carnet est laissé tel quel.']
  ]},
  {ic: '⚙️', t: 'Réglages', intro: 'La roue dentée en haut à droite. Elle s\'ouvre sur la rubrique qui va avec l\'onglet où tu es.', pts: [
    ['Horaire et sports', 'Ta semaine type, et tes sports en plus de la liste de base (avec leur ordre).'],
    ['Barème', 'Points de tenue et d\'attitude par période, points retirés par oubli, perturbation et exclusion, part du savoir-être dans le bulletin (60 % par défaut). Chaque élève commence la période avec tous ses points.'],
    ['Piscine', '« Ne nage pas » retire ou non des points ; les règles ne coûtent jamais de point (salle et piscine).'],
    ['Évaluations', '« Sur combien » proposé, arrondi des notes d\'endurance, réglages du compteur de tours.'],
    ['Commentaires', 'Commentaire de bulletin automatique, ou cases vides que tu remplis toi-même.'],
    ['Skore', 'Le favori ⭐ Remplir Skore à installer sur l\'ordinateur (voir « Copier dans Skore »).'],
    ['Périodes', 'Le nom, la date de début et le lieu (salle ou piscine) de chaque période, classe par classe.'],
    ['Sauvegarde', '<b>Télécharger une copie</b> (un fichier) et <b>Google Drive</b> (copie automatique, voir « Sauvegarde et Drive »).']
  ]},
  {ic: '☁️', t: 'Sauvegarde et Drive', pts: [
    ['Où sont tes notes ?', 'Sur ton téléphone, dans l\'appli installée (pas dans le navigateur). Personne d\'autre ne les voit.'],
    ['Copie automatique', 'Relié au Drive, le carnet envoie chaque changement quelques secondes après, même plus tard si tu n\'as pas de réseau. Le tableau Google a un onglet par classe (périodes et année) et un onglet « Prépas » : lisible, imprimable, téléchargeable en Excel.'],
    ['Plusieurs appareils', 'Sur un ordinateur ou une tablette : ouvre le Carnet, mets la même adresse et le même code. Les deux appareils se mettent à jour l\'un l\'autre, classe par classe.'],
    ['Nouveau téléphone', 'Installe l\'appli, ouvre le Carnet, Réglages › Sauvegarde › Google Drive : même adresse, même code (onglet « Lisez-moi »). Tes classes reviennent toutes seules. Ou bien « Restaurer une copie » avec ton fichier.'],
    ['Sauvegarde complète', 'Dans l\'accueil d\'EPS ultime, ⚙️ Paramètres › 💾 Sauvegarde complète : un fichier .zip avec l\'appli et toutes tes données (protégé par un code).']
  ]},
  {ic: '🗓', t: 'Année scolaire', pts: [
    ['Le bouton de l\'année', 'En haut, à côté du titre (ex. 2026-2027). Une année à la fois.'],
    ['Nouvelle année', 'En fin d\'année, choisis la suivante : l\'ancienne est rangée dans les archives (tu peux y revenir quand tu veux) et tu repars d\'un carnet vide, en gardant tes réglages de barème.']
  ]},
  {ic: '💡', t: 'Bon à savoir', pts: [
    ['Sans internet', 'Tout marche hors ligne, au gymnase comme à la piscine. Les envois au Drive partent au retour du réseau.'],
    ['Mises à jour', 'Les nouvelles versions arrivent toutes seules à l\'ouverture, sans rien effacer.'],
    ['Une seule appli', 'Utilise toujours l\'icône EPS ultime : chaque navigateur garde ses propres données.']
  ]}
];

(() => {
  const top = document.querySelector('header.top .wrap'); if (!top) return;   // page du guide PDF : seulement le texte
  const st = document.createElement('style');
  st.textContent = `.aide-btn{border:1px solid var(--line); background:var(--surface); color:var(--fg); border-radius:99px; padding:5px 10px; font:700 .85rem var(--body); white-space:nowrap}
.aide details{border:1px solid var(--line); border-radius:12px; background:var(--surface); margin:0 0 8px; padding:0 12px}
.aide summary{font-weight:700; padding:12px 0; cursor:pointer; list-style:none; display:flex; align-items:center; gap:8px}
.aide summary::-webkit-details-marker{display:none}
.aide summary::after{content:'▾'; margin-left:auto; color:var(--muted)}
.aide details[open] summary::after{content:'▴'}
.aide .ai-in{margin:0 0 8px; color:var(--muted); font-size:.9rem}
.aide dl{margin:0 0 12px}
.aide dt{font-weight:700; margin-top:10px}
.aide dd{margin:2px 0 0; line-height:1.45}
.aide a{color:var(--accent)}
@media (max-width:430px){ #sync>span{display:none} }`;
  document.head.appendChild(st);
  const b = document.createElement('button'); b.type = 'button'; b.className = 'aide-btn'; b.id = 'aide-btn'; b.textContent = 'Aide';
  b.setAttribute('aria-label', 'Aide : comment utiliser le Carnet');
  top.insertBefore(b, document.getElementById('sync'));
  b.onclick = () => {
    openSheet('Aide du Carnet', `<div class="aide">
      <p class="small muted" style="margin:0 0 10px">Touche une partie pour la déplier. Le script Google pour la sauvegarde : <a href="google/" target="_blank" rel="noopener">page du script</a>. Tout ceci en PDF à imprimer ou à envoyer : <a href="guide-carnet-eps.pdf" target="_blank" rel="noopener">guide du Carnet</a>.</p>
      ${CARNET_AIDE.map((s, i) => `<details${i === 0 && !S.classes.length ? ' open' : ''}><summary><span>${s.ic}</span>${s.t}</summary>
        ${s.intro ? `<p class="ai-in">${s.intro}</p>` : ''}<dl>${s.pts.map(([t, d]) => `<dt>${t}</dt><dd>${d}</dd>`).join('')}</dl></details>`).join('')}
    </div>`);
  };
})();
