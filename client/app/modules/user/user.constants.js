'use strict';

var userConstants = {

    // Action types.
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    SET_CURRENT_USER_SOCKET: 'SET_CURRENT_USER_SOCKET',
    GET_ALL_USERS_LOADING: 'GET_ALL_USERS_LOADING',
    GET_ALL_USERS_ERROR: 'GET_ALL_USERS_ERROR',
    GET_ALL_USERS_SUCCESS: 'GET_ALL_USERS_SUCCESS',
    UPDATE_SETTINGS_AVATAR_LOADING: 'UPDATE_SETTINGS_AVATAR_LOADING',
    UPDATE_SETTINGS_AVATAR_ERROR: 'UPDATE_SETTINGS_AVATAR_ERROR',
    UPDATE_SETTINGS_AVATAR_SUCCESS: 'UPDATE_SETTINGS_AVATAR_SUCCESS',
    
    // Unauthenticated user settings.
    unauthenticatedUser: {
        id: 0,
        loggedIn: false,
        username: 'Guest',
        role: 'Guest',
        avatar: 'default.png'
    },
    
    // Avatar path.
    AVATAR_URL: '../images/avatars/',
    
    // API endpoints.
    AVATAR_UPLOAD_ENDPOINT: '/user/avatar'
};

module.exports = userConstants;