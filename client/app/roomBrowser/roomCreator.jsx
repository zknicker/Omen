'use strict';

var React = require('react/addons');
var Router = require('react-router');
var roomActions = require('../modules/room/room.actions');

var getState = function () {
    return {
        roomTitle: ""
    };
};

var RoomCreatorComponent = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
             
    getInitialState: function () {
        return getState();
    },

    render: function () {
        return (
            /* jshint ignore:start */
            <form id="room-creator-input" method="post" onSubmit={this.handleSubmitRoom}>
                <input type="text" name="room-title" placeholder="Room title..." valueLink={this.linkState('roomTitle')} />
                <button type="submit">Create Room</button>
            </form>
            /* jshint ignore:end */
        );
    },

    handleSubmitRoom: function (e) {
        e.preventDefault();
        var form = e.currentTarget;

        roomActions.create(this.state.roomTitle);

        this.setState({
            roomTitle: ""
        });
    }
});

module.exports = RoomCreatorComponent;