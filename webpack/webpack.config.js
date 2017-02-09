var chalk = require('chalk');
var _ = require('lodash');
var jclrz = require('json-colorz');
var minimatch = require('minimatch');
var path = require('path');
var projectConfig = require('../project.config.js');

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















