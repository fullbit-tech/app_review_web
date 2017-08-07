
const recipes = (state=[], action) => {
  switch (action.type) {
    case 'GET_RECIPES_FULFILLED':
      return action.payload.data || state;

    default:
      return state;
  }
};

export default recipes;
