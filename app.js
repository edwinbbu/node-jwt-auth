require('dotenv-extended').load();
var express = require('express');
var path = require('path');
var parser = require('body-parser')

var app = express();
var port = process.env.port;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req,res){
    res.send("Hello");
})

app.listen(port, function (error) {
    console.log('Server running on port ' + port);
});