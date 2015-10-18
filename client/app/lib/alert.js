'use strict';

var swal = require('swal');

/**
 * Encapsulation for throwing pop-up alerts onto the page using the
 * fantastic Sweet Alert library.
 *
 * Sweet Alert: http://t4t5.github.io/sweetalert/
 */
var Alert = {
    error: function(error, callback) {
        swal({
            title: 'Error',
            text: error,
            type: 'error',
            confirmButtonText: 'Close'
        }, callback);
    }
};

module.exports = Alert;