import FilmComment from './film-comment';
import {FilmId} from '../../types/films';
import {useParams} from 'react-router-dom';
import Comments from '../../types/comments';

type CommentsProps = {
  comments: Comments
}

function FilmReviews({comments}: CommentsProps): JSX.Element {
  const {id} = useParams<FilmId>() ;
  const idToNumber = Number(id);

  const commentsByFilm = comments.filter((comment) => comment.id === idToNumber);

  if (commentsByFilm.length === 0) {
    return <> </>;
  }

  const firsCommentsColumn = commentsByFilm.slice(0, Math.ceil(commentsByFilm.length / 2));
  const secondCommentsColumn = commentsByFilm.slice(Math.ceil(commentsByFilm.length / 2));

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {
          firsCommentsColumn.map((comment, index) => (
            <FilmComment
              key={index++}
              comment={comment.comment}
              date={comment.date}
              rating={comment.rating}
              user={comment.user}
            />
          ))
        }
      </div>
      <div className="film-card__reviews-col">
        {
          secondCommentsColumn.map((comment, index) => (
            <FilmComment
              key={index--}
              comment={comment.comment}
              date={comment.date}
              rating={comment.rating}
              user={comment.user}
            />
          ))
        }
      </div>
    </div>
  );
}

export default FilmReviews;
