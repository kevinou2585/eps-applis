"""Construit tournoi/index.html et koh-lanta/index.html a partir des fichiers sources des applis.

Usage : python3 outils/construire.py <Tournoi comptage.html> <Koh-Lanta appli collegues.html> <Carnet EPS.html>
"""
import re
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
<meta name="apple-mobile-web-app-title" content="EPS">
<style>/* Pas de zoom quand on tape vite deux fois sur un bouton (iPhone) */
html,body,button,a,input,label,select{{touch-action:manipulation}}
/* Retour vers l'accueil de l'appli EPS */
.eps-retour{{display:flex;flex-wrap:wrap;align-items:center;gap:2px 6px;max-width:680px;margin:0 auto;padding:10px 16px 0;font:600 14px system-ui,-apple-system,sans-serif;color:#5d6a60;text-decoration:none}}
@media (prefers-color-scheme:dark){{.eps-retour{{color:#9aa89e}}}}</style>
"""


RETOUR = '<a class="eps-retour" href="../"><span style="white-space:nowrap">‹ Mes applis</span></a>\n'

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
    # Version publique : pas de noms d'eleves, chacun ajoute les siens.
    corps = re.sub(r"const ROSTER = \{.*?\n\};", "const ROSTER = {jaune:[], vert:[], bleu:[], rouge:[]};", corps, count=1, flags=re.S)
    if "Abdelhakim" in corps:
        sys.exit("Koh-Lanta : noms d'eleves restants")
    if "copy-link" in corps or "claude.ai" in corps:
        sys.exit("Reste un lien claude.ai dans Koh-Lanta")
    return (tete("Koh-Lanta Arène", "koh-lanta", "#e8590c") + style_base + "\n</head>\n<body>\n"
            + RETOUR + corps + PIED)


if __name__ == "__main__":
    (RACINE / "tournoi/index.html").write_text(tournoi(sys.argv[1]), encoding="utf-8")
    (RACINE / "koh-lanta/index.html").write_text(koh_lanta(sys.argv[2]), encoding="utf-8")
    (RACINE / "carnet/index.html").write_text(carnet(sys.argv[3]), encoding="utf-8")
    print("ok")
