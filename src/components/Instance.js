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
  UNLOAD_INSTANCE,
} from '../constants/actionTypes.js';
import InstanceForm from './InstanceForm.js';


const mapStateToProps = state => ({
  instance: state.instance, auth: state.auth, recipes: state.recipes });

const mapDispatchToProps = dispatch => ({
  onLoad: (owner, repo, pull, token) => {
    dispatch({
      type: GET_INSTANCE,
      payload: instance.getInstance(owner, repo, pull, token)})
      .then(() => {
        dispatch({
          type: GET_RECIPES,
          payload: recipe.getRecipes(token)});
        }
      ).catch(
        (error) => {
          if (error.response.status === 404) {
            window.location.replace('/');
          }
        }
      )
  },
  unloadInstance: () => dispatch({
    type: UNLOAD_INSTANCE,
  }),
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

  componentWillUnmount() {
    this.props.unloadInstance();
  }

  startInstance(ev) {
    ev.preventDefault();
    this.props.startInstance(
      ...this.requestParams.concat([
      this.props.instance.instance.instance_size,
      this.props.instance.instance.recipe_id,
    ]));
  }

  stopInstance(ev) {
    ev.preventDefault();
    this.props.stopInstance(...this.requestParams);
  }

  terminateInstance(ev) {
    ev.preventDefault();
    if (window.confirm('Terminate instance?') === true) {
      this.props.terminateInstance(...this.requestParams);
    }
  }

  render() {
    return(
      <div className='container-fluid instance'>
        <div className="row">
          <div className="col-md-4">
            <div className="widget-box">
              <div className="widget-title">
                <h3>Pull Request</h3>
              </div>
              <div className="widget-content">
                <h4>{this.props.instance.title}</h4>
                <p>{this.props.instance.body}</p>
                <div><a target='_blank' href={this.props.instance.html_url}>View On Github</a></div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className="widget-box">
              <div className="widget-title">
                <h3>Instance</h3>
              </div>
              <div className="widget-content">
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
        </div>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Instance));
