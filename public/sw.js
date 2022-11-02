self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
         return cache.addAll(["./index.html","./index.css","/settings/index.html","/settings/index.html","/games/index.html","/games/index.html"]);
        }));
        self.skipWaiting();
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(Response => {
            return Response || fetch(e.request);
        })
    );
});
