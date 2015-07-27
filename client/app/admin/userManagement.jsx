'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AdminWrapper = require('./adminWrapper.jsx');
var userActions = require('../modules/user/user.actions');
var userStore = require('../modules/user/user.store');

var UserManagementComponent = React.createClass({
    
    mixins: [ Router.State, userStore.mixin ],
    
    getInitialState: function() {
        return {
            users: userStore.allUsers  
        }
    },
    
    componentDidMount: function() {
        userActions.getAllUsers();
    },
    
    render: function () {
        return (
            /* jshint ignore:start */
            <div>
                Users ({this.state.users.length}):
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Username</td>
                            <td>Role</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(function (user) {
                            return (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.role}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            /* jshint ignore:end */
        );
    },
    
    _onChange: function() {
        this.setState({
            users: userStore.allUsers
        });   
    }
});

module.exports = UserManagementComponent;