'use strict';

var keyMirror = require('keymirror');

var messageConstants = keyMirror({

    // Message AJAX Constants
    MESSAGE_LATEST_LOADING: null,
    MESSAGE_LATEST_SUCCESS: null,
    MESSAGE_LATEST_ERROR: null,
    CREATE_MESSAGE: null
});

module.exports = messageConstants;