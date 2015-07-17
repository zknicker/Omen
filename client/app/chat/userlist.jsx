'use strict';

var React = require('react/addons');
var Router = require('react-router');
var roomStore = require('../modules/room/room.store');
var roomActions = require('../modules/room/room.actions');

var getState = function () {
    return {
        room: roomStore.currentRoom,
        loading: roomStore.loading
    };
};

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
    mixins: [roomStore.mixin],

    getInitialState: function () {
        return getState();
    },

    render: function () {
        return (
          /* jshint ignore:start */
          <section className="chat-userlist">
              <b>{this.state.loading ? "Loading room..." : ""}</b>
              <h3>{this.state.room.title}</h3>
              <h5>{this.state.room.type}</h5>
              <ul>
              {
                  this.state.room.users.map(function(user, index) {
                      return <UserListUserComponent key={index} user={user} />
                  })
              }
              </ul>
          </section>
          /* jshint ignore:end */
        );
    },

    _onChange: function () {
        this.setState({
            room: roomStore.currentRoom,
            loading: roomStore.loading
        });
    }
});

module.exports = UserListComponeont;