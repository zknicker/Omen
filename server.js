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

// Express & SocketIO configuration
require('./server/config/socketio')(io);
require('./server/config/express')(app, express, database);

// Verify database connection and sync tables
database.sequelize.authenticate().complete(function (err) {
    if (!!err) {
        throw '✗ Database Connection Error: '.red + err;
    } else {
        console.log('✔ Database Connection Success!'.green);
        database.sequelize.sync()
            .success(function () {
                console.log('✔ Database Synced!'.green);
            }).error(function () {
                throw '✗ Database Not Synced!'.red;
            });
    }
});

// Start Express server.
server.listen(app.get('port'), function () {
    console.log('✔ Express server listening on port '.green + '%d'.blue + ' in '.green + '%s'.blue + ' mode'.green, app.get('port'), app.get('env'));
});

module.exports = app;