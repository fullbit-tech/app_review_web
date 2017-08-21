module.exports = {
  path: 'instance/:instanceId',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Instance'));
    });
  }
};
