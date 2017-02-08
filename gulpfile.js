'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');

var plugins = gulpLoadPlugins();

let clientPath = 'client';
let serverPath = 'server';

gulp.task('consoleTask', function() {
	console.log('gulp is working');
});
