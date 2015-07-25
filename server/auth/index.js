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
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
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
 * Middleware to require authentication for a route.
 * TODO: Support roles?
 */
var isAuthenticated = function (req, res, next) {
    
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
var signToken = function (userId, userRole) {
    return jwt.sign({
        id: userId,
        role: userRole
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