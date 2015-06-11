'use strict';

var React = require('react/addons');
var userStore = require('../modules/user/user.store');

var getState = function () {
    return {
        user: userStore.get()
    };
};

var Message = React.createClass({
    getInitialState: function () {
        return getState();
    },
    
    render: function () {
        return (
            /* jshint ignore:start */
            <li> {
                this.state.user.firstName
            }: {
                this.props.message.message
            } (created by: { this.props.message.userId })</li>
            /* jshint ignore:end */
        );
    }
});

module.exports = Message;