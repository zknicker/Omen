'use strict';

/**
 * A basic container for storing the router instance in use by the
 * application. This enables code outside of React components to
 * navigate using the React router instance.
 */
var _router = null;
var RouterContainer = {
    getRouter: function() {
        return _router;
    },
    
    setRouter: function(router) {
        _router = router;
    }
};

module.exports = RouterContainer;