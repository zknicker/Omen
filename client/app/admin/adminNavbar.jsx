'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var AdminNavbarComponent = React.createClass({
    
    render: function () {
        return (
            /* jshint ignore:start */
            <div className="admin-navbar">
                <Link to="/index" className="admin-navbar-logo" />
                <span>club administrator</span>
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = AdminNavbarComponent;