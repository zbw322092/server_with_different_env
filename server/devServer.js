// something will happen in development env (webpack, start a server, reload page after 
// modification and so forth), we move those code here.

var app = require('./express.config.js');
var env = app.get('env');
var chalk = require('chalk');
var browserSync = require('browser-sync');

function isDev(env) {
	return env === 'development';
}

app.devServer = function(port) {
	
	process.env.PORT = port;

	// do some webpack stuff here
	// ...

	app.listen(port, function() {
		console.log(chalk.underline.green('Express Server is listening on port '.toUpperCase() + port));
		if (isDev(env)) {
			setImmediate(function() {
				browserSync.create().init({
					ui: {
						weinre: {
							port: 9090
						}
					},
					open: false,
					notify: false,
					files: ['./client/**'],
					proxy: 'localhost:'+port
				});
			});
		}
	});
};

module.exports = app;