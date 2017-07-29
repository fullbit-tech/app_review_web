const initialState = {
  user: null,
  userRegistered: false,
  errors: {email: [], password: []},
  error: null,
};

const user = (state=initialState, action) => {
  switch (action.type) {
    case "REGISTER_FULFILLED":
      return {
        ...state,
          errors: initialState.errors,
          error: initialState.error,
          userRegistered: true,
      };

    case "REGISTER_REJECTED":
      return {
        ...state,
        errors: action.payload.response.data.errors || initialState.errors,
        error: action.payload.response.data.description || initialState.error,
      };

    case "UPDATE_FIELD_REGISTER":
      return { ...state, [action.key]: action.value };

    case "APP_LOAD":
      console.log(action.userData);

    default:
      return state;
  }
  return state;
};

export default user;
