/**
 * Error handling configuration for express app.
 */

'use strict';

module.exports = function (app) {

    var env = app.get('env');

    /**
     * This is a final check for error passed down via next. These will
     * generally be database errors, or other errors with dependent modules.
     * We don't want to show the user these messages, so we just show them
     * a generic server error instead.
     */
    app.use(function (err, req, res, next) {
        if ('development' === env) {
            console.error(err);
        }

        res.status(500).send({
            error: 'Something terrible happened. Try again.'
        });
    });
}
