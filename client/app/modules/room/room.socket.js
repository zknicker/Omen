'use strict';

var Dispatcher = require('../../dispatcher');
var constants = require('./room.constants');

var registerSocketListeners = function(socket) {
    
    // A user joins a room.
    socket.on('room:join', function (data) {
        Dispatcher.handleViewAction({ actionType: constants.ROOM_JOINED, user: data });
    });
    
    // A user leaves a room.
    socket.on('room:depart', function (data) {
        Dispatcher.handleViewAction({ actionType: constants.ROOM_DEPARTED, user: data });
    });
};

module.exports = registerSocketListeners;