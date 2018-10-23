'use strict';

const { helpers } = require('b4f-common');
const modulesDynamoDB = require('../services/dynamodb/modules.dynamodb.service');
const contentsTheMovieDB = require('../services/themoviedb');

module.exports = (req, context) => {
  const { deviceId } = req.pathParameters;

  // 1 - Load Modules by Device
  return modulesDynamoDB.getByDeviceId(deviceId)
    .then(modules => {
      const contentesPromises = [];

      // 2 - For each modules, get the contents
      modules.forEach(itemModule => {
        switch (itemModule.moduleId) {
          case 'highlights':
            contentesPromises.push(contentsTheMovieDB.highlights(itemModule.settings.limitOfContentsByType));
            break;
          case 'theaters':
            contentesPromises.push(contentsTheMovieDB.theaters());
            break;
          case 'trending-week-tvshows':
            contentesPromises.push(contentsTheMovieDB.trendings.weekTvShows());
            break;
          default:
            break;
        }
      });

      return Promise.all([
        Promise.resolve(modules),
        ...contentesPromises
      ]);
    })
    .then(result => {
      const modules = result[0];
      const contents = result.slice(1, result.length);

      // 3 - Build the response. Modules with  the contents
      const modulesContnt = modules.map((itemModule, index) => {
        itemModule.contents = contents[index].contents
        return itemModule;
      });
      return helpers.response.success(modulesContnt, context);
    })
    .catch(err => {
      return helpers.response.error(err, context);
    });
}