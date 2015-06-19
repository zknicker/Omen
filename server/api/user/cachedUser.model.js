'use strict';
var Waterline = require('Waterline');

/**
 * This is a server cached copy of a user model. It is used for
 * associating user data with a cached message to avoid overloading
 * the persistent store with reads.
 */
var CachedUser = Waterline.Collection.extend({

    identity: 'cachedUser',
    tableName: 'users',
    connection: 'localRedis',

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            unique: true
        },

        role: {
            type: 'string',
            defaultsTo: 'user'
        },

        firstName: {
            type: 'string',
        },

        lastName: {
            type: 'string',
        }
    }
});

module.exports = CachedUser;