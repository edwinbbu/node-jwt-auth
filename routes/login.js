var express = require('express');
var router = express.Router();
var User= require('../models/user.js');

//login
router.route('/login')
    .get(function (req, res) {
        res.render('login');
    })
    .post(function(req,res){
        var context = {
            'username': req.body.username,
            'password': req.body.password,
        } 
        
    });

module.exports = router;
