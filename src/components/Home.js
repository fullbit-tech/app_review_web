import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login.js';
import Register from './Register.js';


const mapStateToProps = state => ({ ...state });

class Home extends Component {

  render() {
    return(
      <div className="row">
        <Login/>
        <Register/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Home));
