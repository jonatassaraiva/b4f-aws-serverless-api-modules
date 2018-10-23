'use strict';

/**
 * This service get a list of the current popular Movies and TV Shows on TMDB.
 * APIs:
 *   https://developers.themoviedb.org/3/movies/get-popular-movies
 *   https://developers.themoviedb.org/3/tv/get-popular-tv-shows
 */

const { helpers } = require('b4f-common');
const builderItemContent = require('./builder.item.content');

const getPopularMovies = (safe = true) => {
  const options = {
    url: process.env.THEMOVIEDB_POPULAR_MOVIES,
    method: 'GET'
  };

  return helpers.request.send(options, 'popular-movies_themoviedb')
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

const getPopularTvShows = (safe = true) => {
  const options = {
    url: process.env.THEMOVIEDB_POPULAR_TVSHOWS,
    method: 'GET'
  };

  return helpers.request.send(options, 'popular-tvshows_themoviedb')
    .then(data => {
      // TODO: Validate Errors
      return data.body;
    }).catch(err => {
      if (!safe) {
        throw err;
      }

      // TODO: LOG
      return [];
    });
};



module.exports = (limitOfContentsByType) => {
  return Promise.all([
    getPopularMovies(),
    getPopularTvShows()
  ])
    .then(data => {
      const contentsMovies = data[0];
      const contentsTvShows = data[1];
      const contents = [];
      for (let index = 0; index < limitOfContentsByType; index++) {
        const contentMovie = contentsMovies.results[index];
        if (contentMovie) {
          contents.push(builderItemContent.itemMovie(contentMovie));
        }

        const contentTvShow = contentsTvShows.results[index];
        if (contentTvShow) {
          contents.push(builderItemContent.itemTvShow(contentTvShow));
        }
      }
      return { moduleId: 'highlights', contents };
    });
};