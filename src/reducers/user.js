import {
  UPDATE_FIELD_REGISTER,
  UNLOAD_USER_DATA,
} from '../constants/ActionTypes.js';


const initialState = {
  user: null,
  userRegistered: false,
  errors: {email: [], password: []},
  error: null,
  loading: false,
};

const user = (state=initialState, action) => {
  switch (action.type) {
    case 'REGISTER_FULFILLED':
      return {
        ...state,
        errors: initialState.errors,
        error: initialState.error,
        userRegistered: true,
      };

    case 'REGISTER_REJECTED':
      return {
        ...state,
        errors: action.payload.response.data.errors || initialState.errors,
        error: action.payload.response.data.description || initialState.error,
      };

    case UPDATE_FIELD_REGISTER:
      return { ...state, [action.key]: action.value };

    case 'LOAD_USER_DATA_PENDING':
      return { ...state, loading: true };

    case 'LOAD_USER_DATA_FULFILLED':
      return {
        ...state,
        user: action.payload.data,
        loading: false,
      }

    case 'LOAD_USER_DATA_REJECTED':
      return {
        ...state,
        errors: initialState.errors,
        error: initialState.error,
        loading: false,
      }

    case UNLOAD_USER_DATA:
      return {
        ...state,
        user: null,
      }
    default:
      return state;
  }
};

export default user;
