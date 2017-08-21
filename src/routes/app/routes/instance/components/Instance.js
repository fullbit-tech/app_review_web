import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import instance from 'actions/instance.js';
import recipe from 'actions/recipe.js';
import {
  GET_INSTANCES,
  GET_RECIPES,
  START_INSTANCE,
  STOP_INSTANCE,
  TERMINATE_INSTANCE,
  UPDATE_FIELD_INSTANCE,
  UNLOAD_INSTANCE,
} from 'constants/ActionTypes.js';
import InstanceForm from './InstanceForm.js';
import QueueAnim from 'rc-queue-anim';
import CircularProgress from 'material-ui/CircularProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';


const mapStateToProps = state => ({
  instances: state.instances, auth: state.auth, recipes: state.recipes });

const mapDispatchToProps = dispatch => ({
  getInstances: (token) => dispatch({
    type: GET_INSTANCES,
    payload: instance.getInstances(token),
  }),
  getRecipes: (token) => dispatch({
    type: GET_RECIPES,
    payload: recipe.getRecipes(token),
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
  onChangeSize: (instanceId, value) => dispatch({
    type: UPDATE_FIELD_INSTANCE,
    key: 'instance_size', value, instanceId,
  }),
  onChangeRecipe: (instanceId, value) => dispatch({
    type: UPDATE_FIELD_INSTANCE,
    key: 'recipe_id', value, instanceId,
  }),
});


class InstanceSizeSelect extends React.Component {

  instanceSizes = [
    'small',
    'medium',
    'large',
  ];

  render(){
    var options = this.instanceSizes.map((size) =>
        <option value={size} key={size}>{size}</option>
      );
    return(
      <select
        className="form-control col-md-4"
        onChange={this.props.onChange}
        value={this.props.value || ''}
        disabled={this.props.disabled} >
          <option value=''>--</option>
          {options}
      </select>
    );
  };
}


class InstanceRecipeSelect extends React.Component {

  render(){
    var options = this.props.recipes.map((recipe) =>
        <option value={recipe.id} key={recipe.id}>{recipe.name}</option>
      );
    return(
      <select
        className="form-control col-md-4"
        onChange={this.props.onChange}
        value={this.props.value || ''}
        disabled={this.props.disabled} >
          <option value=''>--</option>
          {options}
      </select>
    );
  };
}


class PullRequestInfo extends Component {

  stateClass(state) {
    return 'state-' + state;
  }

  powerClass(state) {
    return 'power-' + state;
  }

  render() {
    var powerIcon = <i className={"material-icons"}>settings_power</i>;
    var terminateIcon = <i className={"material-icons"}>delete_forever</i>;
    return(
      <div className="box box-default">
        <div className="box-header">
          <a href="#">{this.props.repo.owner + '/' + this.props.repo.repository}</a>
          <h5>{this.props.pullRequest.title} #{this.props.pullRequest.number}</h5><br/>
          <img width="25" src={this.props.owner.avatar_url} alt="owner" /> <a href={this.props.owner.html_url}>{this.props.owner.login}</a>
          <hr />
          <br />
        </div>
        <div className="box-body">
          <div className="form-group">
            <label htmlFor="sizeField">Instance State: </label>
            {this.props.instance.loading ? (
              <LinearProgress />
            ) : (
              <div className={this.stateClass(this.props.instance.instance_state)} >{this.props.instance.instance_state}</div>
            )}
            <br />
          </div>
          {this.props.instance.instance_state === 'running' &&
            <div className="form-group">
              <label htmlFor="sizeField">Instance URL: </label>
              <div><a href={'http://' + this.props.instance.instance_url} target="_blank">{this.props.instance.instance_url}</a></div>
              <br />
            </div>
          }
          <div className="form-group">
            <label htmlFor="sizeField">Instance Size</label>
            <InstanceSizeSelect
              value={this.props.instance.instance_size}
              onChange={this.props.changeSize}
              disabled={this.props.instance.instance_state === 'running' || this.props.instance.loading} />
            <br />
          </div>
          <div className="form-group">
            <label htmlFor="recipeField">Recipe</label>
            <InstanceRecipeSelect
              recipes={this.props.recipes}
              value={this.props.instance.recipe_id}
              onChange={this.props.changeRecipe}
              disabled={this.props.instance.instance_state === 'running' || this.props.instance.loading} />
            <br />
          </div>
          {this.props.instance.instance_state === 'running' &&
            <RaisedButton className={this.powerClass(this.props.instance.instance_state)} onClick={this.props.stopInstance} label="Stop Instance" labelPosition="before" default icon={powerIcon} />
          }
          {this.props.instance.instance_state !== 'running' &&
            <RaisedButton className={this.powerClass(this.props.instance.instance_state)} onClick={this.props.startInstance} label="Start Instance" labelPosition="before" default icon={powerIcon} />
          }
          <br /><br />
          {this.props.instance.instance_state !== 'terminated' && this.props.instance.instance_state !== 'dormant' &&
            <RaisedButton className="action-terminate" onClick={this.props.terminateInstance} label="Terminate Instance" labelPosition="before" default icon={terminateIcon} />
          }
        </div>
      </div>
    );
  }
}

class InstanceSettings extends Component {
  render() {
    return(
      <div className="box box-default">
        <div className="box-header">Instance</div>
        <div className="box-body">
          Instance stuff here
        </div>
      </div>
    );
  }
}

class Instance extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getInstances(this.props.auth.accessToken);
    this.props.getRecipes(this.props.auth.accessToken);
  }

  changeSize(instance, ev) {
    this.props.onChangeSize(instance.id, ev.target.value);
  }

  changeRecipe(instance, ev) {
    this.props.onChangeRecipe(instance.id, ev.target.value);
  }

  startInstance(instance, ev) {
    ev.preventDefault();
    if (!instance.loading) {
      this.props.startInstance(instance, this.props.auth.accessToken);
    }
  }

  stopInstance(instance, ev) {
    ev.preventDefault();
    if (!instance.loading) {
      this.props.stopInstance(instance, this.props.auth.accessToken);
    }
  }

  terminateInstance(instance, ev) {
    ev.preventDefault();
    if (!instance.loading) {
      this.props.terminateInstance(instance, this.props.auth.accessToken);
    }
  }

  render() {
    var pullRequest, instance, repo, owner;
    pullRequest = this.props.instances.pullRequests[this.props.params.instanceId];
    if (pullRequest) {
      instance = this.props.instances.instances[pullRequest.instance];
      repo = this.props.instances.repositories[instance.repository_link];
      owner = this.props.instances.pullRequestOwners[pullRequest.user];
    }
    return(
      <div className="container-fluid no-breadcrumbs page-instance">
        <QueueAnim type="bottom" className="ui-animate">
          {!instance ? (
            <div className="row">
              <div className="col-xl-2 offset-xl-5 app-page-loading"><CircularProgress thickness={6} size={150}/></div>
            </div>
          ) : (
            <div className="row">
              <div className="col-xl-12">
                <PullRequestInfo
                  recipes={this.props.recipes}
                  instance={instance}
                  changeSize={this.changeSize.bind(this, instance)}
                  changeRecipe={this.changeRecipe.bind(this, instance)}
                  startInstance={this.startInstance.bind(this, instance)}
                  stopInstance={this.stopInstance.bind(this, instance)}
                  terminateInstance={this.terminateInstance.bind(this, instance)}
                  owner={owner}
                  repo={repo}
                  pullRequest={pullRequest} />
              </div>
            </div>
          )}
        </QueueAnim>
      </div>
    );
  }
}


module.exports = withRouter(connect(mapStateToProps, mapDispatchToProps)(Instance));
