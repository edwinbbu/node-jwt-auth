var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var utility = require('./utility.js');

router.route('/forgotPassword')
    .post(function (req, res) {
        let otp = utility.generateMail(req.body.email);
        let findquery = { email: req.body.email }
        let updatequery = { verifyCode: otp }
        User.update(findquery, updatequery, function (err) {
            if (err) {
                res.status(401).send("Error in database");
            }
            res.send("Verify OTP send to email");
        })

    });

router.route('/verifyCode')
    .post(function (req, res) {
        //console.log(req.body);
        User.findOne({ 'email': req.body.email }, function (err, user) {
            if (err) {
                res.send("db error");
            }
            console.log(user);
            if (user.verifyCode == req.body.code) {
                let token = utility.generateToken(user._id);
                res.send({ message: "Code verified", jwtToken: token });
            }
            else {
                res.send("Invalid Code")
            }
        });
    });

// pass jwt token to change password
router.route('/changePassword')
    .post(function (req, res) {
        let id = utility.verifyToken(req.headers.token);
        if (id instanceof Error) {
            res.status(401).send("Unauthorised Acess");
        }
        let findquery = { _id: id }
        let updatequery = { password: req.body.password }
        User.update(findquery, updatequery, function (err) {
            if (err) {
                res.status(401).send("Error in database");
            }
            res.send("Password Updated");
        })
    });

router.route('/signout')
    .post(function (req, res) {
        if (!req.headers.token) {
            res.send("No jwt token found");
        }
        else {
            utility.generateToken(req.headers.token,'logout');   
            res.send("Sign out successful");
        }
    })
module.exports = router;
