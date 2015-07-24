'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var userStore = require('../modules/user/user.store');
var userActions = require('../modules/user/user.actions');
var StandardWrapper = require('../index/standardWrapper.jsx');

var getState = function() {
    return {
        user: userStore.getUser()
    };
};

var SettingsComponent = React.createClass({
    mixins: [userStore.mixin],
    getInitialState: function() {
        return getState();
    },
    
    render: function() {
        var user = this.state.user;
        
        return (
          /* jshint ignore:start */
          <div>
            <h3>Profile Information</h3>
            <form id="profile-form" action="/user?_method=PUT" method="post" onSubmit={this.handleSettings}>

              <p>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" id="email" defaultValue={user.email} />
              </p>

              <p>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" defaultValue={user.username} />
              </p>

              <button>Update Profile</button>
            </form>

            <h3>Change Password</h3>

            <form id="password-form" action="/user/password?_method=PUT" method="post" onSubmit={this.handlePassword}>

              <p>
                <label htmlFor="password">New Password:</label>
                <input type="password" name="password" id="password" defaultValue='' />
              </p>

              <p>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" name="confirmPassword" id="confirmPassword" defaultValue='' />
              </p>

              <button>Change Password</button>
            </form>
          </div>
          /* jshint ignore:end */
        );
    },
    
    handleSettings: function(e) {
        e.preventDefault();
        var form = e.currentTarget;
        userActions.updateSettings(form);
    },
    
    handlePassword: function(e) {
        e.preventDefault();
        var form = e.currentTarget;
        userActions.updatePassword(form);
    },
    
    handleDestroy: function(e) {
        e.preventDefault();
        var form = e.currentTarget;
        userActions.destroy(form);
    },
    
    // Event handler for 'change' events coming from store mixins.
    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = StandardWrapper(SettingsComponent);
