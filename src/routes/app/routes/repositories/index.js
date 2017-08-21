module.exports = {
  path: 'repositories',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Repositories'));
    });
  }
};
