// we detect whether a port is occupied. If the port has been taken, we exit the process,
// otherwise we listen on this port.

var utilities = require('./utilities.js');
var envConfigs = require('./env.config.js');
var devServer = require('./devServer.js');
var chalk = require('chalk');

function startServer() {
	var max;
	utilities.portAvaliable(envConfigs.port, max, 'localhost', function(error, port) {
		if (error) {
			console.log(chalk.red(error));
			process.exit(1);
		} else {
			// start the server on this port
			devServer['devServer'](port);
		}
	});
}

module.exports = startServer;