'use strict';

var Store = require('../../lib/store');
var Dispatcher = require('../../dispatcher');
var constants = require('./room.constants');

var RoomStore = new Store({

    initialize: function() {
        this.currentRoom = {
            title: '',
            users: []
        };
        this.joinableRooms = [];
        this.joinableRoomsLoading = true;
        this.loading = true;
    },
    
    onRoomLoading: function() {
        this.loading = true;
        this.emitChange();
    },
    
    onRoomSuccess: function(room) {
        this.currentRoom = room;
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
        this.currentRoom.users.push(user);
        this.emitChange();
    },
    
    /**
     * Handle a user leaving the room.
     */
    onRoomDeparted: function(user) {
        var indexOfUser = null;
        this.currentRoom.users.forEach(function (roomUser, i) {
            if (roomUser.id === user.id) {
                 indexOfUser = i;  
            }
        });
        
        if (indexOfUser !== null) {
            this.currentRoom.users.splice(indexOfUser, 1);
        }
        this.emitChange();
    },
    
    /**
     * Handle the AJAX call for getting the list of joinable rooms.
     */
    onGetJoinableRoomsLoading: function() {
        this.joinableRoomsLoading = true;
        this.emitChange();
    },
    
    onGetJoinableRoomsSuccess: function(rooms) {
        this.joinableRoomsLoading = false;
        console.log(rooms);
        this.joinableRooms = rooms;
        this.emitChange();
    },
    
    onGetJoinableRoomsFailure: function() {
        this.joinableRoomsLoading = false;
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
        case constants.GET_JOINABLE_ROOMS_LOADING:
            RoomStore.onGetJoinableRoomsLoading();
            break;
        case constants.GET_JOINABLE_ROOMS_SUCCESS:
            RoomStore.onGetJoinableRoomsSuccess(action.action.rooms);
            break;
        case constants.GET_JOINABLE_ROOMS_ERROR:
            RoomStore.onGetJoinableRoomsError();
            break;
    }
});

module.exports = RoomStore;