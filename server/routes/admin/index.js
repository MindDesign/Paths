module.exports = {
  type: 'admin',
  routes: [{
    method: 'GET',
    path: '/categories/:id',
    handler: 'pathsCategoryController.getCategory',
    config: {
      policies: []
    }
  }, {
    method: 'GET',
    path: '/categories',
    handler: 'pathsCategoryController.getCategories',
    config: {
      policies: [],
      auth: false
    }
  }, {
    method: 'GET',
    path: '/categories/count',
    handler: 'pathsCategoryController.getCategoriesCount',
    config: {
      policies: []
    }
  }, {
    method: 'POST',
    path: '/paths',
    handler: 'pathsController.postPath',
    config: {
      policies: []
    }
  }, {
    method: 'PUT',
    path: '/paths/:id',
    handler: 'pathsController.putPath',
    config: {
      policies: []
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
    path: 'paths/by_entity',
    handler: 'pathsController.getPathByEntity',
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
    path: '/paths/count',
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
  }, {
    method: 'GET',
    path: '/settings',
    handler: 'settingsController.getSettings',
    config: {
      policies: []
    }
  }, {
    method: 'POST',
    path: '/settings',
    handler: 'settingsController.setSettings',
    config: {
      policies: []
    }
  }]
};