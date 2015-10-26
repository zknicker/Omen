'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var roomStore = require('../modules/room/room.store');
var Navigation = Router.Navigation;
var SidebarRoomsListRoom = require('./sidebarRoomsListRoom.jsx');

var getState = function () {
    return {
        activeRoom: roomStore.activeRoom,
        currentRooms: roomStore.currentRooms
    };
};

var SidebarRoomsList = React.createClass({

    mixins: [ Navigation, roomStore.mixin ],
    
    getInitialState: function () {
        return getState();
    },
        
    render: function () {
        var currentRooms = this.state.currentRooms;
        var activeRoomId = this.state.activeRoom.id;
        var joinedRoomsList = currentRooms.map(function (room) {
            return (
                <SidebarRoomsListRoom
                    room = {room}
                    activeRoomId = {activeRoomId}
                    key = {room.id}
                />
            )
        });
        
        var noRoomsJoinedMessage = "";
        if (currentRooms.length <= 0) {
            noRoomsJoinedMessage = (
                <p className="no-rooms-joined">
                    You are not currently in any rooms. Get started by using our fancy&nbsp;
                    <Link to="/rooms">room browser</Link>!
                </p>);
        }
        
        return (
            <ul className="room-list">
                <li className="room-list-title">
                    Rooms 
                    <Link to="/rooms" className="room-list-new-button">Join new room</Link>
                </li>
                {noRoomsJoinedMessage}
                {joinedRoomsList}
            </ul>
        );
    },

    _onChange: function () {
        this.setState(getState());
    }
});

module.exports = SidebarRoomsList;