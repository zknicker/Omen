'use strict';

var db = require('../../config/database');
var Message = db.message;

var createMessage = function (req, res, next) {
    //req.assert('content', 'Message content is not valid.').isAlpha();

    res.status(200).json({
        token: token,
        user: user,
        success: [{
            msg: 'Create account'
        }]
    });
};

var readMessage = function (req, res, next) {
    //req.assert('content', 'Message content is not valid.').isAlpha();

    res.send('yo');
};

module.exports = {
    createMessage: createMessage,
    readMessage: readMessage
};