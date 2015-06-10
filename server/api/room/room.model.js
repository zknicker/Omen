'use strict';

var Waterline = require('Waterline');

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
            type: 'array',
            notNull: true
        }
    }
});

module.exports = Room;