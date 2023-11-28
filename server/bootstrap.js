'use strict';

module.exports = ({ strapi }) => {

  strapi.db.lifecycles.subscribe({
    models: [
      'api::article.article',
      'api::page.page',
      'plugin::paths.pathscategory',
      'plugin::shopify-connect.shopify-product'
    ],

    async afterCreate(event) {
      const { uid } = event.model;
      const { id, path, publishedAt, title, categoryId } = event.result;
      const isPublished = publishedAt !== null
      const entry = await strapi.entityService.create('plugin::paths.path', {
        data: {
          path: path,
          model_uid: uid,
          entity_id: id,
          entity_title: title,
          category: { connect: categoryId },
          is_published: isPublished
        }
      });

    },

    async afterUpdate(event) {
      const { uid } = event.model;
      const { id, path, publishedAt, title, categoryId } = event.result;
      const isPublished = publishedAt !== null;
      const pathObject = JSON.parse(path);
      const pathPath = pathObject.path;
      const pathBreadcrumbs = pathObject.breadcrumbs;

      let entry = await strapi.db.query('plugin::paths.path').update({
        where: {
          $and: [
            { model_uid: uid },
            { entity_id: id }
          ]
        },
        data: {
          path: pathPath,
          model_uid: uid,
          entity_id: id,
          entity_title: title,
          json_category: pathBreadcrumbs,
          category: { connect: categoryId },
          is_published: isPublished
        },
      });

      if (entry === null) {
        entry = await strapi.entityService.create('plugin::paths.path', {
          data: {
            path: pathPath,
            model_uid: uid,
            entity_id: id,
            entity_title: title,
            json_category: pathBreadcrumbs,
            category: { connect: categoryId },
            is_published: isPublished
          }
        });
      }

    },

    async afterDelete(event) {
      const { uid } = event.model;
      const { id } = event.result;
      const entry = await strapi.db.query('plugin::paths.path').delete({
        where: {
          $and: [
            { model_uid: uid },
            { entity_id: id }
          ]
        }
      });
    }
  });

};
