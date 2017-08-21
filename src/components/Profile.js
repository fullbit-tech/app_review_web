import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import user from '../actions/user';
import auth from '../actions/auth';
import {
  DEACTIVATE_USER,
  LOGOUT,
  UNLOAD_USER_DATA,
} from '../constants/actionTypes.js';


const mapStateToProps = state => ({auth: state.auth, user: state.user})

const mapDispatchToProps = dispatch => ({
  deactivateUser: (token) => {
    dispatch({
      type: DEACTIVATE_USER,
      payload: user.deactivateUser(token)})
      .then(() => {
        dispatch({ type: LOGOUT, payload: auth.logout() });
        dispatch({ type: UNLOAD_USER_DATA, });
      }
      )}
});


class Profile extends Component {
  constructor(props) {
    super(props);
  }

  deactivateUser(ev) {
    ev.preventDefault();
    if (window.confirm('Are you sure you want to deactivate this account?') === true) {
      this.props.deactivateUser(
        this.props.auth.accessToken,
      )
    }
  }

  render() {
    return(
      <div className='container-fluid profile'>
        <h1>User Profile</h1>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-danger" onClick={this.deactivateUser.bind(this)}>Deactivate Account</button>
          </div>
        </div>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
