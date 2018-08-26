var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var utility = require('./utility.js');
//login
router.route('/')
    .get(function (req, res) {
        res.render('login');
    })
    .post(function (req, res) {
        User.findOne({ 'username': req.body.username }, function (err, user) {
            if (err) {
                res.send("db error");
            }
            if (user) {
                if (user.validPassword(req.body.password)) {
                    let token=utility.generateToken(user._id);
                    res.send({message:"Successfully logged in",jwtToken:token});
                }
                else
                    res.send("Wrong Password");
            }
            else {
                res.send("No User Found");
            }
        });
    });

module.exports = router;
