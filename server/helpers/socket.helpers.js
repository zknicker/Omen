'use strict';

var auth = require('../auth');

var sendNotAuthenticatedError = function(socket) {
    socket.emit('error', 'You must be logged in to continue.');
}

module.exports = {
    sendNotAuthenticatedError: sendNotAuthenticatedError
};