/* global caches, fetch, self */

const PRECACHE = 'precache-v0'
const RUNTIME = 'runtime'
const OFFLINE_PATH = '/offline'

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  OFFLINE_PATH,
  '/static/assets/favicon-16x16.png',
  '/static/assets/favicon-32x32.png',
  '/static/assets/favicon-96x96.png',
  '/static/assets/icon-192.png',
  '/static/assets/icon-512.png',
  '/static/client.js',
  '/static/styles/base.css',
  '/static/styles/highlight.css'
]

const API_BASE_URL = 'https://ykqc8n2b.apicdn.sanity.io'

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  )
})

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME]
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => cacheNames.filter(cacheName => !currentCaches.includes(cacheName)))
      .then(cachesToDelete =>
        Promise.all(cachesToDelete.map(cacheToDelete => caches.delete(cacheToDelete)))
      )
      .then(() => self.clients.claim())
  )
})

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // All Sanity requests
  if (event.request.url.startsWith(API_BASE_URL)) {
    // Cache then network
    event.respondWith(
      fetch(event.request)
        .then(response => {
          return caches.open(RUNTIME).then(cache => {
            // Put a copy of the response in the runtime cache
            return cache.put(event.request, response.clone()).then(() => response)
          })
        })
        .catch(() => caches.match(event.request))
    )
  }

  // Same-origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    // HTML requests
    if (
      event.request.mode === 'navigate' ||
      (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))
    ) {
      // Respond with the fetched screen, fallback to the offline screen
      event.respondWith(fetch(event.request.url).catch(() => caches.match(OFFLINE_PATH)))
      return
    }

    // All other requests (static files)
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) return cachedResponse
        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => response)
          })
        })
      })
    )
  }
})
