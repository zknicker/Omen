/**
 * Socket.io configuration
 */

'use strict';

var socketioJwt = require('socketio-jwt');
var secrets = require('./secrets');

var sockets = {};

module.exports = function (io) {

    io.on('connection', function (socket) {
        console.info('[SocketIO] Client connected: ' + socket.id);
        sockets[socket.id] = socket;

        socket.on('message:create', function(data) {
            io.emit('message:create', data);
        });
        
        /*
        if (socket.handshake.address !== null) {
            socket.address = socket.handshake.address.address + ':' + socket.handshake.address.port;
        } else {
            socket.address = process.env.DOMAIN;
        }

        socket.connectedAt = new Date();

        // Disconnect any existing session for user. Set the user's new socket.
        socketsHelper.disconnectExistingSocketForUser(socket.user._id);
        socketsHelper.setSocketForUser(socket.user._id, socket);

        onConnect(io, socket);

        */
        socket.on('disconnect', function () {
            //socketsHelper.forgetSocketForUser(socket.user._id);
            //onDisconnect(io, socket);
            sockets[socket.id].delete;
            console.info('[SocketIO] Client disconnected: ' + socket.id);
        });
    });
};