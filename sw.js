// Service Worker for Image Caching
const CACHE_NAME = 'uk-tamil-awards-v1';
const IMAGE_CACHE = 'uk-tamil-awards-images-v1';

// Install event
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    self.skipWaiting();
});

// Activate event
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - Cache images
self.addEventListener('fetch', event => {
    // Only handle image requests
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.open(IMAGE_CACHE).then(cache => {
                return cache.match(event.request).then(response => {
                    if (response) {
                        // Return cached image
                        return response;
                    }
                    
                    // Fetch and cache new image
                    return fetch(event.request).then(fetchResponse => {
                        // Only cache successful responses
                        if (fetchResponse.status === 200) {
                            cache.put(event.request, fetchResponse.clone());
                        }
                        return fetchResponse;
                    }).catch(() => {
                        // Return placeholder for failed requests
                        return new Response(
                            '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#666">Image not available</text></svg>',
                            { headers: { 'Content-Type': 'image/svg+xml' } }
                        );
                    });
                });
            })
        );
    }
});

// Background sync for failed image requests
self.addEventListener('sync', event => {
    if (event.tag === 'image-sync') {
        event.waitUntil(syncImages());
    }
});

function syncImages() {
    // Retry failed image requests
    return caches.open(IMAGE_CACHE).then(cache => {
        return cache.keys().then(requests => {
            return Promise.all(
                requests.map(request => {
                    return fetch(request).then(response => {
                        if (response.status === 200) {
                            cache.put(request, response);
                        }
                    }).catch(() => {
                        // Still failed, keep cached version
                    });
                })
            );
        });
    });
}
