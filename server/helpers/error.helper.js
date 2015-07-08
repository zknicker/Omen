'use strict';

/**
 * Returns an error or the decoded token.
 */
var log = function(error) {
    if (error) {
        console.log('ERROR HELPER: ', error);
    }
}

module.exports = {
    // Functions
    log: log,
    
    // Error codes
    SOCKET_NO_AUTH: 'SOCKET_NO_AUTH'
};