'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var gls = require('gulp-live-server');
var del = require('del');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var dirs = {
    main: path.resolve(__dirname, 'client/app/main.js'),
    assets: path.resolve(__dirname, 'assets'),
}

/**
 * Delete temporary files.
 */
gulp.task('clean', del.bind(null, [
    dirs.assets
]));

gulp.task('webpack', function(callback) {
    var compiler = webpack({
        entry: dirs.main,
        output: {
            path: dirs.assets,
            filename: 'main.js'
        },
        module: {
            loaders: [

                { // BABEL LOADER
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel',
                    query: {
                        presets: ['react', 'es2015']
                    }
                },
                { // IMAGE INLINING LOADER
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loaders: [
                        'file?hash=sha512&digest=hex&name=[hash].[ext]',
                        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                    ]
                },
                { // CSS LOADER
                    test: /\.css/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
                },
                { // SCSS LOADER
                    test: /\.scss/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('styles.css', {
                allChunks: true
            })
        ]
    });
    
    compiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack] completed startup compile.');
        callback();
    });
    
    compiler.watch({
        aggregateTimeout: 300,
    }, function (err, stats) {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack] live updated.');
    });
});

gulp.task('server', function() {
    var server = gls.new('server.js', undefined, 9010);
    server.start();
});

/**
 * Local server for testing.
 */
gulp.task('serve', ['webpack'], function () {
    gulp.start('server');
});

gulp.task('default', ['clean'], () => {
    gulp.start('serve');
});