'use strict';

var React = require('react/addons');
var Router = require('react-router');
var userStore = require('../modules/user/user.store');
var roomStore = require('../modules/room/room.store');
var roomActions = require('../modules/room/room.actions');
var messageActions = require('../modules/message/message.actions');
var messageStore = require('../modules/message/message.store');
var Message = require('./message.jsx');
var UserList = require('./userlist.jsx');

var getState = function () {
    return {
        text: "Chat",
        message: "New message?",
        messages: messageStore.messages,
        user: userStore.get(),
        loading: messageStore.loading
    };
};

var ChatComponent = React.createClass({
    mixins: [React.addons.LinkedStateMixin, messageStore.mixin],

    getInitialState: function () {
        return getState();
    },

    componentDidMount: function() {
        messageActions.loadRecentMessages(); 
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
                        return <Message key={index} message={message} />
                    })
                }
                </ul>
            </section>
    
            <UserList />
            
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
            loading: messageStore.loading
        });
    }
});

module.exports = ChatComponent;