'use strict';

var React = require('react/addons');
var Router = require('react-router');
var roomActions = require('../modules/room/room.actions');

var UserListUserComponent = React.createClass({
    render: function () {
        return (
            /* jshint ignore:start */
            <li>{this.props.user.username}</li>
            /* jshint ignore:end */
        );
    }
});

var UserListComponeont = React.createClass({
    render: function () {
        return (
          /* jshint ignore:start */
          <section className="chat-userlist">
              <b>{this.props.loading ? "Loading room..." : ""}</b>
              <h3 className="chat-room-name">{this.props.room.title}</h3>
              <h5 className="chat-room-type">{this.props.room.type}</h5>
              <ul className="chat-room-users">
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