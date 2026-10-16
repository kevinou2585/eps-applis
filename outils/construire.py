"""Construit tournoi/index.html et koh-lanta/index.html a partir des fichiers sources des applis.

Usage : python3 outils/construire.py <Tournoi comptage.html> <Koh-Lanta appli collegues.html> <Carnet EPS.html>
"""
import base64
import json
import os
import re
import subprocess
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent


def tete(titre, dossier, couleur):
    return f"""<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{titre}</title>
<meta name="theme-color" content="{couleur}">
<link rel="manifest" href="../manifest.webmanifest">
<link rel="icon" href="../icones/{dossier}-192.png">
<link rel="apple-touch-icon" href="../icones/eps-180.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="EPS ultime">
<style>/* Pas de zoom quand on tape vite deux fois sur un bouton (iPhone) */
html,body,button,a,input,label,select{{touch-action:manipulation}}
/* Retour vers l'accueil de l'appli EPS */
.eps-retour{{display:flex;flex-wrap:wrap;align-items:center;gap:2px 6px;max-width:680px;margin:0 auto;padding:10px 16px 0;font:600 14px system-ui,-apple-system,sans-serif;color:#5d6a60;text-decoration:none}}
@media (prefers-color-scheme:dark){{.eps-retour{{color:#9aa89e}}}}</style>
"""


RETOUR = '<a class="eps-retour" href="../"><span style="white-space:nowrap">‹ Mes applis</span></a>\n'

# Koh-Lanta, mise en page B (choisie par Kevin) : haut epure (‹ titre ⋯), onglets en bas sous le pouce,
# Classement general en 4e onglet. On ne touche pas a l'appli : on deplace ses elements apres coup.
KL_MISE_EN_PAGE = """
<style>
.eps-haut{display:flex;align-items:center;gap:10px}
.eps-haut h1{flex:1;min-width:0}
.eps-ic{flex:none;width:40px;height:40px;border-radius:12px;border:1px solid var(--line);background:var(--surface);color:var(--ink);display:grid;place-items:center;font:700 20px system-ui,sans-serif;text-decoration:none;padding:0}
.brand .archbtn,.brand .right,.tbrow{display:none!important}
.eps-menu{position:fixed;inset:0;z-index:30;background:rgba(0,0,0,.25)}
.eps-menu[hidden]{display:none}
.eps-menu>div{position:absolute;right:12px;top:calc(env(safe-area-inset-top,0px) + 58px);width:min(260px,calc(100% - 24px));background:var(--surface);border:1px solid var(--line);border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.25);padding:6px;display:grid}
.eps-menu .info{padding:8px 12px 6px;color:var(--muted);font-size:.82rem;display:grid;gap:2px}
.eps-menu button,.eps-menu a{all:unset;box-sizing:border-box;padding:12px;border-radius:10px;font-weight:600;color:var(--ink);cursor:pointer;border-top:1px solid var(--line)}
.eps-menu .rouge{color:var(--red,#c92a2a)}
.eps-menu [hidden]{display:none}
.tabs.eps-nav{position:fixed;left:0;right:0;bottom:0;z-index:18;margin:0;border-radius:0;border:0;border-top:1px solid var(--line);grid-template-columns:repeat(var(--n,3),1fr);padding:6px 4px calc(6px + env(safe-area-inset-bottom,0px));background:var(--surface)}
.eps-nav .tab,.eps-nav .eps-gen{display:grid;justify-items:center;gap:1px;padding:4px 2px;border-radius:10px;font-size:.74rem;font-weight:700;color:var(--muted);background:transparent;text-decoration:none}
.eps-nav .tab b,.eps-nav .eps-gen b{font-size:1.35rem;line-height:1.2}
.eps-nav .tab[aria-selected="true"]{background:transparent;color:var(--torch)}
.eps-nav .eps-gen[hidden]{display:none}
body{padding-bottom:calc(76px + env(safe-area-inset-bottom,0px))}
.toast{bottom:calc(84px + env(safe-area-inset-bottom,0px))}
</style>
<div class="eps-menu" id="eps-menu" hidden><div>
  <div class="info"><span id="eps-m-date"></span><span id="eps-m-sync"></span></div>
  <button data-clic="open-arch">🗂️ Archives</button>
  <button data-clic="backup-top">💾 Sauvegarde</button>
  <a id="eps-m-drive" target="_blank" rel="noopener" hidden>📊 Tableau Drive</a>
  <button data-clic="reset-top" class="rouge">↺ Remettre à 0</button>
</div></div>
<script>
(() => {
  const $ = id => document.getElementById(id);
  let s = null, t = null; try { s = localStorage.getItem('eps-script'); t = localStorage.getItem('eps-tableau'); } catch(e){}
  // Haut : ‹  Koh-Lanta EPS  ⋯
  const brand = document.querySelector('header .brand'), h1 = brand.querySelector('h1');
  brand.classList.add('eps-haut');
  const ret = document.createElement('a'); ret.className = 'eps-ic'; ret.href = '../'; ret.textContent = '‹'; ret.setAttribute('aria-label', 'Mes applis');
  const plus = document.createElement('button'); plus.className = 'eps-ic'; plus.type = 'button'; plus.textContent = '⋯'; plus.setAttribute('aria-label', 'Menu');
  brand.insertBefore(ret, h1); brand.appendChild(plus);
  // Menu ⋯ : les boutons d'origine restent dans l'appli (caches), le menu les declenche.
  const menu = $('eps-menu');
  plus.onclick = () => { $('eps-m-date').textContent = $('today').textContent; $('eps-m-sync').textContent = $('sync').textContent; menu.hidden = false; };
  menu.onclick = e => { const b = e.target.closest('[data-clic]'); menu.hidden = true; if (b) $(b.dataset.clic).click(); };
  if (t) { $('eps-m-drive').href = t; $('eps-m-drive').hidden = false; }
  // Onglets en bas, avec le Classement general en 4e.
  const tabs = document.querySelector('header .tabs'); tabs.classList.add('eps-nav');
  const ic = {jeu: '🎯', class: '📋', fin: '✅'};
  tabs.querySelectorAll('.tab').forEach(b => { const i = document.createElement('b'); i.textContent = ic[b.dataset.tab] || '•'; b.prepend(i); });
  if (s) { const g = document.createElement('a'); g.className = 'eps-gen'; g.href = '../tableau/'; g.onclick = e => { e.preventDefault(); location.replace(g.href); }; g.innerHTML = '<b>🏆</b>Général'; tabs.appendChild(g); tabs.style.setProperty('--n', 4); }
  document.body.appendChild(tabs);
  // Retour depuis la page Général : ../koh-lanta/#class ouvre directement le bon onglet.
  const h = location.hash.slice(1);
  if (h) { const b = tabs.querySelector('.tab[data-tab="' + h + '"]'); history.replaceState(null, '', location.pathname); if (b) b.click(); }
})();
</script>
"""

