'use strict';

var React = require('react');
var Router = require('react-router');

var LandingTextInput = React.createClass({
    render: function () {
        var className = 'landing-button';
        var type = this.props.submit ? 'submit' : 'button';
        var additionalClass = this.props.additionalClass;
        
        if (additionalClass) {
            className += ' ' + additionalClass;   
        }
        
        return (
            /* jshint ignore:start */
            <button type={type} className={className} onClick={this.props.onClick}><span className="landing-button-text">{this.props.text}</span></button>
            /* jshint ignore:end */
        );
    }
});

module.exports = LandingTextInput;