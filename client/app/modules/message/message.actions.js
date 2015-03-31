'use strict';

var Dispatcher = require('../../dispatcher');
var socket = require('../../sockets');

module.exports = {

    createMessage: function (messageContent) {
        socket.emit('message:create', { content: messageContent });
    }
};