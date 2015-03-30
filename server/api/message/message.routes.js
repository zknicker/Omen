'use strict';

var messageController = require('./message.controller');
var auth = require('../../auth');

var routes = function (app) {

    // Create
    app.post('/message', messageController.createMessage);

    // Read
    app.get('/message', messageController.readMessage);
};

module.exports = routes;