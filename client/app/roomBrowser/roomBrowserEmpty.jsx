'use strict';

var React = require('react/addons');
var Router = require('react-router');

var RoomBrowserEmptyComponent = React.createClass({

    render: function () {
        return (
            /* jshint ignore:start */
            <li>
                Join a room
            </li>
            /* jshint ignore:end */
        );
    }
});

module.exports = RoomBrowserEmptyComponent;