/**
 * Socket.io configuration
 */

'use strict';

var messageSocketFunctions = require('../api/message/message.socket');
var roomSocketFunctions = require('../api/room/room.socket');
var jwtHelper = require('../helpers/jwt.helper');

// Executed when the client socket connects.
function onConnect(io, socket) {

    // Register per-socket listeners.
    socket.removeAllListeners();
    messageSocketFunctions.register(io, socket);
    roomSocketFunctions.register(io, socket);
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

    io.on('connection', function (socket) {
        console.info('[SocketIO] Client connected: ' + socket.id);

        if (socket.handshake.address !== null) {
            socket.address = socket.handshake.address.address + ':' + socket.handshake.address.port;
        }

        // Disconnect any existing session for user. Set the user's new socket.
        //socketsHelper.disconnectExistingSocketForUser(socket.user._id);
        //socketsHelper.setSocketForUser(socket.user._id, socket);

        onConnect(io, socket);

        socket.authenticated = false;
        socket.on('authenticate', function(token) {
            onAuthenticate(socket, token);   
        });

        socket.on('disconnect', function () {
            //socketsHelper.removeSocketForUser(socket.user._id);
            console.info('[SocketIO] Client disconnected: ' + socket.id);
        });
    });
};