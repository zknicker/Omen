/**
 * User Routes
 */

'use strict';

var userController = require('./user.controller');
var auth = require('../../auth');

var routes = function (app) {
console.log('creating routes for user...');
    // Create
    app.post('/user/register', userController.createAccount);

    // Read
    app.get('/user', auth.isAuthenticated, userController.readAccountSensitive);
    
    // Update profile
    app.put('/user', auth.isAuthenticated, userController.updateProfile);
    app.patch('/user', auth.isAuthenticated, userController.updateProfile);
    app.post('/user/avatar', auth.isAuthenticated, userController.updateAvatar);
    
    // Update Password
    app.put('/user/password', auth.isAuthenticated, userController.updatePassword);

    app.get('/user/test', function (req, res, next) {
        userController.leaveAllPublicRooms(2, function (err, user) {
            res.status(200).json(user);
        })
    });

};

module.exports = routes;