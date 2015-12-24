'use strict';

var Store = require('../../lib/store');
import Dispatcher from '../../Dispatcher';
var constants = require('./message.constants');

var MessageStore = new Store({

    initialize: function() {
        /** 
         * A collection of objects each containing messages for a
         * given room. Indexed by room id.
         */          
        this.messages = [];
        
        /** True when loading messages for most recent request. */
        this.loading = true;
    },
    
    /**
     * GET RECENT MESSAGES FOR ROOM
     */
    onGetRecentMessagesLoading: function() {
        this.loading = true;
        this.emitChange();
    },
    
    onGetRecentMessagesSuccess: function(roomId, retrievedMessages) {
        this.messages[roomId] = [];
        retrievedMessages.forEach(function(message) {
            this.messages[roomId].unshift(message);
        }.bind(this));
        this.loading = false;
        this.emitChange();
    },
    
    onGetRecentMessagesError: function() {
        this.loading = false;
        this.emitChange();
    },
    
    /**
     * CREATE MESSAGE
     */
    onCreateMessage: function(roomId, message) {
        this.messages[roomId].push(message);
        this.emitChange();
    }
});

Dispatcher.register(function(action) {
    switch(action.type) {
        case constants.MESSAGE_RECENT_LOADING:
            MessageStore.onGetRecentMessagesLoading();
            break;
        case constants.MESSAGE_RECENT_SUCCESS:
            MessageStore.onGetRecentMessagesSuccess(action.roomId, action.messages);
            break;
        case constants.MESSAGE_RECENT_ERROR:
            MessageStore.onGetRecentMessagesError();
            break;
        case constants.CREATE_MESSAGE:
            MessageStore.onCreateMessage(action.roomId, action.message);
            break;
    }
});

module.exports = MessageStore;