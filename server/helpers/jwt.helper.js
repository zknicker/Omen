'use strict';

var jwt = require('jsonwebtoken');
var secrets = require('../config/secrets');

/**
 * Returns an error or the decoded token.
 */
var getDecodedToken = function(token, cb) {
    jwt.verify(token, secrets.sessionSecret, cb);
}

module.exports = {
    getDecodedToken: getDecodedToken,
};