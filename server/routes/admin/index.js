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
  }],
};