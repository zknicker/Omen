'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var SidebarLogoComponent = React.createClass({

    render: function () {
        return (
            /* jshint ignore:start */
            <div className="sidebar-logo">
                <Link to="/" />
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = SidebarLogoComponent;