'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var SidebarItem = React.createClass({
    
    handleClick: function (event) {
        this.props.onSelect(this.props.routeName);
    },
    
    render: function () {
        var className = 'sidebar-list-item';
        
        if (this.props.active) {
            className += ' selected';    
        }
        
        return (
            <li className={className} onClick={this.handleClick}>
                <Link to={this.props.link}>{this.props.name}</Link>
            </li>
        );
    }
});

module.exports = SidebarItem;