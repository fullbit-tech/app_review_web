import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => ({ ...state });


class Public extends React.Component {

  render() {
    if (!this.props.auth.accessToken) {
        return <div className="public container">{this.props.children}</div>
    } else {
      return null;
    }
  }
}

export default withRouter(connect(mapStateToProps)(Public));
