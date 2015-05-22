'use strict';

var React = require('react');

var IndexComponent = React.createClass({
    render: function () {
        var definitionUnderline = {
            textDecoration: 'underline'
        };
        
        return (
          /* jshint ignore:start */
            <div className="main-container">
                <h1>Omen</h1>
                <h3>A next generation chat platform.</h3>
                <p><span style={definitionUnderline}>omen</span>: something that is believed to be a sign or warning of something that will happen in the future</p>
            </div>
          /* jshint ignore:end */
        );
    }
});

module.exports = IndexComponent;