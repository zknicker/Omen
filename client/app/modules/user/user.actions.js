'use strict';

import Dispatcher from '../../Dispatcher';
var userConstants = require('./user.constants');
import AuthenticationActions from '../authentication/authentication.actions';
import AuthenticationStore from '../authentication/authentication.store';
var request = require('superagent');
var serialize = require('form-serialize');
var cookie = require('cookie');
var socket = require('../../sockets');

module.exports = {

    /**
     * Dispatch an event to the set the app's user.
     */
    setUser: function (user) {
        Dispatcher.dispatch({
            type: userConstants.SET_CURRENT_USER,
            user: user
        });
    },
    
    setSocket: function(socket) {
        Dispatcher.dispatch({
            type: userConstants.SET_CURRENT_USER_SOCKET,
            socket: socket
        });
    },

    /**
     * CALLED ONCE WHEN THE APP IS STARTED.
     *
     * Requests the current user from the server, and dispatches an event 
     * to set the app's user to it. If no user is authenticated, the default 
     * user (i.e. a "guest") is dispatched as the current user.
     */
    bootstrap: function (callback) {
        var self = this;
        var token = AuthenticationStore.getToken();
        request
            .get('/user')
            .type('json')
            .set({
                'authorization': 'Bearer ' + token,
            })
            .end(function (res) {
                if (res.ok) {
                    if (res.body && res.body.user) {
                        var userData = res.body.user;
                        userData.loggedIn = true;
                        self.setUser(userData);
                    } else {
                        self.logout();
                    }
                    if (callback && callback.success) {
                        callback.success(res);
                    }
                } else {
                    self.logout();
                    if (callback && callback.error) {
                        callback.error(res);
                    }
                }

                if (callback && callback.complete) {
                    callback.complete(res);
                }
            });
    },

    postForm: function (form, callback) {
        var self = this;
        var postData = serialize(form);
        var postUrl = form.getAttribute('action') || window.location.pathname;
        var token = AuthenticationStore.getToken();
        var options = callback.options || {};

        request
            .post(postUrl)
            .type('form')
            .set({
                'authorization': 'Bearer ' + token,
            })
            .send(postData)
            .end(function (res) {
                if (res.ok) {
                    var userData;

                    // Store the new token.
                    if (res.body.token) {
                        //AuthenticationActions.setAuthToken(res.body.token);
                        socket.authenticate(res.body.token);
                    }
                    
                    // If user needs to be updated
                    if (options.updateUser) {
                        userData = res.body.user;
                        userData.loggedIn = true;

                        self.setUser(userData);
                    }
                    // If user needs to be destroyed
                    if (options.destroyUser) {
                        // Log user out
                        self.logout();
                    }
                    if (callback && callback.success) {
                        callback.success(res);
                    }
                } else {
                    if (callback && callback.error) {
                        callback.error(res);
                    }
                }
            });
    },

    login: function (form, callback) {
        var cb = callback || function () {};
        cb.options = {
            updateUser: true
        };
        this.postForm(form, cb);
    },

    logout: function () {
        // Reset user to defaults
        this.setUser(userConstants.unauthenticatedUser);
    },

    signup: function (form, callback) {
        var cb = callback || function () {};
        cb.options = {
            updateUser: true
        };
        this.postForm(form, cb);
    },

    forgot: function (form, callback) {
        var cb = callback || function () {};
        cb.options = {
            successUrl: '/',
            errorUrl: '/forgot'
        };
        this.postForm(form, cb);
    },

    reset: function (form, callback) {
        var cb = callback || function () {};
        this.postForm(form, cb);
    },

    updateSettings: function (form, callback) {
        var cb = callback || function () {};
        cb.options = {
            updateUser: true
        };
        this.postForm(form, cb);
    },

    updatePassword: function (form, callback) {
        var cb = callback || function () {};
        this.postForm(form, cb);
    },

    destroy: function (form, callback) {
        var cb = callback || function () {};
        cb.options = {
            destroyUser: true
        };
        this.postForm(form, cb);
    },
    
    /**
     * Gets a list of all users registered to the site.
     * [ADMIN ONLY]
     */
    getAllUsers: function() {
        Dispatcher.dispatch({ type: userConstants.ALL_USERS_LOADING });
        socket.emit('users:list', null, function(res) {
            if (res.errors) {
                Dispatcher.dispatch({ type: userConstants.ALL_USERS_ERROR });
            }
            Dispatcher.dispatch({ type: userConstants.ALL_USERS_SUCCESS, users: res.users });
        });
    },
};