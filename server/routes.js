'use strict';

var errors = require('./errors');

module.exports = function (app) {

    require('./api/account/account.routes')(app);
    require('./api/user/user.routes')(app);
    require('./api/message/message.routes')(app);
    require('./api/avatar/avatar.routes')(app);
    require('./api/room/room.routes')(app);

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.get('/*', function (req, res) {
        res.sendfile(app.get('appHomepage') + '/');
    });
};