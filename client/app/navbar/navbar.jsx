'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var userStore = require('../modules/user/user.store');
var userActions = require('../modules/user/user.actions');
var JoinedRoomNavigation = require('./joinedRoomNavigation.jsx');
var NavbarProfile = require('./profile.jsx');
var NavbarActions = require('./actions.jsx');
var NavbarLogo = require('./logo.jsx');

function getState() {
    return {
        user: userStore.get()
    }
}

function setHeaderBackgroundSlope() {
    var angle = 1.18 / ($(document).width() / 3440);
    console.log('rotate(-' + angle + 'deg)');
    $('#sloped-header-bg').css({
       'transform': 'rotate(-' + angle + 'deg)' 
    });
}

var NavbarComponent = React.createClass({
    mixins: [userStore.mixin],
    
    getInitialState: function () {
        return getState();
    },
    
    componentDidMount: function() {
        setHeaderBackgroundSlope();
        $(window).resize(setHeaderBackgroundSlope);
    },
    
    componentWillUnmount: function() {
        $(window).off('resize', setHeaderBackgroundSlope);
    },
    
    render: function() {
        var user = this.props.user;

        // Logged in
        var navLinks = user.loggedIn ? (
          /* jshint ignore:start */
          <ul className="nav-list pull-right">
            <li className="nav-item">
              Hello {user.firstName ? user.firstName : user.email}
            </li>
            <li className="nav-item">
              <Link to="settings">My Account</Link>
            </li>
            <li className="nav-item">
              <Link to="logout" onClick={this.handleLogout}>Logout</Link>
            </li>
          </ul>
          /* jshint ignore:end */

        // Logged Out
        ) : (
          /* jshint ignore:start */
          <ul className="nav-list pull-right">
            <li className="nav-item">
              <Link to="login">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="signup">Create Account</Link>
            </li>
          </ul>
          /* jshint ignore:end */
        );

        return (
          /* jshint ignore:start */
          <div>
            <header className="header">
                <div id="sloped-header-bg" className="header-bg"></div>
                <NavbarLogo />
                <NavbarProfile />
                <NavbarActions user={this.state.user} />
            </header>
            <div className="navbar">
              <div className="nav">
                <ul className="nav-list pull-left">
                  <li className="nav-item"><Link to="/">Home</Link></li>
                  <li className="nav-item"><Link to="/rooms">Rooms</Link></li>
                </ul>
                {navLinks}
              </div>
            </div>
            <JoinedRoomNavigation />
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