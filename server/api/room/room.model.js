'use strict';

var Waterline = require('Waterline');
var events = require('../../config/events');

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
        
        toJSON: function() {
            var obj = this.toObject();
            delete obj.createdAt;
            delete obj.updatedAt;
            return obj;
        }
    }
});

module.exports = Room;