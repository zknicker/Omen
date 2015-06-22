'use strict';

var React = require('react/addons');
var userStore = require('../modules/user/user.store');
var roomStore = require('../modules/room/room.store');

var getState = function () {
    return {
        roomUsers: roomStore.room.users
    };
};

var Message = React.createClass({
    mixins: [roomStore.mixin],
    
    getInitialState: function () {
        return getState();
    },
    
    render: function () {
        // If this message is from the cache (i.e. the user just created it)
        // then we need to go to the user store for user data. The user is 
        // only on the message object when the message comes from the persistent
        // store.
        console.log(this.props.message);
        var user = this.props.message.user || userStore.get();
        var message = this.props.message;
        
        return (
            /* jshint ignore:start */
            <li> 
                <dl>
                    <dt>{user.firstName}: {message.message}</dt>
                    <dd>{message.datetime}</dd>
                </dl>
            </li>
            /* jshint ignore:end */
        );
    },
    
    _onChange: function () {
        this.setState({
            roomUsers: roomStore.room.users,
        });
    }
});

module.exports = Message;