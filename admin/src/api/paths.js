// admin/src/api/paths.js
import { useFetchClient } from '@strapi/helper-plugin';

const { get, post } = useFetchClient();
const pathsRequests = {

  getSettings: async () => {
    return await get(`/paths/settings`);
  },

  setSettings: async data => {
    return await post(`/paths/settings`, data);
  },

};
export default pathsRequests;