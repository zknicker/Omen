'use strict';

var React = require('react/addons');
var Router = require('react-router');
var roomActions = require('../modules/room/room.actions');
var roomStore = require('../modules/room/room.store');
var messageActions = require('../modules/message/message.actions');
var Authentication = require('../lib/auth.mixin');
var Navigation = Router.Navigation;

var getState = function () {
    return {
        joinableRooms: roomStore.joinableRooms,
        joinableRoomsLoading: roomStore.joinableRoomsLoading
    };
};

var RoomBrowserComponent = React.createClass({

    mixins: [ Authentication, Navigation, roomStore.mixin ],
    
    getInitialState: function () {
        return getState();
    },
    
    componentDidMount: function() {
        roomActions.getJoinable();
    },
    
    handleJoinRoomClick: function (e) {
        e.preventDefault();
        roomActions.join(1);
        messageActions.getRecent(1);
        this.transitionTo('/chat');
    },
    
    render: function () {
        return (
            /* jshint ignore:start */
            <div>
                <b>Select a room:</b>
                <br />
                <ul>
                {
                    this.state.joinableRooms.map(function(room, index) {
                        return (<li>{room.title}: <a href="#" onClick={this.handleJoinRoomClick}>Join</a></li>);
                    }.bind(this))
                }
                </ul>
            </div>
            /* jshint ignore:end */
        );
    },

    _onChange: function () {
        console.log('onchange', roomStore.joinableRooms);
        this.setState({
            joinableRooms: roomStore.joinableRooms,
            joinableRoomsLoading: roomStore.joinableRoomsLoading
        });
    }
});

module.exports = RoomBrowserComponent;