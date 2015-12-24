'use strict';

var React = require('react');
var Router = require('react-router');

var LandingTextInput = React.createClass({
    render: function () {
        var className = 'landing-button';
        if (this.props.trans) {
            className += ' transparent';   
        }
        var type = this.props.submit ? 'submit' : 'button';
        
        return (
            /* jshint ignore:start */
            <button type={type} className={className} onClick={this.props.onClick}>{this.props.text}</button>
            /* jshint ignore:end */
        );
    }
});

module.exports = LandingTextInput;