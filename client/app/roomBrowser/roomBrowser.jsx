'use strict';

var React = require('react/addons');
var Router = require('react-router');
var roomActions = require('../modules/room/room.actions');

var RoomBrowserComponent = React.createClass({

    componentDidMount: function() {
    },

    handleJoinRoomClick: function (e) {
        e.preventDefault();
        console.log('CLICKED JOIN ROOM');
        roomActions.join(1);
    },
    
    render: function () {
        return (
            /* jshint ignore:start */
            <div>
                <b>Select a room:</b>
                <br />
                <ul>
                    <li>Awesome Room: <a href="#" onClick={this.handleJoinRoomClick}>Join</a> <a href="#">Leave</a></li>
                </ul>
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = RoomBrowserComponent;