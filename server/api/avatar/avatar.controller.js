'use strict';

var db = require('../../config/database');
var Room = db.models.room;
var error = require('../../helpers/error.helper');
var config = require('../../config/env/default');
var path = require('path');
var fs = require('fs');

/**
 * Gets an avatar by user ID.
 */
var getAvatar = function (req, res, next) {
    req.assert('userId', 'Invalid user ID.').notEmpty().isInt();

    if (req.validationErrors()) {
        return res.status(400).json({
            errors: req.validationErrors()
        });
    }
    
    var imagePath = path.join(config.root, config.avatarAssets, config.defaultAvatar);
    res.contentType('image/png');
    fs.readFile(imagePath, 'binary', function(err, imageBinary){
        res.end(imageBinary, 'binary');
    });
};

module.exports = {
    getAvatar: getAvatar,
};