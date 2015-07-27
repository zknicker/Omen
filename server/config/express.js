/**
 * Express configuration
 */
'use strict';

var compression = require('compression');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var flash = require('express-flash');
var expressValidator = require('express-validator');
var passport = require('passport');
var auth = require('../auth');
var session = require('express-session');
var secrets = require('./secrets');
var settings = require('./env/default');

module.exports = function (app, express, database) {
    var env = app.get('env');

    // General Express Config
    app.disable('x-powered-by');
    app.use(methodOverride('_method'));
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.set('port', settings.server.port);
    app.set('view engine', 'html');
    app.engine('.html', require('ejs').__express);
    app.set('views', path.join(settings.root, 'server/views'));
    app.use(compression());

    // JSON Parsing.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(expressValidator());

    // Live reload and dev static assets.
    if ('development' === env) {
        app.use(require('connect-livereload')());
        app.use(express.static(path.join(settings.root, '.tmp')));
        app.use('/bower_components', express.static(path.join(settings.root, 'client/bower_components')));
    }

    // Load favicon & other static assets.
    app.use(favicon(path.join(settings.root, settings.staticAssets, '/favicon.ico')));
    app.use(express.static(path.join(settings.root, settings.staticAssets)));
    app.use('/images', express.static(path.join(settings.root, settings.serverImageAssets)));

    // Authentication middleware.
    auth.init(database.models.user);
    app.use(passport.initialize());
    app.use(passport.session());

    // Peon middleware.
    app.use(flash());
    app.use(logger(settings.server.logLevel));

    if ('development' === env) {
        app.use(function noCache(req, res, next) {
            res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.header('Pragma', 'no-cache');
            res.header('Expires', 0);
            next();
        });
        app.use(errorHandler());
    }
};