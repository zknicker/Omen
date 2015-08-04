'use strict';

var swal = require('swal');

/**
 * Encapsulation for throwing pop-up alerts onto the page using the
 * fantastic Sweet Alert library.
 *
 * Sweet Alert: http://t4t5.github.io/sweetalert/
 */
var Alert = {
    error: function(errorText) {
        swal({
            title: 'Error',
            text: errorText,
            type: 'error',
            confirmButtonText: 'Close'
        });
    }
};

module.exports = Alert;