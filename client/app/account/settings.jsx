'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var userStore = require('../modules/user/user.store');
var userActions = require('../modules/user/user.actions');
var settingsActions = require('../modules/user/settings.actions');
var AccountButton = require('./accountButton.jsx');
var Authentication = require('../lib/auth.mixin');

var getState = function() {
    return {
        user: userStore.getUser(),
        avatarUpdateLoading: userStore.avatarUpdateLoading,
    };
};

var SettingsComponent = React.createClass({
    mixins: [Authentication, userStore.mixin],
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
            
            <h3>Change Avatar</h3>

            <form onSubmit={this.handleAvatarForm} encType="multipart/form-data">

                <p>
                    <label htmlFor="avatar">New Avatar:</label>
                    <input type="file" name="avatar" ref="avatarFile" id="avatar" />
                </p>

                <AccountButton loading={this.state.avatarUpdateLoading} />
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
    
    handleAvatarForm: function(e) {
        e.preventDefault();
        var file = this.refs.avatarFile.getDOMNode().files[0];
        if (file) {
            settingsActions.updateAvatar(file);
        }
    },
    
    // Event handler for 'change' events coming from store mixins.
    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = SettingsComponent;
