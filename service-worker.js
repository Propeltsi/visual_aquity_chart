// Basic offline-first service worker (cache versioning)
const CACHE_NAME = "acuity-chart-v1";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./favicon.svg",
  "./manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  // Pre-cache core assets and activate immediately so first load becomes controllable
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  // Only handle GET
  if (req.method !== "GET") return;
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((resp) => {
          // Cache successful same-origin responses
          try {
            const url = new URL(req.url);
            if (
              url.origin === location.origin &&
              resp.status === 200 &&
              resp.type === "basic"
            ) {
              const respClone = resp.clone();
              caches
                .open(CACHE_NAME)
                .then((cache) => cache.put(req, respClone));
            }
          } catch (_) {}
          return resp;
        })
        .catch(() => {
          // Optional: could return a fallback page or image here
          return (
            cached ||
            new Response("Offline", { status: 503, statusText: "Offline" })
          );
        });
    })
  );
});
