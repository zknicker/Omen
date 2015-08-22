'use strict';

var Dispatcher = require('../../dispatcher');

var registerSocketListeners = function(socket) {
    socket.on('message:create', function(data) {
        Dispatcher.handleViewAction({
            actionType: 'CREATE_MESSAGE',
            roomId: data.roomId,
            message: data.message
        });
    });
};

module.exports = registerSocketListeners;