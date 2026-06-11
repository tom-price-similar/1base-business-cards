const CACHE_NAME = 'business-card-v3';
const urlsToCache = [
    './dougie.html',
    './max.html',
    './sai.html',
    './umer.html',
    './style.css',
    './dougie-manifest.json',
    './max-manifest.json',
    './sai-manifest.json',
    './umer-manifest.json',
    './images/favicon.ico',
    './images/apple-touch-icon.png',
    './images/favicon-96x96.png',
    './images/bg.svg',
    './images/icon.svg',
    './images/logo.svg'
];

// Install service worker and cache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate service worker and clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch cached resources or make network request
self.addEventListener('fetch', event => {
    // Skip chrome-extension and other non-http(s) requests
    if (!event.request.url.startsWith('http')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached response if found
                if (response) {
                    return response;
                }
                
                // Clone the request because it can only be used once
                let fetchRequest = event.request.clone();
                
                return fetch(fetchRequest).then(response => {
                    // Check if response is valid
                    if(!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clone the response because it can only be used once
                    let responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            // Only cache http(s) requests
                            if (event.request.url.startsWith('http')) {
                                cache.put(event.request, responseToCache);
                            }
                        });
                    
                    return response;
                });
            })
    );
});