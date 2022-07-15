import FilmComment from './film-comment';

type User = {
  name: string;
}

type CommentProps = {
  comment: string;
  date: string;
  rating: number;
  user: User;
}

function FilmReviews(props: CommentProps): JSX.Element {
  const {
    comment,
    date,
    rating,
    user
  } = props;

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {
          <FilmComment
            comment={comment}
            date={date}
            rating={rating}
            user={user}
          />
        }
      </div>
      <div className="film-card__reviews-col">
        {
          <FilmComment
            comment={comment}
            date={date}
            rating={rating}
            user={user}
          />
        }
      </div>
    </div>
  );
}

export default FilmReviews;
