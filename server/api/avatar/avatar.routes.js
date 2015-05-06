'use strict';

var avatarController = require('./avatar.controller');
var auth = require('../../auth');

var routes = function (app) {

    // Create
    app.post('/avatar', avatarController.getAvatar);

    // Read
    app.get('/avatar', avatarController.getAvatar);
};

module.exports = routes;