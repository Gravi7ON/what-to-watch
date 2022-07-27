import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import comments from './mock/comments';
import films from './mock/films';
import {store} from './store/store';
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        films={films}
        comments={comments}
      />
    </Provider>
  </React.StrictMode>,
);
