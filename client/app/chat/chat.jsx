'use strict';

var React = require('react/addons');
var Router = require('react-router');
var userStore = require('../modules/user/user.store');
var Link = Router.Link;

var getState = function() {
    return {
        text: "Chat",
        message: "New message?",
        messages: [
            "Hello I am the first message.",
            "And I am the second."
        ],
        user: userStore.get()
    };
};

var getStateChatMessage = function() {
    return {
        user: userStore.get()
    };
};

var ChatMessageComponent = React.createClass({
    mixins: [userStore.mixin],
    
    getInitialState: function() {
        return getStateChatMessage();
    },
    
    render: function() {
        return (
          /* jshint ignore:start */
          <li>{this.state.user.firstName}: {this.props.message}</li>
          /* jshint ignore:end */
        );
    },

    _onChange: function() {
        this.setState(getState());
    }
});

var ChatComponent = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    
    getInitialState: function() {
        return getState();
    },
    
    render: function() {
        return (
          /* jshint ignore:start */
          <div>
            <h3>{this.state.text} Page</h3>
            <ul>
            {
                this.state.messages.map(function(message) {
                    return <ChatMessageComponent key={message} message={message} />
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
    
    handleSubmitMessage: function(e) {
        e.preventDefault();
        var form = e.currentTarget;
    
        this.setState({
            messages: this.state.messages.concat([ this.state.message ]),
            message: ""
        });
    }
});

module.exports = ChatComponent;