PIED = """
<script>
// Mise a jour automatique : on verifie a chaque ouverture et a chaque retour dans l'appli,
// et on recharge une fois quand la nouvelle version est prete (les donnees restent sur le telephone).
if ('serviceWorker' in navigator) {
  const dejaPilote = !!navigator.serviceWorker.controller; let recharge = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (dejaPilote && !recharge) { recharge = true; location.reload(); } });
  if (navigator.onLine) navigator.serviceWorker.register('../sw.js').then(reg => {
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && navigator.onLine) reg.update().catch(() => {}); });
  }).catch(() => {});
}
</script>
</body>
</html>
"""


def tournoi(src):
    corps = Path(src).read_text(encoding="utf-8")
    corps = re.sub(r"^\s*<title>.*?</title>\s*", "", corps, count=1)
    return tete("Tournoi", "tournoi", "#1f7a4d") + "</head>\n<body>\n" + RETOUR + corps + PIED


def carnet(src):
    corps = Path(src).read_text(encoding="utf-8")
    corps = re.sub(r"^\s*<title>.*?</title>\s*", "", corps, count=1)
    corps = re.sub(r'<meta name="(claude:viewport-fit-sides|apple-mobile-web-app-title)"[^>]*>\n?', "", corps)
    corps = re.sub(r'<link rel="preconnect"[^>]*>\n?', "", corps)
    # Version site : aucun enregistrement en ligne, aucune donnee importee.
    avant = "async function connectCloud(){\n  if (!window.claude?.use) return;"
    if avant not in corps:
        sys.exit("Carnet : connectCloud introuvable")
    corps = corps.replace(avant, "async function connectCloud(){\n  return; // version site : tout reste sur l'appareil")
    corps = corps.replace("Pour l\\'instant tout reste sur ce téléphone. Ouvre l\\'appli connecté à ton compte Claude pour l\\'enregistrer en ligne.",
                          "Tout reste sur ce téléphone, rien n\\'est envoyé sur internet.")
    corps = corps.replace("'Tout est enregistré dans ton compte Claude'", "'Enregistré sur cet appareil'")
    if "connecté à ton compte Claude" in corps:
        sys.exit("Carnet : texte Claude restant")
    avant = "  return [['Période 1','2026-08-31','salle'],['Période 2','2026-10-17','salle'],['Période 3','2026-12-19','salle'],['Période 4','2027-03-31','salle']]\n    .map(([name, start, type]) => ({id: nid('p'), name, start, type}));"
    if avant not in corps:
        sys.exit("Carnet : periodes par defaut introuvables")
    corps = corps.replace(avant, avant.replace("({id: nid('p'), name, start, type})",
        "({id: nid('p'), name, start: (+start.slice(0, 4) + decalAnnee()) + start.slice(4), type})"))
    corps = corps.replace("function defaultPeriods(){",
        "// Annee scolaire choisie (bouton a cote du titre) : les dates proposees suivent l'annee.\n"
        "function decalAnnee(){ try { const a = parseInt(localStorage.getItem('carnet-eps-annee'), 10); return a ? a - 2026 : 0; } catch(e){ return 0; } }\n"
        "function defaultPeriods(){", 1)
    retour = RETOUR.replace('</a>\n', '<span style="font-weight:500">· Version bêta, pas encore finie</span></a>\n')
    return tete("Carnet EPS", "carnet", "#2f6fd0") + "</head>\n<body>\n" + retour + corps + ANNEES_JS + DRIVE_JS + PIED


