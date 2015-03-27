'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;
var DefaultLayout = require('../layouts/default.jsx');
var userActions = require('../../actions/user');


var LoginComponent = React.createClass({
    mixins: [Navigation],
    
    render: function () {
        return (
            /* jshint ignore:start */
            <div>
                <h3>Sign in</h3>
                <form method="post" action="/login" onSubmit={this.handleSubmit}>
                    <p>
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" id="email" placeholder="Enter your email" autofocus="autofocus" />
                    </p>

                    <p>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" placeholder="Password" />
                    </p>

                    <button>Login</button>
                    <p><Link to="forgot">Forgot your password?</Link></p>
                </form>
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
                self.transitionTo('/index');
            },
            error: function(res) {
                // Post some warning...
                console.log('error');
            }
        });
    }
});

module.exports = LoginComponent;