'use strict';

/**
 *  service
 */

module.exports = {

  async getIndex() {

    return await strapi.entityService.findMany('plugin::paths.pathscategory', {
      fields: ['id', 'name', 'slug'],
      populate: {
        'parent': { fields: ['id'] }
      }
    });

  },
};
