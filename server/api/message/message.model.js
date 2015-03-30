'use strict';

var MessageModel = function (sequelize, DataTypes) {
    var Message = sequelize.define('message', {
        content: DataTypes.STRING
    });

    return Message;
};

module.exports = MessageModel;