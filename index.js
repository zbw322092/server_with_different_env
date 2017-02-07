const chalk = require('chalk');
const express = require('express');
var app = express();

app.get('/test', function(req, res) {
	res.send('Hi there. It is testing');
});

app.listen(8000, function() {
	console.log(chalk.green('server is listening on port 8000'));
});

