import React, { Component } from 'react';
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
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header.js';
import Footer from './Footer.js';


const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  onLoad: (accessToken) => {
    dispatch({ type: SET_AUTH_TOKEN, accessToken });
    dispatch({
      type: LOAD_USER_DATA,
      payload: user.getUser(accessToken) }).catch(error => {
        dispatch({ type: LOGOUT });
        dispatch({ type: UNLOAD_USER_DATA });
      });
  }
});

class App extends Component {

  componentWillMount() {
    var accessToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (accessToken) {
      this.props.onLoad(accessToken);
    }
  }


  render() {
    return(
      <div className='App'>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
