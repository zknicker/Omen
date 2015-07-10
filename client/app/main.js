'use strict';

var routes = require('./routes.jsx');
var userActions = require('./modules/user/user.actions');
var sessionStore = require('./modules/session/session.store');
var socket = require('./sockets');

// Bootstrap the app with the current user.
// Do not route or do anything else until a user is set.
userActions.bootstrap({

    complete: function () {
        
        // Connect to the socket server.
        socket.connect();
        userActions.setSocket(socket);
        
        // If the user is authenticated, authenticate the socket.
        if (sessionStore.token) {
            socket.authenticate(sessionStore.token); 
        }
        
        // Start routing & rendering pages.
        routes.startRouting();
    }
});