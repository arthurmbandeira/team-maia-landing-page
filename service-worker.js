'use strict';

let CACHE_NAME = 'carro-vendido-1.0.1';
console.log('CACHE_NAME');
console.log(CACHE_NAME);
let urlsToCache = [
  '/',
  '/assets/*',
  '/backend/assets/img/logo-push.jpg',
];

self.addEventListener('install', function(event) {
  console.log('install');
  event.waitUntil(
   caches.open(CACHE_NAME)
   .then(function(cache) {
     console.log('Opened cache');
     return cache.addAll(urlsToCache);
   })
   );
});

self.addEventListener('activate', function(event) {
  console.log('activate');
  clients.claim();
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return (CACHE_NAME != cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    ).catch(function(){
      return fetch(event.request);
    })
  );
});

self.addEventListener('push', function(event) {
	const data = event.data.json();
	console.log('Got push', data);
	self.registration.showNotification(data.title, {
		body: data.options.body,
    	icon: data.options.icon
	});
});
self.addEventListener('notificationclick', function(event) {
});