import React from 'react';
import FilmCard from '../../components/film-card';

const TextFormRating = {
  BAD: 'Bad',
  NORMAL: 'Normal',
  GOOD: 'Good',
  VERY_GOOD: 'Very good',
  AWESOME: 'Awesome'
};

type FilmList = {
  name: string;
  previewImage: string;
  genre: string;
  released: number;
  posterImage: string;
  backgroundImage: string;
  rating: number;
  scoresCount:number;
  director: string;
  starring: string[];
  description: string;
};

function Film(props: FilmList): JSX.Element {
  const getTextFormRating = (rating: number): string => {
    if (rating < 3) {
      return TextFormRating.BAD;
    }

    if (rating >= 3 && rating < 5) {
      return TextFormRating.NORMAL;
    }

    if (rating >= 5 && rating < 8) {
      return TextFormRating.GOOD;
    }

    if (rating >= 8 && rating < 10) {
      return TextFormRating.VERY_GOOD;
    }

    return TextFormRating.AWESOME;
  };

  const getFilmsCards = (): JSX.Element[] => {
    const filmsCards: JSX.Element[] = [];

    for (let i = 0; i < 4; i++) {
      filmsCards.push(<FilmCard name={props.name} previewImage={props.previewImage} />);
    }

    return filmsCards;
  };

  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={props.backgroundImage} alt={props.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a href="_" className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{props.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{props.genre}</span>
                <span className="film-card__year">{props.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <a href="add-review.html" className="btn film-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={props.posterImage} alt={props.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item film-nav__item--active">
                    <a href="_" className="film-nav__link">Overview</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="_" className="film-nav__link">Details</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="_" className="film-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>

              <div className="film-rating">
                <div className="film-rating__score">{props.rating.toFixed(1)}</div>
                <p className="film-rating__meta">
                  <span className="film-rating__level">{getTextFormRating(props.rating)}</span>
                  <span className="film-rating__count">{props.scoresCount} ratings</span>
                </p>
              </div>

              <div className="film-card__text">
                <p>{props.description}</p>

                <p className="film-card__director"><strong>Director: {props.director}</strong></p>

                <p className="film-card__starring"><strong>Starring: {props.starring.join(', ')} and other</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {getFilmsCards()}
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2022 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default Film;
