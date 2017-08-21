import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  SET_AUTH_TOKEN,
  LOAD_USER_DATA,
  UNLOAD_USER_DATA,
  SET_APP_LOADED,
  LOGOUT,
} from 'constants/ActionTypes.js';
import { TOKEN_STORAGE_KEY } from 'constants/Common.js';
import user from 'actions/user.js';
import auth from 'actions/auth.js';


const mapStateToProps = (state, ownProps) => ({
  app: state.app,
});

const mapDispatchToProps = dispatch => ({
  setAuth: (accessToken) => {
    dispatch({ type: SET_AUTH_TOKEN, accessToken });
    dispatch({
      type: LOAD_USER_DATA,
      payload: user.getUser(accessToken) })
      .then( () => {
        dispatch({ type: SET_APP_LOADED });
      })
      .catch(error => {
        dispatch({ type: LOGOUT, payload: auth.logout() });
        dispatch({ type: UNLOAD_USER_DATA });
      }
    )
  },
  setAppLoaded: () => dispatch({ type: SET_APP_LOADED }),
});


class AppLoader extends Component {

  componentWillMount() {
    var accessToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (accessToken) {
      this.props.setAuth(accessToken);
    } else {
      this.props.setAppLoaded();
    }
  }

  render() {
    if (this.props.app.loading) {
      return <div></div>;
    } else {
      return <div>{this.props.children}</div>;
    }
  }
}


module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(AppLoader);
