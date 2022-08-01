enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films',
  AddReview = '/films/:id/review',
  Player = '/player/:id'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum TextFormRating {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very good',
  Awesome = 'Awesome'
}

enum APIRoute {
  Films = '/films',
  SignIn = '/login',
  Logout = '/logout',
}

const MAX_SHOW_SIMILAR_FILMS = 4;

const LOGO_CLASS_NAME = 'logo__link--light';

const RATING_STARS_COUNT = 10;

const AMOUNT_FILMS_PER_STEP = 8;

const HOUR_IN_MINUTES = 60;

const TIME_UNTIL_ACTIVATION_PREVIEW = 1000;

const ALL_GENRES = 'All genres';

const OVERVIEW_TAB = 'Overview';

const TIMEOUT_SHOW_ERROR = 5000;

export {
  AppRoute,
  LOGO_CLASS_NAME,
  AuthorizationStatus,
  RATING_STARS_COUNT,
  MAX_SHOW_SIMILAR_FILMS,
  TextFormRating,
  AMOUNT_FILMS_PER_STEP,
  HOUR_IN_MINUTES,
  TIME_UNTIL_ACTIVATION_PREVIEW,
  ALL_GENRES,
  APIRoute,
  TIMEOUT_SHOW_ERROR,
  OVERVIEW_TAB
};
