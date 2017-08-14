import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  SET_AUTH_TOKEN,
  LOAD_USER_DATA,
  UNLOAD_USER_DATA,
  LOGOUT,
} from '../constants/actionTypes.js';
import { TOKEN_STORAGE_KEY } from '../constants/common.js';
import user from '../actions/user.js';
import auth from '../actions/auth.js';
import LoadingIcon from './LoadingIcon.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
window.jQuery = window.$ = require('jquery/dist/jquery.min.js');
require('bootstrap/dist/js/bootstrap.min.js');


const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  setAuth: (accessToken) => {
    dispatch({ type: SET_AUTH_TOKEN, accessToken });
    dispatch({
      type: LOAD_USER_DATA,
      payload: user.getUser(accessToken) }).catch(error => {
        dispatch({ type: LOGOUT, payload: auth.logout() });
        dispatch({ type: UNLOAD_USER_DATA });
      }
    )
  }
});

class App extends React.Component {

  componentWillMount() {
    var accessToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (accessToken) {
      this.props.setAuth(accessToken);
    }
  }

  render() {
    var app;
    if (this.props.user.loading) {
      app = <LoadingIcon main={true} />;
    } else {
      app = this.props.children;
    }
    return(
      <div className='App'>{app}</div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
