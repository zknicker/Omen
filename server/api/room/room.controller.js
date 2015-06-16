'use strict';

var db = require('../../config/database');
var Room = db.models.room;

var createRoom = function (req, res, next) {
    var newRoom = {
        title: "Awesome Room"
    };
    
    Room.create(newRoom).then(function(room) {
        res.json(room);
    }).catch(next);   
};

var joinRoom = function (data, cb) {
    Room.findOne({ id: data.roomId })
        .populate('users')
        .then(function(room) {
            room.users.add(data.userId);
            room.save(cb);
            cb();
        }).catch(cb);
}

var getRoom = function (req, res, next) {
    Room.findOne({ id: 1 })
        .populate('users')
        .then(function(room) {
            res.json(room);
        }).catch(next); 
};

module.exports = {
    createRoom: createRoom,
    joinRoom: joinRoom,
    getRoom: getRoom
};