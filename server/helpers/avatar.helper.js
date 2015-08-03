'use strict';

var fs = require('fs');
var mime = require('mime');
var constants = require('./constants.helper');
var config = require('../config/env/default');
var path = require('path');

// Valid mime types.
var validMimeTypes = [
    'jpg', 'jpeg', 'png', 'gif'
];

/**
 * Checks to see if the passed bytes match any of the mime type
 * magic numbers for the allowed mime types.
 */
var areMagicNumbersValidMimeType = function(magicNumbers) {
    return (
        magicNumbers == 'ffd8ffe0' || // JPG
        magicNumbers == 'ffd8ffe0' || // JPEG
        magicNumbers == '89504e47' || // PNG
        magicNumbers == '47494638');  // GIF
};

/**
 * Given a base64 encoded avatar image, validates and saves the image
 * to the avatar storage directory with the passed userId for the name. 
 * Callback provides errors if they exist.
 *
 * Mime type should be in the format e.g. 'image/png'
 */
var validateAndSave = function(base64Avatar, mimeType, userId, cb) {    
    var extension = mime.extension(mimeType);
    if (validMimeTypes.indexOf(extension) < 0) {
        var err = constants.get('AVATAR_INVALID_MIME_TYPE');
        return cb(err);
    }
    
    var dataBuffer = new Buffer(base64Avatar, 'base64');
    var binaryData = dataBuffer.toString('binary');
    if (binaryData.length > 2000000) {
        var err = constants.get('AVATAR_TOO_LARGE');
        return cb(err);
    }
    
    var magicNumbers = dataBuffer.toString('hex', 0, 4);
    if (!areMagicNumbersValidMimeType(magicNumbers)) {
        var err = constants.get('AVATAR_INVALID_MIME_TYPE');
        return cb(err);
    }
    
    var fileName = userId + '.' + extension;
    var savePath = path.join(config.root, config.serverAvatarAssets, fileName);
    fs.writeFile(savePath, dataBuffer, function (err) {
        cb(err, fileName);   
    });
}

module.exports = {
    validateAndSave: validateAndSave,
};