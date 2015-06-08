var accountController = require('./account.controller');
var auth = require('../../auth');

var routes = function (app) {

    app.post('/login', accountController.login);
    app.get('/forgot', accountController.forgot);
    app.post('/forgot', accountController.postForgot);
    app.get('/reset/:token', accountController.reset);
    app.post('/reset/:token', accountController.postReset);
    app.get('/signup', accountController.signup);
};

module.exports = routes;