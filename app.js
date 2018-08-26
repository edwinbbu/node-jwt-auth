require('dotenv-extended').load();
var express = require('express');
var path = require('path');
var parser = require('body-parser')
var session = require('express-session');
var expressLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var morgan = require('morgan');

var app = express();
var port = process.env.port;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('static'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }))
app.use(expressLayouts);
app.use(morgan('dev'));

app.use(session({
    secret:'cubereum',
    saveUninitialized: true,
    resave: true
}));

app.use(flash()); // flash messages

var index=require('./routes/index.js')

app.use('/',index);

// app.get('/', function(req,res){
//     res.send("Hello");
// })

app.listen(port, function (error) {
    console.log('Server running on port ' + port);
});