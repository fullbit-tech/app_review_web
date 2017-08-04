import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import instance from '../actions/instance.js';
import {
  LOAD_INSTANCES,
} from '../constants/actionTypes.js';


const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  onLoad: (token) => dispatch({
    type: LOAD_INSTANCES,
    payload: instance.getInstances(token),
  }),
});

class Instances extends Component {

  componentWillMount() {
    this.props.onLoad(this.props.auth.accessToken);
  }

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
