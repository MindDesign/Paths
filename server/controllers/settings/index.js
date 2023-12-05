'use strict';

module.exports = ({ strapi }) => {
  const getSettings = async (ctx) => {
    try {
      ctx.body = await strapi
        .plugin('paths')
        .service('pathService')
        .getSettings();
    } catch (err) {
      ctx.throw(500, err);
    }
  };

  const setSettings = async (ctx) => {
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
  };

  return {
    getSettings,
    setSettings
  }
}