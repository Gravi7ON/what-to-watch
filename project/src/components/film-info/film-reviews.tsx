import FilmComment from './film-comment';
import Comments from '../../types/comments';

type CommentsProps = {
  comments: Comments
}

function FilmReviews({comments}: CommentsProps): JSX.Element {
  if (comments.length === 0) {
    return <> </>;
  }

  const firsCommentsColumn = comments.slice(0, Math.ceil(comments.length / 2));
  const secondCommentsColumn = comments.slice(Math.ceil(comments.length / 2));

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {
          firsCommentsColumn.map((comment, index) => (
            <FilmComment
              key={index++}
              {...comment}
            />
          ))
        }
      </div>
      <div className="film-card__reviews-col">
        {
          secondCommentsColumn.map((comment, index) => (
            <FilmComment
              key={index--}
              {...comment}
            />
          ))
        }
      </div>
    </div>
  );
}

export default FilmReviews;
