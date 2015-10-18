'use strict';

var React = require('react/addons');
var Router = require('react-router');
var roomStore = require('../modules/room/room.store');
var Navigation = Router.Navigation;
var SidebarItem = require('./sidebarItem.jsx');

var getState = function () {
    return {
        currentRooms: roomStore.currentRooms
    };
};

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
                    <SidebarItem
                        active = {isActive}
                        routeName = {'room-' + room.id}
                        name = {room.title}
                        link = "chat"
                        linkParams = {{ roomId: room.id }}
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