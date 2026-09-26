/* EFClaudian.tec — sw.js (v2.53.0): guarda a TELA do app no aparelho para abrir sem internet.
   Os DADOS não passam por aqui: o Firestore já guarda o cache dele e sincroniza quando a conexão volta.
   Ao publicar uma versão nova do index.html, troque o número abaixo (o app avisa "Versão nova pronta"). */
const VERSAO = 'efclaudian-v2.53.0';
const TELA = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];
const FORA = [
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js'
];
self.addEventListener('install', ev => {
  ev.waitUntil(caches.open(VERSAO).then(c => Promise.all(TELA.concat(FORA).map(u => c.add(u).catch(() => null)))));
});
self.addEventListener('activate', ev => {
  ev.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.indexOf('efclaudian-') === 0 && k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', ev => { if (ev.data === 'pular') self.skipWaiting(); });
self.addEventListener('fetch', ev => {
  const r = ev.request; if (r.method !== 'GET') return;
  const u = new URL(r.url);
  /* Firestore / login: sempre direto (nunca guardar) */
  if (/googleapis\.com$|firebaseio\.com$|identitytoolkit|securetoken/.test(u.hostname) || u.pathname.indexOf('/google.firestore') >= 0) return;
  /* a tela (index.html): primeiro a internet (pega a versão nova); sem internet, a guardada */
  if (r.mode === 'navigate') {
    ev.respondWith(fetch(r).then(resp => { const cp = resp.clone(); caches.open(VERSAO).then(c => c.put('./index.html', cp)); return resp; })
      .catch(() => caches.match('./index.html').then(x => x || caches.match('./'))));
    return;
  }
  /* SDK do Firebase, fontes e ícones: do aparelho primeiro */
  if (u.hostname === 'www.gstatic.com' || /fonts\.(googleapis|gstatic)\.com$/.test(u.hostname) || u.origin === self.location.origin) {
    ev.respondWith(caches.match(r).then(x => x || fetch(r).then(resp => { if (resp && resp.status === 200) { const cp = resp.clone(); caches.open(VERSAO).then(c => c.put(r, cp)); } return resp; })));
  }
});
