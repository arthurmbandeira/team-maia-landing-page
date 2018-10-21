const models = require('@AedesAlerta/app/setup');
module.exports = (app) => {
	const api = app.AedesAlertaAPI.app.api.auth;
	app.route('/api/v1/auth')
	.post(api.login(models.User));
}