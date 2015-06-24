'use strict';

var Dispatcher = require('../../dispatcher');
var constants = require('./room.constants');

var registerSocketListeners = function(socket) {
    
    // A user joins a room.
    socket.on('ROOM_JOIN', function (data) {
        console.log('room joined');
        Dispatcher.handleViewAction({ actionType: constants.ROOM_JOINED, user: data });
    });
    
    // A user leaves a room.
    socket.on('ROOM_DEPART', function (data) {
        console.log('room departed');
        Dispatcher.handleViewAction({ actionType: constants.ROOM_DEPARTED, user: data });
    });
};

module.exports = registerSocketListeners;