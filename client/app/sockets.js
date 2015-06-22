'use strict';

var messageSocketListeners = require('./modules/message/message.socket'); 

var _socket;
var _connect = function() {
    _socket = io();
};

var socketFunctions = {

    connect: function() {
        _connect();
        
        messageSocketListeners(_socket);
    },
    
    authenticate: function(token) {
        _socket.emit('authenticate', token);
    },
    
    on: function(event, func) {
        // registering on event/func
        _socket.on(event, func);   
    },
    
    emit: function(event, data, acknowledgement) {
        _socket.emit(event, data, acknowledgement);   
    }
};

module.exports = socketFunctions;