'use strict';

var React = require('react/addons');
var Router = require('react-router');
var roomActions = require('../modules/room/room.actions');
var messageActions = require('../modules/message/message.actions');
var Navigation = Router.Navigation;

var RoomBrowserRoomComponent = React.createClass({
    
    mixins: [ Navigation ],
    
    /**
     * Responds to clicks on the join room links.
     */
    handleJoinRoomClick: function (e) {
        e.preventDefault();
        roomActions.join(1);
        messageActions.getRecent(1);
        this.transitionTo('/chat');
    },
    
    render: function () {
        return (
            /* jshint ignore:start */
            <li>
                {this.props.room.title}: <a href="#" onClick={this.handleJoinRoomClick}>Join</a>
            </li>
            /* jshint ignore:end */
        );
    }
});

module.exports = RoomBrowserRoomComponent;