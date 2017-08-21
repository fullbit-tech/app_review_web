import React from 'react';
import QueueAnim from 'rc-queue-anim';
import InstanceControls from './InstanceControls';
import { connect } from 'react-redux';
import instance from 'actions/instance.js';
import {
  GET_INSTANCES,
  START_INSTANCE,
  STOP_INSTANCE,
  TERMINATE_INSTANCE,
} from 'constants/ActionTypes.js';
import CircularProgress from 'material-ui/CircularProgress';


const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  getInstances: (token) => dispatch({
    type: GET_INSTANCES,
    payload: instance.getInstances(token),
  }),
  startInstance: (inst, token) => dispatch({
    type: START_INSTANCE,
    payload: instance.startInstance(inst, token),
    meta: {instance: inst},
  }),
  stopInstance: (inst, token) => dispatch({
    type: STOP_INSTANCE,
    payload: instance.stopInstance(inst, token),
    meta: {instance: inst},
  }),
  terminateInstance: (inst, token) => dispatch({
    type: TERMINATE_INSTANCE,
    payload: instance.terminateInstance(inst, token),
    meta: {instance: inst},
  }),
});

class RepositoryInstances extends React.Component {
  render() {
    return(
      <div className="box box-default">
        <div className="box-header">
          {this.props.repository.owner + '/' + this.props.repository.repository}
        </div>
        <div className="box-body">
          <InstanceControls
            stopInstance={this.props.stopInstance}
            startInstance={this.props.startInstance}
            terminateInstance={this.props.terminateInstance}
            repository={this.props.repository}
            instances={this.props.instances}
            pull_requests={this.props.pull_requests}
            pullRequestOwners={this.props.pullRequestOwners} />
        </div>
      </div>
    );
  }
}

class InstancesContainer extends React.Component {
  componentWillMount() {
    this.props.getInstances(this.props.auth.accessToken);
  }

  startInstance(instance) {
    if (!instance.loading) {
      this.props.startInstance(instance, this.props.auth.accessToken);
    }
  }

  stopInstance(instance) {
    if (!instance.loading) {
      this.props.stopInstance(instance, this.props.auth.accessToken);
    }
  }

  terminateInstance(instance) {
    if (!instance.loading) {
      this.props.terminateInstance(instance, this.props.auth.accessToken);
    }
  }

  render() {
    var _this = this;
    var controls = Object.keys(this.props.instances.repositories).map(function(key, i) {
      return(
        <RepositoryInstances key={i}
          stopInstance={_this.stopInstance.bind(_this)}
          startInstance={_this.startInstance.bind(_this)}
          terminateInstance={_this.terminateInstance.bind(_this)}
          repository={_this.props.instances.repositories[key]}
          instances={_this.props.instances.instances}
          pull_requests={_this.props.instances.pullRequests}
          pullRequestOwners={_this.props.instances.pullRequestOwners} />
      );
    });
    return(
      <div className="row">
      {this.props.instances.loading ? (
        <div className="col-xl-2 offset-xl-5 app-page-loading"><CircularProgress thickness={6} size={150}/></div>
      ) : (
        <div className="col-xl-12">{controls}</div>
      )}
      </div>
    );
  }
}

const Instances = connect(mapStateToProps, mapDispatchToProps)(InstancesContainer);


class InstancesPage extends React.Component {
  render() {
    return(
      <div className="container-fluid no-breadcrumbs page-instances">
        <QueueAnim type="bottom" className="ui-animate">
          <Instances />
        </QueueAnim>
      </div>
    );
  }
}


module.exports = {
  InstancesPage: InstancesPage,
  Instances: Instances,
}
