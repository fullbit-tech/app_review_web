import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  SET_AUTH_TOKEN,
  LOAD_USER_DATA,
  LOGOUT,
} from '../constants/actionTypes.js';
import user from '../actions/user.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from "./Home.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Header from "./Header.js";
import Footer from "./Footer.js";


const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  onLoad: (accessToken) => {
    dispatch({ type: SET_AUTH_TOKEN, accessToken });
    dispatch({ type: LOAD_USER_DATA, payload: user.getUser() })
      .catch(error => {
        dispatch({ type: LOGOUT });
      });
  }
});

class App extends Component {

  componentWillMount() {
    var accessToken = localStorage.getItem('app_review_token');
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
