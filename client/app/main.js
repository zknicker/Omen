'use strict';

var routes = require('./routes.jsx');
var userActions = require('./modules/user/user.actions');
var socket = require('./sockets');

// Get the current user (we can't do anything without a user).
userActions.isAuthenticated({

    complete: function () {
        
        // Start routing & rendering pages.
        routes.startRouting();
        
        // Connect to the socket server.
        socket.connect();
    }
});