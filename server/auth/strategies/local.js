/**
 * Logic for signing in locally using Email and Password.
 */
'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var strategy = function (User) {
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, function (username, password, done) {
        User.findOne({
            where: {
                email: username
            }
        }).then(function (user) {
            if (!user) {
                return done(null, false, {
                    message: 'Invalid email or password.'
                });
            }
            if (user.verifyPassword(password)) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: 'Invalid email or password.'
                });
            }
        }).catch(function (err) {
            if (err) {
                return done(err);
            }
        });
    }));
};

module.exports = strategy;