const CACHE = ‘director-live-v1’;
const ASSETS = [
‘.’,
‘index.html’,
‘manifest.json’,
‘icon.png’,
‘https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;600&family=Bebas+Neue&family=Noto+Sans+TC:wght@400;500;700&display=swap’
];

// Install: cache everything
self.addEventListener(‘install’, e => {
e.waitUntil(
caches.open(CACHE).then(cache => cache.addAll(ASSETS))
);
self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener(‘activate’, e => {
e.waitUntil(
caches.keys().then(keys =>
Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
)
);
self.clients.claim();
});

// Fetch: cache first, fallback to network
self.addEventListener(‘fetch’, e => {
e.respondWith(
caches.match(e.request).then(cached => cached || fetch(e.request))
);
});
