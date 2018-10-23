'use strict';

const modulesDynamodb = require('./dynamodb/modules.dynamodb.service');
const popularThemoviedb = require('./themoviedb/popular.themoviedb.service');

module.exports = {
  modulesDynamodb,
  popularThemoviedb
};
