'use strict';

var React = require('react/addons');
var Router = require('react-router');
var messageActions = require('../modules/message/message.actions');
var messageStore = require('../modules/message/message.store');
var Message = require('./message.jsx');

var getState = function () {
    return {
        messages: messageStore.messages,
        loading: messageStore.loading
    };
};

var MessageListComponent = React.createClass({
    mixins: [React.addons.LinkedStateMixin, messageStore.mixin],

    getInitialState: function () {
        return getState();
    },

    render: function () {
        return (
            /* jshint ignore:start */
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
          /* jshint ignore:end */
        );
    },

    _onChange: function () {
        this.setState({
            messages: messageStore.messages,
            loading: messageStore.loading
        });
    }
});

module.exports = MessageListComponent;