'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navbar = require('./navbar/navbar.jsx');
var userStore = require('./modules/user/user.store');

var getState = function () {
    return {
        title: 'Omen',
        user: userStore.get()
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
            <div>
                <Navbar user={this.state.user} />
                <section class="content">
                    <RouteHandler/>
                </section>
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