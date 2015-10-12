'use strict';

var React = require('react/addons');
var Router = require('react-router');
var messageActions = require('../modules/message/message.actions');
var messageStore = require('../modules/message/message.store');
var roomStore = require('../modules/room/room.store');
var Message = require('./message.jsx');

var MessageListComponent = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
        return {
            shouldUpdateScroll: true  
        };
    },
    
    componentDidMount: function () {
        $('.nano').nanoScroller({ sliderMaxHeight: 1000 });
        $('nano').scrollTop($(document).height());
        
        $('.nano').bind('update', function(e, values){
            this.setState({
                shouldUpdateScroll: false
            });
        }.bind(this));
        
        $('.nano').bind('scrollend', function(e){
            this.setState({
                shouldUpdateScroll: true
            }); 
        }.bind(this));
    },
    
    componentDidUpdate: function () {
        if (this.state.shouldUpdateScroll) {
            $('.nano-content').scrollTop($('.nano-content').height())
        }
    },
    
    render: function () {
        return (
            /* jshint ignore:start */
            <div className="chat-messages-container nano">
                <div className="chat-messages nano-content">
                    <b>{this.props.loading ? "Loading messages..." : ""}</b>
                    <ul>
                    {
                        this.props.messages.map(function(message, index) {
                            return <Message key={index} message={message} />
                        })
                    }
                    </ul>
                </div>
            </div>
          /* jshint ignore:end */
        );
    }
});

module.exports = MessageListComponent;