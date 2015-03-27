/**
 * Console Configuration
 */

// Configure the console logging method to provide info about where it's
// been called from.
['log', 'warn'].forEach(function (method) {
    var old = console[method];
    console[method] = function () {
        var stack = (new Error()).stack.split(/\n/);
        // Chrome includes a single "Error" line, FF doesn't.
        if (stack[0].indexOf('Error') === 0) {
            stack = stack.slice(1);
        }
        var args = [].slice.apply(arguments).concat([stack[1].trim()]);
        return old.apply(console, args);
    };
});

// Enable console colors.
require('colors');