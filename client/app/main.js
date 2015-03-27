'use strict';

var routes = require('./routes/routes.jsx');
var Dispatcher = require('./dispatchers/default');
var pageConstants = require('./constants/page');
var routesConstants = require('./constants/routes');
var userActions = require('./actions/user');

// Check user authentication prior to app startup.
userActions.isAuthenticated({

    complete: function () {
        
        // Start routing & rendering pages.
        routes.startRouting();
        
        // Connect to the socket server.
        //var socket = io();

    }

});