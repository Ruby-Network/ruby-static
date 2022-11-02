self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
         return cache.addAll(["./index.html","./index.css","/settings/index.html","/settings/index.html","/games/index.html","/games/index.html"]);
        }));
});

self.addEventListener("fetch", e => {
    console.log(`Intercepting fetch request for: ${e.request.url}`);
});