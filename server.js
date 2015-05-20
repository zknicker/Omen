/**
 * Node Server Configuration
 */
'use strict';

// Module dependencies.
var express = require('express');

// Configure console before we do anything.
require('./server/config/console');

// Create Express & SocketIO server.
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// Database configuration
var database = require('./server/config/database');

// Cache configuration
var cache = require('./server/config/cache');

// Verify database connection and sync tables
database.initialize(function(err) {
    if (err) {
        throw ('✗ Database Connect Error: ' + err).red;
    } else {
        console.log('✔ Database Connected!'.green);

        // Express & SocketIO configuration
        require('./server/config/socketio')(io);
        require('./server/config/express')(app, express, database);
        
        // Start routing.
        require('./server/routes')(app);
        console.log('✔ Starting routing. '.green);
        
        // Start Express server.
        server.listen(app.get('port'), function () {
            console.log('✔ Express server listening on port '.green + '%d'.blue + ' in '.green + '%s'.blue + ' mode'.green, app.get('port'), app.get('env'));
        });
    };
});

module.exports = app;