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
            
        case 'SOCKET_NO_SPECIAL_ACCESS_RIGHTS':
            ret = 'You are not special enough to access this content.';
            break;
            
        case 'AVATAR_INVALID_MIME_TYPE':
            ret = 'The uploaded avatar must be a png, jpg, or gif.';
            break;
            
        case 'AVATAR_TOO_LARGE':
            ret = 'The uploaded avatar must be less than 2mb.';
            break;
    }
    return ret;
}

module.exports = {
    get: get,
};