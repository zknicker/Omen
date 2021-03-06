'use strict';

var Waterline = require('Waterline');

var Message = Waterline.Collection.extend({

    identity: 'message',
    tableName: 'messages',
    connection: 'localMysql',

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

        user: {
            model: 'user',
            notNull: true
        },

        room: {
            model: 'room',
            notNull: true
        },

        toJSON: function () {
            var obj = this.toObject();
            delete obj.createdAt;
            delete obj.updatedAt;
            return obj;
        }
    }
});

module.exports = Message;