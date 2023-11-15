'use strict';

/**
 *  service
 */

module.exports = {

  async getIndex({ path, populate }) {
    console.log("Path: ", path);
    const pathEntity = await strapi.db.query('plugin::paths.path').findOne({
      select: ['model_uid', 'entity_id'],
      where: {
        $and: [
          { path: path },
          { is_published: true }
        ]
      }
    });
    console.log("No pathEntity: ", pathEntity);
    if (pathEntity) {
      console.log("Here we are: pathEntity exists");
      const entity = await strapi.entityService.findOne(pathEntity.model_uid, pathEntity.entity_id, {
        populate: (populate) ? populate: ''
      });
      console.log("Here we are: entity loaded: ", entity);
      return entity;
    }

  },
};
