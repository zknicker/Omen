'use strict';

var events = require('../../config/events');
var socketHelper = require('../../helpers/socket.helper');
var constant = require('../../helpers/constants.helper');
var RoomController = require('./room.controller');

// Socket listeners to react to client messages for each user.
exports.register = function (io, socket) {

    socket.on('ROOM_JOIN', function (roomId, acknowledgement) {
        if (socketHelper.isAuthenticated(socket)) {
            RoomController.joinRoom(roomId, socket.userId, function (err, room) {
                // Acknowledge join by returning the room data.
                acknowledgement({
                    errors: err,
                    room: room
                });

                // Join the user to the socket room-space.
                socketHelper.joinRoom(socket, roomId);

                if (!err) {
                    room.users.forEach(function (user) {
                        if (user.id === socket.userId) {
                            socketHelper.broadcastToRoom(socket, roomId, 'ROOM_JOIN', user);
                        }
                    });
                }
            });
        } else {
            acknowledgement({
                error: constant.get('SOCKET_NO_AUTH'),
                room: null
            });
        }
    });
}

// Socket listeners that register once in app lifetime.
exports.registerOnce = function (io) {

}