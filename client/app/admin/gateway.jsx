'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AdminWrapper = require('./adminWrapper.jsx');

var AdminGateway = React.createClass({
    
    mixins: [ Router.State ],
    
    render: function () {
        console.log(this.getQuery());
        return (
            /* jshint ignore:start */
            <div>
                State: {this.getQuery()}
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = AdminWrapper(AdminGateway);