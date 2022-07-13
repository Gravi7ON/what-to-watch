enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
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

const AMOUNT_SIMILAR_FILMS = 4;

const LOGO_CLASS_NAME = 'logo__link--light';

const RATING_STARS_COUNT = 10;

const AMOUNT_FILMS_PER_STEP = 20;

const HOUR_IN_MINUTES = 60;

export {
  AppRoute,
  LOGO_CLASS_NAME,
  AuthorizationStatus,
  RATING_STARS_COUNT,
  AMOUNT_SIMILAR_FILMS,
  TextFormRating,
  AMOUNT_FILMS_PER_STEP,
  HOUR_IN_MINUTES
};
