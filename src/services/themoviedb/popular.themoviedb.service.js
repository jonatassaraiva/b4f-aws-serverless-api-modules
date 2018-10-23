'use strict';

/**
 * This service get a list of the current popular Movies and TV Shows on TMDb.
 * APIs:
 *   https://developers.themoviedb.org/3/movies/get-popular-movies
 *   https://developers.themoviedb.org/3/tv/get-popular-tv-shows
 */

const { helpers } = require('b4f-common');

const getPopularMovies = (safe = true) => {
  const options = {
    url: process.env.THEMOVIEDB_POPULAR_MOVIES,
    method: 'GET'
  };

  return helpers.requestHelper.send(options, 'popular-movies_themoviedb-serice')
    .then(data => {
      // TODO: Validate Errors
      return data.body;
    })
    .catch(err => {
      if (safe) {
        throw err;
      }

      // TODO: LOG
      return [];
    });
};

const getPopularTvShows = (safe = true) => {
  const options = {
    url: process.env.THEMOVIEDB_POPULAR_TVSHOWS,
    method: 'GET'
  };

  return helpers.requestHelper.send(options, 'popular-tvshows_themoviedb-serice')
    .then(data => {
      // TODO: Validate Errors
      return data.body;
    }).catch(err => {
      if (safe) {
        throw err;
      }

      // TODO: LOG
      return [];
    });
};

module.exports = {
  getPopularMovies,
  getPopularTvShows
}