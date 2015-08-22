'use strict';

var Store = require('../../lib/store');
var Dispatcher = require('../../dispatcher');
var constants = require('./message.constants');

var MessageStore = new Store({

    initialize: function() {
        this.messages = [];
        this.loading = true;
    },
    
    onLatestMessagesLoading: function() {
        this.loading = true;
        this.emitChange();
    },
    
    onLatestMessagesSuccess: function(roomId, retrievedMessages) {
        this.messages[roomId] = [];
        retrievedMessages.forEach(function(message) {
            this.messages[roomId].unshift(message);
        }.bind(this));
        this.loading = false;
        this.emitChange();
    },
    
    onLatestMessagesError: function() {
        this.loading = false;
        this.emitChange();
    },
    
    onCreateMessage: function(roomId, message) {
        this.messages[roomId].push(message);
        this.emitChange();
    }
});

Dispatcher.register(function(action) {
    var a = action.action;
    switch(a.actionType) {
        case constants.MESSAGE_LATEST_LOADING:
            MessageStore.onLatestMessagesLoading();
            break;
        case constants.MESSAGE_LATEST_SUCCESS:
            MessageStore.onLatestMessagesSuccess(a.roomId, a.messages);
            break;
        case constants.MESSAGE_LATEST_ERROR:
            MessageStore.onLatestMessagesError();
            break;
        case constants.CREATE_MESSAGE:
            MessageStore.onCreateMessage(a.roomId, a.message);
            break;
    }
});

module.exports = MessageStore;