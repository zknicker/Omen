'use strict';

var Dispatcher = require('../../dispatcher');
var socket = require('../../sockets');
var messageAjax = require('./message.ajax');
var messageConstants = require('./message.constants');

module.exports = {

    // Creates a message in a chat room.
    createMessage: function (messageContent) {
        socket.emit('message:create', { message: messageContent });
    },
    
    // Loads all of the recent messages for a chat room.
    getRecentMessagesForRoom: function(roomId) {
        Dispatcher.handleViewAction({ actionType: messageConstants.MESSAGE_LATEST_LOADING });
        
        messageAjax.loadRecentMessagesForRoom(roomId, function(messages) {
            Dispatcher.handleViewAction({ actionType: messageConstants.MESSAGE_LATEST_SUCCESS, messages: messages });
        }.bind(this), function() {
            Dispatcher.handleViewAction({ actionType: messageConstants.MESSAGE_LATEST_ERROR });
        }.bind(this));
    }
};