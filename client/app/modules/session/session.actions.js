'use strict';

var Dispatcher = require('../../dispatcher');
var sessionConstants = require('./session.constants');

module.exports = {

    /**
     * Sets the auth token in the session store.
     */
    setAuthToken: function (token) {
        Dispatcher.handleViewAction({
            actionType: sessionConstants.SET_AUTH_TOKEN,
            token: token
        });
    },
    
    /**
     * Sets the route that the user should be redirected to
     * after a successful login.
     */
    setLoginRedirectRoute: function (route) {
        Dispatcher.handleViewAction({
            actionType: sessionConstants.SET_LOGIN_REDIRECT_ROUTE,
            route: route
        });
    },
};