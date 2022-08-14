import {NameSpace} from '../../const';
import {Comments} from '../../types/comments';
import {Film, Films} from '../../types/films';
import {State} from '../../types/state';

const getFilms = (state: State): Films => state[NameSpace.Films].movies;
const getFavoritesFilms = (state: State): Films | undefined => state[NameSpace.Films].favorites;
const getPromoFilm = (state: State): Film | undefined => state[NameSpace.Films].promoFilm;
const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Films].isDataLoaded;
const getLoadedFilmStatus = (state: State): boolean => state[NameSpace.Films].isFilmLoaded;
const getLoadedFavoritesFilmsStatus = (state: State): boolean => state[NameSpace.Films].isFavoritesLoaded;
const getCurrentFilm = (state: State): Film | undefined => state[NameSpace.Films].currentMovie;
const getSimilarFilms = (state: State): Films | undefined => state[NameSpace.Films].similarMovies;
const getCurrentFilmComments = (state: State): Comments | undefined => state[NameSpace.Films].movieComments;

export {
  getFilms,
  getPromoFilm,
  getLoadedDataStatus,
  getCurrentFilm,
  getSimilarFilms,
  getLoadedFilmStatus,
  getCurrentFilmComments,
  getFavoritesFilms,
  getLoadedFavoritesFilmsStatus
};

