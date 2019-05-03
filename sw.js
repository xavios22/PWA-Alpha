const CACHE_NAME = 'v1';
const STATIC_CACHE_URLS = ['./','index.html','./contact.html','assets/css/main.css','assets/css/font-awesome.min.css','sw.js','script.js','manifest.json','assets/js/jquery.min.js','assets/js/jquery.dropotron.min.js','assets/js/jquery.scrollex.min.js','assets/js/browser.min.js','assets/js/breakpoints.min.js','assets/js/util.js','assets/js/main.js','assets/fonts/fontawesome-webfont.woff2?v=4.7.0'];

self.addEventListener('install', Event => {
    console.log('Service Worker Installe.');
    Event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
          console.log('fichier dans le cache ')
          return cache.addAll(STATIC_CACHE_URLS)  
        })
        .catch(err => console.log('erreur', err))
      )
  });
  
  self.addEventListener('activate', e => {
    console.log('Service Worker Active.');
    const cacheWhitelist = [CACHE_NAME]
    
    e.waitUntil(
        caches.keys().then(cacheNames => {
          return Promise.all(
            cacheNames.map(cacheName => {
              //Eliminamos lo que ya no se necesita en cache
              if ( cacheWhitelist.indexOf(cacheName) === -1 )
                return caches.delete(cacheName)
            })
          )
        })
        .then(() => {
          console.log('Cache actualizado')
          // Le indica al SW activar el cache actual
          return self.clients.claim()
        })
    )
  });

  self.addEventListener('fetch', e => {
    console.log('Evento: SW Recuperando')
  
    e.respondWith(
      //Miramos si la petición coincide con algún elemento del cache
      caches.match(e.request)
        .then(res => {
          console.log('Recuperando cache')
          if ( res ) {
            //Si coincide lo retornamos del cache
            return res
          }
          //Sino, lo solicitamos a la red
          return fetch(e.request)
        })
      )
  })
  
  self.addEventListener('push', e => {
    console.log('Evento: Push')
  
    let title = 'Notification Demo',
      options = {
        body: 'Notification push ',
        icon: './images/iconos/icon_64x64.png',
        vibrate: [100, 50, 100],
        data: { id: 1 },
        actions: [
          { 'action': 'Si', 'title': 'Ouvrir Notification ', icon: './images/iconos/icon_64x64.png' },
          { 'action': 'No', 'title': 'Fermer Notification', icon: './images/iconos/icon_64x64.png' }
        ]
      }
  
      e.waitUntil( self.registration.showNotification(title, options) )
  })
  
  self.addEventListener('notificationclick', e => {
    console.log(e)
  
    if ( e.action === 'Si' ) {
      console.log('Ouvrir Notification ')
      clients.openWindow('https://github.com/xavios22/PWA-Alpha')
    } else if ( e.action === 'No' ) {
      console.log('Fermer Notification')
    }
  
    e.notification.close()
  })
  
  // self.addEventListener('sync', e => {
  //   console.log('Evento: Sincronización de Fondo', e)
  
  //   //Revisamos que la etiqueta de sincronización sea la que definimos o la que emulan las devtools
  //   if ( e.tag === 'github' || e.tag === 'test-tag-from-devtools' ) {
  //     e.waitUntil(
  //       //Comprobamos todas las pestañas abiertas y les enviamos postMessage
  //       self.clients.matchAll()
  //         .then(all => {
  //           return all.map(client => {
  //             return client.postMessage('online')
  //           })
  //         })
  //         .catch( err => console.log(err) )
  //     )
  //   }
  // })
  
  // self.addEventListener('fetch', e => {
  //   console.log('Event: SW Recupéré')
  //   e.respondWith(
  //     caches.match(e.request)
  //       .then(reponse => {
  //         if (reponse)
  //         return reponse
  //       })
  //   )
  // })
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
  