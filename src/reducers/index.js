import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app';
import settings from './settings';
import auth from './auth';
import user from './user.js';
import instance from './instance.js';
import instances from './instances.js';
import recipes from './recipes.js';
import recipe from './recipe.js';
import recipeDropIns from './recipeDropIns.js';
import repository from './repository.js';
import repositories from './repositories.js';
import message from './message.js';


const reducers = {
  routing: routerReducer,
  app,
  settings,
  auth,
  user,
  instance,
  instances,
  recipes,
  recipe,
  repository,
  repositories,
  recipeDropIns,
  message,
};

module.exports = combineReducers(reducers);
