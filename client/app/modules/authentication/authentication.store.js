'use strict';

import Flux from '../../lib/flux';
import Dispatcher from '../../Dispatcher';
import {ActionType} from '../../constants';

let loggingIn = false;

function handleLogin() {
    console.log('here');
    loggingIn = true;
}

class AuthenticationStore extends Flux.Store {
    initialize() {
        this.onAction(ActionType.LOGIN_IN_PROGRESS, handleLogin);
    }
    
    // WHY DOES ONACTION WORK?
    
    getIsLoggingIn() {
        return loggingIn;   
    }
}

export default new AuthenticationStore(Dispatcher);