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
    
    onLatestMessagesSuccess: function(retrievedMessages) {
        this.messages.length = 0;
        var messages = this.messages;
        (retrievedMessages).forEach(function(message) {
            messages.push(message.message);
        });
        this.loading = false;
        this.emitChange();
    },
    
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