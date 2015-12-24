'use strict';

let stores = [];
let changedStores = new Set();

/**
 * An implementation of a Flux store. This code has been largely inspired
 * by and lifted from discordapp.com. Fabulous implementation friends!
 */
export default class Store {
    
    /**
     * Initialize all stores.
     */
    static initializeStores() {
        stores.forEach(store => store.initialize());
    }

    /**
     * Emit changes on all stores at once.
     */
    static emitChanges() {
        changedStores.forEach(store => store.emitChange());
        changedStores.clear();
    }

    constructor(dispatcher) {
        this._changeCallbacks = new Set();
        this._actionHandlers = {};
        
        this._dispatchToken = dispatcher.register(action => {
            const handlerFunc = this._actionHandlers[action.type];
            if (handlerFunc) {
                if (handlerFunc.call(this, action) !== false) {
                    changedStores.add(this);
                }
            }
        });
        stores.push(this);
    }

    /**
     * Things to do when a store is created. Used primarily for binding
     * action handlers.
     */
    initialize() {}

    /**
     * Binds a function to an action handler.
     */
    onAction(...args) {
        const actionTypes = args.slice(0, args.length - 1);
        const handlerFunc = args[args.length - 1];
        actionTypes.forEach(actionType => {
            this._actionHandlers[actionType] = handlerFunc;
        });
    }

    /**
     * Emit a change event to update the views using the store.
     */
    emitChange() {
        this._changeCallbacks.forEach(callback => callback());
    }

    /**
     * Listen to the change event.
     */
    addChangeListener(callback) {
        this._changeCallbacks.add(callback);
    }

    /**
     * Stop listening to the change event.
     */
    removeChangeListener(callback) {
        this._changeCallbacks.delete(callback);
    }

    /**
     * Returns the String representing the dispatcher token.
     * Used for internal tracking purposes.
     */
    getDispatchToken() {
        return this._dispatchToken;
    }
}
