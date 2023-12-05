'use strict';

/**
 *  controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::paths.pathscategory', {

  async getCategory(ctx) {
    ctx.body = await strapi
      .plugin('paths')
      .service('pathsCategoryService')
      .getCategory(ctx.params.id);
  },

  async getCategories(ctx) {
    ctx.body = await strapi
      .plugin('paths')
      .service('pathsCategoryService')
      .getIndex(ctx.request.query);
  },

  async getCategoriesCount(ctx) {
    ctx.body = await strapi
      .plugin('paths')
      .service('pathsCategoryService')
      .getCategoriesCount(ctx.request.query)
  }

});
