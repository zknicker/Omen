'use strict';

var Store = require('../../lib/store');
var Dispatcher = require('../../dispatcher');
var userConstants = require('./user.constants');
var userDefaults = require('./user.constants').unauthenticatedUser;

var UserStore = new Store({

    initialize: function () {
        this._user = userDefaults;
        this._socket = null;
        
        this.allUsers = [];
    },
    
    getUser: function() {
        return {
            id: this._user.id,
            email: this._user.email,
            username: this._user.username,
            loggedIn: this._user.loggedIn, // TODO: wtf?
            
            isAdmin: function() {
                return this._user.role === 'admin';   
            }.bind(this)
        };
    },
    
    handleSetCurrentUser: function(user) {
        this._user = user;
        UserStore.emitChange();
    },
    
    handleSetUserSocket: function(socket) {
        this._socket = socket;
        UserStore.emitChange();
    },
    
    handleSetAllUsers: function(allUsers) {
        this.allUsers = allUsers || [];
        UserStore.emitChange(); 
    },
});

UserStore.dispatcherToken = Dispatcher.register(function (payload) {

    var action = payload.action;

    if (action.actionType === userConstants.SET_CURRENT_USER) {
        UserStore.handleSetCurrentUser(action.user);
    }
    
    if (action.actionType === userConstants.SET_CURRENT_USER_SOCKET) {
        UserStore.handleSetUserSocket(action.socket);
    }
    
    if (action.actionType === userConstants.SET_ALL_USERS_LIST) {
        UserStore.handleSetAllUsers(action.users);
    }
});

module.exports = UserStore;