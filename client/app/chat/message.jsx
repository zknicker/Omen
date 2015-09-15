'use strict';

var React = require('react/addons');
var userStore = require('../modules/user/user.store');

var Message = React.createClass({

    render: function () {
        var user = this.props.message.user;
        var userAvatarPath = "../../images/avatars/" + user.avatar;
        var message = this.props.message;

        return (
            /* jshint ignore:start */
            <li className="message group">
                <div className="message-user">
                    <img className="message-user-avatar" src={userAvatarPath} />
                    <div className="message-user-username">{user.username}</div>
                </div>
                <div className="message-content">
                    {message.message}
                </div>
                <div className="message-time">
                    {message.dateTime}
                </div>
            </li>
            /* jshint ignore:end */
        );
    }
});

module.exports = Message;