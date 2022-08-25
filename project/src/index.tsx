import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {store} from './store/store';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import {fetchFilmsAction, checkAuthAction} from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';

store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop />
        <ToastContainer
          className="black-background"
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
