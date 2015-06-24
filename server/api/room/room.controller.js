'use strict';

var db = require('../../config/database');
var Room = db.models.room;
var User = db.models.user;
var error = require('../../helpers/error.helper');
var constant = require('../../helpers/constants.helper');

/**
 * Create a new room.
 */
var createRoom = function (req, res, next) {
    var newRoom = {
        title: "Awesome Room"
    };
    
    Room.create(newRoom).then(function (room) {
        res.json(room);
    }).catch(next);   
};

/**
 * Joins a user to a room. If the user is already in the room, then
 * the user will NOT be added.
 */
var joinRoom = function (roomId, userId, cb) {
    Room.findOne({ id: roomId })
        .populate('users')
        .then(function(room) {
        
            // There's no good way to avoid duplicate adds on the
            // room's user list. So, this is a not so great way
            // to check for the user's existence in the list first.
            var users = room.toJSON().users;
            var userAlreadyAdded = false;    
            users.forEach(function (user) {
                if (user.id === userId) {
                    userAlreadyAdded = true;
                }
            });
        
            // Now, only continue with the add if needed.
            if (!userAlreadyAdded) {
                room.addUser(userId, function (err, roomWithUpdate) {
                    if (err) {
                        error.log(err);
                        err = constant.get('ERROR_COULD_NOT_ADD_USER_TO_ROOM');
                    }
                    cb(err, roomWithUpdate);   
                });
            } else {
                cb(null, room);   
            }
        })
        .catch(error.log);
}

var leaveAllRooms = function (userId, cb) {
    User.update({ id: userId }, { rooms: [] })
        .then(function (user) {
            cb(null, user);
        })
        .catch(error.log);
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
    leaveAllRooms: leaveAllRooms,
    getRoom: getRoom
};