'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navbar = require('./modules/navbar.jsx');
var Messages = require('./modules/messages.jsx');
var pageStore = require('../stores/page');
var userStore = require('../stores/user');

var getState = function () {
    return {
        title: pageStore.get().title,
        user: userStore.get()
    };
};

var App = React.createClass({
    mixins: [pageStore.mixin, userStore.mixin],
    componentDidMount: function () {
        pageStore.emitChange();
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