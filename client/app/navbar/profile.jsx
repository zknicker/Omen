'use strict';

var React = require('react');

var NavbarProfileComponent = React.createClass({

    render: function () {
        return (
            /* jshint ignore:start */
            <div className = "header-profile">
                <div className="profile-avatar profile-right">
                    <img src="../images/default-avatar.png" />
                </div>
                <div className="profile-left">
                    <div className="profile-username">
                        Test
                    </div>
                    <div className="profile-points">
                        <span>0 Points</span>
                    </div>
                </div>
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = NavbarProfileComponent;