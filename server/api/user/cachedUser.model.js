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
        },
        
        // List of cached message for this cached user. Shouldn't
        // be a need to actually use this. It's just here to enable
        // the database associations.
        messages: {
            collection: 'cachedMessage',
            via: 'user'
        },

        toJSON: function () {
            var obj = this.toObject();
            delete obj.createdAt;
            delete obj.updatedAt;
            return obj;
        }
    }
});

module.exports = CachedUser;