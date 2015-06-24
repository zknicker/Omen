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
            
            if (!err) {
                room.users.forEach(function (user) {
                    console.log(socket.userId);
                    if (user.id === socket.userId) {
                        // Tell others about the user that joined.
                        socket.broadcast.emit('ROOM_JOIN', user);
                    }
                });
            }
        });
    });
}

// Socket listeners that register once in app lifetime.
exports.registerOnce = function(io) {

}