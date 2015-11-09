'use strict';

require('../styles/main.scss');

var routes = require('./routes.jsx');
var userActions = require('./modules/user/user.actions');
var sessionStore = require('./modules/session/session.store');
var joinRoomHelper = require('./helpers/joinroom.helper');
var routerContainer = require('./lib/routerContainer');
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

        // Authenticate to previously joined rooms.
        // For each, prefetch room info, messages, and user list.
        // joinRoomHelper(<ROOMID>);
        
        // Start routing & rendering pages.
        var router = routes.startRouting();
        
        // Store the router object in a container so that it can be referenced
        // by actions and stores. The router is otherwise only retrievable
        // via React modules.
        routerContainer.setRouter(router);
    }
});