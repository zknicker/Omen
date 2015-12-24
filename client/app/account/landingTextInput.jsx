'use strict';

var React = require('react');
var Router = require('react-router');

var LandingTextInput = React.createClass({
    displayName: 'LandingTextInput',
    
    render: function () {
        return (
            /* jshint ignore:start */
            <input type={this.props.type}
                name={this.props.name}
                ref={this.props.name}
                id={this.props.name} 
                placeholder={this.props.placeholder} 
                autofocus="autofocus">
            </input>
            /* jshint ignore:end */
        );
    }
});

module.exports = LandingTextInput;