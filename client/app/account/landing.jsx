'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;
var userActions = require('../modules/user/user.actions');
var sessionStore = require('../modules/session/session.store');
var Trianglify = require('Trianglify');

function getBackgroundPattern() {
    return Trianglify({
        width: window.innerWidth,
        height: 960,
        x_colors: ["#9ecae1","#6baed6","#1596CC","#1d77a6","#07568e","#003f6b", "#002a48"]
    });
}

var LandingComponent = React.createClass({
    mixins: [Navigation],
    
    getInitialState: function () {
        return {
            backgroundData: ''   
        }
    },
    
    componentDidMount: function() {
        $(window).resize(function () {
            var pattern = getBackgroundPattern();
            this.setState({ backgroundData: pattern.png() });
        }.bind(this));        
        
        var pattern = getBackgroundPattern();
        this.setState({ backgroundData: pattern.png() });      
    },
    
    render: function () {
        var loginHeroStyle = {
            backgroundImage: 'url(' + this.state.backgroundData + ')'
        }
        
        return (
            /* jshint ignore:start */
            <div>            
                <div className="login-hero" style={loginHeroStyle}>
                    <div className="login-logo"></div>
                    <div className="login-forms">
                        <div className="login-form">
                            <h3>Use your regular.club account:</h3>
                            <form>
                                <input type="text" placeholder="Username"></input>
                                <input type="password" placeholder="Password"></input>
                                <div className="buttons">
                                    <button className="create-account">Create Account</button>
                                    <button className="login">Sign In</button>
                                </div>
                            </form>
                        </div>
                        <div className="login-socials-form">
                            <h3>Or sign in using...</h3>
                            <ul className="login-socials group">
                                <li className="login-social login-social-facebook"></li>
                                <li className="login-social login-social-google"></li>
                                <li className="login-social login-social-twitter"></li>
                                <li className="login-social login-social-reddit"></li>
                            </ul>
                            <p className="login-social-info">
                                We will create your regular.club account for<br />
                                you, or sign you into an existing account.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="landing-sell">
                    <h1>A new social chat experience.</h1>
                    <p>
                        Regular.club is a new <u>next generation social chat</u>. Members
                        can create chat rooms, and you can join them. Chat with your friends and
                        fellow regulars to earn points, pimp out your profile with those points,
                        and become the envy of the club. Hold private conversations, create exclusive
                        rooms, share YouTube videos and laugh together, and more. Join now for free,
                        we don't even need your email address.
                    </p>
                    <div className="landing-sell-feature">
                        <h2>Chat with other regulars </h2>
                    </div>
                </div>
            </div>
            /* jshint ignore:end */
        );
    },
        
    handleSubmit: function (e) {
        var self = this;
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