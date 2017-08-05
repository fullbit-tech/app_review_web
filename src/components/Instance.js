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
import InstanceForm from './InstanceForm.js';


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
      <div className='container instance'>
        <div className='row'><Errors errors={this.props.instance.error} /></div>
        <div className="row">
          <div className="col-md-6">
            <h3>{this.props.instance.title} ({this.props.instance.state})</h3>
            <div className='instance-body'>{this.props.instance.body}</div>
            <div><a target='_blank' href={this.props.instance.html_url}>View On Github</a></div>
          </div>
          <div className='col-md-6'>
            <InstanceForm
              instance={this.props.instance}
              recipes={this.props.recipes}
              stopInstance={this.stopInstance.bind(this)}
              startInstance={this.startInstance.bind(this)}
              terminateInstance={this.terminateInstance.bind(this)}
              changeSize={this.changeSize}
              changeRecipe={this.changeRecipe}
            />
          </div>
        </div>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Instance));
