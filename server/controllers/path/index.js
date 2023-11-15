'use strict';

/**
 *  controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::paths.path', {
  
  async getEntity(ctx) {
    ctx.body = await strapi
      .plugin('paths')
      .service('pathService')
      .getIndex(ctx.request.query);
  },
  
});
