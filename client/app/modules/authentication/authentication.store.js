'use strict';

import Flux from '../../lib/flux';
import Dispatcher from '../../Dispatcher';
import {ActionType} from '../../constants';
import UserActions from '../user/user.actions';

let showCreateAccountFields = false;
let loginRedirectRoute = null;
let loggingIn = false;

function handleShowCreateAccountFields() {
    showCreateAccountFields = true;   
}

function handleShowLoginFields() {
    showCreateAccountFields = false;   
}

function handleLogin() {
    loggingIn = true;
}

function handleLoginSuccess(token, user) {
    localStorage.setItem('token', token);
    loginRedirectRoute = null;
    loggingIn = false;
}

function setLoginRedirectRoute({route}) {
    this.loginRedirectRoute = route;   
}

class AuthenticationStore extends Flux.Store {
    initialize() {
        this.onAction(ActionType.SET_LOGIN_REDIRECT_ROUTE, setLoginRedirectRoute);
        this.onAction(ActionType.SHOW_CREATE_ACCOUNT_FIELDS, handleShowCreateAccountFields);
        this.onAction(ActionType.SHOW_LOGIN_FIELDS, handleShowLoginFields);
        this.onAction(ActionType.LOGIN_IN_PROGRESS, handleLogin);
        this.onAction(ActionType.LOGIN_SUCCESS, handleLoginSuccess);
    }
    
    getCreateAccountFieldsStatus() {
        return showCreateAccountFields;   
    }
    
    isAuthenticated() {
        return localStorage.getItem('token') != null;
    }
    
    getToken() {
        return localStorage.getItem('token');   
    }
}

export default new AuthenticationStore(Dispatcher);