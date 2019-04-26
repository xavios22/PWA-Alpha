const CACHE_NAME = 'v1';
const STATIC_CACHE_URLS = ['./','index.html','./contact.html','assets/css/main.css','assets/css/font-awesome.min.css','sw.js','script.js','manifest.json','assets/js/jquery.min.js','assets/js/jquery.dropotron.min.js','assets/js/jquery.scrollex.min.js','assets/js/browser.min.js','assets/js/breakpoints.min.js','assets/js/util.js','assets/js/main.js','assets/fonts/fontawesome-webfont.woff2?v=4.7.0'];

self.addEventListener('install', event => {
    console.log('Service Worker Installe.');
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(STATIC_CACHE_URLS))  
      )
  });
  
  self.addEventListener('activate', event => {
    console.log('Service Worker Active.');
  });

  self.addEventListener('fetch', event => {
    // Stratégie Cache-First
    event.respondWith(
      caches.match(event.request) // On vérifie si la requête a déjà été mise en cache
      .then(cached => cached || fetch(event.request)) // sinon on requête le réseau
    );
  });
// self.addEventListener('install', e => {
//     console.log('Event: SW Installé')
//     e.waitUntil(
//       caches.open(CACHE_NAME)
//         .then(cache => {
//           console.log('Fichers dans le cache')
//           return cache.addAll(urlsToCache)
//           .then( () => self.skipWaiting() )
          
//         })
//         .catch(err => console.log('Lenregistrement du cache a échoué', err) )
//     )
//   })
  
//   self.addEventListener('activate', e => {
//     console.log('Event: SW Active')
//     const cacheWhitelist = [CACHE_NAME]
  
//     e.waitUntil(
//       caches.keys().then(cacheNames => {
//         return Promise.all(
//           cacheNames.map(cacheName => {
            
//             if ( cacheWhitelist.indexOf(cacheName) === -1 )
//               return caches.delete(cacheName)
//           })
//         )
//       })
//       .then(() => {
//         console.log(' Le cache à été mise à jour ')
       
//         return self.clients.claim()
//       })
//     )
//   })
  
//   self.addEventListener('fetch', e => {
//     console.log('Event: SW Recupere')
  
//     e.respondWith(
      
//       caches.match(e.request)
//         .then(res => {
//           console.log('Recupration du cache ')
//           if ( res ) {
            
//             return res
//           }
          
//           return fetch(e.request)
//         })
//       )
//   })
  