import {NameSpace} from '../../const';
import {Comments} from '../../types/comments';
import {Film, Films} from '../../types/films';
import {State} from '../../types/state';

const getFilms = (state: State): Films => state[NameSpace.Films].movies;
const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Films].isDataLoaded;
const getCurrentFilm = (state: State): Film | undefined => state[NameSpace.Films]?.currentMovie;
const getSimilarFilms = (state: State): Films | undefined => state[NameSpace.Films]?.similarMovies;
const getCurrentFilmComments = (state: State): Comments | undefined => state[NameSpace.Films]?.movieComments;

export {getFilms, getLoadedDataStatus, getCurrentFilm, getSimilarFilms, getCurrentFilmComments};

