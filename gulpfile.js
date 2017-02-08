'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var nodemon = require('nodemon');
var chalk = require('chalk');

var plugins = gulpLoadPlugins();

let clientPath = 'client';
let serverPath = 'server';

function getEnvModules(args, iterator) {
	return args.modules ? args.modules.split(/\s+/).map(iterator) : null;
}

function nodemonLog(log) {
	console.log(chalk.white('[') + chalk.yellow('nodemon') +
		chalk.white(']') + log.message);
}

gulp.task('env:all', function() {
	// overwrite porcess.env properties values
	plugins.env({
		vars: {
			PORT: 8888,
			NODE_ENV: 'development',
	    DEBUG: 'app:*,',
	    DEBUG_COLORS: true
		}
	});
});

gulp.task('env:dev', function() {
  nodemon({
    script: 'server/index.js',
    ext: 'js html',
    verbose: true,
    watch: [
    	`${serverPath}/views/`
    ],
    ext: 'hbs js'
  }).on('log', function(log) {
  	nodemonLog(log);
  });
});












