'use strict';

/**
 *  controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::paths.path', {

  async getPath(ctx) {
    ctx.body = await strapi
      .plugin('paths')
      .service('pathService')
      .getPath(ctx.params.id);
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
  },

  async getSettings(ctx) {
    try {
      ctx.body = await strapi
        .plugin('paths')
        .service('pathService')
        .getSettings();
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async setSettings(ctx) {
    const { body } = ctx.request;
    try {
      await strapi
        .plugin('paths')
        .service('pathService')
        .setSettings(body);
      ctx.body = await strapi
        .plugin('paths')
        .service('pathService')
        .getSettings();
    } catch (err) {
      ctx.throw(500, err);
    }
  },

});
