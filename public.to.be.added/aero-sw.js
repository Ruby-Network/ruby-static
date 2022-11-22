import handle from "./aero/handle.js";

self.addEventListener("fetch", async (event) =>
  event.respondWith(
    handle(event, location).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  )
);

self.addEventListener("install", (event) => self.skipWaiting());
