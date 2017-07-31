import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PublicHome from './PublicHome.js';
import Dashboard from './Dashboard.js';


const mapStateToProps = state => ({ ...state });

class Home extends Component {

  render() {
    if (this.props.auth.accessToken) {
      var rootHome = <Dashboard />
    }else{
      var rootHome = <PublicHome />
    }
    return(
      <div className='main'>{rootHome}</div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Home));
