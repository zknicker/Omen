var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var App = require('./app.jsx');
var LandingPage = require('./account/landing.jsx');
var ForgotPage = require('./account/forgot.jsx');
var SignupPage = require('./account/signup.jsx');
var SettingsPage = require('./account/settings.jsx');
var ChatPage = require('./chat/chat.jsx');
var RoomBrowserPage = require('./roomBrowser/roomBrowser.jsx');
var AdminGatewayPage = require('./admin/gateway.jsx');
var AdminUserManagementPage = require('./admin/userManagement.jsx');
var AdminWrapperPage = require('./admin/adminWrapper.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
    
    // User Routes
    <DefaultRoute handler={RoomBrowserPage} />
    <Route name="landing" handler={LandingPage} />
    <Route name="logout" handler={LandingPage} />
    <Route name="forgot" handler={ForgotPage} />
    <Route name="signup" handler={SignupPage} />
    <Route name="settings" handler={SettingsPage} />
    <Route name="chat" path="/chat/:roomId" handler={ChatPage} />
    <Route name="rooms" handler={RoomBrowserPage} />
    <NotFoundRoute handler={RoomBrowserPage} />
    
    // Admin Routes
    <Route name="admin" handler={AdminWrapperPage}>
        <DefaultRoute handler={AdminGatewayPage} />
        <Route name="overview" handler={AdminGatewayPage} />
        <Route name="usermanagement" handler={AdminUserManagementPage} />
    </Route>
  </Route>
);

module.exports = {
    startRouting: function() {
        var router = Router.create({ routes: routes, location: Router.HistoryLocation});
        router.run(function (Handler) {
            React.render(<Handler/>, document.getElementById('app-wrapper'));
        });
        return router;
    }
};