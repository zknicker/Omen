'use strict';

module.exports[404] = function pageNotFound(req, res) {
    var viewFilePath = '../views/404';
    var statusCode = 404;
    var result = {
        status: statusCode
    };

    res.status(result.status);
    res.sendFile(viewFilePath);
};