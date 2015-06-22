'use strict';

var events = require('../../config/events');
var RoomController = require('./room.controller');

// Socket listeners to react to client messages for each user.
exports.register = function(io, socket) {
    
    socket.on('ROOM_JOIN', function(roomId, acknowledgement) {
        RoomController.joinRoom(roomId, socket.userId, function(err, room) {
            var res = {
                errors: err,
                room: room                
            }
            acknowledgement(res);
        });
    });
}

// Socket listeners that register once in app lifetime.
exports.registerOnce = function(io) {

}