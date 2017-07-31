import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  LOGOUT,
} from '../constants/actionTypes.js';


const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
});

class Dashboard extends Component {

  render() {
    return(
      <div className='dash-board'>
        This is the logged in dashboard
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
