
/**
 * Main Controller
 */

'use strict';

var events = require('../../config/events');
var db = require('../../config/database');
var User = db.models.user;
var CachedUser = db.models.cacheduser;
var auth = require('../../auth');

/**
 * Cache the passed user. For more information on why, see the
 * cached user model.
 */
var cacheUser = function(user, cb) {
    CachedUser.findOrCreate({ id: user.id }).then(function(cachedUser) {
        cachedUser.id = user.id;
        cachedUser.role = user.role;
        cachedUser.username = user.username;
        cachedUser.save(cb);
    }).catch(cb);
}

/**
 * Retrieve a user account with sensitive (e.g. email) data.
 * Also caches the retrieved user.
 */
var readAccount = function (req, res, next) {
    User.findOne().where({
        id: req.user.id
    }).then(function (user) {
        if (!user) {
            res.status(404);
        }
        user.setSensitiveDataOnJSON();
        res.status(200).json({
            user: user
        });
        
        cacheUser(user, next);
    }).catch(next);
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

    User.findOne({
        email: req.body.email
    }).then(function (existingUser) {
        if (existingUser) {
            // User already exists. Send error.
            res.status(400).json({
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
            }).catch(next);
        }
    }).catch(next);
};

/**
 * PUT /user
 * Update profile information.
 */
var updateProfile = function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('username', 'Username must be between 3 and 20 characters.').len(3, 20);

    if (req.validationErrors()) {
        return res.status(400).json({
            errors: req.validationErrors()
        });
    }

    User.update({
        id: req.user.id
    }, {
        email: req.body.email || '',
        username: req.body.username
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
 * Given a user ID, removes the associated user from all rooms.
 */
var leaveAllRooms = function (userId, cb) {
    User.update({ id: userId }, { rooms: [] })
        .then(function (usersUpdated) {
            cb(null); // no errors, returning null
        })
        .catch(cb);
}

/**
 * Given a user ID, removes the associated user from all public rooms.
 */
var leaveAllPublicRooms = function (userId, cb) {
    User.findOne({ id: userId })
        .populate('rooms')
        .then(function (user) {
            user.rooms.forEach(function (room) {  
                if (room.type === 'public') {
                    user.rooms.remove(room.id);
                }
            });
            user.save(function (err) {
                events.emit('server:room:departed', userId);
                cb(err);
            });
        
        })
        .catch(cb);
}

/**
 * Retrieves all of the rooms that the user is presently joined.
 */
var getRooms = function (userId, cb) {
    User.findOne(userId)
        .populate('rooms')
        .then(function (user) {
            cb(null, user.rooms);
        })
        .catch(cb);
}

module.exports = {
    readAccount: readAccount,
    createAccount: createAccount,
    updateProfile: updateProfile,
    updatePassword: updatePassword,
    leaveAllRooms: leaveAllRooms,
    leaveAllPublicRooms: leaveAllPublicRooms,
    getRooms: getRooms
};