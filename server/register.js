'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'path',
    plugin: 'paths',
    type: 'string',
  });
};
