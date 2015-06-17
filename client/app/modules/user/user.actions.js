'use strict';

var Dispatcher = require('../../dispatcher');
var userConstants = require('./user.constants');
var request = require('superagent');
var serialize = require('form-serialize');
var cookie = require('cookie');
var socket = require('../../sockets');

module.exports = {

    /**
     * Dispatch an event to the set the app's user.
     */
    setUser: function (user) {
        Dispatcher.handleViewAction({
            actionType: userConstants.SET_CURRENT_USER,
            user: user
        });
    },
    
    setSocket: function(socket) {
        Dispatcher.handleViewAction({
            actionType: userConstants.SET_CURRENT_USER_SOCKET,
            socket: socket
        });
    },

    /**
     * CALL ONCE WHEN THE APP IS STARTED.
     *
     * Requests the current user from the server, and dispatches an event 
     * to set the app's user to it. If no user is authenticated, the default 
     * user (i.e. a "guest") is dispatched as the current user.
     */
    bootstrap: function (callback) {
        var self = this;
        var token = self.getToken();
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
        var token = self.getToken();
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
                        localStorage.token = res.body.token;
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

    getToken: function () {
        return localStorage.token;
    },

    setToken: function (token, duration) {
        var today = new Date();
        // Set expire date for cookie for some time into the future (days)
        var endDate = new Date(today.getTime() + (duration * 1000 * 60 * 60 * 24));
        document.cookie = cookie.serialize('token', token, {
            expires: endDate
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
        // Remove token
        this.setToken('', -1);

        // Reset user to defaults
        console.log(userConstants.unauthenticatedUser);
        this.setUser(userConstants.unauthenticatedUser);

        // Redirect to homepage [todo: replace this]
        //routeActions.setRoute('/');
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
    }

};