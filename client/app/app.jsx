'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Header = require('./header/header.jsx');
var Sidebar = require('./sidebar/sidebar.jsx');
var userStore = require('./modules/user/user.store');

var getState = function () {
    return {
        title: 'Omen',
        user: userStore.getUser()
    };
};

var App = React.createClass({
    mixins: [userStore.mixin],
    componentDidMount: function () {
        userStore.emitChange();
    },
    getInitialState: function () {
        return getState();
    },
    render: function () {
        return (
            /* jshint ignore:start */
            <div className="wrapper">
                <div className="page">
                    <Sidebar />
                    <div className="page-content">
                        <RouteHandler />
                    </div>
                </div>
            </div>
            /* jshint ignore:end */
        );
    },
    // Event handler for 'change' events coming from store mixins.
    _onChange: function () {
        this.setState(getState());
    }
});

module.exports = App;