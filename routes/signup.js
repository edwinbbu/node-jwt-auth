var express = require('express');
var router = express.Router();
var User= require('../models/user.js');

//signup
router.route('/')
    .get(function (req, res) {
        res.render('signup');
    })
    .post(function(req,res){
        var context = {
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'username': req.body.username,
            'gender': req.body.gender,
            'mobile': req.body.mobile,
            'email': req.body.email,
            'active': true
        }
        //console.log(context);
        var user = new User(context);
        user.password = user.generateHash(req.body.password);

          user.save(function (err) {
            if (err){
              res.send("Error in signup");
            } 
            res.send('signup successfull');
          });
    });

module.exports = router;
