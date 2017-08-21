module.exports = {
  path: 'recipes(/:recipeId)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Recipes'));
    });
  }
};
