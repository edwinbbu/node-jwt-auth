var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var utility = require('./utility.js');
var jwt = require('jsonwebtoken');
//login
router.route('/')
    .get(function (req, res) {
        let jwtToken=req.headers.token;
        try {
            var decoded = jwt.verify(jwtToken, 'secret');
            console.log(decoded);
        } catch (e) {
            res.status(401).send('unauthorized access ');
        }
        let id=decoded.data.id;
        User.findOne({ '_id': id }, function (err, user) {
            if (err){
                res.send("No user found for the token");
            }
            user.password=undefined;
            delete user.password;
            res.send(user); 
        });
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
