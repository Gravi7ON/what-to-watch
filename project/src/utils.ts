import {Films} from './types/films';
import {ALL_GENRES, AuthorizationStatus} from './const';

const getFilteredFilmsByGenre = (genre: string, movies: Films): Films => {
  if (genre === ALL_GENRES) {
    return movies;
  }

  const filteredFilms = [...movies].filter((movie: {genre: string}) => movie.genre === genre);

  return filteredFilms;
};

const isAuthorized = (authorizationStatus: AuthorizationStatus) => authorizationStatus === AuthorizationStatus.Auth;

const isAuthorizedAndFilmsInList = (authorizationStatus: AuthorizationStatus, favoritesFilms: Films, id: string) =>
  favoritesFilms?.find((film) => film.id === Number(id)) &&
  authorizationStatus === AuthorizationStatus.Auth;

export {getFilteredFilmsByGenre, isAuthorized, isAuthorizedAndFilmsInList};
