'use strict';

self.addEventListener('install', function(event) {
});
self.addEventListener('activate', function(event) {
});
self.addEventListener('fetch', function(event) {
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