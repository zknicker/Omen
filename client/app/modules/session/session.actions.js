'use strict';

import Dispatcher from '../../Dispatcher';
var sessionConstants = require('./session.constants');

module.exports = {

    /**
     * Sets the auth token in the session store.
     */
    setAuthToken: function (token) {
        localStorage.setItem('token', token);
        Dispatcher.dispatch({
            type: sessionConstants.SET_AUTH_TOKEN,
            token: token
        });
    },
    
    /**
     * Sets the route that the user should be redirected to
     * after a successful login.
     */
    setLoginRedirectRoute: function (route) {
        Dispatcher.dispatch({
            type: sessionConstants.SET_LOGIN_REDIRECT_ROUTE,
            route: route
        });
    }
};