import {AppRoute, RATING_STARS_COUNT} from '../../const';
import {Link, useParams} from 'react-router-dom';
import Logo from '../../components/logo/logo';
import UserLogo from '../../components/user-logo/user-logo';
import {Fragment} from 'react';
import Films from '../../types/films';

type AddReviewProps = {
  films: Films
}

type FilmId = {
  id: string
}

function AddReview({films}: AddReviewProps): JSX.Element {
  const {id} = useParams() as FilmId ;
  const filmIndexInList = parseInt(id, 10) - 1;

  const {name, backgroundImage, posterImage} = films[filmIndexInList];

  const ratingStars: JSX.Element[] = Array.from({length: RATING_STARS_COUNT}, (element, index) => index + 1)
    .reverse()
    .map((number) => (
      <Fragment key={number.toString()}>
        <input className="rating__input" id={`star-${number}`} type="radio" name="rating" value={number} />
        <label className="rating__label" htmlFor={`star-${number}`}>Rating {number}</label>
      </Fragment>
    ));

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          {<Logo path={AppRoute.Main} />}

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Film}/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Film}/${id}${AppRoute.AddReview}`} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            {<UserLogo path={AppRoute.Main} />}
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              {ratingStars}
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
}

export default AddReview;

