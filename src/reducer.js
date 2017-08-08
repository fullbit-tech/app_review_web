import { combineReducers } from 'redux';
import auth from './reducers/auth';
import user from './reducers/user.js';
import instance from './reducers/instance.js';
import instances from './reducers/instances.js';
import recipes from './reducers/recipes.js';
import recipe from './reducers/recipe.js';


export default combineReducers({
  auth,
  user,
  instance,
  instances,
  recipes,
  recipe,
});
