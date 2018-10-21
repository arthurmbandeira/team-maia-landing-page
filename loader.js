require('module-alias/register');

var path = require('path');
global.rootdir = path.resolve(__dirname);

var http = require('http');

const hostname = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

AedesAlertaAPI = require('@AedesAlertaAPI'),
AedesAlertaServer = http.createServer(AedesAlertaAPI),

AedesAlertaServer.listen(port, hostname, () => console.log(`AedesAlertaAPI running on ${port}`));