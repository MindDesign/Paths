'use strict';

/**
 *  service
 */

function getPluginStore() {
  return strapi.store({
    environment: '',
    type: 'plugin',
    name: 'paths',
  });
}

async function createDefaultConfig() {
  const pluginStore = getPluginStore();
  const value = {
    disabled: false,
  };
  await pluginStore.set({ key: 'settings', value });
  return pluginStore.get({ key: 'settings' });
}

module.exports = {
  async getPath(id) {
    return await strapi.entityService.findOne('plugin::paths.path', id, {
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
  },

  async getSettings() {
    const pluginStore = getPluginStore();
    let config = await pluginStore.get({ key: 'settings' });
    if (!config) {
      config = await createDefaultConfig();
    }
    return config;
  },

  async setSettings(settings) {
    const value = settings;
    const pluginStore = getPluginStore();
    await pluginStore.set({ key: 'settings', value });
    return pluginStore.get({ key: 'settings' });
  },
};
