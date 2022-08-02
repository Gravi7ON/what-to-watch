import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import comments from './mock/comments';
import ErrorMessage from './components/error-message/error-message';
import {store} from './store/store';
import {Provider} from 'react-redux';
import {fetchFilmsAction, checkAuthAction} from './store/api-actions';

store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ErrorMessage />
      <App
        comments={comments}
      />
    </Provider>
  </React.StrictMode>,
);
