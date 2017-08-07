import {
  UPDATE_FIELD_RECIPE,
} from '../constants/actionTypes.js';


const initialState = {
  errors: {name: [], script: []},
  error: null,
}
const recipe = (state=initialState, action) => {
  switch (action.type) {
    case 'GET_RECIPE_FULFILLED':
    case 'CREATE_RECIPE_FULFILLED':
    case 'EDIT_RECIPE_FULFILLED':
    case 'DELETE_RECIPE_FULFILLED':
      return Object.assign({}, state, action.payload.data);

    case UPDATE_FIELD_RECIPE:
      return { ...state, [action.key]: action.value };

    default:
      return state;
  }
};

export default recipe;
