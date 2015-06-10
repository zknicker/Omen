'use strict';

var db = require('../../config/database');
var Room = db.models.room;

var createRoom = function (req, res, next) {
    var newRoom = {
        title: "Awesome Room",
        users: [2]
    };

    Room.create(newRoom).then(function(room) {
        res.json(room);
    });    
};

var getRoom = function (req, res, next) {
    Room.findOne({ id: 1 }).then(function(room) {
        res.json({ room: room });
    }); 
};

module.exports = {
    createRoom: createRoom,
    getRoom: getRoom
};