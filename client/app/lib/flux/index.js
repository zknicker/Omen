'use strict';

import Store from './Store';
import StoreListenerMixin from './storeListenerMixin';

export default {
    Store: Store,
    StoreListenerMixin: StoreListenerMixin,

    initialize() {
        Store.initializeStores();
    }
};
