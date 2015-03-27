'use strict';

var GlobalConstants = {

    route: '/',

    page: {
        title: 'Home',
        description: 'A React + Flux application',
        keywords: null

    },

    user: {
        loggedIn: false,
        firstName: 'John',
        lastName: 'Doe'
    },

    messages: {},

    dispatcherPayloadSources: {
        VIEW_ACTION: 'VIEW_ACTION'
    },
};

module.exports = GlobalConstants;