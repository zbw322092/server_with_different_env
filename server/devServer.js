// something will happen in development env (webpack, start a server, reload page after 
// modification and so forth), we move those code here.

var app = require('./express.config.js');
var env = app.get('env');
var chalk = require('chalk');

function isDev(env) {
	return env === 'development';
}

app.devServer = function(port) {
	
	process.env.PORT = port;

	// do some webpack stuff here
	// ...

	app.listen(port, function() {
		console.log(chalk.underline.yellow('Express Server is listening on port '.toUpperCase() + port));
	});
};

module.exports = app;