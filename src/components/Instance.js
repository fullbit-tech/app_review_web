import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import instance from '../actions/instance.js';
import recipe from '../actions/recipe.js';
import {
  GET_INSTANCE,
  GET_RECIPES,
  START_INSTANCE,
  STOP_INSTANCE,
  TERMINATE_INSTANCE,
} from '../constants/actionTypes.js';
import InstanceSizeSelect from './InstanceSizeSelect.js';
import InstanceRecipeSelect from './InstanceRecipeSelect.js';


const mapStateToProps = state => ({
  instance: state.instance, auth: state.auth, recipes: state.recipes });

const mapDispatchToProps = dispatch => ({
  onLoad: (owner, repo, pull, token) => {
    dispatch({
      type: GET_INSTANCE,
      payload: instance.getInstance(owner, repo, pull, token)});
    dispatch({
      type: GET_RECIPES,
      payload: recipe.getRecipes(token)});
  },
  startInstance: (owner, repo, pull, token) => dispatch({
    type: START_INSTANCE,
    payload: instance.startInstance(owner, repo, pull, 1, token),
  }),
  stopInstance: (owner, repo, pull, token) => dispatch({
    type: STOP_INSTANCE,
    payload: instance.stopInstance(owner, repo, pull, 1, token),
  }),
  terminateInstance: (owner, repo, pull, token) => dispatch({
    type: TERMINATE_INSTANCE,
    payload: instance.terminateInstance(owner, repo, pull, 1, token),
  }),
});

class Instance extends Component {
  requestParams = [
        this.props.match.params.owner,
        this.props.match.params.repo,
        this.props.match.params.pullNumber,
        this.props.auth.accessToken,
  ];

  componentWillMount() {
    this.props.onLoad(...this.requestParams);
  }

  startInstance() {
    this.props.startInstance(...this.requestParams);
  }

  stopInstance() {
    this.props.stopInstance(...this.requestParams);
  }

  terminateInstance() {
    this.props.terminateInstance(...this.requestParams);
  }

  render() {
    return(
      <div className='instance'>
        <h3>{this.props.instance.title} ({this.props.instance.state})</h3>
        <div className='instance-body'>{this.props.instance.body}</div>
        <div><a target='_blank' href={this.props.instance.html_url}>View On Github</a></div>
        <div>
          <div>Instance Size: {<InstanceSizeSelect selected={this.instance.instance.instance_size} enabled={this.instance.state !== 'running'} />}</div>
          <div>Instance Recipe: {<InstanceRecipeSelect recipes={this.props.recipes} selected={this.instance.instance.recipe} enabled={this.props.instance.state !== 'running'} />}</div>
          <div>Instance State: {this.props.instance.instance.instance_state || 'N/A'}</div>
          {this.props.instance.instance.instance_url ? (
            <div>Instance URL: <a href={"http://" + this.props.instance.instance.instance_url} target='_blank'>{this.props.instance.instance.instance_url}</a></div>
          ) : (
            <div>Instance URL: N/A</div>
          )}
          {this.props.instance.instance.instance_state === 'running' &&
            <div><button className='btn btn-warning btn-default' onClick={this.stopInstance.bind(this)}>Stop Instance</button></div>
          }
          {this.props.instance.instance.instance_state !== 'running' &&
            <div><button className='btn btn-primary btn-default' onClick={this.startInstance.bind(this)}>Start Instance</button></div>
          }
          {this.props.instance.instance.instance_state &&
            <div><button className='btn btn-danger btn-default' onClick={this.terminateInstance.bind(this)}>Terminate Instance</button></div>
          }
        </div>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Instance));
