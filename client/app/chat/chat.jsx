'use strict';

var React = require('react/addons');
var Router = require('react-router');
var userStore = require('../modules/user/user.store');
var messageActions = require('../modules/message/message.actions');
var messageStore = require('../modules/message/message.store');
var Link = Router.Link;

var getState = function () {
    console.log(messageStore.getAll());
    return {
        text: "Chat",
        message: "New message?",
        messages: messageStore.getAll().messages,
        user: userStore.get(),
        loading: messageStore.getAll().loading
    };
};

var getStateChatMessage = function () {
    return {
        user: userStore.get()
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
                this.props.message
            } </li>
            /* jshint ignore:end */
        );
    }
});

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
            <h3>{this.state.text} Page</h3>
            <b>{this.state.loading ? "Loading messages..." : ""}</b>
            <ul>
            {
                this.state.messages.map(function(message, index) {
                    return <ChatMessageComponent key={index} message={message} />
                })
            }
            </ul>
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
            messages: messageStore.getAll().messages,
            loading: messageStore.getAll().loading
        });
    }
});

module.exports = ChatComponent;