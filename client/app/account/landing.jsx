'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var sessionStore = require('../modules/session/session.store');
var LandingTextInput = require('./landingTextInput.jsx');
var LandingButton = require('./landingButton.jsx');
var LoginSocial = require('./loginSocial.jsx');
var LandingRegisterForm = require('./landingRegisterForm.jsx');

import AuthenticationStore from '../modules/authentication/authentication.store';
import AuthenticationActions from '../modules/authentication/authentication.actions';
import Flux from '../lib/flux';

var LandingComponent = React.createClass({
    mixins: [
        Router.Navigation,
        Flux.StoreListenerMixin(AuthenticationStore)
    ],
    
    getStateFromStores() {
        console.log('get state... ', AuthenticationStore.getIsLoggingIn());
        return {
            loggingIn: AuthenticationStore.getIsLoggingIn()
        }
    },
    
    getInitialState: function () {
        return {
            landingStateClass: 'landing-auth group'   
        }
    },
    
    renderTextInput: function (type, name, placeholder, labelText, props={}) {
        return (
            /* jshint ignore:start */
            <div className="landing-input group">
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
            <div className="landing">
                <div className="landing-logo"></div>
                <div className={this.state.landingStateClass}>
                    <div className="login-container">
                        <div className="login-form">
                            <form method="post" action="/login" onSubmit={this.handleLoginFormSubmit}>
                                {this.renderTextInput('text', 'lusername', 'Username', 'Incorrect username.', {autofocus:'autofocus'})}
                                {this.renderTextInput('password', 'lpassword', 'Password', 'Incorrect password.')}
                                <div className="group">
                                    <LandingButton text="Sign In" submit={true} />
                                    <LandingButton text="Create Account" trans={true} onClick={this.registerClicked} />
                                </div>
                                         Hey: {this.state.loggingIn ? 'true' : 'false'}
                                <Link to="forgot" className="login-forgot-password">Forgot your password?</Link>
                            </form>
                        </div>
                        <div className="login-socials-form">
                            <h3>Or sign in with...</h3>
                            <ul className="login-socials group">
                                <LoginSocial social="facebook" />
                                <LoginSocial social="twitter" />
                                <LoginSocial social="google" />
                                <LoginSocial social="reddit" />
                            </ul>
                        </div>
                    </div>
                    <LandingRegisterForm />
                </div>
            </div>
            /* jshint ignore:end */
        );
    },

    handleLoginFormSubmit: function (e) {
        e.preventDefault();
        var username = React.findDOMNode(this.refs.lusername).value;
        var password = React.findDOMNode(this.refs.lpassword).value;
        AuthenticationActions.login(username, password);
    },
    
    handleRegisterFormSubmit: function (e) {
        e.preventDefault();
        var username = React.findDOMNode(this.refs.rusername).value;
        var password = React.findDOMNode(this.refs.rpassword).value;
        AuthenticationActions.register(username, password);
    },
    
    registerClicked: function () {
        this.setState({
            landingStateClass: 'landing-auth group state-register'   
        });
    },
    
    nevermindClicked: function () {
        this.setState({
            landingStateClass: 'landing-auth group'   
        });
    }
});

module.exports = LandingComponent;