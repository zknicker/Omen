'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Navigation = Router.Navigation;
var messageStore = require('../modules/message/message.store');
var messageActions = require('../modules/message/message.actions');
var roomActions = require('../modules/room/room.actions');
var roomStore = require('../modules/room/room.store');
var UserList = require('./userlist.jsx');
var MessageList = require('./messageList.jsx');
var MessageInput = require('./messageInput.jsx');

var getState = function () {
    return {
        activeRoom: roomStore.activeRoom,
        currentRooms: roomStore.currentRooms,
        currentRoomLoading: roomStore.loading,
        messages: messageStore.messages,
        currentRoomMessagesLoading: messageStore.loading
    };
};

var ChatComponent = React.createClass({

    mixins: [Navigation, roomStore.mixin, messageStore.mixin],

    contextTypes: {
        router: React.PropTypes.func
    },
    
    componentDidMount: function() {
        var roomId = this.context.router.getCurrentParams().roomId;
        
        if (!this.state.currentRooms[roomId]) {
            roomActions.join(roomId);
        }
        messageActions.getRecent(roomId);
    },
    
    getInitialState: function () {
        return getState();
    },
    
    render: function () {
        var roomId = this.context.router.getCurrentParams().roomId;
        var messages = this.state.messages[roomId] || [];
        
        return (
            /* jshint ignore:start */
            <div className="chat-room">
                <MessageList messages={messages} loading={this.state.currentRoomMessagesLoading} />    
                <UserList room={this.state.activeRoom} loading={this.state.currentRoomLoading} />
                <MessageInput room={this.state.activeRoom} />
            </div>
            /* jshint ignore:end */
        );
    },

    _onChange: function () {
        this.setState({
            activeRoom: roomStore.activeRoom,
            currentRooms: roomStore.currentRooms,
            currentRoomLoading: roomStore.loading,
            messages: messageStore.messages,
            currentRoomMessagesLoading: messageStore.loading
        });
    }
});

module.exports = ChatComponent;