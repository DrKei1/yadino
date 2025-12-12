
const CACHE_NAME = 'python-tutor-pyodide-v1';
const PYODIDE_VERSION = 'v0.25.1';
const PYODIDE_BASE_URL = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`;

// List of critical Pyodide files to pre-cache
const urlsToCache = [
  PYODIDE_BASE_URL + 'pyodide.js',
  PYODIDE_BASE_URL + 'pyodide.data',
  PYODIDE_BASE_URL + 'pyodide.asm.js',
  PYODIDE_BASE_URL + 'pyodide.asm.wasm',
  PYODIDE_BASE_URL + 'pyodide_py.tar', // This is often a large file needed
];

// During the install phase, cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching critical Pyodide assets');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache during install:', error);
      })
  );
  // `self.skipWaiting()` activates the new service worker immediately
  // This helps avoid delays in activating the SW on subsequent navigations.
  self.skipWaiting();
});

// During the activate phase, clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        })
      );
    })
  );
  // `self.clients.claim()` allows the service worker to take control of un-'controlled' clients
  // immediately after it is activated.
  self.clients.claim();
});

// Intercept fetch requests and serve from cache if available
self.addEventListener('fetch', (event) => {
  // Only intercept requests for Pyodide assets from the CDN
  if (event.request.url.startsWith(PYODIDE_BASE_URL)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Cache hit - return response
        if (response) {
          console.log('Service Worker: Serving from cache:', event.request.url);
          return response;
        }
        // No cache hit - fetch from network
        console.log('Service Worker: Fetching from network and caching:', event.request.url);
        return fetch(event.request).then((networkResponse) => {
          // Check if we received a valid response
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          // IMPORTANT: Clone the response. A response is a stream and can only be consumed once.
          // We must consume it once to cache it, and once to return it to the browser.
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        });
      }).catch((error) => {
        console.error('Service Worker: Fetch failed for:', event.request.url, error);
        // Fallback for network failures during a cache miss or if cache itself fails
        // For Pyodide, if network fails and not in cache, the component might just show its loading/error state.
        throw error; // Rethrow to allow component to handle network failure
      })
    );
  }
  // For all other requests, let the browser handle them normally (go to network)
  return;
});
