'use strict';

/**
 * React mixin for triggering state updates on changes from stores.
 *
 * Credit to discord.gg.
 */
export default function (...stores) {

    return {
        componentWillMount() {
            stores.forEach(store => store.addChangeListener(this.storesDidChange));
        },

        componentWillUnmount() {
            stores.forEach(store => store.removeChangeListener(this.storesDidChange));
        },

        getInitialState() {
            return this.getStateFromStores() || {};
        },

        storesDidChange() {
            if (this.isMounted()) {
                this.setState(this.getStateFromStores() || {});
            }
        }
    };
}