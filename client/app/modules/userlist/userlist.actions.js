'use strict';

var Dispatcher = require('../../dispatcher');
var socket = require('../../sockets');
var userListAjax = require('./userlist.ajax');
var userListConstants = require('./userlist.constants');

module.exports = {

    // Loads the current user list for a chat room.
    getCurrent: function(roomId) {
        Dispatcher.handleViewAction({ actionType: userListConstants.USERLIST_CURRENT_LOADING });
        socket.emit('userlist:get', roomId, function(res) {
            if (res.error) {
                Dispatcher.handleViewAction({ actionType: userListConstants.USERLIST_CURRENT_ERROR });
            }
            Dispatcher.handleViewAction({ 
                actionType: userListConstants.USERLIST_CURRENT_SUCCESS, 
                roomId: res.roomId,
                userList: res.userList 
            });
        }); 
    }
};