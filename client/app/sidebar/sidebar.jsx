'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var SidebarItem = require('./sidebarItem.jsx');
var JoinedRoomsList = require('./joinedRoomsList.jsx');

var SidebarComponent = React.createClass({

    mixins: [Router.State],
    
    getDefaultProps: function() {
        return {
            sidebarItems: [
                { routeName: 'home', name: 'Home', link: '/' },
                { routeName: 'rooms', name: 'Rooms', link: 'rooms' },
                { routeName: 'settings', name: 'Settings', link: 'settings' }
            ]
        };
    },
    
    getInitialState: function() {
        var path = this.getRoutes();
        var currentRoute = path[path.length - 1];

        return {
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
                <ul className="sidebar-list">
                    <li className="sidebar-list-category">Navigation</li>
                    {
                        this.props.sidebarItems.map(function(sidebarItem) {
                            var isActive = (this.state.activeSidebarItemRouteName === sidebarItem.routeName);
                            return (
                                React.createElement(SidebarItem, {
                                    active: isActive,
                                    routeName: sidebarItem.routeName,
                                    name: sidebarItem.name,
                                    link: sidebarItem.link,
                                    onSelect: this.setActiveMenuItemRouteName
                                })
                            )
                        }.bind(this))
                    }
                </ul>
                <ul className="sidebar-list">
                    <li className="sidebar-list-category">Rooms</li>
                    <JoinedRoomsList />
                </ul>
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = SidebarComponent;