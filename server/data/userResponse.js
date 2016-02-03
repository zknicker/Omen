'use strict';

var getCurrentUserAcknowledgment = function(error, user) {
    return {
        error: error,
        user: user
    }
}

module.exports = {
    getCurrentUserAcknowledgement: getCurrentUserAcknowledgment
};