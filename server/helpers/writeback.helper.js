/**
 * When moving to a distributed setup, this should be run separately 
 * from the server so that the logic is executed in just one place.
 */

'use strict';

var error = require('./error.helper');
var cacheConfig = require('../config/env/default').cache;
var db = require('../config/database');
var Message = db.models.message;
var CachedMessage = db.models.cachedmessage;

// Avoid multiple write back operations at one time.
var currentlyWritingBackMessageCache = false;

/**
 * Writes the message cache to the permanent store (MySQL) if there
 * are any new messages, and the now-persisted messages from the cache.
 * Protected by a "semaphore" called currentlyWritingBackMessageCache.
 */
var writeBackMessageCache = function() {
    if (currentlyWritingBackMessageCache === true) {
        return;
    }
    
    currentlyWritingBackMessageCache = true;
    CachedMessage.find()
        .then(function (cachedMessages) {
            cachedMessages.forEach(function (cachedMessage) {
                Message.create({
                    message: cachedMessage.message,
                    user: cachedMessage.userId,
                    datetime: cachedMessage.datetime
                }).exec(error.log);
                CachedMessage.destroy({ 
                    id: cachedMessage.id 
                }).exec(error.log);
            });
            currentlyWritingBackMessageCache = false;
        }).catch(function (err) {
            currentlyWritingBackMessageCache = false;
            error.log(err);
        });
}
setInterval(writeBackMessageCache, cacheConfig.writeBackIntervalMilliseconds);