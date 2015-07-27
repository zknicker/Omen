'use strict';

var db = require('../../config/database');
var Room = db.models.room;
var error = require('../../helpers/error.helper');
var config = require('../../config/env/default');
var path = require('path');
var fs = require('fs');
var mime = require('mime');

/**
 * Gets an avatar by user ID.
 */
var getAvatar = function (req, res, next) {
    req.assert('userId', 'Invalid user ID.').notEmpty().isInt();
    req.assert('extension', 'Invalid image extension.').isAlpha();
    
    if (req.validationErrors()) {
        return res.status(400).json({
            errors: req.validationErrors()
        });
    }
    
    var imagePath = path.join(config.root, config.avatarAssets, req.params.userId, req.params.extension);
    var defaultImagePath = path.join(config.root, config.avatarAssets, config.defaultAvatar);
    
    fs.readFile(imagePath, 'binary', function(err, imageBinary){
        if (err) {
            // If this actually happens, there's a problem with default avatar logic/config.
            error.log('The config for default avatar is incorrect.');
            res.status(404);
        } else {
            res.contentType(mime.lookup(imagePath));
            res.end(imageBinary, 'binary');
        }
    });
};

module.exports = {
    getAvatar: getAvatar,
};