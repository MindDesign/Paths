'use strict';

/**
 *  controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::paths.path', {

  async postPath(ctx) {
    ctx.body = await strapi
      .plugin('paths')
      .service('pathService')
      .postPath(ctx.request.query)
  },

  async putPath(ctx) {
    ctx.body = await strapi
      .plugin('paths')
      .service('pathService')
      .putPath(ctx.params.id, ctx.request.query)
  },

  async getPath(ctx) {
    ctx.body = await strapi
      .plugin('paths')
      .service('pathService')
      .getPath(ctx.params.id);
  },

  async getPathByEntity(ctx) {
    ctx.body = await strapi
      .plugin('paths')
      .service('pathService')
      .getPathByEntity(ctx.request.query);
  },

  async getPaths(ctx) {
    ctx.body = await strapi
      .plugin('paths')
      .service('pathService')
      .getPaths(ctx.request.query);
  },

  async getPathsCount(ctx) {
    ctx.body = await strapi
      .plugin('paths')
      .service('pathService')
      .getPathsCount(ctx.request.query);
  },

  async getEntity(ctx) {
    ctx.body = await strapi
      .plugin('paths')
      .service('pathService')
      .getIndex(ctx.request.query);
  },

  async deletePath(ctx) {
    ctx.body = await strapi
      .plugin('paths')
      .service('pathService')
      .deletePath(ctx.params.id);
  }

});
