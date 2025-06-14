self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('my-hours-cache').then(function(cache) {
      return cache.addAll([
        'index.html',
        'styles.css',
        'script.js',
        'manifest.json',
        'icon-192.png',
        'icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});