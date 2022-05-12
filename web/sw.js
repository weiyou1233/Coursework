let CACHE_VERSION = 4;
let CACHE_NAME = 'cache_v' + CACHE_VERSION
let CACHE_URLS = [
  '/',
]


// function precache() {
//   return caches
//     .open(CACHE_NAME)
//     .then(cache => {
//       return cache.addAll(CACHE_URLS)
//     })
// }

// function clearCache() {
//   return caches.keys().then(keys => {
//     keys.forEach(key => {
//       if (key != CACHE_NAME) {
//         caches.delete(key)
//       }
//     });
//   })
// }

// function saveToCache(req, res) {
//   return caches
//     .open(CACHE_NAME)
//     .then(cache => cache.put(req, res))
  
// }

// function fetchAndCache(req) {
//   return fetch(req).then(res => {
//     saveToCache(req, res.clone())
//     return res
//   })
// }

// self.addEventListener('install', e => {
//   e.waitUntil(
//     precache().then(self.skipWaiting)
//   );
// })

// self.addEventListener('activate', e => {
//   e.waitUntil(
//     Promise.all([
//       clearCache(),
//       self.clients.claim()

//     ])
//   )
// })


// self.addEventListener('fetch', e => {

//   let url = new URL(e.request.url);
//   if (url.origin !== self.origin) {
//     return
//   }

//   if (e.request.url.includes('http://localhost:3000/getStories')) {
//     e.respondWith(
//       fetchAndCache(e.request).catch(() => {
//         return caches.match(e.request)
//       })
//     )
//     return
//   }

//   e.respondWith(
//     fetch(e.request).catch(() => {
//       return caches.match(e.request)
//     })
//   );
// });

//////////////////////////////////////////


self.addEventListener('install', e => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(CACHE_URLS)
      })
      .then(self.skipWaiting)
  );
})

self.addEventListener('activate', e => {
  e.waitUntil(
    Promise.all([
      caches.keys().then(keys => {
        keys.forEach(key => {
          if (key != CACHE_NAME) {
            caches.delete(key)
          }
        });
      }),
      self.clients.claim()
    ])
  )
})

self.addEventListener('fetch', e => {

  let url = new URL(e.request.url);
  if (url.origin !== self.origin) {
    return
  }

  if (e.request.url.includes('http://localhost:3000/getStories')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          let _res = res.clone()
          caches
            .open(CACHE_NAME)
            .then(cache => cache.put(req, _res))
          return res
        })
        .catch(() => {
          return caches.match(e.request)
        })
    )
    return
  }

  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request)
    })
  );
});