'use strict';

var Dispatcher = require('../../dispatcher');
var socket = require('../../sockets');

module.exports = {

    createMessage: function (message) {
        socket.emit('message:create', { message: message });
    }
};