'use strict';

var React = require('react/addons');
var userStore = require('../modules/user/user.store');

var Message = React.createClass({

    render: function () {
        var user = this.props.message.user;
        var message = this.props.message;
        
        return (
            /* jshint ignore:start */
            <li> 
                <dl>
                    <dt>{user.firstName}: {message.message}</dt>
                    <dd>{message.datetime}</dd>
                </dl>
            </li>
            /* jshint ignore:end */
        );
    }
});

module.exports = Message;