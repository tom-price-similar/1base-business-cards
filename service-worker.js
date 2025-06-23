const CACHE_NAME = 'business-card-v2';
const urlsToCache = [
    './',
    './index.html',
    './create.html',
    './card.html',
    './styles/styles.css',
    './scripts/app.js',
    './scripts/create.js',
    './scripts/card.js',
    './scripts/libs/qrcode.min.js',
    './manifest.json',
    './images/card.png',
    './images/icons/phone.svg',
    './images/icons/email.svg',
    './images/icons/website.svg',
    './images/icons/location.svg',
    './images/icons/linkedin.svg',
    './images/icons/twitter.svg',
    './images/icons/github.svg'
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
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                });
            })
    );
});