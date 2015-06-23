'use strict';

var React = require('react/addons');
var Router = require('react-router');
var userStore = require('../modules/user/user.store');
var roomActions = require('../modules/room/room.actions');
var messageActions = require('../modules/message/message.actions');
var UserList = require('./userlist.jsx');
var MessageList = require('./messageList.jsx');
var MessageInput = require('./messageInput.jsx');


var ChatComponent = React.createClass({

    componentDidMount: function() {
        roomActions.join(1);
        messageActions.getRecent(1); 
    },

    render: function () {
        return (
            /* jshint ignore:start */
            <div>
                <MessageList />    
                <UserList />
                <MessageInput />
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = ChatComponent;