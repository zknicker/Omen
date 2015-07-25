'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AdminWrapper = require('./adminWrapper.jsx');

var UserManagementComponent = React.createClass({
    
    mixins: [ Router.State ],
    
    render: function () {
        return (
            /* jshint ignore:start */
            <div>
                User management yo
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = UserManagementComponent;