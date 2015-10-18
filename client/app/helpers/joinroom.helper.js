'use strict';

var roomActions = require('../modules/room/room.actions');
var messageActions = require('../modules/message/message.actions');
var userListActions = require('../modules/userlist/userlist.actions');

/**
 * Helper for joining a room. Takes a roomId as a parameter, and
 * then does everything needed to join a room and fill a chat page
 * with information. Includes subscribing to the room by socket,
 * and retrieving room meta-data, messages, and user list.
 *
 * The callback has a signature: function(err)
 */
module.exports = function (roomId, cb) {
    roomActions.join(roomId);
    messageActions.getRecent(roomId);
    userListActions.getCurrent(roomId);
    
    return cb(false);
};