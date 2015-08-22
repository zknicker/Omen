'use strict';

var events = require('../../config/events');
var socketHelper = require('../../helpers/socket.helper');
var constant = require('../../helpers/constants.helper');
var roomResponse = require('../../data/roomResponse');
var RoomController = require('./room.controller');
var async = require('async');

// Socket listeners to react to client messages for each user.
exports.register = function (io, socket) {

    /**
     * Joins a room by room ID. The joined room is sent back to the requester.
     */
    socket.on('room:join', function (roomId, acknowledgement) {
        if (socketHelper.isAuthenticated(socket)) {
            RoomController.joinRoom(roomId, socket.userId, function (err, room) {
                
                // Acknowledge join by returning the room data.
                acknowledgement(roomResponse.joinRoomAcknowledgement(err, room));

                // Join the user to the socket room-space.
                socketHelper.joinRoom(socket, roomId);
                        
                // Notify everyone else.
                var response = roomResponse.joinRoomResponse(socket.user, roomId);
                socketHelper.broadcastToRoom(socket, roomId, 'room:join', response);
            });
        } else {
            var err = constant.get('SOCKET_NO_AUTH');
            var room = null;
            acknowledgement(roomResponse.joinRoomAcknowledgement(err, room));
        }
    });
    
    /**
     * Creates a room given a room title. Acknowledges with the new room.
     */
    socket.on('room:create', function(roomTitle, acknowledgement) {
        if (socketHelper.isAuthenticated(socket)) {
            RoomController.create(roomTitle, function (err, room) {
                acknowledgement(roomResponse.createRoomAcknowledgement(err, room));
            });
        } else {
            var err = constant.get('SOCKET_NO_AUTH');
            var room = null;
            acknowledgement(roomResponse.createRoomAcknowledgement(err, room));
        }
    });
    
    /**
     * Retrieves a list of joinable rooms by user ID.
     */
    socket.on('rooms:joinable', function(req, acknowledgement) {
        RoomController.getJoinableRooms(socket.userId, function(err, rooms) {
            acknowledgement(roomResponse.listRoomsAcknowledgement(err, rooms));
        });
    });
}

// Socket listeners that register once in app lifetime.
exports.registerOnce = function (io) {
    
    /**
     * Events which result in a user departing a room need to be
     * broadcasted to all clients.
     */
    events.on('server:room:departed', function(userId) {
        var response = roomResponse.departRoomResponse(userId)
        io.emit('room:depart', response);
    });
}