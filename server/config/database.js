/**
 * Database Configuration (MySQL)
 */

'use strict';

var Waterline = require('waterline');
var orm = new Waterline();

// Waterline config.
var mysqlAdapter = require('sails-mysql');
var postgreSQLAdapter = require('sails-postgresql');
var redisAdapter = require('sails-redis');
var config = {
    adapters: {
        mysql: mysqlAdapter,
        postgresql: postgreSQLAdapter,
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
        
        localPostgreSQL: {
            adapter: 'postgresql',
            host: 'localhost',
            port: 5432,
            user: 'zknicker',
            password: 'zknicker',
            database: 'omen_db',
            poolSize: 10,
            ssl: false
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
var CachedUser = require('../api/user/cachedUser.model');
orm.loadCollection(CachedUser);
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