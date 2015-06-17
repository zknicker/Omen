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
        var user = this.props.message.user;
        var message = this.props.message;
        return (
            /* jshint ignore:start */
            <li> {
                "hey" || user.firstName
            }: {
                message.message
            } (created by: { user })</li>
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