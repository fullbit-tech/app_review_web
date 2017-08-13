import {
  UNLOAD_INSTANCE,
  UPDATE_FIELD_INSTANCE,
} from '../constants/actionTypes.js';


const initialState = {
  instance: {
    instance_size: null,
    recipe_id: null,
  },
  errors: {instance_size: [], recipe_id: []},
  error: null,
};

const instance = (state=initialState, action) => {
  switch (action.type) {
    case 'GET_INSTANCE_REJECTED':
    case 'GET_INSTANCE_FULFILLED':
      return Object.assign({}, state, action.payload.data, {loading: false});

    case 'GET_INSTANCE_PENDING':
      return { ...state, loading: true };

    case 'START_INSTANCE_FULFILLED':
      return Object.assign({}, state, action.payload.data, {loading: false});

    case 'START_INSTANCE_PENDING':
      return { ...state, loading: true, errors: initialState.errors, error: null };

    case 'START_INSTANCE_REJECTED':
      return {
        ...state,
        errors: Object.assign({},
          initialState.errors,
          action.payload.response.data.errors),
        error: action.payload.response.data.error || initialState.error,
        loading: false,
      };

    case 'STOP_INSTANCE_PENDING':
      return { ...state, loading: true };

    case 'STOP_INSTANCE_REJECTED':
    case 'STOP_INSTANCE_FULFILLED':
      return Object.assign({}, state, action.payload.data, {loading: false});

    case 'TERMINATE_INSTANCE_PENDING':
      return { ...state, loading: true };

    case 'TERMINATE_INSTANCE_REJECTED':
    case 'TERMINATE_INSTANCE_FULFILLED':
      return Object.assign({}, state, action.payload.data, {loading: false});

    case UPDATE_FIELD_INSTANCE:
      return {
        ...state,
        instance: {
          ...state.instance,
          [action.key]: action.value,
        },
      }

    case UNLOAD_INSTANCE:
      return initialState;

    default:
      return state;
  }
};

export default instance;
