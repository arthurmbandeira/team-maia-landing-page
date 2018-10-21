const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
morgan = require('morgan'),
consign = require('consign'),
cors = require('cors'),
passport = require('passport'),
passportConfig = require('./passport')(passport),
jwt = require('jsonwebtoken'),
config = require('./index.js'),
database = require('./database')(mongoose, config);

app.use(express.static('.'));
app.use('/backend/assets', express.static(__dirname + '/assets' ));
app.use('/service-worker.js', express.static(__dirname + '/service-worker.js' ));
app.use('/manifest.json', express.static(__dirname + '/manifest.json' ));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());
app.set('aedesalertasecret', config.secret);

consign({ cwd: 'backend' })
.include('AedesAlertaAPI/app/setup')
.then('AedesAlertaAPI/app/api')
.then('AedesAlertaAPI/app/routes')
.into(app);
module.exports = app;