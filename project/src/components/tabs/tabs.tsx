import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Film} from '../../types/films';
import Details from '../film-info/film-detais';
import FilmInfo from '../film-info/film-info';
import Reviews from '../film-info/film-reviews';
import Comments from '../../types/comments';

type TabEvent = React.MouseEvent<HTMLAnchorElement, MouseEvent> & {target: {tagName: string; textContent: string}};
type TabsProps = {
  comments: Comments;
  currentFilm: Film
}

function Tabs({comments, currentFilm}: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabClickHandler = (evt: TabEvent) => {
    if (evt.target.tagName === 'A') {
      evt.preventDefault();
      setActiveTab(evt.target.textContent);
    }
  };

  const ActiveTabComponent = (tab: string): JSX.Element => {
    switch(tab) {
      case 'Overview':
        return <FilmInfo film={currentFilm} />;
      case 'Details':
        return <Details film={currentFilm} />;
    }

    return <Reviews comments={comments} />;
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={activeTab === 'Overview' ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}>
            <Link to={'#'} className="film-nav__link" onClick={tabClickHandler}>Overview</Link>
          </li>
          <li className={activeTab === 'Details' ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}>
            <Link to={'#'} className="film-nav__link" onClick={tabClickHandler}>Details</Link>
          </li>
          <li className={activeTab === 'Reviews' ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}>
            <Link to={'#'} className="film-nav__link" onClick={tabClickHandler}>Reviews</Link>
          </li>
        </ul>
      </nav>
      {ActiveTabComponent(activeTab)}
    </>
  );
}

export default Tabs;
