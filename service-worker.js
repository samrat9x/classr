const cacheName = "classRoutineCache-v6"; // Updated cache version
const assetsToCache = [
  "index.html",
  "style.css",
  "time.js",
  "task.js",
  "manifest.json",
  "icon-192x192.png",
  "icon-512x512.png",
  "./img/whatsappImage.png",
];

self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[Service Worker] Caching assets");
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("[Service Worker] Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  console.log("[Service Worker] Fetching:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

/* @@Previous Version

const cacheName = "complement-cache-v1";
const assetsToCache = [
  "index.html",
  "manifest.json",
  "icon-192x192.png", // Add your icon files here
  "icon-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});


*/
