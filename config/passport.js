var passport = require('passport');
var LocalStratery = require('passport-local').Strategy;

var User = require('../models/user.js');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use('signup', new LocalStratery({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
},
  function (req, username, password, done) {
    process.nextTick(function () {
      User.findOne({ 'username': username }, function (err, user) {
        if (err)
          return done(err);
        if (user) {
          return done(null, false, req.flash('error', 'This username is already taken.'));
        }
        else {
          var newUser = new User();
          newUser.email = req.body.email;
          newUser.name = req.body.name;
          newUser.username = username;
          newUser.password = newUser.generateHash(password);

          newUser.save(function (err) {
            if (err){
              throw err;
            } 
            return done(null, newUser, req.flash('success', 'Registeration Successfull'));
          });
        }
      });

    });
  }));

passport.use('login', new LocalStratery({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
},
  function (req, username, password, done) {
    User.findOne({ 'username': username }, function (err, user) {
      if (err) {
        console.log("db error");
        return done(err);
      }
      if (!user) {
        console.log("err1");
        return done(null, false, req.flash('error', "No User Found."));
      }
      if (!user.validPassword(password)) {
        console.log("err2");
        return done(null, false, req.flash('error', "Wrong Password"));
      }
      return done(null, user, req.flash('success', "Successfully logged in"));
    });
  }
));