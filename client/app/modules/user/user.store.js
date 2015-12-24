'use strict';

var Store = require('../../lib/store');
import Dispatcher from '../../Dispatcher';
var userConstants = require('./user.constants');
var userDefaults = require('./user.constants').unauthenticatedUser;
var Alert = require('../../lib/alert');

var UserStore = new Store({

    initialize: function () {
        this._user = userDefaults;
        this._socket = null;
        
        this.allUsers = [];
        this.avatarUpdateLoading = false;
    },
    
    getUser: function() {
        return {
            id: this._user.id,
            email: this._user.email,
            username: this._user.username,
            loggedIn: this._user.loggedIn, // TODO: wtf?
            avatar: userConstants.AVATAR_URL + this._user.avatar,
            
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
    
    handleUpdateAvatar: {
        success: function(avatarFileName) {
            var datedAvatarFileName = avatarFileName + '?' + (new Date()).getTime();
            
            // Stores are singletons, so this is an OK way to access the "instance" 
            // fields. Still, it feels dirty. Doing it this way since you can't use
            // bind(this) on functions which are members of objects (rather than 
            // another function), because JSHint says so. Lameeeeee.
            UserStore._user.avatar = datedAvatarFileName;
            UserStore.avatarUpdateLoading = false;
            UserStore.emitChange();
        },
        
        error: function(error) {
            Alert.error(error);
        },
        
        loading: function() {
            UserStore.avatarUpdateLoading = true;
            UserStore.emitChange();
        }
    }
});

UserStore.dispatcherToken = Dispatcher.register(function (action) {

    if (action.type === userConstants.SET_CURRENT_USER) {
        UserStore.handleSetCurrentUser(action.user);
    }
    
    if (action.type === userConstants.SET_CURRENT_USER_SOCKET) {
        UserStore.handleSetUserSocket(action.socket);
    }
    
    if (action.type === userConstants.SET_ALL_USERS_LIST) {
        UserStore.handleSetAllUsers(action.users);
    }
    
    if (action.type === userConstants.UPDATE_SETTINGS_AVATAR_SUCCESS) {
        UserStore.handleUpdateAvatar.success(action.payload);
    }
    
    if (action.type === userConstants.UPDATE_SETTINGS_AVATAR_ERROR) {
        UserStore.handleUpdateAvatar.error(action.payload);
    }
    
    if (action.type === userConstants.UPDATE_SETTINGS_AVATAR_LOADING) {
        UserStore.handleUpdateAvatar.loading();
    }
});

module.exports = UserStore;