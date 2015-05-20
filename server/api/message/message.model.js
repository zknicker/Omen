'use strict';

var Waterline = require('Waterline');

var Message = Waterline.Collection.extend({

    identity: 'message',
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
        }
    }
});

module.exports = Message;