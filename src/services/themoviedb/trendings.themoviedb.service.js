'use strict';

/**
 * This serviceGet a list of movies in theatres. 
 * This is a release type query that looks for all movies that have a release type of 2 or 3 within the specified date range.
 * APIs:
 *   https://developers.themoviedb.org/3/movies/get-now-playing
 */

const { helpers } = require('b4f-common');
const builderItemContent = require('./builder.item.content');

const getTrendingWeekTvShows = (safe = true) => {
  const options = {
    url: process.env.THEMOVIEDB_TRENDING_WEEK_TVSHOWS,
    method: 'GET'
  };

  return helpers.request.send(options, 'get-trending-week-tvshows_themoviedb')
    .then(data => {
      // TODO: Validate Errors
      return data.body;
    })
    .catch(err => {
      if (!safe) {
        throw err;
      }

      // TODO: LOG
      return [];
    });
};

module.exports = {
  weekTvShows() {
    return getTrendingWeekTvShows()
      .then(data => {
        const contents = data.results.map(item => {
          return builderItemContent.itemTvShow(item)
        });
        return { moduleId: 'trending-week-tvshows', contents };
      });
  }
}