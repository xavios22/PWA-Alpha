const CACHE_NAME = "pwa-demo",
urlsToCache = [
   
    './index.html',
    './assets',
    './sw.js',
    './script.js'
]
self.addEventListener('install', e => {
    console.log('Event: SW Installé')
    e.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          console.log('Fichers dans le cache')
          return cache.addAll(urlsToCache)
          .then( () => self.skipWaiting() )
          
        })
        .catch(err => console.log('Lenregistrement du cache a échoué', err) )
    )
  })
  
  self.addEventListener('activate', e => {
    console.log('Event: SW Active')
    const cacheWhitelist = [CACHE_NAME]
  
    e.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            
            if ( cacheWhitelist.indexOf(cacheName) === -1 )
              return caches.delete(cacheName)
          })
        )
      })
      .then(() => {
        console.log(' Le cache à été mise à jour ')
       
        return self.clients.claim()
      })
    )
  })
  
  self.addEventListener('fetch', e => {
    console.log('Event: SW Recupere')
  
    e.respondWith(
      
      caches.match(e.request)
        .then(res => {
          console.log('Recupration du cache ')
          if ( res ) {
            
            return res
          }
          
          return fetch(e.request)
        })
      )
  })
  