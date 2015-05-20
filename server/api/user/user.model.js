'use strict';
var bcrypt = require('bcrypt-nodejs');
var Waterline = require('Waterline');
var SALT_WORK_FACTOR = 10;

var User = Waterline.Collection.extend({

    identity: 'user',
    tableName: 'users',
    connection: 'localMysql',

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },

        email: {
            type: 'string',
            notNull: true,
            unique: true,
            lowercase: true
        },

        role: {
            type: 'string',
            defaultsTo: 'user'
        },

        password: {
            type: 'string',
        },

        firstName: {
            type: 'string',
        },

        lastName: {
            type: 'string',
        },

        resetPasswordToken: {
            type: 'string',
        },

        resetPasswordExpires: {
            type: 'date',
        },

        verifyPassword: function (password) {
            return bcrypt.compareSync(password, this.password);
        },

        changePassword: function (newPassword, cb) {
            this.newPassword = newPassword;
            this.save(function (err, user) {
                return cb(err, user);
            });
        }
    },

    beforeCreate: function (attrs, cb) {
        bcrypt.hash(attrs.password, SALT_WORK_FACTOR, function (err, hash) {
            attrs.password = hash;
            return cb();
        });
    },

    beforeUpdate: function (attrs, cb) {
        if (attrs.newPassword) {
            bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                if (err) return cb(err);

                bcrypt.hash(attrs.newPassword, salt, null, function (err, crypted) {
                    if (err) return cb(err);

                    delete attrs.newPassword;
                    attrs.password = crypted;
                    return cb();
                });
            });
        } else {
            return cb();
        }
    }
});

module.exports = User;