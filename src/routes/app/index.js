module.exports = {
  path: 'app',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/dashboard'),
        require('./routes/instances'),
        require('./routes/instance'),
        require('./routes/repositories'),
        require('./routes/recipes'),
        require('./routes/support'),
        require('./routes/account'),
      ]);
    });
  },
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/MainApp'));
    });
  }
};
