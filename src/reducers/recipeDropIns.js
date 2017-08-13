const recipesDropIns = (state=[], action) => {
  switch (action.type) {
    case 'GET_RECIPE_DROP_INS_FULFILLED':
      return action.payload.data || state;

    default:
      return state;
  }
};

export default recipesDropIns;
