/* EFCQuiz v2.2.0 · funciona sem internet. Troque VERSAO a cada versão nova para atualizar o cache. */
const VERSAO = "efcquiz-v2.2.0";
const ARQUIVOS = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("efcquiz-") && k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  /* página: tenta a rede primeiro (pega versão nova) e cai no cache sem internet; o resto: cache primeiro */
  if (e.request.mode === "navigate"){
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(VERSAO).then(x => x.put("./index.html", c)); return r; }).catch(() => caches.match("./index.html")));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
