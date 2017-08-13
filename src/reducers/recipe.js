import {
  UPDATE_FIELD_RECIPE,
  UPDATE_FIELD_RECIPE_VAR,
  UNLOAD_RECIPE,
  ADD_NEW_RECIPE_VAR,
  REMOVE_RECIPE_VAR,
} from '../constants/actionTypes.js';


const initialState = {
  deleted: false,
  errors: {name: [], script: [], variables: []},
  variables: [],
  error: null,
}
const recipe = (state=initialState, action) => {
  switch (action.type) {
    case 'GET_RECIPE_FULFILLED':
    case 'EDIT_RECIPE_FULFILLED':
      return {
        ...state,
        ...action.payload.data,
        errors: { ...initialState.errors },
        error: null,
      }

    case 'CREATE_RECIPE_FULFILLED':
      return { ...initialState };

    case 'DELETE_RECIPE_FULFILLED':
      return { ...initialState, deleted: true };

    case 'EDIT_RECIPE_REJECTED':
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

    case UPDATE_FIELD_RECIPE_VAR:
      return {
        ...state,
        variables: state.variables.map( (item, index) => {
          if (index !== action.index) {
            return item;
          }
          return { ...item, [action.key]: action.value };
        }),
      }

    case ADD_NEW_RECIPE_VAR:
      return {
        ...state,
        variables: [ ...state.variables, {name: '', value: ''} ],
      };

    case REMOVE_RECIPE_VAR:
      return {
        ...state,
        variables: [
          ...state.variables.slice(0, action.index),
          ...state.variables.slice(action.index + 1),
        ]
      };

    case UNLOAD_RECIPE:
      return { ...initialState };

    default:
      return { ...state };
  }
};

export default recipe;
