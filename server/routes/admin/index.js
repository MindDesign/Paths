module.exports = {
  type: 'admin',
  routes: [{
    method: 'GET',
    path: '/pathscategories',
    handler: 'pathsCategoryController.getCategories',
    config: {
      policies: [],
      auth: false
    },
  }, {
    method: 'GET',
    path: '/paths',
    handler: 'pathsController.getPaths',
    config: {
      policies: []
    },
  }, {
    method: 'GET',
    path: '/pathscount',
    handler: 'pathsController.getPathsCount',
    config: {
      policies: []
    },
  }],
};