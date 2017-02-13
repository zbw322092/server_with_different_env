'use strict';

var chalk = require('chalk');
var _ = require('lodash');
var jclrz = require('json-colorz');
var minimatch = require('minimatch');
var path = require('path');
var projectConfig = require('../project.config.js');
var envConfig = require('../server/env.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
import Config, { environment } from 'webpack-config';
import webpackConfigEnv from './webpack.config.env.js';


// what we need to do is compile codes according to the module names developer typed
// we need to filter out entries and outputs.
var entry = {};
var projectConfigWebpack = projectConfig.webpack;

// console.log(projectConfigWebpack);
// { entry: 
//    { 'server_with_different_env/testing_project/default': [ './client/default' ],
//      'server_with_different_env/testing_project/about': [ './client/about' ],
//      'server_with_different_env/testing_project/home': [ './client/home' ],
//      'server_with_different_env/testing_project/blogs': [ './client/blogs' ] },
//   output: {} 
// }

// detect environment
function isDev(env) {
  return env && env === 'production' ? false : true;
}

// the returned value should be a object with name and file path pairs, which is the entry
// of webpack configuration.
function entriesFilter() {
	var entryModules = process.env.ENTRY_MODULES ? JSON.parse(process.env.ENTRY_MODULES) || [] : [];
	// var entryModules = ["./client/about", "./client/bbb", "./client/ccc"];
	if (entryModules.length) {
		entryModules.forEach(function(value, key, array) {
			_.map(projectConfigWebpack.entry, function(innerValue, innerKey) {
				var matched =  minimatch.match(innerValue, value, { matchBase: true });
				if (matched.length) {
					entry[innerKey] = innerValue;
				}
			});
		});
	}
	return entry;
}

console.log(entriesFilter());

function outputFilter() {
	var env = process.env.NODE_ENV || 'development';
	var port = process.env.PORT || envConfig.port;
	var devPath = `${projectConfig.hostProxy}:${port}/public/`;
	return {
		path: path.resolve(__dirname, '../public/'),
		filename: './[name]/bundle.js?[hash]',
		publicPath: isDev(env) ? devPath : projectConfigWebpack.output.prodPublicPath
	};
}

console.log(outputFilter());

module.exports = function webpackConfig () {
	webpackConfigEnv(environment);

	var webpackOutput = outputFilter();
	var projectVirtualPath = envConfig.projectVirtualPath;

	var urlLoaderQuery = _.merge({
	      limit: 5000,
	      context: 'client',
	      name: `${projectVirtualPath}/[path][name].[ext]?[hash]`
	    }, projectConfigWebpack.urlLoaderQuery);

	return new Config().extend('[webpackRoot]/conf/webpack.[env].config.js')
		.merge({
			entry: entry,
			output: webpackOutput,
			module: {
				loaders: [
					{ test: /\.html$/, loader: 'html', query: { minimize: true } },
					{ test: /\.(png|jpg|gif)$/, loader: "url-loader", query: urlLoaderQuery },
					{ test: /\.js|jsx$/, loader: 'babel-loader?presets[]=es2015', exclude: /(node_modules|bower_components)/ }
				]
			}
		});
};













