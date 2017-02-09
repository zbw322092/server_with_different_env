'use strict';

var nodeEnv = process.env.NODE_ENV || 'development';

if (nodeEnv === 'development' || nodeEnv === 'test') {
	require('babel-register');
}

require('./app.js')();