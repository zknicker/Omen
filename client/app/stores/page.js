'use strict';

var Store = require('../lib/store');
var Dispatcher = require('../dispatcher');
var pageConstants = require('../constants/page');
var pageDefaults = require('../constants').page;

var _page;

var PageStore = new Store({

  // Gets metadata associated with the current page.
  get: function() {
    return _page || pageDefaults;
  }

});

PageStore.dispatcherToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  if (action.actionType === pageConstants.SET_CURRENT_PAGE) {
    _page = action.page;

    PageStore.emitChange();
  }

});

module.exports = PageStore;
