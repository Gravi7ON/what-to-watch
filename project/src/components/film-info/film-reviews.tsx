import FilmComment from './film-comment';
// import {FilmId} from '../../types/films';
// import {useParams} from 'react-router-dom';
import Comments from '../../types/comments';

type CommentsProps = {
  comments: Comments
}

function FilmReviews({comments}: CommentsProps): JSX.Element {
  // const {id} = useParams<FilmId>() ;
  // const filmIndexInList = parseInt((id || '1'), 10) - 1;

  const {
    comment,
    date,
    rating,
    user
  } = comments[0];

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        <FilmComment
          comment={comment}
          date={date}
          rating={rating}
          user={user}
        />
      </div>
      <div className="film-card__reviews-col">
        <FilmComment
          comment={comment}
          date={date}
          rating={rating}
          user={user}
        />
      </div>
    </div>
  );
}

export default FilmReviews;
