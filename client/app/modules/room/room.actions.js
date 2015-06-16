'use strict';

var Dispatcher = require('../../dispatcher');
var socket = require('../../sockets');
var roomAjax = require('./room.ajax');
var roomConstants = require('./room.constants');
var userStore = require('../user/user.store');

module.exports = {
    
    // Load all of the currently logged in users.
    getRoom: function() {
        Dispatcher.handleViewAction({ actionType: roomConstants.ROOM_LOADING });
        
        roomAjax.getRoom(function(room) {
            Dispatcher.handleViewAction({ actionType: roomConstants.ROOM_SUCCESS, room: room });
        }.bind(this), function() {
            Dispatcher.handleViewAction({ actionType: roomConstants.ROOM_ERROR });
        }.bind(this));
    },
    
    joinRoom: function(roomId) {
        var data = {
            roomId: roomId
        };
        socket.emit('ROOM_JOIN', data);   
    }
};