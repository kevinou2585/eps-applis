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
  <button data-clic="reset-top" class="rouge">↺ Remettre à 0</button>
</div></div>
<script>
(() => {
  const $ = id => document.getElementById(id);
  let s = null; try { s = localStorage.getItem('eps-script'); } catch(e){}
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
    corps = certificats(corps)
    corps = commentaires(corps)
    corps = agenda(corps)
    corps = evaluations(corps)
    corps = groupes(corps)
    corps = tenue_piscine(corps)
    corps = suivi(corps)
    corps = reglages(corps)
    retour = RETOUR.replace('</a>\n', '<span style="font-weight:500">· Version bêta, pas encore finie</span></a>\n')
    return tete("Carnet EPS", "carnet", "#2f6fd0") + "</head>\n<body>\n" + retour + corps + COMMENTAIRES_JS + ANNEES_JS + DRIVE_JS + PIED


def certificats(corps):
    """Certificats medicaux : zone (tout / piscine / salle), icone 🩺 dans l'appel, scan du document."""
    def rep(a, b, n=1):
        nonlocal corps
        if corps.count(a) != n:
            sys.exit("Carnet certificats : motif introuvable : " + a[:60])
        corps = corps.replace(a, b)
    rep("const certOn = (p, date) => (p.certs || []).find(x => x.from <= date && date <= x.to) || null;",
        "// type de lecon ('salle' ou 'piscine') : un certificat « piscine seulement » ne dispense pas en salle, et inversement.\n"
        "const certOn = (p, date, type) => (p.certs || []).find(x => x.from <= date && date <= x.to && (!type || !x.zone || x.zone === 'tout' || x.zone === type)) || null;\n"
        "const zoneTxt = x => x.zone === 'piscine' ? 'piscine seulement' : x.zone === 'salle' ? 'salle seulement' : '';")
    rep("certOn(p, L.date)", "certOn(p, L.date, L.type)", 4)
    rep(""">Dispensé jusqu'au ${cert.to.slice(8)}/${cert.to.slice(5, 7)}</span>""",
        """>🩺 Certificat · dispensé jusqu'au ${cert.to.slice(8)}/${cert.to.slice(5, 7)}</span>""")
    rep("""<b>Dispensé du ${esc(fmtD(x.from))} au ${esc(fmtD(x.to))}</b>""",
        """<b>🩺 Dispensé du ${esc(fmtD(x.from))} au ${esc(fmtD(x.to))}</b>${zoneTxt(x) ? ` <span class="tag">${zoneTxt(x)}</span>` : ''}""")
    rep("""Dispensé du ${esc(fmtDL(x.from))} au ${esc(fmtDL(x.to))}${x.note""",
        """Dispensé du ${esc(fmtDL(x.from))} au ${esc(fmtDL(x.to))}${zoneTxt(x) ? ' · ' + zoneTxt(x) : ''}${x.note""")
    # formulaire : scanner ou choisir, et zone couverte
    rep("""    <button class="btn block" type="button" id="cf-pick">${IC.cam} Prendre ou choisir la photo</button>
    <div id="cf-prev"></div>""",
        """    <div class="row2"><button class="btn pri" type="button" id="cf-scan" style="flex:1">${IC.cam} Scanner le certificat</button><button class="btn" type="button" id="cf-pick" style="flex:1">Choisir une photo</button></div>
    <div id="cf-prev"></div>
    <span class="small muted">Le certificat couvre</span>
    <div class="row2" id="cf-zone">${[['tout', 'Tout'], ['piscine', 'Piscine seulement'], ['salle', 'Salle seulement']].map(([k, l]) => `<button class="chip" type="button" data-zone="${k}" aria-pressed="${k === 'tout'}">${l}</button>`).join('')}</div>""")
    rep("""  $('cf-pick').onclick = () => { $('certin').onchange = async e => { const f = e.target.files[0]; e.target.value = ''; if (!f) return;
    try { img = await shrinkDoc(f);""",
        """  let zone = 'tout';
  document.querySelectorAll('[data-zone]').forEach(b => b.onclick = () => { zone = b.dataset.zone; document.querySelectorAll('[data-zone]').forEach(x => x.setAttribute('aria-pressed', x === b)); });
  // Scanner : l'appareil photo s'ouvre, on place les coins, la feuille sort redressee en noir et blanc.
  $('cf-scan').onclick = () => { const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*'; inp.setAttribute('capture', 'environment');
    inp.onchange = async () => { const f = inp.files[0]; if (!f) return;
      try { const d = await scanDoc(f, $('cf-prev')); if (!d){ $('cf-prev').innerHTML = ''; toast('Le scan n\\'a pas marché, réessaie'); return; } img = d;
        $('cf-prev').innerHTML = `<img src="${img}" alt="Certificat scanné" style="width:100%;max-height:340px;object-fit:contain;border-radius:10px;border:1px solid var(--line);background:#fff">`; }
      catch(err){ toast('Cette image n\\'a pas pu être lue'); } };
    inp.click(); };
  $('cf-pick').onclick = () => { $('certin').onchange = async e => { const f = e.target.files[0]; e.target.value = ''; if (!f) return;
    try { img = await scanDoc(f, $('cf-prev')); if (!img) throw new Error('scan');""")
    rep("""    const x = {id: nid('m'), from, to, note: $('cf-note').value.trim()};""",
        """    const x = {id: nid('m'), from, to, zone, note: $('cf-note').value.trim()};""")
    rep("""save(c.id); openPupil(c, p.id); toast(`Dispensé jusqu'au ${fmtD(to)}`);""",
        """save(c.id); openPupil(c, p.id); toast(`🩺 Dispensé jusqu'au ${fmtD(to)}${zone === 'tout' ? '' : ' (' + zoneTxt(x) + ')'}`);""")
    scan = (RACINE / "outils/scan-certificat.js").read_text(encoding="utf-8")
    return corps.replace("</body>", "", 0) + "\n<script>\n" + scan + "</script>\n"


def commentaires(corps):
    """Commentaires de bulletin : bouton dans l'onglet Bulletin de la classe et reglage marche/arret."""
    def rep(a, b):
        nonlocal corps
        if corps.count(a) != 1:
            sys.exit("Carnet commentaires : motif introuvable : " + a[:60])
        corps = corps.replace(a, b)
    rep("""<button class="btn block" type="button" id="r-csv">Bulletin Excel (prêt à imprimer)</button>""",
        """<button class="btn pri block" type="button" id="r-com">📝 Commentaires bulletin</button>
    <button class="btn block" type="button" id="r-csv">Bulletin Excel (prêt à imprimer)</button>""")
    rep("""  $('r-csv').onclick = () => exportXlsx([[c, vp]]""",
        """  $('r-com').onclick = () => openComments(c, vp);
  $('r-csv').onclick = () => exportXlsx([[c, vp]]""")
    rep(""">À la piscine, « ne participe pas » retire aussi un point de tenue</label>
    </div>""",
        """>À la piscine, « ne participe pas » retire aussi un point de tenue</label>
    </div>
    <div class="card sec" style="padding-block:14px">
      <h3>Bulletin</h3>
      <label class="toggle"><input type="checkbox" id="s-com" ${st.comAuto !== false ? 'checked' : ''}>📝 Commentaire de bulletin automatique</label>
      <p class="small muted" style="margin:0">Activé : chaque élève reçoit un récapitulatif neutre tout prêt (note, savoir-être, évaluations, absences, oublis) que tu peux modifier. Désactivé : les cases restent vides et tu écris toi-même, le bouton ✨ Proposer un texte reste là au besoin.</p>
    </div>""")
    rep("""  $('s-np').onchange = e => { st.npCounts = e.target.checked; save(); };""",
        """  $('s-np').onchange = e => { st.npCounts = e.target.checked; save(); };
  $('s-com').onchange = e => { st.comAuto = e.target.checked; save(); };""")
    return corps


def agenda(corps):
    """Agenda : 3e onglet (semaine type = horaire, sport et note par cours), H8, sports dans Reglages."""
    def rep(a, b):
        nonlocal corps
        if corps.count(a) != 1:
            sys.exit("Carnet agenda : motif introuvable : " + a[:60])
        corps = corps.replace(a, b)
    # H8 : 50 min apres H7 (lundi, mardi, jeudi, vendredi ; le mercredi s'arrete a H5)
    rep("['H7','14h50','15h40']];", "['H7','14h50','15h40'],['H8','15h40','16h30']];")
    rep("return f ? f[0] : 'H7'; })();", "return f ? f[0] : 'H8'; })();")
    # piscine seulement le mardi : un autre jour, une nouvelle lecon est en salle (le bouton Salle/Piscine de l'appel reste la)
    rep("  const wd = dOf(date).getDay();\n  return tt().some(", "  const wd = dOf(date).getDay();\n  if (wd !== 2) return 'salle';\n  return tt().some(")
    rep("H6 14h00 · H7 14h50.", "H6 14h00 · H7 14h50 · H8 15h40 (le mercredi jusqu'à H5). Tu peux aussi remplir ton horaire dans l'onglet Agenda.")
    rep("const h = $('tt-h1').value; let h2 = $('tt-h2').value; if (hI(h2) < hI(h)) h2 = h;",
        "const h = $('tt-h1').value; let h2 = $('tt-h2').value; if (hI(h2) < hI(h)) h2 = h;\n"
        "    if (+$('tt-d').value === 3 && hI(h2) > hI('H5')){ toast('Le mercredi s\\'arrête à H5'); return; }")
    # 3e onglet
    rep("grid-template-columns:repeat(2,1fr); max-width:760px", "grid-template-columns:repeat(3,1fr); max-width:760px")
    rep("const TABS = [['today','Présences','lesson'],['classes','Classes','points']];",
        "const TABS = [['today','Présences','lesson'],['classes','Classes','points'],['agenda','Agenda','cal']];")
    rep("if (!['today','classes','settings'].includes(UI.tab)) UI.tab = 'today';",
        "if (!['today','classes','agenda','settings'].includes(UI.tab)) UI.tab = 'today';")
    rep("  if (UI.tab === 'today') renderToday(m);", "  if (UI.tab === 'today') renderToday(m);\n  else if (UI.tab === 'agenda') renderAgenda(m);")
    # appel : sport + note, ce qui etait prevu dans l'agenda passe dans les lecons
    rep("<p>${n} élève${n > 1 ? 's' : ''}. Tout le monde", "${agPlanTag(date, s)}<p>${n} élève${n > 1 ? 's' : ''}. Tout le monde")
    rep("      if (s.key === 'c'){ const nl = sessionsOn(date)", "      agApply(date, s.h, cls);\n      if (s.key === 'c'){ const nl = sessionsOn(date)")
    rep("    ${pool ? poolRecap(cls.map((c, i) => [c, Ls[i]]), date) : ''}", "    ${agRollBox(Ls)}\n    ${pool ? poolRecap(cls.map((c, i) => [c, Ls[i]]), date) : ''}")
    rep("  if (pool) bindPoolRecap(cls.map((c, i) => [c, Ls[i]]), date);", "  bindAgRoll(cls, Ls);\n  if (pool) bindPoolRecap(cls.map((c, i) => [c, Ls[i]]), date);")
    # journal des lecons dans l'onglet Points
    rep("    </div></section>`;\n  bindChips(c);\n  m.querySelector('.list').onclick = e => { const r = e.target.closest('.prow'); if (r) openPupil(c, r.dataset.pid); };",
        "    </div>${agJournal(lessons)}</section>`;\n  bindChips(c);\n  m.querySelector('.list').onclick = e => { const r = e.target.closest('.prow'); if (r) openPupil(c, r.dataset.pid); };")
    # Reglages : sports ajoutes
    rep("    <div class=\"card sec\" style=\"padding-block:14px\">\n      <h3>Barème (toutes les classes)</h3>",
        "    ${agSportsCard()}\n    <div class=\"card sec\" style=\"padding-block:14px\">\n      <h3>Barème (toutes les classes)</h3>")
    rep("  $('s-rs').onclick = () => $('restorein').click();", "  $('s-rs').onclick = () => $('restorein').click();\n  bindAgSports();")
    css = (RACINE / "outils/agenda-carnet.css").read_text(encoding="utf-8")
    js = (RACINE / "outils/agenda-carnet.js").read_text(encoding="utf-8")
    rep("@media (prefers-reduced-motion: no-preference){ .sheet{", css + "@media (prefers-reduced-motion: no-preference){ .sheet{")
    rep("/* ====== Démarrage ====== */", js + "\n/* ====== Démarrage ====== */")
    return corps


def evaluations(corps):
    """Evaluations formatives, endurance avec compteur de tours plein ecran, filles et regles a la piscine."""
    def rep(a, b):
        nonlocal corps
        if corps.count(a) != 1:
            sys.exit("Carnet evaluations : motif introuvable : " + a[:60])
        corps = corps.replace(a, b)
    # filles qui ont leurs regles : restent a l'ecole, raison discrete pour les educateurs
    rep("if (mm.np && a !== 'D') why.push('ne participe pas');", "if ((mm.np || mm.rg) && a !== 'D') why.push('ne nage pas');")
    # 1. formatives : hors savoir-faire, bulletin, Excel/Drive et commentaires (tout passe par compute)
    rep("const evs = c.evals.filter(e => e.periodId === p.id)", "const evs = c.evals.filter(e => e.periodId === p.id && e.kind !== 'form')")
    rep("const totMax = evs.reduce((a, e) => a + +e.max, 0);", "const totMax = evs.filter(e => e.kind !== 'form').reduce((a, e) => a + +e.max, 0);")
    rep("Une éval sur 20 pèse donc deux fois plus qu'une sur 10.</p>",
        "Une éval sur 20 pèse donc deux fois plus qu'une sur 10.${evs.some(e => e.kind === 'form') ? ' Les évaluations FORMATIVES (pour info) ne comptent pas.' : ''}</p>")
    rep("""<b>${esc(e.name)}</b><span class="small muted">${e.date ?""", """<b>${esc(e.name)}${evTags(e)}</b><span class="small muted">${e.date ?""")
    # formulaire : type (classique / endurance), duree et tours, certificative / formative
    rep("""    <label class="f">Nom<input class="inp" id="ef-name""", """    ${evTypeField(c, e)}
    <label class="f">Nom<input class="inp" id="ef-name""")
    rep("""data-max="${n}">/${n}</button>`).join('')}</div>""", """data-max="${n}">/${n}</button>`).join('')}</div>
    ${evEnduFields(c, e)}
    ${evKindField(e)}""")
    rep("  document.querySelectorAll('[data-max]').forEach(b => b.onclick = () => $('ef-max').value = b.dataset.max);",
        "  document.querySelectorAll('[data-max]').forEach(b => b.onclick = () => $('ef-max').value = b.dataset.max);\n  bindEvForm(c, e);")
    rep("    const o = e || {id: nid('v'), s: {}};", "    if (!evFormOk()) return;\n    const o = e || {id: nid('v'), s: {}};")
    rep("o.periodId = $('ef-per').value;", "o.periodId = $('ef-per').value;\n    evFormApply(c, o);")
    # feuille des notes : bouton du compteur, tours
    rep("""    <div class="row2" style="align-items:center"><span class="small muted" style="flex:1">${e.date ? esc(fmtDL(e.date)) + ' · ' : ''}sur""",
        """    ${evScoresHead(c, e)}<div class="row2" style="align-items:center"><span class="small muted" style="flex:1">${e.date ? esc(fmtDL(e.date)) + ' · ' : ''}sur""")
    rep("""<span class="who">${avatar(p)}<span class="nm"><b>${esc(p.n)}</b></span></span>""", """<span class="who">${avatar(p)}<span class="nm"><b>${esc(p.n)}</b>${evLapsTxt(e, p)}</span></span>""")
    rep("    $('es-edit').onclick = () => { closeSheet(); openEvalForm(c, null, e); };", "    $('es-edit').onclick = () => { closeSheet(); openEvalForm(c, null, e); };\n    bindEvScoresHead(c, e);")
    # fiche eleve : formatives a part, garcon / fille
    rep("""Aucune évaluation dans cette période.</span>'}</div>""", """Aucune évaluation dans cette période.</span>'}${evFormList(c, vp, p)}</div>""")
    # 3. regles a la piscine : ne coutent jamais de point (compute() inchange) ; avertissement « Ne semaine de suite » a l'appel
    rep("${mm.x ? 'EXCL.' : IC.down}</button>\n  </div>`;", "${mm.x ? 'EXCL.' : IC.down}</button>${rgChip(c, L, p, pool, off || exempt)}\n  </div>`;")
    rep("const b = e.target.closest('button'); if (!b) return;", """const b = e.target.closest('[data-act="rg"]') || e.target.closest('button'); if (!b) return;""")
    rep("    else if (act === 'np'){ if (mm.np) delete mm.np; else mm.np = 1; }",
        "    else if (act === 'np'){ if (mm.np) delete mm.np; else { mm.np = 1; delete mm.rg; } }\n"
        "    else if (act === 'rg'){ if (mm.rg) delete mm.rg; else { mm.rg = 1; delete mm.np; } }")
    rep("if (mm.a === 'A' || mm.a === 'D'){ delete mm.k; delete mm.np; }", "if (mm.a === 'A' || mm.a === 'D'){ delete mm.k; delete mm.np; delete mm.rg; }")
    # classe : garcons ou filles (un seul reglage pour le groupe)
    rep("""      <label class="f">Nom de la classe<input class="inp" id="s-cname" value="${esc(c.name)}"></label>""",
        """      <label class="f">Nom de la classe<input class="inp" id="s-cname" value="${esc(c.name)}"></label>
      ${classSexeHTML(c)}""")
    rep("  $('s-cname').onchange = e => {", "  bindClassSexe(c);\n  $('s-cname').onchange = e => {")
    css = (RACINE / "outils/evals-carnet.css").read_text(encoding="utf-8")
    js = (RACINE / "outils/evals-carnet.js").read_text(encoding="utf-8")
    rep("@media (prefers-reduced-motion: no-preference){ .sheet{", css + "@media (prefers-reduced-motion: no-preference){ .sheet{")
    rep("/* ====== Démarrage ====== */", js + "\n/* ====== Démarrage ====== */")
    return corps


def tenue_piscine(corps):
    """Piscine : un seul bouton Tenue (maillot garcon ou fille une piece), comme le t-shirt en salle : -1 tenue, a 0 -1 attitude."""
    def rep(a, b):
        nonlocal corps
        if corps.count(a) != 1:
            sys.exit("Carnet tenue piscine : motif introuvable : " + a[:60])
        corps = corps.replace(a, b)
    rep("""<span class="c">${pool ? 'Affaires' : 'Tenue'}</span>${pool ? '<span class="c">Nage</span>' : ''}""", """<span class="c">Tenue</span>""")
    rep("""${pool ? 'Affaires' : 'Tenue'} : toucher = oubli (−1 tenue). ${pool ? 'Nage : toucher = ne participe pas. ' : ''}""",
        """Tenue (${pool ? 'maillot' : 't-shirt'}) : toucher = oubli (−1 tenue ; plus de points en tenue = −1 attitude). """)
    rep("""aria-label="${pool ? 'Affaires de piscine' : 'Tenue'} : ${mm.k ? 'oubliée' : 'en ordre'}">${pool ? IC.bag : IC.shirt}</button>""",
        """aria-label="Tenue : ${mm.k ? 'oubliée' : 'en ordre'}">${pool ? maillot(c, p) : IC.shirt}</button>""")
    rep("""    ${pool ? `<button class="tb ${mm.np ? 'no' : 'ok'}" type="button" data-act="np" ${off || exempt ? 'disabled' : ''} aria-label="Participation : ${mm.np ? 'ne nage pas' : 'nage'}">${IC.swim}</button>` : ''}\n""", "")
    rep("function lessonRow(c, L, p, r, pool){", """// maillot de bain : garcon (short de bain) ou fille (une piece), selon le groupe
const MAILLOT_G = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 6h18v4.5L19.5 19H14l-2-5.5L10 19H4.5L3 10.5z"/><path d="M3 9.5h18"/></svg>';
const MAILLOT_F = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"><path d="M8 2v4.5c0 2.2 1.2 3.3 1.2 5.3 0 1.8-3.2 3-3.2 5.7L9 22h6l3-4.5c0-2.7-3.2-3.9-3.2-5.7 0-2 1.2-3.1 1.2-5.3V2"/><path d="M8 6.5c2 2 6 2 8 0"/></svg>';
function maillot(c, p){ return ((c && c.sexe) || (p && p.g)) === 'F' ? MAILLOT_F : MAILLOT_G; }
function lessonRow(c, L, p, r, pool){""")
    return corps


def groupes(corps):
    """Nom et prenom separes (prenom seul a l'appel et au compteur), onglet Evaluation par groupe de classes."""
    def rep(a, b):
        nonlocal corps
        if corps.count(a) != 1:
            sys.exit("Carnet groupes : motif introuvable : " + a[:60])
        corps = corps.replace(a, b)
    # liste collee : nom / prenom (la nouvelle addPupils est dans groupes-carnet.js)
    rep(r"""function addPupils(c, text){
  const out = [];
  text.split(/\r?\n/).map(l => l.replace(/[\t;,]+/g, ' ').replace(/\s+/g, ' ').trim()).filter(Boolean).forEach(n => {
    if (/^(nom|élève|eleve)\b/i.test(n)) return;
    const p = {id: nid('e'), n}; c.pupils.push(p); out.push(p);
  });
  return out;
}
""", "/* addPupils : voir groupes-carnet.js (nom et prénom) */\n")
    # appel : prenom seul, initiale du nom si deux prenoms pareils (sur toutes les classes de l'appel)
    rep("  const pool = Ls[0].type === 'piscine';", "  const pool = Ls[0].type === 'piscine';\n  NCOURT = nomsCourts(cls.flatMap(c => c.pupils));")
    rep("""<span class="nm"><b>${esc(p.n)}</b>${cert ?""", """<span class="nm"><b>${esc(nomCourt(p))}</b>${cert ?""")
    rep("toast(`${p.n} : exclu du cours`)", "toast(`${nomCourt(p)} : exclu du cours`)")
    rep("toast(`${p.n} : perturbe`)", "toast(`${nomCourt(p)} : perturbe`)")
    # fiche eleve : Nom + Prenom
    rep("""<label class="f">Nom<input class="inp" id="pp-name" value="${esc(p.n)}"></label>""", "${pupilNameFields(p)}")
    rep("""  $('pp-name').onchange = e => { const v = e.target.value.trim(); if (v){ p.n = v; save(c.id); document.querySelector('.sheet .sh h2').textContent = v; } };""",
        "  bindPupilName(c, p);")
    # classe > eleves : ajouter un eleve (deux cases) ou coller une liste
    rep("""<label class="f">Ajouter des élèves (un par ligne)<textarea class="inp" id="s-add" placeholder="Nom Prénom&#10;Nom Prénom"></textarea></label>""",
        """${addOneHTML()}
      <label class="f">Ou colle une liste (un élève par ligne : NOM Prénom)<textarea class="inp" id="s-add" placeholder="DUPONT Léa&#10;Martin Yanis"></textarea></label>
      <span class="small muted" style="margin-top:-4px">Le nom en MAJUSCULES, sinon le dernier mot est pris comme prénom. Deux colonnes copiées d'Excel : nom puis prénom. Tu peux corriger dans la fiche de l'élève.</span>""")
    rep("  $('s-addgo').onclick = () => {", "  bindAddOne(c);\n  $('s-addgo').onclick = () => {")
    rep("""<label class="f">Élèves (un par ligne)<textarea class="inp" id="nc-list" placeholder="Nom Prénom&#10;Nom Prénom"></textarea></label>""",
        """<label class="f">Élèves (un par ligne : NOM Prénom)<textarea class="inp" id="nc-list" placeholder="DUPONT Léa&#10;Martin Yanis"></textarea></label>""")
    # 4 onglets : Presences, Evaluation, Classes, Agenda ; plus d'Evals dans la classe
    rep("grid-template-columns:repeat(3,1fr); max-width:760px", "grid-template-columns:repeat(4,1fr); max-width:760px")
    rep("const TABS = [['today','Présences','lesson'],['classes','Classes','points'],['agenda','Agenda','cal']];",
        "const TABS = [['today','Présences','lesson'],['evals','Évaluation','evals'],['classes','Classes','points'],['agenda','Agenda','cal']];")
    rep("if (!['today','classes','agenda','settings'].includes(UI.tab)) UI.tab = 'today';",
        "if (!['today','evals','classes','agenda','settings'].includes(UI.tab)) UI.tab = 'today';")
    rep("  else if (UI.tab === 'agenda') renderAgenda(m);", "  else if (UI.tab === 'agenda') renderAgenda(m);\n  else if (UI.tab === 'evals') renderEvalTab(m);")
    rep("const CTABS = [['evals','Évals'],['report','Bulletin'],['points','Points'],['pupils','Élèves']];",
        "const CTABS = [['report','Bulletin'],['points','Points'],['pupils','Élèves']];")
    rep("const sub = CTABS.some(t => t[0] === UI.ctab) ? UI.ctab : 'evals';", "const sub = CTABS.some(t => t[0] === UI.ctab) ? UI.ctab : 'report';")
    css = (RACINE / "outils/groupes-carnet.css").read_text(encoding="utf-8")
    js = (RACINE / "outils/groupes-carnet.js").read_text(encoding="utf-8")
    rep("@media (prefers-reduced-motion: no-preference){ .sheet{", css + "@media (prefers-reduced-motion: no-preference){ .sheet{")
    rep("/* ====== Démarrage ====== */", js + "\n/* ====== Démarrage ====== */")
    return corps


def suivi(corps):
    """Classes > Suivi : tenue oubliee, ne nage pas, regles, perturbe, exclu, points repris du releve (fiche pour les parents)."""
    def rep(a, b):
        nonlocal corps
        if corps.count(a) != 1:
            sys.exit("Carnet suivi : motif introuvable : " + a[:60])
        corps = corps.replace(a, b)
    rep("const CTABS = [['report','Bulletin'],['points','Points'],['pupils','Élèves']];",
        "const CTABS = [['report','Bulletin'],['points','Points'],['pupils','Élèves'],['suivi','Suivi']];")
    rep("({evals: renderEvals, report: renderReport, points: renderPoints, pupils: renderManage})[sub](c, $('cv'));",
        "({evals: renderEvals, report: renderReport, points: renderPoints, pupils: renderManage, suivi: renderSuivi})[sub](c, $('cv'));")
    css = (RACINE / "outils/suivi-carnet.css").read_text(encoding="utf-8")
    js = (RACINE / "outils/suivi-carnet.js").read_text(encoding="utf-8")
    rep("@media (prefers-reduced-motion: no-preference){ .sheet{", css + "@media (prefers-reduced-motion: no-preference){ .sheet{")
    rep("/* ====== Démarrage ====== */", js + "\n/* ====== Démarrage ====== */")
    return corps


def reglages(corps):
    """Reglages : bareme complet (points par oubli / perturbation / ne nage pas, report d'une colonne a l'autre),
    piscine et regles, evaluations et endurance, periodes ; la roue dentee ouvre la rubrique de l'onglet en cours."""
    def rep(a, b):
        nonlocal corps
        if corps.count(a) != 1:
            sys.exit("Carnet reglages : motif introuvable : " + a[:60])
        corps = corps.replace(a, b)
    # calcul des points : nombre de points par faute, report dans l'autre colonne (valeurs par defaut = comme avant)
    rep("    if (m.k){ r.kit++; f.push(['t', l.type === 'piscine' ? 'Pas ses affaires de piscine' : 'Pas sa tenue', 'k']); }",
        "    if (m.k){ r.kit++; for (let i = 0; i < stN('kitPts'); i++) f.push(['t', l.type === 'piscine' ? 'Pas ses affaires de piscine' : 'Pas sa tenue', 'k']); }")
    rep("    if (m.np){ r.np++; if (st.npCounts) f.push(['t', 'Ne participe pas à la piscine', 'np']); }",
        "    if (m.np){ r.np++; if (st.npCounts) for (let i = 0; i < stN('npPts'); i++) f.push(['t', 'Ne participe pas à la piscine', 'np']); }")
    rep("    else if (m.d){ r.d++; f.push(['c', 'Perturbe le cours', 'd']); }",
        "    else if (m.d){ r.d++; for (let i = 0; i < stN('dPts'); i++) f.push(['c', 'Perturbe le cours', 'd']); }")
    rep("      if (col === 't'){ if (r.t > 0) r.t--; else if (r.c > 0){ r.c--; hit = 'c'; } else hit = '-'; }\n      else { if (r.c > 0) r.c--; else if (r.t > 0){ r.t--; hit = 't'; } else hit = '-'; }",
        "      const sp = stB('spill');\n      if (col === 't'){ if (r.t > 0) r.t--; else if (sp && r.c > 0){ r.c--; hit = 'c'; } else hit = '-'; }\n      else { if (r.c > 0) r.c--; else if (sp && r.t > 0){ r.t--; hit = 't'; } else hit = '-'; }")
    rep("toucher = oubli (−1 tenue ; plus de points en tenue = −1 attitude).", "toucher = oubli (${regKitTxt()}).")
    rep("1er toucher = perturbe (−1 attitude), 2e", "1er toucher = perturbe (−${fr(stN('dPts'), 2)} attitude), 2e")
    rep("Quand une colonne est vide, la faute suivante est retirée dans l'autre.", "${stB('spill') ? 'Quand une colonne est vide, la faute suivante est retirée dans l\\'autre.' : 'Une colonne vide reste à 0 (rien n\\'est retiré dans l\\'autre).'}")
    rep("""value="${esc(e ? fr(+e.max, 2) : '10')}">""", """value="${esc(e ? fr(+e.max, 2) : fr(stN('evMax'), 2))}">""")
    # roue dentee : ouvre la rubrique de l'onglet en cours, et revient a cet onglet
    rep("$('gear').onclick = () => { UI.tab = UI.tab === 'settings' ? 'today' : 'settings'; saveUI(); render(); window.scrollTo(0, 0); };",
        "$('gear').onclick = regGear;")
    # page Reglages : sommaire, rubriques, periodes
    rep("    <h2>Réglages</h2>\n", "    <h2>Réglages</h2>\n    ${regToc()}\n")
    debut = '    <div class="card sec" style="padding-block:14px">\n      <h3>Barème (toutes les classes)</h3>'
    fin = "« ne participe pas » retire aussi un point de tenue</label>\n    </div>\n"
    if corps.count(debut) != 1 or corps.count(fin) != 1:
        sys.exit("Carnet reglages : bloc bareme introuvable")
    i = corps.index(debut); j = corps.index(fin, i) + len(fin)
    corps = corps[:i] + "    ${regCards()}\n" + corps[j:]
    rep('    <div class="card sec" style="padding-block:14px">\n      <h3>Bulletin</h3>', '    <div class="card sec reg" style="padding-block:14px" id="reg-com">\n      <h3>Commentaires de bulletin</h3>')
    rep('    <div class="card sec" style="padding-block:14px">\n      <h3>Sauvegarde</h3>', '    ${regPerCard()}\n    <div class="card sec reg" style="padding-block:14px" id="reg-save">\n      <h3>Sauvegarde</h3>')
    a = "  const num = (id, k, lo, hi) => $(id).onchange = e => {"
    b = "  $('s-np').onchange = e => { st.npCounts = e.target.checked; save(); };\n"
    if corps.count(a) != 1 or corps.count(b) != 1:
        sys.exit("Carnet reglages : liaisons introuvables")
    i = corps.index(a); j = corps.index(b, i) + len(b)
    corps = corps[:i] + "  bindReg();\n" + corps[j:]
    css = (RACINE / "outils/reglages-carnet.css").read_text(encoding="utf-8")
    js = (RACINE / "outils/reglages-carnet.js").read_text(encoding="utf-8")
    rep("@media (prefers-reduced-motion: no-preference){ .sheet{", css + "@media (prefers-reduced-motion: no-preference){ .sheet{")
    rep("/* ====== Démarrage ====== */", js + "\n/* ====== Démarrage ====== */")
    return corps


# Carnet : commentaire de bulletin par eleve (en « tu »), genere a partir des points, evals et oublis.
# Les textes retouches sont gardes dans la classe : c.com[periodId | 'year'][pupilId] (synchro avec le reste).
COMMENTAIRES_JS = r"""
<style>
.com-it{display:flex; flex-direction:column; gap:8px}
.com-it .hd{display:flex; align-items:center; gap:8px; flex-wrap:wrap}
.com-it .hd b{flex:1; min-width:0}
.com-it textarea{font:15px/1.4 var(--body); min-height:96px; resize:vertical; overflow:hidden}
.com-it .row2 > .btn{flex:1 1 120px; min-height:40px; padding:8px 12px}
.tag.com-man{background:var(--accent-soft); color:var(--accent)}
.tag.com-man[hidden]{display:none}
.tag.com-low{background:var(--bad-soft); color:var(--bad)}
</style>
<script>
/* Compteurs du recapitulatif (absences, oublis, pas nage, perturbations, exclusions). */
function comCounts(c, X, p, vp){
  const o = {abs: 0, gym: 0, pool: 0, np: 0, d: 0, x: 0, adjT: 0};
  // points retires avant l'appli (releve de l'ecole) : tenue -> oublis, comportement -> perturbations
  (vp === 'year' ? (X.periods || []) : [vp]).forEach(pp => { const a = ((c.adj || {})[pp.id] || {})[p.id]; if (a){ o.adjT += +a.t || 0; o.d += +a.c || 0; } });
  X.lessons.forEach(l => {
    const a = effA(p, l); if (a === 'A'){ o.abs++; return; }
    const m = l.m[p.id] || {};
    if (m.k){ if (l.type === 'piscine') o.pool++; else o.gym++; }
    if (m.np) o.np++; // regles : jamais comptees ni mentionnees
    if (m.x) o.x++; else if (m.d) o.d++;
  });
  return o;
}
function comText(c, vp, X, p){
  // Recap neutre : seulement les chiffres qui expliquent la note (aucun jugement, aucun conseil).
  const r = X.res[p.id], st = S.settings, seP = +st.se, n0 = v => fr(v, 0), year = vp === 'year', out = [];
  if (year){
    const per = (X.periods || []).map(pp => { const t = compute(c, pp).res[p.id].total; return t != null ? `${pp.name} : ${n0(t)} %` : null; }).filter(Boolean);
    if (per.length) out.push(per.join(', ') + '.');
    if (r.total != null) out.push(`Moyenne de l'année : ${n0(r.total)} %.`);
    if (r.se != null) out.push(`Savoir-être moyen ${n0(r.se)}/${seP}` + (r.sf != null ? `, savoir-faire moyen ${n0(r.sf)}/${100 - seP}.` : '.'));
  } else {
    const se = `avoir-être ${n0(r.se)}/${seP} (tenue ${r.t}/${+st.T || 0}, attitude ${r.c}/${+st.C || 0})`;
    if (r.total != null){ out.push(`${vp.name} : ${n0(r.total)} %.`, `S${se}.`); if (r.sf != null) out.push(`Savoir-faire ${n0(r.sf)}/${100 - seP}.`); }
    else out.push(`${vp.name} : s${se}.`);
    const ev = r.evals.filter(o => typeof o.s === 'number');
    if (ev.length) out.push('Évaluations : ' + ev.map(o => `${o.e.name.trim() || 'évaluation'} ${fr(o.s, 2)}/${fr(+o.e.max, 2)}`).join(', ') + '.');
    const fo = c.evals.filter(e => e.periodId === vp.id && e.kind === 'form' && typeof e.s[p.id] === 'number');
    if (fo.length) out.push('Formatif : ' + fo.map(e => `${e.name.trim() || 'évaluation'} ${fr(e.s[p.id], 2)}/${fr(+e.max, 2)}`).join(', ') + '.');
  }
  const k = comCounts(c, X, p, vp), salle = k.gym + k.adjT;
  if (k.abs) out.push(`Absences : ${k.abs}.`);
  if (k.pool) out.push(`Oublis de tenue : ${[salle ? salle + ' en salle' : '', k.pool + ' à la piscine'].filter(Boolean).join(', ')}.`);
  else if (salle) out.push(`Oublis de tenue : ${salle}.`);
  if (k.np) out.push(`Pas nagé : ${k.np}.`);
  if (k.d) out.push(`Perturbations : ${k.d}.`);
  if (k.x) out.push(`Exclusions : ${k.x}.`);
  return out.join(' ');
}
function comCopy(txt, ok){
  const done = () => toast(ok || 'Copié');
  const old = () => { const t = document.createElement('textarea'); t.value = txt; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.appendChild(t); t.select(); let r = false; try { r = document.execCommand('copy'); } catch(e){} t.remove(); r ? done() : toast('Copie impossible, sélectionne le texte à la main'); };
  try { if (navigator.clipboard && window.isSecureContext){ navigator.clipboard.writeText(txt).then(done, old); return; } } catch(e){}
  old();
}
function openComments(c, vp){
  const X = vp === 'year' ? computeYear(c) : compute(c, vp), key = vp === 'year' ? 'year' : vp.id;
  const auto = S.settings.comAuto !== false;
  const store = () => { if (!c.com) c.com = {}; if (!c.com[key]) c.com[key] = {}; return c.com[key]; };
  const man = pid => (c.com && c.com[key] && typeof c.com[key][pid] === 'string') ? c.com[key][pid] : null;
  const ps = pupilsOf(c), gen = {};
  ps.forEach(p => gen[p.id] = comText(c, vp, X, p));
  const cur = pid => { const v = man(pid); return v != null ? v : auto ? gen[pid] : ''; };
  const pct = p => { const r = X.res[p.id]; return r.total; };
  openSheet(`Commentaires · ${vp === 'year' ? 'Année' : vp.name}`, `
    <p class="small muted" style="margin:0">${auto ? 'Récapitulatif écrit tout seul d\'après les points, les évaluations et les oublis. Tu peux le modifier : ta version est gardée.' : 'Commentaire automatique désactivé (Réglages) : écris ton texte, ou touche ✨ Proposer un texte.'}</p>
    <button class="btn pri block" type="button" id="com-all">📋 Tout copier (${esc(c.name)})</button>
    ${ps.map(p => { const t = pct(p);
      return `<div class="card com-it" data-cpid="${p.id}"><div class="hd"><b>${esc(p.n)}</b>${t != null ? `<span class="tag ${t < 50 ? 'com-low' : ''}" style="${t < 50 ? '' : 'background:var(--surface2)'}">${t < 50 ? '⚠ ' : ''}${fr(t, 0)} %</span>` : ''}<span class="tag com-man" data-man ${man(p.id) != null ? '' : 'hidden'}>✎ modifié</span></div>
        <textarea class="inp" rows="4" aria-label="Commentaire de ${esc(p.n)}" placeholder="${auto ? '' : 'Écris ton commentaire…'}"></textarea>
        <div class="row2"><button class="btn" type="button" data-copy>Copier</button><button class="btn" type="button" data-reset>${auto ? '↺ Texte automatique' : '✨ Proposer un texte'}</button></div></div>`; }).join('')}`);
  const sb = document.querySelector('.sheet .sb');
  sb.querySelectorAll('[data-cpid]').forEach(box => {
    const pid = box.dataset.cpid, ta = box.querySelector('textarea'), tag = box.querySelector('[data-man]'), rs = box.querySelector('[data-reset]');
    const sync = () => { const m = man(pid) != null; tag.hidden = !m; if (auto) rs.disabled = !m; };
    const fit = () => { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 2 + 'px'; };
    ta.value = cur(pid); sync(); requestAnimationFrame(fit);
    let tm = null;
    const keep = () => { clearTimeout(tm); tm = null; const v = ta.value, st = store();
      if (auto ? v === gen[pid] : v.trim() === '') delete st[pid]; else st[pid] = v;
      if (!Object.keys(st).length) delete c.com[key];
      save(c.id); sync(); };
    ta.oninput = () => { fit(); clearTimeout(tm); tm = setTimeout(keep, 400); };
    ta.onblur = () => { if (tm) keep(); };
    box.querySelector('[data-copy]').onclick = () => { if (tm) keep(); const v = ta.value.trim(); if (!v){ toast('Commentaire vide'); return; } comCopy(v, 'Commentaire copié'); };
    rs.onclick = () => { clearTimeout(tm); tm = null; ta.value = gen[pid]; fit(); keep(); if (!auto) toast('Texte proposé, tu peux le modifier'); };
  });
  $('com-all').onclick = () => {
    sb.querySelectorAll('[data-cpid]').forEach(box => box.querySelector('textarea').blur());
    const lines = ps.map(p => [p.n, cur(p.id).replace(/\s*\n\s*/g, ' ').trim()]).filter(x => x[1]).map(([n, t]) => `${n} : ${t}`);
    if (!lines.length){ toast('Aucun commentaire à copier'); return; }
    comCopy(lines.join('\n'), `${lines.length} commentaire${lines.length > 1 ? 's' : ''} copié${lines.length > 1 ? 's' : ''}`);
  };
}
</script>
"""


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
      const keep = {...S.settings}; delete keep.tt; delete keep.ag;
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
    // Un onglet par classe : les 4 periodes a la suite (vides si pas encore commencees), puis l'annee.
    S.classes.forEach(c => {
      try {
        const per = periodsOf(c), aDes = per.some(p => { const x = compute(c, p); return x.lessons.length || x.evals.length; });
        if (c.act && !aDes) return;
        const parts = per.map(p => periodSheet(c, p)).concat([yearSheet(c)]);
        const lignes = [], fusions = [], largeurs = [];
        parts.forEach((f, i) => {
          if (i) { lignes.push({h: 14, c: []}); lignes.push({h: 14, c: []}); }
          const dec = lignes.length;
          f.rows.forEach(r => lignes.push({h: r.h, c: r.cells.map(x => x ? [x.v === '' ? null : x.v, x.s] : null)}));
          (f.merges || []).forEach(m => fusions.push(m.replace(/([A-Z]+)(\d+)/g, (t, col, n) => col + (+n + dec))));
          (f.cols || []).forEach((w, j) => largeurs[j] = Math.max(largeurs[j] || 0, w));
        });
        out.push({nom: c.name, lignes, fusions, largeurs, figer: 0});
      } catch(e){}
    });
    return out;
  }
  async function appel(o, corps){
    const r = corps ? await fetch(o.url, {method: 'POST', headers: {'Content-Type': 'text/plain;charset=utf-8'}, body: JSON.stringify(corps)})
                    : await fetch(o.url + (o.url.includes('?') ? '&' : '?') + 'cle=' + encodeURIComponent(o.cle) + '&annee=' + encodeURIComponent(annee()));
    return r.json();
  }
  // Plusieurs appareils sur le meme tableau (telephone + ordinateur) : on reprend ce que l'autre a change.
  // Classe par classe, la version la plus recente gagne ; une classe supprimee ailleurs est supprimee ici.
  const occupe = () => { const a = document.activeElement; return !!(document.getElementById('sheetroot')?.innerHTML || document.body.classList.contains('en-open') || (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) && !a.closest('#drv'))); };
  function fusionner(copie){
    const R = copie && copie.state; if (!R || !Array.isArray(R.classes)) return false;
    const del = new Set([...(S.deleted || []), ...(R.deleted || [])]), loc = new Map(S.classes.map(c => [c.id, c])), out = [];
    let change = false;
    R.classes.forEach(rc => {
      if (del.has(rc.id)) return;
      const lc = loc.get(rc.id); loc.delete(rc.id);
      if (!lc || (rc.ts || 0) > (lc.ts || 0)){ out.push(rc); change = true; } else out.push(lc);
    });
    loc.forEach(lc => { if (del.has(lc.id)) change = true; else out.push(lc); });
    let settings = S.settings;
    if ((R.ts || 0) > (S.ts || 0) && JSON.stringify(R.settings) !== JSON.stringify(S.settings)){ settings = {...DEF_SET, ...(R.settings || {})}; change = true; }
    if (!change) return false;
    S = {...S, classes: out, deleted: [...del], settings, ts: Math.max(S.ts || 0, R.ts || 0)};
    if (S.cur && !S.classes.some(c => c.id === S.cur)) S.cur = null;
    avant(); render();
    return true;
  }
  async function tirer(){
    const o = lire(); if (!o.url || !o.cle || !navigator.onLine || window.carnetChangeAnnee || occupe()) return false;
    try { const r = await appel(o); if (r.ok && !window.carnetChangeAnnee && !occupe() && fusionner(r.copie)){ toast('Carnet mis à jour depuis ton Drive'); return true; } } catch(e){}
    return false;
  }
  async function envoyer(){
    const o = lire(); if (!o.url || !o.cle || !o.attente || window.carnetChangeAnnee) return;
    if (enCours){ planifier(4000); return; }
    if (!navigator.onLine){ etat(); return; }
    // on ne remplace jamais le Drive sans avoir d'abord repris les changements faits sur un autre appareil
    if (occupe()){ planifier(5000); return; }
    enCours = true; const debut = Date.now();
    try {
      const r0 = await appel(o);
      if (r0.ok && !occupe()) fusionner(r0.copie);
      else if (!r0.ok && r0.err !== 'vide') throw new Error(r0.err);
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
  document.addEventListener('visibilitychange', () => {
    if (lire().attente) planifier(document.visibilityState === 'hidden' ? 0 : 1500);
    else if (document.visibilityState === 'visible') setTimeout(tirer, 800);
  });
  if (lire().attente) planifier(3000);
  // Reseau revenu sans que le telephone le signale (gare, train) : nouvel essai chaque minute tant que c'est en attente.
  // Chaque minute : envoi en attente, sinon on regarde si un autre appareil a change quelque chose.
  setInterval(() => { if (enCours || document.hidden) return; if (lire().attente) envoyer(); else tirer(); }, 60000);
  if (lire().url && !lire().attente) setTimeout(tirer, 1500);

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
        <p class="small muted" style="margin:0">Chaque changement est copié dans ton tableau Google, avec un onglet lisible par classe et par période. Sur un autre appareil (ordinateur, tablette), ouvre le Carnet, colle la même adresse et le même code : tes notes suivent partout.</p>
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
      // Tableau deja utilise (autre appareil) : on reunit les deux carnets, classe par classe.
      if (r.ok && r.copie){ fusionner(r.copie); toast('Ton carnet est relié au Drive et à tes autres appareils'); }
      envoyer();
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
    const f = lire(FAITS);
    if (p.lignes.length) f[p.id] = {t: Date.now(), date: p.date, groupe: p.groupe, n: p.lignes.length}; else delete f[p.id];
    ecrire(FAITS, f);
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
    mesEnvois(d);
    d.querySelector('button').onclick = async () => {
      const p = lecon(), m = document.getElementById('kl-envoi-m');
      if (!p.lignes.length){ m.textContent = 'Rien à envoyer : personne n\'a de points.'; return; }
      m.textContent = 'Envoi…';
      try { await envoyer(p); bouton(true); document.getElementById('kl-envoi-m').textContent = '✅ Envoyé au classement général (' + p.lignes.length + ' ligne' + (p.lignes.length > 1 ? 's' : '') + '). Erreur ? « Mes envois › Annuler ».'; }
      catch(e){ const a = lire(FILE); a[p.id] = p; ecrire(FILE, a);
        m.textContent = navigator.onLine ? '⚠️ L\'envoi n\'a pas marché. Nouvel essai tout seul à la prochaine ouverture.' : '📶 Pas d\'internet : ce sera envoyé tout seul dès que le téléphone est connecté.'; }
    };
  }
  // Annuler un envoi : on renvoie la même leçon sans aucune ligne, le tableau retire alors ses points.
  const fmtJ = d => d ? d.slice(8, 10) + '/' + d.slice(5, 7) : '';
  function mesEnvois(d){
    const f = lire(FAITS), ids = Object.keys(f).filter(id => typeof f[id] === 'object').sort((a, b) => f[b].t - f[a].t).slice(0, 8);
    if (!ids.length) return;
    const box = document.createElement('details'); box.className = 'kl-mes';
    box.innerHTML = `<summary>↩️ Mes envois (annuler une erreur)</summary>` + ids.map(id => `<div class="kl-mes-l"><span>${fmtJ(f[id].date)} · ${f[id].groupe} · ${f[id].n} ligne${f[id].n > 1 ? 's' : ''}</span><button class="btn" type="button" data-annul="${id}">Annuler</button></div>`).join('') + '<span class="empty" id="kl-mes-m"></span>';
    d.appendChild(box);
    box.querySelectorAll('[data-annul]').forEach(b => b.onclick = async () => {
      const id = b.dataset.annul, x = lire(FAITS)[id], m = box.querySelector('#kl-mes-m');
      if (b.dataset.ok !== '1'){ b.dataset.ok = '1'; b.textContent = 'Sûr ? Toucher encore'; b.classList.add('kl-rouge'); return; }
      m.textContent = 'Annulation…';
      try { await envoyer({id, date: x.date, groupe: x.groupe, lignes: []}); m.textContent = '✅ Envoi du ' + fmtJ(x.date) + ' (' + x.groupe + ') retiré du classement général.'; setTimeout(() => bouton(true), 1500); }
      catch(e){ m.textContent = navigator.onLine ? '⚠️ L\'annulation n\'a pas marché, réessaie.' : '📶 Pas d\'internet : réessaie quand le téléphone est connecté.'; b.dataset.ok = ''; b.textContent = 'Annuler'; b.classList.remove('kl-rouge'); }
    });
  }
  const st = document.createElement('style');
  st.textContent = '.kl-mes{margin-top:10px}.kl-mes summary{cursor:pointer;font-weight:700;padding:6px 0}.kl-mes-l{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:6px 0;border-top:1px solid #ddd}.kl-mes-l .btn{flex:0 0 auto;padding:6px 12px}.kl-rouge{background:#d62828!important;border-color:#d62828!important;color:#fff!important}';
  document.head.appendChild(st);
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
