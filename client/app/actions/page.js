'use strict';

var Dispatcher = require('../dispatcher');
var pageConstants = require('../constants/page');
var pageDefaults = require('../constants').page;
var assign = require('object-assign');

module.exports = {

  set: function(page) {
    Dispatcher.handleViewAction({
      actionType: pageConstants.SET_CURRENT_PAGE,
      page: assign({}, pageDefaults, page)
    });
  }

};