def classeur(src):
    """Classeur EPS (leçons) en version equipe : l'annexe des livrets ne garde que les titres."""
    t = Path(src).read_text(encoding="utf-8")
    debut = t.index("<!--EPS-START-->")
    t = t[debut:].replace("<!--EPS-START-->", "", 1)
    t = re.sub(r"^\s*<title>.*?</title>\s*", "", t, count=1)
    t = re.sub(r'<meta name="viewport"[^>]*>\n?', "", t, count=1)
    t = t.replace("</head>\n<body>\n", "", 1)
    t = re.sub(r"\s*</body>\s*</html>\s*$", "\n", t)
    m = re.search(r'(<script id="data" type="application/json">)(.*?)(</script>)', t, re.S)
    if not m:
        sys.exit("Classeur : donnees introuvables")
    d = json.loads(m.group(2))
    d["share"] = True
    for a in d["acts"]:
        a.pop("body", None)
    d["intros"] = {k: "" for k in d["intros"]}
    donnees = json.dumps(d, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    t = t[:m.start(2)] + donnees + t[m.end(2):]
    # Retour vers EPS ultime : dans la barre du haut sur telephone, au-dessus du menu sur ordinateur.
    retour = '<a href="../" aria-label="Mes applis" style="color:inherit;text-decoration:none;font:700 24px system-ui,sans-serif;padding:0 4px">‹</a>'
    if '<div id="top">' not in t:
        sys.exit("Classeur : barre du haut introuvable")
    t = t.replace('<div id="top">', '<div id="top">' + retour, 1)
    haut = '<a class="eps-retour eps-larg" href="../" style="position:fixed;top:0;right:0;z-index:40;background:var(--panel);border-radius:0 0 0 12px;padding:8px 14px">‹ Mes applis</a>\n'
    css = "<style>@media (max-width:860px){.eps-larg{display:none!important}}</style>\n"
    return tete("Classeur EPS", "classeur", "#14211d") + css + "</head>\n<body>\n" + haut + t + PIED
# Carnet : une annee scolaire a la fois. Les autres annees sont rangees sur le telephone (et dans le Drive)
# et on passe de l'une a l'autre par le bouton a cote du titre.
ANNEES_JS = r"""
<style>
.annee-btn{border:1px solid var(--line); background:var(--surface); color:var(--fg); border-radius:99px; padding:5px 10px; font:700 .85rem var(--body); white-space:nowrap}
.annee-btn.vieux{background:var(--warn-soft); border-color:var(--warn); color:var(--warn)}
.annees{position:fixed; inset:0; z-index:60; background:rgba(10,20,30,.45); display:flex; align-items:flex-end; justify-content:center}
.annees>div{background:var(--surface); width:min(560px,100%); max-height:85vh; overflow:auto; border-radius:18px 18px 0 0; padding:16px 16px calc(16px + env(safe-area-inset-bottom,0px)); display:grid; gap:8px}
.annees h3{margin:0; font:700 1.3rem var(--display); text-transform:uppercase}
.annees .an{display:flex; align-items:center; gap:10px; width:100%; text-align:left; border:1px solid var(--line); background:var(--surface); border-radius:12px; padding:12px; font:600 1rem var(--body); color:var(--fg)}
.annees .an b{flex:1}
.annees .an small{color:var(--muted); font-weight:500}
.annees .an[aria-current="true"]{border-color:var(--accent); background:var(--accent-soft)}
.annees .confirm{display:grid; gap:8px; background:var(--surface2); border-radius:12px; padding:12px}
@media (max-width:380px){ #sync>span{display:none} }
</style>
<script>
(() => {
  const CLE = 'carnet-eps-annee', ARCH = 'carnet-eps-archive-';
  const lab = y => y + '-' + (y + 1);
  const parDefaut = () => { const d = new Date(); return lab(d.getMonth() >= 7 ? d.getFullYear() : d.getFullYear() - 1); };
  const get = k => { try { return localStorage.getItem(k); } catch(e){ return null; } };
  let cur = get(CLE);
  if (!cur){ cur = parDefaut(); try { localStorage.setItem(CLE, cur); } catch(e){} }
  const archives = () => { const o = {}; try { for (let i = 0; i < localStorage.length; i++){ const k = localStorage.key(i); if (k.startsWith(ARCH)) o[k.slice(ARCH.length)] = k; } } catch(e){} return o; };
  const nbClasses = k => { try { const o = JSON.parse(get(k)); return (o.state.classes || []).filter(c => !c.act).length; } catch(e){ return 0; } };

  const brand = document.querySelector('header.top .brand');
  const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'annee-btn'; btn.id = 'annee-btn';
  btn.textContent = cur + ' ▾'; btn.setAttribute('aria-label', 'Année scolaire ' + cur + ', changer');
  if (cur !== parDefaut()) btn.classList.add('vieux');
  brand.after(btn);
  btn.onclick = ouvrir;

  function ouvrir(){
    const a = archives(), y0 = 2026, ys = new Set();
    for (let y = y0; y <= Math.max(y0, +parDefaut().slice(0, 4)) + 10; y++) ys.add(lab(y));
    Object.keys(a).forEach(l => ys.add(l)); ys.add(cur);
    const liste = [...ys].sort();
    const w = document.createElement('div'); w.className = 'annees';
    w.innerHTML = `<div><h3>Année scolaire</h3>
      <p class="small muted" style="margin:0">Une année à la fois. Quand l'année est finie, choisis la suivante : l'ancienne est rangée dans les archives et tu peux y revenir ici à tout moment.</p>
      ${liste.map(l => `<button class="an" type="button" data-an="${l}" aria-current="${l === cur}"><b>${l}</b><small>${l === cur ? 'ouverte' : a[l] ? '📁 archivée · ' + nbClasses(a[l]) + ' classe(s)' : 'nouvelle'}</small></button>`).join('')}
      <div id="an-box"></div>
      <button class="btn" type="button" id="an-close">Fermer</button></div>`;
    document.body.appendChild(w);
    const fermer = () => w.remove();
    w.onclick = e => { if (e.target === w) fermer(); };
    w.querySelector('#an-close').onclick = fermer;
    w.querySelectorAll('[data-an]').forEach(b => b.onclick = () => {
      const l = b.dataset.an; if (l === cur){ fermer(); return; }
      const box = w.querySelector('#an-box');
      box.innerHTML = `<div class="confirm"><b>Passer à l'année ${l} ?</b><span class="small">${a[l] ? 'Tu retrouves tes classes et tes notes de ' + l + '.' : 'Tu repars d\'un carnet vide (tes réglages de barème sont gardés).'} L'année ${cur} est rangée dans les archives : tu peux y revenir ici quand tu veux.</span><div class="row2"><button class="btn" type="button" id="an-no">Annuler</button><button class="btn pri" type="button" id="an-yes">Passer à ${l}</button></div></div>`;
      box.scrollIntoView({block: 'nearest'});
      box.querySelector('#an-no').onclick = () => box.innerHTML = '';
      box.querySelector('#an-yes').onclick = async () => { box.querySelector('#an-yes').disabled = true; box.querySelector('#an-yes').textContent = 'Un instant…'; await changer(l, a[l], box); };
    });
  }

  async function changer(l, cleArch, box){
    try { if (window.carnetDriveVider) await Promise.race([window.carnetDriveVider(), new Promise(r => setTimeout(r, 15000))]); } catch(e){}
    window.carnetChangeAnnee = true; // plus aucun envoi Drive avec les donnees de l'ancienne annee
    // 1. ranger l'annee ouverte
    try { localStorage.setItem(ARCH + cur, JSON.stringify({state: S, photos: PH, at: Date.now()})); }
    catch(e){
      try { localStorage.setItem(ARCH + cur, JSON.stringify({state: S, photos: {}, at: Date.now()})); }
      catch(e2){ window.carnetChangeAnnee = false; box.innerHTML = '<div class="confirm"><b>La mémoire du téléphone est pleine : impossible de ranger cette année.</b><span class="small">Télécharge d\'abord une copie (Réglages › Sauvegarde), puis réessaie.</span></div>'; return; }
    }
    // 2. ouvrir l'autre annee
    let st, ph = {};
    if (cleArch){ const o = JSON.parse(get(cleArch)); st = o.state; ph = o.photos || {}; }
    else {
      const keep = {...S.settings}; delete keep.tt;
      st = {v: 1, ts: Date.now(), cur: null, settings: {...keep, tt: []}, classes: [], deleted: []};
    }
    try {
      localStorage.setItem(KEY, JSON.stringify(st));
      localStorage.setItem(PKEY, JSON.stringify(ph));
      localStorage.setItem(CLE, l);
      localStorage.removeItem(UKEY);
      if (cleArch) localStorage.removeItem(cleArch);
    } catch(e){ window.carnetChangeAnnee = false; box.innerHTML = '<div class="confirm"><b>Le changement d\'année n\'a pas pu se faire (mémoire pleine).</b></div>'; return; }
    location.reload();
  }
})();
</script>
"""


# Carnet : sauvegarde automatique dans le Google Drive de l'enseignant (son propre script Apps Script).
DRIVE_JS = r"""
<style>
#drv .etat{display:block;margin:6px 0 2px;font-weight:600}
#drv .code{font:700 1.05rem ui-monospace,monospace;letter-spacing:.06em;background:var(--surface2);padding:2px 8px;border-radius:6px}
#drv ol{margin:6px 0 4px;padding-left:20px;font-size:.88rem;color:var(--muted)}
#drv ol li{margin:2px 0}
</style>
<script>
(() => {
  const CLE = 'carnet-drive';
  const lire = () => { try { return JSON.parse(localStorage.getItem(CLE)) || {}; } catch(e){ return {}; } };
  const ecrire = o => { try { localStorage.setItem(CLE, JSON.stringify(o)); } catch(e){} };
  const heure = ts => { const d = new Date(ts), z = n => String(n).padStart(2, '0'); return `${d.getDate()}/${d.getMonth() + 1} à ${z(d.getHours())}h${z(d.getMinutes())}`; };
  let minuteur = null, enCours = false;
  const annee = () => { try { return localStorage.getItem('carnet-eps-annee') || ''; } catch(e){ return ''; } };

  function feuilles(){
    const out = [];
    S.classes.forEach(c => {
      try {
        const per = periodsOf(c).filter(p => { const x = compute(c, p); return x.lessons.length || x.evals.length; });
        const sh = per.map(p => periodSheet(c, p)); if (per.length) sh.push(yearSheet(c));
        sh.forEach(f => out.push({nom: f.name, lignes: f.rows.map(r => ({h: r.h, c: r.cells.map(x => x ? [x.v === '' ? null : x.v, x.s] : null)})), fusions: f.merges, largeurs: f.cols, figer: f.freeze}));
      } catch(e){}
    });
    return out;
  }
  async function appel(o, corps){
    const r = corps ? await fetch(o.url, {method: 'POST', headers: {'Content-Type': 'text/plain;charset=utf-8'}, body: JSON.stringify(corps)})
                    : await fetch(o.url + (o.url.includes('?') ? '&' : '?') + 'cle=' + encodeURIComponent(o.cle) + '&annee=' + encodeURIComponent(annee()));
    return r.json();
  }
  async function envoyer(){
    const o = lire(); if (!o.url || !o.cle || !o.attente || window.carnetChangeAnnee) return;
    if (enCours){ planifier(4000); return; }
    if (!navigator.onLine){ etat(); return; }
    enCours = true; const debut = Date.now();
    try {
      const rep = await appel(o, {cle: o.cle, annee: annee(), copie: {app: 'carnet-eps', v: 1, at: Date.now(), state: S}, feuilles: feuilles()});
      const n = lire();
      if (rep.ok){ n.dernier = Date.now(); n.err = ''; if ((n.modif || 0) <= debut) n.attente = false; }
      else n.err = rep.err === 'code' ? 'Le code ne correspond pas à ce tableau.' : 'Le tableau a refusé l\'envoi (' + rep.err + ').';
      ecrire(n);
    } catch(e){ const n = lire(); n.err = 'Pas de réponse de Google : nouvel essai tout seul.'; ecrire(n); }
    enCours = false; etat();
    if (lire().attente && !lire().err) planifier(4000);
  }
  function planifier(ms){ clearTimeout(minuteur); minuteur = setTimeout(envoyer, ms); }
  // Avant de changer d'annee scolaire : on termine l'envoi en attente de l'annee en cours.
  window.carnetDriveVider = async () => { clearTimeout(minuteur); if (lire().attente && navigator.onLine){ while (enCours) await new Promise(r => setTimeout(r, 300)); await envoyer(); } };
  // Chaque enregistrement du carnet sur le telephone declenche un envoi quelques secondes plus tard.
  const avant = window.persistLocal;
  window.persistLocal = function(){ avant.apply(this, arguments); const o = lire(); if (!o.url) return; o.attente = true; o.modif = Date.now(); ecrire(o); planifier(6000); etat(); };
  window.addEventListener('online', () => planifier(1000));
  document.addEventListener('visibilitychange', () => { if (lire().attente) planifier(document.visibilityState === 'hidden' ? 0 : 1500); });
  if (lire().attente) planifier(3000);
  // Reseau revenu sans que le telephone le signale (gare, train) : nouvel essai chaque minute tant que c'est en attente.
  setInterval(() => { if (lire().attente && !enCours && !document.hidden) envoyer(); }, 60000);

  function nouveauCode(){ const a = 'abcdefghjkmnpqrstuvwxyz23456789'; let s = ''; for (let i = 0; i < 8; i++) s += a[Math.floor(Math.random() * a.length)]; return s.slice(0, 4) + '-' + s.slice(4); }

  function etat(){
    const el = document.getElementById('drv-etat'); if (!el) return;
    const o = lire();
    el.textContent = o.err ? '⚠️ ' + o.err : o.attente ? (navigator.onLine ? '⏳ Envoi en cours…' : '📶 Pas d\'internet : envoi dès que possible.') : o.dernier ? '✅ Sauvegardé dans ton Drive le ' + heure(o.dernier) : '✅ Lié à ton Drive.';
  }
  function restaurer(copie, box){
    const d = new Date(copie.at), n = copie.state.classes.length;
    box.innerHTML = `<div class="confirm"><b>Remplacer tout le carnet par la sauvegarde Drive du ${heure(copie.at)} ?</b><span class="small">${n} classe${n > 1 ? 's' : ''}. Ce qui est noté sur ce téléphone sera remplacé (les photos de certificats restent).</span><div class="row2"><button class="btn" type="button" id="drv-no">Annuler</button><button class="btn pri" type="button" id="drv-yes">Remplacer</button></div></div>`;
    box.querySelector('#drv-no').onclick = () => box.innerHTML = '';
    box.querySelector('#drv-yes').onclick = () => {
      const now = Date.now();
      S.classes.forEach(c => { if (!copie.state.classes.some(x => x.id === c.id)) S.deleted.push(c.id); });
      S = {...S, ...copie.state, settings: {...DEF_SET, ...(copie.state.settings || {})}, deleted: S.deleted.filter(id => !copie.state.classes.some(x => x.id === id))};
      S.classes.forEach(c => { c.ts = now; dirty.add(c.id); }); S.deleted.forEach(id => dirty.add(id));
      save(); render(); toast('Carnet restauré depuis Drive');
    };
  }
  function carte(){
    const bk = document.getElementById('s-bk'); if (!bk || document.getElementById('drv')) return;
    const d = document.createElement('div'); d.id = 'drv'; d.className = 'card sec'; d.style.paddingBlock = '14px';
    bk.closest('.card').after(d); dessiner(d);
  }
  function dessiner(d){
    const o = lire();
    if (o.url){
      d.innerHTML = `<h3>☁️ Google Drive</h3>
        <p class="small muted" style="margin:0">Chaque changement est copié dans ton tableau Google, avec un onglet lisible par classe et par période.</p>
        <span class="etat" id="drv-etat"></span>
        <p class="small muted" style="margin:0">Code du carnet : <span class="code">${o.cle}</span> (il est aussi écrit dans l'onglet « Lisez-moi » du tableau).</p>
        <div class="row2"><button class="btn" type="button" id="drv-go">Sauvegarder maintenant</button><button class="btn" type="button" id="drv-rs">Restaurer depuis Drive</button></div>
        <button class="btn" type="button" id="drv-off" style="margin-top:4px">Délier ce téléphone</button>
        <div id="drv-box"></div>`;
      etat();
      d.querySelector('#drv-go').onclick = () => { const n = lire(); n.attente = true; n.err = ''; n.modif = Date.now(); ecrire(n); etat(); envoyer(); };
      d.querySelector('#drv-rs').onclick = async () => {
        const box = d.querySelector('#drv-box'); box.innerHTML = '<span class="small muted">Lecture du Drive…</span>';
        try { const r = await appel(lire()); if (r.ok) restaurer(r.copie, box); else box.innerHTML = `<div class="confirm"><b>${r.err === 'vide' ? 'Rien n\'est encore sauvegardé dans ce tableau.' : 'Le code ne correspond pas à ce tableau.'}</b></div>`; }
        catch(e){ box.innerHTML = '<div class="confirm"><b>Google ne répond pas. Vérifie internet et réessaie.</b></div>'; }
      };
      d.querySelector('#drv-off').onclick = () => { const n = lire(); ecrire({cle: n.cle}); dessiner(d); toast('Ce téléphone n\'envoie plus rien au Drive'); };
      return;
    }
    d.innerHTML = `<h3>☁️ Google Drive</h3>
      <p class="small muted" style="margin:0">Une copie de ton carnet dans ton Google Drive, mise à jour toute seule à chaque changement. Tu peux la lire comme un Excel et tout récupérer si tu changes de téléphone.</p>
      <ol><li>Prépare ton tableau Google avec le script (une seule fois, sur ordinateur).</li><li>Colle ici l'adresse du script (elle finit par /exec).</li><li>Garde le code : il protège ta sauvegarde.</li></ol>
      <label class="f">Adresse du script<input class="inp" id="drv-url" placeholder="https://script.google.com/macros/s/…/exec" autocapitalize="off" autocorrect="off" spellcheck="false"></label>
      <label class="f">Code du carnet (nouveau téléphone : mets le code de l'onglet « Lisez-moi »)<input class="inp" id="drv-cle" value="${o.cle || nouveauCode()}" autocapitalize="off" autocorrect="off" spellcheck="false"></label>
      <button class="btn pri" type="button" id="drv-lier">Lier à mon Google Drive</button>
      <div id="drv-box"></div>`;
    d.querySelector('#drv-lier').onclick = async () => {
      const url = d.querySelector('#drv-url').value.trim(), cle = d.querySelector('#drv-cle').value.trim().toLowerCase(), box = d.querySelector('#drv-box');
      if (!/^https:\/\/script\.google(usercontent)?\.com\/.+/.test(url)){ box.innerHTML = '<div class="confirm"><b>Colle l\'adresse complète du script (elle commence par https://script.google.com).</b></div>'; return; }
      if (cle.length < 6){ box.innerHTML = '<div class="confirm"><b>Le code doit faire au moins 6 caractères.</b></div>'; return; }
      box.innerHTML = '<span class="small muted">Vérification…</span>';
      let r; try { r = await appel({url, cle}); } catch(e){ box.innerHTML = '<div class="confirm"><b>Pas de réponse. Vérifie l\'adresse, le déploiement « Tout le monde » et internet.</b></div>'; return; }
      if (!r.ok && r.err === 'code'){ box.innerHTML = '<div class="confirm"><b>Ce tableau est déjà lié avec un autre code. Mets le code de l\'onglet « Lisez-moi ».</b></div>'; return; }
      if (!r.ok && r.err !== 'vide'){ box.innerHTML = '<div class="confirm"><b>Ce n\'est pas le script du Carnet.</b></div>'; return; }
      ecrire({url, cle, attente: true, modif: Date.now()});
      dessiner(d);
      if (r.ok && r.copie){
        const b2 = d.querySelector('#drv-box');
        b2.innerHTML = `<div class="confirm"><b>Ce tableau contient déjà une sauvegarde du ${heure(r.copie.at)}.</b><span class="small">Tu veux la récupérer sur ce téléphone, ou la remplacer par ce qu'il y a ici ?</span><div class="row2"><button class="btn" type="button" id="drv-ici">Garder ce téléphone</button><button class="btn pri" type="button" id="drv-la">Récupérer le Drive</button></div></div>`;
        const n = lire(); n.attente = false; ecrire(n); etat();
        b2.querySelector('#drv-ici').onclick = () => { b2.innerHTML = ''; const n = lire(); n.attente = true; n.modif = Date.now(); ecrire(n); envoyer(); };
        b2.querySelector('#drv-la').onclick = () => restaurer(r.copie, b2);
      } else envoyer();
    };
  }
  new MutationObserver(carte).observe(document.body, {childList: true, subtree: true});
  carte();
})();
</script>
"""


LISTES_JS = ("const ROSTER = (() => { try { const r = JSON.parse(localStorage.getItem('kl-listes-v1')); "
             "if (r && Array.isArray(r.jaune)) return r; } catch(e){} return {jaune:[], vert:[], bleu:[], rouge:[]}; })();")


def chiffrer(listes):
    """AES-GCM avec une cle tiree du code d'ecole (PBKDF2). Le code est lu dans la variable KL_CODE."""
    from cryptography.hazmat.primitives import hashes
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
    code = os.environ.get("KL_CODE", "").strip().lower()
    if not code:
        sys.exit("Donne le code d'ecole dans la variable KL_CODE")
    sel, iv = os.urandom(16), os.urandom(12)
    cle = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=sel, iterations=250000).derive(code.encode())
    donnees = AESGCM(cle).encrypt(iv, json.dumps(listes, ensure_ascii=False).encode(), None)
    b64 = lambda x: base64.b64encode(x).decode()
    return {"v": b64(iv)[:8], "s": b64(sel), "i": b64(iv), "d": b64(donnees)}


