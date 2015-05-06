'use strict';

var indexController = require('./controllers/index');
var errors = require('./errors');

module.exports = function (app) {

    // Insert routes below
    //app.use('/api/sockets', require('./api/sockets'));
    //app.use('/api/chatrooms', require('./api/chatroom'));
    //app.use('/api/messages', require('./api/message'));
    //app.use('/api/users', require('./api/user'));
    //app.use('/api/avatar', require('./api/avatar'));

    require('./routes/account')(app);
    require('./api/user/user.routes')(app);
    require('./api/message/message.routes')(app);
    require('./api/avatar/avatar.routes')(app);

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.get('/*', function (req, res) {
        res.sendfile(app.get('appHomepage') + '/');
    });
};