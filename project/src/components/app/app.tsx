// import SignIn from '../../pages/sign-in/sign-in';
// import AddReview from '../../pages/add-review/add-review';
// import Player from '../../pages/player/player';
// import Film from '../../pages/film/film';
import MainPage from '../../pages/main/main';
// import MyList from '../../pages/my-list/my-list';

type FilmList = {
  name: string;
  previewImage: string;
  genre: string;
  released: number;
  posterImage: string;
  backgroundImage: string;
  // rating: number;
  // scoresCount: number;
  // director: string;
  // starring: string[];
  // description: string;
};

function App(props: FilmList): JSX.Element {
  const {
    name,
    previewImage,
    genre,
    released,
    posterImage,
    backgroundImage
  } = props;

  return (
    <MainPage
      name={name}
      previewImage={previewImage}
      genre={genre}
      released={released}
      posterImage={posterImage}
      backgroundImage={backgroundImage}
    />

  // <SignIn />

  // <MyList
  //   name={props.name}
  //   previewImage={props.previewImage}
  // />

  // <Film
  //   name={props.name}
  //   previewImage={props.previewImage}
  //   genre={props.genre}
  //   released={props.released}
  //   posterImage={props.posterImage}
  //   backgroundImage={props.backgroundImage}
  //   rating={props.rating}
  //   scoresCount={props.scoresCount}
  //   director={props.director}
  //   starring={props.starring}
  //   description={props.description}
  // />

  // <AddReview
  //   name={props.name}
  //   posterImage={props.posterImage}
  // />

  // <Player />
  );
}

export default App;
