'use strict';

var papercut = require('papercut');
var path = require('path');
var config = require('./env/default');

papercut.configure(function(){
    papercut.set('storage', 'file')
    papercut.set('directory', path.join(config.root, config.avatarsStorage));
    papercut.set('url', config.avatarsURL)
});

exports.AvatarUploader = papercut.Schema(function(schema){
    schema.version({
        name: 'avatar',
        size: '100x100',
        process: 'crop'
    });
});