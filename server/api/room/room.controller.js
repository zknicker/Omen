'use strict';

var db = require('../../config/database');
var Room = db.models.room;
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
                room.addUser(userId, function (err) {
                    if (err) {
                        error.log(err);
                        err = constant.get('ERROR_COULD_NOT_ADD_USER_TO_ROOM');
                    }
                    cb(err, room);   
                });
            } else {
                cb(null, room);   
            }
        })
        .catch(error.log);
    
    
    // CONVERT JOIN ROOM TO JUST ADD THE USER TO THE ROOM
    // THEN DO A SEPARATE CALL FROM CLIENT SIDE FOR ROOM INFO
    // DOING TOO MUCH AT ONCE HERE.
    //
    // FOR SOME HELP: http://stackoverflow.com/questions/28168826/how-to-count-association-size-with-waterline-sails
    // GOOD LUCK...
    /*Room.findOne({ id: roomId })
        .populate('users')
        .then(function(room) {
            room.addUser(userId, function(err) {
        console.log(room);
                if (err) {
                    error.log(err);
                    cb('Error adding user to room.', room);
                } else {
                    cb(null, room);   
                }
            });
        }).catch(error.log);*/
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