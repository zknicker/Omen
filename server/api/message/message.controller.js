'use strict';

var db = require('../../config/database');
var Message = db.models.message;
var CachedMessage = db.models.cachedmessage;

var createMessage = function (data, socket) {
    var newMessage = {
        message: data.message,
        userId: socket.userId
    };

    CachedMessage.create(newMessage).catch(function() {
        socket.emit('message:create:error', 'Message could not be created.');
    });
};

var readLatestMessages = function (req, res, next) {
    Message.find({ limit: 10, sort: 'id ASC' })
        .populate('user')
        .then(function (messages) {
            res.send(messages);
        }).catch(next);
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