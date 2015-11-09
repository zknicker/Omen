// Configuration for browserify task(s)
// Compiles JavaScript into single bundle file
'use strict';

var taskConfig = function (grunt) {

    grunt.config.set('browserify', {
        server: {
            files: {
                '<%= yeogurt.tmp %>/scripts/main.js': ['<%= yeogurt.client %>/app/main.js']
            },
            options: {
                transform: [require('grunt-react').browserify],
                browserifyOptions: {
                    debug: true
                },
                watch: true
            }
        },
        dist: {
            files: {
                '<%= yeogurt.dist %>/client/scripts/main.js': ['<%= yeogurt.client %>/app/main.js']
            },
            options: {
                transform: [require('grunt-react').browserify],
                browserifyOptions: {
                    debug: true
                },
                preBundleCB: function (b) {
                    // Minify code
                    return b.plugin('minifyify', {
                        map: 'main.js.map',
                        output: 'dist/client/scripts/main.js.map'
                    });
                }
            }
        },
    });

};

module.exports = taskConfig;