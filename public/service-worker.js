const CACHE_STATIC_NAME = "static-cache:v1.0";
const CACHE_DYNAMIC_NAME = "dynamic-cache:v1.0";
const urlToCache = ["/", "bundle.js", "vendors~bundle.js"];

self.addEventListener("install", (event) => {
  console.log("Sw installing...");
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then((cache) => {
      console.log("Urls was successfuly cached" + urlToCache);
      return cache.addAll(urlToCache);
    })
  );
});

// HERE WE USE STRATEGY NETWORK FIRST
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => caches.match(event.request))
  );
});

self.addEventListener("activate", (event) => {
  console.log("SW activating...", event);
  const cacheWhiteList = [CACHE_STATIC_NAME, CACHE_DYNAMIC_NAME];
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (!cacheWhiteList.includes(key)) {
            console.log("SW removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'PWA Pet project';
  const options = {
    body: 'Foto was posted',
    icon: 'assets/logo.svg',
    // badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('/posts')
  );
});

