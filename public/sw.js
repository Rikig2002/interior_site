const CACHE_NAME = 'manish-interior-pwa-v1'
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/icon-192.svg',
  '/icon-512.svg',
]

const isSameOrigin = (requestUrl) => requestUrl.origin === self.location.origin

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
      ),
    ).then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const requestUrl = new URL(request.url)

  if (request.method !== 'GET') {
    return
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put('/index.html', responseClone))
          return response
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME)
          const cachedPage = await cache.match('/index.html')
          return cachedPage || cache.match('/')
        }),
    )
    return
  }

  if (!isSameOrigin(requestUrl)) {
    return
  }

  const isCacheFirstAsset =
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image' ||
    request.destination === 'font' ||
    requestUrl.pathname.startsWith('/assets/')

  if (isCacheFirstAsset) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request)
        if (cachedResponse) {
          return cachedResponse
        }

        const networkResponse = await fetch(request)
        cache.put(request, networkResponse.clone())
        return networkResponse
      }),
    )
    return
  }

  event.respondWith(
    fetch(request).catch(async () => {
      const cache = await caches.open(CACHE_NAME)
      return cache.match(request)
    }),
  )
})
