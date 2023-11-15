'use strict';

/**
 * `generate-category-data` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In generate-category-data middleware.');

    await next();
  };
};
