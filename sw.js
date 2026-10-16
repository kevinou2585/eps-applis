// Fait marcher les applis sans internet. Version a changer a chaque mise en ligne pour rafraichir le cache.
const VERSION = 'eps-v3';
const FICHIERS = [
  './', './index.html',
  './tournoi/', './tournoi/manifest.webmanifest',
  './koh-lanta/', './koh-lanta/manifest.webmanifest',
  './icones/tournoi-180.png', './icones/tournoi-192.png', './icones/tournoi-512.png',
  './icones/koh-lanta-180.png', './icones/koh-lanta-192.png', './icones/koh-lanta-512.png'
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
  e.respondWith(fetch(req).then(rep => {
    if (rep.ok) { const copie = rep.clone(); caches.open(VERSION).then(c => c.put(req, copie)); }
    return rep;
  }).catch(() => caches.match(req, {ignoreSearch: true})));
});
