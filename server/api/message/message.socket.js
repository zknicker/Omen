/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Message = require('../../config/database').message;
var MessageController = require('./message.controller');

// Socket listeners to react to client messages.
exports.register = function(io, socket) {
    socket.on('message:create', function(data) {
        MessageController.createMessage(data, socket);
        io.emit('message:create', data);
    });
}

// Listeners to react to server changes by emitting those changes to clients.
exports.registerOnce = function(io) {
    Message.afterCreate(function(message, options, fn) {
        console.log(message);   
    });
}