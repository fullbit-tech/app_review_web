import { UPDATE_FIELD_INSTANCE } from '../constants/actionTypes.js';


const initialState = {
  instance: {
    instance_size: null,
    recipe_id: null,
  },
  errors: {instance_size: [], recipe_id: []},
  error: null,
};

const user = (state=initialState, action) => {
  switch (action.type) {
    case 'GET_INSTANCE_FULFILLED':
      return Object.assign({}, state, action.payload.data);

    case 'START_INSTANCE_FULFILLED':
      return Object.assign({}, state, action.payload.data);

    case 'START_INSTANCE_REJECTED':
      return {
        ...state,
        errors: action.payload.response.data.errors || initialState.errors,
        error: action.payload.response.data.description || initialState.error,
      };

    case 'STOP_INSTANCE_FULFILLED':
      return Object.assign({}, state, action.payload.data);

    case 'TERMINATE_INSTANCE_FULFILLED':
      return Object.assign({}, state, action.payload.data);

    case UPDATE_FIELD_INSTANCE:
      return {
        ...state,
        instance: {
          ...state.instance,
          [action.key]: action.value,
        },
      }

    default:
      return state;
  }
};

export default user;
