'use strict';

var Login = require('../account/login.jsx');
var userStore = require('../modules/user/user.store');
var sessionStore = require('../modules/session/session.store');

var AuthenticationMixin = {
    statics: {
        willTransitionTo: function(transition) {
            console.log('yo yo yo yo yo');
            if (!userStore.getUser().loggedIn) {
                sessionStore.setLoginRedirectRoute(transition.path);
                transition.redirect('/login');
            } 
        }
    }
};

module.exports = AuthenticationMixin;