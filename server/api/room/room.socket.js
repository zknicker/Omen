'use strict';

var events = require('../../config/events');
var socketHelper = require('../../helpers/socket.helper');
var RoomController = require('./room.controller');

// Socket listeners to react to client messages for each user.
exports.register = function(io, socket) {
    
    socket.on('ROOM_JOIN', function(roomId, acknowledgement) {
        RoomController.joinRoom(roomId, socket.userId, function(err, room) {
            var res = {
                errors: err,
                room: room                
            }
            // Acknowledge join by returning the room data.
            acknowledgement(res);
            
            // Join the user to the socket room-space.
            socketHelper.joinRoom(socket, roomId);
            
            if (!err) {
                room.users.forEach(function (user) {
                    if (user.id === socket.userId) {
                        // Tell others about the user that joined.
                        socketHelper.broadcastToRoom(socket, roomId, 'ROOM_JOIN', user);
                    }
                });
            }
        });
    });
}

// Socket listeners that register once in app lifetime.
exports.registerOnce = function(io) {

}