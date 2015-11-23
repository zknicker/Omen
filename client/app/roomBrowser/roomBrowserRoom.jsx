'use strict';

var React = require('react/addons');
var Router = require('react-router');
var roomActions = require('../modules/room/room.actions');
var messageActions = require('../modules/message/message.actions');
var Navigation = Router.Navigation;

// Credit to motoboi at http://stackoverflow.com/questions/43044.
function getRandomPastelColor(){
    var r = (Math.round(Math.random()* 70) + 30).toString(16);
    var g = (Math.round(Math.random()* 70) + 90).toString(16);
    var b = (Math.round(Math.random()* 127) + 127).toString(16);
    return '#' + r + g + b;
}

var RoomBrowserRoomComponent = React.createClass({
    
    mixins: [ Navigation ],
    
    /**
     * Responds to clicks on the join room links.
     */
    handleJoinRoomClick: function (e) {
        e.preventDefault();
        this.transitionTo('/chat/' + this.props.room.id);
    },
    
    render: function () {
        var color = getRandomPastelColor();
        var styleMap = {
            backgroundColor: color   
        }
        
        return (
            /* jshint ignore:start */
            <li className="room-browser-room">
                <div className="room-browser-room-background" style={styleMap}></div>
                <a href="#" onClick={this.handleJoinRoomClick}>
                    {this.props.room.title}
                </a>
            </li>
            /* jshint ignore:end */
        );
    }
});

module.exports = RoomBrowserRoomComponent;