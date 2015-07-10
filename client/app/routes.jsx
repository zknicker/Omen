var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var App = require('./app.jsx');
var IndexPage = require('./index/index.jsx');
var LoginPage = require('./account/login.jsx');
var ForgotPage = require('./account/forgot.jsx');
var SignupPage = require('./account/signup.jsx');
var SettingsPage = require('./account/settings.jsx');
var ChatPage = require('./chat/chat.jsx');
var RoomBrowserPage = require('./roomBrowser/roomBrowser.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={IndexPage} />
    <Route name="login" handler={LoginPage} />
    <Route name="logout" handler={IndexPage} />
    <Route name="forgot" handler={ForgotPage} />
    <Route name="signup" handler={SignupPage} />
    <Route name="settings" handler={SettingsPage} />
    <Route name="chat" handler={ChatPage} onEnter="handleEnter" />
    <Route name="rooms" handler={RoomBrowserPage} />
    <NotFoundRoute handler={IndexPage} />
  </Route>
);

module.exports = {
    startRouting: function() {
        Router.run(routes, Router.HistoryLocation, function (Handler) {
            React.render(<Handler/>, document.getElementById('app-wrapper'));
        });
    }
};