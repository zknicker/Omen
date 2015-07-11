'use strict';

var request = require('superagent');

var getResponseFromEndpoint = function(endpoint, successCallback, errorCallback) {
    request.get(endpoint).end(function(err, res) {
        if (res.ok) {
            successCallback(res.body);
        } else {
            errorCallback();
        }
    });
};

module.exports = {
    
    // AJAX query for room information.
    getRoom: function(successCallback, errorCallback) {
        getResponseFromEndpoint('/room', successCallback, errorCallback);
    }
};