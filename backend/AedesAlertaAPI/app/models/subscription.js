const mongoose = require('mongoose');

const Schema = mongoose.Schema({
	sub: {
		type: String,
		unique: true,
		required: true
	},
	// endpoint: {
	// 	type: String,
	// 	unique: true,
	// 	required: true
	// },
	// publicKey: {
	// 	type: String,
	// 	unique: true,
	// 	required: true
	// },
	// authToken: {
	// 	type: String,
	// 	unique: true,
	// 	required: true
	// },
	updated_at: {
		type: Date,
		default: Date.now
	},
});

Schema.pre('save', function (next) {
	const subscription = this;
	let newDate = new Date().toISOString();
	subscription.updated_at = newDate;
	return next();
});

mongoose.model('Subscription', Schema);