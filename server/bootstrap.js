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
          category: { connect: [categoryId] },
          is_published: isPublished
        }
      });

    },

    async afterUpdate(event) {
      console.log(event.result);
      const { uid } = event.model;
      const { id, path, publishedAt, title } = event.result;
      const pathObject = JSON.parse(path);
      const data = {
        path: pathObject.path,
        model_uid: uid,
        entity_id: id,
        entity_title: title,
        json_category: pathObject.breadcrumbs,
        category: { id: pathObject.categoryId },
        is_published: publishedAt !== null
      };
      
      let entry = await strapi.db.query('plugin::paths.path').update({
        where: {
          $and: [
            { model_uid: uid },
            { entity_id: id }
          ]
        },
        data
      });
      if (entry === null) {
        entry = await strapi.entityService.create('plugin::paths.path', {
          data
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
