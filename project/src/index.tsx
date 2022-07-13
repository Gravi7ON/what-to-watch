import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const Film = {
  TITLE: 'Fantastic Beasts: The Crimes of Grindelwald',
  IMAGE_PATH: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
  GENRE: 'Drama',
  RELEASE_DATE: 2014,
  POSTER_IMAGE: 'img/the-grand-budapest-hotel-poster.jpg',
  BACKGROUND_IMAGE: 'img/bg-the-grand-budapest-hotel.jpg',
  RATNG: 8.9,
  SCORES_COUNT: 240,
  DIRECTOR: 'Wes Anderson',
  STARRING: ['Bill Murray'],
  DESCRIPTION: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.'
};


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      name={Film.TITLE}
      previewImage={Film.IMAGE_PATH}
      genre={Film.GENRE}
      released={Film.RELEASE_DATE}
      posterImage={Film.POSTER_IMAGE}
      backgroundImage={Film.BACKGROUND_IMAGE}
      rating={Film.RATNG}
      scoresCount={Film.SCORES_COUNT}
      director={Film.DIRECTOR}
      starring={Film.STARRING}
      description={Film.DESCRIPTION}
    />
  </React.StrictMode>,
);
