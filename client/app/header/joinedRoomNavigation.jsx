'use strict';

var React = require('react/addons');
var Router = require('react-router');
var roomStore = require('../modules/room/room.store');
var Navigation = Router.Navigation;

var getState = function () {
    return {
        currentRoom: roomStore.currentRoom
    };
};

var JoinedRoomNavigationComponent = React.createClass({

    mixins: [ Navigation, roomStore.mixin ],
    
    getInitialState: function () {
        return getState();
    },
        
    /**
     * Responds to a click on a room.
     */
    handleRoomClick: function (e) {
        this.transitionTo('/chat');
    },
    
    render: function () {
        return (
            /* jshint ignore:start */
            <div className="joined-rooms">
                Rooms:
                <ul>
                    <li><a href="#" onClick={this.handleRoomClick}>{this.state.currentRoom.title}</a></li>
                </ul>
            </div>
            /* jshint ignore:end */
        );
    },

    _onChange: function () {
        this.setState({
            currentRoom: roomStore.currentRoom,
        });
    }
});

module.exports = JoinedRoomNavigationComponent;