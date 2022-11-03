// Register service worker from file /js/service-worker.js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/js/service-worker.js");
}