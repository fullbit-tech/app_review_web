import { combineReducers } from 'redux';
import auth from './reducers/auth';
import user from './reducers/user.js';
import instance from './reducers/instance.js';
import recipes from './reducers/recipe.js';


export default combineReducers({
  auth,
  user,
  instance,
  recipes,
});
