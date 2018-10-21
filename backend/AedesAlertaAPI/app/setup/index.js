const mongoose = require('mongoose'),
UserModel = require('@AedesAlertaModels/user');
SubscriptionModel = require('@AedesAlertaModels/subscription');
const models = {
	User: mongoose.model('User'),
	Subscription: mongoose.model('Subscription')
}
module.exports = models;