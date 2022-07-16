import {RATING_STARS_COUNT} from '../../const';
import {Fragment, useState} from 'react';

function UserCommentForm(): JSX.Element {
  const [userComment, setComment] = useState('');
  const userEstimate = useState(0);
  const setEstimate = userEstimate[1];

  const fieldChangeHandler = (evt: {target: {value: string}}) => {
    setComment(evt.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputChangeHandler = (evt: any) => {
    if (evt.target.tagName === 'INPUT') {
      setEstimate(evt.target.value);
    }
  };

  const ratingStars: JSX.Element[] = Array.from({length: RATING_STARS_COUNT}, (element, index) => index + 1)
    .reverse()
    .map((number) => (
      <Fragment key={number.toString()}>
        <input className="rating__input" id={`star-${number}`} type="radio" name="rating" value={number} />
        <label className="rating__label" htmlFor={`star-${number}`}>Rating {number}</label>
      </Fragment>
    ));

  return (
    <form action="#" className="add-review__form" onChange={inputChangeHandler}>
      <div className="rating">
        <div className="rating__stars">
          {ratingStars}
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={userComment} onChange={fieldChangeHandler}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
}

export default UserCommentForm;

