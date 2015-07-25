'use strict';

var socketHelper = require('../../helpers/socket.helper');
var constants = require('../../helpers/constants.helper');
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
                error: constants.get('SOCKET_NO_AUTH'),
                room: null
            });
        }
    });

    /**
     * Retrieves a list of all users registered to the site.
     */
    socket.on('users:list', function (req, acknowldegement) {
        if (socketHelper.hasSpecialAdvancedAccessRights(socket)) {
            UserController.listAllUsers(function (err, users) {
                acknowledegement({
                    errors: err,
                    users: users
                });
            });
        } else {
            acknowldegement({
                error: constants.get('SOCKET_NO_SPECIAL_ACCESS_RIGHTS'),
                users: null
            });
        }
    });
}

// Socket listeners that register once in app lifetime.
exports.registerOnce = function (io) {

}