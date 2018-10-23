'use strict';

const builderItemMovie = (content) => {
  return {
    id: content.id,
    title: content.title,
    voteAverage: content.vote_average * 10,
    releaseDate: (content.release_date).substr(0, 4),
    type: 'itemMovie',
    images: {
      poster: `https://image.tmdb.org/t/p/w185/${content.poster_path}`,
      banner: `https://image.tmdb.org/t/p/w342/${content.backdrop_path}`
    }
  };
}

const builderItemTvShow = (content) => {
  return {
    id: content.id,
    title: content.name,
    voteAverage: content.vote_average * 10,
    releaseDate: (content.first_air_date).substr(0, 4),
    type: 'itemTvShow',
    images: {
      poster: `https://image.tmdb.org/t/p/w185/${content.poster_path}`,
      banner: `https://image.tmdb.org/t/p/w342/${content.backdrop_path}`
    }
  };
}

module.exports = {
  itemMovie: builderItemMovie,
  itemTvShow: builderItemTvShow
}