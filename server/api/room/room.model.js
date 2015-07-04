'use strict';

var Waterline = require('Waterline');
var events = require('../../config/events');
var error = require('../../helpers/error.helper');

var Room = Waterline.Collection.extend({

    identity: 'room',
    tableName: 'rooms',
    connection: 'localMysql',

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },

        title: {
            type: 'string',
            notNull: true
        },
        
        users: {
            collection: 'user',
            via: 'rooms'
        },
        
        messages: {
            collection: 'message',
            via: 'room'
        },
        
        // Add a user to the users collection for this room.
        // Caller must handle check for duplicate add.
        addUser: function (userId, cb) {
            this.users.add(userId);
            this.save(cb);
        },
        
        toJSON: function() {
            var obj = this.toObject();
            delete obj.createdAt;
            delete obj.updatedAt;
            return obj;
        }
    }
});

module.exports = Room;