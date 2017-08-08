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

  getLocalUrl(instance) {
    return instance.html_url.replace('https://github.com', '');  // TODO - move this to const
  }

  render() {
    var _this = this;
    var instances = this.props.instances.instances.map(function(instance, i) {
      var url = _this.getLocalUrl(instance);
      return <tr key={i}>
        <td className="text-center">{instance.number}</td>
        <td><a target="_blank" href={instance.html_url}>{instance.title}</a></td>
        <td className="text-center">{instance.state}</td>
        <td><img width="25" src={instance.user.avatar_url} /> {instance.user.login}</td>
        <td className="text-center"><Link to={url}><span className="glyphicon glyphicon-cog"></span></Link></td>
      </tr>
    });
    return(
      <div className='container-fluid instances'>
        <h1>Instances</h1>
        <hr/>
        <div className='row'>
          <div className='col-md-12'>
            <div className="widget-box">
              <div className="widget-title">
                <h3>Pull Request Instances</h3>
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
                    {instances}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Instances));
