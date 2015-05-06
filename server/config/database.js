/**
 * Database Configuration (MySQL)
 */

'use strict';

var settings = require('./env/default');
var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var db = {};

// Connect to database
var sequelize = new Sequelize(settings.database.url, settings.database.options);

// Import all database models
var userModel = sequelize['import'](path.join(__dirname, '../api/user/user.model.js'));
db[userModel.name] = userModel;
var messageModel = sequelize['import'](path.join(__dirname, '../api/message/message.model.js'));
db[messageModel.name] = messageModel;

// Associate models if `associate` method is found within model's `classMethods` object
Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;