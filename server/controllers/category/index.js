'use strict';

/**
 *  controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::paths.pathscategory', {
  
  async getCategories(ctx) {
    ctx.body = await strapi
      .plugin('paths')
      .service('pathsCategoryService')
      .getIndex(ctx.request.query);
  }

});
