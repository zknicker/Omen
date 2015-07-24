'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

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

module.exports = AdminGateway;