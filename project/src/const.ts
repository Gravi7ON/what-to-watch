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
  Unknown = 'UNKNOWN'
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
  Comments = '/comments'
}

enum HTTPStatusCode {
  BAD_REQUEST = 400,
  NOT_FOUND = 404
}

const MAX_SHOW_SIMILAR_FILMS = 4;

const LOGO_CLASS_NAME = 'logo__link--light';

const RATING_STARS_COUNT = 10;

const AMOUNT_FILMS_PER_STEP = 8;

const HOUR_IN_MINUTES = 60;

const TIME_UNTIL_ACTIVATION_PREVIEW = 1000;

const ALL_GENRES = 'All genres';

const OVERVIEW_TAB = 'Overview';

const MIN_COMMENT_LENGTH = 50;

const MAX_COMMENT_LENGTH = 400;

const TIMEOUT_SHOW_ERROR = 5000;

const CHECK_PASSWORD_VALIDITY = /(?=.*[0-9])(?=.*[A-Za-z])[0-9a-zA-Z]{2,}/;

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
  OVERVIEW_TAB,
  HTTPStatusCode,
  CHECK_PASSWORD_VALIDITY,
  MIN_COMMENT_LENGTH,
  MAX_COMMENT_LENGTH
};
