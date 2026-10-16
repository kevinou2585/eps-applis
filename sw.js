// Fait marcher les applis sans internet. Version a changer a chaque mise en ligne pour rafraichir le cache.
const VERSION = 'eps-v23';
const FICHIERS = [
  './', './index.html', './manifest.webmanifest', './eleves.chiffre.json',
  './carnet/', './tournoi/', './koh-lanta/', './tableau/', './le-fist/', './installer/',
  './icones/carnet-180.png', './icones/carnet-192.png', './icones/carnet-512.png',
  './icones/eps-180.png', './icones/eps-192.png', './icones/eps-512.png',
  './icones/tournoi-180.png', './icones/tournoi-192.png', './icones/tournoi-512.png',
  './icones/koh-lanta-180.png', './icones/koh-lanta-192.png', './icones/koh-lanta-512.png',
  './icones/le-fist-180.png', './icones/le-fist-192.png', './icones/le-fist-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
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
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(rep => {
      const copie = rep.clone(); caches.open(VERSION).then(c => c.put(req, copie)); return rep;
    })));
    return;
  }
  if (url.origin !== location.origin) return;
  // no-cache : on redemande toujours au site s'il y a du neuf (sinon le telephone garde 10 min l'ancienne page).
  const reseau = req.mode === 'navigate' ? fetch(req.url, {cache: 'no-cache', credentials: 'same-origin'}) : fetch(req, {cache: 'no-cache'});
  e.respondWith(reseau.then(rep => {
    if (rep.redirected && req.mode === 'navigate') return Response.redirect(rep.url, 302);
    if (rep.ok) { const copie = rep.clone(); caches.open(VERSION).then(c => c.put(req, copie)); }
    return rep;
  }).catch(() => caches.match(req, {ignoreSearch: true})));
});
