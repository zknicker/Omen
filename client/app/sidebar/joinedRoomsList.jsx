'use strict';

var React = require('react/addons');
var Router = require('react-router');
var roomStore = require('../modules/room/room.store');
var Navigation = Router.Navigation;
var SidebarItem = require('./sidebarItem.jsx');

var getState = function () {
    return {
        currentRoom: roomStore.currentRoom
    };
};

var JoinedRoomsList = React.createClass({

    mixins: [ Navigation, roomStore.mixin ],
    
    getInitialState: function () {
        return getState();
    },
        
    /**
     * Responds to a click on a room.
     */
    handleRoomClick: function (e) {
        //this.transitionTo('/chat');
    },
    
    render: function () {
        var isActive = false;
        
        return (
            <SidebarItem
                active={isActive}
                routeName={'room-' + this.state.currentRoom.id}
                name={this.state.currentRoom.title}
                link="chat"
                onSelect={this.handleRoomClick}
            />
        );
    },

    _onChange: function () {
        this.setState({
            currentRoom: roomStore.currentRoom,
        });
    }
});

module.exports = JoinedRoomsList;