'use strict';

var React = require('react/addons');
var Router = require('react-router');
var messageActions = require('../modules/message/message.actions');

var ChatComponent = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
             
    getInitialState: function () {
        return {
            message: ''   
        };
    },

    render: function () {
        return (
            /* jshint ignore:start */
            <div id="message-input">
                <form id="message-input-form" className="chat-message-input" action="/chat?_method=PUT" 
                        method="post" onSubmit={this.handleSubmitMessage}>
                    <input type="text" name="message" placeholder="Type new message here..." valueLink={this.linkState('message')} />
                </form>
            </div>
            /* jshint ignore:end */
        );
    },

    handleSubmitMessage: function (e) {
        e.preventDefault();
        var form = e.currentTarget;
        messageActions.create(this.state.message, this.props.room.id);

        this.setState({
            message: ''
        });
    }
});

module.exports = ChatComponent;