// Fait marcher les applis sans internet. Version a changer a chaque mise en ligne pour rafraichir le cache.
const VERSION = 'eps-v168';
const FICHIERS = [
  './', './index.html', './sauvegarde.js', './manifest.webmanifest', './eleves.chiffre.json', './perso.js',
  './carnet/', './carnet/aide.js', './carnet/skore.js', './carnet/prepa-moteur.js', './carnet/prepa-guide.js', './carnet/travail.js', './carnet/planning.js', './carnet/deux-activites.js', './carnet/archives.js', './carnet/google/', './carnet/google/Code.gs', './carnet/prepas/schemas.js', './carnet/prepas/basket.js', './carnet/prepas/volley.js', './carnet/prepas/hand.js', './carnet/prepas/natation.js', './carnet/prepas/natdeb.js', './carnet/prepas/endurance.js', './carnet/prepas/bad.js', './carnet/prepas/danse.js', './carnet/prepas/acro.js', './carnet/prepas/prisonnier.js', './carnet/prepas/athle.js', './carnet/prepas/foot.js', './carnet/prepas/corde.js', './carnet/prepas/lutte.js', './carnet/prepas/hiver.js', './tournoi/', './koh-lanta/', './tableau/', './le-fist/', './classeur/', './battle/', './battle/acces.js', './battle/acces.chiffre.json', './battle/manifest.webmanifest', './installer/',
  './icones/carnet-180.png', './icones/carnet-192.png', './icones/carnet-512.png',
  './icones/eps-180.png', './icones/eps-192.png', './icones/eps-512.png',
  './icones/tournoi-180.png', './icones/tournoi-192.png', './icones/tournoi-512.png',
  './icones/koh-lanta-180.png', './icones/koh-lanta-192.png', './icones/koh-lanta-512.png',
  './icones/le-fist-180.png', './icones/le-fist-192.png', './icones/le-fist-512.png',
  './icones/classeur-180.png', './icones/classeur-192.png', './icones/classeur-512.png',
  './icones/battle-180.png', './icones/battle-192.png', './icones/battle-512.png'
];

self.addEventListener('install', e => {
  // cache 'reload' : on prend les fichiers frais sur le site, jamais une vieille copie du navigateur.
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FICHIERS.map(f => new Request(f, {cache: 'reload'})))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(cles => Promise.all(cles.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Pages du site : d'abord internet (pour avoir la derniere version), sinon la copie gardee.
// Polices Google : la copie gardee d'abord.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Sans reseau (mode avion) : on ne tente meme pas internet, sinon l'iPhone affiche une alerte.
  if (self.navigator && self.navigator.onLine === false) {
    e.respondWith(caches.match(req, {ignoreSearch: true}).then(r => r || Response.error()));
    return;
  }
  const police = url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com';
  if (police) {
    // Pas encore gardee et reseau trop lent : on continue sans la police plutot que bloquer l'affichage.
    const vide = () => new Response('', {headers: {'Content-Type': url.host === 'fonts.googleapis.com' ? 'text/css' : 'font/woff2'}});
    e.respondWith(caches.match(req).then(r => r || Promise.race([fetch(req).then(rep => {
      const copie = rep.clone(); caches.open(VERSION).then(c => c.put(req, copie)); return rep;
    }).catch(vide), new Promise(ok => setTimeout(() => ok(vide()), 2500))])));
    return;
  }
  if (url.origin !== location.origin) return;
  // Pages du site : la copie du telephone s'ouvre tout de suite (rapide, meme en mode avion).
  // En meme temps, on redemande le site pour garder une copie a jour. Chaque mise en ligne change
  // VERSION : le telephone installe alors la nouvelle version et la page se recharge toute seule.
  const reseau = (req.mode === 'navigate' ? fetch(req.url, {cache: 'no-cache', credentials: 'same-origin'}) : fetch(req, {cache: 'no-cache'}))
    .then(rep => {
      if (rep.ok && !rep.redirected) { const copie = rep.clone(); caches.open(VERSION).then(c => c.put(req, copie)); }
      return rep;
    });
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(copie =>
    copie || reseau.then(rep => (rep.redirected && req.mode === 'navigate') ? Response.redirect(rep.url, 302) : rep)));
  e.waitUntil(reseau.catch(() => {}));
});
