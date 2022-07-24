import {useState} from 'react';
import {Film, TabEvent} from '../../types/films';
import Details from '../film-info/film-detais';
import FilmInfo from '../film-info/film-info';
import Reviews from '../film-info/film-reviews';
import Comments from '../../types/comments';
import TabBar from './tab-bar';

type TabsProps = {
  comments: Comments;
  currentFilm: Film;
}

function Tabs({comments, currentFilm}: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = new Map([
    ['Overview', <FilmInfo key={0} film={currentFilm} />],
    ['Details', <Details key={1} film={currentFilm} />],
    ['Reviews', <Reviews key={2} comments={comments} />]
  ]);

  const handleTabClick = (evt: TabEvent) => {
    if (evt.target.tagName === 'A') {
      evt.preventDefault();
      setActiveTab(evt.target.textContent);
    }
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <TabBar activeTab={activeTab} onTabClick={handleTabClick} titleTabs={Array.from(tabs.keys())} />
      </nav>
      {tabs.get(activeTab)}
    </>
  );
}

export default Tabs;
