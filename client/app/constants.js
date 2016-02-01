'use strict';

var GlobalConstants = {
    route: '/',

    page: {
        title: 'Home',
        description: 'A React + Flux application',
        keywords: null

    },

    dispatcherPayloadSources: {
        VIEW_ACTION: 'VIEW_ACTION'
    }
};

var EndpointConstants = {
    REGISTER: '/user/register',
    LOGIN: '/login',
    AVATAR: '../images/avatars/'
};

var ActionTypeConstants = {
    // Authentication
    SHOW_CREATE_ACCOUNT_FIELDS: 'SHOW_CREATE_ACCOUNT_FIELDS',
    SHOW_LOGIN_FIELDS: 'SHOW_LOGIN_FIELDS',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE',
    REGISTER_IN_PROGRESS: 'REGISTER_IN_PROGRESS',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGIN_IN_PROGRESS: 'LOGIN_IN_PROGRESS',
    LOGOUT: 'LOGOUT',
    SET_AUTH_TOKEN: 'SET_AUTH_TOKEN',
    SET_LOGIN_REDIRECT_ROUTE: 'SET_LOGIN_REDIRECT_ROUTE',
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    SET_CURRENT_USER_SOCKET: 'SET_CURRENT_USER_SOCKET',
    GET_ALL_USERS_LOADING: 'GET_ALL_USERS_LOADING',
    GET_ALL_USERS_ERROR: 'GET_ALL_USERS_ERROR',
    GET_ALL_USERS_SUCCESS: 'GET_ALL_USERS_SUCCESS',
    UPDATE_SETTINGS_AVATAR_LOADING: 'UPDATE_SETTINGS_AVATAR_LOADING',
    UPDATE_SETTINGS_AVATAR_ERROR: 'UPDATE_SETTINGS_AVATAR_ERROR',
    UPDATE_SETTINGS_AVATAR_SUCCESS: 'UPDATE_SETTINGS_AVATAR_SUCCESS'
}

module.exports = {
    Global: GlobalConstants,
    Endpoint: EndpointConstants,
    ActionType: ActionTypeConstants,
};