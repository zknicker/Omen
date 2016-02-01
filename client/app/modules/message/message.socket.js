'use strict';

import Dispatcher from '../../Dispatcher';

var registerSocketListeners = function(socket) {
    socket.on('message:create', function(data) {
        Dispatcher.dispatch({
            type: 'CREATE_MESSAGE',
            roomId: data.roomId,
            message: data.message
        });
    });
};

module.exports = registerSocketListeners;