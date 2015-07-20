/**
 * User Routes
 */

'use strict';

var userController = require('./user.controller');
var auth = require('../../auth');

var routes = function(app) {

  // Create
  app.post('/user', userController.createAccount);

  // Read
  app.get('/user', auth.isAuthenticated, userController.readAccount);

  // Update profile
  app.put('/user', auth.isAuthenticated, userController.updateProfile);
  app.patch('/user', auth.isAuthenticated, userController.updateProfile);

  // Update Password
  app.put('/user/password', auth.isAuthenticated, userController.updatePassword);

app.get('/user/test', function(req, res, next) {
    userController.leaveAllPublicRooms(2, function(err, user) {
        res.status(200).json(user); 
})});
    
};

module.exports = routes;