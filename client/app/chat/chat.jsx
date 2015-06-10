'use strict';

var React = require('react/addons');
var Router = require('react-router');
var userStore = require('../modules/user/user.store');
var roomStore = require('../modules/room/room.store');
var roomActions = require('../modules/room/room.actions');
var messageActions = require('../modules/message/message.actions');
var messageStore = require('../modules/message/message.store');
var Link = Router.Link;

var getState = function () {
    return {
        text: "Chat",
        message: "New message?",
        messages: messageStore.messages,
        user: userStore.get(),
        room: roomStore.room,
        loading: messageStore.loading,
        roomLoading: roomStore.loading
    };
};

var getStateChatMessage = function () {
    return {
        user: userStore.get()
    };
};

var getStateRoom = function () {
    return {
        room: roomStore.get()
    };
};

var ChatMessageComponent = React.createClass({
    getInitialState: function () {
        return getStateChatMessage();
    },
    
    render: function () {
        return (
            /* jshint ignore:start */
            <li> {
                this.state.user.firstName
            }: {
                this.props.message.message
            } (created by: { this.props.message.userId })</li>
            /* jshint ignore:end */
        );
    }
});

var RoomComponent = React.createClass({
    render: function () {
        return (
            /* jshint ignore:start */
            <li>{this.props.user}</li>
            /* jshint ignore:end */
        );
    }
});

var ChatComponent = React.createClass({
    mixins: [React.addons.LinkedStateMixin, messageStore.mixin, roomStore.mixin],

    getInitialState: function () {
        return getState();
    },

    componentDidMount: function() {
        messageActions.loadRecentMessages(); 
        roomActions.getRoom();
    },

    render: function () {
        return (
          /* jshint ignore:start */
          <div>
            <section className="chat-messages">
                <h3>Messages</h3>
                <b>{this.state.loading ? "Loading messages..." : ""}</b>
                <ul>
                {
                    this.state.messages.map(function(message, index) {
                        return <ChatMessageComponent key={index} message={message} />
                    })
                }
                </ul>
            </section>
            <section className="chat-userlist">
                <b>{this.state.roomLoading ? "Loading room..." : ""}</b>
                <h3>{this.state.room.title}</h3>
                <ul>
                {
                    this.state.room.users.map(function(user, index) {
                        return <RoomComponent key={index} user={user} />
                    })
                }
                </ul>
            </section>
            
            <form id="message-input" action="/chat?_method=PUT" method="post" onSubmit={this.handleSubmitMessage}>
                <input type="text" name="message" valueLink={this.linkState('message')} />
                <button type="submit">Submit Message</button>
            </form>
          </div>
          /* jshint ignore:end */
        );
    },

    handleSubmitMessage: function (e) {
        e.preventDefault();
        var form = e.currentTarget;

        messageActions.createMessage(this.state.message);

        this.setState({
            message: "New message?"
        });
    },

    _onChange: function () {
        this.setState({
            messages: messageStore.messages,
            loading: messageStore.loading,
            room: roomStore.room,
            roomLoading: roomStore.loading
        });
    }
});

module.exports = ChatComponent;