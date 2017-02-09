// define utility functions here
var portscanner = require('portscanner');
var chalk = require('chalk');

function portAvaliable(port, max, host, callback) {
	portscanner.findAPortNotInUse(port, max, host, callback);
}

var utilities = {
	portAvaliable: function(port, max, host, callback) {
		portscanner.findAPortNotInUse(port, max, host, callback);
	}
};

module.exports = utilities;