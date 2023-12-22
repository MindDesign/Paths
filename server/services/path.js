'use strict';

/**
 *  service
 */
module.exports = {

  async postPath({ }) {
    // save path
  },

  async putPath(id, data) {
    // update path
    console.log(id, data);
  },

  async getPath(id) {
    return await strapi.entityService.findOne('plugin::paths.path', id, {
      populate: { category: true },
    });
  },

  async getPathByEntity({ id, model }) {
    return await strapi.db.query('plugin::paths.path').findOne({
      select: ['path', 'json_category'],
      where: {
        $and: [
          { entity_id: id },
          { model_uid: model }
        ]
      },
      populate: { category: true },
    });
  },

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

  // Todo: Delete path data on entity as well
  async deletePath(id) {
    return await strapi.entityService.delete('plugin::paths.path', id);
  }
};
