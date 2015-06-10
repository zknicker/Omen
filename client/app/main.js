'use strict';

var routes = require('./routes.jsx');
var userActions = require('./modules/user/user.actions');
var socket = require('./sockets');

// Bootstrap the app with the current user.
// Do not route or do anything else until a user is set.
userActions.bootstrap({

    complete: function () {
        
        // Start routing & rendering pages.
        routes.startRouting();
        
        // Connect to the socket server.
        socket.connect();
        userActions.setSocket(socket);
        
        // If the user is authenticated, authenticate the socket.
        var token = userActions.getToken();
        if (token) {
            socket.authenticate(token); 
        }
    }
});