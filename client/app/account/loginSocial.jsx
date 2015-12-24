'use strict';

var React = require('react');
var Router = require('react-router');

var LoginSocial = React.createClass({
    render: function () {
        var className = 'login-social login-social-' + this.props.social;
        return (
            /* jshint ignore:start */
            <li className={className} onClick={this.handleClick}></li>
            /* jshint ignore:end */
        );
    },
    
    handleClick: function(e) {
        alert('login with ' + this.props.social + ' clicked.');
    }
});

module.exports = LoginSocial;