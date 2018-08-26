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
    .post(passport.authenticate('signup',{
       successRedirect: '/',
       failureRedirect: '/signup',
       failureFlash: true
    }));

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
