'use strict';

import UserStore from '../modules/user/user.store';
import AuthenticationActions from '../modules/authentication/authentication.actions';
import AuthenticationStore from '../modules/authentication/authentication.store';

var AuthenticationMixin = {
    statics: {
        willTransitionTo: function(transition) {
            if (!AuthenticationStore.isAuthenticated()) {
                AuthenticationActions.setLoginRedirectRoute(transition.path);
                //transition.redirect('/landing');
            } 
        }
    }
};

module.exports = AuthenticationMixin;