'use strict';

/**
 * Join a room.
 */
var joinRoom = function(socket, roomId) {
    socket.join('room-' + roomId);
}

/**
 * Leave a room.
 */
var leaveRoom = function(socket, roomId) {
    socket.leave('room-' + roomId);
}

/**
 * Broadcast a message to a room using the socket.io room-space feature.
 * Note that, since this is a broadcast, the message won't be sent to the
 * socket client, only other socket clients.
 */
var broadcastToRoom = function(socket, roomId, event, message) {
    socket.broadcast.to('room-' + roomId).emit(event, message);
}

/**
 * Returns true if the socket connection is authenticated, and false
 * otherwise.
 */
var isAuthenticated = function(socket) {
    return socket.authenticated;   
}

/**
 * Returns a collection of all sockets in a socketio namespace.
 */
var _getSocketsForNamespace = function(namespace) {
    var result = [];
    for(var socket in sockets) {
        result.push(socket);  
    }
    console.log(result);
    return result;
}

module.exports = {
    joinRoom: joinRoom,
    leaveRoom: leaveRoom,
    broadcastToRoom: broadcastToRoom,
    isAuthenticated: isAuthenticated
};