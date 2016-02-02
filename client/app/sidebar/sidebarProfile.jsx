'use strict';

import React from 'react/addons';
import {Link, Navigation} from 'react-router';
import AuthenticationActions from '../modules/authentication/authentication.actions';

var SidebarProfileComponent = React.createClass({

    mixins: [ Navigation ],
    
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
                    <a className="sidebar-profile-action profile-action-logout" href="javascript:;" onClick={this.handleLogout}></a>
                    <Link to="/settings" className="sidebar-profile-action profile-action-settings" />
                    { (this.props.user.isAdmin()) &&
                        <Link to="/admin" className="sidebar-profile-action profile-action-admin" />
                    }
                </div>
            </div>
        );
    },
    
    handleLogout: function (e) {
        e.preventDefault();
        AuthenticationActions.logout();
        //this.transitionTo('landing');
    }
});

module.exports = SidebarProfileComponent;