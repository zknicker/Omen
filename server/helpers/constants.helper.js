'use strict';

/**
 * Returns a constant!
 */
var get = function(constant) {
    var ret = '';
    switch (constant) {
        case 'ERROR_COULD_NOT_ADD_USER_TO_ROOM':
            ret = 'The user could not be added to the room.'
            break;
    }
    return ret;
}

module.exports = {
    get: get,
};