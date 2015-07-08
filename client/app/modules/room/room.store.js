'use strict';

var Store = require('../../lib/store');
var Dispatcher = require('../../dispatcher');
var constants = require('./room.constants');

var RoomStore = new Store({

    initialize: function() {
        this.room = {
            title: '',
            users: []
        };
        this.loading = true;
    },
    
    onRoomLoading: function() {
        this.loading = true;
        this.emitChange();
    },
    
    onRoomSuccess: function(room) {
        this.room = room;
        this.loading = false;
        this.emitChange();
    },
    
    onRoomError: function() {
        this.loading = false;
        this.emitChange();
    },
    
    /**
     * Handle a user joining the room.
     */
    onRoomJoined: function(user) {
        console.log(user);
        this.room.users.push(user);
        this.emitChange();
    },
    
    /**
     * Handle a user leaving the room.
     */
    onRoomDeparted: function(user) {
        var indexOfUser = null;
        this.room.users.forEach(function (roomUser, i) {
            if (roomUser.id === user.id) {
                 indexOfUser = i;  
            }
        });
        
        if (indexOfUser !== null) {
            this.room.users.splice(indexOfUser, 1);
        }
        this.emitChange();
    }
});

Dispatcher.register(function(action) {
    switch(action.action.actionType) {
        case constants.ROOM_LOADING:
            RoomStore.onRoomLoading();
            break;
        case constants.ROOM_SUCCESS:
            RoomStore.onRoomSuccess(action.action.room);
            break;
        case constants.ROOM_ERROR:
            RoomStore.onRoomError();
            break;
        case constants.ROOM_JOINED:
            RoomStore.onRoomJoined(action.action.user);
            break;
        case constants.ROOM_DEPARTED:
            RoomStore.onRoomDeparted(action.action.user);
            break;
    }
});

module.exports = RoomStore;