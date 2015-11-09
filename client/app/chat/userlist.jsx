'use strict';

var React = require('react/addons');
var Router = require('react-router');
var roomActions = require('../modules/room/room.actions');

var UserListUserComponent = React.createClass({
    
    render: function () {
        var userAvatarPath = "../../images/avatars/" + this.props.user.avatar;        
        var avatarStyleMapping = {
            backgroundImage: 'url(' + userAvatarPath + ')'
        }
        
        return (
            /* jshint ignore:start */
            <li className="userlist-user">
                <div className="tiny-avatar" style={avatarStyleMapping}><div className="status status-light online"></div></div> 
                {this.props.user.username}
            </li>
            /* jshint ignore:end */
        );
    }
});

var UserListComponeont = React.createClass({
    
    render: function () {
        return (
          /* jshint ignore:start */
          <section className="chat-userlist">
              <div className="userlist-online-header">Online Users: {this.props.userList.length}</div>
              <ul>
              {
                  this.props.userList.map(function(user, index) {
                      return <UserListUserComponent key={index} user={user} />
                  })
              }
              </ul>
          </section>
          /* jshint ignore:end */
        );
    }
});

module.exports = UserListComponeont;