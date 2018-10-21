const mongoose = require('mongoose');
const webpush = require('web-push');
const api = {};
const config = require('@config');

api.subscribe = (Subscription) => (req, res) => {
	if (!req.body) {
		res.json({ success: false, message: 'Missing data to subscribe' });
	} else {
		let $args = {
			sub: JSON.stringify(req.body)
		};
		let subscription = Subscription.where($args).findOne(function(err, sub){
			if(err || !sub) {
				const newSubscription = new Subscription($args);
				newSubscription.save((error) => {
					if (error) {
						return res.status(400).json({ success: false, message:  'Subscription already exists.' });
					}
					res.json({ success: true, message: 'Subscription created successfully' });
				});
			} else {
				sub.save(function(error){
					if (error) {
						return res.status(400).json({ success: false, message:  'Couldn\'t update subscription.' })
					}
					res.json({ success: true, message: 'Subscription updated successfully' });
				});
			}
		});
	}
}
api.index = (Subscription, AedesAlertaToken) => (req, res) => {
	const token = AedesAlertaToken;
	if (token) {
		Subscription.find({}, (error, subscription) => {
			if (error) throw error;
			res.status(200).json(subscription);
		});
	} else return res.status(403).send({ success: false, message: 'Unauthorized' });
}
api.deleteAll = (Subscription, AedesAlertaToken) => (req, res) => {
	const token = AedesAlertaToken;
	if (token) {
		Subscription.deleteMany({}, (error, subscription) => {
			if (error) throw error;
			res.status(200).json({message: 'Deleted'});
		});
	} else return res.status(403).send({ success: false, message: 'Unauthorized' });
}
api.sendAll = (Subscription, AedesAlertaToken) => (req, res) => {
	const token = AedesAlertaToken;
	if (token) {
		Subscription.find({}, (error, subscriptions) => {
			if (error) {
				console.log('aaaaaaa');
				throw error;
			}

			let payload = JSON.stringify({
				title: 'Aedes Alerta!',
				options: {
					body: 'Você está em uma área de risco!',
					icon: '/backend/assets/img/logo-push.jpg',
				},
			});
			const publicVapidKey = config.pwa.vapid.public_key;
			const privateVapidKey = config.pwa.vapid.private_key;

			webpush.setVapidDetails('mailto:etoh@nerau.com.br', publicVapidKey, privateVapidKey);
			for (var i = 0; i < subscriptions.length; i++) {
				webpush.sendNotification(JSON.parse(subscriptions[i].sub), payload).catch(error => {
					console.error(error);
				});
			}
			return res.status(200).json({message: 'Sent!'});
		});
	} else return res.status(403).send({ success: false, message: 'Unauthorized' });
}
module.exports = api;