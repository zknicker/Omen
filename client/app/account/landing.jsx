'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;
var userActions = require('../modules/user/user.actions');
var sessionStore = require('../modules/session/session.store');

var LandingComponent = React.createClass({
    mixins: [Navigation],
        
    render: function () {
        return (
            /* jshint ignore:start */
            <div className="landing">
                <div className="login-logo"></div>
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
                            <div className="buttons">
                                <button className="login">Sign In</button>
                                <button className="create-account">Create Account</button>
                            </div>
                        </form>
                    </div>
                    <p><Link to="forgot">Forgot your password?</Link></p>
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
    }
});

module.exports = LandingComponent;