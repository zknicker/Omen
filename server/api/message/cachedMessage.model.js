'use strict';

var Waterline = require('Waterline');

var CachedMessage = Waterline.Collection.extend({

    identity: 'cachedMessage',
    tableName: 'messages',
    connection: 'localRedis',

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },

        message: {
            type: 'string',
            notNull: true
        }
    }
});

module.exports = CachedMessage;