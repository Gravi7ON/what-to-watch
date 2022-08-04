import {AppRoute, RATING_STARS_COUNT, MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH} from '../../const';
import {Fragment, useState} from 'react';
import {useAppDispatch} from '../../hooks/index';
import {postCommentAction} from '../../store/api-actions';
import {useParams} from 'react-router-dom';
import {FilmId} from '../../types/films';
import {redirectToRoute, setActiveFilmTab} from '../../store/action';

function UserCommentForm(): JSX.Element {
  const {id} = useParams<FilmId>();

  const [userComment, setComment] = useState({
    comment: '',
    rating: 0,
    filmId: 0
  });

  const [isUploadingComment, setUploadingComment] = useState(false);

  const dispatch = useAppDispatch();

  const handleFormChange = (evt: React.FormEvent<HTMLFormElement> & {target: {tagName: string; value: string & number}}) => {
    if (evt.target.tagName === 'INPUT') {
      setComment({...userComment, rating: evt.target.value, filmId: Number(id)});
      return;
    }

    if (evt.target.tagName === 'TEXTAREA') {
      setComment({...userComment, comment: evt.target.value});
    }
  };

  const handleButtonSubmit = async (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();

    setUploadingComment(true);

    const requestStatus = await dispatch(postCommentAction(userComment));
    if (requestStatus.meta.requestStatus === 'rejected') {
      return;
    }

    dispatch(setActiveFilmTab('Reviews'));
    dispatch(redirectToRoute(`${AppRoute.Film}/${userComment.filmId}`));
  };

  const ratingStars: JSX.Element[] = Array.from({length: RATING_STARS_COUNT}, (element, index) => index + 1)
    .reverse()
    .map((number) => (
      <Fragment key={number}>
        <input className="rating__input" id={`star-${number}`} type="radio" name="rating" value={number} />
        <label className="rating__label" htmlFor={`star-${number}`}>Rating {number}</label>
      </Fragment>
    ));

  const isValidity = () => !(
    (userComment.comment.length >= MIN_COMMENT_LENGTH
    && userComment.comment.length <= MAX_COMMENT_LENGTH)
    && userComment.rating !== 0
  );

  return (
    <form action="#" className="add-review__form" onChange={handleFormChange}>
      <fieldset disabled={isUploadingComment} style={{margin: 0, border: 0, padding: 0}}>
        <div className="rating">
          <div className="rating__stars">
            {ratingStars}
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea"
            name="review-text" id="review-text" placeholder="Review text"
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" disabled={isValidity()} type="submit"
              onClick={handleButtonSubmit}
            >
          Post
            </button>
          </div>

        </div>
      </fieldset>
    </form>
  );
}

export default UserCommentForm;

