'use strict';

var db = require('../../config/database');
var cache = require('../../config/cache');
var CachedMessage = db.models.cachedmessage;

var createMessage = function (data, socket) {
    var message = {
        message: data.message
    };

    CachedMessage.create(message).then(function (message) {
        return true;
    }).error(function (err) {
        return err;
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