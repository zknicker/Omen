'use strict';

var events = require('../../config/events');
var RoomController = require('./room.controller');

// Socket listeners to react to client messages for each user.
exports.register = function(io, socket) {
    
    socket.on('ROOM_JOIN', function(data) {
        data.userId = socket.userId;
        RoomController.joinRoom(data, function(err) {
            if (err) {
                socket.emit('ROOM_JOIN_SERVER_ERROR');
            }
        });
    });
}

// Socket listeners that register once in app lifetime.
exports.registerOnce = function(io) {

}