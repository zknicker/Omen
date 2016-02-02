'use strict';

import React from 'react';
import Flux from '../lib/flux';
import {Link, Navigation} from 'react-router';
import LandingTextInput from './landingTextInput.jsx';
import LandingButton from './landingButton.jsx';
import LandingLoginForm from './landingLoginForm.jsx';
import LandingRegisterForm from './landingRegisterForm.jsx';
import AuthenticationStore from '../modules/authentication/authentication.store';
import AuthenticationActions from '../modules/authentication/authentication.actions';

var LandingComponent = React.createClass({
    mixins: [
        Navigation,
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
    }
});

module.exports = LandingComponent;