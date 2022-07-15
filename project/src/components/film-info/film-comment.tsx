import dayjs from 'dayjs';

type User = {
  name: string;
}

type CommentProps = {
  comment: string;
  date: string;
  rating: number;
  user: User;
}

function FilmComment(props: CommentProps): JSX.Element {
  const {
    comment,
    date,
    rating,
    user
  } = props;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime="2016-12-24">{dayjs(date).format('MMMM DD, YYYY')}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

export default FilmComment;

