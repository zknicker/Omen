'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var roomStore = require('../modules/room/room.store');
var roomActions = require('../modules/room/room.actions');
var Navigation = Router.Navigation;
var SidebarItem = require('./sidebarItem.jsx');

var getState = function () {
    return {
        currentRooms: roomStore.currentRooms
    };
};

/*
if (roomStore.hasRoom(roomId)) {
    roomActions.setActiveRoom(roomId);
} else {
*/

var JoinedRoomsListItem = React.createClass({
    
    handleClick: function (event) {
        if (roomStore.hasRoom(this.props.room.id)) {
            roomActions.setActiveRoom(this.props.room.id);
        } else {
            alert('UNHANDLED ERROR - ROOM DOES NOT EXIST');   
        }
    },
    
    render: function () {
        var className = 'sidebar-list-item';
        
        if (this.props.active) {
            className += ' selected';    
        }
        
        var params = {
            roomId: this.props.room.id   
        }
        
        return (
            <li className={className} onClick={this.handleClick}>
                <Link to="chat" params={params}>{this.props.room.title}</Link>
            </li>
        );
    }
});

var JoinedRoomsList = React.createClass({

    mixins: [ Navigation, roomStore.mixin ],
    
    getInitialState: function () {
        return getState();
    },
        
    render: function () {
        var isActive = false;
        var listItems = 
            this.state.currentRooms.map(function (room, index) {
                return (
                    <JoinedRoomsListItem
                        active = {isActive}
                        room = {room}
                        key = {index}
                    />
                )
            });
        
        return (
            <ul className="sidebar-list">
                <SidebarItem
                    routeName = 'joinRooms'
                    name = '(+) Join a room'
                    link ='rooms'
                />
                <li className="sidebar-list-category">Rooms</li>
                { listItems }
            </ul>
        );
    },

    _onChange: function () {
        this.setState({
            activeRoom: roomStore.activeRoom,
        });
    }
});

module.exports = JoinedRoomsList;