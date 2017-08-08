import {
  UPDATE_FIELD_RECIPE,
  UNLOAD_RECIPE,
} from '../constants/actionTypes.js';


const initialState = {
  deleted: false,
  errors: {name: [], script: []},
  error: null,
}
const recipe = (state=initialState, action) => {
  switch (action.type) {
    case 'GET_RECIPE_FULFILLED':
    case 'EDIT_RECIPE_FULFILLED':
      return Object.assign({deleted: false}, state, action.payload.data);

    case 'CREATE_RECIPE_FULFILLED':
      return initialState;

    case 'DELETE_RECIPE_FULFILLED':
      return { ...initialState, deleted: true };

    case 'CREATE_RECIPE_REJECTED':
      return {
        ...state,
        errors: Object.assign({},
          initialState.errors,
          action.payload.response.data.errors),
        error: action.payload.response.data.description || initialState.error,
      };

    case UPDATE_FIELD_RECIPE:
      return { ...state, [action.key]: action.value };

    case UNLOAD_RECIPE:
      return initialState;

    default:
      return state;
  }
};

export default recipe;