def koh_lanta(src):
    t = Path(src).read_text(encoding="utf-8")
    # On garde le style de base de l'enveloppe, mais on remplace le debut du document.
    m = re.match(r"<!doctype html><html><head>(.*?)</head><body>\s*<title>.*?</title>\s*", t, re.S)
    if not m:
        sys.exit("Format Koh-Lanta inattendu")
    style_base = re.search(r"<style>.*?</style>", m.group(1), re.S).group(0)
    corps = t[m.end():]
    corps = re.sub(r"\s*</body>\s*</html>\s*$", "", corps)
    # Les boutons "ouvrir dans le navigateur / copier le lien" ne servaient que pour claude.ai.
    corps = re.sub(r'\s*<div class="archbtns"><a class="btn btn-ghost" id="open-web".*?</div>', "", corps, count=1, flags=re.S)
    corps = re.sub(r'\s*<span class="empty" id="link-msg">.*?</span>', "", corps, count=1, flags=re.S)
    corps = re.sub(r"\$\('copy-link'\)\.onclick = .*?else fb\(\); \};\n", "", corps, count=1, flags=re.S)
    corps = corps.replace("💾 Sauvegarde · 🌐", "💾 Sauvegarde")
    # Kevin : plus besoin de "Copier le recap" depuis l'envoi au classement general (cache, le code de l'appli reste).
    if '<button class="btn btn-main" id="copy">' not in corps:
        sys.exit("Koh-Lanta : bouton Copier le recap introuvable")
    corps = corps.replace('<button class="btn btn-main" id="copy">', '<button class="btn btn-main" id="copy" hidden>', 1)
    # Les "preconnect" ouvrent une connexion internet meme hors ligne (alerte mode avion sur iPhone).
    corps = re.sub(r'<link rel="preconnect"[^>]*>\n?', "", corps)
    # Version publique : les listes d'eleves ne sont pas dans la page. Elles sont chiffrees dans
    # eleves.chiffre.json et l'accueil les dechiffre avec le code d'ecole (stockees dans kl-listes-v1).
    m_r = re.search(r"const ROSTER = (\{.*?\n\});", corps, re.S)
    sortie = subprocess.run(["node", "-e", "process.stdout.write(JSON.stringify(" + m_r.group(1) + "))"],
                            capture_output=True, text=True, check=True).stdout
    # Le lien du tableau des scores (Drive) est chiffre avec les listes : il n'apparait pas en clair sur le site.
    secret = {"listes": json.loads(sortie), "tableau": os.environ.get("KL_TABLEAU", ""),
              "script": os.environ.get("KL_SCRIPT", "")}
    (RACINE / "eleves.chiffre.json").write_text(json.dumps(chiffrer(secret)), encoding="utf-8")
    corps = corps[:m_r.start()] + LISTES_JS + corps[m_r.end():]
    if "jaune:['" in corps:
        sys.exit("Koh-Lanta : noms d'eleves restants")
    if "copy-link" in corps or "claude.ai" in corps:
        sys.exit("Reste un lien claude.ai dans Koh-Lanta")
    return (tete("Koh-Lanta Arène", "koh-lanta", "#e8590c") + style_base + "\n</head>\n<body>\n"
            + corps + ENVOI_JS + KL_MISE_EN_PAGE + PIED)


