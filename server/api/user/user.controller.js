
/**
 * Main Controller
 */

'use strict';

var db = require('../../config/database');
var User = db.models.user;
var auth = require('../../auth');

/**
 * GET /user
 * Read user data.
 */
var readAccount = function (req, res, next) {
    User.findOne().where({
        id: req.user.id
    }).then(function (user) {
        user.setSensitiveDataOnJSON();
        res.status(200).json({
            user: user
        });
    }).catch(function (err) {
        return next(err);
    });
};

/**
 * POST /user
 * Create a new local account.
 * @param email
 * @param password
 * @param confirmPassword
 */
var createAccount = function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must be at least 6 characters long').len(6);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    if (req.validationErrors()) {
        return res.status(400).json({
            errors: req.validationErrors()
        });
    }

    var user = {
        email: req.body.email,
        password: req.body.password
    };

    User.findOne().where({
        email: req.body.email
    }).then(function (existingUser) {
        if (existingUser) {
            // User already exists. Send error.
            res.status(409).json({
                errors: [{
                    param: 'email',
                    msg: 'Account with that email address already exists.'
                }]
            });
        } else {
            User.create(user).then(function (user) {
                // Done! Send user and authentication token.
                var token = auth.signToken(user.id, user.role);
                res.status(200).json({
                    token: token,
                    user: user,
                    success: [{
                        msg: 'Account created successfully.'
                    }]
                });
            }).catch(function (err) {
                return next(err);
            });
        }
    }).catch(function (err) {
        return next(err);
    });
};

/**
 * PUT /user
 * Update profile information.
 */
var updateProfile = function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();

    if (req.validationErrors()) {
        return res.status(400).json({
            errors: req.validationErrors()
        });
    }

    User.update({
        id: req.user.id
    }, {
        email: req.body.email || '',
        firstName: req.body.firstName || '',
        lastName: req.body.lastName || ''
    }).then(function (user) {
        res.status(200).json({
            success: [{
                msg: 'Profile information updated.'
            }],
            user: user
        });
    }).catch(function (err) {
        return next(err);
    });
};

/**
 * PUT /user/password
 * Update current password.
 * @param password
 * @param confirmPassword
 */
var updatePassword = function (req, res, next) {
    req.assert('password', 'Password must be at least 6 characters long').len(6);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    if (req.validationErrors()) {
        return res.status(400).json({
            errors: req.validationErrors()
        });
    }

    User.findOne({
        id: req.user.id
    }).then(function (user) {
        user.changePassword(req.body.password, function(err, user) {
            if (err) {
                return next(err);   
            }
        });
    }).catch(function(err) {
        return next(err);
    });
};

/**
 * DELETE /user
 * Delete current user account.
 */
var deleteAccount = function (req, res, next) {
    User.destroy({
        id: req.user.id
    }).then(function () {
        res.status(200).json({
            info: [{
                msg: 'Your account has been deleted.'
            }]
        });
    }).catch(function (err) {
        return next(err);
    });
};

module.exports = {
    readAccount: readAccount,
    createAccount: createAccount,
    updateProfile: updateProfile,
    updatePassword: updatePassword,
    deleteAccount: deleteAccount
};