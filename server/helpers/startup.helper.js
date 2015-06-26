/**
 * Helper that performs startup tasks on the database, cache, etc.
 */

'use strict';

var error = require('./error.helper');
var db = require('../config/database');
var Room = db.models.room;

/**
 * Clear the user lists on all rooms. This is necessary for the case
 * where the database has stale data, or the server was not properly
 * shut down.
 */
Room.update({}, { users: [] })
    .then(function (updatedRooms) {})
    .catch(error.log);