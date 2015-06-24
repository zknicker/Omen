var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var App = React.createFactory(require('./app.jsx'));
var IndexPage = React.createFactory(require('./index/index.jsx'));
var LoginPage = React.createFactory(require('./account/login.jsx'));
var ForgotPage = React.createFactory(require('./account/forgot.jsx'));
var SignupPage = React.createFactory(require('./account/signup.jsx'));
var SettingsPage = React.createFactory(require('./account/settings.jsx'));
var ChatPage = React.createFactory(require('./chat/chat.jsx'));
var RoomBrowserPage = React.createFactory(require('./roomBrowser/roomBrowser.jsx'));

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={IndexPage} />
    <Route name="login" handler={LoginPage} />
    <Route name="logout" handler={IndexPage} />
    <Route name="forgot" handler={ForgotPage} />
    <Route name="signup" handler={SignupPage} />
    <Route name="settings" handler={SettingsPage} />
    <Route name="chat" handler={ChatPage} />
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