// something will happen in development env (webpack, start a server, reload page after 
// modification and so forth), we move those code here.

var app = require('./express.config.js');
var env = app.get('env');
var chalk = require('chalk');
var browserSync = require('browser-sync');


function isDev(env) {
	return env === 'development';
}

function webpackMiddleware(app) {
	if (isDev(env)) {
	  var webpack = require('webpack');
	  var webpackDevMiddleware = require('webpack-dev-middleware');
	  var webpackHotMiddleware = require('webpack-hot-middleware');
	  var webpackConfig = require('../webpack/webpack.config.js')();

	  var webpackCompiler = webpack(webpackConfig);
	  app.use(webpackDevMiddleware(webpackCompiler, {
	  	publicPath: webpackConfig.output.publicPath,
	  	noInfo: true,
	  	stats: {
	  		colors: true
	  	}
	  }));
	  app.use(webpackHotMiddleware(webpackCompiler));
	}
}

app.devServer = function(port) {
	
	process.env.PORT = port;

	// do some webpack stuff here
	webpackMiddleware(app);

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