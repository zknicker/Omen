'use strict';

var roomController = require('./room.controller');
var auth = require('../../auth');

var routes = function (app) {

    // Create (temporary so rooms can be created from browser... lazy)
    app.get('/room/create', roomController.createRoom);

    // Read (TODO: take room id as a param)
    app.get('/room', roomController.getRoom);
};

module.exports = routes;