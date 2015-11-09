'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Navigation = Router.Navigation;
var messageStore = require('../modules/message/message.store');
var messageActions = require('../modules/message/message.actions');
var roomActions = require('../modules/room/room.actions');
var roomStore = require('../modules/room/room.store');
var userListActions = require('../modules/userlist/userlist.actions');
var userListStore = require('../modules/userlist/userlist.store');
var joinRoomHelper = require('../helpers/joinroom.helper');
var UserList = require('./userlist.jsx');
var MessageList = require('./messageList.jsx');
var MessageInput = require('./messageInput.jsx');
var StoreListenerMixin = require('../lib/storeListenerMixin');

var getState = function () {
    return {
        activeRoom: roomStore.activeRoom,
        currentRooms: roomStore.currentRooms,
        currentRoomLoading: roomStore.loading,
        messages: messageStore.messages,
        currentRoomMessagesLoading: messageStore.loading,
        userList: userListStore.userList,
        userListLoading: userListStore.loading
    };
};

var ChatComponent = React.createClass({

    mixins: [
        Navigation, roomStore.mixin, messageStore.mixin, userListStore.mixin],

    contextTypes: {
        router: React.PropTypes.func
    },
    
    getInitialState: function () {
        return getState();
    },
    
    componentDidMount: function() {
        var roomId = this.context.router.getCurrentParams().roomId;
        var self = this;
    
        joinRoomHelper(roomId, function(err) {
            if (err) self.transitionTo('/rooms');
        });
    },
    
    render: function () {
        var roomId = this.state.activeRoom.id;
        var messages = this.state.messages[roomId] || [];
        var userList = this.state.userList[roomId] || [];
        
        return (
            /* jshint ignore:start */
            <div className="chat-room">
                <div className="chat-room-main">
                    <MessageList messages={messages} loading={this.state.currentRoomMessagesLoading} />    
                    <MessageInput room={this.state.activeRoom} />
                </div>
                <UserList className="chat-room-users" room={this.state.activeRoom} userList={userList} loading={this.state.userListLoading} />
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
            currentRoomMessagesLoading: messageStore.loading,
            userList: userListStore.userList,
            userListLoading: userListStore.loading
        });
    }
});

module.exports = ChatComponent;