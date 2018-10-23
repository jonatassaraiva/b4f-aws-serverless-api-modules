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

  return helpers.request.send(options, 'popular-movies_themoviedb-serice')
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

  return helpers.request.send(options, 'popular-tvshows_themoviedb-serice')
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

const builderContent = (content, type) => {
  return {
    id: content.id,
    title: content.title || content.name,
    voteAverage: content.vote_average * 10,
    releaseDate: (content.release_date || content.first_air_date).substr(0, 4),
    type,
    images: {
      poster: `https://image.tmdb.org/t/p/w185/${content.poster_path}`,
      banner: `https://image.tmdb.org/t/p/w342/${content.backdrop_path}`
    }
  };
}

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
          contents.push(builderContent(contentMovie, 'itemMovie'));
        }

        const contentTvShow = contentsTvShows.results[index];
        if (contentTvShow) {
          contents.push(builderContent(contentTvShow, 'itemTvShow'));
        }
      }
      return { moduleId: 'highlights', contents };
    });
};