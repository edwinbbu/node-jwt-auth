var mongoose = require('mongoose');
//database connection
var url = process.env.database
mongoose.connect(url, { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb connection error'));
db.once('open', function () {
    // we're connected!
    console.log("Database connected");
});

module.exports.db=db