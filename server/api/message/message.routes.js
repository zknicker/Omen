'use strict';

var messageController = require('./message.controller');
var auth = require('../../auth');

var routes = function (app) {
    
    // Create
    app.post('/message', messageController.createMessage);

    // Read
    app.get('/messages/latest/:roomId', messageController.readLatestMessages);
};

module.exports = routes;