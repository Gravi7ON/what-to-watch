import SignIn from '../../pages/sign-in/sign-in';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import Film from '../../pages/film/film';
import MainPage from '../../pages/main/main';
import MyList from '../../pages/my-list/my-list';
import NotFound from '../../pages/not-found/not-found';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Route, Routes} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../../pages/loading/loading';
import {useAppDispatch, useAppSelector} from '../../hooks';
import HistoryRouter from '../history-route/history-rout';
import browserHistory from '../../browser-history';
import {getAuthorizationStatus} from '../../store/user-process/selector';
import {getLoadedDataStatus, getFilms} from '../../store/films-data/selectors';
import {fetchMyListAction} from '../../store/api-actions';
import {isAuthorized} from '../../utils/utils';
import {useEffect} from 'react';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoaded = useAppSelector(getLoadedDataStatus);
  const movies = useAppSelector(getFilms);

  const dispatch = useAppDispatch();

  useEffect(
    () => {
      const requestId = requestAnimationFrame(() => {
        if (isAuthorized(authorizationStatus)) {
          dispatch(fetchMyListAction());
        }
      });

      return () => cancelAnimationFrame(requestId);
    }, [authorizationStatus, dispatch]
  );

  if (authorizationStatus === AuthorizationStatus.Unknown || isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage />
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
              <MyList />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film}>
          <Route
            path=':id'
            element={
              <Film />
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
        <Route path={AppRoute.Player}>
          <Route
            path=':id'
            element={
              <Player films={movies} />
            }
          />
        </Route>
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
