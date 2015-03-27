'use strict';

var React = require('react');

var IndexComponent = React.createClass({
    render: function () {
        return (
          /* jshint ignore:start */
            <div className="main-container">
              <div className="yeogurt-info">
                <h1>Welcome to Yeogurt!</h1>
                <p>
                  Take a look at the <a href="https://github.com/larsonjj/generator-yeogurt#yeogurt-generator">documentation</a> and start mixing up something awesome.
                </p>
                <p>
                  <img src="/images/yeogurt-swirl.png" width="75px" className="logo" />
                </p>
                <p className="links">
                  <a href="/docs/api/index.html">API</a>
                </p>
              </div>
            </div>
          /* jshint ignore:end */
        );
    }
});

module.exports = IndexComponent;