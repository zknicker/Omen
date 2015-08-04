'use strict';

// Source: https://github.com/jsdir/react-ladda/blob/master/index.js

var React = require('react');
var Ladda = require('Ladda');

var laddaOptions = {
    buttonStyle: 'data-style',
    buttonColor: 'data-color',
    buttonSize: 'data-size',
    spinnerSize: 'data-spinner-size',
    spinnerColor: 'data-spinner-color'
};

var AccountButton = React.createClass({
    
    propTypes: {
        loading: React.PropTypes.bool,
        buttonColor: React.PropTypes.string,
        buttonSize: React.PropTypes.string
    },
    
    getDefaultProps: function() {
        return {
            loading: false,
            buttonColor: 'blue',
            butonSize: 'medium'
        };
    },
    
    componentDidMount: function () {
        this.laddaButton = Ladda.create(React.findDOMNode(this));
    },

    componentWillUnmount: function () {
        if (this.laddaButton.remove) {
            this.laddaButton.remove();
        }
    },

    componentDidUpdate: function () {
        console.log(this.props.loading);
        if (!this.laddaButton) {
            return;
        }

        // Skip if the button was initially disabled.
        if (!this.props.loading && this.props.disabled) {
            return;
        }

        if (this.props.loading && !this.laddaButton.isLoading()) {
            this.laddaButton.start();
        } else if (!this.props.loading && this.laddaButton.isLoading()) {
            this.laddaButton.stop();
        }

        if (typeof this.props.progress !== 'undefined') {
            this.laddaButton.setProgress(this.props.progress);
        }
    },

    render: function () {
        return (
            /* jshint ignore:start */
            <button className="ladda-button" data-style="contract">
                <span className="ladda-label">Submit</span>
            </button>
            /* jshint ignore:end */
        );
    }
});

module.exports = AccountButton;