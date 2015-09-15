'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var userStore = require('../modules/user/user.store');
var userActions = require('../modules/user/user.actions');
var HeaderProfile = require('./headerProfile.jsx');
var HeaderProfileActions = require('./headerProfileActions.jsx');
var HeaderLogo = require('./headerLogo.jsx');

function getState() {
    return {
        user: userStore.getUser()
    }
}

var NavbarComponent = React.createClass({
    mixins: [userStore.mixin],
    
    getInitialState: function () {
        return getState();
    },
    
    render: function() {
        return (
          /* jshint ignore:start */
          <div>
            <header className="header">
                <HeaderLogo />
                <HeaderProfile user={this.state.user} />
                <HeaderProfileActions user={this.state.user} />
            </header>
          </div>
          /* jshint ignore:end */
        );
    },
    
    handleLogout: function (e) {
        e.preventDefault();
        userActions.logout();
    },
    
    // Event handler for 'change' events coming from store mixins.
    _onChange: function () {
        this.setState(getState());
    }
});

module.exports = NavbarComponent;