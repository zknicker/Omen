'use strict';

var avatarController = require('./avatar.controller');
var auth = require('../../auth');

var routes = function (app) {
    // Read a user's avatar.
    app.get('/avatar/:userId.:mimeType', avatarController.getAvatar);
};

module.exports = routes;