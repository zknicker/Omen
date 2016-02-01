'use strict';

import Dispatcher from '../../Dispatcher';
import {ActionType, Endpoint} from '../../constants';
import AuthenticationStore from '../authentication/authentication.store';
import request from 'superagent';

export default {
    
    /**
     * Switch the landing page to the create account form.
     */
    showCreateAccountFields: function () {
        Dispatcher.dispatch({ 
            type: ActionType.SHOW_CREATE_ACCOUNT_FIELDS 
        });  
    },
    
    /**
     * Switch the landing page to the login form.
     */
    showLoginFields: function () {
        Dispatcher.dispatch({ 
            type: ActionType.SHOW_LOGIN_FIELDS 
        });  
    },
    
    /**
     * Sets the route that the user should be redirected to
     * after a successful login.
     */
    setLoginRedirectRoute: function (route) {
        Dispatcher.dispatch({
            type: ActionType.SET_LOGIN_REDIRECT_ROUTE,
            route: route
        });
    },
    
    /**
     * Register a new user to the application.
     */
    register: function (username, password) {
        Dispatcher.dispatch({ 
            type: ActionType.REGISTER_IN_PROGRESS 
        });
        
        request
            .post(Endpoint.REGISTER)
            .send({
                authorization: 'Bearer ' + AuthenticationStore.getToken(),
                username: username,
                password: password
            })
            .end(function (res) {
                    console.log(res);
                if (res.ok) {
                    // Elsewhere: sessionActions.setAuthToken(res.body.token);
                    // Elsewhere: socket.authenticate(res.body.token);
                    // Elsewhere: userData = res.body.user;
                    // Elsewhere: userData.loggedIn = true;
                    // Elsewhere: self.setUser(userData);
                    Dispatcher.dispatch({ 
                        type: ActionType.REGISTER_SUCCESS, 
                        token: res.body.token, 
                        user: res.body.user
                    });
                } else {
                    Dispatcher.dispatch({ 
                        type: ActionType.REGISTER_FAILURE 
                    });
                }
            });
    },
    
    /**
     * Login a user to the application.
     */
    login: function (username, password) {
        Dispatcher.dispatch({ 
            type: ActionType.LOGIN_IN_PROGRESS 
        });
        
        request
            .post(Endpoint.LOGIN)
            .send({
                authorization: 'Bearer ' + AuthenticationStore.getToken(),
                username: username,
                password: password
            })
            .end(function (res) {
                if (res.ok) {
                    Dispatcher.dispatch({ 
                        type: ActionType.LOGIN_SUCCESS, 
                        token: res.body.token, 
                        user: res.body.user
                    });
                } else {
                    Dispatcher.dispatch({ 
                        type: ActionType.LOGIN_FAILURE 
                    });
                }
            });
    }
};