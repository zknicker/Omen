'use strict';

import Dispatcher from '../../Dispatcher';
var constants = require('./userlist.constants');

var registerSocketListeners = function(socket) {
    // A user joins a room.
    socket.on('userlist:add', function (data) {
        Dispatcher.dispatch({ 
            type: constants.USERLIST_ADD, 
            user: data.user, 
            roomId: data.roomId  
        });
    });
    
    // A user leaves a room.
    socket.on('userlist:remove', function (data) {
        Dispatcher.dispatch({ 
            type: constants.USERLIST_REMOVE, 
            userId: data.userId, 
            roomId: data.roomId
        });
    });
    
    // A user leaves all rooms (ie. a disconnect from the server)
    socket.on('userlist:remove:all', function (data) {
        Dispatcher.dispatch({
            type: constants.USERLIST_REMOVE_FROM_ALL,
            userId: data.userId
        });
    });
};

module.exports = registerSocketListeners;