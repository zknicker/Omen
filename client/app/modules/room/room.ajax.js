'use strict';

var request = require('superagent');

module.exports = {
    
    // AJAX query for all currently logged in users.
    getRoom: function(successCallback, errorCallback) {
        request.get('/room').end(function(err, res) {
            if (res.ok) {
                var room = res.body;
                successCallback(room);
            } else {
                errorCallback();
            }
        });
    }
};