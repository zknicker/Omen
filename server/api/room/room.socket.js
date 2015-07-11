'use strict';

var events = require('../../config/events');
var socketHelper = require('../../helpers/socket.helper');
var constant = require('../../helpers/constants.helper');
var RoomController = require('./room.controller');

// Socket listeners to react to client messages for each user.
exports.register = function (io, socket) {

    /**
     * Joins a room by room ID. The joined room is sent back to the requester.
     */
    socket.on('room:join', function (roomId, acknowledgement) {
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
                            socketHelper.broadcastToRoom(socket, roomId, 'room:join', user);
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
    
    /**
     * Creates a room given a room title. Acknowledges with the new room.
     */
    socket.on('room:create', function(roomTitle, acknowledgement) {
        if (socketHelper.isAuthenticated(socket)) {
            RoomController.create(roomTitle, function (err, room) {
                acknowledgement({
                    errors: err,
                    room: room
                });
            });
        } else {
            acknowledgement({
                error: constant.get('SOCKET_NO_AUTH'),
                room: null
            });
        }
    });
    
    /**
     * Retrieves a list of joinable rooms by user ID.
     */
    socket.on('rooms:joinable', function(req, acknowledgement) {
        RoomController.getJoinableRooms(socket.userId, function(err, rooms) {
            acknowledgement({
                error: err,
                rooms: rooms
            });
        });
    });
}

// Socket listeners that register once in app lifetime.
exports.registerOnce = function (io) {

}