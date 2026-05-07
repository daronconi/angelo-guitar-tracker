// Angelo Guitar Co. — Build Tracker Service Worker
// Version: 1.0.0
// Caches all app assets for full offline support

const CACHE_NAME = 'angelo-guitar-v1';
const OFFLINE_URL = '/';

// Files to cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// ── INSTALL ──────────────────────────────────────────────────────────────────
// Cache all static assets immediately
self.addEventListener('install', function(event) {
  console.log('Angelo SW: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Angelo SW: Pre-caching app shell');
      return cache.addAll(PRECACHE_URLS);
    }).then(function() {
      // Take control immediately — don't wait for old SW to die
      return self.skipWaiting();
    })
  );
});

// ── ACTIVATE ─────────────────────────────────────────────────────────────────
// Clean up old caches from previous versions
self.addEventListener('activate', function(event) {
  console.log('Angelo SW: Activating...');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          console.log('Angelo SW: Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(function() {
      // Take control of all open clients
      return self.clients.claim();
    })
  );
});

// ── FETCH ─────────────────────────────────────────────────────────────────────
// Cache-first strategy: serve from cache, fall back to network
// For this app (single HTML file + Google Fonts), this means:
//   - App shell (index.html): always from cache → instant load, works offline
//   - Google Fonts: network first, fall back to cache
//   - Everything else: cache first
self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);

  // Google Fonts — try network first for latest, fall back to cache
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          // Cache the fresh font response
          if (response && response.status === 200) {
            cache.put(event.request, response.clone());
          }
          return response;
        }).catch(function() {
          // Offline — serve from cache if available
          return cache.match(event.request);
        });
      })
    );
    return;
  }

  // App shell and all other requests — cache first
  event.respondWith(
    caches.match(event.request).then(function(cachedResponse) {
      if (cachedResponse) {
        // Serve from cache immediately
        // Also fetch fresh copy in background to update cache
        fetch(event.request).then(function(response) {
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, response.clone());
            });
          }
        }).catch(function() {
          // Silent fail — we already have a cached version
        });
        return cachedResponse;
      }

      // Not in cache — fetch from network
      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        // Cache the new response
        var responseToCache = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(function() {
        // Completely offline and not cached — return the app shell
        return caches.match('/index.html');
      });
    })
  );
});

// ── MESSAGE HANDLER ───────────────────────────────────────────────────────────
// Listen for messages from the app (e.g., force cache refresh)
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME).then(function() {
      console.log('Angelo SW: Cache cleared');
    });
  }
});
