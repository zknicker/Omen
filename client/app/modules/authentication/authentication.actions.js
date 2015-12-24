'use strict';

import Dispatcher from '../../Dispatcher';
import {ActionType, Endpoint} from '../../constants';
import SessionStore from '../session/session.store';
import request from 'superagent';

export default {
    
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
                authorization: 'Bearer ' + SessionStore.token,
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
                authorization: 'Bearer ' + SessionStore.token,
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