'use strict';

var passport = require('passport');
var secrets = require('../config/secrets');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var validateJwt = expressJwt({
    secret: secrets.sessionSecret
});
var db = require('../config/database');
var User = db.models.user;
var localStrategy = require('./strategies/local');

/**
 * Define Passport serialization implementations.
 */
var init = function (User) {
    passport.serializeUser(function (user, done) {
        // Serialize the user in the session cookie by his ID.
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        // To deserialize the user, find him by his ID.
        User.findOne(id).then(function (user) {
            done(null, user);
        }).catch(function (err) {
            done(err);
        });
    });

    // Setup the local Passport strategy.
    localStrategy(User);
};

/**
 * Check to see if user is authenticated.
 */
var isAuthenticated = function (req, res, next) {
    // allow access_token to be passed through query parameter as well
    if (req.body && req.body.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.body.access_token;
    }
    // Validate jwt token
    return validateJwt(req, res, next);
};

/**
 * Checks if the user role meets the minimum requirements of the route.
 */
var hasRole = function (roleRequired) {
    if (!roleRequired) {
        throw new Error('Required role needs to be set');
    }

    function meetsRequirements(req, res, next) {
        if (secrets.userRoles.indexOf(req.user.role) >= secrets.userRoles.indexOf(roleRequired)) {
            next();
        } else {
            res.send(403);
        }
    }
    return meetsRequirements;
};

/**
 * Returns a jwt token signed by the app secret
 */
var signToken = function (id) {
    return jwt.sign({
        id: id,
    }, secrets.sessionSecret, {
        expiresInMinutes: 60 * 24 // 24 hours
    });
};

module.exports = {
    init: init,
    isAuthenticated: isAuthenticated,
    hasRole: hasRole,
    signToken: signToken
};