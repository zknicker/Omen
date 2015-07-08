'use strict';

/**
 * Returns a constant!
 */
var get = function(constant) {
    var ret = '';
    switch (constant) {
        case 'COULD_NOT_ADD_USER_TO_ROOM':
            ret = 'The user could not be added to the room.';
            break;
            
        case 'SOCKET_NO_AUTH':
            ret = 'You must be logged in to join a room.';
            break;
    }
    return ret;
}

module.exports = {
    get: get,
};