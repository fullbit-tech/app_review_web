import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import recipe from '../actions/recipe.js';
import {
  GET_RECIPE,
  GET_RECIPES,
  CREATE_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
  UPDATE_FIELD_RECIPE,
  UNLOAD_RECIPE,
} from '../constants/actionTypes.js';
import Errors from './Errors.js';


const mapStateToProps = state => ({
  auth: state.auth, recipes: state.recipes, recipe: state.recipe });

const mapDispatchToProps = dispatch => ({
  getRecipes: (token) => dispatch({
      type: GET_RECIPES,
      payload: recipe.getRecipes(token),
  }),
  getRecipe: (recipeId, token) => dispatch({
      type: GET_RECIPE,
      payload: recipe.getRecipe(recipeId, token),
  }).catch(error => {
    if (error.response.status === 404) {
      window.location.replace('/');
    }
  }),
  unloadRecipe: () => dispatch({
    type: UNLOAD_RECIPE,
  }),
  createRecipe: (token, name, script) => dispatch({
    type: CREATE_RECIPE,
    payload: recipe.createRecipe(token, name, script),
  }),
  editRecipe: (recipeId, name, script, token) => dispatch({
    type: EDIT_RECIPE,
    payload: recipe.editRecipe(recipeId, name, script, token),
  }),
  deleteRecipe: (recipeId, token) => dispatch({
    type: DELETE_RECIPE,
    payload: recipe.deleteRecipe(recipeId, token),
  }),
  onChangeScript: (value) => dispatch({
    type: UPDATE_FIELD_RECIPE,
    key: 'script', value,
  }),
  onChangeName: (value) => dispatch({
    type: UPDATE_FIELD_RECIPE,
    key: 'name', value,
  }),
});

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.changeScript = ev => this.props.onChangeScript(ev.target.value);
    this.changeName = ev => this.props.onChangeName(ev.target.value);
  }

  requestParams = [
    this.props.match.params.recipeId,
    this.props.auth.accessToken,
  ]

  componentWillMount() {
    if (this.props.match.params.recipeId) {
      this.props.getRecipe(...this.requestParams);
    }
    this.props.getRecipes(this.props.auth.accessToken);
  }

  componentWillUnmount() {
    this.props.unloadRecipe();
  }

  editRecipe(ev) {
    ev.preventDefault();
    this.props.editRecipe(
      ...this.requestParams.concat([
      this.props.recipe.name,
      this.props.recipe.script,
    ]));
  }

  createRecipe(ev) {
    ev.preventDefault();
    this.props.createRecipe(
      this.props.auth.accessToken,
      this.props.recipe.name,
      this.props.recipe.script,
    )
  }

  deleteRecipe() {
    this.props.deleteRecipe(...this.requestParams);
  }

  newRecipe() {
    this.props.history.push('/recipe');
  }

  render() {
    var recipes = this.props.recipes.map(function(recipe, i) {
      return <div key={i}><a href={"/recipe/" + recipe.id}>{recipe.name}</a></div>;
    });
    return(
      <div className='container recipe'>
        {this.props.recipe.id &&
          <Redirect to={"/recipe/" + this.props.recipe.id}/>
        }
        <div className='row'><Errors errors={this.props.recipe.error} /></div>
        <div className="row">
          <div className='col-md-6'>
            <h3>Recipes</h3>
            {recipes}
            <button className='btn btn-default' onClick={this.newRecipe.bind(this)} >New Recipe</button>
          </div>
          <div className="col-md-6">
            <form id='recipe-form' onSubmit={this.props.recipe.id ? this.editRecipe.bind(this) : this.createRecipe.bind(this)}>
              <Errors error={this.props.recipe.error} />
              <div className={'form-group'}>
                <label htmlFor='recipe_name'>Name:</label>
                <input className={'form-control' + (this.props.recipe.errors.name ? ' has-error' : '')} onChange={this.changeName} value={this.props.recipe.name || ''} required  type='text' name='recipe_name' id='recipe_name' />
                <Errors errors={this.props.recipe.errors.name}/>
              </div>
              <div  className={'form-group'}>
                <label htmlFor='recipe_script'>Script:</label>
                <textarea rows='20' className={'form-control' + (this.props.recipe.errors.script ? ' has-error' : '')} onChange={this.changeScript} value={this.props.recipe.script || ''} required name='recipe_script' id='recipe_script'/>
                <Errors errors={this.props.recipe.errors.script}/>
              </div>
              <div className='form-group'>
                <input className='btn btn-default' type='submit' name='submit' value='Save' id='submit' />
                {this.props.recipe.id &&
                  <button onClick={this.deleteRecipe.bind(this)} className="btn btn-danger pull-right">Delete</button>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipe));
