/**
 * Socket.io configuration
 */

'use strict';

var events = require('../config/events');
var messageSocketFunctions = require('../api/message/message.socket');
var roomSocketFunctions = require('../api/room/room.socket');
var userSocketFunctions = require('../api/user/user.socket');
var userController = require('../api/user/user.controller');
var jwtHelper = require('../helpers/jwt.helper');
var error = require('../helpers/error.helper');

function onConnect(io, socket) {

    // Register per-socket listeners.
    socket.removeAllListeners();
    messageSocketFunctions.register(io, socket);
    roomSocketFunctions.register(io, socket);
}

function onDisconnect(io, socket) {
    // Remove the auth'd user from any rooms.
    if (socket.authenticated) {
        userController.leaveAllRooms(socket.userId, function (err) {
            events.emit('server:room:departed', socket.userId);
        });
    }
}

// Executed when the client authenticates over socket.
function onAuthenticate(socket, token) {
    jwtHelper.getDecodedToken(token, function (err, decodedToken) {
        if (err) {
            socket.emit('authenticate:error', 'Could not authenticate.');
        } else {
            socket.authenticated = true;
            socket.userId = decodedToken.id;
        }
    });
}

module.exports = function (io) {

    // Register global listeners.
    messageSocketFunctions.registerOnce(io);
    roomSocketFunctions.registerOnce(io);
    userSocketFunctions.registerOnce(io);

    io.on('connection', function (socket) {
        console.info('[SocketIO] Client connected: ' + socket.id);
        onConnect(io, socket);

        socket.authenticated = false;
        socket.on('authenticate', function(token) {
            onAuthenticate(socket, token);   
        });

        socket.on('disconnect', function () {
            console.info('[SocketIO] Client disconnected: ' + socket.id);
            onDisconnect(io, socket);
        });
    });
};