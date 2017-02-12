'use strict';

var webpack = require('webpack');
import Config, { environment } from 'webpack-config';
import webpackConfEnv from '../webpack.config.env';

webpackConfEnv(environment);


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

