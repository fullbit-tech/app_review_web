import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { userIsNotAuthenticated } from 'containers/auth.js';
import RaisedButton from 'material-ui/RaisedButton';


class Home extends Component {

  render() {
    return (
      <div className="main-app-container">

        <section id="page-container" className="app-page-container">

          <div className="app-content-wrapper">
            <div className="app-content">
              <div className="full-height">
                Home Page
              </div>
            </div>

          </div>
        </section>

      </div>
    );
  }
}


module.exports = userIsNotAuthenticated(Home);
