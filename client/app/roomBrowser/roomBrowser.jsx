'use strict';

var React = require('react/addons');
var Router = require('react-router');
var roomActions = require('../modules/room/room.actions');
var roomStore = require('../modules/room/room.store');
var messageActions = require('../modules/message/message.actions');
var RoomBrowserRoom = require('./roomBrowserRoom.jsx');
var RoomCreator = require('./roomCreator.jsx');
var Authentication = require('../lib/auth.mixin');

var getState = function () {
    return {
        joinableRooms: roomStore.joinableRooms,
        joinableRoomsLoading: roomStore.joinableRoomsLoading
    };
};

var RoomBrowserComponent = React.createClass({

    mixins: [ Authentication, roomStore.mixin ],
    
    getInitialState: function () {
        return getState();
    },
    
    componentDidMount: function() {
        roomActions.getJoinable();
    },
    
    render: function () {
        return (
            /* jshint ignore:start */
            <div className="room-browser">
                <div className="room-browser-hero">
                    <div className="room-browser-hero-logo"></div>
                    <input type="text" className="room-browser-search" placeholder="Search" />
                </div>
                <ul className="room-browser-list group">
                {
                    this.state.joinableRooms.map(function(room, index) {
                        return <RoomBrowserRoom key={index} room={room} />
                    }.bind(this))
                }
                </ul>
                <br />
                <b>Create a room:</b>
                <RoomCreator />
            </div>
            /* jshint ignore:end */
        );
    },

    _onChange: function () {
        this.setState({
            joinableRooms: roomStore.joinableRooms,
            joinableRoomsLoading: roomStore.joinableRoomsLoading
        });
    }
});

module.exports = RoomBrowserComponent;