# Bouton "Envoyer au tableau general" sous la fiche fin de lecon. L'adresse du script Google et le code
# viennent de l'accueil (localStorage eps-script / eps-code). Sans internet, l'envoi attend et repart seul.
ENVOI_JS = r"""
<script>
(() => {
  const PL = {1: ['1er', 5], 2: ['2e', 3], 3: ['3e', 1]};
  const FILE = 'kl-envois-attente', FAITS = 'kl-envois-faits';
  const lire = k => { try { return JSON.parse(localStorage.getItem(k)) || {}; } catch(e){ return {}; } };
  const ecrire = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };
  const reglage = k => { try { return localStorage.getItem(k); } catch(e){ return null; } };
  const jour = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  // Une lecon = un groupe un jour : renvoyer remplace l'envoi precedent dans le tableau.
  function lecon(){
    const g = S.group, r = recapData(g), lignes = [];
    r.podium.forEach(o => o.who.forEach(x => lignes.push({eleve: x.n, place: PL[o.r][0], points: PL[o.r][1]})));
    r.fair.forEach(x => { for (let i = 0; i < x.fair; i++) lignes.push({eleve: x.n, place: 'Fair-play', points: 3}); });
    r.red.forEach(x => { for (let i = 0; i < x.red; i++) lignes.push({eleve: x.n, place: 'Perturbateur', points: -3}); });
    let tel = reglage('kl-appareil');
    if (!tel){ tel = Math.random().toString(36).slice(2, 8); try { localStorage.setItem('kl-appareil', tel); } catch(e){} }
    return {id: jour() + '-' + g + '-' + tel, date: jour(), groupe: GLABEL[g], lignes};
  }
  async function envoyer(p){
    const u = reglage('eps-script'), c = reglage('eps-code');
    if (!u || !c) throw new Error('reglage');
    const rep = await fetch(u, {method: 'POST', headers: {'Content-Type': 'text/plain;charset=utf-8'}, body: JSON.stringify({...p, code: c})});
    const o = await rep.json(); if (!o.ok) throw new Error(o.err || 'refus');
    const f = lire(FAITS); f[p.id] = Date.now(); ecrire(FAITS, f);
    const a = lire(FILE); delete a[p.id]; ecrire(FILE, a);
  }
  async function viderFile(){ const a = lire(FILE); for (const id of Object.keys(a)){ try { await envoyer(a[id]); } catch(e){ break; } } bouton(true); }
  function bouton(force){
    const rc = document.getElementById('recap'); if (!rc) return;
    const act = rc.querySelector('.actions'); if (!act) return;
    if (!reglage('eps-script')) return;
    let d = document.getElementById('kl-envoi');
    if (d && !force) return;
    if (!d){ d = document.createElement('div'); d.id = 'kl-envoi'; d.className = 'card'; (rc.querySelector('.savewarn') || act).before(d); }
    const p = lecon(), fait = lire(FAITS)[p.id], attente = lire(FILE)[p.id];
    d.innerHTML = `<button class="btn btn-main" type="button">📤 Envoyer au classement général</button><span class="empty" id="kl-envoi-m">${attente ? '📶 En attente d\'internet : ce sera envoyé tout seul.' : fait ? '✅ Déjà envoyé aujourd\'hui. Renvoyer remplace l\'envoi précédent.' : 'Envoie la fiche du groupe ' + p.groupe + ' dans le classement général.'}</span>`;
    d.querySelector('button').onclick = async () => {
      const p = lecon(), m = document.getElementById('kl-envoi-m');
      if (!p.lignes.length){ m.textContent = 'Rien à envoyer : personne n\'a de points.'; return; }
      m.textContent = 'Envoi…';
      try { await envoyer(p); m.textContent = '✅ Envoyé au classement général (' + p.lignes.length + ' ligne' + (p.lignes.length > 1 ? 's' : '') + ').'; }
      catch(e){ const a = lire(FILE); a[p.id] = p; ecrire(FILE, a);
        m.textContent = navigator.onLine ? '⚠️ L\'envoi n\'a pas marché. Nouvel essai tout seul à la prochaine ouverture.' : '📶 Pas d\'internet : ce sera envoyé tout seul dès que le téléphone est connecté.'; }
    };
  }
  new MutationObserver(() => bouton(false)).observe(document.getElementById('recap'), {childList: true});
  bouton(false);
  if (navigator.onLine) viderFile();
  window.addEventListener('online', viderFile);
})();
</script>
"""


if __name__ == "__main__":
    (RACINE / "tournoi/index.html").write_text(tournoi(sys.argv[1]), encoding="utf-8")
    (RACINE / "koh-lanta/index.html").write_text(koh_lanta(sys.argv[2]), encoding="utf-8")
    (RACINE / "carnet/index.html").write_text(carnet(sys.argv[3]), encoding="utf-8")
    (RACINE / "classeur").mkdir(exist_ok=True)
    (RACINE / "classeur/index.html").write_text(classeur(sys.argv[4] if len(sys.argv) > 4 else "/mnt/project-files/eps-site/index.html"), encoding="utf-8")
    # Page d'installation = l'accueil, servi depuis une sous-page (liens relatifs ramenes a la racine).
    accueil = (RACINE / "index.html").read_text(encoding="utf-8")
    (RACINE / "installer").mkdir(exist_ok=True)
    (RACINE / "installer/index.html").write_text(accueil.replace("<head>\n", '<head>\n<base href="../">\n', 1), encoding="utf-8")
    print("ok")
