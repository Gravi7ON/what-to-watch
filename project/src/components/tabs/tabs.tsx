import {useAppSelector, useAppDispatch} from '../../hooks/index';
import {setActiveFilmTab} from '../../store/action';
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
  const {activeFilmTab} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const tabs = new Map([
    ['Overview', <FilmInfo key={0} film={currentFilm} />],
    ['Details', <Details key={1} film={currentFilm} />],
    ['Reviews', <Reviews key={2} comments={comments} />]
  ]);

  const onTabClick = (evt: TabEvent) => {
    evt.preventDefault();
    dispatch(setActiveFilmTab(evt.target.textContent));
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <TabBar activeTab={activeFilmTab} onTabClick={onTabClick} titleTabs={Array.from(tabs.keys())} />
      </nav>
      {tabs.get(activeFilmTab)}
    </>
  );
}

export default Tabs;
