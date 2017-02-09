'use strict';

var projectVirtualPath = 'server_with_different_env/testing_project';

module.exports = {
	projectVirtualPath: projectVirtualPath,
	hostProxy: 'http://my.testing.com',
	webpack: {
		entry: {
			[`${projectVirtualPath}/default`]: ['./client/default'],
			[`${projectVirtualPath}/about`]: ['./client/about'],
			[`${projectVirtualPath}/home`]: ['./client/home'],
			[`${projectVirtualPath}/blogs`]: ['./client/blogs'],
		},
		output: {
			prodPublicPath: '//testpath'
		}
	}
}