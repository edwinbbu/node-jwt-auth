require('dotenv-extended').load();
var express = require('express');
var parser = require('body-parser')
var morgan = require('morgan');

var db=require('./config/database.js');

var app = express();
var port = process.env.port;

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }))
app.use(morgan('dev'));

var signup = require('./routes/signup.js');
var login = require('./routes/login.js');
var details = require('./routes/details.js');
var edit = require('./routes/edit.js');

app.get('/',function(req,res){
    res.send("Cubereum Auth Service");
})
app.use('/user/signup',signup);
app.use('/user/login',login);
app.use('/user/details',details);
app.use('/user',edit);
app.listen(port, function (error) {
    console.log('Server running on port ' + port);
});