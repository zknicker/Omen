'use strict';

var Store = require('../../lib/store');
var Dispatcher = require('../../dispatcher');
var userConstants = require('./user.constants');
var userDefaults = require('../../constants').user;

var _user = userDefaults;
var _socket;

var UserStore = new Store({

    // Gets data associated with the current user.
    get: function () {
        return _user;
    },
    
    isAdmin: function() {
        return _user.role === 'admin';
    }
});

UserStore.dispatcherToken = Dispatcher.register(function (payload) {

    var action = payload.action;

    if (action.actionType === userConstants.SET_CURRENT_USER) {
        _user = action.user;
        UserStore.emitChange();
    }
    
    if (action.actionType === userConstants.SET_CURRENT_USER_SOCKET) {
        _socket = action.socket;
        UserStore.emitChange();
    }

});

module.exports = UserStore;