'use strict';

var MessageModel = function (sequelize, DataTypes) {
    var Message = sequelize.define('message', {
        
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Message;
};

module.exports = MessageModel;