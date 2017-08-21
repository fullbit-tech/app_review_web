import {
  UPDATE_FIELD_AUTH,
  SET_AUTH_TOKEN,
  LOGOUT,
} from '../constants/ActionTypes.js';


const initialState = {
  accessToken: null,
  errors: {email: [], password: []},
  error: null,
};

const auth = (state=initialState, action) => {
  switch (action.type) {
    case 'LOGIN_FULFILLED':
      return {
        ...state,
        accessToken: action.payload.data.accessToken,
        errors: initialState.errors,
        error: initialState.error,
      }

    case 'LOGIN_REJECTED':
      return {
        ...state,
        errors: action.payload.response.data.errors || initialState.errors,
        error: action.payload.response.data.description || initialState.error,
      };

    case UPDATE_FIELD_AUTH:
      return { ...state, [action.key]: action.value };

    case SET_AUTH_TOKEN:
      return { ...state, accessToken: action.accessToken };

    case LOGOUT:
      return { ...state, accessToken: null };

    default:
      return state;
  }
};

export default auth;
