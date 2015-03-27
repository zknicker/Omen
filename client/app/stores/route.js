'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');
var routesConstants = require('../constants/routes');
var pageConstants = require('../constants/page');
var routes = require('../routes/routes');

var RouteStore = new Store({

    // Gets data associated with the current user.
    get: function () {
        return '';
    }

});

RouteStore.dispatcherToken = Dispatcher.register(function (payload) {
    var action = payload.action;

    if (action.actionType === routesConstants.SET_CURRENT_ROUTE) {
        console.log('Route store called with: ' + action.route);
        routes.setRoute(action.route);
    } else if (action.actionType === pageConstants.SET_CURRENT_PAGE) {
        // Set current page title
        document.title = action.page.title;
    }

    return true;
});

module.exports = RouteStore;