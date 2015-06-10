'use strict';

var Dispatcher = require('../../dispatcher');

var registerSocketListeners = function(socket) {
    socket.on('message:create', function(message) {
        Dispatcher.handleViewAction({
            actionType: 'CREATE_MESSAGE',
            content: message
        });
    });
};

module.exports = registerSocketListeners;