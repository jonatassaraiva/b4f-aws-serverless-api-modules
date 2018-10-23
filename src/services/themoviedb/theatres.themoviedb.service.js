'use strict';

/**
 * 
 */

const { helpers } = require('b4f-common');
const builderItemContent = require('./builder.item.content');

const getNowPlaying = (safe = true) => {
  const options = {
    url: process.env.THEMOVIEDB_THATRES_MOVIES,
    method: 'GET'
  };

  return helpers.request.send(options, 'get-now-playing_themoviedb')
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

module.exports = () => {
  return getNowPlaying()
    .then(data => {
      const contents = data.results.map(item => {
        return builderItemContent.itemMovie(item);
      });
      return { moduleId: 'theaters', contents };
    });
};