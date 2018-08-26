require('dotenv-extended').load();
var express = require('express');
var path = require('path');
var parser = require('body-parser')
var session = require('express-session');
var expressLayouts = require('express-ejs-layouts');
var morgan = require('morgan');
var passport = require('passport');

var db=require('./config/database.js');

var app = express();
var port = process.env.port;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname+'/static'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }))
app.use(expressLayouts);
app.use(morgan('dev'));

app.use(session({
    secret:'cubereum',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

var index=require('./routes/index.js');
var signup = require('./routes/signup.js');
var login = require('./routes/login.js');

app.use('/',index);
app.use('/user/signup',signup);
app.use('/user/login',login);

app.listen(port, function (error) {
    console.log('Server running on port ' + port);
});