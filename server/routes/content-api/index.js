module.exports = {
  type: 'content-api',
  routes: [{
    method: 'GET',
    path: '/',
    handler: 'pathsController.getEntity',
    config: {
      policies: [],
      auth: false
    },
  }],
};