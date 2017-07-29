import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes.js';
import user from '../actions/user.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from "./Home.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Header from "./Header.js";
import Content from "./Content.js";
import Footer from "./Footer.js";


const mapStateToProps = state => ({
  accessToken: state.auth.accessToken,
});

const mapDispatchToProps = dispatch => ({
  onLoad: (userData, accessToken) =>
    dispatch({type: APP_LOAD, userData, accessToken}),
});

class App extends Component {

  componentWillMount() {
    var accessToken = localStorage.getItem('app_review_token');
    this.props.onLoad(accessToken ? user.getUser() : null, accessToken);
  }


  render() {
    return(
      <div className='App'>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
