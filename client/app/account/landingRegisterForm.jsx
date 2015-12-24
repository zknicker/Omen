'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var LandingTextInput = require('./landingTextInput.jsx');
var LandingButton = require('./landingButton.jsx');
var LoginSocial = require('./loginSocial.jsx');

var LandingRegisterForm = React.createClass({
    renderTextInput: function (type, name, placeholder, labelText, props={}) {        
        return (
            /* jshint ignore:start */
            <div className="landing-input landing-input-register group">
                <input type={type}
                    name={name}
                    ref={name}
                    id={name} 
                    placeholder={placeholder}
                    {...props} />
                <label for={name}>{labelText}</label>
            </div>
            /* jshint ignore:end */
        );
    },
    
    render: function () {
        return (
            /* jshint ignore:start */
            <div className="register-container">
                <h3 className="register-header">Hey, welcome to the club!</h3>
                <div className="register-form">
                    <form method="post" action="/login" onSubmit={this.handleRegisterFormSubmit}>
                        {this.renderTextInput('text', 'rusername', 'Username',
                                'Must be longer than 3 characters.', {autofocus:'autofocus'})}
                        {this.renderTextInput('password', 'rpassword', 'Password', 
                                'Must be longer than 6 characters.')}
                        {this.renderTextInput('password_confirm', 'rpassword_confirm', 'Password (confirm)',
                                'Your passwords do not match.')}
                        <div className="group">
                            <LandingButton text="Become a regular!" submit={true} />
                            <LandingButton text="Nevermind" trans={true} onClick={this.nevermindClicked} />
                        </div>
                    </form>
                </div>
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = LandingRegisterForm;