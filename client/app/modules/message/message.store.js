'use strict';

var Store = require('../../lib/store');
var Dispatcher = require('../../dispatcher');
var constants = require('./message.constants');

// Messages for a given chatroom.
var _messages = [];

// True when new messages are being retrieved.
var _loading = true;

var MessageStore = new Store({

    initialize: function() {
        this.messages = [];
        this.loading = true;
    },
    
    // Returns all messages in the store.
    getAll: function () {
        return { 
            messages: this.messages, 
            loading: this.loading 
        };
    },
    
    // Latest messages are being requested via AJAX.
    onLatestMessagesLoading: function() {
        this.loading = true;
    },
    
    // Latest messages loaded.
    onLatestMessagesSuccess: function(retrievedMessages) {
        this.messages.length = 0;
        var messages = this.messages;
        (retrievedMessages.messages).forEach(function(message) {
            messages.push(message.message);
        });
        this.loading = false;
        this.emitChange();
    },
    
    // Latest messages were requested via AJAX, but request errored.
    onLatestMessagesError: function() {
    },
    
    onCreateMessage: function(message) {
        this.messages.push(message);
        this.emitChange();
    }
});

Dispatcher.register(function(action) {
    switch(action.action.actionType) {
        case constants.MESSAGE_LATEST_LOADING:
            MessageStore.onLatestMessagesLoading();
            break;
        case constants.MESSAGE_LATEST_SUCCESS:
            var messages = action.action.messages;
            MessageStore.onLatestMessagesSuccess(messages);
            break;
        case constants.MESSAGE_LATEST_ERROR:
            MessageStore.onLatestMessagesError();
            break;
        case constants.CREATE_MESSAGE:
            var message = action.action.content;
            MessageStore.onCreateMessage(message);
            break;
    }
});

module.exports = MessageStore;