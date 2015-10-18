'use strict';

var request = require('superagent');

module.exports = {
    
    // AJAX query for current user list by chat room id.
    getCurrentUserList: function(roomId, successCallback, errorCallback) {
        request.get('/room/' + roomId + '/users').end(function(err, res) {
            console.log(res.body);
            if (res.ok) {
                var data = res.body;
                successCallback(data.userList);
            } else {
                errorCallback();
            }
        });
    }
};