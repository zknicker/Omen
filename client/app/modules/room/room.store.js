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
        this.createRoomLoading = false;
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
     * Handle getting the list of joinable rooms.
     */
    onGetJoinableRoomsLoading: function() {
        this.joinableRoomsLoading = true;
        this.emitChange();
    },
    
    onGetJoinableRoomsSuccess: function(rooms) {
        this.joinableRoomsLoading = false;
        this.joinableRooms = rooms;
        this.emitChange();
    },
    
    onGetJoinableRoomsFailure: function() {
        this.joinableRoomsLoading = false;
        this.emitChange();
    },
    
    /**
     * Handle creating a new room.
     */
    onCreateRoomLoading: function() {
        this.createRoomLoading = true;
        this.emitChange();
    },
    
    onCreateRoomSuccess: function(room) {
        this.createRoomLoading = false;
        this.joinableRooms.push(room);
        this.emitChange();
    },
    
    onCreateRoomError: function() {
        this.createRoomLoading = false;
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
        case constants.CREATE_ROOM_LOADING:
            RoomStore.onCreateRoomLoading();
            break;
        case constants.CREATE_ROOM_SUCCESS:
            RoomStore.onCreateRoomSuccess(action.action.room);
            break;
        case constants.CREATE_ROOM_ERROR:
            RoomStore.onCreateRoomError();
            break;
    }
});

module.exports = RoomStore;