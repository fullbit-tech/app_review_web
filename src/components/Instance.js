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
  UPDATE_FIELD_INSTANCE,
} from '../constants/actionTypes.js';
import InstanceSizeSelect from './InstanceSizeSelect.js';
import InstanceRecipeSelect from './InstanceRecipeSelect.js';
import Errors from './Errors.js';


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
  startInstance: (owner, repo, pull, token,
                  instance_size, recipe_id) => dispatch({
    type: START_INSTANCE,
    payload: instance.startInstance(
      owner, repo, pull, token, instance_size, recipe_id),
  }),
  stopInstance: (owner, repo, pull, token) => dispatch({
    type: STOP_INSTANCE,
    payload: instance.stopInstance(owner, repo, pull, 1, token),
  }),
  terminateInstance: (owner, repo, pull, token) => dispatch({
    type: TERMINATE_INSTANCE,
    payload: instance.terminateInstance(owner, repo, pull, 1, token),
  }),
  onChangeSize: (value) => dispatch({
    type: UPDATE_FIELD_INSTANCE,
    key: 'instance_size', value,
  }),
  onChangeRecipe: (value) => dispatch({
    type: UPDATE_FIELD_INSTANCE,
    key: 'recipe_id', value,
  }),
});

class Instance extends Component {
  constructor(props) {
    super(props);
    this.changeSize = ev => this.props.onChangeSize(ev.target.value);
    this.changeRecipe = ev => this.props.onChangeRecipe(ev.target.value);
  }

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
    this.props.startInstance(
      ...this.requestParams.concat([
        this.props.instance.instance.instance_size,
        this.props.instance.instance.recipe_id,
    ]));
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
        <Errors errors={this.props.instance.error} />
        <h3>{this.props.instance.title} ({this.props.instance.state})</h3>
        <div className='instance-body'>{this.props.instance.body}</div>
        <div><a target='_blank' href={this.props.instance.html_url}>View On Github</a></div>
        <div>
          <div>
            Instance Size: {<InstanceSizeSelect
              changeSize={this.changeSize}
              selected={this.props.instance.instance.instance_size}
              disabled={this.props.instance.instance.instance_state === 'running'}
            />}
            <Errors errors={this.props.instance.errors.instance_size} />
          </div>
          <div>
            Instance Recipe: {<InstanceRecipeSelect
              changeRecipe={this.changeRecipe}
              recipes={this.props.recipes}
              selected={this.props.instance.instance.recipe_id}
              disabled={this.props.instance.instance.instance_state === 'running'}
            />}
            <Errors errors={this.props.instance.errors.recipe_id} />
          </div>
          <div>Instance State: {this.props.instance.instance.instance_state || 'N/A'}</div>
          {this.props.instance.instance.instance_url ? (
            <div>
              Instance URL:
                <a href={"http://" + this.props.instance.instance.instance_url}
                   target='_blank'>{this.props.instance.instance.instance_url}</a></div>
          ) : (
            <div>Instance URL: N/A</div>
          )}
          {this.props.instance.instance.instance_state === 'running' &&
            <div>
              <button
                className='btn btn-warning btn-default'
                onClick={this.stopInstance.bind(this)}>Stop Instance
              </button>
            </div>
          }
          {this.props.instance.instance.instance_state !== 'running' &&
            <div>
              <button
                className='btn btn-primary btn-default'
                onClick={this.startInstance.bind(this)}>Start Instance
              </button>
            </div>
          }
          {this.props.instance.instance.instance_state &&
            <div>
              <button
                className='btn btn-danger btn-default'
                onClick={this.terminateInstance.bind(this)}>Terminate Instance
              </button>
            </div>
          }
        </div>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Instance));
