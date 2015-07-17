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
            notNull: true
        },
        
        username: {
            type: 'string',  
        },

        resetPasswordToken: {
            type: 'string',
        },

        resetPasswordExpires: {
            type: 'date',
        },
        
        rooms: {
            collection: 'room',
            via: 'users',
            dominant: true
        },
        
        messages: {
            collection: 'message',
            via: 'user'
        },

        verifyPassword: function (password) {
            return bcrypt.compareSync(password, this.password);
        },

        changePassword: function (newPassword, cb) {
            this.newPassword = newPassword;
            this.save(function (err, user) {
                return cb(err, user);
            });
        },
        
        // Set a flag that enables toJSON to return sensitive data (e.g. email).
        // Do not save this value as true to the model (that would defeat the purpose).
        setSensitiveDataOnJSON: function() {
            this.sensitiveDataIsOk = true;
        },
        
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj.resetPasswordToken;
            delete obj.resetPasswordExpires;
            delete obj.createdAt;
            delete obj.updatedAt;
            
            if (!obj.sensitiveDataIsOk) {
                delete obj.email;
            }
            
            delete obj.sensitiveDataIsOk;
            
            return obj;
        }
    },

    beforeCreate: function (attrs, cb) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return cb(err);

            bcrypt.hash(attrs.password, salt, null, function (err, crypted) {
                if (err) return cb(err);

                attrs.password = crypted;
                return cb();
            });
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