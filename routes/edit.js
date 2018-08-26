var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var utility = require('./utility.js');

router.route('/forgotPassword')
    .post(function (req, res) {
        utility.generateMail(req.body.email);
        res.send("Verify OTP send to email");
    });

module.exports = router;
