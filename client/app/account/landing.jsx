'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;
var userActions = require('../modules/user/user.actions');
var sessionStore = require('../modules/session/session.store');

var LandingComponent = React.createClass({
    mixins: [Navigation],
        
    getInitialState: function () {
        return {
            landingStateClass: 'landing-forms group'   
        }
    },
    
    render: function () {
        return (
            /* jshint ignore:start */
            <div className="landing">
                <div className="landing-logo"></div>
                <div className={this.state.landingStateClass}>
                    <div className="login-forms">
                        <div className="login-socials-form">
                            <h3>Or sign in with...</h3>
                            <ul className="login-socials group">
                                <li className="login-social login-social-facebook"></li>
                                <li className="login-social login-social-google"></li>
                                <li className="login-social login-social-twitter"></li>
                                <li className="login-social login-social-reddit"></li>
                            </ul>
                        </div>
                        <div className="login-form">
                            <form method="post" action="/login" onSubmit={this.handleSubmit}>
                                <input type="text" name="email" id="email" placeholder="Username" autofocus="autofocus"></input>
                                <input type="password" name="password" id="password" placeholder="Password"></input>
                                <div className="group">
                                    <button className="landing-button">Sign In</button>
                                    <a className="landing-button transparent" onClick={this.handleRegisterClicked}>Create Account</a>
                                </div>
                                <Link to="forgot" className="login-forgot-password">Forgot your password?</Link>
                            </form>
                        </div>
                    </div>
                    <div className="register-forms">
                        <div className="login-form">
                            <form method="post" action="/login" onSubmit={this.handleSubmit}>
                                <input type="text" name="email" id="email" placeholder="Username" autofocus="autofocus"></input>
                                <input type="password" name="password" id="password" placeholder="Password"></input>
                                <div className="group">
                                    <button className="landing-button">All done, become a Regular!</button>
                                    <a className="landing-button transparent" onClick={this.handleNevermindClicked}>Nevermind</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            /* jshint ignore:end */
        );
    },
        
    handleSubmit: function (e) {
        var self = this;
        console.log('here');
        e.preventDefault();
        var form = e.currentTarget;
        userActions.login(form, {
            success: function(res) {
                if (sessionStore.loginRedirectRoute) {
                    self.transitionTo(sessionStore.loginRedirectRoute);
                } else {
                    self.transitionTo('/index');   
                }
            },
            error: function(res) {
                // Post some warning...
                alert('error');
            }
        });
    },
    
    handleRegisterClicked: function () {
        this.setState({
            landingStateClass: 'landing-forms group state-register'   
        });
    },
    
    handleNevermindClicked: function () {
        this.setState({
            landingStateClass: 'landing-forms group'   
        });
    }
});

module.exports = LandingComponent;