'use strict';

var request = require('superagent');

module.exports = {
    
    // AJAX query for recent messages by cha troom id.
    loadRecentMessagesForRoom: function(roomId, successCallback, errorCallback) {
        var query = { 
            url: '/messages/latest',
            qs: {
                roomId: roomId   
            }
        };
        
        request.get('/messages/latest').end(function(err, res) {
            if (res.ok) {
                var messages = res.body;
                successCallback(messages);
            } else {
                errorCallback();
            }
        });
    }
};