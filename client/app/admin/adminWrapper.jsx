'use strict';

var React = require('react');
var Navbar = require('../navbar/navbar.jsx');
var userStore = require('../modules/user/user.store');
var AdminAuthentication =  require('../lib/adminAuth.mixin');
var AdminNavbar = require('./adminNavbar.jsx');
var AdminSidebar = require('./adminSidebar.jsx');

function AdminWrapper(WrappedComponent) {
        
    var getState = function () {
        return {
            user: userStore.getUser()
        };
    };

    return React.createClass({
        
        mixins: [AdminAuthentication, userStore.mixin],
        
        getInitialState: function () {
            return getState();
        },
    
        render: function() {
            return ( 
                <div className="wrapper"> 
                    <AdminNavbar />
                    <AdminSidebar />
                    <WrappedComponent />
                </div>
            );
        },
        
        _onChange: function () {
            this.setState(getState());
        }
    });
};

module.exports = AdminWrapper;