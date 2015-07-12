'use strict';

var roomController = require('./room.controller');
var auth = require('../../auth');

var routes = function (app) {

    // Create (temporary so rooms can be created from browser... lazy)
    app.get('/room/create', roomController.createRoom);

    // Read
    app.get('/room/:roomId', roomController.getRoom);
};

module.exports = routes;