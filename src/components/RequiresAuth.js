import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => ({ ...state });


class RequiresAuth extends React.Component {

  render() {
    if (this.props.auth.accessToken) {
      return this.props.children;
    } else {
      return null;
    }
  }
}


export default withRouter(connect(mapStateToProps)(RequiresAuth));

