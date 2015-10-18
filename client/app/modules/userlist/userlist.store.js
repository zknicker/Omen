'use strict';

var Store = require('../../lib/store');
var Dispatcher = require('../../dispatcher');
var constants = require('./userlist.constants');

var UserListStore = new Store({

    initialize: function() {
        /** A collection of objects each containing users for a room. */          
        this.userList = [];
        
        /** 
         * Preferred way of retrieving userlist. If userlist is undefined,
         * creates an empty userlist to prevent null exceptions.
         */
        this.getUserList = function(roomId) {
            if (!this.userList[roomId]) {
                this.userList[roomId] = [];  
            }
            return this.userList[roomId];
        };
        
        /** True when loading messages for most recent request. */
        this.loading = true;
    },
    
    /**
     * GET RECENT MESSAGES FOR ROOM
     */
    onGetCurrentUserListLoading: function() {
        this.loading = true;
        this.emitChange();
    },
    
    onGetUserListSuccess: function(roomId, userList) {
        this.userList[roomId] = [];
        if (userList) {
            userList.forEach(function(user) {
                this.userList[roomId].push(user);
            }.bind(this));
        }
        this.loading = false;
        this.emitChange();
    },
    
    onGetUserListError: function() {
        this.loading = false;
        this.emitChange();
    },
    
    /**
     * ADD/REMOVE TO USERLIST
     */
    add: function(roomId, user) {
        var userAlreadyAdded = false;
        this.getUserList(roomId).forEach(function (u) {
            if (u.id === user.id) {
                userAlreadyAdded = true;
            }
        });
        
        if (!userAlreadyAdded) {
            this.getUserList(roomId).push(user);
            this.emitChange();
        }
    },
    
    remove: function(roomId, userId) {
        var indexOfUser = null;
        var userList = this.getUserList(roomId);
        
        userList.forEach(function (roomUser, i) {
            if (roomUser.id === userId) {
                 indexOfUser = i;  
            }
        });
        
        if (indexOfUser !== null) {
            userList.splice(indexOfUser, 1);
        }
        this.emitChange();   
    },
    
    removeFromAll: function(userId) {
        var indexOfUser = null;
        
        this.userList.forEach(function (userList) {
            userList.forEach(function (roomUser, i) {
                if (roomUser.id === userId) {
                     indexOfUser = i;  
                }
            });
            if (indexOfUser !== null) {
                userList.splice(indexOfUser, 1);
            }
        });
        this.emitChange();   
    }
});

Dispatcher.register(function(action) {
    var a = action.action;
    switch(a.actionType) {
        case constants.USERLIST_CURRENT_LOADING:
            UserListStore.onGetCurrentUserListLoading();
            break;
        case constants.USERLIST_CURRENT_SUCCESS:
            UserListStore.onGetUserListSuccess(a.roomId, a.userList);
            break;
        case constants.USERLIST_CURRENT_ERROR:
            UserListStore.onGetUserListError();
            break;
        case constants.USERLIST_ADD:
            UserListStore.add(a.roomId, a.user);
            break;
        case constants.USERLIST_REMOVE:
            UserListStore.remove(a.roomId, a.userId);
            break;
        case constants.USERLIST_REMOVE_FROM_ALL:
            UserListStore.removeFromAll(a.userId);
            break;
    }
});

module.exports = UserListStore;