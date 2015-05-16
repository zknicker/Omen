'use strict';

var db = require('../../config/database');
var cache = require('../../config/cache');
var Message = db.message;

var createMessage = function(data, socket) {
    var message = {
        message: data.message
    };

    Message.create(message).success(function (message) {
        return true;  
    }).error(function(err) {
        return err; 
    });
};

var readLatestMessages = function (req, res, next) {
    cache.getRecentMessages(function(messages) {
        res.send({ messages: messages });
    });
};

function handleError(err, next) {
    if (err) {
        return next(err);   
    }
}

module.exports = {
    createMessage: createMessage,
    readLatestMessages: readLatestMessages
};