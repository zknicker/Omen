'use strict';

var Waterline = require('Waterline');
var events = require('../../config/events');

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
        },
        
        userId: {
            type: 'integer',
            notNull: true
        }
    },

    afterCreate: messageCreated,
});

/**
 * Called when a message entry has been created in the cache.
 */
function messageCreated(record, next) {
    events.emit('server:message:created', record);
    next();
}

module.exports = CachedMessage;