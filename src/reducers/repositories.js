const repositories = (state=[], action) => {
  switch (action.type) {
    case 'GET_REPOSITORIES_FULFILLED':
      return action.payload.data || state;

    default:
      return state;
  }
};

export default repositories;
