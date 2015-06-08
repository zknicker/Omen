var events = require('events');
var eventEmitter = new events.EventEmitter();

module.exports = {
    /**
     * Respond to an event. The callback function receives an
     * argument with the data passed via the event.
     */
    on: function(event, cb) {
        eventEmitter.on(event, cb);
    },
    
    /**
     * Emit an event with data.
     */
    emit: function(event, data) {
        eventEmitter.emit(event, data);
    }
};