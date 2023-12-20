'use strict';

/**
 *  service
 */

module.exports = {

  async getCategory(id) {
    return await strapi.entityService.findOne('plugin::paths.pathscategory', id, {
      populate: { parent: true, children: true }
    });
  },

  async getIndex() {
    return await strapi.entityService.findMany('plugin::paths.pathscategory', {
      fields: ['id', 'name', 'slug'],
      populate: {
        'parent': { fields: ['id'] }
      }
    });
  },

  async getCategoriesCount() {
    return await strapi.entityService.count('plugin::paths.pathscategory');
  },
};
