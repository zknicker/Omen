'use strict';

var getLatestMessagesResponse = function(roomId, messages) {
    return {
        roomId: roomId,
        messages: messages
    }
};

var createMessageResponse = function(roomId, message) {
    console.log('hereherherher');
    return {
        roomId: roomId,
        message: message
    }
};

module.exports = {
    getLatestMessagesResponse: getLatestMessagesResponse,
    createMessageResponse: createMessageResponse
};