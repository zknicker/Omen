'use strict';

var roomController = require('./room.controller');
var auth = require('../../auth');

var routes = function (app) {

    // Read
    app.get('/room/:roomId', roomController.getRoom);
};

module.exports = routes;