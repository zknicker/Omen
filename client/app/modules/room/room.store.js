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
        this.room = room.room;
        this.loading = false;
        this.emitChange();
    },
    
    onRoomError: function() {
    }
});

Dispatcher.register(function(action) {
    switch(action.action.actionType) {
        case constants.ROOM_LOADING:
            RoomStore.onRoomLoading();
            break;
        case constants.ROOM_SUCCESS:
            var room = action.action.room;
            RoomStore.onRoomSuccess(room);
            break;
        case constants.ROOM_ERROR:
            RoomStore.onRoomError();
            break;
    }
});

module.exports = RoomStore;