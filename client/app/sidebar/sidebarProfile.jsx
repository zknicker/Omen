'use strict';

var React = require('react/addons');
var Router = require('react-router');

var SidebarProfileComponent = React.createClass({

    render: function () {
        return (
            <div className="sidebar-profile group">
                <div className="sidebar-profile-avatar">
                    <img src={this.props.user.avatar} />
                </div>
                <div className="sidebar-profile-user">
                    <div className="sidebar-profile-username">
                        {this.props.user.username}
                    </div>
                    <div className="sidebar-profile-level">
                        <div className="sidebar-profile-level-filler"></div>
                        <div className="sidebar-profile-level-level">Level 1</div>
                        <div className="sidebar-profile-level-progress">825/1400</div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SidebarProfileComponent;