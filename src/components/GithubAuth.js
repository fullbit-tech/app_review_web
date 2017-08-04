import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import auth from '../actions/auth.js';
import {
  AUTHORIZE_GITHUB,
} from '../constants/actionTypes';


const mapStateToProps = state => ({...state.auth});

const mapDispatchToProps = dispatch => ({
  startAuth: (token) =>
    dispatch({ type: AUTHORIZE_GITHUB, payload: auth.github(token) })
      .then((response) => {
        window.location.replace(response.value.data.url);
      })
      .catch(error => {
        console.log(error.message);
      }
  )
});


class GithubAuth extends React.Component {

  onClick() {
    this.props.startAuth(this.props.auth.accessToken);
  }

  render() {
    return(
      <button className="btn btn-default" onClick={this.onClick.bind(this)}>Link Github</button>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GithubAuth));

