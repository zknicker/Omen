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
     * Joins a room by room ID. Also subscribes the socket to updates for this room.
     *
     * Returns the room's meta-data.
     */
    socket.on('room:join', function (roomId, acknowledgement) {
        if (socketHelper.isAuthenticated(socket)) {
            RoomController.joinRoom(roomId, socket.userId, function (err, room) {
                
                // Acknowledge join by returning a boolean success flag.
                acknowledgement(roomResponse.joinRoomAcknowledgement(err, room));

                // Join the user to the socket room-space.
                socketHelper.joinRoom(socket, roomId);
                        
                // Notify everyone else.
                var response = roomResponse.joinRoomBroadcast(socket.user, roomId);
                socketHelper.emitToRoom(io, roomId, 'userlist:add', response);
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
     * Retrieves a list of joinable rooms.
     */
    socket.on('rooms:joinable', function(req, acknowledgement) {
        RoomController.getJoinableRooms(function(err, rooms) {
            acknowledgement(roomResponse.listRoomsAcknowledgement(err, rooms));
        });
    });
    
    /**
     * Retrieves a room's userlist by room ID.
     */
    socket.on('userlist:get', function(roomId, acknowledgement) {
        RoomController.getUserList(roomId, function(err, userList) {
            acknowledgement(roomResponse.getUserListAcknowledgement(err, roomId, userList));
        });
    });
}

// Socket listeners that register once in app lifetime.
exports.registerOnce = function (io) {
    
    /**
     * Events which result in a user departing a room need to be
     * broadcasted to all clients.
     */
    events.on('server:room:departed', function(data) {
        var response = roomResponse.departRoomBroadcast(data.userId, data.roomId);
        io.emit('userlist:remove', response);
    });
    
    /**
     * User has departed all rooms (e.g. result of client/server disconnect)
     */
    events.on('server:room:departed:all', function(data) {
        var response = roomResponse.departAllRoomsBroadcast(data.userId);
        io.emit('userlist:remove:all', response);
    });
}