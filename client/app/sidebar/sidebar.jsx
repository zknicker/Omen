'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var SidebarLogo = require('./sidebarLogo.jsx');
var SidebarProfile = require('./sidebarProfile.jsx');
var SidebarItem = require('./sidebarItem.jsx');
var JoinedRoomsList = require('./joinedRoomsList.jsx');
var userStore = require('../modules/user/user.store');

var SidebarComponent = React.createClass({

    mixins: [Router.State, userStore.mixin],

    getInitialState: function() {
        var path = this.getRoutes();
        var currentRoute = path[path.length - 1];

        return {
            user: userStore.getUser(),
            activeSidebarItemRouteName: currentRoute.name  
        };
    },
        
    setActiveMenuItemRouteName: function(name) {
        this.setState({ activeSidebarItemRouteName: name });  
    },
    
    render: function () {
        return (
            /* jshint ignore:start */
            <div className="sidebar">
                <SidebarLogo />
                <SidebarProfile user={this.state.user} />
                <JoinedRoomsList />
            </div>
            /* jshint ignore:end */
        );
    },
    
    _onChange: function () {
        this.setState({
            user: userStore.getUser()
        });
    }
});

module.exports = SidebarComponent;