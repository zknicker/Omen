/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var events = require('../../config/events');
var Message = require('../../config/database').message;
var cache = require('../../config/cache');
var MessageController = require('./message.controller');
var socketHelper = require('../../helpers/socket.helper');
var messageResponse = require('../../data/messageResponse');

// Socket listeners to react to client messages for each user.
exports.register = function(io, socket) {
    
    socket.on('message:create', function(data) {
        if (socketHelper.isAuthenticated(socket)) {
            MessageController.createMessage(data, socket);
        }
    });
}

// Socket listeners that register once in app lifetime.
exports.registerOnce = function(io) {
    events.on('server:message:created', function(message) {
        var response = messageResponse.createMessageResponse(message.roomId, message);
        io.emit('message:create', response);
    });
}