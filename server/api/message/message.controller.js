'use strict';

var db = require('../../config/database');
var Message = db.message;

var createMessage = function (data, socket) {
    
    var message = {
        content: data.content
    };

    Message.create(message).success(function (message) {
        return true;  
    }).error(function (err) {
        return err; 
    });
};

var readMessage = function (req, res, next) {
    //req.assert('content', 'Message content is not valid.').isAlpha();

    res.send('yo');
};

function handleError(err, next) {
    if (err) {
        return next(err);   
    }
}

module.exports = {
    createMessage: createMessage,
    readMessage: readMessage
};