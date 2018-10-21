const passport = require('passport'),
models = require('@AedesAlerta/app/setup');
module.exports = (app) => {
	const api = app.AedesAlertaAPI.app.api.subscription;
	app.route('/api/pwa/subscribe')
	.post(api.subscribe(models.Subscription));
	app.route('/api/pwa/list')
	.get(api.index(models.Subscription, app.get('aedesalertasecret')));
	app.route('/api/pwa/reset')
	.get(api.deleteAll(models.Subscription, app.get('aedesalertasecret')));
	app.route('/api/pwa/sendAll')
	.get(api.sendAll(models.Subscription, app.get('aedesalertasecret')));
	// .get(passport.authenticate('jwt', config.session),  api.index(models.User, app.get('budgetsecret')));
}