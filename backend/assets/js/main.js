const applicationServerPublicKey = "BJPMhMNJxV2OHcsFpQzdu7-CGzB2nWvYURVFrHdRtiOH1PMEnCgCmFkEi-XyiaADdcKzXhMniEjxQYGEFnAqz6w";
let swRegistration;

function urlB64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
	.replace(/\-/g, '+')
	.replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

function registerServiceWorker() {
	return navigator.serviceWorker
	.register('/service-worker.js')
	.then(function(registration) {
		console.log('Service worker successfully registered.');
		swRegistration = registration;
		return registration;
	})
	.catch(function(err) {
		console.error('Unable to register service worker.', err);
	});
}

function initPwa() {
	if (!('serviceWorker' in navigator)) {
		console.warn("Service workers are not supported by this browser");
		return;
	}

	isPushEnabled = ('PushManager' in window && 'showNotification' in ServiceWorkerRegistration.prototype);
	if (!('PushManager' in window)) {
		console.warn('Push notifications are not supported by this browser');
		// return;
	}

	if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
		console.warn('Notifications are not supported by this browser');
		// return;
	}
	registerServiceWorker()
	.then(function(){
		initializeUI();
	});
}
function initializeUI(){
	if(typeof swRegistration != 'undefined' && typeof swRegistration.pushManager != 'undefined') {
		let subs = swRegistration.pushManager.getSubscription();
		if(subs) {
			subs.then(function(subscription) {
				isSubscribed = !(subscription === null);

				if (isSubscribed) {
					console.log('User IS subscribed.');
				} else {
					console.log('User is NOT subscribed.');
				}
				if (!isSubscribed) {
					subscribeUser();
				} else {
					console.log(subscription);
					updateSubscriptionOnServer(subscription);
				}
			});
		}
	}
}

function subscribeUser() {
	const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
	swRegistration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: applicationServerKey
	})
	.then(function(subscription) {
		console.log('User is subscribed.');
		console.log(subscription);
		updateSubscriptionOnServer(subscription);

		isSubscribed = true;
	})
	.catch(function(err) {
		console.log('Failed to subscribe the user: ', err);
	});
}

function updateSubscriptionOnServer(subscription) {
	if (!subscription) {
		alert('Please enable push notifications');
		return;
	}
	const key = subscription.getKey('p256dh');
	const token = subscription.getKey('auth');
	const contentEncoding = (PushManager.supportedContentEncodings || ['aesgcm'])[0];

	// let $body = JSON.stringify(subscription);
	let $body = subscription;
	// const $body = {
	// 		endpoint: subscription.endpoint,
	// 		publicKey: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
	// 		authToken: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null,
	// 		contentEncoding,
	// 	};
	fetch('/api/pwa/subscribe', {
		method: 'POST',
		body: JSON.stringify($body),
	    headers: {
	      // 'content-type': 'plain/text'
	      'content-type': 'application/json'
	    }
	})
}

window.onload = function(){
	initPwa();
}