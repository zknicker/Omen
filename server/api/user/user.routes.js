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

};

module.exports = routes;