import SignIn from '../../pages/sign-in/sign-in';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import Film from '../../pages/film/film';
import MainPage from '../../pages/main/main';
import MyList from '../../pages/my-list/my-list';
import NotFound from '../../pages/not-found/not-found';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';

type FilmList = {
  name: string;
  previewImage: string;
  genre: string;
  released: number;
  posterImage: string;
  backgroundImage: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  description: string;
};

function App(props: FilmList): JSX.Element {
  const {
    name,
    previewImage,
    genre,
    released,
    posterImage,
    backgroundImage,
    rating,
    scoresCount,
    director,
    starring,
    description
  } = props;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage
              name={name}
              previewImage={previewImage}
              genre={genre}
              released={released}
              posterImage={posterImage}
              backgroundImage={backgroundImage}
            />
          }
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyList
                name={props.name}
                previewImage={props.previewImage}
              />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Film}
          element={
            <Film
              name={name}
              previewImage={previewImage}
              genre={genre}
              released={released}
              posterImage={posterImage}
              backgroundImage={backgroundImage}
              rating={rating}
              scoresCount={scoresCount}
              director={director}
              starring={starring}
              description={description}
            />
          }
        />
        <Route
          path={AppRoute.AddReview}
          element={
            <AddReview
              name={props.name}
              posterImage={props.posterImage}
            />
          }
        />
        <Route
          path={AppRoute.Player}
          element={<Player />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
