import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GithubAuth from './GithubAuth.js';


const mapStateToProps = state => ({ ...state });


class RequiresAuth extends React.Component {

  render() {
    if (this.props.auth.accessToken) {
      if (this.props.user.user && this.props.user.user.github_verified) {
        return this.props.children;
      }else{
        return <GithubAuth />
      }
    } else {
      return null;
    }
  }
}


export default withRouter(connect(mapStateToProps)(RequiresAuth));

