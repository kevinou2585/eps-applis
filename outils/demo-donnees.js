#!/usr/bin/env node
/* Fabrique demo-carnet/donnees.js : le carnet fictif de la démo (élèves inventés, année 2026-2027 remplie jusqu'au 15 juin 2027).
   Le carnet est rempli par le vrai carnet (ses fonctions : bibliothèque de prépas, notes des grilles, compteur d'endurance…),
   ouvert dans Chromium avec Playwright. Tirages au sort à graine fixe : relancer redonne le même carnet.
     cd eps-applis && python3 -m http.server 8765 &   (puis)   python3 outils/demo.py && node outils/demo-donnees.js
   Horaire de 22 h : 14 classes (7 groupes de garçons, 7 de filles), 4 regroupements de deux classes, piscine le mardi. */
const fs = require('fs'), path = require('path'), {chromium} = require('playwright');
const RACINE = path.resolve(__dirname, '..'), SORTIE = path.join(RACINE, 'demo-carnet/donnees.js');
const URL = process.env.DEMO_URL || 'http://localhost:8765/demo-carnet/';
const VERSION = 'demo-2027-06-15-b';

function remplir(){
  /* ---------- tirages au sort reproductibles ---------- */
  let graine = 20270615;
  const rnd = () => { graine |= 0; graine = graine + 0x6D2B79F5 | 0; let t = Math.imul(graine ^ graine >>> 15, 1 | graine); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const pick = a => a[Math.floor(rnd() * a.length)];
  const melange = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--){ const j = Math.floor(rnd() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const borne = (x, a, b) => Math.max(a, Math.min(b, x));
  const TODAY = today(), MAINTENANT = 'H3';   // mardi 15 juin 2027, 10 h 20 : le cours de H3-H4 a commencé

  /* ---------- élèves inventés ---------- */
  const NOMS = ['Lambert', 'Dubois', 'Martin', 'Peeters', 'Janssens', 'Maes', 'Jacobs', 'Mertens', 'Willems', 'Claes', 'Goossens', 'Wouters', 'De Smet', 'Dumont', 'Leroy', 'Lejeune', 'Renard', 'Lemaire', 'Simon', 'Laurent', 'Hubert', 'Collin', 'Denis', 'Gilles', 'Lecomte', 'Fontaine', 'Mathieu', 'Henry', 'Noël', 'Michaux', 'Bertrand', 'Delvaux', 'Charlier', 'François', 'Thiry', 'Gérard', 'Pirard', 'Hardy', 'Masson', 'Marchal', 'Delhaye', 'Bodart', 'Gobert', 'Lefèvre', 'Mahieu', 'Close', 'Dethier', 'Lambotte', 'Rousseau', 'Moreau', 'Benali', 'El Amrani', 'Yilmaz', 'Kaya', 'Diallo', 'Mbala', 'Nkosi', 'Rossi', 'Esposito', 'Fernandes', 'Da Silva', 'Kowalski', 'Nowak', 'Popescu', 'Haddad', 'Bouzid', 'Van Damme', 'Vandenberghe', 'Verhaegen', 'Dupont', 'Germain', 'Piette', 'Lahaye', 'Struys', 'Sacré', 'Maréchal', 'Tilmant', 'Wauters', 'Baudoux', 'Collard'];
  const GARCONS = ['Lucas', 'Noah', 'Louis', 'Arthur', 'Jules', 'Adam', 'Liam', 'Victor', 'Gabriel', 'Hugo', 'Nathan', 'Mohamed', 'Ethan', 'Théo', 'Tom', 'Sacha', 'Eliott', 'Mathis', 'Rayan', 'Maxime', 'Simon', 'Antoine', 'Thomas', 'Bastien', 'Yanis', 'Ilyes', 'Nolan', 'Robin', 'Baptiste', 'Romain', 'Kylian', 'Elias', 'Amir', 'Samuel', 'Martin', 'Léon', 'Oscar', 'Milan', 'Diego', 'Malik', 'Enzo', 'Luca', 'Matteo', 'Florian', 'Corentin', 'Loïc', 'Aaron', 'Ismaël', 'Dylan', 'Quentin'];
  const FILLES = ['Emma', 'Olivia', 'Louise', 'Alice', 'Mila', 'Lina', 'Juliette', 'Léa', 'Chloé', 'Zoé', 'Camille', 'Sarah', 'Inès', 'Manon', 'Nora', 'Elena', 'Lucie', 'Clara', 'Jade', 'Anna', 'Romane', 'Margaux', 'Pauline', 'Charlotte', 'Eva', 'Yasmine', 'Lola', 'Maëlle', 'Noémie', 'Victoria', 'Amélie', 'Julie', 'Laura', 'Salma', 'Imane', 'Aya', 'Fatima', 'Elif', 'Maya', 'Giulia', 'Sofia', 'Hanna', 'Elisa', 'Louna', 'Anaïs', 'Célia', 'Ambre', 'Lisa', 'Océane', 'Marie'];
  const pris = new Set();
  const nomUnique = g => { for (;;){ const n = pick(NOMS).toUpperCase() + ' ' + pick(g === 'F' ? FILLES : GARCONS); if (!pris.has(n)){ pris.add(n); return n; } } };

  /* ---------- périodes de l'année 2026-2027 et congés ---------- */
  const STARTS = ['2026-08-31', '2026-10-17', '2026-12-19', '2027-03-31'], FIN = '2027-06-29';
  const CONGES = [['2026-10-19', '2026-10-30'], ['2026-11-11', '2026-11-11'], ['2026-12-21', '2027-01-01'], ['2027-02-15', '2027-02-26'], ['2027-03-29', '2027-03-29'], ['2027-04-26', '2027-05-07'], ['2027-05-17', '2027-05-17']];
  const conge = d => CONGES.some(([a, b]) => a <= d && d <= b);
  const perIdx = d => STARTS.reduce((r, s, i) => s <= d ? i : r, 0);

  /* ---------- classes, horaire (22 h) et sports par période ----------
     slots : [jour, h, h2, sports par période (P1..P4)] ; un sport = [nom de la liste du carnet, id de la bibliothèque]. */
  const SP = {
    basket: ['Basket-ball', 'basket'], volley: ['Volley-ball', 'volley'], hand: ['Handball', 'hand'], nat: ['Natation', 'natation'], natdeb: ['Natation', 'natdeb'],
    endu: ["Course d'endurance", 'endurance'], bad: ['Badminton', 'bad'], danse: ['Danse', 'danse'], acro: ['Acrosport', 'acro'], pris: ['Balle aux prisonniers', 'prisonnier'],
    athle: ['Athlétisme', 'athle'], foot: ['Football', 'foot'], corde: ['Corde à sauter', 'corde'], lutte: ["Jeux d'opposition / Lutte", 'lutte'], divers: ['Sports divers', 'hiver']
  };
  const GROUPES = [
    {cls: ['1G', '1H'], g: 'G', slots: [[2, 'H1', 'H2', [['basket', 'hand'], ['natdeb'], ['pris', 'bad'], ['natdeb']]], [4, 'H6', 'H6', [['endu'], ['foot'], ['corde', 'divers'], ['athle']]]]},
    {cls: ['1E', '1F'], g: 'F', slots: [[2, 'H3', 'H4', [['volley', 'danse'], ['natdeb'], ['acro', 'bad'], ['natdeb']]], [5, 'H1', 'H1', [['endu'], ['pris'], ['corde', 'divers'], ['athle']]]]},
    {cls: ['2A'], g: 'F', slots: [[2, 'H6', 'H7', [['nat'], ['volley', 'danse'], ['nat'], ['athle', 'bad']]]]},
    {cls: ['2B', '2C'], g: 'F', slots: [[1, 'H1', 'H2', [['endu', 'basket'], ['acro', 'volley'], ['bad', 'lutte'], ['athle', 'foot']]]]},
    {cls: ['3B'], g: 'G', slots: [[1, 'H3', 'H4', [['hand', 'endu'], ['basket', 'lutte'], ['volley', 'bad'], ['athle', 'foot']]]]},
    {cls: ['3C'], g: 'F', slots: [[4, 'H1', 'H2', [['endu', 'volley'], ['danse', 'basket'], ['acro', 'bad'], ['athle', 'corde']]]]},
    {cls: ['4A'], g: 'G', slots: [[3, 'H1', 'H2', [['foot', 'endu'], ['hand', 'lutte'], ['basket', 'bad'], ['athle', 'volley']]]]},
    {cls: ['5B', '5D'], g: 'G', slots: [[4, 'H3', 'H4', [['endu', 'volley'], ['basket', 'bad'], ['hand', 'lutte'], ['athle', 'foot']]]]},
    {cls: ['6A'], g: 'F', slots: [[5, 'H3', 'H4', [['endu', 'bad'], ['volley', 'danse'], ['acro', 'basket'], ['athle', 'divers']]]]},
    {cls: ['6C'], g: 'G', slots: [[1, 'H6', 'H7', [['endu', 'hand'], ['volley', 'basket'], ['bad', 'lutte'], ['foot', 'athle']]]]}
  ];
  const TAILLES = {'1G': 19, '1H': 18, '1E': 20, '1F': 19, '2A': 22, '2B': 14, '2C': 13, '3B': 21, '3C': 20, '4A': 18, '5B': 12, '5D': 11, '6A': 16, '6C': 17};

  S.classes = []; S.settings = {...DEF_SET, comAuto: true, tt: [], seeds: ['periodes-2026-v1'], prepaEn: {prof: 'M. Démo'},
    work: 'J\'ai laissé un questionnaire sur la natation à remplir.'};
  const byName = {};
  GROUPES.forEach(G => G.cls.forEach(n => {
    const an = +n[0], types = an === 1 ? ['salle', 'piscine', 'salle', 'piscine'] : an === 2 ? ['piscine', 'salle', 'piscine', 'salle'] : ['salle', 'salle', 'salle', 'salle'];
    const c = newClass(n, Array.from({length: TAILLES[n]}, () => nomUnique(G.g)).join('\n'), STARTS.map((s, i) => ({id: nid('p'), name: 'Période ' + (i + 1), start: s, type: types[i]})));
    c.sexe = G.g; c.pupils.forEach(p => p.g = G.g);
    // profil de chaque élève : niveau, absences, oublis, bavardages…
    c.pupils.forEach(p => { p._t = {niv: borne(0.42 + rnd() * 0.5, 0.35, 0.97), abs: 0.015 + rnd() * 0.04, ret: rnd() * 0.04, kit: rnd() < 0.12 ? 0.12 + rnd() * 0.08 : rnd() * 0.04, pert: 0.003, np: rnd() * 0.05}; });
    melange(c.pupils).slice(0, rnd() < 0.5 ? 2 : 3).forEach(p => p._t.pert = 0.05 + rnd() * 0.05);
    if (rnd() < 0.4) pick(c.pupils)._t.abs = 0.12;
    S.classes.push(c); byName[n] = c;
  }));
  if (byName['2B']) byName['2B'].ordre = 'prenom';

  GROUPES.forEach(G => G.slots.forEach(([d, h, h2]) => S.settings.tt.push({id: nid('t'), d, h, h2, cls: G.cls.map(n => byName[n].id), ...(d === 4 ? {salle: true} : {})})));

  /* ---------- toutes les dates de cours de l'année, par créneau ---------- */
  const jours = []; for (let d = STARTS[0]; d <= FIN; d = addDays(d, 1)){ const w = wdOf(d); if (w >= 1 && w <= 5 && !conge(d)) jours.push(d); }
  const fait = (d, h) => d < TODAY || (d === TODAY && hI(h) <= hI(MAINTENANT));
  const NOTES = ['Salle partagée avec une autre classe : demi-terrain.', 'Très bonne séance, groupe motivé.', 'Cours dehors : beau temps.', 'Bus en retard : 30 min dans l\'eau seulement.', 'Prévenir les parents pour les oublis répétés.', 'Matériel à réparer : 2 ballons dégonflés.', 'Arbitrage par les élèves : à refaire.', 'Ateliers trop longs, raccourcir la prochaine fois.'];
  const R = {kits: 0};
  const evs = [], suite = {};   // évaluations à créer après les leçons : {classes, date, sport, lib, an, per, final}

  GROUPES.forEach(G => G.slots.forEach(([d, h, h2, plan]) => {
    const cls = G.cls.map(n => byName[n]), an = +G.cls[0][0];
    const dates = jours.filter(x => wdOf(x) === d);
    [0, 1, 2, 3].forEach(pi => {
      const ds = dates.filter(x => perIdx(x) === pi), list = plan[pi], n = ds.length;
      let i0 = 0;
      list.forEach((k, bi) => {
        const nb = bi === list.length - 1 ? n - i0 : Math.ceil(n / list.length), bloc = ds.slice(i0, i0 + nb); i0 += nb;
        const [sport, lib] = SP[k], divers = lib === 'hiver';
        let jeux = divers ? melange(Array.from({length: 38}, (_, j) => j + 1)) : null;
        bloc.forEach((date, i) => {
          // cycle de 6 leçons : la dernière est l'évaluation ; natation (plus de leçons) : on continue d'une période à l'autre
          const nt = divers ? 0 : prepaRef(`${lib}|${an}|1`).A.l.length, ck = d + h + lib;
          const num = divers ? jeux[i % jeux.length] : nt > 6 ? Math.min((suite[ck] = (suite[ck] || 0) + 1), nt) : (i === bloc.length - 1 ? 6 : Math.min(i + 1, 5));
          const T = prepaGuide.plMin(hI(h2) - hI(h) + 1, cls[0].periods[pi].type === 'piscine' && d === 2);
          const pp = (pi === 3 || date > addDays(TODAY, -14)) ? prepaGuide.plFromLib(lib, divers ? 0 : an, num, T) : null;
          if (!fait(date, h)){
            if (date <= FIN && date > TODAY || date === TODAY){ S.settings.ag = S.settings.ag || {}; S.settings.ag[agKey(date, h)] = {s: sport, n: '', ...(pp ? {pp} : {})}; }
            return;
          }
          cls.forEach(c => {
            const L = {id: nid('l'), date, h, h2, type: lessonType(c, date, h), m: {}, sport};
            if (pp) L.prepa = JSON.parse(JSON.stringify(pp));
            const rf = prepaRef(`${lib}|${divers ? 0 : an}|${num}`), comp = rf && (rf.l.comp || rf.A.comp);
            if (comp && comp.length) L.prog = [...comp];   // compétences du programme travaillées (Suivi › Couverture du programme)
            if (pp && date < TODAY && rnd() < 0.5) L.prepa.bil = pick(['Objectifs atteints pour la plupart.', 'Manque de temps pour le jeu final.', 'Bonne séance, à refaire avec plus de matches.', 'Les consignes de sécurité ont été bien respectées.']);
            if (c === cls[0] && rnd() < 0.06) L.note = pick(NOTES);
            c.lessons.push(L);
          });
          if (!divers && !jeux && i === bloc.length - 1 && fait(date, h)) evs.push({cls, date, sport, lib, an, per: pi, k});
        });
        // cycle pas fini au 15 juin : une évaluation intermédiaire (certificative) et une formative avant
        if (!divers && bloc.length && !fait(bloc[bloc.length - 1], h)){ const m = bloc.filter(x => x < TODAY);
          if (m.length >= 2) evs.push({cls, date: m[m.length - 1], sport, lib, an, per: pi, k, mid: true});
          if (m.length >= 3) evs.push({cls, date: m[1], sport, lib, an, per: pi, k, form: true}); }
        if (divers && bloc.length) evs.push({cls, date: bloc.filter(x => fait(x, h)).pop(), sport, lib, an, per: pi, k, divers: true});
      });
    });
  }));

  /* ---------- certificats médicaux ---------- */
  const CERTS = [['Entorse de la cheville', 14, ''], ['Fracture du poignet', 35, ''], ['Otite : pas de piscine', 10, 'piscine'], ['Bronchite', 7, ''], ['Opération du genou', 42, ''], ['Verrue plantaire : pas de piscine', 21, 'piscine'], ['Douleurs au dos', 10, 'salle']];
  S.classes.forEach(c => { const nb = rnd() < 0.5 ? 1 : 2; melange(c.pupils).slice(0, nb).forEach(p => {
    const [note, len, zone] = pick(CERTS), from = pick(jours.filter(x => x < TODAY));
    p.certs = [{id: nid('m'), from, to: addDays(from, len), note, ...(zone ? {zone} : {})}]; }); });

  /* ---------- l'appel de chaque leçon ---------- */
  S.classes.forEach(c => {
    const ls = [...c.lessons].sort((a, b) => rgKey(a) < rgKey(b) ? -1 : 1), regles = {};
    ls.forEach(L => {
      const pool = L.type === 'piscine', now = L.date === TODAY;
      c.pupils.forEach(p => {
        const t = p._t, m = {};
        if (certOn(p, L.date, L.type)){ regles[p.id] = 0; return; }
        const r = rnd();
        if (r < t.abs){ m.a = 'A'; }
        else if (r < t.abs + t.ret) m.a = 'R';
        else if (r < t.abs + t.ret + 0.006) m.a = 'D';
        if (m.a !== 'A' && m.a !== 'D'){
          if (rnd() < t.kit * (now ? 3 : 1)) m.k = 1;
          if (rnd() < t.pert){ if (rnd() < 0.12) m.x = 1; else m.d = 1; }
          if (pool){
            if (c.sexe === 'F'){ const suite = regles[p.id]; if (rnd() < (suite ? 0.35 : 0.1)) m.rg = 1; }
            if (!m.rg && !m.k && rnd() < t.np) m.np = 1;
          }
        }
        if (pool) regles[p.id] = m.rg ? 1 : 0;
        if (Object.keys(m).length) L.m[p.id] = m;
      });
    });
  });
  // le cours en cours (1E + 1F, piscine) montre l'alerte « 2e semaine de suite » pour les règles
  ['1E', '1F'].forEach((n, j) => { const c = byName[n], L = c.lessons.find(l => l.date === TODAY), prev = c.lessons.filter(l => l.type === 'piscine' && l.date < TODAY).sort((a, b) => a.date < b.date ? 1 : -1)[0];
    if (!L || !prev) return; const ps = c.pupils.filter(p => !certOn(p, TODAY, 'piscine'));
    const a = ps[2 + j], b = ps[7 + j]; L.m[a.id] = {rg: 1}; prev.m[a.id] = {rg: 1}; L.m[b.id] = {rg: 1}; delete prev.m[b.id]; });

  /* ---------- travaux à rendre (carnet/travail.js) ---------- */
  // donnés au cours précédent : rappel aujourd'hui (1E + 1F) ; dans les autres classes, un travail remis et un zéro (−1 tenue)
  ['1E', '1F'].forEach((n, j) => { const c = byName[n], prev = c.lessons.filter(l => l.date <= addDays(TODAY, -7)).sort((a, b) => rgKey(a) < rgKey(b) ? 1 : -1)[0]; if (!prev) return;
    c.pupils.filter(p => !certOn(p, prev.date)).slice(4 + j, 6 + j).forEach(p => { const m = prev.m[p.id] || (prev.m[p.id] = {}); m.k = 1; m.tr = 1; (c.trav = c.trav || {})[p.id] = {l: prev.id, d: prev.date, due: addDays(prev.date, 7)}; }); });
  S.classes.filter(c => !['1E', '1F'].includes(c.name)).forEach(c => {
    const ls = c.lessons.filter(l => l.date < TODAY).sort((a, b) => rgKey(a) < rgKey(b) ? -1 : 1), k = ls.length - 3; if (k < 2) return;
    const [g1, r1] = [ls[k - 2], ls[k - 1]], [g2, r2] = [ls[k], ls[k + 1]], ps = melange(c.pupils.filter(p => !(p.certs || []).length));
    const donne = (L, p) => { const m = L.m[p.id] || (L.m[p.id] = {}); if (!m.a && !m.k) m.k = 1; m.tr = 1; };
    donne(g1, ps[0]); (r1.m[ps[0].id] = r1.m[ps[0].id] || {}).trOk = {d: g1.date, l: g1.id};
    donne(g2, ps[1]); (r2.m[ps[1].id] = r2.m[ps[1].id] || {}).tz = {d: g2.date, l: g2.id};
    const L = ls[ls.length - 1]; donne(L, ps[2]); (c.trav = c.trav || {})[ps[2].id] = {l: L.id, d: L.date, due: addDays(L.date, 7)};
  });

  /* ---------- évaluations ---------- */
  const presentA = (c, p, date) => { const L = c.lessons.find(l => l.date === date); return L ? effA(p, L) : 'P'; };
  const noteCrit = (p, pts) => { const st = crSteps(pts), v = borne(p._t.niv + (rnd() - 0.5) * 0.3, 0, 1) * pts; return st.reduce((b, x) => Math.abs(x - v) < Math.abs(b - v) ? x : b, 0); };
  evs.forEach(E => {
    if (!E.date) return;
    const gid = E.cls.length > 1 ? nid('g') : null, A = E.divers ? null : prepaRef(`${E.lib}|${E.an}|1`).A, lc = A ? [...A.l].reverse().find(l => l.crit) : null, crit = lc ? lc.crit : null, nc = A ? A.l.indexOf(lc) + 1 : 0;
    E.cls.forEach(c => {
      const per = periodOf(c, E.date), base = {id: nid('v'), date: E.date, periodId: per.id, s: {}, ...(gid ? {gid} : {})};
      let e;
      if (E.divers) e = {...base, name: 'Sports divers : fair-play et engagement', max: 10, kind: 'form'};
      else if (E.k === 'endu'){
        const tours = [0, 14, 15, 16, 17, 18, 19][E.an], min = E.an <= 2 ? 12 : 15;
        e = {...base, name: `Course d'endurance : ${min} min`, max: 10, endu: {min, tours, laps: {}}};
        c.enduLast = {min, tours, max: 10};
      } else if (E.mid) e = {...base, name: `${E.sport} : évaluation intermédiaire`, max: 10};
      else if (E.form) e = {...base, name: `${E.sport} : évaluation formative`, max: 10, kind: 'form'};
      else if (crit) e = {...base, name: `${E.sport} : évaluation de fin de cycle`, max: 20, crit: crit.map(([n, p, i]) => ({n, p, i})), cs: {}, cmax: 20, dec: true, pref: `${E.lib}|${E.an}|${nc}`};
      else e = {...base, name: `${E.sport} : évaluation`, max: 10};
      c.pupils.forEach(p => {
        const a = presentA(c, p, E.date);
        if (a === 'A'){ e.s[p.id] = rnd() < 0.5 ? 'abs' : null; if (e.s[p.id] === null) delete e.s[p.id]; else return; }
        if (a === 'D'){ e.s[p.id] = certOn(p, E.date) ? 'CM' : 'D'; return; }
        if (e.endu){ const laps = Math.round(e.endu.tours * borne(p._t.niv + 0.2 + (rnd() - 0.5) * 0.25, 0.45, 1.15)); e.endu.laps[p.id] = laps; e.s[p.id] = enScore(laps, e.endu.tours, e.max); }
        else if (e.crit){ e.cs[p.id] = e.crit.map(k => noteCrit(p, k.p)); e.s[p.id] = crNote(e, e.cs[p.id]); }
        else e.s[p.id] = Math.round(borne(p._t.niv + (rnd() - 0.5) * 0.3, 0.1, 1) * 10 * 2) / 2;
      });
      c.evals.push(e);
    });
  });
  // une évaluation simple en plus, prise par le prof sans grille (pour montrer les deux sortes)
  S.classes.forEach(c => { const per = c.periods[0], d = '2026-09-25', e = {id: nid('v'), name: 'Test de souplesse', max: 10, date: d, periodId: per.id, s: {}};
    c.pupils.forEach(p => { e.s[p.id] = Math.round(borne(p._t.niv + (rnd() - 0.4) * 0.4, 0.2, 1) * 10 * 2) / 2; }); c.evals.push(e); });

  /* ---------- quelques commentaires écrits à la main (les autres : commentaire automatique) ---------- */
  const PLUS = ['Très beau cycle, toujours volontaire.', 'Aide souvent ses camarades, merci.', 'Belle progression depuis septembre.', 'Doit penser à sa tenue à chaque cours.', 'Bon esprit d\'équipe.', 'Peut encore gagner en régularité.'];
  S.classes.forEach(c => { [0, 1].forEach(pi => { const per = c.periods[pi], X = compute(c, per); c.com = c.com || {}; c.com[per.id] = c.com[per.id] || {};
    melange(c.pupils).slice(0, 2).forEach(p => { c.com[per.id][p.id] = comText(c, per, X, p) + ' ' + pick(PLUS); }); }); });

  /* ---------- planning de l'année (Agenda › Planning) ---------- */
  S.settings.planAn = {};
  GROUPES.forEach(G => { const [d, h, , plan] = G.slots[0]; G.cls.forEach(n => { const c = byName[n], P = S.settings.planAn[c.id] = {};
    for (let w = mondayOf(STARTS[0]); w <= FIN; w = addDays(w, 7)){
      const sem = Array.from({length: 5}, (_, i) => addDays(w, i));
      if (sem.every(conge)){ P[w] = 'Congé'; continue; }
      const day = addDays(w, d - 1), L = c.lessons.find(l => l.date === day && l.h === h), ag = (S.settings.ag || {})[agKey(day, h)];
      if (L) P[w] = L.sport; else if (ag) P[w] = ag.s;
    } }); });

  S.classes.forEach(c => c.pupils.forEach(p => delete p._t));
  S.cur = byName['1E'].id; S.ts = Date.now(); S.classes.forEach(c => c.ts = S.ts);
  return {S, info: {classes: S.classes.length, eleves: S.classes.reduce((a, c) => a + c.pupils.length, 0), lecons: S.classes.reduce((a, c) => a + c.lessons.length, 0), evals: S.classes.reduce((a, c) => a + c.evals.length, 0), heures: S.settings.tt.reduce((a, t) => a + hI(t.h2) - hI(t.h) + 1, 0)}};
}

(async () => {
  fs.writeFileSync(SORTIE, 'window.DEMO = null;\n');
  const b = await chromium.launch(), pg = await b.newPage();
  pg.on('pageerror', e => console.error('page :', e.message));
  await pg.goto(URL); await pg.waitForFunction(() => window.prepaGuide && typeof prepaLoad === 'function');
  await pg.evaluate(() => prepaLoad(PREPA_PRETS));
  const out = await pg.evaluate(`(${remplir})()`);
  await b.close();
  const json = JSON.stringify(out.S);
  fs.writeFileSync(SORTIE, `/* Carnet fictif de la démo, fabriqué par outils/demo-donnees.js : ne pas modifier à la main. */\nwindow.DEMO = {v: ${JSON.stringify(VERSION)}, S: ${json}};\n`);
  console.log(out.info, Math.round(json.length / 1024) + ' Ko');
})();
