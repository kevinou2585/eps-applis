"""Construit tournoi/index.html et koh-lanta/index.html a partir des fichiers sources des applis.

Usage : python3 outils/construire.py <Tournoi comptage.html> <Koh-Lanta appli collegues.html>
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
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="../icones/{dossier}-192.png">
<link rel="apple-touch-icon" href="../icones/{dossier}-180.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="{titre}">
"""


PIED = """
<script>
if ('serviceWorker' in navigator) navigator.serviceWorker.register('../sw.js').catch(() => {});
</script>
</body>
</html>
"""


def tournoi(src):
    corps = Path(src).read_text(encoding="utf-8")
    corps = re.sub(r"^\s*<title>.*?</title>\s*", "", corps, count=1)
    return tete("Tournoi", "tournoi", "#1f7a4d") + "</head>\n<body>\n" + corps + PIED


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
    if "copy-link" in corps or "claude.ai" in corps:
        sys.exit("Reste un lien claude.ai dans Koh-Lanta")
    return (tete("Koh-Lanta Arène", "koh-lanta", "#e8590c") + style_base + "\n</head>\n<body>\n"
            + corps + PIED)


if __name__ == "__main__":
    (RACINE / "tournoi/index.html").write_text(tournoi(sys.argv[1]), encoding="utf-8")
    (RACINE / "koh-lanta/index.html").write_text(koh_lanta(sys.argv[2]), encoding="utf-8")
    print("ok")
