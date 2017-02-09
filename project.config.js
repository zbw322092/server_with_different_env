'use strict';

var projectVirtualPath = 'server_with_different_env/testing_project';

module.exports = {
	projectVirtualPath: projectVirtualPath,
	hostProxy: 'http://my.testing.com',
	webpack: {
		entry: {
			[`${projectVirtualPath}/about`]: ['./client/abouttest']
		},
		output: {
			
		}
	}
}