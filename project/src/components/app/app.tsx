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
import {Films} from '../../types/films';
import FilmInfo from '../film-info/film-info';
import FilmDetails from '../film-info/film-detais';
import FilmReviews from '../film-info/film-reviews';
import Comments from '../../types/comments';

type AppProps = {
  films: Films
  comments: Comments
}

function App({films, comments}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage films={films} />
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
              <MyList films={films} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film}>
          <Route
            path=':id'
            element={
              <Film films={films} />
            }
          >
            <Route
              index
              element={
                <FilmInfo films={films} />
              }
            />
            <Route
              path='details'
              element={
                <FilmDetails films={films} />
              }
            />
            <Route
              path='reviews'
              element={
                <FilmReviews comments={comments} />
              }
            />
          </Route>
        </Route>
        <Route
          path={AppRoute.AddReview}
          element={
            <AddReview films={films} />
          }
        />
        <Route
          path={AppRoute.Player}
          element={<Player films={films} />}
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
