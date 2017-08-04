const initialState = {
  instance: {},
};

const user = (state=initialState, action) => {
  switch (action.type) {
    case 'GET_INSTANCE_FULFILLED':
      return Object.assign({}, state, action.payload.data);

    case 'START_INSTANCE_FULFILLED':
      return Object.assign({}, state, action.payload.data);

    case 'STOP_INSTANCE_FULFILLED':
      return Object.assign({}, state, action.payload.data);

    case 'TERMINATE_INSTANCE_FULFILLED':
      return Object.assign({}, state, action.payload.data);

    default:
      return state;
  }
};

export default user;
