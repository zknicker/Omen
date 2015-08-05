'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var userStore = require('../modules/user/user.store');
var userActions = require('../modules/user/user.actions');
var JoinedRoomNavigation = require('./joinedRoomNavigation.jsx');
var HeaderProfile = require('./headerProfile.jsx');
var HeaderProfileActions = require('./headerProfileActions.jsx');
var HeaderLogo = require('./headerLogo.jsx');

function getState() {
    return {
        user: userStore.getUser()
    }
}

function setHeaderBackgroundSlope() {
    var angle = 1.18 / ($(document).width() / 3440);
    $('#sloped-header-bg').css({
       'transform': 'rotate(-' + angle + 'deg)' 
    });
    $('#sloped-header-bg .header-bg-inner').css({
       'transform': 'rotate(' + angle + 'deg)' 
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
        return (
          /* jshint ignore:start */
          <div>
            <header className="header">
                <div id="sloped-header-bg" className="header-bg">
                    <div className="header-bg-inner"></div>
                </div>
                <HeaderLogo />
                <HeaderProfile user={this.state.user} />
                <HeaderProfileActions user={this.state.user} />
            </header>
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