'use strict';

var db = require('../../config/database');
var cache = require('../../config/cache');
var CachedMessage = db.models.cachedmessage;

var createMessage = function (data, handleError) {
    var newMessage = {
        message: data.message
    };

    CachedMessage.create(newMessage).catch(handleError);
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