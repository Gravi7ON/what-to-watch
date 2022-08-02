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
import LoadingScreen from '../../pages/loading/loading';
import {useAppSelector} from '../../hooks';
import Comments from '../../types/comments';

type AppProps = {
  comments: Comments
}

function App({comments}: AppProps): JSX.Element {
  const {authorizationStatus, isDataLoaded, movies} = useAppSelector((state) => state);

  if (authorizationStatus === AuthorizationStatus.Unknown || isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage films={movies} />
          }
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyList films={movies} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film}>
          <Route
            path=':id'
            element={
              <Film films={movies} comments={comments} />
            }
          />
        </Route>
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <AddReview films={movies} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Player}
          element={<Player films={movies} />}
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
