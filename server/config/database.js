/**
 * Database Configuration (MySQL)
 */

'use strict';

var Waterline = require('waterline');
var orm = new Waterline();

// Waterline config.
var mysqlAdapter = require('sails-mysql');
var redisAdapter = require('sails-redis');
var config = {
    adapters: {
        mysql: mysqlAdapter,
        redis: redisAdapter
    },

    connections: {
        localMysql: {
            adapter: 'mysql',
            host: 'localhost',
            port: 3306,
            user: 'zknicker',
            password: 'zknicker',
            database: 'omen_db',
            charset: 'utf8',
            collation: 'utf8_general_ci'
        },

        localRedis: {
            adapter: 'redis',
            port: 6379,
            host: 'localhost',
            password: null,
            database: null,
        }
    },

    defaults: {
        migrate: 'alter'
    }

};

// Loading models into Waterline.
var User = require('../api/user/user.model');
orm.loadCollection(User);
var Message = require('../api/message/message.model');
orm.loadCollection(Message);
var CachedMessage = require('../api/message/cachedMessage.model');
orm.loadCollection(CachedMessage);
var Room = require('../api/room/room.model');
orm.loadCollection(Room);

module.exports.models = null;
module.exports.initialize = function (cb) {

    orm.initialize(config, function (err, models) {
        module.exports.models = models.collections;
        cb(err);
    });
};