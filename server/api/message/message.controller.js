'use strict';

var db = require('../../config/database');
var cache = require('../../config/cache');
var CachedMessage = db.models.cachedmessage;

var createMessage = function (data, socket) {
    var newMessage = {
        message: data.message,
        userId: 1
    };

    CachedMessage.create(newMessage).catch(function() {
        socket.emit('message:create:error', 'Message could not be created.');
    });
};

var readLatestMessages = function (req, res, next) {
    CachedMessage.find({
            limit: 10,
            sort: 'id ASC'
        }).then(function (messages) {
            res.send(messages);
        }).catch(function (err) {
            return next(err);
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