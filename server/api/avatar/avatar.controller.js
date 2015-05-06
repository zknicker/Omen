'use strict';

var papercut = require('../../config/papercut');

// Get an avatar.
exports.getAvatar = function(req, res) {
    var uploader = new papercut.AvatarUploader();
    console.log('got uploader...');
    uploader.process('testavatar.png', './testavatar.png', function(err, images){
        if (err) { console.log(err); }
        
        console.log(images.avatar);
        console.log(images.small);
    })
    req.next();
    return;
};