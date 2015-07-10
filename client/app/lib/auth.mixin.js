'use strict';

var Login = require('../account/login.jsx');
var userStore = require('../modules/user/user.store');
var sessionStore = require('../modules/session/session.store');

var AuthenticationMixin = {
    statics: {
        willTransitionTo: function(transition) {
            if (!userStore.get().loggedIn) {
                console.log(transition.path);
                sessionStore.setLoginRedirectRoute(transition.path);
                transition.redirect('/login');
            } 
        }
    }
};

module.exports = AuthenticationMixin;