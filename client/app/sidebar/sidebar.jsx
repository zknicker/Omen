'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var SidebarProfile = require('./sidebarProfile.jsx');
var SidebarItem = require('./sidebarItem.jsx');
var RoomsList = require('./sidebarRoomsList.jsx');
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
                <SidebarProfile user={this.state.user} />
                <RoomsList />
                <ul className="room-list">
                    <li className="room-list-title">
                        Private Chats
                        <Link to="/rooms" className="room-list-new-button">New chat</Link>
                    </li>
                    <li className="room-list-private-room"><Link to="/">
                        <div className="tiny-avatar" 
                            style={{backgroundImage: 'url(../images/avatars/1.gif)'}}>
                            <div className="status online"></div>
                        </div>
                        HaveAMagicalDay
                    </Link></li>
                    <li className="room-list-private-room"><Link to="/">
                        <div className="tiny-avatar" 
                            style={{backgroundImage: 'url(../images/avatars/1.gif)'}}>
                            <div className="status online"></div>
                        </div>
                        WhitePanther
                    </Link></li>
                </ul>
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