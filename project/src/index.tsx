import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import comments from './mock/comments';
import films from './mock/films';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      films={films}
      comments={comments}
    />
  </React.StrictMode>,
);
