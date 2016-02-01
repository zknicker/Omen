'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var LandingTextInput = require('./landingTextInput.jsx');
var LandingButton = require('./landingButton.jsx');

import AuthenticationActions from '../modules/authentication/authentication.actions';

var LandingRegisterForm = React.createClass({
    
    render: function () {
        return (
            /* jshint ignore:start */
            <form method="post" action="/login" onSubmit={this.handleRegisterFormSubmit}>
                <div className="landing-input group">
                    <label for="username">Welcome! Just choose a name!</label>
                    <input type="text" name="username" ref="username" placeholder="username" />
                </div>
                <div className="landing-input group">
                    <label for="password">And carefully choose a password.</label>
                    <input type="password" name="password" ref="password" placeholder="password" />
                </div>
                <div className="landing-input optional group">
                    <label for="email">Finally, in case we need to contact you.</label>
                    <input type="text" name="email" ref="email" placeholder="email (optional)" />
                </div>
                <div className="landing-buttons group">
                    <LandingButton text="Nevermind" additionalClass="nevermind" onClick={this.nevermindClicked} />
                    <LandingButton text="Become a regular!" submit={true} />
                </div>
            </form>
            /* jshint ignore:end */
        );
    },
    
    nevermindClicked: function () {
        AuthenticationActions.showLoginFields();
    }
});

module.exports = LandingRegisterForm;