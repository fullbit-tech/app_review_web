import React from 'react';
import { connect } from 'react-redux';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import { userIsNotAuthenticated } from 'containers/auth.js';
import auth from 'actions/auth';
import user from 'actions/user';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
  LOAD_USER_DATA,
  SET_AUTH_TOKEN,
} from 'constants/ActionTypes';
import { TOKEN_STORAGE_KEY } from 'constants/Common.js';


const mapStateToProps = state => ({...state.auth});

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: auth.login(email, password) })
      .then((response) => {
        var accessToken = response.value.data.access_token;
        localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
        dispatch({ type: SET_AUTH_TOKEN, accessToken: accessToken });
        dispatch({ type: LOAD_USER_DATA, payload: user.getUser(accessToken) });
      })
      .catch(error => {
        console.log(error.message);
      }
  ),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: APPCONFIG.brand
    };
  }

  render() {
    return (
      <div className="body-inner">
        <div className="card bg-white">
          <div className="card-content">

            <section className="logo text-center">
              <h1><a href="#/">{this.state.brand}</a></h1>
            </section>

            <form ref="loginForm" onSubmit={this.props.submitForm} className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Email"
                    fullWidth
                    onChange={this.props.changeEmail}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Password"
                    type="password"
                    fullWidth
                    onChange={this.props.changePassword}
                    />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="card-action no-border text-right">
            <a onClick={this.props.submitForm} href="" className="color-primary">Login</a>
          </div>
        </div>

        <div className="additional-info">
          <a href="#/sign-up">Sign up</a>
          <span className="divider-h" />
          <a href="#/forgot-password">Forgot your password?</a>
        </div>

      </div>
    );
  }
}

class Page extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = ev => {
      ev.preventDefault();
      this.props.onSubmit(this.props.email, this.props.password);
    };
  }
  render() {
    return(
      <div className="page-login">
        <div className="main-body">
          <QueueAnim type="bottom" className="ui-animate">
            <div key="1">
              <Login
                changeEmail={this.changeEmail}
                changePassword={this.changePassword}
                submitForm={this.submitForm} />
            </div>
          </QueueAnim>
        </div>
      </div>
    )
  }
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(userIsNotAuthenticated(Page));
