import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import instance from '../actions/instance.js';
import {
  GET_INSTANCES,
} from '../constants/actionTypes.js';


const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  getInstances: (token) => dispatch({
    type: GET_INSTANCES,
    payload: instance.getInstances(token),
  }),
});

class Instances extends Component {

  componentWillMount() {
    this.props.getInstances(this.props.auth.accessToken);
  }

  getLocalUrl(pull_request) {
    return pull_request.html_url.replace('https://github.com', '');
  }

  render() {
    var _this = this;
    var instances = this.props.instances.instances.map(function(instance, i) {
      var pull_requests = instance.pull_requests.map(function(pull_request, j) {
        var url = _this.getLocalUrl(pull_request);
        return <tr key={j}>
          <td className="text-center">{pull_request.number}</td>
          <td><a target="_blank" href={pull_request.html_url}>{pull_request.title}</a></td>
          <td className="text-center">{pull_request.state}</td>
          <td><img width="25" alt='avatar' src={pull_request.user.avatar_url} /> {pull_request.user.login}</td>
          <td className="text-center"><Link to={url}><span className="glyphicon glyphicon-cog"></span></Link></td>
        </tr>
      });
      return (
      <div key={i} className='row'>
        <div className='col-md-12'>
          <div className="widget-box">
            <div className="widget-title">
              <h3>{instance.respository_link.owner}/{instance.respository_link.repository}</h3>
            </div>
            <div className="todo widget-content nopadding">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Created By</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {pull_requests}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return(
      <div className='container-fluid instances'>
        <h1>Instances</h1>
        <hr/>
        {instances}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Instances));
