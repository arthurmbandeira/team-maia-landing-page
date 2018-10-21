module.exports = (mongoose, config) => {
	const database = mongoose.connection;
	mongoose.Promise = Promise;
	mongoose.connect(config.database, {
		useNewUrlParser: true,
		useMongoClient: true,
		promiseLibrary: global.Promise
	});
	database.on('error', error => console.log(`Connection to AedesAlerta database failed: ${error}`));
	database.on('connected', () => console.log('Connected to AedesAlerta database'));
	database.on('disconnected', () => console.log('Disconnected from AedesAlerta database'));
	process.on('SIGINT', () => {
		database.close(() => {
			console.log('AedesAlerta terminated, connection closed');
			process.exit(0);
		})
	});
};