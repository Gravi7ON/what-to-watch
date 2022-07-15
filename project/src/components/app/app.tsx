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
import Films from '../../types/films';

type AppProps = {
  films: Films
}

function App({films}: AppProps): JSX.Element {
  const {
    name,
    posterImage,
    backgroundImage,
  } = films[0];

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage
              films={films}
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
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <MyList
                films={films}
              />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Film}
          element={
            <Film
              films={films}
            />
          }
        />
        <Route
          path={AppRoute.AddReview}
          element={
            <AddReview
              name={name}
              posterImage={posterImage}
              backgroundImage={backgroundImage}
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
