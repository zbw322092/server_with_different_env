// we do some basic express configurations here, but we move server listening out to another
// individual file.
const path = require('path');
const chalk = require('chalk');
const express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var helpers = require('handlebars-helpers')();

var env = app.get('env');

app.use(morgan('dev'))
   .use(bodyParser({extended: false}))
   .use(bodyParser.json())
   .use(methodOverride())
   .use(cookieParser());

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: 'server/views/layouts',
	partialsDir: 'server/views/partials/',
	extname: '.hbs',
	helpers: helpers
}));

app.set('view engine', '.hbs');

app.set('views', process.cwd() + '/server/views/');

require('./routes.js')(app);

app.get('/test', function(req, res) {
	res.render('home');
});

// app.get('/about', function(req, res) {
// 	res.sendFile(path.join(__dirname, '../client/abouttest/views/about.html'));
// });

// app.listen(process.env.PORT, function() {
// 	console.log(chalk.green('server is listening on port ' + process.env.PORT));
// });

module.exports = app;
