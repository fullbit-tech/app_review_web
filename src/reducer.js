import { combineReducers } from 'redux';
import auth from './reducers/auth';
import user from './reducers/user.js';


export default combineReducers({
  auth,
  user,
});
