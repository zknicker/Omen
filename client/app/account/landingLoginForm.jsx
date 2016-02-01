'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var LandingTextInput = require('./landingTextInput.jsx');
var LandingButton = require('./landingButton.jsx');

import AuthenticationActions from '../modules/authentication/authentication.actions';

var LandingRegisterForm = React.createClass({
    renderTextInput: function (type, name, labelText, props={}) {        
        return (
            /* jshint ignore:start */
            <div className="landing-input group">
                <label for={name}>{labelText}</label>
                <input type={type}
                    name={name}
                    ref={name}
                    id={name} 
                    placeholder={name}
                    {...props} />
            </div>
            /* jshint ignore:end */
        );
    },
    
    render: function () {
        return (
            /* jshint ignore:start */
            <form method="post" action="/login" onSubmit={this.handleLoginFormSubmit}>
                {this.renderTextInput('text', 'username', 'Hey, what\'s your name again?', {autofocus:'autofocus'})}
                {this.renderTextInput('password', 'password', 'Just need some proof.')}
                <div className="landing-buttons group">
                    <LandingButton text="Create Account" additionalClass="create-account" onClick={this.createAccountClicked} />
                    <LandingButton text="Sign In" submit={true} />
                </div>
                <Link to="forgot" className="login-forgot-password">Forgot your password?</Link>
            </form>
            /* jshint ignore:end */
        );
    },
        
    handleLoginFormSubmit: function (e) {
        e.preventDefault();
        var username = React.findDOMNode(this.refs.username).value;
        var password = React.findDOMNode(this.refs.password).value;
        AuthenticationActions.login(username, password);
    },
    
    createAccountClicked: function () {
        AuthenticationActions.showCreateAccountFields();
    }
});

module.exports = LandingRegisterForm;