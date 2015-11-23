'use strict';

var userStore = require('../modules/user/user.store');

/**
 * Checks to see if a user has admin priveleges. If not, the
 * user is redirected to the homepage.
 */
var AdminAuthenticationMixin = {
    statics: {
        willTransitionTo: function(transition) {
            if (!userStore.getUser().isAdmin()) {
                transition.redirect('/');
            } 
        }
    }
};

module.exports = AdminAuthenticationMixin;