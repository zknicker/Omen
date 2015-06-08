'use strict';

var userConstants = {

    // Action types.
    SET_CURRENT_USER: 'SET_CURRENT_USER',

    // Unauthenticated user settings.
    unauthenticatedUser: {
        loggedIn: false,
        firstName: 'Guest',
        lastName: 'Pants'
    }
};

module.exports = userConstants;