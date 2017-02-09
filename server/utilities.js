// define utility functions here
var portscanner = require('portscanner');
var chalk = require('chalk');

var utilities = {
	portAvaliable: function(port, max, host, callback) {
		portscanner.findAPortNotInUse(port, max, host, callback);
	}
};

module.exports = utilities;