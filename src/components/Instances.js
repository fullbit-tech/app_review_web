import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  LOGOUT,
} from '../constants/actionTypes.js';


const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
});

class Instances extends Component {

  render() {
    return(
      <div className='instances'>
        list all the instances here
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Instances));
