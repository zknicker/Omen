'use strict';

var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var dirs = {
    main: path.resolve(__dirname, 'client/app/main.js'),
    assets: path.resolve(__dirname, 'assets'),
}

var config = {
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
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            { // SCSS LOADER
                test: /\.scss/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css", {
            allChunks: true
        })
    ]
};

module.exports = config;
