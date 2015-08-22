'use strict';

var joinRoomResponse = function(user, roomId) {
    return {
        user: user,
        roomId: roomId
    }
}

var joinRoomAcknowledgement = function(user, room) {
    return {
        user: user,
        room: room
    }
}

var createRoomAcknowledgment = function(error, room) {
    return {
        error: error,
        room: room
    }
}

var listRoomsAcknowledgement = function(err, rooms) {
    return {
        error: err,
        rooms: rooms
    }
}

var departRoomResponse = function(userId) {
    return {
        userId: userId
    }
}

module.exports = {
    joinRoomResponse: joinRoomResponse,
    joinRoomAcknowledgement: joinRoomAcknowledgement,
    createRoomAcknowledgment: createRoomAcknowledgment,
    listRoomsAcknowledgement: listRoomsAcknowledgement,
    departRoomResponse: departRoomResponse
};