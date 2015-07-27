'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var NavbarLogoComponent = React.createClass({

    render: function () {
        return (
            /* jshint ignore:start */
            <div className="header-logo">
                <Link to="/" />
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = NavbarLogoComponent;