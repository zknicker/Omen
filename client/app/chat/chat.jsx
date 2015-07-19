'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Navigation = Router.Navigation;
var messageStore = require('../modules/message/message.store');
var roomStore = require('../modules/room/room.store');
var UserList = require('./userlist.jsx');
var MessageList = require('./messageList.jsx');
var MessageInput = require('./messageInput.jsx');

var getState = function () {
    return {
        currentRoom: roomStore.currentRoom,
        currentRoomLoading: roomStore.loading,
        currentRoomMessages: messageStore.messages,
        currentRoomMessagesLoading: messageStore.loading
    };
};

var ChatComponent = React.createClass({

    mixins: [Navigation, roomStore.mixin, messageStore.mixin],

    componentDidMount: function() {
        if (!this.state.currentRoom.id) {
            this.transitionTo('/rooms');
        }
    },
    
    getInitialState: function () {
        return getState();
    },
    
    render: function () {
        return (
            /* jshint ignore:start */
            <div>
                <MessageList messages={this.state.currentRoomMessages} loading={this.state.currentRoomMessagesLoading} />    
                <UserList room={this.state.currentRoom} loading={this.state.currentRoomLoading} />
                <MessageInput room={this.state.currentRoom} />
            </div>
            /* jshint ignore:end */
        );
    },

    _onChange: function () {
        this.setState({
            currentRoom: roomStore.currentRoom,
            currentRoomLoading: roomStore.loading,
            currentRoomMessages: messageStore.messages,
            currentRoomMessagesLoading: messageStore.loading
        });
    }
});

module.exports = ChatComponent;