'use strict';

import _ from 'lodash';

export default function (enviorment) {
	enviorment.setAll(_.merge({
		env: () => process.env.NODE_ENV || 'development',
		webpackRoot: () => __dirname
	}));
};