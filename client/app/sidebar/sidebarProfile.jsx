'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var SidebarProfileComponent = React.createClass({

    render: function () {
        var avatarStyleMapping = {
            backgroundImage: 'url(' + this.props.user.avatar + ')'
        }
        
        return (
            <div className="sidebar-profile group">
                <div className="sidebar-profile-avatar small-avatar" style={avatarStyleMapping}>
                    <div className="status online"></div>
                </div>
                <div className="sidebar-profile-username">
                    {this.props.user.username}
                </div>
                <div className="sidebar-profile-actions group">
                    <Link to="/logout" className="sidebar-profile-action profile-action-logout" />
                    <Link to="/settings" className="sidebar-profile-action profile-action-settings" />
                    { (this.props.user.isAdmin()) &&
                        <Link to="/admin" className="sidebar-profile-action profile-action-admin" />
                    }
                </div>
            </div>
        );
    }
});

module.exports = SidebarProfileComponent;