import React from "react";
import { connect } from 'react-redux';
import auth from "../actions/auth";
import Errors from "./Errors.js";
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';


const mapStateToProps = state => ({...state.auth});

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: auth.login(email, password) })
      .catch(error => {
        console.log(error.message);
      }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    return(
      <form id="login" method="post" onSubmit={this.submitForm(email, password)}>
        <Errors error={this.props.error} />
        <div className={"form-group"}>
          <input className={"form-control" + (this.props.errors.email ? " has-error" : "")} onChange={this.changeEmail} required placeholder="email" type="email" name="email" id="email" />
          <Errors errors={this.props.errors.email}/>
        </div>
        <div  className={"form-group"}>
          <input className={"form-control" + (this.props.errors.password ? " has-error" : "")} onChange={this.changePassword} required  placeholder="password" type="password" name="password" id="password" />
          <Errors errors={this.props.errors.password}/>
        </div>
        <div className="form-group"><input className="btn btn-default" type="submit" name="submit" value="Login" id="submit" /></div>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
