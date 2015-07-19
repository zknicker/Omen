'use strict';

var socketHelper = require('../../helpers/socket.helper');
var constant = require('../../helpers/constants.helper');
var UserController = require('./user.controller');

// Socket listeners to react to client messages for each user.
exports.register = function (io, socket) {

    /**
     * Retrieves the rooms that a user has presently joined.
     */
    socket.on('user:rooms', function (req, acknowledgement) {
        if (socketHelper.isAuthenticated(socket)) {
            UserController.getRooms(socket.userId, function (err, rooms) {
                acknowledgement({
                    errors: err,
                    rooms: rooms
                });
            });
        } else {
            acknowledgement({
                error: constant.get('SOCKET_NO_AUTH'),
                room: null
            });
        }
    });
}

// Socket listeners that register once in app lifetime.
exports.registerOnce = function (io) {

}