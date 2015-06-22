/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var events = require('../../config/events');
var Message = require('../../config/database').message;
var cache = require('../../config/cache');
var MessageController = require('./message.controller');
var socketHelpers = require('../../helpers/socket.helper');

// Socket listeners to react to client messages for each user.
exports.register = function(io, socket) {
    
    socket.on('message:create', function(data) {
        console.log('HEY FUCKTARD');
        MessageController.createMessage(data, socket);
    });
}

// Socket listeners that register once in app lifetime.
exports.registerOnce = function(io) {
    events.on('server:message:created', function(message) {
        io.emit('message:create', message); 
    });
}