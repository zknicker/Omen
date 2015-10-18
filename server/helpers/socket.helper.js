'use strict';

var userController = require('../api/user/user.controller');

/**
 * Join a room.
 */
var joinRoom = function (socket, roomId) {
    socket.join('room-' + roomId);
}

/**
 * Leave a room.
 */
var leaveRoom = function (socket, roomId) {
    socket.leave('room-' + roomId);
}

/**
 * Emit a message to a room using the socket.io room-space feature.
 * Since this is an emit, the message is sent to everyone, including
 * the socket client.
 */
var emitToRoom = function (io, roomId, event, data) {
    io.to('room-' + roomId).emit(event, data);
}

/**
 * Broadcast a message to a room using the socket.io room-space feature.
 * Note that, since this is a broadcast, the message won't be sent to the
 * socket client, only other socket clients.
 */
var broadcastToRoom = function (socket, roomId, event, data) {
    socket.broadcast.to('room-' + roomId).emit(event, data);
}

/**
 * Returns true if the socket connection is authenticated, and false
 * otherwise.
 */
var isAuthenticated = function (socket) {
    return socket.authenticated;
}

/**
 * Returns true if the user has admin rights.
 */
var hasSpecialAdvancedAccessRights = function (socket) {
    return socket.authenticated && socket.userRole === 'admin';
}

/**
 * Caches the current user's profile information on the socket object.
 * If the user's profile changes, call this function.
 */
var cacheUserOnSocket = function(socket) {
    userController.readCachedAccount(socket.userId, function (err, user) {
        socket.user = user;
        if (err) {
            error.log('Error caching user on socket: ' + err);   
        }
    });   
}

/**
 * Returns a collection of all sockets in a socketio namespace.
 */
var _getSocketsForNamespace = function (namespace) {
    var result = [];
    for (var socket in sockets) {
        result.push(socket);
    }
    console.log(result);
    return result;
}

module.exports = {
    joinRoom: joinRoom,
    leaveRoom: leaveRoom,
    emitToRoom: emitToRoom,
    broadcastToRoom: broadcastToRoom,
    isAuthenticated: isAuthenticated,
    hasSpecialAdvancedAccessRights: hasSpecialAdvancedAccessRights,
    cacheUserOnSocket: cacheUserOnSocket
};