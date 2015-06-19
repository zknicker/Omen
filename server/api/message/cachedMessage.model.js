'use strict';

var Waterline = require('Waterline');
var events = require('../../config/events');
var db = require('../../config/database');
//console.log(db);
//var CachedUser = db.models.cacheduser;

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
        
        datetime: {
            type: 'datetime',
            notNull: true,
            defaultsTo: function () {
                return new Date();
            }
        },
        
        // The cached user who created this message.
        user: {
            model: 'cachedUser'
        },

        toJSON: function () {
            var obj = this.toObject();
            delete obj.createdAt;
            delete obj.updatedAt;
            return obj;
        }
    },

    afterCreate: messageCreated,
});

/**
 * Called when a message entry has been created in the cache. Finds the
 * cached user associated with the message and sends the final cached 
 * message entry out to all sockets.
 */
function messageCreated(record, next) {
    
    // CachedUser is not defined when this js file is executed due to the
    // way Waterline is being initialized. So we are referencing it here
    // instead.
    var CachedUser = db.models.cacheduser;
    CachedUser.findOne({ id: record.user }).then(function (cachedUser) {
        record.user = cachedUser.toJSON();
        events.emit('server:message:created', record);
        next();
    }).catch(next);
}

module.exports = CachedMessage;