'use strict';

var React = require('react/addons');
var Router = require('react-router');
var userStore = require('../modules/user/user.store');
var roomStore = require('../modules/room/room.store');
var roomActions = require('../modules/room/room.actions');
var messageActions = require('../modules/message/message.actions');

var getState = function () {
    return {
        message: "",
        room: roomStore.currentRoom
    };
};

var ChatComponent = React.createClass({
    mixins: [React.addons.LinkedStateMixin, roomStore.mixin],
             
    getInitialState: function () {
        return getState();
    },

    render: function () {
        return (
            /* jshint ignore:start */
            <form id="message-input" className="chat-message-input" action="/chat?_method=PUT" method="post" onSubmit={this.handleSubmitMessage}>
                <input type="text" name="message" placeholder="Type new message here..." valueLink={this.linkState('message')} />
                <button type="submit">Submit Message</button>
            </form>
            /* jshint ignore:end */
        );
    },

    handleSubmitMessage: function (e) {
        e.preventDefault();
        var form = e.currentTarget;
        messageActions.create(this.state.message, this.state.room.id);

        this.setState({
            message: ""
        });
    },

    _onChange: function () {
        this.setState({
            room: roomStore.currentRoom
        });
    }
});

module.exports = ChatComponent;