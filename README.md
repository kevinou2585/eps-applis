# Applis EPS

Site des applis EPS de Kevin, servi par GitHub Pages : Tournoi et Koh-Lanta Arène.
Installables sur téléphone, sans compte, fonctionnent hors ligne. Les données restent dans le navigateur de chaque prof (localStorage).

- `index.html` + `manifest.webmanifest` : l'appli EPS à installer (une seule), qui ouvre les autres
- `tournoi/`, `koh-lanta/` : les applis (pages générées)
- `sw.js` : cache hors ligne. Changer `VERSION` à chaque mise en ligne.
- `outils/construire.py` : régénère les pages depuis les fichiers sources des applis.
