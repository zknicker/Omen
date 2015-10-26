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
            scrollToEndOnNewItem: true  
        };
    },
    
    componentDidMount: function () {
        $('.nano').nanoScroller({ sliderMaxHeight: 800 });
        $('.nano').bind('update', function(e, values){
            
            // If users has scrolled up, do not auto-scroll on a new item.
            var scrollToEndOnNewItem = true;
            
            // We need to check for max - 1 here to avoid issues with decimal
            // scrollTop values in Chrome and Firefox.
            //
            // A fix has been pending for a very long time:
            // https://github.com/jamesflorentino/nanoScrollerJS/pull/270
            if (values.position < values.maximum - 1) {
                scrollToEndOnNewItem = false;   
            }
            this.setState({
                scrollToEndOnNewItem: scrollToEndOnNewItem
            });
        }.bind(this));
    },
    
    componentDidUpdate: function () {
        if (this.state.scrollToEndOnNewItem) {
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