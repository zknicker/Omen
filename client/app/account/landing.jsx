'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var LandingTextInput = require('./landingTextInput.jsx');
var LandingButton = require('./landingButton.jsx');
var LandingLoginForm = require('./landingLoginForm.jsx');
var LandingRegisterForm = require('./landingRegisterForm.jsx');

import AuthenticationStore from '../modules/authentication/authentication.store';
import AuthenticationActions from '../modules/authentication/authentication.actions';
import Flux from '../lib/flux';

var LandingComponent = React.createClass({
    mixins: [
        Router.Navigation,
        Flux.StoreListenerMixin(AuthenticationStore)
    ],
    
    getStateFromStores() {
        return {
            showCreateAccountFields: AuthenticationStore.getCreateAccountFieldsStatus(),
            authenticated: AuthenticationStore.isAuthenticated()
        }
    },
    
    componentDidMount() {
        this.redirectIfAuthenticated();
    },
    
    componentDidUpdate() {
        this.redirectIfAuthenticated();
    },

    redirectIfAuthenticated() {
        if (this.state.authenticated) {
            this.transitionTo('rooms');
        }
    },
    
    renderTextInput: function (type, name, placeholder, labelText, props={}) {
        return (
            /* jshint ignore:start */
            <div className="landing-input group">
                <input type={type}
                    name={name}
                    ref={name}
                    id={name} 
                    placeholder={placeholder} 
                    {...props} />
                <label for={name}>{labelText}</label>
            </div>
            /* jshint ignore:end */
        );
    },
    
    render: function () {
        var form = this.state.showCreateAccountFields ? (<LandingRegisterForm />) : (<LandingLoginForm />);

        return (
            /* jshint ignore:start */
            <div className="landing">
                <div className="landing-banner"></div>
                <div className="landing-auth">
                    {form}
                </div>
                <div className="landing-whatis">
                    <h1>What is regular.club?</h1>
                    <h2>A collection of community-curated next generation chat rooms.</h2>
                    <a className="landing-whatis-scrolldown" href="#"></a>
                </div>
            </div>
            /* jshint ignore:end */
        );
    },

    handleLoginFormSubmit: function (e) {
        e.preventDefault();
        var username = React.findDOMNode(this.refs.lusername).value;
        var password = React.findDOMNode(this.refs.lpassword).value;
        AuthenticationActions.login(username, password);
    },
    
    handleRegisterFormSubmit: function (e) {
        e.preventDefault();
        var username = React.findDOMNode(this.refs.rusername).value;
        var password = React.findDOMNode(this.refs.rpassword).value;
        AuthenticationActions.register(username, password);
    }
});

module.exports = LandingComponent;