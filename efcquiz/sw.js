/* EFCquiz · endereço antigo (/efclaudian/efcquiz/). Este arquivo só se desfaz: apaga o que o app antigo guardou e se remove.
   O EFCquiz agora vive em https://eliasgrigori.github.io/EFCquiz/ */
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) {
  e.waitUntil((async function () {
    try { var ks = await caches.keys(); await Promise.all(ks.filter(function (k) { return /^efcquiz-v(0|1|2\.[0-2])[.\d]*$/.test(k); }).map(function (k) { return caches.delete(k); })); } catch (x) {}
    try { await self.registration.unregister(); } catch (x) {}
    try { var cs = await self.clients.matchAll({ type: "window" }); cs.forEach(function (c) { c.navigate(c.url); }); } catch (x) {}
  })());
});
self.addEventListener("fetch", function () { /* sem cache: tudo vai direto à rede */ });
