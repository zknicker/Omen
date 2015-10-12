'use strict';

var Store = require('../../lib/store');
var Dispatcher = require('../../dispatcher');
var constants = require('./room.constants');

var RoomStore = new Store({

    initialize: function() {
        // Room current being viewed
        this.currentRoom = {
            id: null,
            title: '',
            users: []
        };
        this.activeRoom = {
            id: null,
            title: '',
            users: []
        };
        this.currentRooms = [];
        this.joinableRooms = [];
        this.joinableRoomsLoading = true;
        this.createRoomLoading = false;
        this.loading = false;
    },
    
    /**
     * LOAD ROOM
     */
    onRoomLoading: function() {
        this.loading = true;
        this.emitChange();
    },
    
    onRoomSuccess: function(room) {
        this.currentRoom = room;
        this.currentRooms[room.id] = room;
        this.activeRoom = room;
        this.loading = false;
        console.log('hERE');
        this.emitChange();
    },
    
    onRoomError: function() {
        this.loading = false;
        this.emitChange();
    },
    
    /**
     * USER JOINS ROOM
     */
    onRoomJoined: function(user) {
        this.currentRoom.users.push(user);
        this.emitChange();
    },
    
    /**
     * USER DEPARTS ROOMS
     */
    onRoomDeparted: function(userId) {
        var indexOfUser = null;
        this.currentRoom.users.forEach(function (roomUser, i) {
            if (roomUser.id === userId) {
                 indexOfUser = i;  
            }
        });
        
        if (indexOfUser !== null) {
            this.currentRoom.users.splice(indexOfUser, 1);
        }
        this.emitChange();
    },
    
    /**
     * GET JOINABLE ROOMS
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
     * CREATE ROOM
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
            RoomStore.onRoomDeparted(action.action.userId);
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