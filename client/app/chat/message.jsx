'use strict';

var React = require('react/addons');
var userStore = require('../modules/user/user.store');

var Message = React.createClass({
    
    render: function () {
        var user = this.props.message.user;
        var userAvatarPath = "../../images/avatars/" + user.avatar;
        var message = this.props.message;
        var date = new Date(message.datetime);
        
        return (
            /* jshint ignore:start */
            <li className="message group">
                <div className="message-icon">
                    <img className="message-user-avatar" src={userAvatarPath} />
                </div>
                <div className="message-content">
                    <span className="message-user-username">{user.username}</span>:&nbsp;
                    <span className="message-content-text">{message.message}</span>
                    <br />
                    <span className="message-content-date">{date.toDateString()}, {date.toLocaleTimeString()}</span>
                </div>
            </li>
            /* jshint ignore:end */
        );
    }
});

module.exports = Message;