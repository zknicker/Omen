'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var roomActions = require('../modules/room/room.actions');
var roomStore = require('../modules/room/room.store');

var SidebarRoomsListRoom = React.createClass({
    
    handleClick: function (event) {
        if (roomStore.hasRoom(this.props.room.id)) {
            roomActions.setActiveRoom(this.props.room.id);
        } else {
            alert('UNHANDLED ERROR - ROOM DOES NOT EXIST');   
        }
    },
    
    render: function () {
        var classes = 'room-list-room';
        
        if (this.props.activeRoomId === this.props.room.id) {
            classes += ' selected';    
        }
        
        var linkParams = {
            roomId: this.props.room.id   
        }
        
        return (
            <li className={classes} onClick={this.handleClick}>
                <Link to="chat" params={linkParams}>{this.props.room.title}</Link>
            </li>
        );
    }
});

module.exports = SidebarRoomsListRoom;