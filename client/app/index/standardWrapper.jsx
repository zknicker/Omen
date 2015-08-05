'use strict';

var React = require('react');
var Header = require('../header/header.jsx');
var Sidebar = require('../sidebar/sidebar.jsx');
var userStore = require('../modules/user/user.store');

function StandardWrapper(WrappedComponent) {
    
    var getState = function () {
        return {
            user: userStore.getUser()
        };
    };

    return React.createClass({
        
        mixins: [userStore.mixin],
        
        getInitialState: function () {
            return getState();
        },
    
        render: function() {
            return ( 
                <div className="wrapper"> 
                    <Header />
                    <div className="page">
                        <Sidebar />
                        <div className="page-content">
                            <WrappedComponent />
                        </div>
                    </div>
                </div>
            );
        },
        
        _onChange: function () {
            this.setState(getState());
        }
    });
};

module.exports = StandardWrapper;