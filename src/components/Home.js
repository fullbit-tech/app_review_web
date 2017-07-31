import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => ({ ...state });

class Home extends Component {

  render() {
    return(
      <div className='main'>This is the public home page</div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Home));
