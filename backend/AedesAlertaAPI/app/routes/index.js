const webpush = require('web-push');

var path = require('path');

module.exports = (app) => {
	app.get('/', function(req, res) {
		res.sendFile(rootdir + '/index.html');
	});
}