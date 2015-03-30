'use strict';

var Store = require('../../lib/store');
var Dispatcher = require('../../dispatcher');

var messages = [
    'Hello I am the first message.',
    'And I am the second.'
];

var MessageStore = new Store({

    getAll: function () {
        return messages;
    }

});

MessageStore.dispatcherToken = Dispatcher.register(function (payload) {

    var action = payload.action;

    switch (action.actionType) {
    case 'CREATE_MESSAGE':
        messages.push(action.content);
        MessageStore.emitChange();
        break;
    }
});

module.exports = MessageStore;