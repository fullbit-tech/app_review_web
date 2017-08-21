import React, { Component } from 'react';
import { hashHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import recipe from 'actions/recipe.js'
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/sh';
import 'brace/theme/github';
import {
  GET_RECIPE,
  GET_RECIPES,
  CREATE_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
  UPDATE_FIELD_RECIPE,
  UPDATE_FIELD_RECIPE_VAR,
  UNLOAD_RECIPE,
  ADD_NEW_RECIPE_VAR,
  REMOVE_RECIPE_VAR,
  GET_RECIPE_DROP_INS,
} from 'constants/ActionTypes.js';
import Errors from 'components/forms/Errors';
import RaisedButton from 'material-ui/RaisedButton';
import QueueAnim from 'rc-queue-anim';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';


const styles = {
  chip: {
    margin: 4,
    cursor: 'grab',
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const mapStateToProps = state => ({
  recipeDropIns: state.recipeDropIns,
  auth: state.auth,
  recipes: state.recipes,
  recipe: state.recipe,
});

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
      hashHistory.push('/404');
    }
  }),
  getRecipeDropIns: (token) => dispatch({
    type: GET_RECIPE_DROP_INS,
    payload: recipe.getRecipeDropIns(token),
  }),
  unloadRecipe: () => dispatch({
    type: UNLOAD_RECIPE,
  }),
  createRecipe: (token, name, script, variables) => dispatch({
    type: CREATE_RECIPE,
    payload: recipe.createRecipe(token, name, script, variables),
  }).then(() => {
    dispatch({
      type: GET_RECIPES,
      payload: recipe.getRecipes(token)
    });
  }),
  editRecipe: (recipeId, token, name, script, variables) => dispatch({
    type: EDIT_RECIPE,
    payload: recipe.editRecipe(recipeId, name, script, variables, token),
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
  onChangeVarName: (index, value) => dispatch({
    type: UPDATE_FIELD_RECIPE_VAR,
    key: 'name', index, value,
  }),
  onChangeVarValue: (index, value) => dispatch({
    type: UPDATE_FIELD_RECIPE_VAR,
    key: 'value', index, value,
  }),
  addVar: () => dispatch({
    type: ADD_NEW_RECIPE_VAR,
  }),
  removeVar: (index) => dispatch({
    type: REMOVE_RECIPE_VAR,
    index,
  }),
});

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.changeScript = v => this.props.onChangeScript(v);
    this.changeName = ev => this.props.onChangeName(ev.target.value);
    this.changeVarName = (index, ev) => this.props.onChangeVarName(index, ev.target.value);
    this.changeVarValue = (index, ev) => this.props.onChangeVarValue(index, ev.target.value);
  }

  componentWillMount() {
    if (this.props.params.recipeId) {
      this.props.getRecipe(this.props.params.recipeId,
                           this.props.auth.accessToken)
    }
    this.props.getRecipes(this.props.auth.accessToken);
    this.props.getRecipeDropIns(this.props.auth.accessToken);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.recipeId &&
        nextProps.params.recipeId !== this.props.params.recipeId) {
      this.props.getRecipe(
        nextProps.params.recipeId,
        nextProps.auth.accessToken,
      );
    }
    if (nextProps.recipe.deleted === true) {
      this.props.unloadRecipe();
      this.props.getRecipes(this.props.auth.accessToken);
      hashHistory.push('/app/recipes');
    }
    if (!nextProps.params.recipeId && nextProps.recipe.id) {
      this.props.unloadRecipe();
    }
  }

  componentWillUnmount() {
    this.props.unloadRecipe();
  }

  editRecipe(ev) {
    ev.preventDefault();
    this.props.editRecipe(
      this.props.params.recipeId,
      this.props.auth.accessToken,
      this.props.recipe.name,
      this.props.recipe.script,
      this.props.recipe.variables,
    )
  }

  createRecipe(ev) {
    ev.preventDefault();
    this.props.createRecipe(
      this.props.auth.accessToken,
      this.props.recipe.name,
      this.props.recipe.script,
      this.props.recipe.variables,
    )
  }

  deleteRecipe(ev) {
    ev.preventDefault();
    if (window.confirm('Delete recipe?') === true) {
      this.props.deleteRecipe(
        this.props.params.recipeId,
        this.props.auth.accessToken,
      )
    }
  }

  addVar(ev) {
    ev.preventDefault();
    this.props.addVar();
  }

  removeVar(index, ev) {
    ev.preventDefault();
    this.props.removeVar(index);
  }

  drag(script, ev) {
    ev.dataTransfer.setData("text", script);
  }

  render() {
    var _this = this;
    var variables = [];

    var recipes = this.props.recipes.map(function(recipe, i) {
      return <li key={i}>
        <div className="txt"><a href={'/#/app/recipes/' + recipe.id}>{recipe.name}</a></div>
      </li>
    });

    variables = this.props.recipe.variables.map(function(recipeVar, i) {
      var errors = {};
      if (_this.props.recipe.errors.variables[i]) {
        errors = _this.props.recipe.errors.variables[i]
      }
      return(<div className="recipe-variables row" key={i}>
        <div className={"col-md-5" + (errors.name && errors.name.length > 0 ? ' has-danger' : '')}>
          <label>Name:</label>
          <input onChange={_this.changeVarName.bind(_this, i)} className='form-control' value={recipeVar.name || ''} type='text' />
          <Errors errors={errors.name}/>
        </div>
        <div className={"col-md-5" + (errors.name && errors.name.length > 0 ? ' has-danger' : '')}>
          <label>Value:</label>
          <input onChange={_this.changeVarValue.bind(_this, i)} className='form-control' value={recipeVar.value || ''} type='text' />
          <Errors errors={errors.value}/>
        </div>
        <div className="col-md-2">
          <button onClick={_this.removeVar.bind(_this, i)} className="btn btn-danger">Remove</button>
        </div>
        <br /></div>);
    });
    var dropIns = this.props.recipeDropIns.map(function(dropIn, i) {
      return(
        <Chip style={styles.chip} className="drop-in" key={i} draggable="true" onDragStart={_this.drag.bind(this, dropIn.script)}>
          <Avatar>
            <i className="material-icons">code</i>
          </Avatar>
          {dropIn['name']}
        </Chip>
      );
    });
    return(
      <div className="container-fluid no-breadcrumbs page-recipes">
        <QueueAnim type="bottom" className="ui-animate">
          <div className="row">
            <div className='col-xl-4'>
              <div className="box box-default">
                <div className="box-header">
                  Your Recipes
                </div>
                <div className="box-body">
                  <ul>{recipes}</ul>
                  {this.props.recipe.id &&
                    <RaisedButton labelPosition="before" icon={<ContentAdd/>} href="/#/app/recipes" label="Create New" />
                  }
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="box box-default">
                <div className="box-header">
                  {this.props.recipe.id ? (
                    <span>Edit Recipe</span>
                  ) : (
                    <span>New Recipe</span>
                  )}
                </div>
                <div className="box-body">
                  <form id='recipe-form' onSubmit={this.props.recipe.id ? this.editRecipe.bind(this) : this.createRecipe.bind(this)}>
                    <div className={'form-group' + (this.props.recipe.errors.name.length > 0 ? ' has-danger' : '')}>
                      <label htmlFor='recipe_name'>Name:</label>
                      <input className='form-control col-md-5' onChange={this.changeName} value={this.props.recipe.name || ''} type='text' name='recipe_name' id='recipe_name' />
                      <Errors errors={this.props.recipe.errors.name}/>
                      <br />
                    </div>
                    <div className={'form-group'}>
                      <label>Recipe Variables:</label>
                      <br />
                      {variables}
                    </div>
                    <div className="form-group"><RaisedButton onClick={this.addVar.bind(this)} label="Add New Var" labelPosition="before" icon={<ContentAdd/>}/></div>
                    <br />
                    <div>
                      <label htmlFor='recipe_script'>Drop Ins: (drag and drop to script)</label>
                      <div style={styles.wrapper} className="drop-ins">{dropIns}</div>
                    </div>
                    <br />
                    <div className={'form-group' + (this.props.recipe.errors.script.length > 0 ? ' has-danger' : '')}>
                      <label htmlFor='recipe_script'>Script:</label>
                      <AceEditor mode="sh" width="100%" theme="github"  className='form-control' onChange={this.changeScript} value={this.props.recipe.script} name='recipe_script' id='recipe_script'/>
                      <Errors errors={this.props.recipe.errors.script}/>
                    </div>
                    <div className='form-group'>
                      <div id="submit_recipe"><RaisedButton onClick={this.props.recipe.id ? this.editRecipe.bind(this) : this.createRecipe.bind(this)} label='Save' primary /></div>
                      {this.props.recipe.id &&
                        <div id="delete_recipe"><RaisedButton labelPosition="before" icon={<i className={"material-icons"}>delete_forever</i>} onClick={this.deleteRecipe.bind(this)} label="Delete" /></div>
                      }
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </QueueAnim>
      </div>
    );
  }
}


module.exports = withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipe));
