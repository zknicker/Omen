'use strict';

var userConstants = {

    // Action types.
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    SET_CURRENT_USER_SOCKET: 'SET_CURRENT_USER_SOCKET',

    // Unauthenticated user settings.
    unauthenticatedUser: {
        id: 0,
        loggedIn: false,
        username: 'Guest',
        role: 'Guest'
    }
};

module.exports = userConstants;