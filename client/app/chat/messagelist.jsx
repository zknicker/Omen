'use strict';

var React = require('react/addons');
var Router = require('react-router');
var messageActions = require('../modules/message/message.actions');
var messageStore = require('../modules/message/message.store');
var roomStore = require('../modules/room/room.store');
var Message = require('./message.jsx');

var MessageListComponent = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    render: function () {
        return (
            /* jshint ignore:start */
            <section className="chat-messages">
                <b>{this.props.loading ? "Loading messages..." : ""}</b>
                <ul>
                {
                    this.props.messages.map(function(message, index) {
                        return <Message key={index} message={message} />
                    })
                }
                </ul>
            </section>
          /* jshint ignore:end */
        );
    }
});

module.exports = MessageListComponent;