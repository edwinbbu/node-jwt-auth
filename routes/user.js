var express = require('express');
var router = express.Router();
var User= require('../models/user.js');
var passport = require('passport');
require('../config/passport') 

//signup
router.route('/signup')
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
            'password': req.body.password,
            'active': true
        }
        console.log(context);
        var user = new User(context);
        user.save();
        res.send('signup successfull');
    });

//login
router.route('/login')
    .get(function (req, res) {
        res.render('login');
    })
    .post(passport.authenticate('login',{
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

module.exports = router;
