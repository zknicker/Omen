'use strict';

var Dispatcher = require('../../dispatcher');
var socket = require('../../sockets');
var messageAjax = require('./message.ajax');
var messageConstants = require('./message.constants');

module.exports = {

    // Creates a message in a chat room.
    create: function (messageContent, roomId) {
        socket.emit('message:create', { roomId: roomId, message: messageContent });
    },
    
    // Loads all of the recent messages for a chat room.
    getRecent: function(roomId) {
        Dispatcher.handleViewAction({ actionType: messageConstants.MESSAGE_LATEST_LOADING });
        
        messageAjax.loadRecentMessagesForRoom(roomId, function(data) {
            Dispatcher.handleViewAction({ 
                actionType: messageConstants.MESSAGE_LATEST_SUCCESS,
                roomId: data.roomId,
                messages: data.messages
            });
        }.bind(this), function() {
            Dispatcher.handleViewAction({ actionType: messageConstants.MESSAGE_LATEST_ERROR });
        }.bind(this));
    }
};