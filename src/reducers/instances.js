const initialState = {
  loading: false,
  instances: [],
  error: null,
}
const instances = (state=initialState, action) => {
  switch (action.type) {
    case 'GET_INSTANCES_REJECTED':
      return { ...initialState, ...action.payload.data, loading: false}

    case 'GET_INSTANCES_FULFILLED':
      return { ...state, instances: action.payload.data, loading: false};

    case 'GET_INSTANCES_PENDING':
      return { ...state, loading: true };

    default:
      return state;
  }
};

export default instances;
