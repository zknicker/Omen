'use strict';

import {Dispatcher} from 'flux';
import Flux from './lib/flux';

class ImprovedDispatcher extends Dispatcher {

    /** 
     * Every time the dispatcher finishes, hook into it to emit
     * changes from our stores. This way, we don't need to do manual
     * emits in each store method.
     */
    _stopDispatching(...args) {
        try {
            Flux.Store.emitChanges();
        } finally {
            super._stopDispatching(...args);
        }
    }
}

export default new ImprovedDispatcher;