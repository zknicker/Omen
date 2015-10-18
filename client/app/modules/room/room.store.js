'use strict';

var Store = require('../../lib/store');
var Dispatcher = require('../../dispatcher');
var Alert = require('../../lib/alert');
var constants = require('./room.constants');

var RoomStore = new Store({

    initialize: function() {
        /** The room currently being viewed. */
        this.activeRoom = {
            id: null,
            title: ''
        };
        
        /** All rooms currently joined. */
        this.currentRooms = [];
        
        /** A subset of all rooms available to join, even those already joined. */
        this.joinableRooms = [];
        
        /** Loading tracking vars. */
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
        this.currentRooms[room.id] = room;
        this.activeRoom = room;
        this.loading = false;
        this.emitChange();
    },
    
    onRoomError: function() {
        this.loading = false;
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
    },
    
    /**
     * SET ACTIVE ROOM
     */
    setActiveRoom: function(roomId) {
        if (this.currentRooms[roomId]) {
            this.activeRoom = this.currentRooms[roomId];
            this.emitChange();
        } else {
            Alert.error('Lost connection with this room. Please rejoin.', function() {
                console.log('here');
            });
        }
    },
    
    /**
     * UTILITY METHODS
     */
    hasRoom: function(roomId) {
        if (this.currentRooms[roomId]) {
            return true;   
        } else {
            return false;   
        }
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
        case constants.SET_ACTIVE_ROOM:
            RoomStore.setActiveRoom(action.action.roomId);
            break;
    }
});

module.exports = RoomStore;