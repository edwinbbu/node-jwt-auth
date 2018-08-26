var express = require('express');
var router = express.Router();
var User= require('../models/user.js');

//login
router.route('/')
    .get(function (req, res) {
        res.render('login');
    })
    .post(function(req,res){
        User.findOne({ 'username': req.body.username }, function (err, user) {
            if (err) {
              res.send("db error");
            }
            if (user) {
              if (user.validPassword(req.body.password)){
                res.send("Successfully logged in");
              }
              else
                res.send("Wrong Password");
            }
            else{
                res.send("No User Found");
            }
          });
    });

module.exports = router;
