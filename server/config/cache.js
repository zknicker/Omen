/**
 * Cache Configuration (redis)
 */

'use strict';

var redis = require('redis');
var client = redis.createClient();
var config = require('./env/default').cache;
var async = require('async');

client.on('error', function (err) {
    console.log('Redis error: ' + err);
});

module.exports = {

    // Store a new message at a calculated key, and store that key in our cache of message keys.
    storeNewMessage: function(value) {
        var incr = client.incr('messageincr');
        client.get('messageincr', function (err, incr) {
            if (!err) {
                var key = config.globalKeyPrefix + ':' + config.messageKeyPrefix + ':' + incr;
                client.set(key, JSON.stringify(value));
                client.lpush(config.globalKeyPrefix + ":" + config.messageKeyCacheKey, key);
            } else {
                console.log('Redis error retrieving incr in setWithIncr: ' + err);
            }
        });
    },

    // Retrieve the most recent messages stored in the cache.
    getRecentMessages: function(callback) {
        async.waterfall([
            // (1) Get the keys for the latest messages.
            function(waterfallCallback) {
                var messageKeyCacheKey = config.globalKeyPrefix + ":" + config.messageKeyCacheKey;
                client.lrange(messageKeyCacheKey, 0, -1, waterfallCallback);
            },
            // (2) Retrieve the message for each message key.
            function(messageKeys, waterfallCallback) {
                var messages = new Array(); // Array of the messages associated with the keys.
                
                // (3) Retrieve the contents of each message via parallel async operations.
                async.each(messageKeys, function(key, callback) {
                    client.get(key, function(err, value) {
                        if (!err) {
                            messages.push(value);
                            callback();
                        } else {
                            callback(err);
                        }
                    });
                // (4) All message contents retrieved. Back to the waterfall async call...
                }, function(err) {
                    waterfallCallback(err, messages);
                });
            }
        // (5) Operation complete. Log error or return.
        ], function(err, result) {
            if (err) {
                console.log('Redis error retrieving recent messages: ' + err); 
            } else {
                callback(result);  
            }
        });
    }
}