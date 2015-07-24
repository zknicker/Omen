'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var AdminSidebarComponent = React.createClass({
    
    render: function () {
        return (
            /* jshint ignore:start */
            <div className="admin-sidebar">
                <ul className="admin-sidebar-list">
                    <li className="admin-sidebar-list-selected-item">User Management</li>
                    <li>Test 1</li>
                    <li>Test 2</li>
                </ul>
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = AdminSidebarComponent;