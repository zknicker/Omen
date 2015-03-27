'use strict';

var routes = require('./routes.jsx');
var userActions = require('./modules/user/user.actions');

// Check user authentication prior to app startup.
userActions.isAuthenticated({

    complete: function () {
        
        // Start routing & rendering pages.
        routes.startRouting();
        
        // Connect to the socket server.
        var socket = io();
    }
});