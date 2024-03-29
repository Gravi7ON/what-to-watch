import {AppRoute} from '../../const';
import {Link, useParams} from 'react-router-dom';
import Logo from '../../components/logo/logo';
import UserLogo from '../../components/user-logo/user-logo';
import {ScreenProps, FilmId} from '../../types/films';
import UserCommentForm from '../../components/user-comment-form/user-comment-form';

function AddReview({films}: ScreenProps): JSX.Element {
  const {id} = useParams<FilmId>();
  const filmIndexInList = Number(id) - 1;

  const {name, backgroundImage, posterImage, backgroundColor} = films[filmIndexInList];

  return (
    <section className="film-card film-card--full" style={{backgroundColor: backgroundColor}}>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo path={AppRoute.Main} />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Film}/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Film}/${id}/review`} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <UserLogo />
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <UserCommentForm backgroundColor={backgroundColor} />
      </div>

    </section>
  );
}

export default AddReview;

