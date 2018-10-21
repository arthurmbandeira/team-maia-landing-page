require('module-alias/register');

var path = require('path');
global.rootdir = path.resolve(__dirname);

var http = require('http');

const hostname = 'aedesalerta.com';
const port = 8080;

AedesAlertaAPI = require('@AedesAlertaAPI'),
AedesAlertaServer = http.createServer(AedesAlertaAPI),

AedesAlertaServer.listen(port, hostname, () => console.log(`AedesAlertaAPI running on ${port}`));