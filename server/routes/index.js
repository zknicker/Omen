/**
 * User Routes
 */

'use strict';

var indexController = require('../controllers/index');
var path = require('path');
var fs = require('fs');
var errors = require('../errors');

var routes = function (app) {

    // Dynamically load other routes defined in the routes folder.
    fs.readdirSync(__dirname).forEach(function (file) {
        // Dont load this index.js file
        if (!/index/.test(file)) {
            var route = path.join(__dirname, file);
            require(route)(app);
        }
    });

    // Homepage route.
    app.get('/', indexController.index);

    // Undefined routes go to a 404 view.
    app.route('/*').get(errors[404]);
};

module.exports = routes;