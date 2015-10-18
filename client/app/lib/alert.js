'use strict';

var swal = require('swal');

/**
 * Encapsulation for throwing pop-up alerts onto the page using the
 * fantastic Sweet Alert library.
 *
 * Sweet Alert: http://t4t5.github.io/sweetalert/
 */
var Alert = {
    /**
     * Generic error popup with custome message and optional callback.
     */
    error: function(error, callback) {
        swal({
            title: 'Error',
            text: error,
            type: 'error',
            confirmButtonText: 'Close'
        }, callback);
    },
    
    /**
     * Error popup. Clicking the confirm button refreshes the page.
     */
    disconnectedError: function(error) {
        swal({
            title: 'Disconnected',
            text: error,
            type: 'error',
            confirmButtonText: 'Reconnect'
        }, function () {
            location.reload();
        });
    }
};

module.exports = Alert;