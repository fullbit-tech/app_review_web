import { TOKEN_STORAGE_KEY } from '../constants/common';


const initialState = {
  accessToken: null,
  errors: {email: [], password: []},
  error: null,
};

const auth = (state=initialState, action) => {
  switch (action.type) {
    case "LOGIN_FULFILLED":
      var accessToken = action.payload.data.access_token;
      state = {...state, accessToken: accessToken};
      localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
      return state;

    case "LOGIN_REJECTED":
      return {
        ...state,
        errors: action.payload.response.data.errors || initialState.errors,
        error: action.payload.response.data.description || initialState.error,
      };

    case "UPDATE_FIELD_AUTH":
      return { ...state, [action.key]: action.value };

    case "SET_AUTH_TOKEN":
      return { ...state, accessToken: action.accessToken };

    case "LOGOUT":
      return { ...state, accessToken: null };

    default:
      return state;
  }
  return state;
};

export default auth;
