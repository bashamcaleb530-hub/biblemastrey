const CACHE_NAME = 'biblemastery-desktop-v7-public-branding';
const OFFLINE_SHELL = 'biblemastery-offline-shell-v1';
const CORE_ASSETS = [
  '/', '/index.html', '/personal-study.html', '/main.html', '/library.html',
  '/account.html', '/manifest.json',
  '/redemptive-names-software-apple-touch-180.png',
  '/redemptive-names-software-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE_NAME);
    await Promise.all(CORE_ASSETS.map(async url=>{
      try{const response=await fetch(url,{cache:'reload'});if(response.ok)await cache.put(url,response);}catch(error){}
    }));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const names=await caches.keys();
    await Promise.all(names.filter(name=>name.startsWith('biblemastery-desktop-')&&name!==CACHE_NAME).map(name=>caches.delete(name)));
    await self.clients.claim();
  })());
});
async function cachedPage(path){
  const current=await caches.open(CACHE_NAME),saved=await caches.open(OFFLINE_SHELL);
  return (await current.match(path))||(await saved.match(path));
}
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin)return;
  if(request.mode==='navigate'){
    event.respondWith((async()=>{
      try{
        const response=await fetch(request,{cache:'reload'});
        if(response.ok){
          const cache=await caches.open(CACHE_NAME);
          if(CORE_ASSETS.includes(url.pathname))await cache.put(url.pathname,response.clone());
          return response;
        }
        if(response.status<500)return response;
        const saved=await cachedPage(url.pathname);return saved||response;
      }catch(error){
        const saved=await cachedPage(url.pathname);if(saved)return saved;
        if(url.pathname==='/'||url.pathname==='/index.html'||url.pathname==='/main.html'){
          const home=await cachedPage('/personal-study.html');if(home)return home;
        }
        return new Response('<!doctype html><meta name="viewport" content="width=device-width"><title>BibleMastery Offline</title><p>This page has not been saved offline yet.</p><p><a href="/library.html">Open saved Library books</a></p>',{status:503,headers:{'Content-Type':'text/html; charset=utf-8'}});
      }
    })());return;
  }
  if(!/\.(?:css|js|png|jpg|jpeg|svg|webp|ico|woff2?|ttf)$/i.test(url.pathname)&&url.pathname!=='/manifest.json')return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE_NAME);
    try{const response=await fetch(request,{cache:'reload'});if(response.ok)await cache.put(request,response.clone());return response;}
    catch(error){return (await cache.match(request))||Response.error();}
  })());
});
