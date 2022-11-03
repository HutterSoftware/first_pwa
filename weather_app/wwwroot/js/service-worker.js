const cacheName = "weather_app_cache";
const appFiles = [
    "/data/PXL_20221007_203052221.jpg",
    "/data/sun.png",
    "/index.html"
];

// Create an install service worker to use the webapp in parts without internet
self.addEventListener(
    "install",
    event => {
        event.waitUntil(
            // Load files from appFiles into cache
            caches.open(cacheName)
                .then(cache => {
                    return cache.addAll(appFiles);
                }
            )
        )
    }
);

// Create a worker to load data from cache, if the network connection is broken or 
// load it from the internet, if the server is reachable
self.addEventListener(
    "fetch",
    event => {
        console.log('Sw: fetching');
        // Fetch data from cache
        // TODO: Not finished
        event.respondWith(
            caches.match(event.request).then(
                cachedResponse => { return cachedResponse || fetch(event.request) }
            )
        );
    }
);
