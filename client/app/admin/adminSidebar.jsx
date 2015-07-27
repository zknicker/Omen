'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var AdminSidebarItem = require('./adminSidebarItem.jsx');

var AdminSidebarComponent = React.createClass({

    mixins: [Router.State],
    
    getDefaultProps: function() {
        return {
            sidebarItems: [
                { routeName: 'overview', name: 'Overview', link: 'overview' },
                { routeName: 'usermanagement', name: 'User Management', link: 'usermanagement' }
            ]
        };
    },
    
    getInitialState: function() {
        console.log('yo');
        var path = this.getRoutes();
        var currentRoute = path[path.length - 1];
        
        // The route name is undefined for /admin route. The sidebar
        // should indicate that the user is on the overview page.
        if (!currentRoute.name) {
            currentRoute.name = 'overview';
        }
        
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
            <div className="admin-sidebar">
                <ul className="admin-sidebar-list">
                {
                    this.props.sidebarItems.map(function(sidebarItem) {
                        var isActive = (this.state.activeSidebarItemRouteName === sidebarItem.routeName);
                        return (
                            React.createElement(AdminSidebarItem, {
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
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = AdminSidebarComponent;