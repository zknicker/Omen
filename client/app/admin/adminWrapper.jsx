'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navbar = require('../navbar/navbar.jsx');
var userStore = require('../modules/user/user.store');
var AdminAuthentication =  require('../lib/adminAuth.mixin');
var AdminNavbar = require('./adminNavbar.jsx');
var AdminSidebar = require('./adminSidebar.jsx');

var AdminWrapper = React.createClass({

    mixins: [AdminAuthentication],

    render: function() {
        return ( 
            <div className="wrapper"> 
                <AdminNavbar />
                <AdminSidebar />
                <RouteHandler/>
            </div>
        );
    }
});

module.exports = AdminWrapper;