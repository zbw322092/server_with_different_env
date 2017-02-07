const chalk = require('chalk');
const express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var helpers = require('handlebars-helpers')();

console.log(app.get('env'));
// console.log(app);

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: process.cwd() + '/server/views/layouts',
	extname: '.hbs',
	helpers: helpers
}));

app.set('view engine', '.hbs');

app.set('views', process.cwd() + '/server/views/');

app.get('/test', function(req, res) {
	res.render('home');
});

app.listen(8000, function() {
	console.log(chalk.green('server is listening on port 8000'));
});

