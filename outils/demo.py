#!/usr/bin/env python3
"""Fabrique demo-carnet/index.html (Carnet EPS de démonstration) à partir de carnet/index.html.

A relancer après chaque changement du carnet :  python3 outils/demo.py
- base ../carnet/ : les scripts, prépas et aides du vrai carnet servent tels quels ;
- localStorage -> DEMO_LS (demo-carnet/demo.js) : la démo a son propre rangement, le vrai carnet n'est jamais touché ;
- retirés : perso.js (porte à code), manifeste (installation), lien « Mes applis », liaison Google Drive ;
- donnees.js (le carnet fictif) et demo.js en tête, demo-fin.js (bandeau, remise à zéro) à la fin.
Les données fictives se refont avec outils/demo-donnees.js (voir l'en-tête de ce fichier).
"""
import pathlib, re

RACINE = pathlib.Path(__file__).resolve().parent.parent
s = (RACINE / 'carnet/index.html').read_text(encoding='utf-8')

def ote(texte, quoi):
    assert quoi in texte, quoi[:60]
    return texte.replace(quoi, '', 1)

s = ote(s, '<script src="../perso.js"></script>\n')
s = ote(s, '<link rel="manifest" href="../manifest.webmanifest">\n')
s = s.replace('<meta charset="utf-8">\n', '<meta charset="utf-8">\n<base href="../carnet/">\n<meta name="robots" content="noindex">\n'
              '<script src="../demo-carnet/donnees.js"></script>\n<script src="../demo-carnet/demo.js"></script>\n', 1)
s = s.replace('<title>Carnet EPS</title>', '<title>Carnet EPS · démo</title>', 1)
s, n = re.subn(r'<a class="eps-retour" href="\.\./">.*?</a>\n', '', s, count=1)
assert n == 1, 'lien Mes applis'
# liaison Google Drive : tout le bloc <script> du module « carnet-drive »
i = s.index("const CLE = 'carnet-drive'")
a, b = s.rindex('<script>', 0, i), s.index('</script>', i) + len('</script>\n')
s = s[:a] + s[b:]
s = s.replace('localStorage', 'DEMO_LS')
s = s.replace('</body>', '<script src="../demo-carnet/demo-fin.js"></script>\n</body>', 1)
s = s.replace('<!doctype html>', '<!doctype html>\n<!-- Fabriqué par outils/demo.py à partir de carnet/index.html : ne pas modifier à la main. -->', 1)
(RACINE / 'demo-carnet/index.html').write_text(s, encoding='utf-8')
print('demo-carnet/index.html :', len(s), 'caractères')
