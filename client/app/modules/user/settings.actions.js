'use strict';

var Dispatcher = require('../../dispatcher');
var sessionActions = require('../session/session.actions');
var sessionStore = require('../session/session.store');
var request = require('superagent');
var serialize = require('form-serialize');
var socket = require('../../sockets');
var constants = require('./user.constants');

function dispatch(actionType, payload) {
    Dispatcher.handleViewAction({
        actionType: actionType,
        payload: payload
    });
}

module.exports = {

    sendData: function (data, endpoint, callback) {
        var self = this;
        var token = sessionStore.token;

        request
            .post(endpoint)
            .send(data)
            .set('authorization', 'Bearer ' + token)
            .set('Accept', 'application/json')
            .end(function (res) {
                if (res.ok) {
                    callback.success(res.body);   
                } else {
                    callback.error(res.body);   
                }
            });
    },

    updateAvatar: function (file) {
        dispatch(constants.UPDATE_SETTINGS_AVATAR_LOADING);
        var data = {};
        var endpoint = constants.AVATAR_UPLOAD_ENDPOINT;
        var callback = {
            success: function (res) {
                dispatch(constants.UPDATE_SETTINGS_AVATAR_SUCCESS, res.avatar);
            },
            error: function (res) {
                dispatch(constants.UPDATE_SETTINGS_AVATAR_ERROR, res.error);
            }
        };

        var reader = new FileReader();
        reader.onload = function (output) {
            data.avatar = output.target.result.split(',')[1];
            data.avatarMimeType = file.type;
            this.sendData(data, endpoint, callback);
        }.bind(this);

        reader.readAsDataURL(file);
    }
};
