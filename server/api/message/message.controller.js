'use strict';

var db = require('../../config/database');
var Message = db.models.message;
var CachedMessage = db.models.cachedmessage;
var messageResponse = require('../../data/messageResponse');

var createMessage = function (data, socket) {
    var newMessage = {
        message: data.message,
        user: socket.userId,
        roomId: data.roomId
    };

    CachedMessage.create(newMessage).catch(function() {
        socket.emit('message:create:error', 'Message could not be created.');
    });
};

var readLatestMessages = function (req, res, next) {
    req.assert('roomId', 'Invalid room ID.').notEmpty().isInt();

    if (req.validationErrors()) {
        return res.status(400).json({
            errors: req.validationErrors()
        });
    }
    
    Message.find({ room: req.params.roomId, limit: 20, sort: 'id DESC' })
        .populate('user')
        .then(function (messages) {
            var response = messageResponse.getLatestMessagesResponse(req.params.roomId, messages);
            res.send(response);
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