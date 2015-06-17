'use strict';

/**
 * Returns an error or the decoded token.
 */
var log = function(error) {
    if (error) {
        console.log('ERROR HELPER: ' + error);
    }
}

module.exports = {
    log: log,
};