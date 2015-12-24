'use strict';

var Store = require('../../lib/store');
import Dispatcher from '../../Dispatcher';
var sessionConstants = require('./session.constants');

var SessionStore = new Store({

    initialize: function () {
        this.token = localStorage.getItem('token');
        this.loginRedirectRoute = null;
        this.joinedRooms = [];
    },

    setAuthToken: function (token) {
        this.token = token;
        this.loginRedirectRoute = null;
    },
    
    setLoginRedirectRoute: function (route) {
        this.loginRedirectRoute = route;   
    }
});

SessionStore.dispatcherToken = Dispatcher.register(function (action) {
    switch (action.type) {
        case sessionConstants.SET_AUTH_TOKEN:
            SessionStore.setAuthToken(action.token);
            break;
        case sessionConstants.SET_LOGIN_REDIRECT_ROUTE:
            SessionStore.setLoginRedirectRoute(action.route);
            break;
    }
});

module.exports = SessionStore;