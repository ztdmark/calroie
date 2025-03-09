const CACHE_NAME = 'calorie-tracker-v1';
const urlsToCache = [
    '/',
    '/calroie/index.html',
    '/calroie/styles.css',
    '/calroie/app.js',
    '/calroie/icon-192.png',
    '/calroie/icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request).catch(() => {
                    return caches.match('/calroie/index.html'); // Fallback to index.html
                });
            })
    );
});
