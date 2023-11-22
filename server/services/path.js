'use strict';

/**
 *  service
 */

module.exports = {
  async getPaths({ page, pageSize }) {
    return await strapi.entityService.findMany('plugin::paths.path', {
      start: page,
      limit: pageSize,
    });
  },

  async getPathsCount() {
    return await strapi.entityService.count('plugin::paths.path');
  },

  async getIndex({ path, populate }) {
    const pathEntity = await strapi.db.query('plugin::paths.path').findOne({
      select: ['model_uid', 'entity_id'],
      where: {
        $and: [
          { path: path },
          { is_published: true }
        ]
      }
    });
    if (pathEntity) {
      const entity = await strapi.entityService.findOne(pathEntity.model_uid, pathEntity.entity_id, {
        populate: (populate) ? populate : ''
      });
      return entity;
    }

  },
};
