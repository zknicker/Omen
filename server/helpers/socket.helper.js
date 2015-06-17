'use strict';

var sockets = [];

/**
 * Sets a socket for user.
 */
var setSocketForUser = function(userId, socket) {
    sockets[userId] = socket;
}

var forgetSocketForUser = function(userId, socket) {
    delete sockets[userId];
}

/**
 * Disconnects the socket recorded for a user if one exists.
 */
var disconnectExistingSocketForUser = function(userId) {
    if (sockets[userId]) {
        sockets[userId].disconnect();   
    }
}

/**
 * Gets all of the sockets in the default namespace.
 */
var getSocketsForDefaultNameSpace = function() {
    return this._getSocketsForNamespace('/');
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
    setSocketForUser: setSocketForUser,
    forgetSocketForUser: forgetSocketForUser,
    disconnectExistingSocketForUser: disconnectExistingSocketForUser,
    getSocketsForDefaultNameSpace: getSocketsForDefaultNameSpace
};