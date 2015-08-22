'use strict';

var Dispatcher = require('../../dispatcher');
var socket = require('../../sockets');
var roomAjax = require('./room.ajax');
var roomConstants = require('./room.constants');
var userStore = require('../user/user.store');

module.exports = {
    
    /**
     * Dispatches a socket message to join a room. The acknowledgment returns the room
     * data, including user list.
     */
    join: function(roomId) {
        Dispatcher.handleViewAction({ actionType: roomConstants.ROOM_LOADING });
        socket.emit('room:join', roomId, function(res) {
            if (res.error) {
                Dispatcher.handleViewAction({ actionType: roomConstants.ROOM_ERROR });
            }
            Dispatcher.handleViewAction({ actionType: roomConstants.ROOM_SUCCESS, room: res.room });
        });   
    },
    
    /**
     * Creates a room given a room title. The newly created room is returned.
     */
    create: function(roomTitle) {
        Dispatcher.handleViewAction({ actionType: roomConstants.CREATE_ROOM_LOADING });
        socket.emit('room:create', roomTitle, function(res) {
            if (res.error) {
                Dispatcher.handleViewAction({ actionType: roomConstants.CREATE_ROOM_ERROR });
            }
            Dispatcher.handleViewAction({ actionType: roomConstants.CREATE_ROOM_SUCCESS, room: res.room });
        });   
    },
    
    /**
     * Retrieves a list of all joinable rooms.
     */
    getJoinable: function() {
        Dispatcher.handleViewAction({ actionType: roomConstants.GET_JOINABLE_ROOMS_LOADING });
        socket.emit('rooms:joinable', null, function(res) {
            if (res.error) {
                Dispatcher.handleViewAction({ actionType: roomConstants.GET_JOINABLE_ROOMS_ERROR });
            }
            Dispatcher.handleViewAction({ actionType: roomConstants.GET_JOINABLE_ROOMS_SUCCESS, rooms: res.rooms });
        });
    },
    
};