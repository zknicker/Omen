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
            console.log(res);
            if (res.errors) {
                Dispatcher.handleViewAction({ actionType: roomConstants.ROOM_ERROR });
            }
            Dispatcher.handleViewAction({ actionType: roomConstants.ROOM_SUCCESS, room: res.room });
        });   
    }
};