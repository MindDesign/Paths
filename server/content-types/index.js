'use strict';

const path = require("./path/schema");
const pathscategory = require("./category/schema");

module.exports = {
  'path': { schema: path },
  'pathscategory': { schema: pathscategory },
};
