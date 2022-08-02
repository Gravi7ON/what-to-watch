import {Films} from './types/films';
import {ALL_GENRES, AuthorizationStatus} from './const';
import {store} from './store/store';

const getFilteredFilmsByGenre = (genre: string, movies: Films): Films => {
  if (genre === ALL_GENRES) {
    return movies;
  }

  const filteredFilms = movies.filter((movie: {genre: string}) => movie.genre === genre);

  return filteredFilms;
};

const isAuthorization = () => store.getState().authorizationStatus === AuthorizationStatus.Auth;

export {getFilteredFilmsByGenre, isAuthorization};
