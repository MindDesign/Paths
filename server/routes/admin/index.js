module.exports = {
  type: 'admin',
  routes: [{
    method: 'GET',
    path: '/pathscategories',
    handler: 'pathsCategoryController.getCategories',
    config: {
      policies: [],
      auth: false
    }
  }, {
    method: 'GET',
    path: '/paths/:id',
    handler: 'pathsController.getPath',
    config: {
      policies: []
    }
  }, {
    method: 'GET',
    path: '/paths',
    handler: 'pathsController.getPaths',
    config: {
      policies: []
    }
  }, {
    method: 'GET',
    path: '/pathscount',
    handler: 'pathsController.getPathsCount',
    config: {
      policies: []
    }
  }, {
    method: 'DELETE',
    path: '/paths/:id',
    handler: 'pathsController.deletePath',
    config: {
      policies: []
    }
  }],
};