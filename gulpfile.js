'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var nodemon = require('nodemon');
var chalk = require('chalk');
var runSequence = require('run-sequence');

var plugins = gulpLoadPlugins();

let clientPath = 'client';
let serverPath = 'server';

const path = {
	client: {

	},
	server: {

	},
	dist: 'public'
};

function getEnvModules(args, iterator) {
	return args.modules ? args.modules.split(/\s+/).map(iterator) : null;
}

function nodemonLog(log) {
	console.log(chalk.white('[') + chalk.yellow('nodemon') +
		chalk.white(']') + log.message);
}

gulp.task('env:all', function() {

  var modules = getEnvModules(plugins.util.env, (module) => {
    return `./${clientPath}/${module}`;
  }) || [];

  console.log(plugins.util.env);
  console.log(modules);

	// overwrite porcess.env properties values
	plugins.env({
		vars: {
			PORT: 8000,
			NODE_ENV: 'development',
	    DEBUG: 'app:*,',
	    DEBUG_COLORS: true,
	    ENTRY_MODULES: JSON.stringify(modules)
		}
	});
});

gulp.task('start:server', function() {
  nodemon({
    script: 'server/index.js',
    verbose: true,
    watch: [
    	`${serverPath}/views/`
    ],
    ext: 'hbs js'
  }).on('log', function(log) {
  	nodemonLog(log);
  });
});

gulp.task('server', function() {
	runSequence(
		'env:all',
		'start:server'
	);
});












