import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GithubAuth from './GithubAuth.js';


const mapStateToProps = state => ({ ...state });


class RequiresAuth extends React.Component {

  render() {
    if (this.props.auth.accessToken) {
      if (this.props.user.user && this.props.user.user.github_verified) {
        return <div>{this.props.children}</div>
      }else{
        return <GithubAuth />
      }
    } else {
      return <Redirect to=""/>
    }
  }
}


export default withRouter(connect(mapStateToProps)(RequiresAuth));

