module.exports = {
  path: 'instances',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Instances').InstancesPage);
    });
  }
};
