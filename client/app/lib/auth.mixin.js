'use strict';

var userStore = require('../modules/user/user.store');
var sessionStore = require('../modules/session/session.store');

var AuthenticationMixin = {
    statics: {
        willTransitionTo: function(transition) {
            if (!userStore.getUser().loggedIn) {
                sessionStore.setLoginRedirectRoute(transition.path);
                transition.redirect('/landing');
            } 
        }
    }
};

module.exports = AuthenticationMixin;