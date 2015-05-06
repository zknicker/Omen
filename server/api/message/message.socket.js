/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Message = require('../../config/database').message;
var cache = require('../../config/cache');
var MessageController = require('./message.controller');
var socketHelpers = require('../../helpers/socket.helpers');

// Socket listeners to react to client messages for each user.
exports.register = function(io, socket) {
    
    socket.on('message:create', function(data) {
        MessageController.createMessage(data, socket);
        cache.storeNewMessage(data);
        io.emit('message:create', data);
    });
}

// Socket listeners that register once in app lifetime.
exports.registerOnce = function(io) {

}