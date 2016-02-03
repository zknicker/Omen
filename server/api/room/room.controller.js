'use strict';

var db = require('../../config/database');
var Room = db.models.room;
var error = require('../../helpers/error.helper');
var constant = require('../../helpers/constants.helper');

/**
 * Create a new room.
 */
var create = function (roomTitle, cb) {
    var newRoom = {
        title: roomTitle,
        type: "public"
    };
    
    Room.create(newRoom).then(function (room) {
        cb(null, room);
    }).catch(cb);   
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
                        err = constant.get('COULD_NOT_ADD_USER_TO_ROOM');
                    }
                    cb(err, roomWithUpdate);   
                });
            } else {
                cb(null, room);   
            }
        })
        .catch(cb);
}

var getJoinableRooms = function (cb) {
    Room.find()
        .then(function(rooms) {
            cb(null, rooms);
        })
        .catch(cb);
}

var getUserList = function (roomId, cb) {
    console.log('HERE', roomId);
    Room.findOne({ id: roomId })
        .populate('users')
        .then(function(room) {
            cb(null, room.users);
        }).catch(cb);
};

module.exports = {
    create: create,
    joinRoom: joinRoom,
    getUserList: getUserList,
    getJoinableRooms: getJoinableRooms
};