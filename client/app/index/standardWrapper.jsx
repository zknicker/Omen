'use strict';

var React = require('react');
var Header = require('../header/header.jsx');
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
                    <Header user={this.state.user} />
                    <WrappedComponent />
                </div>
            );
        },
        
        _onChange: function () {
            this.setState(getState());
        }
    });
};

module.exports = StandardWrapper;