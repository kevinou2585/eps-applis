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
  if (s) { const g = document.createElement('a'); g.className = 'eps-gen'; g.href = '../tableau/'; g.innerHTML = '<b>🏆</b>Général'; tabs.appendChild(g); tabs.style.setProperty('--n', 4); }
  document.body.appendChild(tabs);
})();
</script>
"""

PIED = """
<script>
if ('serviceWorker' in navigator && navigator.onLine) navigator.serviceWorker.register('../sw.js').catch(() => {});
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
    retour = RETOUR.replace('</a>\n', '<span style="font-weight:500">· Version bêta, pas encore finie</span></a>\n')
    return tete("Carnet EPS", "carnet", "#2f6fd0") + "</head>\n<body>\n" + retour + corps + PIED


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
    if (!d){ d = document.createElement('div'); d.id = 'kl-envoi'; d.className = 'card'; act.before(d); }
    const p = lecon(), fait = lire(FAITS)[p.id], attente = lire(FILE)[p.id];
    d.innerHTML = `<button class="btn btn-main" type="button">📤 Envoyer au tableau général</button><span class="empty" id="kl-envoi-m">${attente ? '📶 En attente d\'internet : ce sera envoyé tout seul.' : fait ? '✅ Déjà envoyé aujourd\'hui. Renvoyer remplace l\'envoi précédent.' : 'Envoie la fiche du groupe ' + p.groupe + ' dans le classement général.'}</span>`;
    d.querySelector('button').onclick = async () => {
      const p = lecon(), m = document.getElementById('kl-envoi-m');
      if (!p.lignes.length){ m.textContent = 'Rien à envoyer : personne n\'a de points.'; return; }
      m.textContent = 'Envoi…';
      try { await envoyer(p); m.textContent = '✅ Envoyé au tableau général (' + p.lignes.length + ' ligne' + (p.lignes.length > 1 ? 's' : '') + ').'; }
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
    # Page d'installation = l'accueil, servi depuis une sous-page (liens relatifs ramenes a la racine).
    accueil = (RACINE / "index.html").read_text(encoding="utf-8")
    (RACINE / "installer").mkdir(exist_ok=True)
    (RACINE / "installer/index.html").write_text(accueil.replace("<head>\n", '<head>\n<base href="../">\n', 1), encoding="utf-8")
    print("ok")
