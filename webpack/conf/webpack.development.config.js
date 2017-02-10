'use strict';

var webpack = require('webpack');
var Config = require('webpack-config');
var webpackConfig = require('../webpack.config.js');

webpackConfig();

module.exports = new Config().extend('[webpackRoot]/conf/webpack.base.config.js').merge({
	output: {
		pathinfo: true
	},
	debug: true,
	devtool: '#source-map',
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(true),
		new webpack.HotModuleReplacementPlugin()
	]
});

