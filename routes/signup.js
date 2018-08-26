var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

//signup
router.route('/')
    .get(function (req, res) {
        res.render('signup');
    })
    .post(function (req, res) {
        var context = {
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'username': req.body.username,
            'gender': req.body.gender,
            'mobile': req.body.mobile,
            'email': req.body.email,
            'active': true
        }
        User.findOne({$or:[ {'username':req.body.username }, {'email':req.body.email}]}, function (err, user) {
            if (err)
                res.send("Error in signup");
            if (user) {
                res.send('This username/email is already taken.');
            }
            else {
                var newUser = new User(context);
                newUser.password = newUser.generateHash(req.body.password);

                newUser.save(function (err) {
                    if (err) {
                        res.send("Error in signup");
                    }
                    res.send('signup successfull');
                });
            }
        });
    });

module.exports = router;
