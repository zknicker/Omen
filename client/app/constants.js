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
    LOGIN: '/login'
};

var ActionTypeConstants = {
    // Authentication
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE',
    REGISTER_IN_PROGRESS: 'REGISTER_IN_PROGRESS',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGIN_IN_PROGRESS: 'LOGIN_IN_PROGRESS'
}

module.exports = {
    Global: GlobalConstants,
    Endpoint: EndpointConstants,
    ActionType: ActionTypeConstants,
};