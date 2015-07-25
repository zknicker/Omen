'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var AdminSidebarItem = React.createClass({
    
    handleClick: function (event) {
        this.props.onSelect(this.props.routeName);
    },
    
    render: function () {
        var className = this.props.active ? 'selected' : null;
        
        return (
            <li className={className} onClick={this.handleClick}>
                <Link to={this.props.link}>{this.props.name}</Link>
            </li>
        );
    }
});

module.exports = AdminSidebarItem;