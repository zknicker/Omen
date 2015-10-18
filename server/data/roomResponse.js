'use strict';

var joinRoomBroadcast = function(user, roomId) {
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

var getRoomAcknowledgement = function(error, room) {
    return {
        error: error,
        room: room
    }
}

var createRoomAcknowledgment = function(error, room) {
    return {
        error: error,
        room: room
    }
}

var listRoomsAcknowledgement = function(error, rooms) {
    return {
        error: error,
        rooms: rooms
    }
}

var departRoomBroadcast = function(userId, roomId) {
    return {
        userId: userId,
        roomId: roomId
    }
}

var departAllRoomsBroadcast = function(userId) {
    return {
        userId: userId
    }
}

var getUserListAcknowledgement = function(error, roomId, userList) {
    return {
        error: error,
        roomId: roomId,
        userList: userList
    }
}

module.exports = {
    joinRoomBroadcast: joinRoomBroadcast,
    joinRoomAcknowledgement: joinRoomAcknowledgement,
    getRoomAcknowledgement: getRoomAcknowledgement,
    createRoomAcknowledgment: createRoomAcknowledgment,
    listRoomsAcknowledgement: listRoomsAcknowledgement,
    departRoomBroadcast: departRoomBroadcast,
    departAllRoomsBroadcast: departAllRoomsBroadcast,
    getUserListAcknowledgement: getUserListAcknowledgement
};